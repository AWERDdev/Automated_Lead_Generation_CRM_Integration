import psycopg2

def get_connection():
    return psycopg2.connect(
        host="localhost",
        dbname="leadgenegrator",
        user="postgres",
        password="1231AWERD1"
    )

def create_table_users(conn):
    with conn.cursor() as cur:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL
            )
        """)
        conn.commit()

def insert_user(conn, username, email):
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO users (username, email) VALUES (%s, %s)",
            (username, email)
        )
        conn.commit()

def fetch_all_users(conn):
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM users")
        return cur.fetchall()