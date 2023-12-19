import React from 'react'

function DocK12() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-1.2 <span className="text-muted fw-light">PRIOR NOTICE</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
            <form className="card-body">
                <div className="card">
                    <div className="col-md-12 mt-3">
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-center" htmlFor="nomor_k12">Reference Number</label>
                            <div className="col-sm-4">
                                <input type="text" id="nomor_k12" className="form-control form-control-sm" placeholder="Reference Number" disabled />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        <div className="accordion" id="collapseSection">
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerCountry">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCountry" aria-expanded="true" aria-controls="collapseCountry">
                                        Country
                                    </button>
                                </h2>
                                <div id="collapseCountry">
                                    <div className="accordion-body">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-country-origin">Country of Origin</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-country-origin" className="form-control" placeholder="Country of Origin" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-country-export">Country of Export</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-country-export" className="form-control" placeholder="Country of Export" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerExporter">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExporter" aria-expanded="true" aria-controls="collapseExporter">
                                        Exporter
                                    </button>
                                </h2>
                                <div id="collapseExporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Name</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Name" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-company">Company Name</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-compay" className="form-control" placeholder="Company Name" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Address</label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="4" placeholder="1456, Mall Road"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Phone</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Phone" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-company">Email</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-compay" className="form-control" placeholder="Email" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerImporter">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseImporter" aria-expanded="true" aria-controls="collapseImporter">
                                        Importer
                                    </button>
                                </h2>
                                <div id="collapseImporter">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Name</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Name" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-company">Company Name</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-compay" className="form-control" placeholder="Company Name" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Address</label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="4" placeholder="1456, Mall Road"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-name">Phone</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-name" className="form-control" placeholder="Phone" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-company">Email</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-compay" className="form-control" placeholder="Email" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerGoods">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseGoods" aria-expanded="true" aria-controls="collapseGoods">
                                        Commodity
                                    </button>
                                </h2>
                                <div id="collapseGoods">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-sm-12">
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="rekom1">Non GMO</label>
                                                    <input name="default-radio-1" className="form-check-input" type="radio" value="" id="rekom1" />
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label" htmlFor="rekom2">GMO: the COA's reference no & date</label>
                                                    <input name="default-radio-1" className="form-check-input" type="radio" value="" id="rekom2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <button type="button" className="btn btn-xs btn-primary">Add Commodity</button>
                                            </div>
                                            <table className="table table-bordered table-hover table-striped dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>NO</th>
                                                        <th>Common Name / Botanical Name</th>
                                                        <th>HS Code</th>
                                                        <th>Quantity / Packaging</th>
                                                        <th>Certificate of Analysis / Health Certificate's Reference Number and issued date</th>
                                                        <th>Testing Laboratory / NFSCA Body</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>1</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                    </tr>
                                                    <tr>
                                                        <th>2</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-md-start" htmlFor="collapse-name">Export Purpose</label>
                                                    <div className="col-sm-3">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="exportpurpose1">Ditanam/budidaya/Peningkatan Mutu Genetik</label>
                                                            <input name="default-radio-2" className="form-check-input" type="radio" value="" id="exportpurpose1" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="exportpurpose2">Konsumen</label>
                                                            <input name="default-radio-2" className="form-check-input" type="radio" value="" id="exportpurpose2" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="exportpurpose3">Penelitian</label>
                                                            <input name="default-radio-2" className="form-check-input" type="radio" value="" id="exportpurpose3" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="exportpurpose4">Pameran/kontes</label>
                                                            <input name="default-radio-2" className="form-check-input" type="radio" value="" id="exportpurpose4" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="exportpurpose5">Perdagangan</label>
                                                            <input name="default-radio-2" className="form-check-input" type="radio" value="" id="exportpurpose5" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="exportpurpose6">Bahan Baku</label>
                                                            <input name="default-radio-2" className="form-check-input" type="radio" value="" id="exportpurpose6" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="exportpurpose7">Lainnya...</label>
                                                            <input name="default-radio-2" className="form-check-input" type="radio" value="" id="exportpurpose7" />
                                                            <input name="othersPurpose" type="text" placeholder="Lainnya" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-md-start" htmlFor="collapse-name">Degree of Processing</label>
                                                    <div className="col-sm-3">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="degree1">Fresh</label>
                                                            <input name="default-radio-3" className="form-check-input" type="radio" value="" id="degree1" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="degree2">Minimal Processed</label>
                                                            <input name="default-radio-3" className="form-check-input" type="radio" value="" id="degree2" />
                                                        </div>
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="degree3">Full Processed</label>
                                                            <input name="default-radio-3" className="form-check-input" type="radio" value="" id="degree3" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="form-check">
                                                            <label className="form-check-label" htmlFor="degree4">Other (Please Specify)...</label>
                                                            <input name="default-radio-3" className="form-check-input" type="radio" value="" id="degree4" />
                                                            <input name="othersPurpose" type="text" placeholder="Other" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerCert">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCert" aria-expanded="true" aria-controls="collapseCert">
                                        Health/Sanitary/Phytosanitary Certificate
                                    </button>
                                </h2>
                                <div id="collapseCert">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <button type="button" className="btn btn-xs btn-primary">Add Certificate</button>
                                            </div>
                                            <table className="table table-bordered table-hover table-striped dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>NO</th>
                                                        <th>Reference Number</th>
                                                        <th>Place of Issue</th>
                                                        <th>Date of Issue</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>1</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                    </tr>
                                                    <tr>
                                                        <th>2</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                        <th>-</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerTransport">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTransport" aria-expanded="true" aria-controls="collapseTransport">
                                        Transportation
                                    </button>
                                </h2>
                                <div id="collapseTransport">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-means">Means of conveyance</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-means" className="form-control" placeholder="Conveyance" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-voyage">Voyage/Flight Number</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-voyage" className="form-control" placeholder="Voyage/Flight Number" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-portload">Port of Loading</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-portload" className="form-control" placeholder="Port of Loading" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-dateload">Date of Loading</label>
                                                    <div className="col-sm-9">
                                                        <input type="date" id="collapse-dateload" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-destination">Place of Destination</label>
                                                    <div className="col-sm-9">
                                                        <input type="text" id="collapse-destination" className="form-control" placeholder="Place of Destination" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapse-datearrived">Date of Estimated Arrival</label>
                                                    <div className="col-sm-9">
                                                        <input type="date" id="collapse-datearrived" className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card accordion-item">
                                <h2 className="accordion-header" id="headerAdditional">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAdditional" aria-expanded="true" aria-controls="collapseAdditional">
                                        Additional Information
                                    </button>
                                </h2>
                                <div id="collapseAdditional">
                                    <div className="accordion-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Additional Information</label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="4" placeholder="additional information"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Container's Identification Number</label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="1" placeholder="Container's identification Number"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label text-sm-end" htmlFor="collapsible-address">Other (specify) </label>
                                                    <div className="col-sm-9">
                                                        <textarea name="collapsible-address" className="form-control" id="collapsible-address" rows="4" placeholder="Other (specify) "></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <button type="button" className="btn btn-primary">Simpan</button>
                        <button type="button" className="btn btn-danger">Batal</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default DocK12