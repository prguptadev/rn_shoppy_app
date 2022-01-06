import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as CartActions from "../../store/actions/Cart";
import * as ProductAction from "../../store/actions/Product";
import CartButton from "../../components/UI/CartButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = (props) => {
  const [loadedData, setLoadedData] = useState(false);
  const [isRefreashing, setisRefreashing] = useState(false);

  const [error, setError] = useState();

  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    //console.log("loada data");
    setError(null);
    // setLoadedData(true);
    setisRefreashing(true);
    try {
      await dispatch(ProductAction.fetchProduct());
    } catch (err) {
      setError(err.message);
    }

    // setLoadedData(false);
    setisRefreashing(false);
  }, [dispatch, setError, setisRefreashing]);

  // useEffect(() => {
  //   const willFocusSub = props.navigation.addListener(
  //     "willFocus",
  //     loadProducts
  //   );
  //   return () => {
  //     willFocusSub.remove();
  //   };
  // }, [loadProducts]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadProducts);
    return () => {
      unsubscribe();
    };
  }, [loadProducts]);

  useEffect(() => {
    setLoadedData(true);
    loadProducts().then(() => {
      setLoadedData(false);
    });
  }, [loadProducts, setLoadedData]);

  const products = useSelector((state) => state.products.avaiableProducts);
  // console.log("=====================================");
  //console.log(products);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={pstyle.emptyscreen}>
        <Text style={pstyle.emptyTitle}>Error !</Text>
        <Text style={pstyle.emptydes} numberOfOccuredLines={1}>
          {error}!
        </Text>
        <Button
          title="Try Again!"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (loadedData) {
    return (
      <View style={pstyle.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!loadedData && products.length === 0) {
    return (
      <View style={pstyle.emptyscreen}>
        <Text style={pstyle.emptyTitle}>Check your internet!</Text>
        <Text style={pstyle.emptydes} numberOfLines={1}>
          It's a good day to buy the items you might need later!
        </Text>
      </View>
    );
  }

  const renderProduct = (itemData) => {
    return (
      <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={() => {
          selectItemHandler(itemData.item.id, itemData.item.title);
        }}
      >
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        />
        <Button
          color={Colors.accent}
          title="Add To Cart"
          onPress={() => {
            dispatch(CartActions.addToCart(itemData.item));
          }}
        />
      </ProductItem>
    );
  };

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={loadedData}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={renderProduct}
    />
  );
};

// now need to change for navigation 5 and 6

// ProductsOverviewScreen.navigationOptions = (navData) => {
//   return {
//     headerTitle: "All Products",
//     headerRight: () => (
//       <HeaderButtons HeaderButtonComponent={CartButton}>
//         <Item
//           title="Cart"
//           iconName="ios-cart"
//           onPress={() => {
//             navData.navigation.navigate("CartScreens");
//           }}
//         />
//       </HeaderButtons>
//     ),
//     headerLeft: () => (
//       <HeaderButtons HeaderButtonComponent={CartButton}>
//         <Item
//           title="Menu"
//           iconName="ios-menu"
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//     ),
//   };
// };

export const screenOptions = (navData) => {
  return {
    headerTitle: "All Products",
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

export default ProductsOverviewScreen;

const pstyle = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyscreen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
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
});
