import React from 'react'
import { View, Text,StyleSheet, FlatList, Alert } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import HeaderMenu from '../../components/UI/HeaderMenu'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../store'
import ProductItem from '../../components/shop/ProductItem'
import { deleteProduct } from '../../store/product/actions'
import HeaderItem from '../../components/UI/HeaderItem'

import { AdminStackParamList } from "../../navigation/Navigator";
import { StackScreenProps } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons'

type Props = StackScreenProps<AdminStackParamList,'UserProductsScreen'>

const UserProductsScreen = (props:Props) => {

    const userProducts = useSelector((state:AppState) => state.product.userProducts);
    const dispatch = useDispatch();

    const deleteHandler = (id:string) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
          { text: 'No', style: 'default' },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: async () => {

                try {

                   await dispatch(deleteProduct(id))
                    
                } catch (error) {
                    
                    Alert.alert(error.message)

                }

                
            }
          }
        ]);
     };

     if(userProducts.length == 0){

        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text>No product found,maybe start creating some ?</Text>
            </View>
        )

     }

    return (
        <View style={styles.container}>
           <FlatList
            data={userProducts}
            renderItem={({item,index})=>{
                return (
                    <ProductItem 
                        {...item}
                        onPress={()=>{
                            props.navigation.push('ProductDetailScreen',{product:item})
                        }}
                        onPressEdit={()=>{
                            props.navigation.push('EditProductScreen',{product:item})
                        }}
                        onPressDelete={()=>deleteHandler(item.id)}
                    />
                )
            }}
           />
        </View>
    )
}

UserProductsScreen.navigationOptions = (props:Props)=>{

    return {
        title:"Your Products",
        headerLeft:()=><HeaderMenu/>,
        headerRight:()=><HeaderItem iconName="ios-create" onPress={()=>{
            props.navigation.push('EditProductScreen',{})
        }} />
    }

}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }
})


export default UserProductsScreen
