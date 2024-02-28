/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import ModaAlatAngkut from '../../model/master/modaAlatAngkut.json';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import {decode as base64_decode} from 'base-64';
import PtkHistory from '../../model/PtkHistory';
import PtkModel from '../../model/PtkModel';
import PnPenahanan from '../../model/PnPenahanan';
import PtkSurtug from '../../model/PtkSurtug';

const log = new PtkHistory()
const modelPemohon = new PtkModel()
const modelPenahanan = new PnPenahanan()

function modaAlatAngkut(e){
    return ModaAlatAngkut.find((element) => element.id === parseInt(e))
}

function DocK62() {
    const idPtk = Cookies.get("idPtkPage");

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

    // const cekWatch = watch()

    function onSubmit(data) {
        const response = modelPenahanan.save62(data, data.idDok61);
        response
        .then((response) => {
            if(response.data) {
                if(response.data.status === '201') {
                    const resHsy = log.pushHistory(data.idPtk, "p5", "K-6.2", (data.idDok62 ? 'UPDATE' : 'NEW'));
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
                    setValue("idDok62", response.data.data.id)
                    setValue("noDok62", response.data.data.nomor)
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

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok61", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
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
                if(typeof response.data != "string") {
                    if(response.data.status === '200') {
                        setData(values => ({...values,
                            errorPTK: "",
                            listPtk: response.data.data.ptk,
                            listDokumen: response.data.data.ptk_dokumen
                        }));

                        const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), Cookies.get("jenisKarantina"));
                        resKom
                        .then((res) => {
                            if(typeof res.data != "string") {
                                if(res.data.status === '200') {
                                    setData(values => ({...values,
                                        errorKomoditas: "",
                                        listKomoditas: res.data.data
                                    }))
                                }
                            } else {
                                setData(values => ({...values,
                                    errorKomoditas: "Gagal load data Komoditas"
                                }));
                            }
                        })
                        .catch((error) => {
                            if(process.env.REACT_APP_BE_ENV == "DEV") {
                                console.log(error)
                            }
                            setData(values => ({...values,
                                errorKomoditas: "Gagal load data Komoditas"
                            }));
                        });
                        
                        setValue("idPtk", base64_decode(ptkNomor[1]))
                        setValue("noDokumen", base64_decode(ptkNomor[2]))
                    }
                } else {
                    setData(values => ({...values,
                        errorPTK: "Gagal load data PTK",
                        errorKomoditas: "Gagal load data Komoditas"
                    }));
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status === 404) {
                        setData(values => ({...values,
                            errorPTK: "Data PTK Kosong/Tidak ada",
                            errorKomoditas: "Gagal load data Komoditas"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK",
                            errorKomoditas: "Gagal load data Komoditas"
                        }));
                    }
                }
            });

            const resPenId = modelPenahanan.getByPtkId(base64_decode(ptkNomor[1]), 27);
            resPenId
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorBAPenahanan: ""
                        }));
                        if(response.data.status === '200') {
                            setValue("idDok62", response.data.data[0].id)
                            setValue("idDok61", response.data.data[0].pn_penahanan_id)
                            setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                            setValue("noDok62", response.data.data[0].nomor)
                            setValue("tglDok62", response.data.data[0].tanggal)
                            setValue("isAttach", response.data.data[0].is_attachment)
                            setValue("ttdPutusan", response.data.data[0].user_ttd_id)
                            setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                            setValue("tembusan1", response.data.data[0].tembusan1)
                            setValue("tembusan2", response.data.data[0].tembusan2)
                            setValue("tembusan3", response.data.data[0].tembusan3)
                            setValue("tembusan4", response.data.data[0].tembusan4)
    
                            const resPenId = modelPenahanan.getByPtkId(base64_decode(ptkNomor[1]), 26);
                            resPenId
                            .then((response) => {
                                if(response.data) {
                                    if(typeof response.data != "string") {
                                        setData(values => ({...values,
                                            errorPenahanan: ""
                                        }));
                                        if(response.data.status === '200') {
                                            setValue("noDok61", response.data.data[0].nomor)
                                            setValue("tglDok61", response.data.data[0].tanggal)
                                        }
                                    } else {
                                        setData(values => ({...values,
                                            errorPenahanan: "Gagal load Surat Penahanan"
                                        }));
                                    }
                                }
                            })
                            .catch((error) => {
                                if(process.env.REACT_APP_BE_ENV == "DEV") {
                                    console.log(error)
                                }
                                if(error.response) {
                                    if(error.response.data.status === 404) {
                                        setData(values => ({...values,
                                            errorPenahanan: "Data Surat Penahanan Kosong/Tidak Ada"
                                        }));
                                    } else {
                                        setData(values => ({...values,
                                            errorPenahanan: "Gagal load data Surat Penahanan"
                                        }));
                                    }
                                }
                            });
                        }
                    } else {
                        setData(values => ({...values,
                            errorBAPenahanan: "Gagal load Berita Acara Penahanan"
                        }));
                    }
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status === 404) {
                        setData(values => ({...values,
                            errorBAPenahanan: ""
                        }));
                    } else {
                        setData(values => ({...values,
                            errorBAPenahanan: "Gagal load data Berita Acara Penahanan"
                        }));
                    }
                }
            });

            const modelSurtug = new PtkSurtug();
                // 9: penugasan penahanan
            const resSurtug = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), 9);
            resSurtug
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorSurtug: ""
                        }));
                        if(response.data.status === '200') {
                            setData(values => ({...values,
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                            }));
                            setValue("idSurtug", response.data.data[0].id)
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data Surat Tugas"
                        }));
                    }
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status === 404) {
                        setData(values => ({...values,
                            errorSurtug: "Data Surat Tugas Kosong/Tidak Ada"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data Surat Tugas"
                        }));
                    }
                }
            });
        }
    },[idPtk, setValue])
    
    function refreshData() {
        const response = modelPemohon.getPtkId(data.noIdPtk);
        response
        .then((response) => {
            if(typeof response.data != "string") {
                if(response.data.status === '200') {
                    setData(values => ({...values,
                        errorPTK: "",
                        listPtk: response.data.data.ptk,
                        listDokumen: response.data.data.ptk_dokumen
                    }));

                    const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, Cookies.get("jenisKarantina"));
                    resKom
                    .then((res) => {
                        if(typeof res.data != "string") {
                            if(res.data.status === '200') {
                                setData(values => ({...values,
                                    errorKomoditas: "",
                                    listKomoditas: res.data.data
                                }))
                            }
                        } else {
                            setData(values => ({...values,
                                errorKomoditas: "Gagal load data Komoditas"
                            }));
                        }
                    })
                    .catch((error) => {
                        if(process.env.REACT_APP_BE_ENV == "DEV") {
                            console.log(error)
                        }
                        setData(values => ({...values,
                            errorKomoditas: "Gagal load data Komoditas"
                        }));
                    });
                    
                    setValue("idPtk", data.noIdPtk)
                    setValue("noDokumen", data.noDokumen)
                }
            } else {
                setData(values => ({...values,
                    errorPTK: "Gagal load data PTK",
                    errorKomoditas: "Gagal load data Komoditas"
                }));
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
            if(error.response) {
                if(error.response.data.status === 404) {
                    setData(values => ({...values,
                        errorPTK: "Data PTK Kosong/Tidak ada",
                        errorKomoditas: "Gagal load data Komoditas"
                    }));
                } else {
                    setData(values => ({...values,
                        errorPTK: "Gagal load data PTK",
                        errorKomoditas: "Gagal load data Komoditas"
                    }));
                }
            }
        });

        const resPenId = modelPenahanan.getByPtkId(data.noIdPtk, 27);
        resPenId
        .then((response) => {
            if(response.data) {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorBAPenahanan: ""
                    }));
                    if(response.data.status === '200') {
                        setValue("idDok62", response.data.data[0].id)
                        setValue("idDok61", response.data.data[0].pn_penahanan_id)
                        setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                        setValue("noDok62", response.data.data[0].nomor)
                        setValue("tglDok62", response.data.data[0].tanggal)
                        setValue("isAttach", response.data.data[0].is_attachment)
                        setValue("ttdPutusan", response.data.data[0].user_ttd_id)
                        setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                        setValue("tembusan1", response.data.data[0].tembusan1)
                        setValue("tembusan2", response.data.data[0].tembusan2)
                        setValue("tembusan3", response.data.data[0].tembusan3)
                        setValue("tembusan4", response.data.data[0].tembusan4)

                        const resPenId = modelPenahanan.getByPtkId(data.noIdPtk, 26);
                        resPenId
                        .then((response) => {
                            if(response.data) {
                                if(typeof response.data != "string") {
                                    setData(values => ({...values,
                                        errorPenahanan: ""
                                    }));
                                    if(response.data.status === '200') {
                                        setValue("noDok61", response.data.data[0].nomor)
                                        setValue("tglDok61", response.data.data[0].tanggal)
                                    }
                                } else {
                                    setData(values => ({...values,
                                        errorPenahanan: "Gagal load Surat Penahanan"
                                    }));
                                }
                            }
                        })
                        .catch((error) => {
                            if(process.env.REACT_APP_BE_ENV == "DEV") {
                                console.log(error)
                            }
                            if(error.response) {
                                if(error.response.data.status === 404) {
                                    setData(values => ({...values,
                                        errorPenahanan: "Data Surat Penahanan Kosong/Tidak Ada"
                                    }));
                                } else {
                                    setData(values => ({...values,
                                        errorPenahanan: "Gagal load data Surat Penahanan"
                                    }));
                                }
                            }
                        });
                    }
                } else {
                    setData(values => ({...values,
                        errorBAPenahanan: "Gagal load Berita Acara Penahanan"
                    }));
                }
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
            if(error.response) {
                if(error.response.data.status === 404) {
                    setData(values => ({...values,
                        errorBAPenahanan: ""
                    }));
                } else {
                    setData(values => ({...values,
                        errorBAPenahanan: "Gagal load data Berita Acara Penahanan"
                    }));
                }
            }
        });

        const modelSurtug = new PtkSurtug();
            // 9: penugasan penahanan
        const resSurtug = modelSurtug.getDetilSurtugPenugasan(data.noIdPtk, 9);
        resSurtug
        .then((response) => {
            if(response.data) {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorSurtug: ""
                    }));
                    if(response.data.status === '200') {
                        setData(values => ({...values,
                            noSurtug: response.data.data[0].nomor,
                            tglSurtug: response.data.data[0].tanggal,
                        }));
                        setValue("idSurtug", response.data.data[0].id)
                    }
                } else {
                    setData(values => ({...values,
                        errorSurtug: "Gagal load data Surat Tugas"
                    }));
                }
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
            if(error.response) {
                if(error.response.data.status === 404) {
                    setData(values => ({...values,
                        errorSurtug: "Data Surat Tugas Kosong/Tidak Ada"
                    }));
                } else {
                    setData(values => ({...values,
                        errorSurtug: "Gagal load data Surat Tugas"
                    }));
                }
            }
        });
    }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-6.2 <span className="fw-light" style={{color: 'blue'}}>BERITA ACARA PENAHANAN</span>

            <small className='float-end'>
                <span className='text-danger'>{(data.errorPTK ? data.errorPTK + "; " : "") + (data.errorKomoditas ? data.errorKomoditas + "; " : "") + (data.errorBAPenahanan ? data.errorBAPenahanan + "; " : "") + (data.errorPenahanan ? data.errorPenahanan + "; " : "") + (data.errorSurtug ? data.errorSurtug + "; " : "")}</span>
                {data.errorPTK || data.errorKomoditas || data.errorBAPenahanan || data.errorPenahanan || data.errorSurtug ?
                    <button type='button' className='btn btn-warning btn-xs' onClick={() => refreshData()}><i className='fa-solid fa-sync'></i> Refresh</button>
                : ""}
            </small>
        </h4>

        <div className="row">
            <div className="col-xxl">
                <div className='card card-action mb-4'>
                    <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                        <div className="card-action-title text-lightest">
                            <div className='row'>
                                <label className="col-sm-1 col-form-label text-sm-end" htmlFor="noDok"><b>No PTK</b></label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok" value={data.noDokumen || ""} className="form-control form-control-sm" placeholder="Nomor PTK" disabled />
                                </div>
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noSurtug"><b>No Surat Tugas</b></label>
                                <div className="col-sm-3">
                                    <input type="text" id="noSurtug" value={data.noSurtug || ""} className="form-control form-control-sm" placeholder="Nomor Surat Tugas" disabled />
                                </div>
                                <label className="col-sm-1 col-form-label" htmlFor="tglSurtug"><b>Tanggal</b></label>
                                <div className="col-sm-2">
                                    <input type="text" id='tglSurtug' value={data.tglSurtug || ""} className='form-control form-control-sm' disabled/>
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
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" id='idDok61' {...register("idDok61")} />
                        <input type="hidden" id='idDok62' {...register("idDok62")} />
                        <input type="hidden" id='tglDok62' {...register("tglDok62")} />
                        <input type="hidden" id='idPtk' {...register("idPtk")} />
                        <input type="hidden" id='noDokumen' {...register("noDokumen")} />
                        <input type="hidden" id='idSurtug' {...register("idSurtug")} />
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok61">Nomor Surat Penahanan</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok61" name='noDok61' {...register("noDok61")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-6.1" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok61">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok61" disabled name='tglDok61' {...register("tglDok61")} className="form-control form-control-sm" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok62">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok62" name='noDok62' {...register("noDok62")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-6.2" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok62">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok62" name='tglDok62' {...register("tglDok62", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok62 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok62 && <small className="text-danger">{errors.tglDok62.message}</small>}
                                </div>
                            </div>
                        </div>
                        <div className="accordion mb-4" id="collapseSection">
                            <div className="card">
                                <h2 className="accordion-header" id="headerKeterangan">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseKeterangan"  style={{backgroundColor: '#123138'}} aria-expanded="true" aria-controls="collapseCountry">
                                        <h5 className='text-lightest mb-0'>I. Rincian Keterangan</h5>
                                    </button>
                                </h2>
                                <div id="collapseKeterangan">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h5 className='mb-1'><b><u>Identitas Pengirim</u></b></h5>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="namaPengirim">Nama</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="namaPengirim" value={(data.listPtk ? data.listPtk.nama_pengirim : "") || ""} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h5 className='mb-1'><b><u>Identitas Penerima</u></b></h5>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="namaPenerima">Nama</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="namaPenerima" value={(data.listPtk ? data.listPtk.nama_penerima : "") || ""} disabled className="form-control form-control-sm" placeholder="Nama Penerima" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-1">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatPengirim">Alamat</label>
                                                    <div className="col-sm-8">
                                                        <textarea name="alamatPengirim" className="form-control form-control-sm" disabled value={(data.listPtk ? data.listPtk.alamat_pengirim : "") || ""} id="alamatPengirim" rows="2" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatPenerima">Alamat</label>
                                                    <div className="col-sm-8">
                                                        <textarea name="alamatPenerima" className="form-control form-control-sm" disabled value={(data.listPtk ? data.listPtk.alamat_penerima : "") || ""} id="alamatPenerima" rows="2" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasPengirim">Identitas</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitastPengirim" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.jenis_identitas_pengirim + " - " + data.listPtk.nomor_identitas_pengirim) : "") || ""} id="identitasPengirim" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasPenerima">Identitas</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasPenerima" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.jenis_identitas_penerima + " - " + data.listPtk.nomor_identitas_penerima) : "") || ""} id="identitasPenerima" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahAsal">{data.listPtk ? (data.listPtk.permohonan === "DK" ? "Daerah" : "Negara") : ""} Asal</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahAsal" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.permohonan === "DK" ? data.listPtk.kota_asal : data.listPtk.negara_asal) : "") || ""} id="daerahAsal" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahTujuan">{data.listPtk ? (data.listPtk.permohonan === "DK" ? "Daerah" : "Negara") : ""} Tujuan</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahTujuan" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.permohonan === "DK" ? data.listPtk.kota_tujuan : data.listPtk.negara_tujuan) : "") || ""} id="daerahTujuan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatKeluar">Tempat Pengeluaran / Tgl Berangkat</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatKeluar" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.pelabuhan_muat + " / " + data.listPtk.tanggal_rencana_berangkat_terakhir) : "") || ""} id="tempatKeluar" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatMasuk">Tempat Pemasukan / Tgl Tiba</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatMasuk" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.pelabuhan_bongkar + " / " + data.listPtk.tanggal_rencana_tiba_terakhir) : "") || ""} id="tempatMasuk" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatTransit">Tempat Transit</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatTransit" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.pelabuhan_transit === null ? "-" : data.listPtk.pelabuhan_transit + ", " + data.listPtk.negara_transit) : "") || ""} id="tempatTransit" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasAngkut">Jenis, Nama Alat Angkut</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasAngkut" className="form-control form-control-sm" disabled value={(data.listPtk ? (modaAlatAngkut(data.listPtk.tipe_alat_angkut_terakhir_id).nama + ", " + data.listPtk.nama_alat_angkut_terakhir) : "") || "" } id="identitasAngkut" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <h2 className="accordion-header" id="headerMP">
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseMP" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>II. Uraian Media Pembawa
                                        </h5>
                                    </button>
                                </h2>
                                <div id="collapseMP">
                                    <div className="accordion-body">
                                        <div className="row">
                                        <h5 className='mb-1'>Jenis Media Pembawa : <b>{Cookies.get("jenisKarantina") === "H" ? "Hewan" : (Cookies.get("jenisKarantina") === "T" ? "Tumbuhan" : (Cookies.get("jenisKarantina") === "I" ? "Ikan" : ""))}</b>
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
                                                                <th>Jantan</th>
                                                                <th>Betina</th>
                                                                <th>Volume P5</th>
                                                                <th>Netto P5</th>
                                                                <th>Jantan P5</th>
                                                                <th>Betina P5</th>
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
                                                                            <td>{data.jantan}</td>
                                                                            <td>{data.betina}</td>
                                                                            <td>{data.volumeP5}</td>
                                                                            <td>{data.nettoP5}</td>
                                                                            <td>{data.jantanP5}</td>
                                                                            <td>{data.betinaP5}</td>
                                                                        </tr>
                                                                    ))
                                                                ) : null
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-sm-5" style={{marginLeft: "15px"}}>
                                    <div className='col-sm-6 mb-3 mt-2'>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" name="isAttach" id="isAttach" value="1" {...register("isAttach")} />
                                            <label className="form-check-label" htmlFor="isAttach">Attachment</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <div className='col-form-label mb-0'>Penandatangan</div>
                                        <input type="text" {...register("ttdPutusan", { required: "Mohon pilih nama penandatangan."})} className={errors.ttdPutusan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                        {errors.ttdPutusan && <small className="text-danger">{errors.ttdPutusan.message}</small>}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <div className='col-form-label mb-0'>Diterbitkan di</div>
                                        <input type="text" {...register("diterbitkan", { required: "Mohon isi tempat terbit dokumen."})} className={errors.diterbitkan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                        {errors.diterbitkan && <small className="text-danger">{errors.diterbitkan.message}</small>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <h5 className='mb-0 mt-3'>Tembusan:</h5>
                                    <ol>
                                        <li><input type="text" name='tembusan1' id='tembusan1' {...register("tembusan1")} style={{marginLeft: "10px", border:0, borderBottom: "1px dotted black", width:"200px"}} /></li>
                                        <li><input type="text" name='tembusan2' id='tembusan2' {...register("tembusan2")} style={{marginLeft: "10px", border:0, borderBottom: "1px dotted black", width:"200px"}} /></li>
                                        <li><input type="text" name='tembusan3' id='tembusan3' {...register("tembusan3")} style={{marginLeft: "10px", border:0, borderBottom: "1px dotted black", width:"200px"}} /></li>
                                        <li><input type="text" name='tembusan4' id='tembusan4' {...register("tembusan4")} style={{marginLeft: "10px", border:0, borderBottom: "1px dotted black", width:"200px"}} /></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div style={{marginLeft: "15px"}}>
                            <div className="row">
                                <div className="col-sm-9">
                                    <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                    <button type="button" className="btn btn-danger btn-label-secondary me-sm-2 me-1">Batal</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DocK62