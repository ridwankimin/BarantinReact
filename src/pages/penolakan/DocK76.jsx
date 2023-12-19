import React from 'react'

function DocK76() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-7.6 <span className="text-muted fw-light">(NOTIFICATION OF NON-COMPLIANCE)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">PEMILIK</h5> --> */}
                <form className="card-body">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="nomor_k76">Nomor K-7.6</label>
                        <div className="col-sm-4">
                            <input type="text" id="nomor_k76" className="form-control form-control-sm" placeholder="Nomor K-7.6" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label" htmlFor="tanggal_k76">Tanggal</label>
                        <div className="col-sm-4">
                            <input type="text" id="tanggal_k76" className="form-control form-control-sm" placeholder="Tanggal K-7.6" disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="tujuan_surat">To</label>
                        <div className="col-sm-10">
                            <input type="text" id="tujuan_surat" className="form-control form-control-sm" placeholder="Tujuan Surat" disabled />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal">DESCRIPTION OF THE CONSIGNMENT</h6>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="common_name">English/Common Name</label>
                        <div className="col-sm-9">
                            <input type="text" id="common_name" placeholder="English/Common Name" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="botanical_name">Botanical name*</label>
                        <div className="col-sm-9">
                            <input type="text" id="botanical_name" placeholder="Botanical name" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="hs_code">HS Code</label>
                        <div className="col-sm-9">
                            <input type="text" id="hs_code" placeholder="HS Code" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="qty_declared">Quantity declared</label>
                        <div className="col-sm-9">
                            <input type="text" id="qty_declared" placeholder="Quantity declared" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="packing">Packing Unit</label>
                        <div className="col-sm-9">
                            <input type="text" id="packing" placeholder="Packing Unit" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="packages">Number and description of packages</label>
                        <div className="col-sm-4">
                            <input type="text" id="no_packages" placeholder="Number packages" className="form-control form-control-sm" />
                        </div>
                        <div className="col-sm-5">
                            <input type="text" id="desc_packages" placeholder="Description packages" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="marks">Distinguishing marks</label>
                        <div className="col-sm-9">
                            <input type="text" id="marks" placeholder="Distinguishing marks" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="origin">Country/Place of origin</label>
                        <div className="col-sm-9">
                            <input type="text" id="origin" placeholder="Country/Place of origin" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="consignor">Consignor</label>
                        <div className="col-sm-9">
                            <input type="text" id="consignor" placeholder="Consignor" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="consignee">Consignee</label>
                        <div className="col-sm-9">
                            <input type="text" id="consignee" placeholder="Consignee" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="no_doc_att">Number and date of the accompanying document(s)</label>
                        <div className="col-sm-5">
                            <input type="text" id="no_doc_att" placeholder="Number of the accompanying document(s)" className="form-control form-control-sm" />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="date_doc_att" placeholder="Date of the accompanying document(s)" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="port_export">Port of export</label>
                        <div className="col-sm-9">
                            <input type="text" id="port_export" placeholder="Port of export" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="point_entry">Point of entry</label>
                        <div className="col-sm-9">
                            <input type="text" id="point_entry" placeholder="Point of entry" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label" htmlFor="conveyance">Declared means of conveyance</label>
                        <div className="col-sm-9">
                            <input type="text" id="conveyance" placeholder="Declared means of conveyance" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal">NATURE OF NON-COMPLIANCE*)</h6>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="complience1" />
                        <label className="form-check-label" htmlFor="complience1">
                            Prohibited goods:
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="complience2" />
                        <label className="form-check-label" htmlFor="complience2">
                            Problem with documentation (specify):
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="complience3" />
                        <label className="form-check-label" htmlFor="complience3">
                            The goods were infected/infested/contaminated with the following regulated pests or prohibited articles (specify):
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="complience4" />
                        <label className="form-check-label" htmlFor="complience4">
                            The goods do not comply with Indonesia&#39;s food safety/quality requirements (specify):
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="complience5" />
                        <label className="form-check-label" htmlFor="complience5">
                            The goods do not comply with other Indonesia&#39;s SPS requirements (specify);
                        </label>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <h6 className="mb-b fw-normal">DISPOSITION OF THE CONSIGNMENT*)</h6>
                    <div className="row mb-3">
                        <div className="col-sm-12">
                            The &nbsp;
                            <div className="form-check form-check-inline mt-3">
                                <input className="form-check-input" type="radio" name="declare" id="entire" value="entire" />
                                <label className="form-check-label" htmlFor="entire">entire</label>
                            </div>
                            or &nbsp;
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="declare" id="partial" value="partial" />
                                <label className="form-check-label" htmlFor="partial">partial</label>
                            </div>
                            lot of the consignment was: &nbsp; &nbsp;
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="option1" />
                                <label className="form-check-label" htmlFor="option1">
                                    treated.
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="option2" />
                                <label className="form-check-label" htmlFor="option2">
                                    destroyed.
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="option3" />
                                <label className="form-check-label" htmlFor="option3">
                                    refused.
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" value="" id="option4" />
                                <label className="form-check-label" htmlFor="option4">
                                    released.
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-12">
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="detail">Details**</label>
                        <div className="col-sm-10">
                            <input type="text" id="detail" placeholder="Detail" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" htmlFor="signatory">Signatory</label>
                        <div className="col-sm-4">
                            <input type="text" id="signatory" placeholder="Signatory" className="form-control form-control-sm" />
                        </div>
                    </div>
                    <hr className="my-4 mx-n4" />
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

export default DocK76