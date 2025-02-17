import { User } from "lucide-react";
import { LabelledInput } from "@/components/ui/LabelledInput";
import { Button } from "@/components/shadcn/button";
import { useUpdateName } from "@/api/hooks/customer-hooks";
import { errorMessage } from "@/utilities/errors";
import { useState } from "react";
import { useToast } from "@/components/shadcn/use-toast";
import { ProfileCard } from "./ProfileCard";
import { useAuth } from "@/hooks/use-auth";

export function PersonalDetailsCard() {
    const { user } = useAuth();
    const { successToast, errorToast } = useToast();
    const [ name, setName ] = useState(user?.name || "");
    const { mutateAsync: updateName, isPending: isUpdatingName } = useUpdateName();

    const handleUpdateName = async () => {
        try {
            await updateName({ name });
            successToast("Your name has been updated!");
        }
        catch (error) {
            errorToast(errorMessage("Failed to update name. Please try again later.", error));
        }
    };

    return (
        <ProfileCard title="Personal Details" icon={User}>
            <LabelledInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <LabelledInput label="Email" value={user?.email || ""} disabled />
            <Button type="submit" className="w-full" onClick={handleUpdateName} disabled={isUpdatingName}>
                {isUpdatingName ? "Saving..." : "Save Name"}
            </Button>
        </ProfileCard>
    );
}
