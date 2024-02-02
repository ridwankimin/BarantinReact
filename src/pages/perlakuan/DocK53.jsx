import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import PnPerlakuan from '../../model/PnPerlakuan';
import {decode as base64_decode} from 'base-64';
import { useForm } from 'react-hook-form';
import PtkModel from '../../model/PtkModel';
import PtkSurtug from '../../model/PtkSurtug';
import PtkHistory from '../../model/PtkHistory';

function DocK53() {
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
    } = useForm({
        noDok53: "",
        dokKarId: "23"
    });
    const dataWatch = watch()

    const onSubmit = (data) => {
        console.log(data)
        const model = new PnPerlakuan();
        const response = model.sertifLaporan(data);
            response
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(response.data.status === '201') {
                        //start save history
                        const log = new PtkHistory();
                        const resHsy = log.pushHistory(data.idPtk, "p4", "K-5.3", (data.idDok53 ? 'put' : 'post'));
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
                        setValue("idDok53", response.data.data.id)
                        setValue("noDok53", response.data.data.nomor)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });
    }
    console.log("idptk : " + idPtk)
    useEffect(() => {
        if(idPtk) {
            // alert(idPtk)
            const tglPtk = Cookies.get("tglPtk");
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            
            const modelPemohon = new PtkModel();
            const response = modelPemohon.getPtkId(base64_decode(ptkNomor[1]));
            response
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorPtk: false
                    }))
                    if(response.data.status === '200') {
                        // alert(response.data.message);
                        // isiDataPtk(response)
                        setData(values => ({...values,
                            noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                            noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                            noDokumen: idPtk ? base64_decode(ptkNomor[2]) : "",
                            tglDokumen: tglPtk,
                            kegiatan: response.data.data.ptk.jenis_permohonan,
                            jenisKarantina: response.data.data.ptk.jenis_karantina,
                            // listPtk: response.data.data.ptk,
                            nama_pengirim: response.data.data.ptk.nama_pengirim,
                            nama_penerima: response.data.data.ptk.nama_penerima,
                            alamat_pengirim: response.data.data.ptk.alamat_pengirim,
                            alamat_penerima: response.data.data.ptk.alamat_penerima,
                            jenis_identitas_pengirim: response.data.data.ptk.jenis_identitas_pengirim,
                            jenis_identitas_penerima: response.data.data.ptk.jenis_identitas_penerima,
                            nomor_identitas_pengirim: response.data.data.ptk.nomor_identitas_pengirim,
                            nomor_identitas_penerima: response.data.data.ptk.nomor_identitas_penerima,
                            kd_pelabuhan_muat: response.data.data.ptk.kd_pelabuhan_muat,
                            pelabuhan_muat: response.data.data.ptk.pelabuhan_muat,
                            kd_pelabuhan_bongkar: response.data.data.ptk.kd_pelabuhan_bongkar,
                            pelabuhan_bongkar: response.data.data.ptk.pelabuhan_bongkar,
                            negara_muat: response.data.data.ptk.negara_muat,
                            negara_bongkar: response.data.data.ptk.negara_bongkar,
                            // listKomoditas: response.data.data.ptk_komoditi,
                            // listDokumen: response.data.data.ptk_dokumen
                        }));
                        let namaUmum = response.data.data.ptk_komoditi?.map(item => {
                            return item.nama_umum_tercetak
                        })
                        let namaIlmiah = response.data.data.ptk_komoditi?.map(item => {
                            return item.nama_latin_tercetak
                        })
                        let bntukjml = response.data.data.ptk_komoditi?.map(item => {
                            return item.volume_lain + " " + item.sat_lain
                        })
                        let nmrKont = response.data.data.ptk_kontainer?.map(item => {
                            return item.nomor
                        })
                        setValue("namaIlmiahMP", namaIlmiah.join(";"))
                        setValue("namaUmumMP", namaUmum.join(";"))
                        setValue("bentukJmlMP", bntukjml.join(";"))
                        setValue("tandaKhusus", response.data.data.ptk.tanda_khusus)
                        setValue("tempatPerlakuan", response.data.data.ptk.tempat_pemeriksaan)
                        setValue("namaTempatPerlakuan", response.data.data.ptk.nama_tempat_pemeriksaan)
                        setValue("alamatTempatPerlakuan", response.data.data.ptk.alamat_tempat_pemeriksaan)
                        setValue("jmlNoContainer", response.data.data.ptk_kontainer.length + " (" + nmrKont.join(";") +")")
                        setValue("idPtk", base64_decode(ptkNomor[1]))
                        setValue("noDokumen", base64_decode(ptkNomor[2]))
                        setValue("dokKarId", 23)
                    }
                } else {
                    setData(values => ({...values,
                        errorPtk: true
                    }))
                }
            })
            .catch((error) => {
                console.log(error)
                setData(values => ({...values,
                    errorPtk: true
                }))
                // setData()
                // alert(error.response);
            });

            const modelPerlakuan = new PnPerlakuan();
            const resLaporan = modelPerlakuan.getPtkByDokumen(base64_decode(ptkNomor[1]), 23);
            resLaporan
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorData53: false
                    }))
                    if(response.data.status === '200') {
                        alert(response.data.message);
                        setValue("noDok53", response.data.data[0].nomor)
                        setValue("tglDok53", response.data.data[0].tanggal)
                        setValue("jenisTugas", response.data.data[0].jenis_tugas)
                        setValue("namaIlmiahMP", response.data.data[0].nama_ilmiah_mp)
                        setValue("namaUmumMP", response.data.data[0].nama_dagang_mp)
                        setValue("bentukJmlMP", response.data.data[0].bentuk_jmlh_mp)
                        setValue("targetPerlakuan", response.data.data[0].target_perlakuan)
                        setValue("alasanPerlakuan", response.data.data[0].alasan_perlakuan)
                        setValue("metodePerlakuan", response.data.data[0].metode_perlakuan)
                        setValue("tipePerlakuan", response.data.data[0].tipe_perlakuan_id)
                        setValue("bahanPestisida", response.data.data[0].pestisida_id)
                        setValue("dosisRekom", response.data.data[0].dosis_rekomendasi)
                        setValue("dosisAplikasi", response.data.data[0].dosis_aplikasi)
                        setValue("mulaiPerlakuan", response.data.data[0].tgl_perlakuan_mulai)
                        setValue("selesaiPerlakuan", response.data.data[0].tgl_perlakuan_selesai)
                        setValue("suhuMinim", response.data.data[0].suhu_komoditi)
                        setValue("lamaPapar", response.data.data[0].lama_papar)
                        // setValue("tempatPerlakuan", response.data.data.tgl_perlakuan_selesai)
                        // setValue("namaTempatPerlakuan", response.data.data[0].nama_tempat)
                        // setValue("alamatTempatPerlakuan", response.data.data[0].alamat_tempat)
                        setValue("operatorPelaksana", response.data.data[0].nama_operator)
                        setValue("alamatOperatorPelaksana", response.data.data[0].alamat_operator)
                        setValue("ketLainMP", response.data.data[0].ket_mp_lain)
                        setValue("keteranganLain", response.data.data[0].ket_perlakuan_lain)
                        setValue("hasilPerlakuan", response.data.data[0].hasil_perlakuan)
                        setValue("rekomPerlakuan", response.data.data && response.data.data[0].rekomendasi_id.toString())
                        setValue("ttdPerlakuan", response.data.data[0].user_ttd_id)
                        setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                        // isiDataPtk(response)
                    }
                } else {
                    setData(values => ({...values,
                        errorData53: true
                    }))
                }
            })
            .catch((error) => {
                // setData()
                console.log(error.response);
                // alert("Laporan Hasil Perlakuan belum dibuat.\nMohon buat laporan perlakuan terlebih dahulu!")
                // navigate('/k53')
            });

            const modelSurtug = new PtkSurtug();
            const resPenugasan = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), 8);
            resPenugasan
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorSurtug: false
                    }))
                    if(response.data) {
                        if(response.data.status === '200') {
                            setValue("idSurtug", response.data.data[0].id)
                            setData(values => ({...values,
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                                }));
                        } else {
                            alert(response.data.status + " - Surat Tugas " + response.data.message)
                        }
                    }
                } else {
                    setData(values => ({...values,
                        errorSurtug: true
                    }))
                }
            })
            .catch((error) => {
                console.log(error);
                setData(values => ({...values,
                    errorSurtug: true
                }))
                // alert(error.response.status + " - Surat Tugas " + error.response.data.message)
            });
        }
    },[idPtk, setValue])

    function refreshData() {
        const tglPtk = Cookies.get("tglPtk");
        let ptkDecode = idPtk ? base64_decode(idPtk) : "";
        let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";

        const modelPemohon = new PtkModel();
            const response = modelPemohon.getPtkId(base64_decode(ptkNomor[1]));
            response
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorPtk: false
                    }))
                    if(response.data.status === '200') {
                        // alert(response.data.message);
                        // isiDataPtk(response)
                        setData(values => ({...values,
                            noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                            noIdPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                            noDokumen: idPtk ? base64_decode(ptkNomor[2]) : "",
                            tglDokumen: tglPtk,
                            kegiatan: response.data.data.ptk.jenis_permohonan,
                            jenisKarantina: response.data.data.ptk.jenis_karantina,
                            // listPtk: response.data.data.ptk,
                            nama_pengirim: response.data.data.ptk.nama_pengirim,
                            nama_penerima: response.data.data.ptk.nama_penerima,
                            alamat_pengirim: response.data.data.ptk.alamat_pengirim,
                            alamat_penerima: response.data.data.ptk.alamat_penerima,
                            jenis_identitas_pengirim: response.data.data.ptk.jenis_identitas_pengirim,
                            jenis_identitas_penerima: response.data.data.ptk.jenis_identitas_penerima,
                            nomor_identitas_pengirim: response.data.data.ptk.nomor_identitas_pengirim,
                            nomor_identitas_penerima: response.data.data.ptk.nomor_identitas_penerima,
                            kd_pelabuhan_muat: response.data.data.ptk.kd_pelabuhan_muat,
                            pelabuhan_muat: response.data.data.ptk.pelabuhan_muat,
                            kd_pelabuhan_bongkar: response.data.data.ptk.kd_pelabuhan_bongkar,
                            pelabuhan_bongkar: response.data.data.ptk.pelabuhan_bongkar,
                            negara_muat: response.data.data.ptk.negara_muat,
                            negara_bongkar: response.data.data.ptk.negara_bongkar,
                            // listKomoditas: response.data.data.ptk_komoditi,
                            // listDokumen: response.data.data.ptk_dokumen
                        }));
                        let namaUmum = response.data.data.ptk_komoditi?.map(item => {
                            return item.nama_umum_tercetak
                        })
                        let namaIlmiah = response.data.data.ptk_komoditi?.map(item => {
                            return item.nama_latin_tercetak
                        })
                        let bntukjml = response.data.data.ptk_komoditi?.map(item => {
                            return item.volume_lain + " " + item.sat_lain
                        })
                        let nmrKont = response.data.data.ptk_kontainer?.map(item => {
                            return item.nomor
                        })
                        setValue("namaIlmiahMP", namaIlmiah.join(";"))
                        setValue("namaUmumMP", namaUmum.join(";"))
                        setValue("bentukJmlMP", bntukjml.join(";"))
                        setValue("tandaKhusus", response.data.data.ptk.tanda_khusus)
                        setValue("tempatPerlakuan", response.data.data.ptk.tempat_pemeriksaan)
                        setValue("namaTempatPerlakuan", response.data.data.ptk.nama_tempat_pemeriksaan)
                        setValue("alamatTempatPerlakuan", response.data.data.ptk.alamat_tempat_pemeriksaan)
                        setValue("jmlNoContainer", response.data.data.ptk_kontainer.length + " (" + nmrKont.join(";") +")")
                        setValue("idPtk", base64_decode(ptkNomor[1]))
                        setValue("noDokumen", base64_decode(ptkNomor[2]))
                        setValue("dokKarId", 23)
                    }
                } else {
                    setData(values => ({...values,
                        errorPtk: true
                    }))
                }
            })
            .catch((error) => {
                console.log(error)
                setData(values => ({...values,
                    errorPtk: true
                }))
                // setData()
                // alert(error.response);
            });

            const modelPerlakuan = new PnPerlakuan();
            const resLaporan = modelPerlakuan.getPtkByDokumen(base64_decode(ptkNomor[1]), 23);
            resLaporan
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorData53: false
                    }))
                    if(response.data.status === '200') {
                        alert(response.data.message);
                        setValue("noDok53", response.data.data[0].nomor)
                        setValue("tglDok53", response.data.data[0].tanggal)
                        setValue("jenisTugas", response.data.data[0].jenis_tugas)
                        setValue("namaIlmiahMP", response.data.data[0].nama_ilmiah_mp)
                        setValue("namaUmumMP", response.data.data[0].nama_dagang_mp)
                        setValue("bentukJmlMP", response.data.data[0].bentuk_jmlh_mp)
                        setValue("targetPerlakuan", response.data.data[0].target_perlakuan)
                        setValue("alasanPerlakuan", response.data.data[0].alasan_perlakuan)
                        setValue("metodePerlakuan", response.data.data[0].metode_perlakuan)
                        setValue("tipePerlakuan", response.data.data[0].tipe_perlakuan_id)
                        setValue("bahanPestisida", response.data.data[0].pestisida_id)
                        setValue("dosisRekom", response.data.data[0].dosis_rekomendasi)
                        setValue("dosisAplikasi", response.data.data[0].dosis_aplikasi)
                        setValue("mulaiPerlakuan", response.data.data[0].tgl_perlakuan_mulai)
                        setValue("selesaiPerlakuan", response.data.data[0].tgl_perlakuan_selesai)
                        setValue("suhuMinim", response.data.data[0].suhu_komoditi)
                        setValue("lamaPapar", response.data.data[0].lama_papar)
                        // setValue("tempatPerlakuan", response.data.data.tgl_perlakuan_selesai)
                        // setValue("namaTempatPerlakuan", response.data.data[0].nama_tempat)
                        // setValue("alamatTempatPerlakuan", response.data.data[0].alamat_tempat)
                        setValue("operatorPelaksana", response.data.data[0].nama_operator)
                        setValue("alamatOperatorPelaksana", response.data.data[0].alamat_operator)
                        setValue("ketLainMP", response.data.data[0].ket_mp_lain)
                        setValue("keteranganLain", response.data.data[0].ket_perlakuan_lain)
                        setValue("hasilPerlakuan", response.data.data[0].hasil_perlakuan)
                        setValue("rekomPerlakuan", response.data.data && response.data.data[0].rekomendasi_id.toString())
                        setValue("ttdPerlakuan", response.data.data[0].user_ttd_id)
                        setValue("diterbitkan", response.data.data[0].diterbitkan_di)
                        // isiDataPtk(response)
                    }
                } else {
                    setData(values => ({...values,
                        errorData53: true
                    }))
                }
            })
            .catch((error) => {
                // setData()
                console.log(error.response);
                // alert("Laporan Hasil Perlakuan belum dibuat.\nMohon buat laporan perlakuan terlebih dahulu!")
                // navigate('/k53')
            });

            const modelSurtug = new PtkSurtug();
            const resPenugasan = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), 8);
            resPenugasan
            .then((response) => {
                if(typeof response.data != "string") {
                    setData(values => ({...values,
                        errorSurtug: false
                    }))
                    if(response.data) {
                        if(response.data.status === '200') {
                            setValue("idSurtug", response.data.data[0].id)
                            setData(values => ({...values,
                                noSurtug: response.data.data[0].nomor,
                                tglSurtug: response.data.data[0].tanggal,
                                }));
                        } else {
                            alert(response.data.status + " - Surat Tugas " + response.data.message)
                        }
                    }
                } else {
                    setData(values => ({...values,
                        errorSurtug: true
                    }))
                }
            })
            .catch((error) => {
                console.log(error);
                setData(values => ({...values,
                    errorSurtug: true
                }))
                // alert(error.response.status + " - Surat Tugas " + error.response.data.message)
            });
    }
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-5.3 <span className="fw-light" style={{color: 'blue'}}>LAPORAN HASIL PERLAKUAN</span>
    <div className='float-end' style={{display: (data.errorPtk | data.errorSurtug | data.errorData53 ? "block" : "none")}}>
        <small className='text-danger'>{data.errorPtk? "Gagal load data PTK; " : null}</small>
        <small className='text-danger'>{data.errorSurtug ? "Gagal load data surat tugas; " : null}</small>
        <small className='text-danger'>{data.errorData53 ? "Gagal load data Dok K-5.3" : null}</small>
        <button type='button' onClick={() => refreshData()} className='btn btn-xs btn-warning'><i className='fa-solid fa-sync'></i> Refresh</button>
    </div>
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
                                <input type="text" id='noSurtug' value={data.noSurtug || ""} className='form-control form-control-sm' disabled/>
                            </div>
                            <label className="col-sm-1 col-form-label text-sm-end" htmlFor="tglSurtug"><b>Tanggal</b></label>
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
                        <input type="hidden" name='idDok53' {...register("idDok53")} />
                        <input type="hidden" name='idSurtug' {...register("idSurtug")} />
                        <input type="hidden" name='noDokumen' {...register("noDokumen")} />
                        <input type="hidden" name='idPtk' {...register("idPtk")} />
                        {/* k-5.1 : 21 */}
                        <input type="hidden" name='dokKarId' {...register("dokKarId")} />
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noDok53">Nomor Dokumen</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok53" name='noDok53' {...register("noDok53")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-5.3" disabled />
                                </div>
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="tglDok53">Tanggal <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="date" id="tglDok53" name='tglDok53' {...register("tglDok53", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok53 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {errors.tglDok53 && <small className="text-danger">{errors.tglDok53.message}</small>}
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='row'>
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="jenisTugas">Jenis Tugas <span className='text-danger'>*</span></label>
                                <div className="col-sm-3">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="perlakuan">Pelaksanaan Perlakuan</label>
                                        <input name="jenisTugas" value="PERLAKUAN" {...register("jenisTugas", { required: "Mohon pilih jenis tugas yang sesuai."})} className={errors.jenisTugas ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="perlakuan" />
                                    </div>
                                {errors.jenisTugas && <small className="text-danger">{errors.jenisTugas.message}</small>}
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="pengawasan">Pengawasan Perlakuan</label>
                                        <input name="jenisTugas" value="PENGAWASAN" {...register("jenisTugas")} className={errors.jenisTugas ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="pengawasan" />
                                    </div>
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
                                                                <input type="text" id="namaPengirim" value={data.nama_pengirim || ""} disabled className="form-control form-control-sm" placeholder="Nama Pengirim" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                    <h5 className='mb-1'><b><u>Identitas Penerima</u></b></h5>
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="namaPenerima">Nama</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="namaPenerima" value={data.nama_penerima || ""} disabled className="form-control form-control-sm" placeholder="Nama Penerima" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-1">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="alamatPengirim">Alamat</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="alamatPengirim" className="form-control form-control-sm" disabled value={data.alamat_pengirim || ""} id="alamatPengirim" rows="2" placeholder=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="alamatPenerima">Alamat</label>
                                                            <div className="col-sm-9">
                                                                <textarea name="alamatPenerima" className="form-control form-control-sm" disabled value={data.alamat_penerima || ""} id="alamatPenerima" rows="2" placeholder=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="identitasPengirim">Identitas</label>
                                                            <div className="col-sm-9">
                                                                <input name="identitastPengirim" className="form-control form-control-sm" disabled value={(data.jenis_identitas_pengirim + " - " + data.nomor_identitas_pengirim) || ""} id="identitasPengirim" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="identitasPenerima">Identitas</label>
                                                            <div className="col-sm-9">
                                                                <input name="identitasPenerima" className="form-control form-control-sm" disabled value={(data.jenis_identitas_penerima + " - " + data.nomor_identitas_penerima) || ""} id="identitasPenerima" placeholder="" />
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
                                                                <input type="text" id="pelMuat" value={data.kd_pelabuhan_muat + " - " + data.pelabuhan_muat || ""} disabled className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="pelBongkar">Pelabuhan Bongkar</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" id="pelBongkar" value={data.kd_pelabuhan_bongkar + " - " + data.pelabuhan_bongkar || ""} disabled className="form-control form-control-sm" placeholder="Negara/Area Tujuan" />
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
                                                                <input type="text" id="negaraAsal" value={data.negara_muat || ""} disabled className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="negaraTujuan">Negara/Area Tujuan</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" id="negaraTujuan" value={data.negara_bongkar || ""} disabled className="form-control form-control-sm" placeholder="Negara/Area Tujuan" />
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
                                                                <select name="targetPerlakuan" id="targetPerlakuan" {...register("targetPerlakuan", {required: "Mohon isi target perlakuan."})} className={errors.bentukJmlMP ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}>
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
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-2 col-form-label" htmlFor="ketLainMP">Keterangan Lain</label>
                                                            <div className="col-sm-6">
                                                                <textarea id="ketLainMP" name='ketLainMP' {...register("ketLainMP")} rows={2} className="form-control form-control-sm"></textarea>
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
                                                    <div className="col-md-12" style={{display: (dataWatch.metodePerlakuan === "CHT" ? "block" : "none")}}>
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="bahanPestisida">Bahan/Pestisida yang digunakan</label>
                                                            <div className="col-sm-3">
                                                                <input type="text" name='bahanPestisida' id='bahanPestisida' {...register("bahanPestisida")} className='form-control form-control-sm' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="suhuMinim">Suhu Perlakuan (&deg;C)</label>
                                                            <div className="col-sm-3">
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
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-6 col-form-label" htmlFor="mulaiPerlakuan">Mulai Perlakuan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-4">
                                                                <input type="datetime-local" name='mulaiPerlakuan' id='mulaiPerlakuan' {...register("mulaiPerlakuan", {required: "Mohon isi tanggal dan waktu dimulainya perlakuan."})} className={errors.mulaiPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.mulaiPerlakuan && <small className="text-danger">{errors.mulaiPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-6 col-form-label" htmlFor="selesaiPerlakuan">Selesai Perlakuan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-4">
                                                                <input type="datetime-local" name='selesaiPerlakuan' id='selesaiPerlakuan' {...register("selesaiPerlakuan", {required: "Mohon isi tanggal dan waktu selesai perlakuan."})} className={errors.selesaiPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.selesaiPerlakuan && <small className="text-danger">{errors.selesaiPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-3 col-form-label" htmlFor="lamaPapar">Lama Waktu Papar (jam)</label>
                                                            <div className="col-sm-2">
                                                                <div className="input-group">
                                                                    <input type="text" name='lamaPapar' id='lamaPapar' {...register("lamaPapar")} className='form-control form-control-sm' />
                                                                    <span className="input-group-text p-1"> jam</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-2 col-form-label" htmlFor="tempatPerlakuan">Tempat Pelaksanaan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-2">
                                                                <select name="tempatPerlakuan" id="tempatPerlakuan" {...register("tempatPerlakuan")} className="form-select form-select-sm">
                                                                {/* <select name="tempatPerlakuan" id="tempatPerlakuan" {...register("tempatPerlakuan", {required: "Mohon pilih tempat perlakuan."})} className={errors.tempatPerlakuan ? "form-select form-select-sm is-invalid" : "form-select form-select-sm"}> */}
                                                                    <option value="">--</option>
                                                                    <option value="IK">Instalasi Karantina</option>
                                                                    <option value="TL">Tempat Lain</option>
                                                                    <option value="DL">Depo / Lainnya</option>
                                                                </select>
                                                                {/* {errors.tempatPerlakuan && <small className="text-danger">{errors.tempatPerlakuan.message}</small>} */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="namaTempatPerlakuan">Nama Tempat</label>
                                                            <div className="col-sm-6" style={{paddingLeft: "5px"}}>
                                                                <input type="text" name='namaTempatPerlakuan' id='namaTempatPerlakuan' {...register("namaTempatPerlakuan")} className="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label text-sm-center" htmlFor="alamatTempatPerlakuan">Alamat Tempat</label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name='alamatTempatPerlakuan' id='alamatTempatPerlakuan' {...register("alamatTempatPerlakuan")} className="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="row">
                                                            <label className="col-sm-5 col-form-label" htmlFor="operatorPelaksana">Nama Pelaksana Perlakuan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-6" style={{paddingLeft: "5px"}}>
                                                                <input type="text" name='operatorPelaksana' id='operatorPelaksana' {...register("operatorPelaksana", {required: "Mohon isi nama operator pelaksana perlakuan."})} className={errors.operatorPelaksana ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.operatorPelaksana && <small className="text-danger">{errors.operatorPelaksana.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <label className="col-sm-4 col-form-label" htmlFor="alamatOperatorPelaksana">Alamat Pelaksana <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-8">
                                                                <input type="text" name='alamatOperatorPelaksana' id='alamatOperatorPelaksana' {...register("alamatOperatorPelaksana", {required: "Mohon isi nama alamat operator pelaksana perlakuan."})} className={errors.alamatTempatPerlakuan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                                                {errors.alamatOperatorPelaksana && <small className="text-danger">{errors.alamatOperatorPelaksana.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-2 col-form-label" htmlFor="keteranganLain">Lain-lain</label>
                                                            <div className="col-sm-5">
                                                                <input type="text" name='keteranganLain' id='keteranganLain' {...register("keteranganLain")} className="form-control form-control-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-2 col-form-label" htmlFor="hasilPerlakuan">Hasil Perlakuan <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-8">
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="bebas">Dapat dibebaskan dari {data.jenisKarantina === "H" ? "HPHK" : (data.jenisKarantina === "I" ? "HPIK" : (data.jenisKarantina === "T" ? "OPTK/OPT" : ""))}</label>
                                                                    <input name="hasilPerlakuan" value="BEBAS" {...register("hasilPerlakuan", { required: "Mohon pilih hasil periksa yang sesuai."})} className={errors.hasilPerlakuan ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="bebas" />
                                                                </div>
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="tidak">Tidak dapat dibebaskan dari {data.jenisKarantina === "H" ? "HPHK" : (data.jenisKarantina === "I" ? "HPIK" : (data.jenisKarantina === "T" ? "OPTK/OPT" : ""))}</label>
                                                                    <input name="hasilPerlakuan" value="TIDAK" {...register("hasilPerlakuan")} className={errors.hasilPerlakuan ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="tidak" />
                                                                </div>
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="comply">Memenuhi persyaratan negara/area tujuan</label>
                                                                    <input name="hasilPerlakuan" value="COMPLY" {...register("hasilPerlakuan")} className={errors.hasilPerlakuan ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="comply" />
                                                                </div>
                                                                {errors.hasilPerlakuan && <small className="text-danger">{errors.hasilPerlakuan.message}</small>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <label className="col-sm-2 col-form-label" htmlFor="hasilPerlakuan"><b>Rekomendasi</b> <span className='text-danger'>*</span></label>
                                                            <div className="col-sm-3">
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="rekom25">Dibebaskan</label>
                                                                    <input name="rekomPerlakuan" value={25} {...register("rekomPerlakuan", { required: "Mohon pilih rekomendasi yang sesuai."})} className={errors.rekomPerlakuan ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="rekom25" />
                                                                </div>
                                                                {errors.rekomPerlakuan && <small className="text-danger">{errors.rekomPerlakuan.message}</small>}
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="rekom26">Ditolak</label>
                                                                    <input name="rekomPerlakuan" value={26} {...register("rekomPerlakuan")} className={errors.rekomPerlakuan ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="rekom26" />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor="rekom27">Dimusnahkan</label>
                                                                    <input name="rekomPerlakuan" value={27} {...register("rekomPerlakuan")} className={errors.rekomPerlakuan ? "form-check-input is-invalid" : "form-check-input"} type="radio" id="rekom27" />
                                                                </div>
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
                    {/* <div className="card">
                        <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-center" htmlFor="nomor_k12">Nomor</label>
                                <div className="col-sm-4">
                                    <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col">
                            <div className="accordion" id="collapseSection">
                                <div className="card accordion-item">
                                    <h2 className="accordion-header" id="headerExporter">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExporter" aria-expanded="true" aria-controls="collapseExporter">
                                            Media Pembawa
                                        </button>
                                    </h2>
                                    <div id="collapseExporter">
                                        <div className="accordion-body">
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <button type="button" className="btn btn-xs btn-primary">Add Media Pembawa</button>
                                                </div>
                                                <table className="table table-bordered table-hover table-striped dataTable">
                                                    <thead>
                                                        <tr>
                                                            <th>NO</th>
                                                            <th>Jenis Media Pembawa</th>
                                                            <th>Nama Latin</th>
                                                            <th>Nama Umum</th>
                                                            <th>Jumlah (ekor/btg/lbr/kg/gr/l/ml)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th>1</th>
                                                            <th>-</th>
                                                            <th>-</th>
                                                            <th>-</th>
                                                            <th>-</th>
                                                        </tr>
                                                        <tr>
                                                            <th>2</th>
                                                            <th>-</th>
                                                            <th>-</th>
                                                            <th>-</th>
                                                            <th>-</th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card accordion-item">
                                    <h2 className="accordion-header" id="headerImporter">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                            Rincian Keterangan
                                        </button>
                                    </h2>
                                    <div id="collapseImporter">
                                        <div className="accordion-body">
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Pengirim</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Nama Pengirim" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Penerima</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Nama Penerima" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Alamat Pengirim</label>
                                                        <div className="col-sm-9">
                                                            <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Alamat Penerima</label>
                                                        <div className="col-sm-9">
                                                            <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Identitas/Kode Alat Angkut</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Identitas/Kode Alat Angkut" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tanggal Pengiriman</label>
                                                        <div className="col-sm-9">
                                                            <input type="date" id="collapse-name" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Negara/Area Asal</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Negara/Area Asal" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Negara/Area Tujuan</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Negara Tujuan" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Bill of Lading/Airway Bill</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Bill of Lading/Airway Bill" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jumlah Kemasan/Kontainer</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Jumlah Kemasan/Kontainer" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nomor Sertifikat Kesehatan</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Nomor Sertifikat Kesehatan" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Dokumen Lain</label>
                                                        <div className="col-sm-9">
                                                            <input type="text" id="collapse-name" className="form-control" placeholder="Dokumen Lain" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tanggal Kedatangan</label>
                                                        <div className="col-sm-4">
                                                            <input type="date" id="collapse-name" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card accordion-item">
                                    <h2 className="accordion-header" id="headerImporter">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                            Keputusan
                                        </button>
                                    </h2>
                                    <div id="collapseImporter">
                                        <div className="accordion-body">
                                            <div className="row g-3 mb-3">
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Keputusan Bongkar</label>
                                                        <div className="col-sm-9">
                                                            <select className="form-select">
                                                                <option>Setuju</option>
                                                                <option>Tidak Setuju</option>
                                                            </select>
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
                    </div> */}
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default DocK53