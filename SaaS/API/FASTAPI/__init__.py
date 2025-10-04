from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
import os

# --------------------
# Load environment variables
# --------------------
load_dotenv()

# Get allowed origins from .env (comma-separated)
origins = os.getenv("ORIGINS", "").split(",") if os.getenv("ORIGINS") else []

# --------------------
# App Initialization
# --------------------
app = FastAPI(
    title="DOM Leads Extractor API",
    description="FastAPI backend service for data handling",
    version="1.0.0",
)

# --------------------
# Middleware
# --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],  # fallback: allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------
# Routes
# --------------------
@app.get("/")
def welcome_message():
    return {"message": "Welcome to the DOM Leads Extractor Python API Main Route"}

# --------------------
# Health Check Route
# --------------------
@app.get("/db_health")
def db_health():
    from DB.Modules.DBSetup import connect_DB
    try:
        conn = connect_DB()
        conn.close()
        return {"status": "ok", "message": "Database connection successful"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# --------------------
# Routers

from Routes.DataReciver import router as data_receiver_router  # ✅ spelling fixed
from DB.DB import router as db_router

app.include_router(data_receiver_router)
app.include_router(db_router)

# --------------------
# Run (Dev Mode)
# --------------------
if __name__ == "__main__":
    print("✅ FastAPI service is running...")
    uvicorn.run(
        "fastAPI.__init__:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="info"
    )

# Alternative CLI:
# uvicorn __init__:app --reload
# uvicorn __init__:app --reload --log-level debug
# uvicorn __init__:app --host 0.0.0.0 --port 8000
