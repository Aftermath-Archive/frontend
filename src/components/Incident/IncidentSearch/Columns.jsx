import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ActionCell from './ActionCell';

// Utility function to create sortable headers with displayName
const createSortableHeader = (label) => {
    const HeaderComponent = ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center"
        >
            {label} <ArrowUpDown className="ml-1" />
        </Button>
    );

    // Assign a displayName for debugging and linting
    HeaderComponent.displayName = `SortableHeader_${label.replace(/\s+/g, '')}`;

    return HeaderComponent;
};

// Define and export the columns
export const incidentColumns = [
    {
        accessorKey: 'incidentAutoId',
        header: createSortableHeader('Incident ID'),
        cell: ({ row }) => <span>{row.getValue('incidentAutoId')}</span>,
    },
    {
        accessorKey: 'title',
        header: createSortableHeader('Title'),
        cell: ({ row }) => <span>{row.getValue('title')}</span>,
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <span>{row.getValue('description')}</span>,
    },
    {
        accessorKey: 'severity',
        header: createSortableHeader('Severity'),
        cell: ({ row }) => <Badge>{row.getValue('severity')}</Badge>,
    },
    {
        accessorKey: 'status',
        header: createSortableHeader('Status'),
        cell: ({ row }) => <Badge>{row.getValue('status')}</Badge>,
    },
    {
        id: 'actions',
        cell: ({ row }) => <ActionCell row={row} />,
    },
];
