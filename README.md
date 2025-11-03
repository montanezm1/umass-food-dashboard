# UMass Food Dashboard

A modern, responsive web application that helps UMass students find and track food across all dining halls. Built with React frontend and FastAPI backend.

![UMass Food Dashboard](https://img.shields.io/badge/UMass-Food%20Finder-8b1538?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat-square&logo=react)
![Python](https://img.shields.io/badge/Python-FastAPI-00a86b?style=flat-square&logo=python)

**Live App**: https://umass-food-dashboard.vercel.app/

## ✨ Features

- **Search**: Find food items across all dining halls instantly
- **Multi-Hall Support**: Worcester, Franklin, Berkshire, and Hampshire dining halls
- **Meal Filtering**: Filter by Breakfast, Lunch, Dinner, Late Night, and Grab n Go
- **Station Categories**: Browse by food stations (Grill, Pizza, Sushi, etc.)
- **Nutrition Tracking**: Track calories, protein, carbs, and fat
- **Daily Log**: Keep track of your daily food intake
- **⚡ Real-time Data**: Fresh menu data scraped directly from UMass dining

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the backend server**
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

## 🧰 Technologies Used

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **BeautifulSoup4**: HTML parsing for web scraping
- **Requests**: HTTP library for fetching dining hall pages
- **Python**: Backend logic and data processing

### Frontend
- **React**: Modern React with hooks and functional components
- **CSS**: Responsive layout system, consistent theming and easy customization

---

**Created by**: Michael Montanez

