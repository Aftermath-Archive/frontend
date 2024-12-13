// src/schemas/incidentSchema.js
import { z } from 'zod';

export const createIncidentSchema = z.object({
    title: z.string().min(2, 'Title is required'),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters'),
    severity: z.enum(['Low', 'Medium', 'High', 'Critical']),
    environment: z.enum(['Production', 'Staging', 'Development']),
    affectedSystems: z.string().min(2, 'Affected systems are required'),
    impactSummary: z.string().min(10, 'Impact summary is required'),
    stepsToReproduce: z.string().min(10, 'Steps to reproduce are required'),
    assignedTo: z.string().optional(),
    tags: z.array(z.string()).max(10, 'You can add up to 10 tags'),
    relatedLinks: z.array(z.string().url()).optional(),
    relatedIncidents: z.array(z.string()).optional(),
});
