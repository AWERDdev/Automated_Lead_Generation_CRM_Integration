import psycopg2
from Modules import utils

conn = psycopg2.connect(
host = "localhost",
dbname = "leadgenegrator",
user = "postgres",
password = "1231AWERD1"
)

cur = conn.cursor()

utils.create_table_users(conn)
utils.insert_user(conn,"AWERD","1231@gmail.com")








# cur.execute("""
#     CREATE TABLE IF NOT EXISTS users (
#         id SERIAL PRIMARY KEY,
#         username TEXT NOT NULL,
#         email TEXT UNIQUE NOT NULL
#     )
# """)
# conn.commit()

# cur.execute(
#     "INSERT INTO users (username, email) VALUES (%s, %s)",
#     ("Kerols", "kerols@example.com")
# )
# conn.commit()
