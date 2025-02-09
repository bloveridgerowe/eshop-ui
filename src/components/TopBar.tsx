import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingCart, Package, Store, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paths } from "@/utilities/Paths";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store.ts";
import { LoginDialog } from "@/components/LoginDialog.tsx";

export function TopBar() {
    const { status } = useSelector((s: RootState) => s.auth)
    const [ searchTerm, setSearchTerm ] = useState("");

    const navigate = useNavigate();

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            return;
        }

        navigate(Paths.searchProducts(searchTerm));
    };

    return (
        <div className="sticky top-0 z-10 flex w-full flex-shrink-0 gap-2 md:gap-0 border-b border-input flex-col md:flex-row justify-between items-center p-2">
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
            {status === "authenticated" ? (
                <>
                    <Link to={Paths.profile()}>
                        <Button><User size={16} className="mr-1" />Profile</Button>
                    </Link>
                    <Link to={Paths.cart()}>
                        <Button><ShoppingCart size={16} className="mr-1" />Basket</Button>
                    </Link>
                    <Link to={Paths.orders()}>
                        <Button><Package size={16} className="mr-1" />Orders</Button>
                    </Link>
                </>
                ) : (
                    <LoginDialog />
                )}
            </div>
        </div>
    );
}
