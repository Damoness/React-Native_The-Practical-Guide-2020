import Place from "../models/place";

export const ADD_PLACE = "ADD_PLACE"
export const SET_PLACES = "SET_PLACES"

export type PlaceActions = 
    { type:typeof ADD_PLACE,data:Place} 
    | {type:typeof SET_PLACES,data:Array<Place>}

export interface PlaceState{
    places:Array<Place>
}