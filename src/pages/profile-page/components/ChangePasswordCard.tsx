import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // ✅ ShadCN Input
import { useChangePassword } from "@/api/hooks/customer-hooks";
import { errorMessage } from "@/utilities/errors";
import { useToast } from "@/components/ui/use-toast";
import { ProfileCard } from "@/pages/profile-page/components/ProfileCard";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordSchema = z
    .object({
        currentPassword: z.string().nonempty("Please enter your current password"),
        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must include at least one uppercase letter")
            .regex(/[^A-Za-z0-9]/, "Password must include at least one symbol"),
        confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function ChangePasswordCard() {
    const { successToast, errorToast } = useToast();
    const { mutateAsync: changePassword, isPending: isChangingPassword } = useChangePassword();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: PasswordFormValues) => {
        try {
            await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });
            successToast("Password changed successfully!");
        } catch (error) {
            errorToast(errorMessage("Failed to change password. Please try again later.", error));
        }
    };

    return (
        <ProfileCard title="Change Password" icon={Lock}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-1 block">Current Password</label>
                    <Input {...register("currentPassword")} type="password" />
                    {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
                </div>
                <div>
                    <label className="text-sm font-medium mb-1 block">New Password</label>
                    <Input {...register("newPassword")} type="password" />
                    {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
                </div>
                <div>
                    <label className="text-sm font-medium mb-1 block">Confirm Password</label>
                    <Input {...register("confirmPassword")} type="password" />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting || isChangingPassword}>
                    {isChangingPassword ? "Changing..." : "Change Password"}
                </Button>
            </form>
        </ProfileCard>
    );
}
