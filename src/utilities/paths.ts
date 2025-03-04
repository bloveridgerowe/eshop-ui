export const Paths = {
	products: () => '/products',
	product: (id?: string) => `/products/${id ?? ':id'}`,
	orderPlaced: () => `/order-confirmed`,
	profile: () => `/profile`,
	orders: () => `/orders`,
	login: () => `/login`,
	basket: () => `/basket`
};
