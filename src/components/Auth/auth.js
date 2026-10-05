import axios from 'axios';
import { logError } from '@/lib/logError';

export const registerUser = async (email, username, password) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/register`,
            {
                username: username,
                email: email,
                password: password,
            }
        );
        return response.data;
    } catch (error) {
        logError('auth.register', error);
        throw error;
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/login`,
            {
                username: username,
                password: password,
            }
        );
        return response.data;
    } catch (error) {
        logError('auth.login', error);
        throw error;
    }
};
