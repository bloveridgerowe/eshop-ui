import { cn } from "@/utilities/utils"
import { ReactNode } from "react";

export interface LoadingSpinnerProps {
  className?: string
}

export const Spinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin text-muted-foreground w-10 h-10", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export interface LoadingSpinnerContainerProps {
  children: ReactNode;
  className?: string }

export function LoadingSpinnerContainer({ children, className }:LoadingSpinnerContainerProps ) {
  return (
      <div className={`flex justify-center ${className || ""}`}>{children}</div>
  );
}
