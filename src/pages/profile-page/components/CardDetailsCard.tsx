import { CreditCard } from "lucide-react";
import { LabelledInput } from "@/components/ui/LabelledInput";
import { Button } from "@/components/shadcn/button";
import { useUpdateCardDetails } from "@/api/hooks/customer-hooks";
import { errorMessage } from "@/utilities/errors";
import { useState } from "react";
import { useToast } from "@/components/shadcn/use-toast";
import { ProfileCard } from "@/pages/profile-page/components/ProfileCard";
import { useAuth } from "@/components/utilities/AuthProvider.tsx"

export function CardDetailsCard() {
    const { user } = useAuth();
    const { successToast, errorToast } = useToast();
    const { mutateAsync: updateCardDetails, isPending: isUpdatingCard } = useUpdateCardDetails();
    const [ card, setCard ] = useState({
        cardNumber: user?.cardDetails?.cardNumber || "",
        expiryMonth: user?.cardDetails?.expiryDate?.split("/")[0] || "",
        expiryYear: user?.cardDetails?.expiryDate?.split("/")[1] || "",
        cvv: user?.cardDetails?.cvv || "",
    });

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

    return (
        <ProfileCard title="Card Details" icon={CreditCard}>
            <LabelledInput label="Card Number" value={card.cardNumber} onChange={(e) => setCard({ ...card, cardNumber: e.target.value })} />
            <div className="grid grid-cols-3 gap-4">
                <LabelledInput label="Expiry Month" maxLength={2} value={card.expiryMonth} onChange={(e) => setCard({ ...card, expiryMonth: e.target.value })} />
                <LabelledInput label="Expiry Year" maxLength={2} value={card.expiryYear} onChange={(e) => setCard({ ...card, expiryYear: e.target.value })} />
                <LabelledInput label="CVV" type="password" maxLength={3} value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
            </div>
            <Button type="submit" className="w-full" onClick={handleUpdateCard} disabled={isUpdatingCard}>
                {isUpdatingCard ? "Saving..." : "Save Card Details"}
            </Button>
        </ProfileCard>
    );
}
