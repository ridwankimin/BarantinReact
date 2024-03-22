/* eslint-disable no-unused-vars */
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
import LoadBtn from '../../../component/loading/LoadBtn'
import PrintKI2 from '../../../component/cetak/pembebasan/PrintKI2'

const log = new PtkHistory()
const modelPemohon = new PtkModel()
const modelPelepasan = new PnPelepasan()
const modelSurtug = new PtkSurtug()
const modelPeriksa = new PtkPemeriksaan()

const addCommas = num => {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};
const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");

function listUptNewById(e) {
    if(e) {
        const dataUpt = UptNew.filter((element) => element.id == e)
        return dataUpt[0].nama
    } else {
        return ""
    }
}

function modaAlatAngkut(e){
    return ModaAlatAngkut.find((element) => element.id == parseInt(e))
}

function peruntukan(e){
    return Peruntukan.find((element) => element.id == parseInt(e))
}

function keterangan92i() {
    return Keterangan.filter((element) => element.dokumen == "K-9.2.I")
}

function listUptNew() {
    const dataUpt = UptNew.filter((element) => element.id != 1 & element.id != 77 & element.id != 78 & element.id != Cookies.get("uptId"))
    
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
    let [cekData, setCekData] = useState()
    let [datasend, setDataSend] = useState([])
    let [onLoad, setOnLoad] = useState(false)

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
    } = useForm({
        defaultValues: {
            noSeri: "*******"
        }
    })

    const cekWatch = watch()

    const onSubmit = (dataSubmit) => {
        const jenisPeriksa = [dataSubmit.isKlinis, data.isOrganoleptik, data.isLaboratoris]
        // console.log(jenisPeriksa)
        setOnLoad(true)
        const dataCekKom = data.listKomoditas?.filter(item => item.volumeP8 != null || item.nettoP8 != null)
        if(dataCekKom.length > 0) {
            const response = modelPelepasan.dokelKI(dataSubmit);
            response
            .then((response) => {
                setOnLoad(false)
                if(response.data) {
                    if(response.data.status == 201) {
                        //start save history
                        const resHsy = log.pushHistory(dataSubmit.idPtk, "p8", "KI-2", (dataSubmit.idDoki2 ? 'UPDATE' : 'NEW'));
                        resHsy
                        .then((response) => {
                            if(response.data.status == 201) {
                                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                                    console.log("history saved")
                                }
                            }
                        })
                        .catch((error) => {
                            if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                                console.log(error.response.data);
                            }
                        });
                        //end save history
    
                        Swal.fire({
                            title: "Sukses!",
                            text: "Sertifikat Kesehatan Ikan dan Produk Ikan berhasil " + (dataSubmit.idDoki2 ? "diedit." : "disimpan."),
                            icon: "success"
                        });
                        setValue("idDoki2", response.data.data.id)
                        setValue("noDoki2", response.data.data.nomor)
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
                setOnLoad(false)
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response.data.message
                });
            });
        } else {
            setOnLoad(false)
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Mohon isi volume P8"
            });
        }
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
        setOnLoad(true)
        let cekVolume = false
        if(parseFloat(typeof data.volumeP8 == "string" ? data.volumeP8.replace(/,/g, "") : data.volumeP8) > parseFloat(cekData.volumeP8) || parseFloat(typeof data.nettoP8 == "string" ? data.nettoP8.replace(/,/g, "") : data.nettoP8) > parseFloat(cekData.nettoP8)) {
            cekVolume = false 
        } else {
            cekVolume = true
        }
        if(cekVolume) {
            log.updateKomoditiP8(data.idMPki2, data)
            .then((response) => {
                setOnLoad(false)
                if(response.data.status == 201) {
                    Swal.fire({
                        title: "Sukses!",
                        text: "Volume P8 berhasil disimpan",
                        icon: "success"
                    });
                    resetFormKomoditiki2()
                    refreshListKomoditas()
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.data.message
                    })
                }
            })
            .catch((error) => {
                setOnLoad(false)
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response.data.message
                })
            })
        } else {
            setOnLoad(false)
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Volume input melebihi volume awal, mohon cek isian anda"
            })
        }
    }

    function handleEditKomoditas(e) {
        const dataMP = data.listKomoditas?.filter((element, index) => index == e)
        setValueMPki2("idMPki2", dataMP[0].id)
        setValueMPki2("idPtk", dataMP[0].ptk_id)
        setValueMPki2("jenisKar", "I")
        setCekData(values => ({...values,
            volumeP8: dataMP[0].volume_lain,
            nettoP8: dataMP[0].volume_netto,
            jantanP8: dataMP[0].jantan,
            betinaP8: dataMP[0].betina
        }));
        setValueMPki2("nettoP8", dataMP[0].volume_netto)
        setValueMPki2("satuanNetto", dataMP[0].sat_netto)
        setValueMPki2("volumeP8", dataMP[0].volume_lain)
        setValueMPki2("satuanLain", dataMP[0].sat_lain)
        setValueMPki2("namaUmum", dataMP[0].nama_umum_tercetak)
        setValueMPki2("namaLatin", dataMP[0].nama_latin_tercetak)
    }

    function handleEditKomoditasAll() {
        setLoadKomoditi(true)
        data.listKomoditas?.map((item, index) => (
            log.updateKomoditiP8(item.id, datasend[index])
            .then((response) => {
                if(response.data.status == 201) {
                    refreshListKomoditas()
                    setLoadKomoditi(false)
                    if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                        console.log("history saved")
                    }
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Volume P8 berhasil disimpan (tidak ada perubahan dengan volume awal)"
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.data.status
                    })
                }
            })
            .catch((error) => {
                setLoadKomoditi(false)
                setLoadKomoditiPesan("Terjadi error pada saat simpan, mohon refresh halaman dan coba lagi.")
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response.data.status
                })
            }))
        )
        setLoadKomoditi(true)
    }

   function refreshListKomoditas() {
        const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, "I");
        resKom
        .then((res) => {
            if(res.data.status == 200) {
                setData(values => ({...values,
                    listKomoditas: res.data.data
                }));
            }
        })
        .catch((error) => {
            if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
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
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorPTK: "",
                            listPtk: response.data.data.ptk,
                            // listKomoditas: response.data.data.ptk_komoditi,
                            listDokumen: response.data.data.ptk_dokumen
                        }));

                        const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), "I");
                        resKom
                        .then((res) => {
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
                            if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                                console.log(error)
                            }
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
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorPTK: "Gagal load data PTK",
                    errorKomoditas: "Gagal load data Komoditas"
                }));
            });

            const resPelId = modelPelepasan.getById(base64_decode(ptkNomor[1]), "I");
            resPelId
            .then((response) => {
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
                            setValue("uptTujuan", response.data.data.upt_tujuan_id)
                            setValue("uptTujuanView", response.data.data.upt_tujuan_id ? listUptNewById(response.data.data?.upt_tujuan_id) : "")
                            setValue("hasilPemeriksaan", response.data.data.hasil_periksa)
                            setValue("hasilPemeriksaanKet1", response.data.data.p1)
                            setValue("hasilPemeriksaanKet2", response.data.data.p2)
                            setValue("hasilPemeriksaanKet3", response.data.data.p3)
                            setValue("hasilPemeriksaanKet4", response.data.data.p4)
                            setValue("isAttach", response.data.data.is_attachment)
                            setValue("ttdPutusan", response.data.data.user_ttd_id?.toString())
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
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
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
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorPeriksaFisik: ""
                        }));
                        if(response.data.status == 200) {
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
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
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
            const resSurtug = modelSurtug.getSurtugByPtk(base64_decode(ptkNomor[1]), 14);
            resSurtug
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorSurtug: ""
                        }));
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                                petugas: response.data.data
                            }));
                            setValue("idSurtug", response.data.data[0].ptk_surtug_header_id)
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data Surat Tugas"
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
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
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
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
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorPTK: "Gagal load data PTK",
                }));
            });
        }

        if(data.errorKomoditas) {
            const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, "I");
            resKom
            .then((res) => {
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
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorKomoditas: "Gagal load data Komoditas"
                }));
            });
        }

        if(data.errorki2) {
            const resPelId = modelPelepasan.getById(data.noIdPtk, "I");
            resPelId
            .then((response) => {
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
                            setValue("uptTujuan", response.data.data.upt_tujuan_id)
                            setValue("uptTujuanView", response.data.data.upt_tujuan_id ? listUptNewById(response.data.data?.upt_tujuan_id) : "")
                            setValue("hasilPemeriksaan", response.data.data.hasil_periksa)
                            setValue("hasilPemeriksaanKet1", response.data.data.p1)
                            setValue("hasilPemeriksaanKet2", response.data.data.p2)
                            setValue("hasilPemeriksaanKet3", response.data.data.p3)
                            setValue("hasilPemeriksaanKet4", response.data.data.p4)
                            setValue("isAttach", response.data.data.is_attachment)
                            setValue("ttdPutusan", response.data.data.user_ttd_id?.toString())
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
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
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
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorPeriksaFisik: ""
                        }));
                        if(response.data.status == 200) {
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
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
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
            const resSurtug = modelSurtug.getSurtugByPtk(data.noIdPtk, 14);
            resSurtug
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorSurtug: ""
                        }));
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                                petugas: response.data.data
                            }));
                            setValue("idSurtug", response.data.data[0].ptk_surtug_header_id)
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data Surat Tugas"
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
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
    <div className="container-fluid flex-grow-1 container-p-y">
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
                                    <input type="text" id="noSeri" name='noSeri' disabled {...register("noSeri", {required: "Mohon isi Nomor seru."})} className={errors.noSeri ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
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
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahAsal">{data.listPtk ? (data.listPtk.permohonan == "DK" ? "Daerah" : "Negara") : ""} Asal</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahAsal" className="form-control form-control-sm" disabled value={data.listPtk ? (data.listPtk.permohonan == "DK" ? data.listPtk.kota_asal : data.listPtk.negara_asal) : ""} id="daerahAsal" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahTujuan">{data.listPtk ? (data.listPtk.permohonan == "DK" ? "Daerah" : "Negara") : ""} Tujuan</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahTujuan" className="form-control form-control-sm" disabled value={data.listPtk ? (data.listPtk.permohonan == "DK" ? data.listPtk.kota_tujuan : data.listPtk.negara_tujuan) : ""} id="daerahTujuan" />
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
                                                        <input name="tempatTransit" className="form-control form-control-sm" disabled value={data.listPtk ? (data.listPtk.pelabuhan_transit == null ? "-" : data.listPtk.pelabuhan_transit + ", " + data.listPtk.negara_transit) : ""} id="tempatTransit" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasAngkut">Jenis, Nama Alat Angkut</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasAngkut" className="form-control form-control-sm" disabled value={data.listPtk ? (modaAlatAngkut(data.listPtk.moda_alat_angkut_terakhir_id).nama + ", " + data.listPtk.nama_alat_angkut_terakhir) : ""} id="identitasAngkut" />
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
                                                                {...register("tglPeriksaAwal", {required: "Mohon isi tgl pemeriksaan tindakan Karantina Awal."})}
                                                            />
                                                            <span className="input-group-text">s/d</span>
                                                            <input
                                                                type="date"
                                                                name='tglPeriksaAkhir'
                                                                id='tglPeriksaAkhir'
                                                                className={errors.tglPeriksaAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                                                                {...register("tglPeriksaAkhir", {required: "Mohon isi tgl pemeriksaan tindakan Karantina Akhir."})}
                                                            />
                                                        </div>
                                                        {errors.tglPeriksaAwal && <small className="text-danger">{errors.tglPeriksaAwal.message}</small>}
                                                        {errors.tglPeriksaAkhir && <small className="text-danger">{errors.tglPeriksaAkhir.message}</small>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-4" style={{display: (data.listPtk?.jenis_permohonan == "DK" ? "block" : "none")}}>
                                            <div className="col-md-8">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tempatMasuk">UPT Tujuan <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-8">
                                                    <Controller
                                                            control={control}
                                                            name={"uptTujuan"}
                                                            className="form-control form-control-sm"
                                                            rules={{ required: (data.listPtk?.jenis_permohonan == "DK" ? "Mohon pilih UPT Tujuan." : false)}}
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
                                                                            <td className='text-end'>{data.volume_netto?.toLocaleString()}</td>
                                                                            <td>{data.sat_netto}</td>
                                                                            <td className='text-end'>{data.volume_lain?.toLocaleString()}</td>
                                                                            <td>{data.sat_lain}</td>
                                                                            <td className='text-end'>{data.volumeP8?.toLocaleString()}</td>
                                                                            <td className='text-end'>{data.nettoP8?.toLocaleString()}</td>
                                                                            <td>
                                                                                <button className="btn btn-default dropdown-item" type="button" onClick={() => handleEditKomoditas(index)} data-bs-toggle="modal" data-bs-target="#modKomoditas"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</button>
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
                                                            <input className="form-check-input" type="checkbox" name="isKlinis" id="klinis" value="KLINIS" {...register("isKlinis")} />
                                                            <label className="form-check-label" htmlFor="klinis">Klinis</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" name="isOrganoleptik" id="organoleptik" value="ORGANOLEPTIK" {...register("isOrganoleptik")} />
                                                            <label className="form-check-label" htmlFor="organoleptik">Organoleptik</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="checkbox" name="isLaboratoris" id="laboratoris" value="LABORATORIS" {...register("isLaboratoris")} />
                                                            <label className="form-check-label" htmlFor="laboratoris">Laboratoris</label>
                                                        </div>
                                                        {/* {errors.hasilPemeriksaan && <small className="text-danger">{errors.hasilPemeriksaan.message}</small>} */}
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
                                <select className={errors.ttdPutusan == '' ? 'form-select form-select-sm is-invalid' : 'form-select form-select-sm'} name="ttdPutusan" id="ttdPutusan" {...register("ttdPutusan", { required: "Mohon pilih penandatangan."})}>
                                    {data.petugas?.map((item, index) => (
                                        <option value={item.petugas_id} key={index} defaultValue={cekWatch.ttdPutusan}>{item.nama + " - " + item.nip}</option>
                                    ))}
                                </select>
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
                                    {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                                        <button type="submit" className="btn btn-primary me-sm-2 me-1"><i className='fa-solid fa-save me-sm-2 me-1'></i> Simpan</button>
                                    }
                                    <button type="button" className="btn btn-danger btn-label-secondary me-sm-2 me-1"><i className='fa-solid fa-cancel me-sm-2 me-1'></i> Batal</button>
                                    <button type="button" className="btn btn-warning btn-label-secondary me-sm-2 me-1" data-bs-toggle="modal" data-bs-target="#modPrint"><i className='fa-solid fa-print me-sm-2 me-1'></i> Print</button>
                                    <button type="button" style={{display: (cekWatch.idDoki2 ? "block" : "none")}} className="float-end btn btn-info btn-label-secondary"><i className='tf-icons fa-solid fa-paper-plane me-sm-2 me-1'></i> TTE</button>
                                </div>
                            </div>
                        </div>
                    </form>
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
                            {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                                <button type="submit" className="btn btn-primary me-sm-3 me-1">Simpan</button>
                            }
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
        <div className="modal fade" id="modPrint" tabIndex="-1">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content p-3 pb-1">
                    <div className="modal-body">
                        <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="text-center mb-4">
                            <h3 className="address-title">Cetak Dokumen</h3>
                        </div>
                        <PrintKI2 dataCetak={data} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DocKI2