import { MEALS } from "../../data/dummy-data";
import { MealActionType,TOGGLE_FAVORITE,MealState} from "./types";


const initialState:MealState={
    meals:MEALS,
    favoriteMeals:[],
    filteredMeals:MEALS,
}


export function mealReducer(state = initialState,action:MealActionType):MealState {

    switch(action.type){

        case TOGGLE_FAVORITE:{

            const id = action.mealId;

            const existingIndex =  state.favoriteMeals.findIndex(meal=>meal.id == id);

            if(existingIndex >= 0){

                const  updatedFavMeals = [...state.favoriteMeals];

                updatedFavMeals.splice(existingIndex,1);

                return {...state,favoriteMeals:updatedFavMeals}

            }else{

                const meal = state.meals.find(meal => meal.id == id);

                return {...state,favoriteMeals:state.favoriteMeals.concat(meal)}
            }
        }
        default :{

            return state;
        }

    }

}