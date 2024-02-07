import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {decode as base64_decode} from 'base-64';
import PtkModel from '../../model/PtkModel';
import PnPerlakuan from '../../model/PnPerlakuan';
import { useNavigate } from 'react-router-dom';
import PtkHistory from '../../model/PtkHistory';

function DocK51() {
    const idPtk = Cookies.get("idPtkPage");
    let navigate = useNavigate();
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
    } = useForm({
        noDok51: "",
        dokKarId: "21"
    });

    const dataWatch = watch()

    const onSubmit = (data) => {
        // console.log(data)
        const model = new PnPerlakuan();
        const response = model.sertifPerlakuan(data);
            response
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(response.data.status === '201') {
                        //start save history
                        const log = new PtkHistory();
                        const resHsy = log.pushHistory(data.idPtk, "p4", "K-5.1", (data.idDok51 ? 'UPDATE' : 'NEW'));
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
                        setValue("idDok51", response.data.data.id)
                        setValue("noDok51", response.data.data.nomor)
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

            const modelPerlakuan = new PnPerlakuan();
            const resLaporan = modelPerlakuan.getPtkByDokumen(base64_decode(ptkNomor[1]), 21);
            setValue("idPtk", base64_decode(ptkNomor[1]))
            resLaporan
            .then((response) => {
                console.log("dok51")
                console.log(response.data.data)
                if(response.data.status === '200') {
                    // alert(response.data.message);
                    setValue("idDok51", response.data.data[0].id)
                    setValue("noDok51", response.data.data[0].nomor)
                    setValue("noDokumen", response.data.data[0].nomor)
                    setValue("tglDok51", response.data.data[0].tanggal)
                    setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                    setValue("namaIlmiahMP", response.data.data[0].nama_ilmiah_mp)
                    setValue("namaUmumMP", response.data.data[0].nama_dagang_mp)
                    setValue("bentukJmlMP", response.data.data[0].bentuk_jmlh_mp)
                    setValue("targetPerlakuan", response.data.data[0].target_perlakuan)
                    setValue("alasanPerlakuan", response.data.data[0].alasan_perlakuan)
                    setValue("metodePerlakuan", response.data.data[0].metode_perlakuan)
                    setValue("tipePerlakuan", response.data.data[0].tipe_perlakuan_id)
                    setValue("bahanPestisida", response.data.data[0].pestisida_id)
                    setValue("dosisPestisida", response.data.data[0].dosis_aplikasi)
                    setValue("mulaiPerlakuan", response.data.data[0].tgl_perlakuan_mulai)
                    setValue("selesaiPerlakuan", response.data.data[0].tgl_perlakuan_selesai)
                    setValue("namaTempatPerlakuan", response.data.data[0].nama_tempat)
                    setValue("alamatTempatPerlakuan", response.data.data[0].alamat_tempat)
                    setValue("operatorPelaksana", response.data.data[0].nama_operator)
                    setValue("alamatOperatorPelaksana", response.data.data[0].alamat_operator)
                    setValue("keteranganLain", response.data.data[0].ket_perlakuan_lain)
                    setValue("ttdPerlakuan", response.data.data[0].user_ttd_id)
                    setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                }
            })
            .catch((error) => {
                // setData()
                if(error.response.status === 404) {
                    // getDok53()
                    const resLaporan = modelPerlakuan.getPtkByDokumen(base64_decode(ptkNomor[1]), 23);
                    resLaporan
                    .then((response) => {
                        console.log("dok53")
                        console.log(response.data.data)
                        if(response.data.status === '200') {
                            // alert(response.data.message);
                            setValue("idDok53", response.data.data[0].id)
                            setValue("noDok53", response.data.data[0].nomor)
                            // setValue("noDokumen", response.data.data[0].nomor)
                            setValue("tglDok53", response.data.data[0].tanggal)
                            setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                            setValue("namaIlmiahMP", response.data.data[0].nama_ilmiah_mp)
                            setValue("namaUmumMP", response.data.data[0].nama_dagang_mp)
                            setValue("bentukJmlMP", response.data.data[0].bentuk_jmlh_mp)
                            setValue("targetPerlakuan", response.data.data[0].target_perlakuan)
                            setValue("alasanPerlakuan", response.data.data[0].alasan_perlakuan)
                            setValue("metodePerlakuan", response.data.data[0].metode_perlakuan)
                            setValue("tipePerlakuan", response.data.data[0].tipe_perlakuan_id)
                            setValue("bahanPestisida", response.data.data[0].pestisida_id)
                            setValue("dosisPestisida", response.data.data[0].dosis_aplikasi)
                            setValue("mulaiPerlakuan", response.data.data[0].tgl_perlakuan_mulai)
                            setValue("selesaiPerlakuan", response.data.data[0].tgl_perlakuan_selesai)
                            setValue("namaTempatPerlakuan", response.data.data[0].nama_tempat)
                            setValue("alamatTempatPerlakuan", response.data.data[0].alamat_tempat)
                            setValue("operatorPelaksana", response.data.data[0].nama_operator)
                            setValue("alamatOperatorPelaksana", response.data.data[0].alamat_operator)
                            setValue("keteranganLain", response.data.data[0].ket_perlakuan_lain)
                            setValue("ttdPerlakuan", response.data.data[0].user_ttd_id)
                            setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                            // isiDataPtk(response)
                        } else {
                            alert("Laporan Hasil Perlakuan belum dibuat.\nMohon buat laporan perlakuan terlebih dahulu!")
                            navigate('/k53')
                        }
                    })
                    .catch((error) => {
                        setData()
                        console.log(error.response);
                        if(error.response.status === 404) {
                            alert("Laporan Hasil Perlakuan belum dibuat.\nMohon buat laporan perlakuan terlebih dahulu!")
                            navigate('/k53')
                        }
                    });
                }
                console.log(error.response);
                // alert("Laporan Hasil Perlakuan belum dibuat.\nMohon buat laporan perlakuan terlebih dahulu!")
                // navigate('/k53')
            });

            const modelPemohon = new PtkModel();
            const response = modelPemohon.getPtkId(base64_decode(ptkNomor[1]));
            response
            .then((response) => {
                if(response.data.status === '200') {
                    console.log("data_ptk")
                    console.log(response.data.data)
                    // alert(response.data.message);
                    // isiDataPtk(response)
                    
                    setData(values => ({...values,
                        noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                        noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                        noDokumen: idPtk ? base64_decode(ptkNomor[2]) : "",
                        tglDokumen: tglPtk,
                        // kegiatan: response.data.data.ptk,
                        listPtk: response.data.data.ptk,
                        listKomoditas: response.data.data.ptk_komoditi,
                        listDokumen: response.data.data.ptk_dokumen
                    }));
                    let nmrKont = response.data.data.ptk_kontainer?.map(item => {
                        return item.nomor
                    })
                    setValue("idPtk", base64_decode(ptkNomor[1]))
                    setValue("noDokumen", base64_decode(ptkNomor[2]))
                    setValue("dokKarId", 21)
                    setValue("jmlNoContainer", response.data.data.ptk_kontainer.length + " (" + nmrKont.join(";") +")")
                    setValue("tempatPerlakuan", response.data.data.ptk.tempat_pemeriksaan)
                    setValue("tandaKhusus", response.data.data.ptk.tanda_khusus)
                }
            })
            .catch((error) => {
                setData()
                console.log(error.response);
            });
        } else {
            alert("Mohon pilih Nomor Aju di menu data masuk.")
        }
        setValue("idDok51","")
        setValue("noDok51","")
        setValue("tglDok51","")
    },[idPtk, setValue, navigate])

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-5.1 <span className="fw-light" style={{color: 'blue'}}>SERTIFIKAT PERLAKUAN / TREATMENT CERTIFICATE</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <div className="card card-action mb-4">
                <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                    <div className="card-action-title">
                        <div className='row'>
                            <label className="col-sm-1 col-form-label text-sm-end" htmlFor="noDok"><b>No PTK</b></label>
                            <div className="col-sm-3">
                                <input type="text" id="noDok" value={(data && data.noDokumen) || ""} className="form-control form-control-sm" placeholder="Nomor PTK" disabled />
                            </div>
                            <label className="col-sm-1 col-form-label" htmlFor="tglSurtug"><b>Tanggal</b></label>
                            <div className="col-sm-2">
                                <input type="text" id='tglSurtug' value={(data && data.tglDokumen) || ""} className='form-control form-control-sm' disabled/>
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
                        <input type="hidden" name='idDok51' {...register("idDok51")} />
                        <input type="hidden" name='idSurtug' {...register("idSurtug")} />
                        <input type="hidden" name='noDokumen' {...register("noDokumen")} />
                        <input type="hidden" name='idPtk' {...register("idPtk")} />
                        {/* k-5.1 : 21 */}
                        <input type="hidden" name='dokKarId' {...register("dokKarId")} />
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noDok51">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok51" name='noDok51' {...register("noDok51")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-5.1" disabled />
                                </div>
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="tglDok51">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok51" name='tglDok51' {...register("tglDok51", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok51 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok51 && <small className="text-danger">{errors.tglDok51.message}</small>}
                                </div>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col">
                                <div className="accordion" id="collapseSection">
                                    <div className="card">
                                        <h2 className="accordion-header" id="headerImporter">
                                            <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                            <h5 className='text-lightest mb-0'>Keterangan Media Pembawa</h5>
                                            </button>
                                        </h2>
                                        <div id="collapseImporter">
                                            <div className="accordion-body">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                    <h5 className='mb-1'><b><u>Identitas Pengirim</u></b></h5>
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="namaPengirim">Nama</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="namaPengirim" value={data.listPtk && (data.listPtk.nama_pengirim || "")} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                    <h5 className='mb-1'><b><u>Identitas Penerima</u></b></h5>
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="namaPenerima">Nama</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="namaPenerima" value={data.listPtk && (data.listPtk.nama_penerima || "")} disabled className="form-control form-control-sm" placeholder="Nama Penerima" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-1">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="alamatPengirim">Alamat</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="alamatPengirim" className="form-control form-control-sm" disabled value={data.listPtk && (data.listPtk.alamat_pengirim || "")} id="alamatPengirim" rows="2" placeholder=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="alamatPenerima">Alamat</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="alamatPenerima" className="form-control form-control-sm" disabled value={data.listPtk && (data.listPtk.alamat_penerima || "")} id="alamatPenerima" rows="2" placeholder=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="identitasPengirim">Identitas</label>
                                                            <div className="col-sm-9">
                                                                <input name="identitastPengirim" className="form-control form-control-sm" disabled value={data.listPtk && ((data.listPtk.jenis_identitas_pengirim + " - " + data.listPtk.nomor_identitas_pengirim) || "")} id="identitasPengirim" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="identitasPenerima">Identitas</label>
                                                            <div className="col-sm-9">
                                                                <input name="identitasPenerima" className="form-control form-control-sm" disabled value={data.listPtk && ((data.listPtk.jenis_identitas_penerima + " - " + data.listPtk.nomor_identitas_penerima) || "")} id="identitasPenerima" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="pelMuat">Pelabuhan Muat</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" id="pelMuat" value={data.listPtk && (data.listPtk.kd_pelabuhan_muat + " - " + data.listPtk.pelabuhan_muat || "")} disabled className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="pelBongkar">Pelabuhan Bongkar</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" id="pelBongkar" value={data.listPtk && (data.listPtk.kd_pelabuhan_bongkar + " - " + data.listPtk.pelabuhan_bongkar || "")} disabled className="form-control form-control-sm" placeholder="Negara/Area Tujuan" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="negaraAsal">Negara/Area Asal</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" id="negaraAsal" value={data.listPtk && (data.listPtk.negara_muat || "")} disabled className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="negaraTujuan">Negara/Area Tujuan</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" id="negaraTujuan" value={data.listPtk && (data.listPtk.negara_bongkar || "")} disabled className="form-control form-control-sm" placeholder="Negara/Area Tujuan" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="namaIlmiahMP">Nama Ilmiah MP <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-8">
                                                                <input type="text" id="namaIlmiahMP" name='namaIlmiahMP' {...register("namaIlmiahMP", {required: "Mohon isi nama ilmiah media pembawa."})} className={errors.namaIlmiahMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.namaIlmiahMP && <small className="text-danger">{errors.namaIlmiahMP.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="namaUmumMP">Nama Umum MP <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-8">
                                                                <input type="text" id="namaUmumMP" name='namaUmumMP' {...register("namaUmumMP", {required: "Mohon isi nama umum/dagang media pembawa."})} className={errors.namaUmumMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.namaUmumMP && <small className="text-danger">{errors.namaUmumMP.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="bentukJmlMP">Bentuk dan Jumlah MP <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-8">
                                                                <input type="text" id="bentukJmlMP" name='bentukJmlMP' {...register("bentukJmlMP", {required: "Mohon isi nama jumlah media pembawa."})} className={errors.bentukJmlMP ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.bentukJmlMP && <small className="text-danger">{errors.bentukJmlMP.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="jmlNoContainer">Jumlah Container</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" id="jmlNoContainer" {...register("jmlNoContainer")} className="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="targetPerlakuan">Target Perlakuan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-4">
                                                                <select name="targetPerlakuan" id="targetPerlakuan" {...register("targetPerlakuan", {required: "Mohon isi nama jumlah media pembawa."})} className={errors.bentukJmlMP ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                    <option value="">--</option>
                                                                    <option value="CMDT">Media Pembawa</option>
                                                                    <option value="PACK">Kemasan</option>
                                                                    <option value="CONT">Kontainer</option>
                                                                    <option value="ALL">Semua</option>
                                                                </select>
                                                                {errors.targetPerlakuan && <small className="text-danger">{errors.targetPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="tandaKhusus">Tanda Khusus</label>
                                                            <div className="col-sm-6">
                                                                <input type="text" id="tandaKhusus" name='tandaKhusus' {...register("tandaKhusus")} className="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <h2 className="accordion-header" id="headerImporter">
                                            <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                                <h5 className='text-lightest mb-0'>Keterangan Perlakuan</h5>
                                            </button>
                                        </h2>
                                        <div id="collapseImporter">
                                            <div className="accordion-body">
                                                <div className="row">
                                                    <div className="col-md-12 mb-2">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="alasanPerlakuan">Alasan dilakukan Tindakan Perlakuan <small className='text-danger'>*</small></label>
                                                            <div className="col-sm-8">
                                                                <textarea name="alasanPerlakuan" id="alasanPerlakuan" rows="2" {...register("alasanPerlakuan", {required: "Mohon isi alasan tindakan perlakuan."})} className={errors.alasanPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}></textarea>
                                                                {errors.alasanPerlakuan && <small className="text-danger">{errors.alasanPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="metodePerlakuan">Metode Perlakuan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-2">
                                                                <select name="metodePerlakuan" id="metodePerlakuan" {...register("metodePerlakuan", {required: "Mohon isi metode perlakuan."})} className={errors.metodePerlakuan ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                    <option value="">--</option>
                                                                    <option value="PHT">Perlakuan Fisik</option>
                                                                    <option value="CHT">Perlakuan Kimia</option>
                                                                </select>
                                                                {errors.metodePerlakuan && <small className="text-danger">{errors.metodePerlakuan.message}</small>}
                                                            </div>
                                                            <label className="col-sm-2 col-form-label text-sm-center" htmlFor="tipePerlakuan">Tipe Perlakuan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-3">
                                                                <select name="tipePerlakuan" id="tipePerlakuan" {...register("tipePerlakuan", {required: "Mohon isi tipe perlakuan."})} className={errors.tipePerlakuan ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                    <option value="">--</option>
                                                                    <option value="1">Tipe 1</option>
                                                                    <option value="2">Tipe 2</option>
                                                                </select>
                                                                {errors.tipePerlakuan && <small className="text-danger">{errors.tipePerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="bahanPestisida">Bahan aktif pestisida yang digunakan</label>
                                                            <div className="col-sm-6">
                                                                <input type="text" name='bahanPestisida' id='bahanPestisida' {...register("bahanPestisida")} className='form-control form-control-sm' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mb-2">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="dosisPestisida">Dosis / Konsentrasi</label>
                                                            <div className="col-sm-6">
                                                                <input type="text" name='dosisPestisida' id='dosisPestisida' {...register("dosisPestisida")} className='form-control form-control-sm' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="mulaiPerlakuan">Mulai Perlakuan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-6">
                                                                <input type="datetime-local" name='mulaiPerlakuan' id='mulaiPerlakuan' {...register("mulaiPerlakuan", {required: "Mohon isi tanggal dan waktu dimulainya perlakuan."})} className={errors.mulaiPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.mulaiPerlakuan && <small className="text-danger">{errors.mulaiPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="selesaiPerlakuan">Selesai Perlakuan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-6">
                                                                <input type="datetime-local" name='selesaiPerlakuan' id='selesaiPerlakuan' {...register("selesaiPerlakuan", {required: "Mohon isi tanggal dan waktu selesai perlakuan."})} className={errors.selesaiPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.selesaiPerlakuan && <small className="text-danger">{errors.selesaiPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-2 col-form-label" htmlFor="tempatPerlakuan">Tempat Perlakuan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-2">
                                                                <select name="tempatPerlakuan" id="tempatPerlakuan" {...register("tempatPerlakuan", {required: "Mohon pilih tempat perlakuan."})} className={errors.tempatPerlakuan ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                    <option value="">--</option>
                                                                    <option value="IK">Instalasi Karantina</option>
                                                                    <option value="TL">Tempat Lain</option>
                                                                    <option value="DL">Depo / Lainnya</option>
                                                                </select>
                                                                {errors.tempatPerlakuan && <small className="text-danger">{errors.tempatPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="namaTempatPerlakuan">Nama Tempat <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-6">
                                                                <input type="text" name='namaTempatPerlakuan' id='namaTempatPerlakuan' {...register("namaTempatPerlakuan", {required: "Mohon isi nama tempat perlakuan."})} className={errors.namaTempatPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.namaTempatPerlakuan && <small className="text-danger">{errors.namaTempatPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="alamatTempatPerlakuan">Alamat Tempat <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name='alamatTempatPerlakuan' id='alamatTempatPerlakuan' {...register("alamatTempatPerlakuan", {required: "Mohon isi nama alamat tempat perlakuan."})} className={errors.alamatTempatPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.alamatTempatPerlakuan && <small className="text-danger">{errors.alamatTempatPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="operatorPelaksana">Nama Pelaksana Perlakuan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-6">
                                                                <input type="text" name='operatorPelaksana' id='operatorPelaksana' {...register("operatorPelaksana", {required: "Mohon isi nama operator pelaksana perlakuan."})} className={errors.operatorPelaksana ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.operatorPelaksana && <small className="text-danger">{errors.operatorPelaksana.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="alamatOperatorPelaksana">Alamat Pelaksana Perlakuan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name='alamatOperatorPelaksana' id='alamatOperatorPelaksana' {...register("alamatOperatorPelaksana", {required: "Mohon isi nama alamat operator pelaksana perlakuan."})} className={errors.alamatTempatPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.alamatOperatorPelaksana && <small className="text-danger">{errors.alamatOperatorPelaksana.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-2 col-form-label" htmlFor="keteranganLain">Keterangan Lain</label>
                                                            <div className="col-sm-4">
                                                                <textarea name="keteranganLain" id="keteranganLain" {...register("keteranganLain")} className='form-control form-control-sm' rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{marginLeft: "6px", marginTop: "30px"}}>
                                        <label className="col-sm-2 col-form-label" htmlFor="ttdPerlakuan">Penandatangan</label>
                                        <div className="col-sm-3">
                                            <input type="text" name='ttdPerlakuan' id='ttdPerlakuan' {...register("ttdPerlakuan")} className='form-control form-control-sm' />
                                        </div>
                                        <label className="col-sm-2 col-form-label text-sm-end" htmlFor="diterbitkan">diterbitkan di</label>
                                        <div className="col-sm-2">
                                            <input type="text" name='diterbitkan' id='diterbitkan' {...register("diterbitkan")} className='form-control form-control-sm' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 text-center">
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

export default DocK51