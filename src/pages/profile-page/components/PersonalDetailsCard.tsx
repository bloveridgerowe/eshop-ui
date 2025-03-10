import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateName } from "@/api/hooks/customer-hooks";
import { errorMessage } from "@/utilities/errors";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { ProfileCard } from "@/pages/profile-page/components/ProfileCard";
import { useAuth } from "@/components/utilities/AuthProvider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function PersonalDetailsCard() {
    const { user } = useAuth();
    const { successToast, errorToast } = useToast();
    const { mutateAsync: updateName, isPending: isUpdatingName } = useUpdateName();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: user?.name || "" },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await updateName({ name: data.name });
            successToast("Your name has been updated!");
        } catch (error) {
            errorToast(errorMessage("Failed to update name. Please try again later.", error));
        }
    };

    return (
        <ProfileCard title="Personal Details" icon={User}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Input Field */}
                <div>
                    <label className="text-sm font-medium mb-1 block">Name</label>
                    <Input
                        {...register("name")}
                        className="border p-2 w-full rounded"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Email Field (Always Disabled) */}
                <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input
                        value={user?.email || ""}
                        disabled
                        className="border p-2 w-full rounded bg-gray-200 text-gray-600"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || isUpdatingName}
                >
                    {isUpdatingName ? "Saving..." : "Save Name"}
                </Button>
            </form>
        </ProfileCard>
    );
}
