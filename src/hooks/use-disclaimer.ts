import { useState, useEffect } from "react";

export function useDisclaimer() {
    const [ hasAccepted, setHasAccepted ] = useState(false);

    useEffect(() => {
        setHasAccepted(JSON.parse(localStorage.getItem("hasAcceptedDisclaimer") || "false"));
    }, []);

    const acceptDisclaimer = () => {
        localStorage.setItem("hasAcceptedDisclaimer", "true");
        setHasAccepted(true);
    };

    return { hasAccepted, acceptDisclaimer };
}
