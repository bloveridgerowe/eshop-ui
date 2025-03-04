export const queryKeys = {
    basket: [ "basket" ],
    categories: [ "categories" ],
    customer: [ "customer" ],
    orders: [ "orders" ],
    products: [ "produ" ],
    product: [ "product" ],
    productId: (id: string) => [ ...queryKeys.product, id ],
    productsByCategory: (categoryId: string) => [ ...queryKeys.products, "category", categoryId ],
    searchProducts: (partialName: string) => [ ...queryKeys.products, "search", partialName ],
    featuredProducts: () => [ ...queryKeys.products, "featured" ],
};
