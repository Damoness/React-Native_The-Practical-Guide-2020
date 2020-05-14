import React, { useState ,useCallback} from "react";
import { View, Text, TextInput, Button, StyleSheet ,Image,ScrollView, Alert} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/actions/place";
import Colors from "../constants/Colors";
import ImgPicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import MapViews,{Region,MapEvent,LatLng, Marker} from 'react-native-maps'

type Params = {
  pickedLocation?:LatLng
}

const NewPlaceScreen: NavigationStackScreenComponent<Params> = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const [imageUrl,setImageUrl] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<LatLng>();

  const titleChangeHandler = (text: string) => {
    // you could add validation
    setTitleValue(text);
  };

  const locationPickedHandler = useCallback(location => {
    setSelectedLocation(location);
  }, []);

  const savePlaceHandler = () => {

    if(selectedLocation){


      console.log(selectedLocation);

      dispatch(addPlace(titleValue, imageUrl,selectedLocation?.latitude,selectedLocation?.longitude));
      props.navigation.goBack();

    }

  };

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} />

        <ImgPicker  onImageTaken={setImageUrl}/>

        <LocationPicker  navigation ={props.navigation} onLocationPicked={locationPickedHandler}/>

        <Button
          title={"Save Place"}
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = () => {
  return {
    title: "Add Place",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },

  imageContainer:{
    alignItems:'center',
    justifyContent:'center',
    width:"100%",
    aspectRatio:16/9,
    borderWidth:1,
  },

  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
