import axios from 'axios';

/**
 * Asynchronously sends a POST request to the specified API endpoint with the provided incident data and JWT token. Returns the response data if the request is successful, otherwise logs an error and throws the encountered error.
 * @author Xander
 *
 * @async
 * @param {*} incidentData The data of the incident to be saved
 * @param {*} jwt The JWT token for authorization
 * @returns {unknown} Asynchronously sends a POST request to save incidentData to the API using the provided JWT token. Returns the response data if successful, otherwise logs an error and throws the error.
 */
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

/**
 * Asynchronous function that makes a GET request to fetch an incident with the provided ID using the given JWT token. If successful, returns the data of the incident. If an error occurs during the request, logs the error and throws it.
 * @author Xander
 *
 * @async
 * @param {*} id The id of the incident to fetch
 * @param {*} jwt The JWT token for authorization
 * @returns {unknown} Asynchronously fetches incident data from the API using the provided ID and JWT. Returns the data of the fetched incident. Throws an error if there is an issue with the API request.
 */
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

/**
 * Asynchronously updates an incident with the provided ID using the given payload and JWT token.
 * Throws an error if the operation encounters any issues.
 * @param id - The ID of the incident to be updated.
 * @param payload - The data payload to update the incident with.
 * @param jwt - The JWT token for authentication.
 * @returns A promise that resolves to the updated incident data.
 * @author Xander
 *
 * @async
 * @param {*} id The ID of the incident to update
 * @param {*} payload The payload containing the data to update the incident
 * @param {*} jwt The JWT token for authorization
 * @returns {unknown} Asynchronously updates an incident with the provided ID using the given payload and JWT token. Returns the updated incident data if successful, otherwise logs and throws an error.
 */
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

/**
 * Asynchronous function that fetches the username of a user from the API using the provided ID. If successful, it returns the username, otherwise returns 'Unknown User' as a fallback for errors.
 * @author Xander
 *
 * @async
 * @param {
 * } id The ID of the user to fetch the username for
 * @returns {unknown} Async function that fetches the username of a user with the given ID. Returns the username if the fetch is successful, otherwise returns 'Unknown User'. Logs an error message if there is an error during the fetch.
 */
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

/**
 * Asynchronous function that adds a new discussion to an incident. It makes a POST request to the API endpoint with the provided incident ID and discussion data using the specified JWT for authorization. If successful, it returns the updated incident data from the response. If there is an error during the process, it logs the error and throws it for handling in the calling component.
 * @author Xander
 *
 * @async
 * @param {*} id The ID of the incident
 * @param {*} discussionData The data for the discussion to be added
 * @param {*} jwt The JWT token for authorization
 * @returns {unknown} Asynchronous function that adds a discussion to an incident with the given ID using the provided discussion data and JWT token. It makes a POST request to the API endpoint for adding discussions to incidents. Returns the updated incident data from the response. If an error occurs during the process, it logs the error and throws it for handling in the calling component.
 */
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
