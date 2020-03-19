/** @jsx jsx */
import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import {css, jsx, Global} from '@emotion/core'

class Nav_Course extends React.Component{
	render(){
		return(
			<div className="course-navbar">
				<Global styles={css`
					.course-navbar{
						background-color: #d0d0d0;
						display: inline-block;
						width: calc(100vw - 145pt)
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
				<NavLink to="/courses/assignment" className="course-navlink" activeClassName="course-nav-active">Assignments</NavLink>
				<NavLink to="/courses/grades" className="course-navlink" activeClassName="course-nav-active">Grades</NavLink>
				<Link to="/courses" className="course-navlink right" >Change Course</Link>
			</div>
			
		)
	}
}

export default Nav_Course