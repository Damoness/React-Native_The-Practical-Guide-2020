import { OrderState, OrderAction, ADD_ORDER } from "./types";
import { ORDER_CART } from "../cart/types";
import Order from "../../models/order";

const moment = require('moment');

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
        new Date().toString(),
        action.data.items,
        action.data.totals,
        moment(new Date()).format("MMMM Do YYYY, hh:mm:ss"),
      );

      return {
          ...state,
          orders:state.orders.concat(newOrder)
      }
    }
    default: {
      return state;
    }
  }
}
