import Cookies from 'js-cookie'
import React, { useState } from 'react'
import logbar from '../logo/barantinb.jpeg'
import UserDummy from '../model/master/userDummy.json'
// import { useNavigate } from 'react-router-dom';

function setLoginUser(e) {
        return UserDummy.find((element) => element.username === e)
}

function Login() {
    require('./styleLogin.css')
    // let navigate = useNavigate();
    let [user, setUser] = useState("")
    let [password, setPassword] = useState("")
    
    const handleFormLogin = (e) => {
        e.preventDefault();
        const dataUser = setLoginUser(user)
        // console.log(dataUser.nama_upt)
        // console.log(user + password)
        // alert("user :" + user)
        Cookies.set("isLogin", true, {
            expires: 1,
        });

        Cookies.set("userId", dataUser.id);
        Cookies.set("uptId", dataUser.id_upt);
        Cookies.set("kodeSatpel", dataUser.kode_satpel);
        Cookies.set("namaUpt", dataUser.nama_upt);
        Cookies.set("namaSatpel", dataUser.nama_satpel);

        // alert('A name was submitted: ' + this.state.value);
        alert("login berhasil")
        window.location.reload();
        // navigate("/")
    }
  return (
    <div className="form-bg">
        <div className="container">
            <div className="row">
                <center>
                    <img style={{marginTop: "5%"}} src="http://qsdm.karantina.pertanian.go.id/q-dashboard/templates/img/logo_barantin.png" alt="BARANTIN" width="100px" />
                </center>
                <center>
                    <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6">
                        <div className="form-container" style={{textAlign: 'center'}}>
                            <form className="form-horizontal" onSubmit={handleFormLogin}>
                                <img style={{width: "100%"}} src={logbar} alt="BARANTIN" height="80px" />
                                <h3 className="title">Silahkan login untuk memulai aplikasi</h3>
                                <div className="form-group">
                                    <span className="input-icon"><i className="fa fa-user"></i></span>
                                    <input className="form-control" value={user} onChange={(e) => setUser(e.target.value)} type="text" name="username" id="username" placeholder="Username" required />
                                </div>
                                <div className="form-group">
                                    <span className="input-icon"><i className="fa fa-lock"></i></span>
                                    <input className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" required />
                                </div>
                                <button type="submit" className="btn signin">Log in</button>
                            </form>
                        </div>
                    </div>
                </center>
            </div>
        </div>
    </div>
  )
}

export default Login