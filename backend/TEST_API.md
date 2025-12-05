# API Testing Guide

## Test the Backend API

### 1. Register a New User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"demo123","name":"Demo User"}'
```

**Expected Response:**
```json
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "demo@example.com",
    "name": "Demo User"
  }
}
```

### 2. Login with Existing User
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"demo123"}'
```

**Expected Response:**
```json
{
  "access_token": "eyJhbGc...",
  "user": {
    "id": "...",
    "email": "demo@example.com",
    "name": "Demo User"
  }
}
```

### 3. Get Tasks (Requires Authentication)
```bash
# Replace YOUR_TOKEN with the access_token from login/register
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Common Issues

### Issue: "Unauthorized" Error
**Causes:**
1. User doesn't exist in database - Register first
2. Wrong password
3. JWT_SECRET mismatch between token generation and validation
4. Token expired

**Solution:**
- Make sure to register a user first
- Use the correct password
- Check that JWT_SECRET is loaded from .env

### Issue: "Connection Refused"
**Causes:**
1. Backend server not running
2. Wrong API URL in mobile app

**Solution:**
- Start backend: `cd backend && npm run start:dev`
- Check API_BASE_URL in `src/services/api.ts`:
  - Android Emulator: `http://10.0.2.2:3000`
  - iOS Simulator: `http://localhost:3000`
  - Physical Device: `http://YOUR_IP:3000`

## Mobile App Testing

### For Android Emulator
Update `src/services/api.ts`:
```typescript
export const API_BASE_URL = 'http://10.0.2.2:3000';
```

### For iOS Simulator
Update `src/services/api.ts`:
```typescript
export const API_BASE_URL = 'http://localhost:3000';
```

### For Physical Device
1. Find your computer's IP address:
   - macOS: `ifconfig | grep "inet "`
   - Windows: `ipconfig`
   - Linux: `ip addr show`

2. Update `src/services/api.ts`:
```typescript
export const API_BASE_URL = 'http://192.168.1.XXX:3000'; // Replace XXX with your IP
```

3. Make sure your phone and computer are on the same WiFi network

## Debugging Steps

1. **Check Backend Logs**: Look at the terminal running `npm run start:dev`
2. **Check Mobile App Logs**: Use React Native debugger or console.log
3. **Test API with curl**: Verify backend is working independently
4. **Clear App Data**: Sometimes old tokens cause issues
   - Clear AsyncStorage
   - Reinstall the app
