import React from 'react'
import Content from './Content'
import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';

function Footer() {
    // let navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove("isLogin");
        // alert('A name was submitted: ' + this.state.value);
        alert("logout berhasil")
        // navigate('/')
        window.location.reload();
    }
  return (
    <div className="layout-page">
                <nav className="layout-navbar navbar navbar-expand-xl align-items-center" style={{background: '#123138'}} id="layout-navbar">
                    <div className="container-fluid">
                        
                        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

                            <ul className="navbar-nav flex-row align-items-center ms-auto">
                                
                                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" style={{color: 'white'}}>
                                        {/* <div className="avatar avatar-online"> */}
                                        <i className="menu-icon tf-icons fa-regular fa-circle-user"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a className="dropdown-item" href="pages-account-settings-account.html">
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0 me-3">
                                                        <div className="avatar avatar-online">
                                                        <i className="menu-icon tf-icons bx bx-user-circle"></i>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <span className="fw-semibold d-block lh-1">John Doe</span>
                                                        <small>Admin</small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="dropdown-divider"></div>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="pages-profile-user.html">
                                                <i className="bx bx-user me-2"></i>
                                                <span className="align-middle">My Profile</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="pages-account-settings-account.html">
                                                <i className="bx bx-cog me-2"></i>
                                                <span className="align-middle">Settings</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="pages-account-settings-billing.html">
                                                <span className="d-flex align-items-center align-middle">
                                                    <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                                                    <span className="flex-grow-1 align-middle">Billing</span>
                                                    <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="dropdown-divider"></div>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="pages-help-center-landing.html">
                                                <i className="bx bx-support me-2"></i>
                                                <span className="align-middle">Help</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="pages-faq.html">
                                                <i className="bx bx-help-circle me-2"></i>
                                                <span className="align-middle">FAQ</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="pages-pricing.html">
                                                <i className="bx bx-dollar me-2"></i>
                                                <span className="align-middle">Pricing</span>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="dropdown-divider"></div>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" onClick={handleLogout}>
                                                <i className="bx bx-power-off me-2"></i>
                                                <span className="align-middle">Log Out</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div className="navbar-search-wrapper search-input-wrapper d-none">
                            <input type="text" className="form-control search-input container-fluid border-0" placeholder="Search..." aria-label="Search..." />
                            <i className="bx bx-x bx-sm search-toggler cursor-pointer"></i>
                        </div>
                    </div>
                </nav>

                <div className="content-wrapper">
                    <Content/>
                    {/* {link} */}

                    <footer className="content-footer footer bg-footer-theme">
                        <div className="container-fluid d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                            <div className="mb-2 mb-md-0">
                                © - Badan Karantina Indonesia
                            </div>
                        </div>
                    </footer>

                    <div className="content-backdrop fade"></div>
                </div>
    </div>
  )
}

export default Footer