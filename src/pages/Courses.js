/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchData, putData } from '../canvasApi';
import { useSelector, useDispatch } from 'react-redux';
import { getID, getCourses, getColors } from '../redux/selector';
import { store_courses, remove_courses, store_colors } from '../redux/actions';


// This works, but we don't have authorization:(
function Model(props) {
    const [ name, setName ] = useState("");
    const [ color, setColor ] = useState("");
    const userId = useSelector(getID);
    const dispatch = useDispatch();

    const styles = css`
        box-shadow: 1px 2px 4px 2px rgba(0, 0, 0, .2), 1.5px 3px 10px 5px rgba(0, 0, 0, 0.19);
        display: flex;
        flex-direction: column;
        padding: 10px;
        left: 10px;
        justify-content: space-evenly;

        h4 {
            margin-top: 0;
        }

        button {
            border: none;
            background: none;
            font-size: 15px;
            margin: 0;
            padding: 0;
            padding-bottom: 20px;
        }

        button:hover {
            color: grey;
            cursor: pointer;
        }

        #header {
            display: flex;
            justify-content: space-between;
        }

        #buttons button {
            margin-right: 30px;
        }

    `;

    const handleApply = e => {
        if (name !== "") {
            console.log("NAME: ", name);
            putData({'nickname': name}, `users/self/course_nicknames/${props.id}`)
        }

        if (color !== "") {
            putData({'hexcode': color}, `users/${userId}/colors/${props.asset_string}`);
        }

        // this is done to force a re fetch of the courses with changed data!
        dispatch(remove_courses);
    }

    const handleCancel = e => {
        setColor("");
        setName("");
        props.setModel();
    }

    return (
        <div css={styles}>
            <div id="header">
                <h4>Customize</h4>
                <button onClick={props.setModel}>X</button>
            </div>
            <div>We dont have authorization :(</div>
            <label>Nickname</label>
            <input type="text" placeholder={props.name} onChange={(e) => setName(e.target.value)} ></input>
            <lable>Color</lable>
            <input type="text" placeholder={props.color} onChange={(e) => setColor(e.target.value)} ></input>
            <br></br>
            <div id="buttons">
                <button onClick={handleApply}> Apply </button>
                <button onClick={handleCancel}> Cancel </button>
            </div>
        </div>
    );
}

function CourseBox(props) {
    const history = useHistory();
    const course = props.course;
    const [ model, setModel ] = useState(false);
    const colorKey = `course_${course.id}`;
    // set colors for non user colors
    const color = props.color.custom_colors ? (props.color.custom_colors[colorKey] != null ? props.color.custom_colors[colorKey] : '#394B58') : '#394B58';

    const styles = css`
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19);
        border-radius: 4px;
        width: 300px;
        height: auto;
        margin: 30px;

        #title {
            margin: 0;
            padding: 25px 20px 60px 20px;
            background: ${color};
            display: flex;
            justify-content: space-between;
            color: ghostwhite;
            text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
        }

        h2 {
            margin: 0;
            height: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        #info {
            padding: 20px;
            background: ghostwhite;
        }

        #course-code {
            padding: 0;
            color: grey;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        :hover {
            box-shadow: 1px 2px 4px 2px rgba(0, 0, 0, .2), 1.5px 3px 10px 5px rgba(0, 0, 0, 0.19);
            cursor: pointer;
        }

        button {
            border: none;
            background: none;
            color: ghostwhite;
            font-size: 22px;
            margin: 0;
            padding: 0;
        }

        button:hover {
            color: grey;
            cursor: pointer;
        }
    `;

    return (
        <>
            <div css={styles} onClick={() => history.push(`/courses/${course.id}`)}>
                <div className="boxes" id="title">
                    <h2>{course.name}</h2>
                    <button onClick={() => setModel(!model)}>︙</button>
                </div>
                <div className="boxes" id="info">
                    <div id="course-code">{course.course_code}</div>
                    <div>{course.term ? course.term.name : null}</div>
                </div>
            </div>
            {model ? <Model id={course.id} name={course.name} asset_string={colorKey} color={color} setModel={() => setModel(false)}/> : null}
        </>
    );
}

export default function Courses() {
    const dispatch = useDispatch();
    const courses = useSelector(getCourses);
    const colors = useSelector(getColors);
    const userId = useSelector(getID);

    const styles = css`
        padding: 25px;
        #course-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: start;
            margin: -25px;
        }
    `;

    const setCourses = courses => {
        dispatch(store_courses(courses));
    }

    const setColors = color => {
        dispatch(store_colors(color));
    }

    useEffect(() => {
        if (courses === undefined || courses.length === 0) {
            fetchData(setCourses, "courses?enrollment_state=active&include[]=term&include[]=total_students&include[]=total_scores");
            // fetchData(setColors, `users/${userId}/colors`);
        } else {
            const tempCourses = courses;
            setCourses(tempCourses);
        }
    }, [ courses ]);

    return (
        <div css={styles}>
            <h1>Courses</h1>
            { courses === undefined ? <div> Loading! </div> :
            <div id="course-container">
                {courses.map(course => (
                    <CourseBox key={course.id} color={colors} course={course}/>
                ))}
            </div>
            }
        </div>
    );
}
