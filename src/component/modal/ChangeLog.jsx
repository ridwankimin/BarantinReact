import React from 'react'
import ChangelogJson from '../../model/master/changeLog.json'
import {version} from '../../../package.json';

function ChangeLog() {
  return (
    <div className="modal fade" id="modLog" tabIndex="-1">
        <div className="modal-dialog">
            <div className="modal-content p-3 pb-1">
                <div className="modal-body">
                    <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div className="text-center mb-4">
                        <h3 className="address-title">Change Log Barantin System</h3>
                    </div>

                    <div className="accordion mt-3" id="accordionExample">
                        {ChangelogJson.map(((data, index) => (
                            <div className="card accordion-item" key={index}>
                                <h2 className="accordion-header" id={"heading" + index}>
                                    <button
                                    type="button"
                                    className="accordion-button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={"#accordion" + index}
                                    aria-expanded="true"
                                    aria-controls="accordionOne">
                                        v{data.versi}
                                        <small className='float-end' style={{marginLeft: "55%"}}>{data.tanggal}</small>
                                    </button>
                                </h2>
                                <hr className='m-0' />
                                <div
                                    id={"accordion" + index}
                                    className={"accordion-collapse collapse" + (version == data.versi ? " show" : "")}
                                    data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <ul style={{listStyle: 'circle'}}>
                                            {data.deskripsi.split(";").map((item,index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangeLog