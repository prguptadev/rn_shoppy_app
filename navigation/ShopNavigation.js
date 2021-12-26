import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { useDispatch } from "react-redux";
import * as AuthAction from "../store/actions/auth";
import { Platform, SafeAreaView, View, Button } from "react-native";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import OrderScreen from "../screens/shop/OrdersScreen";
import CartScreen from "../screens/shop/CartScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthUserScreen from "../screens/user/AuthUserScreen";
import StartupScreen from "../screens/StartupScreen";
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
    CartScreens: CartScreen,
    ProductDetail: ProductDetailScreen,
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
    ProductDetail: ProductDetailScreen,
    //ProductsOverview: { screen: ProductsOverviewScreen },
    CartScreens: CartScreen,
    // ProductsOverviews: ProductsOverviewScreen,
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
    initialRouteName: "orders",
  }
);

const AdminNavigation = createStackNavigator(
  {
    userProduct: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name="logo-ionic"
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
    Admin: AdminNavigation,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(AuthAction.logout());
                ///props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
    // Home: ProductsNavigator,
    // initialRouteName: "Home",
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthUserScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
