import Meal from "../../models/meal";
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

export interface MealState{
    meals:Array<Meal>,
    favoriteMeals:Array<Meal>,
    filteredMeals:Array<Meal>,
}

export type Filters = {
    glutenFree?:boolean,
    lactoseFree?:boolean,
    vegan?:boolean,
    vegetarian?:boolean,
}

interface SetFiltersAction{
    type:typeof SET_FILTERS,
    filters:Filters
}

interface ToggleFavoriteAction {
    type: typeof TOGGLE_FAVORITE;
    mealId: string;
}

export type MealActionType = ToggleFavoriteAction| SetFiltersAction 