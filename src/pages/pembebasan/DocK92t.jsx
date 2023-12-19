import React from 'react'

function DocK92t() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-9.2.T <span className="text-muted fw-light">(Sertifikat Pelepasan Karantina Tumbuhan/Pengawasan)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k92t">Nomor K-9.2.T</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k92t" className="form-control form-control-sm" placeholder="Nomor K-9.2.T" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k92t">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k92t" className="form-control form-control-sm" placeholder="Tanggal K-9.2.T" disabled />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
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
                        <label className="col-sm-3 col-form-label" htmlFor="bahan_kemasan">Bahan pembungkus/kemasan</label>
                        <div className="col-sm-5">
                            <input type="text" id="bahan_kemasan" className="form-control form-control-sm" placeholder="Bahan pembungkus/kemasan" />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="tanda_khusus" className="form-control form-control-sm" placeholder="Tanda khusus pembungkus/kemasan" />
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
                        <label className="col-sm-3 col-form-label" htmlFor="nama_pengirim">Nama Pengirim</label>
                        <div className="col-sm-9">
                            <input type="text" id="nama_pengirim" className="form-control form-control-sm" placeholder="Nama Pengirim" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alamat_pengirim">Alamat Pengirim</label>
                        <div className="col-sm-9">
                            <input type="text" id="alamat_pengirim" className="form-control form-control-sm" placeholder="Alamat Pengirim" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nama_penerima">Nama Penerima</label>
                        <div className="col-sm-9">
                            <input type="text" id="nama_penerima" className="form-control form-control-sm" placeholder="Nama Penerima" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alamat_penerima">Alamat Penerima</label>
                        <div className="col-sm-9">
                            <input type="text" id="alamat_penerima" className="form-control form-control-sm" placeholder="Alamat Penerima" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tujuan_pemasukan">Tujuan Pemasukan</label>
                        <div className="col-sm-9">
                            <input type="text" id="tujuan_pemasukan" className="form-control form-control-sm" placeholder="Tujuan Pemasukan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="negara_asal">Negara/Area Asal*)</label>
                        <div className="col-sm-9">
                            <input type="text" id="negara_asal" className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tempat_pengeluaran">Tempat Pengeluaran</label>
                        <div className="col-sm-9">
                            <input type="text" id="tempat_pengeluaran" className="form-control form-control-sm" placeholder="Tempat Pengeluaran" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tempat_produksi">Tempat Produksi Media Pembawa</label>
                        <div className="col-sm-9">
                            <input type="text" id="tempat_produksi" className="form-control form-control-sm" placeholder="Tempat Produksi Media Pembawa" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="identitas_angkut">Jenis dan Identitas Alat Angkut</label>
                        <div className="col-sm-4">
                            <input type="text" id="jenis_angkut" className="form-control form-control-sm" placeholder="Jenis Alat Angkut" />
                        </div>
                        <div className="col-sm-5">
                            <input type="text" id="identitas_angkut" className="form-control form-control-sm" placeholder="Identitas Alat Angkut" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tanggal_tiba">Tanggal Tiba</label>
                        <div className="col-sm-9">
                            <input type="text" id="tanggal_tiba" className="form-control form-control-sm" placeholder="Tanggal Tiba" />
                        </div>
                    </div>
                    <label className="col-form-label">Nomor dan tanggal dokumen persyaratan</label>
                    <div className="row mb-3">
                        <label className="offset-sm-1 col-sm-3 col-form-label" htmlFor="nomor_pc">Phytosanitary Certificate</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_pc" className="form-control form-control-sm" placeholder="Nomor" />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_pc" className="form-control form-control-sm" placeholder="Tanggal" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="offset-sm-1 col-sm-3 col-form-label" htmlFor="nomor_pc">Sertifikat Kesehatan Tumbuhan Antar Area</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_domestik" className="form-control form-control-sm" placeholder="Nomor" />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_domestik" className="form-control form-control-sm" placeholder="Tanggal" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="offset-sm-1 col-sm-3 col-form-label" htmlFor="nomor_pc">Surat Keterangan Hasil Pengawasan</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_pengawasan" className="form-control form-control-sm" placeholder="Nomor" />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_pengawasan" className="form-control form-control-sm" placeholder="Tanggal" />
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

export default DocK92t