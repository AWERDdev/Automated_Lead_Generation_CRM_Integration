import psycopg2
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def database_exists(dbname):
    """Check if a database exists"""
    conn = psycopg2.connect(
        host= os.getenv("host"),
        dbname= os.getenv("dbname"),  # Connect to default postgres database
        user= os.getenv("postgres"),
        password= os.getenv("password")
    )
    conn.autocommit = True  # This is needed for creating databases
    
    with conn.cursor() as cur:
        cur.execute("SELECT 1 FROM pg_database WHERE datname=%s", (dbname,))
        exists = cur.fetchone() is not None
    
    conn.close()
    return exists

def create_database(dbname):
    """Create a database if it doesn't exist"""
    if not database_exists(dbname):
        conn = psycopg2.connect(
        host= os.getenv("host"),
        dbname= os.getenv("dbname"),  # Connect to default postgres database
        user= os.getenv("postgres"),
        password= os.getenv("password")
        )
        conn.autocommit = True  # This is needed for creating databases
        
        with conn.cursor() as cur:
            # Use SQL string formatting to avoid quoting issues with database names
            # This is safe because dbname is not user input in this context
            cur.execute(f'CREATE DATABASE "{dbname}"')
        
        conn.close()
        print(f"Database '{dbname}' created successfully")
    else:
        print(f"Database '{dbname}' already exists")
    
    return True

def connect_DB(dbname="UserDatabase"):
    """Connect to the specified database, creating it if it doesn't exist"""
    create_database(dbname)
    
    return psycopg2.connect(
        host="localhost",
        dbname=dbname,
        user="postgres",
        password="1231AWERD1"
    )

def enable_pgcrypto(conn):
    with conn.cursor() as cur:
        cur.execute('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')
        conn.commit()

def create_table_Users(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS Users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                username: TEXT UNIQUE NOT NULL,
                password: TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone BIGINT UNIQUE NOT NULL,
                address TEXT NOT NULL,
                is_admin BOOLEAN DEFAULT FALSE,
            )
            """
        )
        conn.commit()

def insert_User(conn, name, email, phone, address, password , Admin):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO Admins (name, email, phone, address )
            VALUES (%s, %s, %s, %s , %s, %s)
            RETURNING id;
            """,
            (name, email, phone, address ,password , Admin)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        return user_id

def search_lead(conn, email=None, name=None):
    with conn.cursor() as cur:
        if email and name:
            cur.execute(
                """
                SELECT * FROM Users WHERE email = %s OR name = %s;
                """,
                (email, name)  # Fixed: removed the qualified parameter from SQL but it was still in parameter list
            )
        elif email:
            cur.execute(
                """
                SELECT * FROM Users WHERE email = %s;
                """,
                (email,)
            )
        elif name:
            cur.execute(
                """
                SELECT * FROM Users WHERE name = %s;
                """,
                (name,)
            )
        return cur.fetchall()

# def update_UserData(conn, user_id=None, email=None, name=None):
#     with conn.cursor() as cur:
#         if user_id:
#             cur.execute(
#                 """
#                 UPDATE Users SET qualified = %s WHERE id = %s;
#                 """,
#                 (user_id)
#             )
#         elif email:
#             cur.execute(
#                 """
#                 UPDATE Leads SET qualified = %s WHERE email = %s;
#                 """,
#                 (qualified, email)  # Fixed: added the qualified parameter and fixed parameter order
#             )
#         elif name:
#             cur.execute(
#                 """
#                 UPDATE Leads SET qualified = %s WHERE name = %s;
#                 """,
#                 (qualified, name)  # Fixed: added the qualified parameter and fixed parameter order
#             )
#         conn.commit()