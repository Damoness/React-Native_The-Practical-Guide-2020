import { ADD_PRODUCT, DELETE_PRODUCT ,DeleteProductAction,UpdateProductAction, UPDATE_PRODUCT,AddProductAction, SET_PRODUCTS} from "./types";
import Product from "../../models/product";

const PRODUCTS_URL = 'https://rn-complete-guide-c0db7.firebaseio.com/products.json';

export function fetchProducts(){

    console.log('fetchProducts');

    return async (dispatch:any)=>{

        try {

            const response =  await fetch(PRODUCTS_URL)

            if(!response.ok){
                throw new Error('Something went wrong')
            }

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

            
        } catch (error) {
            
            throw error;
        }
    

    }
}

export function addProduct(title:string,imageUrl:string,price:number,description:string){

    
    return async (dispatch:any)=>{

        const response =  await fetch(PRODUCTS_URL,{
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

export function deleteProduct(productId:string){


    const url = `https://rn-complete-guide-c0db7.firebaseio.com/products/${productId}.json`;


    return  async (dispatch:any)=>{


        try {

            const response = await fetch(url,{
                method:'DELETE'
            })

            if(!response.ok){
                throw new Error('Something went wrong');
            }

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

    const url = `https://rn-complete-guide-c0db7.firebaseio.com/products/${product.id}.json`;

    console.log('updateProduct',product)

    return async (dispatch:any)=>{


        try {

            const response = await fetch(url,{
                method:'PATCH',
                body:JSON.stringify(product)
            })

            if(!response.ok){
                throw new Error('Something went wrong');
            }

            dispatch({
                type:UPDATE_PRODUCT,
                data:product,
            })

            
        } catch (error) {
            
            throw error;

        }


    }
}

