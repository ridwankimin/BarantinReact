/* eslint-disable eqeqeq */
import React, { useCallback, useEffect, useState,useRef } from 'react'
import PersonSvg from '../logo/svg/PersonSvg'
import ShipSvg from '../logo/svg/ShipSvg'
import PackageSvg from '../logo/svg/PackageSvg'
import DokumenSvg from '../logo/svg/DokumenSvg'
import ConfirmSvg from '../logo/svg/ConfirmSvg'
import MasterMataUang from '../model/master/MasterMataUang'
import NegaraJson from '../model/master/negara.json'
import PelabuhanJson from '../model/master/pelabuhan.json'
import JenisDokumenJson from '../model/master/jenisDokumen.json'
import JenisKemasanJson from '../model/master/jenisKemasan.json'
import AreaTangkapJson from '../model/master/areaTangkap.json'
import MasterSatuanJson from '../model/master/satuan.json'
import { Controller, useForm } from 'react-hook-form'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import PtkModel from '../model/PtkModel'
import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment'
import Select from 'react-select'
import Master from '../model/Master'
import Cookies from 'js-cookie'
import PtkHistory from '../model/PtkHistory'
import Swal from 'sweetalert2'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import garuda from '../logo/garuda.png'
import '../assets/css/k11.css';


const modelPemohon = new PtkModel()
const modelMaster = new Master()
const log = new PtkHistory()

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");

function negaraSelectByNamaEn(e) {
    const dataNegara = NegaraJson.filter((element) => element.nama_en == e)
    const retur = {
        id: dataNegara[0].id,
        value: dataNegara[0].kode + " - " + dataNegara[0].nama
    } 
    return retur
}

function masterSatuanJson(e) {
    const dataSatuan = MasterSatuanJson.filter((element) => (e == "H" ? element.sat_kh == "Y" : (e == "T" ? element.sat_kt == "Y" : (e == "I" ? element.sat_ki == "Y" : (element.id != null)))))
        
    var arraySelectSatuan = dataSatuan.map(item => {
        return {
            value: item.id,
            label: item.kode + " - " + item.nama,
        }
    })
    return arraySelectSatuan
}

function areaTangkap() {
    var arrayAreaTagnkap = AreaTangkapJson.map(item => {
        return {
            value: item.id,
            label: item.kode_area + " - " + item.deskripsi,
        }
    })
    return arrayAreaTagnkap
}

function jenisKemasan() {
    var arrayKemasan = JenisKemasanJson.map(item => {
        return {
            value: item.id,
            label: item.kode + " - " + item.deskripsi,
        }
    })
    return arrayKemasan
}

function jenisKemasanView(e) {
    if(e) {
        const dataView = JenisKemasanJson.filter((element) => element.id == parseInt(e))
        const retur = dataView[0].kode + " - " + dataView[0].deskripsi
        
        return retur
    } else {
        return ""
    }
}

function getViewAreaTangkap(e) {
    if(e) {
        var areaTangkap = AreaTangkapJson.filter((element) => element.id == e)
        var areaTangkapView = areaTangkap[0].kode_area + " - " + areaTangkap[0].deskripsi
        return areaTangkapView
    } else {
        return ""
    }
}

function handleJenisDokumen(e) {
    const dataJenisDokumen = JenisDokumenJson.filter((element) => (e == "H" ? element.komoditas_hewan == "1" : (e == "T" ? element.komoditas_tumbuhan == "1" : element.komoditas_ikan == "1")))
    var arraySelect = dataJenisDokumen.map(item => {
        return {
            value: item.id,
            label: item.kode + " - " + item.nama,
        }
    })
    return arraySelect
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
}

function DocK11() {
    require("../assets/vendor/libs/bs-stepper/bs-stepper.css")
    // require("../../assets/vendor/libs/bs-stepper/bs-stepper.js")
    
    let navigate = useNavigate();
    const idPtk = Cookies.get("idPtkPage");
    let [dataIdPage, setDataIdPage] = useState({});

    let [dataSelect, setdataSelect] = useState({});
    let [ptkLengkap, setPtkLengkap] = useState(false);
    let [wizardPage, setWizardPage] = useState(1);
    
    function handlePermohonan(e) {
        if(e.target.value == 'EX') {
            setValuePemohon("negaraPengirim", "99");
            setValuePemohon("negaraPengirimView", "ID - INDONESIA");
            setValuePemohon("negaraPenerima", "");
            setValuePemohon("negaraPenerimaView", "");
            setValuePelabuhan("negaraAsal", "99");
            setValuePelabuhan("negaraAsalView", "ID - INDONESIA");
            setValuePelabuhan("negaraTujuan", "");
            setValuePelabuhan("negaraTujuanView", "");
            setValueMP("negaraAsalMP", "99");
            setValueMP("negaraAsalMPView", "ID - INDONESIA");
            setValueMP("negaraTujuanMP", "");
            setValueMP("negaraTujuanMPView", "");
            handlePelabuhan("99", "pelMuat")
            handleKota(null, "daerahAsalMP")
        } else if(e.target.value == 'IM') {
            setValuePemohon("negaraPenerima", "99");
            setValuePemohon("negaraPenerimaView", "ID - INDONESIA");
            setValuePemohon("negaraPengirim", "");
            setValuePemohon("negaraPengirimView", "");
            setValuePelabuhan("negaraAsal", "");
            setValuePelabuhan("negaraAsalView", "");
            setValuePelabuhan("negaraTujuan", "99");
            setValuePelabuhan("negaraTujuanView", "ID - INDONESIA");
            setValueMP("negaraAsalMP", "");
            setValueMP("negaraAsalMPView", "");
            setValueMP("negaraTujuanMP", "99");
            setValueMP("negaraTujuanMPView", "ID - INDONESIA");
            handlePelabuhan("99", "pelBongkar")
            handleKota(null, "daerahTujuanMP")
        } else {
            setValuePemohon("negaraPenerima", "99");
            setValuePemohon("negaraPenerimaView", "ID - INDONESIA");
            setValuePemohon("negaraPengirim", "99");
            setValuePemohon("negaraPengirimView", "ID - INDONESIA");
            setValuePelabuhan("negaraAsal", "99");
            setValuePelabuhan("negaraAsalView", "ID - INDONESIA");
            setValuePelabuhan("negaraTujuan", "99");
            setValuePelabuhan("negaraTujuanView", "ID - INDONESIA");
            setValueMP("negaraAsalMP", "99");
            setValueMP("negaraAsalMPView", "ID - INDONESIA");
            setValueMP("negaraTujuanMP", "99");
            setValueMP("negaraTujuanMPView", "ID - INDONESIA");
            handlePelabuhan("99", "pelMuat")
            handlePelabuhan("99", "pelBongkar")
        }
    }
    
    // useEffect(() => {
    //     window.addEventListener("scroll", isSticky);
    //     return () => {
    //         window.removeEventListener("scroll", isSticky);
    //     };
    // });

    // const isSticky = (e) => {
    //     const header = document.querySelector(".card-header");
    //     const scrollTop = window.scrollY;
    //     scrollTop >= 250
    //       ? header.classList.add("is-sticky")
    //       : header.classList.remove("is-sticky");
    //   };
    
    function handleSetKomoditasSelect(e) {
        const dataKomKT = e.value;
        const dataPisahKT = dataKomKT.split(";");
        if(cekdataDiri.mediaPembawa == "T") {
            setValueDetilMP("komoditasMP", dataPisahKT[0])
            setValueDetilMP("namaUmum", dataPisahKT[1])
            setValueDetilMP("namaLatin", (dataPisahKT[2] | dataPisahKT[2] == null ? dataPisahKT[2] : "-"))
        } else if(cekdataDiri.mediaPembawa == "H") {
            setValueDetilMP("komoditasMPKHid", dataPisahKT[0])
            setValueDetilMP("namaUmumKH", dataPisahKT[1])
            setValueDetilMP("namaLatinKH", (dataPisahKT[2] | dataPisahKT[2] == null ? dataPisahKT[2] : "-"))
            // setValueDetilMP("klasifikasiMPKHid", dataPisahKT[3]) //klasifikasi KH
        } else if(cekdataDiri.mediaPembawa == "I") {
            setValueDetilMP("komoditasMPKIid", dataPisahKT[0])
            setValueDetilMP("namaUmumKI", dataPisahKT[1])
            setValueDetilMP("namaLatinKI", (dataPisahKT[2] | dataPisahKT[2] == null ? dataPisahKT[2] : "-"))
            // setValueDetilMP("klasifikasiMPKHid", dataPisahKT[3]) //klasifikasi KH
        }
    }

    function cekPrior() {
        const response = modelPemohon.cekPrior(base64_encode(cekdataDokumen.noDokumen))
        response
        .then((response) => {
            if(response.data.status == 200) {
                Swal.fire({
                    icon: "success",
                    title: response.data.message
                })
                setValueDokumen("tglDokumen" , response.data.data.doc_header.tgl_doc)
                setValueDokumen("noDokumen" , response.data.data.doc_header.docnbr)
                const negaraDoc = negaraSelectByNamaEn(response.data.data.doc_header.nama_ing)
                setValueDokumen("negaraAsalDokumen" , negaraDoc.id)
                setValueDokumen("negaraAsalDokumenView" , negaraDoc.value)
                setValueDokumen("ketDokumen" , response.data.data.doc_header.ket_tujuan)
                
                setValueDokumen("cekPrior" , "1")
            } else {
                Swal.fire({
                    icon: "error",
                    title: response.data.message
                })
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
            Swal.fire({
                icon: "error",
                title: "Dokumen Tidak Tersedia."
            })
        });
    }
    
    function handleBase64Upload(e) {
        if(e.target.files[0].type != "application/pdf") {
            Swal.fire({
                icon: "error",
                title: "Format file: .pdf",
            })
            setDataIdPage(values => ({...values,
                fileDokumenUpload: "",
            }));
        } else if(e.target.files[0].size > 2097152) {
            Swal.fire({
                icon: "error",
                title: "Max file: 2MB",
            })
            setDataIdPage(values => ({...values,
                fileDokumenUpload: "",
            }));
        } else {
            let fileReader = new FileReader();
            let files = e.target.files;
            setDataIdPage(values => ({...values,
                fileDokumenUpload: e.target.value,
            }));
            fileReader.readAsDataURL(files[0]);
            fileReader.onload = (event) => {
                setValueDokumen("fileDokumen", event.target.result);
            }
        }
    }
    
    let [formTab, setFormTab] = useState({
        tab1: false,
        tab2: true,
        tab3: true,
        tab4: true,
        tab5: true,
        // tab2: false,
        // tab3: false,
        // tab4: false,
        // tab1: true,
    });
    
    const {
		register: registerPemohon,
        setValue: setValuePemohon,
        watch: watchPemohon,
        control: controlPemohon,
		handleSubmit: handleFormPemohon,
        formState: { errors: errorsPemohon },
	} = useForm()
    
    const {
        register: registerPelabuhan,
        control: controlPelabuhan,
        setValue: setValuePelabuhan,
        watch: watchPelabuhan,
		handleSubmit: handleFormPelabuhan,
        formState: { errors: errorsPelabuhan },
	} = useForm()
    
    const {
        register: registerDokPeriksa,
        setValue: setValueDokPeriksa,
        // watch: watchDokPeriksa,
		handleSubmit: handleFormDokPeriksa,
	} = useForm()
	
    const {
		register: registerKontainer,
        setValue: setValueKontainer,
		handleSubmit: handleFormKontainer,
        watch: watchKontainer,
        formState: { errors: errorsKontainer },
        reset: resetFormKontainer
	} = useForm({
        defaultValues: {
            idDataKontainer: "",
            noKontainer: "",
            tipeKontainer: "",
            ukuranKontainer: "",
            stuffKontainer: "",
            segel: "",
        }
    })

    const cekDataKontainer = watchKontainer()
    
    const {
		register: registerMP,
        watch: watchMP,
        control: controlMP,
        setValue: setValueMP,
        handleSubmit: handleFormMP,
        formState: { errors: errorsMP },
	} = useForm({
        defaultValues: {
            satuanNilai: "IDR"
        }
    })
    
    const {
        register: registerDetilMP,
        setValue: setValueDetilMP,
        control: controlDetilMP,
        watch: watchDetilMP,
        handleSubmit: handleFormDetilMP,
        reset: resetFormKomoditi,
        formState: { errors: errorsDetilMP },
    } = useForm({
        defaultValues: {
            idDetilMP: "",
            peruntukanMP: "",
            peruntukanMPKH: "",
            peruntukanMPKI: "",
            volumeNetto: "",
            komoditasMP: "",
            komoditasMPKI: "",
            volumeBrutto: "",
            kodeHSMp: "",
            kodeHSMpKI: "",
            volumeLain: "",
            satuanLain: "",
            namaUmum: "",
            namaLatin: "",
            nilaiBarangMP: "",
            // satuanNilaiMP: "IDR",
            jumlahKemasanDetil: "",
            satuanKemasanDetil: "",
            kodeHSMpKH: "",
            komoditasMPKHid: "",
            namaUmumKH: "",
            namaLatinKH: "",
            // klasifikasiMPKHid: "",
            namaUmumKI: "",
            namaLatinKI: "",
            // klasifikasiMPKIid: "",
            jumlahMP: "",
            jumlahMPKI: "",
            satJumlahMP: "",
            satJumlahMPKI: "",
            nettoMP: "",
            brutoMP: "",
            nilaiBarangMPKH: "",
            nettoMPKI: "",
            brutoMPKI: "",
            nilaiBarangMPKI: "",
            // satuanNilaiMPKH: "IDR",
          }
        })
        
        const {
            register: registerDokumen,
            watch: watchDokumen,
            setValue: setValueDokumen,
            handleSubmit: handleFormDokumen,
            control: controlDokumen,
            reset: resetFormDokumen,
            formState: { errors: errorsDokumen },
        } = useForm({
            defaultValues: {
                idDataDokumen: "",
                jenisDokumen: "",
                kategoriDokumen: "",
                cekPrior: "",
                noDokumen: "",
                tglDokumen: "",
                negaraAsalDokumen: "",
                kotaAsalDokumen: "",
                ketDokumen: "",
                fileDokumen: "",
                datenow: ""
              }
        })
    
    const {
        register: registerKonfirmasi,
        setValue: setValueKonfirmasi,
        // watch: watchKonfirmasi,
        handleSubmit: handleFormKonfirmasi,
        // formState: { errors: errorsDokumen },
    } = useForm()
    
    const {
        register: registerVerify,
        setValue: setValueVerify,
        watch: watchVerify,
        handleSubmit: handleFormVerify,
        formState: { errors: errorsVerify },
    } = useForm()

    
    const cekdataDiri = watchPemohon()
    const cekdataPelabuhan = watchPelabuhan()
    const cekdataMP = watchMP()
    const cekdataDetilMP = watchDetilMP()
    const cekdataDokumen = watchDokumen()
    // const cekdataDokPeriksa = watchDokPeriksa()
    // const cekdataKonfirmasi = watchKonfirmasi()
    const cekdataVerify = watchVerify()

    const getListNegara = useCallback(async () => {
        const arraySelectNegara = NegaraJson.map(item => {
            return {
                value: item.id,
                label: item.kode + " - " + item.nama
            }
        })
        setdataSelect(values => ({...values, "negaraPengirim": arraySelectNegara }));
        setdataSelect(values => ({...values, "negaraPenerima": arraySelectNegara }));
        setdataSelect(values => ({...values, "negaraAsal": arraySelectNegara }));
        setdataSelect(values => ({...values, "negaraTujuan": arraySelectNegara }));
        setdataSelect(values => ({...values, "negaraTransit": arraySelectNegara }));
        setdataSelect(values => ({...values, "negaraAsalMP": arraySelectNegara }));
        setdataSelect(values => ({...values, "negaraTujuanMP": arraySelectNegara }));
        setdataSelect(values => ({...values, "negaraAsalDokumen": arraySelectNegara }));
        setdataSelect(values => ({...values, "benderaTransit": arraySelectNegara }));
        setdataSelect(values => ({...values, "benderaAkhir": arraySelectNegara }));
    }, [])

    useEffect(() => {
        getListNegara()
    }, [getListNegara])

    const getListProv = useCallback(async () => {
        try {
            const response = await modelMaster.masterProv()
            if(response.data.status == 200) {
                let dataProv = response.data.data;
                const arraySelectProv = dataProv.map(item => {
                    return {
                        value: item.id.toString(),
                        label: item.nama
                    }
                })
                setdataSelect(values => ({...values, provPemohon: arraySelectProv }))
                setdataSelect(values => ({...values, provPengirim: arraySelectProv }))
                setdataSelect(values => ({...values, provPenerima: arraySelectProv }))
            }
        } catch (error) {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
            setdataSelect(values => ({...values, provPemohon: [] }))
            setdataSelect(values => ({...values, provPengirim: [] }))
            setdataSelect(values => ({...values, provPenerima: [] }))
        }
    }, [])
    
    useEffect(() => {
      getListProv()
    }, [getListProv])

    const handleKota = useCallback(async (e, pel) => {
        try {
            const response = await modelMaster.masterKota(e)
            if(response.data.status == 200) {
                let dataKota = response.data.data;
                const arraySelectKota = dataKota.map(item => {
                return {
                    value: item.id.toString(),
                    label: item.nama
                }
                })
                setdataSelect(values => ({...values, [pel]: arraySelectKota}))
            }
        } catch (error) {
        if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
        setdataSelect(values => ({...values, [pel]: []}))
        }
    }, [])

    useEffect(() => {
        handleKota()
    }, [handleKota])

    const handlePelabuhan = useCallback(async (e, pel) => {
        if(e && pel) {
            const dataPelabuhan = PelabuhanJson.filter((element) => element.negara_id == parseInt(e))
        
            var arraySelectPelabuhan = dataPelabuhan.map(item => {
                return {
                    value: item.id,
                    label: item.kode + " - " + item.nama,
                }
            })
            setdataSelect(values => ({...values, [pel]: arraySelectPelabuhan}))
        }
    },[])

    useEffect(() => {
        handlePelabuhan()
    }, [handlePelabuhan])

    const handleKomKHIDetil = useCallback(async (e) => {
    // function handleKomKHIDetil(e) {
        // kode hs ikan sementara pake kode hs hewann
        if(cekdataDiri.mediaPembawa && cekdataDiri.jenisMp) {
            const resKodeHS = modelMaster.masterHS(cekdataDiri.mediaPembawa == "I" ? "H" : cekdataDiri.mediaPembawa)
            resKodeHS
            .then((response) => {
                let resKodeHS = response.data.data;
                var arrayKodeHS = resKodeHS.map(item => {
                    return {
                        value: item.kode,
                        label: item.kode + " - " + item.nama_en
                    }
                })
                setdataSelect(values => ({...values, "kodeHSMp": arrayKodeHS}));
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                };
            });
    
            if(cekdataDiri.mediaPembawa == "H") {
                const resKlasKH = modelMaster.masterKlasKH(e)
                resKlasKH
                .then((response) => {
                    let dataKlasKH = response.data.data;
                    var arraySelectKlasKH = dataKlasKH.map(item => {
                        return {
                            value: item.id,
                            label: item.deskripsi,
                        }
                    })
                    setdataSelect(values => ({...values, "peruntukanMPKH": arraySelectKlasKH}));

                    const resKomKH = modelMaster.masterKomKH(e)
                    resKomKH
                    .then((response) => {
                        let dataKomKH = response.data.data;
                        var arrayKomKH = dataKomKH.map(item => {
                            return {
                                value: item.id + ";" + item.nama + ";" + item.nama_latin + ";" + item.kode,
                                label: item.nama + " / " + (item.nama_en == null ? "-" : item.nama_en)
                            }
                        })
                        setdataSelect(values => ({...values, "selectKomoditasMPKH": arrayKomKH}));
                    })
                    .catch((error) => {
                        if(process.env.REACT_APP_BE_ENV == "DEV") {
                            console.log(error)
                        };
                    });
                })
                .catch((error) => {
                    if(process.env.REACT_APP_BE_ENV == "DEV") {
                        console.log(error)
                    };
                });

            } else if(cekdataDiri.mediaPembawa == "T") {
                const resPeruntukan = modelMaster.masterKlasKT(e)
                resPeruntukan
                .then((response) => {
                    let dataPeruntukanKT = response.data.data;
                    const arraySelectKlasKT = dataPeruntukanKT.map(item => {
                        return {
                            value: item.id,
                            label: item.deskripsi
                        }
                    })
                    setdataSelect(values => ({...values, "peruntukanMP": arraySelectKlasKT}))

                    const resKomKT = modelMaster.masterKomKT()
                    resKomKT
                    .then((response) => {
                        let dataKomKT = response.data.data;
                        var arrayKomKT = dataKomKT.map(item => {
                            return {
                                value: item.id + ";" + item.nama + ";" + item.nama_latin,
                                label: item.nama + " / " + (item.nama_en == null ? "-" : item.nama_en)
                            }
                        })
                        setdataSelect(values => ({...values, "selectKomoditasMP": arrayKomKT}))
                    })
                    .catch((error) => {
                        if(process.env.REACT_APP_BE_ENV == "DEV") {
                            console.log(error)
                        };
                    });
                })
                .catch((error) => {
                    if(process.env.REACT_APP_BE_ENV == "DEV") {
                        console.log(error)
                    };
                });

            } else if(cekdataDiri.mediaPembawa == "I") {
                const resPeruntukan = modelMaster.masterKlasKI(e)
                resPeruntukan
                .then((response) => {
                    let dataPeruntukanKI = response.data.data;
                    const arraySelectKlasKI = dataPeruntukanKI.map(item => {
                        return {
                            value: item.id,
                            label: item.deskripsi
                        }
                    })
                    setdataSelect(values => ({...values, "peruntukanMPKI": arraySelectKlasKI}))

                    const resKomKI = modelMaster.masterKomKI()
                    resKomKI
                    .then((response) => {
                        if(response.data.status == 200) {
                            let dataKomKI = response.data.data;
                            var arrayKomKI = dataKomKI.map(item => {
                                return {
                                    value: item.id + ";" + item.nama + ";" + item.nama_latin,
                                    label: item.nama + " / " + (item.nama_en == null ? "-" : item.nama_en)
                                }
                            })
                            setdataSelect(values => ({...values, "selectKomoditasMPKI": arrayKomKI}));
                        }
                    })
                    .catch((error) => {
                        if(process.env.REACT_APP_BE_ENV == "DEV") {
                            console.log(error)
                        };
                    });
                })
                .catch((error) => {
                    if(process.env.REACT_APP_BE_ENV == "DEV") {
                        console.log(error)
                    };
                });
            }
        }
        },[cekdataDiri.mediaPembawa, cekdataDiri.jenisMp])
    // }
    useEffect(() => {
        handleKomKHIDetil()
    }, [handleKomKHIDetil])
    
    const onSubmitDokumen = (data) => {

        const response = modelPemohon.pushDetilDokumen(data);
            response
            .then((response) => {
                if(response.data.status == 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Dokumen berhasil disimpan.",
                        showConfirmButton: false,
                        timer: 2000
                    })
                    resetFormDokumen();
                    // setSelectedFile(null)
                    dataDokumenPtk();
                    setDataIdPage(values => ({...values,
                        fileDokumenUpload: "",
                    }));
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Dokumen gagal disimpan.",
                        showConfirmButton: true,
                    })
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                };
                Swal.fire({
                    icon: "error",
                    title: "Dokumen gagal disimpan.",
                    showConfirmButton: true,
                })
        });
    }

    const onSubmitDetilMP = (data) => {
        let cekNilai
        if(cekdataDiri.mediaPembawa == "T") {
            cekNilai = data.nilaiBarangMP?.length 
        } else if(cekdataDiri.mediaPembawa == "H"){
            cekNilai = data.nilaiBarangMPKH?.length 
        } else if(cekdataDiri.mediaPembawa == "I"){
            cekNilai = data.nilaiBarangMPKI?.length 
        }
        if(cekNilai >= 4) {
            if(cekdataDiri.mediaPembawa) {
                const response = modelPemohon.pushKomoditi(data, cekdataDiri.mediaPembawa);
                response
                .then((response) => {
                    if(response.data.status == 201) {
                        Swal.fire({
                            icon: "success",
                            title: "Detil Media Pembawa berhasil disimpan.",
                            showConfirmButton: false,
                            timer: 2000
                        })
                        resetFormKomoditi();
                        dataKomoditiPtk();
                        setValueDetilMP("nilaiBarang", sumNilaiKomoditi())
                    }
                })
                .catch((error) => {
                    if(process.env.REACT_APP_BE_ENV == "DEV") {
                        console.log(error)
                    };
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Nilai minimal 4 digit"
            })
        }
    };

    const onSubmitPemohon = (data) => {
        if(idPtk) {
            const response = modelPemohon.tabPemohonUpdate(data);
            response
            .then((response) => {
                if(response.data.status == 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Data Pemohon berhasil disimpan.",
                        showConfirmButton: false,
                        timer: 2000
                    })
                    setFormTab(values => ({...values, tab2: false}))
                    setWizardPage(wizardPage + 1)
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                };
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response.data.message
                })
            });
        } else {
            Swal.fire({
                icon: "warning",
                title: "Perhatian!",
                text: "Jenis Form (" + data.jenisForm + "), Media Pembawa (" + data.mediaPembawa + "), dan jenis Permohonan (" + data.permohonan + ") tidak dapat diubah setelah data disimpan. Anda yakin ?",
                showDenyButton: true,
                confirmButtonText: "Yakin.",
                confirmButtonColor: "#089312",
                denyButtonColor: "#3085d6",
                denyButtonText: "Cek lagi."
            }).then((result) => {
                if (result.isConfirmed) {
                    const response = modelPemohon.tabPemohonInsert(data);
                    response
                    .then((response) => {
                        if(response.data.status == 201) {
                            Swal.fire({
                                icon: "success",
                                title: "Data Pemohon berhasil disimpan.",
                                showConfirmButton: false,
                                timer: 2000
                            })
                            Cookies.set("jenisKarantina", cekdataDiri.mediaPembawa)
                            Cookies.set("jenisForm", cekdataDiri.jenisForm)
                            Cookies.set("idPtkPage", base64_encode(base64_encode(response.data.data.no_aju) + 'm0R3N0r1R' + base64_encode(response.data.data.id) + "m0R3N0r1R" ))
                            setDataIdPage(values => ({...values,
                                noAju: response.data.data.no_aju,
                                noIdPtk: response.data.data.id,
                                noPermohonan: "",
                            }));
                            setValuePemohon("idPtk", response.data.data.id);
                            setValuePemohon("noAju", response.data.data.no_aju)
                            setValueKontainer("idPtk", response.data.data.id);
                            setValuePelabuhan("idPtk", response.data.data.id);
                            setValuePelabuhan("noAju", response.data.data.no_aju);
                            setValueMP("idPtk", response.data.data.id);
                            setValueMP("noAju", response.data.data.no_aju);
                            setValueDetilMP("idPtk", response.data.data.id);
                            setValueDokumen("idPtk",response.data.data.id);
                            setValueDokumen("noAju", response.data.data.no_aju);
                            setValueDokPeriksa("idPtk", response.data.data.id);
                            setValueDokPeriksa("noAju", response.data.data.no_aju);
                            setValueKonfirmasi("idPtk", response.data.data.id);
                            setValueKonfirmasi("noAju", response.data.data.no_aju);
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Data Pemohon gagal disimpan.",
                                text: response.data.status + " - " + response.data.message,
                                showConfirmButton: true
                            })
                        }
        
                        setFormTab(values => ({...values, tab2: false}))
                        setWizardPage(wizardPage + 1)
                    })
                    .catch((error) => {
                        if(process.env.REACT_APP_BE_ENV == "DEV") {
                            console.log(error)
                        };
                        Swal.fire({
                            icon: "error",
                            title: "Data Pemohon gagal disimpan.",
                            text: error.response.data.status + " - " + error.response.data.message,
                            showConfirmButton: true
                        })
                    });
                } else if (result.isDenied) {}
            });
        }
    };

    const onSubmitPelabuhan = (data) => {
        
        if(idPtk) {
            const response = modelPemohon.tabPelabuhan(data);
            response
            .then((response) => {
                if(response.data.status == 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Data Pelabuhan berhasil disimpan.",
                        showConfirmButton: false,
                        timer: 2000
                    })
                    setFormTab(values => ({...values, tab3: false}))
                    setWizardPage(wizardPage + 1)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Data Pelabuhan gagal disimpan.",
                        text: response.data.status + " - " + response.data.message,
                        showConfirmButton: true
                    })
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                };
                Swal.fire({
                    icon: "error",
                    title: "Data Pelabuhan gagal disimpan.",
                    text: error.response.data.status + " - " + error.response.data.message,
                    showConfirmButton: true
                })
            });
        } else {
            // alert('Data id kosong')
            Swal.fire({
                icon: "error",
                title: "Data id kosong.",
                showConfirmButton: true
            })
        }
    };
    
    const onSubmitKomoditas = (data) => {
    
        if(idPtk) {
             const response = modelPemohon.tabKomoditas(data);
            response
            .then((response) => {
                if(response.data.status == 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Data Komoditas berhasil disimpan.",
                        showConfirmButton: false,
                        timer: 2000
                    })
                    setFormTab(values => ({...values, tab4: false}))
                    setWizardPage(wizardPage + 1)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Data Komoditas gagal disimpan.",
                        text: response.data.status + " - " + response.data.message,
                        showConfirmButton: true
                    })
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                };
                Swal.fire({
                    icon: "error",
                    title: "Data Pemohon gagal disimpan.",
                    text: error.response.data.message,
                    showConfirmButton: true
                })
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Data id kosong.",
                showConfirmButton: true
            })
        }
    };
    
    const onSubmitDokPeriksa = (data) => {
        setFormTab(values => ({...values, tab5: false}))
        setWizardPage(wizardPage + 1)
    
        if(idPtk) {
            const response = modelPemohon.tabTempatPeriksa(data);
            response
            .then((response) => {
                if(response.data.status == 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Permohonan berhasil disubmit.",
                        showConfirmButton: false,
                        timer: 2000
                    })
                    setFormTab(values => ({...values, tab5: false}))
                    setWizardPage(wizardPage + 1)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Permohonan gagal disubmit!",
                        showConfirmButton: true
                    })
                    
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                };
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response.data.status + " - " + error.response.data.message,
                    showConfirmButton: true
                })
            });
        } else {
            // alert('Data id kosong')
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Data id kosong",
                showConfirmButton: true
            })
        }
    };
    
    const onSubmitKonfirmasi = (data) => {
        if(idPtk) {
            const response = modelPemohon.tabKonfirmasi(data);
            response
            .then((response) => {
                if(response.data.status == 201) {
                    setPtkLengkap(true);
                    setValueVerify("idPtk", data.idPtk);
                    setValueVerify("noAju", data.noAju);
                    setValueVerify("mediaPembawaVerif", cekdataDiri.mediaPembawa);
                    // alert(response.data.status + " - " + response.data.message)
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Permohonan berhasil disimpan",
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.response.status + " - " + response.response.data.message,
                        showConfirmButton: true
                    })
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                };
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response.data.status + " - " + error.response.data.message,
                    showConfirmButton: true
                })
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Data id kosong!",
                showConfirmButton: true
            })
        }
    };
    
    const onSubmitVerify = (data) => {
        if(idPtk) {
            const response = modelPemohon.ptkVerify(data);
            response
            .then((response) => {
                if(response.data.status == 201) {
                    // setPtkLengkap(true);
                    Cookies.set("idPtkPage", base64_encode(
                        base64_encode(cekdataDiri.noAju) + 'm0R3N0r1R' + 
                        base64_encode(cekdataDiri.idPtk) + "m0R3N0r1R" + 
                        base64_encode(response.data.data.no_dok_permohonan)
                        )
                    )
                    Cookies.set("tglPtk", cekdataVerify.tglTerimaVerif)
                    
                    setDataIdPage(values => ({...values,
                        noPermohonan: response.data.data.no_dok_permohonan,
                    }));
                    setValueVerify("noDokumen", response.data.data.no_dok_permohonan);
                    
                    //start save history
                    const resHsy = log.pushHistory(cekdataDiri.idPtk, "p0", "K-1.1", (dataIdPage.noPermohonan ? 'UPDATE' : 'NEW'));
                    resHsy
                    .then((response) => {
                        if(response.data.status == 201) {
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
    
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Permohonan AJU No: " + cekdataDiri.noAju + " berhasil diverifikasi",
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: response.data.message,
                        showConfirmButton: true
                    })
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                };
                Swal.fire({
                    icon: "error",
                    title: error.response.data.status + " - " + error.data.message,
                    showConfirmButton: true
                })
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Data id kosong",
                showConfirmButton: true
            })
        }
    };
    
      const onSubmitKontainer = (data) => {
        
        const response = modelPemohon.pushDetilKontainer(data);
        response
        .then((response) => {
            if(response.data.status == 201) {
                Swal.fire({
                    
                    icon: "success",
                    title: "Data Kontainer berhasil disimpan.",
                    showConfirmButton: false,
                    timer: 2000
                })
                resetFormKontainer();
                dataKontainerPtk();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Data Kontainer gagal disimpan!",
                    showConfirmButton: true,
                    text: response.data.status + " - " + response.data.message
                })
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
            Swal.fire({
                icon: "error",
                title: "Data Kontainer gagal disimpan!",
                showConfirmButton: true,
                text: error.response.data.status + " - " + error.response.data.message
            })
        });
    }      

    const handleCekSameTTD = (event) => {
        if(event.target.checked == true) {
            setValuePemohon("namaTtd", cekdataDiri.namaPemohon);
            setValuePemohon("alamatTtd", cekdataDiri.alamatPemohon);
            setValuePemohon("jenisIdentitasTtd", cekdataDiri.jenisIdentitasPemohon);
            setValuePemohon("noIdentitasTtd", cekdataDiri.noIdentitasPemohon);
        } else {
            setValuePemohon("namaTtd", "");
            setValuePemohon("alamatTtd", "");
            setValuePemohon("jenisIdentitasTtd", "");
            setValuePemohon("noIdentitasTtd", "");
        }
    }
    
    const handleCekSamePengirim = (event) => {
        if(event.target.checked == true) {
            setValuePemohon("namaPengirim", cekdataDiri.namaPemohon);
            setValuePemohon("alamatPengirim", cekdataDiri.alamatPemohon);
            setValuePemohon("jenisIdentitasPengirim", cekdataDiri.jenisIdentitasPemohon);
            setValuePemohon("noIdentitasPengirim", cekdataDiri.noIdentitasPemohon);
            setValuePemohon("nomorTlpPengirim", cekdataDiri.nomorTlp);
            setValuePemohon("negaraPengirim", (cekdataDiri.permohonan == 'IM' ? "" : "99"));
            setValuePemohon("provPengirim", (cekdataDiri.permohonan == 'IM' ? "" : cekdataDiri.provPemohon));
            setValuePemohon("provPengirimView", (cekdataDiri.permohonan == 'IM' ? "" : cekdataDiri.provPemohonView));
            setValuePemohon("kotaPengirim", (cekdataDiri.permohonan == 'IM' ? "" : cekdataDiri.kotaPemohon));
            setValuePemohon("kotaPengirimView", (cekdataDiri.permohonan == 'IM' ? "" : cekdataDiri.kotaPemohonView));
        } else {
            setValuePemohon("namaPengirim", "");
            setValuePemohon("alamatPengirim", "");
            setValuePemohon("jenisIdentitasPengirim", "");
            setValuePemohon("noIdentitasPengirim", "");
            setValuePemohon("nomorTlpPengirim", "");
            setValuePemohon("negaraPengirim", "");
            setValuePemohon("provPengirim", "");
            setValuePemohon("kotaPengirim", "");
            setValuePemohon("provPengirimView", "");
            setValuePemohon("kotaPengirimView", "");
        }
    }
    
    const handleCekSamePenerima = (event) => {
        if(event.target.checked == true) {
            setValuePemohon("namaPenerima", cekdataDiri.namaPemohon);
            setValuePemohon("alamatPenerima", cekdataDiri.alamatPemohon);
            setValuePemohon("jenisIdentitasPenerima", cekdataDiri.jenisIdentitasPemohon);
            setValuePemohon("noIdentitasPenerima", cekdataDiri.noIdentitasPemohon);
            setValuePemohon("nomorTlpPenerima", cekdataDiri.nomorTlp);
            setValuePemohon("negaraPenerima", (cekdataDiri.permohonan == 'EX' ? "" : "99"));
            setValuePemohon("provPenerima", (cekdataDiri.permohonan == 'EX' ? "" : cekdataDiri.provPemohon));
            setValuePemohon("provPenerimaView", (cekdataDiri.permohonan == 'EX' ? "" : cekdataDiri.provPemohonView));
            setValuePemohon("kotaPenerima", (cekdataDiri.permohonan == 'EX' ? "" : cekdataDiri.kotaPemohon));
            setValuePemohon("kotaPenerimaView", (cekdataDiri.permohonan == 'EX' ? "" : cekdataDiri.kotaPemohonView));
        } else {
            setValuePemohon("namaPenerima", "");
            setValuePemohon("alamatPenerima", "");
            setValuePemohon("jenisIdentitasPenerima", "");
            setValuePemohon("noIdentitasPenerima", "");
            setValuePemohon("nomorTlpPenerima", "");
            setValuePemohon("negaraPenerima", "");
            setValuePemohon("provPenerima", "");
            setValuePemohon("kotaPenerima", "");
            setValuePemohon("provPenerimaView", "");
            setValuePemohon("kotaPenerimaView", "");
        }
    }

    let [kontainerPtk, setKontainerPtk] = useState();
    let [komoditiPtk, setKomoditiPtk] = useState();
    let [dokumenPtk, setDokumenPtk] = useState();
    function dataKontainerPtk() {
        if(wizardPage == 2) {
            // const modelPemohon = new PtkModel();
            const response = modelPemohon.detilKontainerPtk(dataIdPage.noIdPtk);
            response
            .then((res) => {
                if(res.data.status == 200) {
                    setKontainerPtk(res.data.data)
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
            });
        }
    }
    
    function dataDokumenPtk() {
        if(wizardPage == 4) {
            const response = modelPemohon.getDokumenPtkId(dataIdPage.noIdPtk);
    
            response
            .then((res) => {
                if(res.data.status == 200) {
                    setDokumenPtk(res.data.data)
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
            });
        }
    }
    
    function dataKomoditiPtk() {
        if(wizardPage == 3) {
            const response = modelPemohon.getKomoditiPtkId(dataIdPage.noIdPtk, cekdataDiri.mediaPembawa);
    
            response
            .then((res) => {
                if(res.data.status == 200) {
                    setKomoditiPtk(res.data.data)
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                }
            });
        }
    }
        
    let [sizeKontainer] = useState(["20 feet", "40 feet", "40 feet", "42 feet", "43 feet", "45 feet", "50 feet", "Lainnya"])
    let [tipeKontainer] = useState(["General/Dry cargo", "Tunnel type", "Open Top Steel", "Flat Rack", "Reefer / Refrigerate", "Barge Container", "Bulk Container"])
    
    function handleSelectPemohon(e, pel) {
        if(e) {
            setValuePemohon(pel, e.value);
            setValuePemohon(pel + "View", e.label);
        }
    }

    function sumNilaiKomoditi() {
        if(komoditiPtk) {
            if(komoditiPtk?.length > 0) {
                var arrayNilai = komoditiPtk?.map(item => {
                    return item.harga
                })
                const sum = arrayNilai.reduce((partialSum, a) => partialSum + a, 0);
                return sum
            } else {
                return 0
            }
        } else {
            return 0
        }
    }
    
    function handleEditKontainer(e) {
        const response = modelPemohon.detilKontainerId(e.target.dataset.header);
        response
        .then((res) => {
            if(res.data.status == 200) {
                setValueKontainer("idDataKontainer", res.data.data.id)
                setValueKontainer("idPtk", res.data.data.ptk_id)
                setValueKontainer("noKontainer", res.data.data.nomor)
                setValueKontainer("tipeKontainer", res.data.data.tipe_kontainer_id.toString())
                setValueKontainer("ukuranKontainer", res.data.data.ukuran_kontainer_id.toString())
                setValueKontainer("stuffKontainer", res.data.data.stuff_kontainer_id.toString())
                setValueKontainer("segel", res.data.data.segel)
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
        });
    }

    function handleEditKomoditas(e) {
        setValueDetilMP("idDetilMP", e.target.dataset.header)
        setValueDetilMP("idPtk", e.target.dataset.ptk)
        setValueDetilMP("jenisKar", cekdataDiri.mediaPembawa)
        const cell = e.target.closest('tr')
        if(cekdataDiri.mediaPembawa == "H") {
            setTimeout(() => {
                setValueDetilMP("peruntukanMPKH", e.target.dataset.klas)
                setValueDetilMP("kodeHSMpKH", cell.cells[1].innerHTML)
                setValueDetilMP("komoditasMPKHid", e.target.dataset.kom)
                setValueDetilMP("namaUmumKH", cell.cells[3].innerHTML)
                setValueDetilMP("namaLatinKH", cell.cells[4].innerHTML)
                // setValueDetilMP("klasifikasiMPKHid", e.target.dataset.klas)
                setValueDetilMP("jumlahMP", cell.cells[9].innerHTML)
                setValueDetilMP("satJumlahMP", e.target.dataset.satuanlain)
                setValueDetilMP("breedMP", e.target.dataset.ket)
                setValueDetilMP("jantan", cell.cells[11].innerHTML)
                setValueDetilMP("betina", cell.cells[12].innerHTML)
                setValueDetilMP("nettoMP", cell.cells[5].innerHTML)
                setValueDetilMP("brutoMP", cell.cells[7].innerHTML)
                setValueDetilMP("nilaiBarangMPKH", cell.cells[13].innerHTML)
                setValueDetilMP("satuanNilaiMPKH", cell.cells[14].innerHTML)
            }, 300)
        } else if(cekdataDiri.mediaPembawa == "T") {
            setTimeout(() => {
                setValueDetilMP("peruntukanMP", e.target.dataset.klas)
                setValueDetilMP("volumeNetto", cell.cells[5].innerHTML)
                setValueDetilMP("komoditasMP", e.target.dataset.kom)
                setValueDetilMP("volumeBrutto", cell.cells[7].innerHTML)
                setValueDetilMP("kodeHSMp", cell.cells[1].innerHTML)
                setValueDetilMP("volumeLain", cell.cells[9].innerHTML)
                setValueDetilMP("satuanLain", e.target.dataset.satuanlain)
                setValueDetilMP("namaUmum", cell.cells[3].innerHTML)
                setValueDetilMP("namaLatin", cell.cells[4].innerHTML)
                setValueDetilMP("nilaiBarangMP", cell.cells[13].innerHTML)
                setValueDetilMP("satuanNilaiMP", cell.cells[14].innerHTML)
                setValueDetilMP("jumlahKemasanDetil", e.target.dataset.kemasan)
                setValueDetilMP("satuanKemasanDetil", e.target.dataset.kemasansat)
                setValueDetilMP("satuanKemasanDetilView", jenisKemasanView(e.target.dataset.kemasansat))
            },300)
        } else if(cekdataDiri.mediaPembawa == "I") {
            setTimeout(() => {
                setValueDetilMP("peruntukanMPKI", e.target.dataset.klas)
                setValueDetilMP("kodeHSMpKI", cell.cells[1].innerHTML)
                setValueDetilMP("komoditasMPKIid", e.target.dataset.kom)
                setValueDetilMP("namaUmumKI", cell.cells[3].innerHTML)
                setValueDetilMP("namaLatinKI", cell.cells[4].innerHTML)
                setValueDetilMP("nettoMPKI", cell.cells[5].innerHTML)
                setValueDetilMP("jumlahMPKI", cell.cells[9].innerHTML)
                setValueDetilMP("satJumlahMPKI", e.target.dataset.satuanlain)
                setValueDetilMP("brutoMPKI", cell.cells[7].innerHTML)
                setValueDetilMP("nilaiBarangMPKI", cell.cells[13].innerHTML)
                setValueDetilMP("satuanNilaiMPKI", cell.cells[14].innerHTML)
            }, 300)
        }
    }
    
    function handleEditDokumen(e) {
        const response = modelPemohon.getDokumenId(e.target.dataset.header);
        response
        .then((res) => {
            if(res.data.status == 200) {
                setValueDokumen("idDataDokumen", res.data.data.id)
                setValueDokumen("idPtk", res.data.data.ptk_id)
                setValueDokumen("noAju", dataIdPage.noAju)
                setValueDokumen("kategoriDokumen", res.data.data.kategori_dokumen)
                setValueDokumen("jenisDokumen", res.data.data.kode_dokumen)
                setValueDokumen("jenisDokumenView", res.data.data.kode_dokumen + " - " + res.data.data.nama_dokumen)
                setValueDokumen("noDokumen", res.data.data.no_dokumen)
                setValueDokumen("negaraAsalDokumen", res.data.data.negara_asal_id == null ? "" : res.data.data.negara_asal_id.toString())
                setValueDokumen("negaraAsalDokumenView", res.data.data.negara_asal)
                setValueDokumen("kotaAsalDokumen", res.data.data.kota_kab_asal_id == null ? "" : res.data.data.kota_kab_asal_id.toString())
                setValueDokumen("kotaAsalDokumenView", res.data.data.kota_kab_asal)
                setValueDokumen("ketDokumen", res.data.data.keterangan)
                setValueDokumen("tglDokumen", res.data.data.tanggal_dokumen)
            }
        })
        .catch((error) => {
            if(process.env.REACT_APP_BE_ENV == "DEV") {
                console.log(error)
            }
        });
    }
    
    function handleSelectNegKomoditas(e, pel) {
        if(e) {
            setValueMP(pel, e.value);
            setValueMP(pel + "View", e.label);
        }
    }
    
    useEffect(()=>{
        if(idPtk) {
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            setDataIdPage(values => ({...values,
                noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                noPermohonan: idPtk ? (base64_decode(ptkNomor[2]) == "null" ? "" : base64_decode(ptkNomor[2])) : "",
            }));

            setdataSelect(values => ({...values, "satuanNilai": <MasterMataUang/>}));
            const response = modelPemohon.getPtkId(base64_decode(ptkNomor[1]));
            response
            .then((response) => {
                if(response.data.status == 200) {
                    handlePelabuhan(response.data.data.ptk.negara_muat_id, "pelMuat")
                    handlePelabuhan(response.data.data.ptk.negara_bongkar_id, "pelBongkar")
                    if(response.data.data.ptk.negara_asal_id == 99) {
                        handleKota(null, "daerahAsalMP")
                    }
                    if(response.data.data.ptk.negara_tujuan_id == 99) {
                        handleKota(null, "daerahTujuanMP")
                    }

                    if(response.data.data.ptk.jenis_karantina != null) {
                        // kode hs ikan sementara pake kode hs hewan
                        const resHs = modelMaster.masterHS(response.data.data.ptk.jenis_karantina == "I" ? "H" : response.data.data.ptk.jenis_karantina)
                        resHs
                        .then((response) => {
                            let dataHS = response.data.data;
                            var arrayDataHS = dataHS.map(item => {
                                return {
                                    value: item.kode,
                                    label: item.kode + " - " + item.nama_en
                                }
                            })
                            setdataSelect(values => ({...values, "kodeHSMp": arrayDataHS}));
                        })
                        .catch((error) => {
                            if(process.env.REACT_APP_BE_ENV == "DEV") {
                                console.log(error)
                            };
                        });

                        // handleKomKHIDetil(response.data.data.ptk.jenis_media_pembawa_id)
                        if(response.data.data.ptk.jenis_karantina && response.data.data.ptk.jenis_media_pembawa_id) {
                            const resKodeHS = modelMaster.masterHS(response.data.data.ptk.jenis_karantina)
                            resKodeHS
                            .then((response) => {
                                let resKodeHS = response.data.data;
                                var arrayKodeHS = resKodeHS?.map(item => {
                                    return {
                                        value: item.kode,
                                        label: item.kode + " - " + item.nama_en
                                    }
                                })
                                setdataSelect(values => ({...values, "kodeHSMp": arrayKodeHS}));
                            })
                            .catch((error) => {
                                if(process.env.REACT_APP_BE_ENV == "DEV") {
                                    console.log(error)
                                };
                            });
                    
                            if(response.data.data.ptk.jenis_karantina == "H") {
                                const resKlasKH = modelMaster.masterKlasKH(response.data.data.ptk.jenis_media_pembawa_id)
                                resKlasKH
                                .then((response) => {
                                    let dataKlasKH = response.data.data;
                                    var arraySelectKlasKH = dataKlasKH?.map(item => {
                                        return {
                                            value: item.id,
                                            label: item.deskripsi,
                                        }
                                    })
                                    setdataSelect(values => ({...values, "peruntukanMPKH": arraySelectKlasKH}));
                                })
                                .catch((error) => {
                                    if(process.env.REACT_APP_BE_ENV == "DEV") {
                                        console.log(error)
                                    };
                                });
                                
                                const resKomKH = modelMaster.masterKomKH(response.data.data.ptk.jenis_media_pembawa_id)
                                resKomKH
                                .then((response) => {
                                    let dataKomKH = response.data.data;
                                    var arrayKomKH = dataKomKH?.map(item => {
                                        return {
                                            value: item.id + ";" + item.nama + ";" + item.nama_latin + ";" + item.kode,
                                            label: item.nama + " / " + (item.nama_en == null ? "-" : item.nama_en)
                                        }
                                    })
                                    setdataSelect(values => ({...values, "selectKomoditasMPKH": arrayKomKH}));
                                })
                                .catch((error) => {
                                    if(process.env.REACT_APP_BE_ENV == "DEV") {
                                        console.log(error)
                                    };
                                });
                
                            } else if(response.data.data.ptk.jenis_karantina == "T") {
                                const resPeruntukan = modelMaster.masterKlasKT(response.data.data.ptk.jenis_media_pembawa_id)
                                resPeruntukan
                                .then((response) => {
                                    let dataPeruntukanKT = response.data.data;
                                    const arraySelectKlasKT = dataPeruntukanKT?.map(item => {
                                        return {
                                            value: item.id,
                                            label: item.deskripsi
                                        }
                                    })
                                    setdataSelect(values => ({...values, "peruntukanMP": arraySelectKlasKT}))
                                })
                                .catch((error) => {
                                    if(process.env.REACT_APP_BE_ENV == "DEV") {
                                        console.log(error)
                                    };
                                });
                                
                                const resKomKT = modelMaster.masterKomKT()
                                resKomKT
                                .then((response) => {
                                    let dataKomKT = response.data.data;
                                    var arrayKomKT = dataKomKT?.map(item => {
                                        return {
                                            value: item.id + ";" + item.nama + ";" + item.nama_latin,
                                            label: item.nama + " / " + (item.nama_en == null ? "-" : item.nama_en)
                                        }
                                    })
                                    setdataSelect(values => ({...values, "selectKomoditasMP": arrayKomKT}))
                                })
                                .catch((error) => {
                                    if(process.env.REACT_APP_BE_ENV == "DEV") {
                                        console.log(error)
                                    };
                                });
                
                            } else if(response.data.data.ptk.jenis_karantina == "I") {
                                const resPeruntukan = modelMaster.masterKlasKI(response.data.data.ptk.jenis_media_pembawa_id)
                                resPeruntukan
                                .then((response) => {
                                    let dataPeruntukanKI = response.data.data;
                                    const arraySelectKlasKI = dataPeruntukanKI?.map(item => {
                                        return {
                                            value: item.id,
                                            label: item.deskripsi
                                        }
                                    })
                                    setdataSelect(values => ({...values, "peruntukanMPKI": arraySelectKlasKI}))
                                })
                                .catch((error) => {
                                    if(process.env.REACT_APP_BE_ENV == "DEV") {
                                        console.log(error)
                                    };
                                });
                                
                                const resKomKI = modelMaster.masterKomKI()
                                resKomKI
                                .then((response) => {
                                    if(response.data.status == 200) {
                                        let dataKomKI = response.data.data;
                                        var arrayKomKI = dataKomKI?.map(item => {
                                            return {
                                                value: item.id + ";" + item.nama + ";" + item.nama_latin,
                                                label: item.nama + " / " + (item.nama_en == null ? "-" : item.nama_en)
                                            }
                                        })
                                        setdataSelect(values => ({...values, "selectKomoditasMPKI": arrayKomKI}));
                                    }
                                })
                                .catch((error) => {
                                    if(process.env.REACT_APP_BE_ENV == "DEV") {
                                        console.log(error)
                                    };
                                });
                            }
                        }
                    }

                    setdataSelect(values => ({...values, "pelMuat": {value: response.data.data.ptk.pelabuhan_muat_id, label: response.data.data.ptk.kd_pelabuhan_muat + " - " + response.data.data.ptk.pelabuhan_muat}}))
                    setdataSelect(values => ({...values, "pelBongkar": {value: response.data.data.ptk.pelabuhan_bongkar_id, label: response.data.data.ptk.kd_pelabuhan_bongkar + " - " + response.data.data.ptk.pelabuhan_bongkar}}))
                    if(response.data.data.ptk.is_transit == 1) {
                        setdataSelect(values => ({...values, "pelTransit": {value: response.data.data.ptk.pelabuhan_transit_id, label: response.data.data.ptk.kd_pelabuhan_transit + " - " + response.data.data.ptk.pelabuhan_transit}}))
                    }
                    setTimeout(() => {
                        setValuePemohon("idPtk", response.data.data.ptk.id);
                        setValuePemohon("noAju", response.data.data.ptk.no_aju)
                        setValueKontainer("idPtk", response.data.data.ptk.id);
                        setValuePelabuhan("idPtk", response.data.data.ptk.id);
                        setValuePelabuhan("noAju", response.data.data.ptk.no_aju);
                        setValueMP("idPtk", response.data.data.ptk.id);
                        setValueMP("noAju", response.data.data.ptk.no_aju);
                        setValueDetilMP("idPtk", response.data.data.ptk.id);
                        setValueDokPeriksa("idPtk", response.data.data.ptk.id);
                        setValueDokPeriksa("noAju", response.data.data.ptk.no_aju);
                        setValueDokumen("idPtk",response.data.data.ptk.id);
                        setValueDokumen("noAju", response.data.data.ptk.no_aju);
                        setValueKonfirmasi("idPtk", response.data.data.ptk.id);
                        setValueKonfirmasi("noAju", response.data.data.ptk.no_aju);
                        setValueVerify("idPtk", response.data.data.ptk.id); // delete soon
                        setValueVerify("noAju", response.data.data.ptk.no_aju); // delete soon
                        setValueVerify("mediaPembawaVerif", response.data.data.ptk.jenis_karantina); // delete soon
            
                        setValuePemohon("jenisForm", response.data.data.ptk.jenis_dokumen);
                        setValuePemohon("mediaPembawa", response.data.data.ptk.jenis_karantina);
                        setValuePemohon("jenisMp", response.data.data.ptk.jenis_media_pembawa_id == null ? "" : response.data.data.ptk.jenis_media_pembawa_id.toString());
                        setValuePemohon("statPemilik", response.data.data.ptk.stat_pemohon);
                        
                        setValuePemohon("pJRutin", response.data.data.ptk.is_guest ? response.data.data.ptk.is_guest.toString() : "");
                        setValuePemohon("namaPemohon", response.data.data.ptk.nama_pemohon);
                        setValuePemohon("permohonan", response.data.data.ptk.jenis_permohonan);
                        setValuePemohon("jenisIdentitasPemohon", response.data.data.ptk.jenis_identitas_pemohon);
                        setValuePemohon("noIdentitasPemohon", response.data.data.ptk.nomor_identitas_pemohon);
                        setValuePemohon("alamatPemohon", response.data.data.ptk.alamat_pemohon);
                        setValuePemohon("nomorTlp", response.data.data.ptk.telepon_pemohon);
                        setValuePemohon("nomorFax", response.data.data.ptk.fax_pemohon);
                        setValuePemohon("provPemohon", response.data.data.ptk.provinsi_pemohon_id);
                        setValuePemohon("provPemohonView", response.data.data.ptk.provinsi_pemohon);
                        setValuePemohon("kotaPemohon", response.data.data.ptk.kota_kab_pemohon_id);
                        setValuePemohon("kotaPemohonView", response.data.data.ptk.kota_pemohon);
                        setValuePemohon("namaCp", response.data.data.ptk.nama_cp);
                        setValuePemohon("alamatCp", response.data.data.ptk.alamat_cp);
                        setValuePemohon("teleponCp", response.data.data.ptk.telepon_cp);
                        setValuePemohon("namaTtd", response.data.data.ptk.nama_ttd);
                        setValuePemohon("jenisIdentitasTtd", response.data.data.ptk.jenis_identitas_ttd);
                        setValuePemohon("noIdentitasTtd", response.data.data.ptk.nomor_identitas_ttd);
                        setValuePemohon("jabatanTtd", response.data.data.ptk.jabatan_ttd);
                        setValuePemohon("alamatTtd", response.data.data.ptk.alamat_ttd);
                        setValuePemohon("namaPengirim", response.data.data.ptk.nama_pengirim);
                        setValuePemohon("alamatPengirim", response.data.data.ptk.alamat_pengirim);
                        setValuePemohon("nomorTlpPengirim", response.data.data.ptk.telepon_pengirim);
                        setValuePemohon("jenisIdentitasPengirim", response.data.data.ptk.jenis_identitas_pengirim);
                        setValuePemohon("noIdentitasPengirim", response.data.data.ptk.nomor_identitas_pengirim);
                        setValuePemohon("provPengirim", response.data.data.ptk.provinsi_pengirim_id);
                        setValuePemohon("provPengirimView", response.data.data.ptk.provinsi_pengirim);
                        setValuePemohon("kotaPengirim", response.data.data.ptk.kota_kab_pengirim_id);
                        setValuePemohon("kotaPengirimView", response.data.data.ptk.kota_pengirim);
                        setValuePemohon("negaraPengirim", response.data.data.ptk.negara_pengirim_id);
                        setValuePemohon("negaraPengirimView", response.data.data.ptk.kd_negara_pengirim + " - " + response.data.data.ptk.negara_pengirim);
                        setValuePemohon("namaPenerima", response.data.data.ptk.nama_penerima);
                        setValuePemohon("alamatPenerima", response.data.data.ptk.alamat_penerima);
                        setValuePemohon("nomorTlpPenerima", response.data.data.ptk.telepon_penerima);
                        setValuePemohon("jenisIdentitasPenerima", response.data.data.ptk.jenis_identitas_penerima);
                        setValuePemohon("noIdentitasPenerima", response.data.data.ptk.nomor_identitas_penerima);
                        setValuePemohon("provPenerima", response.data.data.ptk.provinsi_penerima_id);
                        setValuePemohon("provPenerimaView", response.data.data.ptk.provinsi_penerima);
                        setValuePemohon("kotaPenerima", response.data.data.ptk.kota_kab_penerima_id);
                        setValuePemohon("kotaPenerimaView", response.data.data.ptk.kota_penerima);
                        setValuePemohon("negaraPenerima", response.data.data.ptk.negara_penerima_id);
                        setValuePemohon("negaraPenerimaView", response.data.data.ptk.kd_negara_penerima + " - " + response.data.data.ptk.negara_penerima);
                        
                        setValuePelabuhan("tglBerangkatAkhir", response.data.data.ptk.tanggal_rencana_masuk);
                        // setValuePelabuhan("negaraAsal", response.data.data.ptk.negara_muat_id == null ? (response.data.data.ptk.jenis_permohonan != "IM" ? "99" : "") : response.data.data.ptk.negara_muat_id);
                        // setValuePelabuhan("negaraAsalView", response.data.data.ptk.kd_negara_muat == null ? (response.data.data.ptk.jenis_permohonan != "IM" ? "ID - INDONESIA" : "") : response.data.data.ptk.kd_negara_muat + " - " + response.data.data.ptk.negara_muat);
                        // setValuePelabuhan("negaraTujuan", response.data.data.ptk.negara_bongkar_id == null ? (response.data.data.ptk.jenis_permohonan != "EX" ? "99" : "") : response.data.data.ptk.negara_bongkar_id);
                        // setValuePelabuhan("negaraTujuanView", response.data.data.ptk.kd_negara_bongkar == null ? (response.data.data.ptk.jenis_permohonan != "EX" ? "ID - INDONESIA" : "") : response.data.data.ptk.kd_negara_bongkar + " - " + response.data.data.ptk.negara_bongkar);
                        setValuePelabuhan("negaraAsal", response.data.data.ptk.negara_muat_id == null ? "" : response.data.data.ptk.negara_muat_id);
                        setValuePelabuhan("negaraAsalView", response.data.data.ptk.kd_negara_muat == null ? "" : response.data.data.ptk.kd_negara_muat + " - " + response.data.data.ptk.negara_muat);
                        setValuePelabuhan("negaraTujuan", response.data.data.ptk.negara_bongkar_id == null ? "" : response.data.data.ptk.negara_bongkar_id);
                        setValuePelabuhan("negaraTujuanView", response.data.data.ptk.kd_negara_bongkar == null ? "" : response.data.data.ptk.kd_negara_bongkar + " - " + response.data.data.ptk.negara_bongkar);
                        setValuePelabuhan("negaraTransit", response.data.data.ptk.negara_transit_id == null ? "" : response.data.data.ptk.negara_transit_id);
                        setValuePelabuhan("negaraTransitView", response.data.data.ptk.kd_negara_transit == null ? "" : response.data.data.ptk.kd_negara_transit + " - " + response.data.data.ptk.negara_transit);
                        setValuePelabuhan("modaTransit", response.data.data.ptk.moda_alat_angkut_transit_id);
                        setValuePelabuhan("tipeTransit", response.data.data.ptk.tipe_alat_angkut_transit_id);
                        setValuePelabuhan("namaAlatAngkutTransit", response.data.data.ptk.nama_alat_angkut_transit);
                        setValuePelabuhan("benderaTransit", response.data.data.ptk.bendera_alat_angkut_transit_id == null ? "" : response.data.data.ptk.bendera_alat_angkut_transit_id);
                        setValuePelabuhan("benderaTransitView", response.data.data.ptk.kd_bendera_alat_angkut_transit == null ? "" : response.data.data.ptk.kd_bendera_alat_angkut_transit + " - " + response.data.data.ptk.bendera_alat_angkut_transit);
                        setValuePelabuhan("nomorAlatAngkutTransit", response.data.data.ptk.no_voyage_transit);
                        setValuePelabuhan("callSignTransit", response.data.data.ptk.call_sign_transit);
                        setValuePelabuhan("tglTibaTransit", response.data.data.ptk.tanggal_rencana_tiba_transit);
                        setValuePelabuhan("tglBerangkatTransit", response.data.data.ptk.tanggal_rencana_berangkat_transit);
                        setValuePelabuhan("modaAkhir", response.data.data.ptk.moda_alat_angkut_terakhir_id);
                        setValuePelabuhan("modaAkhirLainnya", response.data.data.ptk.moda_alat_angkut_lainnya);
                        setValuePelabuhan("tipeAkhir", response.data.data.ptk.tipe_alat_angkut_terakhir_id);
                        setValuePelabuhan("namaAlatAngkutAkhir", response.data.data.ptk.nama_alat_angkut_terakhir);
                        setValuePelabuhan("benderaAkhir", response.data.data.ptk.bendera_alat_angkut_terakhir_id == null ? "" : response.data.data.ptk.bendera_alat_angkut_terakhir_id);
                        setValuePelabuhan("benderaAkhirView", response.data.data.ptk.kd_bendera_alat_angkut_terakhir == null ? "" : response.data.data.ptk.kd_bendera_alat_angkut_terakhir + " - " + response.data.data.ptk.bendera_alat_angkut_terakhir);
                        setValuePelabuhan("nomorAlatAngkutAkhir", response.data.data.ptk.no_voyage_terakhir);
                        setValuePelabuhan("callSignAkhir", response.data.data.ptk.call_sign_terakhir);
                        setValuePelabuhan("tglTibaAkhir", response.data.data.ptk.tanggal_rencana_tiba_terakhir);
                        setValuePelabuhan("tglBerangkatAkhir", response.data.data.ptk.tanggal_rencana_berangkat_terakhir);
                        setValuePelabuhan("transitOpsi", response.data.data.ptk.is_transit == null ? "" :response.data.data.ptk.is_transit.toString());
                        setValuePelabuhan("cekKontainer", response.data.data.ptk.is_kontainer == null ? "" : response.data.data.ptk.is_kontainer.toString());
                        if(response.data.data.ptk.permohonan != "null") {
                            setFormTab(values => ({...values, tab2: false}))
                        }
                        setValuePelabuhan("sandar", response.data.data.ptk.gudang_id);
                        setValuePelabuhan("pelMuat", response.data.data.ptk.pelabuhan_muat_id == null ? "" : response.data.data.ptk.pelabuhan_muat_id);
                        setValuePelabuhan("pelMuatView", response.data.data.ptk.kd_pelabuhan_muat == null ? "" : response.data.data.ptk.kd_pelabuhan_muat + " - " + response.data.data.ptk.pelabuhan_muat);
                        setValuePelabuhan("pelBongkar", response.data.data.ptk.pelabuhan_bongkar_id == null ? "" : response.data.data.ptk.pelabuhan_bongkar_id);
                        setValuePelabuhan("pelBongkarView", response.data.data.ptk.kd_pelabuhan_bongkar == null ? "" : response.data.data.ptk.kd_pelabuhan_bongkar + " - " + response.data.data.ptk.pelabuhan_bongkar);
                        setValuePelabuhan("pelTransit", response.data.data.ptk.pelabuhan_transit_id == null ? "" : response.data.data.ptk.pelabuhan_transit_id);
                        setValuePelabuhan("pelTransitView", response.data.data.ptk.kd_pelabuhan_transit == null ? "" : response.data.data.ptk.kd_pelabuhan_transit + " - " + response.data.data.ptk.pelabuhan_transit);
                        setKontainerPtk(response.data.data.ptk_kontainer)
                        
                        if(response.data.data.ptk.is_kontainer != "null") {
                            setFormTab(values => ({...values, tab3: false}))
                        }
                        setValueMP("jenisKemasan", response.data.data.ptk.kemasan_id == null ? "" : response.data.data.ptk.kemasan_id.toString());
                        setValueMP("jenisKemasanView", jenisKemasanView(response.data.data.ptk.kemasan_id));
                        setValueMP("jenisAngkut", response.data.data.ptk.is_curah == null ? "" : response.data.data.ptk.is_curah.toString());
                        setValueMP("peruntukan", response.data.data.ptk.peruntukan_id ? response.data.data.ptk.peruntukan_id.toString() : "");
                        setValueMP("merkKemasan", response.data.data.ptk.merk_kemasan);
                        setValueMP("sumberMpTangkap", response.data.data.ptk.sumber_mp);
                        setValueMP("areaTangkap", response.data.data.ptk.area_tangkap_id == null ? "" : response.data.data.ptk.area_tangkap_id.toString());
                        setValueMP("areaTangkapView", response.data.data.ptk.area_tangkap_id == null ? "" : getViewAreaTangkap(response.data.data.ptk.area_tangkap_id));
                        setValueMP("jumlahKemasan", response.data.data.ptk.jumlah_kemasan);
                        setValueMP("tandaKemasan", response.data.data.ptk.tanda_khusus);
                        setValueMP("nilaiBarang", response.data.data.ptk.nilai_barang);
                        setValueMP("satuanNilai", response.data.data.ptk.mata_uang == null ? "IDR" : response.data.data.ptk.mata_uang);
                        setValueMP("negaraAsalMP", response.data.data.ptk.negara_asal_id == null ? "" : response.data.data.ptk.negara_asal_id);
                        setValueMP("negaraAsalMPView", response.data.data.ptk.kd_negara_asal == null ? "" : response.data.data.ptk.kd_negara_asal + " - " + response.data.data.ptk.negara_asal);
                        setValueMP("daerahAsalMP", response.data.data.ptk.kota_kab_asal_id);
                        setValueMP("daerahAsalMPView", response.data.data.ptk.kota_asal);
                        setValueMP("negaraTujuanMP", response.data.data.ptk.negara_tujuan_id == null ? "" : response.data.data.ptk.negara_tujuan_id);
                        setValueMP("negaraTujuanMPView", response.data.data.ptk.kd_negara_tujuan == null ? "" : response.data.data.ptk.kd_negara_tujuan + " - " + response.data.data.ptk.negara_tujuan);
                        setValueMP("daerahTujuanMP", response.data.data.ptk.kota_kab_tujuan_id);
                        setValueMP("daerahTujuanMPView", response.data.data.ptk.kota_tujuan);
                        setValueMP("tingkatOlah", response.data.data.ptk.tingkat_pengolahan ? response.data.data.ptk.tingkat_pengolahan.toString() : "");
                        setValueMP("infoTambahan", response.data.data.ptk.informasi_tambahan);
                        setKomoditiPtk(response.data.data.ptk_komoditi);
            
                        setValueDokPeriksa("tempatPeriksaPtk", response.data.data.ptk.tempat_pemeriksaan);
                        setValueDokPeriksa("namaTempatPeriksaPtk", response.data.data.ptk.nama_tempat_pemeriksaan);
                        setValueDokPeriksa("alamatTempatPeriksaPtk", response.data.data.ptk.alamat_tempat_pemeriksaan);
            
                        setValueKonfirmasi("isDraft", response.data.data.ptk.is_draft?.toString());
                        setValueVerify("opsiVerif", response.data.data.ptk.is_verifikasi);
                        setValueVerify("tglTerimaVerif", response.data.data.ptk.tgl_dok_permohonan);
                        setValueVerify("alasanTolak", response.data.data.ptk.alasan_penolakan);
                        setValueVerify("petugasVerif", response.data.data.ptk.alasan_penolakan);
            
                        setDokumenPtk(response.data.data.ptk_dokumen);
                        if(response.data.data.ptk_komoditi.length > 0) {
                            setFormTab(values => ({...values, tab4: false}))
                        }
                        if(response.data.data.ptk_dokumen.length > 0) {
                            setFormTab(values => ({...values, tab5: false}))
                        }
                        
                        if(response.data.data.ptk.status_ptk == 9 || response.data.data.ptk.status_ptk == 1) {
                            setPtkLengkap(true)
                        }
                    }, 400) //400
                }
            })
            .catch((error) => {
                if(process.env.REACT_APP_BE_ENV == "DEV") {
                    console.log(error)
                };
            });
        }
    },[idPtk, handleKota, handlePelabuhan, setValueDetilMP, setValueDokPeriksa, setValueDokumen, setValueKonfirmasi, setValueKontainer, setValueMP, setValuePelabuhan, setValuePemohon, setValueVerify])
    
    const cetakPDF= () => {
        const input = document.getElementById('hal1');
        const pdf = new jsPDF();
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio)/2;
            const imgY = 5;
            pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
            pdf.save("k92h.pdf");
              })
            ;
          }
    return (
    <div>    
        <div className="container mt-5 p-5 all" id='hal1x' >
            <div className="row mb-4">
                <div className="col-6">
                    
                </div>
                <div className="col-6 text-end judul">
                    <h1>Format K.1.1</h1>
                </div>

            </div>
            <div className="row ">
                    
                            <div className="judul" >
                                <center>PERMOHONAN TINDAKAN KARANTINA DAN PENGAWASAN</center>
                                <center>DAN/ATAU PENGENDALIAN SERTA BERITA ACARA SERAH</center>
                                <center>TERIMA MEDIA  PEMBAWA DI TEMPAT PEMASUKAN,</center>
                                <center>PENGELUARAN DAN/ATAU TRANSIT</center>
                            </div>
                <div className="nomor" >Nomor:<strong>{dataIdPage.noAju || ""}</strong> </div>
                    
                    
                    <p></p>
                    <p></p>
                    <p></p>
            </div>
            <div className="row">
            
                <div className="col kepada">
                    
                    <p>Yth.</p>
                    <p>Kepala UPT Karantina</p>
                    <p>............</p>
                    <p>di</p>
                    <p>      Tempat</p>
                    <p><br /></p>
                    <p>Pada hari ini ......... tanggal .................... bulan ................. tahun ....  </p>
                    <p><br /></p>
                </div>

            </div>
            <div className="row">
                <div className="col numberrr">
                <p><b>A.IDENTITAS</b></p>
                </div>
            </div>
            <div className="row ident" >
                <p>Saya yang bertandatangan dibawah ini:</p>
                <div className="col-5">
                    <p>Nama   :</p>
                    <p>Alamat :</p>

                </div>
                <div className="col-6">
                    <p>NIB/NPWP/KTP/SIM/Paspor</p>
                    <p>Status : </p>
                </div>
                <br />
            </div>
            <div className="row mohon">
            <p><b>B.PERMOHONAN</b></p>
            </div>

            <div className="container">
            <table id="customers">
                <tr>
                    <td colSpan={2} rowSpan={2}>
                    <table>
                        <tr>
                            <td>Media Pembawa</td>
                            <td>Nama Ilmiah</td>
                            <td>Kode HS</td>
                            <td>Bentuk</td>
                            <td>Jumlah</td>
                            <td>Netto</td>
                            <td>Satuan</td>
                        </tr>
                        <tr>
                            <td>Media Pembawa</td>
                            <td>Nama Ilmiah</td>
                            <td>Kode HS</td>
                            <td>Bentuk</td>
                            <td>Jumlah</td>
                            <td>Netto</td>
                            <td>Satuan</td>
                        </tr>
                        <tr>
                            <td>Media Pembawa</td>
                            <td>Nama Ilmiah</td>
                            <td>Kode HS</td>
                            <td>Bentuk</td>
                            <td>Jumlah</td>
                            <td>Netto</td>
                            <td>Satuan</td>
                        </tr>
                        <tr>
                            <td>Media Pembawa</td>
                            <td>Nama Ilmiah</td>
                            <td>Kode HS</td>
                            <td>Bentuk</td>
                            <td>Jumlah</td>
                            <td>Netto</td>
                            <td>Satuan</td>
                        </tr>
                    </table>
                    </td>
                    
                    <td id="kolkanan"><center>Tingkat Pengolahan </center><br />
                        <div className="inputs">
                            <center>
                                <input type="checkbox" /> Sudah diolah   
                                <input type="checkbox" /> Belum diolah
                            </center>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Nilai (Rp.)</td>
                </tr>
                <tr>
                    <td rowSpan={3}>Peruntukan
                        <div className="inputs">
                            <input type="checkbox" /> Ditanam/Budidaya/Peningkatan Mutu Genetik <br />   
                            <input type="checkbox" /> Konsumsi 
                            <input type="checkbox" /> Pameran/Kontes 
                            <input type="checkbox" /> Bahan Baku <br />
                            <input type="checkbox" /> Penelitian 
                            <input type="checkbox" /> Perdagangan 
                            <input type="checkbox" /> Lainnya.. <br />
                        </div>
                    </td>
                    <td>jenis Kemasan</td>
                    <td rowSpan={3}>Nomor Kemasan : </td>
                </tr>
                <tr>
                    <td>Jumlah Kemasan</td> 
                </tr>
                <tr>   
                    <td>Tanda khusus</td> 
                </tr>
            </table>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 wrap">
                            <table className="tkiri">
                                <tr>
                                    <td>Nama Pengirim:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Alamat: </td>
                                    <td>Negara/Area Asal: nama negaranya panjaang</td>     
                                </tr>
                                <tr>
                                    <td>Nama Penerima</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Alamat: </td>
                                    <td>Negara/Area Tujuan:</td>     
                                </tr>
                            </table>                 
                    </div>
                    <div className="col-md-6 wrip">
                        <table className="tkanan">
                            <tr>
                                <td>Moda</td>
                                <td>Alat Angkut</td>
                            </tr>
                            <tr>
                                <td rowSpan={2}>
                                    <div className="inputs">
                                            <input type="checkbox" /> Kapal Laut   
                                            <input type="checkbox" /> Truck/Mobil <br /> 
                                            <input type="checkbox" /> Pesawat 
                                            <input type="checkbox" /> Lainnya.....<br /> 
                                            <input type="checkbox" /> Kereta Api <br />
                                    </div>
                                </td>
                                <td><br /></td>     
                            </tr>
                            <tr>
                                <td>BL/AWB</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    Pelabuhan Muat: 
                                    <br />
                                    Pelabuhan Bongkar:
                                    <br />
                                    Pelabuhan Transit:
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    Estimasi Waktu Kedatangan/Keberangkatan:
                                    <br />
                                    Aktual Waktu Kedatangn/Keberangkatan: 
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="col-md-6 wrup">
                        <table className="tkanan">
                            <tr>
                                <td><b>Dokumen Persyaratan</b></td>
                                <td><b>Dokumen Pendukung</b></td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="inputs">
                                        <input type="checkbox" /> Sertifikat Kesehatan   <br />
                                        <input type="checkbox" /> Prior Notice <br /> 
                                        <input type="checkbox" /> Sertifikat Perlakuan <br />
                                        <input type="checkbox" /> Sertifikat Hasil Uji<br /> 
                                        <input type="checkbox" /> Sertifikat Keamanan Pangan <br />
                                        <input type="checkbox" /> Sertifikat Radioaktivitas Pangan   <br />
                                        <input type="checkbox" /> Ijin SDG<br /> 
                                        <input type="checkbox" /> SATS-LN/SATS-DN/SAJI-LN/SAJI-DN <br />
                                        <input type="checkbox" /> Lainnya;<br /> 
                                    </div>
                                </td>
                                <td>
                                    <div className="inputs">
                                        <input type="checkbox" /> Airway Bill/ Bill Of Lading   <br />
                                        <input type="checkbox" /> Invoice <br /> 
                                        <input type="checkbox" /> Packing list <br />
                                        <input type="checkbox" /> Certificate of Origin<br /> 
                                        <input type="checkbox" /> Packing Declaration <br />
                                        <input type="checkbox" /> Dokumen Lain   <br />
                                    
                                    </div>
                                </td>
                            </tr>
                            
                        </table>
                    </div>
                    <div className="col-md-6 wrep">
                        <table>
                            <tr>
                                <td rowSpan={2} colSpan={2}>
                                    informasi_tambahan:
                                </td>
                                
                            </tr>
                            <tr>
                                <td><br /><br /><br /><br /><br /><br /><br /></td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p>
                        bersama ini mengajukan permohonan pemasukan/pengeluaran/transit*) media pembawa seperti tersebut di bawah ini untuk dilakukan tindakakarantina dan/atau pengawasan, sebagai berikut:
                        </p>
                    </div>
                </div> 
                <div className="row">
                    <p>
                        <b>C. SERAH TERIMA</b>
                    </p>
                </div>
                <div className="row">
                    <p>Atas Informasi diatas, kami sebagai pemilik/pihak yang diberi kuasa menyerahkan Media Pembawa tersebut kepada Pejabat Karantina di
                        UPT Badan Karantina Indonesia dan menyatakan bahwa: <br />
                        a. Keterangan yang saya berikan tersebut di atas adalah benar;<br />
                        b. Saya bersedia menanggung segala akibat dan biaya yang timbul apabila terhadap media pembawa tersebut dikenai tindakan karantina dan pengawasan dan/atau
                        pengendalian;<br />
                        c. Saya tidak akan menuntut ganti rugi dalam bentuk apapun kepada Pemerintah Republik Indonesia cq. Badan Karantina Indonesia atas segala
                        akibat dari tindakan karantina dan pengawasan dan/atau pengendalian yang dikenakan terhadap media pembawa tersebut di atas; dan <br />
                        d. Saya tidak akan membuka atau memindah tempatkan media pembawa tersebut tanpa seizin Pejabat Karantina, 
                        selanjutnya mohon dilakukan tindakan karantina  dan pengawasan dan/atau pengendalian terhadap Media Pembawa tersebut sesuai dengan
                        peraturan yang berlaku. </p>
                </div>
            </div>
            
        </div>
        <div className="row "><center>
            <div className="col-md-1">
            <button className="btn btn-primary" onClick={cetakPDF}>Cetak PTK</button>
            </div></center>
        </div>
    </div>
  )
}

export default DocK11