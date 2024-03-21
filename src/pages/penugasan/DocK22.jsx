/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {decode as base64_decode} from 'base-64';
import { Controller, useForm } from 'react-hook-form';
import PtkSurtug from '../../model/PtkSurtug';
import Swal from 'sweetalert2';
import Select from 'react-select';
import PegawaiJson from '../../model/master/pegawaiPertanian.json'
import LoadBtn from '../../component/loading/LoadBtn';

const modelSurtug = new PtkSurtug()

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

function stringSimbol(e) {
    return <div dangerouslySetInnerHTML={{__html: e}} />;
}

function DocK22(props) {
    const idPtk = Cookies.get("idPtkPage");
    let navigate = useNavigate();
    let [addSurtug, setAddSurtug] = useState(false);
    let [listDataHeader, setListDataHeader] = useState();
    let [listDataDetil, setListDataDetil] = useState();
    let [data, setData] = useState({})
    let [onLoad, setOnload] = useState(false)
    const {
		register: registerHeader,
        setValue: setValueHeader,
        control: controlHeader,
        watch: watchHeader,
		handleSubmit: handleFormHeader,
        formState: { errors: errorsHeader },
	} = useForm()
    const dataHeader = watchHeader()

    const onSubmitHeader = (data) => {
        setOnload(true)
        const response = modelSurtug.simpanHeader(data);
            response
            .then((response) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(response);
                }
                if(response.data) {
                    if(response.data.status == 201) {
                        setOnload(false)
                        Swal.fire({
                            icon: "success",
                            title: "Sukses!",
                            text: "Nomor surat tugas berhasil " + (data.idHeader ? "diedit" : "disimpan")
                        })
                        setValueDetilSurtug("idHeader", response.data.data.id)
                        setValueHeader("idHeader", response.data.data.id)
                        setValueHeader("noSurtug", response.data.data.nomor)
                        setData(values => ({...values, 
                            nomorSurtug: response.data.data.nomor,
                            tglSurtug: data.tglSurtug,
                        }));

                        const responseDet = modelSurtug.getDetilByHeader(response.data.data.id);
                        responseDet
                        .then((res) => {
                            if(res.data) {
                                if(res.data.status == 200) {
                                    setListDataDetil(res.data.data)
                                } else {
                                    setListDataDetil([])
                                }
                            }
                        })
                        .catch((error) => {
                            if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                                console.log(error)
                            }
                            setListDataDetil([])
                        });
                        // dataSurtugHeader()
                        
                    } else {
                        setOnload(false)
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: response.data.message
                        })
                    }
                }
            })
            .catch((error) => {
                setOnload(false)
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
    
    const {
		register: registerDetilSurtug,
        setValue: setValueDetilSurtug,
        control: controlDetilSurtug,
        watch: watchDetilSurtug,
		handleSubmit: handleFormDetilSurtug,
        formState: { errors: errorsDetilSurtug },
        reset: resetFormDetilSurtug
	} = useForm({
        defaultValues: {
            pilihPetugas: "",
            opsiTK: "",
            opsiTKLainnya: "",
            opsiHKLainnya: ""
        }
    })
    const dataDetilSurtug = watchDetilSurtug()
    
    const onSubmitDetilSurtug = (data) => {
        setOnload(true)
        // console.log(data)
        const response = modelSurtug.simpanDetil(data);
            response
            .then((response) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(response);
                }
                if(response.data) {
                    if(response.data.status == 201) {
                        setOnload(false)
                        Swal.fire({
                            icon: "success",
                            title: "Sukses!",
                            text: "Detil petugas berhasil disimpan"
                        })
                        resetFormDetilSurtug()
                        dataSurtugDetil(data.idHeader)
                        props.refreshNavbar()
                    }
                }
            })
            .catch((error) => {
                setOnload(false)
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

    // function dataSurtugHeader() {
    //     const response = modelSurtug.getDetilSurtugPenugasan(data.idPtk, "");
    
    //     response
    //     .then((res) => {
    //         if(res.data) {
    //             if(res.data.status == 200) {
    //                 setListDataHeader(res.data.data)
    //             }
    //         }
    //     })
    //     .catch((error) => {
    //         if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
    //             console.log(error)
    //         }
    //         setListDataHeader([])
    //     });
    // }

    function dataSurtugDetil(id) {
        const response = modelSurtug.getDetilByHeader(id);

        response
        .then((res) => {
            if(res.data) {
                if(res.data.status == 200) {
                    setListDataDetil(res.data.data)
                } else {
                    setListDataDetil([])
                }
            }
        })
        .catch((error) => {
            if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
            setListDataDetil([])
        });
    }

    function handleEditHeader(e) {
        const dataHeader = listDataHeader?.filter((item, index) => (index == e))
        // const cell = e.target.closest('tr')
        setData(values => (
            {...values, 
                nomorSurtug: dataHeader[0].nomor,
                tglSurtug: dataHeader[0].tanggal,
            }));
        dataSurtugDetil(dataHeader[0].id)
        setValueHeader("idHeader", dataHeader[0].id)
        setValueDetilSurtug("idHeader", dataHeader[0].id)
        setValueHeader("perihalSurtug", dataHeader[0].perihal)
        setValueHeader("tglSurtug", dataHeader[0].tanggal)
        setValueHeader("noSurtug", dataHeader[0].nomor)
        setValueHeader("ttdSurtug", dataHeader[0].penanda_tangan_id)
        setValueHeader("ttdSurtugView", dataHeader[0].nama + " - " + dataHeader[0].nip)
        setAddSurtug(true);
    }
    
    function handleHeaderBaru() { 
        setData(values => ({...values, 
                nomorSurtug: "",
                tglSurtug: "",
            }));
        setListDataDetil([])
        setValueHeader("idHeader", "")
        setValueDetilSurtug("idHeader", "")
        setValueHeader("perihalSurtug", "Pelaksanaan Tindakan Karantina")
        setValueHeader("tglSurtug", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
        setValueHeader("noSurtug", "")
        setValueHeader("ttdSurtug", "")
        
        setAddSurtug(true);
    }

    // let cekSurtug = "";

    useEffect(() => {
        if(idPtk) {
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            setData(values => ({...values,
                noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                idPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                noDokumen: idPtk ? base64_decode(ptkNomor[2]): "",
            }));
            setValueHeader("idPtk", base64_decode(ptkNomor[1]));
            setValueHeader("noDok", base64_decode(ptkNomor[2]));
            setValueDetilSurtug("idPtk", base64_decode(ptkNomor[1]));
            
            const resAnalis = modelSurtug.getAnalisByPtk(base64_decode(ptkNomor[1]));
            resAnalis
            .then((res) => {
                if(res.data) {
                    if(typeof res.data != "string") {
                        if(res.data.status == 200) {
                            setValueHeader("idAnalis", res.data.data[0].id);
                            setData(values => ({...values,
                                errorAnalisis: "",
                                noAnalisa: res.data.data[0].nomor,
                                tglAnalisa: res.data.data[0].tanggal,
                            }));
                        } else {
                            setData(values => ({...values,
                                errorAnalisis: "Gagal load data history analisis",
                            }))
                        }
                    } else {
                        setData(values => ({...values,
                            errorAnalisis: "Gagal load data history analisis",
                        }))
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorAnalisis: "Gagal load data history analisis",
                }))
            });

            const response = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), "");
            response
            .then((res) => {
                if(res.data) {
                    if(typeof res.data != "string") {
                        if(res.data.status == 200) {
                            setListDataHeader(res.data.data)
                            setData(values => ({...values,
                                errorSurtug: "",
                            }))
                        } else {
                            setData(values => ({...values,
                                errorSurtug: "Gagal load data surat tugas",
                            }))
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data surat tugas",
                        }))
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.data.status == 404) {
                    setData(values => ({...values,
                        errorSurtug: "",
                    }));
                } else {
                    setData(values => ({...values,
                        errorSurtug: "Gagal load data surat tugas",
                    }));
                }
                setListDataHeader() 
            });
        }
        // dataSurtugHeader()
    },[idPtk, setValueDetilSurtug, setValueHeader])

    function refreshData() {
        if(data.errorAnalisis) {
            const resAnalis = modelSurtug.getAnalisByPtk(data.idPtk);
            resAnalis
            .then((res) => {
                if(res.data) {
                    if(typeof res.data != "string") {
                        if(res.data.status == "200") {
                            setData(values => ({...values,
                                errorAnalisis: "",
                                noAnalisa: res.data.data[0].nomor,
                                tglAnalisa: res.data.data[0].tanggal,
                            }));
                            setValueHeader("idAnalis", res.data.data[0].id);
                        } else {
                            setData(values => ({...values,
                                errorAnalisis: "Gagal load data history analisis else != 200",
                            }))
                        }
                    } else {
                        setData(values => ({...values,
                            errorAnalisis: "Gagal load data history analisis else string",
                        }))
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorAnalisis: "Gagal load data history analisis error",
                }))
            });
        }

        if(data.errorSurtug) {
            const response = modelSurtug.getDetilSurtugPenugasan(data.idPtk, "");
            response
            .then((res) => {
                if(res.data) {
                    if(typeof res.data != "string") {
                        if(res.data.status == 200) {
                            setData(values => ({...values,
                                errorSurtug: "",
                            }))
                            setListDataHeader(res.data.data)
                        } else {
                            setData(values => ({...values,
                                errorSurtug: "Gagal load data surat tugas",
                            }))
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data surat tugas",
                        }))
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.data.status == 404) {
                    setData(values => ({...values,
                        errorSurtug: "",
                    }));
                } else {
                    setData(values => ({...values,
                        errorSurtug: "Gagal load data surat tugas",
                    }));
                }
                setListDataHeader() 
            });
        }
    }

    return (
    <div className="container-fluid flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-2.2 <span className="fw-light" style={{color: 'blue'}}>SURAT TUGAS</span>
            
            <small className='float-end'>
                <span className='text-danger'>{(data.errorSurtug ? data.errorSurtug + "; " : "") + (data.errorAnalisis ? data.errorAnalisis + "; " : "")}</span>
                {data.errorSurtug || data.errorAnalisis ?
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
                                <div className='col-md-3' style={{borderRight: '1px solid'}}>
                                    <h4 className="text-lightest">Daftar Surat Tugas</h4>
                                </div>
                                <label className="col-sm-1 col-form-label" htmlFor="noAju">NOMOR AJU</label>
                                <div className="col-sm-3">
                                    <input type="text" id='noAju' value={data.noAju || ""} className='form-control form-control-sm' disabled/>
                                </div>
                                <label className="col-sm-2 col-form-label" htmlFor="noDok">NOMOR DOKUMEN</label>
                                <div className="col-sm-3">
                                    <input type="text" id='noDok' value={data.noDokumen || ""} className='form-control form-control-sm' disabled/>
                                </div>
                                <label className="offset-sm-3 col-sm-1 col-form-label" htmlFor="noAnalisa">NO ANALISA</label>
                                <div className="col-sm-3">
                                    <input type="text" id='noAnalisa' value={data.noAnalisa || ""} className='form-control form-control-sm' disabled/>
                                </div>
                                <label className="col-sm-2 col-form-label" htmlFor="tglAnalisa">TANGGAL ANALISA</label>
                                <div className="col-sm-2">
                                    <input type="text" id='tglAnalisa' value={data.tglAnalisa || ""} className='form-control form-control-sm' disabled/>
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
                    <div className="card-body pt-0">
                        <button className='btn btn-sm btn-primary' onClick={handleHeaderBaru}><i className="bx bx-plus bx-xs"></i> Buat Surat Tugas Baru</button>
                        <div className="row p-2">
                            <div className="table-responsive text-nowrap" style={{height: (listDataHeader?.length > 8 ? "300px" : "")}}>
                                <table className="table table-sm table-bordered table-hover table-striped mt-2">
                                    <thead>
                                        <tr>
                                            <th className='text-lightest'>NOMOR</th>
                                            <th className='text-lightest'>TANGGAL</th>
                                            <th className='text-lightest'>PERIHAL</th>
                                            <th className='text-lightest'>PENANDATANGAN</th>
                                            <th className='text-lightest'>NIP</th>
                                            <th className='text-lightest'>JABATAN</th>
                                            <th className='text-lightest'>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {listDataHeader ? (
                                        listDataHeader?.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data.nomor}</td>
                                                <td>{data.tanggal}</td>
                                                <td>{stringSimbol(data.perihal)}</td>
                                                <td>{data.nama}</td>
                                                <td>{data.nip}</td>
                                                <td>{data.jabatan}</td>
                                                <td>
                                                    <div className="d-grid gap-2">
                                                        <button type="button" className="btn p-0 hide-arrow dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown">
                                                            <i className="menu-icon tf-icons fa-solid fa-ellipsis-vertical"></i>
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <button className="dropdown-item" data-key={data.id} data-ttd={data.penanda_tangan_id} type="button" onClick={() => handleEditHeader(index)}><i className="fa-solid fa-pen-to-square me-1"></i> Edit</button>
                                                            <button className="dropdown-item" type='button'><i className="fa-solid fa-trash me-1"></i> Delete</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card card-action mb-4">
                    <div className="card-body pt-0" style={{display: (addSurtug ? 'block' : 'none')}}>
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-1 col-form-label" htmlFor="noDok22">Nomor</label>
                                <div className="col-sm-3">
                                    <input type="text" value={data.nomorSurtug || ""} id="noDok22" className="form-control form-control-sm" placeholder="Nomor" disabled />
                                </div>
                                <label className="col-sm-1 col-form-label" htmlFor="tglDok22">Tanggal</label>
                                <div className="col-sm-3">
                                    <input type="datetime-local" value={data.tglSurtug || ""} id="tglDok22" className="form-control form-control-sm" placeholder="Tanggal" disabled />
                                </div>
                                <div className="col-sm-4">
                                    <a href="#" rel="noopener noreferrer" target='_blank' className='btn btn-info pb-1 float-end'>
                                        <i className="bx bx-printer bx-sm"></i>
                                        Print
                                    </a>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <form className="row mb-3" onSubmit={handleFormHeader(onSubmitHeader)}>
                        <input type="hidden" name='idPtk' {...registerHeader("idPtk")} />
                        <input type="hidden" name='idHeader' {...registerHeader("idHeader")} />
                        <input type="hidden" name='idAnalis' {...registerHeader("idAnalis")} />
                        <input type="hidden" name='noDok' {...registerHeader("noDok")} />
                        <input type="hidden" name='noSurtug' {...registerHeader("noSurtug")} />
                            {/* <div className="row mb-3"> */}
                                <label className="col-sm-1 col-form-label" htmlFor="perihalSurtug">Perihal</label>
                                <div className="col-sm-2" style={{borderRight: '0.5px solid grey'}}>  
                                    <input type="text" id="perihalSurtug" name='perihalSurtug' {...registerHeader("perihalSurtug", { required: "Mohon isi perihal surat tugas."})} className={errorsHeader.perihalSurtug ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Perihal" />
                                    {errorsHeader.perihalSurtug && <small className="text-danger">{errorsHeader.perihalSurtug.message}</small>}
                                </div>
                                <label className="col-sm-1 col-form-label" htmlFor="ttdSurtug">TTD Surtug</label>
                                <div className="col-sm-3" style={{borderRight: '0.5px solid grey'}}>
                                    <Controller
                                        control={controlHeader}
                                        name={"ttdSurtug"}
                                        defaultValue={""}
                                        className="form-control form-control-sm"
                                        rules={{ required: "Mohon pilih penandatangan." }}
                                        render={({ field: { value,onChange, ...field } }) => (
                                            <Select styles={customStyles} placeholder={"Pilih penandatangan.."} value={{id: dataHeader.ttdSurtug, label: dataHeader.ttdSurtugView}} {...field} options={masterPegawai()} onChange={(e) => setValueHeader("ttdSurtug", e.value) & setValueHeader("ttdSurtugView", e.label)} />
                                        )}
                                    />
                                    {/* <input type="text" id="ttdSurtug" name='ttdSurtug' {...registerHeader("ttdSurtug", { required: "Mohon isi penandatangan surat tugas."})} className={errorsHeader.ttdSurtug ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Penandatangan" /> */}
                                    {errorsHeader.ttdSurtug && <small className="text-danger">{errorsHeader.ttdSurtug.message}</small>}
                                </div>
                                <label className="col-sm-1 col-form-label" htmlFor="tglSurtug">Tanggal</label>
                                <div className="col-sm-2" style={{borderRight: '0.5px solid grey'}}>  
                                    <input type="datetime-local" id="tglSurtug" name='tglSurtug' {...registerHeader("tglSurtug", { required: "Mohon isi tanggal surat tugas."})} className={errorsHeader.tglSurtug ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Tanggal Surat Tugas" />
                                    {errorsHeader.tglSurtug && <small className="text-danger">{errorsHeader.tglSurtug.message}</small>}
                                </div>
                                <div className="col-sm-2">
                                    {onLoad ? <LoadBtn warna="btn-primary" ukuran="btn-sm" /> :
                                        <button type="submit" className="btn btn-sm btn-primary">{dataHeader.idHeader == '' ? 'Buat Nomor Surtug' : 'Edit Surat Tugas'}</button>
                                    }
                                </div>
                            {/* </div> */}
                        </form>
                        {/* muncul setelah disimpan headernya */}
                        <div className="card card-action mb-4" style={{display: (dataHeader.idHeader ?  "block" : "none")}}>
                        {/* <div className="card card-action mb-4" style={{display: (isNomor ? 'block' : 'none')}}> */}
                            <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                <div className="card-action-title">
                                    <h5 className="mb-0 text-lightest">Petugas</h5>
                                </div>
                                <div className="card-action-element">
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item">
                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="collapse show">
                                <div className="card-body pt-0">
                                    <button type="button" className="btn btn-xs btn-primary" data-bs-toggle="modal" data-bs-target="#modPetugas">Tambah Petugas</button>
                                    {/* <button type="button" className="btn btn-xs btn-info float-end"><i className="menu-icon tf-icons bx bx-sync"></i> Refresh Data</button> */}
                                    <div className="table-responsive text-nowrap">
                                        <table className="table table-sm table-bordered table-hover table-striped mt-2">
                                            <thead>
                                                <tr>
                                                    <th className='text-lightest'>No</th>
                                                    <th className='text-lightest'>NIP</th>
                                                    <th className='text-lightest'>NAMA</th>
                                                    <th className='text-lightest'>JABATAN</th>
                                                    <th className='text-lightest'>PENUGASAN</th>
                                                    <th className='text-lightest'>#</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {listDataDetil ? (
                                                listDataDetil?.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{data.nip}</td>
                                                        <td>{data.nama}</td>
                                                        <td>{data.jabatan}</td>
                                                        <td>{data.tugas}</td>
                                                        <td>
                                                            <div className="d-grid gap-2">
                                                                <button type="button" className="btn p-0 hide-arrow">
                                                                    <i className="fa-solid fa-trash text-danger"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : null}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {listDataDetil?.some(item => item.penugasan_id == 1) == true ? 
                            (<button type='button' onClick={() => navigate("/k37a")} className='btn btn-info pb-1 float-end'>
                            <i className="bx bx-send bx-sm"></i>
                                Pemeriksaan Administrasi
                            </button>)
                        : ""}
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="modPetugas" data-bs-backdrop="static" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="backDropModalTitle">Tambah Petugas</h5>
                    <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className="card card-action mb-4">
                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                            <div className="card-action-title">
                                <h5 className="mb-0 text-lightest">Penugasan</h5>
                            </div>
                            <div className="card-action-element">
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                    <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="collapse show">
                            <div className="card-body pt-0">
                                <form onSubmit={handleFormDetilSurtug(onSubmitDetilSurtug)}>
                                    <input type="hidden" name='idPtk' {...registerDetilSurtug("idPtk")} />
                                    <input type="hidden" name='idHeader' {...registerDetilSurtug("idHeader")} />
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-12">
                                            <div className='row'>
                                                <label className="col-sm-3 col-form-label text-sm-start" htmlFor="pilihPetugas">Pilih Petugas</label>
                                                <div className="col-sm-7">
                                                    <Controller
                                                        control={controlDetilSurtug}
                                                        name={"pilihPetugas"}
                                                        defaultValue={""}
                                                        className="form-control form-control-sm"
                                                        rules={{ required: "Mohon pilih petugas." }}
                                                        render={({ field: { value,onChange, ...field } }) => (
                                                            <Select styles={customStyles} placeholder={"Pilih petugas penerima.."} value={{id: dataDetilSurtug.pilihPetugas, label: dataDetilSurtug.pilihPetugasView}} {...field} options={masterPegawai()} onChange={(e) => setValueDetilSurtug("pilihPetugas", e.value) & setValueDetilSurtug("pilihPetugasView", e.label)} />
                                                        )}
                                                    />
                                                    {/* <input type="text" name='pilihPetugas' id='pilihPetugas' {...registerDetilSurtug("pilihPetugas", { required: "Mohon pilih petugas."})} className={errorsDetilSurtug.pilihPetugas ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} /> */}
                                                    {errorsDetilSurtug.pilihPetugas && <small className="text-danger">{errorsDetilSurtug.pilihPetugas.message}</small>}
                                                </div>
                                            </div>
                                            <label className="col-sm-9 col-form-label text-sm-start" htmlFor="collapse-country-origin">A. Tindakan Karantina dan hal terkait lainnya, berupa</label>
                                            <div className="row">
                                                <div className="col-sm-5">
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi1">Pemeriksaan Administrasi & Kesesuaian</label>
                                                        <input name="opsiTK" value={1} {...registerDetilSurtug("opsiTK", { required: "Mohon isi penugasan minimal 1 pilihan."})} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi1" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi2">Pemeriksaan Kesehatan</label>
                                                        <input name="opsiTK" value={2} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi2" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi3">Pengasingan & Pengamatan</label>
                                                        <input name="opsiTK" value={3} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi3" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi4">Pemeriksaan diatas Alat Angkut</label>
                                                        <input name="opsiTK" value={4} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi4" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi5">Pemeriksaan Alat Angkut</label>
                                                        <input name="opsiTK" value={5} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi5" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi6">Pengawasan Pihak Lain</label>
                                                        <input name="opsiTK" value={6} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi6" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi7">Pengawalan MP</label>
                                                        <input name="opsiTK" value={7} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi7" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi8">Perlakuan</label>
                                                        <input name="opsiTK" value={8} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi8" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi9">Penahanan</label>
                                                        <input name="opsiTK" value={9} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi9" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi10">Penolakan</label>
                                                        <input name="opsiTK" value={10} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi10" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi11">Pemusnahan</label>
                                                        <input name="opsiTK" value={11} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi11" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi17">Lainnya...</label>
                                                        <input name="opsiTK" value={17} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi17" />
                                                        <input style={{display: (dataDetilSurtug.opsiTK ? (dataDetilSurtug.opsiTK.indexOf('17') >= 0 ? 'block' : 'none') : 'none')}} {...registerDetilSurtug("opsiTKLainnya", {require: (dataDetilSurtug.opsiTK ? (dataDetilSurtug.opsiTK.indexOf('17') >= 0 ? 'Mohon isi detil penugasan.' : false) : false)})} name="opsiTKLainnya" type="text" className={errorsDetilSurtug.opsiTKLainnya ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Lainnya" />
                                                        {errorsDetilSurtug.opsiTKLainnya && <><br/><small className="text-danger">{errorsDetilSurtug.opsiTKLainnya.message}</small></>}
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi12">Penerbitan Surat Keterangan</label>
                                                        <input name="opsiTK" value={12} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi12" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi13">Pembebasan Sebagian</label>
                                                        <input name="opsiTK" value={13} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi13" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi14">Pembebasan Seluruh</label>
                                                        <input name="opsiTK" value={14} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsi14" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi15">Serah Terima</label>
                                                        <input name="opsiTK" value={15} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox"id="opsi15" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi16">Monitoring</label>
                                                        <input name="opsiTK" value={16} {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox"id="opsi16" />
                                                    </div>
                                                </div>
                                                {errorsDetilSurtug.opsiTK && <><br/><small className="text-danger">{errorsDetilSurtug.opsiTK.message}</small></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-12">
                                                <label className="col-form-label text-sm-start" htmlFor="collapse-country-origin">B. Penegakan Hukum dan hal terkait lainnya, berupa</label>
                                            <div className="row">
                                                <div className="col-sm-5">
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi18">Wasmalitrik</label>
                                                        <input name="opsiTK" {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" value={18} id="opsi18" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi19">Gelar Perkara</label>
                                                        <input name="opsiTK" {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" value={19} id="opsi19" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi20">Penyidikan</label>
                                                        <input name="opsiTK" {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" value={20} id="opsi20" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi21">Melengkapi Pemberkasan</label>
                                                        <input name="opsiTK" {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" value={21} id="opsi21" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="opsi22">Lainnya...</label>
                                                        <input name="opsiTK" {...registerDetilSurtug("opsiTK")} className={errorsDetilSurtug.opsiTK ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" value={22} id="opsi22" />
                                                        <input name="opsiHKLainnya" style={{display: (dataDetilSurtug.opsiTK ? (dataDetilSurtug.opsiTK.indexOf('22') >= 0 ? 'block' : 'none') : 'none')}} {...registerDetilSurtug("opsiHKLainnya", {require: (dataDetilSurtug.opsiTK ? (dataDetilSurtug.opsiTK.indexOf('22') >= 0 ? 'Mohon isi detil penugasan.' : false) : false)})} type="text" className='form-control form-control-sm' placeholder="Lainnya" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                                        <button type="submit" className="btn btn-primary">Simpan</button>
                                    }
                                    <button type="button" className="btn btn-label-secondary me-sm-2 me-1" data-bs-dismiss="modal">
                                    Close
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DocK22