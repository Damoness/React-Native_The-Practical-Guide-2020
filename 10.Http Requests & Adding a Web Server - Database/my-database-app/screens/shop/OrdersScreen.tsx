import React,{useEffect,useState} from "react";
import {FlatList,View,ActivityIndicator,StyleSheet} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import HeaderMenu from "../../components/UI/HeaderMenu";
import {useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store";
import OrderItem from "../../components/shop/OrderItem";
import { fetchOrders } from "../../store/order/actions";
import Colors from "../../constants/Colors";

const OrdersScreen: NavigationStackScreenComponent = () => {

  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state: AppState) => state.order.orders);
  const dispatch = useDispatch();
  console.log("OrdersScreen");

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchOrders()).then(()=>{
      setIsLoading(false);
    });

  }, [dispatch])


  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.masterColor} />
      </View>
    );
  }


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


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OrdersScreen;
