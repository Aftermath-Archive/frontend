// Modules import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages import
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/Dashboard';
import ErrorPage from '@/pages/ErrorPage';
import RegisterPage from '@/pages/Auth/RegisterPage';
import LoginPage from '@/pages/Auth/LoginPage';
import ProtectedRoute from './Auth/ProtectedRoute';
import CreateIncidentPage from '@/pages/Incidents/CreateIncident';
import EditIncidentPage from '@/pages/Incidents/EditIncident';
import ViewIncidentDetailPage from '@/pages/Incidents/ViewIncident';
import SearchIncidentPage from '@/pages/Incidents/SearchIncident';

const appRouter = createBrowserRouter([
    // Public routes
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/auth/register',
        element: <RegisterPage />,
    },
    {
        path: '/auth/login',
        element: <LoginPage />,
    },
    // Protected routes requiring login
    {
        element: <ProtectedRoute />, // Parent wrapper
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
            {
                path: '/incidents',
                element: <CreateIncidentPage />,
            },
            {
                path: '/incidents/:id/',
                element: <ViewIncidentDetailPage />,
            },
            {
                path: '/incidents/:id/edit',
                element: <EditIncidentPage />,
            },
            {
                path: '/incidents/search',
                element: <SearchIncidentPage />,
            },
        ],
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={appRouter} />
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default App;
