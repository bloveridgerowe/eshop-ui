import { useGetBasketItems } from "@/api/hooks/basket-hooks";
import { UserPageContent } from "@/components/feature/UserPageContent";
import { ClearBasketButton } from "@/pages/basket-page/components/ClearBasketButton";
import { BasketItemCard } from "@/pages/basket-page/components/BasketItemCard";
import { PlaceOrderButton } from "@/pages/basket-page/components/PlaceOrderButton";
import { ResultPage, ResultPageActions, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/utilities/AuthProvider.tsx";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";

export function BasketPage() {
    const { data: basketItems } = useGetBasketItems();
    const { user } = useAuth();

    if (basketItems.length === 0) {
        return (
            <ResultPage variant="info">
                <ResultPageHeader>Your basket is empty.</ResultPageHeader>
                <ResultPageMessage>Add items to your basket to place an order.</ResultPageMessage>
                <ResultPageActions>
                    <Link to="/"><Button className="w-full">Start Shopping</Button></Link>
                </ResultPageActions>
            </ResultPage>
        );
    }

    return (
        <UserPageContent title="Basket" actionButton={<ClearBasketButton/>}>
            {basketItems.map(item => (
                <BasketItemCard key={item.productId} item={item}/>
            ))}
            {(!user?.address || !user?.cardDetails) && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Notice</AlertTitle>
                    <AlertDescription>
                        You must set your address and card details before you can place an order.
                    </AlertDescription>
                </Alert>
            )}
            <PlaceOrderButton/>
        </UserPageContent>
    );
}
