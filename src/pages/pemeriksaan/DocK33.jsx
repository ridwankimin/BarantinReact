/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import {decode as base64_decode} from 'base-64';
import Cookies from 'js-cookie';
import PtkModel from '../../model/PtkModel';
import PtkPemeriksaan from '../../model/PtkPemeriksaan';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

const modelPemohon = new PtkModel()
const modelPeriksa = new PtkPemeriksaan()

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

function DocK33() {
    const idPtk = Cookies.get("idPtkPage");
    let [data, setData] = useState({
        noAju: "",
        noIdPtk: "",
        noDokumen: "",
        tglDokumen: "",
    })
    let [listDetilSampel, setListDetilSampel] = useState([])
    let [dataSelect, setDataSelect] = useState([])

    let [detilSampel, setDetilSampel] = useState({
        idDetil: "",
        idkom: "",
        identitas: "",
        kode: "",
        kondisi: "",
        suhu: "-",
        noKontainer: "",
        keterangan: "",
    })

    function handleDetilSampel(e) {
        e.preventDefault()
        setListDetilSampel([...listDetilSampel, { 
            ptk_komoditas_id: detilSampel.idkom,

        }]);
         setDetilSampel(values => ({...values, 
            idDetil: "",
            idkom: "",
            identitas: "",
            kode: "",
            kondisi: "",
            suhu: "-",
            noKontainer: "",
            keterangan: "",
        }));
    }
    const {
        register,
        setValue,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm({
        noDok31: ""
    });

    const onSubmit = (data) => {
        // console.log(data)
        const response = modelPeriksa.pnBongkar31(data);
        response
        .then((response) => {
            // console.log(response.data)
            if(response.data) {
                if(response.data.status === '201') {
                    Swal.fire({
                        title: "Sukses!",
                        text: "Surat Persetujuan/Penolakan Bongkar berhasil " + (data.idDok31 ? "diedit." : "disimpan."),
                        icon: "success"
                    });
                    // alert(response.data.status + " - " + response.data.message)
                    // setValueDetilSurtug("idHeader", response.data.data.id)
                    setValue("idDok31", response.data.data.id)
                    setValue("noDok31", response.data.data.nomor)
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: response.data.status + " - " + response.data.message,
                        icon: "error"
                    });
                }
            }
        })
        .catch((error) => {
            console.log(error);
            // alert(error.response.status + " - " + error.response.data.message)
            Swal.fire({
                title: "Error!",
                text: error.response.status + " - " + error.response.data.message,
                icon: "error"
            });
        });
    }

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok31", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
            const tglPtk = Cookies.get("tglPtk");
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            
            const response = modelPemohon.getPtkId(base64_decode(ptkNomor[1]));
            response
            .then((response) => {
                if(response.data.status === '200') {
                    // console.log(response.data.data)
                    // alert(response.data.message);
                    // isiDataPtk(response)
                    setData(values => ({...values,
                        noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                        noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                        noDokumen: idPtk ? base64_decode(ptkNomor[2]) : "",
                        tglDokumen: tglPtk,
                        listPtk: response.data.data.ptk,
                        listKomoditas: response.data.data.ptk_komoditi,
                        listDokumen: response.data.data.ptk_dokumen
                    }));
                    setValue("idPtk", base64_decode(ptkNomor[1]))
                    setValue("noDokumen", base64_decode(ptkNomor[2]))
                    const arraySelectKomoditi = response.data.data.ptk_komoditi.map(item => {
                        return {
                            value: item.id,
                            label: item.nama_umum_tercetak + " - " + item.nama_latin_tercetak
                        }
                    })
                    setDataSelect(values => ({...values, komoditas: arraySelectKomoditi }));
                }
            })
            .catch((error) => {
                // setData()
                console.log(error);
            });
            
            const response31 = modelPeriksa.getPnBongkar(base64_decode(ptkNomor[1]));
            response31
            .then((response) => {
                if(response.data.status === '200') {
                    setValue("idPtk", response.data.data.id)
                    setValue("noDok31", response.data.data.nomor)
                    setValue("tglDok31", response.data.data.tanggal)
                    setValue("putusanBongkar", response.data.data.setuju_bongkar_muat)
                    setValue("ttdPutusan", response.data.data.user_ttd_id)
                }
            })
            .catch((error) => {
                // setData()
                console.log(error);
            });
        }
    },[idPtk, setValue])
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-3.3 <span className="fw-light" style={{color: 'blue'}}>BERITA ACARA PENGAMBILAN CONTOH</span>
        </h4>

        <div className="row">
            <div className="col-xxl">
                <div className='card card-action mb-4'>
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
                                    <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok37a">Nomor Pemeriksaan Administrasi</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok37a" name='noDok37a' {...register("noDok37a")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-3.7a" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok37a">Tanggal</label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok37a" disabled name='tglDok37a' {...register("tglDok37a")} className="form-control form-control-sm" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok33">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok63" name='noDok33' {...register("noDok33")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-3.3" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok33">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok33" name='tglDok33' {...register("tglDok33", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok63 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok33 && <small className="text-danger">{errors.tglDok33.message}</small>}
                                </div>
                            </div>
                        </div>
                        <div className="accordion mb-4" id="collapseSection">
                            <div className="card">
                                <h2 className="accordion-header" id="headerKeterangan">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseKeterangan"  style={{backgroundColor: '#123138'}} aria-expanded="true" aria-controls="collapseCountry">
                                        <h5 className='text-lightest mb-0'>I. Rincian Keterangan</h5>
                                    </button>
                                </h2>
                                <div id="collapseKeterangan">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h5 className='mb-1'><b><u>Identitas Pemilik</u></b></h5>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="namaPengirim">Nama</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="namaPengirim" value={(data.listPtk ? data.listPtk.nama_pemohon : "") || ""} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="alamatPengirim">Alamat</label>
                                                    <div className="col-sm-8">
                                                        <textarea name="alamatPengirim" className="form-control form-control-sm" disabled value={(data.listPtk ? data.listPtk.alamat_pemohon : "") || ""} id="alamatPengirim" rows="2" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label" htmlFor="identitasPengirim">Identitas</label>
                                                    <div className="col-sm-8">
                                                        <input name="identitastPengirim" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.jenis_identitas_pemohon + " - " + data.listPtk.nomor_identitas_pemohon) : "") || ""} id="identitasPengirim" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <h5><b><u>Detail Media Pembawa</u></b></h5>
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
                                                        <th>Jumlah</th>
                                                        <th>Satuan</th>
                                                        <th>Jantan</th>
                                                        <th>Betina</th>
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
                            <div className="card">
                                <h2 className="accordion-header" id="headerAlasan">
                                    <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseAlasan" aria-expanded="true" aria-controls="collapseImporter">
                                        <h5 className='text-lightest mb-0'>II. Detil Pelaksanaan Pengambilan Contoh</h5>
                                    </button>
                                </h2>
                                <div id="collapseAlasan">
                                    <div className="accordion-body">
                                        <button type='button' className='btn btn-sm btn-info mb-3' data-bs-toggle="modal" data-bs-target="#modSampling">Tambah Data</button>
                                        <div className="table-responsive text-nowrap" style={{height: "300px"}}>
                                            <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Nama Komoditas (Umum/Latin)</th>
                                                        <th>Identitas Contoh</th>
                                                        <th>Kode Contoh</th>
                                                        <th>Kondisi Contoh</th>
                                                        <th>Suhu Contoh</th>
                                                        <th>Nomor Kontainer/Palka</th>
                                                        <th>Keterangan</th>
                                                        <th>Act</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listDetilSampel ? (listDetilSampel?.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>""</td>
                                                                    <td>{item.identitas_contoh}</td>
                                                                    <td>{item.kode_contoh}</td>
                                                                    <td>{item.kondisi_contoh}</td>
                                                                    <td>{item.suhu_contoh}</td>
                                                                    <td>{item.nomor_kontainer}</td>
                                                                    <td>{item.keterangan}</td>
                                                                    <td>#</td>
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
                            <div className='row'>
                                <div className="col-sm-5" style={{marginLeft: "15px"}}>
                                    <div className='col-sm-6 mb-3 mt-2'>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" name="isAttach" id="isAttach" value="1" {...register("isAttach")} />
                                            <label className="form-check-label" htmlFor="isAttach">Attachment</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <div className='col-form-label mb-0'>Penandatangan</div>
                                        <input type="text" {...register("ttdPutusan", { required: "Mohon pilih nama penandatangan."})} className={errors.ttdPutusan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                        {errors.ttdPutusan && <small className="text-danger">{errors.ttdPutusan.message}</small>}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <div className='col-form-label mb-0'>Diterbitkan di</div>
                                        <input type="text" {...register("diterbitkan", { required: "Mohon isi tempat terbit dokumen."})} className={errors.diterbitkan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                        {errors.diterbitkan && <small className="text-danger">{errors.diterbitkan.message}</small>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="col-md-12 mt-3">
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Nomor Berita Acara</label>
                                    <div className="col-sm-3">
                                        <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor" disabled />
                                    </div>
                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Hari/Tanggal</label>
                                    <div className="col-sm-2">
                                        <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Hari" disabled />
                                    </div>
                                    <div className="col-sm-2">
                                        <input type="date" id="nomor_k12" className="form-control form-control-sm" disabled />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Nomor Surat Tugas</label>
                                    <div className="col-sm-2">
                                        <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor Surat Tugas" disabled />
                                    </div>
                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Tanggal Surat Tugas</label>
                                    <div className="col-sm-2">
                                        <input type="date" id="nomor_k12" className="form-control form-control-sm" disabled />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Nomor Pemeriksaan Administratif dan Kesesuaian Dokumen</label>
                                    <div className="col-sm-2">
                                        <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor Pemeriksaan" disabled />
                                    </div>
                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Tanggal</label>
                                    <div className="col-sm-2">
                                        <input type="date" id="nomor_k12" className="form-control form-control-sm" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col">
                                <div className="accordion" id="collapseSection">
                                    <div className="card accordion-item">
                                        <h2 className="accordion-header" id="headerCountry">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCountry" aria-expanded="true" aria-controls="collapseCountry">
                                                I. Keterangan Media Pembawa
                                            </button>
                                        </h2>
                                        <div id="collapseCountry">
                                            <div className="accordion-body">
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jenis Media Pembawa</label>
                                                            <div className="col-sm-9">
                                                                <select className="form-select">
                                                                    <option>Hewan</option>
                                                                    <option>Ikan</option>
                                                                    <option>Tumbuhan</option>
                                                                    <option>Produk Hewan</option>
                                                                    <option>Produk Ikan</option>
                                                                    <option>Produk Tumbuhan</option>
                                                                    <option>Media Pembawa Lain</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Umum/Dagang</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Nama Umum/Dagang" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Ilmiah</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Nama Ilmiah" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Kode HS</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Kode HS" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Bentuk</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Bentuk" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jumlah</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Jumlah" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Pemilik</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Nama Pemilik" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Alamat Pemilik</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Lokasi Media Pembawa</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card accordion-item">
                                        <h2 className="accordion-header" id="headerExporter">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExporter" aria-expanded="true" aria-controls="collapseExporter">
                                                Pelaksanaan Pengambilan Contoh
                                            </button>
                                        </h2>
                                        <div id="collapseExporter">
                                            <div className="accordion-body">
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Petugas Pengambil Contoh</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Nama Petugas" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nomor Registrasi</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Nomor Registrasi" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tanggal Pengambil Contoh</label>
                                                            <div className="col-sm-9">
                                                                <input type="date" id="collapse-name" className="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jumlah Contoh</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Jumlah Contoh" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Identitas Contoh</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="collapse-name" className="form-control" placeholder="Identitas Contoh" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <button type="button" className="btn btn-xs btn-primary">Add Contoh</button>
                                                    </div>
                                                    <table className="table table-bordered table-hover table-striped dataTable">
                                                        <thead>
                                                            <tr>
                                                                <th>Nama/Kode Contoh</th>
                                                                <th>Kondisi/Suhu Contoh</th>
                                                                <th>Nomor Kontainer/Palka</th>
                                                                <th>Keterangan</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th>1</th>
                                                                <th>-</th>
                                                                <th>-</th>
                                                                <th>-</th>
                                                            </tr>
                                                            <tr>
                                                                <th>2</th>
                                                                <th>-</th>
                                                                <th>-</th>
                                                                <th>-</th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tujuan Pengambilan Contoh</label>
                                                            <div className="col-sm-9">
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="checktujuan1">Pemeriksaan Visual</label>
                                                                    <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan1" />
                                                                </div>
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="checktujuan2">Pemeriksaan Kesehatan</label>
                                                                    <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan2" />
                                                                </div>
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="checktujuan3">Uji Keamanan/mutu pangan</label>
                                                                    <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan3" />
                                                                </div>
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="checktujuan4">Residu Pestisida</label>
                                                                    <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan4" />
                                                                </div>
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="checktujuan5">Logam Berat</label>
                                                                    <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan5" />
                                                                </div>
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="checktujuan6">Mikotoksin</label>
                                                                    <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan6" />
                                                                </div>
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="checktujuan9">Cemaran Mikrobiologi</label>
                                                                    <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan9" />
                                                                </div>
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="checktujuan10">Cemaran Radioaktif</label>
                                                                    <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan10" />
                                                                </div>
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="checktujuan12">Lainnya</label>
                                                                    <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan12" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="checktujuan7">Uji Keamanan/mutu pakan</label>
                                                                <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan7" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="checktujuan8">Uji PRG,SDG, IAS</label>
                                                                <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan8" />
                                                            </div>
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="checktujuan11">Pengujian Lainnya</label>
                                                                <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan11" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Catatan Pengambilan Contoh</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
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
                        <div className="row">
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-primary">Simpan</button>
                                <button type="button" className="btn btn-danger">Batal</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="modal fade" id="modSampling" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-simple">
                <div className="modal-content p-1">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="text-center mb-4">
                            <h4>Tambah Data Detil Pelaksanaan Pengambilan Contoh</h4>
                        </div>
                        <form onSubmit={handleDetilSampel}>
                            <div className='row'>
                                <div className='col-sm-12 mb-3'>
                                    <div className='mb-2'>
                                        <label className="form-label" style={{marginTop: "10px"}} htmlFor="mpPeriksa">Media Pembawa</label>
                                        <Select styles={customStyles} defaultValue={detilSampel.idkom} value={{id: detilSampel.idkom, label: detilSampel.idkomView} || ""} placeholder="Pilih Komoditas.." options={dataSelect.komoditas} onChange={(e) => setDetilSampel(values => ({...values, idkom: e.value})) & setDetilSampel(values => ({...values, idkomView: e.label}))} />
                                    </div>
                                    <div className='mb-2'>
                                        <label className="form-label" htmlFor="identitas">Identitas Contoh</label>
                                        <input type="text" className="form-control form-control-sm" id="identitas" name='identitas' placeholder="Identitas Contoh.." value={detilSampel.identitas || ""} onChange={(e) => setDetilSampel(values => ({...values, identitas: e.target.value}))} />
                                    </div>
                                    <div className='mb-2'>
                                        <label className="form-label" htmlFor="kode">Kode Contoh</label>
                                        <input type="text" className="form-control form-control-sm" id="kode" name='kode' placeholder="Kode Contoh.." value={detilSampel.kode || ""} onChange={(e) => setDetilSampel(values => ({...values, kode: e.target.value}))} />
                                    </div>
                                    <div className='mb-2'>
                                        <label className="form-label" htmlFor="kondisi">Kondisi Contoh</label>
                                        <input type="text" className="form-control form-control-sm" id="kondisi" name='kondisi' placeholder="Kondisi Contoh.." value={detilSampel.kondisi || ""} onChange={(e) => setDetilSampel(values => ({...values, kondisi: e.target.value}))} />
                                    </div>
                                    <div className='mb-2'>
                                        <label className="form-label" htmlFor="suhu">Suhu Contoh <small>(khusus untuk pengujian cemaran biologi)</small></label>
                                        <input type="text" className="form-control form-control-sm" id="suhu" name='suhu' placeholder="Suhu Contoh.." value={detilSampel.suhu || ""} onChange={(e) => setDetilSampel(values => ({...values, suhu: e.target.value}))} />
                                    </div>
                                    <div className='mb-2'>
                                        <label className="form-label" htmlFor="noKontainer">Nomor Kontainer / Palka</label>
                                        <input type="text" className="form-control form-control-sm" id="noKontainer" name='noKontainer' placeholder="Nomor Kontainer / Palka.." value={detilSampel.noKontainer || ""} onChange={(e) => setDetilSampel(values => ({...values, noKontainer: e.target.value}))} />
                                    </div>
                                    <div className='mb-2'>
                                        <label className="form-label" htmlFor="keterangan">Keterangan</label>
                                        <textarea className='form-control form-control-sm' name="keterangan" id="keterangan" rows="2" placeholder='Keterangan' value={detilSampel.keterangan || ""} onChange={(e) => setDetilSampel(values => ({...values, keterangan: e.target.value}))}></textarea>
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

export default DocK33