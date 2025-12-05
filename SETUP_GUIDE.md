# 🚀 SmartToDo - Complete Setup Guide

This guide will walk you through setting up both the React Native mobile app and NestJS backend from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)

### For Android Development
- **Android Studio** - [Download](https://developer.android.com/studio)
- **JDK 17** - Usually comes with Android Studio
- **Android SDK** (API 33 or higher)
- **Android Emulator** or physical device

### For iOS Development (macOS only)
- **Xcode** (v14 or higher) - [Download from App Store](https://apps.apple.com/us/app/xcode/id497799835)
- **CocoaPods** - Install with: \`sudo gem install cocoapods\`
- **iOS Simulator** or physical device

## 📱 Part 1: Mobile App Setup

### Step 1: Navigate to Project Directory
\`\`\`bash
cd /Users/gaurav/Desktop/Practice
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
npm install
\`\`\`

This will install all required packages including:
- React Navigation
- Redux Toolkit
- Axios
- React Native Vector Icons
- Date Picker
- And more...

### Step 3: iOS Setup (macOS only)
\`\`\`bash
cd ios
pod install
cd ..
\`\`\`

### Step 4: Link React Native Vector Icons

#### For Android:
The icons should auto-link. If you face issues, add this to \`android/app/build.gradle\`:

\`\`\`gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
\`\`\`

#### For iOS:
Already handled by CocoaPods.

### Step 5: Configure API URL

Edit \`src/services/api.ts\` and update the API_BASE_URL:

\`\`\`typescript
// For Android Emulator
export const API_BASE_URL = 'http://10.0.2.2:3000';

// For iOS Simulator
export const API_BASE_URL = 'http://localhost:3000';

// For Physical Device (replace with your computer's IP)
export const API_BASE_URL = 'http://192.168.1.XXX:3000';
\`\`\`

**To find your IP address:**
- **macOS:** \`ifconfig | grep "inet "\`
- **Windows:** \`ipconfig\`
- **Linux:** \`ip addr show\`

## 🖥 Part 2: Backend Setup

### Step 1: Navigate to Backend Directory
\`\`\`bash
cd backend
\`\`\`

### Step 2: Install Backend Dependencies
\`\`\`bash
npm install
\`\`\`

**Note:** The backend uses `@nestjs/config` to load environment variables from the `.env` file. This package should already be installed with the dependencies.

### Step 3: Setup MongoDB

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB:
   \`\`\`bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   # MongoDB should start automatically as a service
   \`\`\`

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Step 4: Configure Environment Variables

Create \`.env\` file in the backend directory:
\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\`:
\`\`\`env
PORT=3000

# For Local MongoDB
MONGODB_URI=mongodb://localhost:27017/smarttodo

# OR for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smarttodo?retryWrites=true&w=majority

# Generate a strong secret key
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
\`\`\`

**Generate a secure JWT secret:**
\`\`\`bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
\`\`\`

### Step 5: Build the Backend
\`\`\`bash
npm run build
\`\`\`

## 🏃‍♂️ Part 3: Running the Application

### Terminal 1: Start MongoDB (if using local)
\`\`\`bash
mongod
\`\`\`

### Terminal 2: Start Backend Server
\`\`\`bash
cd backend
npm run start:dev
\`\`\`

You should see:
\`\`\`
🚀 SmartToDo Backend is running on: http://localhost:3000
\`\`\`

### Terminal 3: Start React Native Metro Bundler
\`\`\`bash
# From project root
npm start
\`\`\`

### Terminal 4: Run the Mobile App

#### For Android:
\`\`\`bash
npm run android
\`\`\`

#### For iOS (macOS only):
\`\`\`bash
npm run ios
\`\`\`

## ✅ Verification

### Test Backend API
\`\`\`bash
curl http://localhost:3000/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
\`\`\`

You should get a response with an access_token.

### Test Mobile App
1. App should open with the Splash screen
2. Navigate to Login screen
3. Click "Sign Up" to create an account
4. After registration, you should see the Home screen

## 🐛 Common Issues & Solutions

### Issue 1: Metro Bundler Port Conflict
\`\`\`bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9
npm start
\`\`\`

### Issue 2: Android Build Fails
\`\`\`bash
cd android
./gradlew clean
cd ..
npm run android
\`\`\`

### Issue 3: iOS Build Fails
\`\`\`bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
\`\`\`

### Issue 4: "Unable to connect to backend"
- Ensure backend is running on port 3000
- Check API_BASE_URL in \`src/services/api.ts\`
- For physical devices, use your computer's local IP
- Ensure phone and computer are on the same WiFi network

### Issue 5: MongoDB Connection Error
- Check if MongoDB is running: \`mongod\`
- Verify MONGODB_URI in backend/.env
- For Atlas, whitelist your IP in Network Access

### Issue 6: Vector Icons Not Showing
\`\`\`bash
# Android
cd android && ./gradlew clean && cd ..
npm run android

# iOS
cd ios && pod install && cd ..
npm run ios
\`\`\`

## 📱 Testing on Physical Device

### Android:
1. Enable Developer Options on your phone
2. Enable USB Debugging
3. Connect phone via USB
4. Run: \`adb devices\` to verify connection
5. Run: \`npm run android\`

### iOS:
1. Open \`ios/Practice.xcworkspace\` in Xcode
2. Select your device from the device dropdown
3. Click Run (▶️) button

## 🎯 Quick Start Commands

### Full Setup (First Time)
\`\`\`bash
# Install mobile dependencies
npm install

# Install iOS pods (macOS only)
cd ios && pod install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..

# Create backend .env
cd backend && cp .env.example .env && cd ..
\`\`\`

### Daily Development
\`\`\`bash
# Terminal 1: Backend
cd backend && npm run start:dev

# Terminal 2: Metro
npm start

# Terminal 3: Run app
npm run android  # or npm run ios
\`\`\`

## 🔄 Reset Everything (Nuclear Option)
\`\`\`bash
# Clean mobile app
rm -rf node_modules
rm -rf ios/Pods
rm -rf ios/build
rm -rf android/build
rm -rf android/app/build
npm install
cd ios && pod install && cd ..

# Clean backend
cd backend
rm -rf node_modules
npm install
cd ..

# Clear Metro cache
npm start -- --reset-cache
\`\`\`

## 📊 Project Status Check

Run these commands to verify everything is set up correctly:

\`\`\`bash
# Check Node version (should be >= 18)
node --version

# Check npm version
npm --version

# Check if MongoDB is running
mongosh --eval "db.version()"

# Check React Native environment
npx react-native doctor

# Check backend dependencies
cd backend && npm list --depth=0

# Check mobile dependencies
npm list --depth=0
\`\`\`

## 🎉 Success!

If you've made it here, your SmartToDo app should be running! 

### Next Steps:
1. Create an account in the app
2. Add your first task
3. Explore filtering and sorting options
4. Toggle dark mode
5. Mark tasks as complete

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

## 💡 Pro Tips

1. **Use React Native Debugger** for better debugging experience
2. **Enable Hot Reload** in the app for faster development
3. **Use MongoDB Compass** for visual database management
4. **Test API with Postman** or Insomnia before mobile integration

---

**Need Help?** Check the troubleshooting section or review the README files in the project root and backend directory.

**Happy Coding! 🚀**
