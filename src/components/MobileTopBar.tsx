import { Link, useNavigate } from "react-router-dom";
import { Package, ShoppingCart, Store, User, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Paths } from "@/utilities/paths";
import { useState } from "react";
import { LoginDialog } from "@/components/LoginDialog";
import { useAuth } from "@/hooks/use-auth";

export function MobileTopBar() {
    const [ searchTerm, setSearchTerm ] = useState("");
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            return;
        }
        navigate(Paths.searchProducts(searchTerm));
    };

    return (
        <div className='z-10 flex-shrink-0 w-full border-b border-input flex-col'>
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
                    {isLoading ? (
                        <Button disabled>Loading...</Button>
                    ) : user ? (
                        <>
                            <Link to={Paths.profile()}>
                                <Button size="icon">
                                    <User size={16} />
                                </Button>
                            </Link>
                            <Link to={Paths.basket()}>
                                <Button size="icon">
                                    <ShoppingCart size={16} />
                                </Button>
                            </Link>
                            <Link to={Paths.orders()}>
                                <Button size="icon">
                                    <Package size={16} />
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <LoginDialog />
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
                        <Search className="text-muted-foreground" size={18}/>
                    </Button>
                </div>
            </div>
        </div>
    );
}
