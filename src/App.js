/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import Login from './components/login';
import { useSelector, useDispatch } from 'react-redux';
import { getID } from './redux/selector';
import { fetchData, checkLoggedIn } from './canvasApi';
import { Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
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
  const history = useHistory();
  let location = useLocation();


  const styles = css`
    display: flex;
  `;

  // useEffect(() => {
  //   // reset redux
  //   const interval = setInterval(() => {
  //     dispatch(remove_courses);
  //   }, 1000 * 60 * 60);
  //   return () => clearInterval(interval);
  // }, []);

  const setId = user => {
    dispatch(set_id(user.id));
  }

  const handleLoginState = state => {
    if (state === false) {
      history.push(`/login/${location.pathname}`);
    }
    setLoggedIn(state);
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
    <div css={styles}>
      <Main_Navbar setWatch={setWatch} css={{ position: 'absolute'}}/>
      <main css={{ 'margin-left': '125pt', display: 'inline-block', verticalAlign: 'top', maxWidth: 'calc(100vw - 145pt)'}}>
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
