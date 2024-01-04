import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MasterKota from "../../model/master/MasterKota";
import Select from "react-select";
import Negara from "../../model/array/Negara";
import MasterProv from "../../model/master/MasterProv";
import MasterNegara from "../../model/master/MasterNegara";

const DataDiri1 = (props) => {
    let [dataDiri, setDataDiri] = useState({});
   
    const handleDataDiri = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDataDiri(values => ({...values, [name]: value}))
    }
  const navigate = useNavigate();
  const { user } = props;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    props.updateUser(data);
    navigate("/second");
  };

  return (
    <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
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
                              <label className="col-sm-3 col-form-label" htmlFor="permohonan">Jenis Permohonan*</label>
                              <div className="col-sm-9">
                                  <select className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="permohonan" id="permohonan" {...register("permohonan", { required: "Mohon pilih jenis permohonan."})} value={dataDiri.permohonan || ""} onChange={handleDataDiri}>
                                      <option value="">--</option>
                                      <option value="E">Ekspor</option>
                                      <option value="I">Impor</option>
                                      <option value="M">Domestik Masuk</option>
                                      <option value="K">Domestik Keluar</option>
                                  </select>
                                  {errors.permohonan && <small className="text-danger">{errors.permohonan.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="pJRutin">Pengguna Jasa Rutin*</label>
                              <div className="col-sm-9">
                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="pJRutin" id="ya" value="Ya" {...register("pJRutin", { required: "Mohon pilih jenis pengguna jasa."})} />
                                      <label className="form-check-label" htmlFor="ya">Ya</label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="pJRutin" id="tidak" value="Tidak"  {...register("pJRutin")}/>
                                      <label className="form-check-label" htmlFor="tidak">Tidak</label>
                                  </div>
                                  {errors.pJRutin && <><br/><small className="text-danger">{errors.pJRutin.message}</small></>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="namaPemohon">Nama*</label>
                              <div className="col-sm-9">
                                  <input type="text" id="namaPemohon" name="namaPemohon" {...register("namaPemohon", { required: "Mohon isi nama pemohon."})} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Pemohon" />
                                  {errors.namaPemohon && <small className="text-danger">{errors.namaPemohon.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamatPemohon">Alamat*</label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamatPemohon" name="alamatPemohon" {...register("alamatPemohon", { required: "Mohon isi alamat pemohon."})} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Pemohon" />
                                  {errors.alamatPemohon && <small className="text-danger">{errors.alamatPemohon.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="provPemohon">Provinsi*</label>
                              <div className="col-sm-9">
                                    <select name="provPemohon" id="provPemohon" {...register("provPemohon", { required: "Mohon pilih provinsi pemohon."})} value={dataDiri.provPemohon} onChange={handleDataDiri} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                        <option value="">--</option>
                                        <MasterProv/>
                                    </select>
                                    {errors.provPemohon && <small className="text-danger">{errors.provPemohon.message}</small>}
                                  {/* <input type="text" id="prov_pemohon" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Kota Pemohon" /> */}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="kotaPemohon">Kota/Kabupaten*</label>
                              <div className="col-sm-9">
                                    <select name="kotaPemohon" id="kotaPemohon" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} {...register("kotaPemohon", { required: "Mohon pilih kota pemohon."})}>
                                        <option value="">--</option>
                                        <MasterKota idData={dataDiri.provPemohon} />
                                    </select>
                                    {errors.kotaPemohon && <small className="text-danger">{errors.kotaPemohon.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nomorTlp">No. Telepon</label>
                              <div className="col-sm-9">
                                  <input type="number" id="nomorTlp" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="No. Telepon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="emailPemohon">Email*</label>
                              <div className="col-sm-9">
                                  <input type="email" id="emailPemohon" name="emailPemohon" {...register("emailPemohon", { required: "Mohon isi email pemohon."})} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Email" />
                                  {errors.emailPemohon && <small className="text-danger">{errors.emailPemohon.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="jenisIdentitasPemohon">Identitas*</label>
                              <div className="col-sm-2">
                                  <select className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisIdentitasPemohon" id="jenisIdentitasPemohon" {...register("jenisIdentitasPemohon", { required: true})}>
                                      <option value="KTP">KTP</option>
                                      <option value="NPWP">NPWP</option>
                                  </select>
                              </div>
                                {errors.noIdentitasPemohon && <small className="text-danger">{errors.noIdentitasPemohon.message}</small>}
                              <div className="col-sm-7">
                                  <input type="text" name="noIdentitasPemohon" id="noIdentitasPemohon" {...register("noIdentitasPemohon", { required: "Mohon isi identitas pemohon."})} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Identitas" />
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
                              <label className="col-sm-3 col-form-label" htmlFor="namaTtd">Nama*</label>
                              <div className="col-sm-9">
                                  <input type="text" id="namaTtd" name="namaTtd" {...register("namaTtd", { required: "Mohon isi nama penandatangan."})} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Penandatangan" />
                                  {errors.namaTtd && <small className="text-danger">{errors.namaTtd.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamatTtd">Alamat*</label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamatTtd" name="alamatTtd" {...register("alamatTtd", { required: "Mohon isi nama penandatangan."})} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Penandatangan" />
                                  {errors.alamatTtd && <small className="text-danger">{errors.alamatTtd.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="jenisIdentitasTtd">Identitas*</label>
                              <div className="col-sm-2">
                                  <select className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisIdentitasTtd" id="jenisIdentitasTtd" {...register("jenisIdentitasTtd", { required: true})}>
                                      <option value="KTP">KTP</option>
                                      <option value="NPWP">NPWP</option>
                                  </select>
                              </div>
                              <div className="col-sm-7">
                                  <input type="text" id="noIdentitasTtd" name="noIdentitasTtd" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} {...register("noIdentitasTtd", { required: "Mohon isi identitas penandatangan."})} placeholder="Nomor Identitas" />
                                  {errors.noIdentitasTtd && <small className="text-danger">{errors.noIdentitasTtd.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="jabatanTtd">Jabatan</label>
                              <div className="col-sm-9">
                                  <input type="text" id="jabatanTtd" name="jabatanTtd" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Jabatan" />
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
                              <label className="col-sm-3 col-form-label" htmlFor="namaCp">Nama</label>
                              <div className="col-sm-9">
                                  <input type="text" id="namaCp" name="namaCp" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Contact Person" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3" htmlFor="alamatCp">Alamat</label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamatCp" name="alamatCp" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Contact Person" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="teleponCp">Telepon</label>
                              <div className="col-sm-9">
                                  <input type="text" id="teleponCp" name="teleponCp" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Telepon Contact Person" />
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
                              <label className="col-sm-3 col-form-label" htmlFor="namaPengirim">Nama*</label>
                              <div className="col-sm-9">
                                  <input type="text" id="namaPengirim" name="namaPengirim" {...register("namaPengirim", { required: "Mohon isi nama pengirim."})} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Pengirim" />
                                  {errors.namaPengirim && <small className="text-danger">{errors.namaPengirim.message}</small>}
                                  {/* {errors.namaPengirim?.type === "required" && ( <small className="text-danger">{errors.namaPengirim.message}</small> )} */}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamatPengirim">Alamat*</label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamatPengirim" name="alamatPengirim" {...register("namaPengirim", { required: "Mohon isi alamat pengirim."})} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Pengirim" />
                                  {errors.alamatPengirim && <small className="text-danger">{errors.alamatPengirim.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="identitas">Identitas*</label>
                              <div className="col-sm-2">
                                  <select className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisIdentitasPengirim" id="jenisIdentitasPengirim" {...register("jenisIdentitasPengirim", { required: true})}>
                                      <option value="KTP">KTP</option>
                                      <option value="NPWP">NPWP</option>
                                  </select>
                              </div>
                              <div className="col-sm-7">
                                  <input type="text" id="noIdentitasPengirim" name="noIdentitasPengirim" {...register("noIdentitasPengirim", { required: "Mohon isi identitas pengirim."})} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Identitas" />
                                  {errors.noIdentitasPengirim && <small className="text-danger">{errors.noIdentitasPengirim.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nomorTlpPengirim">No. Telepon</label>
                              <div className="col-sm-9">
                                  <input type="number" id="nomorTlpPengirim" name="nomorTlpPengirim" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="No. Telepon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="negaraPengirim">Negara*</label>
                              <div className="col-sm-9">
                              {/* <Controller
                                name="negaraPengirim"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <select {...field} id="negaraPengirim" name="negaraPengirim" value={dataDiri.negaraPengirim || ""} onChange={handleDataDiri} className="form-control select2 form-control-sm">
                                <option value="">--</option>
                                <MasterNegara/>
                                </select>
            )}
          /> */}
                                <select id="negaraPengirim" name="negaraPengirim" {...register("negaraPengirim", { required: "Mohon pilih negara pengirim."})} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                    <option value="">--</option>
                                    <MasterNegara/>
                                </select>
                                {errors.negaraPengirim && <small className="text-danger">{errors.negaraPengirim.message}</small>}
                              </div>
                          </div>
                          <div style={{visibility: dataDiri.permohonan === 'I' ? 'hidden' : 'visible'}}>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="provPengirim">Provinsi</label>
                                <div className="col-sm-9">
                                    <select id="provPengirim" name="provPengirim" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                      <option value="">--</option>
                                    </select>  
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="kotaPengirim">Kota/Kabupaten</label>
                                <div className="col-sm-9">
                                  <select id="kotaPengirim" name="kotaPengirim" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}>
                                      <option value="">--</option>
                                  </select>
                                </div>
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
                              <label className="col-sm-3 col-form-label" htmlFor="namaPenerima">Nama*</label>
                              <div className="col-sm-9">
                                  <input type="text" id="namaPenerima" name="namaPenerima" {...register("namaPenerima", { required: "Mohon isi negara penerima."})} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nama Penerima" />
                                  {errors.namaPenerima && <small className="text-danger">{errors.namaPenerima.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="alamatPenerima">Alamat*</label>
                              <div className="col-sm-9">
                                  <input type="text" id="alamatPenerima" name="alamatPenerima" {...register("alamatPenerima", { required: "Mohon isi alamat penerima."})} className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Alamat Penerima" />
                                  {errors.alamatPenerima && <small className="text-danger">{errors.alamatPenerima.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="jenisIdentitasPenerima">Identitas*</label>
                              <div className="col-sm-2">
                                  <select className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} name="jenisIdentitasPenerima" id="jenisIdentitasPenerima" {...register("jenisIdentitasPenerima", { required: true})}>
                                      <option value="KTP">KTP</option>
                                      <option value="NPWP">NPWP</option>
                                  </select>
                              </div>
                              <div className="col-sm-7">
                                  <input type="text" id="noIdentitasPenerima" name="noIdentitasPenerima" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Nomor Identitas" {...register("noIdentitasPenerima", { required: true})} />
                                  {errors.noIdentitasPenerima && <small className="text-danger">{errors.noIdentitasPenerima.message}</small>}
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="nomorTlpPenerima">No. Telepon</label>
                              <div className="col-sm-9">
                                  <input type="number" id="nomorTlpPenerima" name="nomorTlpPenerima" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="No. Telepon" />
                              </div>
                          </div>
                          <div className="row mb-3">
                              <label className="col-sm-3 col-form-label" htmlFor="negaraPenerima">Negara*</label>
                              <div className="col-sm-9">
                                <select id="negaraPenerima" name="negaraPenerima" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} {...register("negaraPenerima", { required: "Mohon pilih negara penerima."})}>
                                    <option value="">--</option>
                                    <MasterNegara/>
                                </select>
                                {errors.negaraPenerima && <small className="text-danger">{errors.negaraPenerima.message}</small>}
                              </div>
                          </div>
                          <div style={{visibility: dataDiri.permohonan === 'E' ? 'hidden' : 'visible'}}>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="provPenerima">Provinsi</label>
                                <div className="col-sm-9">
                                    <select id="provPenerima" name="provPenerima" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Kota Penerima">
                                        <option value="">--</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" htmlFor="kotaPenerima">Kota/Kabupaten</label>
                                <div className="col-sm-9">
                                    <select id="kotaPenerima" name="kotaPenerima" className={errors.permohonan ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} placeholder="Kota Penerima">
                                        <option value="">--</option>
                                    </select>
                                </div>
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
              <button type="submit" className="btn btn-primary" onClick={() => setWizardPage(wizardPage + 1)}>
                  <span className="d-sm-inline-block d-none me-sm-1">Selanjutnya</span>
                  <i className="bx bx-chevron-right bx-sm me-sm-n2"></i>
              </button>
          </div>
      </div>
      </motion.div>
    </form>
  );
};

export default DataDiri1;
