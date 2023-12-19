import React from 'react'

function DocK64() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-6.4 <span className="text-muted fw-light">(Laporan Hasil Penahanan)</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <form className="card-body">
                    {/* <!-- <h6 className="mb-b fw-normal">1. Account Details</h6> --> */}
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k64">Nomor K-6.4</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k64" className="form-control form-control-sm" placeholder="Nomor K-6.4" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k64">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k64" className="form-control form-control-sm" placeholder="Tanggal K-6.4" disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_st">Surat Tugas</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_st" className="form-control form-control-sm" placeholder="Nomor Surat Tugas" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_st">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_st" className="form-control form-control-sm" placeholder="Tanggal Surat Tugas" disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k37">Nomor K-3.7</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k37" className="form-control form-control-sm" placeholder="Nomor Hasil Pemeriksaan Administratif" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k37">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k37" className="form-control form-control-sm" placeholder="Tanggal Hasil Pemeriksaan Administratif" disabled />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="upt_kar">UPT Karantina</label>
                        <div className="col-sm-9">
                            <input type="text" id="upt_kar" className="form-control form-control-sm" placeholder="UPT Karantina" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="jenis_mp">Jenis Media Pembawa</label>
                        <div className="col-sm-9">
                            <input type="text" id="jenis_mp" className="form-control form-control-sm" placeholder="Jenis Media Pembawa" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nm_umum">Nama Umum/Dagang</label>
                        <div className="col-sm-9">
                            <input type="text" id="nm_umum" className="form-control form-control-sm" placeholder="Nama Umum/Dagang" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="kode_hs">Kode HS</label>
                        <div className="col-sm-9">
                            <input type="text" id="kode_hs" className="form-control form-control-sm" placeholder="Kode HS" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nm_ilmiah">Nama Ilmiah</label>
                        <div className="col-sm-9">
                            <input type="text" id="nm_ilmiah" className="form-control form-control-sm" placeholder="Nama Ilmiah" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="bentuk">Bentuk</label>
                        <div className="col-sm-4">
                            <input type="text" id="bentuk" className="form-control form-control-sm" placeholder="Bentuk" />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="jumlah">Jumlah</label>
                        <div className="col-sm-3">
                            <input type="text" id="jumlah" className="form-control form-control-sm" placeholder="Jumlah" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="jumlahpeti">Jumlah dan Nomor Peti Kemas</label>
                        <div className="col-sm-3">
                            <input type="text" id="jml_peti_kemas" className="form-control form-control-sm" placeholder="Jumlah" />
                        </div>
                        <div className="col-sm-6">
                            <input type="text" id="nmr_peti_kemas" className="form-control form-control-sm" placeholder="Nomor Peti Kemas" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nama_pemilik">Nama Pemilik</label>
                        <div className="col-sm-9">
                            <input type="text" id="nama_pemilik" className="form-control form-control-sm" placeholder="Nama Pemilik" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alamat_pemilik">Alamat Pemilik</label>
                        <div className="col-sm-9">
                            <textarea className="form-control form-control-sm" id="alamat_pemilik"></textarea>
                            {/* <!-- <input type="text" id="alamat_pemilik" className="form-control form-control-sm" placeholder="Alamat Pemilik" /> --> */}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nmr_ptk">Nomor dan Tanggal PTK</label>
                        <div className="col-sm-5">
                            <input type="text" id="nmr_ptk" className="form-control form-control-sm" placeholder="Nomor PTK" />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="tgl_ptk" className="form-control form-control-sm" placeholder="Tanggal PTK" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nmr_penahanan">Nomor dan Tanggal Penahanan</label>
                        <div className="col-sm-5">
                            <input type="text" id="nmr_penahanan" className="form-control form-control-sm" placeholder="Nomor Penahanan" />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="tgl_penahanan" className="form-control form-control-sm" placeholder="Tanggal Penahanan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="negara_asal">Negara/Area Asal</label>
                        <div className="col-sm-9">
                            <input type="text" id="negara_asal" className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alasan_penahanan">Alasan Penahanan</label>
                        <div className="col-sm-9">
                            <input type="text" id="alasan_penahanan" className="form-control form-control-sm" placeholder="Alasan Penahanan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="masa_penahanan">Masa Penahanan</label>
                        <div className="col-sm-4">
                            <input type="text" id="tgl_mulai_penahanan" className="form-control form-control-sm" placeholder="Tanggal Awal" />
                        </div>
                        <div className="col-sm-1">
                            <center>
                                s/d
                            </center>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="tgl_akhir_penahanan" className="form-control form-control-sm" placeholder="Tanggal Akhir" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tempat_penahanan">Tempat Penahanan</label>
                        <div className="col-sm-9">
                            <input type="text" id="tempat_penahanan" className="form-control form-control-sm" placeholder="Tempat Penahanan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alamat_penahanan">Alamat Penahanan</label>
                        <div className="col-sm-9">
                            <textarea className="form-control form-control-sm" id="alamat_penahanan"></textarea>
                            {/* <!-- <input type="text" id="alamat_penahanan" className="form-control form-control-sm" placeholder="Alamat Penahanan" /> --> */}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="kondisi_lingkungan">Kondisi Lingkungan</label>
                        <div className="col-sm-9">
                            <input type="text" id="kondisi_lingkungan" placeholder="Kondisi Lingkungan" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tindakan_pengamanan">Tindakan Pengamanan</label>
                        <div className="col-sm-9">
                            <input type="text" id="tindakan_pengamanan" placeholder="Tindakan Pengamanan" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="kondisi_mp">Kondisi Media Pembawa</label>
                        <div className="col-sm-9">
                            <input type="text" id="kondisi_mp" placeholder="Kondisi Media Pembawa" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-7 col-form-label" htmlFor="dok_syarat">Dokumen persyaratan dapat dipenuhi dalam waktu 3 (tiga) hari kerja* :</label>
                        <div className="col-sm-5">
                            <div className="form-check form-check-inline mt-3">
                                <input className="form-check-input" type="radio" name="dok_syarat" id="ya" value="Ya" />
                                <label className="form-check-label" htmlFor="ya">Ya</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="dok_syarat" id="tidak" value="Tidak" />
                                <label className="form-check-label" htmlFor="tidak">Tidak</label>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-3 fw-normal"><b>REKOMENDASI</b></h6>
                    <p>Terhadap Media pembawa :</p>
                    <div className="form-check mt-3">
                        <input name="default-radio-1" className="form-check-input" type="radio" value="" id="rekom1" />
                        <label className="form-check-label" htmlFor="rekom1">
                            dilakukan pembebasan (untuk Media Pembawa yang tidak dikenai tindakan karantina lebih lanjut)
                        </label>
                    </div>
                    <div className="form-check">
                        <input name="default-radio-1" className="form-check-input" type="radio" value="" id="rekom2" />
                        <label className="form-check-label" htmlFor="rekom2">
                            dilakukan pemeriksaan kesehatan.
                        </label>
                    </div>
                    <div className="form-check">
                        <input name="default-radio-1" className="form-check-input" type="radio" value="" id="rekom3" />
                        <label className="form-check-label" htmlFor="rekom3">
                            dilakukan uji keamanan dan/atau mutu pangan/pakan.
                        </label>
                    </div>
                    <div className="form-check">
                        <input name="default-radio-1" className="form-check-input" type="radio" value="" id="rekom4" />
                        <label className="form-check-label" htmlFor="rekom4">
                            dilakukan pengasingan dan pengamatan.
                        </label>
                    </div>
                    <div className="form-check">
                        <input name="default-radio-1" className="form-check-input" type="radio" value="" id="rekom5" />
                        <label className="form-check-label" htmlFor="rekom5">
                            dilakukan penolakan.
                        </label>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="penandatangan">Penandatangan Dokumen</label>
                        <div className="col-sm-4">
                            <input type="text" id="penandatangan" placeholder="Penandatangan" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <center>
                        <button type="button" className="btn btn-label-primary">Simpan</button>
                    </center>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default DocK64