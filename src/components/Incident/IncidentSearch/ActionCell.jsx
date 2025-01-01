import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'react-toastify';

/**
 * A function component that renders a Dropdown Menu with actions related to an incident. It takes a 'row' object as a parameter and uses the 'useNavigate' hook to navigate to a specific incident page when the 'View Incident' action is clicked. If the incident has an ID, it navigates to the incident details page. If the incident is missing an ID, it displays an error toast message. The function returns the Dropdown Menu component with the 'View Incident' action and can be extended with additional actions if needed.
 * @author Xander
 *
 * @param {{ row: any; }} param0 [object Object]
 * @param {*} param0.row
 * @returns {*} A function that returns a React component with a dropdown menu trigger and content. The component includes a button to trigger the dropdown menu and a dropdown menu item to handle viewing an incident. It uses the useNavigate hook to navigate to the incident details page when the 'View Incident' option is clicked. If the incident ID is missing, it displays an error message using toast.error.
 */
const ActionCell = ({ row }) => {
    const navigate = useNavigate();

    const handleViewIncidents = useCallback(() => {
        const incident = row.original;
        if (incident._id) {
            navigate(`/incidents/${incident._id}/`);
        } else {
            toast.error('Incident is missing.');
        }
    }, [navigate, row.original]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleViewIncidents}>
                    View Incident
                </DropdownMenuItem>
                {/* Add more DropdownMenuItems here for other actions if needed */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionCell;
