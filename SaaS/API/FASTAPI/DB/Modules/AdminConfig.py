def create_table_Admin(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            CREATE SCHEMA IF NOT EXISTS private_data;

            CREATE TABLE IF NOT EXISTS private_data.Admins (
                Admin_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                phone BIGINT UNIQUE NOT NULL,
                address TEXT NOT NULL,
                Admin BOOLEAN NOT NULL
            );
            """
        )
        conn.commit()

def insert_Admin(conn, name, email, phone, address, password , Admin):
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

def search_Admin(conn, email=None, name=None):
    with conn.cursor() as cur:
        if email and name:
            cur.execute(
                """
                SELECT * FROM Admins WHERE email = %s OR name = %s;
                """,
                (email, name)  # Fixed: removed the qualified parameter from SQL but it was still in parameter list
            )
        elif email:
            cur.execute(
                """
                SELECT * FROM Admins WHERE email = %s;
                """,
                (email,)
            )
        elif name:
            cur.execute(
                """
                SELECT * FROM Admins WHERE name = %s;
                """,
                (name,)
            )
        return cur.fetchall()

# def update_UserData(conn, user_id=None, email=None, name=None):
#     with conn.cursor() as cur:
#         if user_id:
#             cur.execute(
#                 """
#                 UPDATE Admins SET qualified = %s WHERE id = %s;
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