import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ActionCell from './ActionCell';

// Utility function to create sortable headers with displayName

/**
 * A function that takes a label and returns a HeaderComponent function which renders a Button component with the given label and an ArrowUpDown icon. The Button component has an onClick event that toggles the sorting of a column based on the current sorting order. The HeaderComponent function also assigns a displayName based on the label for debugging and linting purposes.
 * @author Xander
 *
 * @param {*} label The label parameter
 * @returns {{ ({ column }: { column: any; }): any; displayName: string; }} A higher-order function that takes a label as input and returns a functional component named HeaderComponent. HeaderComponent renders a Button component with label text and an ArrowUpDown icon. It also toggles sorting when clicked and sets a displayName for debugging and linting purposes.
 */
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

/**
 * An array of objects representing columns in an incident table. Each object contains the following properties:
 * - accessorKey: The key to access the data for the column.
 * - header: The header content for the column.
 * - cell: A function that returns the cell content based on the row data.
 * If the column represents 'actions', it also contains an 'id' property representing the column's unique identifier.
 * @author Xander
 *
 * @type {{}}
 */
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
