# --- app.py: AI-Driven BI Dashboard Backend ---
# This file serves as the main entry point for the BI tool.
# It manages user authentication (MongoDB), dataset uploads, and the 
# Natural Language to SQL (Text-to-SQL) RAG pipeline.

from flask import Flask, render_template, request, redirect, session, flash, jsonify
from flask_cors import CORS
import json
import os
import hashlib
import datetime
import pandas as pd
from sqlalchemy import create_engine
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from bson.objectid import ObjectId

# LangChain 0.3.x Imports - Industry standard for LLM orchestration
from langchain_openai import ChatOpenAI
from langchain_community.utilities import SQLDatabase
# In LangChain 1.x / 0.3.x, use LCEL for deterministic SQL prompting
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Load environment variables (API Keys, DB URIs) from the .env file
load_dotenv()

app = Flask(__name__)
# Secret key is required by Flask to sign session cookies for security
app.secret_key = os.getenv("FLASK_SECRET_KEY", "default_secret_key")

# Enable Cross-Origin Resource Sharing (CORS)
# This allows your React frontend on port 3000 to securely call this API on port 5000
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# --- DATABASE CONFIGURATION ---
# MongoDB is used for persistent storage of users, datasets, and chat history.
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/ai_dashboard")

# Global in-memory dictionary to cache LLM results.
# This prevents redundant API calls and stays within token limits for repeated questions.
dashboard_cache = {} 

try:
    mongo_client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    mongo_client.server_info()
    db = mongo_client.get_database()
    print("Successfully connected to MongoDB.")
except Exception as e:
    print(f"Warning: MongoDB Connection Error: {e}")
    db = None

# --- AUTHENTICATION & USER MANAGEMENT ---

@app.route("/api/register", methods=["POST"])
def api_register():
    """Extracts user registration data and stores hashed passwords in MongoDB."""
    if db is None:
        return jsonify({"success": False, "message": "Database not connected. Please ensure MongoDB is running."}), 500
        
    data = request.json
    email = data.get("email")
    
    # Validation: Check if user already exists
    if db.users.find_one({"email": email}):
        return jsonify({"success": False, "message": "User already exists"}), 409
    
    # Security: Hash passwords using PBKDF2 with SHA256 (never store plain text)
    hashed_pw = generate_password_hash(data.get("password"))
    db.users.insert_one({
        "full_name": data.get("full_name"),
        "email": email,
        "phone": data.get("phone"),
        "company_name": data.get("company_name", ""),
        "designation": data.get("designation", ""),
        "password": hashed_pw,
        "profile_photo": data.get("profile_photo", ""),
        "created_at": datetime.datetime.utcnow()
    })
    return jsonify({"success": True, "message": "Registration successful"})

@app.route("/api/login", methods=["POST"])
def api_login():
    """Verifies credentials and sets up a server-side session."""
    if db is None:
        return jsonify({"success": False, "message": "Database not connected. Please ensure MongoDB is running."}), 500
        
    data = request.json
    user = db.users.find_one({"email": data.get("email")})
    
    # check_password_hash securely compares the provided password with the stored hash
    if user and check_password_hash(user["password"], data.get("password")):
        session["email"] = user["email"]
        return jsonify({
            "success": True, 
            "user": {
                "name": user["full_name"],
                "email": user["email"],
                "company": user.get("company_name", ""),
                "designation": user.get("designation", "")
            }
        })
    return jsonify({"success": False, "message": "Invalid email or password"}), 401

@app.route("/api/me")
def api_me():
    """Validates if a session cookie is present and returns basic user info."""
    if "email" in session:
        user = db.users.find_one({"email": session["email"]})
        if user:
            return jsonify({"logged_in": True, "user": {"name": user["full_name"], "email": user["email"]}})
    return jsonify({"logged_in": False})

@app.route("/api/logout")
def api_logout():
    """Wipes the session to log out the user."""
    session.clear()
    return jsonify({"success": True})

# --- DATASET MANAGEMENT ---

@app.route("/api/datasets/upload", methods=["POST"])
def upload_dataset():
    """Receives JSON data from the React frontend and stores it in MongoDB."""
    if "email" not in session: return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    dataset_doc = {
        "user_email": session["email"],
        "filename": data.get("filename"),
        "content": data.get("content"), # The raw JSON array of records
        "rows_count": data.get("rows_count", 0),
        "uploaded_at": datetime.datetime.utcnow().isoformat()
    }
    result = db.datasets.insert_one(dataset_doc)
    return jsonify({"success": True, "id": str(result.inserted_id)})

@app.route("/api/datasets/list", methods=["GET"])
def list_datasets():
    """Lists metadata for all datasets uploaded by the current user."""
    if "email" not in session: return jsonify({"error": "Unauthorized"}), 401
    datasets = []
    cursor = db.datasets.find({"user_email": session["email"]}).sort("uploaded_at", -1)
    for doc in cursor:
        datasets.append({"id": str(doc["_id"]), "filename": doc["filename"], "rows": doc.get("rows_count")})
    return jsonify({"success": True, "datasets": datasets})

@app.route("/api/datasets/get/<dataset_id>", methods=["GET"])
def get_dataset(dataset_id):
    """Retrieves the full dataset content by ID."""
    if "email" not in session: return jsonify({"error": "Unauthorized"}), 401
    try:
        doc = db.datasets.find_one({"_id": ObjectId(dataset_id), "user_email": session["email"]})
        if not doc:
            return jsonify({"error": "Dataset not found"}), 404
        return jsonify({
            "success": True, 
            "dataset": {
                "filename": doc["filename"], 
                "content": doc.get("content", [])
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/api/datasets/delete", methods=["POST"])
def delete_dataset():
    """Deletes a specific dataset from the database."""
    if "email" not in session: return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    dataset_id = data.get("id")
    
    if not dataset_id:
        return jsonify({"success": False, "message": "Missing dataset ID"}), 400
        
    try:
        result = db.datasets.delete_one({"_id": ObjectId(dataset_id), "user_email": session["email"]})
        if result.deleted_count > 0:
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "message": "Dataset not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# --- CHAT HISTORY PERSISTENCE (MongoDB) ---
# These routes resolve the 404 OPTIONS errors you were seeing from the frontend

@app.route("/api/chats/save", methods=["POST"])
def save_chat():
    """Upserts a chat session into MongoDB to persist user history."""
    if "email" not in session: return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    chat_id = data.get("id")
    title = data.get("title")
    messages = data.get("messages")

    if not all([chat_id, title, messages]):
        return jsonify({"success": False, "message": "Missing chat data"}), 400

    # Upsert: Update the document if it exists, insert it if it doesn't.
    # This prevents creating duplicate chat records in the DB.
    db.chats.update_one(
        {"chat_id": str(chat_id), "user_email": session["email"]},
        {"$set": {
            "title": title,
            "messages": messages,
            "dataFileName": data.get("dataFileName", ""),
            "timestamp": datetime.datetime.utcnow().isoformat()
        }},
        upsert=True
    )
    return jsonify({"success": True})

@app.route("/api/chats/list", methods=["GET"])
def list_chats():
    """Retrieves all saved chat sessions for the logged-in user."""
    if "email" not in session: return jsonify({"error": "Unauthorized"}), 401
    
    chats = {}
    # Sort by descending timestamp so the newest chats appear first in the UI
    cursor = db.chats.find({"user_email": session["email"]}).sort("timestamp", -1)
    
    for doc in cursor:
        c_id = doc.get("chat_id")
        if c_id:
            chats[c_id] = {
                "id": c_id,
                "title": doc.get("title", "Dashboard"),
                "dataFileName": doc.get("dataFileName", ""),
                "messages": doc.get("messages", []),
                "timestamp": doc.get("timestamp", "")
            }
    return jsonify({"success": True, "chats": chats})

@app.route("/api/chats/delete", methods=["POST"])
def delete_chat():
    """Deletes a specific chat history from the database."""
    if "email" not in session: return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    chat_id = data.get("id")
    
    if not chat_id:
        return jsonify({"success": False, "message": "Missing chat ID"}), 400
        
    db.chats.delete_one({"chat_id": str(chat_id), "user_email": session["email"]})
    return jsonify({"success": True})


# --- OPTIMIZED GENERATE DASHBOARD (RAG PIPELINE) ---

@app.route("/api/generate_dashboard", methods=["POST"])
def generate_dashboard():
    """
    Main RAG Logic with Self-Correcting Execution Loop:
    1. Loads dataset into an in-memory SQLite table.
    2. Enters a retry loop (max 3 times) to generate and execute SQL.
    3. If execution fails (e.g., hallucinated column), feeds error back to LLM to self-correct.
    4. Automatically selects the best chart type based on the final, valid data.
    """
    if "email" not in session: return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    # Extract the last message from chat history as the user query
    user_query = data.get("messages", [])[-1].get("content", "")
    dataset = data.get("dataset", [])

    if not dataset: return jsonify({"error": "No data found for this analysis"}), 400

    # Token-Saving Cache: If identical query on same data size, return cached result.
    cache_key = hashlib.md5(f"{user_query}_{len(dataset)}".encode()).hexdigest()
    if cache_key in dashboard_cache:
        print(f"CACHE HIT: Returning cached result for '{user_query}'")
        return jsonify({"choices": [{"message": {"content": dashboard_cache[cache_key]}}]})

    try:
        # Step 1: Create an In-Memory SQLite database
        df = pd.DataFrame(dataset)
        engine = create_engine("sqlite:///:memory:")
        df.to_sql("dataset", engine, index=False)
        
        # sample_rows_in_table_info=0: Crucial for cost-saving. 
        db_helper = SQLDatabase(engine=engine, sample_rows_in_table_info=0)

        # Step 2: Initialize LLM 
        llm = ChatOpenAI(
            model="google/gemini-2.0-flash-001",
            api_key=os.getenv("OPENROUTER_API_KEY"),
            base_url="https://openrouter.ai/api/v1",
            temperature=0, # Temperature 0 ensures the AI doesn't get 'creative' with SQL syntax.
        )

        # Step 3: Define the dynamic prompt for the self-healing loop
        table_info = db_helper.get_table_info()
        
        # Notice we added {error_feedback} to inject previous failure messages
        sql_prompt = PromptTemplate.from_template(
            "You are a SQLite expert. Given the table schema below, write a syntactically correct SQLite query to answer the user's question.\n"
            "{error_feedback}\n"
            "CRITICAL RULES:\n"
            "1. ALWAYS quote column names that contain spaces using double quotes (e.g., \"Total Amount\").\n"
            "2. If the question implies grouping (e.g., 'by category', 'grouped by status'), your SELECT clause MUST start with the grouping column, followed by the aggregated column.\n"
            "   CORRECT EXAMPLE: SELECT Claim_Status, SUM(Billed_Amount) FROM dataset GROUP BY Claim_Status;\n"
            "   WRONG EXAMPLE: SELECT SUM(Billed_Amount) FROM dataset GROUP BY Claim_Status;\n"
            "3. Return ONLY the raw SQL query, without any markdown formatting, backticks, or explanations.\n\n"
            "Schema:\n{schema}\n\n"
            "Question: {question}\nSQL Query:"
        )
        sql_chain = sql_prompt | llm | StrOutputParser()
        
        # --- SELF-HEALING AI LOOP START ---
        max_retries = 3
        result_df = None
        current_error_feedback = ""
        
        for attempt in range(max_retries):
            print(f"--- SQL Generation Attempt {attempt + 1}/{max_retries} ---")
            
            # Generate the SQL, dynamically injecting any previous errors
            raw_sql_response = sql_chain.invoke({
                "schema": table_info,
                "question": user_query,
                "error_feedback": current_error_feedback
            })
            
            # Cleanup: Remove markdown backticks if the LLM provided them.
            clean_sql = raw_sql_response.replace("```sql", "").replace("```", "").strip()
            print(f"SQL GENERATED: {clean_sql}")

            try:
                # Step 4: Local Execution via Pandas
                # We attempt to execute. If the column is wrong, Pandas throws an exception.
                result_df = pd.read_sql_query(clean_sql, engine)
                
                # If execution succeeds, break out of the retry loop completely!
                print("SQL Executed Successfully!")
                break 
                
            except Exception as execution_error:
                error_msg = str(execution_error)
                print(f"EXECUTION FAILED: {error_msg}")
                
                # If this was our last attempt, raise the error to trigger the fallback UI
                if attempt == max_retries - 1:
                    raise Exception(f"AI could not generate valid SQL after {max_retries} attempts. Last error: {error_msg}")
                
                # Otherwise, construct the feedback string to send back to the LLM on the next loop
                current_error_feedback = (
                    f"WARNING: Your previous SQL query ('{clean_sql}') failed with the following error:\n"
                    f"{error_msg}\n"
                    f"Please review the Schema carefully and correct the column names or syntax."
                )
        # --- SELF-HEALING AI LOOP END ---

        # Step 5: Decision on Visualization Type (Anti-Vibe Coding)
        # If the result is exactly 1 row and 1 column, it's a single scalar value.
        if result_df.shape == (1, 1):
            chart_type = "text"
        elif len(result_df.columns) > 2:
            chart_type = "table"
        else:
            # For multiple rows, use a tiny prompt to decide which chart fits.
            viz_prompt = f"User asked: '{user_query}'. Columns returned: {list(result_df.columns)}. Pick one: 'bar', 'line', or 'pie'."
            chart_type = llm.invoke(viz_prompt).content.strip().lower()

        # Build table data for ALL queries so they can be exported/shown
        table_data = {
            "show": True if chart_type == "table" else False,
            "columns": list(result_df.columns),
            "rows": result_df.fillna("").values.tolist()
        }

        # Step 6: Convert Results to React 'Recharts' format {x, y}
        chart_data = []
        is_single_scalar = result_df.shape == (1, 1)

        for i, row in result_df.iterrows():
            if is_single_scalar:
                val = row.iloc[0]
                try:
                    out_val = float(val) if pd.notnull(val) else 0
                except (ValueError, TypeError):
                    out_val = val
                chart_data.append({"x": "Total", "y": out_val})
            elif len(result_df.columns) == 1:
                val = row.iloc[0]
                try: 
                    out_val = float(val) if pd.notnull(val) else 0
                except (ValueError, TypeError): 
                    out_val = val
                chart_data.append({"x": f"Group {i+1}", "y": out_val})
            else:
                val = row.iloc[1]
                try:
                    out_val = float(val) if pd.notnull(val) else 0
                except (ValueError, TypeError):
                    out_val = val
                chart_data.append({"x": str(row.iloc[0]), "y": out_val})

        # Step 7: Build final JSON response
        agent_output = json.dumps({
            "chart_type": chart_type if chart_type in ['bar', 'line', 'pie', 'text', 'table'] else 'bar',
            "title": f"Report for: {user_query}",
            "description": f"Analyzed {len(df)} rows. Found {len(result_df)} records.",
            "data": chart_data,
            "table": table_data,
            "sql": clean_sql
        })

        # Cache this output for future sessions
        dashboard_cache[cache_key] = agent_output

        return jsonify({"choices": [{"message": {"content": agent_output}}]})

    except Exception as e:
        print(f"PIPELINE ERROR: {str(e)}")
        # Graceful error handling for the frontend dashboard widget
        error_json = json.dumps({
            "chart_type": "text",
            "title": "Query Error",
            "description": "The AI could not process this data query. Please rephrase or try a simpler question.",
            "data": []
        })
        return jsonify({"choices": [{"message": {"content": error_json}}]})

if __name__ == "__main__":
    # Start the Flask app on localhost:5000
    app.run(debug=True, host="127.0.0.1", port=5000)