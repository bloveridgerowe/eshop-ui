import { ReactNode } from "react";

interface UserPageLayoutProps {
    title: string;
    titleButton?: ReactNode;
    children: ReactNode;
}

export function UserPageContent({ title, titleButton, children }: UserPageLayoutProps) {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[500px]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    {titleButton && <div>{titleButton}</div>}
                </div>
                <div className="space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
