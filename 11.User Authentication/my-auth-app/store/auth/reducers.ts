import { AuthState, AuthorizationAction, AUTHORIZATION } from "./types";



const initialState:AuthState = {
    token:null,
    userId:null,
}


export function authReducer(state = initialState,action:AuthorizationAction):AuthState{


    switch(action.type){

        case AUTHORIZATION:{
            return{
                token:action.token,
                userId:action.userId,
            }
        }

    }

    return state;
}