/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import logbar from '../logo/barantins.png'
import Cookies from 'js-cookie'
import { useLocation, useNavigate } from 'react-router-dom'


function Navbar(props) {
    const navigate = useNavigate();
    const location = useLocation();
    let [ketMenu, setKetMenu] = useState(Cookies.get("ketMenu"))
    let [ketSubMenu, setKetSubMenu] = useState("")
    let [menuOpen, setMenuOpen] = useState(false)
    
    let [subMenuOpen, setSubMenuOpen] = useState(false)

    function handleMenuOpen(e) {
        if(e.target.dataset.i18n === ketMenu || ketMenu === "") {
            Cookies.set("menuOpen", !menuOpen)
            setMenuOpen(!menuOpen);
        }
        setKetMenu(e.target.dataset.i18n);
        Cookies.set("ketMenu", e.target.dataset.i18n)
    }

    function removeCookie() {
        window.location.reload()
        Cookies.remove("idPtkPage");
        Cookies.remove("tglPtk");
        Cookies.remove("jenisKarantina");
        Cookies.remove("jenisForm");
    }

    function handleSubMenuOpen(e) {
        if(e.target.dataset.i18n === ketSubMenu || ketSubMenu === "") {
            setSubMenuOpen(!subMenuOpen);
        }
        setKetSubMenu(e.target.dataset.i18n);
    } 

    // if(idPtk) {
        

    //     getSurtug()
    // }
    
    return (
    <aside id="layout-menu" className={"menu-vertical menu bg-menu-theme" + (props.menu ? " layout-menu" : "")} style={{transition: "all 0.5s ease"}}>
        <div className="app-brand demo" style={{background: 'black'}}>
            <div onClick={() => navigate("/")} type='button' className="app-brand-link">
                <img src={logbar} alt="Barantin App" width="150px" />
            </div>
        </div>

        <div className="menu-divider mt-0"></div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1 overflow-auto">
            <li className="menu-item">
                <div onClick={() => navigate('/')} type='button' className="menu-link">
                    <i className="menu-icon tf-icons fa-solid fa-house"></i>
                    <div data-i18n="Dashboards">Dashboards</div>
                </div>
            </li>
            <li className="menu-item">
                <div onClick={() => navigate('/datam')} type='button' className="menu-link">
                    <i className="menu-icon tf-icons fa-solid fa-list-alt"></i>
                    <div data-i18n="Data Masuk">Data Masuk</div>
                </div>
            </li>
            
            <li className="menu-header small text-uppercase"><span className="menu-header-text">Apps &amp; Menu</span></li>
            <li className={(ketMenu === 'Informasi Pre Border' && menuOpen === true) || location.pathname.split("/")[1] === 'k11' || location.pathname.split("/")[1] === 'k12' || location.pathname.split("/")[1] === 'k13' || location.pathname.split("/")[1] === 'k14' || location.pathname.split("/")[1] === 'k15' || location.pathname.split("/")[1] === 'k16' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="Informasi Pre Border" onClick={handleMenuOpen}>
                    <i className="menu-icon tf-icons fa-solid fa-bar-chart"></i>
                    <div data-i18n="Informasi Pre Border">Informasi Pre Border</div>
                </button>
                <ul className="menu-sub">
                    <li className={location.pathname.split("/")[1] === 'k11' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k11') & removeCookie()} className="menu-link" title='PERMOHONAN TINDAKAN KARANTINA DAN PENGAWASAN DAN/ATAU PENGENDALIAN SERTA BERITA ACARA SERAH TERIMA MEDIA PEMBAWA DI TEMPAT PEMASUKAN, PENGELUARAN DAN/ATAU TRANSIT'>
                            <div data-i18n="K-1.1">K-1.1</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k12' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k12')} className="menu-link" title='PRIOR NOTICE'>
                            <div data-i18n="K-1.2">K-1.2</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k13' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k13')} className="menu-link" title='Laporan Kedatangan Alat Angkut'>
                            <div data-i18n="K-1.3">K-1.3</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k14' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k14')} className="menu-link" title='LAPORAN MUTASI MUATAN ALAT ANGKUT'>
                            <div data-i18n="K-1.4">K-1.4</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k15' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k15')} className="menu-link" title='Berita Acara Penyerahan Media Pembawa'>
                            <div data-i18n="K-1.5">K-1.5</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k16' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k16')} className="menu-link" title='LAPORAN RENCANA PEMASUKAN ATAU PENGELUARAN MEDIA PEMBAWA'>
                            <div data-i18n="K-1.6">K-1.6</div>
                        </div>
                    </li>
                </ul>
            </li>
            <li className={(ketMenu === 'Analisa Awal & Penugasan' && menuOpen === true) || location.pathname.split("/")[1] === 'k21' || location.pathname.split("/")[1] === 'k22' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="Analisa Awal & Penugasan" onClick={handleMenuOpen}>
                    <i className="menu-icon tf-icons fa-solid fa-user-clock"></i>
                    <div data-i18n="Analisa Awal & Penugasan">Analisa Awal & Penugasan</div>
                </button>
                <ul className="menu-sub">
                    <li className={location.pathname.split("/")[1] === 'k21' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k21')} className="menu-link" title='HASIL ANALISIS PERMOHONAN/SERAH TERIMA MEDIA PEMBAWA/NHI'>
                            <div data-i18n="K-2.1">K-2.1</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k22' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k22')} className="menu-link" title='SURAT TUGAS'>
                            <div data-i18n="K-2.2">K-2.2</div>
                        </div>
                    </li>
                </ul>
            </li>
            {/* <li className='menu-item'>
                <div type="button" onClick={() => navigate('/seal')} style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link text-lightest" data-i18n="Pemeriksaan">
                    <i className="menu-icon tf-icons fa-solid fa-folder-tree"></i>
                    <div data-i18n="Pemeriksaan">Segel Karantina</div>
                </div>
            </li> */}
            <li className={(ketMenu === 'Pemeriksaan' && menuOpen === true) || location.pathname.split("/")[1] === 'k31' || location.pathname.split("/")[1] === 'k32' || location.pathname.split("/")[1] === 'k33' || location.pathname.split("/")[1] === 'k34' || location.pathname.split("/")[1] === 'k35' || location.pathname.split("/")[1] === 'k36' || location.pathname.split("/")[1] === 'k37b' || location.pathname.split("/")[1] === 'k37a' || location.pathname.split("/")[1] === 'k38' || location.pathname.split("/")[1] === 'k39' || location.pathname.split("/")[1] === 'k310' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}
            style={{display: (Cookies.get("idPtkPage") ? "block" : "none")}}>
                <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="Pemeriksaan" onClick={handleMenuOpen}>
                    <i className="menu-icon tf-icons fa-solid fa-magnifying-glass"></i>
                    <div data-i18n="Pemeriksaan">Pemeriksaan</div>
                </button>
                <ul className="menu-sub">
                    <li className={location.pathname.split("/")[1] === 'k31' ? "menu-item active" : "menu-item"} style={{display: (props.navbar.pAlatAngkut > 0 && (Cookies.get("jenisPermohonan") == "IM" || Cookies.get("jenisPermohonan") == "DM") ? "block" : "none")}}>
                        <div type="button" onClick={() => navigate('/k31')} className="menu-link" title='SURAT PERSETUJUAN/PENOLAKAN BONGKAR MEDIA PEMBAWA DARI ALAT ANGKUT'>
                            <div data-i18n="K-3.1">K-3.1</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k32' ? "menu-item active" : "menu-item"} style={{display: (props.navbar.pAlatAngkut > 0 && (Cookies.get("jenisPermohonan") == "EX" || Cookies.get("jenisPermohonan") == "DK") ? "block" : "none")}}>
                        <div type="button" onClick={() => navigate('/k32')} className="menu-link" title='PERSETUJUAN/PENOLAKAN BONGKAR/MUAT MEDIA PEMBAWA KE ALAT ANGKUT'>
                            <div data-i18n="K-3.2">K-3.2</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k33' ? "menu-item active" : "menu-item"} style={{display: (props.navbar.pFisikKesehatan > 0 ? "block" : "none")}}>
                        <div type="button" onClick={() => navigate('/k33')} className="menu-link" title='BERITA ACARA PENGAMBILAN CONTOH'>
                            <div data-i18n="K-3.3">K-3.3</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k34' ? "menu-item active" : "menu-item"} >
                        <div type="button" onClick={() => navigate('/k34')} className="menu-link" title='SURAT PERINTAH MASUK INSTALASI KARANTINA ATAU TEMPAT LAIN'>
                            <div data-i18n="K-3.4">K-3.4</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k35' ? "menu-item active" : "menu-item"} style={{display: (props.navbar.pPengawalan > 0 ? "block" : "none")}}>
                        <div type="button" onClick={() => navigate('/k35')} className="menu-link" title='LAPORAN HASIL PENGAWALAN MEDIA PEMBAWA'>
                            <div data-i18n="K-3.5">K-3.5</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k36' ? "menu-item active" : "menu-item"} style={{display: (props.navbar.pAtasAlatAngkut > 0 ? "block" : "none")}}>
                        <div type="button" onClick={() => navigate('/k36')} className="menu-link" title='LAPORAN HASIL PEMERIKSAAN MEDIA PEMBAWA DI ATAS ALAT ANGKUT'>
                            <div data-i18n="K-3.6">K-3.6</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k37a' ? "menu-item active" : "menu-item"} style={{display: (props.navbar.pAdmin > 0 ? "block" : "none")}}>
                        <div type="button" onClick={() => navigate('/k37a')} className="menu-link" title='LAPORAN HASIL PEMERIKSAAN ADMINISTRATIF'>
                            <div data-i18n="K-3.7a">K-3.7a</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k37b' ? "menu-item active" : "menu-item"} style={{display: (props.navbar.pFisikKesehatan > 0 ? "block" : "none")}}>
                        <div type="button" onClick={() => navigate('/k37b')} className="menu-link" title='LAPORAN HASIL PEMERIKSAAN KESEHATAN'>
                            <div data-i18n="K-3.7b">K-3.7b</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k38' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k38')} className="menu-link" title='SURAT KETERANGAN TRANSIT ALAT ANGKUT'>
                            <div data-i18n="K-3.8">K-3.8</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k39' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k39')} className="menu-link" title='SURAT KETERANGAN TRANSIT MEDIA PEMBAWA'>
                            <div data-i18n="K-3.9">K-3.9</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k310' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k310')} className="menu-link" title='SURAT PERINTAH PEMINDAHAN MEDIA PEMBAWA (SP2MP)'>
                            <div data-i18n="K-3.10">K-3.10</div>
                        </div>
                    </li>
                </ul>
            </li>
            <li className={(ketMenu === 'SingMat' && menuOpen === true) || location.pathname.split("/")[1] === 'k41' || location.pathname.split("/")[1] === 'k42' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'} style={{display: (props.navbar.pSingmat > 0 ? "block" : "none")}}>
                <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="SingMat" onClick={handleMenuOpen}>
                    <i className="menu-icon tf-icons fa-solid fa-tower-observation"></i>
                    <div data-i18n="SingMat">SingMat</div>
                </button>
                <ul className="menu-sub">
                    <li className={location.pathname.split("/")[1] === 'k41' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k41')} className="menu-link" title='LAPORAN HASIL PELAKSANAAN TINDAKAN KARANTINA DAN PENGAWASAN UNTUK PENGASINGAN'>
                            <div data-i18n="K-4.1">K-4.1</div>
                        </div>
                    </li>
                    {/* <li className={location.pathname.split("/")[1] === 'k42' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k42')} className="menu-link" title='LAPORAN HASIL PELAKSANAAN TINDAKAN KARANTINA DAN PENGAWASAN UNTUK PENGAMATAN'>
                            <div data-i18n="K-4.2">K-4.2</div>
                        </div>
                    </li> */}
                </ul>
            </li>
            <li className={(ketMenu === 'Perlakuan' && menuOpen === true) || location.pathname.split("/")[1] === 'k51' || location.pathname.split("/")[1] === 'k52' || location.pathname.split("/")[1] === 'k53' || location.pathname.split("/")[1] === 'k54' || location.pathname.split("/")[1] === 'k55' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'} 
            style={{display: (props.navbar.pPerlakuan > 0 ? "block" : "none")}}>
                <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="Perlakuan" onClick={handleMenuOpen}>
                    <i className="menu-icon tf-icons fa-solid fa-hands-holding-circle"></i>
                    <div data-i18n="Perlakuan">Perlakuan</div>
                </button>
                <ul className="menu-sub">
                    <li className={location.pathname.split("/")[1] === 'k51' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k51')} className="menu-link" title='SERTIFIKAT PERLAKUAN / TREATMENT CERTIFICATE'>
                            <div data-i18n="K-5.1">K-5.1</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k52' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k52')} className="menu-link" title='SERTIFIKAT FUMIGASI / FUMIGATION CERTIFICATE'>
                            <div data-i18n="K-5.2">K-5.2</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k53' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k53')} className="menu-link" title='LAPORAN HASIL PERLAKUAN'>
                            <div data-i18n="K-5.3">K-5.3</div>
                        </div>
                    </li>
                    {/* <li className={location.pathname.split("/")[1] === 'k54' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k54')} className="menu-link" title='FUMIGATION CERTIFICATE'>
                            <div data-i18n="K-5.4">K-5.4</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k55' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k55')} className="menu-link" title='LAPORAN HASIL PERLAKUAN'>
                            <div data-i18n="K-5.5">K-5.5</div>
                        </div>
                    </li> */}
                </ul>
            </li>
            <li className={(ketMenu === 'Penahanan' && menuOpen === true) || location.pathname.split("/")[1] === 'k61' || location.pathname.split("/")[1] === 'k62' || location.pathname.split("/")[1] === 'k63' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}
            style={{display: (props.navbar.pPenahanan > 0 ? "block" : "none")}}>
                <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="Penahanan" onClick={handleMenuOpen}>
                    <i className="menu-icon tf-icons fa-solid fa-handcuffs"></i>
                    <div data-i18n="Penahanan">Penahanan</div>
                </button>
                <ul className="menu-sub">
                    <li className={location.pathname.split("/")[1] === 'k61' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k61')} className="menu-link" title='SURAT PENAHANAN'>
                            <div data-i18n="K-6.1">K-6.1</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k62' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k62')} className="menu-link" title='BERITA ACARA PENAHANAN'>
                            <div data-i18n="K-6.2">K-6.2</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k63' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k63')} className="menu-link" title='Laporan Hasil Penahanan'>
                            <div data-i18n="K-6.3">K-6.3</div>
                        </div>
                    </li>
                </ul>
            </li>
            <li className={(ketMenu === 'Penolakan' && menuOpen === true) || location.pathname.split("/")[1] === 'k71' || location.pathname.split("/")[1] === 'k72' || location.pathname.split("/")[1] === 'k73' || location.pathname.split("/")[1] === 'k74' || location.pathname.split("/")[1] === 'k75' || location.pathname.split("/")[1] === 'k76' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}
            style={{display: (props.navbar.pPenolakan > 0 ? "block" : "none")}}>
                <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="Penolakan" onClick={handleMenuOpen}>
                    <i className="menu-icon tf-icons fa-solid fa-shield-halved"></i>
                    <div data-i18n="Penolakan">Penolakan</div>
                </button>
                <ul className="menu-sub">
                    <li className={location.pathname.split("/")[1] === 'k71' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k71')} className="menu-link" title='SURAT PENOLAKAN'>
                            <div data-i18n="K-7.1">K-7.1</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k72' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k72')} className="menu-link" title='BERITA ACARA PENOLAKAN'>
                            <div data-i18n="K-7.2">K-7.2</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k73' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k73')} className="menu-link" title='LAPORAN HASIL PENOLAKAN'>
                            <div data-i18n="K-7.3">K-7.3</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k74' ? "menu-item active" : "menu-item"}>
                        {/* <div type="button" onClick={() => navigate('/k74')} className="menu-link" title='SURAT PERMOHONAN PERPANJANGAN BATAS WAKTU PENGELUARAN MEDIA PEMBAWA YANG DITOLAK'> */}
                        <div type="button" onClick={() => navigate('/k74')} className="menu-link" title='NOTIFICATION OF NON-COMPLIANCE'>
                            <div data-i18n="K-7.4">K-7.4</div>
                        </div>
                    </li>
                    {/* <li className={location.pathname.split("/")[1] === 'k75' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k75')} className="menu-link" title='SURAT PERPANJANGAN BATAS WAKTU PENGELUARAN MEDIA PEMBAWA YANG DITOLAK'>
                            <div data-i18n="K-7.5">K-7.5</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k76' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k76')} className="menu-link" title='NOTIFICATION OF NON-COMPLIANCE'>
                            <div data-i18n="K-7.6">K-7.6</div>
                        </div>
                    </li> */}
                </ul>
            </li>
            <li className={(ketMenu === 'Pemusnahan' && menuOpen === true) || location.pathname.split("/")[1] === 'k81' || location.pathname.split("/")[1] === 'k82' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}
            style={{display: (props.navbar.pPemusnahan > 0 ? "block" : "none")}}>
                <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="Pemusnahan" onClick={handleMenuOpen}>
                    <i className="menu-icon tf-icons fa-solid fa-explosion"></i>
                    <div data-i18n="Pemusnahan">Pemusnahan</div>
                </button>
                <ul className="menu-sub">
                    <li className={location.pathname.split("/")[1] === 'k81' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k81')} className="menu-link" title='SURAT PEMUSNAHAN'>
                            <div data-i18n="K-8.1">K-8.1</div>
                        </div>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k82' ? "menu-item active" : "menu-item"}>
                        <div type="button" onClick={() => navigate('/k82')} className="menu-link" title='BERITA ACARA PEMUSNAHAN'>
                            <div data-i18n="K-8.2">K-8.2</div>
                        </div>
                    </li>
                </ul>
            </li>
            <li className={(ketMenu === 'Pembebasan' && menuOpen === true) || location.pathname.split("/")[1] === 'k91' || location.pathname.split("/")[1] === 'k92h' || location.pathname.split("/")[1] === 'k92i' || location.pathname.split("/")[1] === 'k92t' || location.pathname.split("/")[1] === 'k93' || location.pathname.split("/")[1] === 'k94' || location.pathname.split("/")[1] === 'kh1' || location.pathname.split("/")[1] === 'kh2' || location.pathname.split("/")[1] === 'ki1' || location.pathname.split("/")[1] === 'ki2' || location.pathname.split("/")[1] === 'kt1' || location.pathname.split("/")[1] === 'kt2' || location.pathname.split("/")[1] === 'kt3' || location.pathname.split("/")[1] === 'kt4' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}
            style={{display: (props.navbar.pPembebasan > 0 || props.navbar.pSuratKeterangan > 0 ? "block" : "none")}}>
                <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="Pembebasan" onClick={handleMenuOpen}>
                    <i className="menu-icon tf-icons fa-solid fa-file-archive"></i>
                    <div data-i18n="Pembebasan">Pembebasan</div>
                </button>
                <ul className="menu-sub">
                    <li className={location.pathname.split("/")[1] === 'k91' ? "menu-item active" : "menu-item"}
                    style={{display: (props.navbar.pPembebasan > 0 ? "block" : "none")}}>
                        <div type="button" onClick={() => navigate('/k91')} className="menu-link" title='SURAT KETERANGAN MEDIA PEMBAWA LAIN'>
                            <div data-i18n="K-9.1">K-9.1</div>
                        </div>
                    </li>
                    <li className={(ketMenu === 'Pembebasan' && ketSubMenu === 'K-9.2' && subMenuOpen === true) || location.pathname.split("/")[1] === 'k92h' || location.pathname.split("/")[1] === 'k92i' || location.pathname.split("/")[1] === 'k92t' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}
                    style={{display: (props.navbar.pPembebasan > 0 && (Cookies.get("jenisPermohonan") == "IM" || Cookies.get("jenisPermohonan") == "DM") ? "block" : "none")}}>
                        <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="K-9.2" onClick={handleSubMenuOpen}>
                            <div data-i18n="K-9.2">K-9.2</div>
                        </button>
                        <ul className="menu-sub">
                            <li className={location.pathname.split("/")[1] === 'k92h' ? "menu-item active" : "menu-item"} style={{display: (Cookies.get("jenisKarantina") == "H" ? "block" : "none")}}>
                                <div type="button" onClick={() => navigate('/k92h')} className="menu-link" title='SERTIFIKAT PELEPASAN KARANTINA HEWAN'>
                                    <div data-i18n="K-9.2.H">K-9.2.H</div>
                                </div>
                            </li>
                            <li className={location.pathname.split("/")[1] === 'k92i' ? "menu-item active" : "menu-item"} style={{display: (Cookies.get("jenisKarantina") == "I" ? "block" : "none")}}>
                                <div type="button" onClick={() => navigate('/k92i')} className="menu-link" title='SERTIFIKAT PELEPASAN KARANTINA IKAN'>
                                    <div data-i18n="K-9.2.I">K-9.2.I</div>
                                </div>
                            </li>
                            <li className={location.pathname.split("/")[1] === 'k92t' ? "menu-item active" : "menu-item"} style={{display: (Cookies.get("jenisKarantina") == "T" ? "block" : "none")}}>
                                <div type="button" onClick={() => navigate('/k92t')} className="menu-link" title='SERTIFIKAT PELEPASAN KARANTINA TUMBUHAN/PENGAWASAN'>
                                    <div data-i18n="K-9.2.T">K-9.2.T</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className={location.pathname.split("/")[1] === 'k93' ? "menu-item active" : "menu-item"}
                    style={{display: (props.navbar.pSuratKeterangan > 0 ? "block" : "none")}}>
                        <div type="button" onClick={() => navigate('/k93')} className="menu-link" title='SURAT KETERANGAN KARANTINA'>
                            <div data-i18n="K-9.3">K-9.3</div>
                        </div>
                    </li>
                    {/* <li className={(ketMenu === 'Pembebasan' && ketSubMenu === 'Karantina & Pengawasan' && subMenuOpen === true) || location.pathname.split("/")[1] === 'k94' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                        <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="Karantina & Pengawasan" onClick={handleSubMenuOpen}>
                            <i className="menu-icon tf-icons bx bx-user"></i>
                            <div data-i18n="Karantina & Pengawasan">Karantina & Pengawasan</div>
                        </button>
                        <ul className="menu-sub">
                            <li className={location.pathname.split("/")[1] === 'k94' ? "menu-item active" : "menu-item"}>
                                <div type="button" onClick={() => navigate('/k94')} className="menu-link" title='LAPORAN HASIL PENGAWASAN'>
                                    <div data-i18n="K-9.4">K-9.4</div>
                                </div>
                            </li>
                        </ul>
                    </li> */}
                    <li className={(ketMenu === 'Pembebasan' && ketSubMenu === 'KH' && subMenuOpen === true) || location.pathname.split("/")[1] === 'kh1' || location.pathname.split("/")[1] === 'kh2' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}
                    style={{display: (props.navbar.pPembebasan > 0 && Cookies.get("jenisKarantina") == "H" && (Cookies.get("jenisPermohonan") == "EX" || Cookies.get("jenisPermohonan") == "DK") ? "block" : "none")}}>
                        <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="KH" onClick={handleSubMenuOpen}>
                            <i className="menu-icon tf-icons bx bx-user"></i>
                            <div data-i18n="KH">KH</div>
                        </button>
                        <ul className="menu-sub">
                            <li className={location.pathname.split("/")[1] === 'kh1' ? "menu-item active" : "menu-item"}>
                                <div type="button" onClick={() => navigate('/kh1')} className="menu-link" title='SERTIFIKAT KESEHATAN HEWAN'>
                                    <div data-i18n="KH-1">KH-1</div>
                                </div>
                            </li>
                            <li className={location.pathname.split("/")[1] === 'kh2' ? "menu-item active" : "menu-item"}>
                                <div type="button" onClick={() => navigate('/kh2')} className="menu-link" title='SERTIFIKAT SANITASI PRODUK HEWAN'>
                                    <div data-i18n="KH-2">KH-2</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className={(ketMenu === 'Pembebasan' && ketSubMenu === 'KI' && subMenuOpen === true) || location.pathname.split("/")[1] === 'ki1' || location.pathname.split("/")[1] === 'ki2' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}
                    style={{display: (props.navbar.pPembebasan > 0 && Cookies.get("jenisKarantina") == "I" && (Cookies.get("jenisPermohonan") == "EX" || Cookies.get("jenisPermohonan") == "DK") ? "block" : "none")}}>
                        <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="KI" onClick={handleSubMenuOpen}>
                            <i className="menu-icon tf-icons bx bx-user"></i>
                            <div data-i18n="KI">KI</div>
                        </button>
                        <ul className="menu-sub">
                            <li className={location.pathname.split("/")[1] === 'ki1' ? "menu-item active" : "menu-item"}
                            style={{display: (props.navbar.pPembebasan > 0 && Cookies.get("jenisKarantina") == "I" && Cookies.get("jenisPermohonan") == "EX" ? "block" : "none")}}>
                                <div type="button" onClick={() => navigate('/ki1')} className="menu-link" title='HEALTH CERTIFICATE FOR FISH AND FISH PRODUCTS'>
                                    <div data-i18n="KI-1">KI-1</div>
                                </div>
                            </li>
                            <li className={location.pathname.split("/")[1] === 'ki2' ? "menu-item active" : "menu-item"}
                            style={{display: (props.navbar.pPembebasan > 0 && Cookies.get("jenisKarantina") == "I" && Cookies.get("jenisPermohonan") == "DK" ? "block" : "none")}}>
                                <div type="button" onClick={() => navigate('/ki2')} className="menu-link" title='SERTIFIKAT KESEHATAN IKAN DAN PRODUK IKAN'>
                                    <div data-i18n="KI-2">KI-2</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li className={(ketMenu === 'Pembebasan' && ketSubMenu === 'KT' && subMenuOpen === true) || location.pathname.split("/")[1] === 'kt1' || location.pathname.split("/")[1] === 'kt2' || location.pathname.split("/")[1] === 'kt3' || location.pathname.split("/")[1] === 'kt4' ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}
                    style={{display: (props.navbar.pPembebasan > 0 && Cookies.get("jenisKarantina") == "T" && (Cookies.get("jenisPermohonan") == "EX" || Cookies.get("jenisPermohonan") == "DK" || Cookies.get("jenisPermohonan") == "RE") ? "block" : "none")}}>
                        <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="KT" onClick={handleSubMenuOpen}>
                            <i className="menu-icon tf-icons bx bx-user"></i>
                            <div data-i18n="KT">KT</div>
                        </button>
                        <ul className="menu-sub">
                            <li className={location.pathname.split("/")[1] === 'kt1' ? "menu-item active" : "menu-item"}
                            style={{display: (props.navbar.pPembebasan > 0 && Cookies.get("jenisKarantina") == "T" && Cookies.get("jenisPermohonan") == "EX" ? "block" : "none")}}>
                                <div type="button" onClick={() => navigate('/kt1')} className="menu-link" title='PHYTOSANITARY CERTIFICATE'>
                                    <div data-i18n="KT-1">KT-1</div>
                                </div>
                            </li>
                            <li className={location.pathname.split("/")[1] === 'kt2' ? "menu-item active" : "menu-item"}
                            style={{display: (props.navbar.pPembebasan > 0 && Cookies.get("jenisKarantina") == "T" && Cookies.get("jenisPermohonan") == "RE" ? "block" : "none")}}>
                                <div type="button" onClick={() => navigate('/kt2')} className="menu-link" title='PHYTOSANITARY CERTIFICATE FOR RE-EXPORT'>
                                    <div data-i18n="KT-2">KT-2</div>
                                </div>
                            </li>
                            <li className={location.pathname.split("/")[1] === 'kt3' ? "menu-item active" : "menu-item"}
                            style={{display: (props.navbar.pPembebasan > 0 && Cookies.get("jenisKarantina") == "T" && Cookies.get("jenisPermohonan") == "DK" ? "block" : "none")}}>
                                <div type="button" onClick={() => navigate('/kt3')} className="menu-link" title='SERTIFIKAT KESEHATAN TUMBUHAN ANTAR AREA'>
                                    <div data-i18n="KT-3">KT-3</div>
                                </div>
                            </li>
                            <li className={location.pathname.split("/")[1] === 'kt4' ? "menu-item active" : "menu-item"}
                            style={{display: (props.navbar.pPembebasan > 0 && Cookies.get("jenisKarantina") == "T" && Cookies.get("jenisPermohonan") == "EX" ? "block" : "none")}}>
                                <div type="button" onClick={() => navigate('/kt4')} className="menu-link" title='CERTIFICATE FOR EXPORT OF PROCESSED PRODUCT/NON-REGULATED ARTICLE'>
                                    <div data-i18n="KT-4">KT-4</div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li className={ketMenu === 'Penegakkan Hukum' && menuOpen === true ? 'menu-item open menu-item-animating open' : 'menu-item menu-item-animating menu-item-closing'}>
                <button type='button' style={{backgroundColor: "#123138"}} className="w-100 text-sm-start menu-link menu-toggle text-lightest" data-i18n="Penegakkan Hukum" onClick={handleMenuOpen}>
                    <i className="menu-icon tf-icons fa-solid fa-person-military-pointing"></i>
                    <div data-i18n="Penegakkan Hukum">Penegakkan Hukum</div>
                </button>
                <ul className="menu-sub">
                    <li className="menu-item">
                        <div type="button" onClick={() => navigate('/k101')} className="menu-link" title='Nota Intelejen'>
                            <div data-i18n="K-10.1">K-10.1</div>
                        </div>
                    </li>
                    <li className="menu-item">
                        <div type="button" onClick={() => navigate('/k102')} className="menu-link" title='Wasmalitrik'>
                            <div data-i18n="K-10.2">K-10.2</div>
                        </div>
                    </li>
                    <li className="menu-item">
                        <div type="button" onClick={() => navigate('/k103')} className="menu-link" title='Gelar Perkara'>
                            <div data-i18n="K-10.3">K-10.3</div>
                        </div>
                    </li>
                    <li className="menu-item">
                        <div type="button" onClick={() => navigate('/k104')} className="menu-link" title='Laporan Hasil'>
                            <div data-i18n="K-10.4">K-10.4</div>
                        </div>
                    </li>
                    <li className="menu-item">
                        <div type="button" onClick={() => navigate('/k105')} className="menu-link" title='Penyidikan'>
                            <div data-i18n="K-10.5">K-10.5</div>
                        </div>
                    </li>
                    <li className="menu-item">
                        <div type="button" onClick={() => navigate('/k106')} className="menu-link" title='Laporan Hasil Penyidikan'>
                            <div data-i18n="K-10.6">K-10.6</div>
                        </div>
                    </li>
                    <li className="menu-item">
                        <div type="button" onClick={() => navigate('/k107')} className="menu-link" title='SP-3'>
                            <div data-i18n="K-10.7">K-10.7</div>
                        </div>
                    </li>
                    <li className="menu-item">
                        <div type="button" onClick={() => navigate('/k108')} className="menu-link" title='Berkas Perkara Lengkap'>
                            <div data-i18n="K-10.8">K-10.8</div>
                        </div>
                    </li>
                    <li className="menu-item">
                        <div type="button" onClick={() => navigate('/k109')} className="menu-link" title='Barang Dikuasai Negara'>
                            <div data-i18n="K-10.9">K-10.9</div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
        <br/>
        <br/>
    </aside>
  )
}

export default Navbar