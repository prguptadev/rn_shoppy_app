import React from "react";
import { StyleSheet, Text, Image, View, Button } from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  return (
    <View style={pistyle.product}>
      <View style={pistyle.imageConatiner}>
        <Image style={pistyle.image} source={{ uri: props.image }} />
      </View>

      <View style={pistyle.details}>
        <Text style={pistyle.title}>{props.title}</Text>
        <Text style={pistyle.price}>${props.price.toFixed(2)}</Text>
      </View>

      <View style={pistyle.actions}>
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={props.onViewDetails}
        />
        <Button
          color={Colors.accent}
          title="Add To Cart"
          onPress={props.onAddToCart}
        />
      </View>
    </View>
  );
};

export default ProductItem;

const pistyle = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  imageConatiner: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});
