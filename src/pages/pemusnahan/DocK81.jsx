/* eslint-disable eqeqeq */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import PtkSurtug from '../../model/PtkSurtug';
import PtkHistory from '../../model/PtkHistory';
import PtkModel from '../../model/PtkModel';
import PnPemusnahan from '../../model/PnPemusnahan';
import {decode as base64_decode} from 'base-64';
import SpinnerDot from '../../component/loading/SpinnerDot';
import ModaAlatAngkut from '../../model/master/modaAlatAngkut.json';
import Alasan from '../../model/master/alasan.json';
import Swal from 'sweetalert2';
import LoadBtn from '../../component/loading/LoadBtn';

const log = new PtkHistory()
const modelPemohon = new PtkModel()
const modelPemusnahan = new PnPemusnahan()
const modelSurtug = new PtkSurtug()
const addCommas = num => {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};
const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");

function DocK81() {
    const idPtk = Cookies.get("idPtkPage");
    let [cekData, setCekData] = useState()
    let [loadKomoditi, setLoadKomoditi] = useState(false)
    let [loadKomoditiPesan, setLoadKomoditiPesan] = useState("")
    let [datasend, setDataSend] = useState([])
    let [onLoad, setOnLoad] = useState(false)

    let [data, setData] = useState({
        noAju: "",
        noIdPtk: "",
        noDokumen: "",
        tglDokumen: "",
    })

    function handleEditKomoditas(e) {
        const dataMP = data.listKomoditas?.filter((element, index) => index == e)
        setValueMPk81("idMPk81", dataMP[0].id)
        setValueMPk81("idPtk", dataMP[0].ptk_id)
        setValueMPk81("jenisKar", Cookies.get("jenisKarantina"))
        setCekData(values => ({...values,
            volumeP7: dataMP[0].volume_lain,
            nettoP7: dataMP[0].volume_netto,
            jantanP7: dataMP[0].jantan,
            betinaP7: dataMP[0].betina
        }));
        setValueMPk81("nettoP7", dataMP[0].volume_netto)
        setValueMPk81("satuanNetto", dataMP[0].sat_netto)
        setValueMPk81("volumeP7", dataMP[0].volume_lain)
        setValueMPk81("satuanLain", dataMP[0].sat_lain)
        setValueMPk81("jantanP7", dataMP[0].jantan)
        setValueMPk81("betinaP7", dataMP[0].betina)
        setValueMPk81("namaUmum", dataMP[0].nama_umum_tercetak)
        setValueMPk81("namaLatin", dataMP[0].nama_latin_tercetak)
    }

    function refreshListKomoditas() {
        const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, Cookies.get("jenisKarantina"));
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

    function handleEditKomoditasAll() {
        setLoadKomoditi(true)
        data.listKomoditas?.map((item, index) => (
            log.updateKomoditiP7(item.id, datasend[index])
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
                        text: "Volume P7 berhasil disimpan (tidak ada perubahan dengan volume awal)"
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

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const cekWatch = watch()

    const onSubmit = (dataSubmit) => {
        setOnLoad(true)
        const dataCekKom = data.listKomoditas?.filter(item => item.volumeP7 != null || item.nettoP7 != null)
        // const dataCekKomJanBen = data.listKomoditas?.filter(item => (item.jantan != null && item.jantanP7 == null) || (item.betina != null && item.betinaP7 == null))
        // if(dataCekKom.length == 0 && dataCekKomJanBen.length == 0) {
        if(dataCekKom.length > 0) {
            const response = modelPemusnahan.simpan81(dataSubmit);
            response
            .then((response) => {
                if(response.data) {
                    setOnLoad(false)
                    if(response.data.status == 201) {
                        //start save history
                        const resHsy = log.pushHistory(dataSubmit.idPtk, "P7", "K-8.1", (dataSubmit.idDok81 ? 'UPDATE' : 'NEW'));
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
                                console.log(error)
                            }
                        });
                        //end save history
                        Swal.fire({
                            icon: "success",
                            title: "Sukses!",
                            text: "Surat Pemusnahan berhasil " + (dataSubmit.idDok81 ? 'diubah' : 'disimpan')
                        })
                        setValue("idDok81", response.data.data.id)
                        setValue("noDok81", response.data.data.nomor)
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
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
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
                text: "Mohon isi volume P7"
            });
        }
    }

    const {
        register: registerMPk81,
        setValue: setValueMPk81,
        // control: controlMPk81,
        watch: watchMPk81,
        handleSubmit: handleFormMPk81,
        reset: resetFormKomoditik81,
        formState: { errors: errorsMPk81 },
    } = useForm({
        defaultValues: {
            idMPk81: "",
            volumeNetto: "",
            volumeLain: "",
            satuanLain: "",
            jantanP7: "",
            betinaP7: "",
          }
        })

    const cekdataMPk81 = watchMPk81()

    function onSubmitMPk81(data) {
        setOnLoad(true)
        let cekVolume = false
        if((data.jantanP7 != null) || (data.betinaP7 != null) ) {
            if((parseFloat(typeof data.jantanP7 == "string" ? data.jantanP7.replace(/,/g, "") : data.jantanP7) > parseFloat(cekData.jantanP7)) || (parseFloat((typeof data.betinaP7 == "string" ? data.betinaP7.replace(/,/g, "") : data.betinaP7)) > parseFloat(cekData.betinaP7))) {
                cekVolume = false
            } else {
                if(parseFloat(typeof data.volumeP7 == "string" ? data.volumeP7.replace(/,/g, "") : data.volumeP7) > parseFloat(cekData.volumeP7) || parseFloat(typeof data.nettoP7 == "string" ? data.nettoP7.replace(/,/g, "") : data.nettoP7) > parseFloat(cekData.nettoP7)) {
                    cekVolume = false 
                } else {
                    cekVolume = true
                }
            }
        } else {
            if(parseFloat(typeof data.volumeP7 == "string" ? data.volumeP7.replace(/,/g, "") : data.volumeP7) > parseFloat(cekData.volumeP7) || parseFloat(typeof data.nettoP7 == "string" ? data.nettoP7.replace(/,/g, "") : data.nettoP7) > parseFloat(cekData.nettoP7)) {
                cekVolume = false 
            } else {
                cekVolume = true
            }
        }
        if(cekVolume) {
            log.updateKomoditiP7(data.idMPk81, data)
            .then((response) => {
                setOnLoad(false)
                if(response.data.status == 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Volume P7 berhasil diubah"
                    })
                    resetFormKomoditik81()
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

    function modaAlatAngkut(e){
        return ModaAlatAngkut.find((element) => element.id == parseInt(e))
    }
    
    function alasan(){
        return Alasan.filter((element) => element.dok_id == 35)
    }

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok81", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
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
                            listDokumen: response.data.data.ptk_dokumen
                        }));

                        const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), Cookies.get("jenisKarantina"));
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
                                            jantanP7: item.jantan,
                                            betinaP7: item.betina,
                                            volumeP7: item.volume_lain,
                                            nettoP7: item.volume_netto
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
                        errorKomoditas: "Gagal load data komoditas",
                    }))
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorPTK: "Gagal load data PTK",
                    errorKomoditas: "Gagal load data komoditas",
                }))
            });

            const resSurtug = modelSurtug.getSurtugByPtk(base64_decode(ptkNomor[1]), 11);
            resSurtug
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            // console.log(response.data.data[0])
                            setData(values => ({...values,
                                errorSurtug: "",
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                                petugas: response.data.data
                            }));
                            setValue("idSurtug", response.data.data[0].ptk_surtug_header_id)
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorSurtug: "Surat tugas tidak ada / belum dibuat",
                            }));
                        } else {
                            setData(values => ({...values,
                                errorSurtug: "Gagal load data surat tugas",
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data surat tugas",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.data.status == 404) {
                    setData(values => ({...values,
                        errorSurtug: "Surat tugas tidak ada / belum dibuat",
                    }));
                } else {
                    setData(values => ({...values,
                        errorSurtug: "Gagal load data surat tugas",
                    }));
                }
            });

            const response81 = modelPemusnahan.getByPtkId(base64_decode(ptkNomor[1]), 35);
            response81
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorMusnah81: "",
                            }));
                            setValue("idDok81", response.data.data[0].id)
                            setValue("noDok81", response.data.data[0].nomor)
                            setValue("tglDok81", response.data.data[0].tanggal)
                            setValue("a1", response.data.data[0].alasan1)
                            setValue("a2", response.data.data[0].alasan2)
                            setValue("a3", response.data.data[0].alasan3)
                            setValue("a4", response.data.data[0].alasan4)
                            setValue("a5", response.data.data[0].alasan5)
                            setValue("a6", response.data.data[0].alasan6)
                            setValue("a7", response.data.data[0].alasan_lain == null ? "" : "1")
                            setValue("a7Lain", response.data.data[0].alasan_lain)
                            setValue("maksMusnah", response.data.data[0].maks_pemusnahan)
                            setValue("lokasiMp", response.data.data[0].lokasi_mp)
                            setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                            setValue("ttdPutusan", response.data.data[0].user_ttd_id?.toString())
                            setValue("otban", response.data.data[0].otoritas_pelabuhan)
                            setValue("kaBc", response.data.data[0].kepala_kantor_bc)
                            setValue("namaPengelola", response.data.data[0].nama_pengelola)
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorMusnah81: "",
                            }));
                        } else {
                            setData(values => ({...values,
                                errorMusnah81: "Gagal load data history surat pemusnahan",
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorMusnah81: "Gagal load data history surat pemusnahan",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.data.status == 404) {
                    setData(values => ({...values,
                        errorMusnah81: "",
                    }));
                } else {
                    setData(values => ({...values,
                        errorMusnah81: "Gagal load data history surat pemusnahan",
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
                            listDokumen: response.data.data.ptk_dokumen
                        }));
    
                        setValue("tandaKhusus", response.data.data.ptk.tanda_khusus)
                        setValue("karantinaTujuan", response.data.data.ptk.negara_penerima)
                        setValue("entryPoint", response.data.data.ptk.pelabuhan_bongkar + ", " + response.data.data.ptk.negara_bongkar)
                        setValue("idPtk", data.noIdPtk)
                        setValue("noDokumen", data.noDokumen)
                    }
                } else {
                    setData(values => ({...values,
                        errorPTK: "Gagal load data PTK"
                    }))
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorPTK: "Gagal load data PTK"
                }))
            });
        }

        if(data.errorKomoditas) {
            const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, Cookies.get("jenisKarantina"));
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
                                jantanP7: item.jantan,
                                betinaP7: item.betina,
                                volumeP7: item.volume_lain,
                                nettoP7: item.volume_netto
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

        if(data.errorSurtug) {
            const resSurtug = modelSurtug.getSurtugByPtk(data.noIdPtk, 11);
            resSurtug
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            // console.log(response.data.data[0])
                            setData(values => ({...values,
                                errorSurtug: "",
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                                petugas: response.data.data
                            }));
                            setValue("idSurtug", response.data.data[0].ptk_surtug_header_id)
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorSurtug: "Surat tugas tidak ada / belum dibuat",
                            }));
                        } else {
                            setData(values => ({...values,
                                errorSurtug: "Gagal load data surat tugas",
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorSurtug: "Gagal load data surat tugas",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.data.status == 404) {
                    setData(values => ({...values,
                        errorSurtug: "Surat tugas tidak ada / belum dibuat",
                    }));
                } else {
                    setData(values => ({...values,
                        errorSurtug: "Gagal load data surat tugas",
                    }));
                }
            });
        }

        if(data.errorMusnah81) {
            const response81 = modelPemusnahan.getByPtkId(data.noIdPtk, 35);
            response81
            .then((response) => {
                if(response.data) {
                    console.log(response)
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorMusnah81: "",
                            }));
                            setValue("idDok81", response.data.data[0].id)
                            setValue("noDok81", response.data.data[0].nomor)
                            setValue("tglDok81", response.data.data[0].tanggal)
                            setValue("a1", response.data.data[0].alasan1)
                            setValue("a2", response.data.data[0].alasan2)
                            setValue("a3", response.data.data[0].alasan3)
                            setValue("a4", response.data.data[0].alasan4)
                            setValue("a5", response.data.data[0].alasan5)
                            setValue("a6", response.data.data[0].alasan6)
                            setValue("a7", response.data.data[0].alasan_lain == null ? "" : "1")
                            setValue("a7Lain", response.data.data[0].alasan_lain)
                            setValue("maksMusnah", response.data.data[0].maks_pemusnahan)
                            setValue("lokasiMp", response.data.data[0].lokasi_mp)
                            setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                            setValue("ttdPutusan", response.data.data[0].user_ttd_id?.toString())
                            setValue("otban", response.data.data[0].otoritas_pelabuhan)
                            setValue("kaBc", response.data.data[0].kepala_kantor_bc)
                            setValue("namaPengelola", response.data.data[0].nama_pengelola)
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorMusnah81: "",
                            }));
                        } else {
                            setData(values => ({...values,
                                errorMusnah81: "Gagal load data history surat pemusnahan",
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorMusnah81: "Gagal load data history surat pemusnahan",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.data.status == 404) {
                    setData(values => ({...values,
                        errorMusnah81: "",
                    }));
                } else {
                    setData(values => ({...values,
                        errorMusnah81: "Gagal load data history surat pemusnahan",
                    }));
                }
            });
        }
    }

  return (
    <div className="container-fluid flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-8.1 <span className="fw-light" style={{color: 'blue'}}>SURAT PEMUSNAHAN</span>

            <small className='float-end'>
                <span className='text-danger'>{(data.errorPTK ? data.errorPTK + "; " : "") + (data.errorKomoditas ? data.errorKomoditas + "; " : "") + (data.errorMusnah81 ? data.errorMusnah81 + "; " : "") + (data.errorSurtug ? data.errorSurtug + "; " : "")}</span>
                {data.errorPTK || data.errorKomoditas || data.errorMusnah81 || data.errorSurtug ?
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
                        <input type="hidden" id='idDok81' {...register("idDok81")} />
                        <input type="hidden" id='idPtk' {...register("idPtk")} />
                        <input type="hidden" id='noDokumen' {...register("noDokumen")} />
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok81">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok81" name='noDok81' {...register("noDok81")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-8.1" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok81">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok81" name='tglDok81' {...register("tglDok81", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok81 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok81 && <small className="text-danger">{errors.tglDok81.message}</small>}
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
                                        <div className='row'>
                                            <div className="col-md-6">
                                                <h5 className='mb-1'><b><u>Identitas Pemohon</u></b></h5>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="namaPemohon">Nama</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="namaPemohon" value={data.listPtk?.nama_pemohon || ""} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatPemohon">Alamat</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="alamatPemohon" value={data.listPtk?.alamat_pemohon || ""} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasPemohon">Identitas</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitastPemohon" className="form-control form-control-sm" disabled value={(data.listPtk?.jenis_identitas_pemohon + " - " + data.listPtk?.nomor_identitas_pemohon) || ""} id="identitasPemohon" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-4 mx-n4" />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahAsal">{data.listPtk ? (data.listPtk.permohonan == "DK" ? "Daerah" : "Negara") : ""} Asal</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahAsal" className="form-control form-control-sm" disabled value={(data.listPtk?.permohonan == "DK" ? data.listPtk?.kota_asal : data.listPtk?.negara_asal) || ""} id="daerahAsal" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahTujuan">{data.listPtk ? (data.listPtk.permohonan == "DK" ? "Daerah" : "Negara") : ""} Tujuan</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahTujuan" className="form-control form-control-sm" disabled value={(data.listPtk?.permohonan == "DK" ? data.listPtk?.kota_tujuan : data.listPtk?.negara_tujuan) || ""} id="daerahTujuan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatKeluar">Tempat Pengeluaran / Tgl Berangkat</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatKeluar" className="form-control form-control-sm" disabled value={(data.listPtk?.pelabuhan_muat + " / " + data.listPtk?.tanggal_rencana_berangkat_terakhir) || ""} id="tempatKeluar" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatMasuk">Tempat Pemasukan / Tgl Tiba</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatMasuk" className="form-control form-control-sm" disabled value={(data.listPtk?.pelabuhan_bongkar + " / " + data.listPtk?.tanggal_rencana_tiba_terakhir) || ""} id="tempatMasuk" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasAngkut">Jenis, Nama Alat Angkut</label>
                                                    <div className="col-sm-8">
                                                        <input type='text' name="identitasAngkut" className="form-control form-control-sm" disabled value={data.listPtk ? (modaAlatAngkut(data.listPtk.moda_alat_angkut_terakhir_id)?.nama + ", " + data.listPtk.nama_alat_angkut_terakhir) : ""} id="identitasAngkut" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="lokasiMP">Lokasi MP</label>
                                                    <div className="col-sm-8">
                                                        <input type='text' name="lokasiMP" className="form-control form-control-sm" id="lokasiMP" {...register("lokasiMp")} placeholder='Lokasi Media Pembawa..' />
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
                                            <span className='mb-1'>
                                                {loadKomoditi ? <SpinnerDot/> : null}
                                                {data.listKomoditas ? 
                                                (loadKomoditi ? null : <button type='button' className='btn btn-sm btn-outline-secondary' onClick={handleEditKomoditasAll} style={{marginLeft: "15px"}}><i className='fa-solid fa-check-square text-success me-sm-2 me-1'></i> Tidak ada perubahan</button>) : null }
                                                <span className='text-danger'>{loadKomoditiPesan}</span>
                                            </span>
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
                                                                <th>Volume P7</th>
                                                                <th>Netto P7</th>
                                                                <th>Jantan P7</th>
                                                                <th>Betina P7</th>
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
                                                                            <td className='text-end'>{data.volumeP7?.toLocaleString()}</td>
                                                                            <td className='text-end'>{data.nettoP7?.toLocaleString()}</td>
                                                                            <td className='text-end'>{data.jantanP7?.toLocaleString()}</td>
                                                                            <td className='text-end'>{data.betinaP7?.toLocaleString()}</td>
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
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseAlasan" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>II. Alasan Pemusnahan</h5>
                                    </button>
                                </h2>
                                <div id="collapseAlasan">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                {alasan().map((data, index) => (
                                                    <div className="form-check" key={index}>
                                                        <input className="form-check-input" type="checkbox" {...register("a" + data.id)} value={1} id={"a" + data.id} />
                                                        <label className="form-check-label" htmlFor={"a" + data.id}>
                                                            {data.deskripsi.replace("HPHK/HPIK/OPTK", (Cookies.get("jenisKarantina") == Cookies.get("jenisKarantina") ? "HPHK" : (Cookies.get("jenisKarantina") == "I" ? "HPIK" : "OPTK"))).replace("/OPT", ((Cookies.get("jenisKarantina") !== "T" ? "" : "/OPT")))}
                                                        </label>
                                                        {data.id == 7 ?
                                                        <div className='col-md-4' style={{display: (cekWatch.a7 == '1' ? 'block' : 'none')}}>
                                                            <input type="text" placeholder='Lainnya..' className={errors.a7Lain ? "form-control form-control-sm is-invalid ml-2" : "form-control form-control-sm ml-2"} {...register("a7Lain", {required: (cekWatch.a7 == '1' ? "Mohon isi keterangan lainnya.." : false)})} />
                                                            {errors.a7Lain && <small className="text-danger">{errors.a7Lain.message}</small>}
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
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseAlasan" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>III. Pelaksanaan Pemusnahan</h5>
                                    </button>
                                </h2>
                                <div id="collapseAlasan">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <ol>
                                                    <li>Pemusnahan dilakukan paling lambat <input type="text" style={{width: "35px", border:(errors.maksMusnah ? "1px solid red" : 0), borderBottom: "1px dotted red", textAlign: "center"}} {...register("maksMusnah", {required: "Mohon isi maksimal hari pemusnahan"})} /> hari kerja terhitung sejak surat pemusnahan ini diterbitkan {errors.maksMusnah && <small className="text-danger">{errors.maksMusnah.message}</small>}</li>
                                                    <li>Pemilik wajib menanggung segala biaya yang timbul dalam pelaksanaan pemusnahan serta tidak berhak menuntut ganti rugi</li>
                                                    <li>Pemusnahan dilakukan dibawah pengawasan dan menggunakan metode yang direkomendasikan Pejabat Karantina</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h5><u>Tembusan</u></h5>
                        <div className="row">
                            <div className="col-md-12">
                                <ol>
                                    <li>
                                        <div className='row mb-2'>
                                            <label className='col-sm-2' htmlFor="otoritas">Otoritas</label>
                                            <div className='col-sm-3'>
                                                <div className='input-group'>
                                                    <div className='col-sm-4'>
                                                        <select name="otoritas" id="otoritas" {...register("otoritas")} className='form-control form-control-sm'>
                                                            <option value="">--</option>
                                                            <option value="Pelabuhan">Pelabuhan</option>
                                                            <option value="Bandara">Bandara</option>
                                                        </select>
                                                    </div>
                                                    <div className='col-sm-8'>
                                                        <input type="text" className='col-sm-4 form-control form-control-sm' id='otban' name='otban' {...register("otban")} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row mb-2'>
                                            <label className='col-sm-2' htmlFor="otoritas">Kepala Kantor BC</label>
                                            <div className='col-sm-3'>
                                                <input type="text" className='form-control form-control-sm' id='kaBc' name='kaBc' {...register("kaBc")} />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='row mb-2'>
                                            <label className='col-sm-2' htmlFor="otoritas">Pengelola {cekWatch.otoritas}</label>
                                            <div className='col-sm-3'>
                                                <input type="text" className='form-control form-control-sm' id='namaPengelola' name='namaPengelola' {...register("namaPengelola")} />
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                                <hr className="my-4 mx-n4" />
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
                                    <button type="button" className="btn btn-warning btn-label-secondary me-sm-2 me-1"><i className='fa-solid fa-print me-sm-2 me-1'></i> Print</button>
                                    <button type="button" style={{display: (cekWatch.idDok81 ? "block" : "none")}} className="float-end btn btn-info btn-label-secondary"><i className='tf-icons fa-solid fa-paper-plane me-sm-2 me-1'></i> TTE</button>
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
                        <form onSubmit={handleFormMPk81(onSubmitMPk81)} className="row g-3">
                        <input type="hidden" name='idMPk81' {...registerMPk81("idMPk81")} />
                        <input type="hidden" name='idPtk' {...registerMPk81("idPtk")} />
                        <input type="hidden" name='jenisKar' {...registerMPk81("jenisKar")} />
                            <div className="col-6">
                                <label className="form-label" htmlFor="nettoP7">Volume Netto Akhir-P7<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" name='nettoP7' id='nettoP7' value={cekdataMPk81.nettoP7 ? addCommas(removeNonNumeric(cekdataMPk81.nettoP7)) : ""} {...registerMPk81("nettoP7", {required: "Mohon isi volume netto."})} className={errorsMPk81.nettoP7 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanNetto' id='satuanNetto' {...registerMPk81("satuanNetto")} disabled />
                                    </div>
                                </div>
                                {errorsMPk81.volumeNetto && <small className="text-danger">{errorsMPk81.volumeNetto.message}</small>}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeP7">Volume Lain Akhir-P7</label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='volumeP7' id='volumeP7' value={cekdataMPk81.volumeP7 ? addCommas(removeNonNumeric(cekdataMPk81.volumeP7)) : ""} {...registerMPk81("volumeP7")} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanLain' id='satuanLain' {...registerMPk81("satuanLain")} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6" style={{display: (data.listPtk ? (data.listPtk.jenis_media_pembawa_id == 1 ? "block" : "none") : "none")}}>
                                <label className="form-label" htmlFor="jantanP7">Jumlah Jantan Akhir-P7<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-3" style={{paddingRight: '2px'}}>
                                        <input type="text" name='jantanP7' id='jantanP7' value={cekdataMPk81.jantanP7 ? addCommas(removeNonNumeric(cekdataMPk81.jantanP7)) : ""} {...registerMPk81("jantanP7", {required: (data.listPtk ? (data.listPtkjenis_media_pembawa_id == 1 ? "Mohon isi jumlah akhir Jantan." : false) : false)})} className={errorsMPk81.jantanP7 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-2" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanjantanP7' id='satuanjantanP7' value={"EKR"} disabled />
                                    </div>
                                </div>
                                {errorsMPk81.jantanP7 && <small className="text-danger">{errorsMPk81.jantanP7.message}</small>}
                            </div>
                            <div className="col-6" style={{display: (data.listPtk ? (data.listPtk.jenis_media_pembawa_id == 1 ? "block" : "none") : "none")}}>
                                <label className="form-label" htmlFor="betinaP7">Jumlah Betina Akhir-P7<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-3" style={{paddingRight: '2px'}}>
                                        <input type="text" name='betinaP7' id='betinaP7' value={cekdataMPk81.betinaP7 ? addCommas(removeNonNumeric(cekdataMPk81.betinaP7)) : ""} {...registerMPk81("betinaP7", {required: (data.listPtk ? (data.listPtkjenis_media_pembawa_id == 1 ? "Mohon isi jumlah akhir Betina." : false) : false)})} className={errorsMPk81.betinaP7 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-2" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanbetinaP7' id='satuanbetinaP7' value={"EKR"} disabled />
                                    </div>
                                </div>
                                {errorsMPk81.jantanP7 && <small className="text-danger">{errorsMPk81.jantanP7.message}</small>}
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
    </div>
  )
}

export default DocK81