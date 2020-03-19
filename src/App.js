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

function App() {
  const [ loggedIn, setLoggedIn ] = useState(true);
  const [ watch, setWatch ] = useState(loggedIn);
  const dispatch = useDispatch();
  const id = useSelector(getID);

  const setId = user => {
    console.log(user);
    dispatch(set_id(user.id));
  }

  useEffect(() => {
    checkLoggedIn(setLoggedIn);
    if (loggedIn && id === "") {  
      fetchData(setId, "users/self");
    }
  }, [ watch ]);

  return (
    <div>
      <Main_Navbar css={{ display: 'inline-block', }}/>
      {/*<Course_Navbar css={{ display: 'inline-block', }}/>*/}
      <Login loggedIn={loggedIn} setWatch={setWatch} watch={watch} />
      {loggedIn ? <main>
        <Switch>
          {/*<Route exact path="/">
            <Redirect to='/courses'/>
          </Route>*/}
          <Route exact path="/courses">
            <Courses/>
          </Route>
          <Route path="/courses/:course_id">
            <CoursePage/>
          </Route>
        </Switch>
      </main> : null }
    </div>
  );
}

export default App;
