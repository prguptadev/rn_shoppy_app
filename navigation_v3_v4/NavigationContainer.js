import React, { useEffect, useRef } from "react";
import ShopNavigation from "./ShopNavigation";
import { NavigationActions } from "react-navigation";
import { useSelector } from "react-redux";

const NavigationContainer = (props) => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);
  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);
  return <ShopNavigation ref={navRef} />;
};

export default NavigationContainer;
