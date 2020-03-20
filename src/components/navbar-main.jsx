/** @jsx jsx */
import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import {css, jsx, Global} from '@emotion/core'
import Logout from './logout';

class Nav_Main extends React.Component {
	render(){
		return(
			<div className="main-navbar">
				<Global styles={css`
					.main-navbar{
						position: fixed;
						background-color: #d0d0d0;
						display: inline-block;
						height: 100vh;
					}
					.main-navlink{
						color: #000000;
						text-decoration: none;
						width: 120pt;
						font-size: 20pt;
						padding-left: 4pt;
						padding-right: 4pt;
						line-height: 2em;
						display: block;
					}
					.main-navlink:hover{
						background-color: #f7a162;
					}
					.main-nav-active{
						background-color: #D73F09;
						color: #ffffff;
					}
				`}/>
				<NavLink to="/account" className="main-navlink" activeClassName="main-nav-active">Account</NavLink>
				<NavLink to="/courses" className="main-navlink" activeClassName="main-nav-active">Courses</NavLink>
				<NavLink to="/calendar" className="main-navlink" activeClassName="main-nav-active">Calendar</NavLink>
				<NavLink to="/inbox" className="main-navlink" activeClassName="main-nav-active">Inbox</NavLink>
   			    <Logout setWatch={this.props.setWatch}/>
			</div>
			
		)
	}
}

export default Nav_Main