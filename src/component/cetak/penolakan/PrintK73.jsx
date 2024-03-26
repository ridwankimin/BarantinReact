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

function PrintK73(props) {
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
        K7.3 <span className="text-muted fw-light">(LAPORAN HASIL PENOLAKAN)</span>
    </h4>
 
    <div className="row">
        <div className="col-xxl">
            <div className="card mb-4" >
                <div className="container" id="hal1">
                    <div className="row text-end">
                        <p>&nbsp;</p>
                        <h2> K7-3</h2>
                    </div>
                    <p style={{textAlign: 'center'}}>LAPORAN HASIL PENOLAKAN<br />Nomor: ..............</p>
                    <p style={{textAlign: 'center'}}>&nbsp;</p>
                    <p style={{textAlign: 'left'}}>Yth,<br />Kepala&nbsp; ....<br />di<br />&emsp;&emsp;tempat</p>
                    <p style={{textAlign: 'justify'}}>&emsp;&emsp;Menindaklanjuti Surat Tugas Nomor &hellip;&hellip; Tanggal &hellip;. dan Berita Acara Penolakan Nomor: ........................... Tanggal ..................... bersama ini dilaporkan hasil pelaksanaan penolakan terhadap media pembawa sebagai berikut:</p>
                    <table style={{borderCollapse: 'collapse', width: '100%', height: '190px'}} border="1" id="tabel">
                    <tbody>
                    <tr style={{height: '10px'}}>
                    <td style={{width: '100%', height: '10px'}} colspan="3">Jenis Media Pembawa:<br />Hewan/Ikan/Tumbuhan/Produk Hewan/Produk Ikan/Produk Tumbuhan/Media Pembawa Lain*)</td>
                    </tr>
                    <tr style={{height: '18px'}}>
                    <td style={{width: '25%', height: '18px'}}>Nama umum/dagang:</td>
                    <td style={{width: '16.7135%', height: '18px'}}>Nama ilmiah**):</td>
                    <td style={{width: '58.2865%', height: '18px'}}>Kode HS:</td>
                    </tr>
                    <tr style={{height: '72px'}}>
                    <td style={{height: '72px', width: '25%'}}>Bentuk</td>
                    <td style={{height: '72px', width: '16.7135%'}}>Jumlah</td>
                    <td style={{height: '72px', width: '58.2865%'}}>Identitas Pemilik<br />Nama<br />Alamat<br />NIB/NPWP/KTP/SIM/Passpor</td>
                    </tr>
                    <tr style={{height: '36px'}}>
                    <td style={{width: '100%', height: '36px'}} colspan="3">Nomor dan tanggal Permohonan Tindakan Karantina dan/atau Pengawasan terhadap Pemasukan/Pengeluaran/Transit**) Media Pembawa</td>
                    </tr>
                    <tr style={{height: '36px'}}>
                    <td style={{height: '36px', width: '25%'}} colspan="2">Negara/area tujuan*)</td>
                    <td style={{height: '36px', width: '58.2865%'}}>Jenis dan nama alat angkut</td>
                    </tr>
                    </tbody>
                    </table>
                    <p>Demikian Laporan ini disampaikan, untuk dipergunakan sebagaimana mestinya.</p>
                    <table style={{width: '100%', borderCollapse: 'collapse', borderStyle: 'none'}}>
                    <tbody>
                    <tr>
                    <td style={{width: '65.0281%'}}>&nbsp;</td>
                    <td style={{width: '34.9719%'}}>Dibuat di<br />Pada Tanggal <br />Pejabat Karantina<br /><br /><br /><br />nama<br />NIP.</td>
                    </tr>
                    </tbody>
                    </table>
                    <p>&nbsp;</p>
                    <p></p>
                <div/>
              </div>
            </div>
        </div>
    </div>
</div>
</div>        
  )
}

export default PrintK73