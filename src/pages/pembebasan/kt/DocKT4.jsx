import React from 'react'

function DocKT4() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Pembebasan/</span> KT-4 (CERTIFICATE FOR EXPORT OF PROCESSED PRODUCT/NON-REGULATED ARTICLE)
    </h4>
    
    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
            <form className="card-body">
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
                    <label className="col-sm-3 col-form-label" htmlFor="multicol-username">To</label>
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
                            <button type="reset" className="btn btn-label-secondary">Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default DocKT4