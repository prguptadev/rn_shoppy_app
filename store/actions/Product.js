import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCHS_PRODUCT = "FETCH_PRODUCT";

export const fetchProduct = () => {
  return async (dispatch) => {
    try {
      const responseProduct = await fetch(
        "https://rn-shoppy-app-default-rtdb.firebaseio.com/products.json"
      );
      if (!responseProduct.ok) {
        throw new Error("Something went wrong");
      }

      const resProdData = await responseProduct.json();
      const loadedProducts = [];
      for (const key in resProdData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resProdData[key].title,
            resProdData[key].imageurl,
            resProdData[key].description,
            resProdData[key].price
          )
        );
      }
      // console.log(loadedProducts);

      dispatch({
        type: FETCHS_PRODUCT,
        products: loadedProducts,
      });
    } catch (err) {
      //send eror to log
      throw new Error(err + " update json");
    }
  };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageurl, price) => {
  return async (dispatch) => {
    //anyasync code we want
    //by defalut its get request , for post need to pass 2nd args
    const response = await fetch(
      "https://rn-shoppy-app-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, imageurl, price }),
      }
    );
    const resData = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      newProduct: {
        id: resData.name,
        title: title,
        description: description,
        imageurl: imageurl,
        price: price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageurl, price) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    oldProduct: {
      title,
      description,
      imageurl, // can be done like this also if key and vlaue same or check in update for mapping
      price,
    },
  };
};
