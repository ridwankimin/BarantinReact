/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PtkSurtug from '../../model/PtkSurtug';
import {decode as base64_decode} from 'base-64';
import Cookies from 'js-cookie';
import PtkPemeriksaan from '../../model/PtkPemeriksaan';

function DocK37() {
    let navigate = useNavigate();
    const {
		register: registerAdministratif,
        setValue: setValueAdministratif,
        watch: watchAdministratif,
		handleSubmit: handleFormAdministratif,
        formState: { errors: errorsAdministratif },
	} = useForm()
    const dataWatch = watchAdministratif()

    const onSubmit = (data) => {
        // alert("oke")
        // console.log(data)
        const model = new PtkPemeriksaan();
        const response = model.ptkAdmin(data);
            response
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(response.data.status === '201') {
                        alert(response.data.status + " - " + response.data.message)
                        // setValueDetilSurtug("idHeader", response.data.data.id)
                        setValueAdministratif("idDok37", response.data.data.id)
                        setValueAdministratif("noDok37", response.data.data.nomor)
                        // setData(values => (
                        //     {...values, 
                        //         nomorSurtug: response.data.data.nomor,
                        //         tglSurtug: data.tglSurtug,
                        //     }));
                        // dataSurtugHeader()
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });
    }

    function handlebatal() {
        setValueAdministratif("opsiAdministratif", "")
        setValueAdministratif("rekomAdmin", "")
    }

    const idPtk = Cookies.get("idPtkPage");
    let [data,setData] = useState({})
    useEffect(() => {
        if(idPtk) {
            let ptkDecode = idPtk ? base64_decode(idPtk) : "";
            let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
            setData(values => ({...values,
                noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                idPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                noDokumen: idPtk ? base64_decode(ptkNomor[2]): "",
                noAnalisa: "",
                tglAnalisa: "",
                nomorSurtug: "",
                tglSurtug: "",
            }));
            const modelSurtug = new PtkSurtug();
                // 1: penugasan periksa administratif
            const response = modelSurtug.getDetilSurtugPenugasan(base64_decode(ptkNomor[1]), 1);
            response
            .then((response) => {
                console.log(response.data)
                if(response.data) {
                    if(response.data.status === '200') {
                        // console.log(response.data.data[0])
                        setData(values => ({...values,
                            noAju: idPtk ? base64_decode(ptkNomor[0]) : "",
                            idPtk: idPtk ? base64_decode(ptkNomor[1]) : "",
                            noDokumen: idPtk ? base64_decode(ptkNomor[2]): "",
                            noSurtug: response.data.data[0].nomor,
                            tglSurtug: response.data.data[0].tanggal,
                        }));
                        setValueAdministratif("idPtk", base64_decode(ptkNomor[1]))
                        setValueAdministratif("noDok", base64_decode(ptkNomor[2]))
                        setValueAdministratif("idSurtug", response.data.data[0].id)
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.status + " - " + error.response.data.message)
            });
        }
    }, [idPtk, setValueAdministratif])
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-3.7 <span className="fw-light" style={{color: 'blue'}}>LAPORAN HASIL PEMERIKSAAN ADMINISTRATIF</span>
    </h4>

    <div className="row">
        <div className="col-xxl">
        <div className="card card-action mb-4">
            <div className="card-header mb-2 p-2" style={{backgroundColor: '#123138'}}>
                <div className="card-action-title">
                    <div className='row'>
                        <label className="col-sm-1 col-form-label text-sm-end" htmlFor="noDok"><b>No PTK</b></label>
                        <div className="col-sm-3">
                            <input type="text" id="noDok" value={data.noDokumen} className="form-control form-control-sm" placeholder="Nomor Dokumen K.3.7" disabled />
                        </div>
                        <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noSurtug"><b>NO SURAT TUGAS</b></label>
                        <div className="col-sm-3">
                            <input type="text" id='noSurtug' value={data.noSurtug} className='form-control form-control-sm' disabled/>
                        </div>
                        <label className="col-sm-1 col-form-label" htmlFor="tglSurtug"><b>TANGGAL</b></label>
                        <div className="col-sm-2">
                            <input type="text" id='tglSurtug' value={data.tglSurtug} className='form-control form-control-sm' disabled/>
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
            <div className='card-body'>
                <form onSubmit={handleFormAdministratif(onSubmit)}>
                    <input type="hidden" name='idDok37' {...registerAdministratif("idDok37")}/>
                    <input type="hidden" name='idPtk' {...registerAdministratif("idPtk")}/>
                    <input type="hidden" name='noDok' {...registerAdministratif("noDok")}/>
                    <input type="hidden" name='idSurtug' {...registerAdministratif("idSurtug")}/>
                {/* <div className="card"> */}
                    <div className="col-md-12 mt-3">
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="noDok37">Nomor Dokumen</label>
                            <div className="col-sm-3">
                                <input type="text" id="noDok37" {...registerAdministratif("noDok37")} className="form-control form-control-sm" placeholder="Nomor Dokumen K-3.7" disabled />
                            </div>
                            <label className="col-sm-2 col-form-label text-sm-end" htmlFor="tglDok37">Tanggal</label>
                            <div className="col-sm-2">
                                <input type="datetime-local" id="tglDok37" name='tglDok37' {...registerAdministratif("tglDok37", {required: "Mohon isi tanggal dokumen."})} className={errorsAdministratif.tglDok37 ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"} />
                                {errorsAdministratif.tglDok37 && <><br/><small className="text-danger">{errorsAdministratif.tglDok37.message}</small></>}
                            </div>
                        </div>
                    </div>
                {/* </div> */}
                    <div className="row mb-3">
                        <div className="col">
                            <div className="accordion" id="collapseSection">
                                <div className="card">
                                    <h2 className="accordion-header" id="headerExporter">
                                        <button className="accordion-button" type="button" style={{backgroundColor: '#123138'}} data-bs-toggle="collapse" data-bs-target="#collapseExporter" aria-expanded="true" aria-controls="collapseExporter">
                                            <h5 className='text-lightest mb-0'>Pemeriksaan Administratif</h5>
                                        </button>
                                    </h2>
                                    <div id="collapseExporter">
                                        <div className="accordion-body">
                                            <div className="row g-3 mb-3">
                                                <div className="col-sm-12 mb-4">
                                                    <div className="form-check">
                                                        <label className="form-check-label" style={{backgroundColor: (dataWatch.opsiAdministratif === '1' ? '#5A8DEE' : 'transparent'), color: (dataWatch.opsiAdministratif === '1' ? 'whitesmoke' : '#677788')}} htmlFor="opsi1">Dokumen yang dipersyaratkan tidak lengkap dan/atau diragukan keabsahan dan kebenaran isinya</label>
                                                        <input name="opsiAdministratif" className={errorsAdministratif.opsiAdministratif ? "form-check-input is-invalid" : "form-check-input"} value={1} {...registerAdministratif("opsiAdministratif", { required: "Mohon pilih pemeriksaan administratif yang sesuai."})} type="radio" id="opsi1" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" style={{backgroundColor: (dataWatch.opsiAdministratif === '2' ? '#5A8DEE' : 'transparent'), color: (dataWatch.opsiAdministratif === '2' ? 'whitesmoke' : '#677788')}} htmlFor="opsi2">Media pembawa merupakan jenis yang dilarang pemasukan/pengeluarannya ke/dari wilayah Negara Republik Indonesia/area tujuan/asal</label>
                                                        <input name="opsiAdministratif" className={errorsAdministratif.opsiAdministratif ? "form-check-input is-invalid" : "form-check-input"} value={2} {...registerAdministratif("opsiAdministratif")} type="radio" id="opsi2" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" style={{backgroundColor: (dataWatch.opsiAdministratif === '3' ? '#5A8DEE' : 'transparent'), color: (dataWatch.opsiAdministratif === '3' ? 'whitesmoke' : '#677788')}} htmlFor="opsi3">Media pembawa memerlukan tindakan pengasingan dan pengamatan</label>
                                                        <input name="opsiAdministratif" className={errorsAdministratif.opsiAdministratif ? "form-check-input is-invalid" : "form-check-input"} value={3} {...registerAdministratif("opsiAdministratif")} type="radio" id="opsi3" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" style={{backgroundColor: (dataWatch.opsiAdministratif === '4' ? '#5A8DEE' : 'transparent'), color: (dataWatch.opsiAdministratif === '4' ? 'whitesmoke' : '#677788')}} htmlFor="opsi4">Media pembawa tergolong pangan/pakan/SDG/PRG/agensia hayati/JAI/tumbuhan dan satwa liar/tumbuhan dan satwa langka</label>
                                                        <input name="opsiAdministratif" className={errorsAdministratif.opsiAdministratif ? "form-check-input is-invalid" : "form-check-input"} value={4} {...registerAdministratif("opsiAdministratif")} type="radio" id="opsi4" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" style={{backgroundColor: (dataWatch.opsiAdministratif === '5' ? '#5A8DEE' : 'transparent'), color: (dataWatch.opsiAdministratif === '5' ? 'whitesmoke' : '#677788')}} htmlFor="opsi5">Bukan termasuk media pembawa/tidak dikenai tindakan karantina pengawasan</label>
                                                        <input name="opsiAdministratif" className={errorsAdministratif.opsiAdministratif ? "form-check-input is-invalid" : "form-check-input"} value={5} {...registerAdministratif("opsiAdministratif")} type="radio" id="opsi5" />
                                                    </div>
                                                    <div className="form-check">
                                                        <label className="form-check-label" style={{backgroundColor: (dataWatch.opsiAdministratif === '6' ? '#5A8DEE' : 'transparent'), color: (dataWatch.opsiAdministratif === '6' ? 'whitesmoke' : '#677788')}} htmlFor="opsi6">Semua persyaratan yang diperlukan bagi pemasukan/pengeluaran media pembawa tersebut telah lengkap dan tidak diragukan keabsahan dan kebenaran isinya</label>
                                                        <input name="opsiAdministratif" className={errorsAdministratif.opsiAdministratif ? "form-check-input is-invalid" : "form-check-input"} value={6} {...registerAdministratif("opsiAdministratif")} type="radio" id="opsi6" />
                                                        {errorsAdministratif.opsiAdministratif && <><br/><small className="text-danger">{errorsAdministratif.opsiAdministratif.message}</small></>}
                                                    </div>
                                                    </div>
                                                <div className="row">
                                                    <div className='form-control-label'><b>Rekomendasi</b></div>
                                                    <div className="col-sm-5 mb-3">
                                                        <select className={errorsAdministratif.rekomAdmin === '' ? 'form-select is-invalid' : 'form-select'} {...registerAdministratif("rekomAdmin", { required: "Mohon pilih rekomendasi yang sesuai."})}>
                                                            <option value="">--</option>
                                                            <option value='11'>Dilakukan penahanan dan/atau melengkapi dokumen</option>
                                                            <option value='12'>Dilakukan pengasingan dan pengamatan</option>
                                                            <option value='13'>Ditolak</option>
                                                            <option value='14'>Dilanjutkan pemeriksaan kesehatan</option>
                                                        </select>
                                                        {errorsAdministratif.rekomAdmin && <><br/><small className="text-danger">{errorsAdministratif.rekomAdmin.message}</small></>}
                                                    </div>
                                                    <div className='form-control-label'><b>Penandatangan</b></div>
                                                    <div className="col-sm-5">
                                                        <input type="text" className={errorsAdministratif.ttdAdminidtratif === '' ? 'form-control is-invalid' : 'form-control'} {...registerAdministratif("ttdAdminidtratif", { required: "Mohon pilih nama penandatangan."})}/>
                                                        {/* <select className={dataWatch.ttdAdminidtratif === '' ? 'form-select form-select-sm is-invalid' : 'form-select form-select-sm'} {...registerAdministratif("ttdAdminidtratif", { required: "Mohon pilih nama penandatangan."})}>
                                                            <option value="">--</option>
                                                            <option value='1'>Dilakukan penahanan dan/atau melengkapi dokumen</option>
                                                            <option value='2'>Dilakukan pengasingan dan pengamatan</option>
                                                            <option value='3'>Ditolak</option>
                                                            <option value='4'>Dilanjutkan pemeriksaan kesehatan</option>
                                                        </select> */}
                                                        {errorsAdministratif.ttdAdminidtratif && <><br/><small className="text-danger">{errorsAdministratif.ttdAdminidtratif.message}</small></>}
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
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-primary me-sm-2 me-1">Simpan</button>
                            <button type="button" className="btn btn-danger me-sm-2 me-1" onClick={handlebatal}>Batal</button>
                            <a href={require("../../dok/k37.pdf")} rel="noopener noreferrer" target='_blank' className="btn btn-warning"><i className="bx bx-printer bx-xs"></i>&nbsp; Print</a>
                            <button type="button" onClick={() => navigate('/k37a')} className="btn btn-info float-end"><i className="menu-icon tf-icons bx bx-send"></i>Pemeriksaan Fisik/Kesehatan</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
            <div className="card-body">
                
                
            </div>
        </div>
    </div>
</div>
  )
}

export default DocK37