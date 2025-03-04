import { Link, useNavigate } from "react-router-dom";
import { Store, User, Package, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paths } from "@/utilities/paths";
import { useEffect, useState } from "react";
import { LoginModal } from "@/components/modals/LoginModal";
import { useAuth } from "@/components/utilities/AuthProvider"
import { NavIconButton } from "@/components/ui/NavButton";
import { useProductFilters } from "@/hooks/use-filters";

export function TopBar() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { filters } = useProductFilters();
    const [ searchTerm, setSearchTerm ] = useState("");

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            return;
        }
        navigate({
            pathname: Paths.products(),
            search: new URLSearchParams({ search: searchTerm }).toString(),
        });
    };

    useEffect(() => {
        if (filters.search) {
            setSearchTerm(filters.search);
        }
        else {
            setSearchTerm("");
        }
    }, [ filters ]);

    return (
        <header className="flex flex-wrap items-center border-b border-input">
            <Link className="p-2 order-1 md:order-1 mr-auto" to={Paths.products()}>
                <Button>
                    <Store size={24} />
                    <span>EShop</span>
                </Button>
            </Link>
            <div className="p-2 order-3 md:order-2 w-full md:flex-1 flex justify-center border-t">
                <Input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full p-2 md:max-w-xl"
                />
            </div>
            <div className="p-2 order-2 md:order-3 ml-auto flex space-x-2">
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
        </header>
    );
}

