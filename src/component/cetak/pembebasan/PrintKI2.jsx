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

function PrintKI2(props) {
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
  
    <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-3 breadcrumb-wrapper mb-4">
            KI.2 <span className="text-muted fw-light">(SERTIFIKAT KESEHATAN IKAN DAN PRODUK IKAN DOMESTIK)</span>
        </h4>

        {/* <!-- Multi Column with Form Separator --> */}
        <div className="row">
            {/* <!-- Form Separator --> */}
            <div className="col-xxl">
                <div className="card mb-4" >
                    {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                    <div className="container" id="hal1" >
                        <div className="row text-end">
                            <p>&nbsp;</p><h2> KI-2</h2>
                        </div>
                        <p style={{textAlign: 'center'}}><strong><u>SERTIFIKAT KESEHATAN IKAN DAN PRODUK IKAN&nbsp;</u></strong><br />Nomor: <strong>{cetak.dataKi2?.nomor}</strong></p>
                        <p style={{textAlign: 'justify'}}>Berdasarkan Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan, Peraturan Pemerintah Nomor 29 Tahun 2023 tentang Peraturan Pelaksanaa Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan dan dalam rangka pencegahan Hama dan Penyakit Ikan Karantina, Agensia Hayati, Jenis Asing Invasif, Produk Rekayasa Genetik, Sumber Daya Genetik serta menjaga Keamanan dan Mutu Pangan atau Pakan dan peredaran ikan yang dilarang serta dibatasi di dalam wilayah Negara Republik Indonesia serta menindaklanjuti Permohonan Tindakan Karantina dan Pengawasan dan/atau Pengendalian Serta Berita Acara Serah Terima Media Pembawa Di Tempat Pemasukan, Pengeluaran dan/atau Transit Nomor <strong>{cetak.listPtk?.no_dok_permohonan}</strong>. Tanggal <strong>{moment(cetak.listPtk?.tgl_dok_permohonan).format('DD/MM/YYYY')}</strong> hasil pelaksanaan tindakan karantina ikan terhadap Media pembawa:</p>
                        <table style={{borderCollapse: 'collapse', width: '100%', height: '243px'}} border="1" id="tabel">
                        <tbody>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '100%', height: '18px'}} colSpan="4">Jenis dan jumlah:</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '5.79561%', height: '61px'}} rowSpan="2">No</td>
                        <td style={{width: '67.1468%', height: '18px'}} colSpan="2">&nbsp;JENIS MEDIA PEMBAWA*)</td>
                        <td style={{width: '27.0576%', height: '18px'}}>&nbsp;JUMLAH</td>
                        </tr>
                        <tr style={{height: '43px'}}>
                        <td style={{width: '29.2525%', height: '43px'}}>&nbsp;Nama Latin</td>
                        <td style={{width: '37.8943%', height: '43px'}}>&nbsp;Nama Umum</td>
                        <td style={{width: '27.0576%', height: '43px'}}>(ekor/lbr/kg/gr/l/ml)**)</td>
                        </tr>
                        {cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                          <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data.nama_latin_tercetak}</td>
                              <td>{data.nama_umum_tercetak}</td>
                              <td>{data.volumeP8?.toLocaleString()} {data.sat_lain}</td>
                          </tr>      
                          ))
                          ):null
                      }
                        <tr style={{height: '34px'}}>
                        <td style={{width: '100%', height: '34px'}} colSpan="4">&nbsp;Total:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Ekor&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;lbr&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; kg&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; gr&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;l&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;ml</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '100%', height: '18px',backgroundColor:'#DFDEDE'}} colSpan="4">&nbsp;</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '35.0481%', height: '18px'}} colSpan="2">Identitas Pengirim <br />Nama : <strong>{cetak.dataKi2?.nama_pengirim}</strong> <br />Alamat : <strong>{cetak.dataKi2?.alamat_pengirim}</strong><br />Jenis Identitas: <strong>{cetak.listPtk?.jenis_identitas_pengirim}</strong></td>
                        <td style={{width: '37.8943%', height: '18px'}}>Identitas Penerima <br />Nama: <strong>{cetak.dataKi2?.nama_penerima}</strong> <br />Alamat : <strong>{cetak.listPtk?.alamat_penerima}</strong><br />Jenis Identitas: <strong>{cetak.listPtk?.jenis_identitas_penerima}</strong></td>
                        <td style={{width: '27.0576%', height: '18px',verticalAlign:'top'}}>Area tujuan <br/><strong>{cetak.listPtk?.kota_tujuan}</strong></td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '35.0481%', height: '18px'}} colSpan="2">Bandar Udara/Pelabuhan tujuan:</td>
                        <td style={{width: '37.8943%', height: '18px'}}>Tanggal pengiriman:</td>
                        <td style={{width: '27.0576%', height: '18px'}}>Tanggal pelaksanaan tindakan karantina:</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '35.0481%', height: '18px',verticalAlign:'top'}} colSpan="2">Alat Angkut</td>
                        <td style={{width: '37.8943%', height: '18px',verticalAlign:'top'}}>Persyaratan lain</td>
                        <td style={{width: '37.8943%', height: '18px',verticalAlign:'top'}}>Tujuan Pengiriman: </td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '100%', height: '18px'}} colSpan="4">
                          Hasil pemeriksaan <br />
                          {cetak.dataKi2?.hasil_periksa === 'KLINIS' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Klinis <br />
                          {cetak.dataKi2?.hasil_periksa === 'ORGANOLEPTIS' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Organoleptik <br />
                          {cetak.dataKi2?.hasil_periksa === 'LABORATORIS' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Laboratoris  </td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '100%', height: '18px'}} colSpan="4">
                        menunjukkan bahwa Media Pembawa tersebut pada saat pemeriksaan : <br />
                        {cetak.dataKi2?.p1 === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Bebas dari Hama dan Penyakit Ikan Karantina <br />
                        {cetak.dataKi2?.p2 === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Memenuhi persyaratan keamanan dan Mutu Pangan atau Pakan <br />
                        {cetak.dataKi2?.p3 === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Bebas dari kontaminan, dan/atau <br />
                        {cetak.dataKi2?.p4 === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Memenuhi persyaratan lainnya. <br />
                        
                        sehingga dapat lalulintaskan ke area tujuan.</td>
                        </tr>
                        </tbody>
                        </table>
                        <table style={{ borderStyle:'none',width: '100%'}}>
                        <tbody>
                        <tr>
                        <td style={{width: '33.3333%'}}>&nbsp;</td>
                        <td style={{width: '33.3333%', textAlign: 'center'}}>Stempel</td>
                        <td style={{width: '33.3333%'}}>
                        <p>{cetak.dataKi2?.diterbitkan_di} {moment(cetak.dataKi2?.tanggal).format('DD MMM YYYY')}<br/>Pejabat Karantina,</p>
                        <br /><br /><br />
                        <p><strong>{cetak.petugas?.length >= 1 ? cetak.petugas[0]?.nama : ""}</strong><br/><strong>NIP.{cetak.petugas?.length >= 1 ? cetak.petugas[0]?.nip : ""}</strong></p>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <p>Catatan:<br />*) Lampiran, apabila diperlukan.<br />**) Coret yang tidak perlu</p>    
                    </div>          
                </div>
            </div>
        </div>
    </div>
</div>
)
}

export default PrintKI2