import InAppLayout from '../Layout/InAppLayout';
import { Skeleton } from '../ui/skeleton';

export default function LoadingSkeleton() {
    return (
        <InAppLayout>
            <div className="flex justify-center items-center h-full flex-col space-y-4">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </InAppLayout>
    );
}
