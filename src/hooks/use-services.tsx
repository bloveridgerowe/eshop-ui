import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { CategoryService } from '@/api/services/category-service.ts'
import { ProductsService } from '@/api/services/products-service.ts'
import { CustomerService } from "@/api/services/customer-service.ts";
import { OrderService } from "@/api/services/order-service.ts";
import { BasketService } from "@/api/services/basket-service.ts";

type Services = {
    categoryService: CategoryService,
    productsService: ProductsService,
    customerService: CustomerService,
    orderService: OrderService,
    basketService: BasketService,
}

const ServicesContext = createContext<Services | null>(null)

export interface ServiceProviderProps {
    children: ReactNode
}

export function ServicesProvider({children}: ServiceProviderProps) {
    const value = useMemo(() => ({
        categoryService: new CategoryService(),
        productsService: new ProductsService(),
        customerService: new CustomerService(),
        orderService: new OrderService(),
        basketService: new BasketService(),
    }), [])

    return (
        <ServicesContext.Provider value={value}>
            {children}
        </ServicesContext.Provider>
    )
}

export function useServices() {
    const context = useContext(ServicesContext)

    if (context === null) {
        throw new Error('useServices must be used within ServicesProvider')
    }

    return context
} 
