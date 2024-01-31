import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import {decode as base64_decode} from 'base-64';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PtkPemeriksaan from '../../model/PtkPemeriksaan';
import PtkModel from '../../model/PtkModel';
import Select from 'react-select';
import Master from '../../model/Master';

function DocK37b() {
    let navigate = useNavigate();
    let refOPTK = useRef({
        master: null,
        temuan: null
    });
    const {
		register,
        setValue,
        watch,
		handleSubmit,
        formState: { errors },
	} = useForm()
    const dataWatch = watch()

    let [dataSelect, setDataSelect] = useState({})
    let [listKesehatan, setListKesehatan] = useState([])
    let [listWasdal, setListWasdal] = useState([])

    const onSubmit = (data) => {
        console.log(data)
    }
    
    function submitModKesehatan(e) {
        e.preventDefault();
        const datakom = data.mpPeriksa.split(";")
        setListKesehatan([...listKesehatan, { 
            idkom: datakom[0],
            namaMP: datakom[1],
            jumlahMP: datakom[2],
            target: data.targetPeriksa,
            metode: data.metodePeriksa,
            temuan: data.temuanPeriksa,
            catatan: data.catatanPeriksa,
         }]);
         setData(values => ({...values, 
            mpPeriksa: "",
            targetPeriksa: "",
            metodePeriksa: "",
            temuanPeriksa: "",
            catatanPeriksa: "",
            valueTargetPeriksa: []
        }));
        // refOPTK.master.clearValue()
        // console.log(data)
    }
    
    function submitModWasdal() {

    }

    const idPtk = Cookies.get("idPtkPage");
    let [data,setData] = useState({})
    useEffect(() => {
        if(idPtk) {
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            setData(values => ({...values,
                noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                idPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                noDokumen: idPtk ? base64_decode(ptkNomor[2]): "",
            }));

            const modelPeriksa = new PtkPemeriksaan();
            const response = modelPeriksa.getAdminByPtkId(base64_decode(ptkNomor[1]))
            response
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(response.data.status === '200') {
                        setData(values => ({...values,
                            noAdmin: response.data.data.nomor,
                            tglAdmin: response.data.data.tanggal,
                        }));
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });

            const modelPemohon = new PtkModel();
            const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), Cookies.get("jenisKarantina"));
            resKom
            .then((res) => {
                if(res.data.status === '200') {
                    console.log(res.data.data)
                    // setKomoditiPtk(res.data.data)
                    const arraySelectKomoditi = res.data.data.map(item => {
                        return {
                            value: item.id + ";" + item.nama_umum_tercetak + ";" + item.volume_lain + " " + item.sat_lain,
                            label: item.nama_umum_tercetak + " - " + item.nama_latin_tercetak
                        }
                    })
                    setDataSelect(values => ({...values, komoditas: arraySelectKomoditi }));
                }
            })
            .catch((error) => {
                console.log(error.response.data);
            });
            
            const modelOPTK = new Master();
            const resOPTK = modelOPTK.masterOPTK();
            resOPTK
            .then((res) => {
                if(res.data.status === '200') {
                    console.log(res.data.data)
                    // setKomoditiPtk(res.data.data)
                    const arraySelectOPTK = res.data.data.map(item => {
                        return {
                            value: item.nama_umum,
                            label: item.nama_umum + " (" + item.nama_latin + ") - " + item.jenis + " (" + item.golongan + ")"
                        }
                    })
                    setDataSelect(values => ({...values, masterOPTK: arraySelectOPTK }));
                }
            })
            .catch((error) => {
                console.log(error.response.data);
            });
        }
    }, [idPtk])
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-3.7b <span className="fw-light" style={{color: 'blue'}}>LAPORAN HASIL PEMERIKSAAN KESEHATAN</span>
            <div className="offset-sm-6 col-sm-6">
                <a href='https://esps.karantina.pertanian.go.id/elab' rel="noreferrer" target='_blank' className='btn btn-info float-end'><i className="menu-icon tf-icons bx bx-send"></i>elab Barantin</a>
            </div>
        </h4>

    <div className="row">
        <div className="col-xxl">
            <div className="card card-action mb-4">
                <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                    <div className="card-action-title">
                        <div className='row'>
                            <label className="col-sm-1 col-form-label text-sm-end" htmlFor="noDok"><b>No PTK</b></label>
                            <div className="col-sm-3">
                                <input type="text" id="noDok" value={data.noDokumen} className="form-control form-control-sm" placeholder="Nomor Dokumen K.3.7" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noSurtug"><b>NO P. Administratif</b></label>
                            <div className="col-sm-3">
                                <input type="text" id='noSurtug' value={data.noAdmin} className='form-control form-control-sm' disabled/>
                            </div>
                            <label className="col-sm-1 col-form-label" htmlFor="tglSurtug"><b>TANGGAL</b></label>
                            <div className="col-sm-2">
                                <input type="text" id='tglSurtug' value={data.tglAdmin} className='form-control form-control-sm' disabled/>
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
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-center" htmlFor="noDok37b">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok37b" className="form-control form-control-sm" placeholder="Nomor Dokumen K-3.7b" disabled />
                                </div>
                                <label className="col-sm-2 col-form-label text-sm-center" htmlFor="tglDok37b">Tanggal</label>
                                <div className="col-sm-2">
                                    <input type="date" id="tglDok37b" className="form-control form-control-sm" placeholder="Tanggal Dokumen K-3.7b" />
                                </div>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col">
                                <div className="accordion" id="collapseSection">
                                    <div className="card">
                                        <h2 className="accordion-header" id="headerExporter">
                                            <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseExporter" aria-expanded="true" aria-controls="collapseExporter">
                                                <h5 className='text-lightest mb-0'>Hasil Pemeriksaan</h5>
                                            </button>
                                        </h2>
                                        <div id="collapseExporter">
                                            <div className="accordion-body">
                                                <h5>
                                                    <u><b>
                                                        A. Pemeriksaan Fisik/Kesehatan, Pemeriksaan HPHK/HPIK/OPTK
                                                    </b></u>
                                                    <button className='btn btn-xs btn-info' data-bs-toggle="modal" data-bs-target="#modKesehatan" style={{marginLeft: "15px"}}>Tambah Data</button>
                                                    <div className="form-check form-switch float-end">
                                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                                        <label className="form-check-label mt-1" htmlFor="flexSwitchCheckDefault">
                                                            Kirim ke eLab
                                                        </label>
                                                    </div>
                                                </h5>
                                                <div className="text-nowrap mb-5">
                                                    <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Nama MP</th>
                                                                <th>Jumlah MP</th>
                                                                <th>Target/Sasaran</th>
                                                                <th>Metode</th>
                                                                <th>Temuan</th>
                                                                <th>Catatan</th>
                                                                <th>Act</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listKesehatan ? (listKesehatan.map((data, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{data.namaMP}</td>
                                                                        <td>{data.jumlahMP}</td>
                                                                        <td>{data.target}</td>
                                                                        <td>{data.metode}</td>
                                                                        <td>{data.temuan}</td>
                                                                        <td>{data.catatan}</td>
                                                                        <td>
                                                                            <button className="btn btn-xs btn-danger">hapus</button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : null }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <h5 title='Pengawasan dan Pengendalian Pangan/Pakan/SDG/PRG/Agensia Hayati/JAI/Tumbuhan dan Satwa Liar/Tumbuhan dan Satwa Langka'><u><b>B. Pengawasan dan Pengendalian</b></u> <button className='btn btn-xs btn-info'  data-bs-toggle="modal" data-bs-target="#modWasdal" style={{marginLeft: "15px"}}>Tambah Data</button></h5>
                                                <div className="text-nowrap mb-4">
                                                    <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Nama MP</th>
                                                                <th>Jumlah MP</th>
                                                                <th>Target/Sasaran</th>
                                                                <th>Metode</th>
                                                                <th>Temuan</th>
                                                                <th>Catatan</th>
                                                                <th>Act</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listWasdal ? (listWasdal.map((data, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{data.namaMP}</td>
                                                                        <td>{data.jumlahMP}</td>
                                                                        <td>{data.target}</td>
                                                                        <td>{data.metode}</td>
                                                                        <td>{data.temuan}</td>
                                                                        <td>{data.catatan}</td>
                                                                        <td>
                                                                            <button className="btn btn-xs btn-danger">hapus</button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : null }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className='col-sm-2 form-control-label'><b>Penandatangan</b></div>
                                                    <div className="col-sm-4">
                                                        <input type="text" className='form-control form-control-sm'/>
                                                    </div>
                                                </div>
                                                <button type="button" className="btn btn-sm btn-primary me-sm-2 me-1">Simpan Hasil Pemeriksaan</button>
                                                <button type="button" className="btn btn-sm btn-danger me-sm-2 me-1">Hapus</button>
                                                {/* <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Media Pembawa</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Nama Media Pembawa" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jenis Media Pembawa</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Jenis Media Pembawa" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Target/Sasaran</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Target/Sasaran" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Metode</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Metode" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Temuan</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Temuan" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Catatan</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Kesimpulan</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="card accordion-item">
                                        <h2 className="accordion-header" id="headerExporter">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExporter" aria-expanded="true" aria-controls="collapseExporter">
                                                Pemeriksaan untuk Pengawasan dan Pengendalian
                                            </button>
                                        </h2>
                                        <div id="collapseExporter">
                                            <div className="accordion-body">
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Dokumen</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Pemenuhan</label>
                                                            <div className="col-sm-4">
                                                                <select className="form-select">
                                                                    <option>Terpenuhi</option>
                                                                    <option>Tidak Terpenuhi</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Pengujian Produk</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Pengujian Produk" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Hasil</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Hasil" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Metode</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Metode" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Kesimpulan</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-sm-2 form-control-label'><b>Rekomendasi</b></div>
                            <div className="col-sm-3 mb-3">
                                <select className='form-select form-select-sm'>
                                    <option value="">--</option>
                                    <option value={16}>Diberi Perlakuan</option>
                                    <option value={17}>Ditolak</option>
                                    <option value={18}>Dimusnahkan</option>
                                    <option value={19}>Dibebaskan</option>
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className='col-sm-2 form-control-label'><b>Penandatangan</b></div>
                            <div className="col-sm-4">
                                <input type="text" className='form-control form-control-sm'/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                <button type="button" className="btn btn-danger me-sm-2 me-1">Batal</button>
                                <a href={require("../../dok/k37a.pdf")} rel="noopener noreferrer" target='_blank' className="btn btn-warning"><i className="bx bx-printer bx-xs"></i>&nbsp; Print</a>
                                <button type="button" onClick={() => navigate('/kt1')} className="btn btn-info float-end"><i className="menu-icon tf-icons bx bx-send"></i>Pelepasan</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div className="modal fade" id="modKesehatan" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered1 modal-simple">
            <div className="modal-content p-1">
                <div className="modal-body">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div className="text-center mb-4">
                        <h4>Tambah Data Pemeriksaan Fisik/Kesehatan</h4>
                    </div>
                    <form onSubmit={submitModKesehatan}>
                        <div className="mb-2">
                          <label className="form-label" htmlFor="mpPeriksa">Media Pembawa</label>
                          <Select value={{id: data.mpPeriksa, label: data.mpPeriksaView }} options={dataSelect.komoditas} onChange={(e) => setData(values => ({...values, mpPeriksa: e.value})) & setData(values => ({...values, mpPeriksaView: e.label}))} />
                        </div>   
                        <div className="mb-2">
                          <label className="form-label" htmlFor="targetPeriksa">Target / Sasaran</label>
                          <Select defaultValue={data.valueTargetPeriksa} value={data.valueTargetPeriksa} options={dataSelect.masterOPTK} onChange={(e) => setData(values => ({...values, targetPeriksa: Array.isArray(e) ? (e.map(x => x.value).join(";")) : [], valueTargetPeriksa: e})) } isMulti />
                        </div>   
                        {data.targetPeriksa}
                        <div className="mb-2">
                          <label className="form-label" htmlFor="metodePeriksa">Target / Sasaran</label>
                          <input type="text" className="form-control form-control-sm" id="metodePeriksa" name='metodePeriksa' onChange={(e) => setData(values => ({...values, metodePeriksa: e.target.value}))} placeholder="Metode Periksa" />
                        </div>   
                        <div className="mb-2">
                          <label className="form-label" htmlFor="temuanPeriksa">Temuan</label>
                          <input type="text" className="form-control form-control-sm" id="temuanPeriksa" name='temuanPeriksa' onChange={(e) => setData(values => ({...values, temuanPeriksa: e.target.value}))} placeholder="Temuan.." />
                        </div>   
                        <div className="mb-3">
                          <label className="form-label" htmlFor="catatanPeriksa">Catatan</label>
                          <textarea className="form-control form-control-sm" name="catatanPeriksa" id="catatanPeriksa" onChange={(e) => setData(values => ({...values, catatanPeriksa: e.target.value}))} rows="2"></textarea>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12 text-center'>
                                <button type="submit" className="btn btn-sm btn-primary me-sm-2 me-1">Simpan</button>
                                <button type="button" className="btn btn-sm btn-danger me-sm-2 me-1">Batal</button>
                            </div>   
                        </div>   
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div className="modal fade" id="modWasdal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered1 modal-simple">
            <div className="modal-content p-1">
                <div className="modal-body">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div className="text-center mb-4">
                        <h4>Tambah Data Pengawasan dan Pengendalian</h4>
                    </div>
                    <form onSubmit={submitModWasdal}>
                        <div className="mb-2">
                          <label className="form-label" htmlFor="mpWasdal">Media Pembawa</label>
                          <input type="text" className="form-control form-control-sm" id="mpWasdal" placeholder="Media Pembawa" />
                        </div>   
                        <div className="mb-2">
                          <label className="form-label" htmlFor="targetWasdal">Target / Sasaran</label>
                          <input type="text" className="form-control form-control-sm" id="targetWasdal" placeholder="Media Pembawa" />
                        </div>   
                        <div className="mb-2">
                          <label className="form-label" htmlFor="metodeWasdal">Target / Sasaran</label>
                          <input type="text" className="form-control form-control-sm" id="metodeWasdal" placeholder="Media Pembawa" />
                        </div>   
                        <div className="mb-2">
                          <label className="form-label" htmlFor="temuanWasdal">Temuan</label>
                          <input type="text" className="form-control form-control-sm" id="temuanWasdal" placeholder="Media Pembawa" />
                        </div>   
                        <div className="mb-3">
                          <label className="form-label" htmlFor="temuanWasdal">Catatan</label>
                          <input type="text" className="form-control form-control-sm" id="temuanWasdal" placeholder="Media Pembawa" />
                        </div>
                        <div className='row'>
                            <div className='col-sm-12 text-center'>
                                <button type="submit" className="btn btn-sm btn-primary me-sm-2 me-1">Simpan</button>
                                <button type="button" className="btn btn-sm btn-danger me-sm-2 me-1">Batal</button>
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

export default DocK37b