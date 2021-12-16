import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import PRODUCTS from "../../data/dummy-data ";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const productsss = PRODUCTS; //useSelector((state) => state.products.avaiableProducts);
  const exitingProduct = useSelector(
    (state) => state.products.avaiableProducts
  );

  const productDetailHAndler = (produdctID, productTitle) => {
    //  console.log(exitingProduct.findIndex((prod) => prod.id === produdctID));
    if (exitingProduct.findIndex((prod) => prod.id === produdctID) >= 0) {
      return props.productDetailsProps.navigate("ProductDetail", {
        productId: produdctID,
        productTitle: productTitle,
      });
    }

    return Alert.alert("Oops!!", "Product no longer with us", [
      { text: "OKAY", style: "destructive" },
    ]);
  };

  return (
    <Card style={ostyle.orderItem}>
      <View style={ostyle.summary}>
        <Text style={ostyle.amount}>${props.total_amount.toFixed(2)}</Text>
        <Text style={ostyle.datee}>{props.datee}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetail ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetail((prevState) => !prevState);
        }}
      />
      {showDetail && (
        <View style={ostyle.detailsItem}>
          {props.cartyItem.map((cartitem) => (
            <CartItem
              key={cartitem.productId}
              c_title={cartitem.productTitle}
              c_quant={cartitem.quantity}
              c_amt={cartitem.sum}
              deletable={false}
              c_image={
                productsss.find((prod) => cartitem.productId === prod.id)
                  .imageUrl
              }
              onViewDetails={() => {
                productDetailHAndler(cartitem.productId, cartitem.productTitle);
              }}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const ostyle = StyleSheet.create({
  orderItem: {
    // shadowColor: "black",
    // shadowOpacity: 0.8,
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius: 8,
    // elevation: 5,
    // backgroundColor: "white",
    flexDirection: "column",
    // justifyContent: "space-evenly",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
  },
  amount: {
    fontFamily: "my-open-sans-bold",
    fontSize: 18,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  datee: {
    fontFamily: "my-open-sans",
    fontSize: 16,
    color: "#888",
  },
  detailsItem: {
    width: "100%",
  },
});

export default OrderItem;
