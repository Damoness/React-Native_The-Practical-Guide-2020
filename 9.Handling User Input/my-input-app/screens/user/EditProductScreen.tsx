import React, { useEffect, useCallback, useReducer } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Product from "../../models/product";
import HeaderItem from "../../components/HeaderItem";
import { useDispatch } from "react-redux";
import { updateProduct, addProduct } from "../../store/product/actions";

type Params = {
  product?: Product;
  submit?: () => void;
};

type TestState = {
  inputValues: {
    title: string;
    imageUrl: string;
    price: number;
    description: string;
  };
  inputValidities: {
    title: boolean;
    imageUrl: boolean;
    price: boolean;
    description: boolean;
  };
  formIsValid: boolean;
};

type TestAction = {
  type: "FORM_INPUT_UPDATE";
  data: {
    inputIdentifier: "title" | "imageUrl" | "price" | "description";
    inputValue: string;
    isValid: boolean;
  };
};

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

function formReducer(state: TestState, action: TestAction): TestState {
  switch (action.type) {
    case "FORM_INPUT_UPDATE": {
      const updatedInputValues = {
        ...state.inputValues,
        [action.data.inputIdentifier]: action.data.inputValue,
      };

      const updatedInputValidities = {
        ...state.inputValidities,
        [action.data.inputIdentifier]: action.data.isValid,
      };

      let updatedFormIsValid = true;

      for (const key in updatedInputValidities) {
        if (hasKey(updatedInputValidities, key)) {
          updatedFormIsValid =
            updatedFormIsValid && updatedInputValidities[key];
        }
      }

      return {
        inputValues: updatedInputValues,
        inputValidities: updatedInputValidities,
        formIsValid: updatedFormIsValid,
      };
    }

    default:
      throw new Error();
  }
}

const EditProductScreen: NavigationStackScreenComponent<Params> = (props) => {
  const product = props.navigation.getParam("product");

  const isEditing = !!product;

  const dispatch = useDispatch();

  const initialState: TestState = {
    inputValues: {
      title: product ? product.title : "",
      imageUrl: product ? product.imageUrl : "",
      price: product ? product.price : 0,
      description: product ? product.description : "",
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      description: product ? true : false,
      price: product ? true : false,
    },
    formIsValid: product ? true : false,
  };

  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  console.log(formState);

  const {
    inputValues: { title, imageUrl, description, price },
  } = formState;

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("表单数据有问题");
      return;
    }

    if (product) {
      dispatch(
        updateProduct(
          new Product(product.id, "u1", title, imageUrl, description, price)
        )
      );
    } else {
      dispatch(
        addProduct(
          new Product(
            new Date().toString(),
            "u1",
            title,
            imageUrl,
            description,
            price
          )
        )
      );
    }

    props.navigation.goBack();
  }, [dispatch, title, imageUrl, description, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });

    return () => {};
  }, [submitHandler]);

  return (
    <View style={styles.container}>
      <View style={styles.formControl}>
        <Text style={styles.title}>Title</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={title}
          onChangeText={(text) =>
            dispatchFormState({
              type: "FORM_INPUT_UPDATE",
              data: {
                inputIdentifier: "title",
                inputValue: text,
                isValid: text.length > 5,
              },
            })
          }
        />
      </View>

      <View style={styles.formControl}>
        <Text style={styles.title}>Image URL</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={imageUrl}
          onChangeText={(text) =>
            dispatchFormState({
              type: "FORM_INPUT_UPDATE",
              data: {
                inputIdentifier: "imageUrl",
                inputValue: text,
                isValid: true,
              },
            })
          }
        />
      </View>

      {!isEditing && (
        <View style={styles.formControl}>
          <Text style={styles.title}>Price</Text>
          <TextInput
            keyboardType="decimal-pad"
            style={styles.textInput}
            defaultValue={price == 0 ? "" : price.toString()}
            onChangeText={(text) =>
              dispatchFormState({
                type: "FORM_INPUT_UPDATE",
                data: {
                  inputIdentifier: "price",
                  inputValue: text,
                  isValid: true,
                },
              })
            }
          />
        </View>
      )}
      <View style={styles.formControl}>
        <Text style={styles.title}>Description</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={description}
          onChangeText={(text) =>
            dispatchFormState({
              type: "FORM_INPUT_UPDATE",
              data: {
                inputIdentifier: "description",
                inputValue: text,
                isValid: true,
              },
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },

  formControl: {
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  textInput: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

EditProductScreen.navigationOptions = (props) => {
  const product = props.navigation.getParam("product");
  const isEditing = !!product;

  const voidFunction = () => {};

  return {
    title: isEditing ? "Edit Product" : "Add Product",
    headerRight: () => (
      <HeaderItem
        iconName="ios-checkmark"
        onPress={props.navigation.getParam("submit") || voidFunction}
      />
    ),
  };
};

export default EditProductScreen;
