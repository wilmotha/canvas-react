/** @jsx jsx */
import React from 'react'

import {css, jsx, Global} from '@emotion/core'

// this is a modification of fetchData() in canvasApi.js
// the original function is a React hook, this is a standard JS async function
async function getProfile(){
	let responseBody = {};
    
	try {
		const response = await fetch(
			"/get/users/self/profile", 
			{
				method: 'GET',
			}
		);
		responseBody = await response.json();
	} catch(e) {
		console.log("oops... ", e);
	}

	//console.log("getProfile")
	//console.log(responseBody.results);
	return JSON.parse(responseBody.results);
}

class Account_Page extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			name: "Loading",
			email: "",
			bio: "Getting data from Canvas...",
			photo_url: "",
		}
	}

	async componentDidMount(){
		var profile = await getProfile();
		//console.log("Profile object:")
		//console.log(profile)
		this.setState({
			name: profile.name,
			email: profile.primary_email,
			bio: profile.bio,
			photo_url: profile.avatar_url,
		})
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