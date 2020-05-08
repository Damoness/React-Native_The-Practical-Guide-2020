import { ADD_PRODUCT, DELETE_PRODUCT ,DeleteProductAction,UpdateProductAction, UPDATE_PRODUCT,AddProductAction, SET_PRODUCTS} from "./types";
import Product from "../../models/product";
import HttpUtils from "../../utils/HttpUtils";
import { AppState } from "..";

const PRODUCTS_URL = 'https://rn-complete-guide-c0db7.firebaseio.com/products.json';

type getState = ()=>AppState

export function fetchProducts(){

    console.log('fetchProducts');

    return async (dispatch:any)=>{

        try {

            const resJson =  await HttpUtils.GET(PRODUCTS_URL)

            const products = [];
    
            for(let key in resJson){
    
                const {title,imageUrl,price,description} = resJson[key];
                const product = new Product(key,'u1',title,imageUrl,description,price);
                products.push(product)

            }
    
            console.log(products);
    
            dispatch({
                type:SET_PRODUCTS,
                data:products,
            })

            
        } catch (error) {
            
            throw error;
        }
    

    }
}

export function addProduct(title:string,imageUrl:string,price:number,description:string){

    
    return async (dispatch:any,getState:getState)=>{

        const {auth:{token,userId}} = getState();

        const url = `https://rn-complete-guide-c0db7.firebaseio.com/products.json?auth=${token}`;

        const resJson =  await HttpUtils.POST(url,{
            title,
            imageUrl,
            price,
            description,
        })

        console.log(resJson);
        const id = resJson.name;

        dispatch({
            type:ADD_PRODUCT,
            data:new Product(id,'u1',title,imageUrl,description,price),
        })

    }


}

export function deleteProduct(productId:string){

    return  async (dispatch:any,getState:getState)=>{

        const {auth:{token}} = getState();

        const url = `https://rn-complete-guide-c0db7.firebaseio.com/products/${productId}.json?auth=${token}`;

        try {

            await HttpUtils.DELETE(url)

            dispatch({
                type:DELETE_PRODUCT,
                productId:productId,
            })

            
        } catch (error) {
            
            throw error;
        }



    }

}

export function updateProduct(product:Product){



    return async (dispatch:any,getState:getState)=>{


        const {auth:{token}} = getState();

        const url = `https://rn-complete-guide-c0db7.firebaseio.com/products/${product.id}.json?auth=${token}`;

        try {


            await HttpUtils.PATCH(url,product)

            dispatch({
                type:UPDATE_PRODUCT,
                data:product,
            })
            
        } catch (error) {
    
            throw error;

        }


    }
}

