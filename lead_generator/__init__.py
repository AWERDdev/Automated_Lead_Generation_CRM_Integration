from fastapi import FastAPI
from Routes.DOMLeadsRoute import router

app = FastAPI()

@app.get('/')
def welcome_message():
    return{"message":"welcome to the DOM Leads Extractor Python API Main Route"}

app.include_router(router)
# This will execute when the script is run directly

if __name__ == "__main__":
    print("API is running")
# uvicorn __init__:app --reload