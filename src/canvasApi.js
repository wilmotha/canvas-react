import fetch from 'isomorphic-unfetch';
import React from 'react';

const canvasAuth = {
    authEndpoint: "https://oregonstate.instructure.com/login/oauth2/auth?",
    clientID: "",
    responseType: "code",
    redirectUri: "http://localhost:3000/callback",
    state: "",
    scopes: []
}

const loginUrl = `${canvasAuth.authEndpoint}
                  client_id=${canvasAuth.clientID}&
                  response_type=${canvasAuth.responseType}&
                  redirect_uri=${redirectUri}&
                  ${authEndpoint.state != "" ? `state=${authEndpoint.state}` : ""}
                  ${authEndpoint.scope.length != 0 ? `scope=${authEndpoint.scope.join("%20")}` : ""}`;
