import { useState, useEffect } from "react";
import "./App.css"; // We'll add some styles

function App() {
  const [menus, setMenus] = useState([]);
  const [hall, setHall] = useState("");
  const [meal, setMeal] = useState("");
  const [station, setStation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dailyLog, setDailyLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const HALLS = ["Worcester", "Franklin", "Berkshire", "Hampshire"];
  const MEALS = ["Breakfast", "Lunch", "Dinner", "Late Night", "Grab n Go"];
  
  // Get unique stations from the menu data, filtered by selected hall and meal
  const getAvailableStations = () => {
    let filteredMenus = menus;
    
    // Filter by hall if selected
    if (hall !== "") {
      filteredMenus = filteredMenus.filter(item => item.hall === hall);
    }
    
    // Filter by meal if selected
    if (meal !== "") {
      filteredMenus = filteredMenus.filter(item => item.meal === meal);
    }
    
    // Get unique stations from filtered data
    return [...new Set(filteredMenus.map(item => item.station).filter(Boolean))].sort();
  };
  
  const stations = getAvailableStations();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use environment variable for API URL, fallback to localhost for development
        const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
        const response = await fetch(`${API_URL}/menus`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch menus');
        }
        
        const data = await response.json();
        setMenus(data.menus || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching menus:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // Reset station when hall or meal changes if the current station is no longer available
  useEffect(() => {
    if (menus.length > 0) {
      let filteredMenus = menus;
      
      // Filter by hall if selected
      if (hall !== "") {
        filteredMenus = filteredMenus.filter(item => item.hall === hall);
      }
      
      // Filter by meal if selected
      if (meal !== "") {
        filteredMenus = filteredMenus.filter(item => item.meal === meal);
      }
      
      // Get unique stations from filtered data
      const availableStations = [...new Set(filteredMenus.map(item => item.station).filter(Boolean))];
      
      if (station !== "" && !availableStations.includes(station)) {
        setStation("");
      }
    }
  }, [hall, meal, menus, station]);

  const filteredMenus = menus.filter((item) => {
    return (
      (hall === "" || item.hall === hall) &&
      (meal === "" || item.meal === meal) &&
      (station === "" || item.station === station) &&
      (searchTerm === "" || item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const addToLog = (food, quantity = 1) => {
    const foodWithQuantity = {
      ...food,
      quantity: quantity,
      // Multiply nutrition values by quantity
      calories: (parseFloat(food.calories || 0) * quantity).toString(),
      protein: food.protein ? `${(parseFloat(food.protein.replace('g', '')) * quantity).toFixed(1)}g` : '0g',
      carbs: food.carbs ? `${(parseFloat(food.carbs.replace('g', '')) * quantity).toFixed(1)}g` : '0g',
      total_fat: food.total_fat ? `${(parseFloat(food.total_fat.replace('g', '')) * quantity).toFixed(1)}g` : '0g',
    };
    setDailyLog([...dailyLog, foodWithQuantity]);
  };

  const removeFromLog = (index) => {
    const updatedLog = [...dailyLog];
    updatedLog.splice(index, 1);
    setDailyLog(updatedLog);
  };

  const totals = dailyLog.reduce(
    (acc, food) => {
      acc.calories += parseFloat(food.calories || 0);
      acc.protein += parseFloat(food.protein || 0);
      acc.carbs += parseFloat(food.carbs || 0);
      acc.fat += parseFloat(food.total_fat || 0);
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const clearAllFilters = () => {
    setHall("");
    setMeal("");
    setStation("");
    setSearchTerm("");
  };

  const hasActiveFilters = hall || meal || station || searchTerm;

  return (
    <div className="App">
      <header className="app-header">
        <h1>UMass Dining Menu Tracker</h1>
        <p className="app-subtitle">Find and track your meals across all UMass dining halls</p>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <select value={hall} onChange={(e) => setHall(e.target.value)}>
          <option value="">All Dining Halls</option>
          {HALLS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select value={meal} onChange={(e) => setMeal(e.target.value)}>
          <option value="">All Meals</option>
          {MEALS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select value={station} onChange={(e) => setStation(e.target.value)}>
          <option value="">All Stations</option>
          {stations.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="stats-bar">
        <div className="results-count">
          {filteredMenus.length} {filteredMenus.length === 1 ? 'item' : 'items'} found
        </div>
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="clear-filters">
            Clear Filters
          </button>
        )}
      </div>

      <div className="main-content">
        {/* Daily Log Sidebar */}
        <div className="sidebar">
          {dailyLog.length > 0 && (
            <div className="totals">
              <h3>Daily Totals</h3>
              <div className="nutrition-boxes">
                <div className="nutrition-box calories">
                  <span className="nutrition-label">Calories</span>
                  <span className="nutrition-value">{totals.calories.toFixed(0)}</span>
                </div>
                <div className="nutrition-box carbs">
                  <span className="nutrition-label">Carbs</span>
                  <span className="nutrition-value">{totals.carbs.toFixed(1)}g</span>
                </div>
                <div className="nutrition-box protein">
                  <span className="nutrition-label">Protein</span>
                  <span className="nutrition-value">{totals.protein.toFixed(1)}g</span>
                </div>
                <div className="nutrition-box fat">
                  <span className="nutrition-label">Fat</span>
                  <span className="nutrition-value">{totals.fat.toFixed(1)}g</span>
                </div>
              </div>
            </div>
          )}

          <div className="daily-log">
            <h2>Daily Log ({dailyLog.length} items)</h2>
            {dailyLog.length > 0 ? (
              <div className="log-grid">
                {dailyLog.map((food, index) => (
                  <div key={index} className="log-card">
                    <div className="log-item-info">
                      <h4>{food.name}</h4>
                      <p className="serving-info">
                        <span className="quantity-badge">{food.quantity || 1}x</span>
                        {food.serving_size && <span className="serving-size">({food.serving_size} each)</span>}
                      </p>
                      <p className="nutrition-summary">{food.calories} Cal | {food.protein} Protein | {food.carbs} Carbs | {food.total_fat} Fat</p>
                    </div>
                    <button onClick={() => removeFromLog(index)} className="remove-button">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-log">
                <p>Add items from the menu to track your daily intake</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Content */}
        <div className="content">
          {loading ? (
            <div className="loading">
              <h3>Loading menu data...</h3>
            </div>
          ) : error ? (
            <div className="empty-state">
              <h3>Error loading menus</h3>
              <p>{error}</p>
              <p>Make sure your backend server is running on port 8000</p>
            </div>
          ) : (
            <div className="menu-grid">
              {filteredMenus.length > 0 ? (
                filteredMenus.map((food, index) => (
                  <div key={index} className="food-card">
                    <h3>{food.name}</h3>
                    <div className="food-info">
                      <span className={`info-tag hall-tag hall-${food.hall?.toLowerCase().replace(/\s+/g, '-')}`}>{food.hall}</span>
                      <span className={`info-tag meal-tag meal-${food.meal?.toLowerCase()}`}>{food.meal}</span>
                      <span className="info-tag station-tag">{food.station}</span>
                    </div>
                    {food.serving_size && (
                      <p className="serving-size-text">Serving Size: {food.serving_size}</p>
                    )}
                    <div className="nutrition-boxes">
                      <div className="nutrition-box calories">
                        <span className="nutrition-label">Calories</span>
                        <span className="nutrition-value">{food.calories || 0}</span>
                      </div>
                      <div className="nutrition-box carbs">
                        <span className="nutrition-label">Carbs</span>
                        <span className="nutrition-value">{food.carbs || '0g'}</span>
                      </div>
                      <div className="nutrition-box protein">
                        <span className="nutrition-label">Protein</span>
                        <span className="nutrition-value">{food.protein || '0g'}</span>
                      </div>
                      <div className="nutrition-box fat">
                        <span className="nutrition-label">Fat</span>
                        <span className="nutrition-value">{food.total_fat || '0g'}</span>
                      </div>
                    </div>
                    <div className="quantity-section">
                      <div className="quantity-controls">
                        <label htmlFor={`quantity-${index}`} className="quantity-label">
                          Servings:
                        </label>
                        <select 
                          id={`quantity-${index}`}
                          className="quantity-select"
                          defaultValue="1"
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <button 
                        onClick={() => {
                          const quantity = parseInt(document.getElementById(`quantity-${index}`).value);
                          addToLog(food, quantity);
                        }} 
                        className="add-button"
                      >
                        Add to Daily Log
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <h3>No items found</h3>
                  <p>Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
