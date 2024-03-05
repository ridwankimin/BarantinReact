import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import garuda from '../logo/garuda.png'
import '../assets/css/k12.css'


function PrintKh1() {


    const printDocument= () => {
      const input = document.getElementById('hal1');
      const input2 = document.getElementById('hal2');
      const pdf = new jsPDF();
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
          pdf.addPage();
          html2canvas(input2)
            .then((canvas2) => {
              const imgData2 = canvas2.toDataURL('image/png');
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = pdf.internal.pageSize.getHeight();
              const imgWidth = canvas2.width;
              const imgHeight = canvas2.height;
              const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
              const imgX = (pdfWidth - imgWidth * ratio)/2;
              const imgY = 5;
              pdf.addImage(imgData2,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
              pdf.save("k92h.pdf");
            })
          ;
        })
       } ;
      
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        KH.1 <span className="text-muted fw-light">(SERTIFIKAT KESEHATAN HEWAN)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4" >
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <div className="container" id="hal1">
                <div className="row text-end">
                  <p>&nbsp;</p>
                        <h2> KH-1</h2>
                    </div>
<p style={{textAlign: 'center'}}><img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src={garuda} alt="garuda" width="100" height="100" /></p>
<p style={{textAlign: 'center',fontSize:16}}><strong>REPUBLIK INDONESIA</strong> <br /><strong>BADAN KARANTINA INDONESIA</strong></p>
<p style={{textAlign: 'center', fontSize:12}}><em><strong>REPUBLIC OF INDONESIA</strong></em><br /><em><strong>INDONESIAN QUARANTINE AGENCY</strong></em></p>
<p style={{textAlign: 'right'}}>No: 01901932019</p>
<p style={{textAlign: 'center',fontSize:16}}><strong>SERTIFIKAT KESEHATAN HEWAN</strong> <br /><strong><em>ANIMAL HEALTH CERTIFICATE </em></strong></p>
<p style={{textAlign: 'center'}}>Nomor:...............................<br /><em>Number</em></p>
<p style={{textAlign: 'justify'}}>Berdasarkan Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan dan Peraturan Pemerintah Nomor 29 Tahun 2023 tentang Peraturan Pelaksanaa Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan, serta menindaklanjuti Permohonan Tindakan Karantina dan Pengawasan dan/atau Pengendalian Serta Berita Acara Serah Terima Media Pembawa Di Tempat Pemasukan, Pengeluaran dan/atau Transit Nomor &hellip;&hellip;&hellip;&hellip;. Tanggal&hellip;&hellip;&hellip;&hellip;&hellip;, ternyata media pembawa tersebut di bawah ini:</p>
<p><strong>I. Rincian Keterangan</strong><br /><em>&nbsp; &nbsp; Detail of Description</em></p>
<table style={{borderCollapse: 'collapse', width: '99.2978%', height: '158px'}} border="1" id="tabel">
<tbody>
<tr style={{height: '18px'}}>
<td style={{width: '32.1075%', height: '36px'}} rowspan="2">1. Negara / Daerah <br /><em>&nbsp; &nbsp; Country/Region</em></td>
<td style={{width: '2.26309%', textAlign: 'center', height: '36px'}} rowspan="2">:</td>
<td style={{width: '30.9848%', height: '18px'}} colspan="2">&nbsp;Asal (<em>origin</em>)</td>
<td style={{width: '43.9887%', height: '18px'}}>&nbsp;Tujuan <em>(Destination)</em></td>
</tr>
<tr style={{height: '18px'}}>
<td style={{width: '30.9848%', height: '18px'}} colspan="2">&nbsp;</td>
<td style={{width: '43.9887%', height: '18px'}}>&nbsp;</td>
</tr>
<tr style={{height: '25px'}}>
<td style={{width: '32.1075%', height: '50px'}} rowspan="2">2. Nama, Alamat, dan&nbsp; <br />&nbsp; &nbsp; NIB/NPWP/KTP/SIM/Passpor <br /><em>&nbsp; &nbsp; Name and Address</em></td>
<td style={{width: '2.26309%', height: '25px', textAlign: 'center'}} rowspan="2">:</td>
<td style={{width: '30.9848%', height: '25px'}} colspan="2">&nbsp;Pengirim (<em>Consignor</em>)</td>
<td style={{width: '43.9887%', height: '25px'}}>&nbsp;Penerima <em>(Consignee)</em></td>
</tr>
<tr style={{height: '25px'}}>
<td style={{width: '30.9848%', height: '25px'}} colspan="2">&nbsp;</td>
<td style={{width: '43.9887%', height: '25px'}}>&nbsp;</td>
</tr>
<tr style={{height: '36px'}}>
<td style={{width: '49.863%', height: '36px'}} colspan="3">3. Tempat Pengeluaran dan Tanggal Muat<br /><em>&nbsp; &nbsp; Port of Exit and Date Of Loading</em></td>
<td style={{width: '59.4811%', height: '36px'}} colspan="2">4. Tempat Pemasukan dan Tanggal Bongkar<br /><em>&nbsp; &nbsp; Port of Entry and Date of Unloading</em></td>
</tr>
<tr style={{height: '18px'}}>
<td style={{width: '49.863%', height: '18px'}} colspan="3">5. Tempat Transit<br /><em>&nbsp; &nbsp; Port of Transit</em></td>
<td style={{width: '59.4811%', height: '18px'}} colspan="2">6.Jenis dan Identitas Alat Angkut<br /><em>&nbsp; &nbsp;Type and Identity of the Means of Conveyance</em></td>
</tr>
</tbody>
</table>
<p>*<sup>) </sup>&nbsp;Coret yang tidak perlu.<br /><em>&nbsp; &nbsp; Streak if not necessary</em></p>
<p><strong>II. Uraian Media Pembawa</strong><br />&nbsp; &nbsp; &nbsp;<em>Description of Carrier</em></p>
<table style={{borderCollapse: 'collapse', width: '100%'}} border="1" id="tabel">
<tbody>
<tr>
<td style={{width: '4.83146%'}}>No. <br /><em>No.</em></td>
<td style={{width: '42.8932%'}}>Jenis Media Pembawa <br /><em>Type of Carrier</em></td>
<td style={{width: '9.60682%'}}>Jumlah <br /><em>Quantity</em></td>
<td style={{width: '8.34272%'}}>Satuan<br /><em>Unit</em></td>
<td style={{width: '34.3258%'}}>Keterangan <br /><em>Description</em></td>
</tr>
<tr>
<td style={{width: '4.83146%'}}>&nbsp;</td>
<td style={{width: '42.8932%'}}>
<p>&nbsp;</p>
</td>
<td style={{width: '9.60682%'}}>&nbsp;</td>
<td style={{width: '8.34272%'}}>&nbsp;</td>
<td style={{width: '34.3258%'}}>&nbsp;</td>
</tr>
</tbody>
</table>
<p>**: &nbsp;- Untuk hewan disebutkan bangsa, jenis kelamin, umur, dan keterangan lain;<br /><em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;For animal(s)</em><em>,</em> <em>the </em><em>breed, gender, age, and other description</em><em> shall be stated</em></p>

<p>Berdasarkan hasil tindakan karantina yang telah dilakukan, dengan ini menerangkan bahwa*** ) :<br /><em>Based on quarantine measure, hereby explains that:</em> <br />

<input type="checkbox" />&nbsp;Telah memenuhi seluruh dokumen karantina hewan yang dipersyaratkan;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>Has fulfilled all required animal quarantine documents</em> <br />
<input type="checkbox" />&nbsp;Dalam keadaan sehat dan baik serta telah memenuhi persyaratan sanitasi; <br />&nbsp;&nbsp;&nbsp;<em>Is (are) healthy and in good condition and </em><em>has (have) fulfilled</em><em> the sanitary requirements</em> <br />
<input type="checkbox" />&nbsp;Telah memenuhi seluruh dokumen lain yang dipersyaratkan;<br />&nbsp;&nbsp;&nbsp;<em>Has fulfilled</em><em> all </em><em>require</em><em>d </em><em>others document</em><em>s</em> <br />
<input type="checkbox" />&nbsp;Lainnya: ......<br />&nbsp;&nbsp;&nbsp;<em>Others</em><br /></p>

<p>***)&nbsp; Beri tanda ✓ pada kotak yang sesuai<br />&nbsp; &nbsp; &nbsp; &nbsp; <em>Tick to the appropriate box(es)</em></p>
<table style={{borderCollapse: 'collapse', width: '100%'}} border="1" id="tabel">
<tbody>
<tr>
<td style={{width: '25%',verticalAlign:'top'}}>
Tanggal dikeluarkan: <br />Date of Issued <br /><br />
Di <br />At
</td>
<td style={{width: '50%'}}>
<p>Dokter Hewan Karantina <br /><em>Quarantine Veterinanian</em></p>
<p>Nama <br /><em>Name</em></p>
<p>NIP&emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; Tanda tangan<br /><em>IQV&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; Signature&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</em></p>
</td>
<td style={{width: '25%'}}>&nbsp;</td>
</tr>
</tbody>
</table>
<p>Pernyataan lain dan hasil pemeriksaan laboratorium di halaman berikut. <br /> <em>Other declaration and laboratory results are in the next page.</em></p>
                <div/>
              </div>
              <div className="container " id="hal2">
              
                <p><img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src={garuda} alt="garuda" width="100" height="100" /></p>
                <p style={{textAlign: 'center'}}><strong>REPUBLIK INDONESIA<br />BADAN KARANTINA INDONESIA</strong></p>
                <p style={{textAlign: 'center'}}><strong><em>REPUBLIC OF INDONESIA<br /><em>INDONESIAN QUARANTINE AGENCY</em></em></strong></p>
                <p>&nbsp;</p>
                <p style={{textAlign: 'center'}}><strong><span style={{textDecoration: 'underline'}}>PERNYATAAN</span><br /><em>DECLARATION</em></strong></p>
                <p style={{textAlign: 'left'}}><strong>&nbsp;Hewan <br /><em>&nbsp;Animal</em></strong></p>
                <table style={{borderCollapse: 'collapse', width: '100%'}} border="1">
                <tbody>
                <tr>
                <td style={{width: '100%'}}>
                    <p>&nbsp;</p>
                <p><input type="checkbox" />Pemenuhan persyaratan teknis negara tujuan (Untuk Media Pembawa Ekspor) <br /><em>The fulfillment of technical requirements of the country of destination (for the export carrier)</em></p>
                <p>&nbsp;</p>
                <p><input type="checkbox" />Hasil Pemeriksaan Laboratorium (dilampirkan hasil pengujian) <br /> <em> Result(s) of Laboratory Testing (the result (s) is/are attached)</em></p>
                <p>&nbsp;</p>
                <p><input type="checkbox" />Lainnya <br /><em>Others</em></p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                </td>
                </tr>
                </tbody>
                </table>
                <p style={{textAlign: 'left'}}>&nbsp;</p>
                <p>&nbsp;</p>
                <table style={{borderCollapse: 'collapse', width: '100%'}} border="1">
                <tbody>
                <tr>
                <td style={{width:'20%'}}>&nbsp;</td>
                <td style={{width: '40%'}} colspan="2">Dokter Hewan Karantina <br /><em>Quarantine Veterinarian</em></td>
                <td style={{width: '20%'}}>&nbsp;</td>
                <td style={{width: '20%', textAlign: 'left'}}>Stempel <br /><em>Stamp</em></td>
                </tr>
                <tr>
                <td style={{width: '20%', textAlign: 'left'}} colspan="2">
                <p>Nama : <br /><em>Name</em></p>
                <p>&nbsp;</p>
                <p>NIP :<br /><em> IQV</em></p>
                </td>
                <td style={{width: '5%'}}>&nbsp;</td>
                <td style={{width: '20%', textAlign: 'left'}}>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>Tanda Tangan <br /><em>Signature</em></p>
                </td>
                <td style={{width: '20%', textAlign: 'left'}}>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                </td>
                </tr>
                <tr style={{borderTop:'1px solid black'}}>
                <td style={{width: '20%', textAlign: 'left'}} colspan="2">Tanggal Dikeluarkan: <br /><em>Date Of Issued</em></td>
                <td style={{width: '5%'}}>Di <br /><em>At</em></td>
                <td style={{width: '20%'}}>&nbsp;</td>
                <td style={{width: '20%'}}>&nbsp;</td>
                </tr>
                </tbody>
                </table>
                
              </div>
              <div className="container">
                  <div className="row-md-1 ">
                          <button className="btn btn-primary" onClick={printDocument}>Cetak Pelepasan</button>    
                  </div>
              </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default PrintKh1