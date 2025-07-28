from fastapi import FastAPI
from Routes.DOMLeadsRoute import router
app = FastAPI()

# This will execute when the script is run directly
if __name__ == "__main__":
    print("API is running")
# uvicorn lead_generator:app --reload