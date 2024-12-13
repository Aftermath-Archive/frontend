import axios from 'axios';

// create incident
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

// Fetch incident by ID
export const fetchIncidentById = async (id, jwt) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/incidents/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching incident:', error);
        throw error;
    }
};

// Update Incident
export const updateIncident = async (id, payload, jwt) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/incidents/${id}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error updating incident:', error);
        throw error;
    }
};
