import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

const AppNavigationContainer = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);

  return;
};

export default AppNavigationContainer;
