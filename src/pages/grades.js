/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData, putData } from '../canvasApi';
import { useSelector, useDispatch } from 'react-redux';
import { getID, getCourses, getColors } from '../redux/selector';
import { store_courses, remove_courses, store_colors } from '../redux/actions';

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
            display: flex;
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

function GradeBox(props) {
    const assignment = props.assignment;

    

    return (
        <div css={flexStyle}>
            <div className="row">
                <div className="col"> {assignment.name} </div>
                <div className="col"> {assignment.due_at} </div>
                {assignment.submission && assignment.submission.workflow_state == "graded" ? <>
                    <Status submission={assignment.submission}/> 
                    <div className="col"> {assignment.submission.grade} </div>  
                </> : <>
                    <div className="col">  </div>
                    <div className="col"> / </div>
                </>}
                <div className="col"> {assignment.points_possible} </div>
            </div>
        </div>
    );
}

export default function Grades(props) {
    const course_id = useParams().course_id;
    const courses = useSelector(getCourses);
    const dispatch = useDispatch();
    const [ assignments, setAssignments ] = useState([]);
    const [ course, setCourse ] = useState({});
    const [ enrollment, setEnrollment ] = useState({});
    const styles = css`
        margin: 25px;
        #final-grade {
            display: flex;
            flex-direction: horizontal;
            justify-content: space-between;
            width: 300px;
        }
    `;

    useEffect(() => {
        fetchData(setAssignments,  `courses/${course_id}/assignments?include[]=submission`);
    }, []);


    const setCourses = courses => {
        dispatch(store_courses(courses));
    }

    useEffect(() => {
        if (courses === undefined || courses.length === 0) {
            fetchData(setCourses, "courses?enrollment_state=active&include[]=term&include[]=total_students");
        } else {
            const tempCourses = courses;
            setCourses(tempCourses);
        }
        const checkCourse = courses.filter(course => course.id == course_id);
        if (checkCourse.length > 0) {
            setCourse(checkCourse[0]);
            setEnrollment(checkCourse[0].enrollments ? checkCourse[0].enrollments[0] : null);
        }
    }, [ course_id ])


    return (
        <div css={styles, flexStyle}>
            <h1>Grades</h1>
            {console.log("Assignments: ", assignments)}
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
            <div id="final-grade">
                <h3> Final Grade </h3>
                <h3> {enrollment.computed_current_grade} </h3>
                <h3> {enrollment.computed_current_score}% </h3>
            </div>
        </div>
    )
} 