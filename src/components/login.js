import React from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../canvasApi';
import { useHistory, useParams } from 'react-router-dom';


export default function Login(props) {
    const prevUrl = useParams().prev_url;
    const dispatch = useDispatch();
    const history = useHistory();    

    const loginRedirect = result => {
        props.setWatch(result);
        console.log("prev: ", prevUrl)
        history.push("/" + prevUrl);
    }

    const handleLogin = e => {
        if(e) e.preventDefault();
        const token = e.target.children[1].value;
        login(token, loginRedirect);
    }

    return (
        <div>
        {console.log("LOGGEDIN: ", props.loggedIn)}
               <form onSubmit={handleLogin}>
                    <label htmlFor="token"><b>Token</b></label>
                    <input type="text" placeholder="Enter Token" name="token" required></input>
                    <button type="submit">Login</button>
                </form> 
                <p> To get your token go to your canvas page,
                  then go to accounts->settings and then under
                  approved intergrations click + New Access Token
                </p>
        </div>
    );
}