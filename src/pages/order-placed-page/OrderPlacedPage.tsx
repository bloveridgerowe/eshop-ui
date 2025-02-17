import { Button } from "@/components/shadcn/button"
import { CheckCircle2 } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export function OrderPlacedPage() {
    const location = useLocation()
    const orderId = location.state?.orderId

    return (
        <div className="max-w-2xl mx-auto py-8 px-4 text-center">
            <div className="mb-6">
                <CheckCircle2 className="h-16 w-16 mx-auto text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-2">
                Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            {orderId && (
                <p className="text-muted-foreground mb-8">
                    Your order ID is: <span className="font-medium">{orderId}</span>
                </p>
            )}
            <div className="space-y-4">
                <Link to="/">
                    <Button className="w-full">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        </div>
    )
}
