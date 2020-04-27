import React from 'react'
import {NavigationStackScreenComponent} from 'react-navigation-stack'
import { MEALS } from '../data/dummy-data'
import MealList from '../components/MealList'
import HeaderMenu from '../components/HeaderMenu'


const FavoritesScreen:NavigationStackScreenComponent = (props) => {

    const favoritesMeals = MEALS.filter(meal=>meal.id == 'm1' || meal.id == 'm2' );

    return (
        <MealList listData={favoritesMeals} navigation={props.navigation}/>
    )
}


FavoritesScreen.navigationOptions = (props)=>{

    return{
        headerTitle:'My Favorites',
        headerLeft: ()=><HeaderMenu  />,
    }

}
  

export default FavoritesScreen
