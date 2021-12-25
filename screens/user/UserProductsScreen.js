import React, { useState, useCallback } from "react";
import { FlatList, Button, Alert } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import CartButton from "../../components/UI/CartButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as ProductActions from "../../store/actions/Product";

import Colors from "../../constants/Colors";

const UserProductsScreen = (props) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userProduct = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item", [
      { text: "NO", style: "default" },
      {
        text: "YES",
        style: "destructive",
        onPress: () => {
          dispatch(ProductActions.deleteProduct(id));
        },
      },
    ]);
  };

  const renderUserProduct = (itemData) => {
    return (
      <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={() => {
          props.navigation.navigate("EditProduct", {
            productId: itemData.item.id,
          });
        }}
      >
        <Button
          color={Colors.primary}
          title="Edit"
          onPress={() => {
            props.navigation.navigate("EditProduct", {
              productId: itemData.item.id,
            });
          }}
        />
        <Button
          color={Colors.primary}
          title="Delete"
          // onPress={() => {
          //   deleteHandler(itemData.item.id); // or just like {deleteHandler.bind(this,itemData.item.id)}
          // }}
          onPress={deleteHandler.bind(this, itemData.item.id)}
        />
      </ProductItem>
    );
  };

  return (
    <FlatList
      // onRefresh={}
      //refreshing={isLoading}
      data={userProduct}
      keyExtractor={(item) => item.id}
      renderItem={renderUserProduct}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Admin",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CartButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CartButton}>
        <Item
          title="Add Item"
          iconName="add"
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
