import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import {Categories,CategoryMeals,MealDetail} from './Routers'
import Colors from '../constants/Colors';

console.log(Categories);


const MealsNavigator = createStackNavigator({
    [Categories]:CategoriesScreen,
    [CategoryMeals]:{
        screen:CategoryMealsScreen,
        navigationOptions:{ //优先级最高, 比在screen里面的navigationOptions还高
        }
    },
    [MealDetail]:MealDetailScreen,
},{
    defaultNavigationOptions:{ //默认的,优先级 最低
        headerStyle:{
            backgroundColor:Platform.OS == 'android'?Colors.primaryColor:"",
        },
        headerTintColor:Platform.OS == 'android'?'white':Colors.primaryColor
    }
})

export default createAppContainer(MealsNavigator);


