import React,{useEffect} from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { NavigationSwitchScreenComponent } from 'react-navigation'
import { useDispatch } from 'react-redux'
import { authenticate } from '../store/auth/actions'

const StartupScreen:NavigationSwitchScreenComponent = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {

        const getUserData = async ()=>{

           const  userData =  await AsyncStorage.getItem('userData')

           if(userData){

            const {token,userId,expiryDate} = JSON.parse(userData);

                console.log(expiryDate)

                const expirationDate = new Date(expiryDate);

                if(expirationDate < new Date()){

                    console.log('Auth');
                    props.navigation.navigate('Auth')

                }else{

                    const expirationTime = expirationDate.getTime() - new Date().getTime();

                    console.log('App');
                    dispatch(authenticate(userId,token,expirationTime));
                    props.navigation.navigate('App')

                }

           }else{

                props.navigation.navigate('Auth')

           }
        }

        getUserData();

    }, [])

    return (
        <View>
            <Text>111</Text>
        </View>
    )
}

export default StartupScreen
