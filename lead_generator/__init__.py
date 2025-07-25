from fastapi import FastAPI

app = FastAPI()

# This will execute when the script is run directly
if __name__ == "__main__":
    print("API is running")
# uvicorn lead_generator:app --reload