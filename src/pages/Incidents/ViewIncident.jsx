import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IncidentView from '@/components/Incident/IncidentView/IncidentView';
import InAppLayout from '@/components/Layout/InAppLayout';
import { fetchIncidentById } from '../../components/Incident/incident';
import { toast } from 'react-toastify';

export default function ViewIncidentDetailPage() {
    const { id } = useParams();
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

    const memoizedIncidentData = useMemo(() => incidentData, [incidentData]);

    if (loading) {
        return (
            <InAppLayout>
                <div className="flex justify-center items-center h-full">
                    {/* to do */}
                    {/* skeleton or spinner */}
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
            <IncidentView incident={memoizedIncidentData} />
        </InAppLayout>
    );
}
