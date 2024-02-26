/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import {decode as base64_decode} from 'base-64';
import Cookies from 'js-cookie';
import PtkModel from '../../model/PtkModel';
import PtkPemeriksaan from '../../model/PtkPemeriksaan';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import PtkSurtug from '../../model/PtkSurtug';

const modelPemohon = new PtkModel()
const modelSurtug = new PtkSurtug()
const modelPeriksa = new PtkPemeriksaan()

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");

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
  };

function DocK33() {
    const idPtk = Cookies.get("idPtkPage");
    let [data, setData] = useState({
        noAju: "",
        noIdPtk: "",
        noDokumen: "",
        tglDokumen: "",
    })
    let [listDetilSampel, setListDetilSampel] = useState([])
    let [dataSelect, setDataSelect] = useState([])

    let [detilSampel, setDetilSampel] = useState({})

    function handleDetilSampel(e) {
        // console.log(e.label.split("|")[0]) & 
        e.preventDefault()
        setListDetilSampel([...listDetilSampel, { 
            ptk_komoditas_id: detilSampel.idkom,
            nama_umum_tercetak: detilSampel.namaKom,
            nama_latin_tercetak: detilSampel.namaLatinTC,
            kode_contoh: detilSampel.kode,
            kondisi_contoh: detilSampel.kondisi,
            identitas_contoh: detilSampel.identitas,
            jumlah_contoh: detilSampel.jumlah,
            nomor_kontainer: detilSampel.noKontainer,
            keterangan: detilSampel.keterangan
        }]);
         setDetilSampel(values => ({...values, 
            idkom: "",
            idkomView: "",
            namaKom: "",
            volKom: "",
            satKom: "",
            namaLatinTC: "",
            kode: "",
            kondisi: "",
            identitas: "",
            jumlah: "",
            noKontainer: "",
            keterangan: ""
        }));
    }

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
        // console.log(data)
        const response = modelPeriksa.pnSampling(data, listDetilSampel);
        response
        .then((response) => {
            console.log(response.data)
            if(response.data) {
                if(response.data.status === '201') {
                    Swal.fire({
                        title: "Sukses!",
                        text: "Berita Acara Pengambilan Contoh berhasil " + (data.idDok33 ? "diedit." : "disimpan."),
                        icon: "success"
                    });
                    // alert(response.data.status + " - " + response.data.message)
                    // setValueDetilSurtug("idHeader", response.data.data.id)
                    setValue("idDok33", response.data.data.id)
                    setValue("noDok33", response.data.data.nomor)
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
            console.log(error);
            // alert(error.response.status + " - " + error.response.data.message)
            Swal.fire({
                title: "Error!",
                text: error.response.status + " - " + error.response.data.message,
                icon: "error"
            });
        });
    }

    function handleDeleteDetilSampel(e) {
        Swal.fire({
            title: "Anda Yakin?",
            text: "Data akan dihapus!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya!"
          }).then((result) => {
            if (result.isConfirmed) {
                const filteralist = listDetilSampel.filter((element, index) => index != e)
                setListDetilSampel(filteralist)
            }
          });
    }

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok33", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
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
                    if(response.data.status === '200') {
                        // console.log(response.data.data)
                        // alert(response.data.message);
                        // isiDataPtk(response)
                        setData(values => ({...values,
                            listPtk: response.data.data.ptk,
                            listKomoditas: response.data.data.ptk_komoditi,
                            listDokumen: response.data.data.ptk_dokumen
                        }));
                        setValue("idPtk", base64_decode(ptkNomor[1]))
                        setValue("noDokumen", base64_decode(ptkNomor[2]))
                        const arraySelectKomoditi = response.data.data.ptk_komoditi.map(item => {
                            return {
                                value: item.id + ";" + item.volume_lain + ";" + item.sat_lain,
                                label: item.nama_umum_tercetak + " | " + item.nama_latin_tercetak
                            }
                        })
                        setDataSelect(values => ({...values, komoditas: arraySelectKomoditi }));
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
                console.log(error);
                if(error.response) {
                    if(error.response.data.status === 404) {
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

            const resAdmin = modelPeriksa.getAdminByPtkId(base64_decode(ptkNomor[1]))
            resAdmin
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorAdmin: ""
                        }));
                        if(response.data.status === '200') {
                            setValue("idDok37a", response.data.data.id)
                            setValue("noDok37a", response.data.data.nomor)
                            setValue("tglDok37a", response.data.data.tanggal)
                        } else {
                            setData(values => ({...values,
                                errorAdmin: "Gagal load data Periksa Administratif"
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorAdmin: "Gagal load data Periksa Administratif"
                        }));
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                if(error.response) {
                    if(error.response.data.status === 404) {
                        setData(values => ({...values,
                            errorAdmin: "Data Periksa Administratif Kosong/Tidak Ada"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorAdmin: "Gagal load data Periksa Administratif"
                        }));
                    }
                }
            })

            const resSurtug = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), 2);
            resSurtug
            .then((response) => {
                // console.log(response.data)
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorSurtug: ""
                        }));
                        if(response.data.status === '200') {
                            // console.log(response.data.data[0])
                            setData(values => ({...values,
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                            }));
                            setValue("idSurtug", response.data.data[0].id)
                        } else {
                            setData(values => ({...values,
                                errorSurtug: "Gagal load data Surat Tugas"
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
                console.log(error);
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
            
            const response33 = modelPeriksa.getSamplingByPtkId(base64_decode(ptkNomor[1]));
            response33
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorSampling: ""
                    }));
                    if(response.data.status === '200') {
                        setValue("idPtk", response.data.data[0].id)
                        setValue("noDok33", response.data.data[0].nomor)
                        setValue("tglDok33", response.data.data[0].tanggal)
                        setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                        setValue("lokasiMP", response.data.data[0].lokasi_mp)
                        setValue("tglSampling", response.data.data[0].tgl_sampling)
                        setValue("noRegPPC", response.data.data[0].norek_ppc)
                        setValue("tujuan1", response.data.data[0].tujuan1)
                        setValue("tujuan2", response.data.data[0].tujuan2)
                        setValue("tujuan3", response.data.data[0].tujuan3)
                        setValue("tujuan4", response.data.data[0].tujuan4)
                        setValue("tujuan5", response.data.data[0].tujuan5)
                        setValue("tujuan6", response.data.data[0].tujuan6)
                        setValue("tujuan7", response.data.data[0].tujuan7)
                        setValue("tujuan8", response.data.data[0].tujuan8)
                        setValue("tujuan9", response.data.data[0].tujuan9 == null ? "" : "1")
                        setValue("tujuan9Text", response.data.data[0].tujuan9)
                        setValue("tujuan10", response.data.data[0].tujuan10)
                        setValue("tujuan11", response.data.data[0].tujuan11)
                        setValue("tujuan12", response.data.data[0].tujuan12 == null ? "" : "1")
                        setValue("tujuan12Text", response.data.data[0].tujuan12)
                        setValue("catatan", response.data.data[0].catatan)
                        setValue("namaPemilik", response.data.data[0].nama_pemilik)
                        setValue("nikPemilik", response.data.data[0].nik_pemilik)
                        setValue("ttdUser", response.data.data[0].user_ttd_id)
                        setListDetilSampel(response.data.data)
                    } else {
                        setData(values => ({...values,
                            errorSampling: "Gagal load data BA Sampling"
                        }));
                    }
                } else {
                    setData(values => ({...values,
                        errorSampling: "Gagal load data BA Sampling"
                    }));
                }
            })
            .catch((error) => {
                // setData()
                console.log(error);
                if(error.response) {
                    if(error.response.data.status === 404) {
                        setData(values => ({...values,
                            errorSampling: ""
                        }));
                    } else {
                        setData(values => ({...values,
                            errorSampling: "Gagal load data BA Sampling"
                        }));
                    }
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
                    setData(values => ({...values,
                        errorPTK: ""
                    }));
                    if(response.data.status === '200') {
                        // console.log(response.data.data)
                        // alert(response.data.message);
                        // isiDataPtk(response)
                        setData(values => ({...values,
                            listPtk: response.data.data.ptk,
                            listKomoditas: response.data.data.ptk_komoditi,
                            listDokumen: response.data.data.ptk_dokumen
                        }));
                        setValue("idPtk", data.noIdPtk)
                        setValue("noDokumen", data.noDokumen)
                        const arraySelectKomoditi = response.data.data.ptk_komoditi.map(item => {
                            return {
                                value: item.id + ";" + item.volume_lain + ";" + item.sat_lain,
                                label: item.nama_umum_tercetak + " | " + item.nama_latin_tercetak
                            }
                        })
                        setDataSelect(values => ({...values, komoditas: arraySelectKomoditi }));
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
                console.log(error);
                if(error.response) {
                    if(error.response.data.status === 404) {
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

        if(data.errorAdmin) {
            const resAdmin = modelPeriksa.getAdminByPtkId(data.noIdPtk)
            resAdmin
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorAdmin: ""
                        }));
                        if(response.data.status === '200') {
                            setValue("idDok37a", response.data.data.id)
                            setValue("noDok37a", response.data.data.nomor)
                            setValue("tglDok37a", response.data.data.tanggal)
                        } else {
                            setData(values => ({...values,
                                errorAdmin: "Gagal load data Periksa Administratif"
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorAdmin: "Gagal load data Periksa Administratif"
                        }));
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                if(error.response) {
                    if(error.response.data.status === 404) {
                        setData(values => ({...values,
                            errorAdmin: "Data Periksa Administratif Kosong/Tidak Ada"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorAdmin: "Gagal load data Periksa Administratif"
                        }));
                    }
                }
            })
        }

        if(data.errorSurtug) {
            const resSurtug = modelSurtug.getDetilSurtugPenugasan(data.noIdPtk, 2);
            resSurtug
            .then((response) => {
                // console.log(response.data)
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorSurtug: ""
                        }));
                        if(response.data.status === '200') {
                            // console.log(response.data.data[0])
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
                console.log(error);
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
        
        if(data.errorSampling) {
            const response33 = modelPeriksa.getSamplingByPtkId(data.noIdPtk);
            response33
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorSampling: ""
                    }));
                    if(response.data.status === '200') {
                        setValue("idPtk", response.data.data[0].id)
                        setValue("noDok33", response.data.data[0].nomor)
                        setValue("tglDok33", response.data.data[0].tanggal)
                        setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                        setValue("lokasiMP", response.data.data[0].lokasi_mp)
                        setValue("tglSampling", response.data.data[0].tgl_sampling)
                        setValue("noRegPPC", response.data.data[0].norek_ppc)
                        setValue("tujuan1", response.data.data[0].tujuan1)
                        setValue("tujuan2", response.data.data[0].tujuan2)
                        setValue("tujuan3", response.data.data[0].tujuan3)
                        setValue("tujuan4", response.data.data[0].tujuan4)
                        setValue("tujuan5", response.data.data[0].tujuan5)
                        setValue("tujuan6", response.data.data[0].tujuan6)
                        setValue("tujuan7", response.data.data[0].tujuan7)
                        setValue("tujuan8", response.data.data[0].tujuan8)
                        setValue("tujuan9", response.data.data[0].tujuan9 == null ? "" : "1")
                        setValue("tujuan9Text", response.data.data[0].tujuan9)
                        setValue("tujuan10", response.data.data[0].tujuan10)
                        setValue("tujuan11", response.data.data[0].tujuan11)
                        setValue("tujuan12", response.data.data[0].tujuan12 == null ? "" : "1")
                        setValue("tujuan12Text", response.data.data[0].tujuan12)
                        setValue("catatan", response.data.data[0].catatan)
                        setValue("namaPemilik", response.data.data[0].nama_pemilik)
                        setValue("nikPemilik", response.data.data[0].nik_pemilik)
                        setValue("ttdUser", response.data.data[0].user_ttd_id)
                        setListDetilSampel(response.data.data)
                    } else {
                        setData(values => ({...values,
                            errorSampling: "Gagal load data BA Sampling"
                        }));
                    }
                } else {
                    setData(values => ({...values,
                        errorSampling: "Gagal load data BA Sampling"
                    }));
                }
            })
            .catch((error) => {
                // setData()
                console.log(error);
                if(error.response) {
                    if(error.response.data.status === 404) {
                        setData(values => ({...values,
                            errorSampling: ""
                        }));
                    } else {
                        setData(values => ({...values,
                            errorSampling: "Gagal load data BA Sampling"
                        }));
                    }
                }
            });
        }
    }
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-3.3 <span className="fw-light" style={{color: 'blue'}}>BERITA ACARA PENGAMBILAN CONTOH</span>
            
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
                        <input type="hidden" id='idDok33' name='idDok33' {...register("idDok33")} />
                        <input type="hidden" id='idDok37a' name='idDok37a' {...register("idDok37a")} />
                        <input type="hidden" id='idPtk' name='idPtk' {...register("idPtk")} />
                        <input type="hidden" id='idSurtug' name='idSurtug' {...register("idSurtug")} />
                        <input type="hidden" id='noDokumen' name='noDokumen' {...register("noDokumen")} />
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok37a">Nomor Pemeriksaan Administrasi</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok37a" name='noDok37a' {...register("noDok37a")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-3.7a" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok37a">Tanggal</label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok37a" disabled name='tglDok37a' {...register("tglDok37a")} className="form-control form-control-sm" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok33">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok63" name='noDok33' {...register("noDok33")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-3.3" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok33">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok33" name='tglDok33' {...register("tglDok33", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok63 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok33 && <small className="text-danger">{errors.tglDok33.message}</small>}
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
                                                <h5 className='mb-1'><b><u>Identitas Pemilik</u></b></h5>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="namaPengirim">Nama</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="namaPengirim" value={(data.listPtk ? data.listPtk.nama_pemohon : "") || ""} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatPengirim">Alamat</label>
                                                    <div className="col-sm-8">
                                                        <textarea name="alamatPengirim" className="form-control form-control-sm" disabled value={(data.listPtk ? data.listPtk.alamat_pemohon : "") || ""} id="alamatPengirim" rows="2" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasPengirim">Identitas</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitastPengirim" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.jenis_identitas_pemohon + " - " + data.listPtk.nomor_identitas_pemohon) : "") || ""} id="identitasPengirim" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <h5><b><u>Detail Media Pembawa</u></b></h5>
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
                            </div>
                            <div className="card">
                                <h2 className="accordion-header" id="headerAlasan">
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseAlasan" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>II. Detil Pelaksanaan Pengambilan Contoh</h5>
                                    </button>
                                </h2>
                                <div id="collapseAlasan">
                                    <div className="accordion-body">
                                        <div className='row'>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="lokasiMP">Lokasi MP<span className='text-danger'>*</span></label>
                                                    <div className="col-sm-6">
                                                        <input type="text" id="lokasiMP" name='lokasiMP' className={errors.lokasiMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Lokasi Media Pembawa.." {...register("lokasiMP", {required: "Mohon isi lokasi MP."})} />
                                                        {errors.lokasiMP && <small className="text-danger">{errors.lokasiMP.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tglSampling">Tgl Pengambilan Contoh<span className='text-danger'>*</span></label>
                                                    <div className="col-sm-3">
                                                        <input type="date" id="tglSampling" name='tglSampling' className={errors.lokasiMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Tgl Pengambilan Contoh.." {...register("tglSampling", {required: "Mohon isi tanggal pengambilan contoh."})} />
                                                        {errors.tglSampling && <small className="text-danger">{errors.tglSampling.message}</small>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="noRegPPC">Nomor Registrasi PPC</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" id="noRegPPC" className="form-control form-control-sm" placeholder="Nomor Registrasi Petugas Pengambil Contoh.." {...register("noRegPPC")} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-12 mb-3'>
                                                <div className='row'>
                                                    <label className="col-sm-2 col-form-label" htmlFor="namaPengirim">Tujuan Pengambilan Contoh<span className='text-danger'>*</span></label>
                                                    <div className="col-sm-3">
                                                        <div className="form-check mt-2">
                                                            <input className="form-check-input" type="checkbox" name="tujuan1" id="tujuan1" value="1" {...register("tujuan1")} />
                                                            <label className="form-check-label" htmlFor="tujuan1">Pemeriksaan visual</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" name="tujuan2" id="tujuan2" value="1" {...register("tujuan2")} />
                                                            <label className="form-check-label" htmlFor="tujuan2">Pemeriksaan kesehatan</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" name="tujuan3" id="tujuan3" value="1" {...register("tujuan3")} />
                                                            <label className="form-check-label" htmlFor="tujuan3">Uji keamanan/mutu pangan**)</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" name="tujuan4" id="tujuan4" value="1" {...register("tujuan4")} />
                                                            <label className="form-check-label" htmlFor="tujuan4">Residu pestisida</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" name="tujuan5" id="tujuan5" value="1" {...register("tujuan5")} />
                                                            <label className="form-check-label" htmlFor="tujuan5">Logam berat</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" name="tujuan6" id="tujuan6" value="1" {...register("tujuan6")} />
                                                            <label className="form-check-label" htmlFor="tujuan6">Mikotoksin</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="form-check mt-2">
                                                            <input className="form-check-input" type="checkbox" name="tujuan7" id="tujuan7" value="1" {...register("tujuan7")} />
                                                            <label className="form-check-label" htmlFor="tujuan7">Cemaran mikrobiologi</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" name="tujuan8" id="tujuan8" value="1" {...register("tujuan8")} />
                                                            <label className="form-check-label" htmlFor="tujuan8">Cemaran radioaktif</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" name="tujuan9" id="tujuan9" value="1" {...register("tujuan9")} />
                                                            <label className="form-check-label" htmlFor="tujuan9">Lainnya</label>
                                                            <input style={{display: (cekWatch.tujuan9 ? "block" : "none")}} type="text" className='form-control form-control-sm' placeholder='Lainnya..' {...register("tujuan9Text")} />
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" name="tujuan10" id="tujuan10" value="1" {...register("tujuan10")} />
                                                            <label className="form-check-label" htmlFor="tujuan10">Uji keamanan/mutu pakan</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" name="tujuan11" id="tujuan11" value="1" {...register("tujuan11")} />
                                                            <label className="form-check-label" htmlFor="tujuan11">Uji PRG, SDG, IAS</label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" name="tujuan12" id="tujuan12" value="1" {...register("tujuan12")} />
                                                            <label className="form-check-label" htmlFor="tujuan12">Pengujian Lainnya</label>
                                                            <input style={{display: (cekWatch.tujuan12 ? "block" : "none")}} type="text" className='form-control form-control-sm' placeholder='Pengujian Lainnya..' {...register("tujuan12Text")} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="catatan">Catatan Pengambilan Contoh</label>
                                                    <div className="col-sm-7">
                                                        <textarea name="catatan" id="catatan" rows="2" className='form-control form-control-sm' placeholder='Catatan..' {...register("catatan")}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h5><b><u>Detil Contoh</u></b>
                                            <button type='button' className='btn btn-xs btn-info' style={{marginLeft: "25px"}} data-bs-toggle="modal" data-bs-target="#modSampling">Tambah Data</button>
                                        </h5>
                                        <div className="table-responsive text-nowrap" style={{height: "150px"}}>
                                            <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Nama Komoditas (Umum/Latin)</th>
                                                        <th>Identitas Contoh</th>
                                                        <th>Nama/Kode Contoh</th>
                                                        <th>Kondisi/Suhu Contoh</th>
                                                        <th>Nomor Kontainer/Palka</th>
                                                        <th>Keterangan</th>
                                                        <th>Act</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listDetilSampel ? (listDetilSampel?.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.nama_umum_tercetak + " / " + item.nama_latin_tercetak}</td>
                                                                    <td>{item.identitas_contoh}</td>
                                                                    <td>{item.kode_contoh}</td>
                                                                    <td>{item.kondisi_contoh}</td>
                                                                    <td>{item.nomor_kontainer}</td>
                                                                    <td>{item.keterangan}</td>
                                                                    <td>
                                                                        <button type='button' className="btn btn-xs text-danger" data-index={index} onClick={() => handleDeleteDetilSampel(index)}><i className='fa-solid fa-trash'></i></button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : null
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <small>*Format penulisan desimal menggunakan titik ( . )</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3 mb-3">
                            <div className='col-sm-2 form-control-label' htmlFor="namaPemilik">Nama Pemilik<span className='text-danger'>*</span></div>
                            <div className="col-sm-4">
                                <input type="text" name='namaPemilik' id='namaPemilik' {...register("namaPemilik", {required: "Mohon isi nama pemikik."})} className={errors.namaPemilik ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}/>
                                {errors.namaPemilik && <small className="text-danger">{errors.namaPemilik.message}</small>}
                            </div>
                            <div className='col-sm-2 form-control-label text-sm-center' htmlFor="nikPemilik">NIK Pemilik<span className='text-danger'>*</span></div>
                            <div className="col-sm-4">
                                <input type="text" name='nikPemilik' id='nikPemilik' {...register("nikPemilik", {required: "Mohon isi NIK pemikik."})} className={errors.nikPemilik ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}/>
                                {errors.nikPemilik && <small className="text-danger">{errors.nikPemilik.message}</small>}
                            </div>
                        </div>
                        <div className="row mt-3 mb-3">
                            <div className='col-sm-2 form-control-label' htmlFor="ttdUser">Petugas Pengambil Contoh<span className='text-danger'>*</span></div>
                            <div className="col-sm-4">
                                <input type="text" name='ttdUser' id='ttdUser' {...register("ttdUser", {required: "Mohon pilih penandatangan."})} className={errors.ttdUser ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}/>
                                {errors.ttdUser && <small className="text-danger">{errors.ttdUser.message}</small>}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                        <button type="button" className="btn btn-danger me-sm-2 me-1">Hapus</button>
                    </form>
                </div>
            </div>
        </div>

        <div className="modal fade" id="modSampling" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-simple">
                <div className="modal-content p-1">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="text-center mb-4">
                            <h4>Tambah Data Detil Pelaksanaan Pengambilan Contoh</h4>
                        </div>
                        <form onSubmit={handleDetilSampel}>
                            <div className='row'>
                                <div className='col-sm-12 mb-3'>
                                    <div className='mb-2'>
                                        <label className="form-label" style={{marginTop: "10px"}} htmlFor="mpPeriksa">Media Pembawa</label>
                                        <Select styles={customStyles} defaultValue="" value={{id: detilSampel.idkom, label: detilSampel.idkomView} || ""} placeholder="Pilih Komoditas.." options={dataSelect.komoditas} onChange={(e) => setDetilSampel(values => ({...values, idkom: e.value.split(";")[0], volKom: e.value.split(";")[1], satKom: e.value.split(";")[2], idkomView: e.label, namaLatinTC: e.label.split(" | ")[1], namaKom: e.label.split(" | ")[0]}))} />
                                    </div>
                                    <div className='mb-2'>
                                        <label className="form-label" htmlFor="identitas">Identitas Contoh</label>
                                        <input type="text" className="form-control form-control-sm" id="identitas" name='identitas' placeholder="Identitas Contoh.." value={detilSampel.identitas || ""} onChange={(e) => setDetilSampel(values => ({...values, identitas: e.target.value}))} />
                                    </div>
                                    {/* <input type='hidden' name='namaUmum' id='namaUmum' value={detilSampel.namaKom || ""} />
                                    <input type='hidden' name='namaLatin' id='namaLatin' value={detilSampel.namaLatinTC || ""} /> */}
                                    <div className='mb-2'>
                                        <label className="form-label" htmlFor="kode">Nama/Kode Contoh</label>
                                        <input type="text" className="form-control form-control-sm" id="kode" name='kode' placeholder="Nama / Kode Contoh.." value={detilSampel.kode || ""} onChange={(e) => setDetilSampel(values => ({...values, kode: e.target.value}))} />
                                    </div>
                                    <div className='mb-2'>
                                        <label className="form-label" htmlFor="kondisi">Kondisi/Suhu Contoh</label>
                                        <input type="text" className="form-control form-control-sm" id="kondisi" name='kondisi' placeholder="Kondisi / Suhu Contoh.." value={detilSampel.kondisi || ""} onChange={(e) => setDetilSampel(values => ({...values, kondisi: e.target.value}))} />
                                    </div>
                                    <div className='mb-2'>
                                        <label className="form-label" htmlFor="jumlah">Jumlah Contoh</label>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <input type="text" className="form-control form-control-sm" id="jumlah" name='jumlah' placeholder="Jumlah Contoh.." value={detilSampel.jumlah ? (addCommas(removeNonNumeric(detilSampel.jumlah))) : ""} onChange={(e) => setDetilSampel(values => ({...values, jumlah: e.target.value}))} />
                                            </div>
                                            <div className="col-md-2">
                                                <input type="text" disabled className="form-control form-control-sm" id="satJumlah" name='satJumlah' value={detilSampel.satKom || ""} placeholder="Satuan.." />
                                            </div>
                                            <div className="col-md-7">
                                                <p>{detilSampel.volKom ? ("Total: " + addCommas(removeNonNumeric(detilSampel.volKom)) + " " + detilSampel.satKom) : ""}</p>
                                            </div>
                                        </div>
                                        <small className='text-danger'>*Format penulisan desimal menggunakan titik ( . )</small>
                                    </div>
                                    <div className='mb-2'>
                                        <label className="form-label" htmlFor="noKontainer">Nomor Kontainer / Palka</label>
                                        <input type="text" className="form-control form-control-sm" id="noKontainer" name='noKontainer' placeholder="Nomor Kontainer / Palka.." value={detilSampel.noKontainer || ""} onChange={(e) => setDetilSampel(values => ({...values, noKontainer: e.target.value}))} />
                                    </div>
                                    <div className='mb-2'>
                                        <label className="form-label" htmlFor="keterangan">Keterangan</label>
                                        <textarea className='form-control form-control-sm' name="keterangan" id="keterangan" rows="2" placeholder='Keterangan' value={detilSampel.keterangan || ""} onChange={(e) => setDetilSampel(values => ({...values, keterangan: e.target.value}))}></textarea>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-12 text-center'>
                                        <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                        <button type="button" className="btn btn-danger me-sm-2 me-1" data-bs-dismiss="modal" aria-label="Close">Tutup</button>
                                    </div>   
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

export default DocK33