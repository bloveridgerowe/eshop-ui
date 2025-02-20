import { ResultPage, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";

export function AppUnavailable() {
    return (
        <div className="h-dvh w-full">
            <ResultPage variant="error">
                <ResultPageHeader>Failed to load app.</ResultPageHeader>
                <ResultPageMessage>The server is unreachable.</ResultPageMessage>
            </ResultPage>
        </div>
    )
}
