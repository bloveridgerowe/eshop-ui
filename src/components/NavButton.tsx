import { Button, ButtonProps } from "@/components/shadcn/button.tsx";
import { NavLink, Link, To } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface IconButtonProps extends ButtonProps {
    icon: LucideIcon;
    label?: string;
}

export function IconButton({ icon: Icon, label, ...rest }: IconButtonProps) {
    return (
        <Button {...rest}>
            <Icon size={16} className="mr-1" />
            {label}
        </Button>
    );
}

interface NavIconButtonProps extends IconButtonProps {
    to: To;
}

export function NavIconButton({ to, icon, label, ...rest }: NavIconButtonProps) {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <IconButton
                    variant={isActive ? "default" : "secondary"}
                    icon={icon}
                    label={label}
                    {...rest}
                />
            )}
        </NavLink>
    );
}

interface LinkIconButtonProps extends IconButtonProps {
    to: To;
}

export function LinkIconButton({ to, icon, label, ...rest }: LinkIconButtonProps) {
    return (
        <Link to={to}>
            <IconButton icon={icon} label={label} {...rest} />
        </Link>
    );
}
