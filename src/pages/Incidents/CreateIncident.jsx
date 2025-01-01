import IncidentForm from '@/components/Incident/IncidentForm/IncidentForm';
import InAppLayout from '@/components/Layout/InAppLayout';

export default function CreateIncidentPage() {
    return (
        <InAppLayout>
            <h1 className="text-2xl font-semibold pt-4">Create Incident</h1>
            <IncidentForm mode="create" />
        </InAppLayout>
    );
}
