import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/components/Routes'
import { Toaster } from './components/ui/toaster';
import { QueryClientProvider } from "@tanstack/react-query";
import { DisclaimerModal } from "@/components/DisclaimerModal"
import { queryClient } from './api/query-client'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <DisclaimerModal />
        <Toaster/>
        <QueryClientProvider client={queryClient}>
            <AppRoutes/>
        </QueryClientProvider>
    </BrowserRouter>
)
