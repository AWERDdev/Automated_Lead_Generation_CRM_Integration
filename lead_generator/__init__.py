from fastapi import FastAPI
from Routes.DOMLeadsRoute import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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