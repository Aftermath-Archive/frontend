import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUserAuthContext } from '@/contexts/UserAuthContextProvider';
import { toast } from 'react-toastify';

export default function LogoutButton() {
    const [, setUserJwt] = useUserAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the JWT from context
        setUserJwt('');

        // Clear the JWT from localStorage
        localStorage.removeItem('userJwt');

        // Show a success notification
        toast.success('Successfully signed out.');

        // Redirect to the login page
        navigate('/auth/login');
    };

    return (
        <Button variant="ghost" onClick={handleLogout} className="p-4">
            Sign Out
        </Button>
    );
}
