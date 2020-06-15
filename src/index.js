/**
 * Katie Cussans & Gino LaGuardia-LoBianco
 * CIS371: Web Application Development
 * 
 * Project #4: Weather Service Application using the National Weather Service API, Bootstrap and React
 *
 * This application queries the user's device for their location and then uses that data
 * to send a request to the National Weather Service API and displays the forecast retrieved
 * from the NWS database using React and Bootstrap.
 * 
 * ********************************************************************************************
 * NOTE: The bulk of the documentation and implementation details are in the Location.js file 
 * ********************************************************************************************
 */


import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Header.css';
import './Jumbotron.css';
import './Location.css';
import Header from './Header';
import Location from './Location';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Location />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
