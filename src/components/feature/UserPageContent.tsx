import { ReactNode, Suspense } from "react";
import { LoadingSpinnerPage } from "@/pages/utility-pages/LoadingSpinnerPage";

interface UserPageContentProps {
    title: string;
    actionButton?: ReactNode;
    children: ReactNode;
}

export function UserPageContent({ title, actionButton, children }: UserPageContentProps) {
    return (
        <Suspense fallback={<LoadingSpinnerPage/>}>
            <div className="flex flex-col items-center w-full p-2">
                <div className="w-full max-w-[500px]">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold ml-0.5">{title}</h1>
                        {actionButton && <div>{actionButton}</div>}
                    </div>
                    <div className="space-y-4">
                        {children}
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
