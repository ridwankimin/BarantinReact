/* eslint-disable eqeqeq */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {decode as base64_decode} from 'base-64';
import PnPelepasan from '../../model/PnPelepasan';
import PtkHistory from '../../model/PtkHistory';
import PtkModel from '../../model/PtkModel';
import PtkSurtug from '../../model/PtkSurtug';
import SpinnerDot from '../../component/loading/SpinnerDot';
const log = new PtkHistory()

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");

function DocK92t() {
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

    const {
        register: registerMPK92t,
        setValue: setValueMPK92t,
        // control: controlMPK92t,
        watch: watchMPK92t,
        handleSubmit: handleFormMPK92t,
        // reset: resetFormKomoditi,
        formState: { errors: errorsMPK92t },
    } = useForm({
        defaultValues: {
            idMPK92t: "",
            volumeNetto: "",
            volumeLain: "",
            satuanLain: "",
            namaUmum: "",
            namaLatin: "",
          }
        })

    const cekdataMPK92t = watchMPK92t()

    function onSubmitMPK92t(data) {
    }

    const onSubmit = (data) => {
        const model = new PnPelepasan();
        const response = model.eksporKT(data);
        response
        .then((response) => {
            if(response.data) {
                if(response.data.status == 201) {
                    //start save history
                    const log = new PtkHistory();
                    const resHsy = log.pushHistory(data.idPtk, "p8", "K-9.2t", (data.idDok92t ? 'UPDATE' : 'NEW'));
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
                    setValue("idDok92t", response.data.data.id)
                    setValue("noDok92t", response.data.data.nomor)
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

    function handleEditKomoditas(e) {
        setValueMPK92t("idMPK92t", e.target.dataset.header)
        setValueMPK92t("idPtk", e.target.dataset.ptk)
        setValueMPK92t("jenisKar", "T")
        const cell = e.target.closest('tr')
        setValueMPK92t("volumeNetto", cell.cells[5].innerHTML)
        setValueMPK92t("satuanNetto", cell.cells[6].innerHTML)
        setValueMPK92t("volumeLain", cell.cells[7].innerHTML)
        setValueMPK92t("satuanLain", cell.cells[8].innerHTML)
        setValueMPK92t("namaUmum", cell.cells[3].innerHTML)
        setValueMPK92t("namaLatin", cell.cells[4].innerHTML)
    }

    function handleEditKomoditasAll() {
        setLoadKomoditi(true)
        data.listKomoditas?.map((item, index) => (
            log.updateKomoditiP8(item.id, datasend[index])
                .then((response) => {
                    if(response.data.status == 201) {
                        if(import.meta.env.VITE_BE_ENV == "DEV") {
                            console.log("history saved")
                        }
                    }
                })
                .catch((error) => {
                    setLoadKomoditi(true)
                    setLoadKomoditiPesan("Terjadi error pada saat simpan, mohon refresh halaman dan coba lagi.")
                    if(import.meta.env.VITE_BE_ENV == "DEV") {
                        console.log(error)
                    }
                })
            )
        )
        setLoadKomoditi(true)
    }

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok92t", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
            const tglPtk = Cookies.get("tglPtk");
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            
            const modelPemohon = new PtkModel();
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
                        listKomoditas: response.data.data.ptk_komoditi,
                        listDokumen: response.data.data.ptk_dokumen
                    }));

                    var arrayKomKT = response.data.data.ptk_komoditi?.map(item => {
                        return {
                            namaUmum: item.nama_umum_tercetak,
                            namaLatin: item.nama_latin_tercetak,
                            jantan: null,
                            betina: null,
                            volumeP8: item.volume_lain,
                            nettoP8: item.volume_netto
                        }
                    })
                    setDataSend(arrayKomKT)
                    
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
            });
        }
    },[idPtk, setValue])
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-9.2.T <span className="fw-light" style={{color: 'blue'}}>Sertifikat Pelepasan Karantina Tumbuhan/Pengawasan</span>
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
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="hidden" id='idDok92t' {...register("idDok92t")} />
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
                                    <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok92t">Nomor Dokumen</label>
                                    <div className="col-sm-3">
                                        <input type="text" id="noDok92t" name='noDok92t' {...register("noDok92t")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-T.1" disabled />
                                    </div>
                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok92t">Tanggal <span className='text-danger'>*</span></label>
                                    <div className="col-sm-2">
                                        <input type="datetime-local" id="tglDok92t" name='tglDok92t' {...register("tglDok92t", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok92t ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                        {errors.tglDok92t && <small className="text-danger">{errors.tglDok92t.message}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="accordion mb-4" id="collapseSection">
                                <div className="card">
                                    <h2 className="accordion-header" id="headerKeterangan">
                                        <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseKeterangan" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>Keterangan Media Pembawa</h5>
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
                                                <h5 className='mb-1'><b><u>Identitas Media Pembawa</u></b>
                                                {loadKomoditi ? <SpinnerDot/> : null}
                                                {data.listKomoditas ? 
                                                (loadKomoditi ? null : <button className='btn btn-sm btn-outline-secondary' onClick={handleEditKomoditasAll} style={{marginLeft: "15px"}}><i className='fa-solid fa-check-square text-success me-sm-2 me-1'></i> Tidak ada perubahan</button>) : null }
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
                                                                    <th>Volume P8</th>
                                                                    <th>Netto P8</th>
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
                                                                                <td>{data.volumeP8}</td>
                                                                                <td>{data.nettoP8}</td>
                                                                                <td>
                                                                                    <button className="btn btn-default dropdown-item" href="#" type="button" onClick={handleEditKomoditas} data-header={data.id} data-ptk={data.ptk_id} data-bs-toggle="modal" data-bs-target="#modKomoditas"><i className="fa-solid fa-pen-to-square me-1"></i> Edit</button>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    ) : null
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="namaUmum">Nama Umum</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="namaUmum" {...register("namaUmum")} className="form-control form-control-sm" placeholder="Nama Umum/Dagang Tercetak.." />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="namaIlmiah">Nama Ilmiah</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="namaIlmiah" {...register("namaIlmiah")} className="form-control form-control-sm" placeholder="Nama Ilmiah Tercetak.." />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="bentukTercetak">Bentuk</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="bentukTercetak" {...register("bentukTercetak")} className="form-control form-control-sm" placeholder="Bentuk Tercetak.." />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="jmlTercetak">Jumlah Tercetak</label>
                                                        <div className="col-sm-6">
                                                            <input type="text" id="jmlTercetak" {...register("jmlTercetak")} className="form-control form-control-sm" placeholder="Jumlah Tercetak.." />
                                                        </div>
                                                    </div>
                                                </div> */}
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="bahanKemasan">Bahan pembungkus/kemasan</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="bahanKemasan" {...register("bahanKemasan")} className="form-control form-control-sm" placeholder="Bahan Pembungkus/Kemasan.." />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="tandaKemasan">Tanda pada pembungkus/kemasan</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="tandaKemasan" {...register("tandaKemasan")} className="form-control form-control-sm" placeholder="Tanda Pembungkus/Kemasan.." />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="tujuanPemasukan">Tujuan pemasukan</label>
                                                        <div className="col-sm-8">
                                                            <input name="tujuanPemasukan" className="form-control form-control-sm" disabled value={data.listPtk && ((data.listPtk.peruntukan) || "")} id="tujuanPemasukan" placeholder="" />
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <h5 className='mb-1'><b><u>Identitas Alat Angkut</u></b></h5>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="jenisNamaAlatAngkut">Jenis dan Nama Alat Angkut</label>
                                                        <div className="col-sm-6">
                                                            <input type="text" id="jenisNamaAlatAngkut" value={data.listPtk && (data.listPtk.tipe_alat_angkut_terakhir_id + ", " + data.listPtk.nama_alat_angkut_terakhir || "")} disabled className="form-control form-control-sm" placeholder="Jenis dan Nama Alat Angkut" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="negaraDaerahAsal">Negara/area asal*) dan tempat pengeluaran</label>
                                                        <div className="col-sm-6">
                                                            <input type="text" id="negaraDaerahAsal" value={data.listPtk && (data.listPtk.negara_muat + ", " + data.listPtk.pelabuhan_muat || "")} disabled className="form-control form-control-sm" placeholder="Negara/area asal*) dan tempat pengeluaran" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="daerahAsalMP">Tempat/area produksi media pembawa</label>
                                                        <div className="col-sm-6">
                                                            <input type="text" id="daerahAsalMP" value={data.listPtk && (data.listPtk.kota_tujuan || "")} disabled className="form-control form-control-sm" placeholder="Tempat/area produksi media pembawa" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="tglTiba">Tanggal tiba</label>
                                                        <div className="col-sm-4">
                                                            <input type="text" id="tglTiba" value={data.listPtk && (data.listPtk.tanggal_rencana_tiba_terakhir || "")} disabled className="form-control form-control-sm" placeholder="Tanggal tiba" />
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
                                            <h5 className='text-lightest mb-0'>Perlakuan
                                            </h5>
                                        </button>
                                    </h2>
                                    <div id="collapsePerlakuan">
                                        <div className="accordion-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="tipePerlakuan">Treatment type</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="tipePerlakuan" placeholder='Tipe Perlakuan' className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="tglPerlakuan">Date of Treatment</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="tglPerlakuan" placeholder="Tanggal Perlakuan" className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="bahanKimia">Chemical (active ingredient)</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="bahanKimia" placeholder="Bahan Kimia yang dipakai" className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="konsentrasi">Concentration</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="konsentrasi" placeholder="Konsentrasi" className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="durasiPerlakuan">Duration</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="durasiPerlakuan" placeholder="Durasi Perlakuan" className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="temperatur">Temperature</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" id="temperatur" placeholder="Temperature" className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <label className="col-sm-2 col-form-label" htmlFor="adInfo">Additional information</label>
                                                        <div className="col-sm-9">
                                                            <textarea name="adInfo" id="adInfo" rows="2" {...register("adInfo")} placeholder='Additional information..' className='form-control form-control-sm'></textarea>
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
                                            <h5 className='text-lightest mb-0'>Dokumen Persyaratan</h5>
                                        </button>
                                    </h2>
                                    <div id="collapsePerlakuan">
                                        <div className="accordion-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="dokPcAsal">Phytosanitary Certificate</label>
                                                        <div className="col-sm-4">
                                                            <input type="text" id='dokPcAsal' className='form-control form-control-sm' placeholder='Phytosanitary Certificate' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="dokSehatAntarArea">Sertifikat Kesehatan Tumbuhan Antar Area</label>
                                                        <div className="col-sm-4">
                                                            <input type="text" id='dokSehatAntarArea' className='form-control form-control-sm' placeholder='Sertifikat Kesehatan Tumbuhan Antar Area' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="dokPengawasan">Surat Keterangan Hasil Pengawasan</label>
                                                        <div className="col-sm-4">
                                                            <input type="text" id='dokPengawasan' className='form-control form-control-sm' placeholder='Surat Keterangan Hasil Pengawasan' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="keteranganTambahan">Keterangan Tambahan</label>
                                                        <div className="col-sm-6">
                                                            <textarea name="keteranganTambahan" id="keteranganTambahan" rows="2" className='form-control form-control-sm' placeholder='Keterangan Tambahan'></textarea>
                                                            {/* <input type="text" id='keteranganTambahan' className='form-control form-control-sm' placeholder='Keterangan Tambahan' /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                        <button type="reset" className="btn btn-danger btn-label-secondary me-sm-2 me-1">Batal</button>
                                        {/* <a href={require("../dok/K92t.pdf")} rel="noopener noreferrer" target='_blank' className="btn btn-warning"><i className="bx bx-printer bx-xs"></i>&nbsp; Print</a> */}
                                    </div>
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
                            <h3 className="address-title">Perubahan Media Pembawa {Cookies.get("jenisKarantina") == 'H' ? 'Hewan' : (Cookies.get("jenisKarantina") == 'I' ? 'Ikan' : 'Tumbuhan')}</h3>
                        </div>
                        <form onSubmit={handleFormMPK92t(onSubmitMPK92t)} className="row g-3">
                        <input type="hidden" name='idMPK92t' {...registerMPK92t("idMPK92t")} />
                        <input type="hidden" name='idPtk' {...registerMPK92t("idPtk")} />
                        <input type="hidden" name='jenisKar' {...registerMPK92t("jenisKar")} />
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaUmum">Nama Umum Tercetak</label>
                                <input type='text' name="namaUmum" id="namaUmum" {...registerMPK92t("namaUmum")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="namaLatin">Nama Latin Tercetak</label>
                                <input type='text' name="namaLatin" id="namaLatin" {...registerMPK92t("namaLatin")} className="form-control form-control-sm" />
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeNetto">Volume Netto Akhir-P8<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" name='volumeNetto' id='volumeNetto' value={cekdataMPK92t.volumeNetto ? addCommas(removeNonNumeric(cekdataMPK92t.volumeNetto)) : ""} {...registerMPK92t("volumeNetto", {required: "Mohon isi volume netto."})} className={errorsMPK92t.volumeNetto ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanNetto' id='satuanNetto' {...registerMPK92t("satuanNetto")} disabled />
                                    </div>
                                </div>
                                {errorsMPK92t.volumeNetto && <small className="text-danger">{errorsMPK92t.volumeNetto.message}</small>}
                            </div>
                            <div className="col-6">
                                <label className="form-label" htmlFor="volumeLain">Volume Lain Akhir-P8</label>
                                <div className='row'>
                                    <div className="col-5" style={{paddingRight: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='volumeLain' id='volumeLain' value={cekdataMPK92t.volumeLain ? addCommas(removeNonNumeric(cekdataMPK92t.volumeLain)) : ""} {...registerMPK92t("volumeLain")} />
                                    </div>
                                    <div className="col-3" style={{paddingLeft: '2px'}}>
                                        <input type="text" className='form-control form-control-sm' name='satuanLain' id='satuanLain' {...registerMPK92t("satuanLain")} disabled />
                                    </div>
                                </div>
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

export default DocK92t