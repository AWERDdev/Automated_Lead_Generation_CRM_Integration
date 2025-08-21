from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Routes.DataReciver import router as data_receiver_router

from dotenv import load_dotenv
import os
load_dotenv()

# Get origins from env and split into list
origins = os.getenv("origins").split(",")


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def welcome_message():
    return{"message":"welcome to the DOM Leads Extractor Python API Main Route"}

app.include_router(data_receiver_router)

if __name__ == "__main__":
    print("API is running")
# uvicorn __init__:app --reload