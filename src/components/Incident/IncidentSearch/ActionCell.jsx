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
