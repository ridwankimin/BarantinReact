import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {decode as base64_decode} from 'base-64';
import PtkModel from '../../model/PtkModel';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const modelPemohon = new PtkModel()

function DocK15() {
    const idPtk = Cookies.get("idPtkPage");
    let [data, setData] = useState({})
    let [jenisBst, setJenisBst] = useState('')
    let [onLoad, setOnLoad] = useState(false)
    let navigate = useNavigate();

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const cekWatch = watch()

    const handleJenisBst = (e) => {
        setJenisBst(e.target.value)

        if(e.target.value == 'INT') {
            if(idPtk) {
                setValue("tglDok61", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
                const tglPtk = Cookies.get("tglPtk");
                let ptkDecode = idPtk ? base64_decode(idPtk) : "";
                let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
                
                setData(values => ({...values,
                    noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                    noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                    noDokumen: idPtk ? base64_decode(ptkNomor[2]) : "",
                    tglDokumen: tglPtk,
                }));
                const response = modelPemohon.getPtkId(base64_decode(ptkNomor[1]));
                response
                .then((response) => {
                    if(typeof response.data != "string") {
                        if(response.data.status == 200) {
                            setData(values => ({...values,
                                errorPTK: "",
                                listPtk: response.data.data.ptk,
                                listDokumen: response.data.data.ptk_dokumen
                            }));
    
                            setValue("idPtk", base64_decode(ptkNomor[1]))
                            setValue("noDokumen", base64_decode(ptkNomor[2]))
                        }
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK",
                            errorKomoditas: "Gagal load data Komoditas"
                        }));
                    }
                })
                .catch((error) => {
                    if(import.meta.env.VITE_REACT_APP_BE_ENV == "DEV") {
                        console.log(error)
                    }
                    if(error.response) {
                        if(error.response.data.status == 404) {
                            setData(values => ({...values,
                                errorPTK: "Data PTK Kosong/Tidak ada",
                                errorKomoditas: "Gagal load data Komoditas"
                            }));
                        } else {
                            setData(values => ({...values,
                                errorPTK: "Gagal load data PTK",
                                errorKomoditas: "Gagal load data Komoditas"
                            }));
                        }
                    }
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Warning!",
                    text: "Mohon pilih PTK yang akan diserahterimakan"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/datam')
                    }
                })
            }
        }
    }

  return (
    <div className="container-fluid flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-1.5 <span className="fw-light" style={{color: 'blue'}}>BERITA ACARA PENYERAHAN MEDIA PEMBAWA</span>

        {/* <small className='float-end'>
            <span className='text-danger'>{(data.errorPTK ? data.errorPTK + "; " : "") + (data.errorAnalisis ? data.errorAnalisis + "; " : "")}</span>
            {data.errorPTK || data.errorAnalisis ?
                <button type='button' className='btn btn-warning btn-xs' onClick={() => refreshData()}><i className='fa-solid fa-sync'></i> Refresh</button>
            : ""}
        </small> */}
    </h4>

    <div className="row">
        <div className="col-xxl">
            <div className="card card-action mb-4">
                <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                    <div className="card-action-title text-lightest">
                        <div className='row'>
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noDok"><b>Jenis Serah Terima</b></label>
                            <div className="col-sm-3">
                                <select className='form-select form-select-sm' name="" id="" onChange={(e) => handleJenisBst(e)}>
                                    <option value="">--</option>
                                    <option value="EXT">Dari Instansi Lain</option>
                                    <option value="INT">Antar UPT</option>
                                </select>
                            </div>
                            <label style={{display: (jenisBst == "INT" ? "block" : "none")}} className="col-sm-1 col-form-label text-sm-end" htmlFor="noDok"><b>No PTK</b></label>
                            <div style={{display: (jenisBst == "INT" ? "block" : "none")}} className="col-sm-3">
                                <input type="text" id="noDok" value={data.noDokumen || ""} className="form-control form-control-sm" placeholder="Nomor PTK" disabled />
                            </div>
                            <label style={{display: (jenisBst == "INT" ? "block" : "none")}} className="col-sm-1 col-form-label" htmlFor="tglSurtug"><b>Tanggal</b></label>
                            <div style={{display: (jenisBst == "INT" ? "block" : "none")}} className="col-sm-2">
                                <input type="text" id='tglSurtug' value={data.tglDokumen || ""} className='form-control form-control-sm' disabled/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="accordion mb-4" id="collapseSection" style={{display: (jenisBst == "INT" ? "block" : "none")}}>
                        <div className="card">
                            <h2 className="accordion-header" id="headerKeterangan">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePTK"  style={{backgroundColor: '#123138'}} aria-expanded="true" aria-controls="collapseCountry">
                                    <h5 className='text-lightest mb-0'>Rincian PTK</h5>
                                </button>
                            </h2>
                            <div id="collapsePTK" class="collapse">
                                <div className="accordion-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 className='mb-1'><b><u>Identitas Pengirim</u></b></h5>
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label" htmlFor="namaPengirim">Nama</label>
                                                <div className="col-sm-8">
                                                    <input type="text" id="namaPengirim" value={(data.listPtk ? data.listPtk.nama_pengirim : "") || ""} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className='mb-1'><b><u>Identitas Penerima</u></b></h5>
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label" htmlFor="namaPenerima">Nama</label>
                                                <div className="col-sm-8">
                                                    <input type="text" id="namaPenerima" value={(data.listPtk ? data.listPtk.nama_penerima : "") || ""} disabled className="form-control form-control-sm" placeholder="Nama Penerima" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-1">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label" htmlFor="alamatPengirim">Alamat</label>
                                                <div className="col-sm-8">
                                                    <textarea name="alamatPengirim" className="form-control form-control-sm" disabled value={(data.listPtk ? data.listPtk.alamat_pengirim : "") || ""} id="alamatPengirim" rows="2" placeholder=""></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label" htmlFor="alamatPenerima">Alamat</label>
                                                <div className="col-sm-8">
                                                    <textarea name="alamatPenerima" className="form-control form-control-sm" disabled value={(data.listPtk ? data.listPtk.alamat_penerima : "") || ""} id="alamatPenerima" rows="2" placeholder=""></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label" htmlFor="identitasPengirim">Identitas</label>
                                                <div className="col-sm-8">
                                                    <input name="identitastPengirim" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.jenis_identitas_pengirim + " - " + data.listPtk.nomor_identitas_pengirim) : "") || ""} id="identitasPengirim" placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label" htmlFor="identitasPenerima">Identitas</label>
                                                <div className="col-sm-8">
                                                    <input name="identitasPenerima" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.jenis_identitas_penerima + " - " + data.listPtk.nomor_identitas_penerima) : "") || ""} id="identitasPenerima" placeholder="" />
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
                                                    <input name="daerahAsal" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.permohonan == "DK" ? data.listPtk.kota_asal : data.listPtk.negara_asal) : "") || ""} id="daerahAsal" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label" htmlFor="daerahTujuan">{data.listPtk ? (data.listPtk.permohonan == "DK" ? "Daerah" : "Negara") : ""} Tujuan</label>
                                                <div className="col-sm-8">
                                                    <input name="daerahTujuan" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.permohonan == "DK" ? data.listPtk.kota_tujuan : data.listPtk.negara_tujuan) : "") || ""} id="daerahTujuan" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label" htmlFor="tempatKeluar">Tempat Pengeluaran / Tgl Berangkat</label>
                                                <div className="col-sm-8">
                                                    <input name="tempatKeluar" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.pelabuhan_muat + " / " + data.listPtk.tanggal_rencana_berangkat_terakhir) : "") || ""} id="tempatKeluar" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label" htmlFor="tempatMasuk">Tempat Pemasukan / Tgl Tiba</label>
                                                <div className="col-sm-8">
                                                    <input name="tempatMasuk" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.pelabuhan_bongkar + " / " + data.listPtk.tanggal_rencana_tiba_terakhir) : "") || ""} id="tempatMasuk" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-4 col-form-label" htmlFor="tempatTransit">Tempat Transit</label>
                                                <div className="col-sm-8">
                                                    <input name="tempatTransit" className="form-control form-control-sm" disabled value={(data.listPtk ? (data.listPtk.pelabuhan_transit == null ? "-" : data.listPtk.pelabuhan_transit + ", " + data.listPtk.negara_transit) : "") || ""} id="tempatTransit" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <h2 className="accordion-header" id="headerMP">
                                <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseMP" aria-expanded="true" aria-controls="collapseImporter">
                                    <h5 className='text-lightest mb-0'>Uraian Media Pembawa
                                    </h5>
                                </button>
                            </h2>
                            <div id="collapseMP">
                                <div className="accordion-body">
                                    <div className="row">
                                        <h5 className='mb-1'>Jenis Media Pembawa : <b>{Cookies.get("jenisKarantina") == "H" ? "Hewan" : (Cookies.get("jenisKarantina") == "T" ? "Tumbuhan" : (Cookies.get("jenisKarantina") == "I" ? "Ikan" : ""))}</b>
                                        </h5>
                                        <div className='col-md-12 mb-3'>
                                            <div className="text-wrap" style={{height: (data.listKomoditas?.length > 8 ? "300px" : "")}}>
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
                                                            <th>Volume P5</th>
                                                            <th>Netto P5</th>
                                                            <th>Jantan P5</th>
                                                            <th>Betina P5</th>
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
                                                                        <td className='text-end'>{data.volume_netto?.toLocaleString()}</td>
                                                                        <td>{data.sat_netto}</td>
                                                                        <td className='text-end'>{data.volume_lain?.toLocaleString()}</td>
                                                                        <td>{data.sat_lain}</td>
                                                                        <td className='text-end'>{data.jantan?.toLocaleString()}</td>
                                                                        <td className='text-end'>{data.betina?.toLocaleString()}</td>
                                                                        <td className='text-end'>{data.volumeP5?.toLocaleString()}</td>
                                                                        <td className='text-end'>{data.nettoP5?.toLocaleString()}</td>
                                                                        <td className='text-end'>{data.jantanP5?.toLocaleString()}</td>
                                                                        <td className='text-end'>{data.betinaP5?.toLocaleString()}</td>
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

                    <div className="col-md-12 mt-3">
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-center" htmlFor="nomorK15">Nomor Dokumen</label>
                            <div className="col-sm-4">
                                <input type="text" id="nomorK15" className="form-control form-control-sm" placeholder="Nomor Berita Acara Serah Terima" disabled />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="card">
                        <div className="card-body">
                            <div className="row g-3 mb-3">
                                <h4>
                                        Keterangan
                                </h4>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="komoditas1">Hewan/Ikan/Tumbuhan</label>
                                                <input name="default-radio-komoditas" className="form-check-input" type="radio" value="" id="komoditas1" />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="komoditas2">Produk Hewan/Produk Ikan/Produk Tumbuhan</label>
                                                <input name="default-radio-komoditas" className="form-check-input" type="radio" value="" id="komoditas2" />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="komoditas3">Media Pembawa Lain Hewan/Ikan/Tumbuhan</label>
                                                <input name="default-radio-komoditas" className="form-check-input" type="radio" value="" id="komoditas3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jumlah</label>
                                        <div className="col-sm-9">
                                            <input type="text" id="collapse-name" className="form-control" placeholder="jumlah" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-company">Satuan</label>
                                        <div className="col-sm-9">
                                            <input type="text" id="collapse-compay" className="form-control" placeholder="satuan" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4>Pihak Pertama</h4>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label" htmlFor="collapse-name">Instansi</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="collapse-name" className="form-control form-control-sm" placeholder="Nama" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label" htmlFor="collapse-name">Nama</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="collapse-name" className="form-control form-control-sm" placeholder="Nama" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label" htmlFor="collapse-name">Alamat</label>
                                        <div className="col-sm-8">
                                            <textarea className="form-control form-control-sm" placeholder='Alamat' name="" id="" rows="2"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4>Pihak Kedua</h4>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label" htmlFor="collapse-name">Instansi</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="collapse-name" className="form-control form-control-sm" placeholder="Nama" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label" htmlFor="collapse-name">Nama</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="collapse-name" className="form-control form-control-sm" placeholder="Nama" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label" htmlFor="collapse-name">Alamat</label>
                                        <div className="col-sm-8">
                                            <textarea className="form-control form-control-sm" placeholder='Alamat' name="" id="" rows="2"></textarea>
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
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerImporter">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                        Keterangan
                                    </button>
                                </h2>
                                <div id="collapseImporter">
                                    <div className="accordion-body">
                                        <h6>Pihak Pertama Menyerahkan Komoditas Wajib Periksa Karantina (Media Pembawa) kepada Pihak Kedua, berupa</h6>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-sm-9">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="komoditas1">Hewan/Ikan/Tumbuhan</label>
                                                            <input name="default-radio-komoditas" className="form-check-input" type="radio" value="" id="komoditas1" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="komoditas2">Produk Hewan/Produk Ikan/Produk Tumbuhan</label>
                                                            <input name="default-radio-komoditas" className="form-check-input" type="radio" value="" id="komoditas2" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="komoditas3">Media Pembawa Lain Hewan/Ikan/Tumbuhan</label>
                                                            <input name="default-radio-komoditas" className="form-check-input" type="radio" value="" id="komoditas3" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Media Pembawa</label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="4" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jumlah</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="jumlah" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-company">Satuan</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-compay" className="form-control" placeholder="satuan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerGoods">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseGoods" aria-expanded="true" aria-controls="collapseGoods">
                                        Informasi Tambahan
                                    </button>
                                </h2>
                                <div id="collapseGoods">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="4" placeholder="Informasi Tambahan"></textarea>
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
            </div>
        </div>
    </div>
</div>
  )
}

export default DocK15