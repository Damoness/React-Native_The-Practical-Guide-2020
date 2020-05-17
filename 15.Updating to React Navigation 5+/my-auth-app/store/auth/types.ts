export const AUTHORIZATION = 'AUTHORIZATION';
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AUTO_LOGIN = 'SET_DID_TRY_AUTO_LOGIN'

export interface AuthState{
    token:string|null,
    userId:string|null,
    didTryAutoLogin:boolean,
}

export interface SetDidTryAutoLogin{
    type:typeof SET_DID_TRY_AUTO_LOGIN,
}
export interface LogoutAction{
    type:typeof LOGOUT
}
export interface AuthorizationAction{
    type:typeof AUTHORIZATION,
    token:string,
    userId:string,
}


export type  AuthAction = LogoutAction | AuthorizationAction | SetDidTryAutoLogin;






