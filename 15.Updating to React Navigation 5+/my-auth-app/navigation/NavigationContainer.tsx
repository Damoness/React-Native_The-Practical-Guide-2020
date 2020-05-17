import React ,{useRef, useEffect}from 'react'
import { View, Text } from 'react-native'
import { ProductsNavigator, DrawerNavigator,OrderNavigator,AdminNavigator, AuthNavigator } from './Navigator'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { NavigationContainer } from '@react-navigation/native';
import StartupScreen from '../screens/StartupScreen'

const AppContainer = () => {

    const  isAuth = useSelector((state:AppState)=>!!state.auth.token);
    const  didTryAutoLogin = useSelector((state:AppState)=>!!state.auth.didTryAutoLogin);
    
    return (
      <NavigationContainer>
          {isAuth && <DrawerNavigator />}
          {!isAuth && didTryAutoLogin && <AuthNavigator />}
          {!isAuth && !didTryAutoLogin && <StartupScreen />}
      </NavigationContainer>
    )
}

export default AppContainer
