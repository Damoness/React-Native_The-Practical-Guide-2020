import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Order from "../../models/order";
import Card from "../UI/Card";
import ProductRowItem from "./ProductRowItem";
import Colors from "../../constants/Colors";

type Props = {
  order: Order;
};

const OrderItem: React.FC<Props> = ({ order }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <Card>
      <View style={styles.totalsContainer}>
        <Text style={styles.totalAmount}>${order.totals.toFixed(2)}</Text>
        <Text style={styles.date}>{order.readableDate}</Text>
      </View>
      <Button
        color={Colors.masterColor}
        title={showDetail?'Hide Details':"Show Details"}
        onPress={() => {
          setShowDetail((preState) => !preState);
        }}
      />
      {showDetail && (
        <View style={styles.productsContainer}>
          {order.items.map((item) => {
            return (
              <ProductRowItem
                key={item.quantity + item.product.id}
                item={item}
              />
            );
          })}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
  totalsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  productsContainer: {
    //marginVertical: 20,
    width:'100%'
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888'
  },
});

export default OrderItem;
