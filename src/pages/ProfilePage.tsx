import { CreditCard, Home, User, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/ProfileCard";
import { LabelledInput } from "@/components/LabelledInput";
import { useQuery, useMutation } from "@tanstack/react-query";
import { successToast, errorToast } from "@/hooks/use-toast";
import { useServices } from "@/hooks/use-services";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/state/auth-slice.ts";
import { AxiosError } from "axios";

export function ProfilePage() {
    const { customerService } = useServices();
    const dispatch = useDispatch();

    const { data: customer, isPending, error } = useQuery({
        queryKey: ["customerDetails"],
        queryFn: () => customerService.getCustomerDetails(),
        gcTime: 0,
        staleTime: 0
    });

    const [name, setName] = useState("");

    const [address, setAddress] = useState({
        firstLine: "",
        secondLine: "",
        city: "",
        county: "",
        postCode: ""
    });

    const [card, setCard] = useState({
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: ""
    });

    const [password, setPassword] = useState({
        current: "",
        new: "",
    });

    if (customer) {
        if (customer.name && name === "") {
            setName(customer.name || "");
        }
        if (customer.address && address.firstLine === "") {
            setAddress(customer.address || { firstLine: "", secondLine: "", city: "", county: "", postCode: "" });
        }
        if (card.cardNumber === "" && customer.cardDetails) {
            setCard({
                cardNumber: customer.cardDetails.cardNumber,
                cvv: customer.cardDetails.cvv,
                expiryMonth: customer.cardDetails.expiryDate.split("/")[0] || "",
                expiryYear: customer.cardDetails.expiryDate.split("/")[1] || "",
            });
        }
    }

    const updateName = useMutation({
        mutationFn: () => customerService.updateName(name),
        onSuccess: () => successToast("Your name has been updated!"),
        onError: (error) => errorToast(error.message || "Failed to update name."),
    });

    const updateAddress = useMutation({
        mutationFn: () => customerService.updateAddressDetails(address),
        onSuccess: () => successToast("Address updated successfully!"),
        onError: (error) => errorToast(error.message || "Failed to update address."),
    });

    const updateCardDetails = useMutation({
        mutationFn: () => customerService.updateCardDetails({
            cardNumber: card.cardNumber,
            cvv: card.cvv,
            expiryDate: `${card.expiryMonth}/${card.expiryYear}`
        }),
        onSuccess: () => successToast("Card details saved!"),
        onError: (error) => errorToast(error.message || "Failed to save card details."),
    });

    const updatePassword = useMutation({
        mutationFn: () => customerService.changePassword(password.current, password.new),
        onSuccess: () => successToast("Password changed successfully!"),
        onError: (error: Error) => {
            if (error instanceof AxiosError) {
                errorToast(error.response?.data?.detail);
            }
            else {
                errorToast("Failed to change password. Please try again.");
            }
        },
    });

    const logout = useMutation({
        mutationFn: async () => {
            await customerService.logout();
            dispatch(logoutAction());
        },
        onSuccess: () => successToast("You have been logged out."),
        onError: (error: Error) => {
            if (error instanceof AxiosError) {
                errorToast(error.response?.data?.detail);
            }
            else {
                errorToast("Failed to change password. Please try again.");
            }
        },
    });

    if (isPending) {
        return (
            <div className="flex justify-center p-4 border-r border-input">
                <LoadingSpinner className="w-10 h-10 text-muted-foreground" />
            </div>
        );
    }

    if (error) {
        errorToast("Failed to load profile.");
        return;
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-[500px]">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Profile Settings</h1>
                    <Button
                        variant="default"
                        onClick={() => logout.mutate()}
                        disabled={logout.isPending}
                        className="gap-2"
                    >
                        <LogOut className="h-4 w-4" />
                        {logout.isPending ? "Logging out..." : "Logout"}
                    </Button>
                </div>

                <div className="space-y-4">
                    <ProfileCard title="Personal Details" icon={User}>
                        <LabelledInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <LabelledInput label="Email" value={customer?.email || ""} disabled />
                        <Button type="submit" className="w-full" onClick={() => updateName.mutate()} disabled={updateName.isPending}>
                            {updateName.isPending ? "Saving..." : "Save Name"}
                        </Button>
                    </ProfileCard>

                    <ProfileCard title="Shipping Address" icon={Home}>
                        <LabelledInput label="First Line" value={address.firstLine} onChange={(e) => setAddress({ ...address, firstLine: e.target.value })} />
                        <LabelledInput label="Second Line" value={address.secondLine} onChange={(e) => setAddress({ ...address, secondLine: e.target.value })} />
                        <LabelledInput label="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                        <LabelledInput label="County" value={address.county} onChange={(e) => setAddress({ ...address, county: e.target.value })} />
                        <LabelledInput label="Postcode" value={address.postCode} onChange={(e) => setAddress({ ...address, postCode: e.target.value })} />
                        <Button type="submit" className="w-full" onClick={() => updateAddress.mutate()} disabled={updateAddress.isPending}>
                            {updateAddress.isPending ? "Saving..." : "Save Address"}
                        </Button>
                    </ProfileCard>

                    <ProfileCard title="Card Details" icon={CreditCard}>
                        <LabelledInput label="Card Number" value={card.cardNumber} onChange={(e) => setCard({ ...card, cardNumber: e.target.value })} />
                        <div className="grid grid-cols-3 gap-4">
                            <LabelledInput label="Expiry Month" maxLength={2} value={card.expiryMonth} onChange={(e) => setCard({ ...card, expiryMonth: e.target.value })} />
                            <LabelledInput label="Expiry Year" maxLength={2} value={card.expiryYear} onChange={(e) => setCard({ ...card, expiryYear: e.target.value })} />
                            <LabelledInput label="CVV" type="password" maxLength={3} value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
                        </div>
                        <Button type="submit" className="w-full" onClick={() => updateCardDetails.mutate()} disabled={updateCardDetails.isPending}>
                            {updateCardDetails.isPending ? "Saving..." : "Save Card Details"}
                        </Button>
                    </ProfileCard>

                    <ProfileCard title="Change Password" icon={Lock}>
                        <LabelledInput type="password" label="Current Password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })} />
                        <LabelledInput type="password" label="New Password" value={password.new} onChange={(e) => setPassword({ ...password, new: e.target.value })} />
                        <Button type="submit" className="w-full" onClick={() => updatePassword.mutate()} disabled={updatePassword.isPending}>
                            {updatePassword.isPending ? "Changing..." : "Change Password"}
                        </Button>
                    </ProfileCard>
                </div>
            </div>
        </div>
    );
}
