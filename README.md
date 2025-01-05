# Aftermath Archive

## Demo Deployment:

https://aftermath-archive.xyz

## Backend Repo:

https://github.com/Aftermath-Archive/backend

## Deployment Guide

This guide outlines the steps to deploy the frontend of the Aftermath Archive application to a production environment. The guide assumes you are using a modern hosting platform like Netlify, Vercel, or a custom hosting provider that supports static websites built with React/Vite.

### Prerequisites

1. Node.js: Ensure you have Node.js (version 16.x or higher) installed on your machine.

2. NPM/Yarn: A package manager like npm or yarn.

3. Frontend Source Code: Access to this GitHub repository containing the frontend code.

4. Environment Variables: Make sure you have all necessary environment variables (e.g., API keys) defined for the build and runtime.

### Steps to Deploy

#### 1. Clone the Repository

```
git clone https://github.com/Aftermath-Archive/frontend
cd frontend
```

#### 2. Install Dependencies

Run the following command to install the required dependencies:

```
npm install
```

#### 3. Configure Environment Variables

Create a .env file in the root directory based on the existing `.env.example` and define the required variables:

```
VITE_API_URL=your-backend-api-url
```

Note: Replace `your-backend-api-url` with actual values.

#### 4. Build the Application

Generate a production build of the application:

npm run build

This will create a dist/ folder containing the optimized static files.

#### 5. Deploy to a Hosting Service

##### Option 1: Netlify

1. Log in to your Netlify account and create a new site.
2. Connect your GitHub repository or drag and drop the dist/ folder into the Netlify dashboard.
3. Set the Build Command to: `npm run build`

4. Set the Publish Directory to: `dist`

5. Add any required environment variables in the “Environment” section of your site settings.
6. Deploy the site.

##### Option 2: Custom Hosting

1. Upload the contents of the dist/ folder to your custom hosting service (e.g., AWS S3, Firebase Hosting, or Nginx).
2. Configure your web server to serve index.html for all routes (for React single-page applications).
3. Add environment variables via the hosting provider’s dashboard (if applicable).

#### 6. Test the Deployment

- Visit the deployed URL and test all major features to ensure everything is functioning as expected.
- Verify API integration, UI responsiveness, and environment-specific configurations.

### Common Issues and Solutions

#### API Not Found Error:

- Ensure VITE_API_URL is correctly set and accessible from the deployed environment.

#### 404 Error on Page Reload:

- Configure your server to fallback to index.html for non-root routes.

#### Environment Variable Issues:

- Verify that all environment variables are correctly set in your hosting service.

By following this guide, you will have the Aftermath Archive frontend successfully deployed and running in a production environment.
