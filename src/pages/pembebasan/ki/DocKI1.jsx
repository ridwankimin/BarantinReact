import React from 'react'

function DocKI1() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        KI-1 <span className="text-muted fw-light">(Health Certificate for Fish and Fish Products)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_ki1">Nomor KI-1</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_ki1" className="form-control form-control-sm" placeholder="Nomor KI-1" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_ki1">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_ki1" className="form-control form-control-sm" placeholder="Tanggal KI-1" disabled />
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
                                <th>Nama Umum</th>
                                <th>Nama Ilmiah</th>
                                <th>Jumlah</th>
                                <th>Satuan/Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <br />
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
                        <label className="col-sm-3 col-form-label" htmlFor="alamat_penerima">Alamat Penerima/Tujuan</label>
                        <div className="col-sm-9">
                            <input type="text" id="alamat_penerima" className="form-control form-control-sm" placeholder="Alamat Penerima" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="otoritas">Otoritas Kompeten</label>
                        <div className="col-sm-9">
                            <input type="text" id="otoritas" className="form-control form-control-sm" value="Fish Quarantine and Inspection Agency (FQIA)" placeholder="Otoritas Kompeten" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="status">Status Usaha</label>
                        <div className="col-sm-9">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="status1" />
                                <label className="form-check-label" htmlFor="status1">
                                    Pabrik Pengolahan/budidaya
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="status2" />
                                <label className="form-check-label" htmlFor="status2">
                                    Unit Usaha Perikanan (UUP)
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="status3" />
                                <div className="input-group mb-3">
                                    <label className="form-check-label" htmlFor="status3">
                                        Lainnya&nbsp;&nbsp;&nbsp;
                                    </label>
                                    <input type="text" id="status_lain" className="form-control form-control-sm" placeholder="Lainnya.." />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="nama_usaha">Nama Usaha</label>
                        <div className="col-sm-9">
                            <input type="text" id="nama_usaha" className="form-control form-control-sm" placeholder="Nama Usaha" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="no_registrasi">No Registrasi</label>
                        <div className="col-sm-9">
                            <input type="text" id="no_registrasi" className="form-control form-control-sm" placeholder="No Registrasi" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alamat_usaha">Alamat</label>
                        <div className="col-sm-9">
                            <input type="text" id="alamat_usaha" className="form-control form-control-sm" placeholder="Alamat" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="area_tangkapan">Area Tangkapan (Khusus Hasil Tangkapan)</label>
                        <div className="col-sm-9">
                            <input type="text" id="area_tangkapan" className="form-control form-control-sm" placeholder="Area Tangkapan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="negara_asal">Negara/Area Asal**)</label>
                        <div className="col-sm-5">
                            <input type="text" id="negara_asal" className="form-control form-control-sm" placeholder="Negara Asal" />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="daerah_asal" className="form-control form-control-sm" placeholder="Daerah Asal" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="sumber">Sumber</label>
                        <div className="col-sm-9">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="sumber1" />
                                <label className="form-check-label" htmlFor="sumber1">
                                    farm-raised / budidaya
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="sumber2" />
                                <label className="form-check-label" htmlFor="sumber2">
                                    wild-caught / tangkapan liar
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="pel_pengeluaran">Pelabuhan Pengeluaran</label>
                        <div className="col-sm-9">
                            <input type="text" id="pel_pengeluaran" className="form-control form-control-sm" placeholder="Pelabuhan Pengeluaran" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="alat_transportasi">Alat Transportasi</label>
                        <div className="col-sm-9">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="transport1" />
                                <label className="form-check-label" htmlFor="transport1">
                                    Angkutan Udara
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="transport2" />
                                <label className="form-check-label" htmlFor="transport2">
                                    Angkutan Laut
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="transport3" />
                                <label className="form-check-label" htmlFor="transport3">
                                    Angkutan Darat
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="desk_komoditas">Deskripsi Komoditas</label>
                        <div className="col-sm-9">
                            <input type="text" id="desk_komoditas" className="form-control form-control-sm" placeholder="Deskripsi Komoditas" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="temperatur">Temperatur Komoditas</label>
                        <div className="col-sm-9">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="temperatur1" />
                                <label className="form-check-label" htmlFor="temperatur1">
                                    ambient (live)
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="temperatur2" />
                                <label className="form-check-label" htmlFor="temperatur2">
                                    frozen / beku
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="temperatur3" />
                                <label className="form-check-label" htmlFor="temperatur3">
                                    chilled / dingin
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="peruntukan">Peruntukan</label>
                        <div className="col-sm-9">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="peruntukan1" />
                                <label className="form-check-label" htmlFor="peruntukan1">
                                    Konsumsi manusia
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="peruntukan2" />
                                <label className="form-check-label" htmlFor="peruntukan2">
                                    Budidaya
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="peruntukan3" />
                                <label className="form-check-label" htmlFor="peruntukan3">
                                    Ikan hias
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="peruntukan4" />
                                <label className="form-check-label" htmlFor="peruntukan4">
                                    Penelitian dan pemeriksaan
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="peruntukan5" />
                                <label className="form-check-label" htmlFor="peruntukan5">
                                    Umpan Pancing
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="peruntukan6" />
                                <label className="form-check-label" htmlFor="peruntukan6">
                                    Tidak dapat dimakan (kulit ikan, cangkang, tulang, dll)
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="jenis_kemasan">Keterangan Kemasan</label>
                        <div className="col-sm-5">
                            <input type="text" id="jumlah_kemasan" className="form-control form-control-sm" placeholder="Jumlah Kemasan" />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_kemasan" className="form-control form-control-sm" placeholder="Nomor Kemasan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="jenis_kemasan">Jenis Kemasan</label>
                        <div className="col-sm-9">
                            <input type="text" id="jenis_kemasan" className="form-control form-control-sm" placeholder="Jenis Kemasan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="jml_total">Jumlah Total (Kg)</label>
                        <div className="col-sm-9">
                            <input type="text" id="jml_total" className="form-control form-control-sm" placeholder="Jumlah Total (Kg)" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="no_segel">No Segel</label>
                        <div className="col-sm-9">
                            <input type="text" id="no_segel" className="form-control form-control-sm" placeholder="No Segel" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="pel_tujuan">Pelabuhan Tujuan</label>
                        <div className="col-sm-9">
                            <input type="text" id="pel_tujuan" className="form-control form-control-sm" placeholder="Pelabuhan Tujuan" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="identitas_transport">Identitas Alat Transportasi</label>
                        <div className="col-sm-5">
                            <input type="text" id="nama_kapal" className="form-control form-control-sm" placeholder="Nama Kapal" />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="no_voyage" className="form-control form-control-sm" placeholder="Nomor Voyage" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="lab_uji">Laboratorium Penguji</label>
                        <div className="col-sm-3">
                            <input type="text" id="nama_lab" className="form-control form-control-sm" placeholder="Nama Laboratorium Penguji" />
                        </div>
                        <div className="col-sm-6">
                            <input type="text" id="alamat_lab" className="form-control form-control-sm" placeholder="Alamat Laboratorium Penguji" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="penanggungjawab_lab">Penanggungjawab Laboratorium</label>
                        <div className="col-sm-9">
                            <input type="text" id="penanggungjawab_lab" className="form-control form-control-sm" placeholder="Penanggungjawab Laboratorium" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="no_hasil_lab">Nomor laporan hasil uji</label>
                        <div className="col-sm-9">
                            <input type="text" id="no_hasil_lab" className="form-control form-control-sm" placeholder="Nomor laporan hasil uji" />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal"><b>Pengesahan</b></h6>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="no_hasil_lab">Menyatakan Bahwa :</label>
                        <div className="col-sm-9">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="jenis_kom1" />
                                <label className="form-check-label" htmlFor="jenis_kom1">
                                    Ikan Bersirip
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="jenis_kom2" />
                                <label className="form-check-label" htmlFor="jenis_kom2">
                                    Moluska
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="jenis_kom3" />
                                <label className="form-check-label" htmlFor="jenis_kom3">
                                    Produk Ikan
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="jenis_kom4" />
                                <label className="form-check-label" htmlFor="jenis_kom4">
                                    Lainnya
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pengesahan1" />
                        <label className="form-check-label" htmlFor="pengesahan1">
                            Produk dari setiap batch / Komoditas
                            dari populasi tersebut di atas telah diproses, diinspeksi dan dinilai dalam kondisi yang telah disetujui oleh dan di bawah kendali
                            Otoritas Kompeten
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pengesahan2" />
                        <label className="form-check-label" htmlFor="pengesahan2">
                            telah ditangani, disiapkan atau diproses, diidentifikasi, disimpan dan ditransportasikan sesuai persyaratan
                            sanitasi dan HACCP yang diterapkan secara konsisten dan sesuai dengan persyaratan yang ditetapkan Codex Code of Practice for
                            Fish and Fishery Products (CAC / RCP 52-2003)
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pengesahan3" />
                        <label className="form-check-label" htmlFor="pengesahan3">
                            Produk dari setiap batch / Komoditas dari
                            populasi dinyatakan bebas dari penyakit berdasarkan pengambilan sampel dan metode pengujian yang diakui oleh World
                            Organisation for Animal Health (WOAH) dan pada saat pemeriksaan:
                        </label>
                    </div>
                    <div className="form-check" style={{'margin-left': '30px'}}>
                        <input className="form-check-input" type="checkbox" value="" id="pernyataan31" />
                        <label className="form-check-label" htmlFor="pernyataan31">
                            bebas dari penyakit;
                        </label>
                    </div>
                    <div className="form-check" style={{"margin-left": "30px"}}>
                        <input className="form-check-input" type="checkbox" value="" id="pernyataan32" />
                        <label className="form-check-label" htmlFor="pernyataan32">
                            tidak menunjukkan gejala penyakit secara visual/klinis;
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pernyataan4" />
                        <label className="form-check-label" htmlFor="pernyataan4">
                            produk non pangan telah ditangani, disiapkan atau diproses, disimpan, ditransportasikan berdasarkan prinsip biosekuriti
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="pernyataan5" />
                        <div className="input-group mb-3">
                            <label className="form-check-label" htmlFor="pernyataan5">
                                Lainnya&nbsp;&nbsp;&nbsp;
                            </label>
                            <input type="text" id="penyataan_lain" className="form-control form-control-sm" placeholder="Lainnya.." />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="deklarasi">Informasi Tambahan</label>
                        <div className="col-sm-9">
                            <textarea name="deklarasi" id="deklarasi" className="form-control form-control-sm" rows="2"></textarea>
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

export default DocKI1