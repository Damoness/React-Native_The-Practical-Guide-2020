import {
  AUTHORIZATION,
  LogoutAction,
  LOGOUT,
  AuthorizationAction,
} from "./types";
import HttpUtils from "../../utils/HttpUtils";
import { AsyncStorage } from "react-native";

export function login(email: string, password: string) {
  return async (dispatch: any) => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfhwcc-qnfmxtRlnVnOFyWqOU5LkF5X9A";

    const resJson = await HttpUtils.POST(url, {
      email,
      password,
      returnSecureToken: true,
    });

    console.log(resJson);

    const { idToken: token, localId: userId, expiresIn } = resJson;


    const expiryTime = parseInt(expiresIn) * 1000;

    const expireDate = new Date(
      new Date().getTime() + expiryTime
    );

    saveDateToStorage(token, userId, expireDate);

    dispatch(authenticate(userId, token,expiryTime));
  };
}

export function authenticate(
  userId: string,
  token: string,
  expiryTime:number
) {
  return (dispatch:any)=>{

     dispatch(setLogoutTimeout(expiryTime));
     dispatch({ type: AUTHORIZATION, userId: userId, token: token });
    
  }
}

export function logOut(): LogoutAction {

  AsyncStorage.removeItem('userData');
  return {
    type: LOGOUT,
  };
}

export function signUp(email: string, password: string) {
  return async (dispatch: any) => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfhwcc-qnfmxtRlnVnOFyWqOU5LkF5X9A";

    const resJson = await HttpUtils.POST(url, {
      email,
      password,
      returnSecureToken: true,
    });

    console.log(resJson);

    const { idToken: token, localId: userId, expiresIn } = resJson;


    const expiryTime = parseInt(expiresIn) * 1000;


    const expireDate = new Date(
      new Date().getTime() + expiryTime
    );

    saveDateToStorage(token, userId, expireDate);

    dispatch(authenticate(userId, token,expiryTime));

  };
}

let timer:number;

const setLogoutTimeout = (expirationTime:number)=>{

  return (dispatch:any)=>{

    timer =  setTimeout(()=>{

      dispatch(logOut())

    },expirationTime)

  }

}

const clearLoggerTimeout = ()=>{
   timer && clearTimeout(timer);
}

const saveDateToStorage = (
  token: string,
  userId: string,
  expirationDate: Date
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ token, userId, expiryDate:expirationDate.toISOString() })
  );
};
