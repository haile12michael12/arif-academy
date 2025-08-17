#!/bin/bash

# Build script for Arif Academy deployment

# Frontend build
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Backend build
echo "Building backend..."
cd backend
npm install
cd ..

echo "Build completed successfully!"