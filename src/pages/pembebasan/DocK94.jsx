import React from 'react'

function DocK94() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-9.4 <span className="text-muted fw-light">(Laporan Hasil Pengawasan)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k94">Nomor K-9.4</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k94" className="form-control form-control-sm" placeholder="Nomor K-9.4" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k94">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k94" className="form-control form-control-sm" placeholder="Tanggal K-9.4" disabled />
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
                        <label className="col-sm-3 col-form-label" htmlFor="ket_lain">Keterangan Lain</label>
                        <div className="col-sm-9">
                            <input type="text" id="ket_lain" className="form-control form-control-sm" placeholder="Keterangan Lain" />
                        </div>
                    </div>
                    <label className="col-form-label">Telah memenuhi semua persyaratan pengawasan terhadap :</label>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="syarat1" />
                        <label className="form-check-label" htmlFor="syarat1">
                            Keamanan pangan dan/atau mutu pangan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="syarat2" />
                        <label className="form-check-label" htmlFor="syarat2">
                            Keamanan pakan dan/atau mutu pakan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="syarat3" />
                        <label className="form-check-label" htmlFor="syarat3">
                            Produk rekayasa genetik/PRG
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="syarat4" />
                        <label className="form-check-label" htmlFor="syarat4">
                            Sumber daya genetik/SDG
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="syarat5" />
                        <label className="form-check-label" htmlFor="syarat5">
                            Agensia hayati
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="syarat6" />
                        <label className="form-check-label" htmlFor="syarat6">
                            Jenis Asing Invasif/JAI
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="syarat7" />
                        <label className="form-check-label" htmlFor="syarat7">
                            Tumbuhan liar dan tumbuhan langka
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="syarat8" />
                        <label className="form-check-label" htmlFor="syarat8">
                            Satwa liar dan satwa langka
                        </label>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal"><b>Rekomendasi</b></h6>
                    <h6 className="mb-1 mt-3 fw-normal">MP HPHK</h6>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomkh1" />
                        <label className="form-check-label" htmlFor="rekomkh1">
                            Sertifikat Pelepasan Karantina Hewan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomkh2" />
                        <label className="form-check-label" htmlFor="rekomkh2">
                            Sertifikat Kesehatan Hewan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomkh3" />
                        <label className="form-check-label" htmlFor="rekomkh3">
                            Sertifikat Sanitasi Produk Hewan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomkh4" />
                        <label className="form-check-label" htmlFor="rekomkh4">
                            Surat Keterangan Karantina
                        </label>
                    </div>
                    <h6 className="mb-1 mt-3 fw-normal">MP HPIK</h6>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomki1" />
                        <label className="form-check-label" htmlFor="rekomki1">
                            Sertifikat Pelepasan Karantina Ikan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomki2" />
                        <label className="form-check-label" htmlFor="rekomki2">
                            Sertifikat Kesehatan Ikan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomki3" />
                        <label className="form-check-label" htmlFor="rekomki3">
                            Sertifikat Kesehatan Ikan Antar Area
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomki4" />
                        <label className="form-check-label" htmlFor="rekomki4">
                            Surat Keterangan Karantina
                        </label>
                    </div>
                    <h6 className="mb-1 mt-3 fw-normal">MP OPTK</h6>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomkt1" />
                        <label className="form-check-label" htmlFor="rekomkt1">
                            Sertifikat Pelepasan Karantina Tumbuhan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomkt2" />
                        <label className="form-check-label" htmlFor="rekomkt2">
                            Phytosanitary Certificate for Export/Phytosanitary Certificate for Re-export*)
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomkt3" />
                        <label className="form-check-label" htmlFor="rekomkt3">
                            Sertifikat Kesehatan Tumbuhan Antar Area
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomkt4" />
                        <label className="form-check-label" htmlFor="rekomkt4">
                            Certificate for Export of Processed Plant Product/Non-regulated Article
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rekomkt5" />
                        <label className="form-check-label" htmlFor="rekomkt5">
                            Surat Keterangan Karantina
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

export default DocK94