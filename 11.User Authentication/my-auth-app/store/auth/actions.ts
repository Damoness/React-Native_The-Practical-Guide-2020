import { AUTHORIZATION } from "./types";

export function login(email:string,password:string){

    return async (dispatch:any)=>{

        const url  = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfhwcc-qnfmxtRlnVnOFyWqOU5LkF5X9A'
        
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password,
                returnSecureToken:true,
            })
        })

        if(!response.ok){
            
            const resJson = await response.json();

            console.log(resJson);

            let errorMessage;

            if(resJson.error.message == 'INVALID_EMAIL'){

                errorMessage = 'Email is invalid';

            }else if(resJson.error.message == 'EMAIL_EXISTS'){

                errorMessage = 'Email exists';

            }else if(resJson.error.message == 'EMAIL_NOT_FOUND'){

                errorMessage = 'Email not found';

            }else{

                errorMessage = 'Something went wrong';
            }

            throw new Error(errorMessage);

            return
        }


        const resJson = await response.json();
        console.log(resJson);

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


        const response = await fetch(url,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password,
                returnSecureToken:true,
            })
        });

        if(!response.ok){
            
            const resJson = await response.json();

            console.log(resJson);

            let errorMessage;

            if(resJson.error.message == 'INVALID_EMAIL'){

                errorMessage = 'Email is invalid';

            }else if(resJson.error.message == 'EMAIL_EXISTS'){

                errorMessage = 'Email exists';

            }else{

                errorMessage = 'Something went wrong';

            }

            throw new Error(errorMessage);

            return
        }


        const resJson = await response.json();
        console.log(resJson);

        dispatch({
            type:AUTHORIZATION,
            token:resJson.idToken,
            userId:resJson.localId,
        })


    }

}



