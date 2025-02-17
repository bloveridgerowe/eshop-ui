import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useDisclaimer } from "@/hooks/use-disclaimer";
import { Info } from "lucide-react";

export function DisclaimerModal() {
    const { hasAccepted, acceptDisclaimer } = useDisclaimer();

    if (hasAccepted === null) {
        return null;
    }

    return (
        <AlertDialog open={!hasAccepted}>
            <AlertDialogContent className="sm:max-w-[400px]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl gap-1.5 font-bold flex items-center text-left">
                        <Info strokeWidth="2.4" className="h-[2rem] w-[2rem]" />
                        Important Notice
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-left py-2">
                        This is a demo e-commerce site for portfolio purposes. While users can explore, sign up, and place orders, no real payments are processed, and no actual products will be shipped. This is purely a showcase of my skills in full-stack development.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="w-full" onClick={acceptDisclaimer}>
                        Accept & Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
