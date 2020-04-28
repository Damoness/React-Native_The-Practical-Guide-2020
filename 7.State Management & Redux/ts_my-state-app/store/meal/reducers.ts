import { MEALS } from "../../data/dummy-data";
import { MealActionType,TOGGLE_FAVORITE,MealState, SET_FILTERS} from "./types";


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
        case SET_FILTERS:{

            const filters = action.filters;

            const updatedFilteredMeals = state.meals.filter(meal=>{

                if(filters.glutenFree && !meal.isGlutenFree){
                    return false;
                }

                if(filters.lactoseFree && !meal.isLactoseFree){
                    return false;
                }

                if(filters.vegan && !meal.isVegan){
                    return false;
                }

                if(filters.vegetarian && !meal.isVegetarian){
                    return false;
                }

                return true;

            })

            return {...state,filteredMeals:updatedFilteredMeals};
            
        }
        default :{

            return state;
        }

    }

}