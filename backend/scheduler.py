"""
Menu Cache Scheduler
Automatically refreshes menu cache every few hours
"""

import time
import schedule
from database import db
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def refresh_menu_cache():
    """Refresh the menu cache"""
    logger.info("Scheduled menu cache refresh starting...")
    try:
        menus = db.force_refresh()
        logger.info(f"Successfully refreshed cache with {len(menus)} items")
    except Exception as e:
        logger.error(f"Failed to refresh menu cache: {e}")

def main():
    """Run the scheduler"""
    logger.info("Starting menu cache scheduler...")
    
    # Schedule updates every 3 hours
    schedule.every(3).hours.do(refresh_menu_cache)
    
    # Also schedule specific times (useful for daily menu updates)
    schedule.every().day.at("06:00").do(refresh_menu_cache)  # Morning refresh
    schedule.every().day.at("11:00").do(refresh_menu_cache)  # Lunch prep
    schedule.every().day.at("16:00").do(refresh_menu_cache)  # Dinner prep
    
    # Initial refresh
    refresh_menu_cache()
    
    # Keep running
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

if __name__ == "__main__":
    main()