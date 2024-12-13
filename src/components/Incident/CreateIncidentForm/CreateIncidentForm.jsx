import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'react-toastify';
import { useState } from 'react';

// Validation Schema using Zod
export const createIncidentSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(1000, 'Description cannot exceed 1000 characters'),
    severity: z.enum(['Low', 'Medium', 'High', 'Critical']).default('Low'),
    environment: z.enum(['Production', 'Staging', 'Development']),
    affectedSystems: z
        .string()
        .min(2, 'Affected systems are required')
        .max(1000, 'Affected systems cannot exceed 1000 characters'),
    impactSummary: z
        .string()
        .min(10, 'Impact summary is required')
        .max(1000, 'Impact summary cannot exceed 1000 characters'),
    stepsToReproduce: z
        .string()
        .min(10, 'Steps to reproduce are required')
        .max(1000, 'Steps to reproduce cannot exceed 1000 characters'),
    assignedTo: z.string().optional().nullable(),
    tags: z
        .array(z.string())
        .max(10, 'You can only add up to 10 tags')
        .optional(),
    relatedLinks: z.array(z.string().url('Invalid URL')).optional(),
    relatedIncidents: z.array(z.string()).optional(),
});

export default function CreateIncidentForm() {
    const navigate = useNavigate();
    const [links, setLinks] = useState([]);
    const [tags, setTags] = useState([]);

    const handleLinkInputChange = (e) => {
        const value = e.target.value;
        // Split by commas or newlines and filter out empty strings
        const linkArray = value
            .split(/[\n,]+/)
            .map((link) => link.trim())
            .filter((link) => link !== '');
        setLinks(linkArray);
    };

    const handleTagInputChange = (e) => {
        const value = e.target.value;
        // Split by commas or newlines and filter out empty strings
        const tagArray = value
            .split(/[\n,]+/)
            .map((link) => link.trim())
            .filter((link) => link !== '');
        setTags(tagArray);
    };

    const form = useForm({
        resolver: zodResolver(createIncidentSchema),
        defaultValues: {
            title: '',
            description: '',
            severity: 'Low',
            environment: 'Production',
            affectedSystems: '',
            impactSummary: '',
            stepsToReproduce: '',
            assignedTo: null,
            tags: [],
            relatedLinks: [],
            relatedIncidents: [],
        },
    });

    const onSubmit = async (data) => {
        console.log('Form Data:', data);
        try {
            // Convert the links string into an array before sending it to the backend
            const linksArray = data['relatedLinks']
                .split(/[\n,]+/)
                .map((link) => link.trim())
                .filter((link) => link !== '');

            // Convert the tags string into an array before sending it to the backend
            const tagsArray = data['tags']
                .split(/[\n,]+/)
                .map((tag) => tag.trim())
                .filter((tag) => tag !== '');

            const payload = {
                ...data,
                links: linksArray,
                tags: tagsArray,
            };

            // TO DO
            // API request
            toast.success('Incident created successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating incident:', error);
            toast.error('Failed to create incident.');
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-4"
            >
                <h2 className="text-2xl font-semibold">Create New Incident</h2>
                <h3 className="font-bold">Core Details</h3>

                <div className="grid gap-4">
                    <div className="grid gap-2">
                        {/* Incident Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Incident Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter a brief descriptive title of the incident"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* incident auto ID is generated on submission */}
                    <div className="grid gap-2">
                        {/* Incident Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Incident Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe the incident"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <h3 className="font-bold">Impact</h3>
                <div className="grid md:grid-cols-2 gap-2">
                    <div className="grid gap-2">
                        {/* Severity Level */}
                        <FormField
                            control={form.control}
                            name="severity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Severity Level</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select severity" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Low">
                                                Low
                                            </SelectItem>
                                            <SelectItem value="Medium">
                                                Medium
                                            </SelectItem>
                                            <SelectItem value="High">
                                                High
                                            </SelectItem>
                                            <SelectItem value="Critical">
                                                Critical
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        {/* Incident Environment */}
                        <FormField
                            control={form.control}
                            name="environment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Incident Environment</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select environment" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Production">
                                                Production
                                            </SelectItem>
                                            <SelectItem value="Staging">
                                                Staging
                                            </SelectItem>
                                            <SelectItem value="Development">
                                                Development
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* created by field passed by JWT */}

                <h3 className="font-bold">Scope</h3>
                <div className="grid gap-2">
                    <div className="grid gap-2">
                        {/* Affected Systems */}
                        <FormField
                            control={form.control}
                            name="affectedSystems"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Affected Systems</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="What systems does this impact?"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        {/* Impact Summary */}
                        <FormField
                            control={form.control}
                            name="impactSummary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Impact Summary</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="What is the impact on the system?"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <h3 className="font-bold">Supporting Information</h3>
                <div className="grid gap-2">
                    <div className="grid gap-2">
                        {/* Steps to reproduce */}
                        <FormField
                            control={form.control}
                            name="stepsToReproduce"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Steps to reproduce</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="How can you reproduce the fault?"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            {/* Links and References to external documentation */}
                            <FormField
                                control={form.control}
                                name="relatedLinks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Links and References (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter links separated by commas or newlines"
                                                onChange={(e) => {
                                                    handleLinkInputChange(e);
                                                    field.onChange(
                                                        e.target.value
                                                    );
                                                }}
                                                value={field.value}
                                            />
                                        </FormControl>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {links.map((link, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                >
                                                    {link}
                                                </Badge>
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            {/* Tags for categorization */}
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter tags separated by commas or newlines"
                                                onChange={(e) => {
                                                    handleTagInputChange(e);
                                                    field.onChange(
                                                        e.target.value
                                                    );
                                                }}
                                                value={field.value}
                                            />
                                        </FormControl>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {tags.map((tag, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? 'Creating incident...'
                        : 'Submit'}
                </Button>
            </form>
        </Form>
    );
}
