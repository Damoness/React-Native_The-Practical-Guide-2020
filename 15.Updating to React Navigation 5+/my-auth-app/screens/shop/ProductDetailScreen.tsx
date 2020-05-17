import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import Product from "../../models/product";
import { addToCart } from "../../store/cart/actions";
import Colors from "../../constants/Colors";

import {StackScreenProps} from '@react-navigation/stack'
import { ProductsStackParamList } from "../../navigation/Navigator";

type Props = StackScreenProps<ProductsStackParamList,'ProductDetailScreen'>

const ProductDetailScreen = (props:Props) => {

  const product: Product = props.route.params.product;

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

ProductDetailScreen.navigationOptions = (props:Props) => {
  return {
    headerTitle: props.route.params.product.title
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
