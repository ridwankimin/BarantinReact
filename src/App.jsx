// import './App.css';
import Cookies from "js-cookie";
import Login from './layout/Login';
// import Wrapper from './layout/Wrapper';
import WithRouter from "./layout/WithRouter";
import React from 'react';

function App() {
  let page
  if(Cookies.get("isLogin") && Cookies.get("uptId") && Cookies.get("userId") && Cookies.get("kodeSatpel")) {
    page = <WithRouter />
  } else {
    page = <Login />
  }
  return (
    <>
    {page}
    </>
  );
}

export default App;
