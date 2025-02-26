import { useState, useRef, useEffect } from "react";
import { debounce } from "lodash";
import { cn } from "@/utilities/utils.ts";
import { Slider } from "../ui/slider";

export interface PriceControlProps {
    minValue: number;
    maxValue: number;
    onChange: (minValue: number, maxValue: number) => void;
}

export function PriceControl({ minValue, maxValue, onChange }: PriceControlProps) {
    const [localValues, setLocalValues] = useState([minValue, maxValue]);

    // When props change, update local state so the slider reflects the new boundaries.
    useEffect(() => {
        setLocalValues([minValue, maxValue]);
    }, [minValue, maxValue]);

    // Debounce the onChange callback to prevent spamming the server.
    const debouncedOnChange = useRef(
        debounce((newValues: number[]) => onChange(newValues[0], newValues[1]), 250)
    ).current;

    const handleValueChange = (newValues: number[]) => {
        setLocalValues(newValues);
        debouncedOnChange(newValues);
    };

    useEffect(() => {
        return () => {
            debouncedOnChange.cancel();
        };
    }, [debouncedOnChange]);

    return (
        <div className="flex md:flex-wrap items-center md:justify-center space-x-2 mx-1">
            <span className="order-1 text-sm text-gray-600 md:mb-2">£{localValues[0]}</span>
            <span className="hidden md:inline order-2 text-sm text-gray-600 md:mb-2">–</span>
            <span className="order-3 text-sm text-gray-600 md:mb-2">£{localValues[1]}</span>
            <Slider
                value={localValues} // Controlled value from local state
                min={minValue}
                max={maxValue}
                step={1}
                onValueChange={handleValueChange}
                className={cn("w-full slider-black order-2 md:order-4 md:w-full")}
            />
        </div>
    );
}
