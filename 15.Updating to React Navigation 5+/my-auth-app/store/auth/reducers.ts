import { AuthState, AuthorizationAction, AUTHORIZATION, LOGOUT, AuthAction } from "./types";



const initialState:AuthState = {
    token:null,
    userId:null,
}


export function authReducer(state = initialState,action:AuthAction):AuthState{


    switch(action.type){

        case AUTHORIZATION:{
            return{
                token:action.token,
                userId:action.userId,
            }
        }
        case LOGOUT:{
            return initialState;
        }

    }

    return state;
}