import React, { useState, useReducer, useEffect, useCallback } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Button,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import * as AuthAction from "../../store/actions/auth";
import { useHeaderHeight } from "@react-navigation/elements";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const authReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidites = {
      ...state.inputValidites,
      [action.input]: action.IsValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidites) {
      updatedFormIsValid = updatedFormIsValid && updatedValidites[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidites: updatedValidites,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthUserScreen = (props) => {
  //const headerHeight = useHeaderHeight();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setisSignup] = useState(false);
  const dispatch = useDispatch();

  const [AuthState, dispatchAuthState] = useReducer(authReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidites: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    if (!AuthState.formIsValid) {
      Alert.alert("Wrong Input!", "Please check the errors in the form", [
        { text: "OKAY", style: "destructive" },
      ]);
      return;
    }

    let action;
    if (isSignup) {
      action = AuthAction.signup(
        AuthState.inputValues.email,
        AuthState.inputValues.password
      );
    } else {
      action = AuthAction.login(
        AuthState.inputValues.email,
        AuthState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      // props.navigation.navigate("Shop");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputvalue, inputValidity) => {
      dispatchAuthState({
        type: FORM_INPUT_UPDATE,
        value: inputvalue,
        IsValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchAuthState]
  );

  useEffect(() => {
    if (error) {
      return Alert.alert("Oops!!", error, [{ text: "OKAY!" }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      // behavior="padding"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={80}
      style={styles.screen}
    >
      <LinearGradient
        colors={[
          "transparent",
          "#ffe6ff",
          "red",
          Colors.accent,
          "green",
          "blue",
          "pink",
          "transparent",
        ]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1.5, y: 0.5 }}
        style={styles.gradient}
      >
        <Card style={styles.authencontain}>
          <ScrollView>
            <Input
              id="email"
              placeHolder="UserName"
              label="E-Mail"
              keyBoardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              placeHolder="*********"
              label="Password"
              keyBoardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid email password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonCont}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? "SignUp" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonCont}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => {
                  setisSignup((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

//need to revamp to navigation 5 or 6
//AuthUserScreen.navigationOptions = {

export const screenOptions = {
  headerTitle: "Authenication",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authencontain: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCont: {
    margin: 10,
  },
});

export default AuthUserScreen;
