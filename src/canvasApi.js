import fetch from 'isomorphic-unfetch';

export async function login(token) {    
    try {
        const response = await fetch(
            `/setToken`, 
            {
                method: 'POST',
                body: JSON.stringify({
                    "token": token
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch(e) {
        console.log("oops... ", e);
        return false;
    }
    return true;
}

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
    // console.log(JSON.parse(responseBody.results));
}

export async function postData(data, toPost = "") {
    try {
        const response = await fetch(
        `/post/${toPost}`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }   
        });
    } catch(e) {
        console.log("oops... ", e);
    }
}

export async function putData(data, toPost = "") {
    try {
        const response = await fetch(
        `/put/${toPost}`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }   
        });
    } catch(e) {
        console.log("oops... ", e);
    }
}