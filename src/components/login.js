import React from 'react';
import { useDispatch } from 'react-redux';
import { jsx, css } from '@emotion/core'
import { login } from '../canvasApi';
import { useHistory, useParams } from 'react-router-dom';


export default function Login(props) {
    const prevUrl = useParams().prev_url;
    const dispatch = useDispatch();
    const history = useHistory();

    // import Background from './images/osu1.png';

    const divStyle = {
    // backgroundImage: 'url(' + "https://www.salesforce.org/wp-content/uploads/1918/02/osu1.jpg" + ')',
    backgroundColor: 'orange',
    height: '100%',
    };

    // var backgroundStyle = {
    //   width: "100%",
    //   height: "300%",
    //   backgroundImage: 'url(' + "https://www.salesforce.org/wp-content/uploads/1918/02/osu1.jpg" + ')',
    //
    // }

    const loginRedirect = result => {
        props.setWatch(result);
        console.log("prev: ", prevUrl)
        history.push("/" + prevUrl);
    }

    const handleLogin = e => {
        if(e) e.preventDefault();
        const token = e.target.children[2].value;
        login(token, loginRedirect);
    }

    return (
      <div style={divStyle}>
        <h1> Oregon State University Canvas </h1>
        {console.log("LOGGEDIN: ", props.loggedIn)}
               <form onSubmit={handleLogin}>
                    <label htmlFor="token"><b>Token</b></label>
                    <br></br>
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
