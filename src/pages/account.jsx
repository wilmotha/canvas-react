/** @jsx jsx */
import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import {css, jsx, Global} from '@emotion/core'

class Account_Page extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			name: "This guy",
			email: "username@server.tld",
			bio: "Wait, who is This guy again?",
			photo_url: "https://upload.wikimedia.org/wikipedia/commons/3/35/ISO_7010_E002.svg",
		}
	}
	render(){
		return(
			<div>
				<Global styles={css`
					.photo{
						max-width: 200px;
						max-height: 200px;
						display: inline-block;
						vertical-align: top;
						margin: 16pt;
					}
					.user-info-container{
						display: inline-block;
						vertical-align: top;
					}
				`}/>
				<img src={this.state.photo_url} className="photo" />
				<div className="user-info-container">
					<h1>{this.state.name}</h1>
					<h2><a href={"mailto:" + this.state.email}>{this.state.email}</a></h2>
					<h4>{this.state.bio}</h4>
				</div>
			</div>
		)
	}
}
export default Account_Page