import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../auth';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import { useUserAuthContext } from '@/contexts/UserAuthContextProvider';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [_, setUserJwt] = useUserAuthContext();

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        if (!username || !password) {
            setError('Please fill in both fields.');
            setLoading(false);
            return;
        }

        try {
            const data = await loginUser(username, password);
            setUserJwt(data.token);
            toast.success('Logged in successfully!');
            navigate('/dashboard'); // Redirect to the app dashboard page after successful login
        } catch (err) {
            setError(err.message);
            console.error('Login failed:', err);
            toast.error('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="1337_Dev"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {/* TO DO */}
                            {/* Uncomment when implementing forgot password */}
                            {/* <Link
                                to="/forgot-password"
                                className="ml-auto inline-block text-sm underline"
                            >
                                Forgot your password?
                            </Link> */}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <Button
                        onClick={handleLogin}
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link to="/auth/register" className="underline">
                        Register
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
