import React from 'react'

function DocK33() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-3.3 <span className="text-muted fw-light">BERITA ACARA PENGAMBILAN CONTOH</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <form className="card-body">
                <div className="card">
                    <div className="col-md-12 mt-3">
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Nomor Berita Acara</label>
                            <div className="col-sm-3">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Hari/Tanggal</label>
                            <div className="col-sm-2">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Hari" disabled />
                            </div>
                            <div className="col-sm-2">
                                <input type="date" id="nomor_k12" className="form-control form-control-sm" disabled />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Nomor Surat Tugas</label>
                            <div className="col-sm-2">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor Surat Tugas" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Tanggal Surat Tugas</label>
                            <div className="col-sm-2">
                                <input type="date" id="nomor_k12" className="form-control form-control-sm" disabled />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Nomor Pemeriksaan Administratif dan Kesesuaian Dokumen</label>
                            <div className="col-sm-2">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor Pemeriksaan" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Tanggal</label>
                            <div className="col-sm-2">
                                <input type="date" id="nomor_k12" className="form-control form-control-sm" disabled />
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
                                        I. Keterangan Media Pembawa
                                    </button>
                                </h2>
                                <div id="collapseCountry">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jenis Media Pembawa</label>
                                                    <div className="col-sm-9">
                                                        <select className="form-select">
                                                            <option>Hewan</option>
                                                            <option>Ikan</option>
                                                            <option>Tumbuhan</option>
                                                            <option>Produk Hewan</option>
                                                            <option>Produk Ikan</option>
                                                            <option>Produk Tumbuhan</option>
                                                            <option>Media Pembawa Lain</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Umum/Dagang</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nama Umum/Dagang" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Ilmiah</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nama Ilmiah" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Kode HS</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Kode HS" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Bentuk</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Bentuk" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jumlah</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Jumlah" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Pemilik</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nama Pemilik" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Alamat Pemilik</label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="5" placeholder=""></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Lokasi Media Pembawa</label>
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
                                        Pelaksanaan Pengambilan Contoh
                                    </button>
                                </h2>
                                <div id="collapseExporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Petugas Pengambil Contoh</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nama Petugas" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nomor Registrasi</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nomor Registrasi" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tanggal Pengambil Contoh</label>
                                                    <div className="col-sm-9">
                                                        <input type="date" id="collapse-name" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Jumlah Contoh</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Jumlah Contoh" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Identitas Contoh</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Identitas Contoh" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <button type="button" className="btn btn-xs btn-primary">Add Contoh</button>
                                            </div>
                                            <table className="table table-bordered table-hover table-striped dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>Nama/Kode Contoh</th>
                                                        <th>Kondisi/Suhu Contoh</th>
                                                        <th>Nomor Kontainer/Palka</th>
                                                        <th>Keterangan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>1</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                    </tr>
                                                    <tr>
                                                        <th>2</th>
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
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Tujuan Pengambilan Contoh</label>
                                                    <div className="col-sm-9">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktujuan1">Pemeriksaan Visual</label>
                                                            <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan1" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktujuan2">Pemeriksaan Kesehatan</label>
                                                            <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan2" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktujuan3">Uji Keamanan/mutu pangan</label>
                                                            <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan3" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktujuan4">Residu Pestisida</label>
                                                            <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan4" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktujuan5">Logam Berat</label>
                                                            <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan5" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktujuan6">Mikotoksin</label>
                                                            <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan6" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktujuan9">Cemaran Mikrobiologi</label>
                                                            <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan9" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktujuan10">Cemaran Radioaktif</label>
                                                            <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan10" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktujuan12">Lainnya</label>
                                                            <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan12" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktujuan7">Uji Keamanan/mutu pakan</label>
                                                        <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan7" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktujuan8">Uji PRG,SDG, IAS</label>
                                                        <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan8" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" htmlFor="checktujuan11">Pengujian Lainnya</label>
                                                        <input name="default-radio-checktujuan" className="form-check-input" type="radio" value="" id="checktujuan11" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Catatan Pengambilan Contoh</label>
                                                    <div className="col-sm-9">
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

export default DocK33