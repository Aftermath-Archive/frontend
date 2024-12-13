import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function CaseDiscussionComponent({
    caseDiscussion = [],
    onAddDiscussion,
}) {
    const [newMessage, setNewMessage] = useState('');

    // TO DO
    // Handle adding a new discussion entry
    const handleAddMessage = () => {
        if (newMessage.trim()) {
            onAddDiscussion(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Case Discussion</h2>

            {/* Render each discussion entry */}
            <div className="grid gap-4">
                {caseDiscussion.length > 0 ? (
                    caseDiscussion.map((entry, index) => (
                        <Card key={index} className="p-4">
                            <CardTitle>
                                {entry.authorName || 'Unknown User'}
                            </CardTitle>
                            <CardDescription>
                                {format(
                                    new Date(entry.timestamp),
                                    'dd-MM-yy, hh:mm a'
                                )}
                            </CardDescription>
                            <CardContent className="p-2">
                                {entry.message}
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p>No discussion entries yet.</p>
                )}
            </div>

            {/* Form to add a new discussion entry */}
            <div className="mt-4">
                <Textarea
                    placeholder="Add a new message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={3}
                />
                <Button className="mt-2" onClick={handleAddMessage}>
                    Add Discussion
                </Button>
            </div>
        </div>
    );
}
