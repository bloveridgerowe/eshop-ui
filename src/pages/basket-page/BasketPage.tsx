import { LoadingSpinner, LoadingSpinnerContainer } from "@/components/ui/LoadingSpinner";
import { useGetBasketItems } from "@/api/hooks/basket-hooks";
import { UserPageLayout } from "@/layouts/UserPageLayout";
import { ClearBasketButton } from "@/pages/basket-page/components/ClearBasketButton";
import { BasketItemCard } from "@/pages/basket-page/components/BasketItemCard";
import { PlaceOrderButton } from "@/pages/basket-page/components/PlaceOrderButton";
import { ResultPage, ResultPageActions, ResultPageHeader, ResultPageMessage } from "@/pages/result-page/ResultPage";
import { Link } from "react-router-dom";
import { Button } from "@/components/shadcn/button";

export function BasketPage() {
    const { data: basketItems, isPending, isError } = useGetBasketItems();

    if (isPending) {
        return (
            <LoadingSpinnerContainer>
                <LoadingSpinner/>
            </LoadingSpinnerContainer>
        );
    }

    if (isError) {
        return (
            <ResultPage variant="error">
                <ResultPageHeader>Failed to load Basket.</ResultPageHeader>
                <ResultPageMessage>Please try again later.</ResultPageMessage>
            </ResultPage>
        );
    }

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
        <UserPageLayout title="Basket" titleButton={<ClearBasketButton/>}>
            {basketItems.map(item => (
                <BasketItemCard key={item.productId} item={item}/>
            ))}
            <PlaceOrderButton/>
        </UserPageLayout>
    );
}
