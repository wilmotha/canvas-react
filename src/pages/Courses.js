/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { Links, useHistory } from 'react-router-dom';
import { fetchData, putData } from '../canvasApi';
import { useSelector } from 'react-redux';
import { getID } from '../redux/selector';

const tempCourses = [
    {
        id: 10020000001760288,
        name: "Adv Web Dev",
        course_code: "ST/ ADVANCED WEB DEVELOPMENT (CS_419_005_W2020)",
        term: {
            name: "Winter 2020"
        },
    },
    {
        id: 10020000001750924,
        name: "Capstone",
        course_code: "SENIOR SOFTWARE ENGIN PROJECT (CS_462_001_W2020)",
        term: {
            name: "Winter 2020"
        },
    },
    {
        id: 10020000001771940,
        name: "CS161 - Class",
        course_code: "INTRO TO COMPUTER SCIENCE I (CS_161_C020_W2020)",
        term: {
            name: "Winter 2020"
        },
    },

    {
        id: 10020000001750946,
        name: "Mobile Dev",
        course_code: "MOBILE SOFTWARE DEVELOPMENT (CS_492_001_W2020)",
        term: {
            name: "Winter 2020"
        },
    },
    {
        id: 10020000001755508,
        name: "Swim",
        course_code: "SWIM II (PAC_252_026_W2020)",
        term: {
            name: "Winter 2020"
        },
    }
];

const color = {
    custom_colors: {
        course_10020000001609640: "#F8971C",
        course_10020000001607073: "#43A047",
        course_10020000001604127: "#EF4437",
        course_10020000001605316: "#2083C5",
        course_10020000001606700: "#626E7B",
        course_10020000001602352: "#4554A4",
        course_10020000001620672: "#EF4437",
        course_10020000001616197: "#324A4D",
        course_10020000001637191: "#324A4D",
        course_10020000001622254: "#2083C5",
        course_10020000001616202: "#324A4D",
        course_10020000001620207: "#09BCD3",
        course_10020000001622257: "#2083C5",
        course_10020000001634451: "#f8971c",
        course_10020000001627251: "#4cae4e",
        course_10020000001631804: "#09BCD3",
        course_10020000001627268: "#4cae4e",
        course_10020000001627264: "#4cae4e",
        course_10020000001634457: "#f8971c",
        course_10020000001651532: "#4cae4e",
        course_10020000001648324: "#4554A4",
        course_10020000001654546: "#f8971c",
        course_10020000001654034: "#4554A4",
        course_10020000001654550: "#F8971C",
        course_10020000001667961: "#F8971C",
        course_10020000001665692: "#43A047",
        course_10020000001666918: "#EF4437",
        course_10020000001688571: "#0076B8",
        course_10020000001672895: "#E1185C",
        course_10020000001678038: "#43A047",
        course_10020000001674738: "#D41E00",
        course_10020000001674418: "#254284",
        course_10020000001674745: "#D41E00",
        course_10020000001725991: "#E1185C",
        course_10020000001726585: "#626E7B",
        course_10020000001692827: "#8D9900",
        course_10020000001692828: "#8D9900",
        course_10020000001726042: "#3C4F36",
        course_10020000001692862: "#D97900",
        course_10020000001692915: "#0076B8",
        course_10020000001692864: "#D97900",
        course_10020000001689231: "#65499D",
        user_10020000006169750: "#5a92de",
        group_10020000000316991: "#809b36",
        course_10020000001706562: "#4554A4",
        course_10020000001712150: "#0B9BE3",
        course_10020000001706912: "#009688",
        course_10020000001706915: "#009688",
        course_10020000001706567: "#E1185C",
        course_10020000001733516: "#F4511E",
        course_10020000001725107: "#864E99",
        course_10020000001719565: "#F6BF26",
        course_10020000001719567: "#33B679",
        course_10020000001716178: "#7986CB",
        course_10020000001737574: "#F4511E",
        course_10020000001738840: "#864e99",
        course_10020000001738837: "#864e99",
        course_10020000001744361: "#864e99",
        course_10020000001772086: "#33B679",
        course_10020000001735676: "#7986CB",
        course_10020000001742314: "#F6BF26",
        course_10020000001771939: "#AD1457",
        course_10020000001760288: "#F6BF26",
        course_10020000001750925: "#7986CB",
        course_10020000001750946: "#33B679",
        course_10020000001755507: "#039BE5",
        group_10020000000367647: "#2b7ba9"
    }
}

// This works, but we don't have authorization:(
function Model(props) {
    const [ name, setName ] = useState("");
    const [ color, setColor ] = useState("");
    const userId = useSelector(getID);


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
            <div>We don't have authorization :(</div>
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
    const color = props.color.custom_colors[colorKey] != null ? props.color.custom_colors[colorKey] : '#394B58';

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
                <div class="boxes" id="title">
                    <h2>{course.name}</h2>
                    <button onClick={() => setModel(!model)}>︙</button>
                </div>
                <div class="boxes" id="info">
                    <div id="course-code">{course.course_code}</div>
                    <div>{course.term ? course.term.name : null}</div>
                </div>
            </div>
            {model ? <Model id={course.id} name={course.name} asset_string={colorKey} color={color} setModel={() => setModel(false)}/> : null}
        </>
    );
}

export default function Courses() {
    const [ userCourses, setUserCourses ] = useState([]);
    const [ courseColors, setColors ] = useState({})
    const userId = useSelector(getID);

    const styles = css`
        #course-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: start;
        }
    `;

    useEffect(() => {
        if (userCourses.length === 0) {
            console.log(userId);
            fetchData(setUserCourses, "courses?enrollment_state=active&include[]=term&include[]=total_students");
            fetchData(setColors, `users/${userId}/colors`);
        }
    }, [ userCourses ])

    return (
        <div css={styles}>
            <h1>Courses</h1>
            {console.log("COURSES: ", userCourses)}
            {console.log("Colors: ", courseColors)}
            <div id="course-container">
                {userCourses.map(course => (
                    <CourseBox key={course.id} color={courseColors} course={course}/>
                ))}
            </div>
        </div>
    );
}