import React from 'react'

function DocK93() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-9.3 <span className="text-muted fw-light">(Surat Keterangan Karantina)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k93">Nomor K-9.3</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k93" className="form-control form-control-sm" placeholder="Nomor K-9.3" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k93">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k93" className="form-control form-control-sm" placeholder="Tanggal K-9.3" disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k11">Nomor K-1.1</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k11" className="form-control form-control-sm" placeholder="Nomor Permohonan Tindakan Karantina" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k11">Tanggal K-1.1</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k11" className="form-control form-control-sm" placeholder="Tanggal Permohonan Tindakan Karantina" disabled />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <table className="table table-bordered table-hover table-striped dataTable">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>Media Pembawa</th>
                                <th>Nama Ilmiah</th>
                                <th>Kode HS</th>
                                <th>Bentuk</th>
                                <th>Jumlah</th>
                                <th>Neto</th>
                                <th>Satuan</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <br />
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="jenis_kemasan">Keterangan Kemasan</label>
                        <div className="col-sm-3">
                            <input type="text" id="jenis_kemasan" className="form-control form-control-sm" placeholder="Jenis Kemasan" />
                        </div>
                        <div className="col-sm-3">
                            <input type="text" id="jumlah_kemasan" className="form-control form-control-sm" placeholder="Jumlah Kemasan" />
                        </div>
                        <div className="col-sm-3">
                            <input type="text" id="tanda_khusus" className="form-control form-control-sm" placeholder="Tanda khusus Kemasan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nomor_kemasan">Nomor Kemasan</label>
                        <div className="col-sm-9">
                            <input type="text" id="nomor_kemasan" className="form-control form-control-sm" placeholder="Nomor Kemasan" />
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
                        <label className="col-sm-3 col-form-label" htmlFor="negara_asal">Negara/Area Asal*)</label>
                        <div className="col-sm-9">
                            <input type="text" id="negara_asal" className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="negara_tujuan">Negara/Area Tujuan*)</label>
                        <div className="col-sm-9">
                            <input type="text" id="negara_tujuan" className="form-control form-control-sm" placeholder="Negara/Area Tujuan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tujuan_pemasukan">Tujuan Pemasukan</label>
                        <div className="col-sm-9">
                            <input type="text" id="tujuan_pemasukan" className="form-control form-control-sm" placeholder="Tujuan Pemasukan" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="daerah_asal">Daerah Asal MP</label>
                        <div className="col-sm-9">
                            <input type="text" id="daerah_asal" className="form-control form-control-sm" placeholder="Daerah Asal MP" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="daerah_asal">Moda Alat Angkut</label>
                        <div className="col-sm-9">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="moda" id="angkut1" value="Kapal Laut/Truk/Mobil" />
                                <label className="form-check-label" htmlFor="angkut1">Kapal Laut/Truk/Mobil</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="moda" id="angkut2" value="Pesawat" />
                                <label className="form-check-label" htmlFor="angkut2">Pesawat</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="moda" id="angkut3" value="Kereta Api" />
                                <label className="form-check-label" htmlFor="angkut3">Kereta Api</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="angkut4" />
                                <div className="input-group mb-3">
                                    <label className="form-check-label" htmlFor="angkut4">
                                        Lainnya&nbsp;&nbsp;&nbsp;
                                    </label>
                                    <input type="text" className="form-control form-control-sm" placeholder="Lainnya.." />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nama_alat_angkut">Nama Alat Angkut</label>
                        <div className="col-sm-9">
                            <input type="text" id="nama_alat_angkut" className="form-control form-control-sm" placeholder="Nama Alat Angkut" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="bl_awb">BL/AWB</label>
                        <div className="col-sm-9">
                            <input type="text" id="bl_awb" className="form-control form-control-sm" placeholder="BL/AWB" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="pel_muat">Pelabuhan Muat</label>
                        <div className="col-sm-9">
                            <input type="text" id="pel_muat" className="form-control form-control-sm" placeholder="Pelabuhan Muat" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="pel_transit">Pelabuhan Transit</label>
                        <div className="col-sm-9">
                            <input type="text" id="pel_transit" className="form-control form-control-sm" placeholder="Pelabuhan Transit" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="pel_bongkar">Pelabuhan Bongkar</label>
                        <div className="col-sm-9">
                            <input type="text" id="pel_bongkar" className="form-control form-control-sm" placeholder="Pelabuhan Bongkar" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="estimasi_waktu">Estimasi Waktu Kedatangan/Keberangkatan</label>
                        <div className="col-sm-9">
                            <input type="text" id="estimasi_waktu" className="form-control form-control-sm" placeholder="Estimasi Waktu Kedatangan/Keberangkatan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="aktual_waktu">Aktual Waktu Kedatangan/Keberangkatan</label>
                        <div className="col-sm-9">
                            <input type="text" id="aktual_waktu" className="form-control form-control-sm" placeholder="Aktual Waktu Kedatangan/Keberangkatan" />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <label className="col-form-label" htmlFor="keterangan_mp">Ketarangan Media Pembawa</label>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="moda" id="keterangan1" />
                        <label className="form-check-label" htmlFor="keterangan1">Bukan termasuk media pembawa wajib periksa karantina</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="moda" id="keterangan2" />
                        <label className="form-check-label" htmlFor="keterangan2">Media pembawa tidak dikenai tindakan karantina dan pengawasan</label>
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

export default DocK93