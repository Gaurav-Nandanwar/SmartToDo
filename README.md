# SmartToDo - Architecture Overview

## Current Setup (After Configuration)

```
┌─────────────────────────────────────────────────────────────┐
│                     DEVELOPMENT MODE                         │
│                    (__DEV__ = true)                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📱 Phone (on WiFi)                                          │
│      │                                                       │
│      │ http://192.168.1.20:3000                             │
│      ▼                                                       │
│  💻 Your Computer                                            │
│      ├─ Backend (NestJS) :3000                              │
│      └─ MongoDB (Local) :27017                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     PRODUCTION MODE                          │
│                  (__DEV__ = false)                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📱 Client Phone (Anywhere in World)                         │
│      │                                                       │
│      │ https://your-app.onrender.com                        │
│      ▼                                                       │
│  ☁️  Render.com (Cloud Server)                               │
│      ├─ Backend (NestJS) :3000                              │
│      │                                                       │
│      │ mongodb+srv://...                                    │
│      ▼                                                       │
│  🗄️  MongoDB Atlas (Cloud Database)                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

```
Practice/
├── src/                          # React Native App
│   ├── config/
│   │   └── api.config.ts        # 🆕 API URL configuration
│   ├── services/
│   │   └── api.ts               # Updated to use config
│   └── ...
│
├── backend/                      # NestJS Backend
│   ├── src/
│   │   ├── main.ts              # Updated for 0.0.0.0 binding
│   │   ├── auth/
│   │   ├── tasks/
│   │   └── ...
│   ├── .env                     # Local environment (not in git)
│   ├── .env.example             # Template for .env
│   ├── render.yaml              # 🆕 Render deployment config
│   └── deploy-setup.sh          # 🆕 Deployment helper script
│
├── DEPLOYMENT_GUIDE.md          # 🆕 Full deployment instructions
├── QUICK_START_DEPLOYMENT.md    # 🆕 Quick reference guide
└── README.md                    # This file
```

## API Configuration Logic

```typescript
// src/config/api.config.ts

const PRODUCTION_API_URL = 'https://your-app.onrender.com';
const DEV_URL = 'http://192.168.1.20:3000';

// Automatically switches based on build type
export const API_BASE_URL = __DEV__ ? DEV_URL : PRODUCTION_API_URL;
```

### How It Works:
- **Debug Build** (`npm run android`): Uses DEV_URL
- **Release Build** (`./gradlew assembleRelease`): Uses PRODUCTION_API_URL

## Environment Variables

### Local Development (.env)
```env
MONGODB_URI=mongodb://localhost:27017/smarttodo
JWT_SECRET=dev-secret-key
PORT=3000
```

### Production (Render.com Dashboard)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/smarttodo
JWT_SECRET=super-secure-production-key
PORT=3000
NODE_ENV=production
```

## Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] Database user created with read/write access
- [ ] Network access set to 0.0.0.0/0
- [ ] Connection string obtained
- [ ] Code pushed to GitHub
- [ ] Render.com account created
- [ ] Web service created and connected to GitHub
- [ ] Environment variables set in Render
- [ ] Backend deployed successfully
- [ ] Production URL copied
- [ ] `api.config.ts` updated with production URL
- [ ] Release APK built
- [ ] APK tested on physical device

## Testing

### Test Local Backend
```bash
curl http://localhost:3000
```

### Test Production Backend
```bash
curl https://your-app.onrender.com
```

### Test from Phone
1. Install APK
2. Register new account
3. Create a task
4. Verify in MongoDB Atlas dashboard

## Monitoring

### Render.com Dashboard
- View logs
- Check deployment status
- Monitor resource usage

### MongoDB Atlas Dashboard
- View database contents
- Monitor connections
- Check storage usage

## Support

For issues or questions:
1. Check `DEPLOYMENT_GUIDE.md` for detailed instructions
2. Review Render logs for backend errors
3. Check MongoDB Atlas connection settings
4. Verify environment variables are set correctly

## License

MIT
