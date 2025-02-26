import { Outlet } from "react-router-dom";


export function UserLayout() {
    return (
        <div className="py-2">
            <Outlet/>
        </div>
    );
}
