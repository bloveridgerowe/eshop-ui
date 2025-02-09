import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/components/Routes.tsx'
import { ServicesProvider } from './hooks/use-services.tsx'
import { Toaster } from './components/ui/toaster.tsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/state/store.ts";
import { Provider } from "react-redux";
import {DisclaimerModal} from "@/components/DisclaimerModal.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <Toaster/>
            <DisclaimerModal />
            <QueryClientProvider client={queryClient}>
                <ServicesProvider>
                    <AppRoutes/>
                </ServicesProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </Provider>
)
