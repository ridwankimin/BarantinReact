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

function PrintK71(props) {
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
        K7.1 <span className="text-muted fw-light">(SURAT PENOLAKAN)</span>
    </h4>
 
    <div className="row">
        <div className="col-xxl">
            <div className="card mb-4" >
                <div className="container" id="hal1">
                    <div className="row text-end">
                        <p>&nbsp;</p>
                        <h2> K7-1</h2>
                    </div>
                        <p style={{textAlign: 'center'}}><strong><u>SURAT PENOLAKAN</u></strong><br />Nomor: <strong>{cetak.dataK71?.length >= 1 ? cetak.dataK71[0]?.nomor : ""}</strong></p>
                        <p style={{textAlign: 'center'}}>&nbsp;</p>
                        <p style={{textAlign: 'left'}}>Yth,<br />Sdr <strong>{cetak.listPtk?.nama_penerima}</strong><br />di<br />&emsp;&emsp;tempat</p>
                        <p style={{textAlign: 'justify'}}>&emsp;&emsp;Berdasarkan Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan dan Peraturan Pemerintah Nomor 29 Tahun 2023 tentang Peraturan Pelaksanaa Undang-Undang Nomor 21 Tahun 2019 tentang Karantina Hewan, Ikan, dan Tumbuhan, serta menindaklanjuti Permohonan Tindakan Karantina Dan Pengawasan Dan/Atau Pengendalian Media Pembawa Di Tempat Pemasukan, Pengeluaran Dan/Atau Transit Nomor <strong>{cetak.listPtk?.no_dok_permohonan}</strong> Tanggal <strong>{cetak.listPtk?.tgl_dok_permohonan}</strong>, bersama ini diberitahukan bahwa terhadap media pembawa tersebut di bawah ini <strong>ditolak pemasukan/pengeluarannya*)</strong>.</p>
                        <table style={{borderCollapse: 'collapse', width: '100%'}} border="1" id="tabel">
                        <tbody>
                        <tr>
                        <td style={{width: '99.9999%'}} colSPan="3"><strong>I. KETERANGAN MEDIA PEMBAWA</strong></td>
                        </tr>
                        <tr>
                        <td style={{width: '99.9999%'}} colSPan="3">Jenis Media Pembawa:<br /><strong>{cetak.listPtk?.jenis_media_pembawa}</strong></td>
                        </tr>
                        <tr>
                        <td style={{width: '33.3333%'}}>Nama umum/dagang:</td>
                        <td style={{width: '33.3333%'}}>Nama ilmiah**):</td>
                        <td style={{width: '33.3333%'}}>Kode HS:</td>
                        </tr>
                        <tr>
                        <td>Bentuk</td>
                        <td>Jumlah</td>
                        <td>Negara/area asal*) dan tempat pengeluaran</td>
                        </tr>
                        <tr>
                        <td>Negara/area tujuan*) dan tempat pemasukan</td>
                        <td>Lokasi media pembawa</td>
                        <td>Jenis dan nama alat angkut</td>
                        </tr>
                        <tr>
                        <td style={{width: '99.9999%'}} colSPan="3">
                        <table style={{borderCollapse: 'collapse', width: '100%'}} border="1">
                        <tbody>
                        <tr>
                        <td style={{width: '50%'}}>Tanggal berangkat dari negara/area asal:</td>
                        <td style={{width: '50%'}}>Tanggal tiba di negara/area tujuan</td>
                        </tr>
                        </tbody>
                        </table>
                        </td>
                        </tr>
                        <tr>
                        <td style={{width: '99.9999%'}} colSPan="3"><strong>II. ALASAN PENOLAKAN</strong></td>
                        </tr>
                        <tr>
                        <td style={{width: '99.9999%'}} colSPan="3">
                        
                        {cetak.dataK37a?.rekomendasi_id === 8 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Tidak dapat melengkapi dokumen persyaratan dalam waktu yang ditetapkan
                        Persyaratan dokumen lain tidak dapat dipenuhi dalam waktu yang ditetapkan
                        Berasal dari negara/daerah/tempat yang dilarang
                        Berasal dari negara/daerah tertular/berjangkit wabah*) penyakit hewan menular
                        Jenis media pembawa yang dilarang
                        Sanitasi tidak baik, kemasan tidak utuh/rusak, terjadi perubahan sifat, terkontaminasi, membahayakan kesehatan hewan dan atau manusia.
                        Laporan pemeriksaan di atas alat angkut ditemukan HPHK/HPIK/OPTK
                        Tidak bebas dan/atau tidak dapat dibebaskan dari HPHK/HPIK/OPTK
                        
                        Lainnya:</td>
                        </tr>
                        <tr>
                        <td style={{width: '99.9999%'}} colSPan="3">
                        <p>Sehubungan dengan itu, Saudara diwajibkan untuk***):</p>
                        mengeluarkan media pembawa tersebut dari wilayah Negara Republik Indonesia dan apabila dalam jangka waktu 3 (tiga) hari kerja sejak diterimanya Surat Penolakan ini kewajiban tersebut tidak dilaksanakan, terhadap media pembawa dimaksud akan dilakukan pemusnahan.
                        mengeluarkan media pembawa tersebut dari area tujuan ke area asal dan apabila dalam jangka waktu 3 (tiga) hari kerja sejak diterimanya Surat Penolakan ini kewajiban tersebut tidak dilaksanakan, terhadap media pembawa dimaksud akan dilakukan pemusnahan.
                        mengeluarkan media pembawa tersebut dari tempat pengeluaran dan apabila dalam jangka waktu 3 (tiga) hari kerja sejak diterimanya Surat Penolakan ini kewajiban tersebut tidak dilaksanakan, terhadap media pembawa dimaksud akan dilakukan pemusnahan
                        tidak mengirim media pembawa tersebut ke negara/area tujuan.
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <p>Demikian Surat Penolakan ini disampaikan, atas perhatian dan kerjasama Saudara diucapkan terima kasih.</p>
                        <table style={{width: '100%', borderCollapse: 'collapse', borderStyle: 'none'}}>
                        <tbody>
                        <tr>
                        <td style={{width: '65.0281%'}}>&nbsp;</td>
                        <td style={{width: '34.9719%'}}>Diterbitkan di<br />Pada Tanggal <br />Pejabat Karantina<br /><br /><br /><br />nama<br />NIP.</td>
                        </tr>
                        </tbody>
                        </table>
                        <p>
                        Tembusan Yth.: <br/>
                        1. Otoritas Pelabuhan Laut/Bandara/Lainnya*) <br/>
                        2. Kepala Kantor Pelayanan Bea dan Cukai di  <br />	
                        3.   ………………………………………… (Pengelola Pelabuhan/Bandara/Kantor Pos/Lainnya)

                        </p>
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

export default PrintK71