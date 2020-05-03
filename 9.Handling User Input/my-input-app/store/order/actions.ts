import { ADD_ORDER } from "./types";
import { CartState } from "../cart/types";


export function addOrder(data:CartState){
    return {
        type:ADD_ORDER,
        data:data,
    }
}