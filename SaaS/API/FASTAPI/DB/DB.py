from fastapi import APIRouter
from Modules import DBSetup
from Modules import UserConfig
from Modules import AdminConfig

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
    
    conn = DBSetup.connect_DB()
    DBSetup.enable_pgcrypto(conn)
    UserConfig.create_table_Users(conn)
    AdminConfig.create_table_Admin(conn)
    conn.close()
    print("Database setup completed successfully.")
    return {"message": "Database setup completed successfully."}
    