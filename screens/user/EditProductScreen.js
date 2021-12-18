import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartButton from "../../components/UI/CartButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as ProductAction from "../../store/actions/Product";

const formReducer = (state, action) => {};

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );

  const [price, setPrice] = useState(
    editedProduct ? editedProduct.price.toFixed(2) : ""
  );
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    console.log("Submitting");
    //price// for now I am removing price because of toFixed issue may be later will add it
    if (!titleIsValid) {
      Alert.alert("Wrong Input!", "Please check the errors in the form", [
        { text: "OKAY", style: "destructive" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        ProductAction.updateProduct(
          productId,
          title,
          description,
          imageUrl,
          +price
        )
      );
    } else {
      dispatch(
        ProductAction.createProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, title, description, imageUrl, price, titleIsValid]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const titleHandler = (text) => {
    if (text.trim().length === 0) {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
    }
    setTitle(text);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title :</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleHandler}
            returnKeyType="next"
            onEndEditing={() => {
              console.log("onEndEditing");
            }}
          />
          {!titleIsValid && (
            <Text style={{ color: "red" }}>Please enter Valid Title</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>ImageURL :</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onSubmitEditing={() => {
              console.log("onSubmitEditing");
            }}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Price :</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={(text) => setPrice(text)}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Description :</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
            returnKeyType="done"
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CartButton}>
        <Item title="save" iconName="ios-checkmark" onPress={submitFn} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "my-open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
export default EditProductScreen;
