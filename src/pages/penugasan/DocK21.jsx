import React from 'react'

function DocK21() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-2.1 <span className="text-muted fw-light">HASIL ANALISA PERMOHONAN/SERAH TERIMA MEDIA PEMBAWA/NHI</span>
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
                                <input type="date" id="nomor_k12" className="form-control form-control-sm" placeholder="Tanggal" disabled />
                            </div>
                        </div>
                        <div className="row mb-3">
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
                                        Hasil Analisa Permohonan
                                    </button>
                                </h2>
                                <div id="collapseCountry">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-start" htmlFor="collapse-country-origin">A. Media Pembawa HPHK</label>
                                                    <div className="col-sm-9">
                                                        <select className="col-sm-4 form-select">
                                                            <option>Dilarang Pemasukan/Pengeluarannya</option>
                                                            <option>Belum Diolah</option>
                                                            <option>Sudah Diolah</option>
                                                            <option>Termasuk Pangan/Pakan/Produk Rekayasa Genetik/Sumber Daya Genetik/Agensia Hayati/Jenis Asing Invasif/Satwa Liar dan Satwa Langka</option>
                                                            <option>Lainnya</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-start" htmlFor="collapse-country-origin">B. Media Pembawa HPIK</label>
                                                    <div className="col-sm-9">
                                                        <select className="col-sm-4 form-select">
                                                            <option>Dilarang Pemasukan/Pengeluarannya</option>
                                                            <option>Belum Diolah</option>
                                                            <option>Sudah Diolah</option>
                                                            <option>Termasuk Pangan/Pakan/Produk Rekayasa Genetik/Sumber Daya Genetik/Agensia Hayati/Jenis Asing Invasif/Jenis Ikan Dilindungi</option>
                                                            <option>Lainnya</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-start" htmlFor="collapse-country-origin">C. Media Pembawa OPTK</label>
                                                    <div className="col-sm-9">
                                                        <select className="col-sm-4 form-select">
                                                            <option>Dilarang Pemasukan/Pengeluarannya</option>
                                                            <option>Belum Diolah</option>
                                                            <option>Dimasukkan/dikeluarkan untuk ditanam</option>
                                                            <option>Dimasukkan/dikeluarkan selain untuk ditanam, antara lain untuk konsumsi atau pengolahan lebih lanjut</option>
                                                            <option>Sudah diolah sampai tingkat yang tidak dapat lagi terinfestasi OPTK/OPT</option>
                                                            <option>Sudah diolah sampai tingkat yang masih dapat terinfestasi OPTK/OPT</option>
                                                            <option>Termasuk Pangan/Pakan/Produk Rekayasa Genetik/Sumber Daya Genetik/Agensia Hayati/Jenis Asing Invasif/Tumbuhan Liar dan Tumbuhan Langka</option>
                                                            <option>Lainnya</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-start" htmlFor="collapse-country-origin">D. Laporan Intelijen dan Serah Terima Media Pembawa</label>
                                                    <div className="col-sm-9">
                                                        <select className="col-sm-4 form-select">
                                                            <option>Media Pembawa tidak dilaporkan ke Pejabat Karantina</option>
                                                            <option>Media Pembawa tidak diserahkan ke Pejabat Karantina</option>
                                                            <option>Media Pembawa tidak dilalulintaskan melalui Tempat Pemasukan/Pengeluaran yang ditetapkan</option>
                                                            <option>Tidak Ditemukan Pemilik</option>
                                                            <option>Profilling Pemilik</option>
                                                            <option>Hasil penyerahan Media Pembawa dari Instansi/Aparat Penegak Hukum Lain/Masyarakat</option>
                                                            <option>Lainnya</option>
                                                        </select>
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
                                        Rekomendasi
                                    </button>
                                </h2>
                                <div id="collapseExporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-start" htmlFor="collapse-country-origin">Rekomendasi</label>
                                                    <div className="col-sm-9">
                                                        <select className="col-sm-4 form-select">
                                                            <option>Media Pembawa dikenai tindakan karantina</option>
                                                            <option>Media Pembawa dikenai pengawasan</option>
                                                            <option>Media Pembawa dikenai tindakan karantina dan pengawasan</option>
                                                            <option>Media Pembawa tidak dikenai tindakan karantina dan pengawasan</option>
                                                            <option>Wasmalitrik</option>
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

export default DocK21