import { ResultPage, ResultPageHeader, ResultPageMessage, ResultPageActions } from "@/pages/utility-pages/ResultPage";
import { Button } from "@/components/ui/button";

export function SomethingWentWrong() {
    return (
        <ResultPage variant="warning">
            <ResultPageHeader>Something went wrong</ResultPageHeader>
            <ResultPageMessage>An unexpected error occurred. Please try again.</ResultPageMessage>
            <ResultPageActions>
                <Button onClick={() => window.location.reload()} className="w-full">
                    Try Again
                </Button>
            </ResultPageActions>
        </ResultPage>
    );
}
