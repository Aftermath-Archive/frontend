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

1. Node.js: Ensure you have Node.js 26.x (use `nvm install` and `nvm use` with the included `.nvmrc`) installed on your machine.

2. npm: Use the included package-lock.json for reproducible installs.

3. Frontend Source Code: Access to this GitHub repository containing the frontend code.

4. Environment Variables: Set the public backend URL for the build using `VITE_API_URL`. Vite embeds `VITE_` variables in the browser bundle; keep private credentials and JWT signing secrets on the backend.

### Steps to Deploy

#### 1. Clone the Repository

```
git clone https://github.com/Aftermath-Archive/frontend
cd frontend
```

#### 2. Install Dependencies

Run the following command to install the required dependencies:

```
npm ci
```

#### 3. Configure Environment Variables

Create a .env file in the root directory based on the existing `.env.example` and define the required variables:

```
VITE_API_URL=your-backend-api-url
```

Note: Replace `your-backend-api-url` with actual values.

### Development and validation

Use `npm run dev` for development. Before committing, run `npm run lint`,
`npm run format:check`, `npm run test:run`, `npm run build`, and `npm audit`.
Git hooks use Husky 9 and lint-staged; CI and container builds disable hook
installation using `HUSKY=0`.

The baseline uses React 19, Vite 8, Tailwind 4, Vitest 5, Zod 4, Recharts 3,
and TanStack Table 9. Tailwind uses its Vite plugin and the existing theme
configuration; copied UI components remain project source code.

The lint baseline uses ESLint 10 and `@eslint-react/eslint-plugin` 5 using
the recommended JavaScript rules. The official React Hooks and React Refresh
plugins remain configured. This replaces `eslint-plugin-react`, whose peer
range does not support ESLint 10; ESLint 9 is end-of-life.

TypeScript 6.0 is a development dependency required by the replacement plugin's
internals. The current `@typescript-eslint/typescript-estree` peer range requires
TypeScript below 6.1; the application remains JavaScript/JSX. Review that range
before upgrading this tooling dependency to a new minor or major.

The config defers the syntax-only `useContext`/context-provider codemods and
keeps copied UI `forwardRef` wrappers. Repeated tag/link text badges retain index
keys; editable tag/link text hydration has two documented effect exceptions.
The official Hooks plugin owns Hooks ordering and dependency checks. DOM property,
external-link and raw-HTML rules remain enforced as errors.

Keep bounded dependency ranges; avoid `*`, `--force`, and `--legacy-peer-deps`
when resolving this conflict.

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
    docker build --build-arg VITE_API_URL=https://your-backend-api-url \
      -t aftermath-archive-frontend .
    ```

2. Run the container locally

    To test the container on your local machine, run:

    ```
    docker run -p 8080:80 aftermath-archive-frontend
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

Docker builds require the public `VITE_API_URL` build argument. The main-branch
image workflow reads it from the GitHub repository variable `VITE_API_URL`;
configure that variable before publishing. NGINX serves the URL embedded at
build time, so a container runtime `.env` does not change it. Private `.env`, Git
metadata and key files are excluded from the build context. PR CI builds an image
with a test URL and checks NGINX syntax, SPA deep links and missing-asset 404s.
Hashed `/assets/` files use immutable caching; HTML is revalidated.

#### 404 Error on Page Reload:

- Configure your server to fallback to index.html for non-root routes.

#### Environment Variable Issues:

- Verify that all environment variables are correctly set in your hosting service.

By following this guide, you will have the Aftermath Archive frontend successfully deployed and running in a production environment.
