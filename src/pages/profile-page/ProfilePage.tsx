import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/hooks/use-auth";
import { PersonalDetailsCard } from "./components/PersonalDetailsCard";
import { CardDetailsCard } from "./components/CardDetailsCard";
import { ChangePasswordCard } from "./components/ChangePasswordCard";
import { AddressCard } from "@/pages/profile-page/components/AddressCard";
import { LogoutButton } from "@/pages/profile-page/components/LogoutButton";
import { UserPageLayout } from "@/layouts/UserPageLayout";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Paths} from "@/utilities/paths.tsx";

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
            <div className="flex justify-center p-4 border-r border-input">
                <LoadingSpinner className="w-10 h-10 text-muted-foreground" />
            </div>
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
