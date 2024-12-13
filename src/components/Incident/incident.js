import axios from 'axios';

export const createIncident = async (incidentData, jwt) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/incidents/`,
            incidentData,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to save incident:', error);
        throw error;
    }
};
