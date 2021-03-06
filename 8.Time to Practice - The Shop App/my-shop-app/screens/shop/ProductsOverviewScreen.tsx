import React from 'react'
import { View,StyleSheet, FlatList,Text} from 'react-native'
import ProductItem from '../../components/ProductItem'
import {NavigationStackScreenComponent} from 'react-navigation-stack'
import { useSelector, useDispatch } from 'react-redux'
import {AppState} from '../../store'
import HeaderMenu from '../../components/HeaderMenu'
import { addToCart } from '../../store/cart/actions'
import HeaderItem from '../../components/HeaderItem'

const ProductsOverviewScreen:NavigationStackScreenComponent= (props) => {


    const products = useSelector((state:AppState) => state.product.availableProducts);
    const dispatch = useDispatch();

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
                        onPressDetails={()=>{
                            props.navigation.push('ProductDetailScreen',{product:item})
                        }}
                        onPressToCart={()=>{

                            dispatch(addToCart(item));
                        }}
                    />
                )
            }}
           />
        </View>
    )
}

ProductsOverviewScreen.navigationOptions = (props)=>{

    return {
        title:'All Products',
        headerLeft:()=><HeaderMenu />,
        headerRight:()=><HeaderItem iconName="ios-cart"  onPress={()=>{

            props.navigation.push('CartScreen');

        }}/>
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})


export default ProductsOverviewScreen
