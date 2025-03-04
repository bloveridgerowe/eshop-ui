import { useState, useRef, useEffect } from "react";
import { debounce } from "lodash";
import { cn } from "@/utilities/utils";
import { Slider } from "../ui/slider";

export interface PriceControlProps {
    availableMin: number;
    availableMax: number;
    value: [number, number];
    onChange: (minValue: number, maxValue: number) => void;
}

export function PriceControl({ availableMin, availableMax, value, onChange }: PriceControlProps) {
    const [ localValues, setLocalValues ] = useState<[number, number]>(value);

    useEffect(() => {
        setLocalValues(value);
    }, [ value ]);

    const debouncedOnChange = useRef(
        debounce((newValues: [number, number]) => onChange(newValues[0], newValues[1]), 250)
    ).current;

    const handleValueChange = (newValues: [number, number]) => {
        setLocalValues(newValues);
        debouncedOnChange(newValues);
    };

    useEffect(() => {
        return () => {
            debouncedOnChange.cancel();
        };
    }, [ debouncedOnChange ]);

    if (availableMin === 0 && availableMax === 0) {
        return;
    }

    return (
        <div className="flex md:flex-wrap items-center md:justify-center space-x-2 mx-1">
            <span className="order-1 text-sm md:mb-2">£{localValues[0]}</span>
            <span className="hidden md:inline order-2 text-sm md:mb-2">–</span>
            <span className="order-3 text-sm md:mb-2">£{localValues[1]}</span>
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
