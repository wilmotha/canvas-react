import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_token, set_id, remove_courses } from '../redux/actions';
import { getToken } from '../redux/selector';
import { login, fetchData, logout } from '../canvasApi';

export default function Login(props) {
    const dispatch = useDispatch();
    const token = useSelector(getToken);

    const setId = user => {
        console.log(user);
        dispatch(set_id(user.id));
    }

    const handleSubmit = (e) => {
        if(e) e.preventDefault();
        const input = e.target.children[1];
        console.log(input.value);
        login(input.value);
        fetchData(setId, "users/self")
        dispatch(set_token(true));
    }

    return (
        <div>
        {console.log("LOGGEDIN: ", props.loggedIn)}
            {!props.loggedIn ? <>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="token"><b>Token</b></label>
                    <input type="text" placeholder="Enter Token" name="token" required></input>
                    <button type="submit">Login</button>
                </form> 
                <p> To get your token go to your canvas page,
                  then go to accounts->settings and then under
                  approved intergrations click + New Access Token
                </p> 
                </> : 
                <button onClick={() => (logout(), dispatch(remove_courses()))}>Logout</button>
            }
        </div>
    );
}