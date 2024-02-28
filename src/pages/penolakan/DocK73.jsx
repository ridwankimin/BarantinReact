/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import {decode as base64_decode} from 'base-64';
import ModaAlatAngkut from '../../model/master/modaAlatAngkut.json';
import Alasan from '../../model/master/alasan.json';
import PtkHistory from '../../model/PtkHistory';
import PtkModel from '../../model/PtkModel';
import PnPenolakan from '../../model/PnPenolakan';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import PtkSurtug from '../../model/PtkSurtug';
import SpinnerDot from '../../component/loading/SpinnerDot';

function modaAlatAngkut(e){
    return ModaAlatAngkut.find((element) => element.id === parseInt(e))
}

function alasan() {
    return Alasan.filter((element) => element.dok_id === 29)
}
const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");

const log = new PtkHistory()
const modelPemohon = new PtkModel()
const modelPenolakan = new PnPenolakan()

function DocK73() {
    const idPtk = Cookies.get("idPtkPage");
    let navigate = useNavigate();
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
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const cekWatch = watch()

    function onSubmit(data) {
        const response = modelPenolakan.save73(data, data.idDok72);
        response
        .then((response) => {
            if(response.data) {
                if(response.data.status === '201') {
                    const resHsy = log.pushHistory(data.idPtk, "p6", "K-7.3", (data.idDok73 ? 'UPDATE' : 'NEW'));
                    resHsy
                    .then((response) => {
                        if(response.data.status === '201') {
                            if(process.env.REACT_APP_BE_ENV == "DEV") {
                                console.log("history saved")
                            }
                        }
                    })
                    .catch((error) => {
                        if(process.env.REACT_APP_BE_ENV == "DEV") {
                            console.log(error)
                        }
                    });
                    //end save history

                    // alert(response.data.status + " - " + response.data.message)
                    Swal.fire({
                        title: "Sukses!",
                        text: "Laporan Hasil Penolakan berhasil " + (data.idDok73 ? "diedit." : "disimpan."),
                        icon: "success"
                    });
                    setValue("idDok73", response.data.data.id)
                    setValue("noDok73", response.data.data.nomor)
                }
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
            Swal.fire({
                title: "Error " + error.response.status,
                text: error.response.data.message,
                icon: "error"
            });
            // alert(error.response.status + " - " + error.response.data.message)
        });
    }

    const {
        register: registerMPk73,
        setValue: setValueMPk73,
        // control: controlMPk73,
        watch: watchMPk73,
        handleSubmit: handleFormMPk73,
        reset: resetFormKomoditikh1,
        formState: { errors: errorsMPk73 },
    } = useForm({
        defaultValues: {
            idMPk73: "",
            volumeNetto: "",
            volumeLain: "",
            satuanLain: "",
            jantanP6: "",
            betinaP6: "",
          }
        })

    const cekdataMPk73 = watchMPk73()

    function onSubmitMPk73(data) {
        log.updateKomoditiP6(data.idMPk73, data)
        .then((response) => {
            if(response.data.status === '201') {
                Swal.fire({
                    title: "Sukses!",
                    text: "Volume P6 berhasil diupdate.",
                    icon: "success"
                });
                resetFormKomoditikh1()
                refreshListKomoditas()
                // window.$('#modKomoditas').modal('hide')
                // document.getElementById("modKomoditas").modal('hide')
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
        })
    }

    function handleEditKomoditas(e) {
        setValueMPk73("idMPk73", e.target.dataset.headerid)
        setValueMPk73("idPtk", e.target.dataset.ptk)
        setValueMPk73("jenisKar", Cookies.get("jenisKarantina"))
        const cell = e.target.closest('tr')
        setValueMPk73("nettoP6", cell.cells[5].innerHTML)
        setValueMPk73("satuanNetto", cell.cells[6].innerHTML)
        setValueMPk73("volumeP6", cell.cells[7].innerHTML)
        setValueMPk73("satuanLain", cell.cells[8].innerHTML)
        setValueMPk73("volumeP6", cell.cells[7].innerHTML)
        setValueMPk73("jantanP6", cell.cells[9].innerHTML)
        setValueMPk73("betinaP6", cell.cells[10].innerHTML)
    }

    function handleEditKomoditasAll() {
        setLoadKomoditi(true)
        data.listKomoditas?.map((item, index) => (
            log.updateKomoditiP6(item.id, datasend[index])
                .then((response) => {
                    if(response.data.status === '201') {
                        refreshListKomoditas()
                        setLoadKomoditi(false)
                        if(process.env.REACT_APP_BE_ENV == "DEV") {
                            console.log("history saved")
                        }
                    }
                })
                .catch((error) => {
                    setLoadKomoditi(false)
                    setLoadKomoditiPesan("Terjadi error pada saat simpan, mohon refresh halaman dan coba lagi.")
                    if(process.env.REACT_APP_BE_ENV == "DEV") {
                        console.log(error)
                    }
                })
            )
        )
        setLoadKomoditi(false)
    }

    function refreshListKomoditas() {
        const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, Cookies.get("jenisKarantina"));
        resKom
        .then((res) => {
            if(res.data.status === '200') {
                setData(values => ({...values,
                    listKomoditas: res.data.data
                }));
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
        });
    }

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok73", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
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
                        setValue("namaPemilik", (response.data.data.ptk.jenis_permohonan === "IM" || response.data.data.ptk.jenis_permohonan === "DM" ? response.data.data.ptk.nama_penerima : response.data.data.ptk.nama_pengirim )) 
                        const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), Cookies.get("jenisKarantina"));
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
                                            jantanP6: item.jantan,
                                            betinaP6: item.betina,
                                            volumeP6: item.volume_lain,
                                            nettoP6: item.volume_netto
                                        }
                                    })
                                    setDataSend(arrayKom)
                                }
                            } else {
                                setData(values => ({...values,
                                    errorKomoditas: "Gagal load data Komoditas"
                                }));
                            }
                        })
                        .catch((error) => {
                            if(process.env.REACT_APP_BE_ENV == "DEV") {
                                console.log(error)
                            }
                            setData(values => ({...values,
                                errorKomoditas: "Gagal load data Komoditas"
                            }));
                        });
                        
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
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status == 404) {
                        setData(values => ({...values,
                            errorPTK: "Data PTK Kosong/Tidak ada",
                            errorKomoditas: "Gagal load data Komoditas"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK",
                            errorKomoditas: "Gagal load data Komoditas"
                        }));
                    }
                }
            });

            const resPenId = modelPenolakan.getByPtkId(base64_decode(ptkNomor[1]), 29);
            resPenId
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorPenolakan: ""
                        }));
                        if(response.data.status == 200) {
                            setValue("idDok71", response.data.data[0].id)
                            setValue("noDok71", response.data.data[0].nomor)
                            setValue("tglDok71", response.data.data[0].tanggal)
                            setValue("alasanTolak1", response.data.data[0].alasan1)
                            setValue("alasanTolak2", response.data.data[0].alasan2)
                            setValue("alasanTolak3", response.data.data[0].alasan3)
                            setValue("alasanTolak4", response.data.data[0].alasan4)
                            setValue("alasanTolak5", response.data.data[0].alasan5)
                            setValue("alasanTolak6", response.data.data[0].alasan6)
                            setValue("alasanTolak7", response.data.data[0].alasan7)
                            setValue("alasanTolak8", response.data.data[0].alasan8)
                            setValue("alasanTolak9", response.data.data[0].alasan_lain ? "1" : "")
                            setValue("alasanTolakLain", response.data.data[0].alasan_lain)
                            setValue("diwajibkan1", response.data.data[0].diwajibkan1)
                            setValue("diwajibkan2", response.data.data[0].diwajibkan2)
                            setValue("diwajibkan3", response.data.data[0].diwajibkan3)
                            setValue("diwajibkan4", response.data.data[0].diwajibkan4)
                        }
                    } else {
                        setData(values => ({...values,
                            errorPenolakan: "Gagal load data Surat Penolakan",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    setData(values => ({...values,
                        errorPenolakan: "Gagal load data Surat Penolakan",
                    }));
                }
            });

            const resPenId30 = modelPenolakan.getByPtkId(base64_decode(ptkNomor[1]), 30);
            resPenId30
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorBAPenolakan: ""
                        }));
                        if(response.data.status == 200) {
                            setValue("idDok72", response.data.data[0].id)
                            setValue("idPtk", response.data.data[0].ptk_id)
                            setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                            setValue("namaPemilik", response.data.data[0].kepada)
                            setValue("noDok72", response.data.data[0].nomor)
                            setValue("tglDok72", response.data.data[0].tanggal)
                            
                            const resPenId31 = modelPenolakan.getByPtkId(base64_decode(ptkNomor[1]), 31);
                            resPenId31
                            .then((response) => {
                                if(response.data) {
                                    if(typeof response.data != "string") {
                                        setData(values => ({...values,
                                            errorLapPenolakan: ""
                                        }));
                                        if(response.data.status == 200) {
                                            setValue("idDok73", response.data.data[0].id)
                                            setValue("noDok73", response.data.data[0].nomor)
                                            setValue("tglDok73", response.data.data[0].tanggal)
                                            setValue("namaPemilik", response.data.data[0].kepada)
                                            setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                                            setValue("ttdPutusan", response.data.data[0].user_ttd_id)
                                        }
                                    } else {
                                        setData(values => ({...values,
                                            errorLapPenolakan: "Gagal load data Laporan Hasil Penolakan",
                                        }));
                                    }
                                }
                            })
                            .catch((error) => {
                                if(process.env.REACT_APP_BE_ENV == "DEV") {
                                    console.log(error)
                                }
                                if(error.response) {
                                    if(error.response.data.status == 404) {
                                        setData(values => ({...values,
                                            errorLapPenolakan: "",
                                        }));
                                    } else {
                                        setData(values => ({...values,
                                            errorLapPenolakan: "Gagal load data Laporan Hasil Penolakan",
                                        }));
                                    }
                                }
                            });
                        }
                    } else {
                        setData(values => ({...values,
                            errorBAPenolakan: "Gagal load data Berita Acara Penolakan",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status == 404) {
                        Swal.fire("Berita Acara Penolakan tidak ada/Belum dibuat. Mohon buat Berita Acara Penolakan dahulu!");
                        navigate(process.env.PUBLIC_URL + '/k72')
                    } else {
                        setData(values => ({...values,
                            errorBAPenolakan: "Gagal load data Berita Acara Penolakan",
                        }));
                    }
                }
            });

            const modelSurtug = new PtkSurtug();
                // 9: penugasan Penolakan
            const resSurtug = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), 9);
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
                if(process.env.REACT_APP_BE_ENV == "DEV") {
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
    },[idPtk, setValue, navigate])

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
                        setValue("namaPemilik", (response.data.data.ptk.jenis_permohonan === "IM" || response.data.data.ptk.jenis_permohonan === "DM" ? response.data.data.ptk.nama_penerima : response.data.data.ptk.nama_pengirim )) 
    
                        setValue("idPtk", data.noIdPtk)
                        setValue("noDokumen", data.noDokumen)
                    }
                } else {
                    setData(values => ({...values,
                        errorPTK: "Gagal load data PTK"
                    }));
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status == 404) {
                        setData(values => ({...values,
                            errorPTK: "Data PTK Kosong/Tidak ada"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK"
                        }));
                    }
                }
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
                        }))
                        var arrayKom = res.data.data.map(item => {
                            return {
                                jantanP6: item.jantan,
                                betinaP6: item.betina,
                                volumeP6: item.volume_lain,
                                nettoP6: item.volume_netto
                            }
                        })
                        setDataSend(arrayKom)
                    }
                } else {
                    setData(values => ({...values,
                        errorKomoditas: "Gagal load data Komoditas"
                    }));
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorKomoditas: "Gagal load data Komoditas"
                }));
            });
        }

        if(data.errorPenolakan) {
            const resPenId = modelPenolakan.getByPtkId(data.noIdPtk, 29);
            resPenId
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorPenolakan: ""
                        }));
                        if(response.data.status == 200) {
                            setValue("idDok71", response.data.data[0].id)
                            setValue("noDok71", response.data.data[0].nomor)
                            setValue("tglDok71", response.data.data[0].tanggal)
                            setValue("alasanTolak1", response.data.data[0].alasan1)
                            setValue("alasanTolak2", response.data.data[0].alasan2)
                            setValue("alasanTolak3", response.data.data[0].alasan3)
                            setValue("alasanTolak4", response.data.data[0].alasan4)
                            setValue("alasanTolak5", response.data.data[0].alasan5)
                            setValue("alasanTolak6", response.data.data[0].alasan6)
                            setValue("alasanTolak7", response.data.data[0].alasan7)
                            setValue("alasanTolak8", response.data.data[0].alasan8)
                            setValue("alasanTolak9", response.data.data[0].alasan_lain ? "1" : "")
                            setValue("alasanTolakLain", response.data.data[0].alasan_lain)
                            setValue("diwajibkan1", response.data.data[0].diwajibkan1)
                            setValue("diwajibkan2", response.data.data[0].diwajibkan2)
                            setValue("diwajibkan3", response.data.data[0].diwajibkan3)
                            setValue("diwajibkan4", response.data.data[0].diwajibkan4)
                        }
                    } else {
                        setData(values => ({...values,
                            errorPenolakan: "Gagal load data Surat Penolakan",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    setData(values => ({...values,
                        errorPenolakan: "Gagal load data Surat Penolakan",
                    }));
                }
            });
        }

        if(data.errorBAPenolakan) {
            const resPenId30 = modelPenolakan.getByPtkId(data.errorBAPenolakan, 30);
            resPenId30
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorBAPenolakan: ""
                        }));
                        if(response.data.status == 200) {
                            setValue("idDok72", response.data.data[0].id)
                            setValue("idPtk", response.data.data[0].ptk_id)
                            setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                            setValue("namaPemilik", response.data.data[0].kepada)
                            setValue("noDok72", response.data.data[0].nomor)
                            setValue("tglDok72", response.data.data[0].tanggal)
                            // setValue("isAttach", response.data.data[0].is_attachment)
                            // setValue("otban", response.data.data[0].otoritas_pelabuhan)
                            // setValue("kaBc", response.data.data[0].kepala_kantor_bc)
                            // setValue("namaPengelola", response.data.data[0].nama_pengelola)

                        }
                    } else {
                        setData(values => ({...values,
                            errorBAPenolakan: "Gagal load data Berita Acara Penolakan",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status == 404) {
                        setData(values => ({...values,
                            errorBAPenolakan: "",
                        }));
                    } else {
                        setData(values => ({...values,
                            errorBAPenolakan: "Gagal load data Berita Acara Penolakan",
                        }));
                    }
                }
            });
        }

        if(data.errorLapPenolakan) {
            const resPenId31 = modelPenolakan.getByPtkId(data.noIdPtk, 31);
            resPenId31
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        setData(values => ({...values,
                            errorLapPenolakan: ""
                        }));
                        if(response.data.status == 200) {
                            setValue("idDok73", response.data.data[0].id)
                            setValue("tglDok73", response.data.data[0].tanggal)
                            setValue("namaPemilik", response.data.data[0].kepada)
                            setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                            setValue("ttdPutusan", response.data.data[0].user_ttd_id)
                        }
                    } else {
                        setData(values => ({...values,
                            errorLapPenolakan: "Gagal load data Laporan Hasil Penolakan",
                        }));
                    }
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status == 404) {
                        setData(values => ({...values,
                            errorLapPenolakan: "",
                        }));
                    } else {
                        setData(values => ({...values,
                            errorLapPenolakan: "Gagal load data Laporan Hasil Penolakan",
                        }));
                    }
                }
            });
        }

        if(data.errorSurtug) {
            const modelSurtug = new PtkSurtug();
                // 9: penugasan Penolakan
            const resSurtug = modelSurtug.getDetilSurtugPenugasan(data.noIdPtk, 9);
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
                if(process.env.REACT_APP_BE_ENV == "DEV") {
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
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-7.3 <span className="fw-light" style={{color: 'blue'}}>(Laporan Hasil Penolakan)</span>

            <small className='float-end'>
                <span className='text-danger'>{(data.errorPTK ? data.errorPTK + "; \n" : "") + (data.errorKomoditas ? data.errorKomoditas + "; \n" : "") + (data.errorPenolakan ? data.errorPenolakan + "; \n" : "") + (data.errorBAPenolakan ? data.errorBAPenolakan + "; \n" : "") + (data.errorLapPenolakan ? data.errorLapPenolakan + "; \n" : "") + (data.errorSurtug ? data.errorSurtug + "; \n" : "")}</span>
                {data.errorPTK || data.errorKomoditas || data.errorPenolakan || data.errorBAPenolakan || data.errorLapPenolakan || data.errorSurtug ?
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
                        <input type="hidden" id='idDok73' {...register("idDok73")} />
                        <input type="hidden" id='idDok72' {...register("idDok72")} />
                        <input type="hidden" id='idPtk' {...register("idPtk")} />
                        <input type="hidden" id='noDokumen' {...register("noDokumen")} />
                        <input type="hidden" id='namaPemilik' {...register("namaPemilik")} />
                        <input type="hidden" id='idSurtug' {...register("idSurtug")} />
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok72">Nomor Berita Acara Penolakan</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok72" name='noDok72' {...register("noDok72")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-7.1" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok72">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok71" name='tglDok72' disabled {...register("tglDok72")} className="form-control form-control-sm" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok73">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok73" name='noDok73' {...register("noDok73")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-7.3" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok73">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok73" name='tglDok73' {...register("tglDok73", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok73 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok73 && <small className="text-danger">{errors.tglDok73.message}</small>}
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
                                        <div className='row'>
                                            <div className="col-md-6">
                                                <h5 className='mb-1'><b><u>Identitas Pemilik</u></b></h5>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="namaPemohon">Nama</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="namaPemohon" value={(data.listPtk && (data.listPtk.jenis_permohonan === "IM" || data.listPtk.jenis_permohonan === "DM" ? data.listPtk.nama_penerima : data.listPtk.nama_pengirim )) || ""} disabled className="form-control form-control-sm" placeholder="Nama Pemilik" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatPemilik">Alamat</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="alamatPemilik" value={(data.listPtk && (data.listPtk.jenis_permohonan === "IM" || data.listPtk.jenis_permohonan === "DM" ? data.listPtk.alamat_penerima : data.listPtk.alamat_pengirim)) || ""} disabled className="form-control form-control-sm" placeholder="Nama Pemilik" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasPemilik">Identitas</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasPemilik" className="form-control form-control-sm" disabled value={(data.listPtk && (data.listPtk.jenis_permohonan === "IM" || data.listPtk.jenis_permohonan === "DM" ? data.listPtk.jenis_identitas_penerima + " - " + data.listPtk.nomor_identitas_penerima : data.listPtk.jenis_identitas_pengirim + " - " + data.listPtk.nomor_identitas_pengirim)) || ""} id="identitasPemilik" placeholder="Identitas Pemilik" />
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
                                                        <input name="daerahAsal" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.permohonan === "DK" ? data.listPtk.kota_asal : data.listPtk.negara_asal) : "") || ""} id="daerahAsal" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahTujuan">{data.listPtk ? (data.listPtk.permohonan === "DK" ? "Daerah" : "Negara") : ""} Tujuan</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahTujuan" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.permohonan === "DK" ? data.listPtk.kota_tujuan : data.listPtk.negara_tujuan) : "") || ""} id="daerahTujuan" />
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
                                                        <input name="tempatTransit" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.pelabuhan_transit === null ? "-" : data.listPtk.pelabuhan_transit + ", " + data.listPtk.negara_transit) : "") || ""} id="tempatTransit" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasAngkut">Jenis, Nama Alat Angkut</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasAngkut" className="form-control form-control-sm" disabled value={(data.listPtk ? (modaAlatAngkut(data.listPtk.tipe_alat_angkut_terakhir_id).nama + ", " + data.listPtk.nama_alat_angkut_terakhir) : "") || "" } id="identitasAngkut" />
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
                                        <h5 className='text-lightest mb-0'>II. Uraian Media Pembawa
                                        </h5>
                                    </button>
                                </h2>
                                <div id="collapseMP">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <h5 className='mb-1'>Jenis Media Pembawa : <b>{Cookies.get("jenisKarantina") === "H" ? "Hewan" : (Cookies.get("jenisKarantina") === "T" ? "Tumbuhan" : (Cookies.get("jenisKarantina") === "I" ? "Ikan" : ""))}</b>
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
                                                                <th>Jantan</th>
                                                                <th>Betina</th>
                                                                <th>Volume P6</th>
                                                                <th>Netto P6</th>
                                                                <th>Jantan P6</th>
                                                                <th>Betina P6</th>
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
                                                                            <td>{data.volumeP6}</td>
                                                                            <td>{data.nettoP6}</td>
                                                                            <td>{data.jantanP6}</td>
                                                                            <td>{data.betinaP6}</td>
                                                                            <td>
                                                                                <button typeof='button' className="btn btn-default dropdown-item" type="button" onClick={handleEditKomoditas} data-headerid={data.id} data-ptk={data.ptk_id} data-bs-toggle="modal" data-bs-target="#modKomoditas"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</button>
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
                                <h2 className="accordion-header" id="headerAlasan">
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseAlasan" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>III. Alasan Penolakan
                                        </h5>
                                    </button>
                                </h2>
                                <div id="collapseAlasan">
                                    <div className="accordion-body">
                                        {alasan().map((item, index) => (
                                            <div className="form-check" key={index}>
                                                <label className="form-check-label" htmlFor={"alasanTolak" + item.id}>{item.deskripsi}</label>
                                                <input className="form-check-input" type="checkbox" disabled name={"alasanTolak" + (index + 1)} id={"alasanTolak" + item.id} value="1" {...register("alasanTolak" + (index + 1))} />
                                                {index === 8 && cekWatch.alasanTolak9 === "1" ? 
                                                    <input type="text" className='form-control form-control-sm' disabled style={{width: "450px"}} placeholder='Lainnya..' {...register("alasanTolakLain")} />
                                                : ""}
                                            </div>
                                        ))}
                                        <hr className='mb-4 p-y'/>
                                        <h5>Kepada pemilik diwajibkan untuk:</h5>
                                        <div className="form-check">
                                            <label className="form-check-label"  htmlFor={"diwajibkan1"}>mengeluarkan media pembawa tersebut <b>dari wilayah Negara Republik Indonesia</b> dan apabila dalam jangka waktu 3 (tiga) hari kerja sejak diterimanya Surat Penolakan ini kewajiban tersebut tidak dilaksanakan, terhadap media pembawa dimaksud akan dilakukan pemusnahan.</label>
                                            <input className="form-check-input" type="checkbox" name={"diwajibkan1"} id={"diwajibkan1"} disabled value="1" {...register("diwajibkan1")} />
                                        </div>
                                        <div className="form-check">
                                            <label className="form-check-label"  htmlFor={"diwajibkan2"}>mengeluarkan media pembawa tersebut dari <b>area tujuan ke area asal</b> dan apabila dalam jangka waktu 3 (tiga) hari kerja sejak diterimanya Surat Penolakan ini kewajiban tersebut tidak dilaksanakan, terhadap media pembawa dimaksud akan dilakukan pemusnahan.</label>
                                            <input className="form-check-input" type="checkbox" name={"diwajibkan2"} id={"diwajibkan2"} disabled value="1" {...register("diwajibkan2")} />
                                        </div>
                                        <div className="form-check">
                                            <label className="form-check-label"  htmlFor={"diwajibkan3"}>mengeluarkan media pembawa tersebut <b>dari tempat pengeluaran</b> dan apabila dalam jangka waktu 3 (tiga) hari kerja sejak diterimanya Surat Penolakan ini kewajiban tersebut tidak dilaksanakan, terhadap media pembawa dimaksud akan dilakukan pemusnahan.</label>
                                            <input className="form-check-input" type="checkbox" name={"diwajibkan3"} id={"diwajibkan3"} disabled value="1" {...register("diwajibkan3")} />
                                        </div>
                                        <div className="form-check">
                                            <label className="form-check-label"  htmlFor={"diwajibkan4"}><b>tidak</b> mengirim media pembawa tersebut ke negara/area tujuan.</label>
                                            <input className="form-check-input" type="checkbox" name={"diwajibkan4"} id={"diwajibkan4"} disabled value="1" {...register("diwajibkan4")} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-3 mt-3'>
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
                        </div>
                        <div className="row">
                            <div className="offset-sm-2 col-sm-9">
                                <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                <button type="button" className="btn btn-danger btn-label-secondary me-sm-2 me-1">Batal</button>
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
                        <form onSubmit={handleFormMPk73(onSubmitMPk73)} className="row g-3">
                        <input type="hidden" name='idMPk73' {...registerMPk73("idMPk73")} />
                        <input type="hidden" name='idPtk' {...registerMPk73("idPtk")} />
                        <input type="hidden" name='jenisKar' {...registerMPk73("jenisKar")} />
                            <div className="col-6">
                                <label className="form-label" htmlFor="nettoP6">Volume Netto P6<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" name='nettoP6' id='nettoP6' value={(cekdataMPk73.nettoP6 ? addCommas(removeNonNumeric(cekdataMPk73.nettoP6)) : "") || ""} {...registerMPk73("nettoP6", {required: "Mohon isi volume netto."})} className={errorsMPk73.nettoP6 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanNetto' id='satuanNetto' {...registerMPk73("satuanNetto")} disabled />
                                    </div>
                                </div>
                                {errorsMPk73.volumeNetto && <small className="text-danger">{errorsMPk73.volumeNetto.message}</small>}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeP6">Volume Lain P6</label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='volumeP6' id='volumeP6' value={(cekdataMPk73.volumeP6 ? addCommas(removeNonNumeric(cekdataMPk73.volumeP6)) : "") || ""} {...registerMPk73("volumeP6")} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanLain' id='satuanLain' {...registerMPk73("satuanLain")} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6" style={{display: (data.listPtk ? (data.listPtk.jenis_media_pembawa_id === 1 ? "block" : "none") : "none")}}>
                                <label className="form-label" htmlFor="jantanP6">Jumlah Jantan P6<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-3" style={{paddingRight: '2px'}}>
                                        <input type="text" name='jantanP6' id='jantanP6' value={(cekdataMPk73.jantanP6 ? addCommas(removeNonNumeric(cekdataMPk73.jantanP6)) : "") || ""} {...registerMPk73("jantanP6", {required: (data.listPtk ? (data.listPtkjenis_media_pembawa_id === 1 ? "Mohon isi jumlah akhir Jantan." : false) : false)})} className={errorsMPk73.jantanP6 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-2" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanjantanP6' id='satuanjantanP6' value={"HEA"} disabled />
                                    </div>
                                </div>
                                {errorsMPk73.jantanP6 && <small className="text-danger">{errorsMPk73.jantanP6.message}</small>}
                            </div>
                            <div className="col-6" style={{display: (data.listPtk ? (data.listPtk.jenis_media_pembawa_id === 1 ? "block" : "none") : "none")}}>
                                <label className="form-label" htmlFor="betinaP6">Jumlah Betina P6<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-3" style={{paddingRight: '2px'}}>
                                        <input type="text" name='betinaP6' id='betinaP6' value={(cekdataMPk73.betinaP6 ? addCommas(removeNonNumeric(cekdataMPk73.betinaP6)) : "") || ""} {...registerMPk73("betinaP6", {required: (data.listPtk ? (data.listPtkjenis_media_pembawa_id === 1 ? "Mohon isi jumlah akhir Betina." : false) : false)})} className={errorsMPk73.betinaP6 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-2" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanbetinaP6' id='satuanbetinaP6' value={"HEA"} disabled />
                                    </div>
                                </div>
                                {errorsMPk73.jantanP6 && <small className="text-danger">{errorsMPk73.jantanP6.message}</small>}
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

export default DocK73