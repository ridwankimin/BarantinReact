import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {decode as base64_decode} from 'base-64';
import PtkModel from '../../model/PtkModel';
import PtkSurtug from '../../model/PtkSurtug';
import PnPerlakuan from '../../model/PnPerlakuan';
import { useNavigate } from 'react-router-dom';
import PtkHistory from '../../model/PtkHistory';

function DocK52() {
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
        noDok52: "",
        dokKarId: "22"
    });

    const dataWatch = watch()

    const onSubmit = (data) => {
        // console.log(data)
        const model = new PnPerlakuan();
        const response = model.sertifFumigasi(data);
            response
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(response.data.status === '201') {
                        //start save history
                        const log = new PtkHistory();
                        const resHsy = log.pushHistory(data.idPtk, "p4", "K-5.2", (data.idDok52 ? 'put' : 'post'));
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
                        setValue("idDok52", response.data.data.id)
                        setValue("noDok52", response.data.data.nomor)
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
            const resLaporan = modelPerlakuan.getPtkByDokumen(base64_decode(ptkNomor[1]), 22);
            setValue("idPtk", base64_decode(ptkNomor[1]))
            resLaporan
            .then((response) => {
                console.log("dok52")
                console.log(response.data.data)
                if(response.data.status === '200') {
                    // alert(response.data.message);
                    setValue("idDok52", response.data.data[0].id)
                    setValue("noDok52", response.data.data[0].nomor)
                    setValue("noDokumen", response.data.data[0].nomor)
                    setValue("tglDok52", response.data.data[0].tanggal)
                    setValue("idSurtug", response.data.data[0].ptk_surat_tugas_id)
                    setValue("namaIlmiahMP", response.data.data[0].nama_ilmiah_mp)
                    setValue("namaUmumMP", response.data.data[0].nama_dagang_mp)
                    setValue("bentukJmlMP", response.data.data[0].bentuk_jmlh_mp)
                    setValue("targetPerlakuan", response.data.data[0].target_perlakuan)
                    // setValue("alasanPerlakuan", response.data.data[0].alasan_perlakuan)
                    setValue("metodePerlakuan", response.data.data[0].metode_perlakuan)
                    setValue("tipePerlakuan", response.data.data[0].tipe_perlakuan_id)
                    setValue("fumigan", response.data.data[0].pestisida_id)
                    setValue("suhuMinim", response.data.data[0].suhu_komoditi)
                    setValue("dosisRekom", response.data.data[0].dosis_rekomendasi)
                    setValue("dosisAplikasi", response.data.data[0].dosis_aplikasi)
                    setValue("lamaPapar", response.data.data[0].lama_papar)
                    setValue("mulaiPerlakuan", response.data.data[0].tgl_perlakuan_mulai)
                    setValue("selesaiPerlakuan", response.data.data[0].tgl_perlakuan_selesai)
                    setValue("tipeRuang", response.data.data[0].tipe_ruang_fumigasi)
                    setValue("namaTempatPerlakuan", response.data.data[0].nama_tempat)
                    setValue("alamatTempatPerlakuan", response.data.data[0].alamat_tempat)
                    setValue("nilaiTlv", response.data.data[0].nilai_tlv_akhir)
                    setValue("fumigatorAkreditasi", response.data.data[0].fumigator_id)
                    setValue("namaFumigator", response.data.data[0].nama_operator)
                    setValue("alamatFumigator", response.data.data[0].alamat_operator)
                    // setValue("keteranganLain", response.data.data[0].ket_perlakuan_lain)
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
                            // setValue("alasanPerlakuan", response.data.data[0].alasan_perlakuan)
                            setValue("metodePerlakuan", response.data.data[0].metode_perlakuan)
                            setValue("tipePerlakuan", response.data.data[0].tipe_perlakuan_id)
                            setValue("fumigan", response.data.data[0].pestisida_id)
                            setValue("suhuMinim", response.data.data[0].suhu_komoditi)
                            setValue("dosisRekom", response.data.data[0].dosis_rekomendasi)
                            setValue("dosisAplikasi", response.data.data[0].dosis_aplikasi)
                            setValue("lamaPapar", response.data.data[0].lama_papar)
                            setValue("mulaiPerlakuan", response.data.data[0].tgl_perlakuan_mulai)
                            setValue("selesaiPerlakuan", response.data.data[0].tgl_perlakuan_selesai)
                            setValue("tipeRuang", response.data.data[0].tipe_ruang_fumigasi)
                            setValue("namaTempatPerlakuan", response.data.data[0].nama_tempat)
                            setValue("alamatTempatPerlakuan", response.data.data[0].alamat_tempat)
                            setValue("nilaiTlv", response.data.data[0].nilai_tlv_akhir)
                            setValue("fumigatorAkreditasi", response.data.data[0].fumigator_id)
                            setValue("namaFumigator", response.data.data[0].nama_operator)
                            setValue("alamatFumigator", response.data.data[0].alamat_operator)
                            // setValue("keteranganLain", response.data.data[0].ket_perlakuan_lain)
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
                    console.log(response.data.data)
                    // alert(response.data.message);
                    // isiDataPtk(response)
                    setData(values => ({...values,
                        noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                        noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                        noDokumen: idPtk ? base64_decode(ptkNomor[2]) : "",
                        tglDokumen: tglPtk,
                        kegiatan: response.data.data.ptk,
                        listPtk: response.data.data.ptk,
                        listKomoditas: response.data.data.ptk_komoditi,
                        listDokumen: response.data.data.ptk_dokumen
                    }));
                    let nmrKont = response.data.data.ptk_kontainer?.map(item => {
                        return item.nomor
                    })
                    setValue("idPtk", base64_decode(ptkNomor[1]))
                    setValue("noDokumen", base64_decode(ptkNomor[2]))
                    setValue("dokKarId", 22)
                    setValue("jmlNoContainer", response.data.data.ptk_kontainer.length + " (" + nmrKont.join(";") +")")
                    setValue("tempatPerlakuan", response.data.data.ptk.tempat_pemeriksaan)
                    setValue("tandaKhusus", response.data.data.ptk.tanda_khusus)
                }
            })
            .catch((error) => {
                setData()
                console.log(error.response);
            });
        }
    },[idPtk, setValue, navigate])
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-5.2 <span className="fw-light" style={{color: 'blue'}}>SERTIFIKAT FUMIGASI / FUMIGATION CERTIFICATE</span>
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
                            <label className="col-sm-1 col-form-label" htmlFor="tglDokumen"><b>Tanggal</b></label>
                            <div className="col-sm-2">
                                <input type="text" id='tglDokumen' value={data.tglDokumen || ""} className='form-control form-control-sm' disabled/>
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
                        <input type="hidden" name='idDok52' {...register("idDok52")} />
                        <input type="hidden" name='idSurtug' {...register("idSurtug")} />
                        <input type="hidden" name='noDokumen' {...register("noDokumen")} />
                        <input type="hidden" name='idPtk' {...register("idPtk")} />
                        {/* k-5.1 : 21 */}
                        <input type="hidden" name='dokKarId' {...register("dokKarId")} />
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noDok52">{data.kegiatan === 'EX' ? "Doc Number" : "Nomor Dokumen"}</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok52" name='noDok52' {...register("noDok52")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-5.2" disabled />
                                </div>
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="tglDok52">{data.kegiatan === 'EX' ? "Date" : "Tanggal"} <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok52" name='tglDok52' {...register("tglDok52", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok52 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok52 && <small className="text-danger">{errors.tglDok52.message}</small>}
                                </div>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col">
                                <div className="accordion" id="collapseSection">
                                    <div className="card">
                                        <h2 className="accordion-header" id="headerImporter">
                                            <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                            <h5 className='text-lightest mb-0'>{data.kegiatan === 'EX' ? "CONSIGNMENT DETAILS" : "Keterangan Media Pembawa"}</h5>
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
                                                            <label className="col-sm-4 col-form-label" htmlFor="targetPerlakuan">Target Fumigasi <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-4">
                                                                <select name="targetPerlakuan" id="targetPerlakuan" {...register("targetPerlakuan", {required: "Mohon isi nama jumlah media pembawa."})} className={errors.bentukJmlMP ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                    <option value="">--</option>
                                                                    <option value="CMDT">Media Pembawa</option>
                                                                    <option value="PACK">Kemasan</option>
                                                                    <option value="ALL">Keduanya</option>
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
                                            <h5 className='text-lightest mb-0'>Keterangan Perlakuan Fumigasi</h5>
                                            </button>
                                        </h2>
                                        <div id="collapseImporter">
                                            <div className="accordion-body">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-6 col-form-label" htmlFor="fumigan">Fumigan yang digunakan</label>
                                                            <div className="col-sm-6">
                                                                <input type="text" name='fumigan' id='fumigan' {...register("fumigan")} className='form-control form-control-sm' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-6 col-form-label" htmlFor="suhuMinim">Perkiraan Suhu Minimum (&deg;C)</label>
                                                            <div className="col-sm-6">
                                                                <input type="text" name='suhuMinim' id='suhuMinim' {...register("suhuMinim")} className='form-control form-control-sm' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-6 col-form-label" htmlFor="dosisRekom">Dosis Rekomendasi (g/m&sup3;)</label>
                                                            <div className="col-sm-6">
                                                                <input type="text" name='dosisRekom' id='dosisRekom' {...register("dosisRekom")} className='form-control form-control-sm' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-6 col-form-label" htmlFor="dosisAplikasi">Dosis yang diaplikasikan (g/m&sup3;)</label>
                                                            <div className="col-sm-6">
                                                                <input type="text" name='dosisAplikasi' id='dosisAplikasi' {...register("dosisAplikasi")} className='form-control form-control-sm' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="lamaPapar">Lama Waktu Papar (jam)</label>
                                                            <div className="col-sm-2">
                                                                <div class="input-group">
                                                                    <input type="text" name='lamaPapar' id='lamaPapar' {...register("lamaPapar")} className='form-control form-control-sm' />
                                                                    <span class="input-group-text p-1"> jam</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-6 col-form-label" htmlFor="mulaiPerlakuan">Mulai Fumigasi <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-4">
                                                                <input type="datetime-local" name='mulaiPerlakuan' id='mulaiPerlakuan' {...register("mulaiPerlakuan", {required: "Mohon isi tanggal dan waktu dimulainya perlakuan."})} className={errors.mulaiPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.mulaiPerlakuan && <small className="text-danger">{errors.mulaiPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-6 col-form-label" htmlFor="selesaiPerlakuan">Selesai Fumigasi <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-4">
                                                                <input type="datetime-local" name='selesaiPerlakuan' id='selesaiPerlakuan' {...register("selesaiPerlakuan", {required: "Mohon isi tanggal dan waktu selesai perlakuan."})} className={errors.selesaiPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.selesaiPerlakuan && <small className="text-danger">{errors.selesaiPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-2 col-form-label" htmlFor="tempatPerlakuan">Tempat Pelaksanaan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-2">
                                                                <select name="tempatPerlakuan" id="tempatPerlakuan" {...register("tempatPerlakuan", {required: "Mohon pilih tempat perlakuan."})} className={errors.tempatPerlakuan ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                    <option value="">--</option>
                                                                    <option value="IK">Instalasi Karantina</option>
                                                                    <option value="TL">Tempat Lain</option>
                                                                    <option value="DL">Depo / Lainnya</option>
                                                                </select>
                                                                {errors.tempatPerlakuan && <small className="text-danger">{errors.tempatPerlakuan.message}</small>}
                                                            </div>
                                                            <label className="col-sm-3 col-form-label text-sm-end" htmlFor="tipeRuang">Tipe Ruang Fumigasi <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-2">
                                                                <select name="tipeRuang" id="tipeRuang" {...register("tipeRuang", {required: "Mohon pilih tipe ruang fumigasi."})} className={errors.tipeRuang ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
                                                                    <option value="">--</option>
                                                                    <option value="CHMB">Chamber</option>
                                                                    <option value="UNCT">Un-sheeted container</option>
                                                                    <option value="SNCT">Sheeted container/s</option>
                                                                    {/* <option value="4">Pressure-tested container</option> */}
                                                                    <option value="SHST">Sheeted stack</option>
                                                                    <option value="BULK">Bulk/vessel/cargo hold</option>
                                                                </select>
                                                                {errors.tipeRuang && <small className="text-danger">{errors.tipeRuang.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="namaTempatPerlakuan">Nama Tempat <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-6" style={{paddingLeft: "5px"}}>
                                                                <input type="text" name='namaTempatPerlakuan' id='namaTempatPerlakuan' {...register("namaTempatPerlakuan", {required: "Mohon isi nama tempat perlakuan."})} className={errors.namaTempatPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.namaTempatPerlakuan && <small className="text-danger">{errors.namaTempatPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label text-sm-center" htmlFor="alamatTempatPerlakuan">Alamat Tempat <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name='alamatTempatPerlakuan' id='alamatTempatPerlakuan' {...register("alamatTempatPerlakuan", {required: "Mohon isi nama alamat tempat perlakuan."})} className={errors.alamatTempatPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.alamatTempatPerlakuan && <small className="text-danger">{errors.alamatTempatPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="row">
                                                            <label className="col-sm-6 col-form-label" htmlFor="nilaiTlv">Nilai TLV akhir (ppm) <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-3">
                                                                <input type="number" name='nilaiTlv' id='nilaiTlv' {...register("nilaiTlv")} className="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                                <div className='row'>
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-2 col-form-label" htmlFor="fumigatorAkreditasi">Nama fumigator terakreditasi <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-4">
                                                                <input type="text" name='fumigatorAkreditasi' id='fumigatorAkreditasi' {...register("fumigatorAkreditasi", {required: "Mohon isi nama fumigator terakrediasi."})} className={errors.fumigatorAkreditasi ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.fumigatorAkreditasi && <small className="text-danger">{errors.fumigatorAkreditasi.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="namaFumigator">Nama Fumigator</label>
                                                            <div className="col-sm-6">
                                                                <input type="text" name='namaFumigator' id='namaFumigator' {...register("namaFumigator")} className="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label text-sm-center" htmlFor="alamatFumigator">Alamat Fumigator</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name='alamatFumigator' id='alamatFumigator' {...register("alamatFumigator")} className="form-control form-control-sm" />
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

export default DocK52