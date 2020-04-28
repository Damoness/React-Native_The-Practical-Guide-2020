import { TOGGLE_FAVORITE, Filters, SET_FILTERS } from "./types";

export function toggleFavorite(id:string){

    return {
        type:TOGGLE_FAVORITE,
        mealId:id,
    }

}

export function setFilters(filterSettings:Filters){

    return {
        type:SET_FILTERS,
        filters:filterSettings
    }

}