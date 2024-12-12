import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@headlessui/react';

export default function CaseDiscussion() {
    return (
        <div className="grid gap-2">
            <Card className="p-4">
                <CardTitle>UserName</CardTitle>

                <CardDescription>22-11-25, 10:00am</CardDescription>
                <CardContent className="p-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia placeat ut perspiciatis suscipit eligendi, deleniti non
                    autem iure dicta officia hic aliquid quam eaque nam sint
                    deserunt. Amet, adipisci a.
                </CardContent>
            </Card>
            <Card className="p-4">
                <CardTitle>UserName</CardTitle>

                <CardDescription>22-11-25, 10:00am</CardDescription>
                <CardContent className="p-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia placeat ut perspiciatis suscipit eligendi, deleniti non
                    autem iure dicta officia hic aliquid quam eaque nam sint
                    deserunt. Amet, adipisci a.
                </CardContent>
            </Card>
        </div>
    );
}
