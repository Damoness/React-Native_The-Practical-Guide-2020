import React,{useEffect,useState} from "react";
import {FlatList,View,ActivityIndicator,StyleSheet,Text} from "react-native";
import HeaderMenu from "../../components/UI/HeaderMenu";
import {useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store";
import OrderItem from "../../components/shop/OrderItem";
import { fetchOrders } from "../../store/order/actions";
import Colors from "../../constants/Colors";
import { OrderStackParamList } from "../../navigation/Navigator";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<OrderStackParamList,'OrdersScreen'>

const OrdersScreen = (props:Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing,setIsRefreshing] = useState(false);
  const orders = useSelector((state: AppState) => state.order.orders);
  const dispatch = useDispatch();
  console.log("OrdersScreen");


  const loadOrdersHandler = async ()=>{

      setIsRefreshing(true);

      await dispatch(fetchOrders());

      setIsRefreshing(false);

  }


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

  if(orders.length == 0){

    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text>No order found,maybe start ordering some products?</Text>
        </View>
    )
    
 }


  return (
    <FlatList 
        refreshing={isRefreshing}
        onRefresh={loadOrdersHandler}
        data={orders}
        renderItem={({item,index})=><OrderItem order={item} />}
        keyExtractor={(item)=>item.id}
    />
  );
};

OrdersScreen.navigationOptions = (props:Props) => {
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
