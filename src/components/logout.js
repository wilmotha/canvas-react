/** @jsx jsx */
import {css, jsx } from '@emotion/core'
import React from 'react';
import { useDispatch } from 'react-redux';
import { remove_courses, remove_id } from '../redux/actions';
import { logout } from '../canvasApi';
import { useHistory } from 'react-router-dom';

export default function Logout(props) {
    const dispatch = useDispatch();
    const history = useHistory();    

    const styles = css`
        background: transparent;
        border: none;
        padding: 4pt;
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 120pt;

        :hover {
			background-color: #f7a162;
            cursor: pointer;
        }
    `;

    const handleLogout = e => {
        props.setWatch(logout());
        dispatch(remove_id());
        dispatch(remove_courses());
        history.push('/login/courses');
    }

    return (
        <div css={styles} onClick={handleLogout}>Logout</div>
    );
}