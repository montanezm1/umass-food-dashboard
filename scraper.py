from bs4 import BeautifulSoup
import requests
from datetime import date

DINING_HALL_URLS = {
    "Worcester": "https://umassdining.com/locations-menus/worcester/menu",
    "Franklin": "https://umassdining.com/locations-menus/franklin/menu",
    "Berkshire": "https://umassdining.com/locations-menus/berkshire/menu",
    "Hampshire": "https://umassdining.com/locations-menus/hampshire/menu",
}

MEAL_IDS = {
    "Breakfast": "breakfast_menu",
    "Lunch": "lunch_menu",
    "Dinner": "dinner_menu",
    "Late Night": "latenight_menu",
    "Grab n Go": "grabngo",
}

def scrape_all_halls():
    all_food_items = []
    today = date.today()
    
    for hall_name, url in DINING_HALL_URLS.items():
        response = requests.get(url)
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        for meal_name, div_id in MEAL_IDS.items():
            meal_div = soup.find("div", id=div_id)
            if not meal_div:
                continue
            
            for li in meal_div.find_all("li", class_="lightbox-nutrition"):
                a_tag = li.find("a")
                if not a_tag:
                    continue
                
                food = {
                    "hall": hall_name,
                    "menu_date": today.isoformat(),
                    "meal": meal_name,
                    "name": a_tag.get("data-dish-name"),
                    "calories": a_tag.get("data-calories"),
                    "serving_size": a_tag.get("data-serving-size"),
                    "total_fat": a_tag.get("data-total-fat"),
                    "protein": a_tag.get("data-protein"),
                    "carbs": a_tag.get("data-total-carb"),
                    "sodium": a_tag.get("data-sodium"),
                    "ingredients": a_tag.get("data-ingredient-list"),
                    "allergens": a_tag.get("data-allergens"),
                }
                all_food_items.append(food)
    
    return all_food_items

# Example usage
if __name__ == "__main__":
    foods = scrape_all_halls()
    print(foods[1])
