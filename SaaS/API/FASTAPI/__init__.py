from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Routes.DataReciver import router as data_receiver_router  # check spelling: Reciver vs Receiver
from DB.DB import router as db_router
from dotenv import load_dotenv
import os
import uvicorn


load_dotenv()

# Get origins from env and split into list
origins = os.getenv("origins", "").split(",") if os.getenv("origins") else []

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def welcome_message():
    return {"message": "welcome to the DOM Leads Extractor Python API Main Route"}

# ✅ Correct include
app.include_router(data_receiver_router)
app.include_router(db_router)

if __name__ == "__main__":

    print("API is running")
    uvicorn.run("fastAPI.__init__:app", host="0.0.0.0", port=8000, reload=True)

# uvicorn __init__:app --reload
