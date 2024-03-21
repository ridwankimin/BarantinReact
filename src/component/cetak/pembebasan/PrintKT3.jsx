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

function PrintKT3(props) {
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
            KT.3 <span className="text-muted fw-light">(SERTIFIKAT KESEHATAN TUMBUHAN ANTAR AREA)</span>
        </h4>

        {/* <!-- Multi Column with Form Separator --> */}
        <div className="row">
            {/* <!-- Form Separator --> */}
            <div className="col-xxl">
                <div className="card mb-4" >
                    {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                    <div className="container" id="hal1" >
                        <div className="row text-end">
                            <p>&nbsp;</p><h2> KT-1</h2>
                        </div>
                        <p><br /></p>
                        <p style={{textAlign: 'center'}}><img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src={garuda} alt="garuda" width="100" height="100" /></p>
                        <p style={{textAlign: 'center'}}><strong>REPUBLIK INDONESIA</strong> <br /><strong>BADAN KARANTINA INDONESIA</strong></p>
                        <p style={{textAlign: 'center',fontSize:16}}><strong><u>SERTIFIKAT KESEHATAN TUMBUHAN ANTAR AREA</strong</u></p>
                        <p style={{textAlign: 'center'}}>Nomor:...............................</p>
                        <p style={{textAlign: 'justify'}}>Berdasarkan Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan dan Peraturan Pemerintah Nomor 29 Tahun 2023 tentang Peraturan Pelaksanaa Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan, serta menindaklanjuti Laporan Pemasukan/Pengeluaran/Transit*) Media Pembawa Nomor .....................Tanggal ............................., menyatakan hasil tindakan karantina tumbuhan dan/atau pengawasan, media pembawa tersebut di bawah ini:</p>
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
                    </div>          
                </div>
            </div>
        </div>
    </div>
</div>
)
}

export default PrintKT3