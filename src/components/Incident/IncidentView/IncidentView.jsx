import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import CaseDiscussionComponent from '../CaseDiscussion/CaseDiscussion';

export default function IncidentView({ incident, onRefresh }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/incidents/${incident._id}/edit`);
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
                    <Badge variant="outline">{incident.severity}</Badge>
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
