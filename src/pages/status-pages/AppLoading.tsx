import { CenteredSpinner } from "@/pages/utility-pages/CenteredSpinner.tsx";

export function AppLoading() {
    console.log("APP LOADING");
    return (
        <div className="min-h-dvh flex items-center justify-center">
            <CenteredSpinner delay={2000} />
        </div>
    );
}
