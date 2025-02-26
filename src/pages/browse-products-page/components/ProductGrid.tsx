import { forwardRef, ReactNode } from "react";

interface ProductGridProps {
    children: ReactNode;
}

export const ProductGrid = forwardRef<HTMLDivElement, ProductGridProps>(({ children }, ref) => {
    return (
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 w-full p-2">
            {children}
        </div>
    );
});
