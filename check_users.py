import sqlite3

def check_users():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT id, full_name, email, phone, company_name, designation, registered_on FROM users")
        rows = cursor.fetchall()
        
        if not rows:
            print("No users found in the database.")
            return

        print(f"{'ID':<4} | {'Name':<20} | {'Email':<25} | {'Company':<15} | {'Registered On'}")
        print("-" * 90)
        
        for row in rows:
            print(f"{row['id']:<4} | {row['full_name']:<20} | {row['email']:<25} | {row['company_name']:<15} | {row['registered_on']}")
            
    except sqlite3.OperationalError as e:
        print(f"Error: {e}. Make sure the database exists and the users table is created.")
    finally:
        conn.close()

if __name__ == "__main__":
    check_users()
