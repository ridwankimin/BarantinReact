import React,{useRef} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import garuda from '../logo/garuda.png'
import '../assets/css/k12.css'


function PrintK92t() {

    const pdfRef = useRef();
    

    const cetakPDF = () =>{
        const input = pdfRef.current;
        html2canvas(input).then((canvas)=>{
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p','mm','a4',true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio)/2;
            const imgY = 5;
            pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
           
            pdf.save('K91.pdf');
        });
    };
      
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-9.2.T <span className="text-muted fw-light">(SERTIFIKAT PELEPASAN KARANTINA TUMBUHAN)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4" >
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <div className="container" ref={pdfRef} id="hal1">
                    <p><br /></p>
                    <p style={{textAlign: 'center'}}><img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src={garuda} alt="garuda" width="100" height="100" /></p>
                    <p style={{textAlign: 'center'}}><strong>REPUBLIK INDONESIA</strong> <br /><strong>BADAN KARANTINA INDONESIA</strong></p>
                    <p style={{textAlign: 'center',fontSize:16}}><strong>SERTIFIKAT PELEPASAN KARANTINA TUMBUHAN/PENGAWASAN</strong></p>
                    <p style={{textAlign: 'center'}}>Nomor:...............................</p>
                    <p style={{textAlign: 'justify'}}>Berdasarkan Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan dan Peraturan Pemerintah Nomor 29 Tahun 2023 tentang Peraturan Pelaksanaa Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan, serta menindaklanjuti Permohonan Tindakan Karantina dan Pengawasan dan/atau Pengendalian Serta Berita Acara Serah Terima Media Pembawa Di Tempat Pemasukan, Pengeluaran dan/atau Transit Nomor &hellip;&hellip;&hellip;&hellip;. Tanggal&hellip;&hellip;&hellip;&hellip;&hellip;, ternyata media pembawa tersebut di bawah ini:</p>
                    <p><strong>I. Rincian Keterangan</strong><br /><em>&nbsp; &nbsp; Detail of Description</em></p>
                    <table style={{borderCollapse: 'collapse', width: '100%'}} border="1" id="tabel">
                    <tbody>
                    <tr>
                    <td style={{width: '33.3333%'}}>
                    <p>Nama umum/dagang:</p>
                    </td>
                    <td style={{width: '33.3333%'}}>Nama ilmiah**):</td>
                    <td style={{width: '33.3333%'}}>Kode HS:</td>
                    </tr>
                    <tr>
                    <td style={{width: '33.3333%'}}>Bentuk:</td>
                    <td style={{width: '33.3333%'}}>Jumlah:</td>
                    <td style={{width: '33.3333%'}}>
                    <p>Bahan pembungkus/kemasan:</p>
                    </td>
                    </tr>
                    <tr>
                    <td style={{width: '33.3333%'}}>
                    <p>Tanda pada pembungkus/kemasan:</p>
                    </td>
                    <td style={{width: '33.3333%'}}>
                    <p>Jumlah dan nomor peti kemas**):</p>
                    </td>
                    <td style={{width: '33.3333%'}}>
                    <p>Tujuan pemasukan:</p>
                    </td>
                    </tr>
                    <tr>
                    <td style={{width: '33.3333%'}}>
                    <p>Identitas Pemilik</p>
                    <p>Nama :</p>
                    <p>Alamat :</p>
                    NIB/NPWP/KTP/SIM/Passpor</td>
                    <td style={{width: '33.3333%'}}>
                    <p>Identitas Penerima</p>
                    <p>Nama :</p>
                    <p>Alamat :</p>
                    NIB/NPWP/KTP/SIM/Passpor</td>
                    <td style={{width: '33.3333%'}}>
                    <p>Negara/area asal*) dan tempat pengeluaran:</p>
                    </td>
                    </tr>
                    <tr>
                    <td style={{width: '33.3333%'}}>Tempat/area produksi media pembawa:</td>
                    <td style={{width: '33.3333%'}}>
                    <p>Jenis dan nama alat angkut:</p>
                    </td>
                    <td style={{width: '33.3333%'}}>
                    <p>Tanggal tiba:</p>
                    </td>
                    </tr>
                    <tr>
                    <td style={{width: '33.3333%'}} colspan="3">
                    Nomor dan tanggal dokumen persyaratan***):<br/>
                    <input type="checkbox" />&nbsp;<em>Phytosanitary Certificate</em>: <br />
                    <input type="checkbox" />&nbsp;Sertifikat Kesehatan Tumbuhan Antar Area:<br/>
                    <input type="checkbox" />&nbsp;Surat Keterangan Hasil Pengawasan:</td>
                    </tr>
                    </tbody>
                    </table>
                    <p>telah memenuhi semua persyaratan yang ditetapkan bagi pemasukan media pembawa sehingga dapat dimasukkan ke/di area tujuan dalam*) wilayah Negara Kesatuan Republik Indonesia.</p>
                    <table style={{borderStyle: 'none', width: '100%'}} border="1">
                    <tbody>
                    <tr>
                    <td style={{width: '70%'}}>&nbsp;</td>
                    <td style={{width: '70%'}}>
                    <p>Diterbitkan di:<br/>
                    <u>Pada tanggal: ..................................</u><br/>
                    Pejabat Karantina Tumbuhan.</p>
                    <br/><br/><br/>
                    <p><u>.......................................................</u></p>
                    NIP..................................................</td>
                    </tr>
                    </tbody>
                    </table>
                    <p><em>*)&nbsp;&nbsp;&nbsp; Coret yang tidak perlu;</em><br/>
                    <em>**)&nbsp; Diisi bila perlu dan/atau memungkinkan</em><br/>
                    <em>***) Beri tanda &radic; pada kotak yang sesuai.</em></p>

                <div/>
            </div>
             
              <div className="container">
                  <div className="row-md-1 ">
                          <button className="btn btn-primary" onClick={cetakPDF}>Cetak Pelepasan</button>    
                  </div>
              </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default PrintK92t