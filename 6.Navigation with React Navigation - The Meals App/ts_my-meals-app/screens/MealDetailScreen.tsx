import React from "react";
import { View, Text, Button, StyleSheet ,Image} from "react-native";
import {NavigationStackScreenComponent} from 'react-navigation-stack'
import { MEALS } from "../data/dummy-data";
import { HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import HeaderMenu from "../components/HeaderMenu";
import { ScrollView } from "react-native-gesture-handler";
import DefaultText from "../components/DefaultText";

type Params = { mealId: string };

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen:NavigationStackScreenComponent<Params> = (props) => {


  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = MEALS.find(meal=> meal.id === mealId);


  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (props)=>{

  const mealId = props.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal=> meal.id === mealId);


  return {
    headerTitle:selectedMeal.title,
    headerRight: ()=> {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Favorite" iconName="ios-star" onPress={() => alert('search')} />
        </HeaderButtons>
      )
    }
  }
}


const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;
