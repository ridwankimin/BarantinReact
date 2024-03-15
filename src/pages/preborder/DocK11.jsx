/* eslint-disable eqeqeq */
import React, { useCallback, useEffect, useState } from 'react'
import PersonSvg from '../../logo/svg/PersonSvg'
import ShipSvg from '../../logo/svg/ShipSvg'
import PackageSvg from '../../logo/svg/PackageSvg'
import DokumenSvg from '../../logo/svg/DokumenSvg'
import ConfirmSvg from '../../logo/svg/ConfirmSvg'
import MasterMataUang from '../../model/master/MasterMataUang'
import NegaraJson from '../../model/master/negara.json'
import PelabuhanJson from '../../model/master/pelabuhan.json'
import JenisDokumenJson from '../../model/master/jenisDokumen.json'
import JenisKemasanJson from '../../model/master/jenisKemasan.json'
import PegawaiJson from '../../model/master/pegawaiPertanian.json'
import AreaTangkapJson from '../../model/master/areaTangkap.json'
import MasterSatuanJson from '../../model/master/satuan.json'
import { Controller, useForm } from 'react-hook-form'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import PtkModel from '../../model/PtkModel'
import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment'
import Select from 'react-select'
import Master from '../../model/Master'
import Cookies from 'js-cookie'
import PtkHistory from '../../model/PtkHistory'
import Swal from 'sweetalert2'
import LoadBtn from '../../component/loading/LoadBtn'

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

function masterPegawai() {
    var arrayPegawai = PegawaiJson.map(item => {
        return {
            value: item.id,
            label: item.nama + " - " + item.nip,
        }
    })
    return arrayPegawai
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
    import("../../assets/vendor/libs/bs-stepper/bs-stepper.css")
    // require("../../assets/vendor/libs/bs-stepper/bs-stepper.js")
    
    let navigate = useNavigate();
    const idPtk = Cookies.get("idPtkPage");
    let [dataIdPage, setDataIdPage] = useState({});

    let [dataSelect, setdataSelect] = useState({});
    let [ptkLengkap, setPtkLengkap] = useState(false);
    let [onLoad, setOnLoad] = useState(false);
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
            if(import.meta.env.VITE_BE_ENV == "DEV") {
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
        control: controlVerify,
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
            if(import.meta.env.VITE_BE_ENV == "DEV") {
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
        if(import.meta.env.VITE_BE_ENV == "DEV") {
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

    // const handleKomKHIDetil = useCallback(async (e) => {
    function handleKomKHIDetil() {
        if(cekdataDiri.mediaPembawa && cekdataDiri.jenisMp) {
            const resKodeHS = modelMaster.masterHS(cekdataDiri.mediaPembawa)
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
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                };
            });

            if(cekdataDiri.mediaPembawa != "T") {
                if(cekdataDiri.jenisMp == 1 || cekdataDiri.jenisMp == 6) {
                    setValueMP("jenisAngkut", "1")
                } else {
                    setValueMP("jenisAngkut", "0")
                }
            }
    
            if(cekdataDiri.mediaPembawa == "H") {
                const resKlasKH = modelMaster.masterKlasKH(cekdataDiri.jenisMp)
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

                    const resKomKH = modelMaster.masterKomKH(cekdataDiri.jenisMp)
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
                        if(import.meta.env.VITE_BE_ENV == "DEV") {
                            console.log(error)
                        };
                    });
                })
                .catch((error) => {
                    if(import.meta.env.VITE_BE_ENV == "DEV") {
                        console.log(error)
                    };
                });

            } else if(cekdataDiri.mediaPembawa == "T") {
                const resPeruntukan = modelMaster.masterKlasKT(cekdataDiri.jenisMp)
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
                        if(import.meta.env.VITE_BE_ENV == "DEV") {
                            console.log(error)
                        };
                    });
                })
                .catch((error) => {
                    if(import.meta.env.VITE_BE_ENV == "DEV") {
                        console.log(error)
                    };
                });

            } else if(cekdataDiri.mediaPembawa == "I") {
                const resPeruntukan = modelMaster.masterKlasKI(cekdataDiri.jenisMp)
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
                        if(import.meta.env.VITE_BE_ENV == "DEV") {
                            console.log(error)
                        };
                    });
                })
                .catch((error) => {
                    if(import.meta.env.VITE_BE_ENV == "DEV") {
                        console.log(error)
                    };
                });
            }
        }
    }
    // }
    // useEffect(() => {
    //     handleKomKHIDetil()
    // }, [handleKomKHIDetil])
    
    const onSubmitDokumen = (data) => {
        setOnLoad(true)
        const response = modelPemohon.pushDetilDokumen(data);
        response
        .then((response) => {
            if(response.data.status == 201) {
                    setOnLoad(false)
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
                setOnLoad(false)
                if(import.meta.env.VITE_BE_ENV == "DEV") {
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
        let nilaiMp
        if(cekdataDiri.mediaPembawa == "T") {
            cekNilai = data.nilaiBarangMP?.length
            nilaiMp = data.nilaiBarangMP 
        } else if(cekdataDiri.mediaPembawa == "H"){
            cekNilai = data.nilaiBarangMPKH?.length 
            nilaiMp = data.nilaiBarangMPKH
        } else if(cekdataDiri.mediaPembawa == "I"){
            cekNilai = data.nilaiBarangMPKI?.length 
            nilaiMp = data.nilaiBarangMPKI
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
                        // dataKomoditiPtk();
                        const response = modelPemohon.getKomoditiPtkId(dataIdPage.noIdPtk, cekdataDiri.mediaPembawa);
                        response
                        .then((res) => {
                            if(res.data.status == 200) {
                                setKomoditiPtk(res.data.data)
                                setValueMP("nilaiBarang", parseFloat(typeof nilaiMp == "string" ? nilaiMp.replace(",", "") : nilaiMp) + parseFloat(typeof cekdataMP.nilaiBarang == "string" ? cekdataMP.nilaiBarang.replace(",", "") : cekdataMP.nilaiBarang))
                            }
                        })
                        .catch((error) => {
                            if(import.meta.env.VITE_BE_ENV == "DEV") {
                                console.log(error)
                            }
                        });
                    }
                })
                .catch((error) => {
                    if(import.meta.env.VITE_BE_ENV == "DEV") {
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
        setOnLoad(true)
        if(idPtk) {
            const response = modelPemohon.tabPemohonUpdate(data);
            response
            .then((response) => {
                if(response.data.status == 201) {
                    setOnLoad(false)
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
                setOnLoad(false)
                if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                            setOnLoad(false)
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
                        setOnLoad(false)
                        if(import.meta.env.VITE_BE_ENV == "DEV") {
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
        setOnLoad(true)
        if(idPtk) {
            const response = modelPemohon.tabPelabuhan(data);
            response
            .then((response) => {
                if(response.data.status == 201) {
                    setOnLoad(false)
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
                    setOnLoad(false)
                    Swal.fire({
                        icon: "error",
                        title: "Data Pelabuhan gagal disimpan.",
                        text: response.data.status + " - " + response.data.message,
                        showConfirmButton: true
                    })
                }
            })
            .catch((error) => {
                setOnLoad(false)
                if(import.meta.env.VITE_BE_ENV == "DEV") {
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
            setOnLoad(false)
            // alert('Data id kosong')
            Swal.fire({
                icon: "error",
                title: "Data id kosong.",
                showConfirmButton: true
            })
        }
    };
    
    const onSubmitKomoditas = (data) => {
        setOnLoad(true)
        if(idPtk) {
            if(komoditiPtk.length == 0) {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Mohon isi detil media pembawa",
                    showConfirmButton: true
                })
            } else {
                const response = modelPemohon.tabKomoditas(data);
                response
                .then((response) => {
                    if(response.data.status == 201) {
                        setOnLoad(false)
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
                        setOnLoad(false)
                        Swal.fire({
                            icon: "error",
                            title: "Data Komoditas gagal disimpan.",
                            text: response.data.status + " - " + response.data.message,
                            showConfirmButton: true
                        })
                    }
                })
                .catch((error) => {
                    setOnLoad(false)
                    if(import.meta.env.VITE_BE_ENV == "DEV") {
                        console.log(error)
                    };
                    Swal.fire({
                        icon: "error",
                        title: "Data Pemohon gagal disimpan.",
                        text: error.response.data.message,
                        showConfirmButton: true
                    })
                });
            }
        } else {
            setOnLoad(false)
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
        setOnLoad(true)
        if(idPtk) {
            const response = modelPemohon.tabTempatPeriksa(data);
            response
            .then((response) => {
                if(response.data.status == 201) {
                    setOnLoad(false)
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
                    setOnLoad(false)
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Permohonan gagal disubmit!",
                        showConfirmButton: true
                    })
                    
                }
            })
            .catch((error) => {
                setOnLoad(false)
                if(import.meta.env.VITE_BE_ENV == "DEV") {
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
            setOnLoad(false)
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
        setOnLoad(true)
        if(idPtk) {
            const response = modelPemohon.tabKonfirmasi(data);
            response
            .then((response) => {
                if(response.data.status == 201) {
                    setOnLoad(false)
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
                    setOnLoad(false)
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.response.status + " - " + response.response.data.message,
                        showConfirmButton: true
                    })
                }
            })
            .catch((error) => {
                setOnLoad(false)
                if(import.meta.env.VITE_BE_ENV == "DEV") {
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
        setOnLoad(true)
        if(idPtk) {
            const response = modelPemohon.ptkVerify(data);
            response
            .then((response) => {
                if(response.data.status == 201) {
                    // setPtkLengkap(true);
                    setOnLoad(false)
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
                        text: "Permohonan AJU No: " + cekdataDiri.noAju + " berhasil diverifikasi",
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else {
                    setOnLoad(false)
                    Swal.fire({
                        icon: "error",
                        title: response.data.message,
                        showConfirmButton: true
                    })
                }
            })
            .catch((error) => {
                setOnLoad(false)
                if(import.meta.env.VITE_BE_ENV == "DEV") {
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
        setOnLoad(true)
        const response = modelPemohon.pushDetilKontainer(data);
        response
        .then((response) => {
            if(response.data.status == 201) {
                setOnLoad(false)
                Swal.fire({
                    icon: "success",
                    title: "Data Kontainer berhasil disimpan.",
                    showConfirmButton: false,
                    timer: 2000
                })
                resetFormKontainer();
                dataKontainerPtk();
            } else {
                setOnLoad(false)
                Swal.fire({
                    icon: "error",
                    title: "Data Kontainer gagal disimpan!",
                    showConfirmButton: true,
                    text: response.data.status + " - " + response.data.message
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
                if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                if(import.meta.env.VITE_BE_ENV == "DEV") {
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

    // function sumNilaiKomoditi() {
    //     if(komoditiPtk) {
    //         if(komoditiPtk?.length > 0) {
    //             var arrayNilai = komoditiPtk?.map(item => {
    //                 return item.harga
    //             })
    //             const sum = arrayNilai.reduce((partialSum, a) => partialSum + a, 0);
    //             return sum
    //         } else {
    //             return 0
    //         }
    //     } else {
    //         return 0
    //     }
    // }
    
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
            if(import.meta.env.VITE_BE_ENV == "DEV") {
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
            if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                console.log(response)
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
                            if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                                if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                                    if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                                    if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                                    if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                                    if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                                    if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                                    if(import.meta.env.VITE_BE_ENV == "DEV") {
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
                        if(response.data.data.ptk.jenis_permohonan != null) {
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
                        
                        if(response.data.data.ptk.is_kontainer != null) {
                            setFormTab(values => ({...values, tab3: false}))
                        }
                        setValueMP("jenisKemasan", response.data.data.ptk.kemasan_id == null ? "" : response.data.data.ptk.kemasan_id.toString());
                        setValueMP("jenisKemasanView", jenisKemasanView(response.data.data.ptk.kemasan_id));
                        if(response.data.data.ptk.jenis_karantina != "T") {
                            if(response.data.data.ptk.jenis_media_pembawa_id == 1 || response.data.data.ptk.jenis_media_pembawa_id == 6) {
                                setValueMP("jenisAngkut", "1")
                            } else {
                                setValueMP("jenisAngkut", "0")
                            }
                        } else {
                            setValueMP("jenisAngkut", response.data.data.ptk.is_curah == null ? "" : response.data.data.ptk.is_curah.toString());
                        }
                        setValueMP("peruntukan", response.data.data.ptk.peruntukan_id ? response.data.data.ptk.peruntukan_id.toString() : "");
                        setValueMP("merkKemasan", response.data.data.ptk.merk_kemasan);
                        setValueMP("sumberMpTangkap", response.data.data.ptk.sumber_mp);
                        setValueMP("areaTangkap", response.data.data.ptk.area_tangkap_id == null ? "" : response.data.data.ptk.area_tangkap_id.toString());
                        setValueMP("areaTangkapView", response.data.data.ptk.area_tangkap_id == null ? "" : getViewAreaTangkap(response.data.data.ptk.area_tangkap_id));
                        setValueMP("jumlahKemasan", response.data.data.ptk.jumlah_kemasan);
                        setValueMP("tandaKemasan", response.data.data.ptk.tanda_khusus);
                        let sumVol
                        if(response.data.data.ptk_komoditi?.length > 0) {
                            var arrayNilai = response.data.data.ptk_komoditi?.map(item => {
                                return item.harga
                            })
                            sumVol = arrayNilai.reduce((partialSum, a) => partialSum + a, 0);
                        } else {
                            sumVol = 0
                        }
                        setValueMP("nilaiBarang", response.data.data.ptk.nilai_barang == null ? sumVol : response.data.data.ptk.nilai_barang);
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
                        setValueVerify("opsiVerif", response.data.data.ptk.status_ptk);
                        setValueVerify("tglTerimaVerif", response.data.data.ptk.tgl_dok_permohonan);
                        setValueVerify("alasanTolak", response.data.data.ptk.alasan_penolakan);
                        setValueVerify("petugasVerif", response.data.data.ptk.petugas);
                        setValueVerify("petugasVerifView", response.data.data.ptk.petugas);
            
                        setDokumenPtk(response.data.data.ptk_dokumen);
                        if(response.data.data.ptk_komoditi.length > 0) {
                            setFormTab(values => ({...values, tab4: false}))
                        }
                        if(response.data.data.ptk_dokumen.length > 0) {
                            setFormTab(values => ({...values, tab5: false}))
                        }
                        
                        if(response.data.data.ptk.status_ptk != 0) {
                            setPtkLengkap(true)
                        }
                    }, 400) //400
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                };
            });
        }
    },[idPtk, handleKota, handlePelabuhan, setValueDetilMP, setValueDokPeriksa, setValueDokumen, setValueKonfirmasi, setValueKontainer, setValueMP, setValuePelabuhan, setValuePemohon, setValueVerify])

    return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-1.1 <span style={{color: "blue"}}>PERMOHONAN TINDAKAN KARANTINA</span>
        </h4>

        <div className="row">
            <div className="col-xxl">
                <div id="wizard-checkout" className="bs-stepper wizard-icons wizard-icons-example mt-2">
                    <div className="row p-2">
                        <label className="col-sm-1 col-form-label" htmlFor="noAju">NOMOR AJU</label>
                        <div className="col-sm-4">
                            <input autoComplete="off" type="text" className='form-control' value={dataIdPage.noAju || ""} disabled />
                        </div>
                        <label className="offset-sm-1 col-sm-2 col-form-label" htmlFor="noDok">NOMOR DOKUMEN</label>
                        <div className="col-sm-4">
                            <input autoComplete="off" type="text" className='form-control' value={dataIdPage.noPermohonan || ""} disabled />
                        </div>
                    </div>
                    <hr className='m-1' />
                    <div className="bs-stepper-header m-auto border-0">
                        <div className={wizardPage == 1 ? "step active" : "step"} onClick={() => setWizardPage(1)} disabled={formTab.tab1}>
                            <button type="button" className="step-trigger">
                                <span className="bs-stepper-icon">
                                <PersonSvg/>
                                </span>
                                <span className="bs-stepper-label">Identitas Pemohon</span>
                            </button>
                        </div>
                        <div className="line">
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div className={wizardPage == 2 ? "step active" : "step"}>
                            <button type="button" className="step-trigger" onClick={() => setWizardPage(2)} disabled={formTab.tab2}>
                                <span className="bs-stepper-icon">
                                <ShipSvg/>
                                </span>
                                <span className="bs-stepper-label">Pelabuhan - Alat Angkut</span>
                            </button>
                        </div>
                        <div className="line">
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div className={wizardPage == 3 ? "step active" : "step"}>
                            <button type="button" className="step-trigger" onClick={() => setWizardPage(3)} disabled={formTab.tab3}>
                                <span className="bs-stepper-icon">
                                <PackageSvg/>
                                </span>
                                <span className="bs-stepper-label">Media Pembawa - Kemasan</span>
                            </button>
                        </div>
                        <div className="line">
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div className={wizardPage == 4 ? "step active" : "step"}>
                            <button type="button" className="step-trigger" onClick={() => setWizardPage(4)} disabled={formTab.tab4}>
                                <span className="bs-stepper-icon">
                                <DokumenSvg/>
                                </span>
                                <span className="bs-stepper-label">Dokumen</span>
                            </button>
                        </div>
                        <div className="line">
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div className={wizardPage == 5 ? "step active" : "step"}>
                            <button type="button" className="step-trigger" onClick={() => setWizardPage(5)} disabled={formTab.tab5}>
                                <span className="bs-stepper-icon">
                                <ConfirmSvg/>
                                </span>
                                <span className="bs-stepper-label">Konfirmasi</span>
                            </button>
                        </div>
                    </div>
                    <div className="bs-stepper-content border-top">
                            <div id="cardPemohon" className={wizardPage == 1 ? "content active dstepper-block" : "content"}>
                            <form className="input-form" onSubmit={handleFormPemohon(onSubmitPemohon)}>
                                <input autoComplete="off" type="hidden" name='idPtk' {...registerPemohon("idPtk")} />
                                <input autoComplete="off" type="hidden" name='noAju' {...registerPemohon("noAju")} />
                                <input autoComplete="off" type="hidden" name='noPermohonan' {...registerPemohon("noPermohonan")} />
        {/* <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ stiffness: 150 }}
        > */}
            <div className="row">
                <div className="col-sm-12">
                    <div className="card card-action mb-4">
                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                            <div className="card-action-title">
                                <h5 className="mb-0 text-lightest">Permohonan</h5>
                            </div>
                            <div className="card-action-element">
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="collapse show">
                            <div className="card-body pt-0 pb-0">
                                <div className="row mb-3">
                                    {/* <input type="hidden" value="PTK" name='jenisForm' id='jenisForm' {...registerPemohon("jenisForm")} /> */}
                                    <div className="col-sm-12">
                                        <div className="col-sm-5">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label" htmlFor="jenisForm">Jenis Form <span className='text-danger'>*</span></label>
                                                <div className="col-sm-7" style={{paddingLeft: "8px"}}>
                                                    <select className={errorsPemohon.jenisForm ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"} disabled={dataIdPage.noAju ? true : false} name="jenisForm" id="jenisForm" {...registerPemohon("jenisForm", { required: "Mohon pilih jenis form."})}>
                                                        <option value="">--</option>
                                                        <option value="PTK">Permohonan Tindakan Karantina (PTK)</option>
                                                        <option value="BST">Serah Terima (BST)</option>
                                                    </select>
                                                    {errorsPemohon.jenisForm && <small className="text-danger">{errorsPemohon.jenisForm.message}</small>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="row mb-3">
                                            <label className="col-sm-4 col-form-label" htmlFor="mediaPembawa">Media Pembawa <span className='text-danger'>*</span></label>
                                            <div className="col-sm-6">
                                                <select name="mediaPembawa" id="mediaPembawa" {...registerPemohon("mediaPembawa", { required: "Mohon pilih media pembawa."})} disabled={dataIdPage.noAju ? true : false} className={errorsPemohon.mediaPembawa ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                    <option value="">--</option>
                                                    <option value="H">Hewan</option>
                                                    <option value="I">Ikan</option>
                                                    <option value="T">Tumbuhan</option>
                                                </select>
                                            </div>
                                            {errorsPemohon.mediaPembawa && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsPemohon.mediaPembawa.message}</small></div>}
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="row mb-3">
                                            <label className="col-sm-3 col-form-label" htmlFor="jenisMp">Jenis Media Pembawa <span className='text-danger'>*</span></label>
                                            <div className="col-sm-9">
                                                {/* <!-- Hewan --> */}
                                                <div style={{display: cekdataDiri.mediaPembawa == 'H' ? 'block' : 'none'}}>
                                                    <div className="form-check form-check-inline">
                                                        <input autoComplete="off" className="form-check-input" type="radio" onChange={(e) => console.log(e.target.value)} disabled={dataIdPage.noAju ? (cekdataDiri.jenisMp == "1" ? false : true) : false} name="jenisMp" id="hidup" value="1" {...registerPemohon("jenisMp", { required: "Mohon pilih jenis media pembawa."})} />
                                                        <label className="form-check-label" htmlFor="hidup">Hewan Hidup</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input autoComplete="off" className="form-check-input" type="radio" onChange={(e) => handleKomKHIDetil()} disabled={dataIdPage.noAju ? (cekdataDiri.jenisMp == "2" ? false : true) : false} name="jenisMp" id="produk" value="2" {...registerPemohon("jenisMp")} />
                                                        <label className="form-check-label" htmlFor="produk">Produk Hewan</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input autoComplete="off" className="form-check-input" type="radio" onChange={(e) => handleKomKHIDetil()} disabled={dataIdPage.noAju ? (cekdataDiri.jenisMp == "3" ? false : true) : false} name="jenisMp" id="mpl" value="3" {...registerPemohon("jenisMp")} />
                                                        <label className="form-check-label" htmlFor="mpl">Media Pembawa Lain</label>
                                                    </div>
                                                </div>
                                                {/* <!-- Ikan --> */}
                                                <div style={{display: cekdataDiri.mediaPembawa == 'I' ? 'block' : 'none'}}>
                                                    <div className="form-check form-check-inline">
                                                        <input autoComplete="off" className="form-check-input" type="radio" onChange={(e) => handleKomKHIDetil()} disabled={dataIdPage.noAju ? (cekdataDiri.jenisMp == "6" ? false : true) : false} name="jenisMp" id="hidupKI" value="6" {...registerPemohon("jenisMp")} />
                                                        <label className="form-check-label" htmlFor="hidupKI">Ikan Hidup</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input autoComplete="off" className="form-check-input" type="radio" onChange={(e) => handleKomKHIDetil()} disabled={dataIdPage.noAju ? (cekdataDiri.jenisMp == "7" ? false : true) : false} name="jenisMp" id="produkKI" value="7" {...registerPemohon("jenisMp")} />
                                                        <label className="form-check-label" htmlFor="produkKI">Produk Ikan</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input autoComplete="off" className="form-check-input" type="radio" onChange={(e) => handleKomKHIDetil()} disabled={dataIdPage.noAju ? (cekdataDiri.jenisMp == "8" ? false : true) : false} name="jenisMp" id="mplKI" value="8" {...registerPemohon("jenisMp")} />
                                                        <label className="form-check-label" htmlFor="mplKI">Media Pembawa Lain</label>
                                                    </div>
                                                </div>
                                                {/* <!-- Tumbuhan --> */}
                                                <div style={{display: cekdataDiri.mediaPembawa == 'T' ? 'block' : 'none'}}>
                                                    <div className="form-check form-check-inline">
                                                        <input autoComplete="off" className="form-check-input" type="radio" name="jenisMp" id="benih" onChange={(e) => handleKomKHIDetil()} disabled={dataIdPage.noAju ? (cekdataDiri.jenisMp == "4" ? false : true) : false} value="4" {...registerPemohon("jenisMp")} />
                                                        <label className="form-check-label" htmlFor="benih">Benih</label>
                                                    </div>
                                                    <div className="form-check form-check-inline mb-3">
                                                        <input autoComplete="off" className="form-check-input" type="radio" name="jenisMp" id="nonbenih" onChange={(e) => handleKomKHIDetil()} disabled={dataIdPage.noAju ? (cekdataDiri.jenisMp == "5" ? false : true) : false} value="5" {...registerPemohon("jenisMp")} />
                                                        <label className="form-check-label" htmlFor="nonbenih">Non Benih</label>
                                                    </div>
                                                </div>
                                            </div>
                                            {errorsPemohon.jenisMp && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsPemohon.jenisMp.message}</small></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card card-action mb-4">
                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138', position: "sticky", top: "0px", zIndex: 1}}>
                            <div className="card-action-title">
                                <h5 className="mb-0 text-lightest">Pemohon</h5>
                            </div>
                            <div className="card-action-element">
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="collapse show">
                            <div className="card-body pt-0">
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="permohonan">Permohonan <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                            <select className={errorsPemohon.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} disabled={dataIdPage.noAju ? true : false} name="permohonan" id="permohonan" {...registerPemohon("permohonan", { required: "Mohon pilih jenis permohonan."})} onChange={(e) => handlePermohonan(e)}>
                                                <option value="">--</option>
                                                <option value="EX">Ekspor</option>
                                                <option value="IM">Impor</option>
                                                <option value="DM">Domestik Masuk</option>
                                                <option value="DK">Domestik Keluar</option>
                                            </select>
                                        {errorsPemohon.permohonan && <small className="text-danger">{errorsPemohon.permohonan.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="statPemilik">Kepemilikan <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                            <div className="form-check form-check-inline">
                                                <input autoComplete="off" className="form-check-input" type="radio" name="statPemilik" id="statPemilik1" value="PEMILIK" {...registerPemohon("statPemilik", { required: "Mohon pilih status kepemilikan."})} />
                                                <label className="form-check-label" htmlFor="statPemilik1">Pemilik</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input autoComplete="off" className="form-check-input" type="radio" name="statPemilik" id="statPemilik0" value="PPJK"  {...registerPemohon("statPemilik")}/>
                                                <label className="form-check-label" htmlFor="statPemilik0">Yang dikuasakan</label>
                                            </div>
                                            {errorsPemohon.statPemilik && <small className="text-danger">{errorsPemohon.statPemilik.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="pJRutin">PJ Terdaftar <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                            <div className="form-check form-check-inline">
                                                <input autoComplete="off" className="form-check-input" type="radio" name="pJRutin" id="ya" value="0" {...registerPemohon("pJRutin", { required: "Mohon pilih jenis pengguna jasa."})} />
                                                <label className="form-check-label" htmlFor="ya">Ya</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input autoComplete="off" className="form-check-input" type="radio" name="pJRutin" id="tidak" value="1"  {...registerPemohon("pJRutin")}/>
                                                <label className="form-check-label" htmlFor="tidak">Tidak</label>
                                            </div>
                                            {errorsPemohon.pJRutin && <small className="text-danger">{errorsPemohon.pJRutin.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="namaPemohon">Nama <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                            <input autoComplete="off" type="text" id="namaPemohon" name="namaPemohon" {...registerPemohon("namaPemohon", { required: "Mohon isi nama pemohon."})} className={errorsPemohon.namaPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Pemohon" />
                                            {errorsPemohon.namaPemohon && <small className="text-danger">{errorsPemohon.namaPemohon.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="alamatPemohon">Alamat <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="alamatPemohon" name="alamatPemohon" {...registerPemohon("alamatPemohon", { required: "Mohon isi alamat pemohon."})} className={errorsPemohon.alamatPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Pemohon" />
                                        {errorsPemohon.alamatPemohon && <small className="text-danger">{errorsPemohon.alamatPemohon.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="provPemohon">Provinsi <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                            <Controller
                                                control={controlPemohon}
                                                name={"provPemohon"}
                                                defaultValue={""}
                                                className="form-control form-control-sm"
                                                rules={{ required: "Mohon pilih provinsi pemohon." }}
                                                render={({ field: { value,onChange, ...field } }) => (
                                                    <Select styles={customStyles} placeholder={"Pilih provinsi pemohon.."} value={{id: cekdataDiri.provPemohon, label: cekdataDiri.provPemohonView}} {...field} options={dataSelect.provPemohon} onChange={(e) => handleSelectPemohon(e, "provPemohon") & handleKota(e.value, "kotaPemohon")} />
                                                )}
                                            />
                                            {errorsPemohon.provPemohon && <small className="text-danger">{errorsPemohon.provPemohon.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="kotaPemohon">Kota/Kab <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                            <Controller
                                                control={controlPemohon}
                                                name={"kotaPemohon"}
                                                defaultValue={""}
                                                className="form-control form-control-sm"
                                                rules={{ required: false }}
                                                render={({ field: { value,onChange, ...field } }) => (
                                                    <Select styles={customStyles} placeholder={"Pilih kota/kab asal pemohon.."} value={{id: cekdataDiri.kotaPemohon, label: cekdataDiri.kotaPemohonView}} {...field} options={dataSelect.kotaPemohon} onChange={(e) => handleSelectPemohon(e, "kotaPemohon")} />
                                                )}
                                            />
                                            {errorsPemohon.kotaPemohon && <small className="text-danger">{errorsPemohon.kotaPemohon.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="nomorTlp">No. Telepon</label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" name='nomorTlp' id="nomorTlp" value={cekdataDiri.nomorTlp ? removeNonNumeric(cekdataDiri.nomorTlp) : ""} {...registerPemohon("nomorTlp")} className="form-control form-control-sm" placeholder="6289898989898" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="nomorFax">No. Fax.</label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" name='nomorFax' id="nomorFax" value={cekdataDiri.nomorFax ? removeNonNumeric(cekdataDiri.nomorFax) : ""} {...registerPemohon("nomorFax")} className="form-control form-control-sm" placeholder="0" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="jenisIdentitasPemohon">Identitas <span className='text-danger'>*</span></label>
                                    <div className="col-sm-2">
                                        <select className={errorsPemohon.jenisIdentitasPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisIdentitasPemohon" id="jenisIdentitasPemohon" {...registerPemohon("jenisIdentitasPemohon", { required: true})}>
                                            <option value="">--</option>
                                            <option value="NPWP">NPWP</option>
                                            <option value="KTP">KTP</option>
                                            <option value="PASSPORT">Passport</option>
                                            <option value="LAIN-LAIN">Lain-lain</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-7">
                                        <input autoComplete="off" type="text" name="noIdentitasPemohon" id="noIdentitasPemohon" value={cekdataDiri.noIdentitasPemohon ? removeNonNumeric(cekdataDiri.noIdentitasPemohon) : ""}  {...registerPemohon("noIdentitasPemohon", { required: "Mohon isi identitas pemohon."})} maxLength={20} className={errorsPemohon.noIdentitasPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Identitas" />
                                            {errorsPemohon.noIdentitasPemohon && <small className="text-danger">{errorsPemohon.noIdentitasPemohon.message}</small>}
                                    </div>
                                    <div className="offset-sm-3 col-sm-9">
                                        <small className='text-danger'>*Isi nomor identitas tanpa tanda baca (hanya angka)</small>
                                    </div>
                                </div>
                                <div className="form-check mt-3" style={{display: (cekdataDiri.statPemilik == "PEMILIK" ? "block" : "none")}}>
                                    <input autoComplete="off" className="form-check-input" type="checkbox" name='samaTTD' id="samaTTD" value="1" onChange={handleCekSameTTD} />
                                    <label className="form-check-label" htmlFor="samaTTD"> Pemohon sama dengan penandatangan dokumen. </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card card-action mb-4">
                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                            <div className="card-action-title">
                                <h5 className="mb-0 text-lightest">Penandatangan Dokumen</h5>
                            </div>
                            <div className="card-action-element">
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="collapse show">
                            <div className="card-body pt-0">
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="namaTtd">Nama <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="namaTtd" name="namaTtd" {...registerPemohon("namaTtd", { required: "Mohon isi nama penandatangan."})} className={errorsPemohon.namaTtd ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Penandatangan" />
                                        {errorsPemohon.namaTtd && <small className="text-danger">{errorsPemohon.namaTtd.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="alamatTtd">Alamat <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="alamatTtd" name="alamatTtd" {...registerPemohon("alamatTtd", { required: "Mohon isi nama penandatangan."})} className={errorsPemohon.alamatTtd ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Penandatangan" />
                                        {errorsPemohon.alamatTtd && <small className="text-danger">{errorsPemohon.alamatTtd.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="jenisIdentitasTtd">Identitas <span className='text-danger'>*</span></label>
                                    <div className="col-sm-2">
                                        <select className={errorsPemohon.jenisIdentitasTtd ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisIdentitasTtd" id="jenisIdentitasTtd" {...registerPemohon("jenisIdentitasTtd", { required: true})}>
                                            <option value="">--</option>
                                            <option value="NPWP">NPWP</option>
                                            <option value="KTP">KTP</option>
                                            <option value="PASSPORT">Passport</option>
                                            <option value="LAIN-LAIN">Lain-lain</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-7">
                                        <input autoComplete="off" type="text" id="noIdentitasTtd" name="noIdentitasTtd" maxLength={20} className={errorsPemohon.noIdentitasTtd ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} value={cekdataDiri.noIdentitasTtd ? removeNonNumeric(cekdataDiri.noIdentitasTtd) : ""} {...registerPemohon("noIdentitasTtd", { required: "Mohon isi identitas penandatangan."})} placeholder="Nomor Identitas" />
                                        {errorsPemohon.noIdentitasTtd && <small className="text-danger">{errorsPemohon.noIdentitasTtd.message}</small>}
                                    </div>
                                    <div className="offset-sm-3 col-sm-9">
                                        <small className='text-danger'>*Isi nomor identitas tanpa tanda baca (hanya angka)</small>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="jabatanTtd">Jabatan</label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="jabatanTtd" name="jabatanTtd" {...registerPemohon("jabatanTtd")} className="form-control form-control-sm" placeholder="Jabatan" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-action mb-4">
                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                            <div className="card-action-title">
                                <h5 className="mb-0 text-lightest">Contact Person</h5>
                            </div>
                            <div className="card-action-element">
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="collapse show">
                            <div className="card-body pt-0">
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="namaCp">Nama<span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="namaCp" name="namaCp" {...registerPemohon("namaCp", {required: "Mohon isi nama CP"})} className="form-control form-control-sm" placeholder="Nama Contact Person" />
                                        {errorsPemohon.namaCp && <small className="text-danger">{errorsPemohon.namaCp.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="alamatCp">Alamat<span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="alamatCp" name="alamatCp" {...registerPemohon("alamatCp", {required: "Mohon isi alamat CP"})} className="form-control form-control-sm" placeholder="Alamat Contact Person" />
                                        {errorsPemohon.alamatCp && <small className="text-danger">{errorsPemohon.alamatCp.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="teleponCp">Telepon<span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="teleponCp" name="teleponCp" value={cekdataDiri.teleponCp ? removeNonNumeric(cekdataDiri.teleponCp) : ""} {...registerPemohon("teleponCp", {required: "Mohon isi telepon CP"})} className="form-control form-control-sm" placeholder="Telepon Contact Person" />
                                        {errorsPemohon.teleponCp && <small className="text-danger">{errorsPemohon.teleponCp.message}</small>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card card-action mb-4">
                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                            <div className="card-action-title">
                                <h5 className="mb-0 text-lightest">Pengirim</h5>
                            </div>
                            <div className="card-action-element">
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="collapse show">
                            <div className="card-body pt-0">
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="namaPengirim">Nama <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="namaPengirim" name="namaPengirim" {...registerPemohon("namaPengirim", { required: "Mohon isi nama pengirim."})} className={errorsPemohon.namaPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Pengirim" />
                                        {errorsPemohon.namaPengirim && <small className="text-danger">{errorsPemohon.namaPengirim.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="alamatPengirim">Alamat <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="alamatPengirim" name="alamatPengirim" {...registerPemohon("alamatPengirim", { required: "Mohon isi alamat pengirim."})} className={errorsPemohon.alamatPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Pengirim" />
                                        {errorsPemohon.alamatPengirim && <small className="text-danger">{errorsPemohon.alamatPengirim.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="identitas">Identitas <span className='text-danger'>*</span></label>
                                    <div className="col-sm-2">
                                        <select className={errorsPemohon.jenisIdentitasPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisIdentitasPengirim" id="jenisIdentitasPengirim" {...registerPemohon("jenisIdentitasPengirim", { required: true})}>
                                            <option value="">--</option>
                                            <option value="NPWP">NPWP</option>
                                            <option value="KTP">KTP</option>
                                            <option value="PASSPORT">Passport</option>
                                            <option value="LAIN-LAIN">Lain-lain</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-7">
                                        <input autoComplete="off" type="text" id="noIdentitasPengirim" name="noIdentitasPengirim" maxLength={20} value={cekdataDiri.noIdentitasPengirim ? removeNonNumeric(cekdataDiri.noIdentitasPengirim) : ""} {...registerPemohon("noIdentitasPengirim", { required: "Mohon isi identitas pengirim."})} className={errorsPemohon.noIdentitasPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Identitas" />
                                        {errorsPemohon.noIdentitasPengirim && <small className="text-danger">{errorsPemohon.noIdentitasPengirim.message}</small>}
                                    </div>
                                    <div className="offset-sm-3 col-sm-9">
                                        <small className='text-danger'>*Isi nomor identitas tanpa tanda baca (hanya angka)</small>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="nomorTlpPengirim">No. Telepon</label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="nomorTlpPengirim" name="nomorTlpPengirim" value={cekdataDiri.nomorTlpPengirim ? removeNonNumeric(cekdataDiri.nomorTlpPengirim) : ""} {...registerPemohon("nomorTlpPengirim")} className="form-control form-control-sm" placeholder="6289898989898" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="negaraPengirim">Negara <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                        <Controller
                                            control={controlPemohon}
                                            name={"negaraPengirim"}
                                            defaultValue={""}
                                            className="form-control form-control-sm"
                                            rules={{ required: "Mohon pilih negara pengirim." }}
                                            render={({ field: { value,onChange, ...field } }) => (
                                                <Select styles={customStyles} placeholder={"Pilih negara pengirim.."} value={{id: cekdataDiri.negaraPengirim, label: cekdataDiri.negaraPengirimView}} {...field} options={cekdataDiri.permohonan != 'IM' ? [{value: "99", label: "ID - INDONESIA"}] : dataSelect.negaraPengirim} onChange={(e) => handleSelectPemohon(e, "negaraPengirim")} />
                                            )}
                                        />
                                        {errorsPemohon.negaraPengirim && <small className="text-danger">{errorsPemohon.negaraPengirim.message}</small>}
                                    </div>
                                </div>
                                <div style={{visibility: cekdataDiri.permohonan == 'IM' ? 'hidden' : 'visible'}}>
                                    <div className="row mb-3">
                                        <label className="col-sm-3 col-form-label" htmlFor="provPengirim">Provinsi</label>
                                        <div className="col-sm-9">
                                            <Controller
                                                control={controlPemohon}
                                                name={"provPengirim"}
                                                defaultValue={""}
                                                className="form-control form-control-sm"
                                                rules={{ required: false }}
                                                render={({ field: { value,onChange, ...field } }) => (
                                                    <Select styles={customStyles} placeholder={"Pilih provinsi pengirim.."} value={{id: cekdataDiri.provPengirim, label: cekdataDiri.provPengirimView}} {...field} options={dataSelect.provPengirim} onChange={(e) => handleSelectPemohon(e, "provPengirim") & handleKota(e.value, "kotaPengirim")} />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-3 col-form-label" htmlFor="kotaPengirim">Kota/Kab</label>
                                        <div className="col-sm-9">
                                            <Controller
                                                control={controlPemohon}
                                                name={"kotaPengirim"}
                                                defaultValue={""}
                                                className="form-control form-control-sm"
                                                rules={{ required: false }}
                                                render={({ field: { value,onChange, ...field } }) => (
                                                    <Select styles={customStyles} placeholder={"Pilih kota/kab asal pengirim.."} value={{id: cekdataDiri.kotaPengirim, label: cekdataDiri.kotaPengirimView}} {...field} options={dataSelect.kotaPengirim} onChange={(e) => handleSelectPemohon(e, "kotaPengirim")} />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-check mt-3" style={{display: (cekdataDiri.statPemilik == "PEMILIK" ? "block" : "none")}}>
                                <input autoComplete="off" className="form-check-input" type="checkbox" name='samaPengirim' id="samaPengirim" value="1" onChange={handleCekSamePengirim} />
                                <label className="form-check-label" htmlFor="samaPengirim"> Sama dengan pemohon. </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card card-action mb-4">
                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                            <div className="card-action-title">
                                <h5 className="mb-0 text-lightest">Penerima</h5>
                            </div>
                            <div className="card-action-element">
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="collapse show">
                            <div className="card-body pt-0">
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="namaPenerima">Nama <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="namaPenerima" name="namaPenerima" {...registerPemohon("namaPenerima", { required: "Mohon isi nama penerima."})} className={errorsPemohon.namaPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Penerima" />
                                        {errorsPemohon.namaPenerima && <small className="text-danger">{errorsPemohon.namaPenerima.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="alamatPenerima">Alamat <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="alamatPenerima" name="alamatPenerima" {...registerPemohon("alamatPenerima", { required: "Mohon isi alamat penerima."})} className={errorsPemohon.alamatPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Penerima" />
                                        {errorsPemohon.alamatPenerima && <small className="text-danger">{errorsPemohon.alamatPenerima.message}</small>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="jenisIdentitasPenerima">Identitas <span className='text-danger'>*</span></label>
                                    <div className="col-sm-2">
                                        <select className={errorsPemohon.jenisIdentitasPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisIdentitasPenerima" id="jenisIdentitasPenerima" {...registerPemohon("jenisIdentitasPenerima", { required: true})}>
                                        <option value="">--</option>
                                            <option value="NPWP">NPWP</option>
                                            <option value="KTP">KTP</option>
                                            <option value="PASSPORT">Passport</option>
                                            <option value="LAIN-LAIN">Lain-lain</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-7">
                                        <input autoComplete="off" type="text" id="noIdentitasPenerima" name="noIdentitasPenerima" maxLength={20} value={cekdataDiri.noIdentitasPenerima ? removeNonNumeric(cekdataDiri.noIdentitasPenerima) : ""} className={errorsPemohon.noIdentitasPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Identitas" {...registerPemohon("noIdentitasPenerima", { required: "Mohon isi identitas penerima."})} />
                                        {errorsPemohon.noIdentitasPenerima && <small className="text-danger">{errorsPemohon.noIdentitasPenerima.message}</small>}
                                    </div>
                                    <div className="offset-sm-3 col-sm-9">
                                        <small className='text-danger'>*Isi nomor identitas tanpa tanda baca (hanya angka)</small>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="nomorTlpPenerima">No. Telepon</label>
                                    <div className="col-sm-9">
                                        <input autoComplete="off" type="text" id="nomorTlpPenerima" name="nomorTlpPenerima" {...registerPemohon("nomorTlpPenerima")} value={cekdataDiri.nomorTlpPenerima ? removeNonNumeric(cekdataDiri.nomorTlpPenerima) : ""} className="form-control form-control-sm" placeholder="6289898989898" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="negaraPenerima">Negara <span className='text-danger'>*</span></label>
                                    <div className="col-sm-9">
                                    <Controller
                                            control={controlPemohon}
                                            name={"negaraPenerima"}
                                            defaultValue={""}
                                            className="form-control form-control-sm"
                                            rules={{ required: "Mohon pilih negara penerima." }}
                                            render={({ field: { value,onChange, ...field } }) => (
                                                <Select styles={customStyles} placeholder={"Pilih negara penerima.."} value={{id: cekdataDiri.negaraPenerima, label: cekdataDiri.negaraPenerimaView}} {...field} options={cekdataDiri.permohonan != 'EX' ? [{value: "99", label: "ID - INDONESIA"}] : dataSelect.negaraPenerima} onChange={(e) => handleSelectPemohon(e, "negaraPenerima")} />
                                            )}
                                        />
                                        {errorsPemohon.negaraPenerima && <small className="text-danger">{errorsPemohon.negaraPenerima.message}</small>}
                                    </div>
                                </div>
                                <div style={{visibility: cekdataDiri.permohonan == 'EX' ? 'hidden' : 'visible'}}>
                                    <div className="row mb-3">
                                        <label className="col-sm-3 col-form-label" htmlFor="provPenerima">Provinsi</label>
                                        <div className="col-sm-9">
                                            <Controller
                                                control={controlPemohon}
                                                name={"provPenerima"}
                                                defaultValue={""}
                                                className="form-control form-control-sm"
                                                rules={{ required: false }}
                                                render={({ field: { value,onChange, ...field } }) => (
                                                    <Select styles={customStyles} placeholder={"Pilih provinsi penerima.."} value={{id: cekdataDiri.provPenerima, label: cekdataDiri.provPenerimaView}} {...field} options={dataSelect.provPenerima} onChange={(e) => handleSelectPemohon(e, "provPenerima") & handleKota(e.value, "kotaPenerima")} />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-3 col-form-label" htmlFor="kotaPenerima">Kota/Kab</label>
                                        <div className="col-sm-9">
                                            <Controller
                                                control={controlPemohon}
                                                name={"kotaPenerima"}
                                                defaultValue={""}
                                                className="form-control form-control-sm"
                                                rules={{ required: false }}
                                                render={({ field: { value,onChange, ...field } }) => (
                                                    <Select styles={customStyles} placeholder={"Pilih kota/kab penerima.."} value={{id: cekdataDiri.kotaPenerima, label: cekdataDiri.kotaPenerimaView}} {...field} options={dataSelect.kotaPenerima} onChange={(e) => handleSelectPemohon(e, "kotaPenerima")} />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-check mt-3" style={{display: (cekdataDiri.statPemilik == "PEMILIK" ? "block" : "none")}}>
                                    <input autoComplete="off" className="form-check-input" type="checkbox" name='samaPenerima' id="samaPenerima" value="1" onChange={handleCekSamePenerima} />
                                    <label className="form-check-label" htmlFor="samaPenerima"> Sama dengan pemohon. </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 d-flex justify-content-between">
                    <button type="button" className="btn btn-label-secondary" disabled>
                        <i className="fa-solid fa-chevron-left me-sm-2 me-1"></i>
                        <span className="d-sm-inline-block d-none">Sebelumnya</span>
                    </button>
                    {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                        <button type="submit" className="btn btn-primary">
                            <span className="d-sm-inline-block d-none me-sm-1">Simpan & Lanjutkan</span>
                            <i className="fa-solid fa-angle-right me-sm-2 me-1"></i>
                        </button>
                    }
                </div>
            </div>
            {/* </motion.div> */}
            </form>
        </div>
                    <div id="cardPelabuhan" className={wizardPage == 2 ? "content active dstepper-block" : "content"}>
                        <form className="input-form" onSubmit={handleFormPelabuhan(onSubmitPelabuhan)}>
                            <input autoComplete="off" type="hidden" name='idPtk' {...registerPelabuhan("idPtk")} />
                            <input autoComplete="off" type="hidden" name='noAju' {...registerPelabuhan("noAju")} />
                            
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Pengirim - Penerima</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="negaraAsal">Negara Muat <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <Controller
                                                            control={controlPelabuhan}
                                                            name={"negaraAsal"}
                                                            defaultValue={""}
                                                            className="form-control form-control-sm"
                                                            rules={{ required: "Mohon pilih negara pelabuhan pengirim." }}
                                                            render={({ field: { value,onChange, ...field } }) => (
                                                                <Select styles={customStyles} placeholder={"Pilih negara muat.."} value={{id: cekdataPelabuhan.negaraAsal, label: cekdataPelabuhan.negaraAsalView}} {...field} options={cekdataDiri.permohonan != "IM" ? [{label: "ID - INDONESIA", value: 99}] : dataSelect.negaraAsal} onChange={(e) => e ? setValuePelabuhan("negaraAsal", e.value) & setValuePelabuhan("negaraAsalView", e.label) & handlePelabuhan(e.value, "pelMuat") : null} />
                                                            )}
                                                        />
                                                        {errorsPelabuhan.negaraAsal && <small className="text-danger">{errorsPelabuhan.negaraAsal.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="negaraTujuan">Negara Bongkar <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <Controller
                                                            control={controlPelabuhan}
                                                            name={"negaraTujuan"}
                                                            defaultValue={""}
                                                            className="form-control form-control-sm"
                                                            rules={{ required: "Mohon pilih negara pelabuhan pengirim." }}
                                                            render={({ field: { value,onChange, ...field } }) => (
                                                                <Select styles={customStyles} placeholder={"Pilih negara bongkar.."} value={{id: cekdataPelabuhan.negaraTujuan, label: cekdataPelabuhan.negaraTujuanView}} {...field} options={cekdataDiri.permohonan != "EX" ? [{value: "99", label: "ID - INDONESIA"}] : dataSelect.negaraTujuan} onChange={(e) => e ? setValuePelabuhan("negaraTujuan", e.value) & setValuePelabuhan("negaraTujuanView", e.label) & handlePelabuhan(e.value, "pelBongkar") : null} />
                                                            )}
                                                        />
                                                        {errorsPelabuhan.negaraTujuan && <small className="text-danger">{errorsPelabuhan.negaraTujuan.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="transitOpsi">Transit <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <div className="form-check form-check-inline">
                                                            <input autoComplete="off" className="form-check-input" type="radio" name="transitOpsi" id="transitYa" value="1"  {...registerPelabuhan("transitOpsi", { required: "Mohon pilih transit."})}/>
                                                            <label className="form-check-label" htmlFor="transitYa">Ya</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input autoComplete="off" className="form-check-input" type="radio" name="transitOpsi" id="transitTidak" value="0" {...registerPelabuhan("transitOpsi")} />
                                                            <label className="form-check-label" htmlFor="transitTidak">Tidak</label>
                                                        </div>
                                                        {errorsPelabuhan.transitOpsi && <small className="text-danger">{errorsPelabuhan.transitOpsi.message}</small>}
                                                    </div>
                                                </div>
                                                <div style={{display: cekdataPelabuhan.transitOpsi == '1' ? 'block' : 'none' }}>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="negaraTransit">Negara Transit</label>
                                                    <div className="col-sm-9">
                                                        <Controller
                                                            control={controlPelabuhan}
                                                            name={"negaraTransit"}
                                                            defaultValue={""}
                                                            className="form-control form-control-sm"
                                                            rules={{ required: false }}
                                                            render={({ field: { value,onChange, ...field } }) => (
                                                                <Select styles={customStyles} placeholder={"Pilih negara transit.."} value={{id: cekdataPelabuhan.negaraTransit, label: cekdataPelabuhan.negaraTransitView}} {...field} options={dataSelect.negaraTransit} onChange={(e) => e ? setValuePelabuhan("negaraTransit", e.value) & setValuePelabuhan("negaraTransitView", e.label) & handlePelabuhan(e.value, "pelTransit") : null} />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Pelabuhan</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="pelMuat">Muat / Asal <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <Controller
                                                            control={controlPelabuhan}
                                                            name={"pelMuat"}
                                                            defaultValue={""}
                                                            className="form-control form-control-sm"
                                                            rules={{ required: "Mohon pilih pelabuhan muat/asal." }}
                                                            render={({ field: { value,onChange, ...field } }) => (
                                                                <Select styles={customStyles} placeholder={"Pilih pelabuhan muat/asal.."} value={{id: cekdataPelabuhan.pelMuat, label: cekdataPelabuhan.pelMuatView}} {...field} options={dataSelect.pelMuat} onChange={(e) => e ? setValuePelabuhan("pelMuat", e.value) & setValuePelabuhan("pelMuatView", e.label) : null} />
                                                            )}
                                                        />
                                                        {errorsPelabuhan.pelMuat && <small className="text-danger">{errorsPelabuhan.pelMuat.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="pelBongkar">Bongkar / Tujuan <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <Controller
                                                            control={controlPelabuhan}
                                                            name={"pelBongkar"}
                                                            defaultValue={""}
                                                            className="form-control form-control-sm"
                                                            rules={{ required: "Mohon pilih pelabuhan bongkar." }}
                                                            render={({ field: { value,onChange, ...field } }) => (
                                                                <Select styles={customStyles} placeholder={"Pilih pelabuhan bongkar.."} value={{id: cekdataPelabuhan.pelBongkar, label: cekdataPelabuhan.pelBongkarView}} {...field} options={dataSelect.pelBongkar} onChange={(e) => e ? setValuePelabuhan("pelBongkar", e.value) & setValuePelabuhan("pelBongkarView", e.label) : null} />
                                                            )}
                                                        />
                                                        {errorsPelabuhan.pelBongkar && <small className="text-danger">{errorsPelabuhan.pelBongkar.message}</small>}
                                                    </div>
                                                </div>
                                                <div style={{display: (cekdataDiri.permohonan == "IM" ? "block" : "none")}}>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label" htmlFor="sandar">TPK (Border)</label>
                                                        <div className="col-sm-9">
                                                            <input autoComplete="off" type="text" name='sandar' id="sandar" {...registerPelabuhan("sandar")} className="form-control form-control-sm" placeholder="Lokasi Sandar" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{display: cekdataPelabuhan.transitOpsi == '1' ? 'block' : 'none' }}>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label" htmlFor="pelTransit">Pelabuhan Transit</label>
                                                        <div className="col-sm-9">
                                                            <Controller
                                                                control={controlPelabuhan}
                                                                name={"pelTransit"}
                                                                defaultValue={""}
                                                                className="form-control form-control-sm"
                                                                rules={{ required: false }}
                                                                render={({ field: { value,onChange, ...field } }) => (
                                                                    <Select styles={customStyles} placeholder={"Pilih pelabuhan transit.."} value={{id: cekdataPelabuhan.pelTransit, label: cekdataPelabuhan.pelTransitView}} {...field} options={dataSelect.pelTransit} onChange={(e) => e ? setValuePelabuhan("pelTransit", e.value) & setValuePelabuhan("pelTransitView", e.label) : null} />
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div style={{display: cekdataPelabuhan.transitOpsi == '1' ? 'block' : 'none' }}>
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Pengangkutan Sebelum Transit</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="modaTransit">Moda Transportasi</label>
                                                    <div className="col-sm-9">
                                                        <select name="modaTransit" id="modaTransit" {...registerPelabuhan("modaTransit")} className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            <option value="1">Laut</option>
                                                            <option value="2">Kereta Api</option>
                                                            <option value="3">Jalan Raya</option>
                                                            <option value="4">Udara</option>
                                                            <option value="5">POS</option>
                                                            <option value="6">Multimoda</option>
                                                            <option value="7">Instalansi</option>
                                                            <option value="8">Perairan</option>
                                                            <option value="9">Lainnya</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tipeTransit">Tipe Transportasi</label>
                                                    <div className="col-sm-9">
                                                        <select id="tipeTransit" name="tipeTransit" {...registerPelabuhan("tipeTransit")} className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            <option value="1">Penumpang</option>
                                                            <option value="2">Kombi</option>
                                                            <option value="3">Kargo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="namaAlatAngkutTransit">Nama Alat Angkut</label>
                                                    <div className="col-sm-9">
                                                        <input autoComplete="off" type="text" id="namaAlatAngkutTransit" name="namaAlatAngkutTransit" {...registerPelabuhan("namaAlatAngkutTransit")} className="form-control form-control-sm" placeholder="Nama Alat Angkut" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="nomorAlatAngkutTransit">Nomor Alat Angkut</label>
                                                    <div className="col-sm-9">
                                                        <input autoComplete="off" type="text" id="nomorAlatAngkutTransit" name="nomorAlatAngkutTransit" {...registerPelabuhan("nomorAlatAngkutTransit")} className="form-control form-control-sm" placeholder="Nomor Alat Angkut" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="callSignTransit">Call Sign</label>
                                                    <div className="col-sm-9">
                                                        <input autoComplete="off" type="text" id="callSignTransit" name="callSignTransit" {...registerPelabuhan("callSignTransit")} className="form-control form-control-sm" placeholder="Call Sign" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="benderaTransit">Bendera</label>
                                                    <div className="col-sm-9">
                                                        <Controller
                                                            control={controlPelabuhan}
                                                            name={"benderaTransit"}
                                                            defaultValue={""}
                                                            className="form-control form-control-sm"
                                                            rules={{ required: false }}
                                                            render={({ field: { value,onChange, ...field } }) => (
                                                                <Select styles={customStyles} placeholder={"Pilih bendera kapal transit.."} value={{id: cekdataPelabuhan.benderaTransit, label: cekdataPelabuhan.benderaTransitView}} {...field} options={dataSelect.benderaTransit} onChange={(e) => e ? setValuePelabuhan("benderaTransit", e.value) & setValuePelabuhan("benderaTransitView", e.label) : null} />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tglBerangkatTransit">Tgl Berangkat</label>
                                                    <div className="col-sm-4">
                                                        <input autoComplete="off" type="date" id="tglBerangkatTransit" name="tglBerangkatTransit" {...registerPelabuhan("tglBerangkatTransit")} className="form-control form-control-sm" placeholder="Tgl Berangkat" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tglTibaTransit">Tgl Tiba</label>
                                                    <div className="col-sm-4">
                                                        <input autoComplete="off" type="date" id="tglTibaTransit" name="tglTibaTransit" {...registerPelabuhan("tglTibaTransit")} className="form-control form-control-sm" placeholder="Tgl Tiba" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Pengangkutan Terakhir</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="modaAkhir">Moda Transportasi <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <select id="modaAkhir" name="modaAkhir" {...registerPelabuhan("modaAkhir", { required: "Mohon pilih moda transportasi akhir."})} className={errorsPelabuhan.modaAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                            <option value="">--</option>
                                                            <option value="1">Laut</option>
                                                            <option value="2">Kereta Api</option>
                                                            <option value="3">Jalan Raya</option>
                                                            <option value="4">Udara</option>
                                                            <option value="5">POS</option>
                                                            <option value="6">Multimoda</option>
                                                            <option value="7">Instalansi</option>
                                                            <option value="8">Perairan</option>
                                                            <option value="9">Lainnya</option>
                                                        </select>
                                                        {errorsPelabuhan.modaAkhir && <small className="text-danger">{errorsPelabuhan.modaAkhir.message}</small>}
                                                        <div style={{display: cekdataPelabuhan.modaAkhir == '9' ? 'block' : 'none'}}>
                                                            <input autoComplete="off" type="text" className='form-control form-control-sm' name='modaAkhirLainnya' id='modaAkhirLainnya' {...registerPelabuhan("modaAkhirLainnya")} placeholder='Moda Transportasi Lainnya..'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tipeAkhir">Tipe Transportasi</label>
                                                    <div className="col-sm-9">
                                                        <select id="tipeAkhir" name="tipeAkhir"  {...registerPelabuhan("tipeAkhir")} className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            <option value="1">Penumpang</option>
                                                            <option value="2">Kombi</option>
                                                            <option value="3">Kargo</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="namaAlatAngkutAkhir">Nama Alat Angkut <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <input autoComplete="off" type="text" id="namaAlatAngkutAkhir" name="namaAlatAngkutAkhir" {...registerPelabuhan("namaAlatAngkutAkhir", { required: "Mohon isi nama alat angkut akhir."})} className={errorsPelabuhan.namaAlatAngkutAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Alat Angkut" />
                                                        {errorsPelabuhan.namaAlatAngkutAkhir && <small className="text-danger">{errorsPelabuhan.namaAlatAngkutAkhir.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="nomorAlatAngkutAkhir">Nomor Alat Angkut <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <input autoComplete="off" type="text" id="nomorAlatAngkutAkhir" name="nomorAlatAngkutAkhir" {...registerPelabuhan("nomorAlatAngkutAkhir", { required: "Mohon isi nomor alat angkut akhir."})} className={errorsPelabuhan.nomorAlatAngkutAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Alat Angkut" />
                                                        {errorsPelabuhan.nomorAlatAngkutAkhir && <small className="text-danger">{errorsPelabuhan.nomorAlatAngkutAkhir.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="callSignAkhir">Call Sign</label>
                                                    <div className="col-sm-9">
                                                        <input autoComplete="off" type="text" id="callSignAkhir" name="callSignAkhir" {...registerPelabuhan("callSignAkhir")} className="form-control form-control-sm" placeholder="Call Sign" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="benderaAkhir">Bendera</label>
                                                    <div className="col-sm-9">
                                                        <Controller
                                                            control={controlPelabuhan}
                                                            name={"benderaAkhir"}
                                                            defaultValue={""}
                                                            className="form-control form-control-sm"
                                                            rules={{ required: false }}
                                                            render={({ field: { value,onChange, ...field } }) => (
                                                                <Select styles={customStyles} placeholder={"Pilih bendera kapal akhir.."} value={{id: cekdataPelabuhan.benderaAkhir, label: cekdataPelabuhan.benderaAkhirView}} {...field} options={dataSelect.benderaAkhir} onChange={(e) => e ? setValuePelabuhan("benderaAkhir", e.value) & setValuePelabuhan("benderaAkhirView", e.label) : null} />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tglBerangkatAkhir">Tgl Berangkat <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-4">
                                                        <input autoComplete="off" type="date" id="tglBerangkatAkhir" name="tglBerangkatAkhir" {...registerPelabuhan("tglBerangkatAkhir", { required: "Mohon isi tanggal berangkat."})} className={errorsPelabuhan.tglBerangkatAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Tgl Berangkat" />
                                                        {errorsPelabuhan.tglBerangkatAkhir && <small className="text-danger">{errorsPelabuhan.tglBerangkatAkhir.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tglTibaAkhir">Tgl Tiba <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-4">
                                                        <input autoComplete="off" type="date" id="tglTibaAkhir" name="tglTibaAkhir" {...registerPelabuhan("tglTibaAkhir", { required: "Mohon isi tanggal tiba."})} className={errorsPelabuhan.tglTibaAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Tgl Tiba" />
                                                        {errorsPelabuhan.tglTibaAkhir && <small className="text-danger">{errorsPelabuhan.tglTibaAkhir.message}</small>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="card card-action mb-4">
                                        <div className="card-header">
                                            <div className="card-action-title">
                                                <span className="mb-0 me-sm-2 me-1">Menggunakan Kontainer</span>
                                                <div className="form-check form-check-inline">
                                                    <input autoComplete="off" className="form-check-input" type="radio" name="cekKontainer" id="kontainerYa" value="1" {...registerPelabuhan("cekKontainer", { required: "Mohon isi pilihan kontainer."})} />
                                                    <label className="form-check-label" htmlFor="kontainerYa">Ya</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input autoComplete="off" className="form-check-input" type="radio" name="cekKontainer" id="kontainerTidak" value="0" {...registerPelabuhan("cekKontainer")} />
                                                    <label className="form-check-label" htmlFor="kontainerTidak">Tidak</label>
                                                </div>
                                                {errorsPelabuhan.cekKontainer && <small className="text-danger">{errorsPelabuhan.cekKontainer.message}</small>}
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show" style={{display: (cekdataPelabuhan.cekKontainer == '1' ? 'block' : 'none')}}>
                                            <div className="card-body pt-0">
                                                <div className="row g-3 mb-3">
                                                    <div className="pb-2">
                                                        <button type="button" className="btn btn-xs btn-primary" data-bs-toggle="modal" data-bs-target="#modKontainer">Tambah Kontainer</button>
                                                        <button type="button" onClick={dataKontainerPtk} className="btn btn-xs btn-info float-end"><i className="menu-icon tf-icons fa-solid fa-sync"></i> Refresh Data</button>
                                                    </div>
                                                    <div className="table-responsive text-nowrap" style={{height: (kontainerPtk?.length > 8 ? "300px" : "")}}>
                                                        <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                            <thead style={{backgroundColor: '#123138' }}>
                                                                <tr>
                                                                    <th className='text-lightest'>No</th>
                                                                    <th className='text-lightest'>Nomor Kontainer</th>
                                                                    <th className='text-lightest'>Size</th>
                                                                    <th className='text-lightest'>Stuff</th>
                                                                    <th className='text-lightest'>Tipe</th>
                                                                    <th className='text-lightest'>Segel</th>
                                                                    <th className='text-lightest'>Act</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {kontainerPtk ? (
                                                                    kontainerPtk?.map((data, index) => (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{data.nomor}</td>
                                                                            <td>{sizeKontainer[(data.ukuran_kontainer_id - 1)]}</td>
                                                                            <td>{data.stuff_kontainer_id == 1 ? "FCL" : "LCL" }</td>
                                                                            <td>{tipeKontainer[(data.tipe_kontainer_id - 1)]}</td>
                                                                            <td>{data.segel}</td>
                                                                            <td>
                                                                                <div className="d-grid gap-2">
                                                                                    <button type="button" className="btn p-0 hide-arrow dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown">
                                                                                        <i className="menu-icon tf-icons fa-solid fa-ellipsis-vertical"></i>
                                                                                    </button>
                                                                                    <div className="dropdown-menu">
                                                                                        <button className="dropdown-item" type="button" data-ptk={data.ptk_id} data-header={data.id} onClick={handleEditKontainer} data-bs-toggle="modal" data-bs-target="#modKontainer"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</button>
                                                                                        <button className="dropdown-item" type='button'><i className="fa-solid fa-trash me-1"></i> Delete</button>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : null}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex justify-content-between">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                        <i className="fa-solid fa-chevron-left me-sm-2 me-1"></i>
                                        <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                    </button>
                                    {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                                        <button type="submit" className="btn btn-primary">
                                            <span className="d-sm-inline-block d-none me-sm-1">Simpan & Lanjutkan</span>
                                            <i className="fa-solid fa-angle-right me-sm-2 me-1"></i>
                                        </button>
                                    }
                                </div>
                            </div>
                        </form>
                        </div>

                        <div id="cardKomoditas" className={wizardPage == 3 ? "content active dstepper-block" : "content"}>
                            <form className="input-form" onSubmit={handleFormMP(onSubmitKomoditas)}>
                            <input autoComplete="off" type="hidden" name='idPtk' {...registerMP("idPtk")} />
                            <input autoComplete="off" type="hidden" name='noAju' {...registerMP("noAju")} />
                            
                                <div className="row">
                                <div className="col-sm-12">
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Uraian</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="card-body pt-0">
                                                        <div className="row mb-3" style={{display: cekdataDiri.mediaPembawa == 'T' ? 'block' : 'none'}}>
                                                            <label className="col-sm-3 col-form-label" htmlFor="mediaPembawa">Muatan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-8">
                                                                <div className="form-check form-check-inline">
                                                                    <input autoComplete="off" className="form-check-input" type="radio" name="jenisAngkut" id="curah" value="1" {...registerMP("jenisAngkut", { required: (cekdataDiri.mediaPembawa == "T" ? "Mohon pilih apakah komoditas curah atau tidak." : false)})} />
                                                                    <label className="form-check-label" htmlFor="curah">Curah</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input autoComplete="off" className="form-check-input" type="radio" name="jenisAngkut" id="noncurah" value="0" {...registerMP("jenisAngkut")} />
                                                                    <label className="form-check-label" htmlFor="noncurah">Non Curah</label>
                                                                </div>
                                                                {errorsMP.jenisAngkut && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.jenisAngkut.message}</small></div>}
                                                            </div>
                                                        </div>
                                                        <div style={{display: (cekdataDiri.mediaPembawa == "I" ? "block" : "none")}}>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="sumberMpTangkap">Sumber</label>
                                                                <div className="col-sm-8">
                                                                    <div className="form-check form-check-inline">
                                                                        <input autoComplete="off" className="form-check-input" type="radio" name="sumberMpTangkap" id="FARM" value="FARM" {...registerMP("sumberMpTangkap", { required: (cekdataDiri.mediaPembawa == "I" ? "Mohon pilih sumber komoditas." : false)})} />
                                                                        <label className="form-check-label" htmlFor="FARM">FARM / budidaya</label>
                                                                    </div>
                                                                    <div className="form-check form-check-inline">
                                                                        <input autoComplete="off" className="form-check-input" type="radio" name="sumberMpTangkap" id="WILD" value="WILD" {...registerMP("sumberMpTangkap")} />
                                                                        <label className="form-check-label" htmlFor="WILD">WILD / tangkap</label>
                                                                    </div>
                                                                    {errorsMP.sumberMpTangkap && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.sumberMpTangkap.message}</small></div>}
                                                                </div>
                                                            </div>
                                                            <div style={{display: (cekdataMP.sumberMpTangkap == "WILD" ? "block" : "none")}}>
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-3 col-form-label" htmlFor="areaTangkap">Area Tangkap</label>
                                                                    <div className="col-sm-8">
                                                                        <Controller
                                                                            control={controlMP}
                                                                            name={"areaTangkap"}
                                                                            defaultValue={""}
                                                                            className="form-control form-control-sm"
                                                                            rules={{required: (cekdataMP.sumberMpTangkap == "WILD" ? "Mohon pilih area tangkap." : false)}}
                                                                            render={({ field: { value,onChange, ...field } }) => (
                                                                                <Select styles={customStyles} placeholder={"Pilih area.."}
                                                                                value={{id: cekdataMP.areaTangkap, label: cekdataMP.areaTangkapView}}
                                                                                {...field} options={areaTangkap()} onChange={(e) => setValueMP("areaTangkap", e.value) & setValueMP("areaTangkapView", e.label)} />
                                                                            )}
                                                                        />
                                                                        {errorsMP.areaTangkap && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.areaTangkap.message}</small></div>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="peruntukan">Peruntukan</label>
                                                            <div className="col-sm-4">
                                                                <select name="peruntukan" id="peruntukan" {...registerMP("peruntukan", { required: cekdataDiri.mediaPembawa == "T" ? "Mohon pilih jenis angkut." : false})} className={errorsMP.peruntukan ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                    <option value="">--</option>
                                                                    <option value="1">Ditanam/Budidaya/Peningkatan Mutu Genetik</option>
                                                                    <option value="2">Konsumsi</option>
                                                                    <option value="3">Penelitian</option>
                                                                    <option value="4">Pameran/Kontes</option>
                                                                    <option value="5">Perdagangan</option>
                                                                    <option value="6">Bahan Baku</option>
                                                                    <option value="7">Ornamental/Hias</option>
                                                                    <option value="8">Lainnya</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-sm-5">
                                                                <div style={{display: cekdataMP.peruntukan == '8' ? 'block' : 'none'}}>
                                                                    <input autoComplete="off" type="text" id="peruntukanLain" name="peruntukanLain" {...registerMP("peruntukanLain", { required: cekdataMP.peruntukan == "8" ? "Mohon isi peruntukan lain." : false})} className={errorsMP.peruntukanLain ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Peruntukan Lainnya.." />
                                                                </div>
                                                            </div>
                                                            {errorsMP.peruntukan && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.peruntukan.message}</small></div>}
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="negaraAsalMP">Negara Asal Komoditas <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-6">
                                                                <Controller
                                                                    control={controlMP}
                                                                    name={"negaraAsalMP"}
                                                                    defaultValue={""}
                                                                    className="form-control form-control-sm"
                                                                    rules={{ required: "Mohon pilih negara asal komoditas." }}
                                                                    render={({ field: { value,onChange, ...field } }) => (
                                                                        <Select styles={customStyles} placeholder={"Pilih negara.."}
                                                                        value={{id: cekdataMP.negaraAsalMP, label: cekdataMP.negaraAsalMPView}}
                                                                        {...field} options={cekdataDiri.permohonan != "IM" ? [{value: "99", label: "ID - INDONESIA"}] : dataSelect.negaraAsalMP} onChange={(e) => handleSelectNegKomoditas(e, "negaraAsalMP") & (e.value == '99' ? handleKota(null, "daerahAsalMP") : null)} />
                                                                    )}
                                                                />
                                                            </div>
                                                            {errorsMP.negaraAsalMP && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.negaraAsalMP.message}</small></div>}
                                                        </div>
                                                        <div className="row mb-3" style={{visibility: (cekdataMP.negaraAsalMP == 99 ? "visible" : "hidden")}}>
                                                            <label className="col-sm-3 col-form-label" htmlFor="daerahAsalMP">Daerah Asal</label>
                                                            <div className="col-sm-6">
                                                                <Controller
                                                                    control={controlMP}
                                                                    name={"daerahAsalMP"}
                                                                    defaultValue={""}
                                                                    className="form-control form-control-sm"
                                                                    rules={{ required: false }}
                                                                    render={({ field: { value,onChange, ...field } }) => (
                                                                        <Select styles={customStyles} placeholder={"Pilih daerah asal.."} value={{id: cekdataMP.daerahAsalMP, label: cekdataMP.daerahAsalMPView}} {...field} options={dataSelect.daerahAsalMP} onChange={(e) => handleSelectNegKomoditas(e, "daerahAsalMP")} />
                                                                    )}
                                                                />
                                                                {errorsMP.daerahAsal && <small className="text-danger">{errorsMP.daerahAsalMP.message}</small>}
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="negaraTujuanMP">Negara Tujuan Komoditas <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-6">
                                                                <Controller
                                                                    control={controlMP}
                                                                    defaultValue={""}
                                                                    name={"negaraTujuanMP"}
                                                                    className="form-control form-control-sm"
                                                                    rules={{ required: "Mohon pilih negara tujuan komoditas." }}
                                                                    render={({ field: { value,onChange, ...field } }) => (
                                                                        <Select styles={customStyles} placeholder={"Pilih negara.."} value={{id: cekdataMP.negaraTujuanMP, label: cekdataMP.negaraTujuanMPView}} {...field} options={cekdataDiri.permohonan != "EX" ? [{value: "99", label: "ID - INDONESIA"}] :dataSelect.negaraTujuanMP} onChange={(e) => handleSelectNegKomoditas(e, "negaraTujuanMP") & (e.value == '99' ? handleKota(null, "daerahTujuanMP") : null)} />
                                                                    )}
                                                                />
                                                            </div>
                                                            {errorsMP.negaraTujuanMP && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.negaraTujuanMP.message}</small></div>}
                                                        </div>
                                                        <div className="row mb-3" style={{visibility: (cekdataMP.negaraTujuanMP == 99 ? "visible" : "hidden")}}>
                                                            <label className="col-sm-3 col-form-label" htmlFor="daerahTujuanMP">Daerah Tujuan</label>
                                                            <div className="col-sm-6">
                                                                <Controller
                                                                    control={controlMP}
                                                                    name={"daerahTujuanMP"}
                                                                    defaultValue={""}
                                                                    className="form-control form-control-sm"
                                                                    rules={{ required: false }}
                                                                    render={({ field: { value,onChange, ...field } }) => (
                                                                        <Select styles={customStyles} placeholder={"Pilih daerah tujuan.."} value={{id: cekdataMP.daerahTujuanMP, label: cekdataMP.daerahTujuanMPView}} {...field} options={dataSelect.daerahTujuanMP} onChange={(e) => handleSelectNegKomoditas(e, "daerahTujuanMP")} />
                                                                    )}
                                                                />
                                                                {errorsMP.daerahTujuanMP && <small className="text-danger">{errorsMP.daerahTujuanMP.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="card-body pt-0">
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="tingkatOlah">Tingkat Pengolahan</label>
                                                            <div className="col-sm-9">
                                                                <div className="col-sm-9">
                                                                    <div className="form-check form-check-inline">
                                                                        <input autoComplete="off" className="form-check-input" type="radio" name="tingkatOlah" id="sudah_olah" value="diolah" {...registerMP("tingkatOlah", { required: "Mohon isi peruntukan lain."})} />
                                                                        <label className="form-check-label" htmlFor="sudah_olah">Sudah Diolah</label>
                                                                    </div>
                                                                    <div className="form-check form-check-inline">
                                                                        <input autoComplete="off" className="form-check-input" type="radio" name="tingkatOlah" id="belum_olah" value="belum" {...registerMP("tingkatOlah")} />
                                                                        <label className="form-check-label" htmlFor="belum_olah">Belum Olah</label>
                                                                    </div>
                                                                    {errorsMP.tingkatOlah && <small className="text-danger">{errorsMP.tingkatOlah.message}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="jenisKemasan">Jenis Kemasan</label>
                                                            <div className="col-sm-5">
                                                                <Controller
                                                                    control={controlMP}
                                                                    defaultValue={""}
                                                                    name={"jenisKemasan"}
                                                                    className="form-select form-select-sm"
                                                                    rules={{ required: false }}
                                                                    render={({ field: { value,onChange, ...field } }) => (
                                                                        <Select styles={customStyles} placeholder={"Pilih Kemasan.."} value={{id: cekdataMP.jenisKemasan, label: cekdataMP.jenisKemasanView}} {...field} options={jenisKemasan()} onChange={(e) => setValueMP("jenisKemasan", e.value) & setValueMP("jenisKemasanView", e.label)} />
                                                                    )}
                                                                /> 
                                                                {/* <select name="jenisKemasan" id="jenisKemasan" onClick={handleKemasan} {...registerMP("jenisKemasan")} className="form-select form-select-sm">
                                                                    <option value="">--</option>
                                                                    {dataSelect.jenisKemasan}
                                                                </select> */}
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="jumlahKemasan">Jumlah Kemasan</label>
                                                            <div className="col-sm-6">
                                                                <input autoComplete="off" type="text" id="jumlahKemasan" name="jumlahKemasan" {...registerMP("jumlahKemasan")} value={cekdataMP.jumlahKemasan ? removeNonNumeric(cekdataMP.jumlahKemasan) : ""} className="form-control form-control-sm" placeholder="Jumlah Kemasan" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="merkKemasan">Merk Kemasan</label>
                                                            <div className="col-sm-6">
                                                                <input autoComplete="off" type="text" id="merkKemasan" name="merkKemasan" {...registerMP("merkKemasan")} className="form-control form-control-sm" placeholder="Merk Kemasan" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="tandaKemasan">Tanda pada Kemasan</label>
                                                            <div className="col-sm-6">
                                                                <input autoComplete="off" type="text" id="tandaKemasan" name="tandaKemasan" {...registerMP("tandaKemasan")} className="form-control form-control-sm" placeholder="Tanda Kemasan" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="infoTambahan">Informasi Tambahan</label>
                                                            <div className="col-sm-9">
                                                                <textarea className='form-control' name="infoTambahan" id="infoTambahan" rows="2" {...registerMP("infoTambahan")}></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Detil Media Pembawa</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="card-body pt-0">
                                                        <div className="row g-3 mb-3">
                                                            <div className="col-md-12">
                                                                <button type="button" className="btn btn-xs btn-primary" data-bs-toggle={cekdataDiri.jenisMp ? "modal" : ""} data-bs-target={cekdataDiri.jenisMp ? "#modKomoditas" : ""} onClick={() => cekdataDiri.jenisMp ? resetFormKomoditi() : Swal.fire({icon: "error", title: "Mohon Pilih Jenis Media Pembawa!", showConfirmButton: true})}>Tambah Komoditas</button>
                                                                <button type="button" className="btn btn-xs btn-info float-end"  onClick={dataKomoditiPtk}><i className="menu-icon tf-icons fa-solid fa-sync"></i> Refresh Data</button>
                                                            </div>
                                                            <div className="table-responsive text-nowrap" style={{height: (komoditiPtk?.length > 8 ? "300px" : "")}}>
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
                                                                            <th>Bruto</th>
                                                                            <th>Satuan</th>
                                                                            <th>Jumlah</th>
                                                                            <th>Satuan</th>
                                                                            <th>Jantan</th>
                                                                            <th>Betina</th>
                                                                            <th>Harga</th>
                                                                            <th>Mata Uang</th>
                                                                            <th>Act</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {komoditiPtk ? (komoditiPtk?.map((data, index) => (
                                                                                    <tr key={index}>
                                                                                        <td>{index + 1}</td>
                                                                                        <td>{data.kode_hs}</td>
                                                                                        <td>{data.klasifikasi}</td>
                                                                                        <td>{data.nama_umum_tercetak}</td>
                                                                                        <td>{data.nama_latin_tercetak}</td>
                                                                                        <td className='text-end'>{data.volume_netto?.toLocaleString()}</td>
                                                                                        <td>{data.sat_netto}</td>
                                                                                        <td className='text-end'>{data.volume_bruto?.toLocaleString()}</td>
                                                                                        <td>{data.sat_bruto}</td>
                                                                                        <td className='text-end'>{data.volume_lain?.toLocaleString()}</td>
                                                                                        <td>{data.sat_lain}</td>
                                                                                        <td className='text-end'>{data.jantan?.toLocaleString()}</td>
                                                                                        <td className='text-end'>{data.betina?.toLocaleString()}</td>
                                                                                        <td className='text-end'>{data.harga?.toLocaleString()}</td>
                                                                                        <td>{data.mata_uang}</td>
                                                                                        <td>
                                                                                            <div className="d-grid gap-2">
                                                                                                <button type="button" className="btn p-0 hide-arrow dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown">
                                                                                                    <i className="menu-icon tf-icons fa-solid fa-ellipsis-vertical"></i>
                                                                                                </button>
                                                                                                <div className="dropdown-menu">
                                                                                                    <button className="dropdown-item" type="button" data-ptk={data.ptk_id} data-kemasan={data.jumlah_kemasan} data-kemasansat={data.kemasan_id} data-satuanlain={data.satuan_lain_id} data-kom={data.komoditas_id} data-klas={data.klasifikasi_id} data-header={data.id} data-ket={data.keterangan} onClick={handleEditKomoditas} data-bs-toggle="modal" data-bs-target="#modKomoditas"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</button>
                                                                                                    <button className="dropdown-item" type='button'><i className="fa-solid fa-trash me-1"></i> Delete</button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))
                                                                            ) : null
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="row mb-3 mt-3">
                                                                <label className="offset-sm-6 col-sm-2 col-form-label" htmlFor="nilaiBarang">Total Nilai Barang</label>
                                                                <div className="col-sm-4">
                                                                    <div className='row'>
                                                                        <div className="col-md-8" style={{paddingRight: '2px'}}>
                                                                            <input autoComplete="off" type="text" className='form-control form-control-sm' value={cekdataMP.nilaiBarang ? addCommas(removeNonNumeric(cekdataMP.nilaiBarang)) : ""} {...registerMP("nilaiBarang")} name='nilaiBarang' id='nilaiBarang' readOnly />
                                                                        </div>
                                                                        <div className="col-md-4" style={{paddingLeft: '2px'}}>
                                                                            <input type="hidden" id='satuanNilai' name='satuanNilai' value={"IDR"} {...registerMP("satuanNilai")}/>
                                                                            <input type="text" className='form-control form-control-sm' name='satuanNilaiView' id='satuanNilaiView' disabled value="IDR - Rupiah"/>
                                                                            {/* <select name="satuanNilai" id="satuanNilai" value={cekdataMP.satuanNilai || "IDR"} className='form-select form-select-sm' {...registerMP("satuanNilai")}>
                                                                                <option value="">--</option>
                                                                                {dataSelect.satuanNilai}
                                                                            </select> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <small>*Format penulisan desimal menggunakan titik ( . )</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex justify-content-between">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                        <i className="fa-solid fa-chevron-left me-sm-2 me-1"></i>
                                        <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                    </button>
                                    {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                                        <button type="submit" className="btn btn-primary">
                                            <span className="d-sm-inline-block d-none me-sm-1">Simpan & Lanjutkan</span>
                                            <i className="fa-solid fa-angle-right me-sm-2 me-1"></i>
                                        </button>
                                    }
                                </div>
                                </div>
                            </form>
                        </div>

                        <div id="cardDokumen" className={wizardPage == 4 ? "content active dstepper-block" : "content"}>
                            <div className="row mb-3">
                                <form onSubmit={handleFormDokPeriksa(onSubmitDokPeriksa)}>
                                    <input autoComplete="off" type="hidden" name='idPtk' {...registerDokPeriksa("idPtk")} />
                                    <input autoComplete="off" type="hidden" name='noAju' {...registerDokPeriksa("noAju")} />
                                    <div className="col-sm-12">
                                        <div className="card card-action mb-4">
                                            <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                                <div className="card-action-title">
                                                    <h5 className="mb-0 text-lightest">Detil Dokumen</h5>
                                                </div>
                                                <div className="card-action-element">
                                                    <ul className="list-inline mb-0">
                                                        <li className="list-inline-item">
                                                            <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="collapse show">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="card-body pt-0">
                                                            <div className="row g-3 mb-3">
                                                                <div className="col-md-12">
                                                                    <button type="button" className="btn btn-xs btn-primary" data-bs-toggle={cekdataDiri.mediaPembawa ? "modal" : ""} data-bs-target={cekdataDiri.mediaPembawa ? "#modDokumen" : ""} onClick={cekdataDiri.mediaPembawa ? null : () => {Swal.fire({icon: "error", title: "Mohon pilih media pembawa terlebih dahulu!", showConfirmButton: true})}}>Tambah Dokumen</button>
                                                                    <button type="button" className="btn btn-xs btn-info float-end"  onClick={dataDokumenPtk}><i className="menu-icon tf-icons fa-solid fa-sync"></i> Refresh Data</button>
                                                                </div>
                                                                <div className="table-responsive text-nowrap" style={{height: (dokumenPtk?.length > 8 ? "300px" : "")}}>
                                                                    <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>No</th>
                                                                                <th>Jenis Dokumen</th>
                                                                                <th>No Dokumen</th>
                                                                                <th>Tgl Dokumen</th>
                                                                                <th>Asal Penerbit</th>
                                                                                <th>Keterangan</th>
                                                                                <th>File</th>
                                                                                <th>Act</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {dokumenPtk ? (dokumenPtk?.map((data, index) => (
                                                                                    <tr key={index}>
                                                                                        <td>{index + 1}</td>
                                                                                        <td>{data.nama_dokumen}</td>
                                                                                        <td>{data.no_dokumen}</td>
                                                                                        <td>{moment(data.tanggal_dokumen).format('YYYY-MM-DD')}</td>
                                                                                        <td>{data.negara}</td>
                                                                                        <td>{data.keterangan}</td>
                                                                                        <td><a href={import.meta.env.VITE_BE_LINK + data.efile} target='_blank' rel='noreferrer'>[LIHAT FILE]</a></td>
                                                                                        <td>
                                                                                            <div className="d-grid gap-2">
                                                                                                <button type="button" className="btn p-0 hide-arrow dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown">
                                                                                                    <i className="menu-icon tf-icons fa-solid fa-ellipsis-vertical"></i>
                                                                                                </button>
                                                                                                <div className="dropdown-menu">
                                                                                                    <button className="dropdown-item" type="button" data-header={data.id} onClick={handleEditDokumen} data-bs-toggle="modal" data-bs-target="#modDokumen"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</button>
                                                                                                    <button className="dropdown-item" type='button'><i className="fa-solid fa-trash me-1"></i> Delete</button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                ))
                                                                            ) : null }
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card card-action mb-4">
                                            <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                                <div className="card-action-title">
                                                    <h5 className="mb-0 text-lightest">Tempat Pemeriksaan Tindakan Karantina</h5>
                                                </div>
                                                <div className="card-action-element">
                                                    <ul className="list-inline mb-0">
                                                        <li className="list-inline-item">
                                                            <button type='button' className="btn btn-default card-collapsible text-lighter p-0"><i className="tf-icons fa-solid fa-chevron-up"></i></button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="collapse show">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="card-body pt-0">
                                                            <div className="row g-3 mb-3">
                                                                <div className="col-sm-12">
                                                                    <div className="row">
                                                                        <label className="col-sm-2 col-form-label" htmlFor="tempatPeriksaPtk">Tempat Pemeriksaan</label>
                                                                        <div className="col-sm-4">
                                                                            <select name="tempatPeriksaPtk" id="tempatPeriksaPtk" {...registerDokPeriksa("tempatPeriksaPtk")} className="form-control form-control-sm">
                                                                                <option value="">--</option>
                                                                                <option value="IK">Instalasi Karantina</option>
                                                                                <option value="TL">Tempat Lain</option>
                                                                                <option value="DL">Depo / Lainnya</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="row">
                                                                        <label className="col-sm-4 col-form-label" htmlFor="namaTempatPeriksaPtk">Nama Tempat</label>
                                                                        <div className="col-sm-8">
                                                                        <input autoComplete="off" type="text" name='namaTempatPeriksaPtk' id='namaTempatPeriksaPtk' {...registerDokPeriksa("namaTempatPeriksaPtk")} className='form-control form-control-sm' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div className="row">
                                                                        <label className="col-sm-4 col-form-label" htmlFor="alamatTempatPeriksaPtk">Alamat Tempat</label>
                                                                        <div className="col-sm-8">
                                                                        <input autoComplete="off" type="text" name='alamatTempatPeriksaPtk' id='alamatTempatPeriksaPtk' {...registerDokPeriksa("alamatTempatPeriksaPtk")} className='form-control form-control-sm' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-between">
                                        <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                            <i className="fa-solid fa-chevron-left me-sm-2 me-1"></i>
                                            <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                        </button>
                                        {onLoad ? <LoadBtn warna="btn-primary" ukuran="" /> :
                                            <button type="submit" className="btn btn-primary">
                                                <span className="d-sm-inline-block d-none me-sm-1">Konfirmasi</span>
                                                <i className="fa-solid fa-angle-right me-sm-2 me-1"></i>
                                            </button>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div id="cardKonfirmasi" className={wizardPage == 5 ? "content active dstepper-block" : "content"}>
                            <div className="row mb-3">
                                <form onSubmit={handleFormKonfirmasi(onSubmitKonfirmasi)}>
                                    <input autoComplete="off" type="hidden" name='idPtk' {...registerKonfirmasi("idPtk")} />
                                    <input autoComplete="off" type="hidden" name='noAju' {...registerKonfirmasi("noAju")} />
                                    <div className="col-md-12" style={{display: (cekdataDiri.permohonan == "EX" ? "block" : "none")}}>
                                        <div className="form-check form-switch mb-2">
                                            <input autoComplete="off" className="form-check-input" type="checkbox" id="isDraft" name='isDraft' {...registerKonfirmasi("isDraft")} />
                                            <label className="form-check-label" htmlFor="isDraft">Aktifkan fasilitas Draft {cekdataDiri.mediaPembawa == "T" ? "PC" : "HC"}</label>
                                        </div>
                                        <hr />                                        
                                    </div>
                                    <div className="col-md-12 col-lg-8 offset-lg-2 text-center mb-3">
                                        <h4 className="mt-2">Terimakasih! 😇</h4>
                                        <p>Silahkan cek kembali kelengkapan data yang diinput!</p>
                                        <p>
                                            Silahkan klik tombol "Simpan & Kirim" jika data yang diinput sudah benar.
                                        </p>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-between">
                                        <button type="button" className="btn btn-primary btn-prev" onClick={() => setWizardPage(wizardPage - 1)}>
                                            <i className="fa-solid fa-chevron-left me-sm-2 me-1"></i>
                                            <span className="d-sm-inline-block d-none">Cek Kembali</span>
                                        </button>
                                        {onLoad ? <LoadBtn warna="btn-success" ukuran="" /> :
                                            <button type="submit" className="btn btn-success ms-sm-n2">
                                                <i className="fa-solid fa-save me-sm-2 me-1"></i>
                                                <span className="d-sm-inline-block d-none me-sm-1">Simpan & Kirim</span>
                                            </button>
                                        }
                                    </div>
                                </form>
                            </div>
                            <hr />
                            <div className="card" style={{display: (ptkLengkap ? "block" : "none")}}>
                                <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                    <div className="card-action-title">
                                        <h5 className="mb-0 text-lightest">Verifikasi PTK</h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleFormVerify(onSubmitVerify)}>
                                        <input autoComplete="off" type="hidden" name="idPtk" {...registerVerify("idPtk")} />
                                        <input autoComplete="off" type="hidden" name="noAju" {...registerVerify("noAju")} />
                                        <input autoComplete="off" type="hidden" name="noDokumen" {...registerVerify("noDokumen")} />
                                        <input autoComplete="off" type="hidden" name="mediaPembawaVerif" {...registerVerify("mediaPembawaVerif")} />
                                        <div className="col-sm-6">
                                            <div className="form-check form-check-inline">
                                                <input autoComplete="off" className="form-check-input" type="radio" name="opsiVerif" id="opsiVerif1" value="1" onClick={() => setValueVerify("alasanTolak", "") & setValueVerify("tglTerimaVerif", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))} {...registerVerify("opsiVerif", { required: "Mohon pilih verifikasi."})} />
                                                <label className="form-check-label" htmlFor="opsiVerif1">Setujui PTK</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input autoComplete="off" className="form-check-input" type="radio" name="opsiVerif" id="opsiVerif2" value="2" onClick={() => setValueVerify("tglTerimaVerif", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16)) & setValueVerify("petugasVerif", "")} {...registerVerify("opsiVerif")}/>
                                                <label className="form-check-label" htmlFor="opsiVerif2">Tolak PTK</label>
                                            </div>
                                            {errorsVerify.opsiVerif && <small className="text-danger">{errorsVerify.opsiVerif.message}</small>}
                                        </div>
                                        <br />
                                        <div className="col-sm-4" style={{display: (cekdataVerify.opsiVerif == '2' ? 'block' : 'none')}}>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="basic-default-fullname">Alasan Tolak</label>
                                                <textarea name="alasanTolak" id="alasanTolak" rows="2" {...registerVerify("alasanTolak", { required: (cekdataVerify.opsiVerif == '2' ? "Mohon isi alasan tolak." : false)})} className={errorsVerify.alasanTolak ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}></textarea>
                                            </div>
                                            {errorsVerify.alasanTolak && <small className="text-danger">{errorsVerify.alasanTolak.message}</small>}
                                        </div>
                                        <div className="col-sm-6" style={{display: (cekdataVerify.opsiVerif == '1' ? 'block' : 'none')}}>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="basic-default-fullname"><b><u>Tanda Terima Laporan PTK</u></b></label>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tglTerimaVerif">Tgl Terima</label>
                                                    <div className="col-sm-4">
                                                        <input autoComplete="off" type="datetime-local" id="tglTerimaVerif" name="tglTerimaVerif" {...registerVerify("tglTerimaVerif", { required: (cekdataVerify.opsiVerif == '1' ? "Mohon tanggal terima." : false)})} className={errorsVerify.tglTerimaVerif ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                        {errorsVerify.tglTerimaVerif && <small className="text-danger">{errorsVerify.tglTerimaVerif.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="petugasVerif">Petugas Penerima</label>
                                                    <div className="col-sm-7">
                                                    <Controller
                                                        control={controlVerify}
                                                        name={"petugasVerif"}
                                                        defaultValue={""}
                                                        className="form-control form-control-sm"
                                                        rules={{ required: (cekdataVerify.opsiVerif == '1' ? "Mohon pilih petugas." : false) }}
                                                        render={({ field: { value,onChange, ...field } }) => (
                                                            <Select styles={customStyles} placeholder={"Pilih petugas penerima.."} value={{id: cekdataVerify.petugasVerif, label: cekdataVerify.petugasVerifView}} {...field} options={masterPegawai()} onChange={(e) => setValueVerify("petugasVerif", e.value) & setValueVerify("petugasVerifView", e.label)} />
                                                        )}
                                                    />
                                                        {/* <input autoComplete="off" type="text" id="petugasVerif" name="petugasVerif" {...registerVerify("petugasVerif", { required: (cekdataVerify.opsiVerif == '1' ? "Mohon isi nama petugas verifikasi." : false)})} className={errorsVerify.petugasVerif ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} /> */}
                                                        {errorsVerify.petugasVerif && <small className="text-danger">{errorsVerify.petugasVerif.message}</small>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-sm-2'>
                                                <button className='btn btn-dark' disabled={dataIdPage.noPermohonan == '' ? false : true} type='submit'>Verifikasi PTK</button>
                                            </div>
                                            <div className='col-sm-2'>
                                                <a className='btn btn-warning pb-1' href={import("../../dok/k11.pdf")} rel="noopener noreferrer" target='_blank'>
                                                    <i className="fa-solid fa-printer fa-sm"></i>
                                                    print
                                                </a>
                                            </div>
                                            <div className='col-sm-8'>
                                                <button type='button' onClick={() => navigate('/k21')} className="btn btn-info pb-1 float-end">
                                                    <span className="d-sm-inline-block d-none me-sm-1">Form Analisa</span>
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
            </div>
        </div>
        <div className="modal fade" id="modKontainer" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-1">
                    <div className="modal-body">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div className="text-center mb-4">
                        <h3>Tambah Kontainer Baru</h3>
                        {/* <p>{editKontainer}</p> */}
                    </div>
                    <form className="row" onSubmit={handleFormKontainer(onSubmitKontainer)}>
                            <input autoComplete="off" type="hidden" name='idDataKontainer' {...registerKontainer("idDataKontainer")} />
                            <input autoComplete="off" type="hidden" name='idPtk' {...registerKontainer("idPtk")} />
                        <div className="col-md-6">
                        <label className="form-label" htmlFor="noKontainer">No Kontainer <span className='text-danger'>*</span></label>
                        <div className="input-group input-group-merge">
                            <input
                            id="noKontainer"
                            name="noKontainer"
                            type="text"
                            placeholder="AAAA9999999"
                            {...registerKontainer("noKontainer", { required: "Mohon isi nomor kontainer."})} className={errorsKontainer.noKontainer ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
                            />
                        </div>
                        {errorsKontainer.noKontainer && <small className="text-danger">{errorsKontainer.noKontainer.message}</small>}
                        </div>
                        <div className="col-md-6 col-md-6">
                        <label className="form-label" htmlFor="tipeKontainer">Tipe Kontainer <span className='text-danger'>*</span></label>
                        <div className="input-group input-group-merge">
                            <select name="tipeKontainer" id="tipeKontainer" {...registerKontainer("tipeKontainer", { required: "Mohon pilih tipe kontainer."})} className={errorsKontainer.tipeKontainer ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                <option value="">--</option>
                                <option value="1">General/Dry cargo</option>
                                <option value="2">Tunnel type</option>
                                <option value="3">Open Top Steel</option>
                                <option value="4">Flat Rack</option>
                                <option value="5">Reefer / Refrigerate</option>
                                <option value="6">Barge Container</option>
                                <option value="7">Bulk Container</option>
                            </select>
                        </div>
                        {errorsKontainer.tipeKontainer && <small className="text-danger">{errorsKontainer.tipeKontainer.message}</small>}
                        </div>
                        <div className="col-md-6 col-md-6">
                        <label className="form-label" htmlFor="ukuranKontainer">Ukuran Kontainer <span className='text-danger'>*</span></label>
                        <div className="input-group input-group-merge">
                            <select name="ukuranKontainer" id="ukuranKontainer" {...registerKontainer("ukuranKontainer", { required: "Mohon pilih ukuran kontainer."})} className={errorsKontainer.ukuranKontainer ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                <option value="">--</option>
                                <option value="1">20 feet</option>
                                <option value="2">40 feet</option>
                                <option value="3">42 feet</option>
                                <option value="4">43 feet</option>
                                <option value="5">45 feet</option>
                                <option value="6">50 feet</option>
                                <option value="7">Lainnya</option>
                            </select>
                        </div>
                        {errorsKontainer.ukuranKontainer && <small className="text-danger">{errorsKontainer.ukuranKontainer.message}</small>}
                        </div>
                        <div className="col-md-6 col-md-6">
                        <label className="form-label" htmlFor="stuffKontainer">Stuff Kontainer</label>
                        <div className="input-group input-group-merge">
                            <select name="stuffKontainer" id="stuffKontainer" {...registerKontainer("stuffKontainer")} className="form-control form-control-sm">
                                <option value="">--</option>
                                <option value="1">FCL</option>
                                <option value="2">LCL</option>
                            </select>
                        </div>
                        </div>
                        <div className="col-md-6 col-md-6">
                        <label className="form-label" htmlFor="segel">Segel</label>
                        <div className="input-group input-group-merge">
                            <input autoComplete="off" type="text" className="form-control form-control-sm" name="segel" id="segel" {...registerKontainer("segel")}/>
                        </div>
                        </div>
                        <div className="col-md-6 text-center mt-4">
                        {onLoad ? <LoadBtn warna="btn-success" ukuran="btn-sm" /> :
                            <button type="submit" className="btn btn-sm btn-primary me-sm-3 me-1">{cekDataKontainer.idDataKontainer ? "Edit" : "Tambah"}</button>
                        }
                        <button
                            type="reset"
                            className="btn btn-sm btn-label-secondary btn-reset"
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
        <div className="modal fade" id="modDokumen" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered1 modal-simple">
                <div className="modal-content p-1">
                    <div className="modal-body">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div className="text-center mb-4">
                        <h3>{cekdataDokumen.idDataDokumen == '' ? "Tambah Dokumen Baru" : "Edit Dokumen"}</h3>
                    </div>
                    <form className="row" onSubmit={handleFormDokumen(onSubmitDokumen)}>
                        <input autoComplete="off" type="hidden" name='idDataDokumen' {...registerDokumen("idDataDokumen")} />
                        <input autoComplete="off" type="hidden" name='idPtk' {...registerDokumen("idPtk")} />
                        <input autoComplete="off" type="hidden" name='noAju' {...registerDokumen("noAju")} />
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="kategoriDokumen">Kategori Dokumen <span className='text-danger'>*</span></label>
                            <div className="input-group input-group-merge">
                                <select name="kategoriDokumen" id="kategoriDokumen"{...registerDokumen("kategoriDokumen", { required: "Mohon pilih kategori dokumen."})} className={errorsDokumen.kategoriDokumen ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                    <option value="">--</option>
                                    <option value="S">Dokumen Persyaratan</option>
                                    <option value="P">Dokumen Pendukung</option>
                                </select>
                            </div>
                            {errorsDokumen.kategoriDokumen && <small className="text-danger">{errorsDokumen.kategoriDokumen.message}</small>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="jenisDokumen">Jenis Dokumen <span className='text-danger'>*</span></label>
                            <Controller
                                control={controlDokumen}
                                name={"jenisDokumen"}
                                defaultValue={""}
                                className="form-control form-control-sm"
                                rules={{ required: "Mohon pilih jenis dokumen." }}
                                render={({ field: { value,onChange, ...field } }) => (
                                    <Select styles={customStyles} placeholder={"Pilih jenis dokumen.."} value={{id: cekdataDokumen.jenisDokumen, label: cekdataDokumen.jenisDokumenView}} {...field} options={handleJenisDokumen(cekdataDiri.mediaPembawa)} onChange={(e) => setValueDokumen("jenisDokumen", e.value) & setValueDokumen("jenisDokumenView", e.label)} />
                                )}
                            />
                            {errorsDokumen.jenisDokumen && <small className="text-danger">{errorsDokumen.jenisDokumen.message}</small>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="noDokumen">No Dokumen <span className='text-danger'>*</span></label>
                            <div className="input-group input-group-merge">
                                <input autoComplete="off" type='text' name="noDokumen" id="noDokumen" placeholder='No Dokumen..' {...registerDokumen("noDokumen", { required: "Mohon isi nomor dokumen."})} className={errorsDokumen.noDokumen ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                            </div>
                            <input autoComplete="off" type="hidden" name='cekPrior' id='cekPrior' {...registerDokumen("cekPrior")}/>
                            {errorsDokumen.noDokumen && <small className="text-danger">{errorsDokumen.noDokumen.message}</small>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="negaraAsalDokumen">Negara Penerbit <span className='text-danger'>*</span></label>
                            <Controller
                                control={controlDokumen}
                                name={"negaraAsalDokumen"}
                                defaultValue={""}
                                className="form-control form-control-sm"
                                rules={{ required: "Mohon pilih negara penerbit dokumen." }}
                                render={({ field: { value,onChange, ...field } }) => (
                                    <Select styles={customStyles} placeholder={"Pilih negara penerbit.."} value={{id: cekdataDokumen.negaraAsalDokumen, label: cekdataDokumen.negaraAsalDokumenView}} {...field} options={dataSelect.negaraAsalDokumen} onChange={(e) => setValueDokumen("negaraAsalDokumen", e.value) & setValueDokumen("negaraAsalDokumenView", e.label) & (e.value == 99 ? handleKota(null, "kotaAsalDokumen") : null)} />
                                )}
                            />
                            {errorsDokumen.negaraAsalDokumen && <small className="text-danger">{errorsDokumen.negaraAsalDokumen.message}</small>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="tglDokumen">Tgl Dokumen <span className='text-danger'>*</span></label>
                            <div className="input-group input-group-merge">
                                <input autoComplete="off" type='date' name="tglDokumen" id="tglDokumen" {...registerDokumen("tglDokumen", { required: "Mohon isi tanggal dokumen."})} className={errorsDokumen.tglDokumen ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                            </div>
                            {errorsDokumen.tglDokumen && <small className="text-danger">{errorsDokumen.tglDokumen.message}</small>}
                        </div>
                        <div className="col-md-6" style={{visibility: (cekdataDokumen.negaraAsalDokumen == 99 ? 'visible' : 'hidden')}}>
                            <label className="form-label" htmlFor="kotaAsalDokumen">Kota Penerbit</label>
                            <Controller
                                control={controlDokumen}
                                name={"kotaAsalDokumen"}
                                defaultValue={""}
                                className="form-control form-control-sm"
                                rules={{ required: false }}
                                render={({ field: { value,onChange, ...field } }) => (
                                    <Select styles={customStyles} placeholder={"Pilih kota penerbit.."} value={{id: cekdataDokumen.kotaAsalDokumen, label: cekdataDokumen.kotaAsalDokumenView}} {...field} options={dataSelect.kotaAsalDokumen} onChange={(e) => setValueDokumen("kotaAsalDokumen", e.value) & setValueDokumen("kotaAsalDokumenView", e.label)} />
                                )}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="ketDokumen">Keterangan</label>
                            <div className="input-group input-group-merge">
                                <input autoComplete="off" type='text' name="ketDokumen" id="ketDokumen" placeholder='Keterangan..' {...registerDokumen("ketDokumen")} className="form-control form-control-sm" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor="fileDokumen">Upload <span className='text-danger'>*</span></label>
                            <div className="input-group input-group-merge">
                                <input type="hidden" name='fileDokumen' {...registerDokumen("fileDokumen", {required: "Mohon upload dokumen persyaratan yang sesuai."})} />
                                <input type='file' name="fileDokumenUpload" id="fileDokumenUpload" accept="application/pdf" value={dataIdPage.fileDokumenUpload || ""} onChange={handleBase64Upload} className="form-control form-control-sm" />
                            </div>
                            <small className='text-danger'>File: *.pdf || Max: 2MB</small>
                            {errorsDokumen.fileDokumen && <small className="text-danger">{errorsDokumen.fileDokumen.message}</small>}
                        </div>
                        <div className="col-md-12 text-center mt-4">
                            <button style={{display: (cekdataDokumen.jenisDokumen == "104" ? "block" : "none")}} type='button' className='btn btn-sm btn-warning' onClick={() => cekPrior()}>Cek Prior</button>
                            {onLoad ? <LoadBtn warna="btn-primary" ukuran="btn-sm" /> : 
                            <button type="submit" disabled={(cekdataDokumen.jenisDokumen == "104" && cekdataDokumen.cekPrior == "" ? true : false)} className="btn btn-sm btn-primary me-sm-3 me-1 btn-page-block-spinner">{cekdataDokumen.idDataDokumen == '' ? "Tambah" : "Edit"}</button>
                            }
                            <button
                                type="reset"
                                className="btn btn-sm btn-label-secondary btn-reset me-sm-3 me-1"
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
        <div className="modal fade" id="modKomoditas" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-simple">
                <div className="modal-content p-3 pb-1">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="text-center mb-4">
                            <h3 className="address-title">{cekdataDetilMP.idDetilMP ? "Edit" : "Tambah"} Media Pembawa {cekdataDiri.mediaPembawa == 'H' ? 'Hewan' : (cekdataDiri.mediaPembawa == 'I' ? 'Ikan' : 'Tumbuhan')}</h3>
                        </div>
                        <form onSubmit={handleFormDetilMP(onSubmitDetilMP)} className="row g-3">
                        <input autoComplete="off" type="hidden" name='idDetilMP' {...registerDetilMP("idDetilMP")} />
                        <input autoComplete="off" type="hidden" name='idPtk' {...registerDetilMP("idPtk")} />
                        {cekdataDiri.mediaPembawa == 'T' ?
                        <>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="peruntukanMP">Klasifikasi<span className='text-warning'>*</span></label>
                                <Controller
                                    control={controlDetilMP}
                                    name={"peruntukanMP"}
                                    defaultValue={""}
                                    className="form-control form-control-sm"
                                    rules={{ required: (cekdataDiri.mediaPembawa == 'T' ? "Mohon pilih klasifikasi MP" : false) }}
                                    render={({ field: { value,onChange, ...field } }) => (
                                        <Select styles={customStyles} placeholder={"Pilih klasifikasi tumbuhan.."} value={{id: cekdataDetilMP.peruntukanMP, label: cekdataDetilMP.peruntukanMPView}} {...field} onChange={(e) => setValueDetilMP("peruntukanMP", e.value) & setValueDetilMP("peruntukanMPView", e.label)} options={dataSelect.peruntukanMP} />
                                    )}
                                />
                                {errorsDetilMP.peruntukanMP && <small className="text-danger">{errorsDetilMP.peruntukanMP.message}</small>}
                                <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah klasifikasi" : null}</small>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="volumeNetto">Volume Netto<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-md-5" style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="text" name='volumeNetto' id='volumeNetto' value={cekdataDetilMP.volumeNetto ? addCommas(removeNonNumeric(cekdataDetilMP.volumeNetto)) : ""} {...registerDetilMP("volumeNetto", {required: "Mohon isi volume netto."})} className={errorsDetilMP.volumeNetto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-md-7" style={{paddingLeft: '2px'}}>
                                        <input autoComplete="off" type="hidden" name='satuanNetto' id='satuanNetto' {...registerDetilMP("satuanNetto")} value="1356" />
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' value='KILOGRAM' readOnly />
                                        {/* <select name="satuanNetto" id="satuanNetto" onClick={handleMasterSatuan} data-kar={cekdataDiri.mediaPembawa == 'T' ? 'kt' : (cekdataDiri.mediaPembawa == 'H' ? 'kh' : 'ki')} {...registerDetilMP("satuanNetto", {required: "Mohon isi satuan netto."})} className={errorsKontainer.satuanNetto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                            <option value="">--</option>
                                            {dataSelect.satuanNetto}
                                        </select> */}
                                    </div>
                                </div>
                                {errorsDetilMP.volumeNetto && <small className="text-danger">{errorsDetilMP.volumeNetto.message}</small>}
                                {errorsDetilMP.satuanNetto && <small className="text-danger">{errorsDetilMP.satuanNetto.message}</small>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="komoditasMP">Komoditas<span className='text-danger'>*</span></label>
                                <input autoComplete="off" type="hidden" name="komoditasMP" id="komoditasMP" {...registerDetilMP("komoditasMP", {required: "Mohon isi Komoditas."})} />
                                <Controller
                                    control={controlDetilMP}
                                    name={"selectKomoditasMP"}
                                    defaultValue={""}
                                    className="form-control form-control-sm"
                                    rules={{ required: false }}
                                    render={({ field: { value,onChange, ...field } }) => (
                                        <Select styles={customStyles} placeholder={"Pilih komoditas.."} value={{id: cekdataDetilMP.selectKomoditasMP, label: cekdataDetilMP.selectKomoditasMPView}} onChange={(e) => setValueDetilMP("selectKomoditasMP", e.value) & setValueDetilMP("selectKomoditasMPView", e.label) & handleSetKomoditasSelect(e)} {...field} options={dataSelect.selectKomoditasMP} />
                                    )}
                                />
                                <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah komoditas" : null}</small>
                                {errorsDetilMP.komoditasMP && <small className="text-danger">{errorsDetilMP.komoditasMP.message}</small>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="volumeBrutto">Volume Brutto</label>
                                <div className='row'>
                                    <div className="col-md-5" style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="text" value={cekdataDetilMP.volumeBrutto ? addCommas(removeNonNumeric(cekdataDetilMP.volumeBrutto)) : ""} {...registerDetilMP("volumeBrutto", {required: "Mohon isi volume brutto."})} className={errorsDetilMP.volumeBrutto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name='volumeBrutto' id='volumeBrutto' />
                                    </div>
                                    <div className="col-md-7" style={{paddingLeft: '2px'}}>
                                        <input autoComplete="off" type="hidden" name='satuanBrutto' id='satuanBrutto' {...registerDetilMP("satuanBrutto")} value="1356" />
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' value='KILOGRAM' readOnly />
                                        {/* <select name="satuanBrutto" id="satuanBrutto" data-kar={cekdataDiri.mediaPembawa == 'T' ? 'kt' : (cekdataDiri.mediaPembawa == 'H' ? 'kh' : 'ki')} onClick={handleMasterSatuan} {...registerDetilMP("satuanBrutto", {required: "Mohon isi satuan brutto."})} className={errorsDetilMP.satuanBrutto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                            <option value="">--</option>
                                            {dataSelect.satuanBrutto}
                                        </select> */}
                                    </div>
                                </div>
                                {errorsDetilMP.volumeBrutto && <small className="text-danger">{errorsDetilMP.volumeBrutto.message}</small>}
                                {errorsDetilMP.satuanBrutto && <small className="text-danger">{errorsDetilMP.satuanBrutto.message}</small>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="kodeHSMp">Kode HS<span className='text-warning'>*</span></label>
                                <Controller
                                    control={controlDetilMP}
                                    name={"kodeHSMp"}
                                    defaultValue={""}
                                    className="form-control form-control-sm"
                                    rules={{ required: "Mohon pilih kode HS" }}
                                    render={({ field: { value,onChange, ...field } }) => (
                                        <Select styles={customStyles} placeholder={"Pilih kode HS.."} value={{id: cekdataDetilMP.kodeHSMp, label: cekdataDetilMP.kodeHSMpView}} onChange={(e) => setValueDetilMP("kodeHSMp", e.value) & setValueDetilMP("kodeHSMpView", e.label)} {...field} options={dataSelect.kodeHSMp} />
                                    )}
                                />
                                {errorsDetilMP.kodeHSMp && <small className="text-danger">{errorsDetilMP.kodeHSMp.message}</small>}
                                <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah kode HS" : null}</small>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="volumeLain">Volume Lain<span className='text-warning'>*</span></label>
                                <div className='row'>
                                    <div className="col-md-5" style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' name='volumeLain' id='volumeLain' value={cekdataDetilMP.volumeLain ? addCommas(removeNonNumeric(cekdataDetilMP.volumeLain)) : ""} {...registerDetilMP("volumeLain")} />
                                    </div>
                                    <div className="col-md-7" style={{paddingLeft: '2px'}}>
                                        <Controller
                                            control={controlDetilMP}
                                            name={"satuanLain"}
                                            defaultValue={""}
                                            className="form-control form-control-sm"
                                            rules={{ required: "Mohon isi satuan volume." }}
                                            render={({ field: { value,onChange, ...field } }) => (
                                                <Select styles={customStyles} placeholder={"Pilih Satuan.."} value={{id: cekdataDetilMP.satuanLain, label: cekdataDetilMP.satuanLainView}} onChange={(e) => setValueDetilMP("satuanLain", e.value) & setValueDetilMP("satuanLainView", e.label)} {...field} options={masterSatuanJson(cekdataDiri.mediaPembawa)} />
                                                )}
                                        />
                                        {errorsDetilMP.satuanLain && <small className="text-danger">{errorsDetilMP.satuanLain.message}</small>}
                                        {/* <select name="satuanLain" id="satuanLain" data-kar={cekdataDiri.mediaPembawa == 'T' ? 'kt' : (cekdataDiri.mediaPembawa == 'H' ? 'kh' : 'ki')} onClick={handleMasterSatuan} className='form-control form-control-sm' {...registerDetilMP("satuanLain")}>
                                            <option value="">--</option>
                                            {dataSelect.satuanLain}
                                        </select> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="namaUmum">Nama Umum Tercetak</label>
                                <input autoComplete="off" type='text' name="namaUmum" id="namaUmum" {...registerDetilMP("namaUmum")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="nilaiBarangMP">Nilai Barang<span className='text-warning'>*</span></label>
                                <div className='row'>
                                    <div className="col-md-7" style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' value={cekdataDetilMP.nilaiBarangMP ? addCommas(removeNonNumeric(cekdataDetilMP.nilaiBarangMP)) : ""} {...registerDetilMP("nilaiBarangMP", {required: "Mohon isi detil nilai barang"})} name='nilaiBarangMP' id='nilaiBarangMP' />
                                    </div>
                                    <input type="hidden" value="IDR" id='satuanNilaiMP' name='satuanNilaiMP' {...registerMP("satuanNilaiMP")}/>
                                    <input type="text" className='form-control form-control-sm' name='satuanNilaiMPView' id='satuanNilaiMPView' disabled value="IDR - Rupiah"/>
                                    {/* <div className="col-md-5" style={{paddingLeft: '2px'}}>
                                        <select name="satuanNilaiMP" id="satuanNilaiMP" value={cekdataDetilMP.satuanNilaiMP || "IDR"} className='form-control form-control-sm' {...registerDetilMP("satuanNilaiMP", {required: "Mohonn pilih mata uang"})}>
                                            <option value="">--</option>
                                            {dataSelect.satuanNilai}
                                        </select>
                                    </div> */}
                                    {errorsDetilMP.nilaiBarangMP && <small className="text-danger">{errorsDetilMP.nilaiBarangMP.message}</small>}
                                    {/* {errorsDetilMP.satuanNilaiMP && <small className="text-danger">{errorsDetilMP.satuanNilaiMP.message}</small>} */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="namaLatin">Nama Latin Tercetak</label>
                                <input autoComplete="off" type='text' name="namaLatin" id="namaLatin" {...registerDetilMP("namaLatin")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="jumlahKemasanDetil">Jumlah Kemasan</label>
                                <div className='row'>
                                    <div className='col-md-4' style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="number" className='form-control form-control-sm' {...registerDetilMP("jumlahKemasanDetil")} name='jumlahKemasanDetil' id='jumlahKemasanDetil' />
                                    </div>
                                    <div className='col-md-8' style={{paddingLeft: '2px'}}>
                                        <Controller
                                            control={controlDetilMP}
                                            defaultValue={""}
                                            name={"satuanKemasanDetil"}
                                            className="form-select form-select-sm"
                                            rules={{ required: false }}
                                            render={({ field: { value, onChange, ...field } }) => (
                                                <Select styles={customStyles} placeholder={"Pilih Kemasan.."} value={{id: cekdataDetilMP.satuanKemasanDetil, label: cekdataDetilMP.satuanKemasanDetilView}} {...field} options={jenisKemasan()} onChange={(e) => setValueDetilMP("satuanKemasanDetil", e.value) & setValueDetilMP("satuanKemasanDetilView", e.label)} />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </> : (cekdataDiri.mediaPembawa == 'H' ?
                        <>
                            <div className='col-md-12'>
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="peruntukanMP">Klasifikasi<span className='text-warning'>*</span></label>
                                    <Controller
                                        control={controlDetilMP}
                                        name={"peruntukanMPKH"}
                                        defaultValue={""}
                                        className="form-control form-control-sm"
                                        rules={{ required: "Mohon pilih klasifikasi MP" }}
                                        render={({ field: { value,onChange, ...field } }) => (
                                            <Select styles={customStyles} placeholder={"Pilih klasifikasi Hewan.."} value={{id: cekdataDetilMP.peruntukanMPKH, label: cekdataDetilMP.peruntukanMPKHView}} {...field} onChange={(e) => setValueDetilMP("peruntukanMPKH", e.value) & setValueDetilMP("peruntukanMPKHView", e.label)} options={dataSelect.peruntukanMPKH} />
                                        )}
                                    />
                                    {errorsDetilMP.peruntukanMPKH && <small className="text-danger">{errorsDetilMP.peruntukanMPKH.message}</small>}
                                    <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah klasifikasi" : null}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="komoditasMPKH">Komoditas<span className='text-danger'>*</span></label>
                                <input autoComplete="off" type="hidden" name='komoditasMPKHid' {...registerDetilMP("komoditasMPKHid")} />
                                {/* <input autoComplete="off" type="hidden" name='klasifikasiMPKHid' {...registerDetilMP("klasifikasiMPKHid")} /> */}
                                <Controller
                                    control={controlDetilMP}
                                    name={"komoditasMPKH"}
                                    defaultValue={""}
                                    className="form-control form-control-sm"
                                    rules={{ required: false }}
                                    render={({ field: { value,onChange, ...field } }) => (
                                        <Select placeholder= 'Pilih Komoditas..' styles={customStyles}
                                         value={{id: cekdataDetilMP.komoditasMPKH, label: cekdataDetilMP.komoditasMPKHView}} onChange={(e) => setValueDetilMP("komoditasMPKH", e.value) & setValueDetilMP("komoditasMPKHView", e.label) & handleSetKomoditasSelect(e)} {...field} options={dataSelect.selectKomoditasMPKH} />
                                    )}
                                />
                                <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah komoditas" : null}</small>
                                {errorsDetilMP.komoditasMPKH && <small className="text-danger">{errorsDetilMP.komoditasMPKH.message}</small>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="kodeHSMpKH">Kode HS<span className='text-warning'>*</span></label>
                                <Controller
                                    control={controlDetilMP}
                                    name={"kodeHSMpKH"}
                                    defaultValue={""}
                                    className="form-control form-control-sm"
                                    rules={{ required: false }}
                                    render={({ field: { value,onChange, ...field } }) => (
                                        <Select styles={customStyles} placeholder={"Pilih kode HS.."} value={{id: cekdataDetilMP.kodeHSMpKH, label: cekdataDetilMP.kodeHSMpKHView}} onChange={(e) => setValueDetilMP("kodeHSMpKH", e.value) & setValueDetilMP("kodeHSMpKHView", e.label)} {...field} options={dataSelect.kodeHSMp} />
                                    )}
                                />
                                {errorsDetilMP.kodeHSMpKH && <small className="text-danger">{errorsDetilMP.kodeHSMpKH.message}</small>}
                                <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah kode HS" : null}</small>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="namaUmumKH">Nama Umum Tercetak</label>
                                <input autoComplete="off" type='text' name="namaUmumKH" id="namaUmumKH" {...registerDetilMP("namaUmumKH")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="namaLatinKH">Nama Latin Tercetak</label>
                                <input autoComplete="off" type='text' name="namaLatinKH" id="namaLatinKH" {...registerDetilMP("namaLatinKH")} className="form-control form-control-sm" />
                            </div>
                           <div className="col-md-6">
                                <label className="form-label" htmlFor="jumlahMP">Jumlah<span className='text-warning'>*</span></label>
                                <div className='row'>
                                    <div className='col-md-7' style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="text" value={cekdataDetilMP.jumlahMP ? addCommas(removeNonNumeric(cekdataDetilMP.jumlahMP)) : ""} {...registerDetilMP("jumlahMP", {required: "Mohon isi jumlah."})} className={errorsDetilMP.jumlahMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name='jumlahMP' id='jumlahMP' />
                                    </div>
                                    <div className='col-md-5' style={{paddingLeft: '2px'}}>
                                        <Controller
                                            control={controlDetilMP}
                                            name={"satJumlahMP"}
                                            defaultValue={""}
                                            className="form-control form-control-sm"
                                            rules={{ required: "Mohon isi satuan volume." }}
                                            render={({ field: { value,onChange, ...field } }) => (
                                                <Select styles={customStyles} placeholder={"Pilih Satuan.."} value={{id: cekdataDetilMP.satJumlahMP, label: cekdataDetilMP.satJumlahMPView}} onChange={(e) => setValueDetilMP("satJumlahMP", e.value) & setValueDetilMP("satJumlahMPView", e.label)} {...field} options={masterSatuanJson(cekdataDiri.mediaPembawa)} />
                                            )}
                                        />
                                        {errorsDetilMP.jumlahMP && <small className="text-danger">{errorsDetilMP.jumlahMP.message}</small>}
                                        {errorsDetilMP.satJumlahMP && <small className="text-danger">{errorsDetilMP.satJumlahMP.message}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6" style={{visibility: (cekdataDiri.jenisMp == '1' ? "visible" : "hidden")}}>
                                <label className="form-label" htmlFor="breedMP">Breed</label>
                                <input autoComplete="off" type='text' name="breedMP" id="breedMP" {...registerDetilMP("breedMP")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="nettoMP">Netto<span className='text-warning'>*</span></label>
                                <div className='row'>
                                    <div className='col-md-7' style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' value={cekdataDetilMP.nettoMP ? addCommas(removeNonNumeric(cekdataDetilMP.nettoMP)) : ""} {...registerDetilMP("nettoMP", {required: "Mohon isi berat netto"})} name='nettoMP' id='nettoMP' />
                                    </div>
                                    {/* ekor: 1122 || KG: 1356  */}
                                    <div className='col-md-5' style={{paddingLeft: '2px'}}>
                                        {/* <input autoComplete="off" type="hidden" name='satNettoMP' id='satNettoMP' {...registerDetilMP("satNettoMP")} value={cekdataDiri.jenisMp == '1' || cekdataDiri.jenisMp == '6' ? '1122' : '1356'} />
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' value={cekdataDiri.jenisMp == '1' || cekdataDiri.jenisMp == '6' ? 'EKOR' : 'KILOGRAM'} readOnly /> */}
                                        <input autoComplete="off" type="hidden" name='satNettoMP' id='satNettoMP' {...registerDetilMP("satNettoMP")} value="1356" />
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' value='KILOGRAM' readOnly />
                                    </div>
                                    {errorsDetilMP.nettoMP && <small className="text-danger">{errorsDetilMP.nettoMP.message}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="nilaiBarangMPKH">Nilai Barang</label>
                                <div className='row'>
                                    <div className="col-md-7" style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' value={cekdataDetilMP.nilaiBarangMPKH ? addCommas(removeNonNumeric(cekdataDetilMP.nilaiBarangMPKH)) : ""} name='nilaiBarangMPKH' id='nilaiBarangMPKH' {...registerDetilMP("nilaiBarangMPKH", {required: "Mohon isi nilai barang"})} />
                                    </div>
                                    <div className="col-md-5" style={{paddingLeft: '2px'}}>
                                        <input type="hidden" value="IDR" id='satuanNilaiMPKH' name='satuanNilaiMPKH' {...registerMP("satuanNilaiMPKH")}/>
                                        <input type="text" className='form-control form-control-sm' name='satuanNilaiMPKHView' id='satuanNilaiMPKHView' disabled value="IDR - Rupiah"/>
                                        {/* <select name="satuanNilaiMPKH" id="satuanNilaiMPKH" value={cekdataDetilMP.satuanNilaiMPKH || "IDR"} {...registerDetilMP("satuanNilaiMPKH", {required: "Mohon isi mata uang"})} className='form-control form-control-sm'>
                                        <option value="">--</option>
                                            {dataSelect.satuanNilai}
                                        </select> */}
                                    </div>
                                    {errorsDetilMP.nilaiBarangMPKH && <small className="text-danger">{errorsDetilMP.nilaiBarangMPKH.message}</small>}
                                    {/* {errorsDetilMP.satuanNilaiMPKH && <small className="text-danger">{errorsDetilMP.satuanNilaiMPKH.message}</small>} */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="brutoMP">Bruto<span className='text-warning'>*</span></label>
                                <div className='row'>
                                    <div className='col-md-7' style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="text" value={cekdataDetilMP.brutoMP ? addCommas(removeNonNumeric(cekdataDetilMP.brutoMP)) : ""} {...registerDetilMP("brutoMP", {required: "Mohon isi volume bruto"})} className='form-control form-control-sm' name='brutoMP' id='brutoMP' />
                                    </div>
                                    {/* ekor: 1122 || KG: 1356  */}
                                    <div className='col-md-5' style={{paddingLeft: '2px'}}>
                                        <input autoComplete="off" type="hidden" name='satBrutoMP' id='satBrutoMP' {...registerDetilMP("satBrutoMP")} value="1356" />
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' value="KILOGRAM" readOnly  />
                                    </div>
                                    {errorsDetilMP.brutoMP && <small className="text-danger">{errorsDetilMP.brutoMP.message}</small>}
                                </div>
                            </div>
                            <div className="col-md-6" style={{display: (cekdataDiri.jenisMp == '1' ? "block" : "none")}}>
                                <div className='row'>
                                    <div className="col-md-4">
                                        <label className="form-label" htmlFor="jantan">Jantan (Ekor)</label>
                                        <input autoComplete="off" type="text" id="jantan" name="jantan" value={cekdataDetilMP.jantan ? addCommas(removeNonNumeric(cekdataDetilMP.jantan)) : ""} {...registerDetilMP("jantan")} className='form-control form-control-sm' />
                                        </div>
                                    <div className="col-md-4">
                                        <label className="form-label" htmlFor="betina">Betina (Ekor)</label>
                                        <input autoComplete="off" type="text" name='betina' id='betina' value={cekdataDetilMP.betina ? addCommas(removeNonNumeric(cekdataDetilMP.betina)) : ""} {...registerDetilMP("betina")} className='form-control form-control-sm' />
                                    </div>
                                </div>
                            </div>
                        </> : (cekdataDiri.mediaPembawa == 'I' ?
                        <>
                            <div className='col-md-12'>
                                <div className="col-md-6">
                                    <label className="form-label" htmlFor="peruntukanMPKI">Klasifikasi<span className='text-warning'>*</span></label>
                                    <Controller
                                        control={controlDetilMP}
                                        name={"peruntukanMPKI"}
                                        defaultValue={""}
                                        className="form-control form-control-sm"
                                        rules={{ required: "Mohon pilih klasifikasi MP" }}
                                        render={({ field: { value,onChange, ...field } }) => (
                                            <Select styles={customStyles} placeholder={"Pilih klasifikasi Ikan.."} value={{id: cekdataDetilMP.peruntukanMPKI, label: cekdataDetilMP.peruntukanMPKIView}} {...field} onChange={(e) => setValueDetilMP("peruntukanMPKI", e.value) & setValueDetilMP("peruntukanMPKIView", e.label)} options={dataSelect.peruntukanMPKI} />
                                        )}
                                    />
                                    {errorsDetilMP.peruntukanMPKI && <small className="text-danger">{errorsDetilMP.peruntukanMPKI.message}</small>}
                                    <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah klasifikasi" : null}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="komoditasMPKI">Komoditas<span className='text-danger'>*</span></label>
                                <input autoComplete="off" type="hidden" name='komoditasMPKIid' {...registerDetilMP("komoditasMPKIid")} />
                                {/* <input autoComplete="off" type="hidden" name='klasifikasiMPKIid' {...registerDetilMP("klasifikasiMPKIid")} /> */}
                                <Controller
                                    control={controlDetilMP}
                                    name={"komoditasMPKI"}
                                    defaultValue={""}
                                    className="form-control form-control-sm"
                                    rules={{ required: "Mohon pilih komoditas" }}
                                    render={({ field: { value,onChange, ...field } }) => (
                                        <Select placeholder= 'Pilih Komoditas..' styles={customStyles}
                                         value={{id: cekdataDetilMP.komoditasMPKI, label: cekdataDetilMP.komoditasMPKIView}} onChange={(e) => setValueDetilMP("komoditasMPKI", e.value) & setValueDetilMP("komoditasMPKIView", e.label) & handleSetKomoditasSelect(e)} {...field} options={dataSelect.selectKomoditasMPKI} />
                                    )}
                                />
                                <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah komoditas" : null}</small>
                                {errorsDetilMP.komoditasMPKI && <small className="text-danger">{errorsDetilMP.komoditasMPKI.message}</small>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="kodeHSMpKI">Kode HS<span className='text-danger'>*</span></label>
                                <Controller
                                    control={controlDetilMP}
                                    name={"kodeHSMpKI"}
                                    defaultValue={""}
                                    className="form-control form-control-sm"
                                    rules={{ required: "Mohon isi kode HS" }}
                                    render={({ field: { value,onChange, ...field } }) => (
                                        <Select styles={customStyles} placeholder={"Pilih kode HS.."} value={{id: cekdataDetilMP.kodeHSMpKI, label: cekdataDetilMP.kodeHSMpKIView}} onChange={(e) => setValueDetilMP("kodeHSMpKI", e.value) & setValueDetilMP("kodeHSMpKIView", e.label)} {...field} options={dataSelect.kodeHSMp} />
                                    )}
                                />
                                {errorsDetilMP.kodeHSMpKI && <small className="text-danger">{errorsDetilMP.kodeHSMpKI.message}</small>}
                                <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah kode HS" : null}</small>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="namaUmumKI">Nama Umum Tercetak</label>
                                <input autoComplete="off" type='text' name="namaUmumKI" id="namaUmumKI" {...registerDetilMP("namaUmumKI")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="namaLatinKI">Nama Latin Tercetak</label>
                                <input autoComplete="off" type='text' name="namaLatinKI" id="namaLatinKI" {...registerDetilMP("namaLatinKI")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="jumlahMPKI">Jumlah<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className='col-md-7' style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="text" value={cekdataDetilMP.jumlahMPKI ? addCommas(removeNonNumeric(cekdataDetilMP.jumlahMPKI)) : ""} {...registerDetilMP("jumlahMPKI", {required: "Mohon isi jumlah."})} className={errorsDetilMP.jumlahMPKI ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name='jumlahMPKI' id='jumlahMPKI' />
                                    </div>
                                    <div className='col-md-5' style={{paddingLeft: '2px'}}>
                                        <Controller
                                            control={controlDetilMP}
                                            name={"satJumlahMPKI"}
                                            defaultValue={""}
                                            className="form-control form-control-sm"
                                            rules={{ required: "Mohon isi satuan volume." }}
                                            render={({ field: { value,onChange, ...field } }) => (
                                                <Select styles={customStyles} placeholder={"Pilih Satuan.."} value={{id: cekdataDetilMP.satJumlahMPKI, label: cekdataDetilMP.satJumlahMPKIView}} onChange={(e) => setValueDetilMP("satJumlahMPKI", e.value) & setValueDetilMP("satJumlahMPKIView", e.label)} {...field} options={masterSatuanJson(cekdataDiri.mediaPembawa)} />
                                            )}
                                        />
                                    </div>
                                    {errorsDetilMP.jumlahMPKI && <small className="text-danger">{errorsDetilMP.jumlahMPKI.message}</small>}
                                    {errorsDetilMP.satJumlahMPKI && <small className="text-danger">{errorsDetilMP.satJumlahMPKI.message}</small>}
                                </div>
                            </div>
                            <div className="col-md-6" style={{visibility: (cekdataDiri.jenisMp == '6' ? "visible" : "hidden")}}>
                                <label className="form-label" htmlFor="sizeIkan">Size</label>
                                <input autoComplete="off" type='text' name="sizeIkan" id="sizeIkan" {...registerDetilMP("sizeIkan")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="nettoMPKI">Netto<span className='text-warning'>*</span></label>
                                <div className='row'>
                                    <div className='col-md-7' style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' value={cekdataDetilMP.nettoMPKI ? addCommas(removeNonNumeric(cekdataDetilMP.nettoMPKI)) : ""} {...registerDetilMP("nettoMPKI", {required: "Mohon isi volume netto"})} name='nettoMPKI' id='nettoMPKI' />
                                    </div>
                                    {/* ekor: 1122 || KG: 1356  */}
                                    <div className='col-md-5' style={{paddingLeft: '2px'}}>
                                        <input autoComplete="off" type="hidden" name='satNettoMPKI' id='satNettoMPKI' {...registerDetilMP("satNettoMPKI")} value="1356" />
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' value='KILOGRAM' readOnly />
                                    </div>
                                    {errorsDetilMP.nettoMPKI && <small className="text-danger">{errorsDetilMP.nettoMPKI.message}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="nilaiBarangMPKI">Nilai Barang<span className='text-warning'>*</span></label>
                                <div className='row'>
                                    <div className="col-md-7" style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' value={cekdataDetilMP.nilaiBarangMPKI ? addCommas(removeNonNumeric(cekdataDetilMP.nilaiBarangMPKI)) : ""} name='nilaiBarangMPKI' id='nilaiBarangMPKI' {...registerDetilMP("nilaiBarangMPKI", {required: "Mohon isi nilai barang"})} />
                                    </div>
                                    <div className="col-md-5" style={{paddingLeft: '2px'}}>
                                        <input type="hidden" value="IDR" id='satuanNilaiMPKI' name='satuanNilaiMPKI' {...registerMP("satuanNilaiMPKI")}/>
                                        <input type="text" className='form-control form-control-sm' name='satuanNilaiMPKIView' id='satuanNilaiMPKIView' disabled value="IDR - Rupiah"/>
                                        {/* <select name="satuanNilaiMPKI" id="satuanNilaiMPKI" value={cekdataDetilMP.satuanNilaiMPKI || "IDR"} {...registerDetilMP("satuanNilaiMPKI", {required: "Mohon pilih mata uang"})} className='form-control form-control-sm'>
                                        <option value="">--</option>
                                            {dataSelect.satuanNilai}
                                        </select> */}
                                    </div>
                                    {errorsDetilMP.nilaiBarangMPKI && <small className="text-danger">{errorsDetilMP.nilaiBarangMPKI.message}</small>}
                                    {/* {errorsDetilMP.satuanNilaiMPKI && <small className="text-danger">{errorsDetilMP.satuanNilaiMPKI.message}</small>} */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="brutoMPKI">Bruto<span className='text-warning'>*</span></label>
                                <div className='row'>
                                    <div className='col-md-7' style={{paddingRight: '2px'}}>
                                        <input autoComplete="off" type="text" value={cekdataDetilMP.brutoMPKI ? addCommas(removeNonNumeric(cekdataDetilMP.brutoMPKI)) : ""} {...registerDetilMP("brutoMPKI", {required: "Mohon isi volume bruto"})} className='form-control form-control-sm' name='brutoMPKI' id='brutoMPKI' />
                                    </div>
                                    {/* ekor: 1122 || KG: 1356  */}
                                    <div className='col-md-5' style={{paddingLeft: '2px'}}>
                                        <input autoComplete="off" type="hidden" name='satBrutoMPKI' id='satBrutoMPKI' {...registerDetilMP("satBrutoMPKI")} value="1356" />
                                        <input autoComplete="off" type="text" className='form-control form-control-sm' value="KILOGRAM" readOnly  />
                                    </div>
                                    {errorsDetilMP.brutoMPKI && <small className="text-danger">{errorsDetilMP.brutoMPKI.message}</small>}
                                </div>
                            </div>
                        </> : "Mohon pilih jenis media pembawa"))
                        }
                        <small className='text-danger'>*Format penulisan desimal menggunakan titik ( . )</small>
                        <div className="col-md-12 text-center">
                            {onLoad ? <LoadBtn warna="btn-success" ukuran="" /> :
                                <button type="submit" className="btn btn-primary me-sm-3 me-1">{cekdataDetilMP.idDetilMP ? "Edit" : "Tambah"}</button>
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

export default DocK11