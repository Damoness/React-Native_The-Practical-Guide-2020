export const AUTHORIZATION = 'AUTHORIZATION';


export interface AuthState{
    token:string|null,
    userId:string|null,
}

export interface AuthorizationAction{
    type:typeof AUTHORIZATION,
    token:string,
    userId:string,
}






