import React from "react";
import { StyleSheet, FlatList, Button } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import CartButton from "../../components/UI/CartButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as ProductActions from "../../store/actions/Product";

import Colors from "../../constants/Colors";

const UserProductsScreen = (props) => {
  const userProduct = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const renderUserProduct = (itemData) => {
    return (
      <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={() => {}}
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
          onPress={() => {
            dispatch(ProductActions.deleteProduct(itemData.item.id));
          }}
        />
      </ProductItem>
    );
  };

  return (
    <FlatList
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
