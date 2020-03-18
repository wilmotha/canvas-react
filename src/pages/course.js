/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { Links, useHistory, useParams } from 'react-router-dom';
import { fetchData, putData } from '../canvasApi';
import { useSelector } from 'react-redux';
import { getID } from '../redux/selector';

export default function CoursePage(props) {
    const course_id = useParams().course_id;
    const [ course, setCourse ] = useState({});
    console.log(course_id);

    useEffect(() => {
        fetchData(setCourse, `courses/${course_id}`);
    }, [ course_id ])

    return (
        <div>
            <h1>{course.name}</h1>
            {console.log("Course: ", course)}
        </div>
    );
}