from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scraper import scrape_all_halls  # import your scraper

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in production, restrict this
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/menus")
def get_menus():
    foods = scrape_all_halls()
    return {"menus": foods}

@app.get("/menus/{hall_name}")
def get_hall_menu(hall_name: str):
    foods = [f for f in scrape_all_halls() if f["hall"].lower() == hall_name.lower()]
    return {"menus": foods}
