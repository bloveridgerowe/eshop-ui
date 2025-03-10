import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // ✅ ShadCN Input
import { useUpdateCardDetails } from "@/api/hooks/customer-hooks";
import { errorMessage } from "@/utilities/errors";
import { useToast } from "@/components/ui/use-toast";
import { ProfileCard } from "@/pages/profile-page/components/ProfileCard";
import { useAuth } from "@/components/utilities/AuthProvider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const cardSchema = z.object({
    cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
    expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, "Month must be 01-12"),
    expiryYear: z.string().regex(/^\d{2}$/, "Year must be 2 digits"),
    cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits"),
});

type CardFormValues = z.infer<typeof cardSchema>;

export function CardDetailsCard() {
    const { user } = useAuth();
    const { successToast, errorToast } = useToast();
    const { mutateAsync: updateCardDetails, isPending: isUpdatingCard } = useUpdateCardDetails();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CardFormValues>({
        resolver: zodResolver(cardSchema),
        defaultValues: {
            cardNumber: user?.cardDetails?.cardNumber || "",
            expiryMonth: user?.cardDetails?.expiryDate?.split("/")[0] || "",
            expiryYear: user?.cardDetails?.expiryDate?.split("/")[1] || "",
            cvv: user?.cardDetails?.cvv || "",
        },
    });

    const onSubmit = async (data: CardFormValues) => {
        try {
            await updateCardDetails({
                cardDetails: {
                    cardNumber: data.cardNumber,
                    cvv: data.cvv,
                    expiryDate: `${data.expiryMonth}/${data.expiryYear}`,
                },
            });
            successToast("Card details saved!");
        } catch (error) {
            errorToast(errorMessage("Failed to update card details. Please try again later.", error));
        }
    };

    return (
        <ProfileCard title="Card Details" icon={CreditCard}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-1 block">Card Number</label>
                    <Input {...register("cardNumber")} maxLength={16} />
                    {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Expiry Month</label>
                        <Input {...register("expiryMonth")} maxLength={2} />
                        {errors.expiryMonth && <p className="text-red-500 text-sm">{errors.expiryMonth.message}</p>}
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Expiry Year</label>
                        <Input {...register("expiryYear")} maxLength={2} />
                        {errors.expiryYear && <p className="text-red-500 text-sm">{errors.expiryYear.message}</p>}
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">CVV</label>
                        <Input {...register("cvv")} maxLength={3} type="password" />
                        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv.message}</p>}
                    </div>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting || isUpdatingCard}>
                    {isUpdatingCard ? "Saving..." : "Save Card Details"}
                </Button>
            </form>
        </ProfileCard>
    );
}
