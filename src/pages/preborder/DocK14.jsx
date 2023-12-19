import React from 'react'

function DocK14() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-1.4 <span className="text-muted fw-light">MUTASI MUATAN ALAT ANGKUT</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <form className="card-body">
                <div className="card">
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
                                <h2 className="accordion-header" id="headerCountry">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCountry" aria-expanded="true" aria-controls="collapseCountry">
                                        Identitas
                                    </button>
                                </h2>
                                <div id="collapseCountry">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label text-sm-start" htmlFor="collapse-country-origin">UPT Tempat Pemasukan/Transit</label>
                                                    <div className="col-sm-5">
                                                        <input type="text" id="collapse-country-origin" className="form-control" placeholder="UPT" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label text-sm-start" htmlFor="collapse-country-origin">Nama Nahkoda/Pilot/Sopir/Masinis</label>
                                                    <div className="col-sm-5">
                                                        <input type="text" id="collapse-country-origin" className="form-control" placeholder="Nama Nahkoda/Pilot/Sopir/Masinis" />
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
                                        Media Pembawa
                                    </button>
                                </h2>
                                <div id="collapseExporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jenis Media Pembawa</label>
                                                    <div className="col-sm-9">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="jenismedia1">Hewan/Ikan/Tumbuhan</label>
                                                            <input name="default-radio-jenismedia" className="form-check-input" type="radio" value="" id="jenismedia1" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="jenismedia2">Produk Hewan/Ikan/Tumbuhan</label>
                                                            <input name="default-radio-jenismedia" className="form-check-input" type="radio" value="" id="jenismedia2" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="jenismedia3">Media Pembawa Lain Hewan/Ikan/Tumbuhan</label>
                                                            <input name="default-radio-jenismedia" className="form-check-input" type="radio" value="" id="jenismedia3" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <button type="button" className="btn btn-xs btn-primary">Add Media Pembawa</button>
                                            </div>
                                            <table className="table table-bordered table-hover table-striped dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>NO</th>
                                                        <th>Media Pembawa</th>
                                                        <th>Jumlah</th>
                                                        <th>Satuan</th>
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
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tempat Pengeluaran</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Tempat Pengeluaran" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Tempat Pemasukan</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Tempat Pemasukan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tempat Transit</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Tempat Transit" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Mutasi Selama Perjalanan</label>
                                                    <div className="col-sm-9">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="mutasi1">Tidak Ada</label>
                                                            <input name="default-radio-mutasi" className="form-check-input" type="radio" value="" id="mutasi1" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="mutasi2">Ada</label>
                                                            <input name="default-radio-mutasi" className="form-check-input" type="radio" value="" id="mutasi2" />
                                                        </div>
                                                    </div>
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jumlah</label>
                                                    <div className="col-sm-2">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Jumlah" />
                                                    </div>
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Penyebab/Alasan</label>
                                                    <div className="col-sm-4">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
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

export default DocK14