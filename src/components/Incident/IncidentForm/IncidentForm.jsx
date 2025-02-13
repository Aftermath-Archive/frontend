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
import { createIncident, updateIncident } from '../incident';
import { incidentSchema } from '../incidentSchema';

/**
 * A form component for creating or editing incident information. It includes fields for incident title, description, severity, environment, affected systems, impact summary, steps to reproduce, assigned team member, tags, related links, related incidents, status, and resolution details. The component handles input changes for tags and links. It also includes form submission logic for creating or updating incidents based on the mode ('create' or 'edit').
 * @author Xander
 *
 * @export
 * @param {{ initialData?: {}; mode?: string; incidentId: any; }} param0 The parameters for the IncidentForm function
 * @param {{}} [param0.initialData={}]
 * @param {string} [param0.mode='create']
 * @param {*} param0.incidentId The ID of the incident
 * @returns {*} A form component for creating or editing incident details. Handles form submission, input validation, and conversion between array and string fields.
 */
export default function IncidentForm({
    initialData = {},
    mode = 'create',
    incidentId,
}) {
    const navigate = useNavigate();
    const [userJwt] = useUserAuthContext();

    const form = useForm({
        resolver: zodResolver(incidentSchema),
        defaultValues: {
            title: '',
            description: '',
            severity: 'Low',
            environment: 'Production',
            affectedSystems: '',
            impactSummary: '',
            stepsToReproduce: '',
            assignedTo: '',
            tags: [],
            relatedLinks: [],
            relatedIncidents: [],
            status: 'Open',
            resolutionDetails: '',
        },
    });

    /**
     * The following helper functions are to handle the tags and links fields
     * The form takes a textarea, but the backend expects an array of strings
     * As such for any change we need to keep track of changes in the field with useState
     * We then also need to convert from string -> arr[string] and vice versa
     */
    // Separate state variables for input strings
    const [tagsInput, setTagsInput] = useState(
        initialData.tags ? initialData.tags.join(', ') : ''
    );
    const [linksInput, setLinksInput] = useState(
        initialData.relatedLinks ? initialData.relatedLinks.join(', ') : ''
    );

    // Helper functions to convert between array and string
    const arrayToString = (arr) =>
        arr && arr.length > 0 ? arr.join(', ') : '';
    const stringToArray = (str) =>
        str
            .split(/[\n,]+/)
            .map((item) => item.trim())
            .filter((item) => item !== '');

    // Handlers for input changes
    const handleTagsChange = (e) => {
        const inputValue = e.target.value;
        setTagsInput(inputValue);
        const tagsArray = stringToArray(inputValue);
        form.setValue('tags', tagsArray);
    };

    const handleLinksChange = (e) => {
        const inputValue = e.target.value;
        setLinksInput(inputValue);
        const linksArray = stringToArray(inputValue);
        form.setValue('relatedLinks', linksArray);
    };

    // Update form fields only in EDIT mode when initialData changes
    useEffect(() => {
        if (mode === 'edit') {
            form.reset({
                title: initialData.title || '',
                incidentAutoId: initialData.incidentAutoId || '',
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
            });

            // Initialize input strings based on initialData
            setTagsInput(arrayToString(initialData.tags));
            setLinksInput(arrayToString(initialData.relatedLinks));
        }
    }, [initialData, mode]);

    // Submit handler
    const onSubmit = async (data) => {
        try {
            if (mode === 'create') {
                const payload = { ...data };
                const createdIncident = await createIncident(payload, userJwt);
                toast.success('Incident created successfully!');
                toast.warn(
                    'Incidents created on demo site are deleted every 24 hours.'
                );
                navigate(`/incidents/${createdIncident.id}`); // Navigate to the new incident's detail page
            } else if (mode === 'edit') {
                const payload = { ...data };
                await updateIncident(incidentId, payload, userJwt);
                toast.success('Incident updated successfully!');
                toast.warn(
                    'Incidents updated on demo site are deleted every 24 hours.'
                );
                navigate(`/incidents/${incidentId}`); // Navigate to the updated incident's detail page
            }
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

                {/* Core Details */}
                <SectionTitle title="Core Details" />

                <div className="grid gap-4">
                    {/* Incident Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Incident Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter a brief descriptive title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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

                <Separator />

                {/* Impact */}
                <SectionTitle title="Impact" />
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Severity Level */}
                    <FormField
                        control={form.control}
                        name="severity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Severity Level</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select severity" />
                                        </SelectTrigger>
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
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Incident Environment */}
                    <FormField
                        control={form.control}
                        name="environment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Incident Environment</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select environment" />
                                        </SelectTrigger>
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
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Scope */}
                <Separator />
                <SectionTitle title="Scope" />
                <div className="grid gap-4">
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

                <Separator />

                {/* Supporting Information */}
                <SectionTitle title="Supporting Information" />
                <div className="grid gap-4">
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

                    <div className="grid md:grid-cols-2 gap-2">
                        {/* Links and References */}
                        <FormItem>
                            <FormLabel>
                                Links and References (Optional)
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter links separated by commas or newlines"
                                    value={linksInput}
                                    onChange={handleLinksChange}
                                />
                            </FormControl>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {form
                                    .watch('relatedLinks')
                                    .map((link, index) => (
                                        <Badge key={index} variant="outline">
                                            {link}
                                        </Badge>
                                    ))}
                            </div>
                            <FormMessage />
                        </FormItem>

                        {/* Tags */}
                        <FormItem>
                            <FormLabel>Tags (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter tags separated by commas or newlines"
                                    value={tagsInput}
                                    onChange={handleTagsChange}
                                />
                            </FormControl>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {form.watch('tags').map((tag, index) => (
                                    <Badge key={index} variant="outline">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    </div>
                </div>

                {/* Conditional Fields for Edit Mode */}
                {mode === 'edit' && (
                    <>
                        <Separator />
                        <SectionTitle title="Current Status" />
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Incident Status */}
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Incident Status</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
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
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Resolution Details */}
                            {(form.watch('status') === 'Resolved' ||
                                form.watch('status') === 'Closed') && (
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
                            )}

                            {/* Resolved At */}
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

    // Reusable SectionTitle component for better readability
    function SectionTitle({ title }) {
        return <h3 className="font-bold">{title}</h3>;
    }
}
