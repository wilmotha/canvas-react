import React, { useEffect, useState } from 'react';
import { fetchData } from '../canvasApi';

function CourseBox(props) {
    const course = props.course;

    return (
        <div>
            <h2>{course.name}</h2>
        </div>
    );
}

export default function Courses() {
    const [ userCourses, setUserCourses ] = useState([]);

    useEffect(() => {
        if (userCourses.length === 0) {
            fetchData(setUserCourses, "courses?enrollment_state=active&include[]=term&include[]=total_students");
        }
    }, [ userCourses ])

    return (
        <div>
            <h1>Courses</h1>
            {console.log("COURSES: ", userCourses)}
            {userCourses.map(course => (
                <CourseBox course={course}/>
            ))}
        </div>
    );
}