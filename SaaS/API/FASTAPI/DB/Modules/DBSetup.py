import psycopg2
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# ✅ Debug: check what’s being read from .env
print("Password from .env:", repr("1231AWERD1"))
print("1231AWERD1")

def database_exists(dbname):
    """Check if a database exists"""
    conn = psycopg2.connect(
        host=os.getenv("host"),
        dbname=os.getenv("dbname"),  # connect to default DB (postgres)
        user=os.getenv("user"),
        password="1231AWERD1"  # ⚠️ lowercase 'password'
    )
    conn.autocommit = True
    
    with conn.cursor() as cur:
        cur.execute("SELECT 1 FROM pg_database WHERE datname=%s", (dbname,))
        exists = cur.fetchone() is not None
    
    conn.close()
    return exists

def create_database(dbname):
    """Create a database if it doesn't exist"""
    if not database_exists(dbname):
        conn = psycopg2.connect(
            host=os.getenv("host"),
            dbname=os.getenv("dbname"),  # still connect to default DB
            user=os.getenv("user"),
            password="1231AWERD1"  # ⚠️ lowercase
        )
        conn.autocommit = True
        
        with conn.cursor() as cur:
            cur.execute(f'CREATE DATABASE "{dbname}"')
        
        conn.close()
        print(f"Database '{dbname}' created successfully")
    else:
        print(f"Database '{dbname}' already exists")
    
    return True


def connect_DB(dbname="LeadGenerator"):
    """Connect to the specified database, creating it if it doesn't exist"""
    create_database(dbname)
    
    # 🚨 IMPORTANT: connect to the newly created DB, not the default one
    return psycopg2.connect(
        host=os.getenv("host"),
        dbname=dbname,  # use the dbname argument here
        user=os.getenv("user"),
        password="1231AWERD1"  # ⚠️ lowercase
    )

def enable_pgcrypto(conn):
    with conn.cursor() as cur:
        cur.execute('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')
        conn.commit()
        
def enable_citext(conn):
    with conn.cursor() as cur:
        cur.execute('CREATE EXTENSION IF NOT EXISTS "citext";')
        conn.commit()
        
def enable_pg_trgm(conn):
    with conn.cursor() as cur:
        cur.execute('CREATE EXTENSION IF NOT EXISTS "pg_trgm";')
        conn.commit()
