import { ADD_ORDER, SET_ORDERS } from "./types";
import { CartState } from "../cart/types";
import Order from "../../models/order";

const ORDERS_URL = "https://rn-complete-guide-c0db7.firebaseio.com/orders.json";


export function fetchOrders(){

  return async (dispatch:any)=>{

    try {

      const response = await fetch(ORDERS_URL);

      const resJson = await response.json();

      let orders:Array<Order> = [];

      for(let key in resJson){

        let id = key;
        let date = new Date(resJson[key].date);
        let items = resJson[key].items;
        let totals = resJson[key].totals;

        const order = new Order(id,items,totals,date);

        orders.push(order);

      }

      orders.sort((a,b)=>a.time.getTime() - b.time.getTime()>0?-1:1)

      dispatch({
        type:SET_ORDERS,
        data:orders
      })
      
    } catch (error) {
      
    }

  }

}

export function addOrder(data: CartState) {
  return async (dispatch: any) => {

    const date = new Date();

    try {
      const response = await fetch(ORDERS_URL, {
        method: "POST",
        body: JSON.stringify({
            items:data.items,
            totals:data.totals,
            date:date.toISOString(),
        }),
      });

      const resJson = await response.json();

      console.log(resJson);

      dispatch({
        type: ADD_ORDER,
        data: {
            id:resJson.name,
            items:data.items,
            totals:data.totals,
            date:date
        },
      });

    } catch (error) {}
  };
}
