import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
import { useEffect, useState } from 'react';
import { useUserAuthContext } from '@/contexts/UserAuthContextProvider';
import { createIncident } from '../incident';
import { incidentSchema } from '../incidentSchema';

export default function IncidentForm({ initialData = {}, mode = 'create' }) {
    const navigate = useNavigate();
    const [links, setLinks] = useState(initialData.relatedLinks || []);
    const [tags, setTags] = useState(initialData.tags || []);

    const form = useForm({
        resolver: zodResolver(incidentSchema),
        defaultValues: {
            title: initialData.title || '',
            description: initialData.description || '',
            severity: initialData.severity || 'Low',
            environment: initialData.environment || 'Production',
            affectedSystems: initialData.affectedSystems || '',
            impactSummary: initialData.impactSummary || '',
            stepsToReproduce: initialData.stepsToReproduce || '',
            assignedTo: initialData.assignedTo || '',
            tags: initialData.tags || [],
            relatedLinks: initialData.relatedLinks || [],
            relatedIncidents: initialData.relatedIncidents || [],
            status: initialData.status || 'Open',
            resolutionDetails: initialData.resolutionDetails || '',
            resolvedAt: initialData.resolvedAt || '',
        },
    });

    // Update form fields when initialData changes
    useEffect(() => {
        form.reset(initialData);
        setLinks(initialData.relatedLinks || []);
        setTags(initialData.tags || []);
    }, [initialData, form]);

    // Handler for parsing links
    const handleLinkInputChange = (e) => {
        const value = e.target.value;
        const linkArray = value
            .split(/[\n,]+/)
            .map((link) => link.trim())
            .filter((link) => link !== '');
        setLinks(linkArray);
        form.setValue('relatedLinks', linkArray);
    };

    // Handler for parsing tags
    const handleTagInputChange = (e) => {
        const value = e.target.value;
        const tagArray = value
            .split(/[\n,]+/)
            .map((tag) => tag.trim())
            .filter((tag) => tag !== '');
        setTags(tagArray);
        form.setValue('tags', tagArray);
    };

    // Submit handler
    const [userJwt] = useUserAuthContext();

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                relatedLinks: links,
                tags: tags,
            };

            await createIncident(payload, userJwt);
            toast.success(
                mode === 'edit'
                    ? 'Incident updated successfully!'
                    : 'Incident created successfully!'
            );
            navigate('/dashboard');
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Failed to save data.');
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-4"
            >
                <h1 className="text-2xl font-bold">
                    {mode === 'edit' &&
                        `Incident ID: ${form.getValues('incidentAutoId')}`}
                </h1>
                <Separator />

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
                <Separator />

                <h3 className="font-bold">Impact</h3>
                <div className="grid md:grid-cols-2 gap-4">
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
                <Separator />
                <h3 className="font-bold">Scope</h3>
                <div className="grid gap-4">
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
                <Separator />

                <h3 className="font-bold">Supporting Information</h3>
                <div className="grid gap-4">
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
                            {/* Links and References */}
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
                                                onChange={handleLinkInputChange}
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
                            {/* Tags */}
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter tags separated by commas or newlines"
                                                onChange={handleTagInputChange}
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
                {/* Conditional Fields for Edit Mode */}
                {mode === 'edit' && (
                    <>
                        <Separator />

                        <h3 className="font-bold">Current Status</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                {/* Incident Status */}
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Incident Status
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Open">
                                                        Open
                                                    </SelectItem>
                                                    <SelectItem value="In Progress">
                                                        In Progress
                                                    </SelectItem>
                                                    <SelectItem value="Resolved">
                                                        Resolved
                                                    </SelectItem>
                                                    <SelectItem value="Closed">
                                                        Closed
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                {/* Resolution Details field - only visible if status is closed or resolved */}
                                {form.watch('status') === 'Resolved' ||
                                form.watch('status') === 'Closed' ? (
                                    <FormField
                                        control={form.control}
                                        name="resolutionDetails"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Resolution Details
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe the resolution"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ) : null}
                            </div>
                            <div className="grid gap-2">
                                <FormLabel>Resolved At</FormLabel>
                                <p className="text-sm">
                                    {form.getValues('resolvedAt')
                                        ? new Date(
                                              form.getValues('resolvedAt')
                                          ).toLocaleString()
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? mode === 'edit'
                            ? 'Updating...'
                            : 'Creating...'
                        : mode === 'edit'
                          ? 'Update Incident'
                          : 'Create Incident'}
                </Button>
            </form>
        </Form>
    );
}
