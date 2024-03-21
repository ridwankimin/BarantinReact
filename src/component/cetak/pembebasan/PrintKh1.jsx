/* eslint-disable react/prop-types */
import React, { useState } from "react";
import moment from "moment";
import html2canvas from "html2canvas";
import garuda from '../../../logo/garuda.png'
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

function PrintKh1(props) {
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
            ;
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
        <span id="print_to_pdf">
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
                  <p style={{textAlign: 'center'}}><img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src={garuda} alt="garuda" width="100" height="100" /></p>
                  <p style={{textAlign: 'center',fontSize:16}}><strong>REPUBLIK INDONESIA</strong> <br /><strong>BADAN KARANTINA INDONESIA</strong></p>
                  <p style={{textAlign: 'center', fontSize:12}}><em><strong>REPUBLIC OF INDONESIA</strong></em><br /><em><strong>INDONESIAN QUARANTINE AGENCY</strong></em></p>
                  <p style={{textAlign: 'right'}}>No: {noSeri || cetak.dataKH1?.nomor_seri}</p>
                  <p style={{textAlign: 'center',fontSize:16}}><strong>SERTIFIKAT KESEHATAN HEWAN</strong> <br /><strong><em>ANIMAL HEALTH CERTIFICATE </em></strong></p>
                  <p style={{textAlign: 'center'}}>Nomor: <strong>{cetak.dataKH1?.nomor}</strong><br /><em>Number</em></p>
                  <p style={{textAlign: 'justify'}}>Berdasarkan Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan dan Peraturan Pemerintah Nomor 29 Tahun 2023 tentang Peraturan Pelaksanaa Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan, serta menindaklanjuti Permohonan Tindakan Karantina dan Pengawasan dan/atau Pengendalian Serta Berita Acara Serah Terima Media Pembawa Di Tempat Pemasukan, Pengeluaran dan/atau Transit Nomor <strong>{cetak.listPtk?.no_dok_permohonan}</strong> Tanggal <strong>{moment(cetak.listPtk?.tgl_dok_permohonan).format('DD/MM/YYYY')}</strong> ternyata media pembawa tersebut di bawah ini:</p>
                  <p><strong>I. Rincian Keterangan</strong><br /><em>&nbsp; &nbsp; Detail of Description</em></p>
                  <table style={{borderCollapse: 'collapse', width: '99.2978%', height: '158px'}} border="1" id="tabel">
                  <tbody>
                  <tr style={{height: '18px'}}>
                    <td style={{width: '32.1075%', height: '36px'}} rowSpan="2">1. Negara / Daerah <br /><em>&nbsp; &nbsp; Country/Region</em></td>
                    <td style={{width: '2.26309%', textAlign: 'center', height: '36px'}} rowSpan="2">:</td>
                    <td style={{width: '30.9848%', height: '18px'}} colSpan="2">&nbsp;Asal (<em>origin</em>)</td>
                    <td style={{width: '43.9887%', height: '18px'}}>&nbsp;Tujuan <em>(Destination)</em></td>
                  </tr>
                  <tr style={{height: '18px'}}>
                    <td style={{width: '30.9848%', height: '18px'}} colSpan="2"><strong>{cetak.dataKH1?.negara_asal}</strong></td>
                    <td style={{width: '43.9887%', height: '18px'}}><strong>{cetak.dataKH1?.negara_tujuan}</strong></td>
                  </tr>
                    <tr style={{height: '25px'}}>
                    <td style={{width: '32.1075%', height: '50px'}} rowSpan="2">2. Nama, Alamat, dan&nbsp; <br />&nbsp; &nbsp; NIB/NPWP/KTP/SIM/Passpor <br /><em>&nbsp; &nbsp; Name and Address</em></td>
                    <td style={{width: '2.26309%', height: '25px', textAlign: 'center'}} rowSpan="2">:</td>
                    <td style={{width: '30.9848%', height: '25px'}} colSpan="2">&nbsp;Pengirim (<em>Consignor</em>)</td>
                    <td style={{width: '43.9887%', height: '25px'}}>&nbsp;Penerima <em>(Consignee)</em></td>
                  </tr>
                  <tr style={{height: '25px'}}>
                    <td style={{width: '30.9848%', height: '25px'}} colSpan="2">
                      <strong>{cetak.dataKH1?.nama_pengirim}<br /> {cetak.listPtk?.jenis_identitas_pengirim} : {cetak.listPtk?.nomor_identitas_pengirim} <br /> {cetak.dataKH1?.alamat_pengirim}</strong>
                    </td>
                    <td style={{width: '43.9887%', height: '25px'}}>
                      <strong>{cetak.dataKH1?.nama_penerima}<br /> {cetak.listPtk?.jenis_identitas_penerima} : {cetak.listPtk?.nomor_identitas_penerima} <br /> {cetak.dataKH1?.alamat_penerima}</strong>
                    </td>
                  </tr>
                  <tr style={{height: '36px'}}>
                  <td style={{width: '49.863%', height: '36px'}} colSpan="3">3. Tempat Pengeluaran dan Tanggal Muat : <strong>{cetak.dataKH1?.port1} | {moment(cetak.listPtk?.tanggal_rencana_berangkat_terakhir).format('DD/MM/YYYY')}</strong><br /><em>&nbsp; &nbsp; Port of Exit and Date Of Loading</em></td>
                  <td style={{width: '59.4811%', height: '36px'}} colSpan="2">4. Tempat Pemasukan dan Tanggal Bongkar : <strong>{cetak.dataKH1?.port1} | {moment(cetak.listPtk?.tanggal_rencana_tiba_terakhir).format('DD/MM/YYYY')}</strong><br /><em>&nbsp; &nbsp; Port of Entry and Date of Unloading</em></td>
                  </tr>
                  <tr style={{height: '18px'}}>
                  <td style={{width: '49.863%', height: '18px'}} colSpan="3">5. Tempat Transit <strong>{cetak.listPtk?.pelabuhan_transit}</strong><br /><em>&nbsp; &nbsp; Port of Transit</em></td>
                  <td style={{width: '59.4811%', height: '18px'}} colSpan="2">6.Jenis dan Identitas Alat Angkut : {cetak.dataKH1?.nama_alat_angkut_terakhir} , {cetak.dataKH1?.no_voyage_terakhir}<br /><em>&nbsp; &nbsp;Type and Identity of the Means of Conveyance</em></td>
                  </tr>
                  </tbody>
                  </table>
                  <p>*<sup>) </sup>&nbsp;Coret yang tidak perlu.<br /><em>&nbsp; &nbsp; Streak if not necessary</em></p>
                  <p><strong>II. Uraian Media Pembawa</strong><br />&nbsp; &nbsp; &nbsp;<em>Description of Carrier</em></p>
                  <table style={{borderCollapse: 'collapse', width: '100%'}} border="1" id="tabel">
                  <tbody>
                  <tr>
                  <th style={{width: '4.83146%'}}>No. <br /><em>No.</em></th>
                  <th style={{width: '42.8932%'}}>Jenis Media Pembawa <br /><em>Type of Carrier</em></th>
                  <th style={{width: '9.60682%'}}>Jumlah <br /><em>Quantity</em></th>
                  <th style={{width: '8.34272%'}}>Satuan<br /><em>Unit</em></th>
                  <th style={{width: '34.3258%'}}>Keterangan <br /><em>Description</em></th>
                  </tr>
                  {cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.nama_umum_tercetak}</td>
                        <td>{data.volume_lain}</td>
                        <td>{data.sat_lain}</td>
                        <td>{data.volume_netto} {data.sat_netto}, jantan: {data.jantanP8} betina:{data.betinaP8}</td>
                    </tr>      
                    ))
                    ):null
                }
                  </tbody>
                  </table>
                  <p>**: &nbsp;- Untuk hewan disebutkan bangsa, jenis kelamin, umur, dan keterangan lain;<br /><em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;For animal(s)</em><em>,</em> <em>the </em><em>breed, gender, age, and other description</em><em> shall be stated</em></p>

                  <p>Berdasarkan hasil tindakan karantina yang telah dilakukan, dengan ini menerangkan bahwa*** ) :<br /><em>Based on quarantine measure, hereby explains that:</em> <br />

                  {cetak.dataKH1?.m1 === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Telah memenuhi seluruh dokumen karantina hewan yang dipersyaratkan;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>Has fulfilled all required animal quarantine documents</em> <br />
                  {cetak.dataKH1?.m2 === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Dalam keadaan sehat dan baik serta telah memenuhi persyaratan sanitasi; <br />&nbsp;&nbsp;&nbsp;<em>Is (are) healthy and in good condition and </em><em>has (have) fulfilled</em><em> the sanitary requirements</em> <br />
                  {cetak.dataKH1?.m3 === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Telah memenuhi seluruh dokumen lain yang dipersyaratkan;<br />&nbsp;&nbsp;&nbsp;<em>Has fulfilled</em><em> all </em><em>require</em><em>d </em><em>others document</em><em>s</em> <br />
                  {cetak.dataKH1?.m_lain === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Lainnya: ......<br />&nbsp;&nbsp;&nbsp;<em>Others</em><br /></p>

                  <p>*)&nbsp; Beri tanda ✓ pada kotak yang sesuai<br />&nbsp; &nbsp; &nbsp; &nbsp; <em>Tick to the appropriate box(es)</em></p>
                  <table style={{borderCollapse: 'collapse', width: '100%'}} border="1" id="tabel">
                  <tbody>
                  <tr>
                  <td style={{width: '25%',verticalAlign:'top'}}>
                  Tanggal dikeluarkan: <strong>{moment(cetak.dataKH1?.tanggal).format('DD/MM/YYYY')}</strong><br />Date of Issued <br /><br />
                  Di : <strong>{cetak.dataKH1?.diterbitkan_di}</strong> <br />At
                  </td>
                  <td style={{width: '50%'}}>
                  <p>Dokter Hewan Karantina <br /><em>Quarantine Veterinanian</em></p>
                  <p>Nama : <strong>{cetak.petugas?.length > 0 ? cetak.petugas[0].nama : ""}</strong>  <br /><em>Name</em></p>
                  <p>NIP : <strong>{cetak.petugas?.length > 0 ? cetak.petugas[0].nip : ""}</strong>  &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; Tanda tangan<br /><em>IQV&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; Signature&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</em></p>
                  </td>
                  <td style={{verticalAlign:'top' ,width: '25%'}}>Stamp<br /><em>Stamp</em></td>
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
                <p>&nbsp;{cetak.dataKH1?.p_teknis !== null ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Pemenuhan persyaratan teknis negara tujuan (Untuk Media Pembawa Ekspor) <br /><em>The fulfillment of technical requirements of the country of destination (for the export carrier)</em><br /> <strong>{cetak.dataKH1?.p_teknis}</strong></p>
                <p>&nbsp;</p>
                <p>&nbsp;{cetak.dataKH1?.p_lab !== null ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Hasil Pemeriksaan Laboratorium (dilampirkan hasil pengujian) <br /> <em> Result(s) of Laboratory Testing (the result (s) is/are attached)</em><br /> <strong>{cetak.dataKH1?.p_lab}</strong></p>
                <p>&nbsp;</p>
                <p>&nbsp;{cetak.dataKH1?.p_lain !== null ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Lainnya <br /><em>Others</em><br /> <strong>{cetak.dataKH1?.p_lain}</strong></p>
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
                <td style={{width: '40%'}} colSpan="2">Dokter Hewan Karantina <br /><em>Quarantine Veterinarian</em></td>
                <td style={{width: '20%'}}>&nbsp;</td>
                <td style={{width: '20%', textAlign: 'left'}}>Stempel <br /><em>Stamp</em></td>
                </tr>
                <tr>
                <td style={{width: '20%', textAlign: 'left'}} colSpan="2">
                <p>Nama : &nbsp; <strong>{cetak.petugas?.length > 0 ? cetak.petugas[0].nama : ""}</strong> <br /><em>Name</em></p>
                <p>&nbsp;</p>
                <p>NIP : <strong>{cetak.petugas?.length > 0 ? cetak.petugas[0].nip : ""}</strong><br /><em> IQV</em></p>
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
                <td style={{width: '20%', textAlign: 'left'}} colSpan="2">Tanggal Dikeluarkan: <br /><em>Date Of Issued</em></td>
                <td style={{width: '5%'}}>Di <br /><em>At</em></td>
                <td style={{width: '20%'}}>&nbsp;</td>
                <td style={{width: '20%'}}>&nbsp;</td>
                </tr>
                </tbody>
                </table>
                <p>&nbsp;</p>
                
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
        </span>
      </div>
  )
}

export default PrintKh1