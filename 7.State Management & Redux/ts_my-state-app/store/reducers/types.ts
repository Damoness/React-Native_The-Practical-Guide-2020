import Meal from "../../models/meal";

export interface RootState {
    meals: {
        meals:Array<Meal>,
        filterMeals:Array<Meal>,
        favoritesMeals:Array<Meal>,
    }
}
