import { ADD_TO_CART, DELETE_FROM_CART } from "../actions/Cart";
import { ADD_ORDER } from "../actions/Order";
import { DELETE_PRODUCT } from "../actions/Product";
import CartItem from "../../models/Cart-item";

const initialState = {
  items: {},
  totalAmount: 0,
  emptyImageUrl:
    "https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90",
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
    case DELETE_FROM_CART:
      const selectedcartItem = state.items[action.productID];
      const currentQty = selectedcartItem.quantity;
      let updatedCArtItemss;
      if (currentQty > 1) {
        const updatedCArtItem = new CartItem(
          selectedcartItem.quantity - 1,
          selectedcartItem.productPrice,
          selectedcartItem.productTitle,
          selectedcartItem.sum - selectedcartItem.productPrice
        );
        updatedCArtItemss = {
          ...state.items,
          [action.productID]: updatedCArtItem,
        };
      } else {
        updatedCArtItemss = { ...state.items };
        delete updatedCArtItemss[action.productID];
      }
      return {
        ...state,
        items: updatedCArtItemss,
        totalAmount: state.totalAmount - selectedcartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updateItems = { ...state.items };
      const ItemTotal = state.items[action.pid].sum;
      delete updateItems[action.pid];
      return {
        ...state,
        items: updateItems,
        totalAmount: state.totalAmount - ItemTotal,
      };
  }
  return state;
};
