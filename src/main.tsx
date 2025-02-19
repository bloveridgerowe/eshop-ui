import '@/wdyr';
import '@/index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/components/routes/Routes'
import { Toaster } from '@/components/shadcn/toaster';
import { QueryClientProvider } from "@tanstack/react-query";
import { DisclaimerModal } from "@/components/modals/DisclaimerModal"
import { queryClient } from '@/api/query-client'
import { AppGate } from "@/components/auth/AppGate";

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AppGate>
                <DisclaimerModal />
                <Toaster />
                <AppRoutes />
            </AppGate>
        </BrowserRouter>
    </QueryClientProvider>
)
