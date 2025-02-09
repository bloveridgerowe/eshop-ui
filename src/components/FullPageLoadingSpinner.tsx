import { LoadingSpinner } from "./LoadingSpinner";

export const FullPageLoadingSpinner = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoadingSpinner className="w-12 h-12" />
    </div>
  );
} 