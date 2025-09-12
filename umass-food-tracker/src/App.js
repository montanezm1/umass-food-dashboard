import { useState, useEffect } from "react";
import "./App.css"; // We'll add some styles

function App() {
  const [menus, setMenus] = useState([]);
  const [hall, setHall] = useState("");
  const [meal, setMeal] = useState("");
  const [dailyLog, setDailyLog] = useState([]);

  const HALLS = ["Worcester", "Franklin", "Berkshire", "Hampshire"];
  const MEALS = ["Breakfast", "Lunch", "Dinner", "Late Night", "Grab n Go"];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/menus")
      .then((res) => res.json())
      .then((data) => setMenus(data.menus));
  }, []);

  const filteredMenus = menus.filter((item) => {
    return (
      (hall === "" || item.hall === hall) &&
      (meal === "" || item.meal === meal)
    );
  });

  const addToLog = (food) => {
    setDailyLog([...dailyLog, food]);
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

  return (
    <div className="App">
      <h1>UMass Dining Menu Tracker</h1>

      <div className="filters">
        <select value={hall} onChange={(e) => setHall(e.target.value)}>
          <option value="">Select Dining Hall</option>
          {HALLS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select value={meal} onChange={(e) => setMeal(e.target.value)}>
          <option value="">Select Meal</option>
          {MEALS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <h2>Menu</h2>
      <div className="menu-grid">
        {filteredMenus.map((food, index) => (
          <div key={index} className="food-card">
            <h3>{food.name}</h3>
            <p>
              <strong>Meal:</strong> {food.meal}
            </p>
            <p>
              <strong>Calories:</strong> {food.calories} cal
            </p>
            <button onClick={() => addToLog(food)}>Add to Daily Log</button>
          </div>
        ))}
      </div>

      <h2>Daily Log</h2>
      <div className="log-grid">
        {dailyLog.map((food, index) => (
          <div key={index} className="log-card">
            <h4>{food.name}</h4>
            <p>{food.calories} cal | {food.protein}g P | {food.carbs}g C | {food.total_fat}g F</p>
            <button onClick={() => removeFromLog(index)}>Remove</button>
          </div>
        ))}
      </div>

      <h3>Totals</h3>
      <p>Calories: {totals.calories.toFixed(1)}</p>
      <p>Protein: {totals.protein.toFixed(1)}g</p>
      <p>Carbs: {totals.carbs.toFixed(1)}g</p>
      <p>Fat: {totals.fat.toFixed(1)}g</p>
    </div>
  );
}

export default App;
