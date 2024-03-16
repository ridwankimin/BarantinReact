/* eslint-disable eqeqeq */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {decode as base64_decode} from 'base-64';
import ModaAlatAngkut from '../../model/master/modaAlatAngkut.json';
import { useNavigate } from 'react-router-dom';
import PnPenolakan from '../../model/PnPenolakan';
import PtkHistory from '../../model/PtkHistory';
import PtkModel from '../../model/PtkModel';
import Swal from 'sweetalert2';
import PtkSurtug from '../../model/PtkSurtug';
import LoadBtn from '../../component/loading/LoadBtn';

function modaAlatAngkut(e){
    return ModaAlatAngkut.find((element) => element.id == parseInt(e))
}

const log = new PtkHistory()
const modelPemohon = new PtkModel()
const modelSurtug = new PtkSurtug()
const modelPenolakan = new PnPenolakan()

function DocK74() {
    const idPtk = Cookies.get("idPtkPage");
    let navigate = useNavigate();
    let [data, setData] = useState({
        noAju: "",
        noIdPtk: "",
        noDokumen: "",
        tglDokumen: "",
    })
    let [onLoad, setOnLoad] = useState(false)
    
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    
    const cekWatch = watch()
    
    function onSubmit(data) {
        setOnLoad(true)
        const response = modelPenolakan.save74(data);
        response
        .then((response) => {
            setOnLoad(false)
            if(response.data) {
                if(response.data.status == 201) {
                    const resHsy = log.pushHistory(data.idPtk, "p6", "K-7.4", (data.idDok74 ? 'UPDATE' : 'NEW'));
                    resHsy
                    .then((response) => {
                        if(response.data.status == 201) {
                            if(import.meta.env.VITE_BE_ENV == "DEV") {
                                console.log("history saved")
                            }
                        }
                    })
                    .catch((error) => {
                        if(import.meta.env.VITE_BE_ENV == "DEV") {
                            console.log(error)
                        }
                    });
                    //end save history
    
                    // alert(response.data.status + " - " + response.data.message)
                    Swal.fire({
                        title: "Sukses!",
                        text: "Dokumen NNC berhasil " + (data.idDok74 ? "diedit." : "disimpan."),
                        icon: "success"
                    });
                    setValue("idDok74", response.data.data.id)
                    setValue("noDok74", response.data.data.nomor)
                }
            }
        })
        .catch((error) => {
            setOnLoad(false)
            if(import.meta.env.VITE_BE_ENV == "DEV") {
                console.log(error)
            }
            Swal.fire({
                title: "Error " + error.response.status,
                text: error.response.data.message,
                icon: "error"
            });
            // alert(error.response.status + " - " + error.response.data.message)
        });
    }

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok74", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
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
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorPTK: "",
                            listPtk: response.data.data.ptk,
                            listDokumen: response.data.data.ptk_dokumen
                        }));
                        const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), Cookies.get("jenisKarantina"));
                        resKom
                        .then((res) => {
                            if(typeof res.data != "string") {
                                if(res.data.status == 200) {
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
                            if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status == 404) {
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

            const resPenIdnNC = modelPenolakan.getByPtkId(base64_decode(ptkNomor[1]), 32);
            resPenIdnNC
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorNnc: ""
                        }));
                        if(response.data.status == 200) {
                            setValue("idDok74", response.data.data[0].id)
                            setValue("noDok74", response.data.data[0].nomor)
                            setValue("tglDok74", response.data.data[0].tanggal)
                            setValue("toNPPO", response.data.data[0].kepada)
                            setValue("nnc1", response.data.data[0].specify1 == null ? "" : "1")
                            setValue("nnc2", response.data.data[0].specify2 == null ? "" : "1")
                            setValue("nnc3", response.data.data[0].specify3 == null ? "" : "1")
                            setValue("nnc4", response.data.data[0].specify4 == null ? "" : "1")
                            setValue("nnc5", response.data.data[0].specify5 == null ? "" : "1")
                            setValue("textNnc1", response.data.data[0].specify1 == null ? "" : response.data.data[0].specify1)
                            setValue("textNnc2", response.data.data[0].specify2 == null ? "" : response.data.data[0].specify2)
                            setValue("textNnc3", response.data.data[0].specify3 == null ? "" : response.data.data[0].specify3)
                            setValue("textNnc4", response.data.data[0].specify4 == null ? "" : response.data.data[0].specify4)
                            setValue("textNnc5", response.data.data[0].specify5 == null ? "" : response.data.data[0].specify5)
                            setValue("rekomendasi", response.data.data[0].rekomendasi_id != null ? response.data.data[0].rekomendasi_id.toString() : "")
                            setValue("entirePartial", response.data.data[0].consignment)
                            setValue("isAttach", response.data.data[0].is_attachment)
                            setValue("consignmentDetil", response.data.data[0].consignment_detil)
                            setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                            setValue("ttdPutusan", response.data.data[0].user_ttd_id?.toString())
                        }
                    } else {
                        setData(values => ({...values,
                            errorNnc: "Gagal load data NNC",
                            errorPenolakan: "Gagal load data Surat Penolakan",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.status == 404) {
                        const resPenId = modelPenolakan.getByPtkId(base64_decode(ptkNomor[1]), 29);
                        resPenId
                        .then((response) => {
                            if(response.data) {
                                if(typeof response.data != "string") {
                                    setData(values => ({...values,
                                        errorPenolakan: ""
                                    }));
                                    if(response.data.status == 200) {
                                        setValue("idDok71", response.data.data[0].id)
                                        setValue("noDok71", response.data.data[0].nomor)
                                        setValue("tglDok71", response.data.data[0].tanggal)
                                        setValue("nnc1", (response.data.data[0].alasan3 == 1 || response.data.data[0].alasan5 == 1 ? "1" : ""))
                                        setValue("nnc2", (response.data.data[0].alasan1 == 1 || response.data.data[0].alasan2 == 1 ? "1" : ""))
                                        setValue("nnc3", (response.data.data[0].alasan4 == 1 || response.data.data[0].alasan7 == 1 || response.data.data[0].alasan8 == 1 ? "1" : ""))
                                        setValue("nnc4", (response.data.data[0].alasan6 == 1 ? "1" : ""))
                                        setValue("nnc5", (response.data.data[0].alasan9 == 1 ? "1" : ""))
                                    }
                                } else {
                                    setData(values => ({...values,
                                        errorPenolakan: "Gagal load data Surat Penolakan",
                                    }));
                                }
                            }
                        })
                        .catch((error) => {
                            if(import.meta.env.VITE_BE_ENV == "DEV") {
                                console.log(error)
                            }
                            if(error.response) {
                                if(error.response.status == 404) {
                                    Swal.fire("Surat Penolakan tidak ada/Belum dibuat. Mohon buat Surat Penolakan dahulu!")
                                    navigate("/k71")
                                } else {
                                    setData(values => ({...values,
                                        errorPenolakan: "Gagal load data Surat Penolakan",
                                    }));
                                }
                            }
                        });
                        // Swal.fire("Surat Penolakan tidak ada/Belum dibuat. Mohon buat Surat Penolakan dahulu!")
                        // navigate("/k71")
                    } else {
                        setData(values => ({...values,
                            errorNnc: "Gagal load data NNC",
                            errorPenolakan: "Gagal load data Surat Penolakan"
                        }));
                    }
                }
            });

            const resSurtug = modelSurtug.getSurtugByPtk(base64_decode(ptkNomor[1]), 10);
            resSurtug
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorSurtug: "",
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                                petugas: response.data.data
                            }));
                            setValue("idSurtug", response.data.data[0].ptk_surtug_header_id)
                        } else if(response.data.status == 404){
                            setData(values => ({...values,
                                errorSurtug: "Surat Tugas tidak ada/belum dibuat"
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data Surat Tugas"
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status == 404) {
                        setData(values => ({...values,
                            errorSurtug: "Surat Tugas tidak ada/belum dibuat"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data Surat Tugas"
                        }));
                    }
                }
            });
        }
    },[idPtk, setValue, navigate])

    function refreshData() {
        if(data.errorPTK) {
            const response = modelPemohon.getPtkId(data.noIdPtk);
            response
            .then((response) => {
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorPTK: "",
                            listPtk: response.data.data.ptk,
                            listDokumen: response.data.data.ptk_dokumen
                        }));
                        setValue("idPtk", data.noIdPtk)
                        setValue("noDokumen", data.noDokumen)
                    }
                } else {
                    setData(values => ({...values,
                        errorPTK: "Gagal load data PTK"
                    }));
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status == 404) {
                        setData(values => ({...values,
                            errorPTK: "Data PTK Kosong/Tidak ada"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK"
                        }));
                    }
                }
            });
        }

        if(data.errorKomoditas) {
            const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, Cookies.get("jenisKarantina"));
            resKom
            .then((res) => {
                if(typeof res.data != "string") {
                    if(res.data.status == 200) {
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
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorKomoditas: "Gagal load data Komoditas"
                }));
            });
        }

        if(data.errorPenolakan) {
            const resPenId = modelPenolakan.getByPtkId(data.noIdPtk, 29);
            resPenId
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorPenolakan: ""
                        }));
                        if(response.data.status == 200) {
                            setValue("idDok71", response.data.data[0].id)
                            setValue("noDok71", response.data.data[0].nomor)
                            setValue("tglDok71", response.data.data[0].tanggal)
                            setValue("nnc1", (response.data.data[0].alasan3 == 1 || response.data.data[0].alasan5 == 1 ? "1" : ""))
                            setValue("nnc2", (response.data.data[0].alasan1 == 1 || response.data.data[0].alasan2 == 1 ? "1" : ""))
                            setValue("nnc3", (response.data.data[0].alasan4 == 1 || response.data.data[0].alasan7 == 1 || response.data.data[0].alasan8 == 1 ? "1" : ""))
                            setValue("nnc4", (response.data.data[0].alasan6 == 1 ? "1" : ""))
                            setValue("nnc5", (response.data.data[0].alasan9 == 1 ? "1" : ""))
                        }
                    } else {
                        setData(values => ({...values,
                            errorPenolakan: "Gagal load data Surat Penolakan",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.status == 404) {
                        Swal.fire("Surat Penolakan tidak ada/Belum dibuat. Mohon buat Surat Penolakan dahulu!")
                        navigate("/k71")
                    } else {
                        setData(values => ({...values,
                            errorPenolakan: "Gagal load data Surat Penolakan",
                        }));
                    }
                }
            });
        }

        if(data.errorNnc) {
            const resPenIdnNC = modelPenolakan.getByPtkId(data.noIdPtk, 32);
            resPenIdnNC
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorNnc: ""
                        }));
                        if(response.data.status == 200) {
                            setValue("idDok74", response.data.data[0].id)
                            setValue("noDok74", response.data.data[0].nomor)
                            setValue("tglDok74", response.data.data[0].tanggal)
                            setValue("toNPPO", response.data.data[0].kepada)
                            setValue("nnc1", response.data.data[0].specify1 == null ? "" : "1")
                            setValue("nnc2", response.data.data[0].specify2 == null ? "" : "1")
                            setValue("nnc3", response.data.data[0].specify3 == null ? "" : "1")
                            setValue("nnc4", response.data.data[0].specify4 == null ? "" : "1")
                            setValue("nnc5", response.data.data[0].specify5 == null ? "" : "1")
                            setValue("textNnc1", response.data.data[0].specify1 == null ? "" : response.data.data[0].specify1)
                            setValue("textNnc2", response.data.data[0].specify2 == null ? "" : response.data.data[0].specify2)
                            setValue("textNnc3", response.data.data[0].specify3 == null ? "" : response.data.data[0].specify3)
                            setValue("textNnc4", response.data.data[0].specify4 == null ? "" : response.data.data[0].specify4)
                            setValue("textNnc5", response.data.data[0].specify5 == null ? "" : response.data.data[0].specify5)
                            setValue("rekomendasi", response.data.data[0].rekomendasi_id != null ? response.data.data[0].rekomendasi_id.toString() : "")
                            setValue("entirePartial", response.data.data[0].consignment)
                            setValue("isAttach", response.data.data[0].is_attachment)
                            setValue("consignmentDetil", response.data.data[0].consignment_detil)
                            setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                            setValue("ttdPutusan", response.data.data[0].user_ttd_id?.toString())
                        }
                    } else {
                        setData(values => ({...values,
                            errorNnc: "Gagal load data NNC",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.status == 404) {
                    setData(values => ({...values,
                        errorNnc: ""
                    }));
                } else {
                    setData(values => ({...values,
                        errorNnc: "Gagal load data NNC"
                    }));
                }
            })
        }

        if(data.errorSurtug) {
            const resSurtug = modelSurtug.getSurtugByPtk(data.noIdPtk, 10);
            resSurtug
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorSurtug: ""
                        }));
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                                petugas: response.data.data
                            }));
                            setValue("idSurtug", response.data.data[0].ptk_surtug_header_id)
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorSurtug: "Surat Tugas tidak ada/belum dibuat"
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data Surat Tugas"
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status == 404) {
                        setData(values => ({...values,
                            errorSurtug: "Surat Tugas tidak ada/belum dibuat"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data Surat Tugas"
                        }));
                    }
                }
            });
        }
    }
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-7.4 <span className="fw-light" style={{color: 'blue'}}>NOTIFICATION OF NON-COMPLIANCE</span>

            <small className='float-end'>
                <span className='text-danger'>{(data.errorPTK ? data.errorPTK + "; " : "") + (data.errorKomoditas ? data.errorKomoditas + "; " : "") + (data.errorPenolakan ? data.errorPenolakan + "; " : "") + (data.errorNnc ? data.errorNnc + "; " : "") + (data.errorSurtug ? data.errorSurtug + "; " : "")}</span>
                {data.errorPTK || data.errorKomoditas || data.errorPenolakan || data.errorNnc || data.errorSurtug ?
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
                        <input type="hidden" id='idDok74' {...register("idDok74")} />
                        <input type="hidden" id='idPtk' {...register("idPtk")} />
                        <input type="hidden" id='noDokumen' {...register("noDokumen")} />
                        <input type="hidden" id='idSurtug' {...register("idSurtug")} />
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok74">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok74" name='noDok74' {...register("noDok74")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-7.4" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok74">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok74" name='tglDok74' {...register("tglDok74", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok74 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok74 && <small className="text-danger">{errors.tglDok74.message}</small>}
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="karantinaTujuan">To NPPO <span className='text-danger'>*</span></label>
                                <div className='col-sm-4'>
                                    <textarea name="toNPPO" id="toNPPO" rows="2" {...register("toNPPO", {required: "Mohon isi tujuan NNC.."})} className={errors.toNPPO ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}></textarea>
                                    {errors.toNPPO && <small className="text-danger">{errors.toNPPO.message}</small>}
                                </div>
                                {/* <div className='col-sm-1' style={{paddingRight:0}}>
                                    <input type="text" id="karantinaTujuanDepan" name='karantinaTujuanDepan' {...register("karantinaTujuanDepan")} className="form-control form-control-sm" />
                                </div>
                                <div className='col-sm-2' style={{paddingLeft: 0, paddingRight:0}}>
                                    <input type="text" id="karantinaTujuan" name='karantinaTujuan' {...register("karantinaTujuan")} className="form-control form-control-sm" placeholder="To NPPO.." disabled />
                                </div>
                                <div className='col-sm-1' style={{paddingLeft:0}}>
                                    <input type="text" id="karantinaTujuanBeakang" name='karantinaTujuanBeakang' {...register("karantinaTujuanBeakang")} className="form-control form-control-sm" />
                                </div> */}
                            </div>
                        </div>
                        <div className="accordion mb-4" id="collapseSection">
                            <div className="card">
                                <h2 className="accordion-header" id="headerKeterangan">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseKeterangan"  style={{backgroundColor: '#123138'}} aria-expanded="true" aria-controls="collapseCountry">
                                        <h5 className='text-lightest mb-0'>I. Description of the Consignment</h5>
                                    </button>
                                </h2>
                                <div id="collapseKeterangan">
                                    <div className="accordion-body">
                                        <div className='row'>
                                            <div className="col-md-6">
                                                <h5 className='mb-1'><b><u>Consignor</u></b></h5>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="namaPengirim">Name </label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="namaPengirim" value={(data.listPtk && (data.listPtk.nama_pengirim)) || ""} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatPengirim">Address</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="alamatPengirim" value={(data.listPtk && (data.listPtk.alamat_pengirim)) || ""} disabled className="form-control form-control-sm" placeholder="Alamat Pengirim" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasPengirim">Identity</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasPengirim" className="form-control form-control-sm" disabled value={(data.listPtk && (data.listPtk.jenis_identitas_pengirim + " - " + data.listPtk.nomor_identitas_pengirim)) || ""} id="identitasPengirim" placeholder="Identitas Pengirim" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h5 className='mb-1'><b><u>Consignee</u></b></h5>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="namaPenerima">Name </label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="namaPenerima" value={(data.listPtk && (data.listPtk.nama_penerima)) || ""} disabled className="form-control form-control-sm" placeholder="Nama Penerima" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatPenerima">Address</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="alamatPenerima" value={(data.listPtk && (data.listPtk.alamat_penerima)) || ""} disabled className="form-control form-control-sm" placeholder="Alamat Penerima" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasPenerima">Identity</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasPenerima" className="form-control form-control-sm" disabled value={(data.listPtk && (data.listPtk.jenis_identitas_penerima + " - " + data.listPtk.nomor_identitas_penerima)) || ""} id="identitasPenerima" placeholder="Identitas Penerima" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahAsal">Country/Place of origin</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahAsal" className="form-control form-control-sm" disabled value={(data.listPtk && (data.listPtk.negara_asal)) || ""} id="daerahAsal" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatKeluar">Port of Export</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatKeluar" className="form-control form-control-sm" disabled value={(data.listPtk && (data.listPtk.pelabuhan_muat + ", " + data.listPtk.negara_asal)) || ""} id="tempatKeluar" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatMasuk">Point of entry</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatMasuk" className="form-control form-control-sm" disabled value={(data.listPtk && (data.listPtk.pelabuhan_bongkar + ", " + data.listPtk.negara_tujuan)) || ""} id="tempatMasuk" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatTransit">Transit</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatTransit" className="form-control form-control-sm" disabled value={(data.listPtk && (data.listPtk.pelabuhan_transit == null ? "-" : (data.listPtk.pelabuhan_transit + ", " + data.listPtk.negara_transit))) || ""} id="tempatTransit" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasAngkut">Declared means of conveyance</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasAngkut" className="form-control form-control-sm" disabled value={(data.listPtk && (modaAlatAngkut(data.listPtk.moda_alat_angkut_terakhir_id).nama_en + ", " + data.listPtk.nama_alat_angkut_terakhir)) || ""} id="identitasAngkut" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="kemasan">Packing Unit / Distinguishing marks</label>
                                                    <div className="col-sm-8">
                                                        <input name="kemasan" className="form-control form-control-sm" disabled value={(data.listPtk && (data.listPtk.kemasan + " / " + data.listPtk.tanda_khusus)) || ""} id="kemasan" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="merkKemasan">Number and description of packages</label>
                                                    <div className="col-sm-8">
                                                        <input name="merkKemasan" className="form-control form-control-sm" disabled value={(data.listPtk && (data.listPtk.merk_kemasan)) || ""} id="merkKemasan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <h5><b><u>Description of Comodities</u></b></h5>
                                        <div className="table-responsive text-nowrap" style={{height: (data.listKomoditas?.length > 8 ? "300px" : "")}}>
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
                                                        <th>Volume P6</th>
                                                        <th>Netto P6</th>
                                                        <th>Jantan P6</th>
                                                        <th>Betina P6</th>
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
                                                                    <td className='text-end'>{data.volume_netto?.toLocaleString()}</td>
                                                                    <td>{data.sat_netto}</td>
                                                                    <td className='text-end'>{data.volume_lain?.toLocaleString()}</td>
                                                                    <td>{data.sat_lain}</td>
                                                                    <td className='text-end'>{data.jantan?.toLocaleString()}</td>
                                                                    <td className='text-end'>{data.betina?.toLocaleString()}</td>
                                                                    <td className='text-end'>{data.volumeP6?.toLocaleString()}</td>
                                                                    <td className='text-end'>{data.nettoP6?.toLocaleString()}</td>
                                                                    <td className='text-end'>{data.jantanP6?.toLocaleString()}</td>
                                                                    <td className='text-end'>{data.betinaP6?.toLocaleString()}</td>
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
                            <div className="card">
                                <h2 className="accordion-header" id="headerNNC">
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#headerNNC" aria-expanded="true" aria-controls="collapseNNC">
                                        <h5 className='text-lightest mb-0'>II. NATURE OF NON-COMPLIANCE
                                        </h5>
                                    </button>
                                </h2>
                                <div id="headerNNC">
                                    <div className="accordion-body">
                                        <div className="form-check mb-3">
                                            <label className="form-check-label"  htmlFor={"nnc1"}>Prohibited goods:</label>
                                            <input className="form-check-input" type="checkbox" name={"nnc1"} id={"nnc1"} value="1" {...register("nnc1")} />
                                            <input type="text" className={errors.textNnc1 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name='textNnc1' {...register("textNnc1", {required: (cekWatch.nnc1 == "1" ? "Mohon sebutkan rinciannya.." : false)})} placeholder='Specify of Prohibited goods..' />
                                            {errors.textNnc1 && <small className="text-danger">{errors.textNnc1.message}</small>}
                                        </div>
                                        <div className="form-check mb-3">
                                            <label className="form-check-label"  htmlFor={"nnc2"}>Problem with documentation (specify):</label>
                                            <input className="form-check-input" type="checkbox" name={"nnc2"} id={"nnc2"} value="1" {...register("nnc2")} />
                                            <input type="text" className={errors.textNnc2 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name='textNnc2' {...register("textNnc2", {required: (cekWatch.nnc2 == "1" ? "Mohon sebutkan rinciannya.." : false)})} placeholder='Specify of Problem with documentation..' />
                                            {errors.textNnc2 && <small className="text-danger">{errors.textNnc2.message}</small>}
                                        </div>
                                        <div className="form-check mb-3">
                                            <label className="form-check-label"  htmlFor={"nnc3"}>The goods were infected/infested/contaminated with the following regulated pests or prohibited articles (specify):</label>
                                            <input className="form-check-input" type="checkbox" name={"nnc3"} id={"nnc3"} value="1" {...register("nnc3")} />
                                            <input type="text" className={errors.textNnc3 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name='textNnc3' {...register("textNnc3", {required: (cekWatch.nnc3 == "1" ? "Mohon sebutkan rinciannya.." : false)})} placeholder='Specify of regulation..' />
                                            {errors.textNnc3 && <small className="text-danger">{errors.textNnc3.message}</small>}
                                        </div>
                                        <div className="form-check mb-3">
                                            <label className="form-check-label"  htmlFor={"nnc4"}>The goods do not comply with Indonesia's food safety/quality requirements (specify):</label>
                                            <input className="form-check-input" type="checkbox" name={"nnc4"} id={"nnc4"} value="1" {...register("nnc4")} />
                                            <input type="text" className={errors.textNnc4 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name='textNnc4' {...register("textNnc4", {required: (cekWatch.nnc4 == "1" ? "Mohon sebutkan rinciannya.." : false)})} placeholder='Specify of Indonesia`s food safety/quality requirements..' />
                                            {errors.textNnc4 && <small className="text-danger">{errors.textNnc4.message}</small>}
                                        </div>
                                        <div className="form-check mb-3">
                                            <label className="form-check-label"  htmlFor={"nnc5"}>The goods do not comply with other Indonesia's SPS requirements (specify):</label>
                                            <input className="form-check-input" type="checkbox" name={"nnc5"} id={"nnc5"} value="1" {...register("nnc5")} />
                                            <input type="text" className={errors.textNnc5 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name='textNnc5' {...register("textNnc5", {required: (cekWatch.nnc5 ? "Mohon sebutkan rinciannya.." : false)})} placeholder='Specify of Indonesia`s SPS requirements..' />
                                            {errors.textNnc5 && <small className="text-danger">{errors.textNnc5.message}</small>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <h2 className="accordion-header" id="headerDisposisi">
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#headerDisposisi" aria-expanded="true" aria-controls="collapseDisposisi">
                                        <h5 className='text-lightest mb-0'>III. DISPOSITION OF THE CONSIGNMENT
                                        </h5>
                                    </button>
                                </h2>
                                <div id="headerDisposisi">
                                    <div className="accordion-body">
                                        The &nbsp;&nbsp;
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor={"entire"}>entire</label>
                                            <input className="form-check-input" type="radio" name={"entirePartial"} id={"entire"} value="ENTIRE" {...register("entirePartial")} />
                                        </div>
                                        or &nbsp;&nbsp;
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor={"partial"}>partial</label>
                                            <input className="form-check-input" type="radio" name={"entirePartial"} id={"partial"} value="PARTIAL" {...register("entirePartial")} />
                                        </div>
                                        lot of the consignment was:
                                        {errors.entirePartial && <small className="text-danger">{errors.entirePartial.message}</small>}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor={"treated"}>treated.</label>
                                            <input className="form-check-input" type="radio" name="rekomendasi" id="treated" value="33" {...register("rekomendasi")} />
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor={"destroyed"}>destroyed.</label>
                                            <input className="form-check-input" type="radio" name="rekomendasi" id="destroyed" value="34" {...register("rekomendasi")} />
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor={"refused"}>refused.</label>
                                            <input className="form-check-input" type="radio" name="rekomendasi" id="refused" value="35" {...register("rekomendasi")} />
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label" htmlFor={"released"}>released.</label>
                                            <input className="form-check-input" type="radio" name="rekomendasi" id="released" value="36" {...register("rekomendasi")} />
                                        </div>

                                        <p className='mb-0 mt-2'>**)Detail :</p>
                                        <div className='col-sm-6'>
                                            <textarea className='form-control form-control-sm' name="consignmentDetil" id="consignmentDetil" rows="2" placeholder='Detail..' {...register("consignmentDetil")}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-3 mt-3'>
                            <div className="offset-sm-2 col-sm-6">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="isAttach" id="isAttach" value="1" {...register("isAttach")} />
                                    <label className="form-check-label" htmlFor="isAttach">Attachment</label>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-2 col-form-label'>Penandatangan</div>
                            <div className="col-sm-3 mb-3 pr-2">
                                <select className={errors.ttdPutusan == '' ? 'form-select form-select-sm is-invalid' : 'form-select form-select-sm'} name="ttdPutusan" id="ttdPutusan" {...register("ttdPutusan", { required: "Mohon pilih penandatangan."})}>
                                    <option value="">--</option>
                                    {data.petugas?.map((item, index) => (
                                        <option value={item.petugas_id} key={index}>{item.nama + " - " + item.nip}</option>
                                    ))}
                                </select>
                                {errors.ttdPutusan && <small className="text-danger">{errors.ttdPutusan.message}</small>}
                            </div>
                            <div className='col-sm-2 col-form-label text-sm-end'>Diterbitkan di</div>
                            <div className="col-sm-3 mb-3 pr-2">
                                <input type="text" {...register("diterbitkan", { required: "Mohon isi tempat terbit dokumen."})} className={errors.diterbitkan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                {errors.diterbitkan && <small className="text-danger">{errors.diterbitkan.message}</small>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="offset-sm-2 col-sm-9">
                                {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                                    <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                }
                                <button type="button" className="btn btn-danger btn-label-secondary me-sm-2 me-1">Batal</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DocK74