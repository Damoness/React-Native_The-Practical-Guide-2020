import React from 'react'
import { View, Text ,StyleSheet,Image, Button,TouchableOpacity} from 'react-native'
import Card from '../UI/Card'
import Colors from '../../constants/Colors'


type Props = {
    imageUrl:string,
    title:string,
    price:number,

    onPress?:()=>void,
    onPressDetails?:()=>void,
    onPressToCart?:()=>void,
    onPressEdit?:()=>void,
    onPressDelete?:()=>void,
}

const ProductItem:React.SFC<Props> = ({imageUrl,title,price,onPress,onPressDetails,onPressToCart,onPressEdit,onPressDelete}) => {

    return (
        <Card style={styles.container}>
            <TouchableOpacity style={styles.content} onPress={onPress} activeOpacity={0.8}>

                <Image source={{uri:imageUrl}} style={styles.image} />

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>{price}</Text>

                <View style={styles.buttonContainer}>
                    {onPressDetails &&
                        <Button color={Colors.masterColor} title={'VIEW DETAILS'} onPress={onPressDetails}/>
                    }
                    {
                    onPressToCart&&
                        <Button color={Colors.masterColor} title={'TO CART'} onPress={onPressToCart}/>
                    }
                    {
                    onPressEdit&&
                        <Button color={Colors.masterColor} title={'EDIT'} onPress={onPressEdit}/>
                    } 
                                        {
                    onPressDelete&&
                        <Button color={Colors.masterColor} title={'DELETE'} onPress={onPressDelete}/>
                    }                     
                </View>
            </TouchableOpacity>
        </Card>
    )
}

const styles = StyleSheet.create({
    container:{
        margin:20,
        backgroundColor:'white',
    },
    content:{
        borderRadius:10,
        //backgroundColor:'red',
        overflow:'hidden',
        width:'100%',
        alignItems:'center', 
    },
    image:{
        width:'100%',
        aspectRatio:16/9
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:18,
        marginVertical:4,
    },
    price:{
        fontFamily:'open-sans',
        fontSize:14,
        color:'#888'
    },
    buttonContainer:{
        alignSelf:'stretch',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
        marginVertical:10,
    }
})


export default ProductItem
