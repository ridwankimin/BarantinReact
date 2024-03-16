/* eslint-disable eqeqeq */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import {decode as base64_decode} from 'base-64';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PtkPemeriksaan from '../../model/PtkPemeriksaan';
import PtkModel from '../../model/PtkModel';
import Select from 'react-select';
import Master from '../../model/Master';
import PtkHistory from '../../model/PtkHistory';
import Swal from 'sweetalert2';
import PtkSurtug from '../../model/PtkSurtug';
import LoadBtn from '../../component/loading/LoadBtn';

const modelPemohon = new PtkModel()
const modelOPTK = new Master()
const modelSurtug = new PtkSurtug()
const modelPeriksa = new PtkPemeriksaan()
const log = new PtkHistory()

function DocK37b() {
    const idPtk = Cookies.get("idPtkPage");
    let [data,setData] = useState({})
    let [dataSegel,setDataSegel] = useState({})
    let [dataSegelArray,setDataSegelArray] = useState([])
    let [onLoad,setOnLoad] = useState(false)
    
    let navigate = useNavigate();
    const {
		register,
        setValue,
        watch,
		handleSubmit,
        formState: { errors },
	} = useForm()
    const dataWatch = watch()
    
    const {
		register: registerHeader,
        setValue: setvalueHeader,
        watch: watchHeader,
		handleSubmit: handleSubmitHeader,
        formState: { errors: errorsHeader },
	} = useForm()
    const dataWatchHeader = watchHeader()

    const onSubmitHeader = (dataHeader) => {
        setOnLoad(true)
        const response = modelPeriksa.ptkFisikKesehatanHeader(dataHeader);
        response
        .then((response) => {
            if(response.data) {
                setOnLoad(false)
                if(response.data.status == 201) {
                    setData(values => ({...values,
                        cekSimpan37b: true
                    }));
                    //start save history
                    const resHsy = log.pushHistory(data.idPtk, "p1b", "K-3.7b", (dataHeader.idDok37b ? 'UPDATE' : 'NEW'));
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
                        text: "Hasil Pemeriksaan Kesehatan berhasil " + (data.idDok37b ? "diedit." : "disimpan."),
                        icon: "success"
                    });
                    setValue("idDok37b", response.data.data.id)
                    setvalueHeader("idDok37b", response.data.data.id)
                    // setValue("noDok37b", response.data.data.nomor)
                } else {
                    setOnLoad(false)
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

    let [dataSelect, setDataSelect] = useState({})
    let [listKesehatan, setListKesehatan] = useState([])
    // let [listWasdal, setListWasdal] = useState([])

    const onSubmit = (data) => {
        setOnLoad(true)
        const response = modelPeriksa.ptkFisikKesehatan(data, listKesehatan);
            response
            .then((response) => {
                if(response.data) {
                    setOnLoad(false)
                    if(response.data.status == 201) {
                        //start save history
                        const resHsy = log.pushHistory(data.idPtk, "p1b", "K-3.7b", (data.idDok37b ? 'UPDATE' : 'NEW'));
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
                            text: "Laporan Hasil Pemeriksaan Kesehatan berhasil " + (data.idDok37b ? "diedit." : "disimpan."),
                            icon: "success"
                        });
                        setValue("idDok37b", response.data.data.id)
                        setvalueHeader("idDok37b", response.data.data.id)
                        setvalueHeader("tglDok37b", response.data.data.tanggal)
                        setValue("noDok37b", response.data.data.nomor)
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

    function handleSubmitSegel(e) {
        e.preventDefault();
        setDataSegelArray([...dataSegelArray, { 
            jenisSegel: dataSegel.jenisSegel,
            nomorSegel: dataSegel.nomorSegel,
            nomorKontainer: dataSegel.nomorKontainer
        }]);
        resetDataSegel()
    }
    
    function resetDataSegel() {
        setDataSegel(values => ({...values,
            jenisSegel: "",
            nomorSegel: "",
            nomorKontainer: ""
        }));
        document.getElementById("jenisSegel").focus()
    }
    
    function submitModKesehatan(e) {
        e.preventDefault();
        setOnLoad(true)
        const datakom = data.mpPeriksa.split(";")
        setListKesehatan([...listKesehatan, { 
            ptk_komoditas_id: datakom[0],
            nama_umum_tercetak: datakom[1],
            volume_lain: datakom[2],
            satuan_lain: datakom[3],
            target_sasaran1: data.targetPeriksa,
            metode1: data.metodePeriksa ? data.metodePeriksa : "",
            temuan_hasil1: data.temuanPeriksa ? data.temuanPeriksa : "",
            catatan1: data.catatanPeriksa ? data.catatanPeriksa : "",
            target_sasaran2: data.targetWasdal ? data.targetWasdal : "",
            metode2: data.metodeWasdal ? data.metodeWasdal : "",
            temuan_hasil2: data.temuanWasdal ? data.temuanWasdal : "",
            catatan2: data.catatanWasdal ? data.catatanWasdal : "",
         }]);
         Swal.fire({
            title: "Sukses!",
            text: "Data Pemeriksaan Fisik/Kesehatan berhasil ditambahkan",
            icon: "success"
        });
         setData(values => ({...values, 
            mpPeriksa: "",
            mpPeriksaView: [],
            targetPeriksa: "",
            metodePeriksa: "",
            temuanPeriksa: "",
            catatanPeriksa: "",
            valueTargetPeriksa: [],
            valueTemuanPeriksa: [],
            targetWasdal: "",
            metodeWasdal: "",
            temuanWasdal: "",
            catatanWasdal: "",
        }));
        setOnLoad(false)
    }

    useEffect(() => {
        if(idPtk) {
            setValue("tglDok37b", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            setData(values => ({...values,
                noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                idPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                noDokumen: idPtk ? base64_decode(ptkNomor[2]): "",
            }));
            setValue("idPtk", base64_decode(ptkNomor[1]))
            setValue("noDok", base64_decode(ptkNomor[2]))

            const resFisik = modelPeriksa.getFisikByPtkId(base64_decode(ptkNomor[1]))
            resFisik
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorKesehatan: ""
                            }));
                            setValue("idDok37a", response.data.data[0].pn_administrasi_id)
                            setValue("idDok37b", response.data.data[0].id)
                            setValue("tglDok37b", response.data.data[0].tanggal)
                            setValue("ptkId", response.data.data[0].ptk_id)
                            setValue("noDok", response.data.data[0].nomor)
                            setValue("noDok37b", response.data.data[0].nomor)
                            setValue("isUjiLab", response.data.data[0].is_ujilab.toString())
                            setValue("ttd1", response.data.data[0].user_ttd1_id)
                            setvalueHeader("idDok37b", response.data.data[0].id)
                            setvalueHeader("tglDok37b", response.data.data.tanggal)
                            setvalueHeader("kesimpulan37b", response.data.data[0].kesimpulan)
                            setvalueHeader("rekom37b", response.data.data[0].rekomendasi_id ? ([response.data.data[0].rekomendasi_id?.toString(), response.data.data[0].rekomendasi2_id?.toString()]) : [])
                            setvalueHeader("ttd2", response.data.data[0].user_ttd2_id)
                            setvalueHeader("idDok37b", response.data.data[0].id)
                            setvalueHeader("tglDok37b", response.data.data[0].tanggal)
                            setListKesehatan([])
                            
                            response.data.data?.map((data) => (
                                data.target_sasaran1 ? setListKesehatan(listKesehatan => listKesehatan.concat(data)) : null 
                            ))
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorKesehatan: ""
                            }));
                        } else {
                            setData(values => ({...values,
                                errorKesehatan: "Gagal load data kesehatan"
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorKesehatan: "Gagal load data kesehatan"
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
                            errorKesehatan: ""
                        }));
                    } else {
                        setData(values => ({...values,
                            errorKesehatan: "Gagal load data kesehatan"
                        }));
                    }
                }
            });

            // 2: penugasan periksa kesehatan
            const responseSurtug = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), 2);
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

            const response = modelPeriksa.getAdminByPtkId(base64_decode(ptkNomor[1]))
            response
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorAdmin: ""
                    }));
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            noAdmin: response.data.data.nomor,
                            tglAdmin: response.data.data.tanggal,
                        }));
                        setValue("idDok37a", response.data.data.id)
                    }
                } else {
                    setData(values => ({...values,
                        errorAdmin: "Gagal load data Periksa Administratif"
                    }));
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorAdmin: "Gagal load data Periksa Administratif"
                }));
            });

            const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), Cookies.get("jenisKarantina"));
            resKom
            .then((res) => {
                if(typeof res.data != "string") {
                    setData(values => ({...values,
                        errorKomoditi: ""
                    }));
                    if(res.data.status == 200) {
                        const arraySelectKomoditi = res.data.data.map(item => {
                            return {
                                value: item.id + ";" + item.nama_umum_tercetak + ";" + item.volume_lain + ";" + item.sat_lain,
                                label: item.nama_umum_tercetak + " - " + item.nama_latin_tercetak
                            }
                        })
                        setDataSelect(values => ({...values, komoditas: arraySelectKomoditi }));
                    }
                } else {
                    setData(values => ({...values,
                        errorKomoditi: "Gagal load data Komoditas"
                    }));
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorKomoditi: "Gagal load data Komoditas"
                }));
            });
            
            if(Cookies.get("jenisKarantina") == "T") {
                const resOPTK = modelOPTK.masterOPTK();
                resOPTK
                .then((res) => {
                    if(typeof res.data != "string") {
                        setData(values => ({...values,
                            errorOptk: ""
                        }));
                        if(res.data.status == 200) {
                            const arraySelectOPTK = res.data.data.map(item => {
                                return {
                                    value: item.nama_umum,
                                    label: item.nama_umum + " (" + item.nama_latin + ") - " + item.jenis + " (" + item.golongan + ")"
                                }
                            })
                            setDataSelect(values => ({...values, masterOPTK: arraySelectOPTK }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorOptk: "Gagal load data penyakit"
                        }));
                    }
                })
                .catch((error) => {
                    if(import.meta.env.VITE_BE_ENV == "DEV") {
                        console.log(error)
                    }
                    setData(values => ({...values,
                        errorOptk: "Gagal load data penyakit"
                    }));
                });
                // } else if(Cookies.get("jenisKarantina") == "H")
            } else {
                const resOPTK = modelOPTK.masterHPHK();
                resOPTK
                .then((res) => {
                    if(typeof res.data != "string") {
                        setData(values => ({...values,
                            errorOptk: ""
                        }));
                        if(res.data.status == 200) {
                            const arraySelectOPTK = res.data.data.map(item => {
                                return {
                                    value: item.uraian,
                                    label: item.kode + " - " + item.uraian
                                }
                            })
                            setDataSelect(values => ({...values, masterOPTK: arraySelectOPTK }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorOptk: "Gagal load data penyakit"
                        }));
                    }
                })
                .catch((error) => {
                    if(import.meta.env.VITE_BE_ENV == "DEV") {
                        console.log(error)
                    }
                    setData(values => ({...values,
                        errorOptk: "Gagal load data penyakit"
                    }));
                });
            }
        }
    }, [idPtk, setValue, setvalueHeader])

    function refreshData() {
        if(data.errorAdmin) {
            const response = modelPeriksa.getAdminByPtkId(data.idPtk)
            response
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorAdmin: ""
                    }));
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            noAdmin: response.data.data.nomor,
                            tglAdmin: response.data.data.tanggal,
                        }));
                        setValue("idDok37a", response.data.data.id)
                    }
                } else {
                    setData(values => ({...values,
                        errorAdmin: "Gagal load data Periksa Administratif"
                    }));
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorAdmin: "Gagal load data Periksa Administratif"
                }));
            });
        }

        if(data.errorSurtug) {
            const responseSurtug = modelSurtug.getDetilSurtugPenugasan(data.idPtk, 2);
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
        
        if(data.errorKomoditi) {
            const resKom = modelPemohon.getKomoditiPtkId(data.idPtk, Cookies.get("jenisKarantina"));
            resKom
            .then((res) => {
                if(typeof res.data != "string") {
                    setData(values => ({...values,
                        errorKomoditi: ""
                    }));
                    if(res.data.status == 200) {
                        const arraySelectKomoditi = res.data.data.map(item => {
                            return {
                                value: item.id + ";" + item.nama_umum_tercetak + ";" + item.volume_lain + ";" + item.sat_lain,
                                label: item.nama_umum_tercetak + " - " + item.nama_latin_tercetak
                            }
                        })
                        setDataSelect(values => ({...values, komoditas: arraySelectKomoditi }));
                    }
                } else {
                    setData(values => ({...values,
                        errorKomoditi: "Gagal load data Komoditas"
                    }));
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorKomoditi: "Gagal load data Komoditas"
                }));
            });
        }
            
        if(data.errorOptk) {
            if(Cookies.get("jenisKarantina") == "T") {
                const resOPTK = modelOPTK.masterOPTK();
                resOPTK
                .then((res) => {
                    if(typeof res.data != "string") {
                        setData(values => ({...values,
                            errorOptk: ""
                        }));
                        if(res.data.status == 200) {
                            const arraySelectOPTK = res.data.data.map(item => {
                                return {
                                    value: item.nama_umum,
                                    label: item.nama_umum + " (" + item.nama_latin + ") - " + item.jenis + " (" + item.golongan + ")"
                                }
                            })
                            setDataSelect(values => ({...values, masterOPTK: arraySelectOPTK }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorOptk: "Gagal load data penyakit"
                        }));
                    }
                })
                .catch((error) => {
                    if(import.meta.env.VITE_BE_ENV == "DEV") {
                        console.log(error)
                    }
                    setData(values => ({...values,
                        errorOptk: "Gagal load data penyakit"
                    }));
                });
            } else {
                const resOPTK = modelOPTK.masterHPHK();
                resOPTK
                .then((res) => {
                    if(typeof res.data != "string") {
                        setData(values => ({...values,
                            errorOptk: ""
                        }));
                        if(res.data.status == 200) {
                            const arraySelectOPTK = res.data.data.map(item => {
                                return {
                                    value: item.uraian,
                                    label: item.kode + " - " + item.uraian
                                }
                            })
                            setDataSelect(values => ({...values, masterOPTK: arraySelectOPTK }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorOptk: "Gagal load data penyakit"
                        }));
                    }
                })
                .catch((error) => {
                    if(import.meta.env.VITE_BE_ENV == "DEV") {
                        console.log(error)
                    }
                    setData(values => ({...values,
                        errorOptk: "Gagal load data penyakit"
                    }));
                });
            }
        }

        if(data.errorKesehatan) {
            const resFisik = modelPeriksa.getFisikByPtkId(data.idPtk)
            resFisik
            .then((response) => {
                if(response.data) {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorKesehatan: ""
                            }));
                            setValue("idDok37a", response.data.data[0].pn_administrasi_id)
                            setValue("idDok37b", response.data.data[0].id)
                            setValue("ptkId", response.data.data[0].ptk_id)
                            setValue("noDok", response.data.data[0].nomor)
                            setValue("noDok37b", response.data.data[0].nomor)
                            setValue("tglDok37b", response.data.data[0].tanggal)
                            setValue("isUjiLab", response.data.data[0].is_ujilab.toString())
                            setValue("ttd1", response.data.data[0].user_ttd1_id)
                            setvalueHeader("kesimpulan37b", response.data.data[0].kesimpulan)
                            setvalueHeader("rekom37b", response.data.data[0].rekomendasi_id ? ([response.data.data[0].rekomendasi_id?.toString(), response.data.data[0].rekomendasi2_id?.toString()]) : [])
                            setvalueHeader("ttd2", response.data.data[0].user_ttd2_id)
                            setvalueHeader("idDok37b", response.data.data[0].id)
                            setvalueHeader("tglDok37b", response.data.data[0].tanggal)
                            setListKesehatan([])
                            
                            response.data.data?.map((data) => (
                                data.target_sasaran1 ? setListKesehatan(listKesehatan => listKesehatan.concat(data)) : null 
                            ))
                        } else if(response.data.status == 404) {
                            setData(values => ({...values,
                                errorKesehatan: ""
                            }));
                        } else {
                            setData(values => ({...values,
                                errorKesehatan: "Gagal load data kesehatan"
                            }));
                        }
                    } else {
                        setData(values => ({...values,
                            errorKesehatan: "Gagal load data kesehatan"
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
                            errorKesehatan: ""
                        }));
                    } else {
                        setData(values => ({...values,
                            errorKesehatan: "Gagal load data kesehatan"
                        }));
                    }
                }
            });
        }
    }
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-3.7b <span className="fw-light" style={{color: 'blue'}}>LAPORAN HASIL PEMERIKSAAN KESEHATAN</span>

            <small className='float-end'>
                <span className='text-danger'>{(data.errorKesehatan ? data.errorKesehatan + "; " : "") + (data.errorAdmin ? data.errorAdmin + "; " : "") + (data.errorSurtug ? data.errorSurtug + "; " : "") + (data.errorKomoditi ? data.errorKomoditi + "; " : "") + (data.errorOptk ? data.errorOptk + "; " : "")}</span>
                {data.errorKesehatan || data.errorAdmin || data.errorSurtug || data.errorKomoditi || data.errorOptk ?
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
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noAdmin"><b>NO P. Administratif</b></label>
                                <div className="col-sm-3">
                                    <input type="text" id='noAdmin' value={data.noAdmin || ""} className='form-control form-control-sm' disabled/>
                                </div>
                                <label className="col-sm-1 col-form-label" htmlFor="tglAdmin"><b>TANGGAL</b></label>
                                <div className="col-sm-2">
                                    <input type="text" id='tglAdmin' value={data.tglAdmin || ""} className='form-control form-control-sm' disabled/>
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
                            <input type="hidden" name='idDok37b' {...register("idDok37b")} />
                            <input type="hidden" name='ptkId' {...register("ptkId")} />
                            <input type="hidden" name='idDok37a' {...register("idDok37a")} />
                            <input type="hidden" name='noDok' {...register("noDok")} />
                            <div className="col-md-12 mt-3">
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label text-sm-center" htmlFor="noDok37b">Nomor Dokumen</label>
                                    <div className="col-sm-3">
                                        <input type="text" id="noDok37b" name='noDok37b' className="form-control form-control-sm" {...register("noDok37b")} placeholder="Nomor Dokumen K-3.7b" disabled />
                                    </div>
                                    <label className="col-sm-2 col-form-label text-sm-center" htmlFor="tglDok37b">Tanggal<span className='text-danger'>*</span></label>
                                    <div className="col-sm-2">
                                        <input type="datetime-local" id="tglDok37b" name='tglDok37b' onChange={(e) => setvalueHeader("tglDok37b", e.target.value)} {...register("tglDok37b", {required: (dataWatch.tglDok37b ? "Mohon isi tanggal dokumen." : false)})} className={errors.tglDok37b ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                        {errors.tglDok37b && <small className="text-danger">{errors.tglDok37b.message}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="col">
                                    <div className="accordion" id="collapseSection">
                                        <div className="card">
                                            <h2 className="accordion-header" id="headerExporter">
                                                <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseExporter" aria-expanded="true" aria-controls="collapseExporter">
                                                    <h5 className='text-lightest mb-0'>Hasil Pemeriksaan</h5>
                                                </button>
                                            </h2>
                                            <div id="collapseExporter">
                                                <div className="accordion-body">
                                                    <button type='button' className='btn btn-sm btn-info mb-3' data-bs-toggle="modal" data-bs-target="#modKesehatan" style={{marginLeft: "15px"}}>Tambah Data</button>
                                                    <h5>
                                                        <u><b>
                                                            A. Pemeriksaan Fisik/Kesehatan, Pemeriksaan HPHK/HPIK/OPTK
                                                        </b></u>
                                                        <div className="float-end">
                                                            <a href='https://esps.karantina.pertanian.go.id/elab' rel="noreferrer" target='_blank' className='btn btn-info btn-sm'><i className="menu-icon tf-icons fa-solid fa-download"></i>Data elab Barantin</a>
                                                        </div>
                                                    </h5>
                                                    <div className="table-responsive text-nowrap" style={{height: (listKesehatan?.length > 8 ? "300px" : "")}}>
                                                        <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                            <thead>
                                                                <tr>
                                                                    <th>No</th>
                                                                    <th>Nama MP</th>
                                                                    <th>Jumlah MP</th>
                                                                    <th>Target/Sasaran</th>
                                                                    <th>Metode</th>
                                                                    <th>Temuan</th>
                                                                    <th>Catatan</th>
                                                                    <th>Act</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {listKesehatan ? (listKesehatan.map((data, index) => (data.target_sasaran1 ?
                                                                        (<tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{data.nama_umum_tercetak}</td>
                                                                            <td>{data.volume_lain + " " + data.satuan_lain}</td>
                                                                            <td>{data.target_sasaran1}</td>
                                                                            <td>{data.metode1}</td>
                                                                            <td>{data.temuan_hasil1}</td>
                                                                            <td>{data.catatan1}</td>
                                                                            <td>
                                                                                <div className="d-grid gap-2">
                                                                                    <button type='button' className="btn btn-default btn-sm text-danger"><i className='fa-solid fa-trash'></i></button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>)
                                                                    : null))
                                                                ) : null }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div>
                                                        <h5>Perlu uji lab ?
                                                            <div className="form-check form-check-inline" style={{marginLeft:"10px"}}>
                                                                <input className="form-check-input" type="radio" name="isUjiLab" id="ya" value={1} {...register("isUjiLab")} />
                                                                <label className="form-check-label mt-1" htmlFor="ya">Ya</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="isUjiLab" id="tidak" value={0}  {...register("isUjiLab")}/>
                                                                <label className="form-check-label mt-1" htmlFor="tidak">Tidak</label>
                                                            </div>
                                                        </h5>
                                                    </div>
                                                    <h5 title='Pengawasan dan Pengendalian Pangan/Pakan/SDG/PRG/Agensia Hayati/JAI/Tumbuhan dan Satwa Liar/Tumbuhan dan Satwa Langka'><u><b>B. Pengawasan dan Pengendalian</b></u></h5>
                                                    <div className="table-responsive text-nowrap" style={{height: (listKesehatan?.length > 8 ? "300px" : "")}}>
                                                        <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                            <thead>
                                                                <tr>
                                                                    <th>No</th>
                                                                    <th>Nama MP</th>
                                                                    <th>Jumlah MP</th>
                                                                    <th>Target/Sasaran</th>
                                                                    <th>Metode</th>
                                                                    <th>Temuan</th>
                                                                    <th>Catatan</th>
                                                                    <th>Act</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {listKesehatan ? (listKesehatan.map((data, index) => (data.target_sasaran2 ?
                                                                        (<tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{data.nama_umum_tercetak}</td>
                                                                            <td>{data.volume_lain + " " + data.satuan_lain}</td>
                                                                            <td>{data.target_sasaran2}</td>
                                                                            <td>{data.metode2}</td>
                                                                            <td>{data.temuan_hasil2}</td>
                                                                            <td>{data.catatan2}</td>
                                                                            <td>
                                                                                <div className="d-grid gap-2">
                                                                                    <button type='button' className="btn btn-default btn-sm text-danger"><i className='fa-solid fa-trash'></i></button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>)
                                                                    : null))
                                                                ) : null }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className='col-sm-2 form-control-label' htmlFor="ttd1"><b>Penandatangan<span className='text-danger'>*</span></b></div>
                                                        <div className="col-sm-4">
                                                            <select className={errors.ttd1 == '' ? 'form-select form-select-sm is-invalid' : 'form-select form-select-sm'} name="ttd1" id="ttd1" {...register("ttd1", { required: "Mohon pilih penandatangan."})}>
                                                                {data.petugas?.map((item, index) => (
                                                                    <option value={item.penanda_tangan_id} key={index} defaultValue={dataWatch.ttd1}>{item.nama + " - " + item.nip}</option>
                                                                ))}
                                                            </select>
                                                            {/* <input type="text" name='ttd1' id='ttd1' {...register("ttd1", {required: "Mohon pilih penandatangan."})} className={errors.ttd1 ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}/> */}
                                                            {errors.ttd1 && <small className="text-danger">{errors.ttd1.message}</small>}
                                                        </div>
                                                    </div>
                                                    {onLoad ? <LoadBtn warna="btn-primary" ukuran="btn-sm" /> :
                                                        <button type="submit" className="btn btn-sm btn-primary me-sm-2 me-1">Simpan Hasil Pemeriksaan</button>
                                                    }
                                                    {/* <button type="button" className="btn btn-sm btn-danger me-sm-2 me-1">Hapus</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form onSubmit={handleSubmitHeader(onSubmitHeader)} style={{display: (dataWatch.idDok37b ? "block" : "none")}}>
                            <input type="hidden" name='idDok37b' id='idDok37b' {...registerHeader("idDok37b")} />
                            <input type="hidden" name='tglDok37b' id='tglDok37b' {...registerHeader("tglDok37b")} />
                            <div className="row">
                                <div className='col-sm-2 form-control-label'><b>Kesimpulan</b></div>
                                <div className="col-sm-3 mb-3">
                                    <textarea name="kesimpulan37b" id="kesimpulan37b" rows="2" {...registerHeader("kesimpulan37b")} className='form-control form-control-sm'></textarea>
                                </div>
                                <div className="offset-sm-4 col-sm-2">
                                    <button type='button' className='btn rounded-pill btn-secondary' data-bs-toggle="modal" data-bs-target="#modSegel"><i className='fa-solid fa-folder-tree me-sm-2 me-1'></i>Segel Karantina</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className='col-sm-2 form-control-label'><b>Rekomendasi <span className='text-danger'>*</span></b></div>
                                <div className="col-sm-8 mb-3">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="rekom37b" id="rekom37b16" disabled={dataWatchHeader.rekom37b?.length == 2 ? (dataWatchHeader.rekom37b.indexOf('16') < 0 ? true : false) : false} value="16" {...registerHeader("rekom37b", { required: "Mohon pilih rekomendasi yang sesuai."})} />
                                        <label className="form-check-label" htmlFor="rekom37b16">Diberi Perlakuan</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="rekom37b" id="rekom37b17" disabled={dataWatchHeader.rekom37b?.length == 2 ? (dataWatchHeader.rekom37b.indexOf('17') < 0 ? true : false) : false} value="17" {...registerHeader("rekom37b")} />
                                        <label className="form-check-label" htmlFor="rekom37b17">Ditolak</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="rekom37b" id="rekom37b18" disabled={dataWatchHeader.rekom37b?.length == 2 ? (dataWatchHeader.rekom37b.indexOf('18') < 0 ? true : false) : false} value="18" {...registerHeader("rekom37b")} />
                                        <label className="form-check-label" htmlFor="rekom37b18">Dimusnahkan</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" name="rekom37b" id="rekom37b19" disabled={dataWatchHeader.rekom37b?.length == 2 ? (dataWatchHeader.rekom37b.indexOf('19') < 0 ? true : false) : false} value="19" {...registerHeader("rekom37b")} />
                                        <label className="form-check-label" htmlFor="rekom37b19">Dibebaskan</label>
                                    </div>
                                    {errorsHeader.rekom37b && <small className="text-danger">{errorsHeader.rekom37b.message}</small>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className='col-sm-2 form-control-label'><b>Penandatangan <span className='text-danger'>*</span></b></div>
                                <div className="col-sm-4">
                                    <select className={errorsHeader.ttd2 == '' ? 'form-select form-select-sm is-invalid' : 'form-select form-select-sm'} name="ttd2" id="ttd2" {...registerHeader("ttd2", { required: "Mohon pilih penandatangan."})}>
                                        {data.petugas?.map((item, index) => (
                                            <option value={item.penanda_tangan_id} key={index} defaultValue={dataWatchHeader.ttd2}>{item.nama + " - " + item.nip}</option>
                                        ))}
                                    </select>
                                    {errorsHeader.ttd2 && <small className="text-danger">{errorsHeader.ttd2.message}</small>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                                        <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                    }
                                    <button type="button" className="btn btn-danger me-sm-2 me-1">Batal</button>
                                    <a href={import("../../dok/k37a.pdf")} rel="noopener noreferrer" target='_blank' className="btn btn-warning"><i className="bx bx-printer bx-xs"></i>&nbsp; Print</a>
                                    <button style={{display: (data.cekSimpan37b ? "block" : "none")}} type='button' onClick={() => navigate('/k22')} className="btn btn-info pb-1 float-end">
                                        <span className="d-sm-inline-block d-none me-sm-1">Buat Surat Tugas</span>
                                        <i className="fa-solid fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="modKesehatan" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered1 modal-simple modal-xl">
                <div className="modal-content p-1">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="text-center mb-4">
                            <h4>Tambah Data Pemeriksaan Fisik/Kesehatan</h4>
                        </div>
                        <form onSubmit={submitModKesehatan}>
                            <div className='row'>
                                <div className='col-sm-12 mb-3'>
                                    <div className="row">
                                        <label className="form-label col-sm-2" style={{marginTop: "10px"}} htmlFor="mpPeriksa"><b>Media Pembawa</b></label>
                                        <div className='col-sm-4'>
                                            <Select defaultValue={data.mpPeriksaView} value={data.mpPeriksaView || ""} options={dataSelect.komoditas} onChange={(e) => setData(values => ({...values, mpPeriksa: e.value})) & setData(values => ({...values, mpPeriksaView: e}))} />
                                        </div>   
                                    </div>
                                </div>
                                <hr />
                                <div className='col-sm-6 mb-3' style={{borderRight: "1px grey solid"}}>
                                    <h5>A. Pemeriksaan Fisik/Kesehatan</h5>
                                    <div className="mb-2">
                                        <label className="form-label" htmlFor="targetPeriksa">Target / Sasaran</label>
                                        <Select defaultValue={data.valueTargetPeriksa} value={data.valueTargetPeriksa || ""} options={dataSelect.masterOPTK} onChange={(e) => setData(values => ({...values, targetPeriksa: Array.isArray(e) ? (e.map(x => x.value).join(";")) : [], valueTargetPeriksa: e})) } isMulti />
                                    </div>   
                                    <div className="mb-2">
                                        <label className="form-label" htmlFor="metodePeriksa">Metode</label>
                                        <textarea name="metodePeriksa" id="metodePeriksa" rows="2" value={data.metodePeriksa || ""} onChange={(e) => setData(values => ({...values, metodePeriksa: e.target.value}))} placeholder="Metode Periksa" className="form-control form-control-sm"></textarea>
                                    </div>   
                                    <div className="mb-2">
                                        <label className="form-label" htmlFor="temuanPeriksa">Temuan</label>
                                        <Select defaultValue={data.valueTemuanPeriksa} value={data.valueTemuanPeriksa || ""} options={dataSelect.masterOPTK} onChange={(e) => setData(values => ({...values, temuanPeriksa: Array.isArray(e) ? (e.map(x => x.value).join(";")) : [], valueTemuanPeriksa: e})) } isMulti />
                                    </div>   
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="catatanPeriksa">Catatan</label>
                                        <textarea className="form-control form-control-sm" name="catatanPeriksa" id="catatanPeriksa" placeholder='Catatan..' value={data.catatanPeriksa || ""} onChange={(e) => setData(values => ({...values, catatanPeriksa: e.target.value}))} rows="2"></textarea>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <h5>B. Pengawasan dan Pengendalian</h5>
                                    <div className="mb-2">
                                        <label className="form-label" htmlFor="targetWasdal">Target / Sasaran</label>
                                        <input type="text" className="form-control" id="targetWasdal" value={data.targetWasdal || ""} onChange={(e) => setData(values => ({...values, targetWasdal: e.target.value}))} placeholder="Target / Sasaran" />
                                    </div>   
                                    <div className="mb-2">
                                        <label className="form-label" htmlFor="metodeWasdal">Metode</label>
                                        <input type="text" className="form-control" id="metodeWasdal" value={data.metodeWasdal || ""} onChange={(e) => setData(values => ({...values, metodeWasdal: e.target.value}))} placeholder="Metode.." />
                                    </div>   
                                    <div className="mb-2">
                                        <label className="form-label" htmlFor="temuanWasdal">Temuan</label>
                                        <input type="text" className="form-control" id="temuanWasdal" value={data.temuanWasdal || ""} onChange={(e) => setData(values => ({...values, temuanWasdal: e.target.value}))} placeholder="Temuan.." />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="catatanWasdal">Catatan</label>
                                        <textarea className="form-control" name="catatanWasdal" id="catatanWasdal" value={data.catatanWasdal || ""} onChange={(e) => setData(values => ({...values, catatanWasdal: e.target.value}))} placeholder='Catatan..' rows="2"></textarea>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-sm-12 text-center'>
                                        {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                                            <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                        }
                                        <button type="button" className="btn btn-danger me-sm-2 me-1" data-bs-dismiss="modal" aria-label="Close">Tutup</button>
                                    </div>   
                                </div>
                            </div>
                        </form>
                    </div>
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

export default DocK37b