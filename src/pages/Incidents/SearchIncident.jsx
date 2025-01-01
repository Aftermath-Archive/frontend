import React from 'react';

import InAppLayout from '@/components/Layout/InAppLayout';

import IncidentSearchTable from '@/components/Incident/IncidentSearch/IncidentSearch';

export default function SearchIncidentPage() {
    return (
        <InAppLayout>
            <IncidentSearchTable />
        </InAppLayout>
    );
}
