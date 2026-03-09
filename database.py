import os
from pymongo import MongoClient
from dotenv import load_dotenv
import certifi

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/ai_dashboard")

try:
    print("Connecting to MongoDB Atlas...")
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000, tls=True, tlsInsecure=True)
    client.server_info() # trigger connection
    db = client.get_database()
    
    # Initialize Collections (MongoDB creates them on first insert, but we can setup indexes here)
    if "users" not in db.list_collection_names():
        db.create_collection("users")
        db.users.create_index("email", unique=True)
        print("Created 'users' collection with unique index on email.")
        
    if "datasets" not in db.list_collection_names():
        db.create_collection("datasets")
        db.datasets.create_index("user_email")
        print("Created 'datasets' collection.")
        
    if "chats" not in db.list_collection_names():
        db.create_collection("chats")
        db.chats.create_index("chat_id", unique=True)
        db.chats.create_index("user_email")
        print("Created 'chats' collection.")

    print("\nDatabase system initialized with Users, Datasets, and Chats collections in MongoDB successfully!")

except Exception as e:
    print(f"Failed to initialize MongoDB: {e}")
