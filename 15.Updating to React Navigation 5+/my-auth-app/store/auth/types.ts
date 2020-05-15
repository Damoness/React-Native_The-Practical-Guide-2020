export const AUTHORIZATION = 'AUTHORIZATION';
export const LOGOUT = "LOGOUT";

export interface AuthState{
    token:string|null,
    userId:string|null,
}

export interface LogoutAction{
    type:typeof LOGOUT
}
export interface AuthorizationAction{
    type:typeof AUTHORIZATION,
    token:string,
    userId:string,
}


export type  AuthAction = LogoutAction | AuthorizationAction;






