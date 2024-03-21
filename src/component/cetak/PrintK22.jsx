import React, { useState } from "react";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import  '../../../assets/css/test.scss';

moment.locale("en");



function PrintK11(props) {
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
                K.1.1 <span className="text-muted fw-light">(PERMOHONAN TINDAK KARANTINA)</span>
            </h4>
        
            <div className="row">
                <div className="col-xxl">
                    <div className="card mb-4" >
                        <div className="container" id="hal1">
                            <div className="row text-end">
                                <p>&nbsp;</p><h2> K.1-1</h2>
                            </div>
                                <table style="border-collapse: collapse; width: 100%;" >
                                    <tbody>
                                    <tr>
                                    <td style="width: 22.7023%;">&nbsp;Logo</td>
                                    <td style="width: 77.2977%; text-align: center;">
                                    <p><strong>BADAN KARANTINA INDONESIA<br />BALAI BESAR KARANTINA HEWAN, IKAN, TUMBUHAN PROV</strong></p>
                                    <p>almat</p>
                                    </td>
                                    </tr>
                                    </tbody>
                                    </table>
                                    <p style="text-align: center;"><strong>SURAT TUGAS</strong></p>
                                    <p style="text-align: center;">&nbsp;</p>
                                    <p style="text-align: left;">Nomor :<br />Perihal :</p>
                                    <p style="text-align: left;"><br />Menugaskan :</p>
                                    <table style="border-collapse: collapse; width: 100%;" border="1">
                                    <tbody>
                                    <tr>
                                    <td style="width: 4.95542%;">No</td>
                                    <td style="width: 31.1557%;">Nama</td>
                                    <td style="width: 29.9383%;">NIP</td>
                                    <td style="width: 33.9506%;">Jabatan</td>
                                    </tr>
                                    <tr>
                                    <td style="width: 4.95542%;">&nbsp;</td>
                                    <td style="width: 31.1557%;">
                                    <p>&nbsp;</p>
                                    <p>&nbsp;</p>
                                    </td>
                                    <td style="width: 29.9383%;">&nbsp;</td>
                                    <td style="width: 33.9506%;">&nbsp;</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                    <p>Berdasarkan Laporan Permohonan Rencana Kedatangan Alat Angkut/ Pemasukan/Pengeluaran/Serah Terima/Nota Intelejen atas media pembawa , Nomor&hellip;&hellip;&hellip; tanggal&hellip;&hellip;&hellip;. dan hasil Analisis Laporan No&hellip;Tanggal&hellip;</p>
                                    <p>Ditugaskan kepada Saudara, untuk melakukan :</p>
                                    <table style="border-collapse: collapse; width: 100%;" border="1">
                                    <tbody>
                                    <tr>
                                    <td style="width: 99.9999%; text-align: center;" colspan="3">A. Tindakan Karantina dan hal terkait lainnya, berupa:</td>
                                    </tr>
                                    <tr>
                                    <td style="width: 33.3333%;">Pemeriksaan Administrasi &amp; Kesesuaian<br />Pemeriksaan Kesehatan<br />Pengasingan &amp; Pengamatan<br />Pemeriksaan diatas Alat Angkut</td>
                                    <td style="width: 33.3333%;">Pemeriksaan Alat Angkut<br />Pengawasan Pihak Lain<br />Pengawalan Media <br />Pembawa<br />Perlakuan<br />Penahanan<br />Penolakan&nbsp;</td>
                                    <td style="width: 33.3333%;">
                                    <p>Penerbitan Surat Keterangan<br />Pemusnahan<br />Pembebasan sebagian<br />Pembebasan seluruh<br />Serah Terima<br />Monitoring<br />Lainnya</p>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td style="text-align: center; width: 99.9999%;" colspan="3">B. Penegakkan Hukum dan hal terkait lainnya, berupa</td>
                                    </tr>
                                    <tr>
                                    <td style="text-align: center; width: 33.3333%;">&nbsp;</td>
                                    <td style="width: 33.3333%; text-align: left;">Wasmalitrik<br />Gelar Perkara<br />Penyidikan<br />Melengkapi Pemberkasan<br />Lainnya</td>
                                    <td style="text-align: center; width: 33.3333%;">&nbsp;</td>
                                    </tr>
                                    </tbody>
                                    </table>
                                    <p>Demikian agar dilaksanakan dengan penuh tanggung jawab dan melaporkan hasil pelaksanaan&nbsp; tugas selambat-lambatnya 1 x 24 jam setelah selesai dilaksanakan.</p>
                                    <table style="border-collapse: collapse; width: 100%;" border="1">
                                    <tbody>
                                    <tr>
                                    <td style="width: 65.7303%;">&nbsp;</td>
                                    <td style="width: 34.2697%;">
                                    <p>Kepala UPT/ Pejabat</p>
                                    <p>&nbsp;</p>
                                    <p>&nbsp;</p>
                                    <p>Nama <br />NIP</p>
                                    </td>
                                    </tr>
                                    </tbody>
                                </table>  
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

export default PrintK11