import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import CaseDiscussionComponent from '../CaseDiscussion/CaseDiscussion';

export default function IncidentView({ incident }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/incidents/${incident.id}/edit`);
    };

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-3xl font-bold">{incident.title}</h1>
            <h2 className="text-xl font-semibold">{incident.incidentAutoId}</h2>
            <Separator />

            <div>
                <h2 className="text-xl font-semibold">Description</h2>
                <p>{incident.description}</p>
            </div>
            <div>
                <h2 className="text-xl font-semibold">Severity</h2>
                <Badge variant="outline">{incident.severity}</Badge>
            </div>
            <div>
                <h2 className="text-xl font-semibold">Environment</h2>
                <Badge variant="outline">{incident.environment}</Badge>
            </div>
            <div>
                <h2 className="text-xl font-semibold">Affected Systems</h2>
                <p>{incident.affectedSystems}</p>
            </div>
            <div>
                <h2 className="text-xl font-semibold">Impact Summary</h2>
                <p>{incident.impactSummary}</p>
            </div>
            <div>
                <h2 className="text-xl font-semibold">Steps to Reproduce</h2>
                <p>{incident.stepsToReproduce}</p>
            </div>
            {/* assigned to */}
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
            {/* status */}
            {/* resolved at */}
            {/* resolution details */}
            <Button onClick={handleEdit}>Edit Incident</Button>
            <CaseDiscussionComponent />
        </div>
    );
}
