import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Product from "../../models/product";
import { addToCart } from "../../store/cart/actions";
import Colors from "../../constants/Colors";

const ProductDetailScreen: NavigationStackScreenComponent = (props) => {
  const product: Product = props.navigation.getParam("product");

  const { imageUrl, price, description } = product;

  const dispatch = useDispatch();

  return (
    <View style={{ alignItems: "center" }}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.actions}>
        <Button
          color={Colors.masterColor}
          title={"ADD TO CART"}
          onPress={() => {
            dispatch(addToCart(product));
          }}
        />
      </View>

      <Text style={styles.price}>{price}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (props) => {
  return {
    headerTitle: props.navigation.getParam("product").title,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
  },

  actions: {
    alignItems: "center",
    marginVertical:10,
  },

  price: {
    fontSize: 20,
    color: "#888",
    marginVertical: 20,
    fontFamily:'open-sans-bold',
  },

  description: {
    fontFamily:'open-sans',
    fontSize: 14,
    alignItems:'center',
    marginHorizontal:20,
  },
});

export default ProductDetailScreen;
