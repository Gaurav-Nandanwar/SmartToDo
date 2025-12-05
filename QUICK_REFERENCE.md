# 🚀 SmartToDo - Quick Reference

## 📱 Mobile App Commands

### Development
\`\`\`bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Clear cache and restart
npm start -- --reset-cache
\`\`\`

### Troubleshooting
\`\`\`bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Reinstall dependencies
rm -rf node_modules && npm install

# Reinstall iOS pods (macOS)
cd ios && pod deintegrate && pod install && cd ..
\`\`\`

## 🖥 Backend Commands

### Development
\`\`\`bash
cd backend

# Start in development mode (with watch)
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod
\`\`\`

### Database
\`\`\`bash
# Start MongoDB (local)
mongod

# Connect to MongoDB shell
mongosh

# View databases
show dbs

# Use SmartToDo database
use smarttodo

# View collections
show collections

# View all users
db.users.find()

# View all tasks
db.tasks.find()
\`\`\`

## 🔧 Configuration

### API URL (src/services/api.ts)
\`\`\`typescript
// Android Emulator
'http://10.0.2.2:3000'

// iOS Simulator
'http://localhost:3000'

// Physical Device
'http://YOUR_IP:3000'
\`\`\`

### Find Your IP
\`\`\`bash
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig
\`\`\`

## 🧪 Testing API with cURL

### Register
\`\`\`bash
curl -X POST http://localhost:3000/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
\`\`\`

### Login
\`\`\`bash
curl -X POST http://localhost:3000/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"test123"}'
\`\`\`

### Get Tasks
\`\`\`bash
curl -X GET http://localhost:3000/tasks \\
  -H "Authorization: Bearer YOUR_TOKEN"
\`\`\`

### Create Task
\`\`\`bash
curl -X POST http://localhost:3000/tasks \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "title":"Test Task",
    "description":"Test Description",
    "date":"2025-12-05T10:00:00.000Z",
    "deadline":"2025-12-10T18:00:00.000Z",
    "priority":"high"
  }'
\`\`\`

## 📂 Important Files

### Mobile App
- \`App.tsx\` - Root component
- \`src/navigation/AppNavigator.tsx\` - Navigation setup
- \`src/redux/store.ts\` - Redux store
- \`src/services/api.ts\` - API configuration
- \`src/theme/index.ts\` - Theme colors

### Backend
- \`src/main.ts\` - Entry point
- \`src/app.module.ts\` - Root module
- \`backend/.env\` - Environment variables
- \`src/auth/auth.service.ts\` - Auth logic
- \`src/tasks/tasks.service.ts\` - Task logic

## 🎨 Theme Colors

### Light Mode
- Primary: #6366F1 (Indigo)
- Background: #F8FAFC
- Card: #FFFFFF
- Text: #1E293B

### Dark Mode
- Primary: #818CF8 (Light Indigo)
- Background: #0F172A
- Card: #1E293B
- Text: #F1F5F9

### Priority Colors
- High: #DC2626 (Red)
- Medium: #F59E0B (Amber)
- Low: #3B82F6 (Blue)

## 🔑 Environment Variables

### Backend (.env)
\`\`\`env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/smarttodo
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
\`\`\`

## 📊 Port Reference

- **Backend API:** 3000
- **Metro Bundler:** 8081
- **MongoDB:** 27017
- **Android Emulator ADB:** 5554-5585

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Port 8081 in use | \`lsof -ti:8081 \| xargs kill -9\` |
| Port 3000 in use | \`lsof -ti:3000 \| xargs kill -9\` |
| Metro cache issues | \`npm start -- --reset-cache\` |
| Android build fails | \`cd android && ./gradlew clean\` |
| iOS build fails | \`cd ios && pod install\` |
| MongoDB not connecting | Check if \`mongod\` is running |
| Icons not showing | Clean build and rebuild |
| Backend 401 error | Check JWT token in AsyncStorage |

## 📱 Device Setup

### Android Physical Device
1. Enable Developer Options
2. Enable USB Debugging
3. Connect via USB
4. Run: \`adb devices\`
5. Run: \`npm run android\`

### iOS Physical Device
1. Open Xcode
2. Select your device
3. Configure signing
4. Click Run

## 🔍 Debugging

### React Native
\`\`\`bash
# Open developer menu
# Android: Cmd+M (Mac) or Ctrl+M (Windows)
# iOS: Cmd+D

# Enable Remote Debugging
# Enable Fast Refresh
# Show Inspector
\`\`\`

### Backend
\`\`\`bash
# View logs
npm run start:dev

# MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log
\`\`\`

## 📚 Documentation

- Main README: \`README.md\`
- Backend README: \`backend/README.md\`
- Setup Guide: \`SETUP_GUIDE.md\`
- Project Summary: \`PROJECT_SUMMARY.md\`

## 🎯 Quick Start (New Machine)

\`\`\`bash
# 1. Install dependencies
npm install
cd backend && npm install && cd ..

# 2. Setup backend .env
cd backend && cp .env.example .env && cd ..
# Edit backend/.env with your MongoDB URI

# 3. Start MongoDB
mongod

# 4. Start backend (new terminal)
cd backend && npm run start:dev

# 5. Start Metro (new terminal)
npm start

# 6. Run app (new terminal)
npm run android  # or npm run ios
\`\`\`

## 💡 Pro Tips

1. Use React Native Debugger for better debugging
2. Enable Hot Reload for faster development
3. Use MongoDB Compass for database visualization
4. Test API with Postman before mobile integration
5. Keep Metro bundler running in separate terminal
6. Use \`console.log\` sparingly, prefer debugger
7. Check Redux DevTools for state debugging

---

**Quick Reference v1.0** | SmartToDo Project
