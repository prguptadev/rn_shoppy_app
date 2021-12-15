import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as CartActions from "../../store/actions/Cart";
import CartButton from "../../components/UI/CartButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.avaiableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View>
        <Image
          style={dstyle.image}
          source={{ uri: selectedProduct.imageUrl }}
        />
        <View style={dstyle.actions}>
          <Button
            color={Colors.primary}
            title="Add To Cart"
            onPress={() => {
              dispatch(CartActions.addToCart(selectedProduct));
            }}
          />
        </View>
        <Text style={dstyle.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={dstyle.descrip}>{selectedProduct.description}</Text>
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
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

export default ProductDetailScreen;

const dstyle = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 2,
  },
  descrip: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 15,
    fontFamily: "my-open-sans",
  },
  actions: {
    marginVertical: 15,
    alignItems: "center",
  },
});
