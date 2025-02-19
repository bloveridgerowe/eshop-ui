import {Skeleton} from "@/components/shadcn/skeleton.tsx";

export function CategoriesSideBarListSkeleton() {
    return (
        <ul className="flex flex-col gap-6 space-y-2">
            <li>
                <Skeleton className="h-10 w-24 rounded-lg" />
            </li>
            {Array.from({ length: 15 }).map((_, i) => (
                <li key={i}>
                    <Skeleton className="h-4 w-20 rounded-3xl" />
                </li>
            ))}
        </ul>
    );
}
