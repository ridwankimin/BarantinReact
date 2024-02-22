/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react'
import PersonSvg from '../../logo/svg/PersonSvg'
import ShipSvg from '../../logo/svg/ShipSvg'
import PackageSvg from '../../logo/svg/PackageSvg'
import DokumenSvg from '../../logo/svg/DokumenSvg'
import ConfirmSvg from '../../logo/svg/ConfirmSvg'
// import MasterNegara from '../../model/master/MasterNegara'
// import MasterKota from '../../model/master/MasterKota'
// import MasterPelabuhan from '../../model/master/MasterPelabuhan'
import MasterKemasan from '../../model/master/MasterKemasan'
import MasterMataUang from '../../model/master/MasterMataUang'
import NegaraJson from '../../model/master/negara.json'
import PelabuhanJson from '../../model/master/pelabuhan.json'
import KlasifikasiKTJson from '../../model/master/klasifikasiKT.json'
import JenisDokumenJson from '../../model/master/jenisDokumen.json'
import KomoditasKTJson from '../../model/master/komoditasKT.json'
// import MasterKlasKT from '../../model/master/MasterKlasKT'
// import MasterKomKT from '../../model/master/MasterKomKT'
// import MasterSatuan from '../../model/master/MasterSatuan'
import MasterSatuanJson from '../../model/master/satuan.json'
// import MasterHS from '../../model/master/MasterHS'
import { Controller, useForm } from 'react-hook-form'
// import { motion } from "framer-motion";
// import MasterProv from '../../model/master/MasterProv'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import PtkModel from '../../model/PtkModel'
import { useNavigate } from 'react-router-dom'
// import MasterKomKH from '../../model/master/MasterKomKH'
// import MasterDokumen from '../../model/master/MasterDokumen'
import moment from 'moment/moment'
import Select from 'react-select'
import Master from '../../model/Master'
import Cookies from 'js-cookie'
import PtkHistory from '../../model/PtkHistory'
import Swal from 'sweetalert2'
// import $ from 'jquery';
// import './assets/vendor/libs/popper/popper.js'
// import '../../assets/vendor/libs/popper/popper.js'
// import '../../assets/vendor/libs/bs-stepper/bs-stepper.css'
// import '../../assets/vendor/libs/bs-stepper/bs-stepper.js'
const modelPemohon = new PtkModel()
const modelMaster = new Master()
const log = new PtkHistory()

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

function handleJenisDokumen(e) {
    const dataJenisDokumen = JenisDokumenJson.filter((element) => (e === "H" ? element.komoditas_hewan === "1" : (e === "T" ? element.komoditas_tumbuhan === "1" : element.komoditas_ikan === "1")))
    var arraySelect = dataJenisDokumen.map(item => {
        return {
            value: item.id,
            label: item.kode + " - " + item.nama,
        }
    })
    return arraySelect
}

function masterKomKT() {
        
    var arraySelect = KomoditasKTJson.map(item => {
        return {
            value: item.id + ";" + item.nama + ";" + item.nama_latin,
            label: item.nama + " - " + item.nama_en,
        }
    })
    return arraySelect
}

function DocK11() {
    require("../../assets/vendor/libs/bs-stepper/bs-stepper.css")
    require("../../assets/vendor/libs/bs-stepper/bs-stepper.js")
    
    let navigate = useNavigate();
    // const { idPtk } = useParams()
    // Cookies.remove("idPtkPage");
    const idPtk = Cookies.get("idPtkPage");
    let [dataIdPage, setDataIdPage] = useState({});
    // let [opsiVerif, setOpsiVerif] = useState();

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

    let [dataSelect, setdataSelect] = useState({});
    let [ptkLengkap, setPtkLengkap] = useState(false);
    
    function handlePermohonan(e) {
        if(e.target.value === 'EX') {
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
        } else if(e.target.value === 'IM') {
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
        // setdataSelect(values => ({...values, [e.target.name]: <MasterKlasKT gol={e.target.dataset.gol}/>}))
    }
    
    // function handlePeruntukanKT(e) {
    //     setdataSelect(values => ({...values, [e.target.name]: <MasterKlasKT gol={e.target.dataset.gol}/>}))
    // }
    
    function handleSetKomoditasSelect(e) {
        console.log(e)
        const dataKomKT = e.value;
        const dataPisahKT = dataKomKT.split(";");
        if(cekdataMP.mediaPembawa === "T") {
            setValueDetilMP("komoditasMP", dataPisahKT[0])
            setValueDetilMP("namaUmum", dataPisahKT[1])
            setValueDetilMP("namaLatin", (dataPisahKT[2] | dataPisahKT[2] === null ? dataPisahKT[2] : "-"))
        } else if(cekdataMP.mediaPembawa === "H") {
            setValueDetilMP("komoditasMPKHid", dataPisahKT[0])
            setValueDetilMP("namaUmumKH", dataPisahKT[1])
            setValueDetilMP("namaLatinKH", (dataPisahKT[2] | dataPisahKT[2] === null ? dataPisahKT[2] : "-"))
            // setValueDetilMP("klasifikasiMPKHid", dataPisahKT[3]) //klasifikasi KH
        }
    }
    
    // function handleMPDetil(e) {
    //     // console.log(e.label)
    //     setValueMP("mediaPembawa", e.target.value);
    //     setValueDetilMP("jenisKar", e.target.value);
    //     handleJenisDokumen(e.target.value);
    //     if(e.target.value === "T") {
    //         handleKomKTDetil()
    //     }
    // }
    
    // function handleKomKTDetil() {
    //     // const modelMaster = new Master()
    //     // var arrayKomKT = MasterKomKT.map(item => {
    //     //     return {
    //     //         value: item.id,
    //     //         label: item.nama,
    //     //     }
    //     // })
    //     // setdataSelect(values => ({...values, "selectKomoditasMP": arrayKomKT}));
    //     const resKomKT = modelMaster.masterKomKT()
    //     resKomKT
    //     .then((response) => {
    //         let dataKomKT = response.data.data;
    //         var arrayKomKT = dataKomKT.map(item => {
    //             return {
    //                 value: item.id + ";" + item.nama + ";" + item.nama_latin,
    //                 label: item.nama + " - " + item.nama_en
    //             }
    //         })
    //         setdataSelect(values => ({...values, "selectKomoditasMP": arrayKomKT}));
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }
    
    function handleKemasan(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterKemasan/>}))
    }
    
    // function handleMasterSatuan(e) {
    //     setdataSelect(values => ({...values, [e.target.name]: <MasterSatuan kar={e.target.dataset.kar} />}))
    // }
    
    // function handleMasterHS(e) {
    //     setdataSelect(values => ({...values, [e.target.name]: <MasterHS kar={e.target.dataset.kar} />}))
    // }
    
    // function handleProv(e) {
    //     setdataSelect(values => ({...values, [e.target.name]: <MasterProv/>}))
    // }
    
    function handleBase64Upload(e) {
        let fileReader = new FileReader();
        let files = e.target.files;
        setDataIdPage(values => ({...values,
            fileDokumenUpload: e.target.value,
        }));
        fileReader.readAsDataURL(files[0]);
    
        fileReader.onload = (event) => {
            
            setValueDokumen("fileDokumen", event.target.result);
            // console.log(event.target.result);
        }
    //   console.log(cekdataDokumen.fileDokumen)
    }
    
    // function handleMataUang(e) {
    //     setdataSelect(values => ({...values, [e.target.name]: <MasterMataUang/>}))
    // }
    
    // function handleKota(e) {
    //     setdataSelect(values => ({...values, [e.target.name]: <MasterKota iddata={e.target.dataset.input}/>}))
    // }
    
    // function handleKomoditasKT(e) {
    //     setdataSelect(values => ({...values, [e.target.name]: <MasterKomKT />}))
    // }
    
    // function handleKomoditasKH(e) {
    //     setdataSelect(values => ({...values, [e.target.name]: <MasterKomKH gol={e.target.dataset.gol} />}))
    // }
    
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
    // let [komoditas, setKomoditas] = useState({});
    // let [komMP, setKomMP] = useState({});
    // let [arrKontainer, setArrKontainer] = useState([]);
    // let [kontainer, setKontainer] = useState({
    //     noKontainer: "",
    //     tipeKontainer: "",
    //     ukuranKontainer: "",
    //     stuffKontainer: "",
    //     segel: ""
    // });

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
            volumeNetto: "",
            komoditasMP: "",
            volumeBrutto: "",
            kodeHSMp: "",
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
            klasifikasiMPKHid: "",
            jumlahMP: "",
            satJumlahMP: "",
            nettoMP: "",
            brutoMP: "",
            nilaiBarangMPKH: "",
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

    // let master = useMemo(() => modelMaster, [])

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
    //     try {
    //     const response = await modelMaster.masterNegara();
    //     if(response.data.status === '200') {
    //         let dataneg = response.data.data;
    //         const arraySelectNegara = dataneg.map(item => {
    //             return {
    //                 value: item.id.toString(),
    //                 label: item.kode + " - " + item.nama
    //             }
    //         })
    //         // setSelect2Negara(arraySelectNegara)
    //         setdataSelect(values => ({...values, "negaraPengirim": arraySelectNegara }));
    //         setdataSelect(values => ({...values, "negaraPenerima": arraySelectNegara }));
    //         setdataSelect(values => ({...values, "negaraAsal": arraySelectNegara }));
    //         setdataSelect(values => ({...values, "negaraTujuan": arraySelectNegara }));
    //         setdataSelect(values => ({...values, "negaraTransit": arraySelectNegara }));
    //         setdataSelect(values => ({...values, "negaraAsalMP": arraySelectNegara }));
    //         setdataSelect(values => ({...values, "negaraTujuanMP": arraySelectNegara }));
    //         setdataSelect(values => ({...values, "negaraAsalDokumen": arraySelectNegara }));
    //         setdataSelect(values => ({...values, "benderaTransit": arraySelectNegara }));
    //         setdataSelect(values => ({...values, "benderaAkhir": arraySelectNegara }));
    //     }
    // } catch (error) {
    //     console.log(error)
    //     setdataSelect(values => ({...values, "negaraPengirim": [] }));
    //     setdataSelect(values => ({...values, "negaraPenerima": [] }));
    //     setdataSelect(values => ({...values, "negaraAsal": [] }));
    //     setdataSelect(values => ({...values, "negaraTujuan": [] }));
    //     setdataSelect(values => ({...values, "negaraTransit": [] }));
    //     setdataSelect(values => ({...values, "negaraAsalMP": [] }));
    //     setdataSelect(values => ({...values, "negaraTujuanMP": [] }));
    //     setdataSelect(values => ({...values, "negaraAsalDokumen": [] }));
    // }
    }, [])

    useEffect(() => {
        getListNegara()
    }, [getListNegara])

    const getListProv = useCallback(async () => {
        try {
            const response = await modelMaster.masterProv()
            if(response.data.status === '200') {
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
            console.log(error)
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
                if(response.data.status === '200') {
                    let dataKota = response.data.data;
                    const arraySelectKota = dataKota.map(item => {
                    return {
                        value: item.id.toString(),
                        label: item.nama
                    }
                    })
                    setdataSelect(values => ({...values, [pel]: arraySelectKota}))
                }
                // console.log(dataSelect.pelMuat)
            } catch (error) {
            console.log(error)
            setdataSelect(values => ({...values, [pel]: []}))
            }
        // }
    }, [])

    useEffect(() => {
        handleKota()
    }, [handleKota])

    const handlePelabuhan = useCallback(async (e, pel) => {
        if(e && pel) {
            const dataPelabuhan = PelabuhanJson.filter((element) => element.negara_id === parseInt(e))
        
            var arraySelectPelabuhan = dataPelabuhan.map(item => {
                return {
                    value: item.id,
                    label: item.kode + " - " + item.nama,
                }
            })
            setdataSelect(values => ({...values, [pel]: arraySelectPelabuhan}))
            // try {
            //     const response = await modelMaster.masterPelabuhanID(e)
            //     if(response.data.status === '200') {
            //         let dataPel = response.data.data;
            //         const arraySelectPelabuhan = dataPel.map(item => {
            //         return {
            //             value: item.id.toString(),
            //             label: item.kode + " - " + item.nama
            //         }
            //         })
            //         setdataSelect(values => ({...values, [pel]: arraySelectPelabuhan}))
            //     }
            //     // console.log(dataSelect.pelMuat)
            // } catch (error) {
            // console.log(error)
            // setdataSelect(values => ({...values, [pel]: []}))
            // }
        }
    },[])

    useEffect(() => {
        handlePelabuhan()
    }, [handlePelabuhan])

    // const handleJenisDokumen = useCallback(async (e) => {
    //     if(e) {
    //         const dataJenisDokumen = JenisDokumenJson.filter((element) => (e === "H" ? element.komoditas_hewan === 1 : (e === "T" ? element.komoditas_tumbuhan === 1 : element.komoditas_ikan === 1)))
        
    //         var arraySelectJenisDok = dataJenisDokumen.map(item => {
    //             return {
    //                 value: item.id,
    //                 label: item.kode + " - " + item.nama,
    //             }
    //         })
    //         setdataSelect(values => ({...values, "jenisDokumen": arraySelectJenisDok}))
    //         // try {
    //         //     const response = await modelMaster.masterDok(e)
    //         //     if(response.data.status === '200') {
    //         //         let jenisDok = response.data.data;
    //         //         const arraySelectJenisDok = jenisDok.map(item => {
    //         //         return {
    //         //             value: item.id,
    //         //             label: item.kode + " - " + item.nama
    //         //         }
    //         //         })
    //         //         setdataSelect(values => ({...values, "jenisDokumen": arraySelectJenisDok}))
    //         //     }
    //         // } catch (error) {
    //         //     console.log(error)
    //         //     setdataSelect(values => ({...values, "jenisDokumen": []}))
    //         // }
    //     }
    // }, [])
    
    // useEffect(() => {
    //     handleJenisDokumen()
    // }, [handleJenisDokumen])
  
    // let [dataKlasKT,setDataKlasKT] = useState([]);

    useEffect(()=>{
        let ptkDecode = idPtk ? base64_decode(idPtk) : "";
        let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
        setDataIdPage(values => ({...values,
            noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
            noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
            noPermohonan: idPtk ? base64_decode(ptkNomor[2]) : "",
        }));
        setdataSelect(values => ({...values, "satuanNilai": <MasterMataUang/>}));
        if(idPtk) {
            // const modelPemohon = new PtkModel();
            const response = modelPemohon.getPtkId(base64_decode(ptkNomor[1]));
            response
            .then((response) => {
                console.log("dataTPK")
                console.log(response.data)
                if(response.data.status === '200') {
                    handlePelabuhan(response.data.data.ptk.negara_muat_id, "pelMuat")
                    handlePelabuhan(response.data.data.ptk.negara_bongkar_id, "pelBongkar")
                    if(response.data.data.ptk.negara_asal_id === 99) {
                        handleKota(null, "daerahAsalMP")
                    }
                    if(response.data.data.ptk.negara_tujuan_id === 99) {
                        handleKota(null, "daerahTujuanMP")
                    }

                    // const modelMaster = new Master()
                    if(response.data.data.ptk.jenis_karantina != null) {
                        const resKomKT = modelMaster.masterHS(response.data.data.ptk.jenis_karantina)
                        resKomKT
                        .then((response) => {
                            let dataKomKT = response.data.data;
                            var arrayKomKT = dataKomKT.map(item => {
                                return {
                                    value: item.kode,
                                    label: item.kode + " - " + item.nama_en
                                }
                            })
                            setdataSelect(values => ({...values, "kodeHSMp": arrayKomKT}));
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    }

                    if(response.data.data.ptk.jenis_karantina === "T") {
                        const resKomKT = modelMaster.masterKomKT()
                        resKomKT
                        .then((response) => {
                            let dataKomKT = response.data.data;
                            var arrayKomKT = dataKomKT.map(item => {
                                return {
                                    value: item.id + ";" + item.nama + ";" + item.nama_latin,
                                    label: item.nama + " - " + item.nama_en
                                }
                            })
                            setdataSelect(values => ({...values, "selectKomoditasMP": arrayKomKT}));
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                        
                        if(response.data.data.ptk.jenis_media_pembawa_id === 4) {
                            const dataKlasKT = KlasifikasiKTJson.filter((element) => element.kode_golongan === "A")
        
                            var arrayKlasKTBenih = dataKlasKT.map(item => {
                                return {
                                    value: item.id,
                                    label: item.peruntukan + " - " + item.bentuk + " - " + item.golongan
                                }
                            })
                            setdataSelect(values => ({...values, "peruntukanMP": arrayKlasKTBenih}))
                            // const resPeruntukan = modelMaster.masterKlasKT("A")
                            // resPeruntukan
                            // .then((response) => {
                            //     console.log(response.data)
                            //     let dataPeruntukanKT = response.data.data;
                            //     const arraySelectKota = dataPeruntukanKT.map(item => {
                            //         return {
                            //             value: item.id.toString(),
                            //             label: item.peruntukan + " - " + item.bentuk + " - " + item.golongan
                            //         }
                            //     })
                            //     setdataSelect(values => ({...values, "peruntukanMP": arraySelectKota}))
                            // })
                            // .catch((error) => {
                            //     console.log(error);
                            // });
                        } else {
                            const dataKlasKT = KlasifikasiKTJson.filter((element) => element.kode_golongan === "B" || element.kode_golongan === "C" || element.kode_golongan === "D")
        
                            var arrayKlasKTNonBenih = dataKlasKT.map(item => {
                                return {
                                    value: item.id,
                                    label: item.peruntukan + " - " + item.bentuk + " - " + item.golongan
                                }
                            })
                            setdataSelect(values => ({...values, "peruntukanMP": arrayKlasKTNonBenih}))
                            // const resPeruntukanB = modelMaster.masterKlasKT("B")
                            // resPeruntukanB
                            // .then((response) => {
                            //     let dataPeruntukanKTB = response.data.data;
                            //     var arrayPeruntukanKTB = dataPeruntukanKTB.map(item => {
                            //         return {
                            //             value: item.id.toString(),
                            //             label: item.peruntukan + " - " + item.bentuk + " - " + item.golongan
                            //         }
                            //     })
                            //     setDataKlasKT(arrayPeruntukanKTB)
                            // })
                            // .catch((error) => {
                            //     console.log(error);
                            // });
                            // const resPeruntukanC = modelMaster.masterKlasKT("C")
                            // resPeruntukanC
                            // .then((response) => {
                            //     let dataPeruntukanKTC = response.data.data;
                            //     var arrayPeruntukanKTC = dataPeruntukanKTC.map(item => {
                            //         return {
                            //             value: item.id.toString(),
                            //             label: item.peruntukan + " - " + item.bentuk + " - " + item.golongan
                            //         }
                            //     })
                            //     setDataKlasKT(dataKlasKT => dataKlasKT.concat(arrayPeruntukanKTC))
                            // })
                            // .catch((error) => {
                            //     console.log(error);
                            // });
                            // const resPeruntukanD = modelMaster.masterKlasKT("D")
                            // resPeruntukanD
                            // .then((response) => {
                            //     let dataPeruntukanKTD = response.data.data;
                            //     var arrayPeruntukanKTD = dataPeruntukanKTD.map(item => {
                            //         return {
                            //             value: item.id.toString(),
                            //             label: item.peruntukan + " - " + item.bentuk + " - " + item.golongan
                            //         }
                            //     })
                            //     setDataKlasKT(dataKlasKT => dataKlasKT.concat(arrayPeruntukanKTD))
                            // })
                            // .catch((error) => {
                            //     console.log(error);
                            // });
                            // setdataSelect(values => ({...values, "peruntukanMP": dataKlasKT}))
                        }
                    }
                    setdataSelect(values => ({...values, "jenisKemasan": <MasterKemasan/>}));
                    // setdataSelect(values => ({...values, "satuanNilai": <MasterMataUang/>}));
                    setdataSelect(values => ({...values, "pelMuat": {value: response.data.data.ptk.pelabuhan_muat_id, label: response.data.data.ptk.kd_pelabuhan_muat + " - " + response.data.data.ptk.pelabuhan_muat}}))
                    setdataSelect(values => ({...values, "pelBongkar": {value: response.data.data.ptk.pelabuhan_bongkar_id, label: response.data.data.ptk.kd_pelabuhan_bongkar + " - " + response.data.data.ptk.pelabuhan_bongkar}}))
                    if(response.data.data.ptk.is_transit === 1) {
                        setdataSelect(values => ({...values, "pelTransit": {value: response.data.data.ptk.pelabuhan_transit_id, label: response.data.data.ptk.kd_pelabuhan_transit + " - " + response.data.data.ptk.pelabuhan_transit}}))
                    }
                    // handleJenisDokumen(response.data.data.ptk.jenis_karantina);
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
                        setValuePelabuhan("transitOpsi", response.data.data.ptk.is_transit === null ? "" :response.data.data.ptk.is_transit.toString());
                        setValuePelabuhan("cekKontainer", response.data.data.ptk.is_kontainer === null ? "" : response.data.data.ptk.is_kontainer.toString());
                        if(response.data.data.ptk.is_kontainer !== null) {
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
                        
                        setValueMP("mediaPembawa", response.data.data.ptk.jenis_karantina);
                        if(response.data.data.ptk.jenis_karantina !== null || response.data.data.ptk_kontainer.length > 0) {
                            setFormTab(values => ({...values, tab3: false}))
                        }
                        setValueMP("jenisMp", response.data.data.ptk.jenis_media_pembawa_id === null ? "" : response.data.data.ptk.jenis_media_pembawa_id.toString());
                        setValueMP("jenisKemasan", response.data.data.ptk.kemasan_id === null ? "" : response.data.data.ptk.kemasan_id.toString());
                        setValueMP("jenisAngkut", response.data.data.ptk.is_curah === null ? "" : response.data.data.ptk.is_curah.toString());
                        setValueMP("peruntukan", response.data.data.ptk.peruntukan_id ? response.data.data.ptk.peruntukan_id.toString() : "");
                        setValueMP("merkKemasan", response.data.data.ptk.merk_kemasan);
                        setValueMP("jumlahKemasan", response.data.data.ptk.jumlah_kemasan);
                        setValueMP("tandaKemasan", response.data.data.ptk.tanda_khusus);
                        setValueMP("nilaiBarang", response.data.data.ptk.nilai_barang);
                        setValueMP("satuanNilai", response.data.data.ptk.mata_uang);
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
            
                        setValueVerify("opsiVerif", response.data.data.ptk.is_verifikasi);
                        setValueVerify("tglTerimaVerif", response.data.data.ptk.tgl_dok_permohonan);
                        setValueVerify("alasanTolak", response.data.data.ptk.alasan_penolakan);
                        setValueVerify("petugasVerif", response.data.data.ptk.alasan_penolakan);
            
                        setDokumenPtk(response.data.data.ptk_dokumen);
                        if(response.data.data.ptk_dokumen.length > 0) {
                            setFormTab(values => ({...values, tab4: false}))
                        }
                        if(response.data.data.ptk.tgl_aju != null) {
                            setPtkLengkap(true);
                        }
                    }, 400) //400
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },[handleKota, handlePelabuhan, idPtk, setValueDetilMP, setValueDokPeriksa, setValueDokumen, setValueKonfirmasi, setValueKontainer, setValueMP, setValuePelabuhan, setValuePemohon, setValueVerify])

    
    // function isiDataPtk(response) {
        
    // }

    const handleKomKHIDetil = useCallback(async (e) => {
        if(cekdataMP.mediaPembawa) {
            const resKodeHS = modelMaster.masterHS(cekdataMP.mediaPembawa)
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
                console.log(error);
            });
    
            if(cekdataMP.mediaPembawa === "H") {
                const resKomKH = modelMaster.masterKomKH(e)
                resKomKH
                .then((response) => {
                    let dataKomKH = response.data.data;
                    var arrayKomKH = dataKomKH.map(item => {
                        return {
                            value: item.id + ";" + item.nama + ";" + item.nama_latin + ";" + item.kode,
                            label: item.nama + " - " + item.nama_en
                        }
                    })
                    setdataSelect(values => ({...values, "komoditasMPKH": arrayKomKH}));
                })
                .catch((error) => {
                    console.log(error);
                });
            } else if(cekdataMP.mediaPembawa === "T") {
                // const resKomKT = modelMaster.masterKomKT()
                // resKomKT
                // .then((response) => {
                //     let dataKomKT = response.data.data;
                //     var arrayKomKT = dataKomKT.map(item => {
                //         return {
                //             value: item.id + ";" + item.nama + ";" + item.nama_latin,
                //             label: item.nama + " - " + item.nama_en
                //         }
                //     })
                //     setdataSelect(values => ({...values, "selectKomoditasMP": arrayKomKT}));
                // })
                // .catch((error) => {
                //     console.log(error);
                // });
    
                if(e === "4") {
                    const dataKlasKT = KlasifikasiKTJson.filter((element) => element.kode_golongan === "A")
        
                    var arrayKlasKTBenih = dataKlasKT.map(item => {
                        return {
                            value: item.id,
                            label: item.peruntukan + " - " + item.bentuk + " - " + item.golongan
                        }
                    })
                    setdataSelect(values => ({...values, "peruntukanMP": arrayKlasKTBenih}))
                    // const resPeruntukan = modelMaster.masterKlasKT("A")
                    // resPeruntukan
                    // .then((response) => {
                    //     console.log(response.data)
                    //     let dataPeruntukanKT = response.data.data;
                    //     const arraySelectKota = dataPeruntukanKT.map(item => {
                    //         return {
                    //             value: item.id.toString(),
                    //             label: item.peruntukan + " - " + item.bentuk + " - " + item.golongan
                    //         }
                    //     })
                    //     setdataSelect(values => ({...values, "peruntukanMP": arraySelectKota}))
                    // })
                    // .catch((error) => {
                    //     console.log(error);
                    // });
                } else {
                    const dataKlasKT = KlasifikasiKTJson.filter((element) => element.kode_golongan === "B" || element.kode_golongan === "C" || element.kode_golongan === "D")
        
                    var arrayKlasKTNonBenih = dataKlasKT.map(item => {
                        return {
                            value: item.id,
                            label: item.peruntukan + " - " + item.bentuk + " - " + item.golongan
                        }
                    })
                    setdataSelect(values => ({...values, "peruntukanMP": arrayKlasKTNonBenih}))
                    // const resPeruntukanB = modelMaster.masterKlasKT("B")
                    // resPeruntukanB
                    // .then((response) => {
                    //     let dataPeruntukanKTB = response.data.data;
                    //     var arrayPeruntukanKTB = dataPeruntukanKTB.map(item => {
                    //         return {
                    //             value: item.id.toString(),
                    //             label: item.peruntukan + " - " + item.bentuk + " - " + item.golongan
                    //         }
                    //     })
                    //     const resPeruntukanC = modelMaster.masterKlasKT("C")
                    //     resPeruntukanC
                    //     .then((response) => {
                    //         let dataPeruntukanKTC = response.data.data;
                    //         var arrayPeruntukanKTC = dataPeruntukanKTC.map(item => {
                    //             return {
                    //                 value: item.id.toString(),
                    //                 label: item.peruntukan + " - " + item.bentuk + " - " + item.golongan
                    //             }
                    //         })
                    //         const resPeruntukanD = modelMaster.masterKlasKT("D")
                    //         resPeruntukanD
                    //         .then((response) => {
                    //             let dataPeruntukanKTD = response.data.data;
                    //             var arrayPeruntukanKTD = dataPeruntukanKTD.map(item => {
                    //                 return {
                    //                     value: item.id.toString(),
                    //                     label: item.peruntukan + " - " + item.bentuk + " - " + item.golongan
                    //                 }
                    //             })
                    //             setdataSelect(values => ({...values, "peruntukanMP": [...arrayPeruntukanKTB, ...arrayPeruntukanKTC, ...arrayPeruntukanKTD]}))
                    //         })
                    //         .catch((error) => {
                    //             console.log(error);
                    //         });
                    //     })
                    //     .catch((error) => {
                    //         console.log(error);
                    //     });
                    //     setdataSelect(values => ({...values, "peruntukanMP": arrayPeruntukanKTB}))
                    // })
                    // .catch((error) => {
                    //     console.log(error);
                    // });
                }
            } else if(cekdataMP.mediaPembawa === "I") {
                // komoditas ikan
            }
        }
        },[cekdataMP.mediaPembawa])
    
    useEffect(() => {
        handleKomKHIDetil()
    }, [handleKomKHIDetil])
    
    const onSubmitDokumen = (data) => {
        // const modelPemohon = new PtkModel();

        const response = modelPemohon.pushDetilDokumen(data);
            response
            .then((response) => {
                // console.log(response)
                // alert(response.data.status + " - " + response.data.message)
                
                // setFormTab(values => ({...values, tab4: false}))
                // setWizardPage(wizardPage + 1)
                if(response.data.status == 201) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Dokumen berhasil disimpan.",
                        showConfirmButton: false,
                        timer: 1000
                    })
                    resetFormDokumen();
                    // setSelectedFile(null)
                    dataDokumenPtk();
                    setDataIdPage(values => ({...values,
                        fileDokumenUpload: "",
                    }));
                    // "fileDokumenUpload".target.value = "";
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const onSubmitDetilMP = (data) => {
        // setValueDetilMP("idPtk", dataIdPage.noIdPtk)
        // setValueDetilMP("datenow", dateNow())
        // console.log(data.jenisKar)
        // const modelPemohon = new PtkModel();

        if(cekdataMP.mediaPembawa) {
            const response = modelPemohon.pushKomoditi(data, cekdataMP.mediaPembawa);
            response
            .then((response) => {
                // console.log(response)
                // alert(response.data.status + " - " + response.data.message)
                // setFormTab(values => ({...values, tab4: false}))
                // setWizardPage(wizardPage + 1)
                if(response.data.status === '201') {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Detil Media Pembawa berhasil disimpan.",
                        showConfirmButton: false,
                        timer: 1000
                    })
                    resetFormKomoditi();
                    dataKomoditiPtk();
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };
    // const date = new Date();
    // function addZero(i) {
    //     if (i < 10) {i = "0" + i}
    //     return i;
    // }

    // console.count()

    const onSubmitPemohon = (data) => {
    // const modelPemohon = new PtkModel();

        if(idPtk) {
            // setValuePemohon("idPtk", dataIdPage.noIdPtk)
            // setValuePemohon("noAju", dataIdPage.noAju)
            // setValuePemohon("noPermohonan", dataIdPage.noPermohonan)
            // setValuePemohon("makeid", makeid())
            // setValuePemohon("datenow", dateNow())
            const response = modelPemohon.tabPemohonUpdate(data);
            response
            .then((response) => {
                // console.log(response.data)
                // alert(response.data.status + " - " + response.data.message)
                if(response.data.status === '201') {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Data Pemohon berhasil disimpan.",
                        showConfirmButton: false,
                        timer: 1000
                    })
                    setFormTab(values => ({...values, tab2: false}))
                    setWizardPage(wizardPage + 1)
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });
        } else {
            // setValuePemohon("makeid", makeid())
            // setValuePemohon("datenow", dateNow())
            const response = modelPemohon.tabPemohonInsert(data);
            response
            .then((response) => {
                console.log(response)
                // alert(response.data.status + " - " + response.data.message)
                // Cookies.set("idPtkPage", base64_encode(base64_encode(response.data.data.no_aju) + 'm0R3N0r1R' + base64_encode(response.data.data.id) + "m0R3N0r1R" ), { expires: 1,});
                // response.data.status === '201' ? navigate('/k11/' + base64_encode(base64_encode(response.data.data.no_aju) + 'm0R3N0r1R' + base64_encode(response.data.data.id) + "m0R3N0r1R")) : alert(response.data.message)
                if(response.data.status === '201') {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Data Pemohon berhasil disimpan.",
                        showConfirmButton: false,
                        timer: 1000
                    })
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
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Data Pemohon gagal disimpan.",
                    text: response.data.status + " - " + response.data.message,
                    showConfirmButton: true
                })
                // alert(error.response.status + " - " + error.response.data.message)
            });
        }
    };

    // const iddataaa = base64_encode(base64_encode("0100EX1240113150657GZTL5") + 'm0R3N0r1R' + base64_encode("a3678a03-5f2d-4ba7-acd1-e749d9e4b0ba") + "m0R3N0r1R");
    // console.log(iddataaa)

    const onSubmitPelabuhan = (data) => {
        // setValuePelabuhan("idPtk", noIdPtk)
        // const modelPemohon = new PtkModel();
        
        if(idPtk) {
            // setValuePelabuhan("idPtk", dataIdPage.noIdPtk)
            // setValuePelabuhan("noAju", dataIdPage.noAju)
            // setValuePelabuhan("datenow", dateNow())
            const response = modelPemohon.tabPelabuhan(data);
            response
            .then((response) => {
                // console.log(response)
                if(response.data.status === '201') {
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Data Pelabuhan berhasil disimpan.",
                        showConfirmButton: false,
                        timer: 1000
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
                // alert(response.data.status + " - " + response.data.message)
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Data Pelabuhan gagal disimpan.",
                    text: response.data.status + " - " + response.data.message,
                    showConfirmButton: true
                })
                // alert(error.response.status + " - " + error.response.data.message)
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
        // const modelPemohon = new PtkModel();

        if(idPtk) {
            // setValueMP("idPtk", dataIdPage.noIdPtk)
            // setValueMP("noAju", dataIdPage.noAju)
            // setValueMP("datenow", dateNow())
             const response = modelPemohon.tabKomoditas(data);
            response
            .then((response) => {
                // console.log(response.data)
                // alert(response.data.status + " - " + response.data.message)
                if(response.data.status === '201') {
                    Swal.fire({
                        icon: "Success",
                        title: "Sukses!",
                        text: "Data Komoditas berhasil disimpan.",
                        showConfirmButton: false,
                        timer: 1000
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
                console.log(error);
                // alert(error.response.status + " - " + error.response.data.message)
                Swal.fire({
                    icon: "error",
                    title: "Data Pemohon gagal disimpan.",
                    text: response.data.status + " - " + response.data.message,
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
    
    const onSubmitDokPeriksa = (data) => {
        console.log(data)
        setFormTab(values => ({...values, tab5: false}))
        setWizardPage(wizardPage + 1)
        // const modelPemohon = new PtkModel();

        if(idPtk) {
            const response = modelPemohon.tabTempatPeriksa(data);
            response
            .then((response) => {
                // console.log(response.data)
                // alert(response.data.status + " - " + response.data.message)
                if(response.data.status === '201') {
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: "Permohonan berhasil disubmit.",
                        showConfirmButton: false,
                        timer: 1000
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
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response.status + " - " + error.response.data.message,
                    showConfirmButton: true
                })
                // alert(error.response.status + " - " + error.response.data.message)
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
        // const modelPemohon = new PtkModel();

        if(idPtk) {
            const response = modelPemohon.tabKonfirmasi(data);
            response
            .then((response) => {
                console.log(response.data)
                if(response.data.status === '201') {
                    setPtkLengkap(true);
                    setValueVerify("idPtk", data.idPtk);
                    setValueVerify("noAju", data.noAju);
                    setValueVerify("mediaPembawaVerif", cekdataMP.mediaPembawa);
                    // alert(response.data.status + " - " + response.data.message)
                    Swal.fire({
                        icon: "success",
                        title: "Sukses!",
                        text: response.data.message,
                        showConfirmButton: false,
                        timer: 1000
                    })
                } else {
                    // alert(response.data.status + " - " + response.data.message)
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.response.status + " - " + response.response.data.message,
                        showConfirmButton: true
                    })
                }
                // setFormTab(values => ({...values, tab4: false}))
                // setWizardPage(wizardPage + 1)
            })
            .catch((error) => {
                console.log(error);
                // alert(error.response.status + " - " + error.response.data.message)
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response.status + " - " + error.response.data.message,
                    showConfirmButton: true
                })
            });
        } else {
            // alert('Data id kosong')
            Swal.fire({
                icon: "error",
                title: "Data id kosong!",
                showConfirmButton: true
            })
        }
    };
    
    const onSubmitVerify = (data) => {
        // const modelPemohon = new PtkModel();

        if(idPtk) {
            const response = modelPemohon.ptkVerify(data);
            response
            .then((response) => {
                console.log(response.data)
                if(response.data.status === '201') {
                    // setPtkLengkap(true);
                    Cookies.set("idPtkPage", base64_encode(
                        base64_encode(cekdataDiri.noAju) + 'm0R3N0r1R' + 
                        base64_encode(cekdataDiri.idPtk) + "m0R3N0r1R" + 
                        base64_encode(response.data.data.no_dok_permohonan)
                        )
                    )
                    Cookies.set("tglPtk", cekdataVerify.tglTerimaVerif)
                    Cookies.set("jenisKarantina", cekdataMP.mediaPembawa)
                    Cookies.set("jenisForm", cekdataDiri.jenisForm)
                    setDataIdPage(values => ({...values,
                        noPermohonan: response.data.data.no_dok_permohonan,
                    }));
                    setValueVerify("noDokumen", response.data.data.no_dok_permohonan);
                    
                    //start save history
                    // const log = new PtkHistory();
                    const resHsy = log.pushHistory(cekdataDiri.idPtk, "p0", "K-1.1", (dataIdPage.noPermohonan ? 'UPDATE' : 'NEW'));
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
                        position: "top-center",
                        icon: "success",
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1000
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: response.data.message,
                        showConfirmButton: true
                    })
                    // alert(response.data.status + " - " + response.data.message)
                }
                // setFormTab(values => ({...values, tab4: false}))
                // setWizardPage(wizardPage + 1)
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: error.response.status + " - " + error.data.message,
                    showConfirmButton: true
                })
                // alert(error.response.status + " - " + error.response.data.message)
            });
        } else {
            // alert('Data id kosong')
            Swal.fire({
                icon: "error",
                title: "Data id kosong",
                showConfirmButton: true
            })
        }
    };
    
      const onSubmitKontainer = (data) => {
        // setValueKontainer("idPtk", noIdPtk);
        // const modelPemohon = new PtkModel();
        // setValueKontainer("idPtk", dataIdPage.noIdPtk)
        // setValueKontainer("datenow", dateNow())
        
        const response = modelPemohon.pushDetilKontainer(data);
            response
            .then((response) => {
                // console.log(response.data)
                
                // alert(response.data.status + " - " + response.data.message)
                // setFormTab(values => ({...values, tab4: false}))
                // setWizardPage(wizardPage + 1)
                if(response.data.status === '201') {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Data Kontainer berhasil disimpan.",
                        showConfirmButton: false,
                        timer: 1000
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
                console.log(error.response);
                Swal.fire({
                    icon: "error",
                    title: "Data Kontainer gagal disimpan!",
                    showConfirmButton: true,
                    text: error.data.status + " - " + error.data.message
                })
                // alert(error.response.status + " - " + error.response.data.message)
            });
    }      

    const handleCekSameTTD = (event) => {
        // console.log(cekdataDiri.alamatPemohon)
        if(event.target.checked === true) {
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
        if(event.target.checked === true) {
            setValuePemohon("namaPengirim", cekdataDiri.namaPemohon);
            setValuePemohon("alamatPengirim", cekdataDiri.alamatPemohon);
            setValuePemohon("jenisIdentitasPengirim", cekdataDiri.jenisIdentitasPemohon);
            setValuePemohon("noIdentitasPengirim", cekdataDiri.noIdentitasPemohon);
            setValuePemohon("nomorTlpPengirim", cekdataDiri.nomorTlp);
            setValuePemohon("negaraPengirim", (cekdataDiri.permohonan === 'IM' ? "" : "99"));
            setValuePemohon("provPengirim", (cekdataDiri.permohonan === 'IM' ? "" : cekdataDiri.provPemohon));
            setValuePemohon("provPengirimView", (cekdataDiri.permohonan === 'IM' ? "" : cekdataDiri.provPemohonView));
            setValuePemohon("kotaPengirim", (cekdataDiri.permohonan === 'IM' ? "" : cekdataDiri.kotaPemohon));
            setValuePemohon("kotaPengirimView", (cekdataDiri.permohonan === 'IM' ? "" : cekdataDiri.kotaPemohonView));
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
        if(event.target.checked === true) {
            setValuePemohon("namaPenerima", cekdataDiri.namaPemohon);
            setValuePemohon("alamatPenerima", cekdataDiri.alamatPemohon);
            setValuePemohon("jenisIdentitasPenerima", cekdataDiri.jenisIdentitasPemohon);
            setValuePemohon("noIdentitasPenerima", cekdataDiri.noIdentitasPemohon);
            setValuePemohon("nomorTlpPenerima", cekdataDiri.nomorTlp);
            setValuePemohon("negaraPenerima", (cekdataDiri.permohonan === 'EX' ? "" : "99"));
            setValuePemohon("provPenerima", (cekdataDiri.permohonan === 'EX' ? "" : cekdataDiri.provPemohon));
            setValuePemohon("provPenerimaView", (cekdataDiri.permohonan === 'EX' ? "" : cekdataDiri.provPemohonView));
            setValuePemohon("kotaPenerima", (cekdataDiri.permohonan === 'EX' ? "" : cekdataDiri.kotaPemohon));
            setValuePemohon("kotaPenerimaView", (cekdataDiri.permohonan === 'EX' ? "" : cekdataDiri.kotaPemohonView));
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

    // const handleKomMP = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setKomMP(values => ({...values, [name]: value}))
    // }
    
    // const handleKomKTByID = (event) => {
    //     // const name = event.target.name;
    //     const value = event.target.value;
    //     const kom = value.split(';');
    //     setKomMP(values => ({...values,
    //         idkom: kom[0],
    //         kodeKomoditasMP: kom[1],
    //         namaUmum: kom[2],
    //         namaLatin: kom[3]
    //     }))
    //     setKomMP(values => ({...values, [komMP.kodeKomoditasMP]: kom[1]}))
    // }
    
    // const handleKomoditas = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setKomoditas(values => ({...values, [name]: value}))
    // }

    let [wizardPage, setWizardPage] = useState(1);
    // let [editKontainer, setEditKontainer] = useState();

    // const handleAddKontainer = (e) => {
    //     e.preventDefault();
    //     setArrKontainer([...arrKontainer, { 
    //         noKontainer: kontainer.noKontainer,
    //         tipeKontainer: kontainer.tipeKontainer,
    //         ukuranKontainer: kontainer.ukuranKontainer,
    //         stuffKontainer: kontainer.stuffKontainer,
    //         segel: kontainer.segel
    //      }]);
    //      setKontainer(values => ({...values, noKontainer: "",
    //         tipeKontainer: "",
    //         ukuranKontainer: "",
    //         stuffKontainer: "",
    //         segel: ""
    //     }));
    // }

    let [kontainerPtk, setKontainerPtk] = useState();
    let [komoditiPtk, setKomoditiPtk] = useState();
    let [dokumenPtk, setDokumenPtk] = useState();
    // let [kontainerById, setKontainerById] = useState({});
    // useEffect(()=>{
        function dataKontainerPtk() {
            if(wizardPage === 2) {
                // const modelPemohon = new PtkModel();
                const response = modelPemohon.detilKontainerPtk(dataIdPage.noIdPtk);
                // console.log(noIdPtk)
    
                response
                .then((res) => {
                    // console.log(res)
                    if(res.data.status === '200') {
                        setKontainerPtk(res.data.data)
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                });
            }
            console.log(kontainerPtk);
        }
        
        function dataDokumenPtk() {
            if(wizardPage === 4) {
                // const modelPemohon = new PtkModel();
                // console.log(wizardPage)
                // console.log(dataIdPage.noIdPtk)
                const response = modelPemohon.getDokumenPtkId(dataIdPage.noIdPtk);
                // console.log(noIdPtk)
    
                response
                .then((res) => {
                    console.log(res.data)
                    if(res.data.status === '200') {
                        setDokumenPtk(res.data.data)
                    }
                })
                .catch((error) => {
                    console.log(error.response);
                });
            }
            // console.log("datadok : " + dokumenPtk)
        }
        
        function dataKomoditiPtk() {
            if(wizardPage === 3) {
                // const modelPemohon = new PtkModel();
                const response = modelPemohon.getKomoditiPtkId(dataIdPage.noIdPtk, cekdataMP.mediaPembawa);
                // console.log(dataIdPage.noIdPtk)
                // console.log(cekdataMP.mediaPembawa)
    
                response
                .then((res) => {
                    // console.log(res)
                    if(res.data.status === '200') {
                        setKomoditiPtk(res.data.data)
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            }
        }
    // },[noIdPtk, wizardPage])
    
        
    let [sizeKontainer] = useState(["20 feet", "40 feet", "40 feet", "42 feet", "43 feet", "45 feet", "50 feet", "Lainnya"])
    let [tipeKontainer] = useState(["General/Dry cargo", "Tunnel type", "Open Top Steel", "Flat Rack", "Reefer / Refrigerate", "Barge Container", "Bulk Container"])
    // },[noIdPtk, wizardPage]);
    // let [kontainerPtk, setKontainerPtk] = useState({});
    // let [kontainerById, setKontainerById] = useState({});
    
    // if(wizardPage === 3) {
    //     const modelPemohon = new PtkModel();

    //     if(idPtk) {
    //         const response = modelPemohon.detilKontainerPtk(noIdPtk);
    //         if(response.data.status === '200') {
    //             setKontainerPtk(response.data.data)
    //         } 
    //     }
    // }
    
    // const getDataKontId = (e) => {
    //     const modelPemohon = new PtkModel();
    
    //     if(idPtk) {
    //         const response = modelPemohon.detilKontainerId(e.target.dataset.input);
    //         if(response.data.status === '200') {
    //             setValuePemohon("noKontainer", response.data.data.nomor);
    //             setValuePemohon("tipeKontainer", response.data.data.tipe_kontainer_id);
    //             setValuePemohon("ukuranKontainer", response.data.data.ukuran_kontainer_id);
    //             setValuePemohon("stuffKontainer", response.data.data.stuff_kontainer_id);
    //             setValuePemohon("segel", response.data.data.segel);
    //             setValuePemohon("idDataKontainer", response.data.data.id);
    //         } 
    //     }
    // }

    function handleSelectPemohon(e, pel) {
        // console.log(e)
        if(e) {
            setValuePemohon(pel, e.value);
            setValuePemohon(pel + "View", e.label);
        }
    }
    
    function handleEditKontainer(e) {
        // const modelPemohon = new PtkModel();
        const response = modelPemohon.detilKontainerId(e.target.dataset.header);
        response
        .then((res) => {
            // console.log(res.data)
            if(res.data.status === '200') {
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
            console.log(error.response.data);
        });
    }

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");
    
    function handleEditKomoditas(e) {
        setValueDetilMP("idDetilMP", e.target.dataset.header)
        setValueDetilMP("idPtk", e.target.dataset.ptk)
        setValueDetilMP("jenisKar", cekdataMP.mediaPembawa)
        const cell = e.target.closest('tr')
        if(cekdataMP.mediaPembawa === "H") {
            // setdataSelect(values => ({...values, "satJumlahMP": <MasterSatuan kar="kh" />}))
            // setdataSelect(values => ({...values, "satuanNilaiMPKH": <MasterMataUang/>}))
            setTimeout(() => {
                setValueDetilMP("kodeHSMpKH", cell.cells[1].innerHTML)
                setValueDetilMP("komoditasMPKHid", e.target.dataset.kom)
                setValueDetilMP("namaUmumKH", cell.cells[3].innerHTML)
                setValueDetilMP("namaLatinKH", cell.cells[4].innerHTML)
                setValueDetilMP("klasifikasiMPKHid", e.target.dataset.klas)
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
        } else if(cekdataMP.mediaPembawa === "T") {
            // setdataSelect(values => ({...values, "satuanLain": <MasterSatuan kar="kt" />}))
            // setdataSelect(values => ({...values, "satuanNilaiMP": <MasterMataUang/>}))
            setdataSelect(values => ({...values, "satuanKemasanDetil": <MasterKemasan/>}))
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
            },300)
        } else if(cekdataMP.mediaPembawa === "I") {

        }
        // const modelPemohon = new PtkModel();
        // const response = modelPemohon.detilKontainerId(e.target.dataset.header);
        // response
        // .then((res) => {
        //     // console.log(res.data)
        //     if(res.data.status === '200') {
        //         setValueKontainer("idDataKontainer", res.data.data.id)
        //         setValueKontainer("idPtk", res.data.data.ptk_id)
        //         setValueKontainer("noKontainer", res.data.data.nomor)
        //         setValueKontainer("tipeKontainer", res.data.data.tipe_kontainer_id.toString())
        //         setValueKontainer("ukuranKontainer", res.data.data.ukuran_kontainer_id.toString())
        //         setValueKontainer("stuffKontainer", res.data.data.stuff_kontainer_id.toString())
        //         setValueKontainer("segel", res.data.data.segel)
        //     }
        // })
        // .catch((error) => {
        //     console.log(error.response.data);
        // });
    }
    
    function handleEditDokumen(e) {
        // console.log(e.target.dataset.header)
        // const modelPemohon = new PtkModel();
        const response = modelPemohon.getDokumenId(e.target.dataset.header);
        response
        .then((res) => {
            // console.log(res.data)
            if(res.data.status === '200') {
                setValueDokumen("idDataDokumen", res.data.data.id)
                setValueDokumen("idPtk", res.data.data.ptk_id)
                setValueDokumen("noAju", dataIdPage.noAju)
                setValueDokumen("kategoriDokumen", res.data.data.kategori_dokumen)
                setValueDokumen("jenisDokumen", res.data.data.kode_dokumen)
                setValueDokumen("jenisDokumenView", res.data.data.kode_dokumen + " - " + res.data.data.nama_dokumen)
                setValueDokumen("noDokumen", res.data.data.no_dokumen)
                setValueDokumen("negaraAsalDokumen", res.data.data.negara_asal_id === null ? "" : res.data.data.negara_asal_id.toString())
                setValueDokumen("negaraAsalDokumenView", res.data.data.negara_asal)
                setValueDokumen("kotaAsalDokumen", res.data.data.kota_kab_asal_id === null ? "" : res.data.data.kota_kab_asal_id.toString())
                setValueDokumen("kotaAsalDokumenView", res.data.data.kota_kab_asal)
                setValueDokumen("ketDokumen", res.data.data.keterangan)
                setValueDokumen("tglDokumen", res.data.data.tanggal_dokumen)
            }
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    }
    
    // function handleSelectPelabuhan(e, pel) {
    //     // console.log(e)
    //     if(e) {
    //         setValuePelabuhan(pel, e.value);
    //         setValuePelabuhan(pel + "View", e.label);
    //     }
    // }
    
    function handleSelectNegKomoditas(e, pel) {
        // console.log(e)
        if(e) {
            setValueMP(pel, e.value);
            setValueMP(pel + "View", e.label);
        }
    }

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
                            <input type="text" className='form-control' value={dataIdPage.noAju || ""} disabled />
                        </div>
                        <label className="offset-sm-1 col-sm-2 col-form-label" htmlFor="noDok">NOMOR DOKUMEN</label>
                        <div className="col-sm-4">
                            <input type="text" className='form-control' value={dataIdPage.noPermohonan || ""} disabled />
                        </div>
                    </div>
                    <hr className='m-1' />
                    <div className="bs-stepper-header m-auto border-0">
                        <div className={wizardPage === 1 ? "step active" : "step"} onClick={() => setWizardPage(1)} disabled={formTab.tab1}>
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
                        <div className={wizardPage === 2 ? "step active" : "step"}>
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
                        <div className={wizardPage === 3 ? "step active" : "step"}>
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
                        <div className={wizardPage === 4 ? "step active" : "step"}>
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
                        <div className={wizardPage === 5 ? "step active" : "step"}>
                            <button type="button" className="step-trigger" onClick={() => setWizardPage(5)} disabled={formTab.tab5}>
                                <span className="bs-stepper-icon">
                                <ConfirmSvg/>
                                </span>
                                <span className="bs-stepper-label">Konfirmasi</span>
                            </button>
                        </div>
                    </div>
                    <div className="bs-stepper-content border-top">
                            <div id="cardPemohon" className={wizardPage === 1 ? "content active dstepper-block" : "content"}>
                            <form className="input-form" onSubmit={handleFormPemohon(onSubmitPemohon)}>
                                <input type="hidden" name='idPtk' {...registerPemohon("idPtk")} />
                                <input type="hidden" name='noAju' {...registerPemohon("noAju")} />
                                <input type="hidden" name='noPermohonan' {...registerPemohon("noPermohonan")} />
        {/* <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ stiffness: 150 }}
        > */}
            <div className="row">
            <div className="col-sm-6">
                <div className="card card-action mb-4">
                    <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                        <div className="card-action-title">
                            <h5 className="mb-0 text-lightest">Pemohon</h5>
                        </div>
                        <div className="card-action-element">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="collapse show">
                        <div className="card-body pt-0">
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="jenisForm">Jenis Form <span className='text-danger'>*</span></label>
                                <div className="col-sm-9">
                                    <select className={errorsPemohon.jenisForm ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisForm" id="jenisForm" {...registerPemohon("jenisForm", { required: "Mohon pilih jenis form."})}>
                                        <option value="">--</option>
                                        <option value="PTK">Permohonan Tindakan Karantina (PTK)</option>
                                        <option value="NHI">Nota Hasil Intelejen (NHI)</option>
                                        <option value="BST">Serah Terima (BST)</option>
                                    </select>
                                    {errorsPemohon.jenisForm && <small className="text-danger">{errorsPemohon.jenisForm.message}</small>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="permohonan">Jenis Permohonan <span className='text-danger'>*</span></label>
                                <div className="col-sm-9">
                                        <select className={errorsPemohon.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="permohonan" id="permohonan" {...registerPemohon("permohonan", { required: "Mohon pilih jenis permohonan."})} onChange={(e) => handlePermohonan(e)}>
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
                                <label className="col-sm-3 col-form-label" htmlFor="pJRutin">Pengguna Jasa Rutin <span className='text-danger'>*</span></label>
                                <div className="col-sm-9">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="pJRutin" id="ya" value="0" {...registerPemohon("pJRutin", { required: "Mohon pilih jenis pengguna jasa."})} />
                                            <label className="form-check-label" htmlFor="ya">Ya</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="pJRutin" id="tidak" value="1"  {...registerPemohon("pJRutin")}/>
                                            <label className="form-check-label" htmlFor="tidak">Tidak</label>
                                        </div>
                                        {errorsPemohon.pJRutin && <><br/><small className="text-danger">{errorsPemohon.pJRutin.message}</small></>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="namaPemohon">Nama <span className='text-danger'>*</span></label>
                                <div className="col-sm-9">
                                        <input type="text" id="namaPemohon" name="namaPemohon" {...registerPemohon("namaPemohon", { required: "Mohon isi nama pemohon."})} className={errorsPemohon.namaPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Pemohon" />
                                        {errorsPemohon.namaPemohon && <small className="text-danger">{errorsPemohon.namaPemohon.message}</small>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamatPemohon">Alamat <span className='text-danger'>*</span></label>
                                <div className="col-sm-9">
                                    <input type="text" id="alamatPemohon" name="alamatPemohon" {...registerPemohon("alamatPemohon", { required: "Mohon isi alamat pemohon."})} className={errorsPemohon.alamatPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Pemohon" />
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
                                    <input type="number" name='nomorTlp' id="nomorTlp" {...registerPemohon("nomorTlp")} className="form-control form-control-sm" placeholder="No. Telepon" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="nomorFax">No. Fax.</label>
                                <div className="col-sm-9">
                                    <input type="number" name='nomorFax' id="nomorFax" {...registerPemohon("nomorFax")} className="form-control form-control-sm" placeholder="No. Fax." />
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
                                    <input type="text" name="noIdentitasPemohon" id="noIdentitasPemohon" {...registerPemohon("noIdentitasPemohon", { required: "Mohon isi identitas pemohon."})} className={errorsPemohon.noIdentitasPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Identitas" />
                                        {errorsPemohon.noIdentitasPemohon && <small className="text-danger">{errorsPemohon.noIdentitasPemohon.message}</small>}
                                </div>
                            </div>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" name='samaTTD' id="samaTTD" value="1" onChange={handleCekSameTTD} />
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
                                    <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="collapse show">
                        <div className="card-body pt-0">
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="namaTtd">Nama <span className='text-danger'>*</span></label>
                                <div className="col-sm-9">
                                    <input type="text" id="namaTtd" name="namaTtd" {...registerPemohon("namaTtd", { required: "Mohon isi nama penandatangan."})} className={errorsPemohon.namaTtd ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Penandatangan" />
                                    {errorsPemohon.namaTtd && <small className="text-danger">{errorsPemohon.namaTtd.message}</small>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamatTtd">Alamat <span className='text-danger'>*</span></label>
                                <div className="col-sm-9">
                                    <input type="text" id="alamatTtd" name="alamatTtd" {...registerPemohon("alamatTtd", { required: "Mohon isi nama penandatangan."})} className={errorsPemohon.alamatTtd ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Penandatangan" />
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
                                    <input type="text" id="noIdentitasTtd" name="noIdentitasTtd" className={errorsPemohon.noIdentitasTtd ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} {...registerPemohon("noIdentitasTtd", { required: "Mohon isi identitas penandatangan."})} placeholder="Nomor Identitas" />
                                    {errorsPemohon.noIdentitasTtd && <small className="text-danger">{errorsPemohon.noIdentitasTtd.message}</small>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="jabatanTtd">Jabatan</label>
                                <div className="col-sm-9">
                                    <input type="text" id="jabatanTtd" name="jabatanTtd" {...registerPemohon("jabatanTtd")} className="form-control form-control-sm" placeholder="Jabatan" />
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
                                    <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="collapse show">
                        <div className="card-body pt-0">
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="namaCp">Nama</label>
                                <div className="col-sm-9">
                                    <input type="text" id="namaCp" name="namaCp" {...registerPemohon("namaCp")} className="form-control form-control-sm" placeholder="Nama Contact Person" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamatCp">Alamat</label>
                                <div className="col-sm-9">
                                    <input type="text" id="alamatCp" name="alamatCp" {...registerPemohon("alamatCp")} className="form-control form-control-sm" placeholder="Alamat Contact Person" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="teleponCp">Telepon</label>
                                <div className="col-sm-9">
                                    <input type="text" id="teleponCp" name="teleponCp" {...registerPemohon("teleponCp")} className="form-control form-control-sm" placeholder="Telepon Contact Person" />
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
                                    <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="collapse show">
                        <div className="card-body pt-0">
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="namaPengirim">Nama <span className='text-danger'>*</span></label>
                                <div className="col-sm-9">
                                    <input type="text" id="namaPengirim" name="namaPengirim" {...registerPemohon("namaPengirim", { required: "Mohon isi nama pengirim."})} className={errorsPemohon.namaPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Pengirim" />
                                    {errorsPemohon.namaPengirim && <small className="text-danger">{errorsPemohon.namaPengirim.message}</small>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamatPengirim">Alamat <span className='text-danger'>*</span></label>
                                <div className="col-sm-9">
                                    <input type="text" id="alamatPengirim" name="alamatPengirim" {...registerPemohon("alamatPengirim", { required: "Mohon isi alamat pengirim."})} className={errorsPemohon.alamatPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Pengirim" />
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
                                    <input type="text" id="noIdentitasPengirim" name="noIdentitasPengirim" {...registerPemohon("noIdentitasPengirim", { required: "Mohon isi identitas pengirim."})} className={errorsPemohon.noIdentitasPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Identitas" />
                                    {errorsPemohon.noIdentitasPengirim && <small className="text-danger">{errorsPemohon.noIdentitasPengirim.message}</small>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="nomorTlpPengirim">No. Telepon</label>
                                <div className="col-sm-9">
                                    <input type="number" id="nomorTlpPengirim" name="nomorTlpPengirim" {...registerPemohon("nomorTlpPengirim")} className="form-control form-control-sm" placeholder="No. Telepon" />
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
                            <div style={{visibility: cekdataDiri.permohonan === 'IM' ? 'hidden' : 'visible'}}>
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
                                                <Select styles={customStyles} placeholder={"Pilih provinsi pengirim.."} value={{id: cekdataDiri.provPengirim, label: cekdataDiri.provPengirimView}} {...field} options={dataSelect.provPengirim} onChange={(e) => handleSelectPemohon(e, "provPengirim")} />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label" htmlFor="kotaPengirim">Kota/Kabupaten</label>
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
                            <div className="form-check mt-3">
                            <input className="form-check-input" type="checkbox" name='samaPengirim' id="samaPengirim" value="1" onChange={handleCekSamePengirim} />
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
                                    <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="collapse show">
                        <div className="card-body pt-0">
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="namaPenerima">Nama <span className='text-danger'>*</span></label>
                                <div className="col-sm-9">
                                    <input type="text" id="namaPenerima" name="namaPenerima" {...registerPemohon("namaPenerima", { required: "Mohon isi nama penerima."})} className={errorsPemohon.namaPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Penerima" />
                                    {errorsPemohon.namaPenerima && <small className="text-danger">{errorsPemohon.namaPenerima.message}</small>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamatPenerima">Alamat <span className='text-danger'>*</span></label>
                                <div className="col-sm-9">
                                    <input type="text" id="alamatPenerima" name="alamatPenerima" {...registerPemohon("alamatPenerima", { required: "Mohon isi alamat penerima."})} className={errorsPemohon.alamatPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Penerima" />
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
                                    <input type="text" id="noIdentitasPenerima" name="noIdentitasPenerima" className={errorsPemohon.noIdentitasPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Identitas" {...registerPemohon("noIdentitasPenerima", { required: "Mohon isi identitas penerima."})} />
                                    {errorsPemohon.noIdentitasPenerima && <small className="text-danger">{errorsPemohon.noIdentitasPenerima.message}</small>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="nomorTlpPenerima">No. Telepon</label>
                                <div className="col-sm-9">
                                    <input type="number" id="nomorTlpPenerima" name="nomorTlpPenerima" {...registerPemohon("nomorTlpPenerima")} className="form-control form-control-sm" placeholder="No. Telepon" />
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
                            <div style={{visibility: cekdataDiri.permohonan === 'EX' ? 'hidden' : 'visible'}}>
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
                                    <label className="col-sm-3 col-form-label" htmlFor="kotaPenerima">Kota/Kabupaten</label>
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
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" name='samaPenerima' id="samaPenerima" value="1" onChange={handleCekSamePenerima} />
                                <label className="form-check-label" htmlFor="samaPenerima"> Sama dengan pemohon. </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 d-flex justify-content-between">
                <button type="button" className="btn btn-label-secondary" disabled>
                    <i className="fa-solid fa-chevron-left fa-sm ms-sm-n2"></i>
                    <span className="d-sm-inline-block d-none">Sebelumnya</span>
                </button>
                <button type="submit" className="btn btn-primary">
                    <span className="d-sm-inline-block d-none me-sm-1">Simpan & Lanjutkan</span>
                    <i className="fa-solid fa-angle-right fa-sm me-sm-n2"></i>
                </button>
            </div>
        </div>
        {/* </motion.div> */}
        </form>
    </div>
                            <div id="cardPelabuhan" className={wizardPage === 2 ? "content active dstepper-block" : "content"}>
                            <form className="input-form" onSubmit={handleFormPelabuhan(onSubmitPelabuhan)}>
                                <input type="hidden" name='idPtk' {...registerPelabuhan("idPtk")} />
                                <input type="hidden" name='noAju' {...registerPelabuhan("noAju")} />
                                
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
                                                            <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
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
                                                                <input className="form-check-input" type="radio" name="transitOpsi" id="ya" value="1"  {...registerPelabuhan("transitOpsi", { required: "Mohon pilih transit."})}/>
                                                                <label className="form-check-label" htmlFor="ya">Ya</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="transitOpsi" id="tidak" value="0" {...registerPelabuhan("transitOpsi")} />
                                                                <label className="form-check-label" htmlFor="tidak">Tidak</label>
                                                            </div>
                                                            {errorsPelabuhan.transitOpsi && <small className="text-danger">{errorsPelabuhan.transitOpsi.message}</small>}
                                                        </div>
                                                    </div>
                                                    <div style={{display: cekdataPelabuhan.transitOpsi === '1' ? 'block' : 'none' }}>
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
                                                            <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
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
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label" htmlFor="sandar">TPK (Border)</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" name='sandar' id="sandar" {...registerPelabuhan("sandar")} className="form-control form-control-sm" placeholder="Lokasi Sandar" />
                                                        </div>
                                                    </div>
                                                    <div style={{display: cekdataPelabuhan.transitOpsi === '1' ? 'block' : 'none' }}>
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
                                        <div style={{display: cekdataPelabuhan.transitOpsi === '1' ? 'block' : 'none' }}>
                                        <div className="card card-action mb-4">
                                            <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                                <div className="card-action-title">
                                                    <h5 className="mb-0 text-lightest">Pengangkutan Sebelum Transit</h5>
                                                </div>
                                                <div className="card-action-element">
                                                    <ul className="list-inline mb-0">
                                                        <li className="list-inline-item">
                                                            <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
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
                                                            <input type="text" id="namaAlatAngkutTransit" name="namaAlatAngkutTransit" {...registerPelabuhan("namaAlatAngkutTransit")} className="form-control form-control-sm" placeholder="Nama Alat Angkut" />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label" htmlFor="nomorAlatAngkutTransit">Nomor Alat Angkut</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="nomorAlatAngkutTransit" name="nomorAlatAngkutTransit" {...registerPelabuhan("nomorAlatAngkutTransit")} className="form-control form-control-sm" placeholder="Nomor Alat Angkut" />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label" htmlFor="callSignTransit">Call Sign</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="callSignTransit" name="callSignTransit" {...registerPelabuhan("callSignTransit")} className="form-control form-control-sm" placeholder="Call Sign" />
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
                                                            <input type="date" id="tglBerangkatTransit" name="tglBerangkatTransit" {...registerPelabuhan("tglBerangkatTransit")} className="form-control form-control-sm" placeholder="Tgl Berangkat" />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label" htmlFor="tglTibaTransit">Tgl Tiba</label>
                                                        <div className="col-sm-4">
                                                            <input type="date" id="tglTibaTransit" name="tglTibaTransit" {...registerPelabuhan("tglTibaTransit")} className="form-control form-control-sm" placeholder="Tgl Tiba" />
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
                                                            <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
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
                                                            <div style={{display: cekdataPelabuhan.modaAkhir === '9' ? 'block' : 'none'}}>
                                                                <input type="text" className='form-control form-control-sm' name='modaAkhirLainnya' id='modaAkhirLainnya' {...registerPelabuhan("modaAkhirLainnya")} placeholder='Moda Transportasi Lainnya..'
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
                                                            <input type="text" id="namaAlatAngkutAkhir" name="namaAlatAngkutAkhir" {...registerPelabuhan("namaAlatAngkutAkhir", { required: "Mohon isi nama alat angkut akhir."})} className={errorsPelabuhan.namaAlatAngkutAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Alat Angkut" />
                                                            {errorsPelabuhan.namaAlatAngkutAkhir && <small className="text-danger">{errorsPelabuhan.namaAlatAngkutAkhir.message}</small>}
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label" htmlFor="nomorAlatAngkutAkhir">Nomor Alat Angkut <span className='text-danger'>*</span></label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="nomorAlatAngkutAkhir" name="nomorAlatAngkutAkhir" {...registerPelabuhan("nomorAlatAngkutAkhir", { required: "Mohon isi nomor alat angkut akhir."})} className={errorsPelabuhan.nomorAlatAngkutAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Alat Angkut" />
                                                            {errorsPelabuhan.nomorAlatAngkutAkhir && <small className="text-danger">{errorsPelabuhan.nomorAlatAngkutAkhir.message}</small>}
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label" htmlFor="callSignAkhir">Call Sign</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="callSignAkhir" name="callSignAkhir" {...registerPelabuhan("callSignAkhir")} className="form-control form-control-sm" placeholder="Call Sign" />
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
                                                            <input type="date" id="tglBerangkatAkhir" name="tglBerangkatAkhir" {...registerPelabuhan("tglBerangkatAkhir", { required: "Mohon isi tanggal berangkat."})} className={errorsPelabuhan.tglBerangkatAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Tgl Berangkat" />
                                                            {errorsPelabuhan.tglBerangkatAkhir && <small className="text-danger">{errorsPelabuhan.tglBerangkatAkhir.message}</small>}
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-3 col-form-label" htmlFor="tglTibaAkhir">Tgl Tiba <span className='text-danger'>*</span></label>
                                                        <div className="col-sm-4">
                                                            <input type="date" id="tglTibaAkhir" name="tglTibaAkhir" {...registerPelabuhan("tglTibaAkhir", { required: "Mohon isi tanggal tiba."})} className={errorsPelabuhan.tglTibaAkhir ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Tgl Tiba" />
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
                                                    <h5 className="mb-0">Apakah ada Kontainer ?</h5>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="cekKontainer" id="ya" value="1" {...registerPelabuhan("cekKontainer", { required: "Mohon isi pilihan kontainer."})} />
                                                        <label className="form-check-label" htmlFor="ya">Ya</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="cekKontainer" id="tidak" value="0" {...registerPelabuhan("cekKontainer")} />
                                                        <label className="form-check-label" htmlFor="tidak">Tidak</label>
                                                    </div>
                                                    {errorsPelabuhan.cekKontainer && <small className="text-danger">{errorsPelabuhan.cekKontainer.message}</small>}
                                                </div>
                                                <div className="card-action-element">
                                                    <ul className="list-inline mb-0">
                                                        <li className="list-inline-item">
                                                            <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="collapse show" style={{display: (cekdataPelabuhan.cekKontainer === '1' ? 'block' : 'none')}}>
                                                <div className="card-body pt-0">
                                                    <div className="row g-3 mb-3">
                                                        <div className="pb-2">
                                                            <button type="button" className="btn btn-xs btn-primary" data-bs-toggle="modal" data-bs-target="#modKontainer">Tambah Kontainer</button>
                                                            <button type="button" onClick={dataKontainerPtk} className="btn btn-xs btn-info float-end"><i className="menu-icon tf-icons fa-solid fa-sync"></i> Refresh Data</button>
                                                        </div>
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
                                                                            <td>{data.stuff_kontainer_id === 1 ? "FCL" : "LCL" }</td>
                                                                            <td>{tipeKontainer[(data.tipe_kontainer_id - 1)]}</td>
                                                                            <td>{data.segel}</td>
                                                                            <td>
                                                                                <div className="dropdown">
                                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                                                                    </button>
                                                                                    <div className="dropdown-menu">
                                                                                        <a className="dropdown-item" type="button" data-ptk={data.ptk_id} data-header={data.id} onClick={handleEditKontainer} data-bs-toggle="modal" data-bs-target="#modKontainer"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</a>
                                                                                        <a className="dropdown-item" href="#"><i className="fa-solid fa-trash me-1"></i> Delete</a>
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
                                    <div className="col-12 d-flex justify-content-between">
                                        <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                            <i className="fa-solid fa-chevron-left fa-sm ms-sm-n2"></i>
                                            <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            <span className="d-sm-inline-block d-none me-sm-1">Simpan & Lanjutkan</span>
                                            <i className="fa-solid fa-angle-right fa-sm me-sm-n2"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            </div>

                            <div id="cardKomoditas" className={wizardPage === 3 ? "content active dstepper-block" : "content"}>
                                <form className="input-form" onSubmit={handleFormMP(onSubmitKomoditas)}>
                                <input type="hidden" name='idPtk' {...registerMP("idPtk")} />
                                <input type="hidden" name='noAju' {...registerMP("noAju")} />
                                
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
                                                            <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="collapse show">
                                                <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="card-body pt-0">
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-3 col-form-label" htmlFor="mediaPembawa">Media Pembawa <span className='text-danger'>*</span></label>
                                                                    <div className="col-sm-4">
                                                                        <select name="mediaPembawa" id="mediaPembawa" {...registerMP("mediaPembawa", { required: "Mohon pilih media pembawa."})} className={errorsMP.mediaPembawa ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                            <option value="">--</option>
                                                                            <option value="H">Hewan</option>
                                                                            <option value="I">Ikan</option>
                                                                            <option value="T">Tumbuhan</option>
                                                                        </select>
                                                                    </div>
                                                                    {errorsMP.mediaPembawa && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.mediaPembawa.message}</small></div>}
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-3 col-form-label" htmlFor="jenisMp">Jenis Media Pembawa <span className='text-danger'>*</span></label>
                                                                    <div className="col-sm-9">
                                                                        {/* <!-- Hewan --> */}
                                                                        <div style={{display: cekdataMP.mediaPembawa === 'H' ? 'block' : 'none'}}>
                                                                            <div className="form-check form-check-inline">
                                                                                <input className="form-check-input" type="radio" onInput={(e) => handleKomKHIDetil(e.target.value)} name="jenisMp" id="hidup" value="1" {...registerMP("jenisMp", { required: "Mohon pilih jenis media pembawa."})} />
                                                                                <label className="form-check-label" htmlFor="hidup">Hewan Hidup</label>
                                                                            </div>
                                                                            <div className="form-check form-check-inline">
                                                                                <input className="form-check-input" type="radio" onInput={(e) => handleKomKHIDetil(e.target.value)} name="jenisMp" id="produk" value="2" {...registerMP("jenisMp")} />
                                                                                <label className="form-check-label" htmlFor="produk">Produk Hewan</label>
                                                                            </div>
                                                                            <div className="form-check form-check-inline">
                                                                                <input className="form-check-input" type="radio" onInput={(e) => handleKomKHIDetil(e.target.value)} name="jenisMp" id="mpl" value="3" {...registerMP("jenisMp")} />
                                                                                <label className="form-check-label" htmlFor="mpl">Media Pembawa Lain</label>
                                                                            </div>
                                                                        </div>
                                                                        {/* <!-- Ikan --> */}
                                                                        <div style={{display: cekdataMP.mediaPembawa === 'I' ? 'block' : 'none'}}>
                                                                            <div className="form-check form-check-inline">
                                                                                <input className="form-check-input" type="radio" onInput={(e) => handleKomKHIDetil(e.target.value)} name="jenisMp" id="hidup" value="6" {...registerMP("jenisMp", { required: "Mohon pilih jenis media pembawa."})} />
                                                                                <label className="form-check-label" htmlFor="hidup">Ikan Hidup</label>
                                                                            </div>
                                                                            <div className="form-check form-check-inline">
                                                                                <input className="form-check-input" type="radio" onInput={(e) => handleKomKHIDetil(e.target.value)} name="jenisMp" id="produk" value="7" {...registerMP("jenisMp")} />
                                                                                <label className="form-check-label" htmlFor="produk">Produk Ikan</label>
                                                                            </div>
                                                                            <div className="form-check form-check-inline">
                                                                                <input className="form-check-input" type="radio" onInput={(e) => handleKomKHIDetil(e.target.value)} name="jenisMp" id="mpl" value="8" {...registerMP("jenisMp")} />
                                                                                <label className="form-check-label" htmlFor="mpl">Media Pembawa Lain</label>
                                                                            </div>
                                                                        </div>
                                                                        {/* <!-- Tumbuhan --> */}
                                                                        <div style={{display: cekdataMP.mediaPembawa === 'T' ? 'block' : 'none'}}>
                                                                            <div className="form-check form-check-inline">
                                                                                <input className="form-check-input" type="radio" name="jenisMp" id="benih" onInput={(e) => handleKomKHIDetil(e.target.value)} value="4" {...registerMP("jenisMp")} />
                                                                                <label className="form-check-label" htmlFor="benih">Benih</label>
                                                                            </div>
                                                                            <div className="form-check form-check-inline mb-3">
                                                                                <input className="form-check-input" type="radio" name="jenisMp" id="nonbenih" onInput={(e) => handleKomKHIDetil(e.target.value)} value="5" {...registerMP("jenisMp")} />
                                                                                <label className="form-check-label" htmlFor="nonbenih">Non Benih</label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="jenisAngkut" id="curah" value="1" {...registerMP("jenisAngkut", { required: "Mohon pilih apakah komoditas curah atau tidak."})} />
                                                                            <label className="form-check-label" htmlFor="curah">Curah</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="jenisAngkut" id="noncurah" value="0" {...registerMP("jenisAngkut")} />
                                                                            <label className="form-check-label" htmlFor="noncurah">Non Curah</label>
                                                                        </div>
                                                                    </div>
                                                                    {errorsMP.jenisMp && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.jenisMp.message}</small></div>}
                                                                    {errorsMP.jenisAngkut && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.jenisAngkut.message}</small></div>}
                                                                </div>
                                                                {/* <!-- Khusus Tumbuhan --> */}
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-3 col-form-label" htmlFor="peruntukan">Peruntukan</label>
                                                                    <div className="col-sm-4">
                                                                        <select name="peruntukan" id="peruntukan" {...registerMP("peruntukan", { required: cekdataMP.mediaPembawa === "T" ? "Mohon pilih jenis angkut." : false})} className={errorsMP.peruntukan ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                            <option value="">--</option>
                                                                            <option value="1">Ditanam/Budidaya/Peningkatan Mutu Genetik</option>
                                                                            <option value="2">Konsumsi</option>
                                                                            <option value="3">Penelitian</option>
                                                                            <option value="4">Pameran/Kontes</option>
                                                                            <option value="5">Perdagangan</option>
                                                                            <option value="6">Bahan Baku</option>
                                                                            <option value="99">Lainnya</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-sm-5">
                                                                        <div style={{display: cekdataMP.peruntukan === '99' ? 'block' : 'none'}}>
                                                                            <input type="text" id="peruntukanLain" name="peruntukanLain" {...registerMP("peruntukanLain", { required: cekdataMP.peruntukan === "99" ? "Mohon isi peruntukan lain." : false})} className={errorsMP.peruntukanLain ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Peruntukan Lainnya.." />
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
                                                                                {...field} options={cekdataDiri.permohonan != "IM" ? [{value: "99", label: "ID - INDONESIA"}] : dataSelect.negaraAsalMP} onChange={(e) => handleSelectNegKomoditas(e, "negaraAsalMP") & (e.value === '99' ? handleKota(null, "daerahAsalMP") : null)} />
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
                                                                                <Select styles={customStyles} placeholder={"Pilih negara.."} value={{id: cekdataMP.negaraTujuanMP, label: cekdataMP.negaraTujuanMPView}} {...field} options={cekdataDiri.permohonan != "EX" ? [{value: "99", label: "ID - INDONESIA"}] :dataSelect.negaraTujuanMP} onChange={(e) => handleSelectNegKomoditas(e, "negaraTujuanMP") & (e.value === '99' ? handleKota(null, "daerahTujuanMP") : null)} />
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
                                                                                <input className="form-check-input" type="radio" name="tingkatOlah" id="sudah_olah" value="diolah" {...registerMP("tingkatOlah", { required: "Mohon isi peruntukan lain."})} />
                                                                                <label className="form-check-label" htmlFor="sudah_olah">Sudah Diolah</label>
                                                                            </div>
                                                                            <div className="form-check form-check-inline">
                                                                                <input className="form-check-input" type="radio" name="tingkatOlah" id="belum_olah" value="belum" {...registerMP("tingkatOlah")} />
                                                                                <label className="form-check-label" htmlFor="belum_olah">Belum Olah</label>
                                                                            </div>
                                                                            {errorsMP.tingkatOlah && <small className="text-danger">{errorsMP.tingkatOlah.message}</small>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-3 col-form-label" htmlFor="jenisKemasan">Jenis Kemasan</label>
                                                                    <div className="col-sm-5">
                                                                        <select name="jenisKemasan" id="jenisKemasan" onClick={handleKemasan} {...registerMP("jenisKemasan")} className="form-select form-select-sm">
                                                                            <option value="">--</option>
                                                                            {dataSelect.jenisKemasan}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-3 col-form-label" htmlFor="jumlahKemasan">Jumlah Kemasan</label>
                                                                    <div className="col-sm-6">
                                                                        <input type="text" id="jumlahKemasan" name="jumlahKemasan" {...registerMP("jumlahKemasan")} className="form-control form-control-sm" placeholder="Jumlah Kemasan" />
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-3 col-form-label" htmlFor="merkKemasan">Merk Kemasan</label>
                                                                    <div className="col-sm-6">
                                                                        <input type="text" id="merkKemasan" name="merkKemasan" {...registerMP("merkKemasan")} className="form-control form-control-sm" placeholder="Merk Kemasan" />
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-3 col-form-label" htmlFor="tandaKemasan">Tanda pada Kemasan</label>
                                                                    <div className="col-sm-6">
                                                                        <input type="text" id="tandaKemasan" name="tandaKemasan" {...registerMP("tandaKemasan")} className="form-control form-control-sm" placeholder="Tanda Kemasan" />
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-3 col-form-label" htmlFor="nilaiBarang">Nilai Barang</label>
                                                                    <div className="col-sm-9">
                                                                        <div className='row'>
                                                                            <div className="col-4" style={{paddingRight: '2px'}}>
                                                                                <input type="text" className='form-control form-control-sm' value={cekdataMP.nilaiBarang ? addCommas(removeNonNumeric(cekdataMP.nilaiBarang)) : ""} {...registerMP("nilaiBarang")} name='nilaiBarang' id='nilaiBarang' />
                                                                            </div>
                                                                            <div className="col-4" style={{paddingLeft: '2px'}}>
                                                                                <select name="satuanNilai" id="satuanNilai" value={cekdataMP.satuanNilai || "IDR"} className='form-select form-select-sm' {...registerMP("satuanNilai")}>
                                                                                    <option value="">--</option>
                                                                                    {dataSelect.satuanNilai}
                                                                                </select>
                                                                            </div>
                                                                        </div>
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
                                                            <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
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
                                                                    <button type="button" className="btn btn-xs btn-primary" data-bs-toggle={cekdataMP.jenisMp ? "modal" : ""} data-bs-target={cekdataMP.jenisMp ? "#modKomoditas" : ""} onClick={() => cekdataMP.jenisMp ? resetFormKomoditi() : Swal.fire({icon: "error", title: "Mohon Pilih Jenis Media Pembawa!", showConfirmButton: true})}>Tambah Komoditas</button>
                                                                    <button type="button" className="btn btn-xs btn-info float-end"  onClick={dataKomoditiPtk}><i className="menu-icon tf-icons fa-solid fa-sync"></i> Refresh Data</button>
                                                                </div>
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
                                                                                            <td>{data.volume_netto ? data.volume_netto.toLocaleString() : ""}</td>
                                                                                            <td>{data.sat_netto}</td>
                                                                                            <td>{data.volume_bruto ? data.volume_bruto.toLocaleString() : ""}</td>
                                                                                            <td>{data.sat_bruto}</td>
                                                                                            <td>{data.volume_lain ? data.volume_lain.toLocaleString() : ""}</td>
                                                                                            <td>{data.sat_lain}</td>
                                                                                            <td>{data.jantan}</td>
                                                                                            <td>{data.betina}</td>
                                                                                            <td>{data.harga ? data.harga.toLocaleString() : ""}</td>
                                                                                            <td>{data.mata_uang}</td>
                                                                                            <td>
                                                                                                <div className="dropdown">
                                                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                                                                                    </button>
                                                                                                    <div className="dropdown-menu">
                                                                                                        <a className="dropdown-item" type="button" data-ptk={data.ptk_id} data-kemasan={data.jumlah_kemasan} data-kemasansat={data.kemasan_id} data-satuanlain={data.satuan_lain_id} data-kom={data.komoditas_id} data-klas={data.klasifikasi_id} data-header={data.id} data-ket={data.keterangan} onClick={handleEditKomoditas} data-bs-toggle="modal" data-bs-target="#modKomoditas"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</a>
                                                                                                        <a className="dropdown-item" href="#"><i className="fa-solid fa-trash me-1"></i> Delete</a>
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
                                                                <small>*Format penulisan desimal menggunakan titik ( . )</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex justify-content-between">
                                        <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                            <i className="fa-solid fa-chevron-left fa-sm ms-sm-n2"></i>
                                            <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            <span className="d-sm-inline-block d-none me-sm-1">Simpan & Lanjutkan</span>
                                            <i className="fa-solid fa-angle-right fa-sm me-sm-n2"></i>
                                        </button>
                                    </div>
                                    </div>
                                </form>
                            </div>

                            <div id="cardDokumen" className={wizardPage === 4 ? "content active dstepper-block" : "content"}>
                                <div className="row mb-3">
                                    <form onSubmit={handleFormDokPeriksa(onSubmitDokPeriksa)}>
                                        <input type="hidden" name='idPtk' {...registerDokPeriksa("idPtk")} />
                                        <input type="hidden" name='noAju' {...registerDokPeriksa("noAju")} />
                                        <div className="col-sm-12">
                                            <div className="card card-action mb-4">
                                                <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                                    <div className="card-action-title">
                                                        <h5 className="mb-0 text-lightest">Detil Dokumen</h5>
                                                    </div>
                                                    <div className="card-action-element">
                                                        <ul className="list-inline mb-0">
                                                            <li className="list-inline-item">
                                                                <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
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
                                                                        <button type="button" className="btn btn-xs btn-primary" data-bs-toggle={cekdataMP.mediaPembawa ? "modal" : ""} data-bs-target={cekdataMP.mediaPembawa ? "#modDokumen" : ""} onClick={cekdataMP.mediaPembawa ? null : () => {Swal.fire({icon: "error", title: "Mohon pilih media pembawa terlebih dahulu!", showConfirmButton: true})}}>Tambah Dokumen</button>
                                                                        <button type="button" className="btn btn-xs btn-info float-end"  onClick={dataDokumenPtk}><i className="menu-icon tf-icons fa-solid fa-sync"></i> Refresh Data</button>
                                                                    </div>
                                                                    <div className="text-nowrap">
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
                                                                                            <td><a href={"http://localhost/api-barantin/" + data.efile} target='_blank' rel='noreferrer'>[LIHAT FILE]</a></td>
                                                                                            <td>
                                                                                                <div className="dropdown">
                                                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                                                                                    </button>
                                                                                                    <div className="dropdown-menu">
                                                                                                        <a className="dropdown-item" type="button" data-header={data.id} onClick={handleEditDokumen} data-bs-toggle="modal" data-bs-target="#modDokumen"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</a>
                                                                                                        <a className="dropdown-item" href="#"><i className="fa-solid fa-trash me-1"></i> Delete</a>
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
                                                                <a href="#" className="card-collapsible"><i className="tf-icons fa-solid fa-chevron-up"></i></a>
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
                                                                            <input type="text" name='namaTempatPeriksaPtk' id='namaTempatPeriksaPtk' {...registerDokPeriksa("namaTempatPeriksaPtk")} className='form-control form-control-sm' />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <div className="row">
                                                                            <label className="col-sm-4 col-form-label" htmlFor="alamatTempatPeriksaPtk">Alamat Tempat</label>
                                                                            <div className="col-sm-8">
                                                                            <input type="text" name='alamatTempatPeriksaPtk' id='alamatTempatPeriksaPtk' {...registerDokPeriksa("alamatTempatPeriksaPtk")} className='form-control form-control-sm' />
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
                                        <div className="col-12 d-flex justify-content-between">
                                            <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                                <i className="fa-solid fa-chevron-left fa-sm ms-sm-n2"></i>
                                                <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                <span className="d-sm-inline-block d-none me-sm-1">Konfirmasi</span>
                                                <i className="fa-solid fa-angle-right fa-sm me-sm-n2"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div id="cardKonfirmasi" className={wizardPage === 5 ? "content active dstepper-block" : "content"}>
                                <div className="row mb-3">
                                    <div className="col-12 col-lg-8 offset-lg-2 text-center mb-3">
                                        <h4 className="mt-2">Terimakasih! 😇</h4>
                                        <p>Silahkan cek kembali kelengkapan data yang diinput!</p>
                                        <p>
                                            Silahkan klik tombol Simpan jika data yang diinput sudah benar.
                                        </p>
                                    </div>
                                    <form onSubmit={handleFormKonfirmasi(onSubmitKonfirmasi)}>
                                        <input type="hidden" name='idPtk' {...registerKonfirmasi("idPtk")} />
                                        <input type="hidden" name='noAju' {...registerKonfirmasi("noAju")} />
                                        <div className="col-12 d-flex justify-content-between">
                                            <button type="button" className="btn btn-primary btn-prev" onClick={() => setWizardPage(wizardPage - 1)}>
                                                <i className="fa-solid fa-chevron-left fa-sm ms-sm-n2"></i>
                                                <span className="d-sm-inline-block d-none">Cek Kembali</span>
                                            </button>
                                            <button type="submit" className="btn btn-success">
                                                <i className="fa-solid fa-save fa-sm"></i>
                                                <span className="d-sm-inline-block d-none me-sm-1">Simpan & Kirim</span>
                                            </button>
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
                                            <input type="hidden" name="idPtk" {...registerVerify("idPtk")} />
                                            <input type="hidden" name="noAju" {...registerVerify("noAju")} />
                                            <input type="hidden" name="noDokumen" {...registerVerify("noDokumen")} />
                                            <input type="hidden" name="mediaPembawaVerif" {...registerVerify("mediaPembawaVerif")} />
                                            <div className="col-sm-6">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="opsiVerif" id="opsiVerif1" value="1" onClick={() => setValueVerify("alasanTolak", "")} {...registerVerify("opsiVerif", { required: "Mohon pilih verifikasi."})} />
                                                    <label className="form-check-label" htmlFor="opsiVerif1">Setujui PTK</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="opsiVerif" id="opsiVerif2" value="2" onClick={() => setValueVerify("tglTerimaVerif", "") & setValueVerify("petugasVerif", "")} {...registerVerify("opsiVerif")}/>
                                                    <label className="form-check-label" htmlFor="opsiVerif2">Tolak PTK</label>
                                                </div>
                                                {errorsVerify.opsiVerif && <small className="text-danger">{errorsVerify.opsiVerif.message}</small>}
                                            </div>
                                            <br />
                                            <div className="col-sm-4" style={{display: (cekdataVerify.opsiVerif === '2' ? 'block' : 'none')}}>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname">Alasan Tolak</label>
                                                    <textarea name="alasanTolak" id="alasanTolak" rows="2" {...registerVerify("alasanTolak", { required: (cekdataVerify.opsiVerif === '2' ? "Mohon isi alasan tolak." : false)})} className={errorsVerify.alasanTolak ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}></textarea>
                                                </div>
                                                {errorsVerify.alasanTolak && <small className="text-danger">{errorsVerify.alasanTolak.message}</small>}
                                            </div>
                                            <div className="col-sm-4" style={{display: (cekdataVerify.opsiVerif === '1' ? 'block' : 'none')}}>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-default-fullname"><b><u>Tanda Terima Laporan PTK</u></b></label>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-5 col-form-label" htmlFor="tglTerimaVerif">Tgl Terima</label>
                                                        <div className="col-sm-7">
                                                            <input type="datetime-local" id="tglTerimaVerif" name="tglTerimaVerif" {...registerVerify("tglTerimaVerif", { required: (cekdataVerify.opsiVerif === '1' ? "Mohon tanggal terima." : false)})} className={errorsVerify.tglTerimaVerif ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                            {errorsVerify.tglTerimaVerif && <small className="text-danger">{errorsVerify.tglTerimaVerif.message}</small>}
                                                        </div>
                                                        <label className="col-sm-5 col-form-label" htmlFor="petugasVerif">Petugas Penerima</label>
                                                        <div className="col-sm-7">
                                                            <input type="text" id="petugasVerif" name="petugasVerif" {...registerVerify("petugasVerif", { required: (cekdataVerify.opsiVerif === '1' ? "Mohon isi nama petugas verifikasi." : false)})} className={errorsVerify.petugasVerif ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                            {errorsVerify.petugasVerif && <small className="text-danger">{errorsVerify.petugasVerif.message}</small>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-2'>
                                                    <button className='btn btn-dark' type='submit'>Proses PTK</button>
                                                </div>
                                                <div className='col-sm-2'>
                                                    <a className='btn btn-warning pb-1' href={require("../../dok/k11.pdf")} rel="noopener noreferrer" target='_blank'>
                                                        <i className="fa-solid fa-printer fa-sm"></i>
                                                        print
                                                    </a>
                                                </div>
                                                <div className='col-sm-8'>
                                                    <button style={{display: (dataIdPage.noPermohonan ? 'block' : 'none')}} type='button' onClick={() => navigate("/k22")} className='btn btn-info pb-1 float-end'>
                                                    <i className="fa-solid fa-send fa-sm"></i>
                                                        Buat Surat Tugas
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
            <div className="modal-dialog modal-dialog-centered1 modal-simple">
                <div className="modal-content p-1">
                    <div className="modal-body">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div className="text-center mb-4">
                        <h3>Tambah Kontainer Baru</h3>
                        {/* <p>{editKontainer}</p> */}
                    </div>
                    <form className="row" onSubmit={handleFormKontainer(onSubmitKontainer)}>
                            <input type="hidden" name='idDataKontainer' {...registerKontainer("idDataKontainer")} />
                            <input type="hidden" name='idPtk' {...registerKontainer("idPtk")} />
                        <div className="col-6">
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
                        <div className="col-6 col-md-6">
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
                        <div className="col-6 col-md-6">
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
                        <div className="col-6 col-md-6">
                        <label className="form-label" htmlFor="stuffKontainer">Stuff Kontainer</label>
                        <div className="input-group input-group-merge">
                            <select name="stuffKontainer" id="stuffKontainer" {...registerKontainer("stuffKontainer")} className="form-control form-control-sm">
                                <option value="">--</option>
                                <option value="1">FCL</option>
                                <option value="2">LCL</option>
                            </select>
                        </div>
                        </div>
                        <div className="col-6 col-md-6">
                        <label className="form-label" htmlFor="segel">Segel</label>
                        <div className="input-group input-group-merge">
                            <input type="text" className="form-control form-control-sm" name="segel" id="segel" {...registerKontainer("segel")}/>
                        </div>
                        </div>
                        <div className="col-6 text-center mt-4">
                        <button type="submit" className="btn btn-sm btn-primary me-sm-3 me-1">{cekDataKontainer.idDataKontainer ? "Edit" : "Tambah"}</button>
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
                        <h3>{cekdataDokumen.idDataDokumen === '' ? "Tambah Dokumen Baru" : "Edit Dokumen"}</h3>
                    </div>
                    <form className="row" onSubmit={handleFormDokumen(onSubmitDokumen)}>
                            <input type="hidden" name='idDataDokumen' {...registerDokumen("idDataDokumen")} />
                            <input type="hidden" name='idPtk' {...registerDokumen("idPtk")} />
                            <input type="hidden" name='noAju' {...registerDokumen("noAju")} />
                        <div className="col-6">
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
                        <div className="col-6">
                            <label className="form-label" htmlFor="jenisDokumen">Jenis Dokumen <span className='text-danger'>*</span></label>
                            <Controller
                                control={controlDokumen}
                                name={"jenisDokumen"}
                                defaultValue={""}
                                className="form-control form-control-sm"
                                rules={{ required: "Mohon pilih jenis dokumen." }}
                                render={({ field: { value,onChange, ...field } }) => (
                                    <Select styles={customStyles} placeholder={"Pilih jenis dokumen.."} value={{id: cekdataDokumen.jenisDokumen, label: cekdataDokumen.jenisDokumenView}} {...field} options={handleJenisDokumen(cekdataMP.mediaPembawa)} onChange={(e) => setValueDokumen("jenisDokumen", e.value) & setValueDokumen("jenisDokumenView", e.label)} />
                                )}
                            />
                            {errorsDokumen.jenisDokumen && <small className="text-danger">{errorsDokumen.jenisDokumen.message}</small>}
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="noDokumen">No Dokumen <span className='text-danger'>*</span></label>
                            <div className="input-group input-group-merge">
                                <input type='text' name="noDokumen" id="noDokumen" placeholder='No Dokumen..' {...registerDokumen("noDokumen", { required: "Mohon isi nomor dokumen."})} className={errorsDokumen.noDokumen ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                            </div>
                            {errorsDokumen.noDokumen && <small className="text-danger">{errorsDokumen.noDokumen.message}</small>}
                        </div>
                        <div className="col-6">
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
                        <div className="col-6">
                            <label className="form-label" htmlFor="tglDokumen">Tgl Dokumen <span className='text-danger'>*</span></label>
                            <div className="input-group input-group-merge">
                                <input type='date' name="tglDokumen" id="tglDokumen" {...registerDokumen("tglDokumen", { required: "Mohon isi tanggal dokumen."})} className={errorsDokumen.tglDokumen ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                            </div>
                            {errorsDokumen.tglDokumen && <small className="text-danger">{errorsDokumen.tglDokumen.message}</small>}
                        </div>
                        <div className="col-6" style={{visibility: (cekdataDokumen.negaraAsalDokumen == 99 ? 'visible' : 'hidden')}}>
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
                        <div className="col-6">
                            <label className="form-label" htmlFor="ketDokumen">Keterangan</label>
                            <div className="input-group input-group-merge">
                                <input type='text' name="ketDokumen" id="ketDokumen" placeholder='Keterangan..' {...registerDokumen("ketDokumen")} className="form-control form-control-sm" />
                            </div>
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="fileDokumen">Upload <span className='text-danger'>*</span></label>
                            <div className="input-group input-group-merge">
                                <input type="hidden" name='fileDokumen' {...registerDokumen("fileDokumen", {required: "Mohon upload dokumen persyaratan yang sesuai."})} />
                                <input type='file' name="fileDokumenUpload" id="fileDokumenUpload" value={dataIdPage.fileDokumenUpload || ""} onChange={handleBase64Upload} className="form-control form-control-sm" />
                            </div>
                            {errorsDokumen.fileDokumen && <small className="text-danger">{errorsDokumen.fileDokumen.message}</small>}
                        </div>
                        <div className="col-6 text-center mt-4">
                            <button type="submit" className="btn btn-sm btn-primary me-sm-3 me-1">{cekdataDokumen.idDataDokumen === '' ? "Tambah" : "Edit"}</button>
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
        <div className="modal fade" id="modKomoditas" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-simple">
                <div className="modal-content p-3 pb-1">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="text-center mb-4">
                            <h3 className="address-title">{cekdataDetilMP.idDetilMP ? "Edit" : "Tambah"} Media Pembawa {cekdataMP.mediaPembawa === 'H' ? 'Hewan' : (cekdataMP.mediaPembawa === 'I' ? 'Ikan' : 'Tumbuhan')}</h3>
                        </div>
                        <form onSubmit={handleFormDetilMP(onSubmitDetilMP)} className="row g-3">
                        <input type="hidden" name='idDetilMP' {...registerDetilMP("idDetilMP")} />
                        <input type="hidden" name='idPtk' {...registerDetilMP("idPtk")} />
                        {/* <input type="hidden" name='jenisKar' {...registerDetilMP("jenisKar")} /> */}
                        {cekdataMP.mediaPembawa === 'T' ?
                        <>
                            <div className="col-6">
                                <label className="form-label" htmlFor="peruntukanMP">Klasifikasi</label>
                                <Controller
                                    control={controlDetilMP}
                                    name={"peruntukanMP"}
                                    defaultValue={""}
                                    className="form-control form-control-sm"
                                    rules={{ required: false }}
                                    render={({ field: { value,onChange, ...field } }) => (
                                        <Select styles={customStyles} placeholder={"Pilih klasifikasi tumbuhan.."} value={{id: cekdataDetilMP.peruntukanMP, label: cekdataDetilMP.peruntukanMPView}} {...field} onChange={(e) => setValueDetilMP("peruntukanMP", e.value) & setValueDetilMP("peruntukanMPView", e.label)} options={dataSelect.peruntukanMP} />
                                    )}
                                />
                                {cekdataDetilMP.peruntukanMP}
                                <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah klasifikasi" : null}</small>
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeNetto">Volume Netto<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" name='volumeNetto' id='volumeNetto' value={cekdataDetilMP.volumeNetto ? addCommas(removeNonNumeric(cekdataDetilMP.volumeNetto)) : ""} {...registerDetilMP("volumeNetto", {required: "Mohon isi volume netto."})} className={errorsDetilMP.volumeNetto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-7" style={{paddingLeft: '2px'}}>
                                        <input type="hidden" name='satuanNetto' id='satuanNetto' {...registerDetilMP("satuanNetto")} value="1356" />
                                        <input type="text" className='form-control form-control-sm' value='KILOGRAM' readOnly />
                                        {/* <select name="satuanNetto" id="satuanNetto" onClick={handleMasterSatuan} data-kar={cekdataMP.mediaPembawa === 'T' ? 'kt' : (cekdataMP.mediaPembawa === 'H' ? 'kh' : 'ki')} {...registerDetilMP("satuanNetto", {required: "Mohon isi satuan netto."})} className={errorsKontainer.satuanNetto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                            <option value="">--</option>
                                            {dataSelect.satuanNetto}
                                        </select> */}
                                    </div>
                                </div>
                                {errorsDetilMP.volumeNetto && <small className="text-danger">{errorsDetilMP.volumeNetto.message}</small>}
                                {errorsDetilMP.satuanNetto && <small className="text-danger">{errorsDetilMP.satuanNetto.message}</small>}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="komoditasMP">Komoditas<span className='text-danger'>*</span></label>
                                <input type="hidden" name="komoditasMP" id="komoditasMP" {...registerDetilMP("komoditasMP", {required: "Mohon isi Komoditas."})} />
                                <Controller
                                    control={controlDetilMP}
                                    name={"selectKomoditasMP"}
                                    defaultValue={""}
                                    className="form-control form-control-sm"
                                    rules={{ required: false }}
                                    render={({ field: { value,onChange, ...field } }) => (
                                        <Select styles={customStyles} placeholder={"Pilih komoditas.."} value={{id: cekdataDetilMP.selectKomoditasMP, label: cekdataDetilMP.selectKomoditasMPView}} onChange={(e) => setValueDetilMP("selectKomoditasMP", e.value) & setValueDetilMP("selectKomoditasMPView", e.label) & handleSetKomoditasSelect(e)} {...field} options={masterKomKT()} />
                                    )}
                                />
                                <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah komoditas" : null}</small>
                                {errorsDetilMP.komoditasMP && <small className="text-danger">{errorsDetilMP.komoditasMP.message}</small>}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeBrutto">Volume Brutto</label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" value={cekdataDetilMP.volumeBrutto ? addCommas(removeNonNumeric(cekdataDetilMP.volumeBrutto)) : ""} {...registerDetilMP("volumeBrutto", {required: "Mohon isi volume brutto."})} className={errorsDetilMP.volumeBrutto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name='volumeBrutto' id='volumeBrutto' />
                                    </div>
                                    <div className="col-7" style={{paddingLeft: '2px'}}>
                                        <input type="hidden" name='satuanBrutto' id='satuanBrutto' {...registerDetilMP("satuanBrutto")} value="1356" />
                                        <input type="text" className='form-control form-control-sm' value='KILOGRAM' readOnly />
                                        {/* <select name="satuanBrutto" id="satuanBrutto" data-kar={cekdataMP.mediaPembawa === 'T' ? 'kt' : (cekdataMP.mediaPembawa === 'H' ? 'kh' : 'ki')} onClick={handleMasterSatuan} {...registerDetilMP("satuanBrutto", {required: "Mohon isi satuan brutto."})} className={errorsDetilMP.satuanBrutto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                            <option value="">--</option>
                                            {dataSelect.satuanBrutto}
                                        </select> */}
                                    </div>
                                </div>
                                {errorsDetilMP.volumeBrutto && <small className="text-danger">{errorsDetilMP.volumeBrutto.message}</small>}
                                {errorsDetilMP.satuanBrutto && <small className="text-danger">{errorsDetilMP.satuanBrutto.message}</small>}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="kodeHSMp">Kode HS</label>
                                <Controller
                                    control={controlDetilMP}
                                    name={"kodeHSMp"}
                                    defaultValue={""}
                                    className="form-control form-control-sm"
                                    rules={{ required: false }}
                                    render={({ field: { value,onChange, ...field } }) => (
                                        <Select styles={customStyles} placeholder={"Pilih kode HS.."} value={{id: cekdataDetilMP.kodeHSMp, label: cekdataDetilMP.kodeHSMpView}} onChange={(e) => setValueDetilMP("kodeHSMp", e.value) & setValueDetilMP("kodeHSMpView", e.label)} {...field} options={dataSelect.kodeHSMp} />
                                    )}
                                />
                                <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah kode HS" : null}</small>
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeLain">Volume Lain</label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='volumeLain' id='volumeLain' value={cekdataDetilMP.volumeLain ? addCommas(removeNonNumeric(cekdataDetilMP.volumeLain)) : ""} {...registerDetilMP("volumeLain")} />
                                    </div>
                                    <div className="col-7" style={{paddingLeft: '2px'}}>
                                        <Controller
                                            control={controlDetilMP}
                                            name={"satuanLain"}
                                            defaultValue={""}
                                            className="form-control form-control-sm"
                                            rules={{ required: "Mohon isi satuan volume." }}
                                            render={({ field: { value,onChange, ...field } }) => (
                                                <Select styles={customStyles} placeholder={"Pilih Satuan.."} value={{id: cekdataDetilMP.satuanLain, label: cekdataDetilMP.satuanLainView}} onChange={(e) => setValueDetilMP("satuanLain", e.value) & setValueDetilMP("satuanLainView", e.label)} {...field} options={masterSatuanJson(cekdataMP.mediaPembawa)} />
                                                )}
                                        />
                                        {errorsDetilMP.satuanLain && <small className="text-danger">{errorsDetilMP.satuanLain.message}</small>}
                                        {/* <select name="satuanLain" id="satuanLain" data-kar={cekdataMP.mediaPembawa === 'T' ? 'kt' : (cekdataMP.mediaPembawa === 'H' ? 'kh' : 'ki')} onClick={handleMasterSatuan} className='form-control form-control-sm' {...registerDetilMP("satuanLain")}>
                                            <option value="">--</option>
                                            {dataSelect.satuanLain}
                                        </select> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaUmum">Nama Umum</label>
                                <input type='text' name="namaUmum" id="namaUmum" {...registerDetilMP("namaUmum")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="nilaiBarangMP">Nilai Barang</label>
                                <div className='row'>
                                    <div className="col-7" style={{paddingRight: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' value={cekdataDetilMP.nilaiBarangMP ? addCommas(removeNonNumeric(cekdataDetilMP.nilaiBarangMP)) : ""} {...registerDetilMP("nilaiBarangMP")} name='nilaiBarangMP' id='nilaiBarangMP' />
                                    </div>
                                    <div className="col-5" style={{paddingLeft: '2px'}}>
                                        <select name="satuanNilaiMP" id="satuanNilaiMP" value={cekdataDetilMP.satuanNilaiMP || "IDR"} className='form-control form-control-sm' {...registerDetilMP("satuanNilaiMP")}>
                                            <option value="">--</option>
                                            {dataSelect.satuanNilai}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaLatin">Nama Latin</label>
                                <input type='text' name="namaLatin" id="namaLatin" {...registerDetilMP("namaLatin")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                            <label className="form-label" htmlFor="jumlahKemasanDetil">Jumlah Kemasan</label>
                                <div className='row'>
                                <div className='col-4' style={{paddingRight: '2px'}}>
                                    <input type="number" className='form-control form-control-sm' {...registerDetilMP("jumlahKemasanDetil")} name='jumlahKemasanDetil' id='jumlahKemasanDetil' />
                                </div>
                                <div className='col-8' style={{paddingLeft: '2px'}}>
                                    <select name="satuanKemasanDetil" id="satuanKemasanDetil" {...registerDetilMP("satuanKemasanDetil")} onClick={handleKemasan} className="form-control form-control-sm">
                                        <option value="">--</option>
                                        {dataSelect.satuanKemasanDetil}
                                    </select>
                                </div>
                                </div>
                            </div>
                        </> : (cekdataMP.mediaPembawa === 'H' ?
                        <>
                            <div className="col-6">
                                <label className="form-label" htmlFor="komoditasMPKH">Komoditas<span className='text-danger'>*</span></label>
                                <input type="hidden" name='komoditasMPKHid' {...registerDetilMP("komoditasMPKHid")} />
                                <input type="hidden" name='klasifikasiMPKHid' {...registerDetilMP("klasifikasiMPKHid")} />
                                <Controller
                                    control={controlDetilMP}
                                    name={"komoditasMPKH"}
                                    defaultValue={""}
                                    className="form-control form-control-sm"
                                    rules={{ required: false }}
                                    render={({ field: { value,onChange, ...field } }) => (
                                        <Select placeholder= 'Pilih Komoditas..' styles={customStyles}
                                         value={{id: cekdataDetilMP.komoditasMPKH, label: cekdataDetilMP.komoditasMPKHView}} onChange={(e) => setValueDetilMP("komoditasMPKH", e.value) & setValueDetilMP("komoditasMPKHView", e.label) & handleSetKomoditasSelect(e)} {...field} options={dataSelect.komoditasMPKH} />
                                    )}
                                />
                                <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah komoditas" : null}</small>
                                {/* <select name="komoditasMP" id="komoditasMP" data-gol={cekdataMP.jenisMp} onClick={handleKomoditasKH} {...registerDetilMP("komoditasMP", {required: "Mohon isi Komoditas."})} className={errorsDetilMP.komoditasMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} >
                                        <option value="">--</option>
                                        {dataSelect.komoditasMP}
                                </select> */}
                                {errorsDetilMP.komoditasMPKH && <small className="text-danger">{errorsDetilMP.komoditasMPKH.message}</small>}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="kodeHSMpKH">Kode HS</label>
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
                                <small className='text-danger'>{cekdataDetilMP.idDetilMP ? "*Tidak perlu dipilih ulang jika tidak ubah kode HS" : null}</small>
                                {/* <select name="kodeHSMp" id="kodeHSMp" data-kar={cekdataMP.mediaPembawa} className="form-control form-control-sm" {...registerDetilMP("kodeHSMp")} onClick={handleMasterHS}>
                                <option value="">--</option>
                                {dataSelect.kodeHSMp}
                                </select> */}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaUmumKH">Nama Umum</label>
                                <input type='text' name="namaUmumKH" id="namaUmumKH" {...registerDetilMP("namaUmumKH")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaLatinKH">Nama Latin</label>
                                <input type='text' name="namaLatinKH" id="namaLatinKH" {...registerDetilMP("namaLatinKH")} className="form-control form-control-sm" />
                            </div>
                           <div className="col-6">
                                <label className="form-label" htmlFor="jumlahMP">Jumlah</label>
                                <div className='row'>
                                <div className='col-7' style={{paddingRight: '2px'}}>
                                    <input type="text" value={cekdataDetilMP.jumlahMP ? addCommas(removeNonNumeric(cekdataDetilMP.jumlahMP)) : ""} {...registerDetilMP("jumlahMP", {required: "Mohon isi satuan brutto."})} className={errorsDetilMP.jumlahMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name='jumlahMP' id='jumlahMP' />
                                </div>
                                <div className='col-5' style={{paddingLeft: '2px'}}>
                                    <Controller
                                        control={controlDetilMP}
                                        name={"satJumlahMP"}
                                        defaultValue={""}
                                        className="form-control form-control-sm"
                                        rules={{ required: "Mohon isi saatuan volume." }}
                                        render={({ field: { value,onChange, ...field } }) => (
                                            <Select styles={customStyles} placeholder={"Pilih Satuan.."} value={{id: cekdataDetilMP.satJumlahMP, label: cekdataDetilMP.satJumlahMPView}} onChange={(e) => setValueDetilMP("satJumlahMP", e.value) & setValueDetilMP("satJumlahMPView", e.label)} {...field} options={masterSatuanJson(cekdataMP.mediaPembawa)} />
                                        )}
                                    />
                                    {errorsDetilMP.satJumlahMP && <small className="text-danger">{errorsDetilMP.satJumlahMP.message}</small>}
                                    {/* <select name="satJumlahMP" id="satJumlahMP" data-kar={cekdataMP.mediaPembawa === 'T' ? 'kt' : (cekdataMP.mediaPembawa === 'H' ? 'kh' : 'ki')} onClick={handleMasterSatuan} {...registerDetilMP("satJumlahMP")} className="form-control form-control-sm">
                                    <option value="">--</option>
                                        {dataSelect.satJumlahMP}
                                    </select> */}
                                </div>
                                </div>
                            </div>
                            <div className="col-6" style={{visibility: (cekdataMP.jenisMp === '1' ? "visible" : "hidden")}}>
                                <label className="form-label" htmlFor="breedMP">Breed</label>
                                <input type='text' name="breedMP" id="breedMP" {...registerDetilMP("breedMP")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="nettoMP">Netto</label>
                                <div className='row'>
                                <div className='col-7' style={{paddingRight: '2px'}}>
                                    <input type="text" className='form-control form-control-sm' value={cekdataDetilMP.nettoMP ? addCommas(removeNonNumeric(cekdataDetilMP.nettoMP)) : ""} {...registerDetilMP("nettoMP")} name='nettoMP' id='nettoMP' />
                                </div>
                                {/* ekor: 1122 || KG: 1356  */}
                                <div className='col-5' style={{paddingLeft: '2px'}}>
                                    {/* <input type="hidden" name='satNettoMP' id='satNettoMP' {...registerDetilMP("satNettoMP")} value={cekdataMP.jenisMp === '1' || cekdataMP.jenisMp === '6' ? '1122' : '1356'} />
                                    <input type="text" className='form-control form-control-sm' value={cekdataMP.jenisMp === '1' || cekdataMP.jenisMp === '6' ? 'EKOR' : 'KILOGRAM'} readOnly /> */}
                                    <input type="hidden" name='satNettoMP' id='satNettoMP' {...registerDetilMP("satNettoMP")} value="1356" />
                                    <input type="text" className='form-control form-control-sm' value='KILOGRAM' readOnly />
                                </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="nilaiBarangMPKH">Nilai Barang</label>
                                <div className='row'>
                                    <div className="col-7" style={{paddingRight: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' value={cekdataDetilMP.nilaiBarangMPKH ? addCommas(removeNonNumeric(cekdataDetilMP.nilaiBarangMPKH)) : ""} name='nilaiBarangMPKH' id='nilaiBarangMPKH' {...registerDetilMP("nilaiBarangMPKH")} />
                                    </div>
                                    <div className="col-5" style={{paddingLeft: '2px'}}>
                                        <select name="satuanNilaiMPKH" id="satuanNilaiMPKH" value={cekdataDetilMP.satuanNilaiMPKH || "IDR"} {...registerDetilMP("satuanNilaiMPKH")} className='form-control form-control-sm'>
                                        <option value="">--</option>
                                            {dataSelect.satuanNilai}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="brutoMP">Bruto</label>
                                <div className='row'>
                                <div className='col-7' style={{paddingRight: '2px'}}>
                                    <input type="text" value={cekdataDetilMP.brutoMP ? addCommas(removeNonNumeric(cekdataDetilMP.brutoMP)) : ""} {...registerDetilMP("brutoMP")} className='form-control form-control-sm' name='brutoMP' id='brutoMP' />
                                </div>
                                {/* ekor: 1122 || KG: 1356  */}
                                <div className='col-5' style={{paddingLeft: '2px'}}>
                                    {/* <input type="hidden" name='satBrutoMP' id='satBrutoMP' {...registerDetilMP("satBrutoMP")} value={cekdataMP.jenisMp === '1' || cekdataMP.jenisMp === '6' ? '1122' : '1356'} /> */}
                                    {/* <input type="text" className='form-control form-control-sm' value={cekdataMP.jenisMp === '1' || cekdataMP.jenisMp === '6' ? 'EKOR' : 'KILOGRAM'} readOnly  /> */}
                                    <input type="hidden" name='satBrutoMP' id='satBrutoMP' {...registerDetilMP("satBrutoMP")} value="1356" />
                                    <input type="text" className='form-control form-control-sm' value="KILOGRAM" readOnly  />
                                </div>
                                </div>
                            </div>
                            <div className="col-6" style={{display: (cekdataMP.jenisMp === '1' ? "block" : "none")}}>
                                <div className='row'>
                                    <div className="col-4">
                                        <label className="form-label" htmlFor="jantan">Jantan (Ekor)</label>
                                        <input type="text" id="jantan" name="jantan" value={cekdataDetilMP.jantan ? addCommas(removeNonNumeric(cekdataDetilMP.jantan)) : ""} {...registerDetilMP("jantan")} className='form-control form-control-sm' />
                                        </div>
                                    <div className="col-4">
                                        <label className="form-label" htmlFor="betina">Betina (Ekor)</label>
                                        <input type="text" name='betina' id='betina' value={cekdataDetilMP.betina ? addCommas(removeNonNumeric(cekdataDetilMP.betina)) : ""} {...registerDetilMP("betina")} className='form-control form-control-sm' />
                                    </div>
                                </div>
                            </div>
                        </> : <p>Komoditas Ikan</p>)
                        }
                        <small className='text-danger'>*Format penulisan desimal menggunakan titik ( . )</small>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary me-sm-3 me-1">{cekdataDetilMP.idDetilMP ? "Edit" : "Tambah"}</button>
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