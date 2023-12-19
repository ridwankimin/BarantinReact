import React from 'react'

function DocK82() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-8.2 <span className="text-muted fw-light">(Berita Acara Pemusnahan)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k81">Nomor K-8.2</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k82" className="form-control form-control-sm" placeholder="Nomor K-8.2" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k81">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k82" className="form-control form-control-sm" placeholder="Tanggal K-8.2" disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k81">Nomor K-8.1</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k81" className="form-control form-control-sm" placeholder="Nomor Surat Pemusnahan" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k81">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k81" className="form-control form-control-sm" placeholder="Tanggal Surat Pemusnahan" disabled />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    {/* <!-- <h6 className="mb-b fw-normal"><b>KETERANGAN MEDIA PEMBAWA</b></h6> --> */}
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
                        <label className="col-sm-3 col-form-label" htmlFor="identitas_pemilik">Identitas</label>
                        <div className="col-sm-9">
                            <input type="text" id="identitas_pemilik" className="form-control form-control-sm" placeholder="NPWP/KTP/SIM/Passport" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="jenis_mp">Jenis Media Pembawa</label>
                        <div className="col-sm-9">
                            <input type="text" id="jenis_mp" className="form-control form-control-sm" placeholder="Jenis Media Pembawa" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nm_umum">Nama Umum/Dagang</label>
                        <div className="col-sm-9">
                            <input type="text" id="nm_umum" className="form-control form-control-sm" placeholder="Nama Umum/Dagang" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nm_ilmiah">Nama Ilmiah</label>
                        <div className="col-sm-9">
                            <input type="text" id="nm_ilmiah" className="form-control form-control-sm" placeholder="Nama Ilmiah" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="kode_hs">Kode HS</label>
                        <div className="col-sm-9">
                            <input type="text" id="kode_hs" className="form-control form-control-sm" placeholder="Kode HS" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="bentuk">Bentuk</label>
                        <div className="col-sm-4">
                            <input type="text" id="bentuk" className="form-control form-control-sm" placeholder="Bentuk" />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="jumlah">Jumlah</label>
                        <div className="col-sm-3">
                            <input type="text" id="jumlah" className="form-control form-control-sm" placeholder="Jumlah" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="laporan_mp">Laporan Pemasukan/ Pengeluaran/ Transit media pembawa</label>
                        <div className="col-sm-9">
                            <input type="text" id="laporan_mp" className="form-control form-control-sm" placeholder="Laporan Pemasukan/ Pengeluaran/ Transit media pembawa" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tempat_musnah">Tempat Pemusnahan</label>
                        <div className="col-sm-9">
                            <input type="text" id="tempat_musnah" className="form-control form-control-sm" placeholder="Tempat Pemusnahan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="metode_musnah">Metode Pemusnahan</label>
                        <div className="col-sm-9">
                            <input type="text" id="metode_musnah" className="form-control form-control-sm" placeholder="Metode Pemusnahan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="pelaksana_musnah">Pelaksana Pemusnahan</label>
                        <div className="col-sm-9">
                            <input type="text" id="pelaksana_musnah" className="form-control form-control-sm" placeholder="Pelaksana Pemusnahan" />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-3 fw-normal"><b>SAKSI-SAKSI</b></h6>
                    <ol>
                        <li>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="nama_saksi_1">Nama (Pemilik)</label>
                                <div className="col-sm-9">
                                    <input type="text" id="nama_saksi_1" className="form-control form-control-sm" placeholder="Nama (Pemilik)" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_1">Alamat</label>
                                <div className="col-sm-9">
                                    <input type="text" id="alamat_saksi_1" className="form-control form-control-sm" placeholder="Alamat" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_1">Jabatan/Pekerjaan</label>
                                <div className="col-sm-4">
                                    <input type="text" id="jabatan_saksi_1" className="form-control form-control-sm" placeholder="Jabatan" />
                                </div>
                                <div className="col-sm-5">
                                    <input type="text" id="pekerjaan_saksi_1" className="form-control form-control-sm" placeholder="Pekerjaan" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="nama_saksi_2">Nama</label>
                                <div className="col-sm-9">
                                    <input type="text" id="nama_saksi_2" className="form-control form-control-sm" placeholder="Nama" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_2">Alamat</label>
                                <div className="col-sm-9">
                                    <input type="text" id="alamat_saksi_2" className="form-control form-control-sm" placeholder="Alamat" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_2">Jabatan/Pekerjaan</label>
                                <div className="col-sm-4">
                                    <input type="text" id="jabatan_saksi_2" className="form-control form-control-sm" placeholder="Jabatan" />
                                </div>
                                <div className="col-sm-5">
                                    <input type="text" id="pekerjaan_saksi_2" className="form-control form-control-sm" placeholder="Pekerjaan" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="nama_saksi_3">Nama</label>
                                <div className="col-sm-9">
                                    <input type="text" id="nama_saksi_3" className="form-control form-control-sm" placeholder="Nama" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_3">Alamat</label>
                                <div className="col-sm-9">
                                    <input type="text" id="alamat_saksi_3" className="form-control form-control-sm" placeholder="Alamat" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_3">Jabatan/Pekerjaan</label>
                                <div className="col-sm-4">
                                    <input type="text" id="jabatan_saksi_3" className="form-control form-control-sm" placeholder="Jabatan" />
                                </div>
                                <div className="col-sm-5">
                                    <input type="text" id="pekerjaan_saksi_3" className="form-control form-control-sm" placeholder="Pekerjaan" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="nama_saksi_4">Nama</label>
                                <div className="col-sm-9">
                                    <input type="text" id="nama_saksi_4" className="form-control form-control-sm" placeholder="Nama" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_4">Alamat</label>
                                <div className="col-sm-9">
                                    <input type="text" id="alamat_saksi_4" className="form-control form-control-sm" placeholder="Alamat" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_4">Jabatan/Pekerjaan</label>
                                <div className="col-sm-4">
                                    <input type="text" id="jabatan_saksi_4" className="form-control form-control-sm" placeholder="Jabatan" />
                                </div>
                                <div className="col-sm-5">
                                    <input type="text" id="pekerjaan_saksi_4" className="form-control form-control-sm" placeholder="Pekerjaan" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="nama_saksi_5">Nama</label>
                                <div className="col-sm-9">
                                    <input type="text" id="nama_saksi_5" className="form-control form-control-sm" placeholder="Nama" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_5">Alamat</label>
                                <div className="col-sm-9">
                                    <input type="text" id="alamat_saksi_5" className="form-control form-control-sm" placeholder="Alamat" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_5">Jabatan/Pekerjaan</label>
                                <div className="col-sm-4">
                                    <input type="text" id="jabatan_saksi_5" className="form-control form-control-sm" placeholder="Jabatan" />
                                </div>
                                <div className="col-sm-5">
                                    <input type="text" id="pekerjaan_saksi_5" className="form-control form-control-sm" placeholder="Pekerjaan" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="nama_saksi_6">Nama</label>
                                <div className="col-sm-9">
                                    <input type="text" id="nama_saksi_6" className="form-control form-control-sm" placeholder="Nama" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_6">Alamat</label>
                                <div className="col-sm-9">
                                    <input type="text" id="alamat_saksi_6" className="form-control form-control-sm" placeholder="Alamat" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_6">Jabatan/Pekerjaan</label>
                                <div className="col-sm-4">
                                    <input type="text" id="jabatan_saksi_6" className="form-control form-control-sm" placeholder="Jabatan" />
                                </div>
                                <div className="col-sm-5">
                                    <input type="text" id="pekerjaan_saksi_6" className="form-control form-control-sm" placeholder="Pekerjaan" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="nama_saksi_7">Nama</label>
                                <div className="col-sm-9">
                                    <input type="text" id="nama_saksi_7" className="form-control form-control-sm" placeholder="Nama" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_7">Alamat</label>
                                <div className="col-sm-9">
                                    <input type="text" id="alamat_saksi_7" className="form-control form-control-sm" placeholder="Alamat" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="alamat_saksi_7">Jabatan/Pekerjaan</label>
                                <div className="col-sm-4">
                                    <input type="text" id="jabatan_saksi_7" className="form-control form-control-sm" placeholder="Jabatan" />
                                </div>
                                <div className="col-sm-5">
                                    <input type="text" id="pekerjaan_saksi_7" className="form-control form-control-sm" placeholder="Pekerjaan" />
                                </div>
                            </div>
                        </li>
                    </ol>
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

export default DocK82