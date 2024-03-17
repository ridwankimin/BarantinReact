/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import PtkHistory from '../../../model/PtkHistory';
import PtkModel from '../../../model/PtkModel';
import PnPelepasan from '../../../model/PnPelepasan';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import {decode as base64_decode} from 'base-64';
import PtkSurtug from '../../../model/PtkSurtug';
import ModaAlatAngkut from '../../../model/master/modaAlatAngkut.json';
import Keterangan from '../../../model/master/keterangan.json';
import UptNew from '../../../model/master/uptNewGrouping.json';
import SpinnerDot from '../../../component/loading/SpinnerDot';
import Select from 'react-select';
import Swal from 'sweetalert2';
import PrintKh1 from '../../../component/cetak/pembebasan/PrintKh1';
import LoadBtn from '../../../component/loading/LoadBtn';

const log = new PtkHistory()
const modelPemohon = new PtkModel()
const modelPelepasan = new PnPelepasan()
const modelSurtug = new PtkSurtug()

const addCommas = num => {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};
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

function DocKH1() {
    const idPtk = Cookies.get("idPtkPage");
    let [loadKomoditi, setLoadKomoditi] = useState(false)
    let [cekData, setCekData] = useState()
    let [loadKomoditiPesan, setLoadKomoditiPesan] = useState("")
    let [datasend, setDataSend] = useState([])
    let [onLoad, setOnLoad] = useState(false)

    let [data, setData] = useState({
        noAju: "",
        noIdPtk: "",
        noDokumen: "",
        tglDokumen: "",
    })

    function keterangankh1() {
        return Keterangan.filter((element) => element.dokumen == "KH-1")
    }

    function listUptNew() {
        const dataUpt = UptNew.filter((element) => element.id != 1 & element.id != 77 & element.id != 78)
        
        var arrayUpt = dataUpt.map(item => {
            return {
                value: item.id,
                label: item.nama,
            }
        })
        return arrayUpt
    }
    
    function pernyataankh1() {
        return Keterangan.filter((element) => element.flag == "PERNYATAAN" & element.karantina == "H")
    }

    function modaAlatAngkut(e){
        return ModaAlatAngkut.find((element) => element.id == parseInt(e))
    }

    function handleEditKomoditas(e) {
        const dataMP = data.listKomoditas?.filter((element, index) => index == e)
        setValueMPkh1("idMPkh1", dataMP[0].id)
        setValueMPkh1("idPtk", dataMP[0].ptk_id)
        setValueMPkh1("jenisKar", Cookies.get("jenisKarantina"))
        setCekData(values => ({...values,
            volumeP8: dataMP[0].volume_lain,
            nettoP8: dataMP[0].volume_netto,
            jantanP8: dataMP[0].jantan,
            betinaP8: dataMP[0].betina
        }));
        setValueMPkh1("nettoP8", dataMP[0].volume_netto)
        setValueMPkh1("satuanNetto", dataMP[0].sat_netto)
        setValueMPkh1("volumeP8", dataMP[0].volume_lain)
        setValueMPkh1("satuanLain", dataMP[0].sat_lain)
        setValueMPkh1("jantanP8", dataMP[0].jantan)
        setValueMPkh1("betinaP8", dataMP[0].betina)
        setValueMPkh1("namaUmum", dataMP[0].nama_umum_tercetak)
        setValueMPkh1("namaLatin", dataMP[0].nama_latin_tercetak)
    }

    function handleEditKomoditasAll() {
        setLoadKomoditi(true)
        data.listKomoditas?.map((item, index) => (
            log.updateKomoditiP8(item.id, datasend[index])
            .then((response) => {
                if(response.data.status == 201) {
                    refreshListKomoditas()
                    setLoadKomoditi(false)
                    if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response.data.status
                })
            }))
        )
        setLoadKomoditi(false)
    }

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
    });

    const cekWatch = watch()

    const onSubmit = (data) => {
        setOnLoad(true)
        const dataCekKom = data.listKomoditas?.filter(item => item.volumeP8 == null || item.nettoP8 == null)
        const dataCekKomJanBen = data.listKomoditas?.filter(item => (item.jantan != null && item.jantanP8 == null) || (item.betina != null && item.betinaP8 == null))
        if(dataCekKom.length == 0 && dataCekKomJanBen.length == 0) {
            const response = modelPelepasan.eksporDokelHewanHidup(data);
            response
            .then((response) => {
                setOnLoad(false)
                if(response.data) {
                    if(response.data.status == 201) {
                        //start save history
                        // const log = new PtkHistory();
                        const resHsy = log.pushHistory(data.idPtk, "p8", "KH-1", (data.idDokh1 ? 'UPDATE' : 'NEW'));
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
                            icon: "success",
                            title: "Sukses!",
                            text: "Sertifikat kesehatan hewan berhasil " + (data.idDokh1 ? 'diedit' : 'disimpan')
                        })
                        setValue("idDokh1", response.data.data.id)
                        setValue("noDokh1", response.data.data.nomor)
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: response.data.message
                        })
                    }
                }
            })
            .catch((error) => {
                setOnLoad(false)
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response.data.message
                })
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

    function refreshListKomoditas() {
        const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, "H");
        resKom
        .then((res) => {
            if(res.data.status == 200) {
                setData(values => ({...values,
                    listKomoditas: res.data.data
                }));
            }
        })
        .catch((error) => {
            if(import.meta.env.VITE_BE_ENV == "DEV") {
                console.log(error)
            }
        });
    }

    const {
        register: registerMPkh1,
        setValue: setValueMPkh1,
        // control: controlMPkh1,
        watch: watchMPkh1,
        handleSubmit: handleFormMPkh1,
        reset: resetFormKomoditikh1,
        formState: { errors: errorsMPkh1 },
    } = useForm({
        defaultValues: {
            idMPkh1: "",
            volumeNetto: "",
            volumeLain: "",
            satuanLain: "",
            namaUmum: "",
            namaLatin: "",
            jantanP8: "",
            betinaP8: "",
          }
        })

    const cekdataMPkh1 = watchMPkh1()

    function onSubmitMPkh1(data) {
        setOnLoad(true)
        let cekVolume = false
        if((data.jantanP8 != null) || (data.betinaP8 != null) ) {
            if((parseFloat(typeof data.jantanP8 == "string" ? data.jantanP8.replace(/,/g, "") : data.jantanP8) > parseFloat(cekData.jantanP8)) || (parseFloat((typeof data.betinaP8 == "string" ? data.betinaP8.replace(/,/g, "") : data.betinaP8)) > parseFloat(cekData.betinaP8))) {
                cekVolume = false
            } else {
                if(parseFloat(typeof data.volumeP8 == "string" ? data.volumeP8.replace(/,/g, "") : data.volumeP8) > parseFloat(cekData.volumeP8) || parseFloat(typeof data.nettoP8 == "string" ? data.nettoP8.replace(/,/g, "") : data.nettoP8) > parseFloat(cekData.nettoP8)) {
                    cekVolume = false 
                } else {
                    cekVolume = true
                }
            }
        }
        if(cekVolume) {
            log.updateKomoditiP8(data.idMPkh1, data)
            .then((response) => {
                setOnLoad(false)
                if(response.data.status == 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Volume P8 berhasil diubah"
                    })
                    resetFormKomoditikh1()
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
                if(import.meta.env.VITE_BE_ENV == "DEV") {
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

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDokh1", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
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
                            errorPTKPage: "",
                            // mpTercetak: namaUmumMP.join(";"),
                            listPtk: response.data.data.ptk,
                            // listKomoditas: response.data.data.ptk_komoditi,
                            listDokumen: response.data.data.ptk_dokumen
                        }));

                        const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), "H");
                        resKom
                        .then((response) => {
                            if(typeof response.data != "string") {
                                if(response.data.status == 200) {
                                    setData(values => ({...values,
                                        errorKomoditi: "",
                                        listKomoditas: response.data.data
                                    }));
                                    var arrayKomKH = response.data.data.map(item => {
                                        return {
                                            namaUmum: item.nama_umum_tercetak,
                                            namaLatin: item.nama_latin_tercetak,
                                            jantanP8: item.jantan,
                                            betinaP8: item.betina,
                                            volumeP8: item.volume_lain,
                                            nettoP8: item.volume_netto
                                        }
                                    })
                                    setDataSend(arrayKomKH)
                                } else {
                                    setData(values => ({...values,
                                        errorKomoditi: "Gagal load data komoditas"
                                    }));
                                }
                            } else {
                                setData(values => ({...values,
                                    errorKomoditi: "Gagal load data komoditas"
                                }))
                            }
                        })
                        .catch((error) => {
                            if(import.meta.env.VITE_BE_ENV == "DEV") {
                                console.log(error)
                            }
                            setData(values => ({...values,
                                errorKomoditi: "Gagal load data komoditas"
                            }))
                        });
                        
                        setValue("tandaKhusus", response.data.data.ptk.tanda_khusus)
                        setValue("karantinaTujuan", response.data.data.ptk.negara_penerima)
                        setValue("entryPoint", response.data.data.ptk.pelabuhan_bongkar + ", " + response.data.data.ptk.negara_bongkar)
                        setValue("idPtk", base64_decode(ptkNomor[1]))
                        setValue("noDokumen", base64_decode(ptkNomor[2]))
                    } else {
                        setData(values => ({...values,
                            errorPTKPage: "Gagal load data PTK",
                            errorKomoditi: "Gagal load data komoditas"
                        })); 
                    }
                } else {
                    setData(values => ({...values,
                        errorPTKPage: "Gagal load data PTK",
                        errorKomoditi: "Gagal load data komoditas"
                    })); 
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorPTKPage: "Gagal load data PTK",
                    errorKomoditi: "Gagal load data komoditas"
                })); 
            });

            const resSurtug = modelSurtug.getSurtugByPtk(base64_decode(ptkNomor[1]), 14);
            resSurtug
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorSurtugPage: "",
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                                petugas: response.data.data
                            }));
                            setValue("idSurtug", response.data.data[0].ptk_surtug_header_id)
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorSurtugPage: "Surat tugas belum ada/belum dibuat"
                            }))
                        } else {
                            setData(values => ({...values,
                                errorSurtugPage: "Gagal load data surat tugas"
                            }))
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtugPage: "Gagal load data surat tugas"
                        }))
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
                            errorSurtugPage: "Surat tugas belum ada/belum dibuat"
                        }))
                    } else {
                        setData(values => ({...values,
                            errorSurtugPage: "Gagal load data surat tugas"
                        }))
                    }
                }
            });

            const resPelId = modelPelepasan.getById(base64_decode(ptkNomor[1]), "H");
            resPelId
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorKH1Page: "",
                                dataKH1: response.data.data
                            }))
                            setValue("idDokh1", response.data.data.id)
                            setValue("noDokh1", response.data.data.nomor)
                            setValue("tglDokh1", response.data.data.tanggal)
                            setValue("noSeri", response.data.data.nomor_seri)
                            setValue("jenisDokumen", response.data.data.status_dok)
                            setValue("m1", response.data.data.m1 !== null ? response.data.data.m1.toString() : "")
                            setValue("m2", response.data.data.m2 !== null ? response.data.data.m2.toString() : "")
                            setValue("m3", response.data.data.m3 !== null ? response.data.data.m3.toString() : "")
                            setValue("m4", response.data.data.m_lain !== null ? "1" : "")
                            setValue("m4Lain", response.data.data.m_lain)
                            setValue("p1", response.data.data.p_teknis)
                            setValue("p2", response.data.data.p_lab)
                            setValue("p3", response.data.data.p_lain)
                            setValue("isAttach", response.data.data.is_attachment !== null ? response.data.data.is_attachment.toString() : "")
                            setValue("ttdPutusan", response.data.data.user_ttd_id?.toString())
                            setValue("diterbitkan", response.data.data.diterbitkan_di)
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorKH1Page: ""
                            }))
                        } else {
                            setData(values => ({...values,
                                errorKH1Page: "Gagal load data KH-1"
                            }))
                        }
                    } else {
                        setData(values => ({...values,
                            errorKH1Page: "Gagal load data KH-1"
                        }))
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
                            errorKH1Page: ""
                        }))
                    } else {
                        setData(values => ({...values,
                            errorKH1Page: "Gagal load data KH-1"
                        }))
                    }
                }
            });
        }
    },[idPtk, setValue])

    function refreshData() {
        if(data.errorPTKPage) {
            const response = modelPemohon.getPtkId(data.noIdPtk);
            response
            .then((response) => {
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorPTKPage: "",
                            // mpTercetak: namaUmumMP.join(";"),
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
                            errorPTKPage: "Gagal load data PTK"
                        })); 
                    }
                } else {
                    setData(values => ({...values,
                        errorPTKPage: "Gagal load data PTK"
                    })); 
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorPTKPage: "Gagal load data PTK"
                })); 
            });
        }

        if(data.errorKomoditi) {
            const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, "H");
            resKom
            .then((response) => {
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorKomoditi: "",
                            listKomoditas: response.data.data
                        }));
                        var arrayKomKH = response.data.data.map(item => {
                            return {
                                namaUmum: item.nama_umum_tercetak,
                                namaLatin: item.nama_latin_tercetak,
                                jantanP8: item.jantan,
                                betinaP8: item.betina,
                                volumeP8: item.volume_lain,
                                nettoP8: item.volume_netto
                            }
                        })
                        setDataSend(arrayKomKH)
                    } else {
                        setData(values => ({...values,
                            errorKomoditi: "Gagal load data komoditas"
                        }));
                    }
                } else {
                    setData(values => ({...values,
                        errorKomoditi: "Gagal load data komoditas"
                    }))
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorKomoditi: "Gagal load data komoditas"
                }))
            });
        }

        if(data.errorKH1Page) {
            const resPelId = modelPelepasan.getById(data.noIdPtk, "H");
            resPelId
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorKH1Page: "",
                                dataKH1: response.data.data
                            }))
                            setValue("idDokh1", response.data.data.id)
                            setValue("noDokh1", response.data.data.nomor)
                            setValue("tglDokh1", response.data.data.tanggal)
                            setValue("noSeri", response.data.data.nomor_seri)
                            setValue("jenisDokumen", response.data.data.status_dok)
                            setValue("m1", response.data.data.m1 !== null ? response.data.data.m1.toString() : "")
                            setValue("m2", response.data.data.m2 !== null ? response.data.data.m2.toString() : "")
                            setValue("m3", response.data.data.m3 !== null ? response.data.data.m3.toString() : "")
                            setValue("m4", response.data.data.m_lain !== null ? "1" : "")
                            setValue("m4Lain", response.data.data.m_lain)
                            setValue("p1", response.data.data.p_teknis)
                            setValue("p2", response.data.data.p_lab)
                            setValue("p3", response.data.data.p_lain)
                            setValue("isAttach", response.data.data.is_attachment !== null ? response.data.data.is_attachment.toString() : "")
                            setValue("ttdPutusan", response.data.data.user_ttd_id?.toString())
                            setValue("diterbitkan", response.data.data.diterbitkan_di)
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorKH1Page: ""
                            }))
                        } else {
                            setData(values => ({...values,
                                errorKH1Page: "Gagal load data KH-1"
                            }))
                        }
                    } else {
                        setData(values => ({...values,
                            errorKH1Page: "Gagal load data KH-1"
                        }))
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
                            errorKH1Page: ""
                        }))
                    } else {
                        setData(values => ({...values,
                            errorKH1Page: "Gagal load data KH-1"
                        }))
                    }
                }
            });
        }

        if(data.errorSurtugPage) {
            const resSurtug = modelSurtug.getSurtugByPtk(data.noIdPtk, 14);
            resSurtug
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorSurtugPage: "",
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                                petugas: response.data.data
                            }));
                            setValue("idSurtug", response.data.data[0].ptk_surtug_header_id)
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorSurtugPage: "Surat tugas belum ada/belum dibuat"
                            }))
                        } else {
                            setData(values => ({...values,
                                errorSurtugPage: "Gagal load data surat tugas"
                            }))
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtugPage: "Gagal load data surat tugas"
                        }))
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
                            errorSurtugPage: "Surat tugas belum ada/belum dibuat"
                        }))
                    } else {
                        setData(values => ({...values,
                            errorSurtugPage: "Gagal load data surat tugas"
                        }))
                    }
                }
            });
        }
    }
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            KH-1 <span className="fw-light" style={{color: 'blue'}}>SERTIFIKAT KESEHATAN HEWAN</span>

            <small className='float-end'>
                <span className='text-danger'>{(data.errorPTKPage ? data.errorPTKPage + "; " : "") + (data.errorSurtugPage ? data.errorSurtugPage + "; " : "") + (data.errorKomoditi ? data.errorKomoditi + "; " : "") + (data.errorKH1Page ? data.errorKH1Page + "; " : "")}</span>
                {data.errorPTKPage || data.errorSurtugPage || data.errorKomoditi || data.errorKH1Page ?
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
                        <input type="hidden" id='idDokh1' {...register("idDokh1")} />
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
                                    <input type="text" id="noSeri" name='noSeri' disabled {...register("noSeri", {required: "Mohon isi Nomor seri."})} className={errors.noSeri ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.noSeri && <small className="text-danger">{errors.noSeri.message}</small>}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDokh1">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDokh1" name='noDokh1' {...register("noDokh1")} className="form-control form-control-sm" placeholder="Nomor Dokumen KH-1" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDokh1">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDokh1" name='tglDokh1' {...register("tglDokh1", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDokh1 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDokh1 && <small className="text-danger">{errors.tglDokh1.message}</small>}
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
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatKeluar">Tempat Pengeluaran / Tgl Muat</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatKeluar" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.pelabuhan_muat + " / " + data.listPtk.tanggal_rencana_berangkat_terakhir) : "") || ""} id="tempatKeluar" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatMasuk">Tempat Pemasukan / Tgl Bongkar</label>
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
                                        <div className="row mb-4" style={{display: (data.listPtk?.jenis_permohonan == "DK" ? "block" : "none")}}>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatTransit">Upt Tujuan</label>
                                                    <div className="col-sm-8">
                                                        <Controller
                                                            control={control}
                                                            name={"uptTujuan"}
                                                            className="form-control form-control-sm"
                                                            rules={{ required: (data.listPtk?.jenis_permohonan == "DK" ? "Mohon pilih UPT Tujuan." : false)}}
                                                            render={({ field: {value, ...field } }) => (
                                                                <Select styles={customStyles} value={value ? {id: cekWatch.uptTujuan, label: cekWatch.uptTujuanView} : ""} onChange={(e) => setValue("uptTujuan", e.value) & setValue("uptTujuanView", e.label)} placeholder={"Pilih upt tujuan.."} {...field} options={listUptNew()} />
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
                                            (loadKomoditi ? null : <button type='button' className='btn btn-sm btn-outline-secondary' onClick={handleEditKomoditasAll} style={{marginLeft: "15px"}}><i className='fa-solid fa-check-square text-success me-sm-2 me-1'></i> Tidak ada perubahan</button>) : null }
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
                                                                <th>Jantan</th>
                                                                <th>Betina</th>
                                                                <th>Volume P8</th>
                                                                <th>Netto P8</th>
                                                                <th>Jantan P8</th>
                                                                <th>Betina P8</th>
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
                                                                            <td className='text-end'>{data.jantan?.toLocaleString()}</td>
                                                                            <td className='text-end'>{data.betina?.toLocaleString()}</td>
                                                                            <td className='text-end'>{data.volumeP8?.toLocaleString()}</td>
                                                                            <td className='text-end'>{data.nettoP8?.toLocaleString()}</td>
                                                                            <td className='text-end'>{data.jantanP8?.toLocaleString()}</td>
                                                                            <td className='text-end'>{data.betinaP8?.toLocaleString()}</td>
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
                                                {keterangankh1().map((data, index) => (
                                                    <div className="form-check" key={index}>
                                                        <input className="form-check-input" type="checkbox" {...register("m" + (index+1))} value={1} id={"m" + (index+1)} />
                                                        <label className="form-check-label" htmlFor={"m" + (index+1)}>
                                                            {data.deskripsi}
                                                        </label>
                                                        {index == 3 ?
                                                        <div className='col-md-4' style={{display: (cekWatch.m4 == '1' ? 'block' : 'none')}}>
                                                            <input type="text" placeholder='Lainnya..' className={errors.m4Lain ? "form-control form-control-sm is-invalid ml-2" : "form-control form-control-sm ml-2"} {...register("m4Lain", {required: (cekWatch.m4 == '1' ? "Mohon isi keterangan lainnya.." : false)})} />
                                                            {errors.m4Lain && <small className="text-danger">{errors.m4Lain.message}</small>}
                                                        </div>
                                                        : null}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <h2 className="accordion-header" id="headerPerlakuan">
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapsePerlakuan" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>Deklarasi</h5>
                                    </button>
                                </h2>
                                <div id="collapsePerlakuan">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <ul>
                                                    {pernyataankh1().map((data, index) => (
                                                        <li key={(index+1)}>
                                                            <label htmlFor={"p" + (index+1)}>{data.deskripsi}</label>
                                                            <textarea name={"p" + (index+1)} id={"p" + (index+1)} {...register("p" + (index+1))} rows="2" className='form-control form-control-sm mb-4'></textarea>
                                                        </li>
                                                    ))}
                                                </ul>
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
                                    <option value="">--</option>
                                    {data.petugas?.map((item, index) => (
                                        <option value={item.petugas_id} key={index}>{item.nama + " - " + item.nip}</option>
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
                                    <button type="button" style={{display: (cekWatch.idDokh1 ? "block" : "none")}} className="float-end btn btn-info btn-label-secondary"><i className='tf-icons fa-solid fa-paper-plane me-sm-2 me-1'></i> TTE</button>
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
                        <form onSubmit={handleFormMPkh1(onSubmitMPkh1)} className="row g-3">
                        <input type="hidden" name='idMPkh1' {...registerMPkh1("idMPkh1")} />
                        <input type="hidden" name='idPtk' {...registerMPkh1("idPtk")} />
                        <input type="hidden" name='jenisKar' {...registerMPkh1("jenisKar")} />
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaUmum">Nama Umum Tercetak</label>
                                <input type='text' name="namaUmum" id="namaUmum" {...registerMPkh1("namaUmum")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaLatin">Nama Latin Tercetak</label>
                                <input type='text' name="namaLatin" id="namaLatin" {...registerMPkh1("namaLatin")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="nettoP8">Volume Netto Akhir-P8<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" name='nettoP8' id='nettoP8' value={(cekdataMPkh1.nettoP8 ? addCommas(removeNonNumeric(cekdataMPkh1.nettoP8)) : "") || ""} {...registerMPkh1("nettoP8", {required: "Mohon isi volume netto."})} className={errorsMPkh1.nettoP8 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanNetto' id='satuanNetto' {...registerMPkh1("satuanNetto")} disabled />
                                    </div>
                                </div>
                                {errorsMPkh1.volumeNetto && <small className="text-danger">{errorsMPkh1.volumeNetto.message}</small>}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeP8">Volume Lain Akhir-P8</label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='volumeP8' id='volumeP8' value={(cekdataMPkh1.volumeP8 ? addCommas(removeNonNumeric(cekdataMPkh1.volumeP8)) : "") || ""} {...registerMPkh1("volumeP8")} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanLain' id='satuanLain' {...registerMPkh1("satuanLain")} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6" style={{display: (data.listPtk ? (data.listPtk.jenis_media_pembawa_id == 1 ? "block" : "none") : "none")}}>
                                <label className="form-label" htmlFor="jantanP8">Jumlah Jantan Akhir-P8<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-3" style={{paddingRight: '2px'}}>
                                        <input type="text" name='jantanP8' id='jantanP8' value={(cekdataMPkh1.jantanP8 ? addCommas(removeNonNumeric(cekdataMPkh1.jantanP8)) : "") || ""} {...registerMPkh1("jantanP8", {required: (data.listPtk ? (data.listPtkjenis_media_pembawa_id == 1 ? "Mohon isi jumlah akhir Jantan." : false) : false)})} className={errorsMPkh1.jantanP8 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-2" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanjantanP8' id='satuanjantanP8' value={"EKR"} disabled />
                                    </div>
                                </div>
                                {errorsMPkh1.jantanP8 && <small className="text-danger">{errorsMPkh1.jantanP8.message}</small>}
                            </div>
                            <div className="col-6" style={{display: (data.listPtk ? (data.listPtk.jenis_media_pembawa_id == 1 ? "block" : "none") : "none")}}>
                                <label className="form-label" htmlFor="betinaP8">Jumlah Betina Akhir-P8<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-3" style={{paddingRight: '2px'}}>
                                        <input type="text" name='betinaP8' id='betinaP8' value={(cekdataMPkh1.betinaP8 ? addCommas(removeNonNumeric(cekdataMPkh1.betinaP8)) : "") || ""} {...registerMPkh1("betinaP8", {required: (data.listPtk ? (data.listPtkjenis_media_pembawa_id == 1 ? "Mohon isi jumlah akhir Betina." : false) : false)})} className={errorsMPkh1.betinaP8 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-2" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanbetinaP8' id='satuanbetinaP8' value={"EKR"} disabled />
                                    </div>
                                </div>
                                {errorsMPkh1.jantanP8 && <small className="text-danger">{errorsMPkh1.jantanP8.message}</small>}
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
                        <PrintKh1 dataCetak={data} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DocKH1