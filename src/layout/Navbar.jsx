import React, { useState } from 'react'
import logbar from '../logo/barantins.png'

function Navbar() {
    let [menuOpen, setMenuOpen] = useState(false)
    let sidebarClassname = menuOpen ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing';
    // const [menuOpen, setMenuOpen] = useState(false)
    let handleMenuOpen = () => menuOpen === false ? setMenuOpen(true) : setMenuOpen(false);
  return (
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                <div className="app-brand demo">
                    <a href="index.html" className="app-brand-link">
                        <img src={logbar} alt="Barantin App" width="150px" />
                    </a>

                    <a href="#" className="layout-menu-toggle menu-link text-large ms-auto">
                        <i className="bx menu-toggle-icon d-none d-xl-block fs-4 align-middle"></i>
                        <i className="bx bx-x d-block d-xl-none bx-sm align-middle"></i>
                    </a>
                </div>

                <div className="menu-divider mt-0"></div>

                <div className="menu-inner-shadow"></div>

                <ul className="menu-inner py-1 overflow-auto">
                    <li className="menu-item">
                        <a href="index.php" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-home-circle"></i>
                            <div data-i18n="Dashboards">Dashboards</div>
                        </a>
                    </li>

                    <li className="menu-header small text-uppercase"><span className="menu-header-text">Apps &amp; Pages</span></li>
                    {/* <li menu="0" className={menuOpen ? "menu-item open menu-item-animating open" : "menu-item menu-item-animating menu-item-closing"} onClick={handleMenuOpen(0)}> */}
                    <li className={sidebarClassname} onClick={handleMenuOpen}>
                        <a href="#" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons bx bx-food-menu"></i>
                            <div data-i18n="Informasi Pre Border">Informasi Pre Border</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href={'/k11'} className="menu-link">
                                    <div data-i18n="K-1.1">K-1.1</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k12'} className="menu-link">
                                    <div data-i18n="K-1.2">K-1.2</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k13'} className="menu-link">
                                    <div data-i18n="K-1.3">K-1.3</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k14'} className="menu-link">
                                    <div data-i18n="K-1.4">K-1.4</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k15'} className="menu-link">
                                    <div data-i18n="K-1.5">K-1.5</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href={'/k16'} className="menu-link">
                                    <div data-i18n="K-1.6">K-1.6</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons bx bx-user"></i>
                            <div data-i18n="Analisa Awal & Penugasan">Analisa Awal & Penugasan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href="index.php?page=k21" className="menu-link">
                                    <div data-i18n="K-2.1">K-2.1</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k22" className="menu-link">
                                    <div data-i18n="K-2.2">K-2.2</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons bx bx-check-shield"></i>
                            <div data-i18n="Pemeriksaan">Pemeriksaan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href="index.php?page=k31" className="menu-link">
                                    <div data-i18n="K-3.1">K-3.1</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k32" className="menu-link">
                                    <div data-i18n="K-3.2">K-3.2</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k33" className="menu-link">
                                    <div data-i18n="K-3.3">K-3.3</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k34" className="menu-link">
                                    <div data-i18n="K-3.4">K-3.4</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k35" className="menu-link">
                                    <div data-i18n="K-3.5">K-3.5</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k36" className="menu-link">
                                    <div data-i18n="K-3.6">K-3.6</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k37" className="menu-link">
                                    <div data-i18n="K-3.7">K-3.7</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k37a" className="menu-link">
                                    <div data-i18n="K-3.7a">K-3.7a</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k38" className="menu-link">
                                    <div data-i18n="K-3.8">K-3.8</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k39" className="menu-link">
                                    <div data-i18n="K-3.9">K-3.9</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k310" className="menu-link">
                                    <div data-i18n="K-3.10">K-3.10</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons fa-solid fa-hands-holding-circle"></i>
                            <div data-i18n="Pengasingan">Pengasingan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href="index.php?page=k41" className="menu-link">
                                    <div data-i18n="K-4.1">K-4.1</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons fa-solid fa-hands-holding-circle"></i>
                            <div data-i18n="Pengamatan">Pengamatan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href="index.php?page=k42" className="menu-link">
                                    <div data-i18n="K-4.2">K-4.2</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons fa-solid fa-hands-holding-circle"></i>
                            <div data-i18n="Perlakuan">Perlakuan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href="index.php?page=k51" className="menu-link">
                                    <div data-i18n="K-5.1">K-5.1</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k52" className="menu-link">
                                    <div data-i18n="K-5.2">K-5.2</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k53" className="menu-link">
                                    <div data-i18n="K-5.3">K-5.3</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k54" className="menu-link">
                                    <div data-i18n="K-5.4">K-5.4</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k55" className="menu-link">
                                    <div data-i18n="K-5.5">K-5.5</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons fa-solid fa-handcuffs"></i>
                            <div data-i18n="Penahanan">Penahanan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href="index.php?page=k61" className="menu-link">
                                    <div data-i18n="K-6.1">K-6.1</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k62" className="menu-link">
                                    <div data-i18n="K-6.2">K-6.2</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k64" className="menu-link">
                                    <div data-i18n="K-6.4">K-6.4</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons fa-solid fa-shield-halved"></i>
                            <div data-i18n="Penolakan">Penolakan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href="index.php?page=k71" className="menu-link">
                                    <div data-i18n="K-7.1">K-7.1</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k72" className="menu-link">
                                    <div data-i18n="K-7.2">K-7.2</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k73" className="menu-link">
                                    <div data-i18n="K-7.3">K-7.3</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k74" className="menu-link">
                                    <div data-i18n="K-7.4">K-7.4</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k75" className="menu-link">
                                    <div data-i18n="K-7.5">K-7.5</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k76" className="menu-link">
                                    <div data-i18n="K-7.6">K-7.6</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons fa-solid fa-skull-crossbones"></i>
                            <div data-i18n="Pemusnahan">Pemusnahan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href="index.php?page=k81" className="menu-link">
                                    <div data-i18n="K-8.1">K-8.1</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k82" className="menu-link">
                                    <div data-i18n="K-8.2">K-8.2</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons bx bx-file"></i>
                            <div data-i18n="Pembebasan">Pembebasan</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href="index.php?page=k91" className="menu-link">
                                    <div data-i18n="K-9.1">K-9.1</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="#" className="menu-link menu-toggle">
                                    <div data-i18n="K-9.2">K-9.2</div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="index.php?page=k92h" className="menu-link">
                                            <div data-i18n="K-9.2.H">K-9.2.H</div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="index.php?page=k92i" className="menu-link">
                                            <div data-i18n="K-9.2.I">K-9.2.I</div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="index.php?page=k92t" className="menu-link">
                                            <div data-i18n="K-9.2.T">K-9.2.T</div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k93" className="menu-link">
                                    <div data-i18n="K-9.3">K-9.3</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="#" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-user"></i>
                                    <div data-i18n="Karantina & Pengawasan">Karantina & Pengawasan</div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="index.php?page=k94" className="menu-link">
                                            <div data-i18n="K-9.4">K-9.4</div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item">
                                <a href="#" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-user"></i>
                                    <div data-i18n="KH">KH</div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="index.php?page=kh1" className="menu-link">
                                            <div data-i18n="KH-1">KH-1</div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="index.php?page=kh2" className="menu-link">
                                            <div data-i18n="KH-2">KH-2</div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item">
                                <a href="#" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-user"></i>
                                    <div data-i18n="KI">KI</div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="index.php?page=ki1" className="menu-link">
                                            <div data-i18n="KI-1">KI-1</div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="index.php?page=ki2" className="menu-link">
                                            <div data-i18n="KI-2">KI-2</div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item">
                                <a href="#" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-user"></i>
                                    <div data-i18n="KT">KT</div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="index.php?page=kt1" className="menu-link">
                                            <div data-i18n="KT-1">KT-1</div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="index.php?page=kt2" className="menu-link">
                                            <div data-i18n="KT-2">KT-2</div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="index.php?page=kt3" className="menu-link">
                                            <div data-i18n="KT-3">KT-3</div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="index.php?page=kt4" className="menu-link">
                                            <div data-i18n="KT-4">KT-4</div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-item">
                        <a href="#" className="menu-link menu-toggle">
                            <i className="menu-icon tf-icons fa-solid fa-person-military-pointing"></i>
                            <div data-i18n="Penegakkan Hukum">Penegakkan Hukum</div>
                        </a>
                        <ul className="menu-sub">
                            <li className="menu-item">
                                <a href="index.php?page=k101" className="menu-link">
                                    <div data-i18n="K-10.1">K-10.1</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k102" className="menu-link">
                                    <div data-i18n="K-10.2">K-10.2</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k103" className="menu-link">
                                    <div data-i18n="K-10.3">K-10.3</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k104" className="menu-link">
                                    <div data-i18n="K-10.4">K-10.4</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k105" className="menu-link">
                                    <div data-i18n="K-10.5">K-10.5</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k106" className="menu-link">
                                    <div data-i18n="K-10.6">K-10.6</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k107" className="menu-link">
                                    <div data-i18n="K-10.7">K-10.7</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k108" className="menu-link">
                                    <div data-i18n="K-10.8">K-10.8</div>
                                </a>
                            </li>
                            <li className="menu-item">
                                <a href="index.php?page=k109" className="menu-link">
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