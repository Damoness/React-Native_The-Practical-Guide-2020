import React from "react";
import { StyleSheet, FlatList, Platform, Text, Button } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";
import CategoryGridTitle from "../components/CategoryGridTitle";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import HeaderMenu from "../components/HeaderMenu";

type Props = {};

const CategoriesScreen: NavigationStackScreenComponent = (props) => {
  return (
    <FlatList
      numColumns={2}
      data={CATEGORIES}
      renderItem={(info) => <CategoryGridTitle {...info} />}
    />
  );
};

CategoriesScreen.navigationOptions = (props) => ({
  headerTitle: "Meal Categories",
  headerStyle: {
    backgroundColor: Platform.OS == "android" ? Colors.primaryColor : "",
  },
  headerTintColor: Platform.OS == "android" ? "white" : Colors.primaryColor,
  headerLeft: () => <HeaderMenu />,
});

export default CategoriesScreen;
