import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartButton from "../../components/UI/CartButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as ProductAction from "../../store/actions/Product";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state, action) => {
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

const EditProductScreen = (props) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const productId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormSate] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      price: editedProduct ? editedProduct.price.toFixed(2) : "",
      description: editedProduct ? editedProduct.description : "",
    },
    inputValidites: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      return Alert.alert("Oops!!", error, [{ text: "OKAY!" }]);
    }
  }, [error]);

  // const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  // const [titleIsValid, setTitleIsValid] = useState(false);
  // const [imageUrl, setImageUrl] = useState(
  //   editedProduct ? editedProduct.imageUrl : ""
  // );

  // const [price, setPrice] = useState(
  //   editedProduct ? editedProduct.price.toFixed(2) : ""
  // );
  // const [description, setDescription] = useState(
  //   editedProduct ? editedProduct.description : ""
  // );

  const submitHandler = useCallback(async () => {
    //console.log("Submitting");
    //price// for now I am removing price because of toFixed issue may be later will add it
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Please check the errors in the form", [
        { text: "OKAY", style: "destructive" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          ProductAction.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      } else {
        await dispatch(
          ProductAction.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputvalue, inputValidity) => {
      dispatchFormSate({
        type: FORM_INPUT_UPDATE,
        value: inputvalue,
        IsValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormSate]
  );

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      // style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            KeyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            //onInputChange={inputChangeHandler.bind(this, "title")}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            KeyboardType="default"
            returnKeyType="next"
            //onInputChange={inputChangeHandler.bind(this, "imageUrl")}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="price"
            label="price"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            // onInputChange={inputChangeHandler.bind(this, "price")}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.price.toFixed(2) : ""}
            initiallyValid={!!editedProduct}
            required
            min={0.1}
            max={999}
          />
          <Input
            id="description"
            label="description"
            errorText="Please enter a valid description!"
            KeyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            returnKeyType="done"
            //onInputChange={inputChangeHandler.bind(this, "description")}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
          {/* <View style={styles.formControl}>
          <Text style={styles.label}>Title :</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            // onChangeText={titleHandler}
            onChangeText={textChangeHandler.bind(this, "title")}
            returnKeyType="next"
            onEndEditing={() => {
              console.log("onEndEditing");
            }}
          />
          {!formState.inputValidites.title && (
            <Text style={{ color: "red" }}>Please enter Valid Title</Text>
          )}
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>ImageURL :</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            // onChangeText={(text) => setImageUrl(text)}
            onChangeText={textChangeHandler.bind(this, "imageUrl")}
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
            value={formState.inputValues.price}
            // onChangeText={(text) => setPrice(text)}
            onChangeText={textChangeHandler.bind(this, "price")}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Description :</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            // onChangeText={(text) => setDescription(text)}
            onChangeText={textChangeHandler.bind(this, "description")}
            returnKeyType="done"
          />
        </View> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  form: {
    margin: 20,
  },
  // formControl: {
  //   width: "100%",
  // },
  // label: {
  //   fontFamily: "my-open-sans-bold",
  //   marginVertical: 8,
  // },
  // input: {
  //   paddingHorizontal: 2,
  //   paddingVertical: 5,
  //   borderBottomColor: "#ccc",
  //   borderBottomWidth: 1,
  // },
});
export default EditProductScreen;
