/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData, putData } from '../canvasApi';
import { useSelector, useDispatch } from 'react-redux';
import { getID, getCourses, getColors } from '../redux/selector';
import { store_courses, remove_courses, store_colors } from '../redux/actions';

const flexStyle = css`
        display: flex;
        flex-direction: horizontal;
        flex-wrap: wrap;
        margin: 0 0 3em 0;
        padding: 0;

        li {
            box-sizing: border-box;
            flex-grow: 1;
            padding: 0.8em 1.2em;
            overflow: hidden;
            list-style: none;
            border-bottom: solid 3px grey;
            max-width: 300px;
            
        }
    `;

function GradeBox(props) {
    const assignment = props.assignment;

    const setStatus = submission => {
        if (submission.late) {
            return "Late";
        }
        if (submission.missing) {
            return "Missing";
        }
    }

    return (
        <ul css={flexStyle}>
            <li> {assignment.name} </li>
            <li> {assignment.due_at} </li>
            {assignment.submission && assignment.submission.workflow_state == "graded" ? <>
                <li> {setStatus(assignment.submission)} </li> 
                <li> {assignment.submission.grade} </li>  
            </> : <>
                <li>  </li>
                <li> / </li>
            </>}
            <li> {assignment.points_possible} </li>
        </ul>
    );
}

export default function Grades() {
    const course_id = useParams().course_id;
    const [ assignments, setAssignments ] = useState([]);


    useEffect(() => {
        fetchData(setAssignments,  `courses/${course_id}/assignments?include[]=submission`);
    }, []);

    return (
        <div>
            <h1>Grades</h1>
            {console.log("Assignments: ", assignments)}
            <ul css={flexStyle}>
                <li> Name </li>
                <li> Due </li>
                <li> Status </li>
                <li> Score </li>
                <li> Out of </li>
            </ul>
            <div>
                {assignments.map(assignment => (
                    <GradeBox key={assignment.id} assignment={assignment} />         
                ))}
            </div>
        </div>
    )
} 