import React, { useEffect, useState } from 'react'
import PersonSvg from '../../logo/svg/PersonSvg'
import ShipSvg from '../../logo/svg/ShipSvg'
import PackageSvg from '../../logo/svg/PackageSvg'
import DokumenSvg from '../../logo/svg/DokumenSvg'
import ConfirmSvg from '../../logo/svg/ConfirmSvg'
import MasterNegara from '../../model/master/MasterNegara'
import MasterKota from '../../model/master/MasterKota'
import MasterPelabuhan from '../../model/master/MasterPelabuhan'
import MasterKemasan from '../../model/master/MasterKemasan'
import MasterMataUang from '../../model/master/MasterMataUang'
import MasterKlasKT from '../../model/master/MasterKlasKT'
import MasterKomKT from '../../model/master/MasterKomKT'
import MasterSatuan from '../../model/master/MasterSatuan'
import MasterHS from '../../model/master/MasterHS'
import { Controller, useForm } from 'react-hook-form'
// import { motion } from "framer-motion";
import MasterProv from '../../model/master/MasterProv'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import PtkModel from '../../model/PtkModel'
import { useNavigate, useParams } from 'react-router-dom'
import MasterKomKH from '../../model/master/MasterKomKH'
import MasterDokumen from '../../model/master/MasterDokumen'
import moment from 'moment/moment'
// import $ from 'jquery';

function DocK11() {
    let navigate = useNavigate();
    const { idPtk } = useParams()
    let [dataIdPage, setDataIdPage] = useState({});
    useEffect(()=>{
        let ptkDecode = idPtk ? base64_decode(idPtk) : "";
        let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
        setDataIdPage(values => ({...values,
            noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
            noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
            noPermohonan: idPtk ? base64_decode(ptkNomor[2]) : "",
        }));
    },[idPtk])
    // console.log(dataIdPage.noIdPtk)

    // let noAju = idPtk ? base64_decode(ptkNomor[0]) : "";
    // let noIdPtk = idPtk ? base64_decode(ptkNomor[1]) : "";
    // let noPermohonan = idPtk ? base64_decode(ptkNomor[2]) : "";
    // console.log(noIdPtk)

    const [selectedFile, setSelectedFile] = useState(null);

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    function idptkexist() {
        return dataIdPage.noIdPtk;
    }

    // console.log(idptkexist())

    function dateNow() {
        let n = date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate()) + ' ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds());
        return n;
    }
    
    let [dataSelect, setdataSelect] = useState({});
    
    function handlePermohonan(e) {
        if(e.target.value === 'EX') {
            setValuePemohon("negaraPengirim", "99");
            setValuePemohon("negaraPenerima", "");
            setValuePelabuhan("negaraAsal", "99");
            setValuePelabuhan("negaraTujuan", "");
            setValueMP("negaraAsalMP", "99");
            setValueMP("negaraTujuanMP", "");
        } else if(e.target.value === 'IM') {
            setValuePemohon("negaraPenerima", "99");
            setValuePemohon("negaraPengirim", "");
            setValuePelabuhan("negaraAsal", "");
            setValuePelabuhan("negaraTujuan", "99");
            setValueMP("negaraAsalMP", "");
            setValueMP("negaraTujuanMP", "99");
        } else {
            setValuePemohon("negaraPenerima", "99");
            setValuePemohon("negaraPengirim", "99");
            setValuePelabuhan("negaraAsal", "99");
            setValuePelabuhan("negaraTujuan", "99");
            setValueMP("negaraAsalMP", "99");
            setValueMP("negaraTujuanMP", "99");
        }
        // setdataSelect(values => ({...values, [e.target.name]: <MasterKlasKT gol={e.target.dataset.gol}/>}))
    }
    
    function handlePeruntukanKT(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterKlasKT gol={e.target.dataset.gol}/>}))
    }
    
    function handleSetKomoditasSelect(e) {
        const dataKomKT = e.target.value;
        const dataPisahKT = dataKomKT.split(";");
        setValueDetilMP("komoditasMP", dataPisahKT[0])
        setValueDetilMP("namaUmum", dataPisahKT[1])
        setValueDetilMP("namaLatin", dataPisahKT[2])
    }
    

    function handleNegara(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterNegara/>}))
    }
    
    function handleJenisDokumen(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterDokumen kar={e.target.dataset.kar}/>}))
    }
    
    function handleKemasan(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterKemasan/>}))
    }
    
    function handleMasterSatuan(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterSatuan kar={e.target.dataset.kar} />}))
    }
    
    function handleMasterHS(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterHS kar={e.target.dataset.kar} />}))
    }
    
    function handleProv(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterProv/>}))
    }
    
    function handleBase64Upload(e) {
        let fileReader = new FileReader();
        let files = e.target.files;
      fileReader.readAsDataURL(files[0]);
 
      fileReader.onload = (event) => {
        setValueDokumen("fileDokumen", event.target.result);
        // console.log(event.target.result);
      }
    //   console.log(cekdataDokumen.fileDokumen)
    }
    
    function handleMataUang(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterMataUang/>}))
    }
    
    function handleKota(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterKota iddata={e.target.dataset.input}/>}))
    }
    
    function handlePelabuhan(e) {
        let dataId = null; 
        if(e.target.dataset.input) {
            dataId = e.target.dataset.input;
        } else {
            dataId = null;
        }
        setdataSelect(values => ({...values, [e.target.name]: <MasterPelabuhan iddata={dataId}/>}))
    }
    
    function handleKomoditasKT(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterKomKT />}))
    }
    
    function handleKomoditasKH(e) {
        setdataSelect(values => ({...values, [e.target.name]: <MasterKomKH gol={e.target.dataset.gol} />}))
    }
    
    let [formTab, setFormTab] = useState({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        // tab1: true,
        // tab2: true,
        // tab3: true,
        // tab4: true,
    });
    let [komoditas, setKomoditas] = useState({});
    let [komMP, setKomMP] = useState({});
    let [arrKontainer, setArrKontainer] = useState([]);
    let [kontainer, setKontainer] = useState({
        noKontainer: "",
        tipeKontainer: "",
        ukuranKontainer: "",
        stuffKontainer: "",
        segel: ""
    });

    const {
		register: registerPemohon,
        setValue: setValuePemohon,
        watch: watchPemohon,
		handleSubmit: handleFormPemohon,
        formState: { errors: errorsPemohon },
	} = useForm()
    
    const {
        register: registerPelabuhan,
        setValue: setValuePelabuhan,
        watch: watchPelabuhan,
		handleSubmit: handleFormPelabuhan,
        formState: { errors: errorsPelabuhan },
	} = useForm()
	
    const {
		register: registerKontainer,
        setValue: setValueKontainer,
		handleSubmit: handleFormKontainer,
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
    
    const {
		register: registerMP,
        watch: watchMP,
        setValue: setValueMP,
        handleSubmit: handleFormMP,
        formState: { errors: errorsMP },
	} = useForm()
    
    const {
        register: registerDetilMP,
        setValue: setValueDetilMP,
        handleSubmit: handleFormDetilMP,
        reset: resetFormKomoditi,
        formState: { errors: errorsDetilMP },
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
        // setValue: setValueDokumen,
        watch: watchKonfirmasi,
        handleSubmit: handleFormKonfirmasi,
        // formState: { errors: errorsDokumen },
    } = useForm()
    
    const cekdataDiri = watchPemohon()
    const cekdataPelabuhan = watchPelabuhan()
    const cekdataMP = watchMP()
    const cekdataDokumen = watchDokumen()
    const cekdataKonfirmasi = watchKonfirmasi()
  
    // const onSubmitMP = (data) => {
    //     setWizardPage(wizardPage + 1)
    //     setFormTab(values => ({...values, tab1: false}))
    //     console.log(data)
    // };
    // console.log(cekdataDokumen.datenow)
    
    const onSubmitDokumen = (data) => {
        setValueDokumen("idPtk", idptkexist)
        setValueDokumen("datenow", dateNow)
        // console.log(data.fileDokumen)
        const modelPemohon = new PtkModel();

        const response = modelPemohon.pushDetilDokumen(data);
            response
            .then((response) => {
                // console.log(response.data)
                alert(response.data.status + " - " + response.data.message)
                
                // setFormTab(values => ({...values, tab4: false}))
                // setWizardPage(wizardPage + 1)
                if(response.data.status === '201') {
                    resetFormDokumen()
                    setSelectedFile(null)
                    dataDokumenPtk();
                }
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    const onSubmitDetilMP = (data) => {
        setValueDetilMP("idPtk", idptkexist)
        setValueDetilMP("datenow", dateNow)
        const modelPemohon = new PtkModel();

        const response = modelPemohon.pushKomoditi(data);
            response
            .then((response) => {
                // console.log(response.data)
                alert(response.data.status + " - " + response.data.message)
                // setFormTab(values => ({...values, tab4: false}))
                // setWizardPage(wizardPage + 1)
                if(response.data.status === '201') {
                    resetFormKomoditi();
                    dataKomoditiPtk();
                }
            })
            .catch((error) => {
                console.log(error.response);
            });
        // console.log(data);
        // setValueKontainer("noKontainer", "");
        // setValueKontainer("tipeKontainer", "");
        // setValueKontainer("ukuranKontainer", "");
        // setValueKontainer("stuffKontainer", "");
        // setValueKontainer("segel", "");
    };
    const date = new Date();
    function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
    }
      console.count()

   const onSubmitPemohon = (data) => {
    const modelPemohon = new PtkModel();

        if(idPtk) {
            const response = modelPemohon.tabPemohonUpdate(data);
            response
            .then((response) => {
                console.log(response.data)
                alert(response.data.status + " - " + response.data.message)
                setFormTab(values => ({...values, tab2: false}))
                setWizardPage(wizardPage + 1)
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });
        } else {
            const response = modelPemohon.tabPemohonInsert(data);
            response
            .then((response) => {
                console.log(response)
                alert(response.data.status + " - " + response.data.message)
                response.data.status === '201' ? navigate('/k11/' + base64_encode(base64_encode(response.data.data.no_aju) + 'm0R3N0r1R' + base64_encode(response.data.data.id) + "m0R3N0r1R")) : alert(response.data.message)
                setDataIdPage(values => ({...values,
                    noAju: response.data.data.no_aju,
                    noIdPtk: response.data.data.id,
                    noPermohonan: "",
                }));
                setFormTab(values => ({...values, tab2: false}))
                setWizardPage(wizardPage + 1)
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });
        }
    };

    const iddataaa = base64_encode(base64_encode("0100EX1704689579488124010G1C7") + 'm0R3N0r1R' + base64_encode("bbd50300-df02-4870-829b-9c10da4e8b28") + "m0R3N0r1R");
    console.log(iddataaa)

    const onSubmitPelabuhan = (data) => {
        // setValuePelabuhan("idPtk", noIdPtk)
        const modelPemohon = new PtkModel();

        if(idPtk) {
            const response = modelPemohon.tabPelabuhan(data);
            response
            .then((response) => {
                console.log(response)
                alert(response.data.status + " - " + response.data.message)
                setFormTab(values => ({...values, tab3: false}))
                setWizardPage(wizardPage + 1)
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });
        } else {
            alert('Data id kosong')
        }
    };
    
    const onSubmitKomoditas = (data) => {
        const modelPemohon = new PtkModel();

        if(idPtk) {
            const response = modelPemohon.tabKomoditas(data);
            response
            .then((response) => {
                console.log(response.data)
                alert(response.data.status + " - " + response.data.message)
                setFormTab(values => ({...values, tab4: false}))
                setWizardPage(wizardPage + 1)
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });
        } else {
            alert('Data id kosong')
        }
    };
    
    const onSubmitKonfirmasi = (data) => {
        const modelPemohon = new PtkModel();

        if(idPtk) {
            const response = modelPemohon.tabKonfirmasi(data);
            response
            .then((response) => {
                console.log(response.data)
                alert(response.data.status + " - " + response.data.message)
                // setFormTab(values => ({...values, tab4: false}))
                // setWizardPage(wizardPage + 1)
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });
        } else {
            alert('Data id kosong')
        }
    };
    
      const onSubmitKontainer = (data) => {
        // setValueKontainer("idPtk", noIdPtk);
        const modelPemohon = new PtkModel();

        const response = modelPemohon.pushDetilKontainer(data);
            response
            .then((response) => {
                // console.log(response.data)
                alert(response.data.status + " - " + response.data.message)
                // setFormTab(values => ({...values, tab4: false}))
                // setWizardPage(wizardPage + 1)
                if(response.data.status === '201') {
                    resetFormKontainer();
                    dataKontainerPtk();
                }
            })
            .catch((error) => {
                console.log(error.response);
                alert(error.response.status + " - " + error.response.data.message)
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
            setValuePemohon("kotaPengirim", (cekdataDiri.permohonan === 'IM' ? "" : cekdataDiri.kotaPemohon));
        } else {
            setValuePemohon("namaPengirim", "");
            setValuePemohon("alamatPengirim", "");
            setValuePemohon("jenisIdentitasPengirim", "");
            setValuePemohon("noIdentitasPengirim", "");
            setValuePemohon("nomorTlpPengirim", "");
            setValuePemohon("negaraPengirim", "");
            setValuePemohon("provPengirim", "");
            setValuePemohon("kotaPengirim", "");
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
            setValuePemohon("kotaPenerima", (cekdataDiri.permohonan === 'EX' ? "" : cekdataDiri.kotaPemohon));
        } else {
            setValuePemohon("namaPenerima", "");
            setValuePemohon("alamatPenerima", "");
            setValuePemohon("jenisIdentitasPenerima", "");
            setValuePemohon("noIdentitasPenerima", "");
            setValuePemohon("nomorTlpPenerima", "");
            setValuePemohon("negaraPenerima", "");
            setValuePemohon("provPenerima", "");
            setValuePemohon("kotaPenerima", "");
        }
    }

    const handleKomMP = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setKomMP(values => ({...values, [name]: value}))
    }
    
    const handleKomKTByID = (event) => {
        // const name = event.target.name;
        const value = event.target.value;
        const kom = value.split(';');
        setKomMP(values => ({...values,
            idkom: kom[0],
            kodeKomoditasMP: kom[1],
            namaUmum: kom[2],
            namaLatin: kom[3]
        }))
        setKomMP(values => ({...values, [komMP.kodeKomoditasMP]: kom[1]}))
    }
    
    const handleKomoditas = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setKomoditas(values => ({...values, [name]: value}))
    }

    let [wizardPage, setWizardPage] = useState(1);
    let [editKontainer, setEditKontainer] = useState();

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
    let [kontainerById, setKontainerById] = useState({});
    // useEffect(()=>{
        function dataKontainerPtk() {
            if(wizardPage === 2) {
                const modelPemohon = new PtkModel();
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
                const modelPemohon = new PtkModel();
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
            console.log("datadok : " + dokumenPtk)
        }
        
        function dataKomoditiPtk() {
            if(wizardPage === 3) {
                const modelPemohon = new PtkModel();
                const response = modelPemohon.getKomoditiPtkId(dataIdPage.noIdPtk, cekdataMP.mediaPembawa);
                // console.log(dataIdPage.noIdPtk)
                // console.log(cekdataMP.mediaPembawa)
    
                response
                .then((res) => {
                    console.log(res)
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
    
    const getDataKontId = (e) => {
        const modelPemohon = new PtkModel();
    
        if(idPtk) {
            const response = modelPemohon.detilKontainerId(e.target.dataset.input);
            if(response.data.status === '200') {
                setValuePemohon("noKontainer", response.data.data.nomor);
                setValuePemohon("tipeKontainer", response.data.data.tipe_kontainer_id);
                setValuePemohon("ukuranKontainer", response.data.data.ukuran_kontainer_id);
                setValuePemohon("stuffKontainer", response.data.data.stuff_kontainer_id);
                setValuePemohon("segel", response.data.data.segel);
                setValuePemohon("idDataKontainer", response.data.data.id);
            } 
        }
    }
    // function getDataKontId(props) {

    // }
    
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-1.1 <span className="text-muted fw-light">PERMOHONAN TINDAKAN KARANTINA DAN PENGAWASAN DAN/ATAU PENGENDALIAN
            SERTA BERITA ACARA SERAH TERIMA MEDIA PEMBAWA DI TEMPAT PEMASUKAN,
            PENGELUARAN DAN/ATAU TRANSIT</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <div id="wizard-checkout" className="bs-stepper wizard-icons wizard-icons-example mt-2">
                <div className="row p-2">
                    <label className="col-sm-1 col-form-label" htmlFor="noAju">NOMOR AJU</label>
                    <div className="col-sm-4">
                        <input type="text" className='form-control' value={dataIdPage.noAju} disabled />
                    </div>
                    <label className="offset-sm-1 col-sm-2 col-form-label" htmlFor="noAju">NOMOR PERMOHONAN</label>
                    <div className="col-sm-4">
                        <input type="text" className='form-control' value={dataIdPage.noPermohonan} disabled />
                    </div>
                </div>
                <hr className='m-1' />
                <div className="bs-stepper-header m-auto border-0">
                    <div className={wizardPage === 1 ? "step active" : "step"} onClick={() => setWizardPage(1)}>
                        <button type="button" className="step-trigger">
                            <span className="bs-stepper-icon">
                              <PersonSvg/>
                            </span>
                            <span className="bs-stepper-label">Identitas Pemohon</span>
                        </button>
                    </div>
                    <div className="line">
                        <i className="bx bx-chevron-right"></i>
                    </div>
                    <div className={wizardPage === 2 ? "step active" : "step"}>
                        <button type="button" className="step-trigger" onClick={() => setWizardPage(2)} disabled={formTab.tab1}>
                            <span className="bs-stepper-icon">
                              <ShipSvg/>
                            </span>
                            <span className="bs-stepper-label">Pelabuhan - Alat Angkut</span>
                        </button>
                    </div>
                    <div className="line">
                        <i className="bx bx-chevron-right"></i>
                    </div>
                    <div className={wizardPage === 3 ? "step active" : "step"}>
                        <button type="button" className="step-trigger" onClick={() => setWizardPage(3)} disabled={formTab.tab2}>
                            <span className="bs-stepper-icon">
                              <PackageSvg/>
                            </span>
                            <span className="bs-stepper-label">Media Pembawa - Kemasan</span>
                        </button>
                    </div>
                    <div className="line">
                        <i className="bx bx-chevron-right"></i>
                    </div>
                    <div className={wizardPage === 4 ? "step active" : "step"}>
                        <button type="button" className="step-trigger" onClick={() => setWizardPage(4)} disabled={formTab.tab3}>
                            <span className="bs-stepper-icon">
                              <DokumenSvg/>
                            </span>
                            <span className="bs-stepper-label">Dokumen</span>
                        </button>
                    </div>
                    <div className="line">
                        <i className="bx bx-chevron-right"></i>
                    </div>
                    <div className={wizardPage === 5 ? "step active" : "step"}>
                        <button type="button" className="step-trigger" onClick={() => setWizardPage(5)} disabled={formTab.tab4}>
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
                            <input type="hidden" name='idPtk' value={idptkexist()} {...registerPemohon("idPtk")} />
                            <input type="hidden" name='noAju' value={dataIdPage.noAju}  {...registerPemohon("noAju")} />
                            <input type="hidden" name='noPermohonan' value={dataIdPage.noPermohonan}  {...registerPemohon("noPermohonan")} />
                            <input type="hidden" name='tabWizard' value={wizardPage.toString()} {...registerPemohon("tabWizard")} />
                            <input type="hidden" name='makeid' value={makeid(5)} {...registerPemohon("makeid")} />
                            <input type="hidden" name='datenow' value={dateNow()} {...registerPemohon("datenow")} />
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
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
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
                                  <select className={errorsPemohon.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="permohonan" id="permohonan" {...registerPemohon("permohonan", { required: "Mohon pilih jenis permohonan."})} onChange={handlePermohonan}>
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
                                    <select name="provPemohon" id="provPemohon" onClick={dataSelect.provPemohon ? null : handleProv} {...registerPemohon("provPemohon", { required: "Mohon pilih provinsi pemohon."})} className={errorsPemohon.provPemohon ? "form-control  form-control-sm is-invalid" : "form-control  form-control-sm"}>
                                        <option value="">--</option>
                                        {dataSelect.provPemohon}
                                        {/* <MasterProv/> */}
                                    </select>
                                    {errorsPemohon.provPemohon && <small className="text-danger">{errorsPemohon.provPemohon.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="kotaPemohon">Kota/Kab <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                    <select name="kotaPemohon" id={cekdataDiri.provPemohon} data-input={cekdataDiri.provPemohon} onClick={handleKota} className={errorsPemohon.kotaPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} {...registerPemohon("kotaPemohon", { required: "Mohon pilih kota pemohon."})}>
                                        <option value="">--</option>
                                        {cekdataDiri.provPemohon === "" ? <option value="" disabled>Mohon Pilih Provinsi terlebih dahulu</option> : dataSelect.kotaPemohon }
                                    </select>
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
                              <label className="col-sm-3 col-form-label" htmlFor="emailPemohon">Email <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <input type="email" id="emailPemohon" name="emailPemohon" {...registerPemohon("emailPemohon", { required: "Mohon isi email pemohon.", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email tidak valid." }})} className={errorsPemohon.emailPemohon ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Email" />
                                  {errorsPemohon.emailPemohon && <small className="text-danger">{errorsPemohon.emailPemohon.message}</small>}
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
                          <input className="form-check-input" type="checkbox" name='samaTTD' id="samaTTD" onChange={handleCekSameTTD} />
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
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
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
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
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
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
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
                                  {/* {errorsPemohon.namaPengirim?.type === "required" && ( <small className="text-danger">{errorsPemohon.namaPengirim.message}</small> )} */}
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
                                {/* <select id="negaraPengirim" data-style="btn-default btn-sm" data-live-search-style="begins" data-actions-box="true" data-live-search="true" name="negaraPengirim" {...registerPemohon("negaraPengirim", { required: "Mohon pilih negara pengirim."})} className={errorsPemohon.negaraPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm selectpicker"}> */}
                                <select id="negaraPengirim" onClick={dataSelect.negaraPengirim ? null : handleNegara} name="negaraPengirim" {...registerPemohon("negaraPengirim", { required: "Mohon pilih negara pengirim."})} className={errorsPemohon.negaraPengirim ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                {/* <select id="negaraPengirim" value={data} name="negaraPengirim"  className="form-control select2 form-control-sm"> */}
                                    <option value="">--</option>
                                    <option value="99">ID - INDONESIA</option>
                                    {cekdataDiri.permohonan === 'EX' || cekdataDiri.permohonan === 'IM' ? dataSelect.negaraPengirim : null}
                                    {/* <MasterNegara/> */}
                                </select>
                                {errorsPemohon.negaraPengirim && <small className="text-danger">{errorsPemohon.negaraPengirim.message}</small>}
                              </div>
                          </div>
                          <div style={{visibility: cekdataDiri.permohonan === 'IM' ? 'hidden' : 'visible'}}>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="provPengirim">Provinsi</label>
                                <div className="col-sm-9">
                                    <select id="provPengirim" name="provPengirim" onClick={dataSelect.provPengirim ? null : handleProv} {...registerPemohon('provPengirim')} className="form-control form-control-sm">
                                      <option value="">--</option>
                                      {dataSelect.provPengirim}
                                      {/* <MasterProv/> */}
                                    </select>  
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="kotaPengirim">Kota/Kabupaten</label>
                                <div className="col-sm-9">
                                  <select id="kotaPengirim" name="kotaPengirim" data-input={cekdataDiri.provPengirim} onClick={handleKota} {...registerPemohon('kotaPengirim')} className="form-control form-control-sm">
                                      <option value="">--</option>
                                      {/* <MasterKota data-input={cekdataDiri.provPengirim}/> */}
                                      {cekdataDiri.provPengirim === "" ? <option value="" disabled>Mohon Pilih Provinsi Pengirim terlebih dahulu</option> : dataSelect.kotaPengirim }
                                  </select>
                                </div>
                            </div>
                          </div>
                        <div className="form-check mt-3">
                          <input className="form-check-input" type="checkbox" name='samaPengirim' id="samaPengirim" onChange={handleCekSamePengirim} />
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
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="collapse show">
                      <div className="card-body pt-0">
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="namaPenerima">Nama <span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                  <input type="text" id="namaPenerima" name="namaPenerima" {...registerPemohon("namaPenerima", { required: "Mohon isi negara penerima."})} className={errorsPemohon.namaPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Penerima" />
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
                                <select id="negaraPenerima" onClick={dataSelect.negaraPenerima ? null :handleNegara} name="negaraPenerima" className={errorsPemohon.negaraPenerima ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} {...registerPemohon("negaraPenerima", { required: "Mohon pilih negara penerima."})}>
                                    <option value="">--</option>
                                    <option value="99">ID - INDONESIA</option>
                                    {cekdataDiri.permohonan === 'EX' || cekdataDiri.permohonan === 'IM' ? dataSelect.negaraPenerima : null}
                                    {/* <MasterNegara/> */}
                                </select>
                                {errorsPemohon.negaraPenerima && <small className="text-danger">{errorsPemohon.negaraPenerima.message}</small>}
                              </div>
                          </div>
                          <div style={{visibility: cekdataDiri.permohonan === 'EX' ? 'hidden' : 'visible'}}>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="provPenerima">Provinsi</label>
                                <div className="col-sm-9">
                                    <select id="provPenerima" name="provPenerima" onClick={dataSelect.provPenerima ? null : handleProv} {...registerPemohon("provPenerima")} className="form-control form-control-sm" placeholder="Kota Penerima">
                                        <option value="">--</option>
                                        {dataSelect.provPenerima}
                                        {/* <MasterProv/> */}
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="kotaPenerima">Kota/Kabupaten</label>
                                <div className="col-sm-9">
                                    <select id="kotaPenerima" name="kotaPenerima" data-input={cekdataDiri.provPenerima} onClick={handleKota} {...registerPemohon("kotaPenerima")} className="form-control form-control-sm" placeholder="Kota Penerima">
                                        <option value="">--</option>
                                        {/* <MasterKota data-input={cekdataDiri.provPenerima}/> */}
                                        {cekdataDiri.provPenerima === "" ? <option value="" disabled>Mohon pilih provinsi penerima terlebih dahulu</option> : dataSelect.kotaPenerima }
                                    </select>
                                </div>
                            </div>
                          </div>
                          <div className="form-check mt-3">
                            <input className="form-check-input" type="checkbox" name='samaPenerima' id="samaPenerima" onChange={handleCekSamePenerima} />
                            <label className="form-check-label" htmlFor="samaPenerima"> Sama dengan pemohon. </label>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-12 d-flex justify-content-between">
              <button type="button" className="btn btn-label-secondary" disabled>
                  <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                  <span className="d-sm-inline-block d-none">Sebelumnya</span>
              </button>
              <button type="submit" className="btn btn-primary">
                  <span className="d-sm-inline-block d-none me-sm-1">Selanjutnya</span>
                  <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
              </button>
          </div>
      </div>
      {/* </motion.div> */}
    </form>
  </div>
                        <div id="cardPelabuhan" className={wizardPage === 2 ? "content active dstepper-block" : "content"}>
                        <form className="input-form" onSubmit={handleFormPelabuhan(onSubmitPelabuhan)}>
                            <input type="hidden" name='idPtk' value={idptkexist()} {...registerPelabuhan("idPtk")} />
                            <input type="hidden" name='noAju' value={dataIdPage.noAju}  {...registerPelabuhan("noAju")} />
                            <input type="hidden" name='tabWizard' value={wizardPage} {...registerPelabuhan("tabWizard")} />
                            <input type="hidden" name='datenow' value={dateNow()} {...registerPelabuhan("datenow")} />

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
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="negaraAsal">Negara Pengirim <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <select id="negaraAsal" name="negaraAsal" onClick={dataSelect.negaraAsal ? null : handleNegara} {...registerPelabuhan("negaraAsal", { required: "Mohon pilih negara asal."})} className={errorsPelabuhan.negaraAsal ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} >
                                                        {/* <select id="negaraAsal" name="negaraAsal" value={dataDiri.negaraAsal || ""} onChange={handleDataDiri} className="form-control select2 form-control-sm" > */}
                                                        <option value="">--</option>
                                                        <option value="99">ID - INDONESIA</option>
                                                        {cekdataDiri.permohonan === 'EX' || cekdataDiri.permohonan === 'IM' ? dataSelect.negaraAsal : null}
                                                            {/* <MasterNegara/> */}
                                                        </select>
                                                        {/* <p>{dataDiri.negaraAsal}</p> */}
                                                        {errorsPelabuhan.negaraAsal && <small className="text-danger">{errorsPelabuhan.negaraAsal.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="negaraTujuan">Negara penerima <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        {/* <input type="text" id="negara_tujuan" className="form-control form-control-sm" placeholder="Negara Tujuan" /> */}
                                                        <select name="negaraTujuan" id="negaraTujuan" onClick={dataSelect.negaraTujuan ? null : handleNegara} {...registerPelabuhan("negaraTujuan", { required: "Mohon pilih negara tujuan."})} className={errorsPelabuhan.negaraTujuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                            <option value="">--</option>
                                                            <option value="99">ID - INDONESIA</option>
                                                            {cekdataDiri.permohonan === 'EX' || cekdataDiri.permohonan === 'IM' ? dataSelect.negaraTujuan : null}
                                                            {/* <MasterNegara/> */}
                                                        </select>
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
                                                    <select type="text" id="negaraTransit" onClick={dataSelect.negaraTransit ? null : handleNegara} name='negaraTransit' {...registerPelabuhan("negaraTransit")} className="form-control form-control-sm">
                                                        <option value="">--</option>
                                                        <option value="99">ID - INDONESIA</option>
                                                        {dataSelect.negaraTransit}
                                                            {/* <MasterNegara/> */}
                                                    </select>
                                                        {/* <input type="text" id="negara_transit" className="form-control form-control-sm" placeholder="Negara Transit" /> */}
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
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="pelMuat">Muat / Asal <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <select name="pelMuat" id="pelMuat" data-input={cekdataPelabuhan.negaraAsal} onClick={handlePelabuhan} {...registerPelabuhan("pelMuat", { required: "Mohon pilih pelabuhan muat/asal."})} className={errorsPelabuhan.pelMuat ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                            <option value="">--</option>
                                                            {cekdataPelabuhan.negaraAsal === "" ? <option value="" disabled>Mohon pilih negara asal</option> : dataSelect.pelMuat }
                                                            {/* <MasterPelabuhan data-input={cekdataPelabuhan.negaraAsal}/> */}
                                                        </select>
                                                        {errorsPelabuhan.pelMuat && <small className="text-danger">{errorsPelabuhan.pelMuat.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="pelBongkar">Bongkar / Tujuan <span className='text-danger'>*</span></label>
                                                    <div className="col-sm-9">
                                                        <select name="pelBongkar" id="pelBongkar" data-input={cekdataPelabuhan.negaraTujuan} onClick={handlePelabuhan} {...registerPelabuhan("pelBongkar", { required: "Mohon pilih pelabuhan bongkar."})} className={errorsPelabuhan.pelBongkar ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                            <option value="">--</option>
                                                            {cekdataPelabuhan.negaraTujuan === "" ? <option value="" disabled>Mohon pilih negara tujuan</option> : dataSelect.pelBongkar }
                                                            {/* <MasterPelabuhan data-input={cekdataPelabuhan.negaraTujuan}/> */}
                                                        </select>
                                                        {errorsPelabuhan.pelBongkar && <small className="text-danger">{errorsPelabuhan.pelBongkar.message}</small>}
                                                        {/* <input type="text" id="pel_bongkar" className="form-control form-control-sm" placeholder="Pelabuhan Bongkar / Tujuan" /> */}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="sandar">Sandar</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" name='sandar' id="sandar" {...registerPelabuhan("sandar")} className="form-control form-control-sm" placeholder="Lokasi Sandar" />
                                                    </div>
                                                </div>
                                                <div style={{display: cekdataPelabuhan.transitOpsi === '1' ? 'block' : 'none' }}>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="pelTransit">Pelabuhan Transit</label>
                                                    <div className="col-sm-9">
                                                        <select name="pelTransit" id="pelTransit" data-input={cekdataPelabuhan.negaraTransit} onClick={handlePelabuhan} {...registerPelabuhan("pelTransit")} className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            {cekdataPelabuhan.negaraTransit === "" ? <option value="" disabled>Mohon pilih negara tujuan</option> : dataSelect.pelTransit }
                                                            {/* <MasterPelabuhan data-input={cekdataPelabuhan.negaraTransit}/> */}
                                                        </select>
                                                        {/* <input type="text" id="pel_transit" className="form-control form-control-sm" placeholder="Pelabuhan Transit" /> */}
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
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
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
                                                        <select id="benderaTransit" name="benderaTransit" onClick={dataSelect.benderaTransit ? null : handleNegara} {...registerPelabuhan("benderaTransit")} className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            <option value="99">ID - INDONESIA</option>
                                                            {dataSelect.benderaTransit}
                                                            {/* <MasterNegara/> */}
                                                        </select>
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
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
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
                                                        <select id="benderaAkhir" name="benderaAkhir" onClick={dataSelect.benderaAkhir ? null : handleNegara} {...registerPelabuhan("benderaAkhir")} className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            <option value="99">ID - INDONESIA</option>
                                                            {dataSelect.benderaAkhir}
                                                            {/* <MasterNegara/> */}
                                                        </select>
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
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show" style={{display: (cekdataPelabuhan.cekKontainer === '1' ? 'block' : 'none')}}>
                                            <div className="card-body pt-0">
                                                <div className="row g-3 mb-3">
                                                    <div className="pb-2">
                                                        <button type="button" className="btn btn-xs btn-primary" data-bs-toggle="modal" data-bs-target="#modKontainer">Tambah Kontainer</button>
                                                        <button type="button" onClick={dataKontainerPtk} className="btn btn-xs btn-info float-end"><i className="menu-icon tf-icons bx bx-sync"></i> Refresh Data</button>
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
                                                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                                                </button>
                                                                                <div className="dropdown-menu">
                                                                                    <a className="dropdown-item" type="button" onClick={() => {setEditKontainer(index)}} data-bs-toggle="modal" data-bs-target="#modKontainer"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                                    <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
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
                                        <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                                        <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <span className="d-sm-inline-block d-none me-sm-1">Selanjutnya</span>
                                        <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        </div>

                        {/* <!-- Payment --> */}
                        <div id="cardKomoditas" className={wizardPage === 3 ? "content active dstepper-block" : "content"}>
                            <form className="input-form" onSubmit={handleFormMP(onSubmitKomoditas)}>
                            <input type="hidden" name='idPtk' value={idptkexist()} {...registerMP("idPtk")} />
                            <input type="hidden" name='noAju' value={dataIdPage.noAju}  {...registerMP("noAju")} />
                            <input type="hidden" name='tabWizard' value={wizardPage} {...registerMP("tabWizard")} />
                            <input type="hidden" name='datenow' value={dateNow()} {...registerMP("datenow")} />

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
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
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
                                                                    <select name="mediaPembawa" id="mediaPembawa" {...registerMP("mediaPembawa", { required: "Mohon pilih media pembawa."})} className={errorsMP.mediaPembawa ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
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
                                                                    <div style={{display: cekdataMP.mediaPembawa === 'H' || cekdataMP.mediaPembawa === 'I' ? 'block' : 'none'}}>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="jenisMp" id="hidup" value={cekdataMP.mediaPembawa === 'H' ? '1' : '6'} {...registerMP("jenisMp", { required: "Mohon pilih jenis media pembawa."})} />
                                                                            <label className="form-check-label" htmlFor="hidup">{cekdataMP.mediaPembawa === 'H' ? 'Hewan' : 'Ikan'} Hidup</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="jenisMp" id="produk" value={cekdataMP.mediaPembawa === 'H' ? '2' : '7'} {...registerMP("jenisMp")} />
                                                                            <label className="form-check-label" htmlFor="produk">{cekdataMP.mediaPembawa === 'H' ? 'Produk Hewan' : 'Non Hidup'}</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="jenisMp" id="mpl" value={cekdataMP.mediaPembawa === 'H' ? '3' : '8'} {...registerMP("jenisMp")} />
                                                                            <label className="form-check-label" htmlFor="mpl">Media Pembawa Lain</label>
                                                                        </div>
                                                                    </div>
                                                                    {/* <!-- Tumbuhan --> */}
                                                                    <div style={{display: cekdataMP.mediaPembawa === 'T' ? 'block' : 'none'}}>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="jenisMp" id="benih" value="4" {...registerMP("jenisMp")} />
                                                                            <label className="form-check-label" htmlFor="benih">Benih</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input" type="radio" name="jenisMp" id="nonbenih" value="5" {...registerMP("jenisMp")} />
                                                                            <label className="form-check-label" htmlFor="nonbenih">Non Benih</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {errorsMP.jenisMp && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.jenisMp.message}</small></div>}
                                                            </div>
                                                            {/* <!-- Khusus Tumbuhan --> */}
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="jenisAngkut">Jenis Angkut <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-9">
                                                                    <div className="form-check form-check-inline">
                                                                        <input className="form-check-input" type="radio" name="jenisAngkut" id="curah" value="Curah" {...registerMP("jenisAngkut", { required: "Mohon pilih jenis angkut."})} />
                                                                        <label className="form-check-label" htmlFor="curah">Curah</label>
                                                                    </div>
                                                                    <div className="form-check form-check-inline">
                                                                        <input className="form-check-input" type="radio" name="jenisAngkut" id="noncurah" value="Non Curah" {...registerMP("jenisAngkut")} />
                                                                        <label className="form-check-label" htmlFor="noncurah">Non Curah</label>
                                                                    </div>
                                                                </div>
                                                                {errorsMP.jenisAngkut && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.jenisAngkut.message}</small></div>}
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="peruntukan">Peruntukan</label>
                                                                <div className="col-sm-4">
                                                                    <select name="peruntukan" id="peruntukan" {...registerMP("peruntukan", { required: cekdataMP.mediaPembawa === "T" ? "Mohon pilih jenis angkut." : false})} className={errorsMP.peruntukan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
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
                                                                    <select name="negaraAsalMP" id="negaraAsalMP" onClick={handleNegara} {...registerMP("negaraAsalMP", { required: "Mohon pilih negara asal komoditas."})} className={errorsMP.negaraAsalMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                                        <option value="">--</option>
                                                                        <option value="99">ID - INDONESIA</option>
                                                                        {cekdataDiri.permohonan === 'EX' || cekdataDiri.permohonan === 'IM' ? dataSelect.negaraAsalMP : null}
                                                                    </select>
                                                                </div>
                                                                {errorsMP.negaraAsalMP && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.negaraAsalMP.message}</small></div>}
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="daerahAsalMP">Daerah Asal</label>
                                                                <div className="col-sm-6">
                                                                    {/* <input type="text" id="daerah_asal" className="form-control form-control-sm" placeholder="Daerah Asal" /> */}
                                                                    <select name="daerahAsalMP" id="daerahAsalMP" onClick={handleKota} {...registerMP("daerahAsalMP")} className="form-control form-control-sm">
                                                                    <option value="">--</option>
                                                                    {cekdataMP.negaraAsalMP === '99' ? dataSelect.daerahAsalMP : null}
                                                                        {/* <MasterKota/> */}
                                                                    </select>
                                                                    {errorsMP.daerahAsal && <small className="text-danger">{errorsMP.daerahAsalMP.message}</small>}
                                                                </div>
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="negaraTujuanMP">Negara Tujuan Komoditas <span className='text-danger'>*</span></label>
                                                                <div className="col-sm-6">
                                                                    <select name="negaraTujuanMP" id="negaraTujuanMP" onClick={handleNegara} {...registerMP("negaraTujuanMP", { required: "Mohon pilih negara tujuan komoditas."})} className={errorsMP.negaraTujuanMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                                                        <option value="">--</option>
                                                                        <option value="99">ID - INDONESIA</option>
                                                                        {cekdataDiri.permohonan === 'EX' || cekdataDiri.permohonan === 'IM' ? dataSelect.negaraTujuanMP : null}
                                                                    </select>
                                                                </div>
                                                                {errorsMP.negaraTujuanMP && <div className="offset-3 col-sm-9"><small className="text-danger">{errorsMP.negaraTujuanMP.message}</small></div>}
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="daerahTujuanMP">Daerah Tujuan</label>
                                                                <div className="col-sm-6">
                                                                <select name="daerahTujuanMP" id="daerahTujuanMP" onClick={handleKota} {...registerMP("daerahTujuanMP")} className="form-control form-control-sm">
                                                                    <option value="">--</option>
                                                                    {cekdataMP.negaraTujuanMP === '99' ? dataSelect.daerahTujuanMP : null}
                                                                        {/* <MasterKota/> */}
                                                                    </select>
                                                                    {/* <input type="text" id="daerah_tujuan" className="form-control form-control-sm" placeholder="Daerah Tujuan" /> */}
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
                                                                    <select name="jenisKemasan" id="jenisKemasan" onClick={handleKemasan} {...registerMP("jenisKemasan")} className="form-control form-control-sm">
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
                                                                            <input type="text" className='form-control form-control-sm' {...registerMP("nilaiBarang")} name='nilaiBarang' id='nilaiBarang' />
                                                                        </div>
                                                                        <div className="col-2" style={{paddingLeft: '2px'}}>
                                                                            <select name="satuanNilai" id="satuanNilai" onClick={handleMataUang} className='form-control form-control-sm' {...registerMP("satuanNilai")}>
                                                                                <option value="">--</option>
                                                                                {dataSelect.satuanNilai}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    {/* <input type="text" id="nilaiBarang" name="nilaiBarang" value={komoditas.nilaiBarang || ""} onChange={handleKomoditas} className="form-control form-control-sm" placeholder="Nilai Barang" /> */}
                                                                </div>
                                                            </div>
                                                            <div className="row mb-3">
                                                                <label className="col-sm-3 col-form-label" htmlFor="infoTambahan">Informasi Tambahan</label>
                                                                <div className="col-sm-9">
                                                                    <textarea className='form-control' name="infoTambahan" id="infoTambahan" rows="2" {...registerMP("infoTambahan")}></textarea>
                                                                    {/* <input type="text" id="infoTambahan" name="infoTambahan" {...registerMP("infoTambahan")} className="form-control form-control-sm" placeholder="Tanda Kemasan" /> */}
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
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="card-body pt-0">
                                                        <div className="row g-3 mb-3">
                                                            <div className="col-sm-6">
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-4 col-form-label" htmlFor="namaTercetak">Nama Tercetak</label>
                                                                    <div className="col-sm-8">
                                                                        <input type="text" id="namaTercetak" name="namaTercetak" {...registerMP("namaTercetak")} className="form-control form-control-sm" placeholder="Nama Tercetak" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-4 col-form-label" htmlFor="namaLatinTc">Nama Latin Tercetak</label>
                                                                    <div className="col-sm-8">
                                                                        <input type="text" id="namaLatinTc" name="namaLatinTc" {...registerMP("namaLatinTc")} className="form-control form-control-sm" placeholder="Nama Latin Tercetak" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <div className="row mb-2">
                                                                    <label className="col-sm-2 col-form-label" htmlFor="bentukJumlahTc">Bentuk, {cekdataMP.mediaPembawa === 'T' ? 'Deskripsi Kemasan' : 'Jumlah Tercetak'}</label>
                                                                    <div className="col-sm-4">
                                                                        <input type="text" id="bentukJumlahTc" name="bentukJumlahTc" {...registerMP("bentukJumlahTc")} className="form-control form-control-sm" placeholder="Bentuk, Jumlah Tercetak" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <button type="button" className="btn btn-xs btn-primary" data-bs-toggle={cekdataMP.jenisMp ? "modal" : ""} data-bs-target={cekdataMP.jenisMp ? "#modKomoditas" : ""} onClick={cekdataMP.jenisMp ? null : () => {alert("Mohon Pilih Jenis Media Pembawa")}}>Tambah Komoditas</button>
                                                                <button type="button" className="btn btn-xs btn-info float-end"  onClick={dataKomoditiPtk}><i className="menu-icon tf-icons bx bx-sync"></i> Refresh Data</button>
                                                            </div>
                                                            <div className="table-responsive text-nowrap">
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
                                                                            {/* <th>Breed</th>
                                                                            <th>Asal</th>
                                                                            <th>Keterangan</th> */}
                                                                            {/* <th>Harga</th>
                                                                            <th>Mata Uang</th> */}
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
                                                                                        <td>{data.volume_netto}</td>
                                                                                        <td>{data.sat_netto}</td>
                                                                                        <td>{data.volume_bruto}</td>
                                                                                        <td>{data.sat_bruto}</td>
                                                                                        <td>{data.volume_lain}</td>
                                                                                        <td>{data.sat_lain}</td>
                                                                                        <td>{data.jantan}</td>
                                                                                        <td>{data.betina}</td>
                                                                                        <td><a href={"http://localhost/api-barantin/dokupload/20240111/" + data.efile} target='_blank' rel='noreferrer'>{data.efile}</a></td>
                                                                                        <td>
                                                                                            <div className="dropdown">
                                                                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                                                                </button>
                                                                                                <div className="dropdown-menu">
                                                                                                    <a className="dropdown-item" type="button" onClick={() => {setEditKontainer(index)}} data-bs-toggle="modal" data-bs-target="#modKontainer"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                                                    <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                        <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                                        <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <span className="d-sm-inline-block d-none me-sm-1">Selanjutnya</span>
                                        <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
                                    </button>
                                </div>
                                </div>
                            </form>
                        </div>

                        {/* <!-- Confirmation --> */}
                        <div id="cardDokumen" className={wizardPage === 4 ? "content active dstepper-block" : "content"}>
                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    <div className="card card-action mb-4">
                                        <div className="card-header mb-3 p-2" style={{backgroundColor: '#123138'}}>
                                            <div className="card-action-title">
                                                <h5 className="mb-0 text-lightest">Detil Dokumen</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
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
                                                                <button type="button" className="btn btn-xs btn-primary" data-bs-toggle={cekdataMP.mediaPembawa ? "modal" : ""} data-bs-target={cekdataMP.mediaPembawa ? "#modDokumen" : ""} onClick={cekdataMP.mediaPembawa ? null : () => {alert('Mohon pilih media pembawa terlebih dahulu!')}}>Tambah Dokumen</button>
                                                                <button type="button" className="btn btn-xs btn-info float-end"  onClick={dataDokumenPtk}><i className="menu-icon tf-icons bx bx-sync"></i> Refresh Data</button>
                                                            </div>
                                                            <div className="table-responsive text-nowrap">
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
                                                                                    <td><a href={"http://localhost/api-barantin/dokupload/20240111/" + data.efile} target='_blank' rel='noreferrer'>{data.efile}</a></td>
                                                                                    <td>
                                                                                        <div className="dropdown">
                                                                                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                                <i className="bx bx-dots-vertical-rounded"></i>
                                                                                            </button>
                                                                                            <div className="dropdown-menu">
                                                                                                <a className="dropdown-item" type="button" onClick={() => {setEditKontainer(index)}} data-bs-toggle="modal" data-bs-target="#modKontainer"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                                                <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
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
                                </div>
                                    <div className="col-12 d-flex justify-content-between">
                                        <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                            <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                                            <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            <span className="d-sm-inline-block d-none me-sm-1">Konfirmasi</span>
                                            <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
                                        </button>
                                    </div>
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
                                    <input type="hidden" name='idPtk' value={idptkexist()} {...registerKonfirmasi("idPtk")} />
                                    <input type="hidden" name='noAju' value={dataIdPage.noAju}  {...registerKonfirmasi("noAju")} />
                                    <input type="hidden" name='tabWizard' value={wizardPage.toString()} {...registerKonfirmasi("tabWizard")} />
                                    <input type="hidden" name='datenow' value={dateNow()} {...registerKonfirmasi("datenow")} />
                                    <div className="col-12 d-flex justify-content-between">
                                        <button type="button" className="btn btn-primary btn-prev" onClick={() => setWizardPage(wizardPage - 1)}>
                                            <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                                            <span className="d-sm-inline-block d-none">Cek Kembali</span>
                                        </button>
                                        <button type="submit" className="btn btn-success">
                                            <i className="bx bx-save bx-sm"></i>
                                            <span className="d-sm-inline-block d-none me-sm-1">Simpan</span>
                                        </button>
                                    </div>
                                </form>
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
                        <p>{editKontainer}</p>
                      </div>
                      <form className="row" onSubmit={handleFormKontainer(onSubmitKontainer)}>
                            <input type="hidden" name='idPtk' value={idptkexist()} {...registerKontainer("idPtk")} />
                            <input type="hidden" name='datenow' value={dateNow()} {...registerKontainer("datenow")} />
                      <input type="hidden" name='idDataKontainer' {...registerKontainer("idDataKontainer")} />
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
                          <button type="submit" className="btn btn-sm btn-primary me-sm-3 me-1">Tambah</button>
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
                        <h3>Tambah Dokumen Baru</h3>
                      </div>
                      <form className="row" onSubmit={handleFormDokumen(onSubmitDokumen)}>
                            <input type="hidden" name='idPtk' value={idptkexist()} {...registerDokumen("idPtk")} />
                            <input type="hidden" name='datenow' value={dateNow()} {...registerDokumen("datenow")} />
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
                          <div className="input-group input-group-merge">
                            <select name="jenisDokumen" id="jenisDokumen" data-kar={cekdataMP.mediaPembawa} onClick={handleJenisDokumen}{...registerDokumen("jenisDokumen", { required: "Mohon pilih jenis dokumen."})} className={errorsDokumen.jenisDokumen ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                <option value="">--</option>
                                {dataSelect.jenisDokumen}
                            </select>
                          </div>
                          {errorsDokumen.jenisDokumen && <small className="text-danger">{errorsDokumen.jenisDokumen.message}</small>}
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="noDokumen">No Dokumen <span className='text-danger'>*</span></label>
                          <div className="input-group input-group-merge">
                            <input type='text' name="noDokumen" id="noDokumen" {...registerDokumen("noDokumen", { required: "Mohon isi nomor dokumen."})} className={errorsDokumen.noDokumen ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                          </div>
                          {errorsDokumen.noDokumen && <small className="text-danger">{errorsDokumen.noDokumen.message}</small>}
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="negaraAsalDokumen">Negara Penerbit <span className='text-danger'>*</span></label>
                          <div className="input-group input-group-merge">
                            <select name="negaraAsalDokumen" id="negaraAsalDokumen" onClick={handleNegara}{...registerDokumen("negaraAsalDokumen", { required: "Mohon pilih negara penerbit dokumen."})} className={errorsDokumen.negaraAsalDokumen ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                <option value="">--</option>
                                <option value="99">ID - INDONESIA</option>
                                {dataSelect.negaraAsalDokumen}
                            </select>
                         </div>
                          {errorsDokumen.negaraAsalDokumen && <small className="text-danger">{errorsDokumen.negaraAsalDokumen.message}</small>}
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="tglDokumen">Tgl Dokumen <span className='text-danger'>*</span></label>
                          <div className="input-group input-group-merge">
                            <input type='date' name="tglDokumen" id="tglDokumen" {...registerDokumen("tglDokumen", { required: "Mohon isi tanggal dokumen."})} className={errorsDokumen.tglDokumen ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                          </div>
                          {errorsDokumen.tglDokumen && <small className="text-danger">{errorsDokumen.tglDokumen.message}</small>}
                        </div>
                        <div className="col-6" style={{visibility: (cekdataDokumen.negaraAsalDokumen === '99' ? 'visible' : 'hidden')}}>
                            <label className="form-label" htmlFor="kotaAsalDokumen">Kota Penerbit</label>
                            <div className="input-group input-group-merge">
                                <select name="kotaAsalDokumen" id="kotaAsalDokumen" onClick={cekdataDokumen.negaraAsalDokumen === '99' ? handleKota : null} {...registerDokumen("kotaAsalDokumen")} className="form-control form-control-sm">
                                    <option value="">--</option>
                                    {dataSelect.kotaAsalDokumen}
                                </select>
                            </div>
                          {/* {errorsDokumen.kotaAsalDokumen && <small className="text-danger">{errorsDokumen.kotaAsalDokumen.message}</small>} */}
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="ketDokumen">Keterangan</label>
                          <div className="input-group input-group-merge">
                            <input type='text' name="ketDokumen" id="ketDokumen" {...registerDokumen("ketDokumen")} className="form-control form-control-sm" />
                          </div>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="fileDokumen">Upload</label>
                          <div className="input-group input-group-merge">
                            {/* <Controller
                                control={controlDokumen}
                                name={"fileDokumen"}
                                rules={{ required: "Harap upload file dokumen persyaratan." }}
                                render={({ field: { value, onChange, ...field } }) => {
                                return (
                                    <input
                                    // name='fileDokumen'
                                    {...field}
                                    value={value?.fileName}
                                    onChange={(event) => {
                                        onChange(event.target.files[0]);
                                    }}
                                    type="file"
                                    className="form-control form-control-sm"
                                    id="fileDokumen"
                                    />
                                );
                                }}
                            /> */}
                            <input type="hidden" name='fileDokumen' {...registerDokumen("fileDokumen")} />
                            <input type='file' name="fileDokumenUpload" id="fileDokumenUpload" value={selectedFile} onChange={handleBase64Upload} className="form-control form-control-sm" />
                          </div>
                        </div>
                        <div className="col-6 text-center mt-4">
                          <button type="submit" className="btn btn-sm btn-primary me-sm-3 me-1">Tambah</button>
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
                        <h3 className="address-title">Tambah Media Pembawa {cekdataMP.mediaPembawa === 'H' ? 'Hewan' : (cekdataMP.mediaPembawa === 'I' ? 'Ikan' : 'Tumbuhan')}</h3>
                      </div>
                      <form onSubmit={handleFormDetilMP(onSubmitDetilMP)} className="row g-3">
                      <input type="hidden" name='idPtk' value={idptkexist()} {...registerDetilMP("idPtk")} />
                      <input type="hidden" name='datenow' value={dateNow} {...registerDetilMP("datenow")} />
                      <input type="hidden" name='jenisKar' value={cekdataMP.jenisMp} {...registerDetilMP("jenisKar")} />
                             {cekdataMP.mediaPembawa === 'T' ?
                        <>
                        <div className="col-6">
                          <label className="form-label" htmlFor="peruntukanMP">Peruntukan</label>
                          <select name="peruntukanMP" id="peruntukanMP" data-gol={(cekdataMP.jenisMp === '4' ? 'A' : '!=A')} onClick={handlePeruntukanKT} {...registerDetilMP("peruntukanMP")} className="form-control form-control-sm">
                            <option value="">--</option>
                            {dataSelect.peruntukanMP}
                            {/* <MasterKlasKT gol={cekdataMP.jenisMp === 'Benih' ? 'A' : 'BCD'}/> */}
                          </select>
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="volumeNetto">Volume Netto<span className='text-danger'>*</span></label>
                            <div className='row'>
                                <div className="col-5" style={{paddingRight: '2px'}}>
                                    <input type="text" name='volumeNetto' id='volumeNetto' {...registerDetilMP("volumeNetto", {required: "Mohon isi volume netto."})} className={errorsMP.volumeNetto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                </div>
                                <div className="col-7" style={{paddingLeft: '2px'}}>
                                    <select name="satuanNetto" id="satuanNetto" onClick={handleMasterSatuan} data-kar={cekdataMP.mediaPembawa === 'T' ? 'kt' : (cekdataMP.mediaPembawa === 'H' ? 'kh' : 'ki')} {...registerDetilMP("satuanNetto", {required: "Mohon isi satuan netto."})} className={errorsKontainer.satuanNetto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                        <option value="">--</option>
                                        {dataSelect.satuanNetto}
                                    </select>
                                </div>
                            </div>
                            {errorsDetilMP.volumeNetto && <small className="text-danger">{errorsDetilMP.volumeNetto.message}</small>}
                            {errorsDetilMP.satuanNetto && <small className="text-danger">{errorsDetilMP.satuanNetto.message}</small>}
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="komoditasMP">Komoditas<span className='text-danger'>*</span></label>
                          <input type="hidden" name="komoditasMP" id="komoditasMP" {...registerDetilMP("komoditasMP", {required: "Mohon isi Komoditas."})} />
                            <select name="selectKomoditasMP" id="selectKomoditasMP" onChange={handleSetKomoditasSelect} onClick={handleKomoditasKT} className={errorsMP.komoditasMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} >
                                  <option value="">--</option>
                                  {dataSelect.selectKomoditasMP}
                                  {/* <MasterKomKT/> */}
                            </select>
                            {errorsDetilMP.komoditasMP && <small className="text-danger">{errorsDetilMP.komoditasMP.message}</small>}
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="volumeBrutto">Volume Brutto</label>
                            <div className='row'>
                                <div className="col-5" style={{paddingRight: '2px'}}>
                                    <input type="text" {...registerDetilMP("volumeBrutto", {required: "Mohon isi volume brutto."})} className={errorsMP.volumeBrutto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name='volumeBrutto' id='volumeBrutto' />
                                </div>
                                <div className="col-7" style={{paddingLeft: '2px'}}>
                                    <select name="satuanBrutto" id="satuanBrutto" data-kar={cekdataMP.mediaPembawa === 'T' ? 'kt' : (cekdataMP.mediaPembawa === 'H' ? 'kh' : 'ki')} onClick={handleMasterSatuan} {...registerDetilMP("satuanBrutto", {required: "Mohon isi satuan brutto."})} className={errorsMP.satuanBrutto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                        <option value="">--</option>
                                        {dataSelect.satuanBrutto}
                                    </select>
                                </div>
                            </div>
                            {errorsDetilMP.volumeBrutto && <small className="text-danger">{errorsDetilMP.volumeBrutto.message}</small>}
                            {errorsDetilMP.satuanBrutto && <small className="text-danger">{errorsDetilMP.satuanBrutto.message}</small>}
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="kodeHSMp">Kode HS</label>
                          <select name="kodeHSMp" id="kodeHSMp" data-kar={cekdataMP.mediaPembawa} className="form-control form-control-sm" {...registerDetilMP("kodeHSMp")} onClick={handleMasterHS}>
                            <option value="">--</option>
                            {dataSelect.kodeHSMp}
                          </select>
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="volumeLain">Volume Lain</label>
                            <div className='row'>
                                <div className="col-5" style={{paddingRight: '2px'}}>
                                    <input type="text" className='form-control form-control-sm' name='volumeLain' id='volumeLain' {...registerDetilMP("volumeLain")} />
                                </div>
                                <div className="col-7" style={{paddingLeft: '2px'}}>
                                    <select name="satuanLain" id="satuanLain" data-kar={cekdataMP.mediaPembawa === 'T' ? 'kt' : (cekdataMP.mediaPembawa === 'H' ? 'kh' : 'ki')} onClick={handleMasterSatuan} className='form-control form-control-sm' {...registerDetilMP("satuanLain")}>
                                        <option value="">--</option>
                                        {dataSelect.satuanLain}
                                    </select>
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
                                    <input type="text" className='form-control form-control-sm' {...registerDetilMP("nilaiBarangMP")} name='nilaiBarangMP' id='nilaiBarangMP' />
                                </div>
                                <div className="col-5" style={{paddingLeft: '2px'}}>
                                    <select name="satuanNilaiMP" id="satuanNilaiMP" className='form-control form-control-sm' {...registerDetilMP("satuanNilaiMP")} onClick={handleMataUang}>
                                        <option value="">--</option>
                                        {dataSelect.satuanNilaiMP}
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
                        </> :
                        <>
                        <div className="col-6">
                          <label className="form-label" htmlFor="komoditasMP">Komoditas<span className='text-danger'>*</span></label>
                            <select name="komoditasMP" id="komoditasMP" data-gol={cekdataMP.jenisMp} onClick={handleKomoditasKH} {...registerDetilMP("komoditasMP", {required: "Mohon isi Komoditas."})} className={errorsMP.komoditasMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} >
                                  <option value="">--</option>
                                  {dataSelect.komoditasMP}
                                  {/* <MasterKomKT/> */}
                            </select>
                            {errorsDetilMP.komoditasMP && <small className="text-danger">{errorsDetilMP.komoditasMP.message}</small>}
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="kodeHSMp">Kode HS</label>
                          <select name="kodeHSMp" id="kodeHSMp" data-kar={cekdataMP.mediaPembawa} className="form-control form-control-sm" {...registerDetilMP("kodeHSMp")} onClick={handleMasterHS}>
                          <option value="">--</option>
                            {dataSelect.kodeHSMp}
                          </select>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="jumlahMP">Jumlah</label>
                          <div className='row'>
                            <div className='col-7' style={{paddingRight: '2px'}}>
                                <input type="number" {...registerDetilMP("jumlahMP", {required: "Mohon isi satuan brutto."})} className={errorsMP.jumlahMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name='jumlahMP' id='jumlahMP' />
                            </div>
                            <div className='col-5' style={{paddingLeft: '2px'}}>
                                <select name="satJumlahMP" id="satJumlahMP" data-kar={cekdataMP.mediaPembawa === 'T' ? 'kt' : (cekdataMP.mediaPembawa === 'H' ? 'kh' : 'ki')} onClick={handleMasterSatuan} {...registerDetilMP("satJumlahMP")} className="form-control form-control-sm">
                                <option value="">--</option>
                                    {dataSelect.satJumlahMP}
                                </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="breedMP">Breed</label>
                            <input type='text' name="breedMP" id="breedMP" {...registerDetilMP("breedMP")} className="form-control form-control-sm" />
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="nettoMP">Netto</label>
                          <div className='row'>
                            <div className='col-7' style={{paddingRight: '2px'}}>
                                <input type="text" className='form-control form-control-sm' {...registerDetilMP("nettoMP")} name='nettoMP' id='nettoMP' />
                            </div>
                            {/* ekor: 1122 || KG: 1356  */}
                            <div className='col-5' style={{paddingLeft: '2px'}}>
                                <input type="hidden" name='satNettoMP' id='satNettoMP' {...registerDetilMP("satNettoMP")} value={cekdataMP.jenisMp === '1' || cekdataMP.jenisMp === '6' ? '1122' : '1356'} />
                                <input type="text" className='form-control form-control-sm' value={cekdataMP.jenisMp === '1' || cekdataMP.jenisMp === '6' ? 'EKOR' : 'KILOGRAM'} readOnly />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                            <label className="form-label" htmlFor="nilaiBarangMP">Nilai Barang</label>
                            <div className='row'>
                                <div className="col-7" style={{paddingRight: '2px'}}>
                                    <input type="text" className='form-control form-control-sm' name='nilaiBarangMP' id='nilaiBarangMP' {...registerDetilMP("nilaiBarangMP")} />
                                </div>
                                <div className="col-5" style={{paddingLeft: '2px'}}>
                                    <select name="satuanNilaiMP" id="satuanNilaiMP" onClick={handleMataUang} {...registerDetilMP("satuanNilaiMP")} className='form-control form-control-sm'>
                                    <option value="">--</option>
                                        {dataSelect.satuanNilaiMP}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                          <label className="form-label" htmlFor="brutoMP">Bruto</label>
                          <div className='row'>
                            <div className='col-7' style={{paddingRight: '2px'}}>
                                <input type="text" {...registerDetilMP("brutoMP")} className='form-control form-control-sm' name='brutoMP' id='brutoMP' />
                            </div>
                            {/* ekor: 1122 || KG: 1356  */}
                            <div className='col-5' style={{paddingLeft: '2px'}}>
                                <input type="hidden" name='satBrutoMP' id='satBrutoMP' {...registerDetilMP("satBrutoMP")} value={cekdataMP.jenisMp === '1' || cekdataMP.jenisMp === '6' ? '1122' : '1356'} />
                                <input type="text" className='form-control form-control-sm' value={cekdataMP.jenisMp === '1' || cekdataMP.jenisMp === '6' ? 'EKOR' : 'KILOGRAM'} readOnly  />
                            </div>
                          </div>
                        </div>
                        </>
                        }
                        {/* <div className="col-6">
                          <label className="form-label" htmlFor="ketTambahan">Keterangan Tambahan</label>
                            <input type='text' name="ketTambahan" id="ketTambahan" {...registerDetilMP("ketTambahan")} className="form-control form-control-sm" />
                        </div> */}
                        
                        <div className="col-12 text-center">
                          <button type="submit" className="btn btn-primary me-sm-3 me-1">Tambah</button>
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