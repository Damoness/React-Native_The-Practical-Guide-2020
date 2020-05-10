import React ,{useRef, useEffect}from 'react'
import { View, Text } from 'react-native'
import Navigator from './Navigator'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { NavigationActions ,NavigationContainerComponent} from 'react-navigation'

const NavigationContainer = () => {


    const  isAuth = useSelector((state:AppState)=>!!state.auth.token);

    const navRef = useRef<NavigationContainerComponent>(null)

    useEffect(()=>{

        if(!isAuth){

            navRef.current &&  navRef.current.dispatch(
                NavigationActions.navigate({ routeName: 'Auth' })
            );

        }

    },[isAuth])

    return (
        <Navigator  ref={navRef} />
    )
}

export default NavigationContainer
