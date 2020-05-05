import { OrderState, OrderAction, ADD_ORDER } from "./types";
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
        action.data.id,
        action.data.items,
        action.data.totals,
        moment(action.data.date).format("MMMM Do YYYY, hh:mm:ss"),
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
