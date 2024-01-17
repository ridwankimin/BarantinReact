import React from 'react'

function DocK22() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-2.2 <span className="text-muted fw-light">SURAT TUGAS</span>
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
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-center" htmlFor="nomor_k12">Perihal</label>
                            <div className="col-sm-3">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Perihal" disabled />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        <div className="accordion" id="collapseSection">
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerPetugas">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePetugas" aria-expanded="true" aria-controls="collapsePetugas">
                                        Petugas
                                    </button>
                                </h2>
                                <div id="collapsePetugas">
                                    <div className="accordion-body">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <button type="button" className="btn btn-xs btn-primary">Add Petugas</button>
                                            </div>
                                            <table className="table table-bordered table-hover table-striped dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>NO</th>
                                                        <th>NIP</th>
                                                        <th>Nama</th>
                                                        <th>Jabatan</th>
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
                                    </div>
                                </div>
                            </div>
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerCountry">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCountry" aria-expanded="true" aria-controls="collapseCountry">
                                        Penugasan
                                    </button>
                                </h2>
                                <div id="collapseCountry">
                                    <div className="accordion-body">
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <label className="col-md-3 col-form-label text-sm-start" htmlFor="collapse-country-origin">Ditugaskan untuk melakukan,</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-start" htmlFor="collapse-country-origin">A. Tindakan Karantina dan hal terkait lainnya, berupa</label>
                                                    <div className="col-sm-3">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk1">Pemeriksaan Administrasi & Kesesuaian</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk1" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk2">Pemeriksaan Kesehatan</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk2" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk3">Pengasingan & Pengamatan</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk3" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk4">Pemeriksaan Alat Angkut</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk4" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk5">Pengawasan Pihak Lain</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk5" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk6">Pengawalan MP</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk6" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk7">Perlakuan</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk7" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk8">Penahanan</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk8" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk9">Penerbitan Surat Keterangan</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk9" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk10">Pemusnahan</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk10" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk11">Pembebasan Sebagian/Selurah</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk11" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk12">Serah Terima</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk12" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checktk13">Lainnya...</label>
                                                            <input name="default-radio-checktk" className="form-check-input" type="checkbox" value="" id="checktk13" />
                                                            <input name="othersPurpose" type="text" placeholder="Lainnya" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-start" htmlFor="collapse-country-origin">B. Penegakan Hukum dan hal terkait lainnya, berupa</label>
                                                    <div className="col-sm-3">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checkgakum1">Wasmalitirik</label>
                                                            <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum1" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checkgakum2">Gelar Perkara</label>
                                                            <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum2" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checkgakum3">Penyidikan</label>
                                                            <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum3" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checkgakum4">Melengkapi Pemberkasan</label>
                                                            <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum4" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="checkgakum5">Lainnya...</label>
                                                            <input name="default-radio-checkgakum" className="form-check-input" type="checkbox" value="" id="checkgakum5" />
                                                            <input name="othersPurpose" type="text" placeholder="Lainnya" />
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

export default DocK22