import React,{useEffect,useState, useCallback} from 'react'
import { View,StyleSheet,FlatList,ActivityIndicator,Text, Button} from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import {NavigationStackScreenComponent} from 'react-navigation-stack'
import { useSelector, useDispatch } from 'react-redux'
import {AppState} from '../../store'
import HeaderMenu from '../../components/UI/HeaderMenu'
import { addToCart } from '../../store/cart/actions'
import HeaderItem from '../../components/UI/HeaderItem'
import { fetchProducts } from '../../store/product/actions'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen:NavigationStackScreenComponent= (props) => {


    const products = useSelector((state:AppState) => state.product.availableProducts);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState(null);

    
    const loadProducts = useCallback (async ()=>{

        setError(null);
        setIsRefreshing(true);

        try {

            await dispatch(fetchProducts())
            
        } catch (error) {
            
            setError(error);

        }finally{

            setIsRefreshing(false);

        }

    },[dispatch])
    

    useEffect(()=>{

         const willFocusSub =  props.navigation.addListener('willFocus',loadProducts);

         return ()=>{
            willFocusSub.remove();
         }

    },[loadProducts])

    useEffect(() => {

        setIsLoading(true);
        loadProducts().then(() => {
          setIsLoading(false);
        });

    },[dispatch,loadProducts])


    if(error){
        return <View style={styles.centered}>
            <Text>A error occurred!</Text>
            <Button title={'Try Again'} color={Colors.masterColor} onPress={loadProducts} />
        </View>
    }


    if(isLoading){
        return <View style={styles.centered}>
            <ActivityIndicator size={'large'} color={Colors.masterColor}/>
        </View>
    }


    if(!isLoading && products.length == 0){
        return <View style={styles.centered}>
            <Text>No products found. Maybe start adding some!</Text>
        </View>
    }

    return (
        <View style={styles.container}>
           <FlatList
            style={{flex:1}}
            automaticallyAdjustContentInsets={false}
            refreshing={isRefreshing}
            onRefresh={loadProducts}
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
    },
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})


export default ProductsOverviewScreen
