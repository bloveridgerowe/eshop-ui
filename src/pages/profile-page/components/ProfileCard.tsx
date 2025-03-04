import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface ProfileCardProps {
    title: string;
    icon: LucideIcon;
    children: ReactNode;
}

export function ProfileCard({ title, icon: Icon, children }: ProfileCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Icon className="h-5 w-5 mr-3" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {children}
                </div>
            </CardContent>
        </Card>
    );
}
