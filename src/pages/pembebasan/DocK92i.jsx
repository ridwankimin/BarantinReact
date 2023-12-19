import React from 'react'

function DocK92i() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-9.2.I <span className="text-muted fw-light">(Sertifikat Pelepasan Karantina Ikan)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k92i">Nomor K-9.2.I</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k92i" className="form-control form-control-sm" placeholder="Nomor K-9.2.I" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k92i">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k92i" className="form-control form-control-sm" placeholder="Tanggal K-9.1" disabled />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal"><b>KETERANGAN MEDIA PEMBAWA</b></h6>
                    <label className="col-form-label" htmlFor="jenis_mp">Jenis dan Jumlah</label>
                    <button className="btn btn-xs btn-success">Tambah Media Pembawa</button>
                    {/* <!-- <div className="row mb-3">
                        <div className="col-sm-9">
                        </div>
                    </div> --> */}
                    <table className="table table-bordered table-hover table-striped dataTable">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>Jenis</th>
                                <th>Nama Latin</th>
                                <th>Nama Umum</th>
                                <th>Jumlah</th>
                                <th>Satuan</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <br />
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nama_pemilik">Nama Pemilik</label>
                        <div className="col-sm-9">
                            <input type="text" id="nama_pemilik" className="form-control form-control-sm" placeholder="Nama Pemilik" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alamat_pemilik">Alamat Pemilik</label>
                        <div className="col-sm-9">
                            <input type="text" id="alamat_pemilik" className="form-control form-control-sm" placeholder="Alamat Pemilik" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nama_penerima">Nama Penerima</label>
                        <div className="col-sm-9">
                            <input type="text" id="nama_penerima" className="form-control form-control-sm" placeholder="Nama Penerima" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alamat_penerima">Alamat Penerima/Tujuan</label>
                        <div className="col-sm-9">
                            <input type="text" id="alamat_penerima" className="form-control form-control-sm" placeholder="Alamat Penerima" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="negara_asal">Negara/Area Asal**)</label>
                        <div className="col-sm-9">
                            <input type="text" id="negara_asal" className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tanggal_kirim">Tanggal Pengiriman</label>
                        <div className="col-sm-9">
                            <input type="text" id="tanggal_kirim" className="form-control form-control-sm" placeholder="Tanggal Pengiriman" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tanggal_pemasukan">Tanggal Pemasukan</label>
                        <div className="col-sm-9">
                            <input type="text" id="tanggal_pemasukan" className="form-control form-control-sm" placeholder="Tanggal Pemasukan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alat_angkut">Alat Angkut</label>
                        <div className="col-sm-9">
                            <input type="text" id="alat_angkut" className="form-control form-control-sm" placeholder="Alat Angkut" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="syarat_lain">Persyaratan Lain</label>
                        <div className="col-sm-9">
                            <input type="text" id="syarat_lain" className="form-control form-control-sm" placeholder="Persyaratan Lain" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tujuan_kirim">Tujuan Pengiriman</label>
                        <div className="col-sm-9">
                            <input type="text" id="tujuan_kirim" className="form-control form-control-sm" placeholder="Tujuan Pengiriman" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="hasil_periksa">Hasil Pemeriksaan</label>
                        <div className="col-sm-9">
                            <div className="form-check form-check-inline mt-3">
                                <input className="form-check-input" type="checkbox" name="hasil_periksa" id="klinis" value="Klinis" />
                                <label className="form-check-label" htmlFor="klinis">Klinis</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="hasil_periksa" id="organoleptik" value="Organoleptik" />
                                <label className="form-check-label" htmlFor="organoleptik">Organoleptik</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" name="hasil_periksa" id="laboratoris" value="Laboratoris" />
                                <label className="form-check-label" htmlFor="laboratoris">Laboratoris</label>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal"><b>Pernyataan</b></h6>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pernyataan1" />
                        <label className="form-check-label" htmlFor="pernyataan1">
                            Bebas dari Hama dan Penyakit Ikan Karantina
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pernyataan2" />
                        <label className="form-check-label" htmlFor="pernyataan2">
                            Memenuhi persyaratan keamanan dan Mutu Pangan atau Pakan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pernyataan3" />
                        <label className="form-check-label" htmlFor="pernyataan3">
                            Bebas dari kontaminan, dan/atau
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pernyataan4" />
                        <label className="form-check-label" htmlFor="pernyataan4">
                            Memenuhi persyaratan lainnya.
                        </label>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal"><b>Deklarasi</b></h6>
                    <textarea name="deklarasi" id="deklarasi" className="form-control form-control-sm" rows="2"></textarea>
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

export default DocK92i