

import { PlaceState ,PlaceActions, ADD_PLACE, SET_PLACES} from "../types";


const initialState:PlaceState = {
    places:[]
}

export function placeReducer(state = initialState,action:PlaceActions):PlaceState{

    switch(action.type){
        case ADD_PLACE:{

            return {
                places:[...state.places,action.data]
            }

        }
        case SET_PLACES:{

            return {
                places:action.data
            }

        }
        default:{
            return state;
        }
    }
}