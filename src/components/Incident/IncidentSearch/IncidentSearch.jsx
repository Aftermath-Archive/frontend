import React, { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoadingSkeleton from '@/components/LoadingSkeleton/LoadingSkeleton';
import IncidentTable from './IncidentTable';
import IncidentCards from './IncidentCards';
import useFetchIncidents from '@/hooks/useFetchIncidents';
import { incidentColumns } from './Columns';

/**
 * A functional component for displaying a dynamic incident search table. It fetches incident data, handles local filtering based on search input, and renders a table with pagination. Includes functionality for sorting, column visibility, and refreshing incidents.Uses React hooks such as useState, useMemo, and custom hooks for table management. Responsible for rendering UI components like Input, Button, LoadingSkeleton, IncidentTable, and IncidentCards. Requires incidentColumns configuration and specific row models for the table.
 * @author Xander
 *
 * @export
 * @returns {*} A functional component for rendering an incident search table. It fetches incident data, allows searching and filtering, and displays the table with pagination features.
 */
export default function IncidentSearchTable() {
    const { fetchedData, loading, fetchIncidents } = useFetchIncidents();
    const [search, setSearch] = useState('');

    // State for table sorting and column visibility
    const [sorting, setSorting] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});

    // Filter incidents locally using memoization
    // This is to avoid refetching data from the server and for improved performance

    // Depending on your data size, you may want to implement server-side filtering
    // the incident search API endpoint supports query parameters for filtering so this should be easy to do!
    const filteredData = useMemo(() => {
        if (!search) return fetchedData;

        const searchLower = search.toLowerCase();
        return fetchedData.filter((incident) => {
            return (
                (incident.incidentAutoId &&
                    incident.incidentAutoId
                        .toLowerCase()
                        .includes(searchLower)) ||
                (incident.title &&
                    incident.title.toLowerCase().includes(searchLower)) ||
                (incident.description &&
                    incident.description.toLowerCase().includes(searchLower)) ||
                (incident.severity &&
                    incident.severity.toLowerCase().includes(searchLower)) ||
                (incident.status &&
                    incident.status.toLowerCase().includes(searchLower))
            );
        });
    }, [search, fetchedData]);

    const table = useReactTable({
        data: filteredData,
        columns: incidentColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
    });

    if (loading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="w-full p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 space-y-4 sm:space-y-0 sm:space-x-4">
                <Input
                    placeholder="Search incidents..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:max-w-sm"
                />
                <Button
                    variant="secondary"
                    onClick={fetchIncidents}
                    disabled={loading}
                    className="w-full sm:w-auto"
                >
                    {loading ? 'Refreshing...' : 'Refresh Incidents'}
                </Button>
            </div>
            <div className="rounded-md border overflow-x-auto">
                <IncidentTable table={table} columns={incidentColumns} />
                <IncidentCards table={table} />
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center py-4">
                <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
