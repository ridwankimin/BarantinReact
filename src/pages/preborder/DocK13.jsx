import React from 'react'

function DocK13() {
  return (
    <div className="container-fluid flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-1.3 <span className="text-muted fw-light">KEDATANGAN ALAT ANGKUT</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <form className="card-body">
                <div className="row my-4">
                    <div className="col">
                        <div className="accordion" id="collapseSection">
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerCountry">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCountry" aria-expanded="true" aria-controls="collapseCountry">
                                        I. Keterangan Identitas
                                    </button>
                                </h2>
                                <div id="collapseCountry">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-country-origin">Nama Alat Angkut</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" id="collapse-country-origin" className="form-control" placeholder="Nama Alat Angkut" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-country-export">Nomor Alat Angkut</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" id="collapse-country-export" className="form-control" placeholder="Nomor Alat Angkut" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-country-export">Identifikasi Khusus</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" id="collapse-country-export" className="form-control" placeholder="Identifikasi Khusus" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-country-origin">Nomor BL/AWB</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-country-origin" className="form-control" placeholder="Nomor BL/AWB" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-country-export">Tanggal</label>
                                                    <div className="col-sm-9">
                                                        <input type="date" id="collapse-country-export" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-md-end" htmlFor="collapse-name">Jenis Moda</label>
                                                    <div className="col-sm-3">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="moda1">Kapal laut</label>
                                                            <input name="default-radio-moda" className="form-check-input" type="radio" value="" id="moda1" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="moda2">Pesawat</label>
                                                            <input name="default-radio-moda" className="form-check-input" type="radio" value="" id="moda2" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="moda3">Kereta Api</label>
                                                            <input name="default-radio-moda" className="form-check-input" type="radio" value="" id="moda3" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="moda4">Truk/Mobil</label>
                                                            <input name="default-radio-moda" className="form-check-input" type="radio" value="" id="moda4" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="moda5">Lainnya...</label>
                                                            <input name="default-radio-moda" className="form-check-input" type="radio" value="" id="moda5" />
                                                            <input name="othersPurpose" type="text" placeholder="Other" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-country-origin">Nama Perusahan</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-country-origin" className="form-control" placeholder="Nama Perusahaan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Alamat</label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="4" placeholder="Alamat"></textarea>
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
                                        II. Asal dan Tujuan
                                    </button>
                                </h2>
                                <div id="collapseExporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="collapse-name">Negara/Daerah Asal</label>
                                                    <div className="col-sm-2">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Negara/Daerah Asal" />
                                                    </div>
                                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="collapse-company">Negara/Daerah Transit</label>
                                                    <div className="col-sm-2">
                                                        <input type="text" id="collapse-compay" className="form-control" placeholder="Negara/Daerah Transit" />
                                                    </div>
                                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="collapse-company">Negara/Daerah Tujuan</label>
                                                    <div className="col-sm-2">
                                                        <input type="text" id="collapse-compay" className="form-control" placeholder="Negara/Daerah Tujuan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="collapse-name">Pelabuhan Asal</label>
                                                    <div className="col-sm-2">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Pelabuhan Asal" />
                                                    </div>
                                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="collapse-company">Pelabuhan Transit</label>
                                                    <div className="col-sm-2">
                                                        <input type="text" id="collapse-compay" className="form-control" placeholder="Pelabuhan Transit" />
                                                    </div>
                                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="collapse-company">Pelabuhan Tujuan</label>
                                                    <div className="col-sm-2">
                                                        <input type="text" id="collapse-compay" className="form-control" placeholder="Pelabuhan Tujuan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="collapse-name">Waktu Keberangkatan</label>
                                                    <div className="col-sm-2">
                                                        <input type="date" id="collapse-name" className="form-control" />
                                                    </div>
                                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="collapse-company">Lama Transit</label>
                                                    <div className="col-sm-2">
                                                        <input type="text" id="collapse-compay" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="collapse-name">Estimasi Waktu Kedatangan</label>
                                                    <div className="col-sm-2">
                                                        <input type="date" id="collapse-name" className="form-control" />
                                                        <input type="time" id="collapse-compay" className="form-control" />
                                                    </div>
                                                    <label className="col-sm-2 col-form-label text-sm-end" htmlFor="collapse-company">Aktual Waktu Kedatangan</label>
                                                    <div className="col-sm-2">
                                                        <input type="date" id="collapse-name" className="form-control" />
                                                        <input type="time" id="collapse-compay" className="form-control" />
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
                                        III. Keterangan Muatan
                                    </button>
                                </h2>
                                <div id="collapseImporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Komoditas Wajib Periksa Karantina (Media Pembawa)</label>
                                                    <div className="col-sm-9">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="komoditas1">Ada</label>
                                                            <input name="default-radio-komoditas" className="form-check-input" type="radio" value="" id="komoditas1" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="komoditas2">Tidak Ada</label>
                                                            <input name="default-radio-komoditas" className="form-check-input" type="radio" value="" id="komoditas2" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="komoditas3">Tidak Tahu</label>
                                                            <input name="default-radio-komoditas" className="form-check-input" type="radio" value="" id="komoditas3" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Jenis Muatan</label>
                                                    <div className="col-sm-9">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="jnsmuat1">Cargo</label>
                                                            <input name="default-radio-jnsmuat" className="form-check-input" type="radio" value="" id="jnsmuat1" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="jnsmuat2">Curah</label>
                                                            <input name="default-radio-jnsmuat" className="form-check-input" type="radio" value="" id="jnsmuat2" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="jnsmuat3">Consolidate</label>
                                                            <input name="default-radio-jnsmuat" className="form-check-input" type="radio" value="" id="jnsmuat3" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="jnsmuat4">Kontainer</label>
                                                            <input name="default-radio-jnsmuat" className="form-check-input" type="radio" value="" id="jnsmuat4" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="jnsmuat5">Non Consolidate</label>
                                                            <input name="default-radio-jnsmuat" className="form-check-input" type="radio" value="" id="jnsmuat5" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="jnsmuat6">Lainnya...</label>
                                                            <input name="default-radio-jnsmuat" className="form-check-input" type="radio" value="" id="jnsmuat6" />
                                                            <input type="text" name="jnsmuat-lainnya" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Nama Komoditas</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Nama Komoditas" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-company">Kode HS</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-compay" className="form-control" placeholder="Kode HS" />
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
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-company">Satuan</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-compay" className="form-control" placeholder="Satuan" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerGoods">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseGoods" aria-expanded="true" aria-controls="collapseGoods">
                                        IV. Keterangan Tambahan
                                    </button>
                                </h2>
                                <div id="collapseGoods">
                                    <div className="accordion-body">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="4" placeholder="Keterangan Tambahan"></textarea>
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

export default DocK13