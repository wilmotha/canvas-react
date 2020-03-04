import fetch from 'isomorphic-unfetch';

// this function requires you pass it your token,
// a function that will set a local variable to the response body,
// and what you actually want to fetch
export async function fetchData(setData, toFetch = "") {
    let responseBody = {};
    
    try {
        const response = await fetch(
            `/canvas/${toFetch}`, 
            {
                method: 'GET',
            }
        );
        responseBody = await response.json();
    } catch(e) {
        console.log("oops... ", e);
    }
    setData(JSON.parse(responseBody.results));
}