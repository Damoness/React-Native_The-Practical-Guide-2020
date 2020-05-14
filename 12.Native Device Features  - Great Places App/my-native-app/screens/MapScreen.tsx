import React ,{useState,useEffect, useCallback} from 'react'
import { View, Text ,StyleSheet,TouchableOpacity, Platform} from 'react-native'
import MapViews,{Region,MapEvent,LatLng, Marker} from 'react-native-maps'
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import Colors from '../constants/Colors';

type Params = {
    saveLocation?:()=>void;
    readonly: boolean,
    initialLocation: {
        lat:number,
        lng:number,
    }
}

const MapScreen:NavigationStackScreenComponent<Params> = (props) => {

    const initialLocation = props.navigation.getParam('initialLocation');
    const readonly = props.navigation.getParam('readonly');

    const [selectedLocation, setSelectedLocation] = useState<LatLng>();

    const region:Region = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const  selectLocationHandler = (event:MapEvent)=>{
        setSelectedLocation(event.nativeEvent.coordinate)
    }


    const savePickedLocationHandler = useCallback(()=>{

        if (readonly) {
            return;
        }

        if(!selectedLocation){
            return;
        }
        props.navigation.navigate('NewPlace',{pickedLocation: selectedLocation })

    },[selectedLocation])

    useEffect(() => {
        props.navigation.setParams({ saveLocation: savePickedLocationHandler });
        return () => {
            //cleanup
        }
    }, [savePickedLocationHandler])

    return (
        <MapViews 
            style={styles.map} region={region}
            onPress={selectLocationHandler}    
        >
            {
                selectedLocation &&
                <Marker title="Picked Location" coordinate={selectedLocation} />
            }

        </MapViews>
    )
}

MapScreen.navigationOptions = navData =>{

    const saveFn = navData.navigation.getParam('saveLocation');
    const readonly = navData.navigation.getParam('readonly');
    if (readonly) {
      return {};
    }
    return {
      headerRight:()=>(
        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      )
    };

}
const styles = StyleSheet.create({
    map:{
        flex:1
    },
    headerButton: {
        marginHorizontal: 20
      },
    headerButtonText: {
        fontSize: 16,
        color: Colors.primary
    }
})


export default MapScreen
