import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator, ShopNavigator } from "./ShopNavigation";
import StartupScreen from "../screens/StartupScreen";

const AppNavigationContainer = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didyoutryLogin = useSelector((state) => !!state.auth.didyoutryLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didyoutryLogin && <AuthNavigator />}
      {!isAuth && !didyoutryLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
