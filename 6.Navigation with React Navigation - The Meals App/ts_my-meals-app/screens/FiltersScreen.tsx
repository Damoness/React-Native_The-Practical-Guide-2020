import React, { useState ,useEffect,useCallback} from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import HeaderMenu from "../components/HeaderMenu";
import HeaderButton from "../components/HeaderButton";
import { Switch } from "react-native-paper";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "react-navigation-drawer";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor, false: "white" }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen: NavigationStackScreenComponent = (props) => {

  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);


  // const saveFilters = useCallback(() => {
  //   const appliedFilters = {
  //     glutenFree: isGlutenFree,
  //     lactoseFree: isLactoseFree,
  //     vegan: isVegan,
  //     isVegetarian: isVegetarian
  //   };

  //   console.log(appliedFilters);
  // }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  // useEffect(() => {
  //   navigation.setParams({ save: saveFilters });
  // }, [saveFilters]);


  const saveFilters = useCallback(()=>{
    const appliedFilters = {
      glutenFree :isGlutenFree,
      lactoseFree:isLactoseFree,
      vegan:isVegan,
      isVegetarian:isVegetarian,
    }

    console.log(appliedFilters);
  },[isGlutenFree,isLactoseFree,isVegan,isVegetarian])

  useEffect(() => {
    
    navigation.setParams({save:saveFilters});

  },[saveFilters])



  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={(newValue) => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

FiltersScreen.navigationOptions = (props) => {
  return {
    headerTitle: "My Favorites",
    headerLeft: () => <HeaderMenu />,
    headerRight:()=>{
        return (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName="ios-save"
                    onPress={props.navigation.getParam('save')}
                />
            </HeaderButtons>
        )
    }
  };
};

export default FiltersScreen;
