import React from "react";
import { StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as CartActions from "../../store/actions/Cart";
import CartButton from "../../components/UI/CartButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.avaiableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  const renderProduct = (itemData) => {
    return (
      <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={() => {
          selectItemHandler(itemData.item.id, itemData.item.title);
        }}
      >
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        />
        <Button
          color={Colors.accent}
          title="Add To Cart"
          onPress={() => {
            dispatch(CartActions.addToCart(itemData.item));
          }}
        />
      </ProductItem>
    );
  };
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={renderProduct}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CartButton}>
        <Item
          title="Cart"
          iconName="ios-cart"
          onPress={() => {
            navData.navigation.navigate("CartScreens");
          }}
        />
      </HeaderButtons>
    ),
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
  };
};

export default ProductsOverviewScreen;

const pstyle = StyleSheet.create({});
