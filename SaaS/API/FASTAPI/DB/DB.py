from fastapi import APIRouter
from DB.Modules.DBSetup import connect_DB, enable_pgcrypto,enable_citext, enable_pg_trgm
from DB.Modules.UserConfig import create_table_Users
from DB.Modules.AdminConfig import create_table_Admin
import logging

router = APIRouter(
    prefix="/db_setup",
    tags=["db_setup"],
    responses={404: {"description": "Not found"}}
)
@router.get("/")
def DBMessage():
    return {"message": "Database Setup Endpoint has been reached"}
# DB setup is a one time run operation
# In a production environment, this should be handled with migrations
@router.get("/Setup")
def SetupDB():
    print('DB setup has been started')
    conn = connect_DB()
    print('creating connection')
    enable_pgcrypto(conn)
    print('Downloading extention pgcrypto')
    enable_citext(conn)
    print('Downloading extention citext')
    enable_pg_trgm(conn)
    print('Downloading extention pg trgm ')
    create_table_Users(conn)
    print('creating User Table')
    create_table_Admin(conn)
    print('creating Admin Table')
    conn.close()
    print('Closing connection')
    
    print("Database setup completed successfully.")
    return {"message": "Database setup completed successfully."}
    