/* eslint-disable eqeqeq */
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import logbar from '../logo/barantinb.jpeg'
import UserDummy from '../model/master/userDummy.json'
import Swal from 'sweetalert2'
import LogoBarantin from '../assets/logo/logo_barantin.png'

function setLoginUser(e) {
    return UserDummy.find((element) => element.username === e)
}

function Login() {
    import('./styleLogin.css')
    let [user, setUser] = useState("")
    let [password, setPassword] = useState("")
    
    const handleFormLogin = (e) => {
        e.preventDefault();
        const dataUser = setLoginUser(user)
        if(dataUser == undefined) {
            Swal.fire({
                title: "Login gagal!",
                text: "Username tidak ada, mohon cek username anda.",
                icon: "error"
            });
        } else {
            if(password == "admin@123!") {
                Cookies.set("isLogin", true, {
                    expires: 1,
                });
                
                Cookies.set("userId", dataUser.id, {expires: 7});
                Cookies.set("uptId", dataUser.id_upt, {expires: 7});
                Cookies.set("username", dataUser.username, {expires: 7});
                Cookies.set("kodeSatpel", dataUser.kode_satpel, {expires: 7});
                Cookies.set("namaUpt", dataUser.nama_upt, {expires: 7});
                Cookies.set("namaSatpel", dataUser.nama_satpel, {expires: 7});
        
                Swal.fire({
                    title: "Login berhasil!",
                    icon: "success"
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            } else {
                Swal.fire({
                    title: "Login gagal!",
                    text: "Password salah.",
                    icon: "error"
                });
            }
        }
    }
  return (
    <div className='form-bg'>
        <div className="container">
            <div className="row">
                <center>
                    <img style={{marginTop: "5%"}} src={LogoBarantin} alt="BARANTIN" width="160px" />
                </center>
                <center>
                    <div className="col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6">
                        <div className="form-container" style={{textAlign: 'center'}}>
                            <form className="form-horizontal" onSubmit={handleFormLogin}>
                                <img className='mb-3' style={{width: "100%"}} src={logbar} alt="BARANTIN" height="80px" />
                                <div className="form-group">
                                    <span className="input-icon"><i className="fa fa-user"></i></span>
                                    <input className="form-control" value={user} onChange={(e) => setUser(e.target.value)} type="text" name="username" id="username" placeholder="Username" autoComplete="off" required />
                                </div>
                                <div className="form-group">
                                    <span className="input-icon"><i className="fa fa-lock"></i></span>
                                    <input className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" autoComplete="off" required />
                                </div>
                                <h4 className='mb-0'><u>Level User</u></h4>
                                <div className="row">
                                    <div className='offset-md-1 col-md-5' style={{textAlign: "left"}}>
                                        <label style={{marginRight: "20px"}}><input type="radio" name="e" /> Kepala</label>
                                        <label style={{marginRight: "20px"}}><input type="radio" name="e" /> Supervisor</label>
                                        <label style={{marginRight: "20px"}}><input type="radio" name="e" /> Analyzing Point</label>
                                        <label style={{marginRight: "20px", marginBottom: "20px"}}><input type="radio" name="e" /> Fungsional</label>
                                    </div>
                                    <div className='offset-md-1 col-md-5' style={{textAlign: "left"}}>
                                        <label style={{marginRight: "20px"}}><input type="radio" name="e" /> Admin</label>
                                        <label style={{marginRight: "20px"}}><input type="radio" name="e" /> Gakkum</label>
                                        <label style={{marginRight: "20px"}}><input type="radio" name="e" /> Bendahara</label>
                                    </div>
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