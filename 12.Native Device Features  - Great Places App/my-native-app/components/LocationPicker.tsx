import React,{useState,useEffect} from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Button, Alert } from "react-native";
import Colors from "../constants/Colors";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from "./MapPreview";
import { NavigationStackProp } from "react-navigation-stack";
import MapViews,{Region,MapEvent,LatLng, Marker} from 'react-native-maps'

type Props = {
    navigation:NavigationStackProp
    onLocationPicked:(coordinate:LatLng)=>void,
}

const LocationPicker = (props:Props) => {

    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState<{
        lat:number,
        lng:number,
    }>();

    const mapPickedLocation:LatLng = props.navigation.getParam('pickedLocation');

    const { onLocationPicked } = props;

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
          Alert.alert(
            'Insufficient permissions!',
            'You need to grant location permissions to use this app.',
            [{ text: 'Okay' }]
          );
          return false;
        }
        return true;
    };

    useEffect(() => {
        if (mapPickedLocation) {
          setPickedLocation({
              lat:mapPickedLocation.latitude,
              lng:mapPickedLocation.longitude
          });
          onLocationPicked(mapPickedLocation);
        }
      }, [mapPickedLocation, onLocationPicked]);

    const pickOnMapHandler= ()=>{
        props.navigation.push('Map')
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
          return;
        }
    
        try {
          setIsFetching(true);
          const location = await Location.getCurrentPositionAsync({
            timeout: 5000
          });

          //Alert.alert(JSON.stringify(location))

          setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
          });
        } catch (err) {
          Alert.alert(
            'Could not fetch location!',
            'Please try again later or pick a location on the map.',
            [{ text: 'Okay' }]
          );
        }
        setIsFetching(false);
      };



  return (
    <View style={styles.locationPicker}>
      <MapPreview 
        onPress={pickOnMapHandler}
        style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>

      <View style={styles.actions}> 
        <Button
            title="Get User Location"
            color={Colors.primary}
            onPress={getLocationHandler}
        />
        <Button
            title="Pick on Map"
            color={Colors.primary}
            onPress={pickOnMapHandler}
        />
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
      },
      mapPreview: {
        marginBottom: 10,
        width: '100%',
        aspectRatio:16/9,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      actions:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
      }
});

export default LocationPicker;
