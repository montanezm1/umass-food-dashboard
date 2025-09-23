# 🚀 Free Deployment Guide for UMass Food Finder

## Deployment Overview
- **Backend**: Railway (500 hours/month free)
- **Frontend**: Vercel (unlimited for personal projects)
- **Total Cost**: $0/month

## 📋 Prerequisites
- [GitHub account](https://github.com) (you already have this!)
- [Railway account](https://railway.app) (sign up with GitHub)
- [Vercel account](https://vercel.com) (sign up with GitHub)

---

## 🛤️ Step 1: Deploy Backend to Railway

### 1.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click "Login" and sign in with your GitHub account
3. Authorize Railway to access your repositories

### 1.2 Deploy the Backend
1. Click "New Project" in Railway dashboard
2. Select "Deploy from GitHub repo"
3. Choose `montanezm1/umass-food-finder`
4. Railway will automatically detect the Python backend
5. **Important**: Set these environment variables in Railway:
   - Go to your project → Variables tab
   - Add: `ALLOWED_ORIGINS` = `https://your-app-name.vercel.app` (you'll get this from Vercel)

### 1.3 Get Your Backend URL
- After deployment, Railway will give you a URL like: `https://your-app-name.up.railway.app`
- **Save this URL** - you'll need it for the frontend!

---

## ▲ Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and sign in with your GitHub account
3. Authorize Vercel to access your repositories

### 2.2 Deploy the Frontend
1. Click "New Project" in Vercel dashboard
2. Import `montanezm1/umass-food-finder`
3. **Important Configuration**:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend` 
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Environment Variables**:
   - Add: `REACT_APP_API_URL` = `https://your-railway-backend-url`
   - (Use the Railway URL from Step 1.3)

### 2.3 Get Your Frontend URL
- Vercel will give you a URL like: `https://umass-food-finder.vercel.app`
- **Go back to Railway** and update the `ALLOWED_ORIGINS` variable with this URL

---

## 🔄 Step 3: Update CORS Configuration

### 3.1 Update Railway Environment Variables
1. Go to Railway → Your Project → Variables
2. Update `ALLOWED_ORIGINS` to include your Vercel URL:
   ```
   ALLOWED_ORIGINS=https://your-app-name.vercel.app,http://localhost:3000
   ```
3. Save and redeploy if needed

---

## ✅ Step 4: Test Your Deployment

1. Visit your Vercel frontend URL
2. The app should load and display UMass dining hall menus
3. Test all features:
   - ✅ Search functionality
   - ✅ Dining hall/meal filtering
   - ✅ Station categorization
   - ✅ Add to daily log with serving sizes
   - ✅ Nutrition calculations

---

## 🎯 Quick Deploy Checklist

- [ ] Railway account created
- [ ] Backend deployed to Railway
- [ ] Railway backend URL saved
- [ ] Vercel account created  
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL saved
- [ ] CORS updated in Railway with Vercel URL
- [ ] Environment variables set correctly
- [ ] App tested and working

---

## 🔧 Troubleshooting

### Frontend shows "Failed to fetch menus"
- Check that `REACT_APP_API_URL` in Vercel points to your Railway URL
- Verify CORS is configured correctly in Railway

### Backend deployment fails
- Check that `requirements.txt` is in the backend folder
- Verify Railway is using the correct start command

### CORS errors
- Make sure `ALLOWED_ORIGINS` in Railway includes your exact Vercel URL
- Don't include trailing slashes in URLs

---

## 🚀 You're Live!

Once deployed, share your UMass Food Finder:
- **Live App**: `https://your-app-name.vercel.app`
- **API**: `https://your-app-name.up.railway.app`

**Free tier limits**:
- Railway: 500 hours/month (enough for most personal projects)
- Vercel: Unlimited for personal use
- Both auto-sleep when inactive to save resources

---

## 🔄 Future Updates

To update your app:
1. Make changes locally
2. Push to GitHub: `git push origin main`
3. Both Railway and Vercel will auto-deploy!

**Happy Dining Hall Hunting! 🍽️**