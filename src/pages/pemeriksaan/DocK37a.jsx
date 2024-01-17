import React from 'react'

function DocK37a() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-3.7a <span className="text-muted fw-light">LAPORAN HASIL PEMERIKSAAN FISIK DAN KESEHATAN</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <form className="card-body">
                <div className="card">
                    <div className="col-md-12 mt-3">
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-center" htmlFor="nomor_k12">Nomor</label>
                            <div className="col-sm-3">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label text-sm-center" htmlFor="nomor_k12">Tanggal</label>
                            <div className="col-sm-3">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor" disabled />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-center" htmlFor="nomor_k12">Nomor LHP</label>
                            <div className="col-sm-3">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor LHP" disabled />
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
                                        Pemeriksaan Fisik/Kesehatan, Pemeriksaan HPHK/HPIK/OPTK
                                    </button>
                                </h2>
                                <div id="collapseExporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Media Pembawa</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nama Media Pembawa" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jenis Media Pembawa</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Jenis Media Pembawa" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Target/Sasaran</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Target/Sasaran" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Metode</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Metode" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Temuan</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Temuan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Catatan</label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Kesimpulan</label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
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
                                        Pemeriksaan untuk Pengawasan dan Pengendalian
                                    </button>
                                </h2>
                                <div id="collapseExporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Dokumen</label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Pemenuhan</label>
                                                    <div className="col-sm-4">
                                                        <select className="form-select">
                                                            <option>Terpenuhi</option>
                                                            <option>Tidak Terpenuhi</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Pengujian Produk</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Pengujian Produk" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Hasil</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Hasil" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Metode</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Metode" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Kesimpulan</label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
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
                                        Rekomendasi
                                    </button>
                                </h2>
                                <div id="collapseImporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Status</label>
                                                    <div className="col-sm-9">
                                                        <select className="form-select">
                                                            <option>Diberi Perlakuan</option>
                                                            <option>Ditolak</option>
                                                            <option>Dimusnahkan</option>
                                                            <option>Dibebaskan</option>
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
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default DocK37a