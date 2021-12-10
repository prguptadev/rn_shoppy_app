import OrderData from "../../models/Order_data";
import { ADD_ORDER } from "../actions/Order";

const initialState = {
  OrderData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new OrderData(
        new Date().toString(),
        action.orderData.items,
        action.orderData.t_amount,
        new Date()
      );
      return { ...state, OrderData: state.OrderData.concat(newOrder) };
  }
  return state;
};
