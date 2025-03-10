import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateAddress } from "@/api/hooks/customer-hooks";
import { errorMessage } from "@/utilities/errors";
import { useToast } from "@/components/ui/use-toast";
import { ProfileCard } from "@/pages/profile-page/components/ProfileCard";
import { useAuth } from "@/components/utilities/AuthProvider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const addressSchema = z.object({
    firstLine: z.string().min(2, "First line is required"),
    secondLine: z.string().min(2, "Second line is required"),
    city: z.string().min(2, "City is required"),
    county: z.string().min(2, "County is required"),
    postCode: z.string().min(5, "Postcode must be valid"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export function AddressCard() {
    const { user } = useAuth();
    const { successToast, errorToast } = useToast();
    const { mutateAsync: updateAddress, isPending: isUpdatingAddress } = useUpdateAddress();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            firstLine: user?.address?.firstLine || "",
            secondLine: user?.address?.secondLine || "",
            city: user?.address?.city || "",
            county: user?.address?.county || "",
            postCode: user?.address?.postCode || "",
        },
    });

    const onSubmit = async (data: AddressFormValues) => {
        try {
            await updateAddress({ address: data });
            successToast("Address updated successfully!");
        } catch (error) {
            errorToast(errorMessage("Failed to update address. Please try again later.", error));
        }
    };

    return (
        <ProfileCard title="Shipping Address" icon={Home}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-1 block">First Line</label>
                    <Input {...register("firstLine")} />
                    {errors.firstLine && <p className="text-red-500 text-sm">{errors.firstLine.message}</p>}
                </div>
                <div>
                    <label className="text-sm font-medium mb-1 block">Second Line</label>
                    <Input {...register("secondLine")} />
                    {errors.secondLine && <p className="text-red-500 text-sm">{errors.secondLine.message}</p>}
                </div>
                <div>
                    <label className="text-sm font-medium mb-1 block">City</label>
                    <Input {...register("city")} />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>
                <div>
                    <label className="text-sm font-medium mb-1 block">County</label>
                    <Input {...register("county")} />
                    {errors.county && <p className="text-red-500 text-sm">{errors.county.message}</p>}
                </div>
                <div>
                    <label className="text-sm font-medium mb-1 block">Postcode</label>
                    <Input {...register("postCode")} />
                    {errors.postCode && <p className="text-red-500 text-sm">{errors.postCode.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting || isUpdatingAddress}>
                    {isUpdatingAddress ? "Saving..." : "Save Address"}
                </Button>
            </form>
        </ProfileCard>
    );
}
