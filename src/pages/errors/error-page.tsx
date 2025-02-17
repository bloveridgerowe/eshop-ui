import { XCircle } from "lucide-react";
import {ReactNode} from "react";

export interface ErrorPageProps {
    title: string;
    message: string;
    children?: ReactNode;
}

export function ErrorPage({ title, message, children }: ErrorPageProps) {
    return (
        <div className="max-w-2xl mx-auto py-8 px-4 text-center">
            <div className="mb-6">
                <XCircle className="h-16 w-16 mx-auto text-red-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <p className="text-muted-foreground mb-8">
                {message}
            </p>
            {children && (
                <div className="space-y-4">
                    {children}
                </div>
            )}
        </div>
    );
}
