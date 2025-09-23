import sqlite3
import json
from datetime import datetime, timedelta
from scraper import scrape_all_halls
import logging

logger = logging.getLogger(__name__)

class MenuDatabase:
    def __init__(self, db_path="menus.db"):
        self.db_path = db_path
        self.init_db()
    
    def init_db(self):
        """Initialize the database with required tables"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS menu_cache (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    data TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    expires_at TIMESTAMP NOT NULL
                )
            ''')
            conn.commit()
    
    def get_cached_menus(self):
        """Get menus from cache if not expired"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT data FROM menu_cache 
                WHERE expires_at > CURRENT_TIMESTAMP 
                ORDER BY created_at DESC 
                LIMIT 1
            ''')
            result = cursor.fetchone()
            
            if result:
                logger.info("Returning cached menu data")
                return json.loads(result[0])
            return None
    
    def cache_menus(self, menus, hours_to_cache=3):
        """Cache menu data for specified hours"""
        expires_at = datetime.now() + timedelta(hours=hours_to_cache)
        
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            # Clear old cache entries
            cursor.execute('DELETE FROM menu_cache')
            
            # Insert new cache
            cursor.execute('''
                INSERT INTO menu_cache (data, expires_at) 
                VALUES (?, ?)
            ''', (json.dumps(menus), expires_at))
            conn.commit()
            logger.info(f"Cached {len(menus)} menu items, expires at {expires_at}")
    
    def get_fresh_menus(self):
        """Get fresh menus, using cache if available, otherwise scrape"""
        # Try cache first
        cached_menus = self.get_cached_menus()
        if cached_menus:
            return cached_menus
        
        # Cache miss - scrape fresh data
        logger.info("Cache miss - scraping fresh menu data")
        try:
            fresh_menus = scrape_all_halls()
            self.cache_menus(fresh_menus)
            return fresh_menus
        except Exception as e:
            logger.error(f"Error scraping menus: {e}")
            # Return empty list or last known good data
            return []
    
    def force_refresh(self):
        """Force refresh the cache with new data"""
        logger.info("Force refreshing menu cache")
        try:
            fresh_menus = scrape_all_halls()
            self.cache_menus(fresh_menus)
            return fresh_menus
        except Exception as e:
            logger.error(f"Error force refreshing menus: {e}")
            return []

# Global database instance
db = MenuDatabase()