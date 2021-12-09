import { ADD_TO_CART } from "../actions/Cart";
import CartItem from "../../models/Cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      let updatedorNewCArtItem;
      if (state.items[addedProduct.id]) {
        //already item added
        updatedorNewCArtItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedorNewCArtItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedorNewCArtItem },
        totalAmount: state.totalAmount + prodPrice,
      };
  }
  return state;
};
