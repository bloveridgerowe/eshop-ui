import { Outlet } from "react-router-dom";
import {TopBar} from "@/components/navigation/top-bar/TopBar.tsx";

export function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}
