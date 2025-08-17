# Deployment Guide for Arif Academy

This guide provides instructions for deploying the Arif Academy application to Vercel.

## Prerequisites

1. A Vercel account
2. Git repository with your code
3. Environment variables ready for configuration

## Frontend Deployment

### Step 1: Push your code to a Git repository

Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

### Step 2: Import your project to Vercel

1. Log in to your Vercel account
2. Click "Add New" > "Project"
3. Select your Git repository
4. Select the frontend directory as the root directory

### Step 3: Configure the project

1. Framework Preset: Select "Vite"
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Install Command: `npm install`

### Step 4: Environment Variables

Add the following environment variables in the Vercel project settings:

- `VITE_BASE_URL`: Your backend API URL
- `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `VITE_FACEBOOK_APP_ID`: Your Facebook App ID

### Step 5: Deploy

Click "Deploy" and wait for the deployment to complete.

## Backend Deployment

### Step 1: Push your code to a Git repository

Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

### Step 2: Import your project to Vercel

1. Log in to your Vercel account
2. Click "Add New" > "Project"
3. Select your Git repository
4. Select the backend directory as the root directory

### Step 3: Configure the project

1. Framework Preset: Select "Node.js"
2. Build Command: `npm install`
3. Output Directory: Leave empty
4. Install Command: `npm install`

### Step 4: Environment Variables

Add all the environment variables from your `.env` file to the Vercel project settings:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `EMAIL_USER`
- `EMAIL_PASS`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CASHFREE_APP_ID`
- `CASHFREE_SECRET_KEY`
- `CLIENT_URL` (set this to your frontend Vercel URL)
- `GEMINI_API_KEY`
- `PIXABAY_API_KEY`
- `ELEVENLABS_API_KEY`
- `VAPI_API_KEY`
- `JUDGE0_API_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`
- `FACEBOOK_APP_ID`
- `FACEBOOK_APP_SECRET`
- `FACEBOOK_CALLBACK_URL`

### Step 5: Deploy

Click "Deploy" and wait for the deployment to complete.

## Connecting Frontend and Backend

1. After deploying the backend, copy the deployment URL
2. Update the `VITE_BASE_URL` environment variable in the frontend project settings
3. Redeploy the frontend if necessary

## Verifying the Deployment

1. Test the frontend by navigating to the deployed URL
2. Test the social login functionality
3. Verify that API calls to the backend are working correctly

## Troubleshooting

### CORS Issues

If you encounter CORS issues, ensure that the backend's `CLIENT_URL` environment variable is set to the frontend's URL.

### Environment Variables

If the application is not working as expected, verify that all environment variables are correctly set in Vercel.

### Logs

Check the deployment logs in Vercel for any errors or issues.

## Continuous Deployment

Vercel automatically redeploys your application when you push changes to your Git repository. Make sure to update environment variables if they change.