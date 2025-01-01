import React from 'react';
import { flexRender } from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

// Table component for displaying incidents
// For mobile view, the table is hidden and replaced with a card view in the IncidentCards component

/**
 * Renders a table component with specified data based on the provided table and columns. The table component includes header groups and rows with cells, with optional display based on the column id. If there are no rows in the table data, a message 'No incidents found' is displayed. Returns JSX for the rendered table component.
 * @author Xander
 *
 * @param {{ table: any; columns: any; }} param0 An object containing table and columns properties.
 * @param {*} param0.table The table object representing the data to be rendered in the table component.
 * @param {*} param0.columns An array of column objects defining the columns to be displayed in the table.
 * @returns {*} Renders a table component with the specified columns and data from the provided table object.
 */
const IncidentTable = ({ table, columns }) => {
    return (
        <Table className="min-w-full hidden sm:table">
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead
                                key={header.id}
                                className={`px-4 py-2 ${
                                    header.column.id === 'actions'
                                        ? 'hidden sm:table-cell'
                                        : ''
                                }`}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                      )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    className={`px-4 py-2 ${
                                        cell.column.id === 'actions'
                                            ? 'hidden sm:table-cell'
                                            : ''
                                    }`}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="text-center px-4 py-2"
                        >
                            No incidents found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default IncidentTable;
