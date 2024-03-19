import Cookies from 'js-cookie';
import {decode as base64_decode} from 'base-64';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import PtkModel from '../../model/PtkModel';
import PtkPemeriksaan from '../../model/PtkPemeriksaan';

const modelPemohon = new PtkModel()
const modelPeriksa = new PtkPemeriksaan()

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function randSamplingKT(jmlKont,jnsMP,rskLevel){
	jmlKont = parseInt(jmlKont)
    var jmlSampling
	if (jnsMP == "PSAT") {
		if (jmlKont > 0)  jmlSampling = jmlKont
		if (jmlKont > 5) jmlSampling = 5
		if (jmlKont > 10) jmlSampling = 5
		if (jmlKont > 26) jmlSampling = 7
		if (jmlKont > 50) jmlSampling = 10
		if (jmlKont > 100) jmlSampling = ceil(sqrt(jmlKont))
		
	} else if (jnsMP == "media pembawa") {
		if (rskLevel == "Rendah") {
			if (jmlKont > 0) jmlSampling = jmlKont
			if (jmlKont > 1) jmlSampling = 2
			if (jmlKont > 10) jmlSampling = 3
			if (jmlKont > 15) jmlSampling = 4
			if (jmlKont > 20) jmlSampling = 5
			if (jmlKont > 25) jmlSampling = 6
			
		} else if (rskLevel == "Sedang") {
			if (jmlKont > 0) jmlSampling = jmlKont
			if (jmlKont > 1) jmlSampling = 2
			if (jmlKont > 10) jmlSampling = 3
			if (jmlKont > 15) jmlSampling = 4
			if (jmlKont > 20) jmlSampling = 5
			if (jmlKont > 25) jmlSampling = 6
			
		} else if (rskLevel == "Tinggi") {
			if (jmlKont > 0) jmlSampling = jmlKont
			if (jmlKont > 6) jmlSampling = 5
			if (jmlKont > 15) jmlSampling = 6
			if (jmlKont > 18) jmlSampling = 7
			if (jmlKont > 21) jmlSampling = 8
			if (jmlKont > 24) jmlSampling = 9
			if (jmlKont > 27) jmlSampling = 10
			if (jmlKont > 30) jmlSampling = 11
			if (jmlKont > 50) jmlSampling = ceil(jmlKont / 5)
		}
	}
	
	return jmlSampling;
}

function randSamplingKH(jmlKont,rskLevel){
    var jmlSampling
	if (rskLevel=="Rendah") {
		if (jmlKont > 0) jmlSampling = jmlKont
		if (jmlKont > 1) jmlSampling = 2
		if (jmlKont > 9) jmlSampling = 3
		if (jmlKont > 19) jmlSampling = 5
		if (jmlKont > 29) jmlSampling = 8
		if (jmlKont > 49) jmlSampling = 13
		
	} else if (rskLevel=="Sedang") {
		if (jmlKont > 0) jmlSampling = jmlKont
		if (jmlKont > 1) jmlSampling = 2
		if (jmlKont > 5) jmlSampling = 3
		if (jmlKont > 9) jmlSampling = 4
		if (jmlKont > 19) jmlSampling = 8
		if (jmlKont > 29) jmlSampling = 11
		if (jmlKont > 49) jmlSampling = 19
	} else {
		jmlSampling = jmlKont;	//untuk resiko tinggi tidak ada diaturan permentan
	}
	return jmlSampling;
}

function DocK310() {
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
        watch,
        formState: { errors },
    } = useForm({
        noDok310: ""
    });

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
                    console.log(response)
                }
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorPTK: "",
                            listPtk: response.data.data.ptk,
                            listKomoditas: response.data.data.ptk_komoditi,
                            listKontainer: response.data.data.ptk_kontainer,
                            listDokumen: response.data.data.ptk_dokumen
                        }));
                        setValue("idPtk", base64_decode(ptkNomor[1]))
                        setValue("noDokumen", base64_decode(ptkNomor[2]))
                        setValue("tglDatang", response.data.data.ptk?.tanggal_rencana_tiba_terakhir)
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

    function refreshData() {

    }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
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
                                    <input type="text" id="noDok" value={data.noDokumen || ""} className="form-control form-control-sm" placeholder="Nomor Dokumen K.3.7" disabled />
                                </div>
                                <label className="col-sm-1 col-form-label" htmlFor="tglDokumen"><b>TANGGAL</b></label>
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
                                                <h6 className='mb-1'><b>List Kontainer : {data.listKontainer?.length + " kontainer"}</b></h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-center" htmlFor="nomor_k12">Nomor SP2MP</label>
                                <div className="col-sm-3">
                                    <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor" disabled />
                                </div>
                                <label className="col-sm-2 col-form-label text-sm-center" htmlFor="nomor_k12">UPT</label>
                                <div className="col-sm-3">
                                    <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="UPT" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col">
                            <div className="accordion" id="collapseSection">
                                <div className="card accordion-item">
                                    <h2 className="accordion-header" id="headerCountry">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCountry" aria-expanded="true" aria-controls="collapseCountry">
                                            Identitas
                                        </button>
                                    </h2>
                                    <div id="collapseCountry">
                                        <div className="accordion-body">
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Nama" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nomor PPK</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Nomor PPK" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tanggal PPK</label>
                                                        <div className="col-sm-9">
                                                            <input type="date" id="collapse-name" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card accordion-item">
                                    <h2 className="accordion-header" id="headerExporter">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExporter" aria-expanded="true" aria-controls="collapseExporter">
                                            Detail
                                        </button>
                                    </h2>
                                    <div id="collapseExporter">
                                        <div className="accordion-body">
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tempat Penimbunan</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Tempat Penimbunan" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jumlah kemasan</label>
                                                        <div className="col-sm-3">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Jumlah Petikemas/kontainer/kemasan" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <button type="button" className="btn btn-xs btn-primary">Add Kontainer</button>
                                                </div>
                                                <table className="table table-bordered table-hover table-striped dataTable">
                                                    <thead>
                                                        <tr>
                                                            <th>NO</th>
                                                            <th>Nomor Kontainer</th>
                                                            <th>Kode Kontainer</th>
                                                            <th>Nomor Segel</th>
                                                            <th>Keterangan</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th>1</th>
                                                            <th>-</th>
                                                            <th>-</th>
                                                            <th>-</th>
                                                            <th>-</th>
                                                        </tr>
                                                        <tr>
                                                            <th>2</th>
                                                            <th>-</th>
                                                            <th>-</th>
                                                            <th>-</th>
                                                            <th>-</th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Alat Angkut/Voyage</label>
                                                        <div className="col-sm-6">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Nama Alat Angkut" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                        
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nomor AWB/BL</label>
                                                        <div className="col-sm-6">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Nama Alat Angkut" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                        
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Agen Pelayaran/Maskapai</label>
                                                        <div className="col-sm-6">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Nama Alat Angkut" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                        
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tanggal Tiba</label>
                                                        <div className="col-sm-6">
                                                            <input type="date" id="collapse-name" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                        
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Lokasi Bongkar</label>
                                                        <div className="col-sm-6">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Lokasi Bongkar" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                        
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Pemilik</label>
                                                        <div className="col-sm-6">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Pemilik" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-primary">Simpan</button>
                            <button type="button" className="btn btn-danger">Batal</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DocK310