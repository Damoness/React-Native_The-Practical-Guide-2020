import { OrderState, OrderAction, ADD_ORDER, SET_ORDERS } from "./types";
import Order from "../../models/order";



const initialState: OrderState = {
  orders: [],
};

export function orderReducer(
  state = initialState,
  action: OrderAction
): OrderState {
  switch (action.type) {
    case ADD_ORDER: {
      const newOrder = new Order(
        action.data.id,
        action.data.items,
        action.data.totals,
        action.data.date,
      );

      return {
          ...state,
          orders:state.orders.concat(newOrder)
      }
    }
    case SET_ORDERS:{

      return {
        ...state,
        orders:action.data
      }

    }
    default: {
      return state;
    }
  }
}
