import Product from "../../models/product"
import CartItem from "../../models/cart-item"
import { DeleteProductAction } from "../product/types"
import { AddOrderAction } from "../order/types"


export const ADD_TO_CART = "ADD_TO_CART" 
export const DELETE_FROM_CART = "DELETE_FROM_CART"

interface AddToCartAction{
    type:typeof ADD_TO_CART,
    product:Product,
}

export interface DeleteFromCartAction{
    type:typeof DELETE_FROM_CART,
    productId:string,
}

export interface CartState{
    
    items:Array<CartItem>
    totals:number,
}

export type CartAction = AddToCartAction | DeleteFromCartAction | DeleteProductAction | AddOrderAction