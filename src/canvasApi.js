import fetch from 'isomorphic-unfetch';
// import React from 'react';

// const canvasAuth = {
//     authEndpoint: "https://oregonstate.instructure.com/login/oauth2/auth?",
//     clientID: "",
//     responseType: "code",
//     redirectUri: "https://localhost:3000/callback",
//     state: "",
//     scopes: []
// }

// const loginUrl = `${canvasAuth.authEndpoint}
//                   client_id=${canvasAuth.clientID}&
//                   response_type=${canvasAuth.responseType}&
//                   redirect_uri=${canvasAuth.redirectUri}&
//                   ${canvasAuth.state != "" ? `state=${canvasAuth.state}` : ""}
//                   ${canvasAuth.scopes.length != 0 ? `scope=${canvasAuth.scope.join("%20")}` : ""}`;



// this function requires you pass it your token,
// a function that will set a local variable to the response body,
// and what you actually want to fetch
export async function fetchData(token, setData, toFetch = "") {
    let responseBody = {};
    
    try {
        const response = await fetch(
            `https://canvas.instructure.com/api/v1/${toFetch}`, 
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
                    'Access-Control-Allow-Credentials': 'true'
                }
            }
        );
        responseBody = response.json();
        console.log("YEET: ", responseBody);
    } catch(e) {
        console.log("oops... ", e);
    }
    responseBody.then((result) => (setData(result), console.log(result)));
}