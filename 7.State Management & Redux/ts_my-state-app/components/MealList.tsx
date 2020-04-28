import React from "react";
import { View, Text, StyleSheet, FlatList, ListRenderItem } from "react-native";
import Meal from "../models/meal";
import MealItem from "./MealItem";
import { MEAL_DETAIL } from "../navigation/Routers";
import { NavigationStackProp } from "react-navigation-stack";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type Props = {
  listData: Array<Meal>;
  navigation: NavigationStackProp;
};

const MealList: React.FC<Props> = (props) => {

  const favoriteMeals = useSelector((state:RootState) => state.meal.favoriteMeals);

  const renderMealItem: ListRenderItem<Meal> = ({ item, index }) => {

    const isFav = favoriteMeals.some(meal =>meal.id == item.id);

    return (
      <MealItem
        {...item}
        onSelectMeal={() => {
          props.navigation.navigate(MEAL_DETAIL, { mealId: item.id ,mealTitle:item.title,isFav:isFav});
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        data={props.listData}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },
});

export default MealList;
