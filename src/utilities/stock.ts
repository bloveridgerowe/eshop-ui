import { Product } from "@/api/services/products-service";

export function getStockDisplay(product: Product) {
    if (product.stock === 0) {
        return {
            text: "Out of stock",
            color: "text-red-500",
        };
    }
    if (product.stock <= 5) {
        return {
            text: `Only ${product.stock} left`,
            color: "text-yellow-500",
        };
    }
    return {
        text: `${product.stock} in stock`,
        color: "text-green-500",
    };
}
