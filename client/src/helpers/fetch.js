import { env } from "../next.config";

export const fetchData = async (endpoint, authToken = null ) => {
    let isError = false;
    let data = null;

    let headers = {};
    if (authToken)
        headers = { 'authorization': authToken };

    try {
        let response = await fetch(env.SSE_SERVER_URL + endpoint, { headers });
        let responsStatus = response.status;
        if (responsStatus !== 200)
            isError = true;
        else
            data = await response.json();
    } catch (error) {
        console.log(error)
        error = true 
    }

    return { isError, data }
}