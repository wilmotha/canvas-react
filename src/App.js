/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import Login from './components/login';
import { useSelector, useDispatch } from 'react-redux';
import { getID } from './redux/selector';
import { fetchData, checkLoggedIn } from './canvasApi';
import { Switch, Route, Redirect } from 'react-router-dom';
import Courses from './pages/Courses';
import CoursePage from './pages/course';
import CalenderPage from './pages/calender';
import { set_id, remove_courses } from './redux/actions';
import Main_Navbar from './components/navbar-main'
import Logout from './components/logout';
import Account from './pages/account'
import Inbox from './pages/inbox'
import {css, jsx, Global} from '@emotion/core'

function App() {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ watch, setWatch ] = useState(loggedIn);
  const dispatch = useDispatch();
  const id = useSelector(getID);

  const setId = user => {
    console.log(user);
    dispatch(set_id(user.id));
  }


  useEffect(() => {
    checkLoggedIn(setLoggedIn);
  }, [ watch ]);

  useEffect(() => {
    if (loggedIn && id === "") {
      fetchData(setId, "users/self");
    }
  }, [ loggedIn ])

  return (
    <div>

      <Main_Navbar css={{ position: 'absolute'}}/>


      <Logout setWatch={setWatch}/>
      <main css={{ display: 'inline-block', verticalAlign: 'top', maxWidth: 'calc(100vw - 145pt)'}}>
        <Logout setWatch={setWatch}/>
        <Switch>
          <Route path="/login/:prev_url">
            <Login loggedIn={loggedIn} setWatch={setWatch} watch={watch} />
          </Route>
          <Route exact path="/">
            {/* <Redirect to='/courses'/> */}
          </Route>
          <Route exact path="/courses">
            <Courses/>
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/courses/:course_id">
            <CoursePage/>
          </Route>
          <Route path="/calendar">
            <CalenderPage/>
          </Route>
          <Route path="/inbox">
            <Inbox user={id} />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
