import { LoadingSpinner, LoadingSpinnerContainer } from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/hooks/use-auth";
import { PersonalDetailsCard } from "@/pages/profile-page/components/PersonalDetailsCard";
import { CardDetailsCard } from "@/pages/profile-page/components/CardDetailsCard";
import { ChangePasswordCard } from "@/pages/profile-page/components/ChangePasswordCard";
import { AddressCard } from "@/pages/profile-page/components/AddressCard";
import { LogoutButton } from "@/pages/profile-page/components/LogoutButton";
import { UserPageLayout } from "@/layouts/UserPageLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Paths } from "@/utilities/paths";

export function ProfilePage() {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate(Paths.featured(), { replace: true });
        }
    }, [ isLoading, user, navigate ]);

    if (isLoading) {
        return (
            <LoadingSpinnerContainer className="p-4 border-r border-input">
                <LoadingSpinner/>
            </LoadingSpinnerContainer>
        );
    }

    return (
        <UserPageLayout title="Profile Settings" titleButton={<LogoutButton />}>
            <PersonalDetailsCard />
            <AddressCard />
            <CardDetailsCard />
            <ChangePasswordCard />
        </UserPageLayout>
    );
}
