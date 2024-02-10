import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { LoginSignup } from './Components/Login/LoginSignup';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login/Login';
import Verification  from './Components/Login/Verification'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <LoginSignup /> */}
    {/* <Login /> */}
    <Verification />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
