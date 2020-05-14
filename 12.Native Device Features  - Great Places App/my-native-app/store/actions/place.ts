import Place from "../../models/place"

import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from "../../helpers/db";
import {ThunkAction} from 'redux-thunk'

import { PlaceActions, PlaceState, ADD_PLACE, SET_PLACES } from "../types";
import env from "../../env";

type ThunkResult<R> = ThunkAction<R, PlaceState, undefined, PlaceActions>;


export function loadPlaces():ThunkResult<Promise<boolean>>{

    return async (dispatch)=>{


        const dbResult =  await fetchPlaces();

        console.log(dbResult);

        dispatch({
            type:SET_PLACES,
            data:dbResult.rows._array
        })

        return true;

    }

    
}

export function addPlace(title:string,imageUrl:string,lat:number,lng:number):ThunkResult<Promise<boolean>>{


    return async (dispatch)=>{


        try {

            const url  = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
                lat
            },${lng}&key=${env.googleApiKey}`;

            console.log(url);

            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();

            if (!resData.results) {
              throw new Error('Something went wrong!');
            }

            const address = resData.results[0].formatted_address;

            console.log(resData)

            const fileName = imageUrl.split('/').pop();

            const newPath = FileSystem.documentDirectory! + new Date().getTime() + fileName!;

            await FileSystem.moveAsync({
                from:imageUrl,
                to:newPath,
            })

            const dbResult =  await insertPlace(title,newPath,address,lat,lng);

            console.log(dbResult);
            
            const place = new Place(
                dbResult.insertId,
                title,
                newPath,
                address,
                lat,
                lng,
            )
    
            dispatch({
                type:ADD_PLACE,
                data:place
            })
    
            
        } catch (error) {
            
            console.log(error);
        }


        return true;
    }

}





