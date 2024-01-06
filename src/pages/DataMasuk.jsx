import React from 'react'

function DataMasuk() {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h6 class="text-muted">PROSES DATA MASUK</h6>
                  <div class="card shadow-none border mb-3">
                    <div class="card-header border-bottom">
                      <ul class="nav nav-tabs card-header-tabs" role="tablist">
                        <li class="nav-item">
                          <button
                            type="button"
                            class="nav-link active"
                            role="tab"
                            data-bs-toggle="tab"
                            data-bs-target="#navs-justified-ppk-active"
                            aria-controls="navs-justified-ppk-active"
                            aria-selected="true">
                            PPK Online
                          </button>
                        </li>
                        <li class="nav-item">
                          <button
                            type="button"
                            class="nav-link"
                            role="tab"
                            data-bs-toggle="tab"
                            data-bs-target="#navs-justified-ssm"
                            aria-controls="navs-justified-home"
                            aria-selected="false">
                            SSM
                          </button>
                        </li>
                        <li class="nav-item">
                          <button
                            type="button"
                            class="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#navs-justified-dol"
                            aria-controls="navs-justified-dol"
                            role="tab"
                            aria-selected="false">
                            Domas Online
                          </button>
                        </li>
                        <li class="nav-item">
                          <button
                            type="button"
                            class="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#navs-justified-nil"
                            aria-controls="navs-justified-nil"
                            role="tab"
                            aria-selected="false">
                            Nota Intelejen
                          </button>
                        </li>
                        <li class="nav-item">
                          <button
                            type="button"
                            class="nav-link"
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
                    <div class="tab-content">
                      <div class="tab-pane fade show active" id="navs-justified-ppk-active" role="tabpanel">
                        <a href='/k11' className='btn btn-sm btn-primary'>Tambah Baru</a>
                        <div className='row'>
                            <div className='col-2'>
                                <label htmlFor="tglMulai">Tgl Awal</label>
                                <input type="date" id='tglMulai' name='tglMulai' className='form-control form-control-sm' />
                            </div>
                            <div className='col-2'>
                                <label htmlFor="tglAkhir">Tgl Akhir</label>
                                <input type="date" id='tglAkhir' name='tglAkhir' className='form-control form-control-sm'/>
                            </div>
                            <div className='col-2'>
                                <button style={{marginTop: '23px'}} className='btn btn-sm btn-info'>Filter</button>
                            </div>
                        </div>
                        <div class="card-datatable text-nowrap">
                            <table className="dt-scrollableTable table table-bordered table-sm">
                                <thead style={{backgroundColor: '#123138' }}>
                                <tr>
                                    <th className='text-lightest'>Name</th>
                                    <th className='text-lightest'>Position</th>
                                    <th className='text-lightest'>Email</th>
                                    <th className='text-lightest'>City</th>
                                    <th className='text-lightest'>Date</th>
                                    <th className='text-lightest'>Salary</th>
                                    <th className='text-lightest'>Age</th>
                                    <th className='text-lightest'>Experience</th>
                                    <th className='text-lightest'>Status</th>
                                    <th className='text-lightest'>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                    <tr>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                        <td>tes</td>
                                    </tr>
                                    <tr>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                        <td>alamat</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="navs-justified-ssm" role="tabpanel">
                        <h4 class="card-title">Special link title</h4>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="javascript:void(0)" class="btn btn-secondary">Go somewhere</a>
                      </div>
                      <div class="tab-pane fade" id="navs-justified-dol" role="tabpanel">
                        <h4 class="card-title">Special link title</h4>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="javascript:void(0)" class="btn btn-secondary">Go somewhere</a>
                      </div>
                      <div class="tab-pane fade" id="navs-justified-nil" role="tabpanel">
                        <h4 class="card-title">Special link title</h4>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="javascript:void(0)" class="btn btn-secondary">Go somewhere</a>
                      </div>
                      <div class="tab-pane fade" id="navs-justified-str" role="tabpanel">
                        <h4 class="card-title">Special link title</h4>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="javascript:void(0)" class="btn btn-secondary">Go somewhere</a>
                      </div>
                    </div>
                  </div>
</div>
  )
}

export default DataMasuk