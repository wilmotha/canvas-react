import React from 'react';
import { useDispatch } from 'react-redux';
import { remove_courses, remove_id } from '../redux/actions';
import { logout } from '../canvasApi';
import { useHistory } from 'react-router-dom';

export default function Logout(props) {
    const dispatch = useDispatch();
    const history = useHistory();    

    const handleLogout = e => {
        props.setWatch(logout());
        dispatch(remove_id());
        dispatch(remove_courses());
        history.push('/login/courses');
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}