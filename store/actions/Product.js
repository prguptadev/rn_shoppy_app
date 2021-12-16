export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageurl, price) => {
  return {
    type: CREATE_PRODUCT,
    newProduct: {
      title: title,
      description: description,
      imageurl: imageurl,
      price: price,
    },
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
