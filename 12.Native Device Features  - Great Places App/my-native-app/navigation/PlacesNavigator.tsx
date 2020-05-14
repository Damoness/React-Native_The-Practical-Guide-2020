
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PlacesListScreen from '../screens/PlacesListScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';


const PlacesNavigator = createStackNavigator({
    Places:PlacesListScreen,
    NewPlace:NewPlaceScreen,
    PlaceDetail:PlaceDetailScreen,
    Map:MapScreen,
});

export default createAppContainer(PlacesNavigator);