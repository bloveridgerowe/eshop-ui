import { Outlet } from "react-router-dom";
import {TopBar} from "@/components/feature/TopBar.tsx";

export function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <div className="flex flex-col flex-1">
                <Outlet />
            </div>
        </div>
    );
}
