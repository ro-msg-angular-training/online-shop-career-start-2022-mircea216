export interface ProductOrder {
    productId: number,
    quantity: number
}
export interface Order {
    customer: string,
    products: ProductOrder[]
}

export interface ProductContentCart {
    name: string,
    quantity: number
}