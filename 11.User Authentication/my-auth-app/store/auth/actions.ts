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

    const expireDate = new Date(
      new Date().getTime() + parseInt(expiresIn) * 1000
    );

    saveDateToStorage(token, userId, expireDate);

    dispatch(authenticate(userId, token));
  };
}

export function authenticate(
  userId: string,
  token: string
): AuthorizationAction {
  return { type: AUTHORIZATION, userId: userId, token: token };
}

export function logOut(): LogoutAction {
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

    dispatch({
      type: AUTHORIZATION,
      token: resJson.idToken,
      userId: resJson.localId,
    });
  };
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
