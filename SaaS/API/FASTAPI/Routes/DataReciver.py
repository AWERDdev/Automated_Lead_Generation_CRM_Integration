from fastapi import APIRouter, Body, HTTPException
from psycopg2.errors import UniqueViolation
from Models.UserModel import UserModel, AdminModel
from DB.Modules.DBSetup import connect_DB
from DB.Modules.UserConfig import insert_User, search_User
from DB.Modules.AdminConfig import insert_Admin, search_Admin
import logging

# --------------------
# Logging
# --------------------
logging.basicConfig(level=logging.DEBUG)

# --------------------
# Router Setup
# --------------------
router = APIRouter(
    prefix="/data_receiver",
    tags=["data_receiver"],
    responses={404: {"description": "Not found"}},
)

# --------------------
# Routes
# --------------------
@router.get("/")
def message():
    return {"message": "Data Receiver Endpoint has been reached"}


# --------------------
# User Data Insert
# --------------------
@router.post("/User_Data")
async def insert_user_data(UserData: UserModel = Body(...)):
    if not UserData:
        raise HTTPException(status_code=404, detail="User Data not found")

    try:
        print("📩 User data has been received")
        logging.debug(f"Received user data: {UserData}")

        print("🔌 Connecting to DB")
        conn = connect_DB()
        logging.debug("DB connection created")

        print("📥 Inserting User Data")
        User_ID = insert_User(
            conn,
            UserData.name,
            UserData.email,
            UserData.phone,
            UserData.address,
            UserData.password,
            UserData.is_admin,
            UserData.username,
        )
        logging.debug(f"Inserted User ID: {User_ID}")

        print("✅ User Data inserted")
        conn.close()
        print("🔒 Connection closed")

        return {"message": "User data saved successfully", "UserID": User_ID}

    except UniqueViolation:
        if conn:
            conn.rollback()
            conn.close()
        raise HTTPException(
            status_code=400,
            detail="Duplicate field error: one of email, username, or phone already exists.",
        )
    except Exception as e:
        if conn:
            conn.rollback()
            conn.close()
        raise HTTPException(status_code=500, detail=str(e))


# --------------------
# Admin Data Insert
# --------------------
@router.post("/Admin_Data")
async def insert_admin_data(AdminData: AdminModel = Body(...)):
    if not AdminData:
        raise HTTPException(status_code=404, detail="Admin Data not found")

    conn = None
    try:
        print("📩 Admin data has been received")

        print("🔌 Connecting to DB")
        conn = connect_DB()

        print("📥 Inserting Admin Data")
        Admin_ID = insert_Admin(
            conn,
            AdminData.name,
            AdminData.email,
            AdminData.phone,
            AdminData.address,
            AdminData.password,
            AdminData.is_admin,
            AdminData.username,
        )

        print("✅ Admin Data inserted")
        conn.close()
        print("🔒 Connection closed")

        return {"message": "Admin data saved successfully", "AdminID": Admin_ID}

    except UniqueViolation:
        if conn:
            conn.rollback()
            conn.close()
        raise HTTPException(
            status_code=400,
            detail="Duplicate field error: one of email, username, or phone already exists.",
        )
    except Exception as e:
        if conn:
            conn.rollback()
            conn.close()
        raise HTTPException(status_code=500, detail=str(e))


# --------------------
# Verify User
# --------------------
@router.get("/Verfiy_Data_user")
async def verify_user(email: str = None):
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    conn = None
    try:
        print(f"🔍 Verifying user data for email: {email}")
        conn = connect_DB()
        print("🔌 DB connected")

        user = search_User(conn, email=email)
        conn.close()
        print("🔒 Connection closed")

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user[0]  # first match

    except Exception as e:
        if conn:
            conn.close()
        raise HTTPException(status_code=500, detail=str(e))


# --------------------
# Verify Admin
# --------------------
@router.get("/Verfiy_Data_admin")
async def verify_admin(email: str = None):
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")

    conn = None
    try:
        print(f"🔍 Verifying admin data for email: {email}")
        conn = connect_DB()
        print("🔌 DB connected")

        admin = search_Admin(conn, email=email)
        conn.close()
        print("🔒 Connection closed")

        if not admin:
            raise HTTPException(status_code=404, detail="Admin not found")

        return admin[0]  # first match

    except Exception as e:
        if conn:
            conn.close()
        raise HTTPException(status_code=500, detail=str(e))
