# UMass Food Finder 🍽️

A modern, responsive web application that helps UMass students find and track food across all dining halls. Built with React frontend and FastAPI backend.

![UMass Food Finder](https://img.shields.io/badge/UMass-Food%20Finder-8b1538?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat-square&logo=react)
![Python](https://img.shields.io/badge/Python-FastAPI-00a86b?style=flat-square&logo=python)

## ✨ Features

- **🔍 Smart Search**: Find food items across all dining halls instantly
- **🏛️ Multi-Hall Support**: Worcester, Franklin, Berkshire, and Hampshire dining halls
- **🍽️ Meal Filtering**: Filter by Breakfast, Lunch, Dinner, Late Night, and Grab n Go
- **🏪 Station Categories**: Browse by food stations (Grill, Pizza, Sushi, etc.)
- **📊 Nutrition Tracking**: Track calories, protein, carbs, and fat
- **📝 Daily Log**: Keep track of your daily food intake
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
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

## 🏗️ Project Structure

```
umass-food-finder/
├── main.py                 # FastAPI backend server
├── scraper.py             # Web scraping logic for dining halls
├── umass-food-tracker/    # React frontend application
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Modern styling with CSS variables
│   │   └── index.js       # React entry point
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## 🎨 Design Features

- **UMass Brand Colors**: Authentic maroon (#8b1538) color scheme
- **Modern UI**: Clean, card-based design with smooth animations
- **Responsive Grid**: Automatically adapts to different screen sizes
- **Smart Filtering**: Dynamic station filtering based on selected hall/meal
- **Loading States**: Proper loading indicators and error handling
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🧰 Technologies Used

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **BeautifulSoup4**: HTML parsing for web scraping
- **Requests**: HTTP library for fetching dining hall pages
- **Python**: Backend logic and data processing

### Frontend
- **React 19**: Modern React with hooks and functional components
- **CSS Grid & Flexbox**: Responsive layout system
- **CSS Variables**: Consistent theming and easy customization
- **Modern ES6+**: Clean, maintainable JavaScript

## 🚀 Deployment

### Option 1: Heroku (Backend) + Vercel (Frontend)

#### Backend (Heroku):
1. Create a Heroku app: `heroku create your-app-name`
2. Push to Heroku: `git push heroku main`
3. Your API will be available at `https://your-app-name.herokuapp.com`

#### Frontend (Vercel):
1. Build the frontend: `cd umass-food-tracker && npm run build`
2. Deploy to Vercel: `vercel --prod`
3. Update API URL in your React app to point to Heroku backend

### Option 2: Railway (Full Stack)
1. Connect your GitHub repo to Railway
2. Deploy backend: Point to the `backend/` folder
3. Deploy frontend: Point to the `frontend/` folder

### Option 3: DigitalOcean App Platform
1. Fork this repository
2. Create a new app in DigitalOcean
3. Connect your GitHub repo
4. Configure build settings for both backend and frontend

### Environment Variables
- No additional environment variables needed for basic deployment
- Update CORS origins in `backend/main.py` with your frontend domain

## 📁 **Project Structure**

```
umass-food-finder/
├── 📄 README.md          # Project documentation
├── 📄 LICENSE            # MIT license
├── 📁 backend/           # FastAPI Python backend
│   ├── main.py          # FastAPI server
│   ├── scraper.py       # Web scraping logic
│   ├── database.py      # SQLite caching system
│   ├── scheduler.py     # Background cache updates
│   ├── requirements.txt # Python dependencies
│   └── Procfile        # Heroku deployment config
└── 📁 frontend/         # React frontend application
    ├── package.json     # Node dependencies
    ├── public/          # Static files
    └── src/             # React source code
        ├── App.js       # Main component
        └── App.css      # Styling
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Created by**: Michael Montanez

