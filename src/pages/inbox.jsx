/** @jsx jsx */
import React from 'react'
import {css, jsx, Global} from '@emotion/core'

// this is a modification of fetchData() in canvasApi.js
// the original function is a React hook, this is a standard JS async function
async function getConvos(user){
	let responseBody = {};

	try {
		const response = await fetch(
			"/get/conversations",
			{
				method: 'GET',
			}
		);
		responseBody = await response.json();
	} catch(e) {
		console.log("oops... ", e);
	}

	//console.log("getConvos")
	//console.log(responseBody.results);
	return JSON.parse(responseBody.results);
}

class Inbox extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			list: [{subject: "Loading", context_name: "Getting data from Canvas..."}]
		}
		this.componentDidMount = this.componentDidMount.bind(this)
	}

	async componentDidMount(){
		//console.log(this.props.user)
		var Convos = await getConvos(this.props.user);
		//console.log("Conversation list:")
		//console.log(Convos)
		this.setState({list: Convos})
	}

	render(){
		return(
			<div>
				<Global styles={css`
					.container{
						display: inline-block;
						vertical-align: top;
					}
					.item{
						display: block;
						border-top: 2px solid black;
					}
					.date-posted{
						color: #404040;
					}
				`}/>
				<h1>Inbox</h1>
				<div className="container">
					{this.state.list.map((item) =>
						<div className="item" key={item.id}>
							<h2>{item.subject}</h2>
							<h3>{item.context_name}</h3>
							<div className="date-posted">{item.last_message_at}</div>
							<div>{item.last_message}</div>
						</div>
					)}
				</div>
			</div>
		)
	}
}
export default Inbox
