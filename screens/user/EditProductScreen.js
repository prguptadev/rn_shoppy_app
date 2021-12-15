import React from "react";
import { FlatList, Text } from "react-native";
const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  return (
    <Text>
      {" "}
      ok you are inside edit <Text>{productId}</Text>
    </Text>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Edit Product",
  };
};

export default EditProductScreen;
