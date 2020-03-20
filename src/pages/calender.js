/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { Links, useHistory, useParams, Route, Switch } from 'react-router-dom';
import { fetchData, putData } from '../canvasApi';
import { useSelector, useDispatch } from 'react-redux';
import { getID, getEvents } from '../redux/selector';
import { store_events } from '../redux/actions';
import ReactDOM from 'react-dom';
// import Data from './data/calenderEvents.json';

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
      // i think that this should be all you need it should
      // set event to list of events in a json object
      fetchData(setEvents, "calendar_events?all_events=1");
      fetchData(setEvents, "calendar_events?type=event&type=assignment&context_codes[]=course_1785810");
      fetchData(setEvents, "calendar_events?type=assignment&context_codes[]=course_1785810");
    }
  }, [ events ]);

  return (
    <div>

    <h1>Calendar Events</h1>
    <h2>{events[0].title}</h2>
    <h4>Start at: {events[0].start_at}</h4>
    <h4>End at: {events[0].end_at}</h4>
    <h4>Location Name: {events[0].location_name}</h4>
    <h2>{events[1].title}</h2>
    <h4>Start at: {events[1].start_at}</h4>
    <h4>End at: {events[1].end_at}</h4>
    <h4>Location Name: {events[1].location_name}</h4>
    <h2>{events[2].title}</h2>
    <h4>Start at: {events[2].start_at}</h4>
    <h4>End at: {events[2].end_at}</h4>
    <h4>Location Name: {events[2].location_name}</h4>
    <h2>{events[3].title}</h2>
    <h4>Start at: {events[3].start_at}</h4>
    <h4>End at: {events[3].end_at}</h4>
    <h4>Location Name: {events[3].location_name}</h4>
    <h2>{events[4].title}</h2>
    <h4>Start at: {events[4].start_at}</h4>
    <h4>End at: {events[4].end_at}</h4>
    <h4>Location Name: {events[4].location_name}</h4>
    <h2>{events[5].title}</h2>
    <h4>Start at: {events[5].start_at}</h4>
    <h4>End at: {events[5].end_at}</h4>
    <h4>Location Name: {events[5].location_name}</h4>

      {console.log("Events: ", events)}

    </div>
  );
}

// class Reminder extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       reminder: "",
//
//     };
//   }
//   render() {
//     return (
//       <div className="Reminder">
//         <h1>Reminders</h1>
//         <h3>{this.state.reminder}</h3>
//         <a href="javascript:;">
//           Create a reminder
//         </a>
//       </div>
//     );
//   }
//
// }
//
// const rootElement = document.getElementById("root");
// ReactDOM.render(<Reminder />, rootElement);
