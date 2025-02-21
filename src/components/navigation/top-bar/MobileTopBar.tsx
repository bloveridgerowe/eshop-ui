import { Link, useNavigate } from "react-router-dom";
import { Package, ShoppingCart, Store, User, Search } from "lucide-react";
import { Button } from "@/components/shadcn/button.tsx";
import { Input } from "@/components/shadcn/input.tsx";
import { Paths } from "@/utilities/paths.ts";
import { useState } from "react";
import { LoginModal } from "@/components/modals/LoginModal.tsx";
import { useAuth } from "@/components/utilities/AuthProvider.tsx";
import {NavIconButton} from "@/components/NavButton.tsx";

export function MobileTopBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        navigate(Paths.searchProducts(searchTerm));
    };

    return (
        <div className="z-10 flex-shrink-0 w-full border-b border-input flex-col">
            <div className="flex justify-between items-center border-b border-input p-2">
                <div className="flex items-center gap-2">
                    <Link className="flex items-center gap-2" to={Paths.featured()}>
                        <Button>
                            <Store size={24} />
                            <span>EShop</span>
                        </Button>
                    </Link>
                </div>
                <div className="flex gap-2">
                    {user ? (
                        <>
                            <NavIconButton to={Paths.profile()} icon={User} size="icon"/>
                            <NavIconButton to={Paths.basket()} icon={ShoppingCart} size="icon"/>
                            <NavIconButton to={Paths.orders()} icon={Package} size="icon"/>
                        </>
                    ) : (
                        <LoginModal />
                    )}
                </div>
            </div>
            <div className="p-2">
                <div className="flex items-center border border-input rounded-lg">
                    <Input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="flex-1 border-none focus:ring-0 focus:outline-none bg-transparent"
                    />
                    <div className="w-px self-stretch bg-border"></div>
                    <Button variant="ghost" size="icon" onClick={handleSearch}>
                        <Search className="text-muted-foreground" size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
