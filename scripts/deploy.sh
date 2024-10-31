#!/bin/bash

# deploy.sh - Deployment script for production

echo "Starting deployment process..."

# Check for Node.js and npm
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm."
    exit 1
fi

# Pull the latest code from the repository
echo "Pulling the latest code from the repository..."
git pull origin main

# Install dependencies
echo "Installing dependencies..."
npm install --production

# Build the application
echo "Building the application..."
npm run build

# Run tests
echo "Running tests..."
npm test

if [ $? -ne 0 ]; then
    echo "Tests failed. Aborting deployment."
    exit 1
fi

# Restart the application (assuming using PM2)
echo "Restarting the application..."
pm2 restart my-app

echo "Deployment completed successfully."
