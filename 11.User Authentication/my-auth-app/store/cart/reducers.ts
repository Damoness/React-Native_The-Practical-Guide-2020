import { CartState, CartAction, ADD_TO_CART, DELETE_FROM_CART} from "./types";
import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../product/types";
import { ADD_ORDER } from "../order/types";

const initialState:CartState={
    items:[],
    totals:0,
}

export function cartReducer(state=initialState,action:CartAction):CartState{

    switch(action.type){

        case ADD_TO_CART:{

            const exitingIndex =  state.items.findIndex(item=>item.product.id == action.product.id);

            if(exitingIndex >=0){

                const updatedItems = [...state.items];
                updatedItems[exitingIndex].quantity++;

                const updatedState = {
                        items:updatedItems,
                        totals:state.totals  + action.product.price
                }

                return updatedState;
                
            }else{

                
                const updatedItems = [...state.items,new CartItem(1,action.product)];

                const updatedState = {
                    items:updatedItems,
                    totals:state.totals  + action.product.price
                }

                return updatedState;

            }

        }
        case DELETE_FROM_CART:{

            const exitingIndex =  state.items.findIndex(item=>item.product.id == action.productId);

            if(exitingIndex >=0 ){

                const updatedItems = [...state.items];

                if(updatedItems[exitingIndex].quantity > 1){

                    updatedItems[exitingIndex].quantity--;

                }else{
                     updatedItems.splice(exitingIndex,1);
                }

                const updatedState = {
                    items:updatedItems,
                    totals:updatedItems.reduce((pre,cur)=>pre+ cur.product.price * cur.quantity,0)
                }
    
                return updatedState;

            }

        }

        case ADD_ORDER:{

            return initialState;

        }
        case DELETE_PRODUCT:{

            const exitingIndex =  state.items.findIndex(item=>item.product.id == action.productId);


            if(exitingIndex >=0){

                const updatedItems = [...state.items];
                updatedItems.splice(exitingIndex,1);
                const updatedState = {
                    items:updatedItems,
                    totals:updatedItems.reduce((pre,cur)=>pre+ cur.product.price * cur.quantity,0)
                }
                return updatedState;
            }


        }
        default:{
            return state;
        }

    }

    return state;

}