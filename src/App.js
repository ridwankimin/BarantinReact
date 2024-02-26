// import './App.css';
import Cookies from "js-cookie";
import Login from './layout/Login';
import Wrapper from './layout/Wrapper';

function App() {
  // console.log(Cookies.get("masterNegara"))
  // Cookies.remove("masterNegara");
  // Cookies.remove("token");
  // Cookies.remove("isLogin");
  // const SetCookie = () => {
    // Cookies.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
    //   expires: 7,
    // });
  // };
  // const setLogin = () => {
  //     Cookies.set("isLogin", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {
  //       expires: 7,
  //     });
  // };
  // console.log(Cookies.get("token"))
  // console.log(process.env)
  // console.log(process.env.REACT_APP_SESSION_SECRET)
  // console.log(process.env.REACT_APP_PUBLIC_URL)
  // console.log(process.env.PUBLIC_URL)
  // console.log(window.location.pathname)
  return (
    <>
      {/* <Wrapper /> */}
      {Cookies.get("isLogin") && Cookies.get("uptId") && Cookies.get("userId") && Cookies.get("kodeSatpel") ? <Wrapper /> : <Login />}
      
    </>
  );
}

export default App;
