import React from 'react'
import { View, Text,StyleSheet, FlatList, Alert } from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack'
import HeaderMenu from '../../components/HeaderMenu'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../store'
import ProductItem from '../../components/ProductItem'
import { deleteProduct } from '../../store/product/actions'
import HeaderItem from '../../components/HeaderItem'

const UserProductsScreen:NavigationStackScreenComponent = (props) => {

    const products = useSelector((state:AppState) => state.product.userProducts);
    const dispatch = useDispatch();

    const deleteHandler = (id:string) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
          { text: 'No', style: 'default' },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () => {
                dispatch(deleteProduct(id))
            }
          }
        ]);
     };

    return (
        <View style={styles.container}>
           <FlatList 
            data={products}
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

UserProductsScreen.navigationOptions = (props)=>{

    return {
        title:"Your Products",
        headerLeft:()=><HeaderMenu/>,
        headerRight:()=><HeaderItem iconName="ios-create" onPress={()=>{
            props.navigation.push('EditProductScreen')
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
