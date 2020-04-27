import React from 'react'
import {StyleSheet,FlatList,Platform,Text} from 'react-native'
import { CATEGORIES } from '../data/dummy-data'
import Colors from '../constants/Colors'
import CategoryGridTitle from '../components/CategoryGridTitle'


const CategoriesScreen = (props) => {

    return (
        <FlatList
            numColumns={2}
            data={CATEGORIES}
            renderItem={(info)=><CategoryGridTitle {...info} />}
        />
    )
}

CategoriesScreen.navigationOptions = {
    headerTitle:"Meal Categories",
    headerStyle:{
        backgroundColor:Platform.OS == 'android'?Colors.primaryColor:"",
    },
    headerTintColor:Platform.OS == 'android'?'white':Colors.primaryColor
}

const styles = StyleSheet.create({
})


export default CategoriesScreen
