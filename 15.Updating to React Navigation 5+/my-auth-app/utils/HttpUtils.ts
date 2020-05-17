

async function DELETE(url:string){

    try {

        const response =  await fetch(url,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            //body:JSON.stringify(params)
        })

        if(!response.ok){
            await handleResponseError(response);
        }

        const json = await response.json();
        return json;
        
    } catch (error) {

        throw error;
    }
}


async function handleResponseError(response:Response){

    if(!response.ok){

        console.log(JSON.stringify(response));

        if(response.status == 401){

            throw new Error("Token is invalid");

        }else if(response.status == 404){

            throw new Error("url not found");
            
        }else if(response.status == 400){

            // const resJson = await response.json();
            // console.log(resJson);

            const resJson = await response.json();
            console.log(resJson);

            let errorMessage;

            if(resJson.error.message == 'INVALID_EMAIL'){

                errorMessage = 'Email is invalid';

            }else if(resJson.error.message == 'EMAIL_EXISTS'){

                errorMessage = 'Email exists';

            }else if(resJson.error.message == 'INVALID_PASSWORD'){

                errorMessage = 'Password is invalid';

            }else if(resJson.error && resJson.error.message){

                errorMessage = resJson.error.message;

            }else{

                errorMessage = 'Something went wrong';
            }

            throw new Error(errorMessage);

        }

    }

}

async function PATCH(url:string,params:object){

    try {

        const response =  await fetch(url,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(params)
        })

        if(!response.ok){
            await handleResponseError(response);
        }

        const json = await response.json();
        return json;
        
    } catch (error) {

        throw error;
    }

}

async function GET(url: string){

    try {

        const response =  await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })

        if(!response.ok){
            await handleResponseError(response);
        }

        const json = await response.json();
        return json;
        
    } catch (error) {

        throw error;
    }

}

async function POST(url: string, params: object){

    try {

        const response =  await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(params)
        })

        if(!response.ok){
            await handleResponseError(response);
        }

        const json = await response.json();
        return json;
        
    } catch (error) {

        throw error;
    }

}

export default {
    GET,
    POST,
    DELETE,
    PATCH
}