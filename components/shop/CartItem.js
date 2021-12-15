import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={sstyle.cartItem}>
      <View style={sstyle.newdesign}>
        <View style={sstyle.imagecont}>
          <View style={sstyle.touchable}>
            <TouchableCmp onPress={props.onViewDetails} useForeground>
              <Image source={{ uri: props.c_image }} style={sstyle.image} />
            </TouchableCmp>
          </View>
        </View>
        <View style={sstyle.details}>
          <Text style={sstyle.quantity}>Quantity: {props.c_quant} </Text>
          <Text style={sstyle.title} numberOfLines={1}>
            {props.c_title}
          </Text>
        </View>
      </View>

      <View style={sstyle.detailsss}>
        <Text style={sstyle.amount} numberOfLines={2}>
          ${props.c_amt}
        </Text>
        {props.deletable && (
          <TouchableOpacity
            onPress={props.onRemove}
            style={sstyle.deleteButton}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const sstyle = StyleSheet.create({
  cartItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    // /borderWidth: 1,
    padding: 4,
    borderRadius: 10,
    margin: 6,
    // overflow: "hidden",
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  newdesign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },

  imagecont: {
    width: "30%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  details: {
    marginLeft: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  detailsss: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "10%",
  },
  quantity: {
    fontFamily: "my-open-sans-bold",
    color: "#888",
    fontSize: 14,
    width: "100%",
  },
  title: {
    fontFamily: "my-open-sans-bold",
    fontSize: 14,
    //width: "100%",
    width: 120,
  },
  amount: {
    fontFamily: "my-open-sans-bold",
    fontSize: 14,
    width: "400%",
  },
  deleteButton: {
    //marginLeft: 20,
    width: "280%",
  },
});
export default CartItem;
