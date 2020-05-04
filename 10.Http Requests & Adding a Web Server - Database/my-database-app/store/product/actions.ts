import { ADD_PRODUCT, DELETE_PRODUCT ,DeleteProductAction,UpdateProductAction, UPDATE_PRODUCT,AddProductAction, SET_PRODUCTS} from "./types";
import Product from "../../models/product";

export function fetchProducts(){

    console.log('fetchProducts');

    return async (dispatch:any)=>{

    
        const response =  await fetch('https://rn-complete-guide-c0db7.firebaseio.com/products.json')

        const resJson = await response.json();

        console.log(resJson);

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

    }
}

export function addProduct(title:string,imageUrl:string,price:number,description:string){

    
    return async (dispatch:any)=>{

        const response =  await fetch('https://rn-complete-guide-c0db7.firebaseio.com/products.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                imageUrl,
                price,
                description,
            })
        })
        
        const resJson = await response.json();

        console.log(resJson);
        const id = resJson.name;

        dispatch({
            type:ADD_PRODUCT,
            data:new Product(id,'u2',title,imageUrl,description,price),
        })

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

