# Aftermath Archive - frontend

Welcome to the frontend for Aftermath Archive, an Incident Management web application.

This backend is hosted on Render and integrates with the frontend hosted on Netlify.

It utilizes a MongoDB database, managed through MongoDB Atlas, to store and retrieve application data.

- Frontend URL: `aftermath-archive.xyz`
- Backend URL: `api.aftermath-archive.xyz`

## Demo Deployment:

https://aftermath-archive.xyz

## Backend Repo:

https://github.com/Aftermath-Archive/backend

## Docker Compose Deployment Repo:

https://github.com/Aftermath-Archive/docker-deployment

## Coder Academy

For students, or teachers who are viewing this repo in the context of the Coder Academy final assignment I have created a separate branch 'project-submission' [available here.](https://github.com/Aftermath-Archive/frontend/tree/project-submission)

This branch captures the projects state at time of submission while future work is undergone on the project.

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

##### Option 3: Docker

##### Prerequisites

1. Confirm Docker Installed
   Download available for [Docker for Mac, Windows, and Linux.](https://docs.docker.com/get-started/get-docker/)

2. Cloud Hosting (Optional)

    If deploying to a cloud service, ensure you have an instance/server on platforms such as:

    - AWS EC2
    - Azure Virtual Machine
    - Google Cloud Platform Compute Engine
    - Digital Ocean
    - Render
    - Railway
    - etc

##### Deploy with Docker Image

1. Build the Docker Image

    Run the` following command in the root of the backend project:

    ```
    docker build -t aftermath-archive-frontend .
    ```

2. Run the container locally

    To test the container on your local machine, run:

    ```
    docker run --env-file .env -p 8080:80 aftermath-archive-frontend
    ```

    - `--env-file .env`: Loads the environment variables from .env.
    - `-p 8080:4000`: Maps port 80 of the container to 8080 on your local machine.

#### Option 4: Docker Compose

For easier setup, a `docker-compose.yml` file for both front and backend is [available here.](https://github.com/Aftermath-Archive/docker-deployment)

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
