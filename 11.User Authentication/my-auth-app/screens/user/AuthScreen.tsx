import React,{useReducer,useCallback,useState} from "react";
import { View, StyleSheet, Button, ActivityIndicator } from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { hasKey } from "../../utils/ts-utils";
import { useDispatch } from "react-redux";
import {signUp, login}  from '../../store/auth/actions'
import Colors from "../../constants/Colors";

const UPDATE_INPUT = "UPDATE_INPUT";


interface AuthState{
    inputValues:{
        email:string,
        password:string,
    },
    inputValidities:{
        email:boolean,
        password:boolean,
    },
    formIsValid:boolean,
}

interface Action{
    type:typeof UPDATE_INPUT,
    inputIdentifier:'email' | 'password',
    inputValue:string,
    inputValid:boolean,
}


const authReducer = (state:AuthState,action:Action) =>{

    switch(action.type){

        case UPDATE_INPUT:{

            const updatedInputValues = {
                ...state.inputValues,
                [action.inputIdentifier]:action.inputValue,
            }

            const updatedInputValidities ={
                ...state.inputValidities,
                [action.inputIdentifier]:action.inputValid,
            }

            let updatedFormIsValid = true;

            for (const key in updatedInputValidities) {
                if(hasKey(updatedInputValidities,key)){

                    updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
                }
            }

            return {
                inputValues:updatedInputValues,
                inputValidities:updatedInputValidities,
                formIsValid:updatedFormIsValid
            }

        }

    }

    return state;
}

const AuthScreen:NavigationStackScreenComponent = (props) => {

    const initialState:AuthState={
        inputValues:{
            email:'',
            password:'',
        },
        inputValidities:{
            email:false,
            password:false,
        },
        formIsValid:false,
  }

  const dispatch = useDispatch();
  
  const [formState, formDispatch] = useReducer(authReducer, initialState)

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const inputChangeHandler =useCallback((inputIdentifier,value,isValid)=>{
  
    formDispatch({
        type:UPDATE_INPUT,
        inputIdentifier:inputIdentifier,
        inputValue:value,
        inputValid:isValid,
    })

  },[formDispatch])


  const authHandler = async ()=>{

    try {

        setIsLoading(true);

        if(isSignUp){

            await  dispatch(signUp(formState.inputValues.email,formState.inputValues.password))
    
        }else {
    
            await  dispatch(login(formState.inputValues.email,formState.inputValues.password))

            props.navigation.navigate('App')
    
        }
        
    } catch (error) {

        alert(error.message);
        setIsLoading(false);
    }


  }


  return (
    <View style={styles.container}>

        <Card style={styles.card}>
            <Input
                id={"email"}
                label={"Email"}
                initialValue={""}
                initiallyValid={false}
                errorText={"Please enter a valid email"}
                onInputChange={inputChangeHandler}
                email
                required
                autoCapitalize={'none'}
                autoCorrect={false}
            />
            <Input
                id={"password"}
                label={"Password"}
                initialValue={""}
                initiallyValid={false}
                errorText={"Please enter a valid password"}
                onInputChange={inputChangeHandler}
                required
                minLength={5}
                autoCapitalize={'none'}
                autoCorrect={false}
            />
            {
                isLoading ?
                <ActivityIndicator size={'small'} color={Colors.masterColor} />:

                <Button onPress={authHandler} title={isSignUp?"Sign Up":'Login'} color={Colors.masterColor}/>
            }
            
            <Button onPress={()=>setIsSignUp(!isSignUp)} title={`Switch to ${isSignUp?'Login':'Sign Up'}`} color={Colors.accentColor}/>
        </Card>

    </View>
  );
};


AuthScreen.navigationOptions = ()=>{

    return {
        title:'Authorization'
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card:{
      padding:20,
  }
});

export default AuthScreen;
