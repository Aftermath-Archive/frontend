// Modules import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages import
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/Dashboard';
import ErrorPage from '@/pages/ErrorPage';
import DevPage from '@/pages/Dev';
import RegisterPage from '@/pages/RegisterPage';

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/dashboard',
        element: <DashboardPage />,
    },
    {
        path: '/dev',
        element: <DevPage />,
    },
    {
        path: '/auth/register',
        element: <RegisterPage />,
    },
    {
        path: '*', // Catch-all for unmatched routes (404)
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
