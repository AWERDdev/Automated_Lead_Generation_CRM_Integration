from fastapi import APIRouter , Body
from fastapi import HTTPException
from psycopg2.errors import UniqueViolation
from Models.UserModel import UserModel, AdminModel
from DB.Modules.DBSetup import connect_DB
from DB.Modules.UserConfig import insert_User
from DB.Modules.AdminConfig import insert_Admin

router = APIRouter(
    prefix="/data_receiver",
    tags=["data_receiver"],
    responses={404: {"description": "Not found"}}
)

@router.get("/")
def Message():
    return {"message": "Data Receiver Endpoint has been reached"}


@router.post("/User_Data")
async def read_data(UserData: UserModel = Body(...)):
    if not UserData:
        raise HTTPException(status_code=404, detail="Admin Data not found")
    try:
        print(F"user data has been received")
        print(" connecting to DB ")
        conn = connect_DB()
        print(" connection has been created ")
        print(" Inserting User Data ")
        User_ID = insert_User(conn, UserData.name, UserData.email, UserData.phone, UserData.address ,UserData.password , UserData.is_admin,UserData.username)
        print(" User Data has been inserted ")
        conn.close()
        print(" Connection has been closed ")
        print(User_ID)
        return {"message": "User data has been saved in the DB succesfully","UserID": User_ID}
    except UniqueViolation as e:
        # Postgres duplicate key error
        conn.rollback()
        conn.close()
        raise HTTPException(
            status_code=400,
            detail="Duplicate field error: one of email, username, or phone already exists."
        )
    except Exception as e:
        if conn:
            conn.rollback()
            conn.close()
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/Admin_Data")
async def read_data(AdminData: AdminModel = Body(...)):
    if not AdminData:
        raise HTTPException(status_code=404, detail="Admin Data not found")
    try:
        print(F"user data has been received")
        print(" connecting to DB ")
        conn = connect_DB()
        print(" connection has been created ")
        print(" Inserting User Data ")
        Admin_ID = insert_Admin(conn, AdminData.name, AdminData.email, AdminData.phone, AdminData.address ,AdminData.password , AdminData.is_admin,AdminData.username)
        print(" User Data has been inserted ")
        conn.close()
        print(" Connection has been closed ")
        return {"message": "User data has been saved in the DB succesfully","AdminID": Admin_ID}
    except UniqueViolation as e:
        # Postgres duplicate key error
        conn.rollback()
        conn.close()
        raise HTTPException(
            status_code=400,
            detail="Duplicate field error: one of email, username, or phone already exists."
        )
    except Exception as e:
        if conn:
            conn.rollback()
            conn.close()
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/Verfiy_Data")
def verify_Data(email: str, password: str):
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    # Here you would typically check the email in your database

    return {"message": "Email verification endpoint reached", "email": email}
