from fastapi import APIRouter
from fastapi import HTTPException

router = APIRouter(
    prefix="/data_receiver",
    tags=["Data Receiver"],
    responses={404: {"description": "Not found"}}
)

router.get("/")
def Message():
    return {"message": "Data Receiver Endpoint has been reached"}

@router.post("/User_Data")
def read_data(UserData: dict):
    return {"message": "User Data has been received"}

@router.post("/Admin_Data")
def read_data(AdminData: dict):
    return {"message": "User Data has been received"}
