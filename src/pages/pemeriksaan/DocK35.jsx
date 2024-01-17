import React from 'react'

function DocK35() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-3.5 <span className="text-muted fw-light">LAPORAN HASIL PENGAWALAN MEDIA PEMBAWA</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <form className="card-body">
                <div className="card">
                    <div className="col-md-12 mt-3">
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Nomor Surat Perintah Pengawalan Media Pembawa</label>
                            <div className="col-sm-4">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Tanggal</label>
                            <div className="col-sm-3">
                                <input type="date" id="nomor_k12" className="form-control form-control-sm" disabled />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Nomor PPK</label>
                            <div className="col-sm-4">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Tanggal PPK</label>
                            <div className="col-sm-3">
                                <input type="date" id="nomor_k12" className="form-control form-control-sm" disabled />
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
                                        Telah dilakukan pengawalan dalam rangka pengasingan dengan hasil sebagai berikut
                                    </button>
                                </h2>
                                <div id="collapseImporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Instalasi Karantina/Tempat Lain</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nama Instalasi Karantina/Tempat Lain" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Pemilik Instalasi Karantina/Tempat Lain</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Pemilik Instalasi Karantina/Tempat Lain" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Alamat</label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nomor Segel Karantina</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nomor Segel Karantina" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jenis dan Jumlah</label>
                                                    <div className="col-sm-9">
                                                        <select className="form-select">
                                                            <option>Sesuai</option>
                                                            <option>Sesuai</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jumlah Kematian (apabila ada)</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Jumlah Kematian (apabila ada)" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Kondisi Media Pembawa</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Kondisi Media Pembawa" />
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
                                    </div>
                                </div>
                            </div>
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerImporter">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                        Kesimpulan : Media Pembawa telah selesai dikawal dan diserahterimakan, 
                                    </button>
                                </h2>
                                <div id="collapseImporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">ditindaklanjuti dengan </label>
                                                    <div className="col-sm-9">
                                                        <select className="form-select">
                                                            <option>Pengambilan Contoh Uji (sampel)</option>
                                                            <option>Pengamatan</option>
                                                            <option>Penahanan</option>
                                                            <option>Perlakuan</option>
                                                            <option>Pemusnahan</option>
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

export default DocK35