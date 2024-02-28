/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import {decode as base64_decode} from 'base-64';
import { useForm } from 'react-hook-form';
import PtkModel from '../../../model/PtkModel';
import PtkSurtug from '../../../model/PtkSurtug';
import PnPelepasan from '../../../model/PnPelepasan';
import PtkHistory from '../../../model/PtkHistory';
// import Select from 'react-select';
import SpinnerDot from '../../../component/loading/SpinnerDot';
import PnPerlakuan from '../../../model/PnPerlakuan';
const log = new PtkHistory()
const modelPerlakuan = new PnPerlakuan();
const modelPemohon = new PtkModel();
// const customStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       background: '#fff',
//       borderColor: '#D4D8DD',
//       cursor: 'text',
//       minHeight: '30px',
//       height: '30px',
//       boxShadow: state.isFocused ? null : null,
//     }),
    
//     valueContainer: (provided, state) => ({
//         ...provided,
//         height: '30px',
//         padding: '0 6px'
//     }),
    
//     input: (provided, state) => ({
//         ...provided,
//         margin: '0px',
//     }),
//     indicatorSeparator: state => ({
//         display: 'none',
//     }),
//     indicatorsContainer: (provided, state) => ({
//         ...provided,
//         height: '30px',
//     }),
//   };

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");

function DocKT1() {
    const idPtk = Cookies.get("idPtkPage");
    let [loadKomoditi, setLoadKomoditi] = useState(false)
    let [loadKomoditiPesan, setLoadKomoditiPesan] = useState("")
    let [datasend, setDataSend] = useState([])
    
    let [data, setData] = useState({
        noAju: "",
        noIdPtk: "",
        noDokumen: "",
        tglDokumen: "",
    })

    const {
        register,
        setValue,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();

    const {
        register: registerMPKT1,
        setValue: setValueMPKT1,
        // control: controlMPKT1,
        watch: watchMPKT1,
        handleSubmit: handleFormMPKT1,
        // reset: resetFormKomoditi,
        formState: { errors: errorsMPKT1 },
    } = useForm({
        defaultValues: {
            idMPKT1: "",
            volumeNetto: "",
            volumeLain: "",
            satuanLain: "",
            namaUmum: "",
            namaLatin: "",
          }
        })

    const cekdataMPKT1 = watchMPKT1()

    const onSubmit = (data) => {
        const model = new PnPelepasan();
        const response = model.eksporKT(data);
        response
        .then((response) => {
            if(response.data) {
                if(response.data.status === '201') {
                    //start save history
                    // const log = new PtkHistory();
                    const resHsy = log.pushHistory(data.idPtk, "p8", "K-T.1", (data.idDokKT1 ? 'UPDATE' : 'NEW'));
                    resHsy
                    .then((response) => {
                        if(response.data.status === '201') {
                            if(process.env.REACT_APP_BE_ENV == "DEV") {
                                console.log("history saved")
                            }
                        }
                    })
                    .catch((error) => {
                        if(process.env.REACT_APP_BE_ENV == "DEV") {
                            console.log(error)
                        }
                    });
                    //end save history

                    alert(response.data.status + " - " + response.data.message)
                    setValue("idDokKT1", response.data.data.id)
                    setValue("noDokKT1", response.data.data.nomor)
                }
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
            alert(error.response.status + " - " + error.response.data.message)
        });
    }

    function onSubmitMPKT1(data) {
        log.updateKomoditiP8(data.id, data)
        .then((response) => {
            if(response.data.status === '201') {
                alert(response.data.status + " - " + response.data.message)
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
        })
    }

    function handleEditKomoditas(e) {
        setValueMPKT1("idMPKT1", e.target.dataset.header)
        setValueMPKT1("idPtk", e.target.dataset.ptk)
        setValueMPKT1("jenisKar", "T")
        const cell = e.target.closest('tr')
        setValueMPKT1("volumeNetto", cell.cells[5].innerHTML)
        setValueMPKT1("satuanNetto", cell.cells[6].innerHTML)
        setValueMPKT1("volumeLain", cell.cells[7].innerHTML)
        setValueMPKT1("satuanLain", cell.cells[8].innerHTML)
        setValueMPKT1("namaUmum", cell.cells[3].innerHTML)
        setValueMPKT1("namaLatin", cell.cells[4].innerHTML)
    }
    
    function handleEditKomoditasAll() {
        setLoadKomoditi(true)
        data.listKomoditas?.map((item, index) => (
            log.updateKomoditiP8(item.id, datasend[index])
                .then((response) => {
                    if(response.data.status === '201') {
                        if(process.env.REACT_APP_BE_ENV == "DEV") {
                            console.log("history saved")
                        }
                    }
                })
                .catch((error) => {
                    setLoadKomoditi(true)
                    setLoadKomoditiPesan("Terjadi error pada saat simpan, mohon refresh halaman dan coba lagi.")
                    if(process.env.REACT_APP_BE_ENV == "DEV") {
                        console.log(error)
                    }
                })
            )
        )
        setLoadKomoditi(true)
    }

    function handleGetDokumenPerlakuan(e) {
        const resLaporan = modelPerlakuan.getPtkByDokumen(data.noIdPtk, e.target.value)
        resLaporan
        .then((response) => {
            if(typeof response.data != "string") {
                setData(values => ({...values,
                    errorData5: false
                }))
                if(response.data.status === '200') {
                    setValue("idPerlakuan", response.data.data[0].id)
                    setValue("tipePerlakuan", response.data.data[0].tipe_perlakuan_id)
                    setValue("tglPerlakuan", response.data.data[0].tgl_perlakuan_mulai)
                    setValue("bahanKimia", response.data.data[0].pestisida_id)
                    setValue("konsentrasi", response.data.data[0].dosis_aplikasi)
                    setValue("durasiPerlakuan", response.data.data[0].lama_papar)
                    setValue("temperatur", response.data.data[0].suhu_komoditi)
                    setValue("adInfo", response.data.data[0].ket_perlakuan_lain)
                }
            } else {
                setData(values => ({...values,
                    errorData5: true
                }))
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
            alert(error.response.status + " - " + error.response.data.message)
        });
    }

    function getContainerPtk() {
        if(data.listKontainer) {
            let noKontainerPtk = data.listKontainer?.map(item => {
                return item.nomor + "/" + item.segel
            })
            setValue("tandaKhusus", "CONT/SEAL NO: " + noKontainerPtk.join("; "))
        } else {
            alert("Gagal tarik data kontainer, silahkan refresh halaman dan coba lagi")
        }
    }

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDokKT1", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
                    
            const tglPtk = Cookies.get("tglPtk");
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            
            // const modelPemohon = new PtkModel();
            const response = modelPemohon.getPtkId(base64_decode(ptkNomor[1]));
            response
            .then((response) => {
                if(response.data.status === '200') {
                    let kodeHSData = response.data.data.ptk_komoditi?.map(item => {
                        return item.kode_hs
                    })
                    let namaUmumMP = response.data.data.ptk_komoditi?.map(item => {
                        return item.nama_umum_tercetak
                    })
                    let namaIlmiahMP = response.data.data.ptk_komoditi?.map(item => {
                        return item.nama_latin_tercetak
                    })
                    let VolumeMP = response.data.data.ptk_komoditi?.map(item => {
                        return item.volume_lain + " " + item.sat_lain
                    })
                    // alert(response.data.message);
                    setData(values => ({...values,
                        noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                        noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                        noDokumen: idPtk ? base64_decode(ptkNomor[2]) : "",
                        tglDokumen: tglPtk,
                        kodeHs: kodeHSData.join(";"),
                        // mpTercetak: namaUmumMP.join(";"),
                        listPtk: response.data.data.ptk,
                        listKomoditas: response.data.data.ptk_komoditi,
                        listKontainer: response.data.data.ptk_kontainer,
                        listDokumen: response.data.data.ptk_dokumen
                    }));

                    var arrayKomKT = response.data.data.ptk_komoditi?.map(item => {
                        return {
                            namaUmum: item.nama_umum_tercetak,
                            namaLatin: item.nama_latin_tercetak,
                            jantan: null,
                            betina: null,
                            volumeP8: item.volume_lain,
                            nettoP8: item.volume_netto
                        }
                    })
                    setDataSend(arrayKomKT)
                    
                    setValue("tandaKhusus", response.data.data.ptk.tanda_khusus)
                    setValue("namaUmum", namaUmumMP.join(";"))
                    setValue("namaIlmiah", namaIlmiahMP.join(";"))
                    setValue("bentukTercetak", response.data.data.ptk.merk_kemasan)
                    setValue("jmlTercetak", VolumeMP.join(";"))
                    setValue("karantinaTujuan", response.data.data.ptk.negara_penerima)
                    setValue("entryPoint", response.data.data.ptk.pelabuhan_bongkar + ", " + response.data.data.ptk.negara_bongkar)
                    setValue("idPtk", base64_decode(ptkNomor[1]))
                    setValue("noDokumen", base64_decode(ptkNomor[2]))
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
            });
            

            const modelSurtug = new PtkSurtug();
                // 1: penugasan periksa administratif
            const resSurtug = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), 14);
            resSurtug
            .then((response) => {
                if(response.data) {
                    if(response.data.status === '200') {
                        // console.log(response.data.data[0])
                        setData(values => ({...values,
                            noSurtug: response.data.data[0].nomor,
                            tglSurtug: response.data.data[0].tanggal,
                        }));
                        setValue("idSurtug", response.data.data[0].id)
                    }
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                // alert(error.response.status + " - " + error.response.data.message)
            });
        }
        
    },[idPtk, setValue])

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            KT-1 <span className="fw-light" style={{color: 'blue'}}>PHYTOSANITARY FOR EXPORT</span>
        </h4>
        
        <div className="row">
            <div className="col-xxl">
                <div className="card card-action mb-4">
                    <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                        <div className="card-action-title">
                            <div className='row'>
                                <label className="col-sm-1 col-form-label text-sm-end text-lightest" htmlFor="noDok"><b>No PTK</b></label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok" value={data.noDokumen || ""} className="form-control form-control-sm" placeholder="Nomor PTK" disabled />
                                </div>
                                <label className="col-sm-2 col-form-label text-sm-end text-lightest" htmlFor="noSurtug"><b>No Surat Tugas</b></label>
                                <div className="col-sm-3">
                                    <input type="text" id="noSurtug" value={data.noSurtug || ""} className="form-control form-control-sm" placeholder="Nomor Surat Tugas" disabled />
                                </div>
                                <label className="col-sm-1 col-form-label text-lightest" htmlFor="tglSurtug"><b>Tanggal</b></label>
                                <div className="col-sm-2">
                                    <input type="text" id='tglSurtug' value={data.tglSurtug || ""} className='form-control form-control-sm' disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="card-action-element">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-angle-top"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="hidden" id='idDokKT1' {...register("idDokKT1")} />
                            <input type="hidden" id='idPtk' {...register("idPtk")} />
                            <input type="hidden" id='noDokumen' {...register("noDokumen")} />
                            <div className="col-md-12 mt-3">
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label text-sm-start" htmlFor="jenisDokumen">Dokumen <span className='text-danger'>*</span></label>
                                    <div className="col-sm-6">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jenisDokumen" id="ISSUED" value="ISSUED" {...register("jenisDokumen", { required: "Mohon pilih jenis dokumen."})} />
                                            <label className="form-check-label" htmlFor="ISSUED">Baru</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jenisDokumen" id="REPLACEMENT" value="REPLACEMENT" {...register("jenisDokumen")} />
                                            <label className="form-check-label" htmlFor="REPLACEMENT">Replacement</label>
                                        </div>
                                        {errors.jenisDokumen && <small className="text-danger">{errors.jenisDokumen.message}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDokKT1">Nomor Dokumen</label>
                                    <div className="col-sm-3">
                                        <input type="text" id="noDokKT1" name='noDokKT1' {...register("noDokKT1")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-T.1" disabled />
                                    </div>
                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDokKT1">Tanggal <span className='text-danger'>*</span></label>
                                    <div className="col-sm-2">
                                        <input type="datetime-local" id="tglDokKT1" name='tglDokKT1' {...register("tglDokKT1", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDokKT1 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                        {errors.tglDokKT1 && <small className="text-danger">{errors.tglDokKT1.message}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label text-sm-start" htmlFor="karantinaTujuan">To NPPO <span className='text-danger'>*</span></label>
                                    <div className='col-sm-1' style={{paddingRight:0}}>
                                        <input type="text" id="karantinaTujuanDepan" name='karantinaTujuanDepan' {...register("karantinaTujuanDepan")} className="form-control form-control-sm" />
                                    </div>
                                    <div className='col-sm-2' style={{paddingLeft: 0, paddingRight:0}}>
                                        <input type="text" id="karantinaTujuan" name='karantinaTujuan' {...register("karantinaTujuan")} className="form-control form-control-sm" placeholder="To NPPO.." disabled />
                                    </div>
                                    <div className='col-sm-1' style={{paddingLeft:0}}>
                                        <input type="text" id="karantinaTujuanBeakang" name='karantinaTujuanBeakang' {...register("karantinaTujuanBeakang")} className="form-control form-control-sm" />
                                    </div>

                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noSeri">No Seri <span className='text-danger'>*</span></label>
                                    <div className="col-sm-2">
                                        <input type="text" id="noSeri" name='noSeri' {...register("noSeri", {required: "Mohon isi Nomor seru."})} className={errors.noSeri ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                        {errors.noSeri && <small className="text-danger">{errors.noSeri.message}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="accordion mb-4" id="collapseSection">
                                <div className="card">
                                    <h2 className="accordion-header" id="headerKeterangan">
                                        <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseKeterangan" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>I. Description of Consignment</h5>
                                        </button>
                                    </h2>
                                    <div id="collapseKeterangan">
                                        <div className="accordion-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                <h5 className='mb-1'><b><u>Exporter</u></b></h5>
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="namaPengirim">Name </label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="namaPengirim" value={data.listPtk && (data.listPtk.nama_pengirim || "")} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="alamatPengirim">Address </label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="alamatPengirim" value={data.listPtk && (data.listPtk.alamat_pengirim || "")} disabled className="form-control form-control-sm" placeholder="Alamat Pengirim" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <h5 className='mb-1'><b><u>Consignee</u></b></h5>
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="namaPenerima">Name </label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="namaPenerima" value={data.listPtk && (data.listPtk.nama_penerima || "")} disabled className="form-control form-control-sm" placeholder="Nama Penerima" />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="alamatPenerima">Address</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="alamatPenerima" value={data.listPtk && (data.listPtk.alamat_penerima || "")} disabled className="form-control form-control-sm" placeholder="Alamat Penerima" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="namaAlatAngkut">Declared means of conveyance</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="namaAlatAngkut" value={data.listPtk && (data.listPtk.nama_alat_angkut_terakhir || "")} disabled className="form-control form-control-sm" placeholder="Nama Alat Angkut" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="entryPoint">Declared point of entry</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="entryPoint" {...register("entryPoint", {required: "Mohon isi pelabuhan bongkar."})} placeholder='Pelabuhan Bongkar' className={errors.entryPoint ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                            {errors.entryPoint && <small className="text-danger">{errors.entryPoint.message}</small>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="placeOrigin">Place of origin</label>
                                                        <div className="col-sm-5">
                                                            <input type="text" id="placeOrigin" value={data.listPtk && (data.listPtk.kota_tujuan || "")} disabled className="form-control form-control-sm" placeholder="Daerah Asal" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="kodeHs">HS Code</label>
                                                        <div className="col-sm-4">
                                                            <input type="text" id="kodeHs" value={data.kodeHs || ""} disabled className="form-control form-control-sm" placeholder="Kode HS" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <h5 className='mb-1'><b><u>Description of Comodities</u></b>
                                                {loadKomoditi ? <SpinnerDot/> : null}
                                                {data.listKomoditas ? 
                                                (loadKomoditi ? null : <button className='btn btn-sm btn-outline-secondary' onClick={handleEditKomoditasAll} style={{marginLeft: "15px"}}><i className='fa-solid fa-check-square text-success'></i> Tidak ada perubahan</button>) : null }
                                                <span className='text-danger'>{loadKomoditiPesan}</span>
                                                </h5>
                                                <div className='col-md-12 mb-3'>
                                                    <div className="table-responsive text-nowrap" style={{height: "300px"}}>
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
                                                                    <th>Jumlah</th>
                                                                    <th>Satuan</th>
                                                                    <th>Volume P8</th>
                                                                    <th>Netto P8</th>
                                                                    <th>Act</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.listKomoditas ? (data.listKomoditas?.map((data, index) => (
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{data.kode_hs}</td>
                                                                                <td>{data.klasifikasi}</td>
                                                                                <td>{data.nama_umum_tercetak}</td>
                                                                                <td>{data.nama_latin_tercetak}</td>
                                                                                <td>{data.volume_netto}</td>
                                                                                <td>{data.sat_netto}</td>
                                                                                <td>{data.volume_lain}</td>
                                                                                <td>{data.sat_lain}</td>
                                                                                <td>{data.volumeP8}</td>
                                                                                <td>{data.nettoP8}</td>
                                                                                <td>
                                                                                    <a className="dropdown-item" href="#" type="button" onClick={handleEditKomoditas} data-header={data.id} data-ptk={data.ptk_id} data-bs-toggle="modal" data-bs-target="#modKomoditas"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</a>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    ) : null
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="tandaKhusus">Distinguishing marks:</label>
                                                        <div className="col-sm-9">
                                                            <textarea name="tandaKhusus" id="tandaKhusus" rows="2" {...register("tandaKhusus", { required: "Mohon isi keterangan tanda yang membedakan"})} className={errors.tandaKhusus ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder='Distinguishing marks..'></textarea>
                                                            <button type='button' onClick={getContainerPtk} className='btn btn-xs btn-info'>Masukan No Container</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="bentukTercetak">Description of packages</label>
                                                        <div className="col-sm-6">
                                                            <input type="text" id="bentukTercetak" {...register("bentukTercetak", { required: "Mohon isi bentuk MP tercetak"})} className={errors.bentukTercetak ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                            {errors.bentukTercetak && <small className="text-danger">{errors.bentukTercetak.message}</small>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <h2 className="accordion-header" id="headerDeklarasi">
                                        <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseDeklarasi" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>II. Additional Declaration</h5>
                                        </button>
                                    </h2>
                                    <div id="collapseDeklarasi">
                                        <div className="accordion-body">
                                            <div className="row">
                                                <div className='col-sm-12'>
                                                    <textarea name="adDeclare" id="adDeclare" {...register("adDeclare")} placeholder='Additional Declaration..' rows="3" className='form-control form-control-sm'></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <h2 className="accordion-header" id="headerPerlakuan">
                                        <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapsePerlakuan" aria-expanded="true" aria-controls="collapseImporter">
                                            <h5 className='text-lightest mb-0'>III.	Disinfestation and/or Disinfection Treatment
                                            </h5>
                                        </button>
                                    </h2>
                                    <div id="collapsePerlakuan">
                                        <div className="accordion-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <label className="col-sm-2 col-form-label" htmlFor="selectPerlakuan">Ambil data dari dokumen :</label>
                                                        <div className="col-sm-2">
                                                            <select name="selectPerlakuan" id="selectPerlakuan" onChange={handleGetDokumenPerlakuan} className='form-select form-select-sm'>
                                                                <option value="">--</option>
                                                                <option value={21}>K-5.1</option>
                                                                <option value={22}>K-5.2</option>
                                                                <option value={23}>K-5.3</option>
                                                            </select>
                                                            <input type="hidden" id='idPerlakuan' {...register("idPerlakuan")} />
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <span className='text-danger'>{data.errorData5 ? "Gagal tarik data perlakuan, silahkan coba lagi" : ""}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className='mt-2'/>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="tipePerlakuan">Treatment type</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="tipePerlakuan" placeholder='Tipe Perlakuan' {...register("tipePerlakuan")} className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="tglPerlakuan">Date of Treatment</label>
                                                        <div className="col-sm-3">
                                                            <input type="text" id="tglPerlakuan" placeholder="Tanggal Perlakuan" {...register("tglPerlakuan")} className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="bahanKimia">Chemical (active ingredient)</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="bahanKimia" placeholder="Bahan Kimia yang dipakai" {...register("bahanKimia")} className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="konsentrasi">Concentration</label>
                                                        <div className="col-sm-8">
                                                            <div className="col-sm-3">
                                                                <div className='input-group input-group-sm input-group-merge'>
                                                                    <input type="text" id="konsentrasi" {...register("konsentrasi")} className="form-control form-control-sm" />
                                                                    <span className='input-group-text'>g/m&sup3;</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="durasiPerlakuan">Duration</label>
                                                        <div className="col-sm-8">
                                                            <div className="col-sm-3">
                                                                <div className='input-group input-group-sm input-group-merge'>
                                                                    <input type="text" id="durasiPerlakuan" {...register("durasiPerlakuan")} className="form-control form-control-sm" />
                                                                    <span className='input-group-text'>jam</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="temperatur">Temperature</label>
                                                        <div className="col-sm-8">
                                                            <div className="col-sm-3">
                                                                <div className='input-group input-group-sm input-group-merge'>
                                                                    <input type="text" id="temperatur" {...register("temperatur")} className="form-control form-control-sm" />
                                                                    <span className='input-group-text'>&deg;C</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <label className="col-sm-2 col-form-label" htmlFor="adInfo">Additional information</label>
                                                        <div className="col-sm-8">
                                                            <textarea name="adInfo" id="adInfo" rows="2" {...register("adInfo")} placeholder='Additional information..' className='form-control form-control-sm'></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-2 col-form-label'>Penandatangan</div>
                                <div className="col-sm-3 mb-3 pr-2">
                                    <input type="text" {...register("ttdPutusan", { required: "Mohon pilih nama penandatangan."})} className={errors.ttdPutusan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.ttdPutusan && <small className="text-danger">{errors.ttdPutusan.message}</small>}
                                </div>
                                <div className='col-sm-2 col-form-label text-sm-end'>Diterbitkan di</div>
                                <div className="col-sm-3 mb-3 pr-2">
                                    <input type="text" {...register("diterbitkan", { required: "Mohon isi tempat terbit dokumen."})} className={errors.diterbitkan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.diterbitkan && <small className="text-danger">{errors.diterbitkan.message}</small>}
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="row">
                                    <div className="offset-sm-2 col-sm-9">
                                        <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                        <button type="button" className="btn btn-danger btn-label-secondary me-sm-2 me-1">Batal</button>
                                        <a href={require("../../../dok/kt1.pdf")} rel="noopener noreferrer" target='_blank' className="btn btn-warning"><i className="bx bx-printer bx-xs"></i>&nbsp; Print</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="modKomoditas" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content p-3 pb-1">
                    <div className="modal-body">
                        <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="text-center mb-4">
                            <h3 className="address-title">Perubahan Media Pembawa {Cookies.get("jenisKarantina") === 'H' ? 'Hewan' : (Cookies.get("jenisKarantina") === 'I' ? 'Ikan' : 'Tumbuhan')}</h3>
                        </div>
                        <form onSubmit={handleFormMPKT1(onSubmitMPKT1)} className="row g-3">
                        <input type="hidden" name='idMPKT1' {...registerMPKT1("idMPKT1")} />
                        <input type="hidden" name='idPtk' {...registerMPKT1("idPtk")} />
                        <input type="hidden" name='jenisKar' {...registerMPKT1("jenisKar")} />
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaUmum">Nama Umum Tercetak</label>
                                <input type='text' name="namaUmum" id="namaUmum" {...registerMPKT1("namaUmum")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaLatin">Nama Latin Tercetak</label>
                                <input type='text' name="namaLatin" id="namaLatin" {...registerMPKT1("namaLatin")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeNetto">Volume Netto Akhir-P8<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" name='volumeNetto' id='volumeNetto' value={cekdataMPKT1.volumeNetto ? addCommas(removeNonNumeric(cekdataMPKT1.volumeNetto)) : ""} {...registerMPKT1("volumeNetto", {required: "Mohon isi volume netto."})} className={errorsMPKT1.volumeNetto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanNetto' id='satuanNetto' {...registerMPKT1("satuanNetto")} disabled />
                                    </div>
                                </div>
                                {errorsMPKT1.volumeNetto && <small className="text-danger">{errorsMPKT1.volumeNetto.message}</small>}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeLain">Volume Lain Akhir-P8</label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='volumeLain' id='volumeLain' value={cekdataMPKT1.volumeLain ? addCommas(removeNonNumeric(cekdataMPKT1.volumeLain)) : ""} {...registerMPKT1("volumeLain")} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanLain' id='satuanLain' {...registerMPKT1("satuanLain")} disabled />
                                    </div>
                                </div>
                            </div>
                        <small className='text-danger'>*Format penulisan desimal menggunakan titik ( . )</small>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary me-sm-3 me-1">Simpan</button>
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

export default DocKT1