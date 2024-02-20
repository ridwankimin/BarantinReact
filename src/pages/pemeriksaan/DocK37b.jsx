import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import {decode as base64_decode} from 'base-64';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PtkPemeriksaan from '../../model/PtkPemeriksaan';
import PtkModel from '../../model/PtkModel';
import Select from 'react-select';
import Master from '../../model/Master';
import PtkHistory from '../../model/PtkHistory';

function DocK37b() {
    let navigate = useNavigate();
    let refOPTK = useRef({
        master: null,
        temuan: null
    });
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

    const onSubmitHeader = (data) => {
        // console.log(data.rekom37b[1])
        const model = new PtkPemeriksaan();
        const response = model.ptkFisikKesehatanHeader(data);
        response
        .then((response) => {
            // console.log(response.data)
            if(response.data) {
                if(response.data.status === '201') {
                    //start save history
                    const log = new PtkHistory();
                    const resHsy = log.pushHistory(data.idPtk, "p1b", "K-3.7b", (data.idDok37b ? 'UPDATE' : 'NEW'));
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

                    alert(response.data.status + " - " + response.data.message)
                    setValue("idDok37b", response.data.data.id)
                    setvalueHeader("idDok37b", response.data.data.id)
                    setValue("noDok37b", response.data.data.nomor)
                }
            }
        })
        .catch((error) => {
            console.log(error);
            alert(error.response.status + " - " + error.response.data.message)
        });
    }

    let [dataSelect, setDataSelect] = useState({})
    let [listKesehatan, setListKesehatan] = useState([])
    // let [listWasdal, setListWasdal] = useState([])

    const onSubmit = (data) => {
        // console.log(JSON.stringify(listKesehatan))
        // console.log(JSON.stringify(listWasdal))
        // let dataDetil = listKesehatan.map((item, i) => Object.assign({}, item, listWasdal[i]));
        const model = new PtkPemeriksaan();
        const response = model.ptkFisikKesehatan(data, listKesehatan);
            response
            .then((response) => {
                console.log(response)
                if(response.data) {
                    if(response.data.status === '201') {
                        //start save history
                        const log = new PtkHistory();
                        const resHsy = log.pushHistory(data.idPtk, "p1b", "K-3.7b", (data.idDok37b ? 'put' : 'post'));
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

                        alert(response.data.status + " - " + response.data.message)
                        setValue("idDok37b", response.data.data.id)
                        setvalueHeader("idDok37b", response.data.data.id)
                        setValue("noDok37b", response.data.data.nomor)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                // alert(error.response.status + " - " + error.response.data.message)
            });
    }
    
    function submitModKesehatan(e) {
        e.preventDefault();
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
    }

    const idPtk = Cookies.get("idPtkPage");
    let [data,setData] = useState({})
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

            const modelPeriksa = new PtkPemeriksaan();
            const resFisik = modelPeriksa.getFisikByPtkId(base64_decode(ptkNomor[1]))
            resFisik
            .then((response) => {
                // // console.log(response.data)
                if(response.data) {
                    if(response.data.status === '200') {
                        setValue("idDok37a", response.data.data[0].pn_administrasi_id)
                        setValue("idDok37b", response.data.data[0].id)
                        setValue("ptkId", response.data.data[0].ptk_id)
                        setValue("noDok", response.data.data[0].nomor)
                        setValue("noDok37b", response.data.data[0].nomor)
                        setValue("tglDok37b", response.data.data[0].tanggal)
                        setValue("isUjiLab", response.data.data[0].is_ujilab.toString())
                        setValue("ttd1", response.data.data[0].user_ttd1_id)
                        setvalueHeader("kesimpulan37b", response.data.data[0].kesimpulan)
                        setvalueHeader("rekom37b", response.data.data[0].rekomendasi_id)
                        setvalueHeader("ttd2", response.data.data[0].user_ttd2_id)
                        setvalueHeader("idDok37b", response.data.data[0].id)
                        setvalueHeader("tglDok37b", response.data.data[0].tanggal)
                        setListKesehatan([])
                        
                        response.data.data?.map((data) => (
                            data.target_sasaran1 ? setListKesehatan(listKesehatan => listKesehatan.concat(data)) : null 
                        ))
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });

            const response = modelPeriksa.getAdminByPtkId(base64_decode(ptkNomor[1]))
            response
            .then((response) => {
                // // console.log(response)
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorAdmin: false
                    }));
                    if(response.data.status === '200') {
                        setData(values => ({...values,
                            noAdmin: response.data.data.nomor,
                            tglAdmin: response.data.data.tanggal,
                        }));
                        setValue("idDok37a", response.data.data.id)
                    }
                } else {
                    setData(values => ({...values,
                        errorAdmin: true
                    }));
                }
            })
            .catch((error) => {
                console.log(error);
                // alert(error.response.status + " - " + error.response.data.message)
                setData(values => ({...values,
                    errorAdmin: true
                }));
            });

            const modelPemohon = new PtkModel();
            const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), Cookies.get("jenisKarantina"));
            resKom
            .then((res) => {
                // // console.log(res)
                if(typeof res.data != "string") {
                    setData(values => ({...values,
                        errorKomoditi: false
                    }));
                    if(res.data.status === '200') {
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
                        errorKomoditi: true
                    }));
                }
            })
            .catch((error) => {
                console.log(error);
                setData(values => ({...values,
                    errorKomoditi: true
                }));
            });
            
            const modelOPTK = new Master();
            const resOPTK = modelOPTK.masterOPTK();
            resOPTK
            .then((res) => {
                if(typeof res.data != "string") {
                    setData(values => ({...values,
                        errorOptk: false
                    }));
                    if(res.data.status === '200') {
                        // console.log(res)
                        // setKomoditiPtk(res.data.data)
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
                        errorOptk: true
                    }));
                }
            })
            .catch((error) => {
                console.log(error.response.data);
                setData(values => ({...values,
                    errorOptk: true
                }));
            });
        }
    }, [idPtk, setValue, setvalueHeader])

    function refreshData() {
        if(data.errorAdmin) {
            const modelPeriksa = new PtkPemeriksaan();
            const response = modelPeriksa.getAdminByPtkId(data.idPtk)
            response
            .then((response) => {
                // // console.log(response)
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorAdmin: false
                    }));
                    if(response.data.status === '200') {
                        setData(values => ({...values,
                            noAdmin: response.data.data.nomor,
                            tglAdmin: response.data.data.tanggal,
                        }));
                        setValue("idDok37a", response.data.data.id)
                    }
                } else {
                    setData(values => ({...values,
                        errorAdmin: true
                    }));
                }
            })
            .catch((error) => {
                console.log(error);
                // alert(error.response.status + " - " + error.response.data.message)
                setData(values => ({...values,
                    errorAdmin: true
                }));
            });
        }
        
        if(data.errorKomoditi) {
            const modelPemohon = new PtkModel();
            const resKom = modelPemohon.getKomoditiPtkId(data.idPtk, Cookies.get("jenisKarantina"));
            resKom
            .then((res) => {
                // // console.log(res)
                if(typeof res.data != "string") {
                    setData(values => ({...values,
                        errorKomoditi: false
                    }));
                    if(res.data.status === '200') {
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
                        errorKomoditi: true
                    }));
                }
            })
            .catch((error) => {
                console.log(error);
                setData(values => ({...values,
                    errorKomoditi: true
                }));
            });
        }
            
        if(data.errorOptk) {
            const modelOPTK = new Master();
            const resOPTK = modelOPTK.masterOPTK();
            resOPTK
            .then((res) => {
                if(typeof res.data != "string") {
                    setData(values => ({...values,
                        errorOptk: false
                    }));
                    if(res.data.status === '200') {
                        // console.log(res)
                        // setKomoditiPtk(res.data.data)
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
                        errorOptk: true
                    }));
                }
            })
            .catch((error) => {
                console.log(error.response.data);
                setData(values => ({...values,
                    errorOptk: true
                }));
            });
        }
    }
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-3.7b <span className="fw-light" style={{color: 'blue'}}>LAPORAN HASIL PEMERIKSAAN KESEHATAN</span>
            <div className="offset-sm-6 col-sm-6">
                <a href='https://esps.karantina.pertanian.go.id/elab' rel="noreferrer" target='_blank' className='btn btn-info float-end'><i className="menu-icon tf-icons bx bx-send"></i>elab Barantin</a>
            </div>
        </h4>

    <div className="row">
        <div className="col-xxl">
            <div className="card card-action mb-4">
                <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                    <div className="card-action-title">
                        <div className='row'>
                            <label className="col-sm-1 col-form-label text-sm-end" htmlFor="noDok"><b>No PTK</b></label>
                            <div className="col-sm-3">
                                <input type="text" id="noDok" value={data.noDokumen || ""} className="form-control form-control-sm" placeholder="Nomor Dokumen K.3.7" disabled />
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
                                <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
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
                                    <input type="datetime-local" id="tglDok37b" name='tglDok37b' onInput={(e) => setvalueHeader("tglDok37b", e.target.value)} {...register("tglDok37b", {required: (dataWatch.tglDok37b ? "Mohon isi tanggal dokumen." : false)})} className={errors.tglDok37b ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
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
                                                <div className='float-end' style={{display: (data.errorKomoditi | data.errorOptk | data.errorAdmin ? "block" : "none")}}>
                                                <span className='text-danger'>{data.errorKomoditi ? "Gagal load data komoditi; " : null}</span>
                                                <span className='text-danger'>{data.errorOptk ? "Gagal load data Target/Sasaran Pemeriksaan; " : null}</span>
                                                <span className='text-danger'>{data.errorAdmin ? "Gagal load data Pemeriksaan Administratif" : null}</span>
                                                    <button type='button' className='btn btn-warning btn-xs' onClick={() => refreshData()}><i className='fa-solid fa-sync'></i> Refresh</button>
                                                </div>
                                                <h5>
                                                    <u><b>
                                                        A. Pemeriksaan Fisik/Kesehatan, Pemeriksaan HPHK/HPIK/OPTK
                                                    </b></u>
                                                    <div className="float-end">
                                                        <h5>Perlu uji lab ?
                                                            <div className="form-check form-check-inline" style={{marginLeft:"10px"}}>
                                                                <input className="form-check-input" type="radio" name="isUjiLab" id="ya" value={1} {...register("isUjiLab")} />
                                                                <label className="form-check-label" htmlFor="ya">Ya</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="isUjiLab" id="tidak" value={0}  {...register("isUjiLab")}/>
                                                                <label className="form-check-label" htmlFor="tidak">Tidak</label>
                                                            </div>
                                                        </h5>
                                                    </div>
                                                </h5>
                                                <div className="text-wrap mb-3">
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
                                                                            <button className="btn btn-xs text-danger"><i className='fa-solid fa-trash'></i></button>
                                                                        </td>
                                                                    </tr>)
                                                                : null))
                                                            ) : null }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <h5 title='Pengawasan dan Pengendalian Pangan/Pakan/SDG/PRG/Agensia Hayati/JAI/Tumbuhan dan Satwa Liar/Tumbuhan dan Satwa Langka'><u><b>B. Pengawasan dan Pengendalian</b></u> 
                                                {/* <button type='button' className='btn btn-xs btn-info' data-bs-toggle="modal" data-bs-target="#modWasdal" style={{marginLeft: "15px"}}>Tambah Data</button> */}
                                                </h5>
                                                <div className="text-nowrap mb-4">
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
                                                                            <button className="btn btn-xs text-danger"><i className='fa-solid fa-trash'></i></button>
                                                                        </td>
                                                                    </tr>)
                                                                : null))
                                                            ) : null }
                                                            {/* {listWasdal ? (listWasdal.map((data, index) =>
                                                                    (<tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{data.nama_umum_tercetak}</td>
                                                                        <td>{data.volume_lain + " " + data.satuan_lain}</td>
                                                                        <td>{data.target_sasaran2}</td>
                                                                        <td>{data.metode2}</td>
                                                                        <td>{data.temuan_hasil2}</td>
                                                                        <td>{data.catatan2}</td>
                                                                        <td>
                                                                            <button className="btn btn-xs text-danger"><i className='fa-solid fa-trash'></i></button>
                                                                        </td>
                                                                    </tr>)
                                                                )
                                                            ) : null } */}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className='col-sm-2 form-control-label' htmlFor="ttd1"><b>Penandatangan<span className='text-danger'>*</span></b></div>
                                                    <div className="col-sm-4">
                                                        <input type="text" name='ttd1' id='ttd1' {...register("ttd1", {required: "Mohon pilih penandatangan."})} className={errors.ttd1 ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}/>
                                                        {errors.ttd1 && <small className="text-danger">{errors.ttd1.message}</small>}
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-sm btn-primary me-sm-2 me-1">Simpan Hasil Pemeriksaan</button>
                                                <button type="button" className="btn btn-sm btn-danger me-sm-2 me-1">Hapus</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form onSubmit={handleSubmitHeader(onSubmitHeader)}>
                        <div className="row">
                            <div className='col-sm-2 form-control-label'><b>Kesimpulan</b></div>
                            <div className="col-sm-3 mb-3">
                                <textarea name="kesimpulan37b" id="kesimpulan37b" rows="2" {...registerHeader("kesimpulan37b")} className='form-control form-control-sm'></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-sm-2 form-control-label'><b>Rekomendasi <span className='text-danger'>*</span></b></div>
                            <div className="col-sm-8 mb-3">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="rekom37b" id="rekom37b16" value={16} disabled={dataWatchHeader.rekom37b ? (dataWatchHeader.rekom37b.length === 2 && dataWatchHeader.rekom37b.indexOf('16') < 0 ? true : false) : false} {...registerHeader("rekom37b", { required: "Mohon pilih rekomendasi yang sesuai."})} />
                                    <label className="form-check-label" htmlFor="rekom37b16">Diberi Perlakuan</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="rekom37b" id="rekom37b17" disabled={dataWatchHeader.rekom37b ? (dataWatchHeader.rekom37b.length === 2 && dataWatchHeader.rekom37b.indexOf('17') < 0 ? true : false) : false} value={17} {...registerHeader("rekom37b")} />
                                    <label className="form-check-label" htmlFor="rekom37b17">Ditolak</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="rekom37b" id="rekom37b18" disabled={dataWatchHeader.rekom37b ? (dataWatchHeader.rekom37b.length === 2 && dataWatchHeader.rekom37b.indexOf('18') < 0 ? true : false) : false} value={18} {...registerHeader("rekom37b")} />
                                    <label className="form-check-label" htmlFor="rekom37b18">Dimusnahkan</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="rekom37b" id="rekom37b19" value={19} disabled={dataWatchHeader.rekom37b ? (dataWatchHeader.rekom37b.length === 2 && dataWatchHeader.rekom37b.indexOf('19') < 0 ? true : false) : false} {...registerHeader("rekom37b")} />
                                    <label className="form-check-label" htmlFor="rekom37b19">Dibebaskan</label>
                                </div>
                                {errorsHeader.rekom37b && <small className="text-danger">{errorsHeader.rekom37b.message}</small>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className='col-sm-2 form-control-label'><b>Penandatangan <span className='text-danger'>*</span></b></div>
                            <div className="col-sm-4">
                                <input type="text" name='ttd2' id='ttd2' {...registerHeader("ttd2", {required: (dataWatchHeader.idDok37b ? "Mohon pilih penandatangan." : false)})} className={errorsHeader.ttd2 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                {errorsHeader.ttd2 && <small className="text-danger">{errorsHeader.ttd2.message}</small>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                <button type="button" className="btn btn-danger me-sm-2 me-1">Batal</button>
                                <a href={require("../../dok/k37a.pdf")} rel="noopener noreferrer" target='_blank' className="btn btn-warning"><i className="bx bx-printer bx-xs"></i>&nbsp; Print</a>
                                <button type="button" onClick={() => navigate('/kt1')} className="btn btn-info float-end"><i className="menu-icon tf-icons bx bx-send"></i>Pelepasan</button>
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
                                    <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                    <button type="button" className="btn btn-danger me-sm-2 me-1" data-bs-dismiss="modal" aria-label="Close">Tutup</button>
                                </div>   
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