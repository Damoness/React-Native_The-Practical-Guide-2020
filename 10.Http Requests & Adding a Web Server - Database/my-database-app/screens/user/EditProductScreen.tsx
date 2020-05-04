import React, { useEffect, useCallback, useReducer } from "react";
import { View, StyleSheet, Alert, KeyboardAvoidingView,Platform,ScrollView} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Product from "../../models/product";
import HeaderItem from "../../components/UI/HeaderItem";
import { useDispatch } from "react-redux";
import { updateProduct, addProduct } from "../../store/product/actions";
import Input from "../../components/UI/Input";

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
    console.log(formState);

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
            title,
            imageUrl,
            price,
            description,
        )
      );
    }

    props.navigation.goBack();
  }, [dispatch, title, imageUrl, description, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });

    return () => {};
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: "FORM_INPUT_UPDATE",
        data: {
          inputIdentifier: inputIdentifier,
          inputValue: inputValue,
          isValid: inputValidity,
        },
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : undefined}
      keyboardVerticalOffset={100}
      style={{flex:1}}
    >
      <ScrollView onLayout={(event)=>{
        console.log(event.nativeEvent.layout)
      }}>
        <View style={styles.container}>
          <Input
            id={"title"}
            label={"Title"}
            errorText="Please enter a valid title!"
            initialValue={title}
            initiallyValid={true}
            onInputChange={inputChangeHandler}
            required
            minLength={5}
          />
          <Input
            label={"Image URL"}
            id={"imageUrl"}
            errorText="Please enter a valid image url!"
            initialValue={imageUrl}
            initiallyValid={true}
            onInputChange={inputChangeHandler}
            required
          />
          {!isEditing && (
            <Input
              id={"price"}
              label={"Price"}
              errorText="Please enter a valid price!"
              initiallyValid={true}
              initialValue={price == 0 ? "" : price.toString()}
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id={"description"}
            label={"Description"}
            errorText="Please enter a valid description!"
            initialValue={description}
            initiallyValid={true}
            onInputChange={inputChangeHandler}
            required
            minLength={10}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
