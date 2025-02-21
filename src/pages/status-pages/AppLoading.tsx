import { CenteredSpinner } from "@/pages/utility-pages/CenteredSpinner";

export function AppLoading() {
    return (
        <div className="min-h-dvh flex items-center justify-center">
            <CenteredSpinner delay={2000} />
        </div>
    );
}
