import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useGetBasketItems } from "@/api/hooks/basket-hooks";
import { UserPageLayout } from "@/layouts/UserPageLayout";
import { ClearBasketButton } from "@/pages/basket-page/components/ClearBasketButton";
import { BasketItemCard } from "@/pages/basket-page/components/BasketItemCard";
import { PlaceOrderButton } from "@/pages/basket-page/components/PlaceOrderButton";
import { ErrorPage } from "@/pages/errors/error-page.tsx";

export function BasketPage() {
    const { data: basketItems, isPending, isError } = useGetBasketItems();

    if (isPending) {
        return (
            <div className="flex justify-center min-h-[50vh]">
                <LoadingSpinner className="w-10 h-10 text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
        return <ErrorPage title="Failed to load Basket." message="Please try again later." />;
    }

    return (
        <UserPageLayout title="Basket" titleButton={<ClearBasketButton/>}>
            {basketItems.length > 0 ? (
                basketItems.map((item) =>
                    <BasketItemCard key={item.productId} item={item}/>
                )) : (
                <p className="text-center text-muted-foreground mt-6">
                    Your basket is empty.
                </p>
            )}
            {basketItems.length > 0 && (
                <PlaceOrderButton/>
            )}
        </UserPageLayout>
    );
}
