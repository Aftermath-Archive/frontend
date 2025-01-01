import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

// Custom hook to fetch incidents from the API
// Used for the search incident component
const useFetchIncidents = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchIncidents = useCallback(async () => {
        setLoading(true);
        try {
            const endpoint = `${import.meta.env.VITE_API_URL}/incidents/`;
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const incidents = await response.json();
            setFetchedData(incidents);
        } catch (error) {
            console.error('Error fetching incidents:', error);
            toast.error('Failed to fetch incidents.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchIncidents();
    }, [fetchIncidents]);

    return { fetchedData, loading, fetchIncidents };
};

export default useFetchIncidents;
