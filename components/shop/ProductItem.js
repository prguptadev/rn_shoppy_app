import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Card from "../UI/Card";

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <Card style={pistyle.product}>
      <View style={pistyle.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={pistyle.imageConatiner}>
              <Image style={pistyle.image} source={{ uri: props.image }} />
            </View>

            <View style={pistyle.details}>
              <Text style={pistyle.title}>{props.title}</Text>
              <Text style={pistyle.price}>${props.price.toFixed(2)}</Text>
            </View>

            <View style={pistyle.actions}>{props.children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

export default ProductItem;

const pistyle = StyleSheet.create({
  product: {
    // shadowColor: "black",
    // shadowOpacity: 0.26,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 8,
    // elevation: 5,
    // borderRadius: 10,
    // backgroundColor: "white",
    /// common used revamp making component as card
    height: 300,
    margin: 15,
    //  overflow: "hidden",
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
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
    padding: 1,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "my-open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "my-open-sans-bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});
