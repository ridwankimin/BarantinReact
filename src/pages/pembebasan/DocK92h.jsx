/* eslint-disable eqeqeq */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import {decode as base64_decode} from 'base-64';
import { useForm } from 'react-hook-form';
import PtkSurtug from '../../model/PtkSurtug';
import PtkModel from '../../model/PtkModel';
import SpinnerDot from '../../component/loading/SpinnerDot';
import PtkHistory from '../../model/PtkHistory';
import PnPelepasan from '../../model/PnPelepasan';
import ModaAlatAngkut from '../../model/master/modaAlatAngkut.json';
import Keterangan from '../../model/master/keterangan.json';

const log = new PtkHistory()
const modelPemohon = new PtkModel();
const modelPelepasan = new PnPelepasan();
        
const addCommas = num => {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};
const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");

function DocK92h() {
    const idPtk = Cookies.get("idPtkPage");
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

    const onSubmit = (data) => {
        const response = modelPelepasan.imporAreaKH(data);
        response
        .then((response) => {
            if(response.data) {
                if(response.data.status == 201) {
                    //start save history
                    // const log = new PtkHistory();
                    const resHsy = log.pushHistory(data.idPtk, "p8", "K-9.2.H", (data.idDokKT1 ? 'UPDATE' : 'NEW'));
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

                    alert(response.data.status + " - " + response.data.message)
                    setValue("idDok92h", response.data.data.id)
                    setValue("noDok92h", response.data.data.nomor)
                }
            }
        })
        .catch((error) => {
            if(import.meta.env.VITE_BE_ENV == "DEV") {
                console.log(error)
            }
            alert(error.response.status + " - " + error.response.data.message)
        });
    }

    const {
        register: registerMPk92h,
        setValue: setValueMPk92h,
        // control: controlMPk92h,
        watch: watchMPk92h,
        handleSubmit: handleFormMPk92h,
        reset: resetFormKomoditik92h,
        formState: { errors: errorsMPk92h },
    } = useForm({
        defaultValues: {
            idMPk92h: "",
            volumeNetto: "",
            volumeLain: "",
            satuanLain: "",
            namaUmum: "",
            namaLatin: "",
            jantanP8: "",
            betinaP8: "",
          }
        })

    const cekdataMPk92h = watchMPk92h()

    function onSubmitMPk92h(data) {
        log.updateKomoditiP8(data.idMPk92h, data)
        .then((response) => {
            if(response.data.status == 201) {
                alert(response.data.status + " - " + response.data.message)
                resetFormKomoditik92h()
                refreshListKomoditas()
            }
        })
        .catch((error) => {
            if(import.meta.env.VITE_BE_ENV == "DEV") {
                console.log(error)
            }
        })
    }

    function keterangan92h() {
        return Keterangan.filter((element) => element.dokumen == "K-9.2.H")
    }

    function modaAlatAngkut(e){
        return ModaAlatAngkut.find((element) => element.id == parseInt(e))
    }

    function handleEditKomoditas(e) {
        setValueMPk92h("idMPk92h", e.target.dataset.headerid)
        setValueMPk92h("idPtk", e.target.dataset.ptk)
        setValueMPk92h("jenisKar", "H")
        const cell = e.target.closest('tr')
        setValueMPk92h("nettoP8", cell.cells[5].innerHTML)
        setValueMPk92h("satuanNetto", cell.cells[6].innerHTML)
        setValueMPk92h("volumeP8", cell.cells[7].innerHTML)
        setValueMPk92h("satuanLain", cell.cells[8].innerHTML)
        setValueMPk92h("namaUmum", cell.cells[3].innerHTML)
        setValueMPk92h("namaLatin", cell.cells[4].innerHTML)
        setValueMPk92h("volumeP8", cell.cells[7].innerHTML)
        setValueMPk92h("jantanP8", cell.cells[9].innerHTML)
        setValueMPk92h("betinaP8", cell.cells[10].innerHTML)
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
                    }
                })
                .catch((error) => {
                    setLoadKomoditi(false)
                    setLoadKomoditiPesan("Terjadi error pada saat simpan, mohon refresh halaman dan coba lagi.")
                    if(import.meta.env.VITE_BE_ENV == "DEV") {
                        console.log(error)
                    }
                })
            )
        )
        setLoadKomoditi(false)
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

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok92h", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
            const tglPtk = Cookies.get("tglPtk");
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            
            const response = modelPemohon.getPtkId(base64_decode(ptkNomor[1]));
            response
            .then((response) => {
                if(response.data.status == 200) {
                    let kodeHSData = response.data.data.ptk_komoditi?.map(item => {
                        return item.kode_hs
                    })
                    let namaUmumMP = response.data.data.ptk_komoditi?.map(item => {
                        return item.nama_umum_tercetak
                    })
                    let namaIlmiahMP = response.data.data.ptk_komoditi?.map(item => {
                        return item.nama_latin_tercetak
                    })
                    let VolumeMP = response.data.data.ptk_komoditi?.map(item => {
                        return item.volume_lain + " " + item.sat_lain
                    })
                    // alert(response.data.message);
                    setData(values => ({...values,
                        noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                        noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                        noDokumen: idPtk ? base64_decode(ptkNomor[2]) : "",
                        tglDokumen: tglPtk,
                        kodeHs: kodeHSData.join(";"),
                        // mpTercetak: namaUmumMP.join(";"),
                        listPtk: response.data.data.ptk,
                        // listKomoditas: response.data.data.ptk_komoditi,
                        listDokumen: response.data.data.ptk_dokumen
                    }));

                    const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), "H");
                    resKom
                    .then((res) => {
                        if(res.data.status == 200) {
                            setData(values => ({...values,
                                listKomoditas: res.data.data
                            }));
                            var arrayKomKH = res.data.data.map(item => {
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
                        }
                    })
                    .catch((error) => {
                        if(import.meta.env.VITE_BE_ENV == "DEV") {
                            console.log(error)
                        }
                    });
                    
                    setValue("tandaKhusus", response.data.data.ptk.tanda_khusus)
                    setValue("namaUmum", namaUmumMP.join(";"))
                    setValue("namaIlmiah", namaIlmiahMP.join(";"))
                    setValue("jmlTercetak", VolumeMP.join(";"))
                    setValue("karantinaTujuan", response.data.data.ptk.negara_penerima)
                    setValue("entryPoint", response.data.data.ptk.pelabuhan_bongkar + ", " + response.data.data.ptk.negara_bongkar)
                    setValue("idPtk", base64_decode(ptkNomor[1]))
                    setValue("noDokumen", base64_decode(ptkNomor[2]))
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
            });

            const resPelId = modelPelepasan.getById(base64_decode(ptkNomor[1]), "H");
            resPelId
            .then((response) => {
                if(response.data) {
                    if(response.data.status == 200) {
                        setValue("idDok92h", response.data.data.id)
                        setValue("noDok92h", response.data.data.nomor)
                        setValue("tglDok92h", response.data.data.tanggal)
                        setValue("noSeri", response.data.data.nomor_seri)
                        setValue("jenisDokumen", response.data.data.status_dok)
                        setValue("m1", response.data.data.m1 !== null ? response.data.data.m1.toString() : "")
                        setValue("m2", response.data.data.m2 !== null ? response.data.data.m2.toString() : "")
                        setValue("m3", response.data.data.m3 !== null ? response.data.data.m3.toString() : "")
                        setValue("m4", response.data.data.m_lain !== null ? "1" : "")
                        setValue("m4Lain", response.data.data.m_lain)
                        setValue("adDeclare", response.data.data.p_lain)
                        setValue("isAttach", response.data.data.is_attachment !== null ? response.data.data.is_attachment.toString() : "")
                        setValue("ttdPutusan", response.data.data.user_ttd_id?.toString())
                        setValue("diterbitkan", response.data.data.diterbitkan_di)

                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
            });

            const modelSurtug = new PtkSurtug();
                // 1: penugasan periksa administratif
            const resSurtug = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), 14);
            resSurtug
            .then((response) => {
                if(response.data) {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            noSurtug: response.data.data[0].nomor,
                            tglSurtug: response.data.data[0].tanggal,
                            petugas: response.data.data
                        }));
                        setValue("idSurtug", response.data.data[0].id)
                    }
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                // alert(error.response.status + " - " + error.response.data.message)
            });
        }
    },[idPtk, setValue])

  return (
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="py-3 breadcrumb-wrapper mb-4">
            K-9.2.H <span class="fw-light" style={{color: 'blue'}}>Sertifikat Pelepasan Karantina Hewan</span>
        </h4>

        <div class="row">
            <div class="col-xxl">
                <div class="card card-action mb-4">
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
                    <form class="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" id='idDok92h' {...register("idDok92h")} />
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
                                    <input type="text" id="noSeri" name='noSeri' {...register("noSeri", {required: "Mohon isi Nomor seru."})} className={errors.noSeri ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.noSeri && <small className="text-danger">{errors.noSeri.message}</small>}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok92h">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok92h" name='noDok92h' {...register("noDok92h")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-9.2.H" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok92h">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok92h" name='tglDok92h' {...register("tglDok92h", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok92h ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok92h && <small className="text-danger">{errors.tglDok92h.message}</small>}
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
                                                        <input type="text" id="namaPengirim" value={data.listPtk && (data.listPtk.nama_pengirim || "")} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h5 className='mb-1'><b><u>Identitas Penerima</u></b></h5>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="namaPenerima">Nama</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="namaPenerima" value={data.listPtk && (data.listPtk.nama_penerima || "")} disabled className="form-control form-control-sm" placeholder="Nama Penerima" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-1">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatPengirim">Alamat</label>
                                                    <div className="col-sm-8">
                                                        <textarea name="alamatPengirim" className="form-control form-control-sm" disabled value={data.listPtk && (data.listPtk.alamat_pengirim || "")} id="alamatPengirim" rows="2" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatPenerima">Alamat</label>
                                                    <div className="col-sm-8">
                                                        <textarea name="alamatPenerima" className="form-control form-control-sm" disabled value={data.listPtk && (data.listPtk.alamat_penerima || "")} id="alamatPenerima" rows="2" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasPengirim">Identitas</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitastPengirim" className="form-control form-control-sm" disabled value={data.listPtk && ((data.listPtk.jenis_identitas_pengirim + " - " + data.listPtk.nomor_identitas_pengirim) || "")} id="identitasPengirim" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasPenerima">Identitas</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasPenerima" className="form-control form-control-sm" disabled value={data.listPtk && ((data.listPtk.jenis_identitas_penerima + " - " + data.listPtk.nomor_identitas_penerima) || "")} id="identitasPenerima" placeholder="" />
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
                                                        <input name="daerahAsal" className="form-control form-control-sm" disabled value={data.listPtk && ((data.listPtk.permohonan == "DK" ? data.listPtk.kota_asal : data.listPtk.negara_asal) || "")} id="daerahAsal" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="daerahTujuan">{data.listPtk ? (data.listPtk.permohonan == "DK" ? "Daerah" : "Negara") : ""} Tujuan</label>
                                                    <div className="col-sm-8">
                                                        <input name="daerahTujuan" className="form-control form-control-sm" disabled value={data.listPtk && ((data.listPtk.permohonan == "DK" ? data.listPtk.kota_tujuan : data.listPtk.negara_tujuan) || "")} id="daerahTujuan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatKeluar">Tempat Pengeluaran / Tgl</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatKeluar" className="form-control form-control-sm" disabled value={data.listPtk && ((data.listPtk.pelabuhan_muat + " / " + data.listPtk.tanggal_rencana_berangkat_terakhir) || "")} id="tempatKeluar" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatMasuk">Tempat Pemasukan / Tgl</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatMasuk" className="form-control form-control-sm" disabled value={data.listPtk && ((data.listPtk.pelabuhan_bongkar + " / " + data.listPtk.tanggal_rencana_tiba_terakhir) || "")} id="tempatMasuk" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="tempatTransit">Tempat Transit</label>
                                                    <div className="col-sm-8">
                                                        <input name="tempatTransit" className="form-control form-control-sm" disabled value={data.listPtk && ((data.listPtk.pelabuhan_transit == null ? "-" : data.listPtk.pelabuhan_transit + ", " + data.listPtk.negara_transit) || "")} id="tempatTransit" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasAngkut">Jenis, Nama Alat Angkut</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitasAngkut" className="form-control form-control-sm" disabled value={data.listPtk && (modaAlatAngkut(data.listPtk.moda_alat_angkut_terakhir_id).nama + ", " + data.listPtk.nama_alat_angkut_terakhir || "")} id="identitasAngkut" />
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
                                                                            <td>{data.volume_netto}</td>
                                                                            <td>{data.sat_netto}</td>
                                                                            <td>{data.volume_lain}</td>
                                                                            <td>{data.sat_lain}</td>
                                                                            <td>{data.jantan}</td>
                                                                            <td>{data.betina}</td>
                                                                            <td>{data.volumeP8}</td>
                                                                            <td>{data.nettoP8}</td>
                                                                            <td>{data.jantanP8}</td>
                                                                            <td>{data.betinaP8}</td>
                                                                            <td>
                                                                                <button className="btn btn-default dropdown-item" href="#" type="button" onClick={handleEditKomoditas} data-headerid={data.id} data-ptk={data.ptk_id} data-bs-toggle="modal" data-bs-target="#modKomoditas"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</button>
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
                                                {keterangan92h().map(data => (
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" {...register("m" + data.id)} value={1} id={"m" + data.id} />
                                                        <label className="form-check-label" htmlFor={"m" + data.id}>
                                                            {data.deskripsi}
                                                        </label>
                                                        {data.id == 4 ?
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
                                                <textarea name="adDeclare" id="adDeclare" {...register("adDeclare")} rows="3" className='form-control form-control-sm' placeholder='Deklarasi..'></textarea>
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
                                    {data.petugas?.map((item, index) => (
                                        <option value={item.penanda_tangan_id} key={index} defaultValue={cekWatch.ttdPutusan}>{item.nama + " - " + item.nip}</option>
                                    ))}
                                </select>
                                {/* <input type="text" {...register("ttdPutusan", { required: "Mohon pilih nama penandatangan."})} className={errors.ttdPutusan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} /> */}
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
                                    <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                    <button type="button" className="btn btn-danger btn-label-secondary me-sm-2 me-1">Batal</button>
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
                        <form onSubmit={handleFormMPk92h(onSubmitMPk92h)} className="row g-3">
                        <input type="hidden" name='idMPk92h' {...registerMPk92h("idMPk92h")} />
                        <input type="hidden" name='idPtk' {...registerMPk92h("idPtk")} />
                        <input type="hidden" name='jenisKar' {...registerMPk92h("jenisKar")} />
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaUmum">Nama Umum Tercetak</label>
                                <input type='text' name="namaUmum" id="namaUmum" {...registerMPk92h("namaUmum")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaLatin">Nama Latin Tercetak</label>
                                <input type='text' name="namaLatin" id="namaLatin" {...registerMPk92h("namaLatin")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="nettoP8">Volume Netto Akhir-P8<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" name='nettoP8' id='nettoP8' value={cekdataMPk92h.nettoP8 ? addCommas(removeNonNumeric(cekdataMPk92h.nettoP8)) : ""} {...registerMPk92h("nettoP8", {required: "Mohon isi volume netto."})} className={errorsMPk92h.nettoP8 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanNetto' id='satuanNetto' {...registerMPk92h("satuanNetto")} disabled />
                                    </div>
                                </div>
                                {errorsMPk92h.volumeNetto && <small className="text-danger">{errorsMPk92h.volumeNetto.message}</small>}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeP8">Volume Lain Akhir-P8</label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='volumeP8' id='volumeP8' value={cekdataMPk92h.volumeP8 ? addCommas(removeNonNumeric(cekdataMPk92h.volumeP8)) : ""} {...registerMPk92h("volumeP8")} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanLain' id='satuanLain' {...registerMPk92h("satuanLain")} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6" style={{display: (data.listPtk ? (data.listPtk.jenis_media_pembawa_id == 1 ? "block" : "none") : "none")}}>
                                <label className="form-label" htmlFor="jantanP8">Jumlah Jantan Akhir-P8<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-3" style={{paddingRight: '2px'}}>
                                        <input type="text" name='jantanP8' id='jantanP8' value={cekdataMPk92h.jantanP8 ? addCommas(removeNonNumeric(cekdataMPk92h.jantanP8)) : ""} {...registerMPk92h("jantanP8", {required: (data.listPtk ? (data.listPtkjenis_media_pembawa_id == 1 ? "Mohon isi jumlah akhir Jantan." : false) : false)})} className={errorsMPk92h.jantanP8 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-2" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanjantanP8' id='satuanjantanP8' value={"EKR"} disabled />
                                    </div>
                                </div>
                                {errorsMPk92h.jantanP8 && <small className="text-danger">{errorsMPk92h.jantanP8.message}</small>}
                            </div>
                            <div className="col-6" style={{display: (data.listPtk ? (data.listPtk.jenis_media_pembawa_id == 1 ? "block" : "none") : "none")}}>
                                <label className="form-label" htmlFor="betinaP8">Jumlah Betina Akhir-P8<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-3" style={{paddingRight: '2px'}}>
                                        <input type="text" name='betinaP8' id='betinaP8' value={cekdataMPk92h.betinaP8 ? addCommas(removeNonNumeric(cekdataMPk92h.betinaP8)) : ""} {...registerMPk92h("betinaP8", {required: (data.listPtk ? (data.listPtkjenis_media_pembawa_id == 1 ? "Mohon isi jumlah akhir Betina." : false) : false)})} className={errorsMPk92h.betinaP8 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-2" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanbetinaP8' id='satuanbetinaP8' value={"EKR"} disabled />
                                    </div>
                                </div>
                                {errorsMPk92h.jantanP8 && <small className="text-danger">{errorsMPk92h.jantanP8.message}</small>}
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

export default DocK92h