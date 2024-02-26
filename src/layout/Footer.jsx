import React from 'react'
import Content from './Content'
import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
function Footer(props) {
    // let navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove("isLogin");
        // alert('A name was submitted: ' + this.state.value);
        alert("logout berhasil")
        // navigate('/')
        window.location.reload();
    }

    // let[showMenu, setShowMenu] = useState(Cookies.get("showmenu"))
    function menuKecil(e) {
        e.preventDefault();
        console.log(props.setShowMenu(!props.showMenu))
        // setShowMenu(!showMenu)
        // // this.state = {username: ''}
        // Cookies.set("showmenu", showMenu)
        // console.log(Cookies.get("showmenu"))
    }
  return (
    <div className="layout-page">
        <nav className="layout-navbar navbar navbar-expand-xl align-items-center" style={{background: '#123138'}} id="layout-navbar">
            <div className="container-fluid">
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <button type='button' onClick={menuKecil} className="nav-item nav-link px-0 me-xl-4 text-lightest">
                        <i className="fa fa-solid fa-bars"></i>
                    </button>
                </div>
                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    <h4 className='text-lightest mt-3'>-- {Cookies.get("namaSatpel")} --</h4>

                    <ul className="navbar-nav flex-row align-items-center ms-auto">
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

                <div className="navbar-search-wrapper search-input-wrapper d-none">
                    <input type="text" className="form-control search-input container-fluid border-0" placeholder="Search..." aria-label="Search..." />
                    <i className="bx bx-x bx-sm search-toggler cursor-pointer"></i>
                </div>
            </div>
        </nav>

        <div className="content-wrapper">
            <Content/>
            
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