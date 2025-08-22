from fastapi import APIRouter
from DB.Modules.DBSetup import connect_DB, enable_pgcrypto,enable_citext, enable_pg_trgm
from DB.Modules.UserConfig import create_table_Users
from DB.Modules.AdminConfig import create_table_Admin

router = APIRouter(
    prefix="/db_setup",
    tags=["db_setup"],
    responses={404: {"description": "Not found"}}
)
@router.get("/")
def DBMessage():
    return {"message": "Database Setup Endpoint has been reached"}

@router.get("/Setup")
def SetupDB():
    
    conn = connect_DB()
    enable_pgcrypto(conn)
    enable_citext(conn)
    enable_pg_trgm(conn)
    create_table_Users(conn)
    create_table_Admin(conn)
    conn.close()
    
    print("Database setup completed successfully.")
    return {"message": "Database setup completed successfully."}
    