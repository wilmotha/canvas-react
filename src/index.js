import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

import App from './App';

const globalStyles = css`
    @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet');
    body {
        font-family: 'Open Sans', sans-serif;
      }
    `;


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Global styles={globalStyles} />
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
