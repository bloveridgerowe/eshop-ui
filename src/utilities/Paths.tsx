export const Paths = {
	featured: () => `/products?featured=true`,
	categories: (id?: string) => `/products${id ? `?category=${id}` : ""}`,
	searchProducts: (query?: string) => `/products?search=${query}`,
	product: (id?: string) => `/products/${id ? id : ":id"}`,
	orderPlaced: () => `/order-confirmed`,
	profile: () => `/profile`,
	orders: () => `/orders`,
	login: () => `/login`,
	cart: () => `/cart`
};