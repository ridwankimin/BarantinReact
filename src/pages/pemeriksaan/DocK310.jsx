import React from 'react'

function DocK310() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-3.10 <span className="text-muted fw-light">SURAT PERINTAH PEMINDAHAN MEDIA PEMBAWA (SP2MP)</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <form className="card-body">
                <div className="card">
                    <div className="col-md-12 mt-3">
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-center" htmlFor="nomor_k12">Nomor SP2MP</label>
                            <div className="col-sm-3">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label text-sm-center" htmlFor="nomor_k12">UPT</label>
                            <div className="col-sm-3">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="UPT" disabled />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        <div className="accordion" id="collapseSection">
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerCountry">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCountry" aria-expanded="true" aria-controls="collapseCountry">
                                        Identitas
                                    </button>
                                </h2>
                                <div id="collapseCountry">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nama" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nomor PPK</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nomor PPK" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tanggal PPK</label>
                                                    <div className="col-sm-9">
                                                        <input type="date" id="collapse-name" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerExporter">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExporter" aria-expanded="true" aria-controls="collapseExporter">
                                        Detail
                                    </button>
                                </h2>
                                <div id="collapseExporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tempat Penimbunan</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Tempat Penimbunan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jumlah Petikemas/kontainer/kemasan</label>
                                                    <div className="col-sm-3">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Jumlah Petikemas/kontainer/kemasan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <button type="button" className="btn btn-xs btn-primary">Add Kontainer</button>
                                            </div>
                                            <table className="table table-bordered table-hover table-striped dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>NO</th>
                                                        <th>Nomor Kontainer</th>
                                                        <th>Kode Kontainer</th>
                                                        <th>Nomor Segel</th>
                                                        <th>Keterangan</th>
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
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Alat Angkut/Voyage</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nama Alat Angkut" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                        
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nomor AWB/BL</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nama Alat Angkut" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                        
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Agen Pelayaran/Maskapai</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nama Alat Angkut" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                        
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tanggal Tiba</label>
                                                    <div className="col-sm-6">
                                                        <input type="date" id="collapse-name" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                        
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Lokasi Bongkar</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Lokasi Bongkar" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                        
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Pemilik</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Pemilik" />
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
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default DocK310