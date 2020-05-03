import { ADD_PRODUCT, DELETE_PRODUCT ,DeleteProductAction,UpdateProductAction, UPDATE_PRODUCT,AddProductAction} from "./types";
import Product from "../../models/product";

export function addProduct(product:Product):AddProductAction{

    return {
        type:ADD_PRODUCT,
        data:product,
    }
}

export function deleteProduct(productId:string):DeleteProductAction{

    return {
        type:DELETE_PRODUCT,
        productId:productId,
    }
}

export function updateProduct(product:Product):UpdateProductAction{

    return {
        type:UPDATE_PRODUCT,
        data:product,
    }
}

