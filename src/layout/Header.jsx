/* eslint-disable react/prop-types */
/* eslint-disable eqeqeq */
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import ChangeLog from '../component/modal/ChangeLog';

function getWarna() {
    if(Cookies.get("jenisKarantina") == "H") {
        return "#720e9e"
    } else if(Cookies.get("jenisKarantina") == "I") {
        return "#00BFFF"
    } else if(Cookies.get("jenisKarantina") == "T") {
        return "#006A4E"
    } else {
        return ""
    }
}

function Header(props) {
    let [warnaKarantina] = useState(getWarna())

    const handleLogout = () => {
        Cookies.remove("isLogin");
        Cookies.remove("userId");
        Cookies.remove("uptId");
        Cookies.remove("username");
        Cookies.remove("kodeSatpel");
        Cookies.remove("namaUpt");
        Cookies.remove("namaSatpel");
        
        Swal.fire({
            icon: "success",
            title: "Berhasil logout!",
            showConfirmButton: false,
            timer: 1000
        })
        setTimeout(() => {
            window.location.reload();
        }, 1050)
    }

  return (
    <>
        <nav className="layout-navbar navbar navbar-expand-xl align-items-center" style={{background: '#123138', backgroundImage: ("linear-gradient(to bottom right, " + warnaKarantina + ", #123138)")}} id="layout-navbar">
            <div className="container-fluid">
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a href='#layout-menu' onClick={props.clicked} className="btn btn-default nav-item nav-link px-0 me-xl-4 text-lightest">
                        <i className="fa fa-solid fa-bars"></i>
                    </a>
                </div>
                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    <h4 className='text-lightest mt-3' style={{textShadow: "2px 2px 4px #000000"}}>-- {Cookies.get("namaSatpel")} --</h4>

                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        <a href='https://karantinaindonesia.go.id' target='_blank' rel='noreferrer' className='btn btn-sm btn-default text-white' title='ECERT'><i className="menu-icon tf-icons fa-solid fa-file-pdf"></i></a>
                        <a href='https://pnbp.karantinaindonesia.id/' target='_blank' rel='noreferrer' className='btn btn-sm btn-default text-white' title='PNBP/SIMPONI'><i className="menu-icon tf-icons fa-solid fa-file-invoice-dollar"></i></a>
                        <a href='https://apps.karantinaindonesia.go.id/digicert' target='_blank' rel='noreferrer' className='btn btn-sm btn-default text-white' title='TTE'><i className="menu-icon tf-icons fa-solid fa-file-signature"></i></a>
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
                                {/* <li>
                                    <button type='button' className="dropdown-item">
                                        <i className="bx bx-cog me-2"></i>
                                        <span className="align-middle">Settings Satpel</span>
                                    </button>
                                </li> */}
                                <li>
                                    <button type='button' className="dropdown-item" data-bs-toggle="modal" data-bs-target="#modLog">
                                        <i className="fa-solid fa-clock-rotate-left me-2"></i>
                                        <span className="align-middle">Change Log</span>
                                    </button>
                                </li>
                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <button type='button' className="dropdown-item" onClick={handleLogout}>
                                        <i className="fa-solid fa-right-from-bracket me-2"></i>
                                        <span className="align-middle">Log Out</span>
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <ChangeLog/>
    </>
  )
}

export default Header