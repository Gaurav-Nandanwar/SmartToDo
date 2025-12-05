# SmartToDo Backend API

NestJS backend API for the SmartToDo mobile application with MongoDB and JWT authentication.

## 🚀 Features

- **RESTful API** with NestJS
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with Passport
- **Password Hashing** with bcrypt
- **Input Validation** with class-validator
- **CORS** enabled for React Native
- **TypeScript** for type safety

## 📁 Project Structure

\`\`\`
backend/
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   └── auth.dto.ts          # Auth DTOs
│   │   ├── auth.controller.ts       # Auth endpoints
│   │   ├── auth.service.ts          # Auth business logic
│   │   ├── auth.module.ts           # Auth module
│   │   ├── jwt.strategy.ts          # JWT strategy
│   │   └── jwt-auth.guard.ts        # JWT guard
│   ├── tasks/
│   │   ├── dto/
│   │   │   └── task.dto.ts          # Task DTOs
│   │   ├── task.schema.ts           # Task Mongoose schema
│   │   ├── tasks.controller.ts      # Task endpoints
│   │   ├── tasks.service.ts         # Task business logic
│   │   └── tasks.module.ts          # Tasks module
│   ├── users/
│   │   └── user.schema.ts           # User Mongoose schema
│   ├── app.module.ts                # Root module
│   └── main.ts                      # Entry point
├── .env.example                     # Environment variables template
├── nest-cli.json                    # NestJS CLI config
├── tsconfig.json                    # TypeScript config
└── package.json                     # Dependencies
\`\`\`

## 🛠 Installation

### Prerequisites
- Node.js >= 18
- MongoDB (local or cloud instance like MongoDB Atlas)

### Setup

1. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

2. **Create environment file:**
\`\`\`bash
cp .env.example .env
\`\`\`

3. **Configure environment variables:**

Edit \`.env\`:
\`\`\`env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/smarttodo
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
\`\`\`

For **MongoDB Atlas** (cloud):
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smarttodo?retryWrites=true&w=majority
\`\`\`

## 🏃‍♂️ Running the Application

### Development Mode
\`\`\`bash
npm run start:dev
\`\`\`

Server will start on: **http://localhost:3000**

### Production Build
\`\`\`bash
npm run build
npm run start:prod
\`\`\`

## 📡 API Endpoints

### Authentication

#### Register User
\`\`\`http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
\`\`\`

**Response:**
\`\`\`json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
\`\`\`

#### Login
\`\`\`http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**Response:** Same as register

### Tasks (Protected Routes)

All task endpoints require JWT token in Authorization header:
\`\`\`
Authorization: Bearer <access_token>
\`\`\`

#### Get All Tasks
\`\`\`http
GET /tasks
Authorization: Bearer <access_token>
\`\`\`

**Response:**
\`\`\`json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the SmartToDo app",
    "date": "2025-12-05T10:00:00.000Z",
    "deadline": "2025-12-10T18:00:00.000Z",
    "priority": "high",
    "completed": false,
    "category": "Work",
    "tags": [],
    "userId": "507f1f77bcf86cd799439012",
    "createdAt": "2025-12-05T07:45:46.000Z",
    "updatedAt": "2025-12-05T07:45:46.000Z"
  }
]
\`\`\`

#### Create Task
\`\`\`http
POST /tasks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the SmartToDo app",
  "date": "2025-12-05T10:00:00.000Z",
  "deadline": "2025-12-10T18:00:00.000Z",
  "priority": "high",
  "category": "Work",
  "tags": ["urgent", "important"]
}
\`\`\`

#### Get Single Task
\`\`\`http
GET /tasks/:id
Authorization: Bearer <access_token>
\`\`\`

#### Update Task
\`\`\`http
PUT /tasks/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true
}
\`\`\`

#### Delete Task
\`\`\`http
DELETE /tasks/:id
Authorization: Bearer <access_token>
\`\`\`

## 🗄 Database Schema

### User Schema
\`\`\`typescript
{
  email: string (unique, required)
  password: string (hashed, required)
  name: string (optional)
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### Task Schema
\`\`\`typescript
{
  title: string (required)
  description: string (required)
  date: Date (required)
  deadline: Date (required)
  priority: 'high' | 'medium' | 'low' (required)
  completed: boolean (default: false)
  category: string (optional)
  tags: string[] (default: [])
  userId: ObjectId (required, ref: User)
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## 🔐 Security

- **Password Hashing:** bcrypt with 10 salt rounds
- **JWT Tokens:** Signed with secret key, 7-day expiration
- **Route Protection:** JWT Auth Guard on all task endpoints
- **User Isolation:** Users can only access their own tasks
- **Input Validation:** class-validator DTOs
- **CORS:** Configured for React Native app

## 🧪 Testing with cURL

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

### Get All Tasks
\`\`\`bash
curl -X GET http://localhost:3000/tasks \\
  -H "Authorization: Bearer YOUR_TOKEN"
\`\`\`

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: \`mongod\`
- Check MONGODB_URI in .env
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use
\`\`\`bash
# Change PORT in .env or kill the process
lsof -ti:3000 | xargs kill -9
\`\`\`

### Module Not Found
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

## 📦 Dependencies

### Core
- @nestjs/common, @nestjs/core - NestJS framework
- @nestjs/platform-express - Express adapter
- @nestjs/mongoose - MongoDB integration
- mongoose - MongoDB ODM

### Authentication
- @nestjs/jwt - JWT utilities
- @nestjs/passport - Passport integration
- passport-jwt - JWT strategy
- bcrypt - Password hashing

### Validation
- class-validator - DTO validation
- class-transformer - Object transformation

## 🚀 Deployment

### Environment Variables for Production
\`\`\`env
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/smarttodo
JWT_SECRET=use-a-strong-random-secret-here
JWT_EXPIRES_IN=7d
NODE_ENV=production
\`\`\`

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Start Production Server
\`\`\`bash
npm run start:prod
\`\`\`

## 📝 Notes

- All timestamps are in ISO 8601 format
- Task priority must be: 'high', 'medium', or 'low'
- JWT tokens expire after 7 days (configurable)
- Passwords must be at least 6 characters
- Email must be valid format

---

**Backend API Ready! 🚀**
