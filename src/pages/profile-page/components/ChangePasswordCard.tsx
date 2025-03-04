import { Lock } from "lucide-react";
import { LabelledInput } from "@/components/ui/LabelledInput";
import { Button } from "@/components/ui/button";
import { useChangePassword } from "@/api/hooks/customer-hooks";
import { errorMessage } from "@/utilities/errors";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ProfileCard } from "@/pages/profile-page/components/ProfileCard";

// TODO: Implement react-hook-form validation

export function ChangePasswordCard() {
    const { successToast, errorToast } = useToast();
    const { mutateAsync: changePassword, isPending: isChangingPassword } = useChangePassword();
    const [ password, setPassword ] = useState({ current: "", new: "" });

    const handleUpdatePassword = async () => {
        try {
            await changePassword({
                currentPassword: password.current,
                newPassword: password.new,
            });
            successToast("Password changed successfully!");
        }
        catch (error) {
            errorToast(errorMessage("Failed to change password. Please try again later.", error));
        }
    };

    return (
        <ProfileCard title="Change Password" icon={Lock}>
            <LabelledInput type="password" label="Current Password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })}/>
            <LabelledInput type="password" label="New Password" value={password.new} onChange={(e) => setPassword({ ...password, new: e.target.value })}/>
            <Button type="submit" className="w-full" onClick={handleUpdatePassword} disabled={isChangingPassword}>
                {isChangingPassword ? "Changing..." : "Change Password"}
            </Button>
        </ProfileCard>
    );
}
