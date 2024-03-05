import React,{useRef} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import garuda from '../logo/garuda.png'
import '../assets/css/k91.css'


function PrintK92i() {

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
           
            pdf.save('K92i.pdf');
        });
    };


  return (
    <div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-9.2.I <span className="text-muted fw-light">(SERTIFIKAT PELEPASAN KARANTINA IKAN)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4" >
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <div className="container" ref={pdfRef} id="hal" >
                    <p style={{textAlign: 'center'}}><strong><u>SERTIFIKAT PELEPASAN KARANTINA IKAN&nbsp;</u></strong><br />Nomor:187261872681</p>
                    <p style={{textAlign: 'justify'}}>Berdasarkan Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan, Peraturan Pemerintah Nomor 29 Tahun 2023 tentang Peraturan Pelaksanaa Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan dan dalam rangka pencegahan Hama dan Penyakit Ikan Karantina, Agensia Hayati, Jenis Asing Invasif, Produk Rekayasa Genetik, Sumber Daya Genetik serta menjaga Keamanan dan Mutu Pangan atau Pakan dan peredaran ikan yang dilarang serta dibatasi di dalam wilayah Negara Republik Indonesia serta menindaklanjuti Permohonan Tindakan Karantina dan Pengawasan dan/atau Pengendalian Serta Berita Acara Serah Terima Media Pembawa Di Tempat Pemasukan, Pengeluaran dan/atau Transit Nomor &hellip;&hellip;&hellip;&hellip;. Tanggal &hellip;&hellip;&hellip;&hellip;.., hasil pelaksanaan tindakan karantina ikan terhadap Media pembawa:</p>
                    <p style={{textAlign: 'justify'}}>&nbsp;</p>
                    <table style={{borderCollapse: 'collapse', width: '100%', height: '243px'}} border="1" id="tabel">
                    <tbody>
                    <tr style={{height: '18px'}}>
                    <td style={{width: '100%', height: '18px'}} colspan="4">Jenis dan jumlah:</td>
                    </tr>
                    <tr style={{height: '18px'}}>
                    <td style={{width: '5.79561%', height: '61px'}} rowspan="2">No</td>
                    <td style={{width: '67.1468%', height: '18px'}} colspan="2">&nbsp;JENIS MEDIA PEMBAWA*)</td>
                    <td style={{width: '27.0576%', height: '18px'}}>&nbsp;JUMLAH</td>
                    </tr>
                    <tr style={{height: '43px'}}>
                    <td style={{width: '29.2525%', height: '43px'}}>&nbsp;Nama Latin</td>
                    <td style={{width: '37.8943%', height: '43px'}}>&nbsp;Nama Umum</td>
                    <td style={{width: '27.0576%', height: '43px'}}>(ekor/lbr/kg/gr/l/ml)**)</td>
                    </tr>
                    <tr style={{height: '40px'}}>
                    <td style={{width: '5.79561%', height: '40px'}}>&nbsp;</td>
                    <td style={{width: '29.2525%', height: '40px'}}>&nbsp;</td>
                    <td style={{width: '37.8943%', height: '40px'}}>&nbsp;</td>
                    <td style={{width: '27.0576%', height: '40px'}}>&nbsp;</td>
                    </tr>
                    <tr style={{height: '34px'}}>
                    <td style={{width: '100%', height: '34px'}} colspan="4">&nbsp;Total:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Ekor&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;lbr&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; kg&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; gr&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;l&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;ml</td>
                    </tr>
                    <tr style={{height: '18px'}}>
                    <td style={{width: '100%', height: '18px'}} colspan="4">&nbsp;</td>
                    </tr>
                    <tr style={{height: '18px'}}>
                    <td style={{width: '35.0481%', height: '18px'}} colspan="2">Identitas Pemilik <br />Nama <br />Alamat <br />NIB/NPWP/KTP/SIM/Passpor</td>
                    <td style={{width: '37.8943%', height: '18px'}}>Identitas Penerima <br />Nama <br />Alamat <br />NIB/NPWP/KTP/SIM/Passpor</td>
                    <td style={{width: '27.0576%', height: '18px',verticalAlign:'top'}}>Negara / area asal</td>
                    </tr>
                    <tr style={{height: '18px'}}>
                    <td style={{width: '35.0481%', height: '18px'}} colspan="2">Tanggal pengiriman</td>
                    <td style={{width: '37.8943%', height: '18px'}}>Tanggal pemasukan</td>
                    <td style={{width: '27.0576%', height: '18px'}}>Alat angkut</td>
                    </tr>
                    <tr style={{height: '18px'}}>
                    <td style={{width: '35.0481%', height: '18px',verticalAlign:'top'}} colspan="2">Persyaratan lain</td>
                    <td style={{width: '37.8943%', height: '18px',verticalAlign:'top'}}>Tujuan Pengiriman</td>
                    <td style={{width: '27.0576%', height: '18px'}}>
                    <p>Hasil pemeriksaan <br />
                    <input type="checkbox" />Klinis <br />
                    <input type="checkbox" />Organoleptik <br />
                    <input type="checkbox" />Laboratoris  </p>
                    </td>
                    </tr>
                    <tr style={{height: '18px'}}>
                    <td style={{width: '100%', height: '18px'}} colspan="4">
                    <p>menunjukkan bahwa Media Pembawa tersebut pada saat pemeriksaan :</p>
                    <input type="checkbox" />Bebas dari Hama dan Penyakit Ikan Karantina <br />
                    <input type="checkbox" />Memenuhi persyaratan keamanan dan Mutu Pangan atau Pakan <br />
                    <input type="checkbox" />Bebas dari kontaminan, dan/atau <br />
                    <input type="checkbox" />Memenuhi persyaratan lainnya. <br />
                    
                    sehingga dapat dimasukkan ke dalam wilayah/area di dalam wilayah Negara Republik Indonesia.</td>
                    </tr>
                    </tbody>
                    </table>
                    <table style={{ borderStyle:'none',width: '100%'}}>
                    <tbody>
                    <tr>
                    <td style={{width: '33.3333%'}}>&nbsp;</td>
                    <td style={{width: '33.3333%', textAlign: 'center'}}>Stempel</td>
                    <td style={{width: '33.3333%'}}>
                    <p>Kota<br/>Pejabat Karantina,</p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p>Nama <br/>NIP</p>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <p>Catatan:<br />*) Lampiran, apabila diperlukan.<br />**) Coret yang tidak perlu</p>    
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

export default PrintK92i