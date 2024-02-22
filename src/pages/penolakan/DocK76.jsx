import React from 'react'

function DocK76() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-7.5 <span className="text-muted fw-light">(SURAT PERPANJANGAN BATAS WAKTU)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">PEMILIK</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k75">Nomor K-7.5</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k75" className="form-control form-control-sm" placeholder="Nomor K-7.5" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k75">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k75" className="form-control form-control-sm" placeholder="Tanggal K-7.5" disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="tujuan_surat">Tujuan Surat</label>
                        <div className="col-sm-10">
                            <input type="text" id="tujuan_surat" className="form-control form-control-sm" placeholder="Tujuan Surat" disabled />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal">INFO PERMOHONAN PERPANJANGAN BATAS WAKTU</h6>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k71">Nomor K-7.1</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k71" className="form-control form-control-sm" placeholder="Nomor Surat Penolakan" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k71">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k71" className="form-control form-control-sm" placeholder="Tanggal Surat Penolakan" disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k74">Nomor K-7.4</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k74" className="form-control form-control-sm" placeholder="Nomor Surat Permohonan Perpanjangan Batas Waktu" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k74">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k74" className="form-control form-control-sm" placeholder="Tanggal Surat Permohonan Perpanjangan Batas Waktu" disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_mohon">Tanggal Pengeluaran MP</label>
                        <div className="col-sm-10">
                            <input type="text" id="tanggal_mohon" className="form-control form-control-sm" placeholder="Tanggal pemasukan/pengeluaran" disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="jenis_angkut">Jenis dan Nama Alat Angkut</label>
                        <div className="col-sm-4">
                            <input type="text" id="jenis_angkut" className="form-control form-control-sm" placeholder="Jenis Alat Angkut" disabled />
                        </div>
                        <div className="col-sm-6">
                            <input type="text" id="nama_angkut" className="form-control form-control-sm" placeholder="Nama Alat Angkut" disabled />
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
                        <button type="button" className="btn btn-label-success">Setujui</button>
                        <button type="button" className="btn btn-label-danger">Tolak</button>
                    </center>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default DocK76