import { useLayoutEffect, useRef, useState } from "react";

export function useMaximumVisibleGridItems() {
    // Initialize with at least one item so that the grid isn't empty on first render
    const [ visibleItems, setVisibleItems ] = useState(1);

    // We will pass this ref to our grid
    const gridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!gridRef.current) {
            return;
        }

        // If there are no children, we can't measure
        if (gridRef.current.children.length < 1) {
            throw new Error(
                "useVisibleGridItems: Grid must have at least one child for measurement."
            );
        }

        const calcVisibleItems = () => {
            // Calculate number of columns based on grid-template-columns
            const computedStyle = window.getComputedStyle(gridRef.current!);
            const gridTemplateColumns = computedStyle.getPropertyValue("grid-template-columns");
            const columns = gridTemplateColumns.trim().split(/\s+/).filter(token => token !== "0px").length;

            // Calculate available vertical space from the grid's top
            const gridTop = gridRef.current!.getBoundingClientRect().top;
            const availableHeight = window.innerHeight - gridTop;

            // Measure the first child to get a reference card height
            const firstChild = gridRef.current!.children[0] as HTMLElement;
            const cardHeight = firstChild.getBoundingClientRect().height;

            if (cardHeight > 0) {
                const rows = Math.ceil(availableHeight / cardHeight);
                setVisibleItems(columns * rows);
            }
        };

        calcVisibleItems();
        window.addEventListener("resize", calcVisibleItems);

        return () => window.removeEventListener("resize", calcVisibleItems);
    }, [ gridRef, visibleItems ]);

    return { gridRef, visibleItems };
}
