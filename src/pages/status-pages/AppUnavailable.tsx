import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";

export function AppUnavailable() {
    return (
        <div className="h-dvh w-full">
            <ResultPage variant="error">
                <ResultPageHeader>Failed to load app.</ResultPageHeader>
                <ResultPageMessage>Please try again later.</ResultPageMessage>
            </ResultPage>
        </div>
    )
}
