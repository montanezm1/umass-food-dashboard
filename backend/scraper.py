from bs4 import BeautifulSoup
import requests
from datetime import date
import logging

logger = logging.getLogger(__name__)

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
    """Scrape all dining halls and return structured food data"""
    all_food_items = []
    today = date.today()
    
    for hall_name, url in DINING_HALL_URLS.items():
        try:
            logger.info(f"Scraping {hall_name} dining hall")
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, "html.parser")
        except requests.RequestException as e:
            logger.error(f"Failed to fetch {hall_name}: {e}")
            continue
        
        for meal_name, div_id in MEAL_IDS.items():
            meal_div = soup.find("div", id=div_id)
            if not meal_div:
                logger.debug(f"No {meal_name} menu found for {hall_name}")
                continue
            
            # Find all elements within the meal section
            current_station = "Other"  # default category
            
            # Look for all child elements in order
            for element in meal_div.find_all(['h2', 'li'], recursive=True):
                # Update current station when we hit an h2 with menu_category_name class
                if element.name == 'h2' and 'menu_category_name' in element.get('class', []):
                    current_station = element.get_text(strip=True)
                
                # Process food items
                elif element.name == 'li' and 'lightbox-nutrition' in element.get('class', []):
                    a_tag = element.find("a")
                    if not a_tag:
                        continue
                    
                    food = {
                        "hall": hall_name,
                        "menu_date": today.isoformat(),
                        "meal": meal_name,
                        "station": current_station,
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
