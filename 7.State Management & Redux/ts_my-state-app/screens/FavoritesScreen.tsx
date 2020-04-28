import React from "react";
import {Text,View,StyleSheet} from 'react-native'
import { NavigationStackScreenComponent } from "react-navigation-stack";
import MealList from "../components/MealList";
import HeaderMenu from "../components/HeaderMenu";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import DefaultText from "../components/DefaultText";

const FavoritesScreen: NavigationStackScreenComponent = (props) => {
  const favoritesMeals = useSelector(
    (state: RootState) => state.meal.favoriteMeals
  );

  if(favoritesMeals.length == 0 || !favoritesMeals){
      return(
          <View style={styles.container}>
              <DefaultText>No favorite meals found. Start adding some!</DefaultText>
          </View>
      )
  }

  return <MealList listData={favoritesMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (props) => {
  return {
    headerTitle: "My Favorites",
    headerLeft: () => <HeaderMenu />,
  };
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})


export default FavoritesScreen;
