import React from 'react'
import { View, Text ,ScrollView, Image,StyleSheet} from 'react-native'
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';


type Params={
    placeId:number,
    placeTitle:string,
}


const PlaceDetailScreen:NavigationStackScreenComponent<Params> = (props) => {

    const placeId = props.navigation.getParam('placeId');


    let selectedPlace = useSelector((state:RootState) =>
      state.place.places.find(place => place.id === placeId)
    );

    selectedPlace =selectedPlace!;

    const selectedLocation = { lat: selectedPlace?.lat, lng: selectedPlace?.lng };

    const showMapHandler = () => {
        props.navigation.navigate('Map', {
          readonly: true,
          initialLocation: selectedLocation
        });
      };

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <Image source={{ uri: selectedPlace?.imageUrl }} style={styles.image} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{selectedPlace?.address}</Text>
          </View>
          <MapPreview
            style={styles.mapPreview}
            location={selectedLocation}
            onPress={showMapHandler}
          />
        </View>
      </ScrollView>
    )
}

PlaceDetailScreen.navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('placeTitle')
    };
};

const styles = StyleSheet.create({
    image: {
      height: '35%',
      minHeight: 300,
      width: '100%',
      backgroundColor: '#ccc'
    },
    locationContainer: {
      marginVertical: 20,
      width: '90%',
      maxWidth: 350,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      backgroundColor: 'white',
      borderRadius: 10
    },
    addressContainer: {
      padding: 20
    },
    address: {
      color: Colors.primary,
      textAlign: 'center'
    },
    mapPreview: {
      width: '100%',
      aspectRatio:16/9,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    }
  });

export default PlaceDetailScreen
