import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function DocK22() {
    let navigate = useNavigate();
    let [isNomor, setIsNomor] = useState(false)
    let [data, setData] = useState({
        noAju: "0100EX20240122095900K4O5R",
        noDokumen: "2024-T1-0100-K.1.1-000001",
        noAnalisa: "2024-T1-0100-K.2.1-000001",
        tglAnalisa: "2024-01-22",
        nomorSurtug: "",
        tglSurtug: "",
        });

    const handleBuatSurtug = () => {
        setIsNomor(true)
        setData(values => ({...values, 
            nomorSurtug: "2024-T1-0100-K.2.2-000001/1",
            tglSurtug: "2024-01-23",
        }));
    }
    
    let [petugas, setPetugas] = useState({})
    let [arrPetugas, setArrPetugas] = useState({})
    const handleTambahPetugas = (e, index) => {
            e.preventDefault();
            setArrPetugas([...arrPetugas, { 
                no: index+1,
                nip: "nip petugas " + (index+1),
                nama: "nama petugas " + (index+1),
                jabatan: "nip petugas " + (index+1),
                menu: "#",
             }]);
             setPetugas(values => ({...values,
                pilihPetugas: "",
                penugasan: "",
            }));
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
                                <input type="text" value={data.noAju} className='form-control form-control-sm' disabled/>
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="noAju">NOMOR DOKUMEN</label>
                            <div className="col-sm-3">
                                <input type="text" value={data.noDokumen} className='form-control form-control-sm' disabled/>
                            </div>
                            <label className="offset-sm-3 col-sm-1 col-form-label" htmlFor="noAju">NO ANALISA</label>
                            <div className="col-sm-3">
                                <input type="text" value={data.noAnalisa} className='form-control form-control-sm' disabled/>
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="noAju">TANGGAL ANALISA</label>
                            <div className="col-sm-3">
                                <input type="text" value={data.tglAnalisa} className='form-control form-control-sm' disabled/>
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
                <div div className="card-body pt-0">
                    <div className="row p-2">
                    <table className="table table-sm table-bordered table-hover table-striped mt-2">
                        <thead>
                            <tr>
                                <th className='text-lightest'>NOMOR</th>
                                <th className='text-lightest'>TANGGAL</th>
                                <th className='text-lightest'>PENANDATANGAN</th>
                                <th className='text-lightest'>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <div className="card card-action mb-4">
                <div div className="card-body pt-0">
                    <div className="col-md-12 mt-3">
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="nomor_k12">Nomor</label>
                            <div className="col-sm-3">
                                <input type="text" value={data.nomorSurtug} id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="nomor_k12">Tanggal</label>
                            <div className="col-sm-3">
                                <input type="date" value={data.tglSurtug} id="nomor_k12" className="form-control form-control-sm" placeholder="Tanggal" disabled />
                            </div>
                            <div className="col-sm-2">
                                {/* <button onClick={() => window.open({Pdf}, '_blank')} type='button' className='btn btn-info float-end'>
                                    <i className="bx bx-print bx-sm"></i>
                                    Print
                                </button> */}
                                <a href={require("../../dok/k22.pdf")} rel="noopener noreferrer" target='_blank' className='btn btn-info pb-1 float-end'>
                                    <i className="bx bx-printer bx-sm"></i>
                                    Print
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row mb-3">
                        <label className="col-sm-1 col-form-label" htmlFor="perihalSurtug">Perihal</label>
                        <div className="col-sm-2" style={{borderRight: '0.5px solid grey'}}>  
                            <input type="text" id="perihalSurtug" name='perihalSurtug' className="form-control form-control-sm" placeholder="Perihal" />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="ttdSurtug">Penandatangan</label>
                        <div className="col-sm-2" style={{borderRight: '0.5px solid grey'}}>  
                            <input type="text" id="ttdSurtug" name='ttdSurtug' className="form-control form-control-sm" placeholder="Penandatangan" />
                        </div>
                        <label className="col-sm-1 col-form-label" htmlFor="ttdSurtug">Tanggal</label>
                        <div className="col-sm-2" style={{borderRight: '0.5px solid grey'}}>  
                            <input type="date" id="tglSurtug" name='tglSurtug' className="form-control form-control-sm" placeholder="Tanggal Surat Tugas" />
                        </div>
                        <div className="col-sm-2">
                            <button type="button" onClick={handleBuatSurtug} className="btn btn-sm btn-success">Buat Nomor Surtug</button>
                            {/* <button type="button" className="btn btn-danger">Batal</button> */}
                        </div>
                        {/* <div className="row">
                        </div> */}
                    </div>
                    {/* muncul setelah disimpan headernya */}
                    <div className="card card-action mb-4" style={{display: (isNomor ? 'block' : 'none')}}>
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
                                        {/* {arrPetugas ? 
                                            (arrPetugas?.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{data.no}</td>
                                                    <td>{data.nip}</td>
                                                    <td>{data.nama}</td>
                                                    <td>{data.jabatan}</td>
                                                    <td>{data.menu}</td>
                                                </tr>
                                            ))) : null
                                        } */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* <div className="card card-action mb-4">
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
                                <div className="row g-3 mb-3">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <label className="col-sm-3 col-form-label text-sm-start" htmlFor="collapse-country-origin">A. Tindakan Karantina dan hal terkait lainnya, berupa</label>
                                                <div className="col-sm-3">
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk1">Pemeriksaan Administrasi & Kesesuaian</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk1" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk2">Pemeriksaan Kesehatan</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk2" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk3">Pengasingan & Pengamatan</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk3" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk4">Pemeriksaan Alat Angkut</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk4" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk5">Pengawasan Pihak Lain</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk5" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk6">Pengawalan MP</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk6" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk7">Perlakuan</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk7" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk8">Penahanan</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk8" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk9">Penerbitan Surat Keterangan</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk9" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk10">Pemusnahan</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk10" />
                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk11">Pembebasan Sebagian/Selurah</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk11" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk12">Serah Terima</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk12" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktk13">Lainnya...</label>
                                                        <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk13" />
                                                        <input name="othersPurpose" type="text" className='form-control form-control-sm' placeholder="Lainnya" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="row g-3 mb-3">
                                    <div className="col-md-12">
                                        <div className="row">
                                                <label className="col-sm-3 col-form-label text-sm-start" htmlFor="collapse-country-origin">B. Penegakan Hukum dan hal terkait lainnya, berupa</label>
                                                <div className="col-sm-3">
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checkgakum1">Wasmalitirik</label>
                                                        <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum1" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checkgakum2">Gelar Perkara</label>
                                                        <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum2" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checkgakum3">Penyidikan</label>
                                                        <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum3" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checkgakum4">Melengkapi Pemberkasan</label>
                                                        <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum4" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checkgakum5">Lainnya...</label>
                                                        <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum5" />
                                                        <input name="othersPurpose" type="text" className='form-control form-control-sm' placeholder="Lainnya" />
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <button type='button' style={{display: (isNomor ? 'block' : 'none')}} onClick={() => navigate("/k37")} className='btn btn-info pb-1 float-end'>
                    <i className="bx bx-send bx-sm"></i>
                        Pemeriksaan Administrasi
                    </button>
                    {/* <button className='btn btn-info float-end'>Pemeriksaan Administrasi</button> */}
                </div>
            </div>
        </div>
        <div className="modal fade" id="modPetugas" data-bs-backdrop="static" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <form className="modal-content">
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
                            <div className="row g-3 mb-3">
                                    <div className="col-md-12">
                                        <div className='row'>
                                            <label className="col-sm-3 col-form-label text-sm-start" htmlFor="pilihPetugas">Petugas</label>
                                            <div className="col-sm-4">
                                                <input type="text" value={petugas.pilihPetugas} onChange={(e) => setPetugas(values => ({...values, pilihPetugas: e.target.value}))} className='form-control form-control-sm' />
                                            </div>
                                        </div>
                                        <label className="col-sm-9 col-form-label text-sm-start" htmlFor="collapse-country-origin">A. Tindakan Karantina dan hal terkait lainnya, berupa</label>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk1">Pemeriksaan Administrasi & Kesesuaian</label>
                                                    <input name="default-radio-checktk" value={1} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox" id="checktk1" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk2">Pemeriksaan Kesehatan</label>
                                                    <input name="default-radio-checktk" value={2} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox" id="checktk2" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk3">Pengasingan & Pengamatan</label>
                                                    <input name="default-radio-checktk" value={3} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox" id="checktk3" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk4">Pemeriksaan Alat Angkut</label>
                                                    <input name="default-radio-checktk" value={4} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox" id="checktk4" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk5">Pengawasan Pihak Lain</label>
                                                    <input name="default-radio-checktk" value={5} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox" id="checktk5" />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk6">Pengawalan MP</label>
                                                    <input name="default-radio-checktk" value={6} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox" id="checktk6" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk7">Perlakuan</label>
                                                    <input name="default-radio-checktk" value={7} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox" id="checktk7" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk8">Penahanan</label>
                                                    <input name="default-radio-checktk" value={8} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox" id="checktk8" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk9">Penerbitan Surat Keterangan</label>
                                                    <input name="default-radio-checktk" value={9} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox" id="checktk9" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk10">Pemusnahan</label>
                                                    <input name="default-radio-checktk" value={10} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox" id="checktk10" />
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk11">Pembebasan Sebagian/Selurah</label>
                                                    <input name="default-radio-checktk" value={11} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox" id="checktk11" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk12">Serah Terima</label>
                                                    <input name="default-radio-checktk" value={12} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox"id="checktk12" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk13">Lainnya...</label>
                                                    <input name="default-radio-checktk" value={13} onChange={(e) => setPetugas(values => ({...values, penugasan: e.target.value}))} className="form-check-input" type="checkbox" id="checktk13" />
                                                    <input name="othersPurpose" type="text" className='form-control form-control-sm' placeholder="Lainnya" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            {/* <div className="row g-3 mb-3">
                                <div className="col-md-12">
                                    <div className="row">
                                        <label className="col-sm-3 col-form-label text-sm-start" htmlFor="collapse-country-origin">B. Penegakan Hukum dan hal terkait lainnya, berupa</label>
                                        <div className="col-sm-3">
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="checkgakum1">Wasmalitirik</label>
                                                <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum1" />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="checkgakum2">Gelar Perkara</label>
                                                <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum2" />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="checkgakum3">Penyidikan</label>
                                                <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum3" />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="checkgakum4">Melengkapi Pemberkasan</label>
                                                <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum4" />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="checkgakum5">Lainnya...</label>
                                                <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum5" />
                                                <input name="othersPurpose" type="text" className='form-control form-control-sm' placeholder="Lainnya" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
    </div>
</div>
  )
}

export default DocK22