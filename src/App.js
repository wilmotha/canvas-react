import React, { useState, useEffect } from 'react';
import Login from './components/tempLogin';
import { useSelector } from 'react-redux';
import { getToken } from './redux/selector';
import { fetchData } from './canvasApi';

function App() {
  const token = useSelector(getToken);
  const [ testData, setTestData ] = useState("");

  // this causes cors issue
  // useEffect(() => {
  //   if (token !== "" && testData === "") {
  //     fetchData(token, setTestData, "users/self");
  //   } 
  // }, [ token, testData ])

  return (
    <div>
      <Login/>
      {token === "" ? 
        <div>
          <h1>canvas but better?</h1>
          <p> To get your token go to your canvas page,
            then go to accounts->settings and then under
            approved intergrations click + New Access Token
          </p>
        </div> : 
        <div>
          <h1> You are logged in! </h1>
        </div>}
    </div>
  );
}

export default App;
