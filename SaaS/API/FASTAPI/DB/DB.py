from fastapi import APIRouter
from DB.Modules.DBSetup import connect_DB, enable_pgcrypto, enable_citext, enable_pg_trgm
from DB.Modules.UserConfig import create_table_Users
from DB.Modules.AdminConfig import create_table_Admin
import logging

# --------------------
# Logging
# --------------------
logging.basicConfig(level=logging.DEBUG)

# --------------------
# Router Setup
# --------------------
router = APIRouter(
    prefix="/db_setup",
    tags=["db_setup"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def db_message():
    return {"message": "Database Setup Endpoint has been reached"}


# --------------------
# DB Setup Route
# --------------------
# ⚠️ DB setup is a one-time operation
# In production, this should be handled with proper migrations
@router.get("/setup")
def setup_db():
    logging.info("🚀 Starting DB setup process")

    conn = None
    try:
        conn = connect_DB()
        logging.info("🔌 Connection to DB established")

        # Enable extensions
        enable_pgcrypto(conn)
        logging.info("✅ Extension 'pgcrypto' enabled")

        enable_citext(conn)
        logging.info("✅ Extension 'citext' enabled")

        enable_pg_trgm(conn)
        logging.info("✅ Extension 'pg_trgm' enabled")

        # Create tables
        create_table_Users(conn)
        logging.info("✅ Users table created")

        create_table_Admin(conn)
        logging.info("✅ Admin table created")

        conn.close()
        logging.info("🔒 DB connection closed")
        logging.info("🎉 Database setup completed successfully")

        return {"message": "Database setup completed successfully."}

    except Exception as e:
        if conn:
            conn.close()
            logging.error("⚠️ DB connection closed due to error")
        logging.exception("❌ Database setup failed")
        return {"error": str(e)}
