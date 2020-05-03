import React from "react";
import {FlatList} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import HeaderMenu from "../../components/HeaderMenu";
import {useSelector } from "react-redux";
import { AppState } from "../../store";
import OrderItem from "../../components/OrderItem";

const OrdersScreen: NavigationStackScreenComponent = () => {
  const orders = useSelector((state: AppState) => state.order.orders);

  console.log("OrdersScreen");

  return (
    <FlatList 
        data={orders}
        renderItem={({item,index})=><OrderItem order={item} />}
        keyExtractor={(item)=>item.id}
    />
  );
};

OrdersScreen.navigationOptions = (props) => {
  return {
    title: "Your Orders",
    headerLeft: () => <HeaderMenu />,
  };
};

export default OrdersScreen;
