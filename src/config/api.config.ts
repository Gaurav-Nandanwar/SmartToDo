// API Configuration
// This file manages the API endpoint based on the environment

// PRODUCTION: Update this with your deployed backend URL (e.g., from Render, Railway, etc.)
const PRODUCTION_API_URL = 'https://smarttodo-gp0g.onrender.com';

// DEVELOPMENT: Local development URLs
const DEV_URLS = {
    EMULATOR: 'http://10.0.2.2:3000',      // Android Emulator
    IOS_SIMULATOR: 'http://localhost:3000', // iOS Simulator
    PHYSICAL_DEVICE: 'http://192.168.1.20:3000', // Physical device on same WiFi
};

// Determine which URL to use
// Set __DEV__ to false when building for production
export const API_BASE_URL = __DEV__
    ? DEV_URLS.PHYSICAL_DEVICE  // Change this based on your testing device
    // ? DEV_URLS.EMULATOR  // UPDATED: Using Emulator URL
    : PRODUCTION_API_URL;

console.log('🌐 API Base URL:', API_BASE_URL);
