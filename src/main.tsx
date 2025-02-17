import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/components/Routes'
import { Toaster } from './components/ui/toaster';
import { QueryClientProvider } from "@tanstack/react-query";
import { DisclaimerModal } from "@/components/DisclaimerModal"
import { queryClient } from './api/query-client'
import { AuthResolver } from "@/components/AuthResolver.tsx";

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
