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
        const response = await axios.patch(
            `${import.meta.env.VITE_API_URL}/incidents/${id}`,
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

// Fetch username by ID for Case Discussion
export const fetchUsernameById = async (id) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${id}`
        );
        return response.data.username;
    } catch (error) {
        console.error(`Error fetching username for ID: ${id}`, error);
        return 'Unknown User'; // Fallback for errors
    }
};

// Add a new discussion entry to the incident
export const addCaseDiscussion = async (id, discussionData, jwt) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/incidents/${id}/discussion`,
            discussionData,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        return response.data; // Return the updated incident from the response
    } catch (error) {
        console.error('Error adding case discussion:', error);
        throw error; // Throw the error to handle it in the calling component
    }
};
