import React,{useEffect} from "react";
import { View, Text, FlatList} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import HeaderItem from "../components/HeaderItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import PlaceItem from "../components/PlaceItem";
import { loadPlaces } from "../store/actions/place";


const PlacesListScreen: NavigationStackScreenComponent = (props) => {

  const places = useSelector((state: RootState) => state.place.places);

  const dispatch =  useDispatch();

  useEffect(() => {
    
      dispatch(loadPlaces());

      return () => {

      }
  }, [])

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item,index}) => (
        <PlaceItem
          image={item.imageUrl}
          title={item.title}
          address={item.address}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: item.title,
              placeId: item.id,
            });
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (props) => {
  return {
    title: "All Places",
    headerRight: () => (
      <HeaderItem
        iconName="ios-add"
        onPress={() => {
          props.navigation.push("NewPlace");
        }}
      />
    ),
  };
};

export default PlacesListScreen;
