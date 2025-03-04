import { useGetBasketItems } from "@/api/hooks/basket-hooks";
import { UserPageContent } from "@/components/feature/UserPageContent.tsx";
import { ClearBasketButton } from "@/pages/basket-page/components/ClearBasketButton";
import { BasketItemCard } from "@/pages/basket-page/components/BasketItemCard";
import { PlaceOrderButton } from "@/pages/basket-page/components/PlaceOrderButton";
import { ResultPage, ResultPageActions, ResultPageHeader, ResultPageMessage } from "@/pages/utility-pages/ResultPage";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

export function BasketPage() {
    const { data: basketItems } = useGetBasketItems();

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
            <PlaceOrderButton/>
        </UserPageContent>
    );
}
