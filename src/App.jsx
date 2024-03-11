// import './App.css';
import Cookies from "js-cookie";
import Login from './layout/Login';
// import Wrapper from './layout/Wrapper';
import WithRouter from "./layout/WithRouter";

function App() {
  return (
    <>
      {Cookies.get("isLogin") && Cookies.get("uptId") && Cookies.get("userId") && Cookies.get("kodeSatpel") ? <WithRouter /> : <Login />}
    </>
  );
}

export default App;
