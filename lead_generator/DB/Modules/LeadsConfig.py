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
                address TEXT NOT NULL,
                qualified BOOLEAN NOT NULL
            )
            """
        )
        conn.commit()

def insert_lead(conn, name, email, phone, address, qualified):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO Leads (name, email, phone, address, qualified)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (name, email, phone, address, qualified)
        )
        lead_id = cur.fetchone()[0]
        conn.commit()
        return lead_id

def search_lead(conn, email=None, name=None):
    with conn.cursor() as cur:
        if email and name:
            cur.execute(
                """
                SELECT * FROM Leads WHERE email = %s OR name = %s;
                """,
                (email, name)  # Fixed: removed the qualified parameter from SQL but it was still in parameter list
            )
        elif email:
            cur.execute(
                """
                SELECT * FROM Leads WHERE email = %s;
                """,
                (email,)
            )
        elif name:
            cur.execute(
                """
                SELECT * FROM Leads WHERE name = %s;
                """,
                (name,)
            )
        return cur.fetchall()

def get_qualified_leads(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT * FROM Leads WHERE qualified = TRUE;
            """
        )
        return cur.fetchall()

def get_disqualified_leads(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT * FROM Leads WHERE qualified = FALSE;
            """
        )
        return cur.fetchall()

def update_lead_qualification(conn, lead_id=None, email=None, name=None, qualified=False):
    with conn.cursor() as cur:
        if lead_id:
            cur.execute(
                """
                UPDATE Leads SET qualified = %s WHERE id = %s;
                """,
                (qualified, lead_id)
            )
        elif email:
            cur.execute(
                """
                UPDATE Leads SET qualified = %s WHERE email = %s;
                """,
                (qualified, email)  # Fixed: added the qualified parameter and fixed parameter order
            )
        elif name:
            cur.execute(
                """
                UPDATE Leads SET qualified = %s WHERE name = %s;
                """,
                (qualified, name)  # Fixed: added the qualified parameter and fixed parameter order
            )
        conn.commit()