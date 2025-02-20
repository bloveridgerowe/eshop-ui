import { useState, useEffect } from "react";
import {Spinner} from "@/components/ui/Spinner.tsx";

interface CenteredSpinnerProps {
    delay?: number;
}

export function CenteredSpinner({ delay }: CenteredSpinnerProps) {
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [ delay ]);

    if (!showSpinner) {
        return null;
    }

    return (
        <div className="flex items-center justify-center h-full pb-[10vh]">
            <Spinner className="h-16 w-16"/>
        </div>
    )
}
