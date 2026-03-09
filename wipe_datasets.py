import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/ai_dashboard")

try:
    print("Connecting to MongoDB Atlas to purge datasets...")
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000, tls=True, tlsInsecure=True)
    client.server_info()
    db = client.get_database()
    
    # Delete all documents from datasets
    result_datasets = db.datasets.delete_many({})
    print(f"Purged {result_datasets.deleted_count} documents from 'datasets' collection.")
    
    # Optional: Delete all charts to keep it clean (commented out by default)
    # result_chats = db.chats.delete_many({})
    # print(f"Purged {result_chats.deleted_count} documents from 'chats' collection.")
    
except Exception as e:
    print(f"Error purging database: {e}")
