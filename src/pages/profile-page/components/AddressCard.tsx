import { Home } from "lucide-react";
import { LabelledInput } from "@/components/ui/LabelledInput";
import { Button } from "@/components/ui/button";
import { useUpdateAddress } from "@/api/hooks/customer-hooks";
import { errorMessage } from "@/utilities/errors";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ProfileCard } from "@/pages/profile-page/components/ProfileCard";
import { useAuth } from "@/components/utilities/AuthProvider";

// TODO: Implement react-hook-form validation

export function AddressCard() {
    const { user } = useAuth();
    const { successToast, errorToast } = useToast();
    const { mutateAsync: updateAddress, isPending: isUpdatingAddress } = useUpdateAddress();
    const [ address, setAddress ] = useState(user?.address || {
        firstLine: "",
        secondLine: "",
        city: "",
        county: "",
        postCode: "",
    });

    const handleUpdateAddress = async () => {
        try {
            await updateAddress({ address });
            successToast("Address updated successfully!");
        }
        catch (error) {
            errorToast(errorMessage("Failed to update address. Please try again later.", error));
        }
    };

    return (
        <ProfileCard title="Shipping Address" icon={Home}>
            <LabelledInput label="First Line" value={address.firstLine} onChange={(e) => setAddress({ ...address, firstLine: e.target.value })} />
            <LabelledInput label="Second Line" value={address.secondLine} onChange={(e) => setAddress({ ...address, secondLine: e.target.value })} />
            <LabelledInput label="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
            <LabelledInput label="County" value={address.county} onChange={(e) => setAddress({ ...address, county: e.target.value })} />
            <LabelledInput label="Postcode" value={address.postCode} onChange={(e) => setAddress({ ...address, postCode: e.target.value })} />
            <Button type="submit" className="w-full" onClick={handleUpdateAddress} disabled={isUpdatingAddress}>
                {isUpdatingAddress ? "Saving..." : "Save Address"}
            </Button>
        </ProfileCard>
    );
}
