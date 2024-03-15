/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PtkSurtug from '../../model/PtkSurtug';
import {decode as base64_decode} from 'base-64';
import Cookies from 'js-cookie';
import PtkPemeriksaan from '../../model/PtkPemeriksaan';
import PtkHistory from '../../model/PtkHistory';
import PtkModel from '../../model/PtkModel';
import ModaAlatAngkut from '../../model/master/modaAlatAngkut.json'
import HasilAnalisis from '../../model/master/hasilAnalisis.json'
import Rekomendasi from '../../model/master/rekomendasi.json'
import Swal from 'sweetalert2';

const model = new PtkPemeriksaan()
const modelSurtug = new PtkSurtug()
const modelPemohon = new PtkModel()

function modaAlatAngkut(e){
    return ModaAlatAngkut.find((element) => element.id == parseInt(e))
}

function rekomendasiAnalisis(e){
    return Rekomendasi.find((element) => element.id == parseInt(e))
}

function hasilAnalisis(e){
    return HasilAnalisis.find((element) => element.id == parseInt(e))
}

function DocK37a() {
    let navigate = useNavigate();
    const {
		register: registerAdministratif,
        setValue: setValueAdministratif,
        watch: watchAdministratif,
		handleSubmit: handleFormAdministratif,
        formState: { errors: errorsAdministratif },
	} = useForm()

    const dataWatch = watchAdministratif()

    const onSubmit = (data) => {
        const response = model.ptkAdmin(data);
        response
        .then((response) => {
            if(response.data) {
                if(response.data.status == 201) {
                    //start save history
                    const log = new PtkHistory();
                    const resHsy = log.pushHistory(data.idPtk, "p1a", "K-3.7a", (data.idDok37a ? 'UPDATE' : 'NEW'));
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

                    Swal.fire({
                        title: "Sukses!",
                        text: "Surat Pemeriksaan Administratif berhasil " + (data.idDok37a ? "diedit." : "disimpan."),
                        icon: "success"
                    });
                    setValueAdministratif("idDok37a", response.data.data.id)
                    setValueAdministratif("noDok37a", response.data.data.nomor)
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: response.data.message,
                        icon: "error"
                    });
                }
            }
        })
        .catch((error) => {
            if(import.meta.env.VITE_BE_ENV == "DEV") {
                console.log(error)
            }
            Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error"
            });
        });
    }

    function handlebatal() {
        setValueAdministratif("opsiAdministratif", "")
        setValueAdministratif("rekomAdmin", "")
    }

    const idPtk = Cookies.get("idPtkPage");
    let [data,setData] = useState({})
    useEffect(() => {
        if(idPtk) {
            setValueAdministratif("tglDok37a", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            setData(values => ({...values,
                noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                idPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                noDokumen: idPtk ? base64_decode(ptkNomor[2]): "",
                noAnalisa: "",
                tglAnalisa: "",
                nomorSurtug: "",
                tglSurtug: "",
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
                        setValueAdministratif("idPtk", base64_decode(ptkNomor[1]))
                        setValueAdministratif("noDok", base64_decode(ptkNomor[2]))
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK"
                        }));
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
                            errorPTK: "Data PTK Kosong/Tidak Ada"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK"
                        }));
                    }
                }
            });

            const response21 = modelSurtug.getAnalisByPtk(base64_decode(ptkNomor[1]));
            response21
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            const dataRekom = response.data.data?.map(item => {
                                return item.rekomendasi_id.toString()
                            })
                            setData(values => ({...values,
                                errorAnalisis: "",
                                listAnalisis: response.data.data,
                                rekomendasiAnalisisId: dataRekom[0]
                            }))
                        }  else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorAnalisis: "Analisis permohonan belum ada",
                            }))
                        } else {
                            setData(values => ({...values,
                                errorAnalisis: "Gagal load data history analisis",
                            }))
                        }
                    }
                } else {
                    setData(values => ({...values,
                        errorAnalisis: "Gagal load data history analisis",
                    }))
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status == 404) {
                        setData(values => ({...values,
                            errorAnalisis: ""
                        }));
                    } else {
                        setData(values => ({...values,
                            errorAnalisis: "Gagal load data history analisis"
                        }));
                    }
                }
            });
            
            // 1: penugasan periksa administratif
            const responseSurtug = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), 1);
            responseSurtug
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
                            setValueAdministratif("ttdAdminidtratif", response.data.data[0].penanda_tangan_id)
                            setValueAdministratif("idPtk", base64_decode(ptkNomor[1]))
                            setValueAdministratif("noDok", base64_decode(ptkNomor[2]))
                            setValueAdministratif("idSurtug", response.data.data[0].id)
                        } else {
                            setData(values => ({...values,
                                errorSurtug: response.data.message,
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data Surat Tugas",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorSurtug: error.response.data.message,
                }));
            });

            const responseAdm = model.getAdminByPtkId(base64_decode(ptkNomor[1]));
            responseAdm
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorAdmin: "",
                            }));
                            setValueAdministratif("idDok37a", response.data.data.id)
                            setValueAdministratif("noDok37a", response.data.data.nomor)
                            setValueAdministratif("opsiAdministratif", response.data.data.hasil_periksa_id?.toString())
                            setValueAdministratif("rekomAdmin", response.data.data.rekomendasi_id)
                            setValueAdministratif("ttdAdminidtratif", response.data.data.user_ttd_id)
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorAdmin: "",
                            }));
                        } else {
                            setData(values => ({...values,
                                errorAdmin: "Gagal load data Hasil Pemeriksaan Administratif",
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorAdmin: "Gagal load data Hasil Pemeriksaan Administratif",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.data.status == 404) {
                    setData(values => ({...values,
                        errorAdmin: ""
                    }));
                } else {
                    setData(values => ({...values,
                        errorAdmin: "Gagal load data Hasil Pemeriksaan Administratif"
                    }));
                }
            });
        }
    }, [idPtk, setValueAdministratif])

    function refreshData() {
        if(data.errorPTK) {
            const response = modelPemohon.getPtkId(data.idPtk);
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
                        setValueAdministratif("idPtk", data.idPtk)
                        setValueAdministratif("noDok", data.noDokumen)
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK"
                        }));
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
                            errorPTK: "Data PTK Kosong/Tidak Ada"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK"
                        }));
                    }
                }
            });
        }
        
        if(data.errorSurtug) {
            // 1: penugasan periksa administratif
            const responseSurtug = modelSurtug.getDetilSurtugPenugasan(data.idPtk, 1);
            responseSurtug
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorSurtug: "",
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                                namaPetugas: response.data.data[0].nama,
                                nipPetugas: response.data.data[0].nip,
                            }));
                            setValueAdministratif("ttdAdminidtratif", response.data.data[0].penanda_tangan_id)
                            setValueAdministratif("idSurtug", response.data.data[0].id)
                        } else {
                            setData(values => ({...values,
                                errorSurtug: response.data.message,
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data Surat Tugas",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorSurtug: error.response.data.message,
                }));
            });
        }

        if(data.errorAdmin) {
            const responseAdm = model.getAdminByPtkId(data.idPtk);
            responseAdm
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorAdmin: "",
                            }));
                            setValueAdministratif("idDok37a", response.data.data.id)
                            setValueAdministratif("noDok37a", response.data.data.nomor)
                            setValueAdministratif("opsiAdministratif", response.data.data.hasil_periksa_id?.toString())
                            setValueAdministratif("rekomAdmin", response.data.data.rekomendasi_id)
                            setValueAdministratif("ttdAdminidtratif", response.data.data.user_ttd_id)
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorAdmin: "",
                            }));
                        } else {
                            setData(values => ({...values,
                                errorAdmin: "Gagal load data Hasil Pemeriksaan Administratif",
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorAdmin: "Gagal load data Hasil Pemeriksaan Administratif",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.data.status == 404) {
                    setData(values => ({...values,
                        errorAdmin: ""
                    }));
                } else {
                    setData(values => ({...values,
                        errorAdmin: "Gagal load data Hasil Pemeriksaan Administratif"
                    }));
                }
            });
        }
    }
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-3.7a <span className="fw-light" style={{color: 'blue'}}>LAPORAN HASIL PEMERIKSAAN ADMINISTRATIF DAN KESESUAIAN DOKUMEN</span>
            
            <small className='float-end'>
                <span className='text-danger'>{(data.errorPTK ? data.errorPTK + "; " : "") + (data.errorAdmin ? data.errorAdmin + "; " : "") + (data.errorSurtug ? data.errorSurtug + "; " : "") + (data.errorAnalisis ? data.errorAnalisis + "; " : "")}</span>
                {data.errorPTK || data.errorAdmin || data.errorSurtug || data.errorAnalisis ?
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
                                    <input type="text" id="noDok" value={data.noDokumen || ""} className="form-control form-control-sm" placeholder="Nomor Dokumen PTK" disabled />
                                </div>
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noSurtug"><b>NO SURAT TUGAS</b></label>
                                <div className="col-sm-3">
                                    <input type="text" id='noSurtug' value={data.noSurtug || ""} className='form-control form-control-sm' disabled/>
                                </div>
                                <label className="col-sm-1 col-form-label" htmlFor="tglSurtug"><b>TANGGAL</b></label>
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
                    <div className='card-body'>
                        <form onSubmit={handleFormAdministratif(onSubmit)}>
                            <input type="hidden" name='idDok37a' {...registerAdministratif("idDok37a")}/>
                            <input type="hidden" name='idPtk' {...registerAdministratif("idPtk")}/>
                            <input type="hidden" name='noDok' {...registerAdministratif("noDok")}/>
                            <input type="hidden" name='idSurtug' {...registerAdministratif("idSurtug")}/>
                            <div className="col-md-12 mt-3">
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noDok37a">Nomor Dokumen</label>
                                    <div className="col-sm-3">
                                        <input type="text" id="noDok37a" {...registerAdministratif("noDok37a")} className="form-control form-control-sm" placeholder="Nomor Dokumen K.3.7a" disabled />
                                    </div>
                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="tglDok37a">Tanggal</label>
                                    <div className="col-sm-2">
                                        <input type="datetime-local" id="tglDok37a" name='tglDok37a' {...registerAdministratif("tglDok37a", {required: "Mohon isi tanggal dokumen."})} className={errorsAdministratif.tglDok37a ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                        {errorsAdministratif.tglDok37a && <small className="text-danger">{errorsAdministratif.tglDok37a.message}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="accordion" id="collapseSection">
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
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <h2 className="accordion-header" id="headerMP">
                                                <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseMP" aria-expanded="true" aria-controls="collapseImporter">
                                                    <h5 className='text-lightest mb-0'>II. Uraian Media Pembawa</h5>
                                                </button>
                                            </h2>
                                            <div id="collapseMP">
                                                <div className="accordion-body">
                                                    <div className="row">
                                                        <div className='col-md-12 mb-3'>
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
                                                                                    </tr>
                                                                                ))
                                                                            ) : null
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className='col-md-12 mb-3'>
                                                            <h6 className='mb-0'><u><b>Hasil Analisis Permohonan/Serah Terima MP/NHI</b></u></h6>
                                                            <ul>
                                                                {data.listAnalisis?.map((item, index) => (
                                                                    <li key={index}>{hasilAnalisis(item.hasil_analisis_id)?.deskripsi}</li>
                                                                ))}
                                                            </ul>
                                                            <p className='mb-0'>Rekomendasi: <b>{rekomendasiAnalisis(data.rekomendasiAnalisisId)?.nama}</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <h2 className="accordion-header" id="headerMP">
                                                <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseMP" aria-expanded="true" aria-controls="collapseImporter">
                                                    <h5 className='text-lightest mb-0'>III. Lampiran</h5>
                                                </button>
                                            </h2>
                                            <div id="collapseMP">
                                                <div className="accordion-body">
                                                    <div className="row">
                                                        <div className='col-md-12 mb-3'>
                                                            <div className="table-responsive text-nowrap" style={{height: (data.listDokumen?.length > 8 ? "300px" : "")}}>
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
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <h2 className="accordion-header" id="headerExporter">
                                                <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseExporter" aria-expanded="true" aria-controls="collapseExporter">
                                                    <h5 className='text-lightest mb-0'>Pemeriksaan Administratif</h5>
                                                </button>
                                            </h2>
                                            <div id="collapseExporter">
                                                <div className="accordion-body">
                                                    <div className="row g-3 mb-3">
                                                        <div className="col-sm-12 mb-4">
                                                            <div className="form-check">
                                                                <label className="form-check-label" style={{backgroundColor: (dataWatch.opsiAdministratif == '1' ? '#5A8DEE' : 'transparent'), color: (dataWatch.opsiAdministratif == '1' ? 'whitesmoke' : '#677788')}} htmlFor="opsi1">Dokumen yang dipersyaratkan tidak lengkap dan/atau diragukan keabsahan dan kebenaran isinya</label>
                                                                <input name="opsiAdministratif" className={errorsAdministratif.opsiAdministratif ? "form-check-input is-invalid" : "form-check-input"} value="1" {...registerAdministratif("opsiAdministratif", { required: "Mohon pilih pemeriksaan administratif yang sesuai."})} type="radio" id="opsi1" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" style={{backgroundColor: (dataWatch.opsiAdministratif == '2' ? '#5A8DEE' : 'transparent'), color: (dataWatch.opsiAdministratif == '2' ? 'whitesmoke' : '#677788')}} htmlFor="opsi2">Media pembawa merupakan jenis yang dilarang pemasukan/pengeluarannya ke/dari wilayah Negara Republik Indonesia/area tujuan/asal</label>
                                                                <input name="opsiAdministratif" className={errorsAdministratif.opsiAdministratif ? "form-check-input is-invalid" : "form-check-input"} value="2" {...registerAdministratif("opsiAdministratif")} type="radio" id="opsi2" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" style={{backgroundColor: (dataWatch.opsiAdministratif == '3' ? '#5A8DEE' : 'transparent'), color: (dataWatch.opsiAdministratif == '3' ? 'whitesmoke' : '#677788')}} htmlFor="opsi3">Media pembawa memerlukan tindakan pengasingan dan pengamatan</label>
                                                                <input name="opsiAdministratif" className={errorsAdministratif.opsiAdministratif ? "form-check-input is-invalid" : "form-check-input"} value="3" {...registerAdministratif("opsiAdministratif")} type="radio" id="opsi3" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" style={{backgroundColor: (dataWatch.opsiAdministratif == '4' ? '#5A8DEE' : 'transparent'), color: (dataWatch.opsiAdministratif == '4' ? 'whitesmoke' : '#677788')}} htmlFor="opsi4">Media pembawa tergolong pangan/pakan/SDG/PRG/agensia hayati/JAI/tumbuhan dan satwa liar/tumbuhan dan satwa langka</label>
                                                                <input name="opsiAdministratif" className={errorsAdministratif.opsiAdministratif ? "form-check-input is-invalid" : "form-check-input"} value="4" {...registerAdministratif("opsiAdministratif")} type="radio" id="opsi4" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" style={{backgroundColor: (dataWatch.opsiAdministratif == '5' ? '#5A8DEE' : 'transparent'), color: (dataWatch.opsiAdministratif == '5' ? 'whitesmoke' : '#677788')}} htmlFor="opsi5">Bukan termasuk media pembawa/tidak dikenai tindakan karantina pengawasan</label>
                                                                <input name="opsiAdministratif" className={errorsAdministratif.opsiAdministratif ? "form-check-input is-invalid" : "form-check-input"} value="5" {...registerAdministratif("opsiAdministratif")} type="radio" id="opsi5" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" style={{backgroundColor: (dataWatch.opsiAdministratif == '6' ? '#5A8DEE' : 'transparent'), color: (dataWatch.opsiAdministratif == '6' ? 'whitesmoke' : '#677788')}} htmlFor="opsi6">Semua persyaratan yang diperlukan bagi pemasukan/pengeluaran media pembawa tersebut telah lengkap dan tidak diragukan keabsahan dan kebenaran isinya</label>
                                                                <input name="opsiAdministratif" className={errorsAdministratif.opsiAdministratif ? "form-check-input is-invalid" : "form-check-input"} value="6" {...registerAdministratif("opsiAdministratif")} type="radio" id="opsi6" />
                                                                {errorsAdministratif.opsiAdministratif && <small className="text-danger">{errorsAdministratif.opsiAdministratif.message}</small>}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className='form-control-label'><b>Rekomendasi</b></div>
                                                            <div className="col-sm-5 mb-3">
                                                                <select className={errorsAdministratif.rekomAdmin == '' ? 'form-select is-invalid' : 'form-select'} {...registerAdministratif("rekomAdmin", { required: "Mohon pilih rekomendasi yang sesuai."})}>
                                                                    <option value="">--</option>
                                                                    <option value="11">Dilakukan penahanan</option>
                                                                    <option value="12">Dilakukan pengasingan dan pengamatan</option>
                                                                    <option value="13">Ditolak</option>
                                                                    <option value="14">Dilanjutkan pemeriksaan kesehatan dan/atau uji Keamanan Pangan, uji Keamanan Pakan, uji Mutu Pangan, dan/atau uji Mutu Pakan</option>
                                                                    <option value="15">Diterbitkan surat keterangan karantina</option>
                                                                </select>
                                                                {errorsAdministratif.rekomAdmin && <small className="text-danger">{errorsAdministratif.rekomAdmin.message}</small>}
                                                            </div>
                                                            <div className='form-control-label'><b>Penandatangan</b></div>
                                                            <div className="col-sm-5">
                                                                <select className={errorsAdministratif.ttdAdminidtratif == '' ? 'form-select is-invalid' : 'form-select'} name="ttdAdminidtratif" id="ttdAdminidtratif" {...registerAdministratif("ttdAdminidtratif", { required: "Mohon pilih nama penandatangan."})}>
                                                                    {data.petugas?.map((item, index) => (
                                                                        <option value={item.penanda_tangan_id} key={index} defaultValue={dataWatch.ttdAdminidtratif}>{item.nama + " - " + item.nip}</option>
                                                                    ))}
                                                                </select>
                                                                {errorsAdministratif.ttdAdminidtratif && <small className="text-danger">{errorsAdministratif.ttdAdminidtratif.message}</small>}
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
                                <div className="col-sm-12">
                                    
                                    <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                    <button type="button" className="btn btn-danger me-sm-2 me-1" onClick={handlebatal}>Batal</button>
                                    <a href={import("../../dok/k37.pdf")} rel="noopener noreferrer" target='_blank' className="btn btn-warning"><i className="bx bx-printer bx-xs"></i>&nbsp; Print</a>
                                    <button style={{display: (dataWatch.idDok37a ? "block" : "none")}} type='button' onClick={() => navigate((dataWatch.rekomAdmin == "14" ? '/k37b' : '/k22'))} className="btn btn-info pb-1 float-end">
                                        <span className="d-sm-inline-block d-none me-sm-1">{dataWatch.rekomAdmin == "14" ? "Pemeriksaan Fisik/Kesehatan" : "Buat Surat Tugas"}</span>
                                        <i className="fa-solid fa-angle-right"></i>
                                    </button>
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

export default DocK37a