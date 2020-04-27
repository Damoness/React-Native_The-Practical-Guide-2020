import React from 'react';
import { Text, TouchableOpacity ,StyleSheet,View,Platform,TouchableNativeFeedback} from 'react-native';
import { CATEGORY_MEALs } from '../navigation/Routers';

import Category from '../models/category';

import { withNavigation} from 'react-navigation';
import {NavigationStackProp} from 'react-navigation-stack'


type Props={
    item:Category,
    index:number,
    navigation:NavigationStackProp,
}

class CategoryGridTitle extends React.Component<Props> {

    render() {


        let TouchableCmp:any = TouchableOpacity;

        if(Platform.OS == 'android' && Platform.Version >=22){
            TouchableCmp = TouchableNativeFeedback;
        }

        const { item, index, navigation } = this.props;

        return (
            <View style={styles.gridItem}>
                <TouchableCmp  style={{flex:1}} onPress={() => {
                     navigation && navigation.push(CATEGORY_MEALs, { categoryId: item.id });
                }}>
                    <View style={[styles.container,{backgroundColor:item.color}]}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
            
                </TouchableCmp>
            </View>
        );
    }
}

export default withNavigation(CategoryGridTitle);


const styles = StyleSheet.create({
    gridItem:{
        flex:1,
        margin:15,
        height:150,
        borderRadius:10,
        overflow:Platform.OS == 'android' && Platform.Version >=21 ? 'hidden':'visible',
        elevation:3,
    },
    container:{
        flex:1,
        borderRadius:10,
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
  
        padding:10,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:22,
        textAlign:'right'
    }
})


