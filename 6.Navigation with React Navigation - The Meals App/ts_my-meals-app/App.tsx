import React, { useState } from 'react';
import { StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo'
import MealsNavigator from './navigation/MealsNavigator';

const fetchFonts = () => {
 return Font.loadAsync({
    'open-sans':require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/Open_Sans/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  const finishLoadFontHandler = ()=>{
    setFontLoaded(true);
  }

  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={finishLoadFontHandler}/>
  }

  return (
    <MealsNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
