import Product from "../../models/product";
import { ADD_TO_CART, DELETE_FROM_CART ,DeleteFromCartAction, CartState} from "./types";

export function addToCart(product:Product){

    return {
        type:ADD_TO_CART,
        product:product,
    }

}

export function deleteFromCart(productId:string):DeleteFromCartAction{

    return {
        type:DELETE_FROM_CART,
        productId:productId,
    }

}


