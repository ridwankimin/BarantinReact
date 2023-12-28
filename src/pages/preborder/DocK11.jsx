import React, { useState } from 'react'
import PersonSvg from '../../logo/svg/PersonSvg'
import ShipSvg from '../../logo/svg/ShipSvg'
import PackageSvg from '../../logo/svg/PackageSvg'
import DokumenSvg from '../../logo/svg/DokumenSvg'
import ConfirmSvg from '../../logo/svg/ConfirmSvg'
import Master from '../../model/Master'

function DocK11() {
    let [wizardPage, setWizardPage] = useState(1)
    // const [menuOpen, setMenuOpen] = useState(false)
    
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-1.1 <span className="text-muted fw-light">PERMOHONAN TINDAKAN KARANTINA DAN PENGAWASAN DAN/ATAU PENGENDALIAN
            SERTA BERITA ACARA SERAH TERIMA MEDIA PEMBAWA DI TEMPAT PEMASUKAN,
            PENGELUARAN DAN/ATAU TRANSIT</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <div id="wizard-checkout" className="bs-stepper wizard-icons wizard-icons-example mt-2">
                <div className="bs-stepper-header m-auto border-0">
                    <div className={wizardPage === 1 ? "step active" : "step"} onClick={() => setWizardPage(1)}>
                        <button type="button" className="step-trigger">
                            <span className="bs-stepper-icon">
                              <PersonSvg/>
                            </span>
                            <span className="bs-stepper-label">Identitas Pemohon</span>
                        </button>
                    </div>
                    <div className="line">
                        <i className="bx bx-chevron-right"></i>
                    </div>
                    <div className={wizardPage === 2 ? "step active" : "step"} onClick={() => setWizardPage(2)}>
                        <button type="button" className="step-trigger">
                            <span className="bs-stepper-icon">
                              <ShipSvg/>
                            </span>
                            <span className="bs-stepper-label">Pelabuhan - Alat Angkut</span>
                        </button>
                    </div>
                    <div className="line">
                        <i className="bx bx-chevron-right"></i>
                    </div>
                    <div className={wizardPage === 3 ? "step active" : "step"} onClick={() => setWizardPage(3)}>
                        <button type="button" className="step-trigger">
                            <span className="bs-stepper-icon">
                              <PackageSvg/>
                            </span>
                            <span className="bs-stepper-label">Media Pembawa - Kemasan</span>
                        </button>
                    </div>
                    <div className="line">
                        <i className="bx bx-chevron-right"></i>
                    </div>
                    <div className={wizardPage === 4 ? "step active" : "step"} onClick={() => setWizardPage(4)}>
                        <button type="button" className="step-trigger">
                            <span className="bs-stepper-icon">
                              <DokumenSvg/>
                            </span>
                            <span className="bs-stepper-label">Dokumen</span>
                        </button>
                    </div>
                    <div className="line">
                        <i className="bx bx-chevron-right"></i>
                    </div>
                    <div className={wizardPage === 5 ? "step active" : "step"} onClick={() => setWizardPage(5)}>
                        <button type="button" className="step-trigger">
                            <span className="bs-stepper-icon">
                              <ConfirmSvg/>
                            </span>
                            <span className="bs-stepper-label">Konfirmasi</span>
                        </button>
                    </div>
                </div>
                <div className="bs-stepper-content border-top">
                    <form >
                        <div id="cardPemohon" className={wizardPage === 1 ? "content active dstepper-block" : "content"}>
      <div className="row">
          <div className="col-sm-6">
              <div className="card card-action mb-4">
                  <div className="card-header">
                      <div className="card-action-title">
                          <h5 className="mb-0">Pemohon</h5>
                      </div>
                      <div className="card-action-element">
                          <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="collapse show">
                      <div className="card-body pt-0">
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="permohonan">Jenis Permohonan</label>
                              <div className="col-sm-9">
                                  <select className="form-control form-control-sm" name="permohonan" id="permohonan">
                                      <option value="E">Ekspor</option>
                                      <option value="I">Impor</option>
                                      <option value="M">Domestik Masuk</option>
                                      <option value="K">Domestik Keluar</option>
                                  </select>
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="pj_rutin">Pengguna Jasa Rutin</label>
                              <div className="col-sm-9">
                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="pj_rutin" id="ya" value="Ya" />
                                      <label className="form-check-label" htmlFor="ya">Ya</label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="pj_rutin" id="tidak" value="Tidak" />
                                      <label className="form-check-label" htmlFor="tidak">Tidak</label>
                                  </div>
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nama_pemohon">Nama</label>
                              <div className="col-sm-9">
                                  <input type="text" id="nama_pemohon" className="form-control form-control-sm" placeholder="Nama Pemohon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamat_pemohon">Alamat</label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamat_pemohon" className="form-control form-control-sm" placeholder="Alamat Pemohon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="prov_pemohon">Provinsi</label>
                              <div className="col-sm-9">
                                  <input type="text" id="prov_pemohon" className="form-control form-control-sm" placeholder="Kota Pemohon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="kota_pemohon">Kota/Kabupaten</label>
                              <div className="col-sm-9">
                                  <input type="text" id="kota_pemohon" className="form-control form-control-sm" placeholder="Kota Pemohon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nomor_tlp">No. Telepon</label>
                              <div className="col-sm-9">
                                  <input type="text" id="nomor_tlp" className="form-control form-control-sm" placeholder="No. Telepon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="email_pemohon">Email</label>
                              <div className="col-sm-9">
                                  <input type="text" id="email_pemohon" className="form-control form-control-sm" placeholder="Email" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="email_pemohon">Identitas</label>
                              <div className="col-sm-2">
                                  <select className="form-control form-control-sm" name="jenis_identitas_pemohon" id="jenis_identitas_pemohon">
                                      <option value="KTP">KTP</option>
                                      <option value="NPWP">NPWP</option>
                                  </select>
                              </div>
                              <div className="col-sm-7">
                                  <input type="text" id="no_identitas_pemohon" className="form-control form-control-sm" placeholder="Nomor Identitas" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-sm-6">
              <div className="card card-action mb-4">
                  <div className="card-header">
                      <div className="card-action-title">
                          <h5 className="mb-0">Penandatangan Dokumen</h5>
                      </div>
                      <div className="card-action-element">
                          <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="collapse show">
                      <div className="card-body pt-0">
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nama_ttd">Nama</label>
                              <div className="col-sm-9">
                                  <input type="text" id="nama_ttd" className="form-control form-control-sm" placeholder="Nama Penandatangan" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamat_ttd">Alamat</label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamat_ttd" className="form-control form-control-sm" placeholder="Alamat Penandatangan" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="identitas_ttd">Identitas</label>
                              <div className="col-sm-2">
                                  <select className="form-control form-control-sm" name="jenis_identitas_ttd" id="jenis_identitas_ttd">
                                      <option value="KTP">KTP</option>
                                      <option value="NPWP">NPWP</option>
                                  </select>
                              </div>
                              <div className="col-sm-7">
                                  <input type="text" id="no_identitas_ttd" className="form-control form-control-sm" placeholder="Nomor Identitas" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="jabatan_ttd">Jabatan</label>
                              <div className="col-sm-9">
                                  <input type="text" id="jabatan_ttd" className="form-control form-control-sm" placeholder="Jabatan" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="card card-action mb-4">
                  <div className="card-header">
                      <div className="card-action-title">
                          <h5 className="mb-0">Contact Person</h5>
                      </div>
                      <div className="card-action-element">
                          <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="collapse show">
                      <div className="card-body pt-0">
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nama_cp">Nama</label>
                              <div className="col-sm-9">
                                  <input type="text" id="nama_cp" className="form-control form-control-sm" placeholder="Nama Contact Person" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3" htmlFor="alamat_cp">Alamat</label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamat_cp" className="form-control form-control-sm" placeholder="Alamat Contact Person" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="telepon_cp">Telepon</label>
                              <div className="col-sm-9">
                                  <input type="text" id="telepon_cp" className="form-control form-control-sm" placeholder="Telepon Contact Person" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-sm-6">
              <div className="card card-action mb-4">
                  <div className="card-header">
                      <div className="card-action-title">
                          <h5 className="mb-0">Pengirim</h5>
                      </div>
                      <div className="card-action-element">
                          <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="collapse show">
                      <div className="card-body pt-0">
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nama_pengirim">Nama</label>
                              <div className="col-sm-9">
                                  <input type="text" id="nama_pengirim" className="form-control form-control-sm" placeholder="Nama Pengirim" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamat_pengirim">Alamat</label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamat_pengirim" className="form-control form-control-sm" placeholder="Alamat Pengirim" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="negara_pengirim">Negara</label>
                              <div className="col-sm-9">
                                  <input type="text" id="negara_pengirim" className="form-control form-control-sm" placeholder="Kota Pengirim" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="prov_pengirim">Provinsi</label>
                              <div className="col-sm-9">
                                  <input type="text" id="prov_pengirim" className="form-control form-control-sm" placeholder="Kota Pengirim" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="kota_pengirim">Kota/Kabupaten</label>
                              <div className="col-sm-9">
                                  <input type="text" id="kota_pengirim" className="form-control form-control-sm" placeholder="Kota Pengirim" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nomor_tlp_pengirim">No. Telepon</label>
                              <div className="col-sm-9">
                                  <input type="text" id="nomor_tlp_pengirim" className="form-control form-control-sm" placeholder="No. Telepon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="email_pengirim">Email</label>
                              <div className="col-sm-9">
                                  <input type="text" id="email_pengirim" className="form-control form-control-sm" placeholder="Email" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="identitas">Identitas</label>
                              <div className="col-sm-2">
                                  <select className="form-control form-control-sm" name="jenis_identitas_pengirim" id="jenis_identitas_pengirim">
                                      <option value="KTP">KTP</option>
                                      <option value="NPWP">NPWP</option>
                                  </select>
                              </div>
                              <div className="col-sm-7">
                                  <input type="text" id="no_identitas_pengirim" className="form-control form-control-sm" placeholder="Nomor Identitas" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-sm-6">
              <div className="card card-action mb-4">
                  <div className="card-header">
                      <div className="card-action-title">
                          <h5 className="mb-0">Penerima</h5>
                      </div>
                      <div className="card-action-element">
                          <ul className="list-inline mb-0">
                              <li className="list-inline-item">
                                  <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="collapse show">
                      <div className="card-body pt-0">
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nama_penerima">Nama</label>
                              <div className="col-sm-9">
                                  <input type="text" id="nama_penerima" className="form-control form-control-sm" placeholder="Nama Penerima" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamat_penerima">Alamat</label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamat_penerima" className="form-control form-control-sm" placeholder="Alamat Penerima" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="negara_penerima">Negara</label>
                              <div className="col-sm-9">
                                  <input type="text" id="negara_penerima" className="form-control form-control-sm" placeholder="Kota Penerima" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="prov_penerima">Provinsi</label>
                              <div className="col-sm-9">
                                  <input type="text" id="prov_penerima" className="form-control form-control-sm" placeholder="Kota Penerima" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="kota_penerima">Kota/Kabupaten</label>
                              <div className="col-sm-9">
                                  <input type="text" id="kota_penerima" className="form-control form-control-sm" placeholder="Kota Penerima" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nomor_tlp_penerima">No. Telepon</label>
                              <div className="col-sm-9">
                                  <input type="text" id="nomor_tlp_penerima" className="form-control form-control-sm" placeholder="No. Telepon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="email_penerima">Email</label>
                              <div className="col-sm-9">
                                  <input type="text" id="email_penerima" className="form-control form-control-sm" placeholder="Email" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="identitas">Identitas</label>
                              <div className="col-sm-2">
                                  <select className="form-control form-control-sm" name="jenis_identitas_penerima" id="jenis_identitas_penerima">
                                      <option value="KTP">KTP</option>
                                      <option value="NPWP">NPWP</option>
                                  </select>
                              </div>
                              <div className="col-sm-7">
                                  <input type="text" id="no_identitas_penerima" className="form-control form-control-sm" placeholder="Nomor Identitas" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-12 d-flex justify-content-between">
              <button type="button" className="btn btn-label-secondary" disabled>
                  <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                  <span className="d-sm-inline-block d-none">Sebelumnya</span>
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setWizardPage(wizardPage + 1)}>
                  <span className="d-sm-inline-block d-none me-sm-1">Selanjutnya</span>
                  <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
              </button>
          </div>
      </div>
  </div>
                        <div id="cardPelabuhan" className={wizardPage === 2 ? "content active dstepper-block" : "content"}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="card card-action mb-4">
                                        <div className="card-header">
                                            <div className="card-action-title">
                                                <h5 className="mb-0">Asal - Tujuan</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="negara_asal">Negara Asal</label>
                                                    <div className="col-sm-9">
                                                        <select name="negara_asal" id="negara_asal" className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            <Master/>
                                                        </select>
                                                        {/* <input type="text" id="negara_asal" className="form-control form-control-sm" placeholder="Negara Asal" /> */}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="daerah_asal">Daerah Asal</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="daerah_asal" className="form-control form-control-sm" placeholder="Daerah Asal" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="negara_tujuan">Negara Tujuan</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="negara_tujuan" className="form-control form-control-sm" placeholder="Negara Tujuan" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="daerah_tujuan">Daerah Tujuan</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="daerah_tujuan" className="form-control form-control-sm" placeholder="Daerah Tujuan" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="transit_opsi">Transit</label>
                                                    <div className="col-sm-9">
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="transit_opsi" id="ya" value="Ya" />
                                                            <label className="form-check-label" htmlFor="ya">Ya</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="transit_opsi" id="tidak" value="Tidak" />
                                                            <label className="form-check-label" htmlFor="tidak">Tidak</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="negara_transit">Negara Transit</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="negara_transit" className="form-control form-control-sm" placeholder="Negara Transit" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card card-action mb-4">
                                        <div className="card-header">
                                            <div className="card-action-title">
                                                <h5 className="mb-0">Pelabuhan</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="pel_muat">Muat / Asal</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="pel_muat" className="form-control form-control-sm" placeholder="Pelabuhan Muat / Asal" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="pel_bongkar">Bongkar / Tujuan</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="pel_bongkar" className="form-control form-control-sm" placeholder="Pelabuhan Bongkar / Tujuan" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="sandar">Sandar</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="sandar" className="form-control form-control-sm" placeholder="Lokasi Sandar" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="pel_transit">Pelabuhan Transit</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="pel_transit" className="form-control form-control-sm" placeholder="Pelabuhan Transit" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card card-action mb-4">
                                        <div className="card-header">
                                            <div className="card-action-title">
                                                <h5 className="mb-0">Pengangkutan Sebelum Transit</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="moda_transit">Moda Transportasi</label>
                                                    <div className="col-sm-9">
                                                        <select name="moda_transit" id="moda_transit" className="form-control form-control-sm">
                                                            <option value="">--</option>
                                                            <option value="1">Laut</option>
                                                            <option value="2">Kereta Api</option>
                                                            <option value="3">Jalan Raya</option>
                                                            <option value="4">Udara</option>
                                                            <option value="5">POS</option>
                                                            <option value="6">Multimoda</option>
                                                            <option value="7">Instalansi</option>
                                                            <option value="8">Perairan</option>
                                                            <option value="9">Lainnya</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tipe_transit">Tipe Transportasi</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="tipe_transit" className="form-control form-control-sm" placeholder="Tipe Transportasi" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="nama_alat_angkut_transit">Nama Alat Angkut</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="nama_alat_angkut_transit" className="form-control form-control-sm" placeholder="Nama Alat Angkut" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="nomor_alat_angkut_transit">Nomor Alat Angkut</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="nomor_alat_angkut_transit" className="form-control form-control-sm" placeholder="Nomor Alat Angkut" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="bendera_transit">Bendera</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="bendera_transit" className="form-control form-control-sm" placeholder="Bendera" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tgl_berangkat_transit">Tgl Berangkat</label>
                                                    <div className="col-sm-4">
                                                        <input type="text" id="tgl_berangkat_transit" className="form-control form-control-sm" placeholder="Tgl Berangkat" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tgl_tiba_transit">Tgl Tiba</label>
                                                    <div className="col-sm-4">
                                                        <input type="text" id="tgl_tiba_transit" className="form-control form-control-sm" placeholder="Tgl Tiba" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card card-action mb-4">
                                        <div className="card-header">
                                            <div className="card-action-title">
                                                <h5 className="mb-0">Pengangkutan Terakhir</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="moda_akhir">Moda Transportasi</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="moda_akhir" className="form-control form-control-sm" placeholder="Negara Asal" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tipe_akhir">Tipe Transportasi</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="tipe_akhir" className="form-control form-control-sm" placeholder="Tipe Transportasi" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="nama_alat_angkut_akhir">Nama Alat Angkut</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="nama_alat_angkut_akhir" className="form-control form-control-sm" placeholder="Nama Alat Angkut" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="nomor_alat_angkut_akhir">Nomor Alat Angkut</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="nomor_alat_angkut_akhir" className="form-control form-control-sm" placeholder="Nomor Alat Angkut" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="bendera_akhir">Bendera</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="bendera_akhir" className="form-control form-control-sm" placeholder="Bendera" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tgl_berangkat_akhir">Tgl Berangkat</label>
                                                    <div className="col-sm-4">
                                                        <input type="text" id="tgl_berangkat_akhir" className="form-control form-control-sm" placeholder="Tgl Berangkat" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-3 col-form-label" htmlFor="tgl_tiba_akhir">Tgl Tiba</label>
                                                    <div className="col-sm-4">
                                                        <input type="text" id="tgl_tiba_akhir" className="form-control form-control-sm" placeholder="Tgl Tiba" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="card card-action mb-4">
                                        <div className="card-header">
                                            <div className="card-action-title">
                                                <h5 className="mb-0">Apakah ada Kontainer ?</h5>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="cek_kontainer" id="ya" value="Ya" />
                                                    <label className="form-check-label" htmlFor="ya">Ya</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="cek_kontainer" id="tidak" value="Tidak" />
                                                    <label className="form-check-label" htmlFor="tidak">Tidak</label>
                                                </div>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="card-body pt-0">
                                                <div className="row g-3 mb-3">
                                                    <div className="col-md-6">
                                                        <button type="button" className="btn btn-xs btn-primary">Tambah Kontainer</button>
                                                    </div>
                                                    <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Nomor Kontainer</th>
                                                                <th>Size</th>
                                                                <th>Stuff</th>
                                                                <th>Tipe</th>
                                                                <th>Segel</th>
                                                                <th>Act</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                            <i className="bx bx-dots-vertical-rounded"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu">
                                                                            <a className="dropdown-item" href="#"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                            <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>2</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                            <i className="bx bx-dots-vertical-rounded"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu">
                                                                            <a className="dropdown-item" href="#"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                            <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                        <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                                        <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={() => setWizardPage(wizardPage + 1)}>
                                        <span className="d-sm-inline-block d-none me-sm-1">Selanjutnya</span>
                                        <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Payment --> */}
                        <div id="cardKomoditas" className={wizardPage === 3 ? "content active dstepper-block" : "content"}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card card-action mb-4">
                                        <div className="card-header">
                                            <div className="card-action-title">
                                                <h5 className="mb-0">Uraian</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="card-body pt-0">
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="media_pembawa">Media Pembawa</label>
                                                            <div className="col-sm-4">
                                                                <select name="media_pembawa" id="media_pembawa" className="form-control form-control-sm">
                                                                    <option value="">--</option>
                                                                    <option value="H">Hewan</option>
                                                                    <option value="I">Ikan</option>
                                                                    <option value="T">Tumbuhan</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="jenis_mp">Jenis Media Pembawa</label>
                                                            <div className="col-sm-9">
                                                                {/* <!-- Hewan --> */}
                                                                {/* <!-- <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="jenis_mp" id="hidup" value="Hidup" />
                                                                <label className="form-check-label" htmlFor="hidup">Hewan Hidup</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="jenis_mp" id="produk" value="Produk" />
                                                                <label className="form-check-label" htmlFor="produk">Produk Hewan</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="jenis_mp" id="mpl" value="Mpl" />
                                                                <label className="form-check-label" htmlFor="mpl">Media Pembawa Lain</label>
                                                            </div> --> */}
                                                                {/* <!-- Ikan --> */}
                                                                {/* <!-- <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="jenis_mp" id="hidup" value="Hidup" />
                                                                <label className="form-check-label" htmlFor="hidup">Ikan Hidup</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="jenis_mp" id="produk" value="Produk" />
                                                                <label className="form-check-label" htmlFor="produk">Produk Ikan</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="jenis_mp" id="mpl" value="Mpl" />
                                                                <label className="form-check-label" htmlFor="mpl">Media Pembawa Lain</label>
                                                            </div> --> */}
                                                                {/* <!-- Tumbuhan --> */}
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="radio" name="jenis_mp" id="benih" value="Benih" />
                                                                    <label className="form-check-label" htmlFor="benih">Benih</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="radio" name="jenis_mp" id="nonbenih" value="Non Benih" />
                                                                    <label className="form-check-label" htmlFor="nonbenih">Non Benih</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <!-- Khusus Tumbuhan --> */}
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="jenis_angkut">Jenis Angkut</label>
                                                            <div className="col-sm-9">
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="radio" name="jenis_angkut" id="curah" value="Curah" />
                                                                    <label className="form-check-label" htmlFor="curah">Curah</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="radio" name="jenis_angkut" id="noncurah" value="Non Curah" />
                                                                    <label className="form-check-label" htmlFor="noncurah">Non Curah</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="peruntukan">Peruntukan</label>
                                                            <div className="col-sm-4">
                                                                <select name="peruntukan" id="peruntukan" className="form-control form-control-sm">
                                                                    <option value="">--</option>
                                                                    <option value="1">Ditanam/Budidaya/Peningkatan Mutu Genetik</option>
                                                                    <option value="2">Konsumsi</option>
                                                                    <option value="3">Penelitian</option>
                                                                    <option value="4">Pameran/Kontes</option>
                                                                    <option value="5">Perdagangan</option>
                                                                    <option value="6">Bahan Baku</option>
                                                                    <option value="99">Lainnya</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-sm-5">
                                                                <input type="text" id="peruntukan_lain" name="peruntukan_lain" className="form-control form-control-sm" placeholder="Peruntukan Lainnya.." />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="tingkat_olah">Tingkat Pengolahan</label>
                                                            <div className="col-sm-9">
                                                                <div className="col-sm-9">
                                                                    <div className="form-check form-check-inline">
                                                                        <input className="form-check-input" type="radio" name="sudah_olah" id="sudah_olah" value="1" />
                                                                        <label className="form-check-label" htmlFor="sudah_olah">Sudah Diolah</label>
                                                                    </div>
                                                                    <div className="form-check form-check-inline">
                                                                        <input className="form-check-input" type="radio" name="transit_opsi" id="belum_olah" value="0" />
                                                                        <label className="form-check-label" htmlFor="belum_olah">Belum Olah</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="card-body pt-0">
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="jenis_kemasan">Jenis Kemasan</label>
                                                            <div className="col-sm-5">
                                                                <select name="jenis_kemasan" id="jenis_kemasan" className="form-control form-control-sm">
                                                                    <option value="">--</option>
                                                                    <option value="1">Bundle</option>
                                                                    <option value="2">Bag</option>
                                                                    <option value="3">Box</option>
                                                                    <option value="99">Dst</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="jumlah_kemasan">Jumlah Kemasan</label>
                                                            <div className="col-sm-5">
                                                                <input type="text" id="jumlah_kemasan" name="jumlah_kemasan" className="form-control form-control-sm" placeholder="Jumlah Kemasan" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="tanda_kemasan">Tanda pada Kemasan</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="tanda_kemasan" name="tanda_kemasan" className="form-control form-control-sm" placeholder="Tanda Kemasan" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="nomor_kemasan">Tanda pada Kemasan</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="nomor_kemasan" name="nomor_kemasan" className="form-control form-control-sm" placeholder="Tanda Kemasan" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-sm-3 col-form-label" htmlFor="nilai_barang">Nilai Barang</label>
                                                            <div className="col-sm-9">
                                                                <input type="text" id="nilai_barang" name="nilai_barang" className="form-control form-control-sm" placeholder="Nilai Barang" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card card-action mb-4">
                                        <div className="card-header">
                                            <div className="card-action-title">
                                                <h5 className="mb-0">Detil Media Pembawa</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="card-body pt-0">
                                                        <div className="row g-3 mb-3">
                                                            <div className="col-sm-6">
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-4 col-form-label" htmlFor="nama_tercetak">Nama Tercetak</label>
                                                                    <div className="col-sm-8">
                                                                        <input type="text" id="nama_tercetak" name="nama_tercetak" className="form-control form-control-sm" placeholder="Nama Tercetak" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="row mb-3">
                                                                    <label className="col-sm-4 col-form-label" htmlFor="nama_latin_tc">Nama Latin Tercetak</label>
                                                                    <div className="col-sm-8">
                                                                        <input type="text" id="nama_latin_tc" name="nama_latin_tc" className="form-control form-control-sm" placeholder="Nama Latin Tercetak" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <div className="row mb-2">
                                                                    <label className="col-sm-2 col-form-label" htmlFor="bentuk_jumlah_tc">Bentuk, Jumlah Tercetak</label>
                                                                    <div className="col-sm-4">
                                                                        <input type="text" id="bentuk_jumlah_tc" name="bentuk_jumlah_tc" className="form-control form-control-sm" placeholder="Bentuk, Jumlah Tercetak" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <button type="button" className="btn btn-xs btn-primary">Tambah Komoditas</button>
                                                            </div>
                                                            <div className="table-responsive text-nowrap">
                                                                <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>No</th>
                                                                            <th>Kode HS</th>
                                                                            <th>Klasifikasi</th>
                                                                            <th>Komoditas Umum</th>
                                                                            <th>Komoditas En/Latin</th>
                                                                            <th>Netto</th>
                                                                            <th>Satuan</th>
                                                                            <th>Bruto</th>
                                                                            <th>Satuan</th>
                                                                            <th>Jumlah</th>
                                                                            <th>Satuan</th>
                                                                            <th>Jantan</th>
                                                                            <th>Betina</th>
                                                                            <th>Breed</th>
                                                                            <th>Asal</th>
                                                                            <th>Keterangan</th>
                                                                            <th>Harga</th>
                                                                            <th>Mata Uang</th>
                                                                            <th>Act</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>1</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>
                                                                                <div className="dropdown">
                                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                                                    </button>
                                                                                    <div className="dropdown-menu">
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>2</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>
                                                                                <div className="dropdown">
                                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                                                    </button>
                                                                                    <div className="dropdown-menu">
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                        <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                                        <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={() => setWizardPage(wizardPage + 1)}>
                                        <span className="d-sm-inline-block d-none me-sm-1">Selanjutnya</span>
                                        <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Confirmation --> */}
                        <div id="cardDokumen" className={wizardPage === 4 ? "content active dstepper-block" : "content"}>
                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    <div className="card card-action mb-4">
                                        <div className="card-header">
                                            <div className="card-action-title">
                                                <h5 className="mb-0">Detil Dokumen</h5>
                                            </div>
                                            <div className="card-action-element">
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="#" className="card-collapsible"><i className="tf-icons bx bx-chevron-up"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="collapse show">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="card-body pt-0">
                                                        <div className="row g-3 mb-3">
                                                            <div className="col-md-6">
                                                                <button type="button" className="btn btn-xs btn-primary">Tambah Dokumen</button>
                                                            </div>
                                                            <div className="table-responsive text-nowrap">
                                                                <table className="table table-sm table-bordered table-hover table-striped dataTable">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>No</th>
                                                                            <th>Jenis Dokumen</th>
                                                                            <th>No Dokumen</th>
                                                                            <th>Tgl Dokumen</th>
                                                                            <th>Asal Penerbit</th>
                                                                            <th>Keterangan</th>
                                                                            <th>File</th>
                                                                            <th>Act</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>1</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>
                                                                                <div className="dropdown">
                                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                                                    </button>
                                                                                    <div className="dropdown-menu">
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>2</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>
                                                                                <div className="dropdown">
                                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                                                    </button>
                                                                                    <div className="dropdown-menu">
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-edit-alt me-1"></i> Edit</a>
                                                                                        <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i> Delete</a>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setWizardPage(wizardPage - 1)}>
                                        <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                                        <span className="d-sm-inline-block d-none">Sebelumnya</span>
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={() => setWizardPage(wizardPage + 1)}>
                                        <span className="d-sm-inline-block d-none me-sm-1">Konfirmasi</span>
                                        <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="cardKonfirmasi" className={wizardPage === 5 ? "content active dstepper-block" : "content"}>
                            <div className="row mb-3">
                                <div className="col-12 col-lg-8 offset-lg-2 text-center mb-3">
                                    <h4 className="mt-2">Terimakasih! 😇</h4>
                                    <p>Silahkan cek kembali kelengkapan data yang diinput!</p>
                                    <p>
                                        Silahkan klik tombol Simpan jika data yang diinput sudah benar.
                                    </p>
                                </div>
                                <div className="col-12 d-flex justify-content-between">
                                    <button type="button" className="btn btn-primary btn-prev" onClick={() => setWizardPage(wizardPage - 1)}>
                                        <i className="bx bx-chevron-left bx-sm ms-sm-n2"></i>
                                        <span className="d-sm-inline-block d-none">Cek Kembali</span>
                                    </button>
                                    <button type="submit" className="btn btn-success">
                                        <i className="bx bx-save bx-sm"></i>
                                        <span className="d-sm-inline-block d-none me-sm-1">Simpan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default DocK11