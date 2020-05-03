import React from "react";
import { View, Text, Button, StyleSheet, ScrollView, ColorPropType } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store";
import { deleteFromCart} from "../../store/cart/actions";
import { addOrder } from "../../store/order/actions";
import ProductRowItem from "../../components/shop/ProductRowItem";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";


const CartScreen = () => {
  const cart = useSelector((state: AppState) => state.cart);
  const dispatch = useDispatch();

  const { items, totals } = cart;
  return (
    <View style={styles.container}>
      <Card style={styles.totalContainer}>
        <Text style={styles.total}>
          Total: 
          <Text style={styles.amount}> ${totals.toFixed(2)}</Text>
        </Text>
        <Button
          title={"ORDER NOW"}
          color={Colors.accentColor}
          disabled={cart.totals == 0}
          onPress={() => {
            dispatch(addOrder(cart));
          }}
        />
      </Card>
      <ScrollView style={styles.productsContainer}>
        {items.map((item) => {
          return (
            <ProductRowItem
              key={item.quantity + item.product.id}
              item={item}
              onDelete={() => {
                dispatch(deleteFromCart(item.product.id));
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //margin: 0,
  },
  totalContainer: {
    borderRadius:6,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal:10
  },
  total:{
    fontSize:20,
    fontFamily:'open-sans-bold',
  },
  amount:{
      fontSize:20,
      fontFamily:'open-sans-bold',
      color:Colors.masterColor
  },
  productsContainer: {
    marginHorizontal:20,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CartScreen;
