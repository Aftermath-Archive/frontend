import IncidentForm from '@/components/Incident/IncidentForm/IncidentForm';
import InAppLayout from '@/components/Layout/InAppLayout';

export default function CreateIncidentPage() {
    return (
        <InAppLayout>
            <IncidentForm mode="create" />
        </InAppLayout>
    );
}
