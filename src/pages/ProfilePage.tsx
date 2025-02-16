import { CreditCard, Home, User, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/ProfileCard";
import { LabelledInput } from "@/components/LabelledInput";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateName, useUpdateAddress, useUpdateCardDetails, useLogout, useChangePassword } from "@/api/hooks/customer-hooks";
import { errorMessage } from "@/utilities/errors";

export function ProfilePage() {
    const { user, isLoading } = useAuth();
    const { successToast, errorToast } = useToast();
    const { mutateAsync: updateName, isPending: isUpdatingName } = useUpdateName();
    const { mutateAsync: updateAddress, isPending: isUpdatingAddress } = useUpdateAddress();
    const { mutateAsync: updateCardDetails, isPending: isUpdatingCard } = useUpdateCardDetails();
    const { mutateAsync: logoutMutation, isPending: isLoggingOut } = useLogout();
    const { mutateAsync: changePasswordMutation, isPending: isChangingPassword } = useChangePassword();
    const [ name, setName ] = useState(user?.name || "");
    const [ password, setPassword ] = useState({ current: "", new: "" });
    const [ address, setAddress ] = useState(user?.address || {
        firstLine: "",
        secondLine: "",
        city: "",
        county: "",
        postCode: "" }    );
    const [ card, setCard ] = useState({
        cardNumber: user?.cardDetails?.cardNumber || "",
        expiryMonth: user?.cardDetails?.expiryDate?.split("/")[0] || "",
        expiryYear: user?.cardDetails?.expiryDate?.split("/")[1] || "",
        cvv: user?.cardDetails?.cvv || "",
    });

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setAddress(user.address || {
                firstLine: "",
                secondLine: "",
                city: "",
                county: "",
                postCode: ""
            });
            setCard({
                cardNumber: user.cardDetails?.cardNumber || "",
                expiryMonth: user.cardDetails?.expiryDate?.split("/")[0] || "",
                expiryYear: user.cardDetails?.expiryDate?.split("/")[1] || "",
                cvv: user.cardDetails?.cvv || "",
            });
        }
    }, [ user ]);

    const handleUpdateName = async () => {
        try {
            await updateName({ name });
            successToast("Your name has been updated!");
        }
        catch (error) {
            errorToast(errorMessage("Failed to update name. Please try again later.", error));
        }
    };

    const handleUpdateAddress = async () => {
        try {
            await updateAddress({ address });
            successToast("Address updated successfully!");
        }
        catch (error) {
            errorToast(errorMessage("Failed to update address. Please try again later.", error));
        }
    };

    const handleUpdateCard = async () => {
        try {
            await updateCardDetails({
                cardDetails: {
                    cardNumber: card.cardNumber,
                    cvv: card.cvv,
                    expiryDate: `${card.expiryMonth}/${card.expiryYear}`,
                },
            });
            successToast("Card details saved!");
        }
        catch (error) {
            errorToast(errorMessage("Failed to update card details. Please try again later.", error));
        }
    };

    const handleUpdatePassword = async () => {
        try {
            await changePasswordMutation({
                currentPassword: password.current,
                newPassword: password.new,
            });
            successToast("Password changed successfully!");
        }
        catch (error) {
            errorToast(errorMessage("Failed to change password. Please try again later.", error));
        }
    };

    const handleLogout = async () => {
        try {
            await logoutMutation();
            successToast("You have been logged out.");
        }
        catch (error) {
            errorToast(errorMessage("Failed to logout. Please try again later.", error));
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-4 border-r border-input">
                <LoadingSpinner className="w-10 h-10 text-muted-foreground" />
            </div>
        );
    }

    if (!user) {
        errorToast("Not logged in.");
        return null;
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[500px]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Profile Settings</h1>
                    <Button variant="default" onClick={handleLogout} disabled={isLoggingOut} className="gap-2">
                        <LogOut className="h-4 w-4" />
                        {isLoggingOut ? "Logging out..." : "Logout"}
                    </Button>
                </div>

                <div className="space-y-4">
                    <ProfileCard title="Personal Details" icon={User}>
                        <LabelledInput label="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        <LabelledInput label="Email" value={user?.email || ""} disabled />
                        <Button type="submit" className="w-full" onClick={handleUpdateName} disabled={isUpdatingName}>
                            {isUpdatingName ? "Saving..." : "Save Name"}
                        </Button>
                    </ProfileCard>

                    <ProfileCard title="Shipping Address" icon={Home}>
                        <LabelledInput label="First Line" value={address.firstLine} onChange={(e) => setAddress({ ...address, firstLine: e.target.value })}/>
                        <LabelledInput label="Second Line" value={address.secondLine} onChange={(e) => setAddress({ ...address, secondLine: e.target.value })}/>
                        <LabelledInput label="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}/>
                        <LabelledInput label="County" value={address.county} onChange={(e) => setAddress({ ...address, county: e.target.value })}/>
                        <LabelledInput label="Postcode" value={address.postCode} onChange={(e) => setAddress({ ...address, postCode: e.target.value })}/>
                        <Button type="submit" className="w-full" onClick={handleUpdateAddress} disabled={isUpdatingAddress}>
                            {isUpdatingAddress ? "Saving..." : "Save Address"}
                        </Button>
                    </ProfileCard>

                    <ProfileCard title="Card Details" icon={CreditCard}>
                        <LabelledInput label="Card Number" value={card.cardNumber} onChange={(e) => setCard({ ...card, cardNumber: e.target.value })}/>
                        <div className="grid grid-cols-3 gap-4">
                            <LabelledInput label="Expiry Month" maxLength={2} value={card.expiryMonth} onChange={(e) => setCard({ ...card, expiryMonth: e.target.value })}/>
                            <LabelledInput label="Expiry Year" maxLength={2} value={card.expiryYear} onChange={(e) => setCard({ ...card, expiryYear: e.target.value })}/>
                            <LabelledInput label="CVV" type="password" maxLength={3} value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })}/>
                        </div>
                        <Button type="submit" className="w-full" onClick={handleUpdateCard} disabled={isUpdatingCard}>
                            {isUpdatingCard ? "Saving..." : "Save Card Details"}
                        </Button>
                    </ProfileCard>

                    <ProfileCard title="Change Password" icon={Lock}>
                        <LabelledInput type="password" label="Current Password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })}/>
                        <LabelledInput type="password" label="New Password" value={password.new} onChange={(e) => setPassword({ ...password, new: e.target.value })}/>
                        <Button type="submit" className="w-full" onClick={handleUpdatePassword} disabled={isChangingPassword}>
                            {isChangingPassword ? "Changing..." : "Change Password"}
                        </Button>
                    </ProfileCard>
                </div>
            </div>
        </div>
    );
}
