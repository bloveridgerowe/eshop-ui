import { LoadingSpinnerPage } from "@/pages/utility-pages/LoadingSpinnerPage";

export function AppLoading() {
    return (
        <div className="h-dvh flex items-center justify-center">
            <LoadingSpinnerPage delay={2000} />
        </div>
    );
}
