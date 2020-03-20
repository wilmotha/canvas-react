/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { Links, useHistory, useParams, Route, Switch } from 'react-router-dom';
import { fetchData, putData } from '../canvasApi';
import { useSelector, useDispatch } from 'react-redux';
import { getID, getCourses } from '../redux/selector';
import { store_courses } from '../redux/actions';
import Data from './data/calenderEvents.json';

//prob wont need this anymore if we calling from api
function Events() {
  var array = [];
  Object.keys(Data).map(function(value) {
    array.push(
      <ul className="list-container">
      <h2>{Data[value].name}</h2>
      <h4>Price: {Data[value].due}</h4>
      </ul>
    );
  })
  return(array);
}

//this part was from earlier, prob wont need it anymore if i get the bottom portion to work

// class FetchCalenderData extends React.Component{
//
//   state = {
//     loading: true,
//     title: null
//
//   }
//
//   async componentMounted(){
//    const url = "https://canvas.instructure.com/doc/api/calendar_events.html";
//    const response = await fetch(url);
//    const data = await response.json();
//    this.setState({title: data.results[0], loading: false })
//    console.log(data.results[0]);
//
//
//   render() {
//     return (
//     <div>
//       {this.state.loading || !this.state.title ? (
//         <div> Loading Calender Events... </div>
//       ) : (
//         <div>
//           <div>{this.state.title}</div>
//           <div>{this.state.start_at}</div>
//           <div>{this.state.end_at}</div>
//           <div>{this.state.description}</div>
//           <div>{this.state.location_name}</div>
//           <div>{this.state.location_address}</div>
//           <div>{this.state.context_code}</div>
//           <div>{this.state.all_context_codes}</div>
//           <div>{this.state.workflow_state}</div>
//         </div>
//       )}
//     </div>
//   );
//   }
// }

export default function CalenderPage(props) {
  const events = useSelector(getEvents);
  const dispatch = useDispatch();
  const event_id = useParams().event_id;
  const [ event, setEvent ] = useState({});
  console.log(event_id);

  const setEvents = events => {
    dispatch(store_events(events));
  }


  useEffect(() => {
    if(events === undefined || events.length === 0) {
      fetchData(setEvents, "calendar_events");
    } else {
      const tempEvents = events;
      setEvents(tempEvents);
    }
    const checkEvents = events.filter(event => event.id == event_id);
    if (checkEvent.length > 0) {
      setEvent(checkEvents[0]);
    }
    //im not sure if this really how it works?
    fetchData(setCalenderPages, `events/${event_id}/calendar_events`);
  }, [ event_id ])

  return (
    <div>
      <h1>{event.name}</h1>
      {console.log("title: ", events)}

      <Route>
        <Switch>
          //maybe?
          <Route to="courses/:course_id/calender">
          </Route>
        </Switch>
      </Route>
    </div>
  );
}
