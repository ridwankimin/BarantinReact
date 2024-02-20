import React, { useState } from 'react'

function DocK91() {

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-9.1 <span className="text-muted fw-light">(SURAT KETERANGAN MEDIA PEMBAWA LAIN)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k91">Nomor K-9.1</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k91" className="form-control form-control-sm" placeholder="Nomor K-9.1" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k91">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k91" className="form-control form-control-sm" placeholder="Tanggal K-9.1" disabled />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal"><b>KETERANGAN MEDIA PEMBAWA</b></h6>
                    <label className="col-form-label" htmlFor="jenis_mp">Jenis dan Jumlah</label>
                    <button className="btn btn-xs btn-success">Tambah Media Pembawa</button>
                    {/* <!-- <div className="row mb-3">
                        <div className="col-sm-9">
                        </div>
                    </div> --> */}
                    <table className="table table-bordered table-hover table-striped dataTable">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>Jenis</th>
                                <th>Nama Latin</th>
                                <th>Nama Umum</th>
                                <th>Jumlah</th>
                                <th>Satuan</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <br/>
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
                        <label className="col-sm-3 col-form-label" htmlFor="identitas_angkut">Identitas Alat Angkut</label>
                        <div className="col-sm-9">
                            <input type="text" id="identitas_angkut" className="form-control form-control-sm" placeholder="Identitas Alat Angkut" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tanggal_kirim">Tanggal Pengiriman/Pemasukan**)</label>
                        <div className="col-sm-9">
                            <input type="text" id="tanggal_kirim" className="form-control form-control-sm" placeholder="Tanggal Pengiriman/Pemasukan**)" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tanggal_periksa">Tanggal Pemeriksaan</label>
                        <div className="col-sm-9">
                            <input type="text" id="tanggal_periksa" className="form-control form-control-sm" placeholder="Tanggal Pemeriksaan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="negara_asal">Negara/Area Asal**)</label>
                        <div className="col-sm-9">
                            <input type="text" id="negara_asal" className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="negara_tujuan">Negara/Area Tujuan**)</label>
                        <div className="col-sm-9">
                            <input type="text" id="negara_tujuan" className="form-control form-control-sm" placeholder="Negara/Area Tujuan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="bill_load"><i>Bill of Loading</i></label>
                        <div className="col-sm-9">
                            <input type="text" id="bill_load" className="form-control form-control-sm" placeholder="Bill of Loading" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="jml_kemasan">Jumlah Kemasan/Kontainer**)</label>
                        <div className="col-sm-9">
                            <input type="text" id="jml_kemasan" className="form-control form-control-sm" placeholder="Jumlah Kemasan/Kontainer**)" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nomor_kemasan">Nomor/Keterangan Kemasan/Kontainer**)</label>
                        <div className="col-sm-9">
                            <input type="text" id="nomor_kemasan" className="form-control form-control-sm" placeholder="Nomor/Keterangan Kemasan/Kontainer**)" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="dok_lain">Dokumen Lain</label>
                        <div className="col-sm-9">
                            <input type="text" id="dok_lain" className="form-control form-control-sm" placeholder="Dokumen Lain" />
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

export default DocK91