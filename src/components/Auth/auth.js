import axios from 'axios';

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
        console.log('Registration successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
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
        console.error('Login failed:', error);
        throw error;
    }
};
