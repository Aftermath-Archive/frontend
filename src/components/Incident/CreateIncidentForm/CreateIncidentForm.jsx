import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export default function CreateIncidentForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="text-2xl">Create New Incident</CardTitle>
                <CardDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti pariatur nam distinctio.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CardTitle className="text-xl">Core Details</CardTitle>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Incident Description</Label>
                        {/* TO DO */}
                        {/* text large */}
                        <Input
                            id="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Severity Level</Label>
                        {/* TO DO */}
                        {/* DROPDOWN */}
                        {/* ['Low', 'Medium', 'High', 'Critical'] */}
                        <Input
                            id="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <CardTitle className="text-xl">Metadata</CardTitle>
                    <div className="grid md:grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Date and Time</Label>
                            <Input
                                id="Username"
                                type="username"
                                placeholder="1337_Dev"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Incident Environment</Label>
                            {/* TO DO */}
                            {/* DROPDOWN */}
                            {/* ['Production', 'Staging', 'Development'] */}
                            <Input
                                id="Username"
                                type="username"
                                placeholder="1337_Dev"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <CardTitle className="text-xl">
                        Responsible Parties
                    </CardTitle>
                    <div className="grid md:grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Reporter</Label>
                            <Input
                                id="Username"
                                type="username"
                                placeholder="1337_Dev"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Assigned Team</Label>
                            {/* TO DO */}
                            {/* DROPDOWN */}
                            {/* ['Production', 'Staging', 'Development'] */}
                            <Input
                                id="Username"
                                type="username"
                                placeholder="1337_Dev"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <CardTitle className="text-xl">Impact and Scope</CardTitle>
                    <div className="grid md:grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Affected Systems</Label>
                            <Input
                                id="Username"
                                type="username"
                                placeholder="1337_Dev"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Impact Summary</Label>
                            {/* TO DO */}
                            {/* DROPDOWN */}
                            {/* ['Production', 'Staging', 'Development'] */}
                            <Input
                                id="Username"
                                type="username"
                                placeholder="1337_Dev"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <CardTitle className="text-xl">
                        Supporting Information
                    </CardTitle>
                    <div className="grid md:grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Steps to Reproduce</Label>
                            <Input
                                id="Username"
                                type="username"
                                placeholder="1337_Dev"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Links and References</Label>
                            {/* TO DO */}
                            {/* DROPDOWN */}
                            {/* ['Production', 'Staging', 'Development'] */}
                            <Input
                                id="Username"
                                type="username"
                                placeholder="1337_Dev"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Related Incidents</Label>
                            {/* TO DO */}
                            {/* DROPDOWN */}
                            {/* ['Production', 'Staging', 'Development'] */}
                            <Input
                                id="Username"
                                type="username"
                                placeholder="1337_Dev"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <CardTitle className="text-xl">Tracking</CardTitle>
                    <div className="grid md:grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Tags</Label>
                            <Input
                                id="Username"
                                type="username"
                                placeholder="1337_Dev"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Incident ID</Label>
                            {/* TO DO */}
                            {/* DROPDOWN */}
                            {/* ['Production', 'Staging', 'Development'] */}
                            <Input
                                id="Username"
                                type="username"
                                placeholder="1337_Dev"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button
                    onClick={loading}
                    className="w-full mt-4"
                    disabled={loading}
                >
                    {loading ? 'Creating incident...' : 'Submit'}
                </Button>
            </CardContent>
        </Card>
    );
}
