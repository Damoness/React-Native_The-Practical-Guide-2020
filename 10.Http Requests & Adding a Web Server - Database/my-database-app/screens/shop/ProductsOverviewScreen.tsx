import React,{useEffect} from 'react'
import { View,StyleSheet,FlatList} from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import {NavigationStackScreenComponent} from 'react-navigation-stack'
import { useSelector, useDispatch } from 'react-redux'
import {AppState} from '../../store'
import HeaderMenu from '../../components/UI/HeaderMenu'
import { addToCart } from '../../store/cart/actions'
import HeaderItem from '../../components/UI/HeaderItem'
import { fetchProducts } from '../../store/product/actions'

const ProductsOverviewScreen:NavigationStackScreenComponent= (props) => {


    const products = useSelector((state:AppState) => state.product.availableProducts);
    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(fetchProducts());

    },[dispatch])

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
