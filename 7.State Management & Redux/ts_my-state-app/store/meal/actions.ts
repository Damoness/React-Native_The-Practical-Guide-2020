import { TOGGLE_FAVORITE } from "./types";

export function toggleFavorite(id:string){

    return {
        type:TOGGLE_FAVORITE,
        mealId:id,
    }

}