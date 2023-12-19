import React from 'react'

function DocK92h() {
  return (
    <div class="container-xxl flex-grow-1 container-p-y">
    <h4 class="py-3 breadcrumb-wrapper mb-4">
        K-9.2.H <span class="text-muted fw-light">(Sertifikat Pelepasan Karantina Hewan)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div class="row">
        {/* <!-- Form Separator --> */}
        <div class="col-xxl">
            <div class="card mb-4">
                {/* <!-- <h5 class="card-header">Rincian Keterangan</h5> --> */}
                <form class="card-body">
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="nomor_k92h">Nomor K-9.2.H</label>
                        <div class="col-sm-4">
                            <input type="text" id="nomor_k92h" class="form-control form-control-sm" placeholder="Nomor K-9.2.H" disabled />
                        </div>
                        <label class="col-sm-2 col-form-label" for="tanggal_k92h">Tanggal</label>
                        <div class="col-sm-4">
                            <input type="text" id="tanggal_k92h" class="form-control form-control-sm" placeholder="Tanggal K-9.2.H" disabled />
                        </div>
                    </div>
                    <hr class="my-4 mx-n4" />
                    <h6 class="mb-3 fw-normal"><b>Rincian Keterangan</b></h6>
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="negara_asal">Negara/Area Asal**)</label>
                        <div class="col-sm-9">
                            <input type="text" id="negara_asal" class="form-control form-control-sm" placeholder="Negara/Area Asal" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="negara_tujuan">Negara/Area Tujuan**)</label>
                        <div class="col-sm-9">
                            <input type="text" id="negara_tujuan" class="form-control form-control-sm" placeholder="Negara/Area Tujuan" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="nama_pengirim">Nama Pengirim</label>
                        <div class="col-sm-9">
                            <input type="text" id="nama_pengirim" class="form-control form-control-sm" placeholder="Nama Pengirim" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="alamat_pengirim">Alamat Pengirim</label>
                        <div class="col-sm-9">
                            <input type="text" id="alamat_pengirim" class="form-control form-control-sm" placeholder="Alamat Pengirim" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="nama_penerima">Nama Penerima</label>
                        <div class="col-sm-9">
                            <input type="text" id="nama_penerima" class="form-control form-control-sm" placeholder="Nama Penerima" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="alamat_penerima">Alamat Penerima</label>
                        <div class="col-sm-9">
                            <input type="text" id="alamat_penerima" class="form-control form-control-sm" placeholder="Alamat Penerima" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="tempat_pengeluaran">Tempat Pengeluaran</label>
                        <div class="col-sm-9">
                            <input type="text" id="tempat_pengeluaran" class="form-control form-control-sm" placeholder="Tempat Pengeluaran" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="tanggal_muat">Tanggal Muat</label>
                        <div class="col-sm-9">
                            <input type="text" id="tanggal_muat" class="form-control form-control-sm" placeholder="Tanggal Muat" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="tempat_bongkar">Tempat Bongkar</label>
                        <div class="col-sm-9">
                            <input type="text" id="tempat_bongkar" class="form-control form-control-sm" placeholder="Tempat Bongkar" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="tanggal_bongkar">Tanggal Bongkar</label>
                        <div class="col-sm-9">
                            <input type="text" id="tanggal_bongkar" class="form-control form-control-sm" placeholder="Tanggal Bongkar" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="transit">Transit</label>
                        <div class="col-sm-9">
                            <input type="text" id="transit" class="form-control form-control-sm" placeholder="Tempat Transit" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="identitas_angkut">Jenis dan Identitas Alat Angkut</label>
                        <div class="col-sm-4">
                            <input type="text" id="jenis_angkut" class="form-control form-control-sm" placeholder="Jenis Alat Angkut" />
                        </div>
                        <div class="col-sm-5">
                            <input type="text" id="identitas_angkut" class="form-control form-control-sm" placeholder="Identitas Alat Angkut" />
                        </div>
                    </div>
                    <hr class="my-4 mx-n4" />
                    <h6 class="mb-b fw-normal"><b>Keterangan media pembawa</b></h6>
                    <button class="btn btn-xs btn-success">Tambah Media Pembawa</button>
                    <table class="table table-bordered table-hover table-striped dataTable">
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
                    <hr class="my-4 mx-n4" />
                    <h6 class="mb-b fw-normal"><b>Pernyataan</b></h6>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="pernyataan1" />
                        <label class="form-check-label" for="pernyataan1">
                            Telah memenuhi seluruh dokumen karantina hewan yang dipersyaratkan
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="pernyataan2" />
                        <label class="form-check-label" for="pernyataan2">
                            Dalam keadaan sehat dan baik serta telah memenuhi persyaratan sanitasi
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="pernyataan3" />
                        <label class="form-check-label" for="pernyataan3">
                            Telah memenuhi seluruh dokumen lain yang dipersyaratkan
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="pernyataan4" />
                        <div class="input-group mb-3">
                            <label class="form-check-label" for="pernyataan4">
                                Lainnya&nbsp;&nbsp;&nbsp;
                            </label>
                            <input type="text" id="penyataan_lain" class="form-control form-control-sm" placeholder="Lainnya.." />
                        </div>
                    </div>
                    <hr class="my-4 mx-n4" />
                    <h6 class="mb-b fw-normal"><b>Deklarasi</b></h6>
                    <textarea name="deklarasi" id="deklarasi" class="form-control form-control-sm" rows="2"></textarea>
                    <hr class="my-4 mx-n4" />
                    <div class="row mb-3">
                        <label class="col-sm-3 col-form-label" for="penandatangan">Penandatangan Dokumen</label>
                        <div class="col-sm-4">
                            <input type="text" id="penandatangan" placeholder="Penandatangan" class="form-control form-control-sm" />
                        </div>
                    </div>
                    <center>
                        <button type="button" class="btn btn-label-primary">Simpan</button>
                    </center>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default DocK92h