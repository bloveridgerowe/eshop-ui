import './wdyr';
import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/components/routes/Routes'
import { Toaster } from '@/components/shadcn/toaster';
import { QueryClientProvider } from "@tanstack/react-query";
import { DisclaimerModal } from "@/components/modals/DisclaimerModal"
import { queryClient } from './api/query-client'
import { AuthResolver } from "@/components/auth/AuthResolver";

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AuthResolver>
                <DisclaimerModal />
                <Toaster />
                <AppRoutes />
            </AuthResolver>
        </BrowserRouter>
    </QueryClientProvider>
)
