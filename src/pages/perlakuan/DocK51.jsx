/* eslint-disable eqeqeq */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {decode as base64_decode} from 'base-64';
import PtkModel from '../../model/PtkModel';
import PnPerlakuan from '../../model/PnPerlakuan';
import { useNavigate } from 'react-router-dom';
import PtkHistory from '../../model/PtkHistory';
import SpinnerDot from '../../component/loading/SpinnerDot';
import Swal from 'sweetalert2';
import PtkSurtug from '../../model/PtkSurtug';
import LoadBtn from '../../component/loading/LoadBtn';

const modelPerlakuan = new PnPerlakuan()
const log = new PtkHistory()
const modelPemohon = new PtkModel()
const modelSurtug = new PtkSurtug()

const addCommas = num => {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");

function DocK51() {
    const idPtk = Cookies.get("idPtkPage");
    let navigate = useNavigate();
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
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        noDok51: "",
        dokKarId: "21"
    });

    const cekWatch = watch()

    const onSubmit = (data) => {
        setOnLoad(true)
        const response = modelPerlakuan.sertifPerlakuan(data)
        response
        .then((response) => {
            setOnLoad(false)
            if(response.data) {
                if(response.data.status == 201) {
                    //start save history
                    const resHsy = log.pushHistory(data.idPtk, "p4", "K-5.1", (data.idDok51 ? 'UPDATE' : 'NEW'))
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
                    })
                    //end save history

                    Swal.fire({
                        title: "Sukses!",
                        text: "Sertifikat Perlakuan berhasil " + (data.idDok37a ? "diedit." : "disimpan."),
                        icon: "success"
                    })
                    setValue("idDok51", response.data.data.id)
                    setValue("noDok51", response.data.data.nomor)
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
                text: error.response.data.message,
                icon: "error"
            })
        })
    }

    const {
        register: registerMPk51,
        setValue: setValueMPk51,
        // control: controlMPk51,
        watch: watchMPk51,
        handleSubmit: handleFormMPk51,
        reset: resetFormKomoditikh1,
        formState: { errors: errorsMPk51 },
    } = useForm({
        defaultValues: {
            idMPk51: "",
            volumeNetto: "",
            volumeLain: "",
            satuanLain: "",
            jantanP4: "",
            betinaP4: "",
          }
        })

    const cekdataMPk51 = watchMPk51()

    function onSubmitMPk51(data) {
        setOnLoad(true)
        if((data.jantanP4 != null) || (data.betinaP4 != null) ) {
            if((parseFloat(typeof data.jantanP4 == "string" ? data.jantanP4.replace(/,/g, "") : data.jantanP4) > parseFloat(cekData.jantanP4)) || (parseFloat((typeof data.betinaP4 == "string" ? data.betinaP4.replace(/,/g, "") : data.betinaP4)) > parseFloat(cekData.betinaP4))) {
                cekVolume = false
            } else {
                if(parseFloat(typeof data.volumeP4 == "string" ? data.volumeP4.replace(/,/g, "") : data.volumeP4) > parseFloat(cekData.volumeP4) || parseFloat(typeof data.nettoP4 == "string" ? data.nettoP4.replace(/,/g, "") : data.nettoP4) > parseFloat(cekData.nettoP4)) {
                    cekVolume = false 
                } else {
                    cekVolume = true
                }
            }
        } else {
            if(parseFloat(typeof data.volumeP4 == "string" ? data.volumeP4.replace(/,/g, "") : data.volumeP4) > parseFloat(cekData.volumeP4) || parseFloat(typeof data.nettoP4 == "string" ? data.nettoP4.replace(/,/g, "") : data.nettoP4) > parseFloat(cekData.nettoP4)) {
                cekVolume = false 
            } else {
                cekVolume = true
            }
        }
        if(cekVolume) {
            log.updateKomoditiP4(data.idMPk51, data)
            .then((response) => {
                setOnLoad(false)
                if(response.data.status == 201) {
                    Swal.fire({
                        title: "Sukses!",
                        text: "Volume P4 berhasil diubah.",
                        icon: "success"
                    })
                    resetFormKomoditikh1()
                    refreshListKomoditas()
                    // window.$('#modKomoditas').modal('hide')
                    // document.getElementById("modKomoditas").modal('hide')
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: response.data.message,
                        icon: "error"
                    })
                }
            })
            .catch((error) => {
                setOnLoad(false)
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                Swal.fire({
                    title: "Error!",
                    text: error.response.data.message,
                    icon: "error"
                })
            })
        } else {
            setOnLoad(false)
            Swal.fire({
                title: "Error!",
                text: "Volume input melebihi volume awal, mohon cek isian anda",
                icon: "error"
            })
        }
    }

    function handleEditKomoditas(e) {
        const dataMP = data.listKomoditas?.filter((element, index) => index == e)
        setValueMPk51("idMPk51", dataMP[0].id)
        setValueMPk51("idPtk", dataMP[0].ptk_id)
        setValueMPk51("jenisKar", Cookies.get("jenisKarantina"))
        setCekData(values => ({...values,
            volumeP4: dataMP[0].volume_lain,
            nettoP4: dataMP[0].volume_netto,
            jantanP4: dataMP[0].jantan,
            betinaP4: dataMP[0].betina
        }));
        setValueMPk51("nettoP4", dataMP[0].volume_netto)
        setValueMPk51("satuanNetto", dataMP[0].sat_netto)
        setValueMPk51("volumeP4", dataMP[0].volume_lain)
        setValueMPk51("satuanLain", dataMP[0].sat_lain)
        setValueMPk51("jantanP4", dataMP[0].jantan)
        setValueMPk51("betinaP4", dataMP[0].betina)
    }

    function handleEditKomoditasAll() {
        setLoadKomoditi(true)
        data.listKomoditas?.map((item, index) => (
            log.updateKomoditiP4(item.id, datasend[index])
                .then((response) => {
                    if(response.data.status == 201) {
                        refreshListKomoditas()
                        setLoadKomoditi(false)
                        if(import.meta.env.VITE_BE_ENV == "DEV") {
                            console.log("history saved")
                        }
                        Swal.fire({
                            title: "Sukses!",
                            text: "Volume P4 berhasil diubah (tidak ada perubahan dengan volume awal)",
                            icon: "success"
                        })
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: response.data.message,
                            icon: "error"
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
                        title: "Error!",
                        text: error.response.data.message,
                        icon: "error"
                    })
                })
            )
        )
        setLoadKomoditi(false)
    }

    function refreshListKomoditas() {
        const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, Cookies.get("jenisKarantina"))
        resKom
        .then((res) => {
            if(res.data.status == 200) {
                setData(values => ({...values,
                    listKomoditas: res.data.data
                }))
            }
        })
        .catch((error) => {
            if(import.meta.env.VITE_BE_ENV == "DEV") {
                console.log(error)
            }
        })
    }
    
    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok51", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
            const tglPtk = Cookies.get("tglPtk")
            let ptkDecode = idPtk ? base64_decode(idPtk) : ""
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : ""

            setData(values => ({...values,
                noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                noDokumen: idPtk ? base64_decode(ptkNomor[2]) : "",
                tglDokumen: tglPtk,
            }))
            
            const response = modelPemohon.getPtkId(base64_decode(ptkNomor[1]))
            response
            .then((response) => {
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorPtkPage: "",
                            listPtk: response.data.data.ptk,
                            // listKomoditas: response.data.data.ptk_komoditi,
                            listDokumen: response.data.data.ptk_dokumen
                        }))
                        let nmrKont = response.data.data.ptk_kontainer?.map(item => {
                            return item.nomor
                        })
                        setValue("idPtk", base64_decode(ptkNomor[1]))
                        setValue("noDokumen", base64_decode(ptkNomor[2]))
                        setValue("dokKarId", 21)
                        setValue("jmlNoContainer", response.data.data.ptk_kontainer.length + (response.data.data.ptk_kontainer.length > 0 ? " (" + nmrKont.join(";") +")" : ""))
                        setValue("tempatPerlakuan", response.data.data.ptk.tempat_pemeriksaan)
                        setValue("tandaKhusus", response.data.data.ptk.tanda_khusus)

                        const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), Cookies.get("jenisKarantina"))
                        resKom
                        .then((res) => {
                            if(typeof res.data != "string") {
                                if(res.data.status == 200) {
                                    setData(values => ({...values,
                                        errorKomoditas: "",
                                        listKomoditas: res.data.data
                                    }))
                                    var arrayKom = res.data.data.map(item => {
                                        return {
                                            jantanP4: item.jantan,
                                            betinaP4: item.betina,
                                            volumeP4: item.volume_lain,
                                            nettoP4: item.volume_netto
                                        }
                                    })
                                    setDataSend(arrayKom)
                                }
                            } else {
                                setData(values => ({...values,
                                    errorKomoditas: "Gagal load data Komoditas"
                                }))
                            }
                        })
                        .catch((error) => {
                            if(import.meta.env.VITE_BE_ENV == "DEV") {
                                console.log(error)
                            }
                            setData(values => ({...values,
                                errorKomoditas: "Gagal load data Komoditas"
                            }))
                        })
                    } else {
                        setData(values => ({...values,
                            errorPtkPage: "Gagal load data PTK",
                            errorKomoditas: "Gagal load data Komoditas"
                        }))
                    }
                } else {
                    setData(values => ({...values,
                        errorPtkPage: "Gagal load data PTK",
                        errorKomoditas: "Gagal load data Komoditas"
                    }))
                }
            })
            .catch((error) => {
                setData(values => ({...values,
                    errorPtkPage: "Gagal load data PTK",
                    errorKomoditas: "Gagal load data Komoditas"
                }))
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
            })

            // 8: penugasan Perlakuan
            const resSurtug = modelSurtug.getSurtugByPtk(base64_decode(ptkNomor[1]), 8);
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
                if(import.meta.env.VITE_BE_ENV == "DEV") {
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

            const resLaporan = modelPerlakuan.getPtkByDokumen(base64_decode(ptkNomor[1]), 21)
            setValue("idPtk", base64_decode(ptkNomor[1]))
            resLaporan
            .then((response) => {
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorDok51: "",
                        }))
                        setValue("idDok51", response.data.data[0].id)
                        setValue("noDok51", response.data.data[0].nomor)
                        setValue("noDokumen", response.data.data[0].nomor)
                        setValue("tglDok51", response.data.data[0].tanggal)
                        setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                        setValue("namaIlmiahMP", response.data.data[0].nama_ilmiah_mp)
                        setValue("namaUmumMP", response.data.data[0].nama_dagang_mp)
                        setValue("bentukJmlMP", response.data.data[0].bentuk_jmlh_mp)
                        setValue("targetPerlakuan", response.data.data[0].target_perlakuan)
                        setValue("alasanPerlakuan", response.data.data[0].alasan_perlakuan)
                        setValue("metodePerlakuan", response.data.data[0].metode_perlakuan)
                        setValue("tipePerlakuan", response.data.data[0].tipe_perlakuan_id)
                        setValue("bahanPestisida", response.data.data[0].pestisida_id)
                        setValue("dosisPestisida", response.data.data[0].dosis_aplikasi)
                        setValue("mulaiPerlakuan", response.data.data[0].tgl_perlakuan_mulai)
                        setValue("selesaiPerlakuan", response.data.data[0].tgl_perlakuan_selesai)
                        setValue("namaTempatPerlakuan", response.data.data[0].nama_tempat)
                        setValue("alamatTempatPerlakuan", response.data.data[0].alamat_tempat)
                        setValue("operatorPelaksana", response.data.data[0].nama_operator)
                        setValue("alamatOperatorPelaksana", response.data.data[0].alamat_operator)
                        setValue("keteranganLain", response.data.data[0].ket_perlakuan_lain)
                        setValue("ttdPerlakuan", response.data.data[0].user_ttd_id)
                        setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                    } else if(response.data.status == 404) {
                        setData(values => ({...values,
                            errorDok51: "",
                        }))
                    } else {
                        setData(values => ({...values,
                            errorDok51: "Gagal load data Sertifikat Perlakuan",
                        }))
                    }
                } else {
                    setData(values => ({...values,
                        errorDok51: "Gagal load data Sertifikat Perlakuan",
                    }))
                }
            })
            .catch((error) => {
                // setData()
                if(error.response.status == 404) {
                    setData(values => ({...values,
                        errorDok51: "",
                    }))
                    // getDok53()
                    const resLaporan = modelPerlakuan.getPtkByDokumen(base64_decode(ptkNomor[1]), 23)
                    resLaporan
                    .then((response) => {
                        if(typeof response.data != "string") {
                            if(response.data.status == 200) {
                                setData(values => ({...values,
                                    errorDok53: "",
                                }))
                                setValue("idDok53", response.data.data[0].id)
                                setValue("noDok53", response.data.data[0].nomor)
                                // setValue("noDokumen", response.data.data[0].nomor)
                                setValue("tglDok53", response.data.data[0].tanggal)
                                setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                                setValue("namaIlmiahMP", response.data.data[0].nama_ilmiah_mp)
                                setValue("namaUmumMP", response.data.data[0].nama_dagang_mp)
                                setValue("bentukJmlMP", response.data.data[0].bentuk_jmlh_mp)
                                setValue("targetPerlakuan", response.data.data[0].target_perlakuan)
                                setValue("alasanPerlakuan", response.data.data[0].alasan_perlakuan)
                                setValue("metodePerlakuan", response.data.data[0].metode_perlakuan)
                                setValue("tipePerlakuan", response.data.data[0].tipe_perlakuan_id)
                                setValue("bahanPestisida", response.data.data[0].pestisida_id)
                                setValue("dosisPestisida", response.data.data[0].dosis_aplikasi)
                                setValue("mulaiPerlakuan", response.data.data[0].tgl_perlakuan_mulai)
                                setValue("selesaiPerlakuan", response.data.data[0].tgl_perlakuan_selesai)
                                setValue("namaTempatPerlakuan", response.data.data[0].nama_tempat)
                                setValue("alamatTempatPerlakuan", response.data.data[0].alamat_tempat)
                                setValue("operatorPelaksana", response.data.data[0].nama_operator)
                                setValue("alamatOperatorPelaksana", response.data.data[0].alamat_operator)
                                setValue("keteranganLain", response.data.data[0].ket_perlakuan_lain)
                                setValue("ttdPerlakuan", response.data.data[0].user_ttd_id)
                                setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                                // isiDataPtk(response)
                            } else if(response.data.status == 404) {
                                setData(values => ({...values,
                                    errorDok53: "",
                                }))
                                Swal.fire({
                                    title: "Perhatian!",
                                    text: "Laporan Hasil Perlakuan belum dibuat.\nMohon buat laporan perlakuan terlebih dahulu!",
                                    icon: "warning"
                                })
                                navigate('/k53')
                            } else {
                                setData(values => ({...values,
                                    errorDok53: "Gagal load data Laporan Hasil Perlakuan",
                                }))
                            }
                        }
                    })
                    .catch((error) => {
                        // setData()
                        if(import.meta.env.VITE_BE_ENV == "DEV") {
                            console.log(error)
                        }
                        if(error.response.status == 404) {
                            setData(values => ({...values,
                                errorDok53: "",
                            }))
                            Swal.fire({
                                title: "Perhatian!",
                                text: "Laporan Hasil Perlakuan belum dibuat.\nMohon buat laporan perlakuan terlebih dahulu!",
                                icon: "warning"
                            })
                            navigate('/k53')
                        } else {
                            setData(values => ({...values,
                                errorDok53: "Gagal load data Laporan Hasil Perlakuan",
                            }))
                        }
                    })
                } else {
                    setData(values => ({...values,
                        errorDok51: "Gagal load Data Sertifikat Perlakuan",
                    }))
                }
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
            })
        }
    },[idPtk, setValue, navigate])

    function refreshData() {
        if(data.errorPtkPage) {
            const response = modelPemohon.getPtkId(data.noIdPtk)
            response
            .then((response) => {
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorPtkPage: "",
                            listPtk: response.data.data.ptk,
                            // listKomoditas: response.data.data.ptk_komoditi,
                            listDokumen: response.data.data.ptk_dokumen
                        }))
                        let nmrKont = response.data.data.ptk_kontainer?.map(item => {
                            return item.nomor
                        })
                        setValue("idPtk", data.noIdPtk)
                        setValue("noDokumen", data.noDokumen)
                        setValue("dokKarId", 21)
                        setValue("jmlNoContainer", response.data.data.ptk_kontainer.length + (response.data.data.ptk_kontainer.length > 0 ? " (" + nmrKont.join(";") +")" : ""))
                        setValue("tempatPerlakuan", response.data.data.ptk.tempat_pemeriksaan)
                        setValue("tandaKhusus", response.data.data.ptk.tanda_khusus)
                    } else {
                        setData(values => ({...values,
                            errorPtkPage: "Gagal load data PTK"
                        }))
                    }
                } else {
                    setData(values => ({...values,
                        errorPtkPage: "Gagal load data PTK"
                    }))
                }
            })
            .catch((error) => {
                setData(values => ({...values,
                    errorPtkPage: "Gagal load data PTK"
                }))
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
            })
        }

        if(data.errorKomoditas) {
            const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, Cookies.get("jenisKarantina"))
            resKom
            .then((res) => {
                if(typeof res.data != "string") {
                    if(res.data.status == 200) {
                        setData(values => ({...values,
                            errorKomoditas: "",
                            listKomoditas: res.data.data
                        }))
                        var arrayKom = res.data.data.map(item => {
                            return {
                                jantanP4: item.jantan,
                                betinaP4: item.betina,
                                volumeP4: item.volume_lain,
                                nettoP4: item.volume_netto
                            }
                        })
                        setDataSend(arrayKom)
                    }
                } else {
                    setData(values => ({...values,
                        errorKomoditas: "Gagal load data Komoditas"
                    }))
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorKomoditas: "Gagal load data Komoditas"
                }))
            })
        }

        if(data.errorSurtug) {
            // 8: penugasan Perlakuan
            const resSurtug = modelSurtug.getSurtugByPtk(data.noIdPtk, 8);
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
                if(import.meta.env.VITE_BE_ENV == "DEV") {
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

        if(data.errorData51) {
            const resLaporan = modelPerlakuan.getPtkByDokumen(data.noIdPtk, 21)
            setValue("idPtk", data.noIdPtk)
            resLaporan
            .then((response) => {
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorDok51: "",
                        }))
                        setValue("idDok51", response.data.data[0].id)
                        setValue("noDok51", response.data.data[0].nomor)
                        setValue("noDokumen", response.data.data[0].nomor)
                        setValue("tglDok51", response.data.data[0].tanggal)
                        setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                        setValue("namaIlmiahMP", response.data.data[0].nama_ilmiah_mp)
                        setValue("namaUmumMP", response.data.data[0].nama_dagang_mp)
                        setValue("bentukJmlMP", response.data.data[0].bentuk_jmlh_mp)
                        setValue("targetPerlakuan", response.data.data[0].target_perlakuan)
                        setValue("alasanPerlakuan", response.data.data[0].alasan_perlakuan)
                        setValue("metodePerlakuan", response.data.data[0].metode_perlakuan)
                        setValue("tipePerlakuan", response.data.data[0].tipe_perlakuan_id)
                        setValue("bahanPestisida", response.data.data[0].pestisida_id)
                        setValue("dosisPestisida", response.data.data[0].dosis_aplikasi)
                        setValue("mulaiPerlakuan", response.data.data[0].tgl_perlakuan_mulai)
                        setValue("selesaiPerlakuan", response.data.data[0].tgl_perlakuan_selesai)
                        setValue("namaTempatPerlakuan", response.data.data[0].nama_tempat)
                        setValue("alamatTempatPerlakuan", response.data.data[0].alamat_tempat)
                        setValue("operatorPelaksana", response.data.data[0].nama_operator)
                        setValue("alamatOperatorPelaksana", response.data.data[0].alamat_operator)
                        setValue("keteranganLain", response.data.data[0].ket_perlakuan_lain)
                        setValue("ttdPerlakuan", response.data.data[0].user_ttd_id)
                        setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                    } else if(response.data.status == 404) {
                        setData(values => ({...values,
                            errorDok51: "",
                        }))
                    } else {
                        setData(values => ({...values,
                            errorDok51: "Gagal load data Sertifikat Perlakuan",
                        }))
                    }
                } else {
                    setData(values => ({...values,
                        errorDok51: "Gagal load data Sertifikat Perlakuan",
                    }))
                }
            })
            .catch((error) => {
                // setData()
                if(error.response.status == 404) {
                    setData(values => ({...values,
                        errorDok51: "",
                    }))
                    // getDok53()
                } else {
                    setData(values => ({...values,
                        errorDok51: "Gagal load Data Sertifikat Perlakuan",
                    }))
                }
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
            })
        }

        if(data.errorData53) {
            const resLaporan = modelPerlakuan.getPtkByDokumen(data.noIdPtk, 23)
            resLaporan
            .then((response) => {
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorDok53: "",
                        }))
                        setValue("idDok53", response.data.data[0].id)
                        setValue("noDok53", response.data.data[0].nomor)
                        // setValue("noDokumen", response.data.data[0].nomor)
                        setValue("tglDok53", response.data.data[0].tanggal)
                        setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                        setValue("namaIlmiahMP", response.data.data[0].nama_ilmiah_mp)
                        setValue("namaUmumMP", response.data.data[0].nama_dagang_mp)
                        setValue("bentukJmlMP", response.data.data[0].bentuk_jmlh_mp)
                        setValue("targetPerlakuan", response.data.data[0].target_perlakuan)
                        setValue("alasanPerlakuan", response.data.data[0].alasan_perlakuan)
                        setValue("metodePerlakuan", response.data.data[0].metode_perlakuan)
                        setValue("tipePerlakuan", response.data.data[0].tipe_perlakuan_id)
                        setValue("bahanPestisida", response.data.data[0].pestisida_id)
                        setValue("dosisPestisida", response.data.data[0].dosis_aplikasi)
                        setValue("mulaiPerlakuan", response.data.data[0].tgl_perlakuan_mulai)
                        setValue("selesaiPerlakuan", response.data.data[0].tgl_perlakuan_selesai)
                        setValue("namaTempatPerlakuan", response.data.data[0].nama_tempat)
                        setValue("alamatTempatPerlakuan", response.data.data[0].alamat_tempat)
                        setValue("operatorPelaksana", response.data.data[0].nama_operator)
                        setValue("alamatOperatorPelaksana", response.data.data[0].alamat_operator)
                        setValue("keteranganLain", response.data.data[0].ket_perlakuan_lain)
                        setValue("ttdPerlakuan", response.data.data[0].user_ttd_id)
                        setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                        // isiDataPtk(response)
                    } else if(response.data.status == 404) {
                        setData(values => ({...values,
                            errorDok53: "",
                        }))
                        Swal.fire({
                            title: "Perhatian!",
                            text: "Laporan Hasil Perlakuan belum dibuat.\nMohon buat laporan perlakuan terlebih dahulu!",
                            icon: "warning"
                        })
                        navigate('/k53')
                    } else {
                        setData(values => ({...values,
                            errorDok53: "Gagal load data Laporan Hasil Perlakuan",
                        }))
                    }
                }
            })
            .catch((error) => {
                // setData()
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response.status == 404) {
                    setData(values => ({...values,
                        errorDok53: "",
                    }))
                    Swal.fire({
                        title: "Perhatian!",
                        text: "Laporan Hasil Perlakuan belum dibuat.\nMohon buat laporan perlakuan terlebih dahulu!",
                        icon: "warning"
                    })
                    navigate('/k53')
                } else {
                    setData(values => ({...values,
                        errorDok53: "Gagal load data Laporan Hasil Perlakuan",
                    }))
                }
            })
        }
    }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-5.1 <span className="fw-light" style={{color: 'blue'}}>SERTIFIKAT PERLAKUAN / TREATMENT CERTIFICATE</span>

            <small className='float-end'>
                <span className='text-danger'>{(data.errorPtkPage ? data.errorPtkPage + "; " : "") + (data.errorKomoditas ? data.errorKomoditas + "; " : "") + (data.errorData53 ? data.errorData53 + "; " : "") + (data.errorData51 ? data.errorData51 + "; " : "") + (data.errorSurtug ? data.errorSurtug + "; " : "")}</span>
                {data.errorPtkPage || data.errorKomoditas || data.errorData53 || data.errorData51 || data.errorSurtug ?
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
                                <label className="col-sm-1 col-form-label" htmlFor="tglSurtug"><b>Tanggal</b></label>
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="hidden" name='idDok51' {...register("idDok51")} />
                            <input type="hidden" name='idSurtug' {...register("idSurtug")} />
                            <input type="hidden" name='noDokumen' {...register("noDokumen")} />
                            <input type="hidden" name='idPtk' {...register("idPtk")} />
                            {/* k-5.1 : 21 */}
                            <input type="hidden" name='dokKarId' {...register("dokKarId")} />
                            <div className="col-md-12 mt-3">
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noDok51">Nomor Dokumen</label>
                                    <div className="col-sm-3">
                                        <input type="text" id="noDok51" name='noDok51' {...register("noDok51")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-5.1" disabled />
                                    </div>
                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="tglDok51">Tanggal <span className='text-danger'>*</span></label>
                                    <div className="col-sm-2">
                                        <input type="datetime-local" id="tglDok51" name='tglDok51' {...register("tglDok51", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok51 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                        {errors.tglDok51 && <small className="text-danger">{errors.tglDok51.message}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="col">
                                    <div className="accordion" id="collapseSection">
                                        <div className="card">
                                            <h2 className="accordion-header" id="headerImporter">
                                                <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                                <h5 className='text-lightest mb-0'>Keterangan Media Pembawa</h5>
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
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="pelMuat">Pelabuhan Muat</label>
                                                                <div className="col-sm-8">
                                                                    <input type="text" id="pelMuat" value={data.listPtk?.kd_pelabuhan_muat + " - " + data.listPtk?.pelabuhan_muat || ""} disabled className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="pelBongkar">Pelabuhan Bongkar</label>
                                                                <div className="col-sm-8">
                                                                    <input type="text" id="pelBongkar" value={data.listPtk?.kd_pelabuhan_bongkar + " - " + data.listPtk?.pelabuhan_bongkar || ""} disabled className="form-control form-control-sm" placeholder="Negara/Area Tujuan" />
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
                                                        <div className="col-md-12 mb-3">
                                                            <h5><b><u>Detail Media Pembawa</u></b></h5>
                                                            <h5 className='mb-1'>Jenis Media Pembawa : <b>{Cookies.get("jenisKarantina") == "H" ? "Hewan" : (Cookies.get("jenisKarantina") == "T" ? "Tumbuhan" : (Cookies.get("jenisKarantina") == "I" ? "Ikan" : ""))}</b>
                                                                {loadKomoditi ? <SpinnerDot/> : null}
                                                                {data.listKomoditas ? 
                                                                (loadKomoditi ? null : <button type='button' className='btn btn-sm btn-outline-secondary' onClick={handleEditKomoditasAll} style={{marginLeft: "15px"}}><i className='fa-solid fa-check-square text-success me-sm-3 me-1'></i> Tidak ada perubahan</button>) : null }
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
                                                                                <th>Volume P4</th>
                                                                                <th>Netto P4</th>
                                                                                <th>Jantan P4</th>
                                                                                <th>Betina P4</th>
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
                                                                                            <td>{data.jantan}</td>
                                                                                            <td>{data.betina}</td>
                                                                                            <td>{data.volumeP4}</td>
                                                                                            <td>{data.nettoP4}</td>
                                                                                            <td>{data.jantanP4}</td>
                                                                                            <td>{data.betinaP4}</td>
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
                                                        <div className="col-md-12 mb-2">
                                                            <div className="row">
                                                                <label className="col-sm-2 col-form-label" htmlFor="jmlNoContainer">Jumlah Container</label>
                                                                <div className="col-sm-6">
                                                                    <textarea name="jmlNoContainer" id="jmlNoContainer" {...register("jmlNoContainer")} rows="2" className="form-control form-control-sm"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="targetPerlakuan">Target Perlakuan <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-4">
                                                                    <select name="targetPerlakuan" id="targetPerlakuan" {...register("targetPerlakuan", {required: "Mohon isi nama jumlah media pembawa."})} className={errors.bentukJmlMP ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                        <option value="">--</option>
                                                                        <option value="CMDT">Media Pembawa</option>
                                                                        <option value="PACK">Kemasan</option>
                                                                        <option value="CONT">Kontainer</option>
                                                                        <option value="ALL">Semua</option>
                                                                    </select>
                                                                    {errors.targetPerlakuan && <small className="text-danger">{errors.targetPerlakuan.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="tandaKhusus">Tanda Khusus</label>
                                                                <div className="col-sm-6">
                                                                    <input type="text" id="tandaKhusus" name='tandaKhusus' {...register("tandaKhusus")} className="form-control form-control-sm" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <h2 className="accordion-header" id="headerImporter">
                                                <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                                    <h5 className='text-lightest mb-0'>Keterangan Perlakuan</h5>
                                                </button>
                                            </h2>
                                            <div id="collapseImporter">
                                                <div className="accordion-body">
                                                    <div className="row">
                                                        <div className="col-md-12 mb-2">
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="alasanPerlakuan">Alasan dilakukan Tindakan Perlakuan <small className='text-danger'>*</small></label>
                                                                <div className="col-sm-8">
                                                                    <textarea name="alasanPerlakuan" id="alasanPerlakuan" rows="2" {...register("alasanPerlakuan", {required: "Mohon isi alasan tindakan perlakuan."})} className={errors.alasanPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}></textarea>
                                                                    {errors.alasanPerlakuan && <small className="text-danger">{errors.alasanPerlakuan.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="metodePerlakuan">Metode Perlakuan <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-2">
                                                                    <select name="metodePerlakuan" id="metodePerlakuan" {...register("metodePerlakuan", {required: "Mohon isi metode perlakuan."})} className={errors.metodePerlakuan ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                        <option value="">--</option>
                                                                        <option value="PHT">Perlakuan Fisik</option>
                                                                        <option value="CHT">Perlakuan Kimia</option>
                                                                    </select>
                                                                    {errors.metodePerlakuan && <small className="text-danger">{errors.metodePerlakuan.message}</small>}
                                                                </div>
                                                                <label className="col-sm-2 col-form-label text-sm-center" htmlFor="tipePerlakuan">Tipe Perlakuan <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-3">
                                                                    <select name="tipePerlakuan" id="tipePerlakuan" {...register("tipePerlakuan", {required: "Mohon isi tipe perlakuan."})} className={errors.tipePerlakuan ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                        <option value="">--</option>
                                                                        <option value="1">Tipe 1</option>
                                                                        <option value="2">Tipe 2</option>
                                                                    </select>
                                                                    {errors.tipePerlakuan && <small className="text-danger">{errors.tipePerlakuan.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="bahanPestisida">Bahan aktif pestisida yang digunakan</label>
                                                                <div className="col-sm-6">
                                                                    <input type="text" name='bahanPestisida' id='bahanPestisida' {...register("bahanPestisida")} className='form-control form-control-sm' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-2">
                                                            <div className="row">
                                                                <label className="col-sm-3 col-form-label" htmlFor="dosisPestisida">Dosis / Konsentrasi</label>
                                                                <div className="col-sm-6">
                                                                    <input type="text" name='dosisPestisida' id='dosisPestisida' {...register("dosisPestisida")} className='form-control form-control-sm' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="mulaiPerlakuan">Mulai Perlakuan <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-6">
                                                                    <input type="datetime-local" name='mulaiPerlakuan' id='mulaiPerlakuan' {...register("mulaiPerlakuan", {required: "Mohon isi tanggal dan waktu dimulainya perlakuan."})} className={errors.mulaiPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                    {errors.mulaiPerlakuan && <small className="text-danger">{errors.mulaiPerlakuan.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="row">
                                                                <label className="col-sm-5 col-form-label" htmlFor="selesaiPerlakuan">Selesai Perlakuan <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-6">
                                                                    <input type="datetime-local" name='selesaiPerlakuan' id='selesaiPerlakuan' {...register("selesaiPerlakuan", {required: "Mohon isi tanggal dan waktu selesai perlakuan."})} className={errors.selesaiPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                    {errors.selesaiPerlakuan && <small className="text-danger">{errors.selesaiPerlakuan.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="col-md-12">
                                                            <div className="row">
                                                                <label className="col-sm-2 col-form-label" htmlFor="tempatPerlakuan">Tempat Perlakuan <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-2">
                                                                    <select name="tempatPerlakuan" id="tempatPerlakuan" {...register("tempatPerlakuan", {required: "Mohon pilih tempat perlakuan."})} className={errors.tempatPerlakuan ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                        <option value="">--</option>
                                                                        <option value="IK">Instalasi Karantina</option>
                                                                        <option value="TL">Tempat Lain</option>
                                                                        <option value="DL">Depo / Lainnya</option>
                                                                    </select>
                                                                    {errors.tempatPerlakuan && <small className="text-danger">{errors.tempatPerlakuan.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="namaTempatPerlakuan">Nama Tempat <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-6">
                                                                    <input type="text" name='namaTempatPerlakuan' id='namaTempatPerlakuan' {...register("namaTempatPerlakuan", {required: "Mohon isi nama tempat perlakuan."})} className={errors.namaTempatPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                    {errors.namaTempatPerlakuan && <small className="text-danger">{errors.namaTempatPerlakuan.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="alamatTempatPerlakuan">Alamat Tempat <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-8">
                                                                    <input type="text" name='alamatTempatPerlakuan' id='alamatTempatPerlakuan' {...register("alamatTempatPerlakuan", {required: "Mohon isi nama alamat tempat perlakuan."})} className={errors.alamatTempatPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                    {errors.alamatTempatPerlakuan && <small className="text-danger">{errors.alamatTempatPerlakuan.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="operatorPelaksana">Nama Pelaksana Perlakuan <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-6">
                                                                    <input type="text" name='operatorPelaksana' id='operatorPelaksana' {...register("operatorPelaksana", {required: "Mohon isi nama operator pelaksana perlakuan."})} className={errors.operatorPelaksana ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                    {errors.operatorPelaksana && <small className="text-danger">{errors.operatorPelaksana.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row">
                                                                <label className="col-sm-4 col-form-label" htmlFor="alamatOperatorPelaksana">Alamat Pelaksana Perlakuan <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-8">
                                                                    <input type="text" name='alamatOperatorPelaksana' id='alamatOperatorPelaksana' {...register("alamatOperatorPelaksana", {required: "Mohon isi nama alamat operator pelaksana perlakuan."})} className={errors.alamatTempatPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                    {errors.alamatOperatorPelaksana && <small className="text-danger">{errors.alamatOperatorPelaksana.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className="col-md-12">
                                                            <div className="row">
                                                                <label className="col-sm-2 col-form-label" htmlFor="keteranganLain">Keterangan Lain</label>
                                                                <div className="col-sm-4">
                                                                    <textarea name="keteranganLain" id="keteranganLain" {...register("keteranganLain")} className='form-control form-control-sm' rows="2"></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{marginLeft: "6px", marginTop: "30px"}}>
                                            <label className="col-sm-2 col-form-label" htmlFor="ttdPerlakuan">Penandatangan<span className='text-danger'>*</span></label>
                                            <div className="col-sm-3">
                                                <select className={errors.ttdPerlakuan == '' ? 'form-select form-select-sm is-invalid' : 'form-select form-select-sm'} name="ttdPerlakuan" id="ttdPerlakuan" {...register("ttdPerlakuan", { required: "Mohon pilih penandatangan."})}>
                                                    <option value="">--</option>
                                                    {data.petugas?.map((item, index) => (
                                                        <option value={item.petugas_id} key={index}>{item.nama + " - " + item.nip}</option>
                                                    ))}
                                                </select>
                                                {errors.ttdPerlakuan && <small className="text-danger">{errors.ttdPerlakuan.message}</small>}
                                                <input type="text" name='ttdPerlakuan' id='ttdPerlakuan' {...register("ttdPerlakuan")} className='form-control form-control-sm' />
                                            </div>
                                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="diterbitkan">diterbitkan di<span className='text-danger'>*</span></label>
                                            <div className="col-sm-3 mb-3 pr-2">
                                                <input type="text" {...register("diterbitkan", { required: "Mohon isi tempat terbit dokumen."})} className={errors.diterbitkan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                {errors.diterbitkan && <small className="text-danger">{errors.diterbitkan.message}</small>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                                        <button type="submit" className="btn btn-primary me-sm-2 me-1"><i className='fa-solid fa-save me-sm-2 me-1'></i> Simpan</button>
                                    }
                                    <button type="button" className="btn btn-danger btn-label-secondary me-sm-2 me-1"><i className='fa-solid fa-cancel me-sm-2 me-1'></i> Batal</button>
                                    <button type="button" className="btn btn-warning btn-label-secondary me-sm-2 me-1"><i className='fa-solid fa-print me-sm-2 me-1'></i> Print</button>
                                    <button type="button" style={{display: (cekWatch.idDok51 ? "block" : "none")}} className="float-end btn btn-info btn-label-secondary"><i className='tf-icons fa-solid fa-paper-plane me-sm-2 me-1'></i> TTE</button>
                                </div>
                            </div>
                        </form>
                    </div>
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
                        <form onSubmit={handleFormMPk51(onSubmitMPk51)} className="row g-3">
                        <input type="hidden" name='idMPk51' {...registerMPk51("idMPk51")} />
                        <input type="hidden" name='idPtk' {...registerMPk51("idPtk")} />
                        <input type="hidden" name='jenisKar' {...registerMPk51("jenisKar")} />
                            <div className="col-6">
                                <label className="form-label" htmlFor="nettoP4">Volume Netto P4<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" name='nettoP4' id='nettoP4' value={(cekdataMPk51.nettoP4 ? addCommas(removeNonNumeric(cekdataMPk51.nettoP4)) : "") || ""} {...registerMPk51("nettoP4", {required: "Mohon isi volume netto."})} className={errorsMPk51.nettoP4 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanNetto' id='satuanNetto' {...registerMPk51("satuanNetto")} disabled />
                                    </div>
                                </div>
                                {errorsMPk51.volumeNetto && <small className="text-danger">{errorsMPk51.volumeNetto.message}</small>}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeP4">Volume Lain P4</label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='volumeP4' id='volumeP4' value={(cekdataMPk51.volumeP4 ? addCommas(removeNonNumeric(cekdataMPk51.volumeP4)) : "") || ""} {...registerMPk51("volumeP4")} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanLain' id='satuanLain' {...registerMPk51("satuanLain")} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6" style={{display: (data.listPtk ? (data.listPtk.jenis_media_pembawa_id == 1 ? "block" : "none") : "none")}}>
                                <label className="form-label" htmlFor="jantanP4">Jumlah Jantan P4<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-3" style={{paddingRight: '2px'}}>
                                        <input type="text" name='jantanP4' id='jantanP4' value={(cekdataMPk51.jantanP4 ? addCommas(removeNonNumeric(cekdataMPk51.jantanP4)) : "") || ""} {...registerMPk51("jantanP4", {required: (data.listPtk ? (data.listPtkjenis_media_pembawa_id == 1 ? "Mohon isi jumlah akhir Jantan." : false) : false)})} className={errorsMPk51.jantanP4 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-2" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanjantanP4' id='satuanjantanP4' value={"HEA"} disabled />
                                    </div>
                                </div>
                                {errorsMPk51.jantanP4 && <small className="text-danger">{errorsMPk51.jantanP4.message}</small>}
                            </div>
                            <div className="col-6" style={{display: (data.listPtk ? (data.listPtk.jenis_media_pembawa_id == 1 ? "block" : "none") : "none")}}>
                                <label className="form-label" htmlFor="betinaP4">Jumlah Betina P4<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-3" style={{paddingRight: '2px'}}>
                                        <input type="text" name='betinaP4' id='betinaP4' value={(cekdataMPk51.betinaP4 ? addCommas(removeNonNumeric(cekdataMPk51.betinaP4)) : "") || ""} {...registerMPk51("betinaP4", {required: (data.listPtk ? (data.listPtkjenis_media_pembawa_id == 1 ? "Mohon isi jumlah akhir Betina." : false) : false)})} className={errorsMPk51.betinaP4 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-2" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanbetinaP4' id='satuanbetinaP4' value={"HEA"} disabled />
                                    </div>
                                </div>
                                {errorsMPk51.jantanP4 && <small className="text-danger">{errorsMPk51.jantanP4.message}</small>}
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

export default DocK51