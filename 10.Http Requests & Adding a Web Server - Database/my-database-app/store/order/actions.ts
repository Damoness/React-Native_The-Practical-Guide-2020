import { ADD_ORDER } from "./types";
import { CartState } from "../cart/types";

const ORDERS_URL = "https://rn-complete-guide-c0db7.firebaseio.com/orders.json";



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
