import { PersonalDetailsCard } from "@/pages/profile-page/components/PersonalDetailsCard";
import { CardDetailsCard } from "@/pages/profile-page/components/CardDetailsCard";
import { ChangePasswordCard } from "@/pages/profile-page/components/ChangePasswordCard";
import { AddressCard } from "@/pages/profile-page/components/AddressCard";
import { LogoutButton } from "@/pages/profile-page/components/LogoutButton";
import { UserPageContent } from "@/components/feature/UserPageContent";

export function ProfilePage() {
    return (
        <UserPageContent title="Profile Settings" actionButton={<LogoutButton />}>
            <PersonalDetailsCard />
            <AddressCard />
            <CardDetailsCard />
            <ChangePasswordCard />
        </UserPageContent>
    );
}
