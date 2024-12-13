import { z } from 'zod';

export const incidentSchema = z.object({
    title: z.string().min(2, 'Title is required'),
    // incidentAutoId is set by backend
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters'),
    severity: z.enum(['Low', 'Medium', 'High', 'Critical']),
    environment: z.enum(['Production', 'Staging', 'Development']),
    // createdBy is set by the JWT
    affectedSystems: z.string().min(2, 'Affected systems are required'),
    impactSummary: z.string().min(10, 'Impact summary is required'),
    stepsToReproduce: z.string().min(10, 'Steps to reproduce are required'),
    assignedTo: z.string().optional(),
    tags: z.array(z.string()).max(10, 'You can add up to 10 tags'),
    relatedLinks: z.array(z.string().url()).optional(),
    relatedIncidents: z.array(z.string()).optional(),
    status: z.enum(['Open', 'In Progress', 'Resolved', 'Closed']).optional(),
    // updatedBy is set by JWT
    // resolvedAt is set by the backend based on when status is marked resolved
    resolutionDetails: z.string().max(1000).optional(),
});
