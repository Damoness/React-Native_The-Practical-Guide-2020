import React,{useEffect} from "react";
import { View, Text, Button, StyleSheet ,Image,} from "react-native";
import {NavigationStackScreenComponent} from 'react-navigation-stack'
import { HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import { ScrollView } from "react-native-gesture-handler";
import DefaultText from "../components/DefaultText";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleFavorite } from "../store/meal/actions";

type Params = { 
  mealId: string 
  mealTitle?:string,
  isFav:boolean,
  dispatch:any,
};

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen:NavigationStackScreenComponent<Params> = (props) => {


  const mealId = props.navigation.getParam('mealId');

  const meals = useSelector((state:RootState)=>state.meal.meals);

  const currentMealIsFavorite = useSelector((state:RootState)=>state.meal.favoriteMeals.some(meal=>meal.id == mealId));

  const selectedMeal = meals.find(meal=> meal.id === mealId);

  const dispatch = useDispatch();

  useEffect(()=>{

    props.navigation.setParams({isFav:currentMealIsFavorite});

  },[currentMealIsFavorite])


  useEffect(() => {

    props.navigation.setParams({dispatch:()=>dispatch(toggleFavorite(mealId))});

    return () => {
      
    }
  }, [selectedMeal])

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

  const mealTitle = props.navigation.getParam('mealTitle');

  const isFav = props.navigation.getParam('isFav');

  return {
    headerTitle:mealTitle,
    headerRight: ()=> {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Favorite" iconName={isFav?"ios-star":"ios-star-outline"} onPress={props.navigation.getParam('dispatch')} />
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
