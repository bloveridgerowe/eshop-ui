import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/api/hooks/customer-hooks";
import { errorMessage } from "@/utilities/errors";
import { useToast } from "@/components/ui/use-toast";

export function LogoutButton() {
    const { successToast, errorToast } = useToast();
    const { mutateAsync: logoutMutation, isPending: isLoggingOut } = useLogout();

    const handleLogout = async () => {
        try {
            await logoutMutation();
            successToast("You have been logged out.");
        }
        catch (error) {
            errorToast(errorMessage("Failed to logout. Please try again later.", error));
        }
    };

    return (
        <Button variant="destructive" onClick={handleLogout} disabled={isLoggingOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
    );
}
