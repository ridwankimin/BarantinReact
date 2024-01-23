import React from 'react'
import { useNavigate } from 'react-router-dom';

function DocK37() {
    let navigate = useNavigate();
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-3.7 <span className="fw-light" style={{color: 'blue'}}>LAPORAN HASIL PEMERIKSAAN ADMINISTRATIF</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <form className="card-body">
                <div className="card">
                    <div className="col-md-12 mt-3">
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Nomor</label>
                            <div className="col-sm-3">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Nomor" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="nomor_k12">Tanggal</label>
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
                                        Pemeriksaan Administratif
                                    </button>
                                </h2>
                                <div id="collapseExporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-sm-12">
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk1">Dokumen yang dipersyaratkan tidak lengkap dan/atau diragukan keabsahan dan kebenaran isinya</label>
                                                    <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk1" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk2">Media pembawa merupakan jenis yang dilarang pemasukan/pengeluarannya ke/dari wilayah Negara Republik Indonesia/area tujuan/asal</label>
                                                    <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk2" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk3">Media pembawa memerlukan tindakan pengasingan dan pengamatan</label>
                                                    <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk3" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk4">Media pembawa tergolong pangan/pakan/SDG/PRG/agensia hayati/JAI/tumbuhan dan satwa liar/tumbuhan dan satwa langka</label>
                                                    <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk4" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk5">Bukan termasuk media pembawa/tidak dikenai tindakan karantina pengawasan</label>
                                                    <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk5" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="checktk6">Semua persyaratan yang diperlukan bagi pemasukan/pengeluaran media pembawa tersebut telah lengkap dan tidak diragukan keabsahan dan kebenaran isinya</label>
                                                    <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk6" />
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
                                                    <div className="col-sm-9">
                                                        <select className="form-select">
                                                            <option>Dilakukan penahanan dan/atau melengkapi dokumen</option>
                                                            <option>Dilakukan pengasingan dan pengamatan</option>
                                                            <option>Ditolak</option>
                                                            <option>Dilanjutkan pemeriksaan kesehatan</option>
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
                    <div className="col-sm-12">
                        <button type="button" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                        <button type="button" className="btn btn-danger me-sm-2 me-1">Batal</button>
                        <a href={require("../../dok/k37.pdf")} rel="noopener noreferrer" target='_blank' className="btn btn-warning"><i className="bx bx-printer bx-xs"></i>&nbsp; Print</a>
                        <button type="button" onClick={() => navigate('/k37a')} className="btn btn-info float-end"><i className="menu-icon tf-icons bx bx-send"></i>Pemeriksaan Fisik/Kesehatan</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default DocK37