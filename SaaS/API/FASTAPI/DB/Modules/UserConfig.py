def create_table_Users(conn):
    with conn.cursor() as cur:
        cur.execute(
            """
            CREATE SCHEMA IF NOT EXISTS private_data;

            CREATE TABLE IF NOT EXISTS private_data.Users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone BIGINT UNIQUE NOT NULL,
                address TEXT NOT NULL,
                is_admin BOOLEAN NOT NULL DEFAULT FALSE
            );
            """
        )
        conn.commit()


def insert_User(conn, name, email, phone, address, password, is_admin, username):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO private_data.Users 
                (name, email, phone, address, password, is_admin, username)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (name, email, phone, address, password, is_admin, username)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        return user_id

def search_User(conn, email=None, name=None):
    with conn.cursor() as cur:
        if email and name:
            cur.execute(
                """
                SELECT * FROM private_data.Users 
                WHERE email = %s OR name = %s;
                """,
                (email, name)
            )
        elif email:
            cur.execute(
                """
                SELECT * FROM private_data.Users 
                WHERE email = %s;
                """,
                (email,)
            )
        elif name:
            cur.execute(
                """
                SELECT * FROM private_data.Users 
                WHERE name = %s;
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