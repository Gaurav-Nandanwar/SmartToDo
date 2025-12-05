#!/bin/bash

# SmartToDo - Quick Deployment Setup Script

echo "🚀 SmartToDo Deployment Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}This script will help you prepare for deployment${NC}"
echo ""

# Step 1: Check if git is initialized
echo "📦 Step 1: Checking Git repository..."
if [ -d ".git" ]; then
    echo -e "${GREEN}✓ Git repository already initialized${NC}"
else
    echo "Initializing Git repository..."
    git init
    echo -e "${GREEN}✓ Git repository initialized${NC}"
fi
echo ""

# Step 2: Create .gitignore if it doesn't exist
echo "📝 Step 2: Setting up .gitignore..."
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << EOF
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
EOF
    echo -e "${GREEN}✓ .gitignore created${NC}"
else
    echo -e "${GREEN}✓ .gitignore already exists${NC}"
fi
echo ""

# Step 3: Build the project
echo "🔨 Step 3: Building the backend..."
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed. Please fix errors and try again.${NC}"
    exit 1
fi
echo ""

# Step 4: Instructions
echo "================================"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Create a MongoDB Atlas account and database:"
echo "   → https://www.mongodb.com/cloud/atlas/register"
echo ""
echo "2. Create a Render.com account:"
echo "   → https://render.com"
echo ""
echo "3. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git remote add origin YOUR_GITHUB_REPO_URL"
echo "   git push -u origin main"
echo ""
echo "4. Deploy on Render.com and set environment variables:"
echo "   - MONGODB_URI"
echo "   - JWT_SECRET"
echo "   - NODE_ENV=production"
echo ""
echo "5. Update the React Native app with your Render URL"
echo "   Edit: /src/config/api.config.ts"
echo ""
echo "📖 For detailed instructions, see: ../DEPLOYMENT_GUIDE.md"
echo ""
