/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchData } from '../canvasApi';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, getColors, getAssignments } from '../redux/selector';
import { store_courses, add_course_assignments } from '../redux/actions';

function formatDate(date) {
    let timeZoneOffset = new Date().getTimezoneOffset()/60;
    let d = new Date(date);
    let a_p = "";
    let hour = d.getHours();
    let minutes = d.getMinutes().toString();

    if (hour < 12) {
        a_p = "AM";
    } else {
        a_p = "PM";
    }
 
    if (hour == 0) {
        hour = 12;
    }
 
    if (hour > 12) {
        hour = hour - 12;
    }
 
    if (minutes.length == 1) {
        minutes = "0" + minutes;
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]

    let formatedDate = `${months[d.getUTCMonth()]} ${d.getDate()} by ${hour}:${minutes} ${a_p}`;  

    return formatedDate;
}


export default function AssignmentsPage(props) {
    const course_id = useParams().course_id;
    const allAssignments = useSelector(getAssignments);
    const dispatch = useDispatch();
    const [ assignments, setAssignments ] = useState([]);
    const [ enrollment, setEnrollment ] = useState({});
    
    const styles = css`
        padding-left: 25px;
        #assignment-container {
            ${'' /* display: flex;
            flex-direction: vertical; */}
            padding: 0;
            ${'' /* padding-top: 0px; */}
        }

        #assignment {
            margin: 10px;
            padding: 30px;
            border: solid 1px lightgrey;
        }

    `;

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

    return (
        <div css={styles}>
            <h1>Assignments</h1>
            {console.log("ASSIGNMENTS: ", assignments)}
            <div id="assignment-container">
                {assignments.map(assignment => (
                    <div id="assignment" key={assignment.id}> 
                        <Link to={`/courses/${course_id}/assignments/${assignment.id}`}> {assignment.name} </Link> 
                        <div> <strong>Due</strong> {formatDate(assignment.due_at)} </div>
                    </div>
                ))}
            </div>
        </div>
    );
}