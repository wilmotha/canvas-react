import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Route, Switch, useLocation } from 'react-router-dom';
import { fetchData } from '../canvasApi';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses } from '../redux/selector';
import { store_courses } from '../redux/actions';
import Grades from './grades';
import Course_Navbar from '../components/navbar-course'


export default function CoursePage(props) {
    const courses = useSelector(getCourses);
    const dispatch = useDispatch();
    const course_id = useParams().course_id;
    const [ course, setCourse ] = useState({});
    const history = useHistory();
    let location = useLocation();

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
    }, [ course_id ])

    return (
        <div>
            <h1>{course.name}</h1>

            <Course_Navbar />

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