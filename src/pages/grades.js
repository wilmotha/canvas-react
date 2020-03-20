/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchData } from '../canvasApi';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, getColors, getAssignments } from '../redux/selector';
import { store_courses, add_course_assignments } from '../redux/actions';

const flexStyle = css`
        .header {
            font-weight: bold;
        }

        .row {
            display: flex;
            flex-direction: horizontal;
            flex-wrap: wrap;
            margin: 0px 0 0px 0;
            padding: 10px 0 10px 0;
            border-bottom: solid 1px lightgrey;
        }

        .row:not(.header):hover {
            border-left: solid 2px blue;
        }

        .col {
            ${'' /* display: flex; */}
            flex: 1;
            box-sizing: border-box;
            flex-grow: 1;
            padding: 5px 5px;
            overflow: hidden;
            list-style: none;
            align-items: center;
            ${'' /* max-width: 300px; */}
            height: 50px;
        }
    `;

function Status(props) {
    const [ status, setStatus ] = useState("");

    const getStatus = submission => {
        if (submission.late) {
            return "LATE";
        }
        if (submission.missing) {
            return "MISSING";
        }
        return "";
    }

    useEffect(() => {
        setStatus(getStatus(props.submission));
    }, [props.submission]);

    const styles = css`
        padding-top: 0px;
        div {
            color: red;
            ${status === "" ? null : "border: solid 1px red"};
            border-radius: 5px;
            text-align: center;
            width: 100px;
        }
    `;

    return (
        <div className="col" css={styles}> <div> {status} </div>  </div>
    );
}


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

function GradeBox(props) {
    const assignment = props.assignment;
    const course_id = useParams().course_id;
    
    return (
        <div css={flexStyle}>
            <div className="row">
                <div className="col"> <Link to={`/courses/${course_id}/assignments/${assignment.id}`}> {assignment.name} </Link> </div>
                <div className="col"> {formatDate(assignment.due_at)} </div>
                {assignment.submission && assignment.submission.workflow_state == "graded" ? <>
                    <Status submission={assignment.submission}/> 
                    <div className="col"> {assignment.submission.grade} </div>  
                </> : <>
                    <div className="col">  </div>
                    <div className="col"> _ </div>
                </>}
                <div className="col"> {assignment.points_possible} </div>
            </div>
        </div>
    );
}

export default function Grades(props) {
    const course_id = useParams().course_id;
    const courses = useSelector(getCourses);
    const allAssignments = useSelector(getAssignments);
    const dispatch = useDispatch();
    const [ assignments, setAssignments ] = useState([]);
    const [ enrollment, setEnrollment ] = useState({});
    
    const styles = css`
        margin: 25px;

        @media only screen and (min-width: 800px) {
            #grades-container {
                display: flex;
                flex-direction: horizontal;
                align-content: stretch;
            }
        }
        @media only screen and (max-width: 800px) {
            #grades-container {
                display: inline;
            }
        }
       

        #assignment-container {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
        }

        #final-grade {
            display: flex;
            flex-direction: horizontal;
            justify-content: space-around;
            width: 200px;
        }
    `;

    const addAssignments = assignments => {
        dispatch(add_course_assignments(assignments));  
        setAssignments(assignments);
    }

    useEffect(() => {
        const temp = allAssignments.filter(assginments => assginments[0].course_id == course_id);
        console.log("FLEET: ", temp);
        console.log("HERE: ", allAssignments.length === 0 || temp.length === 0);
        if (allAssignments.length === 0 || temp.length === 0) {
            fetchData(addAssignments,  `courses/${course_id}/assignments?include[]=submission`);
        } else {
            setAssignments(temp[0]);
        }
    }, [ course_id ]);

    const setCourses = courses => {
        dispatch(store_courses(courses));
    }

    useEffect(() => {
        if (courses === undefined || courses.length === 0) {
            fetchData(setCourses, "courses?enrollment_state=active&include[]=term&include[]=total_students&include[]=total_scores");
            // fetchData(setColors, `users/${userId}/colors`);
        } else {
            const tempCourses = courses;
            setCourses(tempCourses);
        }
    }, [ course_id ]);

    useEffect(() => {
        const enroll = courses.filter(course => course.id == course_id)[0].enrollments[0];
        setEnrollment(enroll);
    }, [ courses ]);

    return (
        <div css={[styles, flexStyle]}>
            <h1>Grades</h1>
            <div id="grades-container">
                <div id="assignment-container">
                    <div className="row header">
                        <div className="col header"> Name </div>
                        <div className="col header"> Due </div>
                        <div className="col header"> Status </div>
                        <div className="col header"> Score </div>
                        <div className="col header"> Out of </div>
                    </div>
                    {assignments.map(assignment => (
                        <GradeBox key={assignment.id} assignment={assignment} />         
                    ))}
                </div>
                <div id="final-grade-container">
                    <h3> Final Grade </h3>
                    <div id="final-grade">
                        <h3> {enrollment.computed_current_grade} </h3>
                        <h3> {enrollment.computed_current_score}% </h3>
                    </div>
                    <div>  </div>
                </div>
            </div>
        </div>
    )
} 