import Cookies from 'js-cookie'
import {decode as base64_decode} from 'base-64'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PtkModel from '../../model/PtkModel'
import PtkPemeriksaan from '../../model/PtkPemeriksaan'
import Select from 'react-select'
import PegawaiJson from '../../model/master/pegawaiPertanian.json'
import ListPsat from '../../model/master/psat.json'
import LoadBtn from '../../component/loading/LoadBtn'
import Swal from 'sweetalert2'
import PtkHistory from '../../model/PtkHistory'

function masterPegawai() {
    var arrayPegawai = PegawaiJson.map(item => {
        return {
            value: item.id,
            label: item.nama + " - " + item.nip,
        }
    })
    return arrayPegawai
}

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#D4D8DD',
        cursor: 'text',
        minHeight: '30px',
        height: '30px',
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: '30px',
        padding: '0 6px'
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',
    }),
}

const modelPemohon = new PtkModel()
const modelPeriksa = new PtkPemeriksaan()
const log = new PtkHistory()

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function randomKey(jmlKont,rskLevel,jnsMP) {
    var jmlSampling = 0
    if(Cookies.get("jenisKarantina") == "T") {
        jmlKont = parseInt(jmlKont)
        if (jnsMP == "PSAT") {
            if (jmlKont > 0)  jmlSampling = jmlKont
            if (jmlKont > 5) jmlSampling = 5
            if (jmlKont > 10) jmlSampling = 5
            if (jmlKont > 26) jmlSampling = 7
            if (jmlKont > 50) jmlSampling = 10
            if (jmlKont > 100) jmlSampling = Math.ceil(sqrt(jmlKont))
            
        } else if (jnsMP == "media pembawa") {
            if (rskLevel == "L") {
                if (jmlKont > 0) jmlSampling = jmlKont
                if (jmlKont > 1) jmlSampling = 2
                if (jmlKont > 10) jmlSampling = 3
                if (jmlKont > 15) jmlSampling = 4
                if (jmlKont > 20) jmlSampling = 5
                if (jmlKont > 25) jmlSampling = 6
                
            } else if (rskLevel == "M") {
                if (jmlKont > 0) jmlSampling = jmlKont
                if (jmlKont > 1) jmlSampling = 2
                if (jmlKont > 10) jmlSampling = 3
                if (jmlKont > 15) jmlSampling = 4
                if (jmlKont > 20) jmlSampling = 5
                if (jmlKont > 25) jmlSampling = 6
                
            } else if (rskLevel == "H") {
                if (jmlKont > 0) jmlSampling = jmlKont
                if (jmlKont > 6) jmlSampling = 5
                if (jmlKont > 15) jmlSampling = 6
                if (jmlKont > 18) jmlSampling = 7
                if (jmlKont > 21) jmlSampling = 8
                if (jmlKont > 24) jmlSampling = 9
                if (jmlKont > 27) jmlSampling = 10
                if (jmlKont > 30) jmlSampling = 11
                if (jmlKont > 50) jmlSampling = Math.ceil(jmlKont / 5)
            }
        }
    } else if(Cookies.get("jenisKarantina") == "H") {
        if (rskLevel=="L") {
            if (jmlKont > 0) jmlSampling = jmlKont
            if (jmlKont > 1) jmlSampling = 2
            if (jmlKont > 9) jmlSampling = 3
            if (jmlKont > 19) jmlSampling = 5
            if (jmlKont > 29) jmlSampling = 8
            if (jmlKont > 49) jmlSampling = 13
            
        } else if (rskLevel=="M") {
            if (jmlKont > 0) jmlSampling = jmlKont
            if (jmlKont > 1) jmlSampling = 2
            if (jmlKont > 5) jmlSampling = 3
            if (jmlKont > 9) jmlSampling = 4
            if (jmlKont > 19) jmlSampling = 8
            if (jmlKont > 29) jmlSampling = 11
            if (jmlKont > 49) jmlSampling = 19
        } else if (rskLevel=="H"){
            jmlSampling = jmlKont;	//untuk resiko tinggi tidak ada diaturan permentan
        }
    } else if(Cookies.get("jenisKarantina") == "I") {
        if (jmlKont > 0) jmlSampling = jmlKont
        if (jmlKont > 1) jmlSampling = 1
        if (jmlKont > 5) jmlSampling =  Math.ceil(jmlKont / 5)
    }

    const arrayRan = Array.from({length: jmlKont}, () => randomBetween(1, jmlSampling))

    return arrayRan
}

function DocK310() {
    const idPtk = Cookies.get("idPtkPage");
    let [data, setData] = useState({
        noAju: "",
        noIdPtk: "",
        noDokumen: "",
        tglDokumen: "",
    })
    let [onLoad, setOnLoad] = useState(false)
    let [listKontainer, setListKontainer] = useState([])
    let [kontainerRandom, setKontainerRandom] = useState([])
    let [riskLevel, setRiskLevel] = useState(["L", "M", "H"])

    const {
        register,
        setValue,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        noDok310: ""
    });

    const dataWatch = watch()

    const onSubmit = (dataSubmit) => {
        setOnLoad(true)
        const response = modelPeriksa.pnSP2MP(dataSubmit);
        response
        .then((response) => {
            if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                console.log(response)
            }
            if(response.data) {
                setOnLoad(false)
                if(response.data.status == 201) {
                    //start save history
                    const resHsy = log.pushHistory(dataSubmit.idPtk, "P1a", "K-3.10", (dataSubmit.idDok310 ? 'UPDATE' : 'NEW'));
                    resHsy
                    .then((response) => {
                        if(response.data.status == 201) {
                            if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                                console.log("history saved")
                            }
                        }
                    })
                    .catch((error) => {
                        if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                            console.log(error)
                        }
                    });
                    //end save history
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Surat Perintah Pemindahan Media Pembawa (SP2MP) berhasil " + (dataSubmit.idDok310 ? 'diubah' : 'disimpan')
                    })
                    setValue("idDok310", response.data.data.id)
                    setValue("noDok310", response.data.data.nomor)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.data.message
                    })
                }
            }
        })
        .catch((error) => {
            setOnLoad(false)
            if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: error.response.data.message
            })
        });
    }

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok310", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
            const tglPtk = Cookies.get("tglPtk");
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            
            setData(values => ({...values,
                noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                noDokumen: idPtk ? base64_decode(ptkNomor[2]) : "",
                tglDokumen: tglPtk,
            }));
            const response = modelPemohon.getPtkId(base64_decode(ptkNomor[1]));
            response
            .then((response) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log("response ptk")
                    console.log(response)
                }
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        const filterNullRisk = response.data.data.ptk_komoditi?.filter(item => item.level_risiko != null)
                        // let levelRiskOk = []
                        
                        if(filterNullRisk.length == 0) {
                            setRiskLevel(riskLevel)
                        } else if(filterNullRisk.length > 1) {
                            setRiskLevel([filterNullRisk[0].level_risiko])
                            if(Cookies.get("jenisKarantina") == "T") {
                                const groupedMP = response.data.data.ptk_komoditi?.reduce(
                                    (entryMap, e) => entryMap.set(e.komoditas_id, [...entryMap.get(e.komoditas_id)||[], e]),
                                    new Map()
                                );
                                console.log("groupedMP")
                                console.log(groupedMP)
                            }
                            randomKey(response.data.data.ptk_kontainer.length,filterNullRisk[0].level_risiko,ListPsat)
                        } else {
                            const groupedMap = filterNullRisk.reduce(
                                (entryMap, e) => entryMap.set(e.level_risiko, [...entryMap.get(e.level_risiko)||[], e]),
                                new Map()
                                );
                            setValue("riskLevel", groupedMap)
                        }
                        setData(values => ({...values,
                            errorPTK: "",
                            listPtk: response.data.data.ptk,
                            listKomoditas: response.data.data.ptk_komoditi,
                            // listKontainer: response.data.data.ptk_kontainer,
                            listDokumen: response.data.data.ptk_dokumen
                        }));
                        setListKontainer(response.data.data.ptk_kontainer)
                        setValue("idPtk", base64_decode(ptkNomor[1]))
                        setValue("noDokumen", base64_decode(ptkNomor[2]))
                        setValue("tglDatang", response.data.data.ptk?.tanggal_rencana_tiba_terakhir)
                        setValue("gudangId", response.data.data.ptk?.gudang_id)
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK",
                        }))
                    }
                } else {
                    setData(values => ({...values,
                        errorPTK: "Gagal load data PTK",
                    }))
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorPTK: "Gagal load data PTK",
                }))
            });
            
            const response310 = modelPeriksa.getPnSP2MP(base64_decode(ptkNomor[1]));
            response310
            .then((response) => {
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorSp2mp: "",
                        }))
                        // setValue("idPtk", response.data.data.id)
                        // setValue("noDok31", response.data.data.nomor)
                        // setValue("tglDok31", response.data.data.tanggal)
                        // setValue("putusanBongkar", response.data.data.setuju_bongkar_muat)
                        // setValue("ttdPutusan", response.data.data.user_ttd_id?.toString())
                    }
                } else {
                    setData(values => ({...values,
                        errorSp2mp: "Gagal load data history SP2MP",
                    }))
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.data.status == 404) {
                    setData(values => ({...values,
                        errorSp2mp: ""
                    }));
                } else {
                    setData(values => ({...values,
                        errorSp2mp: "Gagal load data history SP2MP"
                    }));
                }
            });
        }
    },[idPtk, setValue])

    console.log(listKontainer)

    function refreshData() {

    }

  return (
    <div className="container-fluid flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-3.10 <span className="fw-light" style={{color: 'blue'}}>SURAT PERINTAH PEMINDAHAN MEDIA PEMBAWA (SP2MP)</span>

            <small className='float-end'>
                <span className='text-danger'>{(data.errorBongkar ? data.errorBongkar + "; " : "") + (data.errorPTK ? data.errorPTK + "; " : "")}</span>
                {data.errorBongkar || data.errorPTK ?
                    <button type='button' className='btn btn-warning btn-xs' onClick={() => refreshData()}><i className='fa-solid fa-sync'></i> Refresh</button>
                : ""}
            </small>
        </h4>

        <div className="row">
            <div className="col-xxl">
                <div className="card card-action mb-4">
                    <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                        <div className="card-action-title text-lightest">
                            <div className='row'>
                                <label className="col-sm-1 col-form-label text-sm-end" htmlFor="noDok"><b>No PTK</b></label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok" value={data.noDokumen || ""} className="form-control form-control-sm" placeholder="Nomor PTK" disabled />
                                </div>
                                <label className="col-sm-1 col-form-label" htmlFor="tglDokumen"><b>Tanggal</b></label>
                                <div className="col-sm-2">
                                    <input type="text" id='tglSurtug' value={data.tglDokumen || ""} className='form-control form-control-sm' disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="card-action-element">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} id='formSp2mp'>
                            <input type="hidden" id='idDok310' {...register("idDok310")} />
                            <input type="hidden" id='idPtk' {...register("idPtk")} />
                            <input type="hidden" id='noDokumen' {...register("noDokumen")} />
                            <input type="hidden" id='gudangId' {...register("gudangId")} />
                            <div className="col-md-12 mt-3">
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok310">Nomor Dokumen</label>
                                    <div className="col-sm-3">
                                        <input type="text" id="noDok310" name='noDok310' {...register("noDok310")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-3.10" disabled />
                                    </div>
                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok310">Tanggal <span className='text-danger'>*</span></label>
                                    <div className="col-sm-2">
                                        <input type="datetime-local" id="tglDok310" name='tglDok310' {...register("tglDok310", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok310 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                        {errors.tglDok310 && <small className="text-danger">{errors.tglDok310.message}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="col">
                                    <div className="accordion" id="collapseSection">
                                        <div className="card">
                                            <h2 className="accordion-header" id="headerImporter">
                                                <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                                <h5 className='text-lightest mb-0'>Rincian Keterangan</h5>
                                                </button>
                                            </h2>
                                            <div id="collapseImporter">
                                                <div className="accordion-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <h5 className='mb-1'><b><u>Identitas Pemilik</u></b></h5>
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="namaPenerima">Nama</label>
                                                                <div className="col-sm-9">
                                                                    <input type="text" id="namaPenerima" value={data.listPtk?.nama_penerima || ""} disabled className="form-control form-control-sm" placeholder="Nama Penerima" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h5 className='mb-1'><b><u>Identitas Pengirim</u></b></h5>
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="namaPengirim">Nama</label>
                                                                <div className="col-sm-9">
                                                                    <input type="text" id="namaPengirim" value={data.listPtk?.nama_pengirim || ""} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-1">
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="alamatPenerima">Alamat</label>
                                                                <div className="col-sm-9">
                                                                    <textarea name="alamatPenerima" className="form-control form-control-sm" disabled value={data.listPtk?.alamat_penerima || ""} id="alamatPenerima" rows="2" placeholder=""></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="alamatPengirim">Alamat</label>
                                                                <div className="col-sm-9">
                                                                    <textarea name="alamatPengirim" className="form-control form-control-sm" disabled value={data.listPtk?.alamat_pengirim || ""} id="alamatPengirim" rows="2" placeholder=""></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="identitasPenerima">Identitas</label>
                                                                <div className="col-sm-9">
                                                                    <input name="identitasPenerima" className="form-control form-control-sm" disabled value={(data.listPtk?.jenis_identitas_penerima + " - " + data.listPtk?.nomor_identitas_penerima) || ""} id="identitasPenerima" placeholder="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="identitasPengirim">Identitas</label>
                                                                <div className="col-sm-9">
                                                                    <input name="identitastPengirim" className="form-control form-control-sm" disabled value={(data.listPtk?.jenis_identitas_pengirim + " - " + data.listPtk?.nomor_identitas_pengirim) || ""} id="identitasPengirim" placeholder="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                        <h5 className='mb-1'><b><u>Identitas Alat Angkut</u></b></h5>
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="namaAngkutan">Nama</label>
                                                                <div className="col-sm-9">
                                                                    <input type="text" id="namaAngkutan" value={data.listPtk?.nama_alat_angkut_terakhir || ""} disabled className="form-control form-control-sm" placeholder="Nama Angkut" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mt-4">
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="noAngkutan">Nomor</label>
                                                                <div className="col-sm-9">
                                                                    <input type="text" id="noAngkutan" value={data.listPtk?.no_voyage_terakhir || ""} disabled className="form-control form-control-sm" placeholder="Nomor Alat Angkut" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="callSign">Call Sign</label>
                                                                <div className="col-sm-9">
                                                                    <input type="text" id="callSign" value={data.listPtk?.tanda_khusus || ""} disabled className="form-control form-control-sm" placeholder="Call Sign" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="jmlKemasan">Jml Kemasan</label>
                                                                <div className="col-sm-9">
                                                                    <input type="text" id="jmlKemasan" value={(data.listPtk?.jumlah_kemasan + " " + data.listPtk?.kemasan) || ""} disabled className="form-control form-control-sm" placeholder="Jumlah Kemasan / Kontainer" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="negaraAsal">Negara/Area Asal</label>
                                                                <div className="col-sm-8">
                                                                    <input type="text" id="negaraAsal" value={data.listPtk?.negara_muat || ""} disabled className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="negaraTujuan">Negara/Area Tujuan</label>
                                                                <div className="col-sm-8">
                                                                    <input type="text" id="negaraTujuan" value={data.listPtk?.negara_bongkar || ""} disabled className="form-control form-control-sm" placeholder="Negara/Area Tujuan" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="tpft">TPK / TPFT</label>
                                                                <div className="col-sm-8">
                                                                    <input type="text" id="tpft" value={data.listPtk?.gudang_id || ""} disabled className="form-control form-control-sm" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="pelBongkar">Lokasi Bongkar</label>
                                                                <div className="col-sm-8">
                                                                    <input type="text" id="pelBongkar" value={(data.listPtk?.kd_pelabuhan_bongkar + " - " + data.listPtk?.pelabuhan_bongkar) || ""} disabled className="form-control form-control-sm" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="tglKirim">Tanggal Pengiriman</label>
                                                                <div className="col-sm-4">
                                                                    <input type="date" id="tglKirim" value={data.listPtk?.tanggal_rencana_berangkat_terakhir || ""} disabled className="form-control form-control-sm" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="tglDatang">Tanggal Kedatangan</label>
                                                                <div className="col-sm-4">
                                                                    <input type="date" id="tglDatang" {...register("tglDatang", {required: "Mohon isi tanggal bongkar aktual."})} className="form-control form-control-sm" />
                                                                    {errors.tglDatang && <small className="text-danger">{errors.tglDatang.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="agen">Level Resiko MP</label>
                                                                <div className="col-sm-4">
                                                                    <select className='form-select form-select-sm' name="riskLevel" id="riskLevel" value={riskLevel.length == 1 ? riskLevel[0] : ""} {...register("riskLevel", {required: "Mohon pilih level risiko"})}>
                                                                        <option value="">--</option>
                                                                        {riskLevel.map((data,index) => (
                                                                            <option value={data} key={index}>{data == "L" ? "Rendah" : (data == "M" ? "Sedang" : (data == "H" ? "Tinggi" : ""))}</option>
                                                                        ))}
                                                                    </select>
                                                                    {errors.riskLevel && <small className="text-danger">{errors.riskLevel.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <h6 className='mb-1'><b>Lampiran dokumen</b></h6>
                                                    <table className="table table-sm table-bordered table-hover table-striped dataTable mb-4">
                                                        <thead style={{backgroundColor: '#123138'}}>
                                                            <tr>
                                                                <th className='text-lightest'>No</th>
                                                                <th className='text-lightest'>Jenis Dokumen</th>
                                                                <th className='text-lightest'>Nomor</th>
                                                                <th className='text-lightest'>Lampiran</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.listDokumen ? (data.listDokumen?.map((data, index) => (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{data.nama_dokumen}</td>
                                                                            <td>{data.no_dokumen}</td>
                                                                            <td><a href={import.meta.env.VITE_REACT_APP_BE_LINK + data.efile} target='_blank' rel='noreferrer'>{data.efile}</a></td>
                                                                        </tr>
                                                                    ))
                                                                ) : null
                                                            }
                                                        </tbody>
                                                    </table>
                                                    <span className='float-end mb-1'>
                                                        {/* <div className="row">
                                                            <div className="col-md-12"> */}
                                                            {/* </div> */}
                                                            {/* <div className="col-md-8">
                                                            </div>
                                                        </div>  */}
                                                            <button className='btn btn-sm btn-outline-dark text-black'>Generate Random Sampling</button>
                                                    </span>
                                                    <h6 className='mb-1'><b>List Kontainer : {listKontainer?.length + " kontainer"}</b></h6>
                                                    <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                        <thead style={{backgroundColor: '#123138' }}>
                                                            <tr>
                                                                <th className='text-lightest'>No</th>
                                                                <th className='text-lightest'>Nomor Kontainer</th>
                                                                <th className='text-lightest'>Size</th>
                                                                <th className='text-lightest'>Stuff</th>
                                                                <th className='text-lightest'>Tipe</th>
                                                                <th className='text-lightest'>Segel</th>
                                                                <th className='text-lightest'>Sampling</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listKontainer ? (
                                                                listKontainer?.map((data, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{data.nomor}</td>
                                                                        <td>{data.ukuran}</td>
                                                                        <td>{data.stuff}</td>
                                                                        <td>{data.tipe}</td>
                                                                        <td>{data.segel}</td>
                                                                        <td>
                                                                            <div className="form-check form-check-inline">
                                                                                <input autoComplete="off" className="form-check-input" type="radio" onChange={(e) => {data.chkstat = e.target.value; setListKontainer([...listKontainer])}} name={"chkstat" + index} id={"chkstatYa" + index} value="Y" />
                                                                                <label className="form-check-label" htmlFor={"chkstatYa" + index}>Ya</label>
                                                                            </div>
                                                                            <div className="form-check form-check-inline">
                                                                                <input autoComplete="off" className="form-check-input" type="radio" onChange={(e) => {data.chkstat = e.target.value; setListKontainer([...listKontainer])}} name={"chkstat" + index} id={"chkstatTidak" + index} value="N" />
                                                                                <label className="form-check-label" htmlFor={"chkstatTidak" + index}>Tidak</label>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : null}
                                                        </tbody>
                                                    </table>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="agen">Agen Pelayaran/Maskapai</label>
                                                                <div className="col-sm-6">
                                                                    <input type="text" id="agen" className="form-control form-control-sm" {...register("agen")} placeholder="Agen Pelayaran / Maskapai" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className='row'>
                                                        <div className='col-sm-2 col-form-label'>Penandatangan<span className='text-danger'>*</span></div>
                                                        <div className="col-sm-3 mb-3 pr-2">
                                                            <Controller
                                                                control={control}
                                                                name={"ttdPutusan"}
                                                                defaultValue={""}
                                                                className="form-control form-control-sm"
                                                                rules={{ required: "Mohon pilih petugas." }}
                                                                render={({ field: { value,onChange, ...field } }) => (
                                                                    <Select styles={customStyles} placeholder={"Pilih petugas.."} value={{id: dataWatch.ttdPutusan, label: dataWatch.ttdPutusanView}} {...field} options={masterPegawai()} onChange={(e) => setValue("ttdPutusan", e.value) & setValue("ttdPutusanView", e.label)} />
                                                                )}
                                                            />
                                                            {errors.ttdPutusan && <small className="text-danger">{errors.ttdPutusan.message}</small>}
                                                        </div>
                                                        <div className='col-sm-2 col-form-label text-sm-end'>Diterbitkan di<span className='text-danger'>*</span></div>
                                                        <div className="col-sm-3 mb-3 pr-2">
                                                            <input type="text" {...register("diterbitkan", { required: "Mohon isi tempat terbit dokumen."})} className={errors.diterbitkan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                            {errors.diterbitkan && <small className="text-danger">{errors.diterbitkan.message}</small>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-2">
                                                    <div className="row">
                                                        <div className="offset-sm-2 col-sm-9">
                                                            {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                                                                <button type="submit" className="btn btn-primary me-sm-2 me-1"><i className='fa-solid fa-save me-sm-2 me-1'></i> Simpan</button>
                                                            }
                                                            <button type="button" className="btn btn-danger btn-label-secondary me-sm-2 me-1"><i className='fa-solid fa-cancel me-sm-2 me-1'></i> Batal</button>
                                                            <button type="button" className="btn btn-warning btn-label-secondary me-sm-2 me-1"><i className='fa-solid fa-print me-sm-2 me-1'></i> Print</button>
                                                            <button type="button" style={{display: (dataWatch.idDok310 ? "block" : "none")}} className="float-end btn btn-info btn-label-secondary"><i className='tf-icons fa-solid fa-paper-plane me-sm-2 me-1'></i> TTE</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DocK310