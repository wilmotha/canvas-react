import React, { useState, useEffect } from 'react';
import Login from './components/login';
import { useSelector, useDispatch } from 'react-redux';
import { getID } from './redux/selector';
import { fetchData, checkLoggedIn } from './canvasApi';
import { Switch, Route, Redirect } from 'react-router-dom';
import Courses from './pages/Courses';
import CoursePage from './pages/course';
import { set_id, remove_courses } from './redux/actions';
import Main_Navbar from './components/navbar-main'
import Course_Navbar from './components/navbar-course' // for testing only, it should only appear on Course page
import Logout from './components/logout';

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
      <Main_Navbar css={{ display: 'inline-block', }}/>
      <Logout setWatch={setWatch}/>
      <main>
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
          <Route path="/courses/:course_id">
            <CoursePage/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
