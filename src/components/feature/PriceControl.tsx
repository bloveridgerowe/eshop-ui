import { useState, useRef, useEffect } from "react";
import { debounce } from "lodash";
import { cn } from "@/utilities/utils.ts";
import { Slider } from "../ui/slider";

export interface PriceControlProps {
    availableMin: number;
    availableMax: number;
    value: [number, number]; // current selection
    onChange: (minValue: number, maxValue: number) => void;
}

export function PriceControl({ availableMin, availableMax, value, onChange }: PriceControlProps) {
    const [localValues, setLocalValues] = useState<[number, number]>(value);

    // Sync local state when the incoming value changes.
    useEffect(() => {
        setLocalValues(value);
    }, [value]);

    // Debounce the onChange callback.
    const debouncedOnChange = useRef(
        debounce((newValues: [number, number]) => onChange(newValues[0], newValues[1]), 250)
    ).current;

    const handleValueChange = (newValues: [number, number]) => {
        console.log(newValues)
        setLocalValues(newValues);
        debouncedOnChange(newValues);
    };

    useEffect(() => {
        return () => {
            debouncedOnChange.cancel();
        };
    }, [debouncedOnChange]);

    console.log({ availableMin, availableMax})

    if (availableMin === 0 && availableMax === 0) {
        return;
    }


    return (
        <div className="flex md:flex-wrap items-center md:justify-center space-x-2 mx-1">
            <span className="order-1 text-sm text-gray-600 md:mb-2">£{localValues[0]}</span>
            <span className="hidden md:inline order-2 text-sm text-gray-600 md:mb-2">–</span>
            <span className="order-3 text-sm text-gray-600 md:mb-2">£{localValues[1]}</span>
            <Slider
                value={localValues}
                min={availableMin}
                max={availableMax}
                minStepsBetweenThumbs={10}
                step={1}
                onValueChange={handleValueChange}
                className={cn("w-full slider-black order-2 md:order-4 md:w-full")}
            />
        </div>
    );
}
