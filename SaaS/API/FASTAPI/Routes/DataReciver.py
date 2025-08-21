from fastapi import APIRouter , Body
from fastapi import HTTPException
from Models.UserModel import UserModel, AdminModel

router = APIRouter(
    prefix="/data_receiver",
    tags=["data_receiver"],
    responses={404: {"description": "Not found"}}
)

@router.get("/")
def Message():
    return {"message": "Data Receiver Endpoint has been reached"}


@router.post("/User_Data")
def read_data(UserData: UserModel = Body(...)):
    if not UserData:
        raise HTTPException(status_code=404, detail="Admin Data not found")
    return {"message": "User Data has been received", "UserData": UserData}


@router.post("/Admin_Data")
def read_data(AdminData: AdminModel = Body(...)):
    if not AdminData:
        raise HTTPException(status_code=404, detail="Admin Data not found")
    return {"message": "Admin Data has been received","AdminData": AdminData}
    

@router.get("/Verfiy_Email")
def verify_Email(email: str):
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    # Here you would typically check the email in your database

    return {"message": "Email verification endpoint reached", "email": email}
