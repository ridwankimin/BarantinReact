/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import DataMasukTable from '../component/tabel/DataMasukTable'
import { useForm } from 'react-hook-form'
// import Cookies from 'js-cookie';

function datenow() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = yyyy + '-' + mm + '-' + dd;
  return today
}

function DataMasuk() {
  let [tabel, setTabel] = useState({})

  const {
    register: registerPtk,
    // setValue: setValuePtk,
    // watch: watchPtk,
    handleSubmit: handleFormPtk,
    formState: { errors: errorsPtk }
} = useForm({
  defaultValues: {
    dFrom: datenow(),
    dTo: datenow(),
  }
})

// const cekdataDokumen = watchPtk();

const onSubmitPtk = (data) => {
  const dataMasuk = <DataMasukTable dataIn={data} />;
  setTabel(values => ({...values, "ptk": dataMasuk }));
};

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h6 className="text-muted">PROSES DATA MASUK</h6>
                  <div className="card shadow-none border mb-3">
                    <div className="card-header border-bottom">
                      <ul className="nav nav-tabs card-header-tabs" role="tablist">
                        <li className="nav-item">
                          <button
                            type="button"
                            className="nav-link active"
                            role="tab"
                            data-bs-toggle="tab"
                            data-bs-target="#navs-justified-ppk-active"
                            aria-controls="navs-justified-ppk-active"
                            aria-selected="true">
                            PTK Online
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            type="button"
                            className="nav-link"
                            role="tab"
                            data-bs-toggle="tab"
                            data-bs-target="#navs-justified-ssm"
                            aria-controls="navs-justified-home"
                            aria-selected="false">
                            SSM
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            type="button"
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#navs-justified-dol"
                            aria-controls="navs-justified-dol"
                            role="tab"
                            aria-selected="false">
                            Domas Online
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            type="button"
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#navs-justified-nil"
                            aria-controls="navs-justified-nil"
                            role="tab"
                            aria-selected="false">
                            Nota Intelejen
                          </button>
                        </li>
                        <li className="nav-item">
                          <button
                            type="button"
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#navs-justified-str"
                            aria-controls="navs-justified-str"
                            role="tab"
                            aria-selected="false">
                            Serah Terima
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="navs-justified-ppk-active" role="tabpanel">
                        <form onSubmit={handleFormPtk(onSubmitPtk)}>
                          <div className='row'>
                              <div className='col-2'>
                                  <label htmlFor="dFrom">Tgl Awal</label>
                                  <input type="date" id='dFrom' name='dFrom' {...registerPtk("dFrom", { required: "Mohon isi tanggal awal.",})} className={errorsPtk.dFrom ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                  {errorsPtk.dFrom && <small className="text-danger">{errorsPtk.dFrom.message}</small>}                            
                              </div>
                              <div className='col-2'>
                                  <label htmlFor="dTo">Tgl Akhir</label>
                                  <input type="date" id='dTo' name='dTo' {...registerPtk("dTo", { required: "Mohon isi tanggal akhir.", })} className={errorsPtk.dTo ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}/>
                                  {errorsPtk.dTo && <small className="text-danger">{errorsPtk.dTo.message}</small>}                            
                              </div>
                              <div className='col-2'>
                                  <label htmlFor="search">Status Dokumen</label>
                                  <select name="search" id="search" {...registerPtk("search")} className='form-control form-control-sm'>
                                    <option value="AJU">Pengajuan</option>
                                    <option value="DRAFT">Draft</option>
                                    <option value="DOK">Verifikasi</option>
                                  </select>
                              </div>
                              <div className='col-1'>
                                  <label htmlFor="jenisKarantina">Karantina</label>
                                  <select name="jenisKarantina" id="jenisKarantina" {...registerPtk("jenisKarantina")} className='form-control form-control-sm'>
                                    <option value="">-Semua-</option>
                                    <option value="H">Hewan</option>
                                    <option value="I">Ikan</option>
                                    <option value="T">Tumbuhan</option>
                                  </select>
                              </div>
                              <div className='col-2'>
                                  <label htmlFor="jenisPermohonan">Jenis Permohonan</label>
                                  <select name="jenisPermohonan" id="jenisPermohonan" {...registerPtk("jenisPermohonan")} className='form-control form-control-sm'>
                                    <option value="">-Semua-</option>
                                    <option value="EX">Ekspor</option>
                                    <option value="IM">Impor</option>
                                    <option value="DM">Domestik Masuk</option>
                                    <option value="DK">Domestik Keluar</option>
                                    <option value="TR">Transit</option>
                                    <option value="RE">Re Ekspor</option>
                                    <option value="RI">Re Impor</option>
                                    {/* <option value="ST">Serah Terima</option> */}
                                  </select>
                              </div>
                              <input type="hidden" name="jenisDokumen" id="jenisDokumen" value="PTK" {...registerPtk("jenisDokumen")} />
                              <div className='col-1'>
                                  <button type='submit' style={{marginTop: '13px'}} className='btn btn-success'>Filter</button>
                              </div>
                          </div>
                        </form>
                        <hr />
                        {tabel.ptk ? tabel.ptk : null}
                      </div>
                      <div className="tab-pane fade" id="navs-justified-ssm" role="tabpanel">
                        <h4 className="card-title">Special link title</h4>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" className="btn btn-secondary">Go somewhere</a>
                      </div>
                      <div className="tab-pane fade" id="navs-justified-dol" role="tabpanel">
                        <h4 className="card-title">Special link title</h4>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" className="btn btn-secondary">Go somewhere</a>
                      </div>
                      <div className="tab-pane fade" id="navs-justified-nil" role="tabpanel">
                        <h4 className="card-title">Special link title</h4>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" className="btn btn-secondary">Go somewhere</a>
                      </div>
                      <div className="tab-pane fade" id="navs-justified-str" role="tabpanel">
                        <h4 className="card-title">Special link title</h4>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" className="btn btn-secondary">Go somewhere</a>
                      </div>
                    </div>
                  </div>
</div>
  )
}

export default DataMasuk