import Product from "../../models/product";

export const SET_PRODUCTS = 'SET_PRODUCTS';

export const ADD_PRODUCT = 'ADD_PRODUCT'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export interface ProductState{
    availableProducts:Array<Product>,
    userProducts:Array<Product>
}

export interface SetProductsAction{
    type:typeof SET_PRODUCTS
    data:Array<Product>
}
export interface AddProductAction{
     type:typeof ADD_PRODUCT
     data:Product,
}

export interface DeleteProductAction{
    type:typeof DELETE_PRODUCT
    productId:string,
}

export interface UpdateProductAction{
    type:typeof UPDATE_PRODUCT
    data:Product,
}

export type  ProductAction  = AddProductAction | DeleteProductAction | UpdateProductAction | SetProductsAction





