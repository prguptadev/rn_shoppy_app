import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";

const OrderItem = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const productsss = useSelector((state) => state.products.avaiableProducts);

  return (
    <View style={ostyle.orderItem}>
      <View style={ostyle.summary}>
        <Text style={ostyle.amount}>${props.total_amount.toFixed(2)}</Text>
        <Text style={ostyle.datee}>{props.datee}</Text>
      </View>
      <Button
        color={Colors.primary}
        title="Show Details"
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
                console.log(cartitem.productId);
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const ostyle = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
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