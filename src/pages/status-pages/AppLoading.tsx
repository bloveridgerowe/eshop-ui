import { LoadingSpinnerPage } from "@/pages/utility-pages/LoadingSpinnerPage.tsx";

export function AppLoading() {
    return (
        <div className="min-h-dvh flex items-center justify-center">
            <LoadingSpinnerPage delay={2000} />
        </div>
    );
}
