from pydantic import BaseModel

class UserModel(BaseModel):
    username: str
    email: str
    name: str | None = None
    is_admin: bool = False
    phone: int
    address: str
    password: str

class AdminModel(BaseModel):
    username: str
    email: str
    name: str | None = None
    is_admin: bool = True
    phone: int
    address: str
    password: str
    