#!/bin/bash

# Digerati Experts - Database Setup Script
# Run this script to initialize the database on a new PostgreSQL server

set -e

echo "=== Digerati Experts Database Setup ==="
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "ERROR: DATABASE_URL environment variable is not set"
    echo "Example: export DATABASE_URL=postgresql://user:password@host:5432/digerati_experts"
    exit 1
fi

echo "Testing database connection..."
if ! psql "$DATABASE_URL" -c "SELECT 1;" > /dev/null 2>&1; then
    echo "ERROR: Cannot connect to database"
    echo "Please verify your DATABASE_URL is correct"
    exit 1
fi

echo "✅ Database connection successful"
echo ""

echo "Pushing schema to database..."
npm run db:push

echo ""
echo "=== Database setup complete ==="
echo ""
echo "Next steps:"
echo "1. Set your environment variables (see DEPLOYMENT.md)"
echo "2. Run: npm run build"
echo "3. Run: npm start"
