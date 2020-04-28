import React from "react";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import MealList from "../components/MealList";
import HeaderMenu from "../components/HeaderMenu";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";

const FavoritesScreen: NavigationStackScreenComponent = (props) => {
  const favoritesMeals = useSelector(
    (state: RootState) => state.meal.favoriteMeals
  );

  return <MealList listData={favoritesMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (props) => {
  return {
    headerTitle: "My Favorites",
    headerLeft: () => <HeaderMenu />,
  };
};

export default FavoritesScreen;
