// Modules import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages import
import HomePage from '@/pages/Homepage';
import { DashboardPage } from '@/pages/Dashboard';
import ErrorPage from '@/pages/ErrorPage';

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/dashboard',
        element: <DashboardPage />,
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
