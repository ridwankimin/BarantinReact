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

function PrintK37b(props) {
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
                    <p style={{textAlign: 'center'}}><strong>LAPORAN HASIL PEMERIKSAAN KESEHATAN</strong><br />Nomor: ..............</p>
                    <p style={{textAlign: 'center'}}>&nbsp;</p>
                    <p style={{textAlign: 'left'}}>Yth,<br />Kepala ....<br />di<br />&emsp;&emsp;tempat</p>
                    <p style={{textAlign: 'justify'}}>&emsp;&emsp;Menindaklanjuti Surat Tugas No. ....................................... Tanggal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; bersama ini dilaporkan hasil pemeriksaan media pembawa sebagai berikut:</p>
                    <table style={{borderCollapse: 'collapse', width: '100%'}} border="1" id="tabel">
                    <tbody>
                    <tr>
                    <td style={{width: '100%', textAlign: 'center'}} colspan="4"><strong>A. PEMERIKSAAN KESEHATAN. PEMERIKSAAN HPHK/HPIK/OPTK</strong></td>
                    </tr>
                    <tr>
                    <td style={{width: '75%'}} colspan="3">
                        <table style={{borderCollapse: 'collapse', width: '100%'}} border="1">
                        <tbody>
                        <tr>
                        <td style={{width: '50%', textAlign: 'center'}}>Nama Media Pembawa</td>
                        <td style={{width: '50%', textAlign: 'center'}}>Jumlah Media Pembawa</td>
                        </tr>
                        </tbody>
                        </table>
                    </td>
                    <td style={{width: '25%'}} rowspan="4">Catatan :</td>
                    </tr>
                    <tr>
                    <td style={{width: '25%', textAlign: 'center'}}>Target/Sasaran</td>
                    <td style={{width: '25%', textAlign: 'center'}}>Metode</td>
                    <td style={{width: '25%', textAlign: 'center'}}>Temuan</td>
                    </tr>
                    <tr>
                    <td style={{width: '75%', textAlign: 'left'}} colspan="3"><strong>B. PENGAWASAN DAN PENGENDALIAN PANGAN/PAKAN/SDG/PRG/AGENSIA HAYATI/JAI/TUMBUHAN DAN SATWA LIAR/TUMBUHAN DAN SATWA LANGKA</strong></td>
                    </tr>
                    <tr>
                    <td style={{width: '25%', textAlign: 'center'}}>Target/Sasaran</td>
                    <td style={{width: '25%', textAlign: 'center'}}>Metode</td>
                    <td style={{width: '25%', textAlign: 'center'}}>Temuan</td>
                    </tr>
                    <tr>
                    <td style={{width: '50%'}} colspan="2">Kesimpulan</td>
                    <td style={{width: '50%'}} colspan="2">
                    <table style={{borderCollapse: 'collapse', width: '100%'}} border="1">
                    <tbody>
                    <tr>
                    <td style={{width: '29.4551%'}}>
                    <p>Tanggal</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    </td>
                    <td style={{width: '37.2115%'}}>
                    <p>Pejabat Karantina</p>
                    <p>&nbsp;</p>
                    <p>NIP</p>
                    </td>
                    <td style={{width: '33.3333%'}}>
                    <p>Tanda tangan</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <p>&nbsp;</p>
                    <table style={{borderCollapse: 'collapse', width: '100%'}} border="1" id="tabel">
                    <thead>
                    <tr>
                    <td style={{width: '25%'}} colspan="4"><strong>REKOMENDASI</strong></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td style={{width: '25%'}}><input type="checkbox" /> Diberi pelakuan</td>
                    <td style={{width: '25%'}}><input type="checkbox" /> Ditolak</td>
                    <td style={{width: '25%'}}><input type="checkbox" /> Dimusnahkan</td>
                    <td style={{width: '25%'}}><input type="checkbox" /> Dibebaskan</td>
                    </tr>
                    </tbody>
                    </table>
                    <p>Demikian laporan hasil tindakan karantina dibuat dengan penuh rasa tanggung jawab sesuai peraturan perundangan yang berlaku</p>
                    <table style={{borderCollapse: 'collapse',borderStyle:'none', width: '100%'}} border="1">
                    <tbody>
                    <tr>
                    <td style={{width: '25%'}}>Tanggal</td>
                    <td style={{width: '25%'}}>Pejabat Karantina</td>
                    <td style={{width: '25%'}}>NIP</td>
                    <td style={{width: '25%'}}>Tanda Tangan</td>
                    </tr>
                    </tbody>
                    </table>
                <div/>
              </div>
            </div>
        </div>
    </div>
</div>
</div>        
  )
}

export default PrintK37b