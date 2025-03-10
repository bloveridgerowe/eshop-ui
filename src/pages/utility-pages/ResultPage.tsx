import { CheckCircle2, XCircle, Info, TriangleAlert } from "lucide-react";
import { ReactNode } from "react";

export interface ResultPageProps {
    variant: "success" | "error" | "info" | "warning"; // ⬅️ Added "warning"
    children: ReactNode;
    className?: string;
}

export function ResultPage({ variant, children, className }: ResultPageProps) {
    return (
        <div className={`max-w-2xl mx-auto py-8 px-4 text-center flex flex-col items-center justify-center gap-4 h-full pb-[20vh] ${className || ""}`}>
            {variant === "success" ? (
                <CheckCircle2 className="h-16 w-16 mx-auto text-green-500" />
            ) : variant === "error" ? (
                <XCircle className="h-16 w-16 mx-auto text-red-500" />
            ) : variant === "warning" ? (
                <TriangleAlert className="h-16 w-16 mx-auto text-orange-500" />
            ) : (
                <Info className="h-16 w-16 mx-auto text-blue-500" />
            )}
            {children}
        </div>
    );
}

export interface ResultComponentProps {
    children: ReactNode;
    className?: string;
}

export function ResultPageHeader({ children, className }: ResultComponentProps) {
    return (
        <h1 className={`text-2xl font-bold ${className || ""}`}>{children}</h1>
    );
}

export function ResultPageMessage({ children, className }: ResultComponentProps) {
    return (
        <p className={`text-muted-foreground ${className || ""}`}>{children}</p>
    );
}

export function ResultPageActions({ children, className }: ResultComponentProps) {
    return (
        <div className={`my-2 space-y-4 flex flex-col items-center ${className || ""}`}>{children}</div>
    );
}
