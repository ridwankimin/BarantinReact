import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {decode as base64_decode} from 'base-64';
import { useForm } from 'react-hook-form';
import PtkSurtug from '../../model/PtkSurtug';

function DocK22() {
    let navigate = useNavigate();
    let [addSurtug, setAddSurtug] = useState(false);
    let [listDataHeader, setListDataHeader] = useState();
    let [listDataDetil, setListDataDetil] = useState();
    let [data, setData] = useState({})
    const {
		register: registerHeader,
        setValue: setValueHeader,
        watch: watchHeader,
		handleSubmit: handleFormHeader,
        formState: { errors: errorsHeader },
	} = useForm()
    const dataHeader = watchHeader()

    const onSubmitHeader = (data) => {
        console.log(data)
        const modelSurtug = new PtkSurtug();
        const response = modelSurtug.simpanHeader(data);
            response
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(response.data.status === '201') {
                        alert(response.data.status + " - " + response.data.message)
                        setValueDetilSurtug("idHeader", response.data.data.id)
                        setValueHeader("idHeader", response.data.data.id)
                        setValueHeader("noSurtug", response.data.data.nomor)
                        setData(values => (
                            {...values, 
                                nomorSurtug: response.data.data.nomor,
                                tglSurtug: data.tglSurtug,
                            }));
                        dataSurtugHeader()
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });
    }
    
    const {
		register: registerDetilSurtug,
        setValue: setValueDetilSurtug,
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
        // console.log(data)
        const modelSurtug = new PtkSurtug();
        const response = modelSurtug.simpanDetil(data);
            response
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(response.data.status === '201') {
                        alert(response.data.status + " - " + response.data.message)
                        resetFormDetilSurtug()
                        dataSurtugDetil(data.idHeader)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });
    }

    const idPtk = Cookies.get("idPtkPage");
    useEffect(() => {
        if(idPtk) {
            setValueHeader("tglSurtug", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
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
            const modelSurtug = new PtkSurtug();

            const resAnalis = modelSurtug.getAnalisByPtk(base64_decode(ptkNomor[1]));
            resAnalis
            .then((res) => {
                if(res.data) {
                    if(res.data.status === '200') {
                        setValueHeader("idAnalis", res.data.data[0].id);
                        setData(values => ({...values,
                            noAnalisa: res.data.data[0].nomor,
                            tglAnalisa: res.data.data[0].tanggal,
                        }));
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });

            const response = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), "");
            response
            .then((res) => {
                console.log(res)
                if(res.data) {
                    if(res.data.status === '200') {
                        console.log(res.data.data[0])
                        setListDataHeader(res.data.data)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                setListDataHeader() 
            });
        }
        // dataSurtugHeader()
    },[idPtk, setValueDetilSurtug, setValueHeader])

    function dataSurtugHeader() {
        const modelSurtug = new PtkSurtug();
        const response = modelSurtug.getDetilSurtugPenugasan(data.idPtk, "");
        // console.log(noIdPtk)
    
        response
        .then((res) => {
            // console.log(res)
            if(res.data) {
                if(res.data.status === '200') {
                    setListDataHeader(res.data.data)
                }
            }
        })
        .catch((error) => {
            console.log(error.response);
            setListDataHeader()
        });
    }

    function dataSurtugDetil(id) {
        const modelSurtug = new PtkSurtug();
        const response = modelSurtug.getDetilByHeader(id);

        response
        .then((res) => {
            // console.log(res)
            if(res.data) {
                if(res.data.status === '200') {
                    console.log(res.data)
                    setListDataDetil(res.data.data)
                } else {
                    setListDataDetil()
                }
            }
        })
        .catch((error) => {
            console.log(error.response);
            setListDataDetil()
        });
    }

    function handleEditHeader(e) {
        const cell = e.target.closest('tr')
        setData(values => (
            {...values, 
                nomorSurtug: cell.cells[0].innerHTML,
                tglSurtug: cell.cells[1].innerHTML,
            }));
        dataSurtugDetil(e.target.dataset.key)
        setValueHeader("idHeader", e.target.dataset.key)
        setValueDetilSurtug("idHeader", e.target.dataset.key)
        setValueHeader("perihalSurtug", cell.cells[2].innerHTML.replace("</div>", "").replace("<div>", ""))
        setValueHeader("tglSurtug", cell.cells[1].innerHTML)
        setValueHeader("noSurtug", cell.cells[0].innerHTML)
        setValueHeader("ttdSurtug", e.target.dataset.ttd)
        setAddSurtug(true);
    }
    
    function handleHeaderBaru() { 
        setData(values => (
            {...values, 
                nomorSurtug: "",
                tglSurtug: "",
            }));
        setValueHeader("idHeader", "")
        setValueDetilSurtug("idHeader", "")
        setValueHeader("perihalSurtug", "")
        setValueHeader("tglSurtug", "")
        setValueHeader("noSurtug", "")
        setValueHeader("ttdSurtug", "")
        setAddSurtug(true);
    }

    // let cekSurtug = "";

    function stringSimbol(e) {
        return <div dangerouslySetInnerHTML={{__html: e}} />;
    }

    return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-2.2 <span className="fw-light" style={{color: 'blue'}}>SURAT TUGAS</span>
        </h4>

        <div className="row">
            <div className="col-xxl">
                <div className="card card-action mb-4">
                    <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                        <div className="card-action-title">
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
                                    <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        <button className='btn btn-sm btn-primary' onClick={handleHeaderBaru}><i className="bx bx-plus bx-xs"></i> Buat Surat Tugas Baru</button>
                        <div className="row p-2">
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
                                            <div className="dropdown">
                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <button className="dropdown-item" data-key={data.id} data-ttd={data.penanda_tangan_id} type="button" onClick={handleEditHeader}><i className="fa-solid fa-pen-to-square me-1"></i> Edit</button>
                                                    <button className="dropdown-item" href="#"><i className="fa-solid fa-trash me-1"></i> Delete</button>
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
                                    <a href={require("../../dok/k22.pdf")} rel="noopener noreferrer" target='_blank' className='btn btn-info pb-1 float-end'>
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
                                <label className="col-sm-2 col-form-label" htmlFor="ttdSurtug">Penandatangan</label>
                                <div className="col-sm-2" style={{borderRight: '0.5px solid grey'}}>  
                                    <input type="text" id="ttdSurtug" name='ttdSurtug' {...registerHeader("ttdSurtug", { required: "Mohon isi penandatangan surat tugas."})} className={errorsHeader.ttdSurtug ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Penandatangan" />
                                    {errorsHeader.ttdSurtug && <small className="text-danger">{errorsHeader.ttdSurtug.message}</small>}
                                </div>
                                <label className="col-sm-1 col-form-label" htmlFor="tglSurtug">Tanggal</label>
                                <div className="col-sm-2" style={{borderRight: '0.5px solid grey'}}>  
                                    <input type="datetime-local" id="tglSurtug" name='tglSurtug' {...registerHeader("tglSurtug", { required: "Mohon isi tanggal surat tugas."})} className={errorsHeader.tglSurtug ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Tanggal Surat Tugas" />
                                    {errorsHeader.tglSurtug && <small className="text-danger">{errorsHeader.tglSurtug.message}</small>}
                                </div>
                                <div className="col-sm-2">
                                    <button type="submit" className="btn btn-sm btn-primary">{dataHeader.idHeader === '' ? 'Buat Nomor Surtug' : 'Edit Surat Tugas'}</button>
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
                                            <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="collapse show">
                                <div className="card-body pt-0">
                                    <button type="button" className="btn btn-xs btn-primary" data-bs-toggle="modal" data-bs-target="#modPetugas">Tambah Petugas</button>
                                    <button type="button" className="btn btn-xs btn-info float-end"><i className="menu-icon tf-icons bx bx-sync"></i> Refresh Data</button>
                                    <table className="table table-sm table-bordered table-hover table-striped mt-2">
                                        <thead>
                                            <tr>
                                                <th className='text-lightest'>No</th>
                                                <th className='text-lightest'>NIP</th>
                                                <th className='text-lightest'>NAMA</th>
                                                <th className='text-lightest'>JABATAN</th>
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
                                                    <td>
                                                        <div className="dropdown">
                                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                {/* <i className="fa-solid fa-ellipsis-vertical"></i> */}
                                                                <i className="fa-solid fa-trash me-1 text-danger"></i>
                                                            </button>
                                                            {/* <div className="dropdown-menu">
                                                                <button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modKontainer"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</button>
                                                                <button className="dropdown-item" href="#"> Delete</button>
                                                            </div> */}
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
                        <button type='button' onClick={() => navigate("/k37")} className='btn btn-info pb-1 float-end'>
                        {/* <button type='button' style={{display: (isNomor ? 'block' : 'none')}} onClick={() => navigate("/k37")} className='btn btn-info pb-1 float-end'> */}
                        <i className="bx bx-send bx-sm"></i>
                            Pemeriksaan Administrasi
                        </button>
                        {/* <button className='btn btn-info float-end'>Pemeriksaan Administrasi</button> */}
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
                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
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
                                                <div className="col-sm-4">
                                                    <input type="text" name='pilihPetugas' id='pilihPetugas' {...registerDetilSurtug("pilihPetugas", { required: "Mohon pilih petugas."})} className={errorsDetilSurtug.pilihPetugas ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
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
                                    <button type="button" className="btn btn-label-secondary me-sm-2 me-1" data-bs-dismiss="modal">
                                    Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">Simpan</button>
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