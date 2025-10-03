import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
import os
import logging

# --------------------
# Load environment variables
# --------------------
load_dotenv()

# --------------------
# Logging setup
# --------------------
logging.basicConfig(level=logging.DEBUG)


def database_exists(dbname: str) -> bool:
    """Check if a database exists in Postgres."""
    logging.debug(f"Checking if database '{dbname}' exists...")

    conn = None
    try:
        conn = psycopg2.connect(
            host=os.getenv("host"),
            dbname=os.getenv("dbname"),  # default DB (usually 'postgres')
            user=os.getenv("user"),
            password=os.getenv("password"),
        )
        conn.autocommit = True

        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM pg_database WHERE datname=%s", (dbname,))
            exists = cur.fetchone() is not None

        logging.info(f"Database '{dbname}' exists: {exists}")
        return exists

    except Exception as e:
        logging.exception("Error while checking database existence")
        raise e
    finally:
        if conn:
            conn.close()


def create_database(dbname: str) -> bool:
    """Create a new database if it does not already exist."""
    if database_exists(dbname):
        logging.info(f"Database '{dbname}' already exists, skipping creation.")
        return False

    conn = None
    try:
        conn = psycopg2.connect(
            host=os.getenv("host"),
            dbname=os.getenv("dbname"),  # default DB (postgres)
            user=os.getenv("user"),
            password=os.getenv("password"),
        )
        conn.autocommit = True

        with conn.cursor() as cur:
            cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(dbname)))

        logging.info(f"Database '{dbname}' created successfully.")
        return True

    except Exception as e:
        logging.exception("Error while creating database")
        raise e
    finally:
        if conn:
            conn.close()


def connect_DB(dbname: str = "LeadGenerator"):
    """Ensure the database exists, then connect to it."""
    logging.debug(f"Connecting to database '{dbname}'...")
    create_database(dbname)

    try:
        conn = psycopg2.connect(
            host=os.getenv("host"),
            dbname=dbname,
            user=os.getenv("user"),
            password=os.getenv("password"),
        )
        logging.info(f"Connected to database '{dbname}' successfully.")
        return conn
    except Exception as e:
        logging.exception(f"Failed to connect to database '{dbname}'")
        raise e


def enable_pgcrypto(conn):
    """Enable pgcrypto extension."""
    logging.debug("Enabling extension: pgcrypto")
    with conn.cursor() as cur:
        cur.execute('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')
        conn.commit()
    logging.info("Extension 'pgcrypto' enabled.")


def enable_citext(conn):
    """Enable citext extension."""
    logging.debug("Enabling extension: citext")
    with conn.cursor() as cur:
        cur.execute('CREATE EXTENSION IF NOT EXISTS "citext";')
        conn.commit()
    logging.info("Extension 'citext' enabled.")


def enable_pg_trgm(conn):
    """Enable pg_trgm extension."""
    logging.debug("Enabling extension: pg_trgm")
    with conn.cursor() as cur:
        cur.execute('CREATE EXTENSION IF NOT EXISTS "pg_trgm";')
        conn.commit()
    logging.info("Extension 'pg_trgm' enabled.")
