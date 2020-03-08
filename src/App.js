import React, { useState, useEffect } from 'react';
import Login from './components/tempLogin';
import { useSelector } from 'react-redux';
import { getToken } from './redux/selector';
import { fetchData } from './canvasApi';
import { Switch, Route } from 'react-router-dom';
import Courses from './pages/Courses';

function App() {
  const token = useSelector(getToken);
  const [ testData, setTestData ] = useState("");

  // this causes cors issue
  // useEffect(() => {
  //   if (token !== "" && testData === "") {
  //     fetchData(setTestData, "users/self");
  //   }
  // }, [ token, testData ])

  return (
    <div>
      {/* Navbar */}
      <main>
        <Switch>
          <Route exact path="/">
          {/* This can go away */}
            {!token ? 
              <div>
                <h1>canvas but better?</h1>
                <p> To get your token go to your canvas page,
                  then go to accounts->settings and then under
                  approved intergrations click + New Access Token
                </p>
              </div> : 
              <div>
                <h1> You are logged in! </h1>
                <button onClick={() => fetchData(setTestData, "users/self")}>CLICK ME</button>
                <h3>{testData.name}</h3>
                <img src={testData.avatar_url}/>
              </div>}
            <Login/>
          </Route>
          <Route path="/courses">
            <Courses/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
