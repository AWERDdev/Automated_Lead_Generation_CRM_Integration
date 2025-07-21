import psycopg2

def connect_DB():
    return psycopg2.connect(
        host = "localhost",
        dbname = "leadgenegrator",
        user = "postgres",
        password = "1231AWERD1"
    )


def enable_pgcrypto(conn):
    with conn.cursor() as cur:
        cur.execute('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')
        conn.commit()

def create_table_leads(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS Leads (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone BIGINT UNIQUE NOT NULL,
                address TEXT NOT NULL
            )
            """
        )
        conn.commit()

def create_table_qualified_leads(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS Leads (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone BIGINT UNIQUE NOT NULL,
                address TEXT NOT NULL
                qualified BOOLEAN NOT NULL
            )
            """
        )
        conn.commit()
    
def create_table_disqualified_leads(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS DisqualifiedLeads (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone BIGINT UNIQUE NOT NULL,
                address TEXT NOT NULL,
                qualified BOOLEAN NOT NULL
            )
            """
        )
        conn.commit()
def insert_lead_qualified(conn, name, email, phone, address , qualified):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO Leads (name, email, phone, address , qualified)
            VALUES (%s, %s, %s, %s , %s )
            RETURNING id;
            """,
            (name, email, phone, address , qualified)
        )
        lead_id = cur.fetchone()[0]
        conn.commit()
        return lead_id
        
def insert_lead_disqualified(conn, name, email, phone, address , qualified):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO Leads (name, email, phone, address , qualified)
            VALUES (%s, %s, %s, %s , %s )
            RETURNING id;
            """,
            (name, email, phone, address , qualified)
        )
        lead_id = cur.fetchone()[0]
        conn.commit()
        return lead_id

def insert_lead(conn, name, email, phone, address):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO Leads (name, email, phone, address )
            VALUES (%s, %s, %s, %s , %s )
            RETURNING id;
            """,
            (name, email, phone, address )
        )
        lead_id = cur.fetchone()[0]
        conn.commit()
        return lead_id