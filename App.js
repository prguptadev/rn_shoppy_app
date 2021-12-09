import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createStore, combineReducers } from "redux";
import ProductReducer from "./store/reducers/Product";
import CartReducer from "./store/reducers/Cart";
import ShopNavigation from "./navigation/ShopNavigation";
import { enableScreens } from "react-native-screens";
import { composeWithDevTools } from "redux-devtools-extension";

enableScreens();

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
});

//const store = createStore(rootReducer); // for production

const store = createStore(rootReducer, composeWithDevTools()); // for debugger

const fetchFonts = () => {
  return Font.loadAsync({
    "my-open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "my-open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoad, setFontLoad] = useState(false);

  if (!fontLoad) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoad(true)}
        onError={(err) => {
          console.log(err);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
