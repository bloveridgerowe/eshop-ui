import { useSelector, useDispatch } from "react-redux";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { acceptDisclaimer } from "@/state/disclaimer-slice.ts";
import { RootState } from "@/state/store.ts";

export const DisclaimerModal = () => {
    const hasAcceptedDisclaimer = useSelector((state: RootState) => state.disclaimer.hasAcceptedDisclaimer);
    const dispatch = useDispatch();

    if (hasAcceptedDisclaimer) {
        return null;
    }

    return (
        <AlertDialog open>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Important Notice</AlertDialogTitle>
                    <AlertDialogDescription>
                        This is a demo e-commerce site for portfolio purposes. Orders and payments are not real.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => dispatch(acceptDisclaimer())}>
                        Accept & Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
