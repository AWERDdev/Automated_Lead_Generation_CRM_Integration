from fastapi import FastAPI
from Routes.DOMLeadsRoute import router
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins= os.load_dotenv("origins"),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def welcome_message():
    return{"message":"welcome to the DOM Leads Extractor Python API Main Route"}

app.include_router(router)
# This will execute when the script is run directly

if __name__ == "__main__":
    print("API is running")
# uvicorn __init__:app --reload