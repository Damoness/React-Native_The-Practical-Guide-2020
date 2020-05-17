import {
  AUTHORIZATION,
  LogoutAction,
  LOGOUT,
  AuthorizationAction,
  SET_DID_TRY_AUTO_LOGIN,
} from "./types";
import HttpUtils from "../../utils/HttpUtils";
import { AsyncStorage } from "react-native";

/**
 * 登录
 * @param email 
 * @param password 
 */
function login(email: string, password: string) {
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

/**
 * 授权
 * @param userId 
 * @param token 
 * @param expiryTime 
 */
function authenticate(
  userId: string,
  token: string,
  expiryTime:number
) {
  return (dispatch:any)=>{

     dispatch(setLogoutTimeout(expiryTime));
     dispatch({ type: AUTHORIZATION, userId: userId, token: token });
    
  }
}

/**
 * 登出
 */
function logOut(): LogoutAction {
  
  clearLogoutTimeout();
  AsyncStorage.removeItem('userData');
  return {
    type: LOGOUT,
  };
}

/**
 * 注册
 * @param email 
 * @param password 
 */
function signUp(email: string, password: string) {
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

const setDidTryAutoLogin = () => {
  return { type: SET_DID_TRY_AUTO_LOGIN };
};

let timer:number;

const setLogoutTimeout = (expirationTime:number)=>{

  return (dispatch:any)=>{

    timer =  setTimeout(()=>{

      dispatch(logOut())

    },expirationTime)

  }

}

const clearLogoutTimeout = ()=>{
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


export {
  logOut,
  signUp,
  login,
  authenticate,
  setDidTryAutoLogin
}


