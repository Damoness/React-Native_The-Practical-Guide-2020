import React from "react";
import { CATEGORIES } from "../data/dummy-data";
import {
  NavigationStackScreenProps,
  NavigationStackOptions,
  NavigationStackScreenComponent,
} from "react-navigation-stack";
import MealList from "../components/MealList";

import { useSelector } from "react-redux";
import { RootState } from "../store/index";

type Params = { categoryId: string };
type ScreenProps = { language: string };

//type Props = NavigationStackScreenProps<Params, ScreenProps>

const CategoryMealsScreen: NavigationStackScreenComponent<
  Params,
  ScreenProps
> = (props) => {
  const catId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector(
    (state: RootState) => state.meal.filteredMeals
  );

  const displayMeals = availableMeals.filter((meal) => {
    return meal.categoryIds.indexOf(catId) >= 0;
  });

  return <MealList listData={displayMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (props) => {
  const catId = props.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id == catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;
