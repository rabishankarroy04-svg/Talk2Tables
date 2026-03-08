import sqlite3

conn = sqlite3.connect("users.db")
cursor = conn.cursor()

# users table
cursor.execute("""
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    company_name TEXT NOT NULL,
    designation TEXT NOT NULL,
    password TEXT NOT NULL,
    registered_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

# datasets table
cursor.execute("""
CREATE TABLE IF NOT EXISTS datasets(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    filename TEXT NOT NULL,
    content TEXT NOT NULL,
    rows_count INTEGER,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_email) REFERENCES users(email)
)
""")

# chats table
cursor.execute("""
CREATE TABLE IF NOT EXISTS chats(
    id TEXT PRIMARY KEY,
    user_email TEXT NOT NULL,
    title TEXT NOT NULL,
    messages TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_email) REFERENCES users(email)
)
""")

conn.commit()
conn.close()

print("Database system initialized with Users, Datasets, and Chats tables successfully")