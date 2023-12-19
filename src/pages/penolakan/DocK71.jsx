import React from 'react'

function DocK71() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-7.1 <span className="text-muted fw-light">(Surat Penolakan)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k71">Nomor K-7.1</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k71" className="form-control form-control-sm" placeholder="Nomor K-7.1" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k71">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k71" className="form-control form-control-sm" placeholder="Tanggal K-7.1" disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="upt_kar">Kepada</label>
                        <div className="col-sm-10">
                            <input type="text" id="tujuan_surat" className="form-control form-control-sm" placeholder="Kepada Sdr/i" disabled />
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
                        <label className="col-sm-3 col-form-label" htmlFor="tgl_tiba">Tanggal tiba di negara/area tujuan</label>
                        <div className="col-sm-9">
                            <input type="text" id="tgl_tiba" className="form-control form-control-sm" placeholder="Tanggal tiba di negara/area tujuan" />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-3 fw-normal"><b>ALASAN PENOLAKAN</b></h6>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan1" />
                        <label className="form-check-label" htmlFor="alasan1">
                            Tidak dapat melengkapi dokumen persyaratan dalam waktu yang ditetapkan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan2" />
                        <label className="form-check-label" htmlFor="alasan2">
                            Persyaratan dokumen lain tidak dapat dipenuhi dalam waktu yang ditetapkan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan3" />
                        <label className="form-check-label" htmlFor="alasan3">
                            Berasal dari negara/daerah/tempat yang dilarang
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan4" />
                        <label className="form-check-label" htmlFor="alasan4">
                            Berasal dari negara/daerah tertular/berjangkit wabah*) penyakit hewan menular
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan5" />
                        <label className="form-check-label" htmlFor="alasan5">
                            Jenis media pembawa yang dilarang
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan6" />
                        <label className="form-check-label" htmlFor="alasan6">
                            Sanitasi tidak baik, kemasan tidak utuh/rusak, terjadi perubahan sifat, terkontaminasi, membahayakan kesehatan hewan dan atau manusia.
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan7" />
                        <label className="form-check-label" htmlFor="alasan7">
                            Laporan pemeriksaan di atas alat angkut ditemukan HPHK/HPIK/OPTK
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="alasan8" />
                        <label className="form-check-label" htmlFor="alasan8">
                            Tidak bebas dan/atau tidak dapat dibebaskan dari HPHK/HPIK/OPTK
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
                    <h6 className="mb-3 fw-normal"><b>REKOMENDASI</b></h6>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekom1" />
                        <label className="form-check-label" htmlFor="rekom1">
                            mengeluarkan media pembawa tersebut dari wilayah Negara Republik Indonesia dan apabila dalam jangka
                            waktu 3 (tiga) hari kerja sejak diterimanya Surat Penolakan ini kewajiban tersebut tidak dilaksanakan,
                            terhadap media pembawa dimaksud akan dilakukan pemusnahan.
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekom2" />
                        <label className="form-check-label" htmlFor="rekom2">
                            mengeluarkan media pembawa tersebut dari area tujuan ke area asal dan apabila dalam jangka waktu 3 (tiga)
                            hari kerja sejak diterimanya Surat Penolakan ini kewajiban tersebut tidak dilaksanakan, terhadap media
                            pembawa dimaksud akan dilakukan pemusnahan.
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekom3" />
                        <label className="form-check-label" htmlFor="rekom3">
                            mengeluarkan media pembawa tersebut dari tempat pengeluaran dan apabila dalam jangka waktu 3 (tiga)
                            hari kerja sejak diterimanya Surat Penolakan ini kewajiban tersebut tidak dilaksanakan, terhadap media
                            pembawa dimaksud akan dilakukan pemusnahan.
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekom4" />
                        <label className="form-check-label" htmlFor="rekom4">
                            tidak mengirim media pembawa tersebut ke negara/area tujuan.
                        </label>
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

export default DocK71