import InAppLayout from '@/components/Layout/InAppLayout';
import IncidentSearchTable from '@/components/Incident/IncidentSearch/IncidentSearch';
import InteractiveChart from '@/components/Dashboard/InteractiveChart';

export default function DashboardPage() {
    return (
        <InAppLayout>
            <h1 className="text-2xl font-semibold pt-4">Dashboard</h1>
            <div className="p-4 grid grid-rows-[2fr_1fr] gap-4 h-screen">
                <div className="h-full">
                    <InteractiveChart />
                </div>
                <div className="overflow-auto h-full">
                    <IncidentSearchTable />
                </div>
            </div>
        </InAppLayout>
    );
}
