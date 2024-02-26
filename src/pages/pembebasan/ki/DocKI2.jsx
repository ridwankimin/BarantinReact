/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import PtkHistory from '../../../model/PtkHistory'
import PtkModel from '../../../model/PtkModel'
import PnPelepasan from '../../../model/PnPelepasan'
import PtkSurtug from '../../../model/PtkSurtug'
import {decode as base64_decode} from 'base-64'
import ModaAlatAngkut from '../../../model/master/modaAlatAngkut.json'
import Peruntukan from '../../../model/master/peruntukan.json'
import Keterangan from '../../../model/master/keterangan.json'
import UptNew from '../../../model/master/uptNewGrouping.json'
import Cookies from 'js-cookie'
import { Controller, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import SpinnerDot from '../../../component/loading/SpinnerDot'
import PtkPemeriksaan from '../../../model/PtkPemeriksaan'
import Select from 'react-select'

const log = new PtkHistory()
const modelPemohon = new PtkModel()
const modelPelepasan = new PnPelepasan()
const modelSurtug = new PtkSurtug()
const modelPeriksa = new PtkPemeriksaan()

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");

function modaAlatAngkut(e){
    return ModaAlatAngkut.find((element) => element.id === parseInt(e))
}

function peruntukan(e){
    return Peruntukan.find((element) => element.id === parseInt(e))
}

function keterangan92i() {
    return Keterangan.filter((element) => element.dokumen === "K-9.2.I")
}

function listUptNew() {
    const dataUpt = UptNew.filter((element) => element.id !== 1 & element.id !== 77 & element.id !== 78 & element.id !== Cookies.get("uptId"))
    
    var arrayUpt = dataUpt.map(item => {
        return {
            value: item.id,
            label: item.nama,
        }
    })
    return arrayUpt
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
  };

function DocKI2() {
    const idPtk = Cookies.get("idPtkPage");
    let [loadKomoditi, setLoadKomoditi] = useState(false)
    let [loadKomoditiPesan, setLoadKomoditiPesan] = useState("")
    let [datasend, setDataSend] = useState([])

    let [data, setData] = useState({
        noAju: "",
        noIdPtk: "",
        noDokumen: "",
        tglDokumen: "",
    })

    const {
        register,
        setValue,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const cekWatch = watch()

    const onSubmit = (data) => {
        // alert("Submit")
        // console.log(data)
        const response = modelPelepasan.dokelKI(data);
        response
        .then((response) => {
            console.log(response.data)
            if(response.data) {
                if(response.data.status === '201') {
                    //start save history
                    // const log = new PtkHistory();
                    const resHsy = log.pushHistory(data.idPtk, "p8", "KI-2", (data.idDoki2 ? 'UPDATE' : 'NEW'));
                    resHsy
                    .then((response) => {
                        if(response.data.status === '201') {
                            console.log("history saved")
                        }
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
                    //end save history

                    // alert(response.data.status + " - " + response.data.message)
                    Swal.fire({
                        title: "Sukses!",
                        text: "Sertifikat Kesehatan Ikan dan Produk Ikan berhasil " + (data.idDoki2 ? "diedit." : "disimpan."),
                        icon: "success"
                    });
                    setValue("idDoki2", response.data.data.id)
                    setValue("noDoki2", response.data.data.nomor)
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

    const {
        register: registerMPki2,
        setValue: setValueMPki2,
        // control: controlMPki2,
        watch: watchMPki2,
        handleSubmit: handleFormMPki2,
        reset: resetFormKomoditiki2,
        formState: { errors: errorsMPki2 },
    } = useForm({
        defaultValues: {
            idMPki2: "",
            volumeNetto: "",
            volumeLain: "",
            satuanLain: "",
            namaUmum: "",
            namaLatin: "",
            jantanP8: "",
            betinaP8: "",
          }
        })

    const cekdataMPki2 = watchMPki2()

    function onSubmitMPki2(data) {
        log.updateKomoditiP8(data.idMPki2, data)
        .then((response) => {
            console.log(response)
            if(response.data.status === '201') {
                // alert(response.data.status + " - " + response.data.message)
                Swal.fire({
                    title: "Sukses!",
                    text: "Volume P8 berhasil diupdate",
                    icon: "success"
                });
                resetFormKomoditiki2()
                refreshListKomoditas()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function handleEditKomoditas(e) {
        // console.log(e.target.dataset.headerid)
        setValueMPki2("idMPki2", e.target.dataset.headerid)
        setValueMPki2("idPtk", e.target.dataset.ptk)
        setValueMPki2("jenisKar", "I")
        const cell = e.target.closest('tr')
        setValueMPki2("nettoP8", cell.cells[5].innerHTML)
        setValueMPki2("satuanNetto", cell.cells[6].innerHTML)
        setValueMPki2("volumeP8", cell.cells[7].innerHTML)
        setValueMPki2("satuanLain", cell.cells[8].innerHTML)
        setValueMPki2("namaUmum", cell.cells[3].innerHTML)
        setValueMPki2("namaLatin", cell.cells[4].innerHTML)
        setValueMPki2("volumeP8", cell.cells[7].innerHTML)
    }

    function handleEditKomoditasAll() {
        // console.log(datasend)
        setLoadKomoditi(true)
        data.listKomoditas?.map((item, index) => (
            log.updateKomoditiP8(item.id, datasend[index])
                .then((response) => {
                    if(response.data.status === '201') {
                        refreshListKomoditas()
                        setLoadKomoditi(false)
                        console.log("history saved")
                    }
                })
                .catch((error) => {
                    setLoadKomoditi(false)
                    setLoadKomoditiPesan("Terjadi error pada saat simpan, mohon refresh halaman dan coba lagi.")
                    console.log(error.response.data);
                })
            )
        )
        setLoadKomoditi(false)
    }

   function refreshListKomoditas() {
        const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, "H");
        resKom
        .then((res) => {
            if(res.data.status === '200') {
                setData(values => ({...values,
                    listKomoditas: res.data.data
                }));
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDoki2", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
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
                console.log("response.data ptk")
                console.log(response.data)
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        // alert(response.data.message);
                        setData(values => ({...values,
                            errorPTK: "",
                            listPtk: response.data.data.ptk,
                            // listKomoditas: response.data.data.ptk_komoditi,
                            listDokumen: response.data.data.ptk_dokumen
                        }));

                        const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), "H");
                        resKom
                        .then((res) => {
                            // console.log(res)
                            if(typeof res.data != "string") {
                                if(res.data.status == 200) {
                                    setData(values => ({...values,
                                        errorKomoditas: "",
                                        listKomoditas: res.data.data
                                    }));
                                    var arrayKomKH = res.data.data.map(item => {
                                        return {
                                            namaUmum: item.nama_umum_tercetak,
                                            namaLatin: item.nama_latin_tercetak,
                                            jantanP8: null,
                                            betinaP8: null,
                                            volumeP8: item.volume_lain,
                                            nettoP8: item.volume_netto
                                        }
                                    })
                                    setDataSend(arrayKomKH)
                                }
                            } else {
                                setData(values => ({...values,
                                    errorKomoditas: "Gagal load data Komoditas"
                                }));
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            setData(values => ({...values,
                                errorKomoditas: "Gagal load data Komoditas"
                            }));
                        });
                        
                        setValue("tandaKhusus", response.data.data.ptk.tanda_khusus)
                        setValue("karantinaTujuan", response.data.data.ptk.negara_penerima)
                        setValue("entryPoint", response.data.data.ptk.pelabuhan_bongkar + ", " + response.data.data.ptk.negara_bongkar)
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
                console.log(error.response);
                setData(values => ({...values,
                    errorPTK: "Gagal load data PTK",
                    errorKomoditas: "Gagal load data Komoditas"
                }));
            });

            const resPelId = modelPelepasan.getById(base64_decode(ptkNomor[1]), "I");
            resPelId
            .then((response) => {
                console.log("pelepasan ki")
                console.log(response.data)
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorki2: ""
                        }));
                        if(response.data.status == 200) {
                            setValue("idDoki2", response.data.data.id)
                            setValue("noDoki2", response.data.data.nomor)
                            setValue("tglDoki2", response.data.data.tanggal)
                            setValue("noSeri", response.data.data.nomor_seri)
                            setValue("jenisDokumen", response.data.data.status_dok)
                            setValue("hasilPemeriksaan", response.data.data.hasil_periksa)
                            setValue("hasilPemeriksaanKet1", response.data.data.p1)
                            setValue("hasilPemeriksaanKet2", response.data.data.p2)
                            setValue("hasilPemeriksaanKet3", response.data.data.p3)
                            setValue("hasilPemeriksaanKet4", response.data.data.p4)
                            setValue("isAttach", response.data.data.is_attachment)
                            setValue("ttdPutusan", response.data.data.user_ttd_id)
                            setValue("diterbitkan", response.data.data.diterbitkan_di)

                        }
                    } else {
                        setData(values => ({...values,
                            errorki2: "Gagal load data Sertifikat Kesehatan Ikan dan Produk Ikan"
                        }));
                    }
                }
            })
            .catch((error) => {
                console.log("error ki2");
                console.log(error);
                if(error.response) {
                    if(error.response.data.status == 404) {
                        setData(values => ({...values,
                            errorki2: "",
                        }));
                    } else {
                        setData(values => ({...values,
                            errorki2: "Gagal load data Sertifikat Kesehatan Ikan dan Produk Ikan",
                        }));
                    }
                }
            });

            const resFisik = modelPeriksa.getFisikByPtkId(base64_decode(ptkNomor[1]))
            resFisik
            .then((response) => {
                console.log("periksa fisik")
                console.log(response)
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorPeriksaFisik: ""
                        }));
                        if(response.data.status == '200') {
                            setValue("tglPeriksaAwal", response.data.data[0].tanggal ? response.data.data[0].tanggal.slice(0, 10) : "")
                            setValue("tglPeriksaAkhir", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,10))
                        } else {
                            setData(values => ({...values,
                                errorPeriksaFisik: "Gagal load data Pemeriksaan Fisik."
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorPeriksaFisik: "Gagal load data Pemeriksaan Fisik."
                        }));
                    }
                }
            })
            .catch((error) => {
                console.log("periksa fisik")
                console.log(error);
                if(error.response) {
                    if(error.response.data.status == 404) {
                        setData(values => ({...values,
                            errorPeriksaFisik: ""
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPeriksaFisik: "Gagal load data Pemeriksaan Fisik."
                        }));
                    }
                }
            });

            // 1: penugasan periksa administratif
            const resSurtug = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), 14);
            resSurtug
            .then((response) => {
                console.log(response.data)
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
                // alert(error.response.status + " - " + error.response.data.message)
                if(error.response) {
                    if(error.response.data.status == 404) {
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
    },[idPtk, setValue])

    function refreshData() {
        if(data.errorPTK) {
            const response = modelPemohon.getPtkId(data.noIdPtk);
            response
            .then((response) => {
                // console.log(response.data)
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        // alert(response.data.message);
                        setData(values => ({...values,
                            errorPTK: "",
                            listPtk: response.data.data.ptk,
                            // listKomoditas: response.data.data.ptk_komoditi,
                            listDokumen: response.data.data.ptk_dokumen
                        }));
    
                        setValue("tandaKhusus", response.data.data.ptk.tanda_khusus)
                        setValue("karantinaTujuan", response.data.data.ptk.negara_penerima)
                        setValue("entryPoint", response.data.data.ptk.pelabuhan_bongkar + ", " + response.data.data.ptk.negara_bongkar)
                        setValue("idPtk", data.noIdPtk)
                        setValue("noDokumen", data.noDokumen)
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK",
                        }));
                    }
                }
            })
            .catch((error) => {
                console.log(error.response);
                setData(values => ({...values,
                    errorPTK: "Gagal load data PTK",
                }));
            });
        }

        if(data.errorKomoditas) {
            const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, "H");
            resKom
            .then((res) => {
                // console.log(res)
                if(typeof res.data != "string") {
                    if(res.data.status == 200) {
                        setData(values => ({...values,
                            errorKomoditas: "",
                            listKomoditas: res.data.data
                        }));
                        var arrayKomKH = res.data.data.map(item => {
                            return {
                                namaUmum: item.nama_umum_tercetak,
                                namaLatin: item.nama_latin_tercetak,
                                jantanP8: null,
                                betinaP8: null,
                                volumeP8: item.volume_lain,
                                nettoP8: item.volume_netto
                            }
                        })
                        setDataSend(arrayKomKH)
                    }
                } else {
                    setData(values => ({...values,
                        errorKomoditas: "Gagal load data Komoditas"
                    }));
                }
            })
            .catch((error) => {
                console.log(error);
                setData(values => ({...values,
                    errorKomoditas: "Gagal load data Komoditas"
                }));
            });
        }

        if(data.errorki2) {
            const resPelId = modelPelepasan.getById(data.noIdPtk, "I");
            resPelId
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorki2: ""
                        }));
                        if(response.data.status == 200) {
                            setValue("idDoki2", response.data.data.id)
                            setValue("noDoki2", response.data.data.nomor)
                            setValue("tglDoki2", response.data.data.tanggal)
                            setValue("noSeri", response.data.data.nomor_seri)
                            setValue("jenisDokumen", response.data.data.status_dok)
                            setValue("hasilPemeriksaan", response.data.data.hasil_periksa)
                            setValue("hasilPemeriksaanKet1", response.data.data.p1)
                            setValue("hasilPemeriksaanKet2", response.data.data.p2)
                            setValue("hasilPemeriksaanKet3", response.data.data.p3)
                            setValue("hasilPemeriksaanKet4", response.data.data.p4)
                            setValue("isAttach", response.data.data.is_attachment)
                            setValue("ttdPutusan", response.data.data.user_ttd_id)
                            setValue("diterbitkan", response.data.data.diterbitkan_di)
    
                        }
                    } else {
                        setData(values => ({...values,
                            errorki2: "Gagal load data Sertifikat Kesehatan Ikan dan Produk Ikan"
                        }));
                    }
                }
            })
            .catch((error) => {
                console.log("error ki2");
                console.log(error);
                if(error.response) {
                    if(error.response.data.status == 404) {
                        setData(values => ({...values,
                            errorki2: "",
                        }));
                    } else {
                        setData(values => ({...values,
                            errorki2: "Gagal load data Sertifikat Kesehatan Ikan dan Produk Ikan",
                        }));
                    }
                }
            });
        }

        if(data.errorPeriksaFisik) {
            const resFisik = modelPeriksa.getFisikByPtkId(data.noIdPtk)
            resFisik
            .then((response) => {
                // // console.log(response.data)
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorPeriksaFisik: ""
                        }));
                        if(response.data.status == '200') {
                            setValue("tglPeriksaAwal", response.data.data[0].tanggal ? response.data.data[0].tanggal.slice(0, 10) : "")
                            setValue("tglPeriksaAkhir", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,10))
                        } else {
                            setData(values => ({...values,
                                errorPeriksaFisik: "Gagal load data Pemeriksaan Fisik."
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorPeriksaFisik: "Gagal load data Pemeriksaan Fisik."
                        }));
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                if(error.response) {
                    if(error.response.data.status == 404) {
                        setData(values => ({...values,
                            errorPeriksaFisik: ""
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPeriksaFisik: "Gagal load data Pemeriksaan Fisik."
                        }));
                    }
                }
            });
        }

        if(data.errorSurtug) {
            // 1: penugasan periksa administratif
            const resSurtug = modelSurtug.getDetilSurtugPenugasan(data.noIdPtk, 14);
            resSurtug
            .then((response) => {
                console.log(response.data)
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
                // alert(error.response.status + " - " + error.response.data.message)
                if(error.response) {
                    if(error.response.data.status == 404) {
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
    }
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            KI-2 <span className="fw-light" style={{color: 'blue'}}>(Sertifikat Kesehatan Ikan dan Produk Ikan)</span>
            
            <small className='float-end'>
                <span className='text-danger'>{(data.errorPTK ? data.errorPTK + "; " : "") + (data.errorKomoditas ? data.errorKomoditas + "; " : "") + (data.errorki2 ? data.errorki2 + "; " : "") + (data.errorPeriksaFisik ? data.errorPeriksaFisik + "; " : "") + (data.errorSurtug ? data.errorSurtug + "; " : "")}</span>
                {data.errorPTK || data.errorKomoditas || data.errorki2 || data.errorPeriksaFisik || data.errorSurtug ?
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
                        <input type="hidden" id='idDoki2' {...register("idDoki2")} />
                        <input type="hidden" id='idPtk' {...register("idPtk")} />
                        <input type="hidden" id='noDokumen' {...register("noDokumen")} />
                        <div className="col-md-12 mt-3">
                            <div className="row">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="jenisDokumen">Dokumen <span className='text-danger'>*</span></label>
                                <div className="col-sm-4">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="jenisDokumen" id="ISSUED" value="ISSUED" {...register("jenisDokumen", { required: "Mohon pilih jenis dokumen."})} />
                                        <label className="form-check-label" htmlFor="ISSUED">Baru</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="jenisDokumen" id="REPLACEMENT" value="REPLACEMENT" {...register("jenisDokumen")} />
                                        <label className="form-check-label" htmlFor="REPLACEMENT">Replacement</label>
                                    </div>
                                    {errors.jenisDokumen && <small className="text-danger">{errors.jenisDokumen.message}</small>}
                                </div>
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noSeri">No Seri <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="text" id="noSeri" name='noSeri' {...register("noSeri", {required: "Mohon isi Nomor seru."})} className={errors.noSeri ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.noSeri && <small className="text-danger">{errors.noSeri.message}</small>}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDoki2">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDoki2" name='noDoki2' {...register("noDoki2")} className="form-control form-control-sm" placeholder="Nomor Dokumen KI-2" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDoki2">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDoki2" name='tglDoki2' {...register("tglDoki2", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDoki2 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDoki2 && <small className="text-danger">{errors.tglDoki2.message}</small>}
                                </div>
                            </div>
                        </div>
                        <div className="accordion mb-4" id="collapseSection">
                            <div className="card">
                                <h2 className="accordion-header" id="headerKeterangan">
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseKeterangan" aria-expanded="true" aria-controls="collapseImporter">
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
                                                        <input type="text" id="namaPengirim" value={data.listPtk ? (data.listPtk.nama_pengirim) : ""} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h5 className='mb-1'><b><u>Identitas Penerima</u></b></h5>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="namaPenerima">Nama</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="namaPenerima" value={data.listPtk ? (data.listPtk.nama_penerima) : ""} disabled className="form-control form-control-sm" placeholder="Nama Penerima" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-1">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatPengirim">Alamat</label>
                                                    <div className="col-sm-8">
                                                        <textarea name="alamatPengirim" className="form-control form-control-sm" disabled value={data.listPtk ? (data.listPtk.alamat_pengirim) : ""} id="alamatPengirim" rows="2" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatPenerima">Alamat</label>
                                                    <div className="col-sm-8">
                                                        <textarea name="alamatPenerima" className="form-control form-control-sm" disabled value={data.listPtk ? (data.listPtk.alamat_penerima) : ""} id="alamatPenerima" rows="2" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasPengirim">Identitas</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitastPengirim" className="form-control form-control-sm" disabled value={data.listPtk ? ((data.listPtk.jenis_identitas_pengirim + " - " + data.listPtk.nomor_identitas_pengirim)) : ""} id="identitasPengirim" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasPenerima">Identitas</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasPenerima" className="form-control form-control-sm" disabled value={data.listPtk ? ((data.listPtk.jenis_identitas_penerima + " - " + data.listPtk.nomor_identitas_penerima)) : ""} id="identitasPenerima" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahAsal">{data.listPtk ? (data.listPtk.permohonan === "DK" ? "Daerah" : "Negara") : ""} Asal</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahAsal" className="form-control form-control-sm" disabled value={data.listPtk ? (data.listPtk.permohonan === "DK" ? data.listPtk.kota_asal : data.listPtk.negara_asal) : ""} id="daerahAsal" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahTujuan">{data.listPtk ? (data.listPtk.permohonan === "DK" ? "Daerah" : "Negara") : ""} Tujuan</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahTujuan" className="form-control form-control-sm" disabled value={data.listPtk ? (data.listPtk.permohonan === "DK" ? data.listPtk.kota_tujuan : data.listPtk.negara_tujuan) : ""} id="daerahTujuan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatKeluar">Tempat Pengiriman / Tgl</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatKeluar" className="form-control form-control-sm" disabled value={data.listPtk ? (data.listPtk.pelabuhan_muat + " / " + data.listPtk.tanggal_rencana_berangkat_terakhir) : ""} id="tempatKeluar" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatMasuk">Tempat Pemasukan / Tgl</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatMasuk" className="form-control form-control-sm" disabled value={data.listPtk ? (data.listPtk.pelabuhan_bongkar + " / " + data.listPtk.tanggal_rencana_tiba_terakhir) : ""} id="tempatMasuk" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatTransit">Tempat Transit</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatTransit" className="form-control form-control-sm" disabled value={data.listPtk ? (data.listPtk.pelabuhan_transit === null ? "-" : data.listPtk.pelabuhan_transit + ", " + data.listPtk.negara_transit) : ""} id="tempatTransit" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasAngkut">Jenis, Nama Alat Angkut</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasAngkut" className="form-control form-control-sm" disabled value={data.listPtk ? (modaAlatAngkut(data.listPtk.tipe_alat_angkut_terakhir_id).nama + ", " + data.listPtk.nama_alat_angkut_terakhir) : ""} id="identitasAngkut" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tujuanPengiriman">Tujuan Pengiriman</label>
                                                    <div className="col-sm-8">
                                                        <input name="tujuanPengiriman" className="form-control form-control-sm" disabled value={data.listPtk ? (peruntukan(data.listPtk.peruntukan_id).deksripsi) : ""} id="tempatTransit" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tglPelaksanaanKaarntina">Tanggal Pelaksanaan Tindakan Karantina <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-8">
                                                        <div className="input-group input-group-sm">
                                                            <input
                                                                type="date"
                                                                name='tglPeriksaAwal'
                                                                id='tglPeriksaAwal'
                                                                className={errors.tglPeriksaAwal ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                                                // className="form-control form-control-sm"
                                                                {...register("tglPeriksaAwal", {required: "Mohon isi tgl pemeriksaan tindakan Karantina Awal."})}
                                                            />
                                                            <span className="input-group-text">s/d</span>
                                                            <input
                                                                type="date"
                                                                name='tglPeriksaAkhir'
                                                                id='tglPeriksaAkhir'
                                                                className={errors.tglPeriksaAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                                                // className="form-control form-control-sm"
                                                                {...register("tglPeriksaAkhir", {required: "Mohon isi tgl pemeriksaan tindakan Karantina Akhir."})}
                                                            />
                                                        </div>
                                                        {errors.tglPeriksaAwal && <small className="text-danger">{errors.tglPeriksaAwal.message}</small>}
                                                        {errors.tglPeriksaAkhir && <small className="text-danger">{errors.tglPeriksaAkhir.message}</small>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatMasuk">UPT Tujuan <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-8">
                                                    <Controller
                                                            control={control}
                                                            name={"uptTujuan"}
                                                            className="form-control form-control-sm"
                                                            rules={{ required: (data.listPtk ? (data.listPtk.jenis_permohonan === "DK" ? "Mohon pilih UPT Tujuan." : false) : false)}}
                                                            render={({ field: {value,onChange, ...field } }) => (
                                                                <Select styles={customStyles} value={{id: cekWatch.uptTujuan, label: cekWatch.uptTujuanView}} onChange={(e) => setValue("uptTujuan", e.value) & setValue("uptTujuanView", e.label)} placeholder={"Pilih upt tujuan.."} {...field} options={listUptNew()} />
                                                            )}
                                                        />
                                                        {errors.uptTujuan && <small className="text-danger">{errors.uptTujuan.message}</small>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <h2 className="accordion-header" id="headerPerlakuan">
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapsePerlakuan" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>Uraian Media Pembawa
                                        </h5>
                                    </button>
                                </h2>
                                <div id="collapsePerlakuan">
                                    <div className="accordion-body">
                                        <div className="row">
                                        <h5 className='mb-1'><b><u>II.  Media Pembawa</u></b>
                                            {loadKomoditi ? <SpinnerDot/> : null}
                                            {data.listKomoditas ? 
                                            (loadKomoditi ? null : <button type='button' className='btn btn-sm btn-outline-secondary' onClick={handleEditKomoditasAll} style={{marginLeft: "15px"}}><i className='fa-solid fa-check-square text-success'></i> Tidak ada perubahan</button>) : null }
                                            <span className='text-danger'>{loadKomoditiPesan}</span>
                                            </h5>
                                            <div className='col-md-12 mb-3'>
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
                                                                <th>Volume P8</th>
                                                                <th>Netto P8</th>
                                                                <th>Act</th>
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
                                                                            <td>{data.volumeP8}</td>
                                                                            <td>{data.nettoP8}</td>
                                                                            <td>
                                                                                <button className="btn btn-default dropdown-item" type="button" onClick={handleEditKomoditas} data-headerid={data.id} data-ptk={data.ptk_id} data-bs-toggle="modal" data-bs-target="#modKomoditas"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</button>
                                                                            </td>
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
                                <h2 className="accordion-header" id="headerPerlakuan">
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapsePerlakuan" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>III. Pernyataan</h5>
                                    </button>
                                </h2>
                                <div id="collapsePerlakuan">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className='row'>
                                                    <div className="mt-1">
                                                    Hasil pemeriksaan: &emsp;
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="hasilPemeriksaan" id="klinis" value="KLINIS" {...register("hasilPemeriksaan", { required: "Mohon pilih hasil pemeriksaan yang sesuai."})} />
                                                            <label className="form-check-label" htmlFor="klinis">Klinis</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="hasilPemeriksaan" id="organoleptik" value="ORGANOLEPTIK" {...register("hasilPemeriksaan")} />
                                                            <label className="form-check-label" htmlFor="organoleptik">Organoleptik</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="hasilPemeriksaan" id="laboratoris" value="LABORATORIS" {...register("hasilPemeriksaan")} />
                                                            <label className="form-check-label" htmlFor="laboratoris">Laboratoris</label>
                                                        </div>
                                                        {errors.hasilPemeriksaan && <small className="text-danger">{errors.hasilPemeriksaan.message}</small>}
                                                    </div>
                                                </div>
                                                <p className='mb-0 mt-2'>menunjukkan bahwa Media Pembawa tersebut pada saat pemeriksaan :</p>
                                                {keterangan92i().map((data,index) => (
                                                    <div className="form-check" key={index}>
                                                        <label className="form-check-label" htmlFor={'hasilPemeriksaanKet' + (index+1)}>{data.deskripsi}</label>
                                                        <input className="form-check-input" type="checkbox" {...register('hasilPemeriksaanKet' + (index+1))} name={'hasilPemeriksaanKet' + (index+1)} value="1" id={'hasilPemeriksaanKet' + (index+1)} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-3'>
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
                                <input type="text" {...register("ttdPutusan", { required: "Mohon pilih nama penandatangan."})} className={errors.ttdPutusan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                {errors.ttdPutusan && <small className="text-danger">{errors.ttdPutusan.message}</small>}
                            </div>
                            <div className='col-sm-2 col-form-label text-sm-end'>Diterbitkan di</div>
                            <div className="col-sm-3 mb-3 pr-2">
                                <input type="text" {...register("diterbitkan", { required: "Mohon isi tempat terbit dokumen."})} className={errors.diterbitkan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                {errors.diterbitkan && <small className="text-danger">{errors.diterbitkan.message}</small>}
                            </div>
                        </div>
                        <div className="pt-2">
                            <div className="row">
                                <div className="offset-sm-2 col-sm-9">
                                    <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                    <button type="button" className="btn btn-danger btn-label-secondary me-sm-2 me-1">Batal</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    {/* <form className="card-body">
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="nomor_ki2">Nomor KI-2</label>
                            <div className="col-sm-4">
                                <input type="text" id="nomor_ki2" className="form-control form-control-sm" placeholder="Nomor KI-2" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label" htmlFor="tanggal_ki2">Tanggal</label>
                            <div className="col-sm-4">
                                <input type="text" id="tanggal_ki2" className="form-control form-control-sm" placeholder="Tanggal KI-2" disabled />
                            </div>
                        </div>
                        <hr className="my-4 mx-n4" />
                        <h6 className="mb-b fw-normal"><b>KETERANGAN MEDIA PEMBAWA</b></h6>
                        <label className="col-form-label" htmlFor="jenis_mp">Jenis dan Jumlah</label>
                        <button className="btn btn-xs btn-success">Tambah Media Pembawa</button>
                        <table className="table table-bordered table-hover table-striped dataTable">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>Jenis</th>
                                    <th>Nama Latin</th>
                                    <th>Nama Umum</th>
                                    <th>Jumlah</th>
                                    <th>Satuan</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <br />
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="nama_pemilik">Nama Pemilik/Pengirim</label>
                            <div className="col-sm-9">
                                <input type="text" id="nama_pemilik" className="form-control form-control-sm" placeholder="Nama Pemilik/Pengirim" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="alamat_pemilik">Alamat Pemilik/Pengirim</label>
                            <div className="col-sm-9">
                                <input type="text" id="alamat_pemilik" className="form-control form-control-sm" placeholder="Alamat Pemilik/Pengirim" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="nama_penerima">Nama Penerima/Tujuan</label>
                            <div className="col-sm-9">
                                <input type="text" id="nama_penerima" className="form-control form-control-sm" placeholder="Nama Penerima/Tujuan" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="alamat_penerima">Alamat Penerima/Tujuan</label>
                            <div className="col-sm-9">
                                <input type="text" id="alamat_penerima" className="form-control form-control-sm" placeholder="Alamat Penerima/Tujuan" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="area_tujuan">Area Tujuan</label>
                            <div className="col-sm-9">
                                <input type="text" id="area_tujuan" className="form-control form-control-sm" placeholder="Area Tujuan" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="pel_tujuan">Bandar Udara/Pelabuhan Tujuan</label>
                            <div className="col-sm-9">
                                <input type="text" id="pel_tujuan" className="form-control form-control-sm" placeholder="Bandar Udara/Pelabuhan Tujuan" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="tanggal_kirim">Tanggal Pengiriman</label>
                            <div className="col-sm-9">
                                <input type="text" id="tanggal_kirim" className="form-control form-control-sm" placeholder="Tanggal Pengiriman" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="tanggal_tpk">Tanggal Pelaksanaan Tindakan Karantina</label>
                            <div className="col-sm-9">
                                <input type="text" id="tanggal_tpk" className="form-control form-control-sm" placeholder="Tanggal Pelaksanaan Tindakan Karantina" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="alat_angkut">Alat Angkut</label>
                            <div className="col-sm-9">
                                <input type="text" id="alat_angkut" className="form-control form-control-sm" placeholder="Alat Angkut" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="syarat_lain">Persyaratan Lain</label>
                            <div className="col-sm-9">
                                <input type="text" id="syarat_lain" className="form-control form-control-sm" placeholder="Persyaratan Lain" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="tujuan_kirim">Tujuan Pengiriman</label>
                            <div className="col-sm-9">
                                <input type="text" id="tujuan_kirim" className="form-control form-control-sm" placeholder="Tujuan Pengiriman" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="hasil_periksa">Hasil Pemeriksaan</label>
                            <div className="col-sm-9">
                                <div className="form-check form-check-inline mt-3">
                                    <input className="form-check-input" type="checkbox" name="hasil_periksa" id="klinis" value="Klinis" />
                                    <label className="form-check-label" htmlFor="klinis">Klinis</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="hasil_periksa" id="organoleptik" value="Organoleptik" />
                                    <label className="form-check-label" htmlFor="organoleptik">Organoleptik</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="hasil_periksa" id="laboratoris" value="Laboratoris" />
                                    <label className="form-check-label" htmlFor="laboratoris">Laboratoris</label>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4 mx-n4" />
                        <h6 className="mb-b fw-normal"><b>Pernyataan</b></h6>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="pernyataan1" />
                            <label className="form-check-label" htmlFor="pernyataan1">
                                Bebas dari Hama dan Penyakit Ikan Karantina
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="pernyataan2" />
                            <label className="form-check-label" htmlFor="pernyataan2">
                                Memenuhi persyaratan keamanan dan Mutu Pangan atau Pakan
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="pernyataan3" />
                            <label className="form-check-label" htmlFor="pernyataan3">
                                Bebas dari kontaminan, dan/atau
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="pernyataan4" />
                            <label className="form-check-label" htmlFor="pernyataan4">
                                Memenuhi persyaratan lainnya.
                            </label>
                        </div>
                        <hr className="my-4 mx-n4" />
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label" htmlFor="penandatangan">Penandatangan Dokumen</label>
                            <div className="col-sm-4">
                                <input type="text" id="penandatangan" placeholder="Penandatangan" className="form-control form-control-sm" />
                            </div>
                        </div>
                        <center>
                            <button type="button" className="btn btn-label-primary">Simpan</button>
                        </center>
                    </form> */}
                </div>
            </div>
        </div>

        <div className="modal fade" id="modKomoditas" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content p-3 pb-1">
                    <div className="modal-body">
                        <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="text-center mb-4">
                            <h3 className="address-title">Perubahan Media Pembawa</h3>
                        </div>
                        <form onSubmit={handleFormMPki2(onSubmitMPki2)} className="row g-3">
                        <input type="hidden" name='idMPki2' {...registerMPki2("idMPki2")} />
                        <input type="hidden" name='idPtk' {...registerMPki2("idPtk")} />
                        <input type="hidden" name='jenisKar' {...registerMPki2("jenisKar")} />
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaUmum">Nama Umum Tercetak</label>
                                <input type='text' name="namaUmum" id="namaUmum" {...registerMPki2("namaUmum")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaLatin">Nama Latin Tercetak</label>
                                <input type='text' name="namaLatin" id="namaLatin" {...registerMPki2("namaLatin")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="nettoP8">Volume Netto Akhir-P8<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" name='nettoP8' id='nettoP8' value={cekdataMPki2.nettoP8 ? addCommas(removeNonNumeric(cekdataMPki2.nettoP8)) : ""} {...registerMPki2("nettoP8", {required: "Mohon isi volume netto."})} className={errorsMPki2.nettoP8 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanNetto' id='satuanNetto' {...registerMPki2("satuanNetto")} disabled />
                                    </div>
                                </div>
                                {errorsMPki2.volumeNetto && <small className="text-danger">{errorsMPki2.volumeNetto.message}</small>}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeP8">Volume Lain Akhir-P8</label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='volumeP8' id='volumeP8' value={cekdataMPki2.volumeP8 ? addCommas(removeNonNumeric(cekdataMPki2.volumeP8)) : ""} {...registerMPki2("volumeP8")} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanLain' id='satuanLain' {...registerMPki2("satuanLain")} disabled />
                                    </div>
                                </div>
                            </div>
                        <small className='text-danger'>*Format penulisan desimal menggunakan titik ( . )</small>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary me-sm-3 me-1">Simpan</button>
                            <button
                            type="reset"
                            className="btn btn-label-secondary"
                            data-bs-dismiss="modal"
                            aria-label="Close">
                            Tutup
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DocKI2