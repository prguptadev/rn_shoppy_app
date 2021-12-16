import PRODUCTS from "../../data/dummy-data ";
import { DELETE_PRODUCT } from "../actions/Product";

const initialState = {
  avaiableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid
        ),
        avaiableProducts: state.avaiableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
  }
  return state;
};
