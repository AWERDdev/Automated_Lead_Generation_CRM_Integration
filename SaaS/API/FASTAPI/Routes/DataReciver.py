from fastapi import APIRouter
from fastapi import HTTPException
from Models.UserModel import UserModel, AdminModel

router = APIRouter(
    prefix="/data_receiver",
    tags=["Data Receiver"],
    responses={404: {"description": "Not found"}}
)

router.get("/")
def Message():
    return {"message": "Data Receiver Endpoint has been reached"}

@router.post("/User_Data")
def read_data(UserData: UserModel):
    if not UserData:
        raise HTTPException(status_code=404, detail="Admin Data not found")
    return {"message": "User Data has been received", "UserData": UserData}

@router.post("/Admin_Data")
def read_data(AdminData: AdminModel):
    if not AdminData:
        raise HTTPException(status_code=404, detail="Admin Data not found")
    return {"message": "Admin Data has been received","AdminData": AdminData}
    
