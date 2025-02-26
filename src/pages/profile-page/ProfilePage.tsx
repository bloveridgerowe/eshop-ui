import { Spinner, LoadingSpinnerContainer } from "@/components/ui/Spinner";
import { PersonalDetailsCard } from "@/pages/profile-page/components/PersonalDetailsCard";
import { CardDetailsCard } from "@/pages/profile-page/components/CardDetailsCard";
import { ChangePasswordCard } from "@/pages/profile-page/components/ChangePasswordCard";
import { AddressCard } from "@/pages/profile-page/components/AddressCard";
import { LogoutButton } from "@/pages/profile-page/components/LogoutButton";
import { UserPageContent } from "@/components/feature/UserPageContent.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Paths } from "@/utilities/paths";
import { useAuth } from "@/components/utilities/AuthProvider";

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
                <Spinner/>
            </LoadingSpinnerContainer>
        );
    }

    return (
        <UserPageContent title="Profile Settings" actionButton={<LogoutButton />}>
            <PersonalDetailsCard />
            <AddressCard />
            <CardDetailsCard />
            <ChangePasswordCard />
        </UserPageContent>
    );
}
