/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { Links, useHistory, useParams, Route, Switch, useLocation } from 'react-router-dom';
import { fetchData, putData } from '../canvasApi';
import { useSelector, useDispatch } from 'react-redux';
import { getID, getCourses } from '../redux/selector';
import { store_courses } from '../redux/actions';
import Grades from './grades';


export default function CoursePage(props) {
    const courses = useSelector(getCourses);
    const dispatch = useDispatch();
    const course_id = useParams().course_id;
    const [ course, setCourse ] = useState({});
    const [ coursePages, setCoursePages ] = useState({});
    const history = useHistory();
    let location = useLocation();
    console.log(course_id);

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
        } 
        // fetchData(setCoursePages, `courses/${course_id}/pages?sort=title&order=asc`);
    }, [ course_id ])

    return (
        <div>
            <h1>{course.name}</h1>
            {console.log("Course: ", course)}
            {console.log("Pages: ", coursePages)}

            <Route>
                <Switch>
                    <Route path="/courses/:course_id/grades">
                        <Grades course={course}/>
                    </Route>
                   
                    <Route path="/courses/:course_id/assignments/:assignment_id">
                        <h1>Yeet</h1>
                    </Route>
                    <Route path="/courses/:course_id/assignments">
                        <h1>Assignments?</h1>
                    </Route>
                    <Route path="/courses/:course_id">
                        <button onClick={() => history.push(`${location.pathname}/grades`)}>Grades</button>
                    </Route>
                </Switch>
            </Route>
        </div>
    );
}