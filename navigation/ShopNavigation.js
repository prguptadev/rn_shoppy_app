import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import OrderScreen from "../screens/shop/OrdersScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
const defaultNavigate = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
  },
  headerTitleStyle: {
    fontFamily: "my-open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "my-open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: { screen: ProductsOverviewScreen },
    ProductDetail: ProductDetailScreen,
    CartScreens: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        ></Ionicons>
      ),
    },

    defaultNavigationOptions: defaultNavigate,
  }
);

const OrdersNavigation = createStackNavigator(
  {
    orders: OrderScreen,
    ProductDetailee: ProductDetailScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        ></Ionicons>
      ),
    },
    defaultNavigationOptions: defaultNavigate,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Home: ProductsNavigator,
    Orders: OrdersNavigation,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
