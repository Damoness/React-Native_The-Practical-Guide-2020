import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { MealDetail} from "../navigation/Routers";
import { CATEGORIES } from "../data/dummy-data";

const CategoryMealsScreen = (props) => {

   const catId =  props.navigation.getParam('categoryId')
   const  selectedCategory = CATEGORIES.find(cat=>cat.id == catId);

  return (
    <View style={styles.container}>
      <Text>CategoryMealsScreen</Text>
      <Text>{selectedCategory.title}</Text>
      <Button
        title={"go to meal detail"}
        onPress={() => {
          props.navigation.replace(MealDetail);
        }}
      />
      <Button
        title={"go back"}
        onPress={() => {
          props.navigation.pop();
        }}
      />
    </View>
  );
};

CategoryMealsScreen.navigationOptions = props =>{

 
    const catId =  props.navigation.getParam('categoryId')
    const  selectedCategory = CATEGORIES.find(cat=>cat.id == catId);

    return {
        headerTitle:selectedCategory.title,
        headerStyle:{
            backgroundColor:'blue',
        },
    }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealsScreen;
