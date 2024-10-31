#!/bin/bash

# setup.sh - Setup script for environment configuration

echo "Setting up the development environment..."

# Check for Node.js and npm
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm."
    exit 1
fi

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Create a .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo ".env file created. Please configure your environment variables."
else
    echo ".env file already exists."
fi

echo "Development environment setup complete."
