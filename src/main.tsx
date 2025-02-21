import '@/wdyr';
import '@/index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/components/routes/Routes'
import { Toaster } from '@/components/shadcn/toaster';
import { QueryClientProvider } from "@tanstack/react-query";
import { DisclaimerModal } from "@/components/modals/DisclaimerModal"
import { queryClient } from '@/api/query-client'
import { ErrorBoundary } from "@/components/utilities/ErrorBoundary";
import { Suspense } from "react";
import { AuthProvider } from "@/components/utilities/AuthProvider";
import { AppLoading } from "@/pages/status-pages/AppLoading";
import { AppUnavailable } from "@/pages/status-pages/AppUnavailable";
import { ScrollToTop } from "@/components/utilities/ScrollToTop";

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <ErrorBoundary failure={<AppUnavailable/>}>
            <Suspense fallback={<AppLoading/>}>
                <AuthProvider>
                    <BrowserRouter>
                        <DisclaimerModal/>
                        <Toaster/>
                        <ScrollToTop/>
                        <AppRoutes/>
                    </BrowserRouter>
                </AuthProvider>
            </Suspense>
        </ErrorBoundary>
    </QueryClientProvider>
)

