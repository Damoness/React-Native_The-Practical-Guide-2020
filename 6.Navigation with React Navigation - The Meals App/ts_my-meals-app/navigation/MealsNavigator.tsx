import { createAppContainer, NavigationScreenConfig } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import FiltersScreen from '../screens/FiltersScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import {CATEGORIES,CATEGORY_MEALs,MEAL_DETAIL, FAVORITES} from './Routers'
import Colors from '../constants/Colors';
import {Platform, Text} from 'react-native'
import FavoritesScreen from '../screens/FavoritesScreen';
import React from 'react'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {Ionicons} from '@expo/vector-icons'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { StackHeaderOptions } from 'react-navigation-stack/lib/typescript/src/vendor/types';

const defaultStackNavigationOption:NavigationScreenConfig<StackHeaderOptions,{}> = {
    headerStyle:{
        backgroundColor:Platform.OS == 'android'?Colors.primaryColor:"",
    },
    headerTitleStyle:{
        fontFamily:'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor:Platform.OS == 'android'?'white':Colors.primaryColor,
    headerTitle: 'A Screen'
}

const MealsNavigator = createStackNavigator({
    [CATEGORIES]:CategoriesScreen,
    [CATEGORY_MEALs]:{
        screen:CategoryMealsScreen,
        navigationOptions:{ //优先级最高, 比在screen里面的navigationOptions还高
        }
    },
    [MEAL_DETAIL]:MealDetailScreen,
},{
    defaultNavigationOptions:defaultStackNavigationOption
})

const favoritesNavigator = createStackNavigator({
    [FAVORITES]:FavoritesScreen,
    [MEAL_DETAIL]:MealDetailScreen,
},{
    defaultNavigationOptions:defaultStackNavigationOption
})


const tabScreenConfig = {
    Meals:{
        screen:MealsNavigator,
        navigationOptions:{
            tabBarIcon:({tintColor})=>{
                return <Ionicons name="ios-restaurant" size={25} color={tintColor}/>
            }
            ,tabBarColor: Colors.primaryColor,
            tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
            ) : (
              'Meals'
            )
        }
    },
    Favorite:{
        screen:favoritesNavigator,
        navigationOptions:{
            tabBarIcon:({tintColor})=>{
                return <Ionicons name="ios-star" size={25} color={tintColor}/>
            }
            ,tabBarColor: Colors.accentColor,
            tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
            ) : (
              'Favorites'
            )
        }
    },
}

const MealsFavTabNavigator = Platform.OS == 'android'? 

 createMaterialBottomTabNavigator(tabScreenConfig,{
    activeColor: 'white',
    shifting: true,
    barStyle: {
      backgroundColor: Colors.primaryColor
    }
 })
: createBottomTabNavigator(tabScreenConfig,{
    tabBarOptions:{
        activeTintColor:Colors.accentColor,
        labelStyle:{
            fontFamily: 'open-sans'
        }
    }
})

const FiltersNavigator = createStackNavigator({
    Filters:FiltersScreen,
    
},{
    defaultNavigationOptions: defaultStackNavigationOption
})

const MainNavigator = createDrawerNavigator({
    MainTab:{
        screen:MealsFavTabNavigator,
        navigationOptions:{
            drawerLabel: 'Meals'
        }
    },
    Filters:FiltersNavigator,
},{
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
})

export default createAppContainer(MainNavigator);


