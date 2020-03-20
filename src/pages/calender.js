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
    {events.map((item) => 
      <div>
        <h2>{item.title}</h2>
        <h4>Start at: {item.start_at}</h4>
        <h4>End at: {item.end_at}</h4>
        <h4>Location Name: {item.location_name}</h4>
      </div>
    )}

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
