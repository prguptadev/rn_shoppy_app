import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { applyMiddleware } from "redux";
import CartItem from "../../components/shop/CartItem";
import Colors from "../../constants/Colors";
import * as CartActions from "../../store/actions/Cart";

const CartScreen = (props) => {
  let totalQuantity = 0;
  // const cartItems = useSelector((state) => state.cart.items); // gives object convert to array
  const productsss = useSelector((state) => state.products.avaiableProducts);
  const emptyImageUrl = useSelector((state) => state.cart.emptyImageUrl);
  // "https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90";
  const cartItems = useSelector((state) => {
    const transformedCartItem = [];
    for (const key in state.cart.items) {
      transformedCartItem.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
      totalQuantity = totalQuantity + parseInt(state.cart.items[key].quantity);
    }
    // return transformedCartItem;// because auto arrange
    return transformedCartItem.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const Cart_total_amt = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();

  if (cartItems.length === 0 || !cartItems) {
    return (
      <View style={cstyle.emptyscreen}>
        <View style={cstyle.imageConatiner}>
          <Image style={cstyle.emptyImage} source={{ uri: emptyImageUrl }} />
        </View>
        <Text style={cstyle.emptyTitle}>Your cart is empty!</Text>
        <Text style={cstyle.emptydes} numberOfLines={1}>
          It's a good day to buy the items you might need later!
        </Text>
        <View style={cstyle.browse}>
          <Button
            color={Colors.primary}
            title="Browse Products"
            onPress={() => {
              props.navigation.pop();
            }}
          />
        </View>
      </View>
    );
  }

  const renderCarting = (itemData) => {
    // console.log(itemData.item.quantity);
    const imageforprodID = productsss.find(
      (prod) => itemData.item.productId === prod.id
    );
    // console.log(imageforprodID);
    return (
      <CartItem
        c_image={imageforprodID.imageUrl}
        c_quant={itemData.item.quantity}
        c_title={itemData.item.productTitle}
        c_amt={itemData.item.sum}
        onViewDetails={() => {
          props.navigation.navigate("ProductDetail", {
            productId: itemData.item.productId,
            productTitle: itemData.item.productTitle,
          });
        }}
        onRemove={() => {
          dispatch(CartActions.deleteFromCart(itemData.item.productId));
        }}
      />
    );
  };

  return (
    <View>
      <View style={cstyle.screen}>
        <View style={cstyle.summary}>
          <Text style={cstyle.summaryText}>
            Total:{" "}
            <Text style={cstyle.amount}>${Cart_total_amt.toFixed(2)}</Text>
          </Text>
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
          />
        </View>
      </View>
      <View style={cstyle.itemmsg}>
        <Text style={cstyle.itemcount}>{cartItems.length} Item Selected</Text>
        <Text style={cstyle.itemquant}>Total Quantity: {totalQuantity}</Text>
      </View>
      <FlatList
        data={cartItems}
        style={{ height: "83%" }}
        keyExtractor={(item) => item.productId}
        renderItem={renderCarting}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Cart",
};

const cstyle = StyleSheet.create({
  screen: {
    margin: 10,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "my-open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
  itemcount: {
    fontFamily: "my-open-sans-bold",
    fontSize: 14,
    color: "#888",
  },
  itemquant: {
    marginLeft: "40%",
    fontFamily: "my-open-sans-bold",
    fontSize: 14,
    color: "#888",
  },
  itemmsg: {
    flexDirection: "row",
    padding: 5,
    marginLeft: 10,
    alignItems: "flex-start",
  },
  emptyscreen: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",

    //justifyContent: "center",
  },
  browse: {
    marginTop: "6%",
  },
  emptyTitle: {
    fontFamily: "my-open-sans-bold",
    fontSize: 20,
  },
  emptydes: {
    fontFamily: "my-open-sans",
    fontSize: 14,
    color: "#888",
  },
  emptyImage: {
    width: "100%",
    height: "100%",
  },
  imageConatiner: {
    marginTop: Platform.OS === "ios" ? "40%" : "30%",
    width: "80%",
    height: Platform.OS === "ios" ? "30%" : "40%",
    // borderWidth: 1,
    //  borderTopLeftRadius: 10,
    //  borderTopRightRadius: 10,
    // overflow: "hidden",
  },
});

export default CartScreen;
