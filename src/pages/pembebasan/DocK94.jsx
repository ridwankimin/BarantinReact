/* eslint-disable eqeqeq */
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {decode as base64_decode} from 'base-64';
import PnPelepasan from '../../model/PnPelepasan';
import PtkModel from '../../model/PtkModel';
import Rekomendasi from '../../model/master/rekomendasi.json'
import Swal from 'sweetalert2';
// form K-9.4 UDAN GA DIPAKE

const model = new PnPelepasan()
const modelPemohon = new PtkModel()

function rekomendasi() {
    return Rekomendasi.filter((element) => element.dokumen_karantina_id === 42 & element.jenis_karantina == Cookies.get("jenisKarantina"))
}

function DocK94() {
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
        // watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const response = model.pnPengawasan(data);
        response
        .then((response) => {
            if(response.data) {
                if(response.data.status === '201') {
                    //start save history
                    // const log = new PtkHistory();
                    // const resHsy = log.pushHistory(data.idPtk, "p8", "K-9.2t", (data.idDok94 ? 'UPDATE' : 'NEW'));
                    // resHsy
                    // .then((response) => {
                    //     if(response.data.status === '201') {
                        // if(import.meta.env.VITE_BE_ENV == "DEV") {
                    //         console.log("history saved")
                        // }
                    //     }
                    // })
                    // .catch((error) => {
                        // if(import.meta.env.VITE_BE_ENV == "DEV") {
                        //     console.log(error)
                        // }
                    // });
                    //end save history

                    Swal.fire({
                        title: "Sukses!",
                        text: "Laporan Hasil Pengawasan berhasil " + (data.idDok94 ? "diedit." : "disimpan."),
                        icon: "success"
                    });
                    setValue("idDok94", response.data.data.id)
                    setValue("noDok94", response.data.data.nomor)
                }
            }
        })
        .catch((error) => {
            if(import.meta.env.VITE_BE_ENV == "DEV") {
                console.log(error)
            }
            Swal.fire({
                title: "Error!",
                text: error.response.status + " - " + error.response.data.message,
                icon: "error"
            });
        });
    }

    useEffect(()=>{
        if(idPtk) {
            setValue("tglDok94", (new Date()).toLocaleString('en-CA', { hourCycle: 'h24' }).replace(',', '').slice(0,16))
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
                    if(response.data.status == '200') {
                        setData(values => ({...values,
                            errorPTK: "",
                            listPtk: response.data.data.ptk,
                            listDokumen: response.data.data.ptk_dokumen
                        }));

                        const resKom = modelPemohon.getKomoditiPtkId(base64_decode(ptkNomor[1]), Cookies.get("jenisKarantina"));
                        resKom
                        .then((res) => {
                            if(typeof res.data != "string") {
                                if(res.data.status == 200) {
                                    setData(values => ({...values,
                                        errorKomoditas: "",
                                        listKomoditas: res.data.data
                                    }))
                                } else {
                                    setData(values => ({...values,
                                        errorKomoditas: "Gagal load data Komoditas"
                                    }));
                                }
                            } else {
                                setData(values => ({...values,
                                    errorKomoditas: "Gagal load data Komoditas"
                                }));
                            }
                        })
                        .catch((error) => {
                            if(import.meta.env.VITE_BE_ENV == "DEV") {
                                console.log(error)
                            }
                            setData(values => ({...values,
                                errorKomoditas: "Gagal load data Komoditas"
                            }));
                        });
                        
                        setValue("idPtk", base64_decode(ptkNomor[1]))
                        setValue("noDokumen", base64_decode(ptkNomor[2]))
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK",
                            errorKomoditas: "Gagal load data Komoditas"
                        }));
                    }
                } else {
                    setData(values => ({...values,
                        errorPTK: "Gagal load data PTK",
                        errorKomoditas: "Gagal load data Komoditas"
                    }));
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status === 404) {
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

            const response94 = model.getPengawasanByPtkId(base64_decode(ptkNomor[1]));
            response94
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorPengawasan: ""
                    }))
                    if(response.data.status == 200) {
                        setValue("idDok94", response.data.data.id)
                        setValue("noDok94", response.data.data.nomor)
                        setValue("tglDok94", response.data.data.tanggal)
                        setValue("syarat", response.data.data.syarat_id == null ? "" : response.data.data.syarat_id.toString())
                        setValue("rekomendasi", response.data.data.rekomendasi_id == null ? "" : response.data.data.rekomendasi_id.toString())
                        setValue("ttdUser", response.data.data.user_ttd_id)
                    } else {
                        setData(values => ({...values,
                            errorPengawasan: "Gagal load data Laporan Hasil Pengawasan"
                        }));
                    }
                } else {
                    setData(values => ({...values,
                        errorPengawasan: "Gagal load data Laporan Hasil Pengawasan"
                    }));
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status === 404) {
                        setData(values => ({...values,
                            errorPengawasan: ""
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPengawasan: error.response.data.status + " - " + error.response.data.message
                        }));
                    }
                }
            })
        }
    },[idPtk, setValue])

    function refreshData() {
        if(data.errorPTK) {
            const response = modelPemohon.getPtkId(data.noIdPtk);
            response
            .then((response) => {
                if(typeof response.data != "string") {
                    if(response.data.status == 200) {
                        setData(values => ({...values,
                            errorPTK: "",
                            listPtk: response.data.data.ptk,
                            listDokumen: response.data.data.ptk_dokumen
                        }));
       
                        setValue("idPtk", data.noIdPtk)
                        setValue("noDokumen", data.noDokumen)
                    }
                } else {
                    setData(values => ({...values,
                        errorPTK: "Gagal load data PTK"
                    }));
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status === 404) {
                        setData(values => ({...values,
                            errorPTK: "Data PTK Kosong/Tidak ada"
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPTK: "Gagal load data PTK"
                        }));
                    }
                }
            });
        }

        if(data.errorKomoditas) {
            const resKom = modelPemohon.getKomoditiPtkId(data.noIdPtk, Cookies.get("jenisKarantina"));
            resKom
            .then((res) => {
                if(typeof res.data != "string") {
                    if(res.data.status == 200) {
                        setData(values => ({...values,
                            errorKomoditas: "",
                            listKomoditas: res.data.data
                        }))
                    }
                } else {
                    setData(values => ({...values,
                        errorKomoditas: "Gagal load data Komoditas"
                    }));
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                setData(values => ({...values,
                    errorKomoditas: "Gagal load data Komoditas"
                }));
            });
        }

        if(data.errorPengawasan) {
            const response94 = model.getPengawasanByPtkId(data.noIdPtk);
            response94
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorPengawasan: ""
                    }))
                    if(response.data.status == '200') {
                        setValue("idDok94", response.data.data.id)
                        setValue("noDok94", response.data.data.nomor)
                        setValue("tglDok94", response.data.data.tanggal)
                        setValue("syarat", response.data.data.syarat_id == null ? "" : response.data.data.syarat_id.toString())
                        setValue("rekomendasi", response.data.data.rekomendasi_id == null ? "" : response.data.data.rekomendasi_id.toString())
                        setValue("ttdUser", response.data.data.user_ttd_id)
                    } else {
                        setData(values => ({...values,
                            errorPengawasan: "Gagal load data Laporan Hasil Pengawasan"
                        }));
                    }
                } else {
                    setData(values => ({...values,
                        errorPengawasan: "Gagal load data Laporan Hasil Pengawasan"
                    }));
                }
            })
            .catch((error) => {
                if(import.meta.env.VITE_BE_ENV == "DEV") {
                    console.log(error)
                }
                if(error.response) {
                    if(error.response.data.status === 404) {
                        setData(values => ({...values,
                            errorPengawasan: ""
                        }));
                    } else {
                        setData(values => ({...values,
                            errorPengawasan: error.response.data.status + " - " + error.response.data.message
                        }));
                    }
                }
            })
        }
    }

    return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            K-9.4 <span className="fw-light" style={{color: 'blue'}}>(Laporan Hasil Pengawasan)</span>

            <small className='float-end'>
                <span className='text-danger'>{(data.errorPTK ? data.errorPTK + "; " : "") + (data.errorKomoditas ? data.errorKomoditas + "; " : "") + (data.errorPengawasan ? data.errorPengawasan + "; " : "")}</span>
                {data.errorPTK || data.errorKomoditas || data.errorPengawasan ?
                    <button type='button' className='btn btn-warning btn-xs' onClick={() => refreshData()}><i className='fa-solid fa-sync'></i> Refresh</button>
                : ""}
            </small>
        </h4>

        <div className="row">
            <div className="col-xxl">
                <div className="card card-action mb-4">
                    <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                        <div className="card-action-title text-lightest">
                            <div className='row'>
                                <label className="col-sm-1 col-form-label text-sm-end" htmlFor="noDokumen"><b>No PTK</b></label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDokumen" value={data.noDokumen || ""} className="form-control form-control-sm" placeholder="Nomor PTK" disabled />
                                </div>
                                <label className="col-sm-1 col-form-label" htmlFor="tglDokumen"><b>Tanggal</b></label>
                                <div className="col-sm-2">
                                    <input type="text" id='tglDokumen' value={data.tglDokumen || ""} className='form-control form-control-sm' disabled/>
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
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" id='idDok94' {...register("idDok94")} />
                        <input type="hidden" id='idPtk' {...register("idPtk")} />
                        <input type="hidden" id='noDokumen' {...register("noDokumen")} />
                        <div className="col-md-12">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-start" htmlFor="noDok94">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok94" name='noDok94' {...register("noDok94")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-9.4" disabled />
                                </div>
                                <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tglDok94">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok94" name='tglDok94' {...register("tglDok94", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok94 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok94 && <small className="text-danger">{errors.tglDok94.message}</small>}
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
                                            </h5>
                                            <div className='col-md-12 mb-3'>
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
                                                                <th>Volume P8</th>
                                                                <th>Netto P8</th>
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
                                        <h5 className='text-lightest mb-0'>Keputusan
                                        </h5>
                                    </button>
                                </h2>
                                <div id="collapsePerlakuan">
                                    <div className="accordion-body">
                                        <label className="mb-3">Telah memenuhi semua persyaratan pengawasan terhadap :</label>
                                        <div className='row mb-3'>
                                            <div className="col-sm-4">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" value="1" id="syarat1" {...register("syarat", {required: "Mohon pilih pilihan yang sesuai."})} />
                                                    <label className="form-check-label" htmlFor="syarat1">
                                                        Keamanan pangan dan/atau mutu pangan
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" value="2" id="syarat2" {...register("syarat")} />
                                                    <label className="form-check-label" htmlFor="syarat2">
                                                        Keamanan pakan dan/atau mutu pakan
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" value="3" id="syarat3" {...register("syarat")} />
                                                    <label className="form-check-label" htmlFor="syarat3">
                                                        Produk rekayasa genetik/PRG
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" value="4" id="syarat4" {...register("syarat")} />
                                                    <label className="form-check-label" htmlFor="syarat4">
                                                        Sumber daya genetik/SDG
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" value="5" id="syarat5" {...register("syarat")} />
                                                    <label className="form-check-label" htmlFor="syarat5">
                                                        Agensia hayati
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" value="6" id="syarat6" {...register("syarat")} />
                                                    <label className="form-check-label" htmlFor="syarat6">
                                                        Jenis Asing Invasif/JAI
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" value="7" id="syarat7" {...register("syarat")} />
                                                    <label className="form-check-label" htmlFor="syarat7">
                                                        Tumbuhan liar dan tumbuhan langka
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" value="8" id="syarat8" {...register("syarat")} />
                                                    <label className="form-check-label" htmlFor="syarat8">
                                                        Satwa liar dan satwa langka
                                                    </label>
                                                </div>
                                            </div>
                                            {errors.syarat && <small className="text-danger">{errors.syarat.message}</small>}
                                        </div>
                                        <hr />
                                        <h5 className="fw-normal"><b>Rekomendasi</b></h5>
                                        {rekomendasi().map((item, index) => (
                                            <div className={"form-check" + (Cookies.get("jenisKarantina") == "T" ? "" : " form-check-inline")} key={index}>
                                                <input className="form-check-input" type="radio" value={item.id} name='rekomendasi' id={"rekomendasi" + (index + 1)} {...register("rekomendasi", {required: "Mohon pilih rekomendasi yang sesuai."})} />
                                                <label className="form-check-label" htmlFor={"rekomendasi" + (index + 1)}>
                                                    {item.nama}
                                                </label>
                                            </div>
                                        ))}
                                        {errors.rekomendasi && <small className="text-danger">{errors.rekomendasi.message}</small>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-2 col-form-label'>Penandatangan</div>
                            <div className="col-sm-3 mb-3 pr-2">
                                <input type="text" {...register("ttdUser", { required: "Mohon pilih nama penandatangan."})} className={errors.ttdUser ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                {errors.ttdUser && <small className="text-danger">{errors.ttdUser.message}</small>}
                            </div>
                        </div>
                        <div className="pt-2">
                            <div className="row">
                                <div className="offset-sm-2 col-sm-9">
                                    <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                                    <button type="reset" className="btn btn-danger btn-label-secondary me-sm-2 me-1">Batal</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DocK94