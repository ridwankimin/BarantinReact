import React from 'react'

function DocKH1() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        KH-1 <span className="text-muted fw-light">(Sertifikat Kesehatan Hewan)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Rincian Keterangan</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_kh1">Nomor KH-1</label>
                        <div className="col-sm-3">
                            <input type="text" id="nomor_kh1" className="form-control form-control-sm" placeholder="Nomor KH-1" disabled />
                        </div>
                        <label className="col-sm-1 col-form-label" htmlFor="tanggal_kh1">Tgl</label>
                        <div className="col-sm-2">
                            <input type="text" id="tanggal_kh1" className="form-control form-control-sm" placeholder="Tanggal KH-1" />
                        </div>
                        <label className="col-sm-1 col-form-label" htmlFor="no_seri">No Seri</label>
                        <div className="col-sm-3">
                            <input type="text" id="no_seri" className="form-control form-control-sm" placeholder="No Seri" />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-3 fw-normal"><b>Rincian Keterangan</b></h6>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="negara_asal">Negara/Area Asal**)</label>
                        <div className="col-sm-9">
                            <input type="text" id="negara_asal" className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="negara_tujuan">Negara/Area Tujuan**)</label>
                        <div className="col-sm-9">
                            <input type="text" id="negara_tujuan" className="form-control form-control-sm" placeholder="Negara/Area Tujuan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nama_pengirim">Nama Pengirim</label>
                        <div className="col-sm-9">
                            <input type="text" id="nama_pengirim" className="form-control form-control-sm" placeholder="Nama Pengirim" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alamat_pengirim">Alamat Pengirim</label>
                        <div className="col-sm-9">
                            <input type="text" id="alamat_pengirim" className="form-control form-control-sm" placeholder="Alamat Pengirim" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nama_penerima">Nama Penerima</label>
                        <div className="col-sm-9">
                            <input type="text" id="nama_penerima" className="form-control form-control-sm" placeholder="Nama Penerima" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alamat_penerima">Alamat Penerima</label>
                        <div className="col-sm-9">
                            <input type="text" id="alamat_penerima" className="form-control form-control-sm" placeholder="Alamat Penerima" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tempat_pengeluaran">Tempat Pengeluaran</label>
                        <div className="col-sm-9">
                            <input type="text" id="tempat_pengeluaran" className="form-control form-control-sm" placeholder="Tempat Pengeluaran" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tanggal_muat">Tanggal Muat</label>
                        <div className="col-sm-9">
                            <input type="text" id="tanggal_muat" className="form-control form-control-sm" placeholder="Tanggal Muat" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tempat_bongkar">Tempat Bongkar</label>
                        <div className="col-sm-9">
                            <input type="text" id="tempat_bongkar" className="form-control form-control-sm" placeholder="Tempat Bongkar" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tanggal_bongkar">Tanggal Bongkar</label>
                        <div className="col-sm-9">
                            <input type="text" id="tanggal_bongkar" className="form-control form-control-sm" placeholder="Tanggal Bongkar" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="transit">Transit</label>
                        <div className="col-sm-9">
                            <input type="text" id="transit" className="form-control form-control-sm" placeholder="Tempat Transit" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="identitas_angkut">Jenis dan Identitas Alat Angkut</label>
                        <div className="col-sm-4">
                            <input type="text" id="jenis_angkut" className="form-control form-control-sm" placeholder="Jenis Alat Angkut" />
                        </div>
                        <div className="col-sm-5">
                            <input type="text" id="identitas_angkut" className="form-control form-control-sm" placeholder="Identitas Alat Angkut" />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal"><b>Keterangan media pembawa</b></h6>
                    <button className="btn btn-xs btn-success">Tambah Media Pembawa</button>
                    <table className="table table-bordered table-hover table-striped dataTable">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>Jenis MP</th>
                                <th>Nama Latin</th>
                                <th>Nama Umum</th>
                                <th>Jumlah</th>
                                <th>Satuan</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <br />
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal"><b>Pernyataan</b></h6>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pernyataan1" />
                        <label className="form-check-label" htmlFor="pernyataan1">
                            Hewan tersebut di atas telah dilakukan tindakan, tidak tertular dan bebas gejala HPHK serta bebas dari ektoparasit.
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pernyataan2" />
                        <label className="form-check-label" htmlFor="pernyataan2">
                            Hewan dalam keadaan sehat dan layak untuk diberangkatkan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pernyataan3" />
                        <label className="form-check-label" htmlFor="pernyataan3">
                            Hewan sudah memenuhi persyaratan dokumen lain
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pernyataan4" />
                        <div className="input-group mb-3">
                            <label className="form-check-label" htmlFor="pernyataan4">
                                Lainnya&nbsp;&nbsp;&nbsp;
                            </label>
                            <input type="text" id="penyataan_lain" className="form-control form-control-sm" placeholder="Lainnya.." />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal"><b>Deklarasi</b></h6>
                    <div className="nav-align-top mb-4">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <button type="button" className="nav-link active" role="tab" data-bs-toggle="tab" data-bs-target="#dekl1" aria-controls="navs-top-home" aria-selected="true">
                                    Pemenuhan persyaratan teknis negara tujuan
                                </button>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#dekl2" aria-controls="navs-top-profile" aria-selected="false">
                                    Hasil Pemeriksaan Laboratorium
                                </button>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#dekl3" aria-controls="navs-top-messages" aria-selected="false">
                                    Lainnya
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="dekl1" role="tabpanel">
                                (Untuk Media Pembawa Ekspor)
                                <textarea name="deklarasi1" id="deklarasi1" className="form-control form-control-sm" rows="2"></textarea>
                            </div>
                            <div className="tab-pane fade" id="dekl2" role="tabpanel">
                                (dilampirkan hasil pengujian)
                                <textarea name="deklarasi2" id="deklarasi2" className="form-control form-control-sm" rows="2"></textarea>
                            </div>
                            <div className="tab-pane fade" id="dekl3" role="tabpanel">
                                <textarea name="deklarasi3" id="deklarasi3" className="form-control form-control-sm" rows="2"></textarea>
                            </div>
                        </div>
                    </div>

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

export default DocKH1