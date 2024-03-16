/* eslint-disable eqeqeq */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import {decode as base64_decode} from 'base-64';
import PtkModel from '../../model/PtkModel';
import { useForm } from 'react-hook-form';
import PtkPemeriksaan from '../../model/PtkPemeriksaan';
import Swal from 'sweetalert2';
import LoadBtn from '../../component/loading/LoadBtn';

const modelPemohon = new PtkModel()
const modelPeriksa = new PtkPemeriksaan()

function DocK31() {
    const idPtk = Cookies.get("idPtkPage");
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
    } = useForm({
        noDok31: ""
    });

    const cekWatch = watch()

    const onSubmit = (data) => {
        setOnLoad(true)
        const response = modelPeriksa.pnBongkar31(data);
        response
        .then((response) => {
            if(response.data) {
                setOnLoad(false)
                if(response.data.status == 201) {
                    Swal.fire({
                        title: "Sukses!",
                        text: "Surat Persetujuan/Penolakan Bongkar berhasil " + (data.idDok31 ? "diedit." : "disimpan."),
                        icon: "success"
                    });
                    // setValueDetilSurtug("idHeader", response.data.data.id)
                    setValue("idDok31", response.data.data.id)
                    setValue("noDok31", response.data.data.nomor)
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: response.data.status + " - " + response.data.message,
                        icon: "error"
                    });
                }
            }
        })
        .catch((error) => {
            setOnLoad(false)
            if(import.meta.env.VITE_BE_ENV == "DEV") {
                console.log(error)
            }
            // alert(error.response.status + " - " + error.response.data.message)
            Swal.fire({
                title: "Error!",
                text: error.response.status + " - " + error.response.data.message,
                icon: "error"
            });
        });
    }

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok31", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
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
                            listKomoditas: response.data.data.ptk_komoditi,
                            listDokumen: response.data.data.ptk_dokumen
                        }));
                        setValue("idPtk", base64_decode(ptkNomor[1]))
                        setValue("noDokumen", base64_decode(ptkNomor[2]))
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
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorPTK: "Gagal load data PTK",
                }))
            });
            
            const response31 = modelPeriksa.getPnBongkar(base64_decode(ptkNomor[1]));
            response31
            .then((response) => {
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorBongkar: "",
                        }))
                        setValue("idPtk", response.data.data.id)
                        setValue("noDok31", response.data.data.nomor)
                        setValue("tglDok31", response.data.data.tanggal)
                        setValue("putusanBongkar", response.data.data.setuju_bongkar_muat)
                        setValue("ttdPutusan", response.data.data.user_ttd_id?.toString())
                    } else {
                        setData(values => ({...values,
                            errorBongkar: "Gagal load data Surat Bongkar MP",
                        }))
                    }
                } else {
                    setData(values => ({...values,
                        errorBongkar: "Gagal load data Surat Bongkar MP",
                    }))
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.data.status == 404) {
                    setData(values => ({...values,
                        errorBongkar: ""
                    }));
                } else {
                    setData(values => ({...values,
                        errorBongkar: "Gagal load data Surat Bongkar MP"
                    }));
                }
            });
        }
    },[idPtk, setValue])

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
                            listKomoditas: response.data.data.ptk_komoditi,
                            listDokumen: response.data.data.ptk_dokumen
                        }));
                        setValue("idPtk", data.noIdPtk)
                        setValue("noDokumen", data.noDokumen)
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
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorPTK: "Gagal load data PTK",
                }))
            });
        }
        
        if(data.errorBongkar) {
            const response31 = modelPeriksa.getPnBongkar(data.noIdPtk);
            response31
            .then((response) => {
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorBongkar: "",
                        }))
                        setValue("idPtk", response.data.data.id)
                        setValue("noDok31", response.data.data.nomor)
                        setValue("tglDok31", response.data.data.tanggal)
                        setValue("putusanBongkar", response.data.data.setuju_bongkar_muat)
                        setValue("ttdPutusan", response.data.data.user_ttd_id?.toString())
                    } else {
                        setData(values => ({...values,
                            errorBongkar: "Gagal load data Surat Bongkar MP",
                        }))
                    }
                } else {
                    setData(values => ({...values,
                        errorBongkar: "Gagal load data Surat Bongkar MP",
                    }))
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.data.status == 404) {
                    setData(values => ({...values,
                        errorBongkar: ""
                    }));
                } else {
                    setData(values => ({...values,
                        errorBongkar: "Gagal load data Surat Bongkar MP"
                    }));
                }
            });
        }
    }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-3.1 <span className="fw-light" style={{color: 'blue'}}>SURAT PERSETUJUAN/PENOLAKAN BONGKAR MEDIA PEMBAWA DARI ALAT ANGKUT</span>
            
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
                                        <h2 className="accordion-header" id="headerExporter">
                                            <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseExporter" aria-expanded="true" aria-controls="collapseExporter">
                                                <h5 className='text-lightest mb-0'>Media Pembawa</h5>
                                            </button>
                                        </h2>
                                        <div id="collapseExporter">
                                            <div className="accordion-body">
                                                <div className="row g-3 mb-3">
                                                    <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
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
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.listKomoditas ? (data.listKomoditas?.map((data, index) => (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{data.klasifikasi}</td>
                                                                            <td>{data.nama_umum_tercetak}</td>
                                                                            <td>{data.nama_latin_tercetak}</td>
                                                                            <td>{data.volume_netto}</td>
                                                                            <td>{data.sat_netto}</td>
                                                                            <td>{data.volume_bruto}</td>
                                                                            <td>{data.sat_bruto}</td>
                                                                            <td>{data.volume_lain}</td>
                                                                            <td>{data.sat_lain}</td>
                                                                            <td>{data.jantan}</td>
                                                                            <td>{data.betina}</td>
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
                                        <h2 className="accordion-header" id="headerImporter">
                                            <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                            <h5 className='text-lightest mb-0'>Rincian Keterangan</h5>
                                            </button>
                                        </h2>
                                        <div id="collapseImporter">
                                            <div className="accordion-body">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                    <h5 className='mb-1'><b><u>Identitas Pengirim</u></b></h5>
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="namaPengirim">Nama</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="namaPengirim" value={data.listPtk?.nama_pengirim || ""} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                    <h5 className='mb-1'><b><u>Identitas Penerima</u></b></h5>
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="namaPenerima">Nama</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="namaPenerima" value={data.listPtk?.nama_penerima || ""} disabled className="form-control form-control-sm" placeholder="Nama Penerima" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-1">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="alamatPengirim">Alamat</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="alamatPengirim" className="form-control form-control-sm" disabled value={data.listPtk?.alamat_pengirim || ""} id="alamatPengirim" rows="2" placeholder=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="alamatPenerima">Alamat</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="alamatPenerima" className="form-control form-control-sm" disabled value={data.listPtk?.alamat_penerima || ""} id="alamatPenerima" rows="2" placeholder=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="identitasPengirim">Identitas</label>
                                                            <div className="col-sm-9">
                                                                <input name="identitastPengirim" className="form-control form-control-sm" disabled value={(data.listPtk?.jenis_identitas_pengirim + " - " + data.listPtk?.nomor_identitas_pengirim) || ""} id="identitasPengirim" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="identitasPenerima">Identitas</label>
                                                            <div className="col-sm-9">
                                                                <input name="identitasPenerima" className="form-control form-control-sm" disabled value={(data.listPtk?.jenis_identitas_penerima + " - " + data.listPtk?.nomor_identitas_penerima) || ""} id="identitasPenerima" placeholder="" />
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
                                                            <label className="col-sm-3 col-form-label" htmlFor="jmlKemasan">Jml Kemasan / Kontainer</label>
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
                                                                <input type="date" id="tglDatang" value={data.listPtk?.tanggal_rencana_tiba_terakhir || ""} disabled className="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                    <thead>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Jenis Dokumen</th>
                                                            <th>Nomor</th>
                                                            <th>Lampiran</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.listDokumen ? (data.listDokumen?.map((data, index) => (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{data.nama_dokumen}</td>
                                                                        <td>{data.no_dokumen}</td>
                                                                        <td><a href={import.meta.env.VITE_BE_LINK + data.efile} target='_blank' rel='noreferrer'>{data.efile}</a></td>
                                                                    </tr>
                                                                ))
                                                            ) : null
                                                        }
                                                    </tbody>
                                                </table>
                                                <hr />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <h2 className="accordion-header" id="headerImporter">
                                            <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                            <h5 className='text-lightest mb-0'>Keputusan</h5>
                                            </button>
                                        </h2>
                                        <div id="collapseImporter">
                                            <div className="accordion-body">
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <input type="hidden" name='idPtk' {...register("idPtk")} />
                                                    <input type="hidden" name='noDokumen' {...register("noDokumen")} />
                                                    <input type="hidden" name='idDok31' {...register("idDok31")} />
                                                    <div className="col-md-12 mt-3">
                                                        <div className="row mb-3">
                                                            <label className="col-sm-2 col-form-label text-sm-center" htmlFor="noDok31">Nomor Dokumen</label>
                                                            <div className="col-sm-3">
                                                                <input type="text" id="noDok31" name='noDok31' {...register("noDok31")} className="form-control form-control-sm" placeholder="Nomor Dok K-3.1" disabled />
                                                            </div>
                                                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="tglDok31">Tanggal</label>
                                                            <div className="col-sm-2">
                                                                <input type="datetime-local" id="tglDok31" name='tglDok31' {...register("tglDok31", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok31 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.tglDok31 && <small className="text-danger">{errors.tglDok31.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="putusanBongkar">Keputusan Bongkar</label>
                                                                <div className="col-sm-8 mb-3">
                                                                    <div className="col-sm-9">
                                                                        <div className="form-check">
                                                                            <label className="form-check-label" htmlFor="opsi1">Setuju</label>
                                                                            <input name="putusanBongkar" className={errors.putusanBongkar ? "form-check-input is-invalid" : "form-check-input"} value="Y" {...register("putusanBongkar", { required: "Mohon pilih putusan yang sesuai."})} type="radio" id="opsi1" />
                                                                        </div>
                                                                        <div className="form-check">
                                                                            <label className="form-check-label" htmlFor="opsi2">Tidak Setuju</label>
                                                                            <input name="putusanBongkar" className={errors.putusanBongkar ? "form-check-input is-invalid" : "form-check-input"} value="T" {...register("putusanBongkar")} type="radio" id="opsi2" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-sm-4 col-form-label'>Penandatangan</div>
                                                                <div className="col-sm-6 mb-3">
                                                                    <select className={errors.ttdPutusan == '' ? 'form-select form-select-sm is-invalid' : 'form-select form-select-sm'} name="ttdPutusan" id="ttdPutusan" {...register("ttdPutusan", { required: "Mohon pilih penandatangan."})}>
                                                                        {data.petugas?.map((item, index) => (
                                                                            <option value={item.penanda_tangan_id} key={index} defaultValue={cekWatch.ttdPutusan}>{item.nama + " - " + item.nip}</option>
                                                                        ))}
                                                                    </select>
                                                                    {/* <input type="text" {...register("ttdPutusan", { required: "Mohon pilih nama penandatangan."})} className={errors.ttdPutusan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} /> */}
                                                                    {/* <input type="text" className={errorsAdministratif.ttdAdminidtratif == '' ? 'form-control is-invalid' : 'form-control'} {...registerAdministratif("ttdAdminidtratif", { required: "Mohon pilih nama penandatangan."})}/> */}
                                                                    {/* <select className={dataWatch.ttdAdminidtratif == '' ? 'form-select form-select-sm is-invalid' : 'form-select form-select-sm'} {...registerAdministratif("ttdAdminidtratif", { required: "Mohon pilih nama penandatangan."})}>
                                                                        <option value="">--</option>
                                                                        <option value='1'>Dilakukan penahanan dan/atau melengkapi dokumen</option>
                                                                        <option value='2'>Dilakukan pengasingan dan pengamatan</option>
                                                                        <option value='3'>Ditolak</option>
                                                                        <option value='4'>Dilanjutkan pemeriksaan kesehatan</option>
                                                                    </select> */}
                                                                    {errors.ttdPutusan && <small className="text-danger">{errors.ttdPutusan.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                                                                <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                                            }
                                                            <button type="button" className="btn btn-danger me-sm-2 me-1">Batal</button>
                                                        </div>
                                                    </div>
                                                </form>
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
    </div>
  )
}

export default DocK31