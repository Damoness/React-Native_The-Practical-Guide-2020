import { AuthState, AuthorizationAction, AUTHORIZATION, LOGOUT, AuthAction, SET_DID_TRY_AUTO_LOGIN } from "./types";



const initialState:AuthState = {
    token:null,
    userId:null,
    didTryAutoLogin:false,
}


export function authReducer(state = initialState,action:AuthAction):AuthState{


    switch(action.type){

        case AUTHORIZATION:{
            return{
                token:action.token,
                userId:action.userId,
                didTryAutoLogin: true
            }
        }
        case LOGOUT:{
            return {
                ...initialState,
                didTryAutoLogin:true,
            };
        }
        case SET_DID_TRY_AUTO_LOGIN:{
            return {
                ...initialState,
                didTryAutoLogin:true,
            }
        }

    }

    return state;
}