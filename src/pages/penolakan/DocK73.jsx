import React from 'react'

function DocK73() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-7.3 <span className="text-muted fw-light">(Laporan Hasil Penolakan)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k73">Nomor K-7.3</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k73" className="form-control form-control-sm" placeholder="Nomor K-7.3" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k73">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k73" className="form-control form-control-sm" placeholder="Tanggal K-7.3" disabled />
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
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k72">Nomor K-7.2</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k72" className="form-control form-control-sm" placeholder="Nomor Berita Acara" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k72">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k72" className="form-control form-control-sm" placeholder="Tanggal Berita Acara" disabled />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="upt_kar">UPT Karantina</label>
                        <div className="col-sm-9">
                            <input type="text" id="upt_kar" className="form-control form-control-sm" placeholder="UPT Karantina" />
                        </div>
                    </div>
                    {/* <!-- <h6 className="mb-b fw-normal"><b>KETERANGAN MEDIA PEMBAWA</b></h6> --> */}
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
                        <label className="col-sm-3 col-form-label" htmlFor="nm_ilmiah">Nama Ilmiah</label>
                        <div className="col-sm-9">
                            <input type="text" id="nm_ilmiah" className="form-control form-control-sm" placeholder="Nama Ilmiah" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="kode_hs">Kode HS</label>
                        <div className="col-sm-9">
                            <input type="text" id="kode_hs" className="form-control form-control-sm" placeholder="Kode HS" />
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
                            <input type="text" id="alamat_pemilik" className="form-control form-control-sm" placeholder="Alamat Pemilik" />
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
                        <label className="col-sm-3 col-form-label" htmlFor="negara_tujuan">Negara/Area Tujuan**)</label>
                        <div className="col-sm-9">
                            <input type="text" id="negara_tujuan" className="form-control form-control-sm" placeholder="Negara/Area Tujuan**)" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="jenis_angkut">Jenis dan Nama Alat Angkut</label>
                        <div className="col-sm-4">
                            <input type="text" id="jenis_angkut" className="form-control form-control-sm" placeholder="Jenis Alat Angkut" />
                        </div>
                        <div className="col-sm-5">
                            <input type="text" id="nama_angkut" className="form-control form-control-sm" placeholder="Nama Alat Angkut" />
                        </div>
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

export default DocK73