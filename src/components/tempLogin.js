import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_token } from '../redux/actions';
import { getToken } from '../redux/selector';

export default function Login(props) {
    const dispatch = useDispatch();
    const token = useSelector(getToken);

    const handleSubmit = (e) => {
        if(e) e.preventDefault();
        const input = e.target.children[1]
        dispatch(set_token(input.value));
    }

    return (
        <div>
            {token === "" ? 
                <form onSubmit={handleSubmit}>
                    <label htmlFor="token"><b>Token</b></label>
                    <input type="text" placeholder="Enter Token" name="token" required></input>
                    <button type="submit">Login</button>
                </form> : 
                <button onClick={() => dispatch(set_token(""))}>Logout</button>
            }
        </div>
    );
}