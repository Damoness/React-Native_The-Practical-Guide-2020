import { AUTHORIZATION } from "./types";
import HttpUtils from "../../utils/HttpUtils";

export function login(email:string,password:string){

    return async (dispatch:any)=>{

        const url  = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfhwcc-qnfmxtRlnVnOFyWqOU5LkF5X9A'
        
        const resJson =  await HttpUtils.POST(url,{
                email,
                password,
                returnSecureToken:true,
        })

        dispatch({
            type:AUTHORIZATION,
            token:resJson.idToken,
            userId:resJson.localId,
        })

    }
}

export function signUp(email:string,password:string){

    return async (dispatch:any)=>{


        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfhwcc-qnfmxtRlnVnOFyWqOU5LkF5X9A'

        const resJson =  await HttpUtils.POST(url,{
            email,
            password,
            returnSecureToken:true,
        })

        console.log(resJson);

        dispatch({
            type:AUTHORIZATION,
            token:resJson.idToken,
            userId:resJson.localId,
        })

    }

}



