#!/bin/bash

echo "Setting up Small App with MySQL..."

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "MySQL is not installed. Please install MySQL first."
    echo "On macOS: brew install mysql"
    echo "On Ubuntu: sudo apt-get install mysql-server"
    echo "Or use Docker: docker-compose up -d"
    exit 1
fi

# Start MySQL if not running (macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    brew services start mysql
fi

# Create database
echo "Creating database..."
mysql -u root -e "CREATE DATABASE IF NOT EXISTS small_app;"

# Setup backend
echo "Setting up backend..."
cd backend
npm install
cp .env.example .env
echo "Please edit backend/.env with your MySQL credentials"
echo "DB_HOST=localhost"
echo "DB_USER=root"
echo "DB_PASSWORD=Iwacu@2o19"
echo "DB_NAME=small_app"

# Setup frontend
echo "Setting up frontend..."
cd ../frontend
npm install

echo ""
echo "Setup complete! To run the app:"
echo "1. Update backend/.env with your MySQL credentials"
echo "2. Terminal 1 (backend): cd backend && npm run dev"
echo "3. Terminal 2 (frontend): cd frontend && npm start"
echo "4. Visit http://localhost:3000"