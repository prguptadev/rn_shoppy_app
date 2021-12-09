import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
const CartButton = (props) => {
  return (
    <HeaderButton
      IconComponent={AntDesign}
      iconSize={25}
      color={Platform.OS === "android" ? "white" : Colors.primary}
      {...props}
    ></HeaderButton>
  );
};

export default CartButton;
