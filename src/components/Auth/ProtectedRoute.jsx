import { Navigate, Outlet } from 'react-router-dom';
import { useUserAuthContext } from '@/contexts/UserAuthContextProvider';

export default function ProtectedRoute() {
    const [userJwt] = useUserAuthContext();

    // If no JWT exists, redirect to the login page
    return userJwt ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
