#!/bin/bash

# migrate.sh - Database migration scripts

echo "Starting database migration..."

# Check for database migration tool (e.g., Sequelize, TypeORM)
if ! command -v sequelize &> /dev/null; then
    echo "Sequelize CLI is not installed. Please install it globally."
    exit 1
fi

# Check for migration command
if [ "$1" == "up" ]; then
    echo "Applying migrations..."
    npx sequelize-cli db:migrate
elif [ "$1" == "down" ]; then
    echo "Rolling back the last migration..."
    npx sequelize-cli db:migrate:undo
else
    echo "Usage: ./migrate.sh [up|down]"
    exit 1
fi

echo "Database migration completed."
