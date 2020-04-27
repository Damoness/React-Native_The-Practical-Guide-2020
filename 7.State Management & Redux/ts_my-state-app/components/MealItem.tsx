import React from 'react'
import { View,StyleSheet,TouchableOpacity, ImageBackground} from 'react-native'
import DefaultText from './DefaultText'

type Props = {
    title:string,
    duration:number,
    complexity:string,
    affordability:string,
    imageUrl:string,
    onSelectMeal:()=>void,
}

const MealItem:React.FC<Props> = (props) => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity 
                onPress={props.onSelectMeal}
            >
                <View >
                    <View style={[styles.mealRow,styles.mealHeader]}>
                        <ImageBackground 
                            style={styles.bgImage}
                            source={{uri:props.imageUrl}}
                        >
                            <View style={styles.titleContainer}>
                                <DefaultText style={styles.title} numberOfLines={1}>{props.title}</DefaultText>
                            </View>
                            
                        </ImageBackground>
                    </View>
                    <View style={[styles.mealRow,styles.mealDetail]}>
                        <DefaultText>{props.duration}</DefaultText>
                        <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                    </View>
                </View>
            </TouchableOpacity>

        </View>
      )
}

const styles = StyleSheet.create({

    mealItem:{
        width:'100%',
        height:200,
        backgroundColor:'#f5f5f5',
        borderRadius:10,
        overflow:'hidden'
    },
    mealRow:{
        flexDirection:'row',
    },
    mealHeader:{
        height:'85%',
    },
    mealDetail:{
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center',
        height:'15%'
    },
    bgImage:{
        flex: 1,
        justifyContent:'flex-end',
    },
    titleContainer:{
        backgroundColor:'rgba(0,0,0,0.5)',
        paddingVertical:5,
        paddingHorizontal:12,
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:20,
        color:'white',
        textAlign:'center'
    }

})


export default MealItem
