import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function DocKT1() {
    let [data, setData] = useState({
        noAju: "",
        noIdPtk: "",
        noDokumen: "",
        tglDokumen: "",
    })

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        KT-1 <span className="fw-light" style={{color: 'blue'}}>PHYTOSANITARY FOR EXPORT</span>
    </h4>
    
    <div className="row">
        <div className="col-xxl">
            <div className="card card-action mb-4">
                <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                    <div className="card-action-title">
                        <div className='row'>
                            <label className="col-sm-1 col-form-label text-sm-end" htmlFor="noDok"><b>No PTK</b></label>
                            <div className="col-sm-3">
                                <input type="text" id="noDok" value={data.noDokumen || ""} className="form-control form-control-sm" placeholder="Nomor PTK" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noSurtug"><b>No Surat Tugas</b></label>
                            <div className="col-sm-3">
                                <input type="text" id="noSurtug" value={data.noSurtug || ""} className="form-control form-control-sm" placeholder="Nomor Surat Tugas" disabled />
                            </div>
                            <label className="col-sm-1 col-form-label" htmlFor="tglSurtug"><b>Tanggal</b></label>
                            <div className="col-sm-2">
                                <input type="text" id='tglSurtug' value={data.tglSurtug || ""} className='form-control form-control-sm' disabled/>
                            </div>
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
                <div className="card-body">
                <div className="col-md-12 mt-3">
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noDok52">{data.kegiatan === 'EX' ? "Doc Number" : "Nomor Dokumen"}</label>
                                <div className="col-sm-3">
                                    <input type="text" id="noDok52" name='noDok52' {...register("noDok52")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-5.2" disabled />
                                </div>
                                <label className="col-sm-2 col-form-label text-sm-end" htmlFor="tglDok52">{data.kegiatan === 'EX' ? "Date" : "Tanggal"} <span className='text-danger'>*</span></label>
                                <div className="col-sm-2">
                                    <input type="datetime-local" id="tglDok52" name='tglDok52' {...register("tglDok52", {required: "Mohon isi tanggal dokumen."})} className={errors.tglDok52 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                    {/* {errors.tglDok52 && <small className="text-danger">{errors.tglDok52.message}</small>} */}
                                </div>
                            </div>
                        </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-username">Nomor Dokumen</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-username" className="form-control form-control-sm" placeholder="" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-birthdate">Tgl Dokumen</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-birthdate" className="form-control form-control-sm dob-picker" placeholder="YYYY-MM-DD" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-username">To Plant Protection Organization(s) of</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-username" className="form-control form-control-sm" placeholder="" />
                        </div>
                    </div>
                    
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal">1. Description of Consignment</h6>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-username">Name of Exporter</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-username" className="form-control form-control-sm" placeholder="" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-full-name">Address of Exporter</label>
                        <div className="col-sm-9">
                            <textarea name="collapsible-address" className="form-control form-control-sm" id="collapsible-address" rows="4" placeholder=""></textarea>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-username">Declared Name of Consignee</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-username" className="form-control form-control-sm" placeholder="" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-full-name">Address of Consignee</label>
                        <div className="col-sm-9">
                            <textarea name="collapsible-address" className="form-control form-control-sm" id="collapsible-address" rows="4" placeholder=""></textarea>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-full-name">Declared means of conveyance</label>
                        <div className="col-sm-9">
                            <textarea name="collapsible-address" className="form-control form-control-sm" id="collapsible-address" rows="4" placeholder=""></textarea>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-username">Declared Point of Entry</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-username" className="form-control form-control-sm" placeholder="" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-username">HS Code</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-username" className="form-control form-control-sm" placeholder="" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-username">Place of Origin</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-username" className="form-control form-control-sm" placeholder="" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-full-name">Distinguishing Marks</label>
                        <div className="col-sm-9">
                            <textarea name="collapsible-address" className="form-control form-control-sm" id="collapsible-address" rows="4" placeholder=""></textarea>
                        </div>
                    </div>

                    <div className="card">
                        <h6 className="card-header">Number and description of packages, name of produce, and botanical name of plants</h6>
                        <div className="table-responsive text-nowrap">
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Name of Product</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    <tr>
                                        {/* <!-- <td><strong>xxxxxxxxxxxx</strong></td>
                                        <td>xxxxxxxxxx</td>
                                        <td>xxxxxxxx</td>
                                        <td><span className="badge bg-label-primary me-1">Active</span></td>
                                        <td>
                                            <div className="dropdown">
                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                        <i className="bx bx-edit-alt me-1"></i> Edit
                                                    </a>
                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                        <i className="bx bx-trash me-1"></i> Delete
                                                    </a>
                                                </div>
                                            </div>
                                        </td> --> */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-3 fw-normal">2. Additional Declaration</h6>
                    <div className="row mb-3">
                        <div className="col-sm-12">
                            <textarea name="collapsible-address" className="form-control form-control-sm" id="collapsible-address" rows="4" placeholder=""></textarea>
                        </div>
                    </div>

                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-3 fw-normal">3. Disinfestation and/or Disinfection Treatment</h6>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-full-name">Treatment</label>
                        <div className="col-sm-9">
                            <select id="treatment" className="form-select" data-allow-clear="true">
                                <option value="">Select</option>
                                <option value="-">-</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-birthdate">Date</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-birthdate" className="form-control form-control-sm dob-picker" placeholder="YYYY-MM-DD" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-full-name">Chemical (active ingredient)</label>
                        <div className="col-sm-9">
                            <select id="chemical" className="form-select" data-allow-clear="true">
                                <option value="">Select</option>
                                <option value="-">-</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-full-name">Concentration</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-full-name" className="form-control form-control-sm" placeholder="" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-full-name">Duration and temperature</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-full-name" className="form-control form-control-sm" placeholder="" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-full-name">Additional Information</label>
                        <div className="col-sm-9">
                            <textarea name="collapsible-address" className="form-control form-control-sm" id="collapsible-address" rows="4" placeholder=""></textarea>
                        </div>
                    </div>

                    <hr className="my-4 mx-n4" />
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-full-name">Name of Authorized Officer</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-full-name" className="form-control form-control-sm" placeholder="" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-full-name">Place of issue</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-full-name" className="form-control form-control-sm" placeholder="" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="multicol-birthdate">Date of issue</label>
                        <div className="col-sm-9">
                            <input type="text" id="multicol-birthdate" className="form-control form-control-sm dob-picker" placeholder="YYYY-MM-DD" />
                        </div>
                    </div>
                    
                    <div className="pt-4">
                        <div className="row justify-content-end">
                            <div className="col-sm-9">
                                <button type="submit" className="btn btn-primary me-sm-2 me-1">Submit</button>
                                <button type="reset" className="btn btn-label-secondary me-sm-2 me-1">Cancel</button>
                                <a href={require("../../../dok/kt1.pdf")} rel="noopener noreferrer" target='_blank' className="btn btn-warning"><i className="bx bx-printer bx-xs"></i>&nbsp; Print</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default DocKT1