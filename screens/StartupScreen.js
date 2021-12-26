import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as AuthAction from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const tranformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = tranformedData;
      const expirationDate = new Date(expiryDate);
      //  console.log(expirationDate.toISOString());
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();
      props.navigation.navigate("Shop");
      dispatch(AuthAction.authenticate(token, userId, expirationTime));
    };
    tryLogin();
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
