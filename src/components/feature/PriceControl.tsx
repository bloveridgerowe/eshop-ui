import { useState, useRef, useEffect } from "react";
import { debounce } from "lodash";
import { cn } from "@/utilities/utils.ts";
import { Slider } from "../ui/slider";

interface PriceControlProps {
    minValue: number;
    maxValue: number;
    onChange: (minValue: number, maxValue: number) => void;
}

export function PriceControl({ minValue, maxValue, onChange }: PriceControlProps) {
    const [localValues, setLocalValues] = useState([minValue, maxValue]);

    const debouncedOnChange = useRef(debounce((newValues: number[]) => onChange(newValues[0], newValues[1]), 250)).current;

    const handleValueChange = (newValues: number[]) => {
        setLocalValues(newValues);
        debouncedOnChange(newValues);
    };

    useEffect(() => {
        return () => debouncedOnChange.cancel();
    }, [ debouncedOnChange ]);

    return (
        <div className="flex md:flex-wrap items-center md:justify-center space-x-2 mx-1">
            <span className="order-1 text-sm text-gray-600 md:mb-2">
              £{localValues[0]}
            </span>
            <span className="hidden md:inline order-2 text-sm text-gray-600 md:mb-2">
                –
            </span>
            <span className="order-3 text-sm text-gray-600 md:mb-2">
                £{localValues[1]}
            </span>
            <Slider
                defaultValue={localValues}
                min={0}
                max={1000}
                step={1}
                onValueChange={handleValueChange}
                className={cn("w-full slider-black order-2 md:order-4 md:w-full")}
            />
        </div>
    );
}
