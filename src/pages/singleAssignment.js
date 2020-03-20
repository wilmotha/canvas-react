/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchData } from '../canvasApi';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, getColors, getAssignments } from '../redux/selector';
import { store_courses, add_course_assignments } from '../redux/actions';
import ReactHtmlParser from 'react-html-parser';

export default function SingleAssignment(props) {
    const course_id = useParams().course_id;
    const assignment_id = useParams().assignment_id;
    const allAssignments = useSelector(getAssignments);
    const dispatch = useDispatch();
    const [ assignments, setAssignments ] = useState([]);
    const [ assignment, setAssignment ] = useState({});
    const [ enrollment, setEnrollment ] = useState({});

    const addAssignments = assignments => {
        dispatch(add_course_assignments(assignments));  
        setAssignments(assignments);
    }

    useEffect(() => {
        const temp = allAssignments.filter(assginments => assginments[0].course_id == course_id);
        if (allAssignments.length === 0 || temp.length === 0) {
            fetchData(addAssignments,  `courses/${course_id}/assignments?include[]=submission`);
        } else {
            setAssignments(temp[0]);
        }
    }, [ course_id ]);

    useEffect(() => {
        console.log("FUCKS: ", assignments);

        setAssignment(assignments.filter(assign => assign.id == assignment_id)[0]);
    }, [ assignments ]);

    return (
        <>
        {assignment ?
            <div css={css`padding: 25px`}>
                {console.log("YEPER: ", assignment)}
                <h1>{assignment.name}</h1>
                <div>{ReactHtmlParser(assignment.description)}</div>
            </div>
        : null }
        </>
    )
}