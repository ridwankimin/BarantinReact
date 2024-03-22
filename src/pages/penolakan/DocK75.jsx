import React from 'react'

function DocK75() {
  return (
    <div className="container-fluid flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-7.4 <span className="text-muted fw-light">(SURAT PERMOHONAN PERPANJANGAN BATAS WAKTU)</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <div className="card mb-4">
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k74">Nomor K-7.4</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k74" className="form-control form-control-sm" placeholder="Nomor K-7.4" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k74">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k74" className="form-control form-control-sm" placeholder="Tanggal K-7.4" disabled />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="upt_kar">UPT Karantina</label>
                        <div className="col-sm-9">
                            <input type="text" id="upt_kar" className="form-control form-control-sm" placeholder="UPT Karantina" />
                        </div>
                    </div>
                    <h6 className="mb-b fw-normal">PEMILIK</h6>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nama_pemilik">Nama</label>
                        <div className="col-sm-9">
                            <input type="text" id="nama_pemilik" className="form-control form-control-sm" placeholder="Nama Pemilik" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alamat_pemilik">Alamat</label>
                        <div className="col-sm-9">
                            <input type="text" id="alamat_pemilik" className="form-control form-control-sm" placeholder="Alamat Pemilik" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nomor_tlp">No. Telepon</label>
                        <div className="col-sm-9">
                            <input type="text" id="nomor_tlp" className="form-control form-control-sm" placeholder="No. Telepon" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="email_pemilik">Email</label>
                        <div className="col-sm-9">
                            <input type="text" id="email_pemilik" className="form-control form-control-sm" placeholder="Email" />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h5 className="mb-3 fw-normal">INFO PERMOHONAN PERPANJANGAN</h5>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tanggal_mohon">Tanggal pemasukan/pengeluaran**)</label>
                        <div className="col-sm-9">
                            <input type="text" id="tanggal_mohon" className="form-control form-control-sm" placeholder="Tanggal pemasukan/pengeluaran" />
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

export default DocK75