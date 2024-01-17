/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import logbar from '../logo/barantins.png'

function Navbar() {
    let [ketMenu, setKetMenu] = useState("")
    let [ketSubMenu, setKetSubMenu] = useState("")
    let [menuOpen, setMenuOpen] = useState(false)
    let [subMenuOpen, setSubMenuOpen] = useState(false)
    // let sidebarClassname = menuOpen ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing';
    // const [menuOpen, setMenuOpen] = useState(false)
    function handleMenuOpen(e) {
        if(e.target.dataset.i18n === ketMenu || ketMenu === "") {
            setMenuOpen(!menuOpen);
        }
        setKetMenu(e.target.dataset.i18n);
    } 
    
    function handleSubMenuOpen(e) {
        if(e.target.dataset.i18n === ketSubMenu || ketSubMenu === "") {
            setSubMenuOpen(!subMenuOpen);
        }
        setKetSubMenu(e.target.dataset.i18n);
    } 
    // console.log((window.location.pathname.split("/")[1]) === 'k11' ? "ok" : "tidak")
    console.log(window.location)
  return (
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                <div className="app-brand demo" style={{background: 'black'}}>
                    <a href="/" className="app-brand-link">
                        <img src={logbar} alt="Barantin App" width="150px" />
                    </a>

                    {/* <a href="#" className="layout-menu-toggle menu-link text-large ms-auto">
                        <i className="bx menu-toggle-icon d-none d-xl-block fs-4 align-middle"></i>
                        <i className="bx bx-x d-block d-xl-none bx-sm align-middle"></i>
                    </a> */}
                </div>

                <div className="menu-divider mt-0"></div>

                <div className="menu-inner-shadow"></div>

                <ul className="menu-inner py-1 overflow-auto">
                    <li className="menu-item">
                        <a href="/" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-home-circle"></i>
                            <div data-i18n="Dashboards">Dashboards</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href={'/datam'} className="menu-link">
                            <i className="menu-icon tf-icons bx bx-grid"></i>
                            <div data-i18n="Data Masuk">Data Masuk</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href={'/datam'} className="menu-link">
                            <i className="menu-icon tf-icons bx bx-credit-card"></i>
                            <div data-i18n="Kwitansi">Kwitansi</div>
                        </a>
                    </li>

                    <li className="menu-header small text-uppercase"><span className="menu-header-text">Apps &amp; Menu</span></li>
                    {/* <li menu="0" className={menuOpen ? "menu-item open menu-item-animating open" : "menu-item menu-item-animating menu-item-closing"} onClick={handleMenuOpen(0)}> */}
                    <li className={(ketMenu === 'Informasi Pre Border' && menuOpen === true) || window.location.pathname.split("/")[1] === 'k11' || window.location.pathname.split("/")[1] === 'k12' || window.location.pathname.split("/")[1] === 'k13' || window.location.pathname.split("/")[1] === 'k14' || window.location.pathname.split("/")[1] === 'k15' || window.location.pathname.split("/")[1] === 'k16' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                        <a href="#" className="menu-link menu-toggle" data-i18n="Informasi Pre Border" onClick={handleMenuOpen}>
                            <i className="menu-icon tf-icons bx bx-food-menu"></i>
                            <div data-i18n="Informasi Pre Border">Informasi Pre Border</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={window.location.pathname.split("/")[1] === 'k11' ? "menu-item active" : "menu-item"}>
                                <a href={'/k11'} className="menu-link">
                                    <div data-i18n="K-1.1">K-1.1</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k12' ? "menu-item active" : "menu-item"}>
                                <a href={'/k12'} className="menu-link">
                                    <div data-i18n="K-1.2">K-1.2</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k13' ? "menu-item active" : "menu-item"}>
                                <a href={'/k13'} className="menu-link">
                                    <div data-i18n="K-1.3">K-1.3</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k14' ? "menu-item active" : "menu-item"}>
                                <a href={'/k14'} className="menu-link">
                                    <div data-i18n="K-1.4">K-1.4</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k15' ? "menu-item active" : "menu-item"}>
                                <a href={'/k15'} className="menu-link">
                                    <div data-i18n="K-1.5">K-1.5</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k16' ? "menu-item active" : "menu-item"}>
                                <a href={'/k16'} className="menu-link">
                                    <div data-i18n="K-1.6">K-1.6</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={(ketMenu === 'Analisa Awal & Penugasan' && menuOpen === true) || window.location.pathname.split("/")[1] === 'k21' || window.location.pathname.split("/")[1] === 'k22' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                        <a href="#" className="menu-link menu-toggle" data-i18n="Analisa Awal & Penugasan" onClick={handleMenuOpen}>
                            <i className="menu-icon tf-icons bx bx-user"></i>
                            <div data-i18n="Analisa Awal & Penugasan">Analisa Awal & Penugasan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={window.location.pathname.split("/")[1] === 'k21' ? "menu-item active" : "menu-item"}>
                                <a href={'/k21'} className="menu-link">
                                    <div data-i18n="K-2.1">K-2.1</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k22' ? "menu-item active" : "menu-item"}>
                                <a href={'/k22'} className="menu-link">
                                    <div data-i18n="K-2.2">K-2.2</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={(ketMenu === 'Pemeriksaan' && menuOpen === true) || window.location.pathname.split("/")[1] === 'k31' || window.location.pathname.split("/")[1] === 'k32' || window.location.pathname.split("/")[1] === 'k33' || window.location.pathname.split("/")[1] === 'k34' || window.location.pathname.split("/")[1] === 'k35' || window.location.pathname.split("/")[1] === 'k36' || window.location.pathname.split("/")[1] === 'k37' || window.location.pathname.split("/")[1] === 'k37a' || window.location.pathname.split("/")[1] === 'k38' || window.location.pathname.split("/")[1] === 'k39' || window.location.pathname.split("/")[1] === 'k310' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                        <a href="#" className="menu-link menu-toggle" data-i18n="Pemeriksaan" onClick={handleMenuOpen}>
                            <i className="menu-icon tf-icons bx bx-check-shield"></i>
                            <div data-i18n="Pemeriksaan">Pemeriksaan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={window.location.pathname.split("/")[1] === 'k31' ? "menu-item active" : "menu-item"}>
                                <a href={'/k31'} className="menu-link">
                                    <div data-i18n="K-3.1">K-3.1</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k32' ? "menu-item active" : "menu-item"}>
                                <a href={'/k32'} className="menu-link">
                                    <div data-i18n="K-3.2">K-3.2</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k33' ? "menu-item active" : "menu-item"}>
                                <a href={'/k33'} className="menu-link">
                                    <div data-i18n="K-3.3">K-3.3</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k34' ? "menu-item active" : "menu-item"}>
                                <a href={'/k34'} className="menu-link">
                                    <div data-i18n="K-3.4">K-3.4</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k35' ? "menu-item active" : "menu-item"}>
                                <a href={'/k35'} className="menu-link">
                                    <div data-i18n="K-3.5">K-3.5</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k36' ? "menu-item active" : "menu-item"}>
                                <a href={'/k36'} className="menu-link">
                                    <div data-i18n="K-3.6">K-3.6</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k37' ? "menu-item active" : "menu-item"}>
                                <a href={'/k37'} className="menu-link">
                                    <div data-i18n="K-3.7">K-3.7</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k37a' ? "menu-item active" : "menu-item"}>
                                <a href={'/k37a'} className="menu-link">
                                    <div data-i18n="K-3.7a">K-3.7a</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k38' ? "menu-item active" : "menu-item"}>
                                <a href={'/k38'} className="menu-link">
                                    <div data-i18n="K-3.8">K-3.8</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k39' ? "menu-item active" : "menu-item"}>
                                <a href={'/k39'} className="menu-link">
                                    <div data-i18n="K-3.9">K-3.9</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k310' ? "menu-item active" : "menu-item"}>
                                <a href={'/k310'} className="menu-link">
                                    <div data-i18n="K-3.10">K-3.10</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={(ketMenu === 'SingMat' && menuOpen === true) || window.location.pathname.split("/")[1] === 'k41' || window.location.pathname.split("/")[1] === 'k42' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                        <a href="#" className="menu-link menu-toggle" data-i18n="SingMat" onClick={handleMenuOpen}>
                            <i className="menu-icon tf-icons fa-solid fa-hands-holding-circle"></i>
                            <div data-i18n="SingMat">SingMat</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={window.location.pathname.split("/")[1] === 'k41' ? "menu-item active" : "menu-item"}>
                                <a href={'/k41'} className="menu-link">
                                    <div data-i18n="K-4.1">K-4.1</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k42' ? "menu-item active" : "menu-item"}>
                                <a href={'/k42'} className="menu-link">
                                    <div data-i18n="K-4.2">K-4.2</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={(ketMenu === 'Perlakuan' && menuOpen === true) || window.location.pathname.split("/")[1] === 'k51' || window.location.pathname.split("/")[1] === 'k52' || window.location.pathname.split("/")[1] === 'k53' || window.location.pathname.split("/")[1] === 'k54' || window.location.pathname.split("/")[1] === 'k55' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                        <a href="#" className="menu-link menu-toggle" data-i18n="Perlakuan" onClick={handleMenuOpen}>
                            <i className="menu-icon tf-icons fa-solid fa-hands-holding-circle"></i>
                            <div data-i18n="Perlakuan">Perlakuan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={window.location.pathname.split("/")[1] === 'k51' ? "menu-item active" : "menu-item"}>
                                <a href={'/k51'} className="menu-link">
                                    <div data-i18n="K-5.1">K-5.1</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k52' ? "menu-item active" : "menu-item"}>
                                <a href={'/k52'} className="menu-link">
                                    <div data-i18n="K-5.2">K-5.2</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k53' ? "menu-item active" : "menu-item"}>
                                <a href={'/k53'} className="menu-link">
                                    <div data-i18n="K-5.3">K-5.3</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k54' ? "menu-item active" : "menu-item"}>
                                <a href={'/k54'} className="menu-link">
                                    <div data-i18n="K-5.4">K-5.4</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k55' ? "menu-item active" : "menu-item"}>
                                <a href={'/k55'} className="menu-link">
                                    <div data-i18n="K-5.5">K-5.5</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={(ketMenu === 'Penahanan' && menuOpen === true) || window.location.pathname.split("/")[1] === 'k61' || window.location.pathname.split("/")[1] === 'k62' || window.location.pathname.split("/")[1] === 'k64' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                        <a href="#" className="menu-link menu-toggle" data-i18n="Penahanan" onClick={handleMenuOpen}>
                            <i className="menu-icon tf-icons fa-solid fa-handcuffs"></i>
                            <div data-i18n="Penahanan">Penahanan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={window.location.pathname.split("/")[1] === 'k61' ? "menu-item active" : "menu-item"}>
                                <a href={'/k61'} className="menu-link">
                                    <div data-i18n="K-6.1">K-6.1</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k62' ? "menu-item active" : "menu-item"}>
                                <a href={'/k62'} className="menu-link">
                                    <div data-i18n="K-6.2">K-6.2</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k64' ? "menu-item active" : "menu-item"}>
                                <a href={'/k64'} className="menu-link">
                                    <div data-i18n="K-6.4">K-6.4</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={(ketMenu === 'Penolakan' && menuOpen === true) || window.location.pathname.split("/")[1] === 'k71' || window.location.pathname.split("/")[1] === 'k72' || window.location.pathname.split("/")[1] === 'k73' || window.location.pathname.split("/")[1] === 'k74' || window.location.pathname.split("/")[1] === 'k75' || window.location.pathname.split("/")[1] === 'k76' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                        <a href="#" className="menu-link menu-toggle" data-i18n="Penolakan" onClick={handleMenuOpen}>
                            <i className="menu-icon tf-icons fa-solid fa-shield-halved"></i>
                            <div data-i18n="Penolakan">Penolakan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={window.location.pathname.split("/")[1] === 'k71' ? "menu-item active" : "menu-item"}>
                                <a href={'/k71'} className="menu-link">
                                    <div data-i18n="K-7.1">K-7.1</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k72' ? "menu-item active" : "menu-item"}>
                                <a href={'/k72'} className="menu-link">
                                    <div data-i18n="K-7.2">K-7.2</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k73' ? "menu-item active" : "menu-item"}>
                                <a href={'/k73'} className="menu-link">
                                    <div data-i18n="K-7.3">K-7.3</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k74' ? "menu-item active" : "menu-item"}>
                                <a href={'/k74'} className="menu-link">
                                    <div data-i18n="K-7.4">K-7.4</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k75' ? "menu-item active" : "menu-item"}>
                                <a href={'/k75'} className="menu-link">
                                    <div data-i18n="K-7.5">K-7.5</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k76' ? "menu-item active" : "menu-item"}>
                                <a href={'/k76'} className="menu-link">
                                    <div data-i18n="K-7.6">K-7.6</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={(ketMenu === 'Pemusnahan' && menuOpen === true) || window.location.pathname.split("/")[1] === 'k81' || window.location.pathname.split("/")[1] === 'k82' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                        <a href="#" className="menu-link menu-toggle" data-i18n="Pemusnahan" onClick={handleMenuOpen}>
                            <i className="menu-icon tf-icons fa-solid fa-skull-crossbones"></i>
                            <div data-i18n="Pemusnahan">Pemusnahan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={window.location.pathname.split("/")[1] === 'k81' ? "menu-item active" : "menu-item"}>
                                <a href={'/k81'} className="menu-link">
                                    <div data-i18n="K-8.1">K-8.1</div>
                                </a>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k82' ? "menu-item active" : "menu-item"}>
                                <a href={'/k82'} className="menu-link">
                                    <div data-i18n="K-8.2">K-8.2</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={(ketMenu === 'Pembebasan' && menuOpen === true) || window.location.pathname.split("/")[1] === 'k91' || window.location.pathname.split("/")[1] === 'k92h' || window.location.pathname.split("/")[1] === 'k92i' || window.location.pathname.split("/")[1] === 'k92t' || window.location.pathname.split("/")[1] === 'k93' || window.location.pathname.split("/")[1] === 'k94' || window.location.pathname.split("/")[1] === 'kh1' || window.location.pathname.split("/")[1] === 'kh2' || window.location.pathname.split("/")[1] === 'ki1' || window.location.pathname.split("/")[1] === 'ki2' || window.location.pathname.split("/")[1] === 'kt1' || window.location.pathname.split("/")[1] === 'kt2' || window.location.pathname.split("/")[1] === 'kt3' || window.location.pathname.split("/")[1] === 'kt4' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                        <a href="#" className="menu-link menu-toggle" data-i18n="Pembebasan" onClick={handleMenuOpen}>
                            <i className="menu-icon tf-icons bx bx-file"></i>
                            <div data-i18n="Pembebasan">Pembebasan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className={window.location.pathname.split("/")[1] === 'k91' ? "menu-item active" : "menu-item"}>
                                <a href={'/k91'} className="menu-link">
                                    <div data-i18n="K-9.1">K-9.1</div>
                                </a>
                            </li>
                            <li className={(ketMenu === 'Pembebasan' && ketSubMenu === 'K-9.2' && subMenuOpen === true) || window.location.pathname.split("/")[1] === 'k92h' || window.location.pathname.split("/")[1] === 'k92i' || window.location.pathname.split("/")[1] === 'k92t' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                                <a href="#" className="menu-link menu-toggle" data-i18n="K-9.2" onClick={handleSubMenuOpen}>
                                    <div data-i18n="K-9.2">K-9.2</div>
                                </a>
                                <ul className="menu-sub">
                                    <li className={window.location.pathname.split("/")[1] === 'k92h' ? "menu-item active" : "menu-item"}>
                                        <a href={'/k92h'} className="menu-link">
                                            <div data-i18n="K-9.2.H">K-9.2.H</div>
                                        </a>
                                    </li>
                                    <li className={window.location.pathname.split("/")[1] === 'k92i' ? "menu-item active" : "menu-item"}>
                                        <a href={'/k92i'} className="menu-link">
                                            <div data-i18n="K-9.2.I">K-9.2.I</div>
                                        </a>
                                    </li>
                                    <li className={window.location.pathname.split("/")[1] === 'k92t' ? "menu-item active" : "menu-item"}>
                                        <a href={'/k92t'} className="menu-link">
                                            <div data-i18n="K-9.2.T">K-9.2.T</div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className={window.location.pathname.split("/")[1] === 'k93' ? "menu-item active" : "menu-item"}>
                                <a href={'/k93'} className="menu-link">
                                    <div data-i18n="K-9.3">K-9.3</div>
                                </a>
                            </li>
                            <li className={(ketMenu === 'Pembebasan' && ketSubMenu === 'Karantina & Pengawasan' && subMenuOpen === true) || window.location.pathname.split("/")[1] === 'k94' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                                <a href="#" className="menu-link menu-toggle" data-i18n="Karantina & Pengawasan" onClick={handleSubMenuOpen}>
                                    <i className="menu-icon tf-icons bx bx-user"></i>
                                    <div data-i18n="Karantina & Pengawasan">Karantina & Pengawasan</div>
                                </a>
                                <ul className="menu-sub">
                                    <li className={window.location.pathname.split("/")[1] === 'k94' ? "menu-item active" : "menu-item"}>
                                        <a href={'/k94'} className="menu-link">
                                            <div data-i18n="K-9.4">K-9.4</div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className={(ketMenu === 'Pembebasan' && ketSubMenu === 'KH' && subMenuOpen === true) || window.location.pathname.split("/")[1] === 'kh1' || window.location.pathname.split("/")[1] === 'kh2' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                                <a href="#" data-i18n="KH" className="menu-link menu-toggle" onClick={handleSubMenuOpen}>
                                    <i className="menu-icon tf-icons bx bx-user"></i>
                                    <div data-i18n="KH">KH</div>
                                </a>
                                <ul className="menu-sub">
                                    <li className={window.location.pathname.split("/")[1] === 'kh1' ? "menu-item active" : "menu-item"}>
                                        <a href={'/kh1'} className="menu-link">
                                            <div data-i18n="KH-1">KH-1</div>
                                        </a>
                                    </li>
                                    <li className={window.location.pathname.split("/")[1] === 'kh2' ? "menu-item active" : "menu-item"}>
                                        <a href={'/kh2'} className="menu-link">
                                            <div data-i18n="KH-2">KH-2</div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className={(ketMenu === 'Pembebasan' && ketSubMenu === 'KI' && subMenuOpen === true) || window.location.pathname.split("/")[1] === 'ki1' || window.location.pathname.split("/")[1] === 'ki2' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                                <a href="#" data-i18n="KI" className="menu-link menu-toggle" onClick={handleSubMenuOpen}>
                                    <i className="menu-icon tf-icons bx bx-user"></i>
                                    <div data-i18n="KI">KI</div>
                                </a>
                                <ul className="menu-sub">
                                    <li className={window.location.pathname.split("/")[1] === 'ki1' ? "menu-item active" : "menu-item"}>
                                        <a href={'/ki1'} className="menu-link">
                                            <div data-i18n="KI-1">KI-1</div>
                                        </a>
                                    </li>
                                    <li className={window.location.pathname.split("/")[1] === 'ki2' ? "menu-item active" : "menu-item"}>
                                        <a href={'/ki2'} className="menu-link">
                                            <div data-i18n="KI-2">KI-2</div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className={(ketMenu === 'Pembebasan' && ketSubMenu === 'KT' && subMenuOpen === true) || window.location.pathname.split("/")[1] === 'kt1' || window.location.pathname.split("/")[1] === 'kt2' || window.location.pathname.split("/")[1] === 'kt3' || window.location.pathname.split("/")[1] === 'kt4' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                                <a href="#" data-i18n="KT" className="menu-link menu-toggle" onClick={handleSubMenuOpen}>
                                    <i className="menu-icon tf-icons bx bx-user"></i>
                                    <div data-i18n="KT">KT</div>
                                </a>
                                <ul className={window.location.pathname.split("/")[1] === 'k94' ? "menu-item active" : "menu-item"}>
                                    <li className={window.location.pathname.split("/")[1] === 'kt1' ? "menu-item active" : "menu-item"}>
                                        <a href={'/kt1'} className="menu-link">
                                            <div data-i18n="KT-1">KT-1</div>
                                        </a>
                                    </li>
                                    <li className={window.location.pathname.split("/")[1] === 'kt2' ? "menu-item active" : "menu-item"}>
                                        <a href={'/kt2'} className="menu-link">
                                            <div data-i18n="KT-2">KT-2</div>
                                        </a>
                                    </li>
                                    <li className={window.location.pathname.split("/")[1] === 'kt3' ? "menu-item active" : "menu-item"}>
                                        <a href={'/kt3'} className="menu-link">
                                            <div data-i18n="KT-3">KT-3</div>
                                        </a>
                                    </li>
                                    <li className={window.location.pathname.split("/")[1] === 'kt4' ? "menu-item active" : "menu-item"}>
                                        <a href={'/kt4'} className="menu-link">
                                            <div data-i18n="KT-4">KT-4</div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className={ketMenu === 'Penegakkan Hukum' && menuOpen === true ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                        <a href="#" className="menu-link menu-toggle" data-i18n="Penegakkan Hukum" onClick={handleMenuOpen}>
                            <i className="menu-icon tf-icons fa-solid fa-person-military-pointing"></i>
                            <div data-i18n="Penegakkan Hukum">Penegakkan Hukum</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href={'/k101'} className="menu-link">
                                    <div data-i18n="K-10.1">K-10.1</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k102'} className="menu-link">
                                    <div data-i18n="K-10.2">K-10.2</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k103'} className="menu-link">
                                    <div data-i18n="K-10.3">K-10.3</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k104'} className="menu-link">
                                    <div data-i18n="K-10.4">K-10.4</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k105'} className="menu-link">
                                    <div data-i18n="K-10.5">K-10.5</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k106'} className="menu-link">
                                    <div data-i18n="K-10.6">K-10.6</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k107'} className="menu-link">
                                    <div data-i18n="K-10.7">K-10.7</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k108'} className="menu-link">
                                    <div data-i18n="K-10.8">K-10.8</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k109'} className="menu-link">
                                    <div data-i18n="K-10.9">K-10.9</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <br/><br/>
            </aside>
  )
}

export default Navbar