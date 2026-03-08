from flask import Flask, render_template, request, redirect, session, flash, jsonify
from flask_cors import CORS
import sqlite3
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "default_secret_key")
CORS(app, supports_credentials=True)


def get_db():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/")
def login_page():
    return render_template("login.html")


@app.route("/register")
def register_page():
    return render_template("register.html")


@app.route("/register_user", methods=["POST"])
def register_user():

    full_name = request.form["full_name"]
    email = request.form["email"]
    phone = request.form["phone"]
    company_name = request.form["company_name"]
    designation = request.form["designation"]
    company_size = request.form["company_size"]
    password = request.form["password"]

    conn = get_db()

    user = conn.execute(
        "SELECT * FROM users WHERE email=?",
        (email,)
    ).fetchone()

    if user:
        conn.close()
        flash("An account with this email already exists.", "error")
        return redirect("/register")

    conn.execute(
        """INSERT INTO users 
        (full_name, email, phone, company_name, designation, company_size, password) 
        VALUES (?,?,?,?,?,?,?)""",
        (full_name, email, phone, company_name, designation, company_size, password)
    )

    conn.commit()
    conn.close()

    flash("Registration successful! Please login.", "success")
    return redirect("/")


@app.route("/login", methods=["POST"])
def login():

    email = request.form["email"]
    password = request.form["password"]

    conn = get_db()

    user = conn.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (email, password)
    ).fetchone()

    conn.close()

    if user:
        session["user"] = user["full_name"]
        session["email"] = user["email"]
        session["company"] = user["company_name"]
        session["designation"] = user["designation"]
        session["company_size"] = user["company_size"]
        session["phone"] = user["phone"]
        return redirect("/dashboard")
    else:
        flash("Invalid email or password.", "error")
        return redirect("/")


@app.route("/dashboard")
def dashboard():

    if "user" in session:
        return render_template(
            "dashboard.html",
            user=session["user"],
            email=session["email"],
            company=session["company"],
            designation=session["designation"],
            company_size=session["company_size"],
            phone=session["phone"]
        )
    else:
        return redirect("/")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/api/register", methods=["POST"])
def api_register():
    data = request.json
    full_name = data.get("full_name")
    email = data.get("email")
    phone = data.get("phone")
    company_name = data.get("company_name")
    designation = data.get("designation")
    password = data.get("password")

    if not all([full_name, email, password]):
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE email=?", (email,)).fetchone()

    if user:
        conn.close()
        return jsonify({"success": False, "message": "User already exists"}), 409

    conn.execute(
        """INSERT INTO users 
        (full_name, email, phone, company_name, designation, password) 
        VALUES (?,?,?,?,?,?)""",
        (full_name, email, phone, company_name, designation, password)
    )
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "Registration successful"})


@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    conn = get_db()
    user = conn.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (email, password)
    ).fetchone()
    conn.close()

    if user:
        session["email"] = user["email"]
        return jsonify({
            "success": True, 
            "user": {
                "name": user["full_name"],
                "email": user["email"],
                "company": user["company_name"],
                "phone": user["phone"],
                "designation": user["designation"]
            }
        })
    else:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401


@app.route("/api/me")
def api_me():
    if "email" in session:
        conn = get_db()
        user = conn.execute("SELECT * FROM users WHERE email=?", (session["email"],)).fetchone()
        conn.close()
        if user:
            return jsonify({
                "logged_in": True, 
                "user": {
                    "name": user["full_name"],
                    "email": user["email"],
                    "company": user["company_name"],
                    "phone": user["phone"],
                    "designation": user["designation"]
                }
            })
    return jsonify({"logged_in": False})


@app.route("/api/logout")
def api_logout():
    session.clear()
    return jsonify({"success": True})


@app.route("/api/datasets/upload", methods=["POST"])
def upload_dataset():
    data = request.json
    email = data.get("email")
    filename = data.get("filename")
    content = data.get("content")
    rows_count = data.get("rows_count")

    if not all([email, filename, content]):
        return jsonify({"success": False, "message": "Missing file data"}), 400

    conn = get_db()
    conn.execute(
        "INSERT INTO datasets (user_email, filename, content, rows_count) VALUES (?, ?, ?, ?)",
        (email, filename, content, rows_count)
    )
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "Dataset stored successfully"})


@app.route("/api/datasets/list", methods=["GET"])
def list_datasets():
    email = request.args.get("email")
    if not email:
        return jsonify({"success": False, "message": "Email required"}), 400

    conn = get_db()
    rows = conn.execute(
        "SELECT id, filename, rows_count, uploaded_at FROM datasets WHERE user_email = ? ORDER BY uploaded_at DESC",
        (email,)
    ).fetchall()
    
    datasets = []
    for row in rows:
        datasets.append({
            "id": row["id"],
            "filename": row["filename"],
            "rows_count": row["rows_count"],
            "uploaded_at": row["uploaded_at"]
        })
    
    conn.close()
    return jsonify({"success": True, "datasets": datasets})


@app.route("/api/datasets/get/<int:dataset_id>", methods=["GET"])
def get_dataset(dataset_id):
    conn = get_db()
    row = conn.execute("SELECT content, filename FROM datasets WHERE id = ?", (dataset_id,)).fetchone()
    conn.close()
    
    if row:
        return jsonify({"success": True, "content": row["content"], "filename": row["filename"]})
    return jsonify({"success": False, "message": "Dataset not found"}), 404


@app.route("/api/chats/save", methods=["POST"])
def save_chat():
    data = request.json
    chat_id = data.get("id")
    email = data.get("email")
    title = data.get("title")
    messages = data.get("messages")

    if not all([chat_id, email, title, messages]):
        return jsonify({"success": False, "message": "Missing chat data"}), 400

    conn = get_db()
    conn.execute(
        "INSERT INTO chats (id, user_email, title, messages) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET messages=excluded.messages, title=excluded.title",
        (chat_id, email, title, json.dumps(messages))
    )
    conn.commit()
    conn.close()
    return jsonify({"success": True})


@app.route("/api/chats/delete", methods=["POST"])
def delete_chat():
    data = request.json
    chat_id = data.get("id")
    email = data.get("email")

    if not all([chat_id, email]):
        return jsonify({"success": False, "message": "Missing info"}), 400

    conn = get_db()
    conn.execute("DELETE FROM chats WHERE id = ? AND user_email = ?", (chat_id, email))
    conn.commit()
    conn.close()
    return jsonify({"success": True})


@app.route("/api/chats/list", methods=["GET"])
def list_chats():
    email = request.args.get("email")
    if not email:
        return jsonify({"success": False, "message": "Email required"}), 400

    conn = get_db()
    rows = conn.execute(
        "SELECT id, title, messages, timestamp FROM chats WHERE user_email = ? ORDER BY timestamp DESC",
        (email,)
    ).fetchall()
    
    chats = {}
    for row in rows:
        chats[row["id"]] = {
            "id": row["id"],
            "title": row["title"],
            "messages": json.loads(row["messages"]),
            "timestamp": row["timestamp"]
        }
    
    conn.close()
    return jsonify({"success": True, "chats": chats})


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)