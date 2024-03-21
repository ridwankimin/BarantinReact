/* eslint-disable react/prop-types */
import React, { useState } from "react";
import moment from "moment";
import html2canvas from "html2canvas";
import '../../../assets/css/test.scss'
import jsPDF from "jspdf";
import SpinnerDot from "../../loading/SpinnerDot";
import Swal from "sweetalert2";

moment.locale("en");

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

function PrintK37a(props) {
    let [isLoading, setIsLoading] = useState(false)
    let [noSeri, setNoSeri] = useState(false)
    const cetak = props.dataCetak
    console.log(props)
    
    const printToPdf = () => {
        setIsLoading(true)
        const input = document.getElementById('hal1');
        const input2 = document.getElementById('hal2');
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

    function kirimTTE() {
        setNoSeri(makeid(7))
        Swal.fire({
            icon: "success",
            title: "Sukses!",
            text: "Berhasil kirim ke TTE"
        })
    }
  return (
<div>
        {isLoading ? <SpinnerDot/> : 
            (noSeri ? 
            (<button onClick={printToPdf} className="btn btn-warning me-sm-2 me-1"><i className="fa-solid fa-print me-sm-2 me-1"></i>
                Preview
            </button>)
                : 
            <button onClick={kirimTTE} className="btn btn-info me-sm-2 me-1"><i className="fa-solid fa-paper-plane me-sm-2 me-1"></i>
                Kirim ke TTE
            </button>)
        }
        <br />
        <hr />
        <br />
        
<div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        KH.1 <span className="text-muted fw-light">(SERTIFIKAT KESEHATAN HEWAN)</span>
    </h4>
 
    <div className="row">
        <div className="col-xxl">
            <div className="card mb-4" >
                <div className="container" id="hal1">
                    <div className="row text-end">
                        <p>&nbsp;</p>
                        <h2> KH-1</h2>
                    </div>
                    <p style={{textAlign:'center'}}><strong>LAPORAN HASIL PEMERIKSAAN ADMINISTRATIF DAN KESESUAIAN DOKUMEN</strong><br />Nomor: ..............</p>
                    <p style={{textAlign:'center'}}>&nbsp;</p>
                    <p style={{textAlign:'left'}}>Yth,<br />Kepala ....<br />di<br />&emsp;&emsp;tempat</p>
                    <p>&emsp;&emsp;Menindaklanjuti Surat Tugas No. ....................................... Tanggal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; bersama ini dilaporkan hasil pemeriksaan media pembawa sebagai berikut:</p>
                    <table style={{borderCollapse: 'collapse', width: '100%'}} id="tabel">
                    <tbody>
                    <tr>
                    <td style={{width:'100%', textAlign:'center'}}><strong>PEMERIKSAAN ADMINISTRATIF DAN KESESUAIAN DOKUMEN*</strong></td>
                    </tr>
                    <tr>
                        <td style={{width: '100%'}}>
                            <input type="checkbox" /> Semua persyaratan yang diperlukan bagi pemasukan/pengeluaran* media pembawa tersebut telah lengkap, benar dan sah serta sesuai. <br/>
                            <input type="checkbox" /> Dokumen yang dipersyaratkan tidak lengkap/tidak benar/tidak sah/tidak sesuai** <br/>
                            <input type="checkbox" /> Media pembawa merupakan jenis yang dilarang pemasukan/pengeluarannya ke/dari wilayah Negara Republik Indonesia/area tujuan/asal** <br/>
                            <input type="checkbox" /> Media pembawa memerlukan tindakan pengasingan dan pengamatan <br/>
                            <input type="checkbox" /> Media pembawa tergolong pangan/pakan/SDG/PRG/agensia hayati/JAI/tumbuhan dan satwa liar/tumbuhan dan satwa langka**<br/>
                            <input type="checkbox" /> Bukan termasuk media pembawa/tidak dikenai tindakan karantina dan/atau pengawasan**<br/>
                        </td>
                    </tr>
                    <tr>
                        <td style={{width: '100%', textAlign: 'center'}}><strong>REKOMENDASI</strong></td>
                    </tr>
                    <tr>
                        <td style={{width: '100%'}}>
                    <table style={{borderStyle: 'none', width: '100%'}}>
                    <tbody>
                    <tr>
                    <td style={{width: '50%'}}>
                    <ul>
                    <li>Dilakukan penahanan</li>
                    <li>Dilakukan pengasingan dan pengamatan</li>
                    </ul>
                    </td>
                    <td style={{width: '50%'}}>
                    <ul>
                    <li>Ditolak</li>
                    <li>Dilanjutkan pemeriksaan Kesehatan dan/atau uji Keamanan Pangan, uji Keamanan Pakan, uji Mutu Pangan, dan/atau uji Mutu Pakan.</li>
                    <li>Diterbitkan surat keterangan karantina</li>
                    </ul>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <p>&nbsp;</p>
                    <table style={{borderCollapse: 'collapse', width: '100%'}} >
                    <tbody>
                    <tr>
                    <td style={{width: '65.0281%'}}>&nbsp;</td>
                    <td style={{width: '34.9719%'}}>Kota, tanggal <br />Pejabat Karantina<br /><br /><br /><br />nama<br />NIP.</td>
                    </tr>
                    </tbody>
                    </table>
                    <p></p>
                <div/>
              </div>

              {/* <div className="container">
                  <div className="row-md-1 ">
                          <button className="btn btn-primary" onClick={printDocument}>Cetak Pelepasan</button>    
                  </div>
              </div> */}
            </div>
        </div>
    </div>
</div>
</div>        
  )
}

export default PrintK37a