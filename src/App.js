import React, { useState, useEffect } from 'react';
import Login from './components/tempLogin';
import { useSelector } from 'react-redux';
import { getToken, getCourses } from './redux/selector';
import { fetchData, checkLoggedIn } from './canvasApi';
import { Switch, Route, useHistory } from 'react-router-dom';
import Courses from './pages/Courses';
import CoursePage from './pages/course';

function App() {
  const [loggedIn, setLoggedIn ] = useState(false);
  const courses = useSelector(getCourses);

  useEffect(() => {
    checkLoggedIn(setLoggedIn);
  }, [ courses ])

  return (
    <div>
      {/* Navbar */}
      <Login loggedIn={loggedIn} />
      {loggedIn ? <main>
        <Switch>
          <Route exact path="/">
          </Route>
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
