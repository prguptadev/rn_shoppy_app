import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CartButton from "../../components/UI/CartButton";
import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = (props) => {
  const Order_Data = useSelector((state) => state.orders.OrderData);
  const renderOrder = (itemData) => {
    return (
      <OrderItem
        total_amount={itemData.item.total_amt}
        datee={itemData.item.readableDate}
        cartyItem={itemData.item.items}
      />
    );
  };
  return (
    <FlatList
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

export default OrderScreen;
