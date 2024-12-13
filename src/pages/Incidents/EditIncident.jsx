import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IncidentForm from '@/components/Incident/IncidentForm/IncidentForm';
import InAppLayout from '@/components/Layout/InAppLayout';
import { fetchIncidentById } from '@/components/Incident/incident';
import { toast } from 'react-toastify';
import CaseDiscussionComponent from '@/components/Incident/CaseDiscussion/CaseDiscussion';

export default function EditIncidentPage() {
    const { id } = useParams(); // Extract the incident ID from the URL
    const navigate = useNavigate();
    const [incidentData, setIncidentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getIncident = async () => {
            try {
                const data = await fetchIncidentById(id);
                setIncidentData(data);
            } catch (err) {
                console.error('Error fetching incident:', err);
                setError('Failed to fetch incident data.');
                toast.error('Failed to fetch incident data.');
            } finally {
                setLoading(false);
            }
        };

        getIncident();
    }, [id]);

    // cache data to reduce API calls
    const memoizedInitialData = useMemo(() => incidentData, [incidentData]);

    if (loading) {
        return (
            <InAppLayout>
                <div className="flex justify-center items-center h-full">
                    <p>loading...</p>
                </div>
            </InAppLayout>
        );
    }

    if (error) {
        return (
            <InAppLayout>
                <div className="text-red-500 text-center mt-4">{error}</div>
            </InAppLayout>
        );
    }

    return (
        <InAppLayout>
            <IncidentForm initialData={memoizedInitialData} mode="edit" />
        </InAppLayout>
    );
}
