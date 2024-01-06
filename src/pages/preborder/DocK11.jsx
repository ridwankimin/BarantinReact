import React, { useCallback, useMemo, useState } from 'react'
import PersonSvg from '../../logo/svg/PersonSvg'
import ShipSvg from '../../logo/svg/ShipSvg'
import PackageSvg from '../../logo/svg/PackageSvg'
import DokumenSvg from '../../logo/svg/DokumenSvg'
import ConfirmSvg from '../../logo/svg/ConfirmSvg'
import MasterNegara from '../../model/master/MasterNegara'
import MasterKota from '../../model/master/MasterKota'
import MasterPelabuhan from '../../model/master/MasterPelabuhan'
import MasterKemasan from '../../model/master/MasterKemasan'
import MasterMataUang from '../../model/master/MasterMataUang'
import MasterKlasKT from '../../model/master/MasterKlasKT'
import MasterKomKT from '../../model/master/MasterKomKT'
import MasterSatuan from '../../model/master/MasterSatuan'
import MasterHS from '../../model/master/MasterHS'
import { useForm } from 'react-hook-form'
// import { motion } from "framer-motion";
import MasterProv from '../../model/master/MasterProv'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import PtkModel from '../../model/PtkModel'
// import { getValue } from '@testing-library/user-event/dist/utils'
// import Select from 'react-select'
// import $ from 'jquery';
// import Select from 'react-select'

function DocK11() {
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    function dateNow() {
        let n = date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate()) + ' ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds());
        return n;
    }

    let [arrayTabSatu, setArrayTabSatu] = useState({});


    
    // console.log(makeid(5));
    
    let [dataDiri, setDataDiri] = useState({});
    // let [pelabuhan, setPelabuhan] = useState({});
    let [dataSelect, setdataSelect] = useState({});
    
    function handlePeruntukanKT(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterKlasKT/>}))
    }

    function handleNegara(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterNegara/>}))
    }
    
    function handleKemasan(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterKemasan/>}))
    }
    
    function handleMasterSatuan(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterSatuan />}))
    }
    
    function handleProv(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterProv/>}))
    }
    
    function handleMataUang(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterMataUang/>}))
    }
    
    function handleKota(e) {
        
        // const dataId = funcdata()
        console.log(e.target.dataset.input)
        setdataSelect(values => ({...values, [e.target.name]: <MasterKota iddata={e.target.dataset.input}/>}))
    }
    
    function handlePelabuhan(e) {
        let dataId = null; 
        if(e.target.dataset.input) {
            dataId = e.target.dataset.input;
        } else {
            dataId = null;
        }
        setdataSelect(values => ({...values, [e.target.name]: <MasterPelabuhan iddata={dataId}/>}))
    }

    // const handleNegara = (props) => {
        //     const apiNegara = new MasterNegara()
        //     setdataSelect(values => ({...values, [props.jenis]: apiNegara}))
        // }
    let [formTab, setFormTab] = useState({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        // tab1: true,
        // tab2: true,
        // tab3: true,
        // tab4: true,
    });
    let [komoditas, setKomoditas] = useState({});
    let [komMP, setKomMP] = useState({});
    let [arrKontainer, setArrKontainer] = useState([]);
    let [kontainer, setKontainer] = useState({
        noKontainer: "",
        tipeKontainer: "",
        ukuranKontainer: "",
        stuffKontainer: "",
        segel: ""});

    // const {
    //     register,
    //     onChange,
    //     setValue,
    //     // getValues,
    //     watch,
    //     // useWatch,
    //     // control,
    //     handleSubmit,
    //     formState: { errors },
    //     // reset
    // } = useForm();

    const {
		register: registerPemohon,
        setValue: setValuePemohon,
        watch: watchPemohon,
		handleSubmit: handleFormPemohon,
        formState: { errors: errorsPemohon },
	} = useForm()
	const {
        register: registerPelabuhan,
        watch: watchPelabuhan,
		handleSubmit: handleFormPelabuhan,
        formState: { errors: errorsPelabuhan },
	} = useForm()
	
    const {
		register: registerKontainer,
        setValue: setValueKontainer,
		handleSubmit: handleFormKontainer,
        formState: { errors: errorsKontainer },
	} = useForm()
    
    const {
		register: registerMP,
        watch: watchMP,
        setValue: setValueMP,
        handleSubmit: handleFormMP,
        formState: { errors: errorsMP },
	} = useForm()
    
    const {
        register: registerDetilMP,
        setValue: setValueDetilMP,
        handleSubmit: handleFormDetilMP,
        formState: { errors: errorsDetilMP },
    } = useForm()
    
    const cekdataDiri = watchPemohon()
    const cekdataPelabuhan = watchPelabuhan()
    const cekdataMP = watchMP()
  
    const onSubmitMP = (data) => {
        setWizardPage(wizardPage + 1)
        setFormTab(values => ({...values, tab1: false}))
        // props.updateUser(data);
        console.log(data)
        // navigate("/second");
    };
    
    const onSubmitDetilMP = (data) => {
        console.log(data);
        setValueKontainer("noKontainer", "");
        setValueKontainer("tipeKontainer", "");
        setValueKontainer("ukuranKontainer", "");
        setValueKontainer("stuffKontainer", "");
        setValueKontainer("segel", "");
    };
    const date = new Date();
    function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
    }
      console.count()
    // console.log(Date.now())
    // console.log(dateNow())
        // console.log('0100ET' + date.getTime() + date.getYear() + date.getMonth() + date.getDay() + makeid(5))
        // console.log(date.getYear())

    const onSubmitPemohon = (data) => {
        setValuePemohon("makeid", makeid(5));
        setValuePemohon("datenow", dateNow());
        const modelPemohon = new PtkModel();

        const response = modelPemohon.tabPemohon(data)

        // const date = new Date();
        setWizardPage(wizardPage + 1)
        // 1500-15KPL01-2-20221013-002
        setFormTab(values => ({...values, tab1: false}))

        // console.log(arrayTabSatu);
        // props.updateUser(data);
        // navigate("/second");
    };
    
      const onSubmitPelabuhan = (data) => {
        setWizardPage(wizardPage + 1)
        setFormTab(values => ({...values, tab2: false}))
        // props.updateUser(data);
        // navigate("/second");
      };
      
      const onSubmitKontainer = (data) => {
        console.log(data)
            setValueKontainer("noKontainer", "");
            setValueKontainer("tipeKontainer", "");
            setValueKontainer("ukuranKontainer", "");
            setValueKontainer("stuffKontainer", "");
            setValueKontainer("segel", "");
        // setWizardPage(wizardPage + 1)
        // setFormTab(values => ({...values, tab2: false}))
        // props.updateUser(data);
        // navigate("/second");
      };
    
    // const handleDataDiri = event => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setDataDiri(values => ({...values, [name]: value}))
    // }
    
    const handleCekSameTTD = (event) => {
        // console.log(cekdataDiri.alamatPemohon)
        if(event.target.checked === true) {
            setValuePemohon("namaTtd", cekdataDiri.namaPemohon);
            setValuePemohon("alamatTtd", cekdataDiri.alamatPemohon);
            setValuePemohon("jenisIdentitasTtd", cekdataDiri.jenisIdentitasPemohon);
            setValuePemohon("noIdentitasTtd", cekdataDiri.noIdentitasPemohon);
        } else {
            setValuePemohon("namaTtd", "");
            setValuePemohon("alamatTtd", "");
            setValuePemohon("jenisIdentitasTtd", "");
            setValuePemohon("noIdentitasTtd", "");
        }
    }
    
    const handleCekSamePengirim = (event) => {
        if(event.target.checked === true) {
            setValuePemohon("namaPengirim", cekdataDiri.namaPemohon);
            setValuePemohon("alamatPengirim", cekdataDiri.alamatPemohon);
            setValuePemohon("jenisIdentitasPengirim", cekdataDiri.jenisIdentitasPemohon);
            setValuePemohon("noIdentitasPengirim", cekdataDiri.noIdentitasPemohon);
            setValuePemohon("nomorTlpPengirim", cekdataDiri.nomorTlp);
            setValuePemohon("negaraPengirim", (cekdataDiri.permohonan === 'I' ? "" : "99"));
            setValuePemohon("provPengirim", (cekdataDiri.permohonan === 'I' ? "" : cekdataDiri.provPemohon));
            setValuePemohon("kotaPengirim", (cekdataDiri.permohonan === 'I' ? "" : cekdataDiri.kotaPemohon));
        } else {
            setValuePemohon("namaPengirim", "");
            setValuePemohon("alamatPengirim", "");
            setValuePemohon("jenisIdentitasPengirim", "");
            setValuePemohon("noIdentitasPengirim", "");
            setValuePemohon("nomorTlpPengirim", "");
            setValuePemohon("negaraPengirim", "");
            setValuePemohon("provPengirim", "");
            setValuePemohon("kotaPengirim", "");
        }
    }
    
    const handleCekSamePenerima = (event) => {
        if(event.target.checked === true) {
            setValuePemohon("namaPenerima", cekdataDiri.namaPemohon);
            setValuePemohon("alamatPenerima", cekdataDiri.alamatPemohon);
            setValuePemohon("jenisIdentitasPenerima", cekdataDiri.jenisIdentitasPemohon);
            setValuePemohon("noIdentitasPenerima", cekdataDiri.noIdentitasPemohon);
            setValuePemohon("nomorTlpPenerima", cekdataDiri.nomorTlp);
            setValuePemohon("negaraPenerima", (cekdataDiri.permohonan === 'E' ? "" : "99"));
            setValuePemohon("provPenerima", (cekdataDiri.permohonan === 'E' ? "" : cekdataDiri.provPemohon));
            setValuePemohon("kotaPenerima", (cekdataDiri.permohonan === 'E' ? "" : cekdataDiri.kotaPemohon));
        } else {
            setValuePemohon("namaPenerima", "");
            setValuePemohon("alamatPenerima", "");
            setValuePemohon("jenisIdentitasPenerima", "");
            setValuePemohon("noIdentitasPenerima", "");
            setValuePemohon("nomorTlpPenerima", "");
            setValuePemohon("negaraPenerima", "");
            setValuePemohon("provPenerima", "");
            setValuePemohon("kotaPenerima", "");
        }
    }

    const handleKomMP = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setKomMP(values => ({...values, [name]: value}))
    }
    
    const handleKomKTByID = (event) => {
        // const name = event.target.name;
        const value = event.target.value;
        const kom = value.split(';');
        setKomMP(values => ({...values,
            idkom: kom[0],
            kodeKomoditasMP: kom[1],
            namaUmum: kom[2],
            namaLatin: kom[3]
        }))
        setKomMP(values => ({...values, [komMP.kodeKomoditasMP]: kom[1]}))
    }
    
    const handleKomoditas = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setKomoditas(values => ({...values, [name]: value}))
    }

    let [wizardPage, setWizardPage] = useState(1);
    let [editKontainer, setEditKontainer] = useState();

    function DetilKontainer() {
        return (
            <>
            {arrKontainer ? 
            arrKontainer?.map((data, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{data.noKontainer}</td>
                    <td>{data.ukuranKontainer}</td>
                    <td>{data.stuffKontainer}</td>
                    <td>{data.tipeKontainer}</td>
                    <td>{data.segel}</td>
                    <td>
                        <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" type="button" onClick={() => {setEditKontainer(index)}} data-bs-toggle="modal" data-bs-target="#modKontainer"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
                            </div>
                        </div>
                    </td>
                </tr>
        )) : null}
            </>
        );
    }

    const handleAddKontainer = (e) => {
        e.preventDefault();
        setArrKontainer([...arrKontainer, { 
            noKontainer: kontainer.noKontainer,
            tipeKontainer: kontainer.tipeKontainer,
            ukuranKontainer: kontainer.ukuranKontainer,
            stuffKontainer: kontainer.stuffKontainer,
            segel: kontainer.segel
         }]);
         setKontainer(values => ({...values, noKontainer: "",
            tipeKontainer: "",
            ukuranKontainer: "",
            stuffKontainer: "",
            segel: ""}));
    }
    
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-1.1 <span className="text-muted fw-light">PERMOHONAN TINDAKAN KARANTINA DAN PENGAWASAN DAN/ATAU PENGENDALIAN
            SERTA BERITA ACARA SERAH TERIMA MEDIA PEMBAWA DI TEMPAT PEMASUKAN,
            PENGELUARAN DAN/ATAU TRANSIT</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <div id="wizard-checkout" className="bs-stepper wizard-icons wizard-icons-example mt-2">
                <div className="bs-stepper-header m-auto border-0">
                    <div className={wizardPage === 1 ? "step active" : "step"} onClick={() => setWizardPage(1)}>
                        <button type="button" className="step-trigger">
                            <span className="bs-stepper-icon">
                              <PersonSvg/>
                            </span>
                            <span className="bs-stepper-label">Identitas Pemohon</span>
                        </button>
                    </div>
                    <div className="line">
                        <i className="bx bx-chevron-right"></i>
                    </div>
                    <div className={wizardPage === 2 ? "step active" : "step"}>
                        <button type="button" className="step-trigger" onClick={() => setWizardPage(2)} disabled={formTab.tab1}>
                            <span className="bs-stepper-icon">
                              <ShipSvg/>
                            </span>
                            <span className="bs-stepper-label">Pelabuhan - Alat Angkut</span>
                        </button>
                    </div>
                    <div className="line">
                        <i className="bx bx-chevron-right"></i>
                    </div>
                    <div className={wizardPage === 3 ? "step active" : "step"}>
                        <button type="button" className="step-trigger" onClick={() => setWizardPage(3)} disabled={formTab.tab2}>
                            <span className="bs-stepper-icon">
                              <PackageSvg/>
                            </span>
                            <span className="bs-stepper-label">Media Pembawa - Kemasan</span>
                        </button>
                    </div>
                    <div className="line">
                        <i className="bx bx-chevron-right"></i>
                    </div>
                    <div className={wizardPage === 4 ? "step active" : "step"}>
                        <button type="button" className="step-trigger" onClick={() => setWizardPage(4)} disabled={formTab.tab3}>
                            <span className="bs-stepper-icon">
                              <DokumenSvg/>
                            </span>
                            <span className="bs-stepper-label">Dokumen</span>
                        </button>
                    </div>
                    <div className="line">
                        <i className="bx bx-chevron-right"></i>
                    </div>
                    <div className={wizardPage === 5 ? "step active" : "step"}>
                        <button type="button" className="step-trigger" onClick={() => setWizardPage(5)} disabled={formTab.tab4}>
                            <span className="bs-stepper-icon">
                              <ConfirmSvg/>
                            </span>
                            <span className="bs-stepper-label">Konfirmasi</span>
                        </button>
                    </div>
                </div>
                <div className="bs-stepper-content border-top">
                        <div id="cardPemohon" className={wizardPage === 1 ? "content active dstepper-block" : "content"}>
                        <form className="input-form" onSubmit={handleFormPemohon(onSubmitPemohon)}>
                            <input type="hidden" name='makeid' value={makeid(5)} {...registerPemohon("makeid")} />
                            <input type="hidden" name='datenow' value={dateNow()} {...registerPemohon("datenow")} />
      {/* <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      > */}
        <div className="row">
          <div className="col-sm-6">
              <div className="card card-action mb-4">
                  <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                      <div className="card-action-title">
                          <h5 className="mb-0 text-lightest">Pemohon</h5>
                      </div>
                      <div className="card-action-element">
                          <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="collapse show">
                      <div className="card-body pt-0">
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="permohonan">Jenis Permohonan <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <select className={errorsPemohon.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="permohonan" id="permohonan" {...registerPemohon("permohonan", { required: "Mohon pilih jenis permohonan."})}>
                                      <option value="">--</option>
                                      <option value="E">Ekspor</option>
                                      <option value="I">Impor</option>
                                      <option value="M">Domestik Masuk</option>
                                      <option value="K">Domestik Keluar</option>
                                  </select>
                                  {errorsPemohon.permohonan && <small className="text-danger">{errorsPemohon.permohonan.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="pJRutin">Pengguna Jasa Rutin <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="pJRutin" id="ya" value="1" {...registerPemohon("pJRutin", { required: "Mohon pilih jenis pengguna jasa."})} />
                                      <label className="form-check-label" htmlFor="ya">Ya</label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="pJRutin" id="tidak" value="0"  {...registerPemohon("pJRutin")}/>
                                      <label className="form-check-label" htmlFor="tidak">Tidak</label>
                                  </div>
                                  {errorsPemohon.pJRutin && <><br/><small className="text-danger">{errorsPemohon.pJRutin.message}</small></>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="namaPemohon">Nama <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <input type="text" id="namaPemohon" name="namaPemohon" {...registerPemohon("namaPemohon", { required: "Mohon isi nama pemohon."})} className={errorsPemohon.namaPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Pemohon" />
                                  {errorsPemohon.namaPemohon && <small className="text-danger">{errorsPemohon.namaPemohon.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamatPemohon">Alamat <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamatPemohon" name="alamatPemohon" {...registerPemohon("alamatPemohon", { required: "Mohon isi alamat pemohon."})} className={errorsPemohon.alamatPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Pemohon" />
                                  {errorsPemohon.alamatPemohon && <small className="text-danger">{errorsPemohon.alamatPemohon.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="provPemohon">Provinsi <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                    <select name="provPemohon" id="provPemohon" onClick={dataSelect.provPemohon ? null : handleProv} {...registerPemohon("provPemohon", { required: "Mohon pilih provinsi pemohon."})} className={errorsPemohon.provPemohon ? "form-control  form-control-sm is-invalid" : "form-control  form-control-sm"}>
                                        <option value="">--</option>
                                        {dataSelect.provPemohon}
                                        {/* <MasterProv/> */}
                                    </select>
                                    {errorsPemohon.provPemohon && <small className="text-danger">{errorsPemohon.provPemohon.message}</small>}
                                  {/* <input type="text" id="prov_pemohon" className={errorsPemohon.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Kota Pemohon" /> */}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="kotaPemohon">Kota/Kab <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                    <select name="kotaPemohon" id={cekdataDiri.provPemohon} data-input={cekdataDiri.provPemohon} onClick={handleKota} className={errorsPemohon.kotaPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} {...registerPemohon("kotaPemohon", { required: "Mohon pilih kota pemohon."})}>
                                        <option value="">--</option>
                                        {cekdataDiri.provPemohon === "" ? <option value="" disabled>Mohon Pilih Provinsi terlebih dahulu</option> : dataSelect.kotaPemohon }
                                    </select>
                                    {errorsPemohon.kotaPemohon && <small className="text-danger">{errorsPemohon.kotaPemohon.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nomorTlp">No. Telepon</label>
                              <div className="col-sm-9">
                                  <input type="number" id="nomorTlp" {...registerPemohon("nomorTlp")} className="form-control form-control-sm" placeholder="No. Telepon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="emailPemohon">Email <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <input type="email" id="emailPemohon" name="emailPemohon" {...registerPemohon("emailPemohon", { required: "Mohon isi email pemohon.", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email tidak valid." }})} className={errorsPemohon.emailPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Email" />
                                  {errorsPemohon.emailPemohon && <small className="text-danger">{errorsPemohon.emailPemohon.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="jenisIdentitasPemohon">Identitas <span className='text-danger'>*</span></label>
                              <div className="col-sm-2">
                                  <select className={errorsPemohon.jenisIdentitasPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisIdentitasPemohon" id="jenisIdentitasPemohon" {...registerPemohon("jenisIdentitasPemohon", { required: true})}>
                                      <option value="">--</option>
                                      <option value="1">NPWP</option>
                                      <option value="2">KTP</option>
                                      <option value="3">Passport</option>
                                      <option value="99">Lain-lain</option>
                                  </select>
                              </div>
                              <div className="col-sm-7">
                                  <input type="text" name="noIdentitasPemohon" id="noIdentitasPemohon" {...registerPemohon("noIdentitasPemohon", { required: "Mohon isi identitas pemohon."})} className={errorsPemohon.noIdentitasPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Identitas" />
                                    {errorsPemohon.noIdentitasPemohon && <small className="text-danger">{errorsPemohon.noIdentitasPemohon.message}</small>}
                              </div>
                          </div>
                          <div className="form-check mt-3">
                          <input className="form-check-input" type="checkbox" id="samaTTD" onChange={handleCekSameTTD} />
                          <label className="form-check-label" htmlFor="samaTTD"> Pemohon sama dengan penandatangan dokumen. </label>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-sm-6">
              <div className="card card-action mb-4">
                  <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                      <div className="card-action-title">
                          <h5 className="mb-0 text-lightest">Penandatangan Dokumen</h5>
                      </div>
                      <div className="card-action-element">
                          <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="collapse show">
                      <div className="card-body pt-0">
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="namaTtd">Nama <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <input type="text" id="namaTtd" name="namaTtd" {...registerPemohon("namaTtd", { required: "Mohon isi nama penandatangan."})} className={errorsPemohon.namaTtd ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Penandatangan" />
                                  {errorsPemohon.namaTtd && <small className="text-danger">{errorsPemohon.namaTtd.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamatTtd">Alamat <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamatTtd" name="alamatTtd" {...registerPemohon("alamatTtd", { required: "Mohon isi nama penandatangan."})} className={errorsPemohon.alamatTtd ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Penandatangan" />
                                  {errorsPemohon.alamatTtd && <small className="text-danger">{errorsPemohon.alamatTtd.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="jenisIdentitasTtd">Identitas <span className='text-danger'>*</span></label>
                              <div className="col-sm-2">
                                  <select className={errorsPemohon.jenisIdentitasTtd ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisIdentitasTtd" id="jenisIdentitasTtd" {...registerPemohon("jenisIdentitasTtd", { required: true})}>
                                  <option value="1">NPWP</option>
                                      <option value="2">KTP</option>
                                      <option value="3">Passport</option>
                                      <option value="99">Lain-lain</option>
                                  </select>
                              </div>
                              <div className="col-sm-7">
                                  <input type="text" id="noIdentitasTtd" name="noIdentitasTtd" className={errorsPemohon.noIdentitasTtd ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} {...registerPemohon("noIdentitasTtd", { required: "Mohon isi identitas penandatangan."})} placeholder="Nomor Identitas" />
                                  {errorsPemohon.noIdentitasTtd && <small className="text-danger">{errorsPemohon.noIdentitasTtd.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="jabatanTtd">Jabatan</label>
                              <div className="col-sm-9">
                                  <input type="text" id="jabatanTtd" name="jabatanTtd" {...registerPemohon("jabatanTtd")} className="form-control form-control-sm" placeholder="Jabatan" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="card card-action mb-4">
                  <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                      <div className="card-action-title">
                          <h5 className="mb-0 text-lightest">Contact Person</h5>
                      </div>
                      <div className="card-action-element">
                          <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="collapse show">
                      <div className="card-body pt-0">
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="namaCp">Nama</label>
                              <div className="col-sm-9">
                                  <input type="text" id="namaCp" name="namaCp" {...registerPemohon("namaCp")} className="form-control form-control-sm" placeholder="Nama Contact Person" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamatCp">Alamat</label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamatCp" name="alamatCp" {...registerPemohon("alamatCp")} className="form-control form-control-sm" placeholder="Alamat Contact Person" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="teleponCp">Telepon</label>
                              <div className="col-sm-9">
                                  <input type="text" id="teleponCp" name="teleponCp" {...registerPemohon("teleponCp")} className="form-control form-control-sm" placeholder="Telepon Contact Person" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-sm-6">
              <div className="card card-action mb-4">
                  <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                      <div className="card-action-title">
                          <h5 className="mb-0 text-lightest">Pengirim</h5>
                      </div>
                      <div className="card-action-element">
                          <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="collapse show">
                      <div className="card-body pt-0">
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="namaPengirim">Nama <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <input type="text" id="namaPengirim" name="namaPengirim" {...registerPemohon("namaPengirim", { required: "Mohon isi nama pengirim."})} className={errorsPemohon.namaPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Pengirim" />
                                  {errorsPemohon.namaPengirim && <small className="text-danger">{errorsPemohon.namaPengirim.message}</small>}
                                  {/* {errorsPemohon.namaPengirim?.type === "required" && ( <small className="text-danger">{errorsPemohon.namaPengirim.message}</small> )} */}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamatPengirim">Alamat <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamatPengirim" name="alamatPengirim" {...registerPemohon("alamatPengirim", { required: "Mohon isi alamat pengirim."})} className={errorsPemohon.alamatPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Pengirim" />
                                  {errorsPemohon.alamatPengirim && <small className="text-danger">{errorsPemohon.alamatPengirim.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="identitas">Identitas <span className='text-danger'>*</span></label>
                              <div className="col-sm-2">
                                  <select className={errorsPemohon.jenisIdentitasPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisIdentitasPengirim" id="jenisIdentitasPengirim" {...registerPemohon("jenisIdentitasPengirim", { required: true})}>
                                    <option value="">--</option>
                                    <option value="1">NPWP</option>
                                    <option value="2">KTP</option>
                                    <option value="3">Passport</option>
                                    <option value="99">Lain-lain</option>
                                  </select>
                              </div>
                              <div className="col-sm-7">
                                  <input type="text" id="noIdentitasPengirim" name="noIdentitasPengirim" {...registerPemohon("noIdentitasPengirim", { required: "Mohon isi identitas pengirim."})} className={errorsPemohon.noIdentitasPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Identitas" />
                                  {errorsPemohon.noIdentitasPengirim && <small className="text-danger">{errorsPemohon.noIdentitasPengirim.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nomorTlpPengirim">No. Telepon</label>
                              <div className="col-sm-9">
                                  <input type="number" id="nomorTlpPengirim" name="nomorTlpPengirim" {...registerPemohon("nomorTlpPengirim")} className="form-control form-control-sm" placeholder="No. Telepon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="negaraPengirim">Negara <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                {/* <select id="negaraPengirim" data-style="btn-default btn-sm" data-live-search-style="begins" data-actions-box="true" data-live-search="true" name="negaraPengirim" {...registerPemohon("negaraPengirim", { required: "Mohon pilih negara pengirim."})} className={errorsPemohon.negaraPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm selectpicker"}> */}
                                <select id="negaraPengirim" onClick={dataSelect.negaraPengirim ? null : handleNegara} name="negaraPengirim" {...registerPemohon("negaraPengirim", { required: "Mohon pilih negara pengirim."})} className={errorsPemohon.negaraPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                {/* <select id="negaraPengirim" value={data} name="negaraPengirim"  className="form-control select2 form-control-sm"> */}
                                    <option value="">--</option>
                                    {dataSelect.negaraPengirim}
                                    {/* <MasterNegara/> */}
                                </select>
                                {errorsPemohon.negaraPengirim && <small className="text-danger">{errorsPemohon.negaraPengirim.message}</small>}
                              </div>
                          </div>
                          <div style={{visibility: cekdataDiri.permohonan === 'I' ? 'hidden' : 'visible'}}>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="provPengirim">Provinsi</label>
                                <div className="col-sm-9">
                                    <select id="provPengirim" name="provPengirim" onClick={dataSelect.provPengirim ? null : handleProv} {...registerPemohon('provPengirim')} className="form-control form-control-sm">
                                      <option value="">--</option>
                                      {dataSelect.provPengirim}
                                      {/* <MasterProv/> */}
                                    </select>  
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="kotaPengirim">Kota/Kabupaten</label>
                                <div className="col-sm-9">
                                  <select id="kotaPengirim" name="kotaPengirim" data-input={cekdataDiri.provPengirim} onClick={handleKota} {...registerPemohon('kotaPengirim')} className="form-control form-control-sm">
                                      <option value="">--</option>
                                      {/* <MasterKota data-input={cekdataDiri.provPengirim}/> */}
                                      {cekdataDiri.provPengirim === "" ? <option value="" disabled>Mohon Pilih Provinsi Pengirim terlebih dahulu</option> : dataSelect.kotaPengirim }
                                  </select>
                                </div>
                            </div>
                          </div>
                        <div className="form-check mt-3">
                          <input className="form-check-input" type="checkbox" id="samaPengirim" onChange={handleCekSamePengirim} />
                          <label className="form-check-label" htmlFor="samaPengirim"> Sama dengan pemohon. </label>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-sm-6">
              <div className="card card-action mb-4">
                  <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                      <div className="card-action-title">
                          <h5 className="mb-0 text-lightest">Penerima</h5>
                      </div>
                      <div className="card-action-element">
                          <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="collapse show">
                      <div className="card-body pt-0">
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="namaPenerima">Nama <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <input type="text" id="namaPenerima" name="namaPenerima" {...registerPemohon("namaPenerima", { required: "Mohon isi negara penerima."})} className={errorsPemohon.namaPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Penerima" />
                                  {errorsPemohon.namaPenerima && <small className="text-danger">{errorsPemohon.namaPenerima.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamatPenerima">Alamat <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamatPenerima" name="alamatPenerima" {...registerPemohon("alamatPenerima", { required: "Mohon isi alamat penerima."})} className={errorsPemohon.alamatPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Penerima" />
                                  {errorsPemohon.alamatPenerima && <small className="text-danger">{errorsPemohon.alamatPenerima.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="jenisIdentitasPenerima">Identitas <span className='text-danger'>*</span></label>
                              <div className="col-sm-2">
                                  <select className={errorsPemohon.jenisIdentitasPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisIdentitasPenerima" id="jenisIdentitasPenerima" {...registerPemohon("jenisIdentitasPenerima", { required: true})}>
                                  <option value="">--</option>
                                    <option value="1">NPWP</option>
                                    <option value="2">KTP</option>
                                    <option value="3">Passport</option>
                                    <option value="99">Lain-lain</option>
                                  </select>
                              </div>
                              <div className="col-sm-7">
                                  <input type="text" id="noIdentitasPenerima" name="noIdentitasPenerima" className={errorsPemohon.noIdentitasPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Identitas" {...registerPemohon("noIdentitasPenerima", { required: "Mohon isi identitas penerima."})} />
                                  {errorsPemohon.noIdentitasPenerima && <small className="text-danger">{errorsPemohon.noIdentitasPenerima.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nomorTlpPenerima">No. Telepon</label>
                              <div className="col-sm-9">
                                  <input type="number" id="nomorTlpPenerima" name="nomorTlpPenerima" {...registerPemohon("nomorTlpPenerima")} className="form-control form-control-sm" placeholder="No. Telepon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="negaraPenerima">Negara <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                <select id="negaraPenerima" onClick={dataSelect.negaraPenerima ? null :handleNegara} name="negaraPenerima" className={errorsPemohon.negaraPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} {...registerPemohon("negaraPenerima", { required: "Mohon pilih negara penerima."})}>
                                    <option value="">--</option>
                                    {dataSelect.negaraPenerima}
                                    {/* <MasterNegara/> */}
                                </select>
                                {errorsPemohon.negaraPenerima && <small className="text-danger">{errorsPemohon.negaraPenerima.message}</small>}
                              </div>
                          </div>
                          <div style={{visibility: cekdataDiri.permohonan === 'E' ? 'hidden' : 'visible'}}>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="provPenerima">Provinsi</label>
                                <div className="col-sm-9">
                                    <select id="provPenerima" name="provPenerima" onClick={dataSelect.provPenerima ? null : handleProv} {...registerPemohon("provPenerima")} className="form-control form-control-sm" placeholder="Kota Penerima">
                                        <option value="">--</option>
                                        {dataSelect.provPenerima}
                                        {/* <MasterProv/> */}
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="kotaPenerima">Kota/Kabupaten</label>
                                <div className="col-sm-9">
                                    <select id="kotaPenerima" name="kotaPenerima" data-input={cekdataDiri.provPenerima} onClick={handleKota} {...registerPemohon("kotaPenerima")} className="form-control form-control-sm" placeholder="Kota Penerima">
                                        <option value="">--</option>
                                        {/* <MasterKota data-input={cekdataDiri.provPenerima}/> */}
                                        {cekdataDiri.provPenerima === "" ? <option value="" disabled>Mohon pilih provinsi penerima terlebih dahulu</option> : dataSelect.kotaPenerima }
                                    </select>
                                </div>
                            </div>
                          </div>
                          <div className="form-check mt-3">
                            <input className="form-check-input" type="checkbox" id="samaPenerima" onChange={handleCekSamePenerima} />
                            <label className="form-check-label" htmlFor="samaPenerima"> Sama dengan pemohon. </label>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-12 d-flex justify-content-between">
              <button type="button" className="btn btn-label-secondary" disabled>
                  <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                  <span className="d-sm-inline-block d-none">Sebelumnya</span>
              </button>
              <button type="submit" className="btn btn-primary">
                  <span className="d-sm-inline-block d-none me-sm-1">Selanjutnya</span>
                  <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
              </button>
          </div>
      </div>
      {/* </motion.div> */}
    </form>
  </div>
                        <div id="cardPelabuhan" className={wizardPage === 2 ? "content active dstepper-block" : "content"}>
                        <form className="input-form" onSubmit={handleFormPelabuhan(onSubmitPelabuhan)}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Asal - Tujuan</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="negaraAsal">Negara Asal <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <select id="negaraAsal" name="negaraAsal" onClick={dataSelect.negaraAsal ? null : handleNegara} {...registerPelabuhan("negaraAsal", { required: "Mohon pilih negara asal."})} className={errorsPelabuhan.negaraAsal ? "form-control form-control-sm is-invalid" : "form-control select2 form-control-sm"} >
                                                        {/* <select id="negaraAsal" name="negaraAsal" value={dataDiri.negaraAsal || ""} onChange={handleDataDiri} className="form-control select2 form-control-sm" > */}
                                                        <option value="">--</option>
                                                        {dataSelect.negaraAsal}
                                                            {/* <MasterNegara/> */}
                                                        </select>
                                                        <p>{dataDiri.negaraAsal}</p>
                                                        {errorsPelabuhan.negaraAsal && <small className="text-danger">{errorsPelabuhan.negaraAsal.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="daerahAsal">Daerah Asal</label>
                                                    <div className="col-sm-9">
                                                        {/* <input type="text" id="daerah_asal" className="form-control form-control-sm" placeholder="Daerah Asal" /> */}
                                                        <select name="daerahAsal" id="daerahAsal" onClick={handleKota} {...registerPelabuhan("daerahAsal")} className="form-control form-control-sm">
                                                        <option value="">--</option>
                                                        {dataSelect.daerahAsal}
                                                            {/* <MasterKota/> */}
                                                        </select>
                                                        {errorsPelabuhan.daerahAsal && <small className="text-danger">{errorsPelabuhan.daerahAsal.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="negaraTujuan">Negara Tujuan <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        {/* <input type="text" id="negara_tujuan" className="form-control form-control-sm" placeholder="Negara Tujuan" /> */}
                                                        <select name="negaraTujuan" id="negaraTujuan" onClick={dataSelect.negaraTujuan ? null : handleNegara} {...registerPelabuhan("negaraTujuan", { required: "Mohon pilih negara tujuan."})} className={errorsPelabuhan.negaraTujuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                        <option value="">--</option>
                                                        {dataSelect.negaraTujuan}
                                                            {/* <MasterNegara/> */}
                                                        </select>
                                                        {errorsPelabuhan.negaraTujuan && <small className="text-danger">{errorsPelabuhan.negaraTujuan.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="daerahTujuan">Daerah Tujuan</label>
                                                    <div className="col-sm-9">
                                                    <select name="daerahTujuan" id="daerahTujuan" onClick={handleKota} {...registerPelabuhan("daerahTujuan")} className="form-control form-control-sm">
                                                        <option value="">--</option>
                                                        {dataSelect.daerahTujuan}
                                                            {/* <MasterKota/> */}
                                                        </select>
                                                        {/* <input type="text" id="daerah_tujuan" className="form-control form-control-sm" placeholder="Daerah Tujuan" /> */}
                                                        {errorsPelabuhan.daerahTujuan && <small className="text-danger">{errorsPelabuhan.daerahTujuan.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="transitOpsi">Transit <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="transitOpsi" id="ya" value="Ya"  {...registerPelabuhan("transitOpsi", { required: "Mohon pilih transit."})}/>
                                                            <label className="form-check-label" htmlFor="ya">Ya</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="transitOpsi" id="tidak" value="Tidak" {...registerPelabuhan("transitOpsi")} />
                                                            <label className="form-check-label" htmlFor="tidak">Tidak</label>
                                                        </div>
                                                        {errorsPelabuhan.transitOpsi && <small className="text-danger">{errorsPelabuhan.transitOpsi.message}</small>}
                                                     </div>
                                                </div>
                                                <div style={{display: cekdataPelabuhan.transitOpsi === 'Ya' ? 'block' : 'none' }}>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="negaraTransit">Negara Transit</label>
                                                    <div className="col-sm-9">
                                                    <select type="text" id="negaraTransit" onClick={dataSelect.negaraTransit ? null : handleNegara} name='negaraTransit' {...registerPelabuhan("negaraTransit")} className="form-control form-control-sm">
                                                        <option value="">--</option>
                                                        {dataSelect.negaraTransit}
                                                            {/* <MasterNegara/> */}
                                                        </select>
                                                        {/* <input type="text" id="negara_transit" className="form-control form-control-sm" placeholder="Negara Transit" /> */}
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Pelabuhan</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="pelMuat">Muat / Asal <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <select name="pelMuat" id="pelMuat" data-input={cekdataPelabuhan.negaraAsal} onClick={handlePelabuhan} {...registerPelabuhan("pelMuat", { required: "Mohon pilih pelabuhan muat/asal."})} className={errorsPelabuhan.pelMuat ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                            <option value="">--</option>
                                                            {cekdataPelabuhan.negaraAsal === "" ? <option value="" disabled>Mohon pilih negara asal</option> : dataSelect.pelMuat }
                                                            {/* <MasterPelabuhan data-input={cekdataPelabuhan.negaraAsal}/> */}
                                                        </select>
                                                        {errorsPelabuhan.pelMuat && <small className="text-danger">{errorsPelabuhan.pelMuat.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="pelBongkar">Bongkar / Tujuan <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <select name="pelBongkar" id="pelBongkar" data-input={cekdataPelabuhan.negaraTujuan} onClick={handlePelabuhan} {...registerPelabuhan("pelBongkar", { required: "Mohon pilih pelabuhan bongkar."})} className={errorsPelabuhan.pelBongkar ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                            <option value="">--</option>
                                                            {cekdataPelabuhan.negaraTujuan === "" ? <option value="" disabled>Mohon pilih negara tujuan</option> : dataSelect.pelBongkar }
                                                            {/* <MasterPelabuhan data-input={cekdataPelabuhan.negaraTujuan}/> */}
                                                        </select>
                                                        {errorsPelabuhan.pelBongkar && <small className="text-danger">{errorsPelabuhan.pelBongkar.message}</small>}
                                                        {/* <input type="text" id="pel_bongkar" className="form-control form-control-sm" placeholder="Pelabuhan Bongkar / Tujuan" /> */}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="sandar">Sandar</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" name='sandar' id="sandar" {...registerPelabuhan("sandar")} className="form-control form-control-sm" placeholder="Lokasi Sandar" />
                                                    </div>
                                                </div>
                                                <div style={{display: cekdataPelabuhan.transitOpsi === 'Ya' ? 'block' : 'none' }}>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="pelTransit">Pelabuhan Transit</label>
                                                    <div className="col-sm-9">
                                                        <select name="pelTransit" id="pelTransit" data-input={cekdataPelabuhan.negaraTransit} onClick={handlePelabuhan} {...registerPelabuhan("pelTransit")} className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            {cekdataPelabuhan.negaraTransit === "" ? <option value="" disabled>Mohon pilih negara tujuan</option> : dataSelect.pelTransit }
                                                            {/* <MasterPelabuhan data-input={cekdataPelabuhan.negaraTransit}/> */}
                                                        </select>
                                                        {/* <input type="text" id="pel_transit" className="form-control form-control-sm" placeholder="Pelabuhan Transit" /> */}
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div style={{display: cekdataPelabuhan.transitOpsi === 'Ya' ? 'block' : 'none' }}>
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Pengangkutan Sebelum Transit</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="modaTransit">Moda Transportasi</label>
                                                    <div className="col-sm-9">
                                                        <select name="modaTransit" id="modaTransit" {...registerPelabuhan("modaTransit")} className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            <option value="1">Laut</option>
                                                            <option value="2">Kereta Api</option>
                                                            <option value="3">Jalan Raya</option>
                                                            <option value="4">Udara</option>
                                                            <option value="5">POS</option>
                                                            <option value="6">Multimoda</option>
                                                            <option value="7">Instalansi</option>
                                                            <option value="8">Perairan</option>
                                                            <option value="9">Lainnya</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tipeTransit">Tipe Transportasi</label>
                                                    <div className="col-sm-9">
                                                        <select id="tipeTransit" name="tipeTransit" {...registerPelabuhan("tipeTransit")} className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            <option value="1">Penumpang</option>
                                                            <option value="2">Kombi</option>
                                                            <option value="3">Kargo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="namaAlatAngkutTransit">Nama Alat Angkut</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="namaAlatAngkutTransit" name="namaAlatAngkutTransit" {...registerPelabuhan("namaAlatAngkutTransit")} className="form-control form-control-sm" placeholder="Nama Alat Angkut" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="nomorAlatAngkutTransit">Nomor Alat Angkut</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="nomorAlatAngkutTransit" name="nomorAlatAngkutTransit" {...registerPelabuhan("nomorAlatAngkutTransit")} className="form-control form-control-sm" placeholder="Nomor Alat Angkut" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="benderaTransit">Bendera</label>
                                                    <div className="col-sm-9">
                                                        <select id="benderaTransit" name="benderaTransit" onClick={dataSelect.benderaTransit ? null : handleNegara} {...registerPelabuhan("benderaTransit")} className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            {dataSelect.benderaTransit}
                                                            {/* <MasterNegara/> */}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tglBerangkatTransit">Tgl Berangkat</label>
                                                    <div className="col-sm-4">
                                                        <input type="date" id="tglBerangkatTransit" name="tglBerangkatTransit" {...registerPelabuhan("tglBerangkatTransit")} className="form-control form-control-sm" placeholder="Tgl Berangkat" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tglTibaTransit">Tgl Tiba</label>
                                                    <div className="col-sm-4">
                                                        <input type="date" id="tglTibaTransit" name="tglTibaTransit" {...registerPelabuhan("tglTibaTransit")} className="form-control form-control-sm" placeholder="Tgl Tiba" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Pengangkutan Terakhir</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="modaAkhir">Moda Transportasi <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <select id="modaAkhir" name="modaAkhir" {...registerPelabuhan("modaAkhir", { required: "Mohon pilih moda transportasi akhir."})} className={errorsPelabuhan.modaAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                            <option value="">--</option>
                                                            <option value="1">Laut</option>
                                                            <option value="2">Kereta Api</option>
                                                            <option value="3">Jalan Raya</option>
                                                            <option value="4">Udara</option>
                                                            <option value="5">POS</option>
                                                            <option value="6">Multimoda</option>
                                                            <option value="7">Instalansi</option>
                                                            <option value="8">Perairan</option>
                                                            <option value="9">Lainnya</option>
                                                        </select>
                                                        {errorsPelabuhan.modaAkhir && <small className="text-danger">{errorsPelabuhan.modaAkhir.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tipeAkhir">Tipe Transportasi</label>
                                                    <div className="col-sm-9">
                                                        <select id="tipeAkhir" name="tipeAkhir"  {...registerPelabuhan("tipeAkhir")} className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            <option value="1">Penumpang</option>
                                                            <option value="2">Kombi</option>
                                                            <option value="3">Kargo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="namaAlatAngkutAkhir">Nama Alat Angkut <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="namaAlatAngkutAkhir" name="namaAlatAngkutAkhir" {...registerPelabuhan("namaAlatAngkutAkhir", { required: "Mohon isi nama alat angkut akhir."})} className={errorsPelabuhan.namaAlatAngkutAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Alat Angkut" />
                                                        {errorsPelabuhan.namaAlatAngkutAkhir && <small className="text-danger">{errorsPelabuhan.namaAlatAngkutAkhir.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="nomorAlatAngkutAkhir">Nomor Alat Angkut <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="nomorAlatAngkutAkhir" name="nomorAlatAngkutAkhir" {...registerPelabuhan("nomorAlatAngkutAkhir", { required: "Mohon isi nomor alat angkut akhir."})} className={errorsPelabuhan.nomorAlatAngkutAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Alat Angkut" />
                                                        {errorsPelabuhan.nomorAlatAngkutAkhir && <small className="text-danger">{errorsPelabuhan.nomorAlatAngkutAkhir.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="benderaAkhir">Bendera</label>
                                                    <div className="col-sm-9">
                                                        <select id="benderaAkhir" name="benderaAkhir" onClick={dataSelect.benderaAkhir ? null : handleNegara} {...registerPelabuhan("benderaAkhir")} className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            {dataSelect.benderaAkhir}
                                                            {/* <MasterNegara/> */}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tglBerangkatAkhir">Tgl Berangkat <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-4">
                                                        <input type="date" id="tglBerangkatAkhir" name="tglBerangkatAkhir" {...registerPelabuhan("tglBerangkatAkhir", { required: "Mohon isi tanggal berangkat."})} className={errorsPelabuhan.tglBerangkatAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Tgl Berangkat" />
                                                        {errorsPelabuhan.tglBerangkatAkhir && <small className="text-danger">{errorsPelabuhan.tglBerangkatAkhir.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tglTibaAkhir">Tgl Tiba <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-4">
                                                        <input type="date" id="tglTibaAkhir" name="tglTibaAkhir" {...registerPelabuhan("tglTibaAkhir", { required: "Mohon isi tanggal tiba."})} className={errorsPelabuhan.tglTibaAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Tgl Tiba" />
                                                        {errorsPelabuhan.tglTibaAkhir && <small className="text-danger">{errorsPelabuhan.tglTibaAkhir.message}</small>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="card card-action mb-4">
                                        <div className="card-header">
                                            <div className="card-action-title">
                                                <h5 className="mb-0">Apakah ada Kontainer ?</h5>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="cekKontainer" id="ya" value="Ya" {...registerPelabuhan("cekKontainer", { required: "Mohon isi pilihan kontainer."})} />
                                                    <label className="form-check-label" htmlFor="ya">Ya</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="cekKontainer" id="tidak" value="Tidak" {...registerPelabuhan("cekKontainer")} />
                                                    <label className="form-check-label" htmlFor="tidak">Tidak</label>
                                                </div>
                                                {errorsPelabuhan.cekKontainer && <small className="text-danger">{errorsPelabuhan.cekKontainer.message}</small>}
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show" style={{display: (cekdataPelabuhan.cekKontainer === 'Ya' ? 'block' : 'none')}}>
                                            <div className="card-body pt-0">
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <button type="button" className="btn btn-xs btn-primary" data-bs-toggle="modal" data-bs-target="#modKontainer">Tambah Kontainer</button>
                                                    </div>
                                                    <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Nomor Kontainer</th>
                                                                <th>Size</th>
                                                                <th>Stuff</th>
                                                                <th>Tipe</th>
                                                                <th>Segel</th>
                                                                <th>Act</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <DetilKontainer/>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                        <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                                        <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <span className="d-sm-inline-block d-none me-sm-1">Selanjutnya</span>
                                        <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        </div>

                        {/* <!-- Payment --> */}
                        <div id="cardKomoditas" className={wizardPage === 3 ? "content active dstepper-block" : "content"}>
                            <form className="input-form" onSubmit={handleFormMP(onSubmitMP)}>
                                <div className="row">
                                <div className="col-sm-12">
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Uraian</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="card-body pt-0">
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="mediaPembawa">Media Pembawa <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-4">
                                                                    <select name="mediaPembawa" id="mediaPembawa" {...registerMP("mediaPembawa", { required: "Mohon pilih media pembawa."})} className={errorsMP.mediaPembawa ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                                        <option value="">--</option>
                                                                        <option value="H">Hewan</option>
                                                                        <option value="I">Ikan</option>
                                                                        <option value="T">Tumbuhan</option>
                                                                    </select>
                                                                </div>
                                                                {errorsMP.mediaPembawa && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.mediaPembawa.message}</small></div>}
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="jenisMp">Jenis Media Pembawa <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-9">
                                                                    {/* <!-- Hewan --> */}
                                                                    <div style={{display: cekdataMP.mediaPembawa === 'H' || cekdataMP.mediaPembawa === 'I' ? 'block' : 'none'}}>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="jenisMp" id="hidup" value="Hidup" {...registerMP("jenisMp", { required: "Mohon pilih jenis media pembawa."})} />
                                                                            <label className="form-check-label" htmlFor="hidup">{cekdataMP.mediaPembawa === 'H' ? 'Hewan' : 'Ikan'} Hidup</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="jenisMp" id="produk" value="Produk" {...registerMP("jenisMp")} />
                                                                            <label className="form-check-label" htmlFor="produk">Produk {cekdataMP.mediaPembawa === 'H' ? 'Hewan' : 'Ikan'}</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="jenisMp" id="mpl" value="MPL" {...registerMP("jenisMp")} />
                                                                            <label className="form-check-label" htmlFor="mpl">Media Pembawa Lain</label>
                                                                        </div>
                                                                    </div>
                                                                    {/* <!-- Tumbuhan --> */}
                                                                    <div style={{display: cekdataMP.mediaPembawa === 'T' ? 'block' : 'none'}}>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="jenisMp" id="benih" value="Benih" {...registerMP("jenisMp")} />
                                                                            <label className="form-check-label" htmlFor="benih">Benih</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="jenisMp" id="nonbenih" value="Non Benih" {...registerMP("jenisMp")} />
                                                                            <label className="form-check-label" htmlFor="nonbenih">Non Benih</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {errorsMP.jenisMp && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.jenisMp.message}</small></div>}
                                                            </div>
                                                            {/* <!-- Khusus Tumbuhan --> */}
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="jenisAngkut">Jenis Angkut <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-9">
                                                                    <div className="form-check form-check-inline">
                                                                        <input className="form-check-input" type="radio" name="jenisAngkut" id="curah" value="Curah" {...registerMP("jenisAngkut", { required: "Mohon pilih jenis angkut."})} />
                                                                        <label className="form-check-label" htmlFor="curah">Curah</label>
                                                                    </div>
                                                                    <div className="form-check form-check-inline">
                                                                        <input className="form-check-input" type="radio" name="jenisAngkut" id="noncurah" value="Non Curah" {...registerMP("jenisAngkut")} />
                                                                        <label className="form-check-label" htmlFor="noncurah">Non Curah</label>
                                                                    </div>
                                                                </div>
                                                                {errorsMP.jenisAngkut && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.jenisAngkut.message}</small></div>}
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="peruntukan">Peruntukan</label>
                                                                <div className="col-sm-4">
                                                                    <select name="peruntukan" id="peruntukan" {...registerMP("peruntukan", { required: cekdataMP.mediaPembawa === "T" ? "Mohon pilih jenis angkut." : false})} className={errorsMP.peruntukan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                                        <option value="">--</option>
                                                                        <option value="1">Ditanam/Budidaya/Peningkatan Mutu Genetik</option>
                                                                        <option value="2">Konsumsi</option>
                                                                        <option value="3">Penelitian</option>
                                                                        <option value="4">Pameran/Kontes</option>
                                                                        <option value="5">Perdagangan</option>
                                                                        <option value="6">Bahan Baku</option>
                                                                        <option value="99">Lainnya</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-sm-5">
                                                                    <div style={{display: cekdataMP.peruntukan === '99' ? 'block' : 'none'}}>
                                                                        <input type="text" id="peruntukanLain" name="peruntukanLain" {...registerMP("peruntukanLain", { required: cekdataMP.peruntukan === "99" ? "Mohon isi peruntukan lain." : false})} className={errorsMP.peruntukanLain ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Peruntukan Lainnya.." />
                                                                    </div>
                                                                </div>
                                                                {errorsMP.peruntukan && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.peruntukan.message}</small></div>}
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="tingkatOlah">Tingkat Pengolahan</label>
                                                                <div className="col-sm-9">
                                                                    <div className="col-sm-9">
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="tingkatOlah" id="sudah_olah" value="1" {...registerMP("tingkatOlah", { required: "Mohon isi peruntukan lain."})} />
                                                                            <label className="form-check-label" htmlFor="sudah_olah">Sudah Diolah</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="tingkatOlah" id="belum_olah" value="0" {...registerMP("tingkatOlah")} />
                                                                            <label className="form-check-label" htmlFor="belum_olah">Belum Olah</label>
                                                                        </div>
                                                                        {errorsMP.tingkatOlah && <small className="text-danger">{errorsMP.tingkatOlah.message}</small>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="card-body pt-0">
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="jenisKemasan">Jenis Kemasan</label>
                                                                <div className="col-sm-5">
                                                                    <select name="jenisKemasan" id="jenisKemasan" onClick={handleKemasan} {...registerMP("jenisKemasan")} className="form-control form-control-sm">
                                                                        <option value="">--</option>
                                                                        {dataSelect.jenisKemasan}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="jumlahKemasan">Jumlah Kemasan</label>
                                                                <div className="col-sm-6">
                                                                    <input type="text" id="jumlahKemasan" name="jumlahKemasan" {...registerMP("jumlahKemasan")} className="form-control form-control-sm" placeholder="Jumlah Kemasan" />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="tandaKemasan">Tanda pada Kemasan</label>
                                                                <div className="col-sm-6">
                                                                    <input type="text" id="tandaKemasan" name="tandaKemasan" {...registerMP("tandaKemasan")} className="form-control form-control-sm" placeholder="Tanda Kemasan" />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="nilaiBarang">Nilai Barang</label>
                                                                <div className="col-sm-9">
                                                                    <div className='row'>
                                                                        <div className="col-4" style={{paddingRight: '2px'}}>
                                                                            <input type="text" className='form-control form-control-sm' {...registerMP("nilaiBarang")} name='nilaiBarang' id='nilaiBarang' />
                                                                        </div>
                                                                        <div className="col-2" style={{paddingLeft: '2px'}}>
                                                                            <select name="satuanNilai" id="satuanNilai" onClick={handleMataUang} className='form-control form-control-sm' {...registerMP("satuanNilai")}>
                                                                                <option value="">--</option>
                                                                                {dataSelect.satuanNilai}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    {/* <input type="text" id="nilaiBarang" name="nilaiBarang" value={komoditas.nilaiBarang || ""} onChange={handleKomoditas} className="form-control form-control-sm" placeholder="Nilai Barang" /> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Detil Media Pembawa</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="card-body pt-0">
                                                        <div className="row g-3 mb-3">
                                                            <div className="col-sm-6">
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-4 col-form-label" htmlFor="namaTercetak">Nama Tercetak</label>
                                                                    <div className="col-sm-8">
                                                                        <input type="text" id="namaTercetak" name="namaTercetak" {...registerMP("namaTercetak")} className="form-control form-control-sm" placeholder="Nama Tercetak" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-4 col-form-label" htmlFor="namaLatinTc">Nama Latin Tercetak</label>
                                                                    <div className="col-sm-8">
                                                                        <input type="text" id="namaLatinTc" name="namaLatinTc" {...registerMP("namaLatinTc")} className="form-control form-control-sm" placeholder="Nama Latin Tercetak" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <div className="row mb-2">
                                                                    <label className="col-sm-2 col-form-label" htmlFor="bentukJumlahTc">Bentuk, Jumlah Tercetak</label>
                                                                    <div className="col-sm-4">
                                                                        <input type="text" id="bentukJumlahTc" name="bentukJumlahTc" {...registerMP("bentukJumlahTc")} className="form-control form-control-sm" placeholder="Bentuk, Jumlah Tercetak" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <button type="button" className="btn btn-xs btn-primary" data-bs-toggle={cekdataMP.jenisMp ? "modal" : ""} data-bs-target={cekdataMP.jenisMp ? "#modKomoditas" : ""} onClick={cekdataMP.jenisMp ? null : () => {alert("Mohon Pilih Jenis Media Pembawa")}}>Tambah Komoditas</button>
                                                            </div>
                                                            <div className="table-responsive text-nowrap">
                                                                <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>No</th>
                                                                            <th>Kode HS</th>
                                                                            <th>Klasifikasi</th>
                                                                            <th>Komoditas Umum</th>
                                                                            <th>Komoditas En/Latin</th>
                                                                            <th>Netto</th>
                                                                            <th>Satuan</th>
                                                                            <th>Bruto</th>
                                                                            <th>Satuan</th>
                                                                            <th>Jumlah</th>
                                                                            <th>Satuan</th>
                                                                            <th>Jantan</th>
                                                                            <th>Betina</th>
                                                                            <th>Breed</th>
                                                                            <th>Asal</th>
                                                                            <th>Keterangan</th>
                                                                            <th>Harga</th>
                                                                            <th>Mata Uang</th>
                                                                            <th>Act</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>1</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>
                                                                                <div className="dropdown">
                                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                                                    </button>
                                                                                    <div className="dropdown-menu">
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>2</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>
                                                                                <div className="dropdown">
                                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                                                    </button>
                                                                                    <div className="dropdown-menu">
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                        <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                                        <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <span className="d-sm-inline-block d-none me-sm-1">Selanjutnya</span>
                                        <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
                                    </button>
                                </div>
                                </div>
                            </form>
                        </div>

                        {/* <!-- Confirmation --> */}
                        <div id="cardDokumen" className={wizardPage === 4 ? "content active dstepper-block" : "content"}>
                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Detil Dokumen</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="card-body pt-0">
                                                        <div className="row g-3 mb-3">
                                                            <div className="col-md-6">
                                                                <button type="button" className="btn btn-xs btn-primary">Tambah Dokumen</button>
                                                            </div>
                                                            <div className="table-responsive text-nowrap">
                                                                <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>No</th>
                                                                            <th>Jenis Dokumen</th>
                                                                            <th>No Dokumen</th>
                                                                            <th>Tgl Dokumen</th>
                                                                            <th>Asal Penerbit</th>
                                                                            <th>Keterangan</th>
                                                                            <th>File</th>
                                                                            <th>Act</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>1</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>
                                                                                <div className="dropdown">
                                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                                                    </button>
                                                                                    <div className="dropdown-menu">
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>2</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>
                                                                                <div className="dropdown">
                                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                                                    </button>
                                                                                    <div className="dropdown-menu">
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                        <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                                        <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={() => setWizardPage(wizardPage + 1)}>
                                        <span className="d-sm-inline-block d-none me-sm-1">Konfirmasi</span>
                                        <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="cardKonfirmasi" className={wizardPage === 5 ? "content active dstepper-block" : "content"}>
                            <div className="row mb-3">
                                <div className="col-12 col-lg-8 offset-lg-2 text-center mb-3">
                                    <h4 className="mt-2">Terimakasih! 😇</h4>
                                    <p>Silahkan cek kembali kelengkapan data yang diinput!</p>
                                    <p>
                                        Silahkan klik tombol Simpan jika data yang diinput sudah benar.
                                    </p>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <button type="button" className="btn btn-primary btn-prev" onClick={() => setWizardPage(wizardPage - 1)}>
                                        <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                                        <span className="d-sm-inline-block d-none">Cek Kembali</span>
                                    </button>
                                    <button type="submit" className="btn btn-success">
                                        <i className="bx bx-save bx-sm"></i>
                                        <span className="d-sm-inline-block d-none me-sm-1">Simpan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
    <div className="modal fade" id="modKontainer" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered1 modal-simple">
                  <div className="modal-content p-1">
                    <div className="modal-body">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div className="text-center mb-4">
                        <h3>Tambah Kontainer Baru</h3>
                        <p>{editKontainer}</p>
                      </div>
                      <form id="addNewCCForm" className="row" onSubmit={handleFormKontainer(onSubmitKontainer)}>
                        <div className="col-6">
                          <label className="form-label" htmlFor="noKontainer">No Kontainer <span className='text-danger'>*</span></label>
                          <div className="input-group input-group-merge">
                            <input
                              id="noKontainer"
                              name="noKontainer"
                              type="text"
                              placeholder="AAAA9999999"
                              {...registerKontainer("noKontainer", { required: "Mohon isi nomor kontainer."})} className={errorsKontainer.noKontainer ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                               />
                          </div>
                          {errorsKontainer.noKontainer && <small className="text-danger">{errorsKontainer.noKontainer.message}</small>}
                        </div>
                        <div className="col-6 col-md-6">
                          <label className="form-label" htmlFor="tipeKontainer">Tipe Kontainer <span className='text-danger'>*</span></label>
                          <div className="input-group input-group-merge">
                            <select name="tipeKontainer" id="tipeKontainer" {...registerKontainer("tipeKontainer", { required: "Mohon pilih tipe kontainer."})} className={errorsKontainer.tipeKontainer ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                <option value="">--</option>
                                <option value="1">General/Dry cargo</option>
                                <option value="2">Tunnel type</option>
                                <option value="3">Open Top Steel</option>
                                <option value="4">Flat Rack</option>
                                <option value="5">Reefer / Refrigerate</option>
                                <option value="6">Barge Container</option>
                                <option value="7">Bulk Container</option>
                            </select>
                          </div>
                          {errorsKontainer.tipeKontainer && <small className="text-danger">{errorsKontainer.tipeKontainer.message}</small>}
                        </div>
                        <div className="col-6 col-md-6">
                          <label className="form-label" htmlFor="ukuranKontainer">Ukuran Kontainer <span className='text-danger'>*</span></label>
                          <div className="input-group input-group-merge">
                            <select name="ukuranKontainer" id="ukuranKontainer" {...registerKontainer("ukuranKontainer", { required: "Mohon pilih ukuran kontainer."})} className={errorsKontainer.ukuranKontainer ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                <option value="">--</option>
                                <option value="1">20 feet</option>
                                <option value="2">40 feet</option>
                                <option value="3">42 feet</option>
                                <option value="4">43 feet</option>
                                <option value="5">45 feet</option>
                                <option value="6">50 feet</option>
                                <option value="7">Lainnya</option>
                            </select>
                          </div>
                          {errorsKontainer.ukuranKontainer && <small className="text-danger">{errorsKontainer.ukuranKontainer.message}</small>}
                        </div>
                        <div className="col-6 col-md-6">
                          <label className="form-label" htmlFor="stuffKontainer">Stuff Kontainer</label>
                          <div className="input-group input-group-merge">
                            <select name="stuffKontainer" id="stuffKontainer" {...registerKontainer("stuffKontainer")} className="form-control form-control-sm">
                                <option value="">--</option>
                                <option value="1">FCL</option>
                                <option value="2">LCL</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-6 col-md-6">
                          <label className="form-label" htmlFor="segel">Segel</label>
                          <div className="input-group input-group-merge">
                            <input type="text" className="form-control form-control-sm" name="segel" id="segel" {...registerKontainer("segel")}/>
                          </div>
                        </div>
                        <div className="col-6 text-center mt-4">
                          <button type="submit" className="btn btn-sm btn-primary me-sm-3 me-1">Tambah</button>
                          <button
                            type="reset"
                            className="btn btn-sm btn-label-secondary btn-reset"
                            data-bs-dismiss="modal"
                            aria-label="Close">
                            Tutup
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal fade" id="modKomoditas" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-simple">
                  <div className="modal-content p-3 pb-1">
                    <div className="modal-body">
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      <div className="text-center mb-4">
                        <h3 className="address-title">Tambah Media Pembawa {cekdataMP.mediaPembawa === 'H' ? 'Hewan' : (cekdataMP.mediaPembawa === 'I' ? 'Ikan' : 'Tumbuhan')}</h3>
                      </div>
                      <form onSubmit={handleFormDetilMP(onSubmitDetilMP)} className="row g-3">
                        {cekdataMP.mediaPembawa === 'T' ?
                        <>
                        <div className="col-6">
                          <label className="form-label" htmlFor="peruntukanMP">Peruntukan</label>
                          <select name="peruntukanMP" id="peruntukanMP" gol={cekdataMP.jenisMp === 'Benih' ? 'A' : '!=A'} onClick={handlePeruntukanKT} {...registerDetilMP("peruntukanMP")} className="form-control form-control-sm">
                            <option value="">--</option>
                            {dataSelect.peruntukanMP}
                            {/* <MasterKlasKT gol={cekdataMP.jenisMp === 'Benih' ? 'A' : 'BCD'}/> */}
                          </select>
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="volumeNetto">Volume Netto</label>
                            <div className='row'>
                                <div className="col-5" style={{paddingRight: '2px'}}>
                                    <input type="text" name='volumeNetto' id='volumeNetto' {...registerDetilMP("volumeNetto", {required: "Mohon isi volume netto."})} className={errorsKontainer.volumeNetto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                </div>
                                <div className="col-7" style={{paddingLeft: '2px'}}>
                                    <select name="satuanNetto" id="satuanNetto" onClick={handleMasterSatuan} kar={cekdataMP.mediaPembawa === 'T' ? 'kt' : (cekdataMP.mediaPembawa === 'H' ? 'kh' : 'ki')} {...registerDetilMP("satuanNetto", {required: "Mohon isi satuan netto."})} className={errorsKontainer.satuanNetto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                        <option value="">--</option>
                                        {dataSelect.satuanNetto}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="komoditasMP">Komoditas</label>
                          <div className='row'>
                            <div className='col-4' style={{paddingRight: '2px'}}>
                                <input type="text" className='form-control form-control-sm' name='kodeKomoditasMP' id='kodeKomoditasMP' value={komMP.kodeKomoditasMP || ""} onChange={handleKomKTByID} readOnly />
                            </div>
                            <div className='col-8' style={{paddingLeft: '2px'}}>
                                <select name="komoditasMP" id="komoditasMP" className="form-control form-control-sm" value={komMP.idkom || ""} onChange={handleKomKTByID}>
                                  <option value="">--</option>
                                  <MasterKomKT/>
                                </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="volumeBrutto">Volume Brutto</label>
                            <div className='row'>
                                <div className="col-5" style={{paddingRight: '2px'}}>
                                    <input type="text" className='form-control form-control-sm' name='volumeBrutto' id='volumeBrutto' />
                                </div>
                                <div className="col-7" style={{paddingLeft: '2px'}}>
                                    <select name="satuanBrutto" id="satuanBrutto" className='form-control form-control-sm'>
                                        <option value="">--</option>
                                        <MasterSatuan kar={komoditas.mediaPembawa === 'T' ? 'kt' : (komoditas.mediaPembawa === 'H' ? 'kh' : 'ki')}/>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="kodeHSMp">Kode HS</label>
                          <select name="kodeHSMp" id="kodeHSMp" className="form-control form-control-sm">
                            <option value="">--</option>
                            <MasterHS kar={komoditas.mediaPembawa === 'T' ? 'kt' : (komoditas.mediaPembawa === 'H' ? 'kh' : 'ki')}/>
                          </select>
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="volumeLain">Volume Lain</label>
                            <div className='row'>
                                <div className="col-5" style={{paddingRight: '2px'}}>
                                    <input type="text" className='form-control form-control-sm' name='volumeLain' id='volumeLain' />
                                </div>
                                <div className="col-7" style={{paddingLeft: '2px'}}>
                                    <select name="satuanLain" id="satuanLain" className='form-control form-control-sm'>
                                        <option value="">--</option>
                                        <MasterSatuan kar={komoditas.mediaPembawa === 'T' ? 'kt' : (komoditas.mediaPembawa === 'H' ? 'kh' : 'ki')}/>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="namaUmum">Nama Umum</label>
                          <input name="namaUmum" id="namaUmum" value={komMP.namaUmum || ""} onChange={handleKomKTByID} className="form-control form-control-sm" />
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="nilaiBarangMP">Nilai Barang</label>
                            <div className='row'>
                                <div className="col-7" style={{paddingRight: '2px'}}>
                                    <input type="text" className='form-control form-control-sm' name='nilaiBarangMP' id='nilaiBarangMP' />
                                </div>
                                <div className="col-5" style={{paddingLeft: '2px'}}>
                                    <select name="satuanNilaiMP" id="satuanNilaiMP" className='form-control form-control-sm'>
                                        <option value="">--</option>
                                        <MasterMataUang/>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="namaLatin">Nama Latin</label>
                          <input name="namaLatin" id="namaLatin" value={komMP.namaLatin || ""} onChange={handleKomKTByID} className="form-control form-control-sm" />
                        </div>
                        <div className="col-6">
                        <label className="form-label" htmlFor="jumlahKemasan">Jumlah Kemasan</label>
                          <div className='row'>
                            <div className='col-4' style={{paddingRight: '2px'}}>
                                <input type="text" className='form-control form-control-sm' name='jumlahKemasan' id='jumlahKemasan' />
                            </div>
                            <div className='col-8' style={{paddingLeft: '2px'}}>
                                <select name="satuanKemasan" id="satuanKemasan" className="form-control form-control-sm">
                                  <option value="">--</option>
                                  <MasterKemasan/>
                                </select>
                            </div>
                          </div>
                        </div>
                        </> :
                        <>
                        <div className="col-6">
                          <label className="form-label" htmlFor="komoditasMP">Komoditas</label>
                          <div className='row'>
                            <div className='col-4' style={{paddingRight: '2px'}}>
                                <input type="text" className='form-control form-control-sm' name='kodeKomoditasMP' id='kodeKomoditasMP' />
                            </div>
                            <div className='col-8' style={{paddingLeft: '2px'}}>
                                <select name="komoditasMP" id="komoditasMP" className="form-control form-control-sm">
                                  <option value="">--</option>
                                </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="negaraAsalMP">Negara Asal</label>
                            <select name="negaraAsalMP" id="negaraAsalMP" onClick={dataSelect.negaraAsalMP ? null : handleNegara} className="form-control form-control-sm">
                                <option value="">--</option>
                                {dataSelect.negaraAsalMP}
                                {/* <MasterNegara/> */}
                            </select>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="kodeHSMP">Kode HS</label>
                            <select name="kodeHSMP" id="kodeHSMP" className="form-control form-control-sm">
                                <option value="">--</option>
                            </select>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="ketTambahan">Keterangan Tambahan</label>
                            <input name="ketTambahan" id="ketTambahan" className="form-control form-control-sm" />
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="jumlahMP">Jumlah</label>
                          <div className='row'>
                            <div className='col-7' style={{paddingRight: '2px'}}>
                                <input type="text" className='form-control form-control-sm' name='jumlahMP' id='jumlahMP' />
                            </div>
                            <div className='col-5' style={{paddingLeft: '2px'}}>
                                <select name="satJumlahMP" id="satJumlahMP" className="form-control form-control-sm">
                                  <option value="">--</option>
                                </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="breedMP">Breed</label>
                            <input name="breedMP" id="breedMP" className="form-control form-control-sm" />
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="nettoMP">Netto</label>
                          <div className='row'>
                            <div className='col-7' style={{paddingRight: '2px'}}>
                                <input type="text" className='form-control form-control-sm' name='nettoMP' id='nettoMP' />
                            </div>
                            {/* ekor: 1122 || KG: 1356  */}
                            <div className='col-5' style={{paddingLeft: '2px'}}>
                                <input type="hidden" name='satNettoMP' id='satNettoMP' value={komoditas.jenisMp === 'Hidup' ? '1122' : '1356'} onChange={handleKomKTByID} />
                                <input type="text" className='form-control form-control-sm' value={komoditas.jenisMp === 'Hidup' ? 'EKOR' : 'KILOGRAM'} readOnly onChange={handleKomKTByID} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="nilaiBarangMP">Nilai Barang</label>
                            <div className='row'>
                                <div className="col-7" style={{paddingRight: '2px'}}>
                                    <input type="text" className='form-control form-control-sm' name='nilaiBarangMP' id='nilaiBarangMP' />
                                </div>
                                <div className="col-5" style={{paddingLeft: '2px'}}>
                                    <select name="satuanNilaiMP" id="satuanNilaiMP" className='form-control form-control-sm'>
                                        <option value="">--</option>
                                        <MasterMataUang/>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="brutoMP">Bruto</label>
                          <div className='row'>
                            <div className='col-7' style={{paddingRight: '2px'}}>
                                <input type="text" className='form-control form-control-sm' name='brutoMP' id='brutoMP' />
                            </div>
                            {/* ekor: 1122 || KG: 1356  */}
                            <div className='col-5' style={{paddingLeft: '2px'}}>
                                <input type="hidden" name='satBrutoMP' id='satBrutoMP' value={komoditas.jenisMp === 'Hidup' ? '1122' : '1356'} onChange={handleKomKTByID} />
                                <input type="text" className='form-control form-control-sm' value={komoditas.jenisMp === 'Hidup' ? 'EKOR' : 'KILOGRAM'} readOnly onChange={handleKomKTByID} />
                            </div>
                          </div>
                        </div>
                        </>
                        }
                        <div className="col-12 text-center">
                          <button type="submit" className="btn btn-primary me-sm-3 me-1">Tambah</button>
                          <button
                            type="reset"
                            className="btn btn-label-secondary"
                            data-bs-dismiss="modal"
                            aria-label="Close">
                            Tutup
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
</div>
  )
}

export default DocK11