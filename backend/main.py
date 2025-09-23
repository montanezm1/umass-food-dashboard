from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import db
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="UMass Food Finder API",
    description="API for finding food across UMass dining halls",
    version="1.0.0"
)

# CORS middleware - configure for production
# Get allowed origins from environment variable, fallback to localhost for development
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/menus")
def get_menus():
    """Get all dining hall menus for today"""
    try:
        logger.info("Fetching all dining hall menus")
        foods = db.get_fresh_menus()
        return {"menus": foods, "count": len(foods)}
    except Exception as e:
        logger.error(f"Error fetching menus: {e}")
        return {"menus": [], "error": "Failed to fetch menus"}

@app.get("/menus/refresh")
def refresh_menus():
    """Force refresh the menu cache"""
    try:
        logger.info("Force refreshing menu cache")
        foods = db.force_refresh()
        return {"menus": foods, "count": len(foods), "message": "Cache refreshed"}
    except Exception as e:
        logger.error(f"Error refreshing menus: {e}")
        return {"menus": [], "error": "Failed to refresh menus"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)