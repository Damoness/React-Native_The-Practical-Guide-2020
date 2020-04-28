import Meal from "../../models/meal";
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export interface MealState{
    meals:Array<Meal>,
    favoriteMeals:Array<Meal>,
    filteredMeals:Array<Meal>,
}


interface ToggleFavoriteAction {
    type: typeof TOGGLE_FAVORITE;
    mealId: string;
}

export type MealActionType = ToggleFavoriteAction