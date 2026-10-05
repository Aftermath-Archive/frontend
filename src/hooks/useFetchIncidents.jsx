import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

// Preserve the existing client-side table while fetching bounded API pages.
// Server-side table pagination/filtering is a separate performance migration.
const useFetchIncidents = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const activeRequestRef = useRef(null);
    const fetchIncidents = useCallback(async () => {
        activeRequestRef.current?.abort();
        const controller = new AbortController();
        activeRequestRef.current = controller;
        setLoading(true);
        try {
            const incidents = [];
            const limit = 100;
            for (let page = 1; page <= 10000; page++) {
                const endpoint = `${import.meta.env.VITE_API_URL}/incidents/?page=${page}&limit=${limit}`;
                const response = await fetch(endpoint, {
                    signal: controller.signal,
                });
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                const batch = await response.json();
                if (controller.signal.aborted) return;
                if (!Array.isArray(batch))
                    throw new Error('Invalid incident response.');
                incidents.push(...batch);
                if (batch.length < limit) {
                    if (!controller.signal.aborted) setFetchedData(incidents);
                    return;
                }
            }
            throw new Error(
                'Incident archive exceeds the supported paging range.'
            );
        } catch (error) {
            if (!controller.signal.aborted) {
                console.error('Error fetching incidents:', error);
                toast.error('Failed to fetch incidents.');
            }
        } finally {
            if (
                activeRequestRef.current === controller &&
                !controller.signal.aborted
            )
                setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchIncidents();
        return () => activeRequestRef.current?.abort();
    }, [fetchIncidents]);
    return { fetchedData, loading, fetchIncidents };
};
export default useFetchIncidents;
