import { ADD_ORDER, SET_ORDERS } from "./types";
import { CartState } from "../cart/types";
import Order from "../../models/order";

const ORDERS_URL = "https://rn-complete-guide-c0db7.firebaseio.com/orders.json";


export function fetchOrders(){

  return async (dispatch:any,getState:any)=>{

    const userId = getState().auth.userId;

    try {

      const url = `https://rn-complete-guide-c0db7.firebaseio.com/orders/${userId}.json`;

      const response = await fetch(url);

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
  return async (dispatch: any,getState:any) => {

    const {userId,token} = getState().auth;
    const date = new Date();
    const url = `https://rn-complete-guide-c0db7.firebaseio.com/orders/${userId}.json?auth=${token}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items:data.items,
            totals:data.totals,
            date:date.toISOString(),
        }),
      });

      if (!response.ok) {

        const resJson = await response.json();
        console.log(resJson);
        throw new Error('Something went wrong!');
      }

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
