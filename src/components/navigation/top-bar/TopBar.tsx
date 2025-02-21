import { Link, useNavigate } from "react-router-dom";
import { Store, Search, User, Package, ShoppingCart } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Paths } from "@/utilities/paths.ts";
import { useState } from "react";
import { LoginModal } from "@/components/modals/LoginModal";
import { useAuth } from "@/components/utilities/AuthProvider"
import { NavIconButton } from "@/components/ui/NavButton";

export function TopBar() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [ searchTerm, setSearchTerm ] = useState("");

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            return;
        }
        navigate(Paths.searchProducts(searchTerm));
    };

    return (
        <div className="flex w-full flex-shrink-0 gap-2 md:gap-0 border-b border-input flex-col md:flex-row justify-between items-center p-2">
            <div>
                <Link className="flex items-center gap-2" to={Paths.featured()}>
                    <Button>
                        <Store size={24} />
                        <span>EShop</span>
                    </Button>
                </Link>
            </div>
            <div className="flex-1 max-w-lg mx-8 flex items-center border border-input rounded-lg">
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
                    <Search className="text-muted-foreground" size={18}/>
                </Button>
            </div>
            <div className="flex w-full justify-between md:w-auto md:justify-normal gap-2">
                {user ? (
                    <>
                        <NavIconButton to={Paths.profile()} icon={User} label="Profile" />
                        <NavIconButton to={Paths.basket()} icon={ShoppingCart} label="Basket" />
                        <NavIconButton to={Paths.orders()} icon={Package} label="Orders" />
                    </>
                ) : (
                    <LoginModal />
                )}
            </div>
        </div>
    );
}

