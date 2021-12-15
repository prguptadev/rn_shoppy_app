export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItem, totalAmt) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItem, t_amount: totalAmt },
  };
};
