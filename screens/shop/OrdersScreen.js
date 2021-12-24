import React, { useState, useCallback, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CartButton from "../../components/UI/CartButton";
import OrderItem from "../../components/shop/OrderItem";
import * as OrderAction from "../../store/actions/Order";
import Colors from "../../constants/Colors";

const OrderScreen = (props) => {
  const [loadedData, setLoadedData] = useState(false);
  const [error, setError] = useState();
  const [isRefreashing, setisRefreashing] = useState(false);

  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setError(null);
    // setLoadedData(true);
    setisRefreashing(true);
    try {
      await dispatch(OrderAction.fetchOrder());
    } catch (err) {
      setError(err.message);
    }
    //setLoadedData(false);
    setisRefreashing(false);
  }, [dispatch, setError, setisRefreashing]);

  useEffect(() => {
    const willfocusOrder = props.navigation.addListener(
      "willFocus",
      loadOrders
    );
    return () => {
      willfocusOrder.remove();
    };
  }, [loadOrders]);

  useEffect(() => {
    setLoadedData(true);
    loadOrders().then(() => {
      setLoadedData(false);
    });
  }, [loadOrders]);

  const Order_Data = useSelector((state) => state.orders.OrderData);
  const emptyImageUrl = useSelector((state) => state.cart.emptyImageUrl);

  if (error) {
    return (
      <View style={cstyle.errorscreen}>
        <Text style={cstyle.emptyTitle}>Error !</Text>
        <Text style={cstyle.emptydes} numberOfOccuredLines={1}>
          {error}!
        </Text>
        <Button
          title="Try Again!"
          onPress={loadOrders}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (loadedData) {
    return (
      <View style={cstyle.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (Order_Data.length === 0 || !Order_Data) {
    return (
      <View style={cstyle.emptyscreen}>
        <View style={cstyle.imageConatiner}>
          <Image style={cstyle.emptyImage} source={{ uri: emptyImageUrl }} />
        </View>
        <Text style={cstyle.emptyTitle}>No orders to track!</Text>
        <Text style={cstyle.emptydes} numberOfLines={1}>
          It's a good day to buys the items you might need later!
        </Text>
        <View style={cstyle.browse}>
          <Button
            color={Colors.primary}
            title="Browse Products"
            onPress={() => {
              props.navigation.navigate("ProductsOverview");
            }}
          />
        </View>
      </View>
    );
  }

  const renderOrder = (itemData) => {
    return (
      <OrderItem
        total_amount={itemData.item.total_amt}
        datee={itemData.item.readableDate}
        cartyItem={itemData.item.items}
        productDetailsProps={props.navigation}
      />
    );
  };
  return (
    <FlatList
      onRefresh={loadOrders}
      refreshing={loadedData}
      data={Order_Data}
      keyExtractor={(item) => item.id}
      renderItem={renderOrder}
    />
  );
};

OrderScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Orders",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CartButton}>
        <Item
          title="Cart"
          iconName="ios-cart"
          onPress={() => {
            navData.navigation.navigate("CartScreens");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CartButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const cstyle = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  emptyscreen: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",

    // justifyContent: "center",
  },
  errorscreen: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  browse: {
    marginTop: "6%",
  },
  emptyTitle: {
    fontFamily: "my-open-sans-bold",
    fontSize: 20,
  },
  emptydes: {
    fontFamily: "my-open-sans",
    fontSize: 14,
    color: "#888",
  },
  emptyImage: {
    width: "100%",
    height: "100%",
  },
  imageConatiner: {
    marginTop: Platform.OS === "ios" ? "40%" : "30%",
    width: "80%",
    height: Platform.OS === "ios" ? "30%" : "40%",
    // borderWidth: 1,
    //  borderTopLeftRadius: 10,
    //  borderTopRightRadius: 10,
    // overflow: "hidden",
  },
});
export default OrderScreen;
