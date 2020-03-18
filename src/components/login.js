import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_token, set_id, remove_courses } from '../redux/actions';
import { getToken } from '../redux/selector';
import { login, fetchData, logout } from '../canvasApi';
import { useHistory } from 'react-router-dom';

export default function Login(props) {
    const dispatch = useDispatch();
    const history = useHistory();    

    const setId = user => {
        console.log(user);
        dispatch(set_id(user.id));
    }

    const handleLogin = e => {
        if(e) e.preventDefault();
        const token = e.target.children[1].value;
        props.setWatch(login(token));
        history.push('/courses');
    }

    const handleLogout = e => {
        props.setWatch(logout());
        dispatch(remove_courses());
        history.push('/');
      }

    return (
        <div>
        {console.log("LOGGEDIN: ", props.loggedIn)}
            {!props.loggedIn ? <>
                <form onSubmit={handleLogin}>
                    <label htmlFor="token"><b>Token</b></label>
                    <input type="text" placeholder="Enter Token" name="token" required></input>
                    <button type="submit">Login</button>
                </form> 
                <p> To get your token go to your canvas page,
                  then go to accounts->settings and then under
                  approved intergrations click + New Access Token
                </p> 
                </> : 
                <button onClick={handleLogout}>Logout</button>
            }
        </div>
    );
}