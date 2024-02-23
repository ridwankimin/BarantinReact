/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import {decode as base64_decode} from 'base-64';
import { useForm } from 'react-hook-form';
import PtkSurtug from '../../model/PtkSurtug';
import PtkModel from '../../model/PtkModel';

function DocK21() {
    const idPtk = Cookies.get("idPtkPage")
    const jenisKar = Cookies.get("jenisKarantina")
    let [komoditiPtk, setKomoditiPtk] = useState([])

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const dataWatch = watch()

    const onSubmit = (data) => {
        console.log(data)
        const modelSurtug = new PtkSurtug();
        const response = modelSurtug.ptkAnalisis(data);
            response
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(response.data.status === '201') {
                        alert(response.data.status + " - " + response.data.message)
                        // resetFormDetilSurtug()
                        setValue("idDok21", response.data.data.id)
                        setValue("noDok21", response.data.data.nomor)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });
    }

    let [data,setData] = useState({
        noDokumen: "",
        tglDokumen: ""
    })
    useEffect(() => {
        if(idPtk) {
            setValue("tglDok21", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
            const tglPtk = Cookies.get("tglPtk");
            const jenisForm = Cookies.get("jenisForm");
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            setData(values => ({...values,
                noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                idPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                noDokumen: idPtk ? base64_decode(ptkNomor[2]): "",
                tglDokumen: tglPtk,
                jenisForm: jenisForm,
                jenisKarantina: Cookies.get("jenisKarantina"),
                noAnalisa: "",
                tglAnalisa: "",
                nomorSurtug: "",
                tglSurtug: "",
            }));
            setValue("idPtk",base64_decode(ptkNomor[1]))
            setValue("noDokumen",base64_decode(ptkNomor[2]))
            setValue("jenisKarantina", Cookies.get("jenisKarantina"))

            const modelPemohon = new PtkModel();
            const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), Cookies.get("jenisKarantina"));
            resKom
            .then((res) => {
                if(res.data.status === '200') {
                    console.log(res.data.data)
                    // setKomoditiPtk(res.data.data)
                    setKomoditiPtk(res.data.data)
                }
            })
            .catch((error) => {
                console.log(error.response.data);
            });
        }
    }, [idPtk, setValue])

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-2.1 <span className="fw-light" style={{color: 'blue'}}>HASIL ANALISA PERMOHONAN/SERAH TERIMA MEDIA PEMBAWA/NHI</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <div className="card card-action mb-4">
                <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                    <div className="card-action-title text-lightest">
                        <div className='row'>
                            <label className="col-sm-1 col-form-label text-sm-end" htmlFor="noDok"><b>No PTK</b></label>
                            <div className="col-sm-3">
                                <input type="text" id="noDok" value={data.noDokumen} className="form-control form-control-sm" placeholder="Nomor Dokumen K.3.7" disabled />
                            </div>
                            <label className="col-sm-1 col-form-label" htmlFor="tglDok"><b>TANGGAL</b></label>
                            <div className="col-sm-2">
                                <input type="datetime-local" id='tglDok' value={data.tglDokumen} className='form-control form-control-sm' disabled/>
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
                        <input type="hidden" name='idDok21' {...register("idDok21")} />
                        <input type="hidden" name='idPtk' {...register("idPtk")} />
                        <input type="hidden" name='noDokumen' {...register("noDokumen")} />
                        <input type="hidden" name='Dok' {...register("noDokumen")} />
                        <input type="hidden" name='jenisKarantina' {...register("jenisKarantina")} />
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-center" htmlFor="noDok21">Nomor</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok21" {...register("noDok21")} className='form-control form-control-sm' placeholder="Nomor" disabled />
                                </div>
                                <label className="col-sm-2 col-form-label text-sm-center" htmlFor="tglDok21">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok21" name='tglDok21' {...register("tglDok21", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok37 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok21 && <small className="text-danger">{errors.tglDok21.message}</small>}
                                </div>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col">
                                <div className="accordion" id="collapseSection">
                                    <div className="card">
                                        <h2 className="accordion-header" id="headerInfoMP">
                                            <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseInfoMP" aria-expanded="true" aria-controls="collapseInfoMP">
                                                <h5 className='text-lightest mb-0'>Informasi Media Pembawa</h5>
                                            </button>
                                        </h2>
                                        <div id="collapseInfoMP">
                                            <div className="accordion-body">
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
                        <div className="row my-4">
                            <div className="col">
                                <div className="accordion" id="collapseSection">
                                    <div className="card">
                                        <h2 className="accordion-header" id="headerAnalisa">
                                            <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseAnalisa" aria-expanded="true" aria-controls="collapseAnalisa">
                                                <h5 className='text-lightest mb-0'>Hasil Analisa Permohonan</h5>
                                            </button>
                                        </h2>
                                        <div id="collapseAnalisa">
                                            <div className="accordion-body">
                                                {/* <div className="row g-3 mb-3"> */}
                                                <div className="col-md-12" style={{display: (jenisKar === "H" ? "block" : "none")}}>
                                                    <label className="col-form-label" htmlFor="mpHPHK">A. Media Pembawa HPHK</label>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiOlah2H">Belum Diolah</label>
                                                                <input name="opsiOlahH" value={2} {...register("opsiOlahH", {required: (data.jenisKarantina === "H" ? "Mohon pilih salah satu (belum/sudah diolah)" : false)})} className={errors.opsiOlahH ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiOlah2H" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiOlah3H">Sudah Diolah</label>
                                                                <input name="opsiOlahH" value={3} {...register("opsiOlahH")} className={errors.opsiOlahH ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiOlah3H" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKH4">Termasuk Pangan</label>
                                                                <input name="opsiKH" value={4} {...register("opsiKH", { required: (data.jenisKarantina === "H" ? "Mohon isi analisa minimal 1 pilihan." : false)})} className={errors.opsiKH ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKH4" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKH5">Termasuk Pakan</label>
                                                                <input name="opsiKH" value={5} {...register("opsiKH")} className={errors.opsiKH ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKH5" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKH6">Produk Rekayasa Genetik</label>
                                                                <input name="opsiKH" value={6} {...register("opsiKH")} className={errors.opsiKH ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKH6" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKH7">Sumber Daya Genetik</label>
                                                                <input name="opsiKH" value={7} {...register("opsiKH")} className={errors.opsiKH ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKH7" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKH8">Agensia Hayati</label>
                                                                <input name="opsiKH" value={8} {...register("opsiKH")} className={errors.opsiKH ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKH8" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKH9">Jenis Asing Invasif</label>
                                                                <input name="opsiKH" value={9} {...register("opsiKH")} className={errors.opsiKH ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKH9" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKH10">Satwa Liar dan Satwa Langka</label>
                                                                <input name="opsiKH" value={10} {...register("opsiKH")} className={errors.opsiKH ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKH10" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKH1">Dilarang Pemasukan / Pengeluarannya</label>
                                                                <input name="opsiKH" value={1} {...register("opsiKH")} className={errors.opsiKH ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKH1" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKH11">Lainnya</label>
                                                                <input name="opsiKH" value={11} {...register("opsiKH")} className={errors.opsiKH ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKH11" />
                                                                <input style={{display: (dataWatch.opsiKH ? (dataWatch.opsiKH.indexOf('11') >= 0 ? 'block' : 'none') : 'none')}} type="text" name='opsiKHLainnya' id='opsiKHLainnya' {...register("opsiKHLainnya")} className='form-control form-control-sm' />
                                                            </div>
                                                        </div>
                                                        {errors.opsiOlah2H && <small className="text-danger">{errors.opsiOlah2H.message}</small>}
                                                        {errors.opsiKH && <small className="text-danger">{errors.opsiKH.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="col-md-12" style={{display: (jenisKar === "I" ? "block" : "none")}}>
                                                    <label className="col-form-label" htmlFor="mpHPIK">B. Media Pembawa HPIK</label>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiOlah13I">Belum Diolah</label>
                                                                <input name="opsiOlahI" value={13} {...register("opsiOlahI", {required: (data.jenisKarantina === "I" ? "Mohon pilih salah satu (belum/sudah diolah)" : false)})} className={errors.opsiOlahI ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiOlah13I" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiOlah14I">Sudah Diolah</label>
                                                                <input name="opsiOlahI" value={14} {...register("opsiOlahI")} className={errors.opsiOlahI ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiOlah14I" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKI15">Termasuk Pangan</label>
                                                                <input name="opsiKI" value={15} {...register("opsiKI", { required: (data.jenisKarantina === "I" ? "Mohon isi analisa minimal 1 pilihan." : false)})} className={errors.opsiKI ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKI15" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKI16">Termasuk Pakan</label>
                                                                <input name="opsiKI" value={16} {...register("opsiKI")} className={errors.opsiKI ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKI16" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKI17">Produk Rekayasa Genetik</label>
                                                                <input name="opsiKI" value={17} {...register("opsiKI")} className={errors.opsiKI ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKI17" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKI18">Sumber Daya Genetik</label>
                                                                <input name="opsiKI" value={18} {...register("opsiKI")} className={errors.opsiKI ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKI18" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKI19">Agensia Hayati</label>
                                                                <input name="opsiKI" value={19} {...register("opsiKI")} className={errors.opsiKI ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKI19" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKI20">Jenis Asing Invasif</label>
                                                                <input name="opsiKI" value={20} {...register("opsiKI")} className={errors.opsiKI ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKI20" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKI21">Jenis Ikan Dilindungi</label>
                                                                <input name="opsiKI" value={21} {...register("opsiKI")} className={errors.opsiKI ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKI21" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKI11">Dilarang Pemasukan / Pengeluarannya</label>
                                                                <input name="opsiKI" value={12} {...register("opsiKI")} className={errors.opsiKI ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKI11" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKI22">Lainnya</label>
                                                                <input name="opsiKI" value={22} {...register("opsiKI")} className={errors.opsiKI ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKI22" />
                                                                <input style={{display: (dataWatch.opsiKI ? (dataWatch.opsiKI.indexOf('22') >= 0 ? 'block' : 'none') : 'none')}} type="text" name='opsiKILainnya' id='opsiKILainnya' {...register("opsiKILainnya")} className='form-control form-control-sm' />
                                                            </div>
                                                        </div>
                                                        {errors.opsiOlahI && <small className="text-danger">{errors.opsiOlahI.message}</small>}
                                                        {errors.opsiKI && <small className="text-danger">{errors.opsiKI.message}</small>}
                                                    </div>
                                                </div>
                                                <div className="col-md-12" style={{display: (jenisKar === "T" ? "block" : "none")}}>
                                                    <label className="col-form-label" htmlFor="mpHPHK">C. Media Pembawa OPTK</label>
                                                    <div className="row">
                                                        <div className="col-sm-4">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiOlah24T">Belum Diolah</label>
                                                                <input name="opsiOlahT" value={24} {...register("opsiOlahT", {required: (data.jenisKarantina === "T" ? "Mohon pilih salah satu (belum/sudah diolah)" : false)})} className={errors.opsiOlahT ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiOlah24T" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiOlah34T">Sudah diolah sampai tingkat yang tidak dapat lagi terinfestasi OPTK/OPT</label>
                                                                <input name="opsiOlahT" value={34} {...register("opsiOlahT")} className={errors.opsiOlahT ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiOlah34T" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiOlah35T">Sudah diolah sampai tingkat yang masih dapat terinfestasi OPTK/OPT</label>
                                                                <input name="opsiOlahT" value={35} {...register("opsiOlahT")} className={errors.opsiOlahT ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiOlah35T" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKT25">Termasuk Pangan</label>
                                                                <input name="opsiKT" value={25} {...register("opsiKT", { required: (data.jenisKarantina === "T" ? "Mohon isi analisa minimal 1 pilihan." : false)})} className={errors.opsiKT ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKT25" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKT26">Termasuk Pakan</label>
                                                                <input name="opsiKT" value={26} {...register("opsiKT")} className={errors.opsiKT ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKT26" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKT27">Produk Rekayasa Genetik</label>
                                                                <input name="opsiKT" value={27} {...register("opsiKT")} className={errors.opsiKT ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKT27" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKT28">Sumber Daya Genetik</label>
                                                                <input name="opsiKT" value={28} {...register("opsiKT")} className={errors.opsiKT ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKT28" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKT29">Agensia Hayati</label>
                                                                <input name="opsiKT" value={29} {...register("opsiKT")} className={errors.opsiKT ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKT29" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKT30">Jenis Asing Invasif</label>
                                                                <input name="opsiKT" value={30} {...register("opsiKT")} className={errors.opsiKT ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKT30" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-5">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiKT31">Tumbuhan Liar dan Tumbuhan Langka</label>
                                                                <input name="opsiKT" value={31} {...register("opsiKT")} className={errors.opsiKT ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKT31" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiDilarangOPTK32">Dimasukkan/dikeluarkan untuk ditanam</label>
                                                                <input name="opsiDilarangOPTK" value={32} {...register("opsiDilarangOPTK", { required: (data.jenisKarantina === "T" ? "Mohon pilih peruntukan pemasukan/pengeluaran MP (ditanam/selain ditaman/dilarang)" : false)})} className={errors.opsiKT ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiDilarangOPTK32" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiDilarangOPTK33">Dimasukkan/dikeluarkan selain untuk ditanam, antara lain untuk konsumsi atau pengolahan lebih lanjut</label>
                                                                <input name="opsiDilarangOPTK" value={33} {...register("opsiDilarangOPTK")} className={errors.opsiKT ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiDilarangOPTK33" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiDilarangOPTK23">Dilarang Pemasukan / Pengeluarannya</label>
                                                                <input name="opsiDilarangOPTK" value={23} {...register("opsiDilarangOPTK")} className={errors.opsiKT ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiDilarangOPTK23" />
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <div className="form-check">
                                                                        <label className="form-check-label" htmlFor="opsiKT36">Lainnya...</label>
                                                                        <input name="opsiKT" value={36} {...register("opsiKT")} className={errors.opsiKT ? "form-check-input is-invalid" : "form-check-input"} type="checkbox" id="opsiKT36" />
                                                                    </div>
                                                                </div>
                                                                <div className='col-sm-9'>
                                                                    <input style={{display: (dataWatch.opsiKT ? (dataWatch.opsiKT.indexOf('36') >= 0 ? 'block' : 'none') : 'none')}} type="text" placeholder='Lainnya..' name='opsiKTLainnya' id='opsiKTLainnya' {...register("opsiKTLainnya")} className='form-control form-control-sm' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {errors.opsiOlahT && <small className="text-danger">{errors.opsiOlahT.message}</small>}
                                                        {errors.opsiDilarangOPTK && <small className="text-danger">{errors.opsiDilarangOPTK.message}</small>}
                                                        {errors.opsiKT && <small className="text-danger">{errors.opsiKT.message}</small>}
                                                    </div>
                                                </div>
                                                {/* </div> */}
                                                <hr />
                                                <div className="col-md-12 mb-4">
                                                    <label className="col-form-label text-sm-start" htmlFor="collapse-country-origin">D. Laporan Intelijen dan Serah Terima Media Pembawa</label>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiNHI37">Media Pembawa tidak dilaporkan ke Pejabat Karantina</label>
                                                                <input name="opsiNHI" value={37} {...register("opsiNHI", { required: (data.jenisForm === "NHI" | data.jenisForm === "BST" ? "Mohon pilih analisa yang sesuai." : false)})} className={errors.opsiNHI ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiNHI37" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiNHI38">Media Pembawa tidak diserahkan ke Pejabat Karantina</label>
                                                                <input name="opsiNHI" value={38} {...register("opsiNHI")} className={errors.opsiNHI ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiNHI38" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiNHI39">Media Pembawa tidak dilalulintaskan melalui Tempat Pemasukan/Pengeluaran yang ditetapkan</label>
                                                                <input name="opsiNHI" value={39} {...register("opsiNHI")} className={errors.opsiNHI ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiNHI39" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiNHI40">Tidak Ditemukan Pemilik</label>
                                                                <input name="opsiNHI" value={40} {...register("opsiNHI")} className={errors.opsiNHI ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiNHI40" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiNHI41">Profilling Pemilik</label>
                                                                <input name="opsiNHI" value={41} {...register("opsiNHI")} className={errors.opsiNHI ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiNHI41" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="opsiNHI42">Hasil penyerahan Media Pembawa dari Instansi/Aparat Penegak Hukum Lain/Masyarakat</label>
                                                                <input name="opsiNHI" value={42} {...register("opsiNHI")} className={errors.opsiNHI ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiNHI42" />
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <div className="form-check">
                                                                        <label className="form-check-label" htmlFor="opsiNHI43">Lainnya...</label>
                                                                        <input name="opsiNHI" value={43} {...register("opsiNHI")} className={errors.opsiNHI ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="opsiNHI43" />
                                                                    </div>
                                                                </div>
                                                                <div className='col-sm-9'>
                                                                    <input style={{display: (dataWatch.opsiNHI === '43' ? 'block' : 'none')}} type="text" placeholder='Lainnya..' name='opsiNHILainnya' id='opsiNHILainnya' {...register("opsiNHILainnya")} className='form-control form-control-sm' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className='form-control-label'><b>Rekomendasi <span className='text-danger'>*</span></b></div>
                                                    <div className="col-sm-5 mt-0 mb-2">
                                                        <select className={errors.rekomAnalis === '' ? 'form-select form-select-sm is-invalid' : 'form-select form-select-sm'} {...register("rekomAnalis", { required: "Mohon pilih rekomendasi yang sesuai."})}>
                                                            <option value=''>--</option>
                                                            <option value={1}>Media Pembawa dikenai tindakan karantina</option>
                                                            <option value={2}>Media Pembawa dikenai pengawasan</option>
                                                            <option value={3}>Media Pembawa dikenai tindakan karantina dan pengawasan</option>
                                                            <option value={4}>Media Pembawa tidak dikenai tindakan karantina dan pengawasan</option>
                                                            <option value={5}>Wasmalitrik</option>
                                                        </select>
                                                        {errors.rekomAnalis && <small className="text-danger">{errors.rekomAnalis.message}</small>}
                                                    </div>
                                                    <div className='form-control-label'><b>Penandatangan <span className='text-danger'>*</span></b></div>
                                                    <div className="col-sm-5 mt-0">
                                                        <input type="text" className={errors.ttdAnalis === '' ? 'form-control form-control-sm is-invalid' : 'form-control form-control-sm'} {...register("ttdAnalis", { required: "Mohon pilih nama penandatangan."})}/>
                                                        {/* <select className={dataWatch.ttdAdminidtratif === '' ? 'form-select form-select-sm is-invalid' : 'form-select form-select-sm'} {...registerAdministratif("ttdAdminidtratif", { required: "Mohon pilih nama penandatangan."})}>
                                                            <option value="">--</option>
                                                            <option value='1'>Dilakukan penahanan dan/atau melengkapi dokumen</option>
                                                            <option value='2'>Dilakukan pengasingan dan pengamatan</option>
                                                            <option value='3'>Ditolak</option>
                                                            <option value='4'>Dilanjutkan pemeriksaan kesehatan</option>
                                                        </select> */}
                                                        {errors.ttdAnalis && <small className="text-danger">{errors.ttdAnalis.message}</small>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                <button type="button" className="btn btn-danger me-sm-2 me-1">Batal</button>
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

export default DocK21