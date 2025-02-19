import {RefObject, useEffect, useLayoutEffect, useRef, useState} from "react";

export function useVisibleGridCols<T extends HTMLElement = HTMLDivElement>(defaultCount: number = 1) {
    const containerRef = useRef<T>(null);
    const [visibleCols, setVisibleCols] = useState(defaultCount);

    useEffect(() => {
        const calcColumns = () => {
            // Abort if no ref
            if (!containerRef.current) return;

            // Infer number of columns by parsing the computed grid-template-columns.
            // See https://stackoverflow.com/a/58393617/5389588 for details.
            const containerComputedStyle = window.getComputedStyle(containerRef.current);
            const nCols = containerComputedStyle
                .getPropertyValue('grid-template-columns')
                .replace(' 0px', '')
                .split(' ')
                .length;

            // Update state
            setVisibleCols(nCols);
        };

        // Calculate on mount
        calcColumns();

        // Recalculate on window resize
        window.addEventListener('resize', calcColumns);
        return () => {
            window.removeEventListener('resize', calcColumns);
        };
    }, []);

    return { gridRef: containerRef, columns: visibleCols };
}


export function useSkeletonRowCount<T extends HTMLElement = HTMLDivElement>(
    gridRef: RefObject<T>,
    defaultRows: number = 2
) {
    const [rows, setRows] = useState(defaultRows);

    useLayoutEffect(() => {
        const calcRows = () => {
            if (!gridRef.current) return;

            // Determine how far from the top the grid is positioned
            const gridTop = gridRef.current.getBoundingClientRect().top;
            const availableHeight = window.innerHeight - gridTop;

            let cardHeight = 0;
            // Use the first child as a reference for card height
            if (gridRef.current.children.length > 0) {
                const firstChild = gridRef.current.children[0] as HTMLElement;
                cardHeight = firstChild.getBoundingClientRect().height;
            }

            // Only update if we got a valid card height
            if (cardHeight > 0) {
                // Use Math.floor to count only full rows that fit
                const newRowCount = Math.floor(availableHeight / cardHeight);
                setRows(newRowCount);
            }
        };

        // Initial calculation
        calcRows();
        window.addEventListener("resize", calcRows);
        return () => window.removeEventListener("resize", calcRows);
    }, [gridRef]);

    return rows;
}
