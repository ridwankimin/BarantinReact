import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {decode as base64_decode} from 'base-64';
import PnPelepasan from '../../model/PnPelepasan';
import PtkHistory from '../../model/PtkHistory';
import PtkModel from '../../model/PtkModel';
import PtkSurtug from '../../model/PtkSurtug';

function DocK92t() {
    const idPtk = Cookies.get("idPtkPage");
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

    const onSubmit = (data) => {
        console.log(data)
        const model = new PnPelepasan();
        const response = model.eksporKT(data);
        response
        .then((response) => {
            console.log(response.data)
            if(response.data) {
                if(response.data.status === '201') {
                    //start save history
                    const log = new PtkHistory();
                    const resHsy = log.pushHistory(data.idPtk, "p8", "K-9.2t", (data.idDok92t ? 'UPDATE' : 'NEW'));
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
                    setValue("idDok92t", response.data.data.id)
                    setValue("noDok92t", response.data.data.nomor)
                }
            }
        })
        .catch((error) => {
            console.log(error);
            alert(error.response.status + " - " + error.response.data.message)
        });
    }

    useEffect(()=>{
        if(idPtk) {
            const tglPtk = Cookies.get("tglPtk");
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            
            const modelPemohon = new PtkModel();
            const response = modelPemohon.getPtkId(base64_decode(ptkNomor[1]));
            response
            .then((response) => {
                if(response.data.status === '200') {
                    console.log(response.data.data)

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
                console.log(error.response);
            });

            const modelSurtug = new PtkSurtug();
                // 1: penugasan periksa administratif
            const resSurtug = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), 14);
            resSurtug
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(response.data.status === '200') {
                        // console.log(response.data.data[0])
                        setData(values => ({...values,
                            noSurtug: response.data.data[0].nomor,
                            tglSurtug: response.data.data[0].tanggal,
                        }));
                        setValue("idSurtug", response.data.data[0].id)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                // alert(error.response.status + " - " + error.response.data.message)
            });
        }
    },[idPtk, setValue])
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-9.2.T <span className="text-muted fw-light">(Sertifikat Pelepasan Karantina Tumbuhan/Pengawasan)</span>
        </h4>

        <div className="row">
            <div className="col-xxl">
                <div className="card card-action mb-4">
                    <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                        <div className="card-action-title">
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
                                    <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
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
                                                <h5 className='mb-1'><b><u>Identitas Media Pembawa</u></b></h5>
                                                <div className="col-md-6">
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
                                                </div>
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
                                    <input type="text" {...register("ttdPutusan", { required: "Mohon pilih nama penandatangan."})} className={errors.ttdPutusan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.ttdPutusan && <><br/><small className="text-danger">{errors.ttdPutusan.message}</small></>}
                                </div>
                                <div className='col-sm-2 col-form-label text-sm-end'>Diterbitkan di</div>
                                <div className="col-sm-3 mb-3 pr-2">
                                    <input type="text" {...register("diterbitkan", { required: "Mohon isi tempat terbit dokumen."})} className={errors.diterbitkan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.diterbitkan && <><br/><small className="text-danger">{errors.diterbitkan.message}</small></>}
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="row">
                                    <div className="offset-sm-2 col-sm-9">
                                        <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                        <button type="reset" className="btn btn-danger btn-label-secondary me-sm-2 me-1">Batal</button>
                                        {/* <a href={require("../dok/kt1.pdf")} rel="noopener noreferrer" target='_blank' className="btn btn-warning"><i className="bx bx-printer bx-xs"></i>&nbsp; Print</a> */}
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

export default DocK92t