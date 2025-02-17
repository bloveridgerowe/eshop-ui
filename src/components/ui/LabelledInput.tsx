import { Input } from "@/components/shadcn/input";
import { ChangeEvent } from "react";

export interface LabelledInputProps {
    label: string;
    type?: string;
    value: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    maxLength?: number;
    name?: string;
}

export function LabelledInput({ label, type = "text", value, onChange, disabled = false, maxLength, name }: LabelledInputProps) {
    return (
        <div>
            <label className="text-sm font-medium mb-1 block">{label}</label>
            <Input
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                maxLength={maxLength}
                name={name}
                className={disabled ? "text-muted-foreground bg-muted" : ""}
            />
        </div>
    );
}
