# 🚀 Deployment Guide - SmartToDo App

This guide will help you deploy your backend so clients can use the app from anywhere.

## 📋 Prerequisites

1. GitHub account (to push your code)
2. MongoDB Atlas account (free cloud database)
3. Render.com account (free backend hosting)

---

## Part 1: Setup MongoDB Atlas (Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster (choose the FREE tier - M0)

### Step 2: Configure Database Access
1. In MongoDB Atlas, go to **Database Access**
2. Click **Add New Database User**
3. Create a username and password (save these!)
4. Set privileges to **Read and write to any database**

### Step 3: Configure Network Access
1. Go to **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Confirm

### Step 4: Get Connection String
1. Go to **Database** → **Connect**
2. Choose **Connect your application**
3. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`)
4. Replace `<password>` with your actual password
5. Add your database name at the end: `mongodb+srv://username:password@cluster.mongodb.net/smarttodo?retryWrites=true&w=majority`

---

## Part 2: Deploy Backend to Render.com

### Step 1: Push Code to GitHub
```bash
cd /Users/gaurav/Desktop/Practice/backend
git init
git add .
git commit -m "Initial commit - SmartToDo backend"
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/smarttodo-backend.git
git push -u origin main
```

### Step 2: Deploy on Render.com
1. Go to [https://render.com](https://render.com) and sign up
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `smarttodo-backend` (or any name you prefer)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: Free

### Step 3: Add Environment Variables
In Render dashboard, add these environment variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string from Part 1 |
| `JWT_SECRET` | A random secure string (e.g., `my-super-secret-jwt-key-2024`) |
| `PORT` | `3000` |
| `NODE_ENV` | `production` |

### Step 4: Deploy
1. Click **Create Web Service**
2. Wait for deployment to complete (5-10 minutes)
3. Copy your app URL (e.g., `https://smarttodo-backend.onrender.com`)

---

## Part 3: Update React Native App

### Step 1: Update API Configuration
1. Open `/Users/gaurav/Desktop/Practice/src/config/api.config.ts`
2. Replace `PRODUCTION_API_URL` with your Render URL:
   ```typescript
   const PRODUCTION_API_URL = 'https://smarttodo-backend.onrender.com';
   ```

### Step 2: Build Release APK
```bash
cd /Users/gaurav/Desktop/Practice/android
./gradlew assembleRelease
```

### Step 3: Install on Any Device
The APK will be at:
```
/Users/gaurav/Desktop/Practice/android/app/build/outputs/apk/release/app-release.apk
```

Now your app will work on ANY device, ANYWHERE in the world! 🌍

---

## 🔧 Alternative Hosting Options

### Railway.app (Also Free)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Add MongoDB Atlas connection string as environment variable
4. Deploy automatically

### Heroku (Paid but Reliable)
1. Install Heroku CLI
2. `heroku create smarttodo-backend`
3. `heroku config:set MONGODB_URI=your-connection-string`
4. `git push heroku main`

---

## 📱 Testing Your Deployment

### Test Backend
Visit your Render URL in a browser:
```
https://your-app-name.onrender.com
```

You should see a response from your API.

### Test from App
1. Install the new APK on your phone
2. Try to register/login
3. Create a task
4. Verify it syncs with the cloud database

---

## 🐛 Troubleshooting

### Backend not starting?
- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure MongoDB connection string is correct

### App can't connect?
- Verify the PRODUCTION_API_URL in `api.config.ts`
- Check if backend is running (visit URL in browser)
- Ensure you rebuilt the APK after changing the URL

### Database connection failed?
- Check MongoDB Atlas network access allows all IPs
- Verify username/password in connection string
- Ensure database user has read/write permissions

---

## 💡 Important Notes

1. **Free Tier Limitations**:
   - Render free tier: Server sleeps after 15 minutes of inactivity (first request takes ~30 seconds)
   - MongoDB Atlas free tier: 512MB storage limit

2. **Security**:
   - Never commit `.env` files to GitHub
   - Use strong JWT secrets in production
   - Keep your MongoDB credentials secure

3. **Updates**:
   - Push changes to GitHub
   - Render will auto-deploy on new commits
   - Rebuild and redistribute APK if API changes

---

## 🎉 You're Done!

Your app is now production-ready and can be used by anyone, anywhere!
