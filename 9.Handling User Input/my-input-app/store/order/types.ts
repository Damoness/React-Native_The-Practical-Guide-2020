
import Order from "../../models/order";
import { CartState } from "../cart/types";

export const ADD_ORDER = "ADD_ORDER";

export interface OrderState{
    orders:Array<Order>
}

export interface AddOrderAction{
    type:typeof ADD_ORDER,
    data:CartState,
}


export type OrderAction = AddOrderAction 