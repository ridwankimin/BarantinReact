/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import {decode as base64_decode} from 'base-64';
import PtkModel from '../../model/PtkModel';
import PtkPemeriksaan from '../../model/PtkPemeriksaan';
import Cookies from 'js-cookie';
import ModaAlatAngkut from '../../model/master/modaAlatAngkut.json';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import LoadBtn from '../../component/loading/LoadBtn';

const modelPemohon = new PtkModel()
const modelPeriksa = new PtkPemeriksaan()

function modaAlatAngkut(e){
    return ModaAlatAngkut.find((element) => element.id == parseInt(e))
}

const addCommas = num => {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};
const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");

function DocK34() {
    const idPtk = Cookies.get("idPtkPage");
    let [data, setData] = useState({
        noAju: "",
        noIdPtk: "",
        noDokumen: "",
        tglDokumen: "",
    })

    let [dataSegel,setDataSegel] = useState({})
    let [dataSegelArray,setDataSegelArray] = useState([])
    let [onLoad, setOnLoad] = useState(false)
    function handleSubmitSegel(e) {
        e.preventDefault();
        setOnLoad(true)
        setDataSegelArray([...dataSegelArray, { 
            jenisSegel: dataSegel.jenisSegel,
            nomorSegel: dataSegel.nomorSegel,
            nomorKontainer: dataSegel.nomorKontainer
        }]);
        resetDataSegel()
        setOnLoad(false)
    }
    
    function resetDataSegel() {
        setDataSegel(values => ({...values,
            jenisSegel: "",
            nomorSegel: "",
            nomorKontainer: ""
        }));
        document.getElementById("jenisSegel").focus()
    }

    const {
        register,
        setValue,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm({
        noDok31: ""
    });

    // const cekWatch = watch()

    const onSubmit = (data) => {
        setOnLoad(true)
        const response = modelPeriksa.pnInstalasi(data);
        response
        .then((response) => {
            if(response.data) {
                setOnLoad(false)
                console.log(response.data)
                if(response.data.status == 201) {
                    Swal.fire({
                        title: "Sukses!",
                        text: "Surat Perintah Masuk Instalasi berhasil " + (data.idDok34 ? "diedit." : "disimpan."),
                        icon: "success"
                    });
                    setValue("idDok34", response.data.data.id)
                    setValue("noDok34", response.data.data.nomor)
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
            Swal.fire({
                title: "Error!",
                text: error.response.status + " - " + error.response.data.message,
                icon: "error"
            });
        });
    }

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok34", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
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
                    setData(values => ({...values,
                        errorPTK: ""
                    }));
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            listPtk: response.data.data.ptk,
                            listKomoditas: response.data.data.ptk_komoditi,
                            listDokumen: response.data.data.ptk_dokumen
                        }));
                        setValue("idPtk", base64_decode(ptkNomor[1]))
                        setValue("noDokumen", base64_decode(ptkNomor[2]))
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK."
                        }));
                    }
                } else {
                    setData(values => ({...values,
                        errorPTK: "Gagal load data PTK."
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
                            errorPTK: "Data PTK Kosong/Tidak Ada"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK"
                        }));
                    }
                }
            });

            const resInstalasi = modelPeriksa.getPnInstalasiByPtkId(base64_decode(ptkNomor[1]))
            resInstalasi
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorInstalasi: ""
                        }));
                        if(response.data.status == 200) {
                            setValue("idDok34", response.data.data.id)
                            setValue("noDok34", response.data.data.nomor)
                            setValue("tglDok34", response.data.data.tanggal)
                            setValue("pemilikInstalasi", response.data.data.pemilik)
                            setValue("namaPenanggungJawab", response.data.data.penanggungjawab)
                            setValue("alamatInstalasi", response.data.data.alamat_instalasi)
                            setValue("jenisIdentitas", response.data.data.jenis_identitas)
                            setValue("nomorIdentitas", response.data.data.nomor_identitas)
                            setValue("nomorTelepon", response.data.data.nomor_telp)
                            setValue("diterbitkan", response.data.data.diterbitkan_di)
                            setValue("userTtd", response.data.data.user_ttd_id)
                        } else {
                            setData(values => ({...values,
                                errorInstalasi: "Gagal load data Surat Perintah Masuk Instalasi"
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorInstalasi: "Gagal load data Surat Perintah Masuk Instalasi"
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
                            errorInstalasi: ""
                        }));
                    } else {
                        setData(values => ({...values,
                            errorInstalasi: "Gagal load data Surat Perintah Masuk Instalasi"
                        }));
                    }
                }
            })
        }
    },[idPtk, setValue])

    function refreshData() {
        if(data.errorPTK) {
            const response = modelPemohon.getPtkId(data.noIdPtk);
            response
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorPTK: ""
                    }));
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            listPtk: response.data.data.ptk,
                            listKomoditas: response.data.data.ptk_komoditi,
                            listDokumen: response.data.data.ptk_dokumen
                        }));
                        setValue("idPtk", data.noIdPtk)
                        setValue("noDokumen", data.noDokumen)
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK."
                        }));
                    }
                } else {
                    setData(values => ({...values,
                        errorPTK: "Gagal load data PTK."
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
                            errorPTK: "Data PTK Kosong/Tidak Ada"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK"
                        }));
                    }
                }
            })
        }

        if(data.errorInstalasi) {
            const resInstalasi = modelPeriksa.getPnInstalasiByPtkId(data.noIdPtk)
            resInstalasi
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorInstalasi: ""
                        }));
                        if(response.data.status == 200) {
                            setValue("idDok34", response.data.data.id)
                            setValue("noDok34", response.data.data.nomor)
                            setValue("tglDok34", response.data.data.tanggal)
                            setValue("pemilikInstalasi", response.data.data.pemilik)
                            setValue("namaPenanggungJawab", response.data.data.penanggungjawab)
                            setValue("alamatInstalasi", response.data.data.alamat_instalasi)
                            setValue("jenisIdentitas", response.data.data.jenis_identitas)
                            setValue("nomorIdentitas", response.data.data.nomor_identitas)
                            setValue("nomorTelepon", response.data.data.nomor_telp)
                            setValue("diterbitkan", response.data.data.diterbitkan_di)
                            setValue("userTtd", response.data.data.user_ttd_id)
                        } else {
                            setData(values => ({...values,
                                errorInstalasi: "Gagal load data Surat Perintah Masuk Instalasi"
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorInstalasi: "Gagal load data Surat Perintah Masuk Instalasi"
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
                            errorInstalasi: ""
                        }));
                    } else {
                        setData(values => ({...values,
                            errorInstalasi: "Gagal load data Surat Perintah Masuk Instalasi"
                        }));
                    }
                }
            })
        }
    }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-3.4 <span className="fw-light" style={{color: 'blue'}}>SURAT PERINTAH MASUK INSTALASI KARANTINA ATAU TEMPAT LAIN</span>
        
            <small className='float-end'>
                <span className='text-danger'>{(data.errorPTK ? data.errorPTK + "; " : "") + (data.errorAdmin ? data.errorAdmin + "; " : "") + (data.errorSampling ? data.errorSampling + "; " : "") + (data.errorSurtug ? data.errorSurtug + "; " : "")}</span>
                {data.errorPTK || data.errorSampling || data.errorAdmin || data.errorSurtug ?
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
                                    <input type="text" id="noDokumen" value={data.noDokumen || ""} className="form-control form-control-sm" placeholder="Nomor PTK" disabled />
                                </div>
                                <label className="col-sm-1 col-form-label" htmlFor="tglDokumen"><b>Tanggal</b></label>
                                <div className="col-sm-2">
                                    <input type="text" id='tglDokumen' value={data.tglDokumen || ""} className='form-control form-control-sm' disabled/>
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
                        <input type="hidden" name='idDok34' id='idDok34' {...register("idDok34")} />
                        <input type="hidden" name='idPtk' id='idPtk' {...register("idPtk")} />
                        <input type="hidden" name='noDokumen' id='noDokumen' {...register("noDokumen")} />
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok34">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok63" name='noDok34' {...register("noDok34")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-3.4" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok34">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok34" name='tglDok34' {...register("tglDok34", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok34 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok34 && <small className="text-danger">{errors.tglDok34.message}</small>}
                                </div>
                            </div>
                        </div>
                        <div className="accordion mb-4" id="collapseSection">
                            <div className="card">
                                <h2 className="accordion-header" id="headerKeterangan">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseKeterangan"  style={{backgroundColor: '#123138'}} aria-expanded="true" aria-controls="collapseCountry">
                                        <h5 className='text-lightest mb-0'>I. Informasi PTK</h5>
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
                                            <h5 className='mb-2'><b><u>Informasi Pemasukan / Pengeluaran</u></b></h5>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahAsal">{data.listPtk ? (data.listPtk.permohonan == "DK" ? "Daerah" : "Negara") : ""} Asal</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahAsal" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.permohonan == "DK" ? data.listPtk.kota_asal : data.listPtk.negara_asal) : "") || ""} id="daerahAsal" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahTujuan">{data.listPtk ? (data.listPtk.permohonan == "DK" ? "Daerah" : "Negara") : ""} Tujuan</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahTujuan" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.permohonan == "DK" ? data.listPtk.kota_tujuan : data.listPtk.negara_tujuan) : "") || ""} id="daerahTujuan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatKeluar">Tempat Pengeluaran / Perkiraan Tgl Berangkat</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatKeluar" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.pelabuhan_muat + " / " + data.listPtk.tanggal_rencana_berangkat_terakhir) : "") || ""} id="tempatKeluar" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatMasuk">Tempat Pemasukan / Perkiraan Tgl Tiba</label>
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
                                                        <input name="tempatTransit" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.pelabuhan_transit == null ? "-" : data.listPtk.pelabuhan_transit + ", " + data.listPtk.negara_transit) : "") || ""} id="tempatTransit" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasAngkut">Jenis, Nama Alat Angkut</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasAngkut" className="form-control form-control-sm" disabled value={(data.listPtk ? (modaAlatAngkut(data.listPtk.moda_alat_angkut_terakhir_id).nama + ", " + data.listPtk.nama_alat_angkut_terakhir) : "") || "" } id="identitasAngkut" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h5><b><u>Rincian Media Pembawa</u></b></h5>
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
                                                                    <td>{data.volume_netto == null ? "" : addCommas(removeNonNumeric(data.volume_netto))}</td>
                                                                    <td>{data.sat_netto}</td>
                                                                    <td>{data.volume_lain == null ? "" : addCommas(removeNonNumeric(data.volume_lain))}</td>
                                                                    <td>{data.sat_lain}</td>
                                                                    <td>{data.jantan == null ? "" : addCommas(removeNonNumeric(data.jantan))}</td>
                                                                    <td>{data.betina == null ? "" : addCommas(removeNonNumeric(data.betina))}</td>
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
                                <h2 className="accordion-header" id="headerAlasan">
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseAlasan" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>II. INFORMASI INSTALASI KARANTINA/TEMPAT LAIN</h5>
                                    </button>
                                </h2>
                                <div id="collapseAlasan">
                                    <div className="accordion-body">
                                        <div className='row'>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="jenisIdentitas">Identitas<span className='text-danger'>*</span></label>
                                                    <div className="col-sm-8">
                                                        <div className='input-group'>
                                                            <div className='col-sm-4'>
                                                                <select name="jenisIdentitas" id="jenisIdentitas" {...register("jenisIdentitas", {required: "Mohon pilih jenis identitas."})} className={errors.jenisIdentitas ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                                    <option value="">--</option>
                                                                    <option value="NIB">NIB</option>
                                                                    <option value="NPWP">NPWP</option>
                                                                    <option value="KTP">KTP</option>
                                                                    <option value="PASSPORT">Passport</option>
                                                                </select>
                                                            </div>
                                                            <div className='col-sm-8'>
                                                                <input type="text" className={errors.nomorIdentitas ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} id='nomorIdentitas' name='nomorIdentitas' {...register("nomorIdentitas", {required: "Mohon isi nomor identitas."})} />
                                                            </div>
                                                        </div>
                                                        {errors.jenisIdentitas && <small className="text-danger">{errors.jenisIdentitas.message}</small>}
                                                        {errors.nomorIdentitas && <small className="text-danger">{errors.nomorIdentitas.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="pemilikInstalasi">Pemilik Instalasi<span className='text-danger'>*</span></label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="pemilikInstalasi" name='pemilikInstalasi' className={errors.pemilikInstalasi ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Pemilik Instalasi Karantina / Tempat Lain.." {...register("pemilikInstalasi", {required: "Mohon isi nama pemilik Instalasi."})} />
                                                        {errors.pemilikInstalasi && <small className="text-danger">{errors.pemilikInstalasi.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatInstalasi">Alamat Instalasi<span className='text-danger'>*</span></label>
                                                    <div className="col-sm-8">
                                                        <textarea name="alamatInstalasi" id="alamatInstalasi" rows="2" className={errors.alamatInstalasi ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Instalasi Karantina / Tempat Lain.." {...register("alamatInstalasi", {required: "Mohon isi alamat Instalasi Karantina."})}></textarea>
                                                        {errors.alamatInstalasi && <small className="text-danger">{errors.alamatInstalasi.message}</small>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="namaPenanggungJawab">Penanggungjawab<span className='text-danger'>*</span></label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="namaPenanggungJawab" name='namaPenanggungJawab' className="form-control form-control-sm" placeholder="Nama PenanggungJawab.." {...register("namaPenanggungJawab", {required: "Mohon isi nama PenanggungJawab."})} />
                                                        {errors.namaPenanggungJawab && <small className="text-danger">{errors.namaPenanggungJawab.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="nomorTelepon">Nomor Kontak (TelplHP)</label>
                                                    <div className="col-sm-5">
                                                        <input type="text" id="nomorTelepon" name="nomorTelepon" className="form-control form-control-sm" placeholder="628898888888.." {...register("nomorTelepon")} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                <div className="offset-sm-4 col-sm-4">
                                                    <button type='button' className='btn rounded-pill btn-secondary' data-bs-toggle="modal" data-bs-target="#modSegel"><i className='fa-solid fa-folder-tree me-sm-2 me-1'></i>Segel Karantina</button>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 mb-3">
                            <div className='col-sm-2 form-control-label' htmlFor="userTtd">Penandatangan<span className='text-danger'>*</span></div>
                            <div className="col-sm-4">
                                <input type="text" name='userTtd' id='userTtd' {...register("userTtd", {required: "Mohon pilih penandatangan."})} className={errors.userTtd ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}/>
                                {errors.userTtd && <small className="text-danger">{errors.userTtd.message}</small>}
                            </div>
                            <div className='col-sm-2 form-control-label' htmlFor="diterbitkan">Diterbitkan di<span className='text-danger'>*</span></div>
                            <div className="col-sm-4">
                                <input type="text" name='diterbitkan' id='diterbitkan' {...register("diterbitkan", {required: "Mohon isi tempat penerbitan sertifikat."})} className={errors.diterbitkan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}/>
                                {errors.diterbitkan && <small className="text-danger">{errors.diterbitkan.message}</small>}
                            </div>
                        </div>
                        {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                            <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                        }
                        <button type="button" className="btn btn-danger me-sm-2 me-1">Hapus</button>
                    </form>
                </div>
            </div>
        </div>

        <div className="modal fade" id="modSegel" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content p-3 pb-1">
                    <div className="modal-body">
                        <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="text-center mb-4">
                            <h3 className="address-title">Tambah Segel</h3>
                        </div>
                        <form onSubmit={handleSubmitSegel}>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="jenisSegel">Jenis Segel</label>
                                <div className="col-sm-8">
                                    <select name="jenisSegel" id="jenisSegel" className='form-select form-select-sm' value={dataSegel.jenisSegel || ""} onChange={(e) => setDataSegel(values => ({...values, jenisSegel: e.target.value}))}>
                                        <option value="">--</option>
                                        <option value="KERTAS">Segel Kertas</option>
                                        <option value="LAKBAN">Segel Lakban</option>
                                        <option value="PLASTIK">Segel Plastik atau Segel Locis (Pull Tight Seals)</option>
                                        <option value="PEMBATAS">Segel Pembatas / Garis Karantina</option>
                                        <option value="KUNCI">Kunci</option>
                                        <option value="BOTOL">Segel Botol</option>
                                    </select>
                                </div>
                                <label className="col-sm-3 col-form-label" htmlFor="nomorSegel">Nomor Segel</label>
                                <div className="col-sm-8">
                                    <input type="text" placeholder='Nomor Segel..' className='form-control form-control-sm' id='nomorSegel' name='nomorSegel' value={dataSegel.nomorSegel || ""} onChange={(e) => setDataSegel(values => ({...values, nomorSegel: e.target.value}))} />
                                </div>
                                <label className="col-sm-3 col-form-label" htmlFor="nomorKontainer">Nomor Kontainer</label>
                                <div className="col-sm-8">
                                    <input type="text" placeholder='Nomor Kontainer..' className='form-control form-control-sm' id='nomorKontainer' name='nomorKontainer' value={dataSegel.nomorKontainer || ""} onChange={(e) => setDataSegel(values => ({...values, nomorKontainer: e.target.value}))} />
                                </div>
                            </div>
                            <div className="col-12 text-center mb-3">
                                {onLoad ? <LoadBtn warna="btn-primary" ukuran="btn-sm" /> :
                                    <button type="submit" className="btn btn-sm btn-primary me-sm-3 me-1">Tambah</button>
                                }
                                <button
                                type="reset"
                                className="btn btn-sm btn-label-secondary"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                                Tutup
                                </button>
                            </div>
                            <div className='col-sm-12'>
                                <div className="table-responsive text-nowrap" style={{height: (dataSegelArray?.length > 8 ? "300px" : "")}}>
                                    <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Jenis Segel</th>
                                                <th>Nomor Segel</th>
                                                <th>Kontainer</th>
                                                <th>Act</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataSegelArray?.length > 0  ? (
                                                dataSegelArray?.map((item,index) => (
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{item.jenisSegel}</td>
                                                        <td>{item.nomorSegel}</td>
                                                        <td>{item.nomorKontainer}</td>
                                                        <td>
                                                            <button type='button' className="btn btn-default text-danger"><i className="fa-solid fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : null}
                                        </tbody>
                                    </table>
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

export default DocK34