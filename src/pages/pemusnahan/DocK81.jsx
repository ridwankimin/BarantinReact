import React from 'react'

function DocK81() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-8.1 <span className="text-muted fw-light">(Surat Pemusnahan)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k81">Nomor K-8.1</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k81" className="form-control form-control-sm" placeholder="Nomor K-8.1" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k81">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k81" className="form-control form-control-sm" placeholder="Tanggal K-8.1" disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="tujuan_surat">Tujuan Surat</label>
                        <div className="col-sm-10">
                            <input type="text" id="tujuan_surat" className="form-control form-control-sm" placeholder="Tujuan Surat" disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k11">Nomor K-1.1</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k11" className="form-control form-control-sm" placeholder="Nomor Permohonan Tindakan Karantina" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k11">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k11" className="form-control form-control-sm" placeholder="Tanggal Permohonan Tindakan Karantina" disabled />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal"><b>KETERANGAN MEDIA PEMBAWA</b></h6>
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
                        <label className="col-sm-3 col-form-label" htmlFor="bahan_kemasan">Bahan pembungkus/kemasan</label>
                        <div className="col-sm-5">
                            <input type="text" id="bahan_kemasan" className="form-control form-control-sm" placeholder="Bahan pembungkus/kemasan" />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="tanda_kusus" className="form-control form-control-sm" placeholder="Tanda khusus pembungkus/kemasan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="negara_asal">Negara/Area Asal*) dan Tempat Pengeluaran</label>
                        <div className="col-sm-9">
                            <input type="text" id="negara_asal" className="form-control form-control-sm" placeholder="Negara/Area Asal" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="negara_tujuan">Negara/Area Tujuan*) dan Tempat Pemasukan</label>
                        <div className="col-sm-9">
                            <input type="text" id="negara_tujuan" className="form-control form-control-sm" placeholder="Negara/Area Tujuan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="lokasi_mp">Lokasi Media Pembawa</label>
                        <div className="col-sm-9">
                            <input type="text" id="lokasi_mp" className="form-control form-control-sm" placeholder="Lokasi Media Pembawa" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="jenis_angkut">Jenis dan Nama Alat Angkut</label>
                        <div className="col-sm-4">
                            <input type="text" id="jenis_angkut" className="form-control form-control-sm" placeholder="Jenis Alat Angkut" />
                        </div>
                        <div className="col-sm-5">
                            <input type="text" id="nama_angkut" className="form-control form-control-sm" placeholder="Nama Alat Angkut" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tgl_berangkat">Tanggal berangkat dari negara/area asal</label>
                        <div className="col-sm-9">
                            <input type="text" id="tgl_berangkat" className="form-control form-control-sm" placeholder="Tanggal berangkat dari negara/area asal" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="tgl_tiba">Tanggal tiba</label>
                        <div className="col-sm-9">
                            <input type="text" id="tgl_tiba" className="form-control form-control-sm" placeholder="Tanggal tiba di negara/area tujuan" />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-3 fw-normal"><b>ALASAN PEMUSNAHAN</b></h6>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan1" />
                        <label className="form-check-label" htmlFor="alasan1">
                            Media Pembawa adalah jenis yang dilarang pemasukannya
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan2" />
                        <label className="form-check-label" htmlFor="alasan2">
                            Media pembawa rusak/busuk
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan3" />
                        <label className="form-check-label" htmlFor="alasan3">
                            Berasal dari negara/daerah yang sedang tertular/berjangkit wabah HPHK/HPIK/OPTK*)
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan4" />
                        <label className="form-check-label" htmlFor="alasan4">
                            Tidak dapat disembuhkan/dibebaskan dari HPHK/HPIK/OPTK/OPT negara tujuan setelah diberi Perlakuan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan5" />
                        <label className="form-check-label" htmlFor="alasan5">
                            Setelah dilakukan penolakan, tidak dikeluarkan dari wilayah negara Republik Indonesia atau dari
                            daerah/area tujuan oleh pemiliknya dalam batas waktu 3 (tiga) hari kerja sejak diterimanya Surat
                            Penolakan dan kewajiban Penolakan tersebut tidak dilaksanakan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan6" />
                        <label className="form-check-label" htmlFor="alasan6">
                            Tidak memenuhi persyaratan keamanan dan mutu pangan/pakan*)
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan9" />
                        <div className="input-group mb-3">
                            <label className="form-check-label" htmlFor="alasan9">
                                Lainnya&nbsp;&nbsp;&nbsp;
                            </label>
                            <input type="text" className="form-control form-control-sm" placeholder="Lainnya.." />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-3 fw-normal"><b>PELAKSANAAN PEMUSNAHAN</b></h6>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="maks_musnah">Maksimal Pemusnahan</label>
                        <div className="col-sm-9">
                            <input type="text" id="maks_musnah" className="form-control form-control-sm" placeholder="Maksimal Pemusnahan (dalam hari)" />
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

export default DocK81