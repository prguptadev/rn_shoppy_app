import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as CartActions from "../../store/actions/Cart";
import CartButton from "../../components/UI/CartButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as OrderAction from "../../store/actions/Order";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.avaiableProducts.find((prod) => prod.id === productId)
  );

  const transformedbuyItem = [];
  transformedbuyItem.push({
    productId: selectedProduct.id,
    productTitle: selectedProduct.title,
    productPrice: selectedProduct.price,
    quantity: parseInt(1),
    sum: selectedProduct.price,
  });

  // return transformedCartItem;// because auto arrange
  transformedbuyItem.sort((a, b) => (a.productId > b.productId ? 1 : -1));

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View>
        <Image
          style={dstyle.image}
          source={{ uri: selectedProduct.imageUrl }}
        />
        <View style={dstyle.actions}>
          <Button
            color={Colors.primary}
            title="Add To Cart"
            onPress={() => {
              dispatch(CartActions.addToCart(selectedProduct));
              props.navigation.navigate("CartScreens");
            }}
          />
          <Button
            color={Colors.primary}
            title="Buy Now"
            onPress={() => {
              //  dispatch(CartActions.addToCart(selectedProduct));
              dispatch(
                OrderAction.addOrder(transformedbuyItem, selectedProduct.price)
              );
              props.navigation.navigate("orders");
            }}
          />
        </View>
        <Text style={dstyle.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={dstyle.descrip}>{selectedProduct.description}</Text>
      </View>
    </ScrollView>
  );
};
//// now need to change for navigation 5 and 6

//ProductDetailScreen.navigationOptions = (navData) => {
export const screenOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
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
    // headerLeft: () => (
    //   <HeaderButtons HeaderButtonComponent={CartButton}>
    //     <Item
    //       title="Menu"
    //       iconName="ios-menu"
    //       onPress={() => {
    //         navData.navigation.toggleDrawer();
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
  };
};

export default ProductDetailScreen;

const dstyle = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 2,
  },
  descrip: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 15,
    fontFamily: "my-open-sans",
  },
  actions: {
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
