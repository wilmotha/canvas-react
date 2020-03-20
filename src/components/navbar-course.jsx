/** @jsx jsx */
import React from 'react'
import {Link, NavLink, useLocation} from 'react-router-dom';
import {css, jsx, Global} from '@emotion/core'

function Nav_Course(props) {
	return(
		<div className="course-navbar">
			<Global styles={css`
				.title {
					color: ghostwhite;
            		text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
					margin-left: 15px;
				}
				.course-navbar{
					background-color: #394B58;
					display: inline-block;
					width: calc(100vw - 145pt)
				}
				.navlink-holder {
					background-color: #D0D0D0;
				}
				.course-navlink{
					color: #000000;
					text-decoration: none;
					font-size: 16pt;
					width: 8em;
					padding-left: 4pt;
					padding-right: 4pt;
					line-height: 2em;
					text-align: center;
					display: inline-block;
				}
				.course-navlink:hover{
					background-color: #f7a162;
				}
				.course-nav-active{
					background-color: #D73F09;
					color: #ffffff;
				}
				.right{
					float: right;
					width: 10em;
				}
			`}/>
			<h2 className="title"> {props.name} </h2>
			<div className="navlink-holder">
				<NavLink to={`/courses/${props.course_id}/assignments`} className="course-navlink" activeClassName="course-nav-active">Assignments</NavLink>
				<NavLink to={`/courses/${props.course_id}/grades`} className="course-navlink" activeClassName="course-nav-active">Grades</NavLink>
				<Link to="/courses" className="course-navlink right" >Change Course</Link>
			</div>
		</div>	
	)
}

export default Nav_Course