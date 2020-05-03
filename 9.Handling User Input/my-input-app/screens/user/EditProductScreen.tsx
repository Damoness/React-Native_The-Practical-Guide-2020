import React, { useState, useEffect, useCallback,useReducer } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Product from "../../models/product";
import HeaderItem from "../../components/HeaderItem";
import { useDispatch } from "react-redux";
import { updateProduct, addProduct } from "../../store/product/actions";

type Params = {
  product?: Product;
  submit?: () => void;
};


type TestState={
  count:number,
  increment:number,
  decrement:number,
}



type TestAction ={
  type:'increment' | 'decrement'
}

const initialState:TestState = {
  count:0,
  increment:0,
  decrement:0,
}

function reducer(state:TestState,action:TestAction):TestState{

  switch(action.type){

    case 'increment':{
      return {
        ...state,
        count:state.count + 1,
        increment:state.increment + 1,
      };
    }
    case 'decrement':{
      return {
        ...state,
        count:state.count -1,
        decrement:state.decrement + 1,
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

  const [state, dispatch1] = useReducer(reducer, initialState);

  
  const [title, setTitle] = useState(product ? product.title : "");
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [price, setPrice] = useState(product ? product.price : 0);

  const submitHandler = useCallback(() => {
    const product = new Product(
      new Date().toString(),
      "u1",
      title,
      imageUrl,
      description,
      price
    );

    if (isEditing) {
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct(product));
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
        <Text>
          Count:{JSON.stringify(state)}
        </Text>
        <Button onPress={()=>{

          dispatch1({type:'increment'});

        }} title="+" />
        <Button onPress={()=>{

          dispatch1({type:'decrement'});
          

        }} title="-" />
        <Text style={styles.title}>Title</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.formControl}>
        <Text style={styles.title}>Image URL</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={imageUrl}
          onChangeText={setImageUrl}
        />
      </View>

      {!isEditing && (
        <View style={styles.formControl}>
          <Text style={styles.title}>Price</Text>
          <TextInput
            keyboardType='decimal-pad'
            style={styles.textInput}
            defaultValue={price == 0 ? "" : price.toString()}
            onChangeText={(text) => setPrice(parseFloat(text))}
          />
        </View>
      )}
      <View style={styles.formControl}>
        <Text style={styles.title}>Description</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={description}
          onChangeText={setDescription}
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
