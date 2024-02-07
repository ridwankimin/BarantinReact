import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import {decode as base64_decode} from 'base-64';
import { useForm } from 'react-hook-form';
import PtkModel from '../../../model/PtkModel';
import PtkSurtug from '../../../model/PtkSurtug';
import PnPelepasan from '../../../model/PnPelepasan';
import PtkHistory from '../../../model/PtkHistory';

function DocKT1() {
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
                    const resHsy = log.pushHistory(data.idPtk, "p8", "K-T.1", (data.idDokKT1 ? 'UPDATE' : 'NEW'));
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
                    setValue("idDokKT1", response.data.data.id)
                    setValue("noDokKT1", response.data.data.nomor)
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
            KT-1 <span className="fw-light" style={{color: 'blue'}}>PHYTOSANITARY FOR EXPORT</span>
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
                            <input type="hidden" id='idDokKT1' {...register("idDokKT1")} />
                            <input type="hidden" id='idPtk' {...register("idPtk")} />
                            <input type="hidden" id='noDokumen' {...register("noDokumen")} />
                            <div className="col-md-12 mt-3">
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label text-sm-start" htmlFor="jenisDokumen">Dokumen <span className='text-danger'>*</span></label>
                                    <div className="col-sm-6">
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
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDokKT1">Nomor Dokumen</label>
                                    <div className="col-sm-3">
                                        <input type="text" id="noDokKT1" name='noDokKT1' {...register("noDokKT1")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-T.1" disabled />
                                    </div>
                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDokKT1">Tanggal <span className='text-danger'>*</span></label>
                                    <div className="col-sm-2">
                                        <input type="datetime-local" id="tglDokKT1" name='tglDokKT1' {...register("tglDokKT1", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDokKT1 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                        {errors.tglDokKT1 && <small className="text-danger">{errors.tglDokKT1.message}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row mb-3">
                                        <label className="col-sm-2 col-form-label text-sm-start" htmlFor="karantinaTujuan">To NPPO <span className='text-danger'>*</span></label>
                                        <div className='col-sm-1' style={{paddingRight:0}}>
                                            <input type="text" id="karantinaTujuanDepan" name='karantinaTujuanDepan' {...register("karantinaTujuanDepan")} class="form-control form-control-sm" />
                                        </div>
                                        <div className='col-sm-2' style={{paddingLeft: 0, paddingRight:0}}>
                                            <input type="text" id="karantinaTujuan" name='karantinaTujuan' {...register("karantinaTujuan")} className="form-control form-control-sm" placeholder="To NPPO.." disabled />
                                        </div>
                                        <div className='col-sm-1' style={{paddingLeft:0}}>
                                            <input type="text" id="karantinaTujuanBeakang" name='karantinaTujuanBeakang' {...register("karantinaTujuanBeakang")} class="form-control form-control-sm" />
                                        </div>

                                        <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noSeri">No Seri <span className='text-danger'>*</span></label>
                                        <div className="col-sm-2">
                                            <input type="text" id="noSeri" name='noSeri' {...register("noSeri", {required: "Mohon isi Nomor seru."})} className={errors.noSeri ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                            {errors.noSeri && <small className="text-danger">{errors.noSeri.message}</small>}
                                        </div>
                                </div>
                            </div>
                            <div className="accordion mb-4" id="collapseSection">
                                <div className="card">
                                    <h2 className="accordion-header" id="headerKeterangan">
                                        <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseKeterangan" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>I. Description of Consignment</h5>
                                        </button>
                                    </h2>
                                    <div id="collapseKeterangan">
                                        <div className="accordion-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                <h5 className='mb-1'><b><u>Exporter</u></b></h5>
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="namaPengirim">Name </label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="namaPengirim" value={data.listPtk && (data.listPtk.nama_pengirim || "")} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="alamatPengirim">Address </label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="alamatPengirim" value={data.listPtk && (data.listPtk.alamat_pengirim || "")} disabled className="form-control form-control-sm" placeholder="Alamat Pengirim" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <h5 className='mb-1'><b><u>Consignee</u></b></h5>
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="namaPenerima">Name </label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="namaPenerima" value={data.listPtk && (data.listPtk.nama_penerima || "")} disabled className="form-control form-control-sm" placeholder="Nama Penerima" />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="alamatPenerima">Address</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="alamatPenerima" value={data.listPtk && (data.listPtk.alamat_penerima || "")} disabled className="form-control form-control-sm" placeholder="Alamat Penerima" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="namaAlatAngkut">Declared means of conveyance</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="namaAlatAngkut" value={data.listPtk && (data.listPtk.nama_alat_angkut_terakhir || "")} disabled className="form-control form-control-sm" placeholder="Nama Alat Angkut" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="entryPoint">Declared point of entry</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="entryPoint" {...register("entryPoint", {required: "Mohon isi pelabuhan bongkar."})} placeholder='Pelabuhan Bongkar' className={errors.entryPoint ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                            {errors.entryPoint && <small className="text-danger">{errors.entryPoint.message}</small>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="placeOrigin">Place of origin</label>
                                                        <div className="col-sm-5">
                                                            <input type="text" id="placeOrigin" value={data.listPtk && (data.listPtk.kota_tujuan || "")} disabled className="form-control form-control-sm" placeholder="Daerah Asal" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="kodeHs">HS Code</label>
                                                        <div className="col-sm-4">
                                                            <input type="text" id="kodeHs" value={data.kodeHs || ""} disabled className="form-control form-control-sm" placeholder="Kode HS" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <h5 className='mb-1'><b><u>Description of Comodities</u></b></h5>
                                                <div className='col-md-12 mb-3'>
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
                                                                                <td>{data.volume_bruto}</td>
                                                                                <td>{data.sat_bruto}</td>
                                                                                <td>{data.volume_lain}</td>
                                                                                <td>{data.sat_lain}</td>
                                                                                <td>{data.jantan}</td>
                                                                                <td>{data.betina}</td>
                                                                                <td>
                                                                                    <div className="dropdown">
                                                                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                            <i className="bx bx-dots-vertical-rounded"></i>
                                                                                        </button>
                                                                                        <div className="dropdown-menu">
                                                                                            <a className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#modKontainer"><i className="bx bx-edit-alt me-1"></i> Edit</a>
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
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="tandaKhusus">Distinguishing marks:</label>
                                                        <div className="col-sm-9">
                                                            <textarea name="tandaKhusus" id="tandaKhusus" rows="2" {...register("tandaKhusus", { required: "Mohon isi keterangan tanda yang membedakan"})} className={errors.tandaKhusus ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder='Distinguishing marks..'></textarea>
                                                        <button type='button' className='btn btn-xs btn-info'>Masukan No Container</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label" htmlFor="bentukTercetak">Description of packages</label>
                                                        <div className="col-sm-6">
                                                            <input type="text" id="bentukTercetak" {...register("bentukTercetak", { required: "Mohon isi bentuk MP tercetak"})} className={errors.bentukTercetak ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                            {errors.bentukTercetak && <small className="text-danger">{errors.bentukTercetak.message}</small>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <h2 className="accordion-header" id="headerDeklarasi">
                                        <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseDeklarasi" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>II. Additional Declaration</h5>
                                        </button>
                                    </h2>
                                    <div id="collapseDeklarasi">
                                        <div className="accordion-body">
                                            <div className="row">
                                                <div className='col-sm-12'>
                                                    <textarea name="adDeclare" id="adDeclare" {...register("adDeclare")} placeholder='Additional Declaration..' rows="3" className='form-control form-control-sm'></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <h2 className="accordion-header" id="headerPerlakuan">
                                        <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapsePerlakuan" aria-expanded="true" aria-controls="collapseImporter">
                                            <h5 className='text-lightest mb-0'>III.	Disinfestation and/or Disinfection Treatment
                                            </h5>
                                        </button>
                                    </h2>
                                    <div id="collapsePerlakuan">
                                        <div className="accordion-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-4 col-form-label" htmlFor="selectPerlakuan">Ambil data dari dokumen :</label>
                                                        <div className="col-sm-3">
                                                            <select name="selectPerlakuan" id="selectPerlakuan" className='form-select form-select-sm'>
                                                                <option value="">--</option>
                                                                <option value={21}>K-5.1</option>
                                                                <option value={22}>K-5.2</option>
                                                                <option value={23}>K-5.3</option>
                                                            </select>
                                                            <input type="hidden" id='idPerlakuan' {...register("idPerlakuan")} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className='mt-2'/>
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
                                        <a href={require("../../../dok/kt1.pdf")} rel="noopener noreferrer" target='_blank' className="btn btn-warning"><i className="bx bx-printer bx-xs"></i>&nbsp; Print</a>
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

export default DocKT1