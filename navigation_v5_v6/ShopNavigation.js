import React from "react";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import * as AuthAction from "../store/actions/auth";
import { Platform, SafeAreaView, View, Button } from "react-native";
import ProductsOverviewScreen, {
  screenOptions as prodOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  screenOptions as prodDetailsScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import OrderScreen, {
  screenOptions as OrderscreenOptions,
} from "../screens/shop/OrdersScreen";
import CartScreen, {
  screenOptions as cartScreenOptions,
} from "../screens/shop/CartScreen";
import UserProductsScreen, {
  screenOptions as userprodscreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  screenOptions as editprodscreenOptions,
} from "../screens/user/EditProductScreen";
import AuthUserScreen, {
  screenOptions as authuserscreenOptions,
} from "../screens/user/AuthUserScreen";
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

const ProductStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductStackNavigator.Navigator screenOptions={defaultNavigate}>
      <ProductStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={prodOverviewScreenOptions}
      />
      <ProductStackNavigator.Screen
        name="CartScreens"
        component={CartScreen}
        options={prodDetailsScreenOptions}
      />
      <ProductStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={cartScreenOptions}
      />
    </ProductStackNavigator.Navigator>
  );
};

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: { screen: ProductsOverviewScreen },
//     CartScreens: CartScreen,
//     ProductDetail: ProductDetailScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-create" : "ios-create"}
//           size={23}
//           color={drawerConfig.tintColor}
//         ></Ionicons>
//       ),
//     },

//     defaultNavigationOptions: defaultNavigate,
//   }
// );

const OrdersStackNavigator = createStackNavigator();
export const OrdersNavigation = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavigate}>
      <OrdersStackNavigator.Screen
        name="orders"
        component={OrderScreen}
        options={OrderscreenOptions}
      />
      <OrdersStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={prodDetailsScreenOptions}
      />
      <OrdersStackNavigator.Screen
        name="CartScreens"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

// // const OrdersNavigation = createStackNavigator(
// //   {
// //     orders: OrderScreen,
// //     ProductDetail: ProductDetailScreen,
// //     //ProductsOverview: { screen: ProductsOverviewScreen },
// //     CartScreens: CartScreen,
// //     // ProductsOverviews: ProductsOverviewScreen,
// //   },
// //   {
// //     navigationOptions: {
// //       drawerIcon: (drawerConfig) => (
// //         <Ionicons
// //           name={Platform.OS === "android" ? "md-list" : "ios-list"}
// //           size={23}
// //           color={drawerConfig.tintColor}
// //         ></Ionicons>
// //       ),
// //     },
// //     defaultNavigationOptions: defaultNavigate,
// //     initialRouteName: "orders",
// //   }
// // );

const AdminStackNavigation = createStackNavigator();
export const AdminNavigation = () => {
  return (
    <AdminStackNavigation.Navigator screenOptions={defaultNavigate}>
      <AdminStackNavigation.Screen
        name="userProduct"
        component={UserProductsScreen}
        options={userprodscreenOptions}
      />
      <AdminStackNavigation.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editprodscreenOptions}
      />
    </AdminStackNavigation.Navigator>
  );
};
// // const AdminNavigation = createStackNavigator(
// //   {
// //     userProduct: UserProductsScreen,
// //     EditProduct: EditProductScreen,
// //   },
// //   {
// //     navigationOptions: {
// //       drawerIcon: (drawerConfig) => (
// //         <Ionicons
// //           name="logo-ionic"
// //           size={23}
// //           color={drawerConfig.tintColor}
// //         ></Ionicons>
// //       ),
// //     },
// //     defaultNavigationOptions: defaultNavigate,
// //   }
// // );

const ShopDrawerNavigator = createDrawerNavigator();
export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
        drawerType: "front",
        drawerStyle: {
          backgroundColor: "#ffff",
          width: 240,
        },
        // overlayColor: "green",
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
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
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Home"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            ></Ionicons>
          ),
          // drawerLabel: "Homey",
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigation}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            ></Ionicons>
          ),
          // drawerLabel: "Ordery",
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigation}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name="logo-ionic"
              size={23}
              color={props.color}
            ></Ionicons>
          ),
          // drawerLabel: "adminy",
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

// // const ShopNavigator = createDrawerNavigator(
// //   {
// //     Home: ProductsNavigator,
// //     Orders: OrdersNavigation,
// //     Admin: AdminNavigation,
// //   },
// //   {
// //     contentOptions: {
// //       activeTintColor: Colors.primary,
// //     },
// //     contentComponent: (props) => {
// //       const dispatch = useDispatch();
// //       return (
// //         <View style={{ flex: 1, paddingTop: 20 }}>
// //           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
// //             <DrawerNavigatorItems {...props} />
// //             <Button
// //               title="Logout"
// //               color={Colors.primary}
// //               onPress={() => {
// //                 dispatch(AuthAction.logout());
// //                 ///props.navigation.navigate("Auth");
// //               }}
// //             />
// //           </SafeAreaView>
// //         </View>
// //       );
// //     },
// //     // Home: ProductsNavigator,
// //     // initialRouteName: "Home",
// //   }
// // );

const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthUserScreen}
        options={authuserscreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
// // const AuthNavigator = createStackNavigator(
// //   {
// //     Auth: AuthUserScreen,
// //   },
// //   {
// //     defaultNavigationOptions: {
// //       headerShown: false,
// //     },
// //   }
// // );

// // const MainNavigator = createSwitchNavigator({
// //   Startup: StartupScreen,
// //   Auth: AuthNavigator,
// //   Shop: ShopNavigator,
// // });

// export default createAppContainer(MainNavigator);
