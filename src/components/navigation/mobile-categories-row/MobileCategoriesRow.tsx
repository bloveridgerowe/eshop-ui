import { Suspense } from "react";
import { MobileCategoriesRowList } from "@/components/navigation/mobile-categories-row/MobileCategoriesRowList";
import { MobileCategoriesRowListSkeleton } from "@/components/navigation/mobile-categories-row/MobileCategoriesRowList";

export function MobileCategoriesRow() {
    return (
        <div className="border-b border-input w-full min-h-[var(--mobile-categories-height)]">
            <Suspense fallback={<MobileCategoriesRowListSkeleton />}>
                <MobileCategoriesRowList />
            </Suspense>
        </div>
    );
}
