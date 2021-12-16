import PRODUCTS from "../../data/dummy-data ";
import Product from "../../models/Product";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/Product";

const initialState = {
  avaiableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(
    (prod) =>
      prod.ownerId === "u0" ||
      prod.ownerId === "u1" ||
      prod.ownerId === "u2" ||
      prod.ownerId === "u3"
  ),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        action.newProduct.title,
        action.newProduct.imageurl,
        action.newProduct.description,
        action.newProduct.price
      );
      return {
        ...state,
        avaiableProducts: state.avaiableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.oldProduct.title,
        action.oldProduct.imageurl,
        action.oldProduct.description,
        action.oldProduct.price
      );
      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[productIndex] = updatedProduct;

      const availableProductIndex = state.avaiableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedAvailableProduct = [...state.avaiableProducts];
      updatedAvailableProduct[availableProductIndex] = updatedProduct;
      return {
        ...state,
        userProducts: updatedUserProduct,
        avaiableProducts: updatedAvailableProduct,
      };

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
