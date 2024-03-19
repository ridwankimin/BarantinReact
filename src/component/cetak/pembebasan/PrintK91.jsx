import React, { useState } from "react";
import moment from "moment";
import html2canvas from "html2canvas";
//import garuda from '../logo/garuda.png'
import jsPDF from "jspdf";
//import SpinnerDot from "../component/loading/SpinnerDot";
//import Swal from "sweetalert2";
import  '../../../assets/css/test.scss';

moment.locale("en");



function PrintK91(props) {
    let [isLoading, setIsLoading] = useState(false)
    let [noSeri, setNoSeri] = useState(false)
    const cetak = props.dataCetak
    console.log(props)
    const printToPdf = () => {
        setIsLoading(true)
        const input = document.getElementById('hal1');
        const pdf = new jsPDF({compress: true});
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio)/2;
            const imgY = 5;
            pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
            var out = pdf.output('blob');
            var file = new Blob([out], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            setIsLoading(false)
                //CREATE BASE64 PDF
                // let fileReader = new FileReader();
                // fileReader.readAsDataURL(file);
                // fileReader.onload = (event) => {
                //     console.log(event.target.result);
                // }
                //END CREATE BASE64 PDF
          })
    };


  return (
<div>
        <br />
        <hr />
        <br />
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="py-3 breadcrumb-wrapper mb-4">
                K.9.1 <span className="text-muted fw-light">(SURAT KETERANGAN MEDIA PEMBAWA LAIN)</span>
            </h4>
        
            <div className="row">
                <div className="col-xxl">
                    <div className="card mb-4" >
                        <div className="container" id="hal1">
                            <div className="row text-end">
                                <p>&nbsp;</p><h2> K.9-1</h2>
                            </div>
                            <div>
                                <center className="a1"><strong><u>SURAT KETERANGAN MEDIA PEMBAWA LAIN</u></strong><u></u></center>
                                <center className="a2"><span >Nomor: <strong>01930193019</strong></span></center> <br />
                                <p  className="a3">Berdasarkan Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan, Peraturan Pemerintah Nomor 29 Tahun 2023 tentang Peraturan Pelaksanaa Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan dan dalam rangka pencegahan masuk dan tersebarnya HPHK, HPIK, atau OPTK, keamanan pangan dan mutu pangan, keamanan pakan dan mutu pakan, produk Rekayasa Genetik, Sumber Daya Genetik, Agensia Hayati, Jenis Asing Invasif, Tumbuhan dan Satwa Liar, serta Tumbuhan dan Satwa Langka&nbsp; yang dilarang serta dibatasi di dalam wilayah Negara Kesatuan Republik Indonesia, serta menindaklanjuti Permohonan Tindakan Karantina dan Pengawasan dan/atau Pengendalian Serta Berita Acara Serah Terima Media Pembawa Di Tempat Pemasukan, Pengeluaran dan/atau Transit Nomor .......... Tanggal ........ maka terhadap media pembawa:</p>
                                <table style={{borderCollapse: 'collapse', width: '100%', height: '217px'}} border={1} id="tabel">
                                <tbody>
                                <tr style={{height: '16px'}} border={1}>
                                <td className="a6" colSpan={4}>Jenis dan Jumlah:</td>
                                </tr>
                                <tr className="a7" >
                                <td className="a8" rowsPan={2}>No</td>
                                <td style={{width: '71.2858%', height: '41px'}} colSpan={2}>&nbsp;JENIS MEDIA PEMBAWA*)</td>
                                <td className="a10" style={{width: '23.9928%', height: '41px'}}>Jumlah</td>
                                </tr>
                                <tr className="a11" style={{height: '37px'}}>
                                <td className="a12" style={{width: '34.6021%', height: '37px'}}>&nbsp;Nama Latin</td>
                                <td className="a13" style={{width: '36.6837%', height: '37px'}}>&nbsp;Nama Umum</td>
                                <td className="a14" style={{width: '23.9928%', height: '37px'}}>
                                <p>(ekor/btg/lbr/kg/gr/l/ml)**)</p>
                                </td>
                                </tr>
                                <tr style={{height: '90px'}}>
                                <td style={{width: '7.16735%', height: '90px'}}>&nbsp;</td>
                                <td style={{width: '34.6021%', height: '90px'}}>&nbsp;</td>
                                <td style={{width: '36.6837%', height: '90px'}}>&nbsp;</td>
                                <td style={{width: '23.9928%', height: '90px'}}>&nbsp;</td>
                                </tr>
                                <tr style={{height: '31px'}}>
                                <td style={{height: '31px', width: '102.446'}} colspan={4}>Total&nbsp; .....ekor&nbsp; ....btg&nbsp; .....lbr .....kg .......gr .......l .......ml</td>
                                </tr>
                                <tr>
                                <td style={{width: '102.446%'}} colspan={4}>&nbsp;</td>
                                </tr>
                                </tbody>
                                </table>
                                <table style={{borderCollapse: 'collapse', width: '100%', height: '196px' , border: 1}} id="tabel">
                                <tbody>
                                <tr style={{height: '142px'}}>
                                <td style={{width: '32.0225%', height: '142px'}}>
                                <p>Identitas Pemilik</p>
                                <p>Nama&nbsp; :</p>
                                <p>Alamat :</p>
                                <p>NIB/NPWP/KTP/SIM/Passpor</p>
                                </td>
                                <td style={{width: '28.6517%', height: '142px'}} colSpan={2}>
                                <p>Identitas Penerima</p>
                                <p>Nama&nbsp; :</p>
                                <p>Alamat :</p>
                                <p>NIB/NPWP/KTP/SIM/Passpor</p>
                                </td>
                                <td style={{width: '31.4607%', height: '142px', verticalAlign:'top'}}>Identitas alat angkut</td>
                                </tr>
                                <tr style={{height: '18px'}}>
                                <td style={{width: '32.0225%', height: '18px'}}>Tanggal Pengiriman / Pemasukan:</td>
                                <td style={{width: '44.8407%', height: '18px' }} colspan="2">Tanggal Pemeriksaaan</td>
                                <td style={{width: '31.4607%', height: '18px'}}>Negara / Area Asal</td>
                                </tr>
                                <tr style={{height: '18px'}}>
                                <td style={{width: '32.0225%', height: '18px'}}>Negara / Area Tujuan **)</td>
                                <td style={{width: '44.8407%', height: '18px' }} colspan="2">&nbsp;<em>Bill of Lading / Airway Bill **)</em></td>
                                <td style={{width: '31.4607%', height: '18px'}}>Jumlah Kemasan/Kontainer**)</td>
                                </tr>
                                </tbody>
                                </table>
                                <p>dinyatakan dalam keadaan baik, utuh, jenis, jumlah, dan ukuran sesuai dengan yang dilaporkan, atau bebas dari HPHK/HPIK/OPTK.**)</p>
                                <table style={{ borderStyle:'none',width: '100%'}} >
                                <tbody>
                                <tr>
                                <td style={{width: '68.8202%'}}>&nbsp;</td>
                                <td style={{width: '31.1798%'}}>
                                <p>......................................</p>
                                <p>Pejabat Karantina,</p>
                                <p>&nbsp;</p>
                                <p>&nbsp;</p>
                                <p>________________</p>
                                </td>
                                </tr>
                                </tbody>
                                </table>
                                <p>Catatan: <br /> *)&nbsp;&nbsp; Lampiran, apabila diperlukan. <br /> **) Coret yang tidak perlu.</p>
                                <br />
                           </div>
                        </div> 
                    </div>
                    <div>
                        <center>
                            <button onClick={printToPdf} className="btn btn-warning me-sm-2 me-1"><i className="fa-solid fa-print me-sm-2 me-1"></i>
                                Cetak
                            </button>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    
</div>
  )
}

export default PrintK91