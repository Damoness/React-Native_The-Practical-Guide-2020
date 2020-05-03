import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CartItem from "../models/cart-item";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

type Props = {
  item: CartItem;
  onDelete?: () => void;
};

const ProductRowItem: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <View style={styles.productContainer}>

        <View style={styles.rowCenter}>
            <Text style={styles.quantity} numberOfLines={1}>{`${item.quantity} `}</Text>
            <Text style={styles.mainText} >{` ${item.product.title} `}</Text>
        </View>
    
      <View style={styles.rowCenter}>
        <Text style={styles.mainText}>${(item.product.price * item.quantity).toFixed(2)}</Text>
        {onDelete && (
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Ionicons name={"ios-trash"} size={23} color={'red'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width:'100%',
    padding:10,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity:{
    fontFamily:'open-sans',
    color:'#888',
    fontSize:16
  },
  mainText:{
    fontFamily:'open-sans-bold',
    fontSize:20,
  },
  deleteButton:{
    marginLeft:20
  },

});

export default ProductRowItem;
