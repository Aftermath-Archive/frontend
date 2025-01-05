import React, { useMemo, useState } from 'react';
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

import useFetchIncidents from '@/hooks/useFetchIncidents';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';

// Define color palettes for different groupings
const statusColors = {
    Open: 'hsl(0, 100%, 50%)', // Red
    'In Progress': 'hsl(45, 100%, 50%)', // Yellow
    Resolved: 'hsl(120, 100%, 40%)', // Green
    Closed: 'hsl(210, 100%, 50%)', // Blue
};

const severityColors = {
    Low: 'hsl(120, 50%, 70%)', // Light Green
    Medium: 'hsl(60, 100%, 50%)', // Orange
    High: 'hsl(30, 100%, 50%)', // Dark Orange
    Critical: 'hsl(0, 100%, 50%)', // Red
};

/**
 * Fetches and processes incident data to display a chart representing the count of incidents based on grouping by 'Status' or 'Severity'. Allows toggling between 'Status' and 'Severity'. The chart displays the total incidents, dynamic group labels, and colors. Includes loading state handling and interactive toggling between 'Status' and 'Severity' groupings.
 * @author Xander
 *
 * @returns {*} This function retrieves incident data using useFetchIncidents hook, processes and categorizes the data based on 'Status' or 'Severity', generates chart data, calculates total incidents, updates chart configuration dynamically, and renders a chart displaying incident counts categorized by the selected group.
 */
export default function InteractiveChart() {
    const { fetchedData, loading } = useFetchIncidents();

    // State to toggle between 'Status' and 'Severity'
    const [activeGroup, setActiveGroup] = useState('Status');

    // Determine the current color palette and grouping key
    const currentColors =
        activeGroup === 'Status' ? statusColors : severityColors;
    const groupKey = activeGroup === 'Status' ? 'status' : 'severity';

    // Process fetched data to count incidents by the selected grouping
    const chartData = useMemo(() => {
        const groupCount = fetchedData.reduce((acc, incident) => {
            const group = incident[groupKey] || 'Unknown';
            acc[group] = (acc[group] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(groupCount).map(([group, count]) => ({
            group,
            count,
            fill: currentColors[group] || 'hsl(0, 0%, 80%)', // Default color if group not defined
        }));
    }, [fetchedData, groupKey, currentColors]);

    // Calculate total counts for each group
    const total = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0);
    }, [chartData]);

    // Update chartConfig with dynamic group labels and colors
    const dynamicChartConfig = useMemo(() => {
        const config = {
            count: {
                label: 'Number of Incidents',
            },
        };

        chartData.forEach((data) => {
            config[data.group] = {
                label: data.group.charAt(0).toUpperCase() + data.group.slice(1),
                color: data.fill,
            };
        });

        return config;
    }, [chartData]);

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Incidents by {activeGroup}</CardTitle>
                    <CardDescription>
                        Showing total incidents categorized by{' '}
                        {activeGroup.toLowerCase()}
                    </CardDescription>
                </div>
                <div className="flex">
                    {['Status', 'Severity'].map((key) => (
                        <button
                            key={key}
                            data-active={activeGroup === key}
                            className={`relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left 
                sm:border-l sm:border-t-0 sm:px-8 sm:py-6
                ${activeGroup === key ? 'bg-muted/50' : 'hover:bg-muted/20'}`}
                            onClick={() => setActiveGroup(key)}
                        >
                            <span className="text-xs text-muted-foreground">
                                {key}
                            </span>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                                {chartData
                                    .reduce((acc, curr) => acc + curr.count, 0)
                                    .toLocaleString()}
                            </span>
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <ChartContainer
                        config={dynamicChartConfig}
                        className="min-w-full max-h-[400px]" // Adjust height as needed here
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="group"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    tickFormatter={(value) =>
                                        dynamicChartConfig[value]?.label ||
                                        value
                                    }
                                />
                                <YAxis
                                    allowDecimals={false}
                                    domain={[
                                        0,
                                        (dataMax) => Math.ceil(dataMax * 1.2),
                                    ]}
                                />
                                <Tooltip
                                    content={
                                        <ChartTooltipContent
                                            className="w-[150px]"
                                            nameKey="count"
                                            labelFormatter={(value) => value}
                                        />
                                    }
                                />
                                <Bar
                                    dataKey="count"
                                    radius={[8, 8, 0, 0]}
                                    label={{ position: 'top' }}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.fill}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
