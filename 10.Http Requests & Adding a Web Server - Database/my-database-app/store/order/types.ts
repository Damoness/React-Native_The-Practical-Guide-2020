
import Order from "../../models/order";
import CartItem from "../../models/cart-item";

export const ADD_ORDER = "ADD_ORDER";
export interface OrderState{
    orders:Array<Order>
}




export interface AddOrderAction{
    type:typeof ADD_ORDER,
    data:{
        id:string,
        items:Array<CartItem>
        totals:number,
        date:Date,
    },
}


export type OrderAction = AddOrderAction 