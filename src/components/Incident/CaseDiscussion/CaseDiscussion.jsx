import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { fetchUsernameById } from '../incident';

export default function CaseDiscussionComponent({
    caseDiscussion = [],
    onAddDiscussion,
}) {
    const [newMessage, setNewMessage] = useState('');
    const [usernames, setUsernames] = useState({});

    // TO DO
    // Handle adding a new discussion entry
    const handleAddMessage = () => {
        if (newMessage.trim()) {
            onAddDiscussion(newMessage);
            setNewMessage('');
        }
    };

    // Fetch usernames for each author in the discussion
    useEffect(() => {
        const fetchUsernames = async () => {
            const uniqueAuthors = [
                ...new Set(caseDiscussion.map((entry) => entry.author)),
            ];
            const usernameMap = {};

            await Promise.all(
                uniqueAuthors.map(async (authorId) => {
                    const name = await fetchUsernameById(authorId);
                    usernameMap[authorId] = name;
                })
            );

            setUsernames(usernameMap);
        };

        if (caseDiscussion.length > 0) {
            fetchUsernames();
        }
    }, [caseDiscussion]);

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Case Discussion</h2>

            {/* Render each discussion entry */}
            <div className="grid gap-4">
                {caseDiscussion.length > 0 ? (
                    caseDiscussion.map((entry, index) => (
                        <Card key={index} className="p-4">
                            <CardTitle>
                                {usernames[entry.author] || 'Unknown User'}
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
                <Button className="mt-2 w-full" onClick={handleAddMessage}>
                    Add Comment
                </Button>
            </div>
        </div>
    );
}
