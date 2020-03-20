import fetch from 'isomorphic-unfetch';

export async function checkLoggedIn(setLoggedIn) {
    const response = await fetch(
        '/loggedIn',
        {
            method: 'GET'
        }
    )
    const responseBody = await response.json();
    setLoggedIn(responseBody);
}

export async function login(token, loginRedirect) {   
    try {
        const response = await fetch(
            `/login`, 
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
        response.json().then((results) => loginRedirect(results));
    } catch(e) {
        console.log("oops... ", e);
        return false;
    }
}

export async function logout() {
    const response = await fetch(
        '/logout',
        {
            method: 'GET',
            credentials: 'include'
        }
    );
    return await response.json();
}

// this function requires you pass it your token,
// a function that will set a local variable to the response body,
// and what you actually want to fetch
export async function fetchData(setData, toFetch = "") {
    let responseBody = {};
    
    try {
        const response = await fetch(
            `/get/${toFetch}`, 
            {
                method: 'GET',
            }
        );
        responseBody = await response.json();
        setData(JSON.parse(responseBody.results));
    } catch(e) {
        console.log("oops... ", e);
    }
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

export async function putData(data, toPut = "") {
    try {
        const response = await fetch(
        `/put/${toPut}`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }   
        });
        console.log(await response.json);
    } catch(e) {
        console.log("oops... ", e);
    }
}