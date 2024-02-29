/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import Content from './Content'
import Cookies from 'js-cookie';

function getWarna() {
    if(Cookies.get("jenisKarantina") == "H") {
        return "purple"
    } else if(Cookies.get("jenisKarantina") == "I") {
        return "orange"
    } else if(Cookies.get("jenisKarantina") == "T") {
        return "green"
    } else {
        return ""
    }
}
function Footer(props) {
    let [warnaKarantina] = useState(getWarna())
    
    const handleLogout = () => {
        Cookies.remove("isLogin");
        // alert('A name was submitted: ' + this.state.value);
        alert("logout berhasil")
        // navigate('/')
        window.location.reload();
    }
    
  return (
    <div className="layout-page">
        <nav className="layout-navbar navbar navbar-expand-xl align-items-center" style={{background: '#123138', backgroundImage: ("linear-gradient(to bottom right, " + warnaKarantina + ", #123138)")}} id="layout-navbar">
        {/* <nav className="layout-navbar navbar navbar-expand-xl align-items-center" style={{background: '#123138'}} id="layout-navbar"> */}
            <div className="container-fluid">
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a href='#layout-menu' onClick={props.clicked} className="btn btn-default nav-item nav-link px-0 me-xl-4 text-lightest">
                        <i className="fa fa-solid fa-bars"></i>
                    </a>
                </div>
                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    <h4 className='text-lightest mt-3'>-- {Cookies.get("namaSatpel")} --</h4>

                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        <a href='https://karantinaindonesia.go.id' target='_blank' rel='noreferrer' className='btn btn-sm btn-default text-white' title='SIMPONI'><i className="menu-icon tf-icons fa-solid fa-credit-card"></i></a>
                        <a href='https://karantinaindonesia.go.id' target='_blank' rel='noreferrer' className='btn btn-sm btn-default text-white' title='TTE'><i className="menu-icon tf-icons fa-solid fa-file-signature"></i></a>
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <button type='button' className="btn btn-default nav-link dropdown-toggle" data-bs-toggle="dropdown" style={{color: 'white'}}>
                                <i className="menu-icon tf-icons fa-regular fa-circle-user"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <button type='button' className="btn btn-default dropdown-item">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar avatar-online">
                                                    <i className="menu-icon tf-icons fa-solid fa-user"></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <span className="fw-semibold d-block lh-1">{Cookies.get("namaUpt") ? Cookies.get("namaUpt").replace("Balai Karantina Hewan, Ikan dan Tumbuhan", "BKHIT").replace("Balai Besar Karantina Hewan, Ikan dan Tumbuhan", "BBKHIT") : ""}</span>
                                                <small>{Cookies.get("username")}</small>
                                            </div>
                                        </div>
                                    </button>
                                </li>
                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <button type='button' className="dropdown-item">
                                        <i className="bx bx-cog me-2"></i>
                                        <span className="align-middle">Settings Satpel</span>
                                    </button>
                                </li>
                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <button type='button' className="dropdown-item" onClick={handleLogout}>
                                        <i className="bx bx-power-off me-2"></i>
                                        <span className="align-middle">Log Out</span>
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                
            </div>
        </nav>

        <div className="content-wrapper">
            <Content />
            
            <footer className="content-footer footer bg-footer-theme">
                <div className="container-fluid d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                    <div className="mb-2 mb-md-0">
                       v.{process.env.REACT_APP_VERSION} © - Badan Karantina Indonesia
                    </div>
                </div>
            </footer>

            <div className="content-backdrop fade"></div>
        </div>
    </div>
  )
}

export default Footer