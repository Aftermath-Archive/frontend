import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import CaseDiscussionComponent from '../CaseDiscussion/CaseDiscussion';

/**
 * A React component that displays detailed information about an incident. It takes in an incident object and a function to trigger a refresh. The component renders the incident title, auto ID, description, severity, environment, affected systems, impact summary, steps to reproduce, tags, related links, status, resolved date, resolution details, and provides a button to edit the incident. It also includes a CaseDiscussionComponent for discussing the incident. The handleEdit function allows the user to navigate to the edit page for the incident.
 * @author Xander
 *
 * @export
 * @param {{ incident: any; onRefresh: any; }} param0 An object containing incident details
 * @param {*} param0.incident Details of the incident
 * @param {*} param0.onRefresh Function to refresh the incident details
 * @returns {*} A React functional component that displays details of an incident including title, auto ID, description, severity, environment, affected systems, impact summary, steps to reproduce, tags, related links, status, resolved at, and resolution details. Allows the user to edit the incident and view case discussions. Requires the incident object and a refresh callback function as props.
 */
export default function IncidentView({ incident, onRefresh }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/incidents/${incident._id}/edit`);
    };

    const severityColors = {
        Low: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-orange-100 text-orange-800',
        Critical: 'bg-red-100 text-red-800',
    };

    return (
        <div className="p-4 space-y-4">
            {incident.title && (
                <h1 className="text-3xl font-bold">{incident.title}</h1>
            )}
            {incident.incidentAutoId && (
                <h2 className="text-xl font-semibold">
                    {incident.incidentAutoId}
                </h2>
            )}
            <Separator />

            {incident.description && (
                <div>
                    <h2 className="text-xl font-semibold">Description</h2>
                    <p>{incident.description}</p>
                </div>
            )}
            {incident.severity && (
                <div>
                    <h2 className="text-xl font-semibold">Severity</h2>
                    <Badge
                        variant="outline"
                        className={`${
                            severityColors[incident.severity] ||
                            'bg-gray-200 text-gray-800'
                        }`}
                    >
                        {incident.severity}
                    </Badge>
                </div>
            )}
            {incident.environment && (
                <div>
                    <h2 className="text-xl font-semibold">Environment</h2>
                    <Badge variant="outline">{incident.environment}</Badge>
                </div>
            )}
            {incident.affectedSystems && (
                <div>
                    <h2 className="text-xl font-semibold">Affected Systems</h2>
                    <p>{incident.affectedSystems}</p>
                </div>
            )}
            {incident.impactSummary && (
                <div>
                    <h2 className="text-xl font-semibold">Impact Summary</h2>
                    <p>{incident.impactSummary}</p>
                </div>
            )}
            {incident.stepsToReproduce && (
                <div>
                    <h2 className="text-xl font-semibold">
                        Steps to Reproduce
                    </h2>
                    <p>{incident.stepsToReproduce}</p>
                </div>
            )}
            {incident.tags && (
                <div>
                    <h2 className="text-xl font-semibold">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                        {incident.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
            {incident.relatedLinks && (
                <div>
                    <h2 className="text-xl font-semibold">Related Links</h2>
                    <div className="flex flex-wrap gap-2">
                        {incident.relatedLinks.map((link, index) => (
                            <Badge key={index} variant="outline">
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link}
                                </a>
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
            {incident.status && (
                <div>
                    <h2 className="text-xl font-semibold">Status</h2>
                    <Badge variant="outline">{incident.status}</Badge>
                </div>
            )}
            {incident.resolvedAt && (
                <div>
                    <h2 className="text-xl font-semibold">Resolved At</h2>
                    <p>{incident.resolvedAt}</p>
                </div>
            )}
            {incident.resolutionDetails && (
                <div>
                    <h2 className="text-xl font-semibold">
                        Resolution Details
                    </h2>
                    <p>{incident.resolutionDetails}</p>
                </div>
            )}
            <Button className="w-full" onClick={handleEdit}>
                Edit Incident
            </Button>
            <CaseDiscussionComponent
                caseDiscussion={incident.caseDiscussion}
                incidentId={incident._id}
                onDiscussionAdded={onRefresh}
            />
        </div>
    );
}
