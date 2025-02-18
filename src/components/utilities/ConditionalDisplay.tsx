import { ReactNode } from "react";

export interface ConditionalDisplayProps {
    visible: boolean;
    content: ReactNode;
}

export function ConditionalDisplay({ visible, content }: ConditionalDisplayProps) {
    return (
        <div style={{ visibility: visible ? "visible" : "hidden" }}>
            {content}
        </div>
    );
}
