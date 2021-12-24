import OrderData from "../../models/Order_data";

export const ADD_ORDER = "ADD_ORDER";
export const FETCH_ORDER = "FETCH_ORDER";

export const fetchOrder = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-shoppy-app-default-rtdb.firebaseio.com/orders/u1.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong-ORDER");
    }

    const resOrder = await response.json();
    const loadedOrders = [];
    for (const key in resOrder) {
      loadedOrders.push(
        new OrderData(
          key,
          resOrder[key].cartItem,
          resOrder[key].totalAmt,
          new Date(resOrder[key].date)
        )
      );
    }
    console.log(loadedOrders);

    dispatch({ type: FETCH_ORDER, orders: loadedOrders });
  };
};

export const addOrder = (cartItem, totalAmt) => {
  const date = new Date();
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-shoppy-app-default-rtdb.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItem,
          totalAmt,
          date: date.toISOString(),
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong -ORDERS");
    }
    const resData = await response.json();
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItem,
        t_amount: totalAmt,
        date: date,
      },
    });
  };
};
