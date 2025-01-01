import React from 'react';
import { Badge } from '@/components/ui/badge';
import ActionCell from './ActionCell';

// Card component for displaying incidents
// For larger device view, the cards are hidden and replaced with a table view in the IncidentTable component

/**
 * Renders a table with incident data in JSX format. The function takes an object with a 'table' property as input. It iterates over the rows in the table and for each row, it displays incident details including Incident ID, Title, Description, Severity, Status, and an ActionCell component. If there are no rows in the table, it displays a message indicating no incidents found.
 * @author Xander
 *
 * @param {{ table: any; }} param0
 * @param {*} param0.table The table object containing row data
 * @returns {*} Renders a component to display information about each incident in a table. The table parameter is expected to have a method `getRowModel()` which returns a model containing rows. Each row is then mapped to render incident details such as Incident ID, Title, Description, Severity, Status, and ActionCell. If no rows are found in the table, a message 'No incidents found.' is displayed.
 */
const IncidentCards = ({ table }) => {
    return (
        <div className="block sm:hidden">
            {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                    <div key={row.id} className="mb-4">
                        <div className=" p-4 shadow-sm">
                            {/* Incident ID */}
                            <div className="flex justify-between mb-4">
                                <span className="font-semibold">
                                    Incident ID:
                                </span>
                                <span>{row.getValue('incidentAutoId')}</span>
                            </div>

                            {/* Title */}
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Title:</span>
                                <span>{row.getValue('title')}</span>
                            </div>

                            {/* Description */}
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">
                                    Description:
                                </span>
                                <span>{row.getValue('description')}</span>
                            </div>

                            {/* Severity */}
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Severity:</span>
                                <span>
                                    <Badge>{row.getValue('severity')}</Badge>
                                </span>
                            </div>

                            {/* Status */}
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Status:</span>
                                <span>
                                    <Badge>{row.getValue('status')}</Badge>
                                </span>
                            </div>

                            {/* ActionCell */}
                            <div className="flex justify-end mt-2">
                                <ActionCell row={row} />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center px-4 py-2">No incidents found.</div>
            )}
        </div>
    );
};

export default IncidentCards;
