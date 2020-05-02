import {allProducts} from "../../data/dummy-data";
import { ProductAction ,ProductState, DELETE_PRODUCT, UPDATE_PRODUCT, ADD_PRODUCT} from "./types";


const initialState:ProductState={
    availableProducts:allProducts,
    userProducts:allProducts.filter(product=>product.userId == 'u1'),
}


export function productReducer(state = initialState,action:ProductAction):ProductState{

    switch(action.type){

        case DELETE_PRODUCT: {

            const products =  state.availableProducts.filter(product=>product.id!=action.productId);
            const myProducts =  state.userProducts.filter(product=>product.id!=action.productId);

            return {availableProducts: products,userProducts: myProducts}
            
        }
        case UPDATE_PRODUCT:{

            const exitingIndex1 =  state.availableProducts.findIndex(product=>product.id == action.data.id);
            const exitingIndex2 =  state.userProducts.findIndex(product=>product.id == action.data.id);

            if(exitingIndex1>=0 && exitingIndex2>=0){

                const updatedProducts = state.availableProducts.slice();
                updatedProducts[exitingIndex1] = action.data;

                const updatedMyProducts = state.userProducts.slice();
                updatedMyProducts[exitingIndex2] = action.data;

                return {userProducts:updatedMyProducts,availableProducts:updatedProducts}
            }

            return state;


        }
        case ADD_PRODUCT:{

            const exist1 = state.availableProducts.some(product=>product.id == action.data.id)
            const exist2 = state.userProducts.some(product=>product.id == action.data.id)
            
            if(!exist1 && !exist2){

                return {availableProducts:[...state.availableProducts,action.data],userProducts:state.userProducts.concat(action.data)}

            }else{

                return state

            }
            
            
        }
        default:{
            return state;
        }
    }
}