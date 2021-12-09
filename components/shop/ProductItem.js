import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={pistyle.product}>
      <View style={pistyle.touchable}>
        <TouchableCmp onPress={props.onViewDetails} useForeground>
          <View>
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
        </TouchableCmp>
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
