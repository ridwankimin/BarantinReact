/* eslint-disable react/prop-types */
import React, { useState } from "react";
import moment from "moment";
import html2canvas from "html2canvas";
import '../../../assets/css/test.scss'
import jsPDF from "jspdf";
import SpinnerDot from "../../loading/SpinnerDot";
import Swal from "sweetalert2";
import 'moment/locale/id';
import ModaAlatAngkut from '../../../model/master/modaAlatAngkut.json';

//moment.locale("id");

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

function PrintK72(props) {
    let [isLoading, setIsLoading] = useState(false)
    let [noSeri, setNoSeri] = useState(false)
    const cetak = props.dataCetak
    console.log(props)
    const tgl_dok = cetak.data72?.length >= 1 ? cetak.data72[0]?.tanggal : "";
    function modaAlatAngkut(e){
        return ModaAlatAngkut.find((element) => element.id == parseInt(e))
    }
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
        K-7.2 <span className="text-muted fw-light">(BERITA ACARA PENOLAKAN)</span>
    </h4>
 
    <div className="row">
        <div className="col-xxl">
            <div className="card mb-4" >
                <div className="container" id="hal1">
                    <div className="row text-end">
                        <p>&nbsp;</p>
                        <h2> K-7.2</h2>
                    </div>
                    <p style={{textAlign: 'center'}}><strong><u>BERITA ACARA PENOLAKAN</u></strong><br />Nomor: {cetak.data72?.nomor}.</p>
                    <p style={{textAlign: 'center'}}>&nbsp;</p>
                    <p style={{textAlign: 'justify'}}>&emsp;&emsp;Berdasarkan Permohonan Tindakan Karantina dan Pengawasan dan/atau Pengendalian Serta Berita Acara Serah Terima Media Pembawa Di Tempat Pemasukan, Pengeluaran dan/atau Transit Nomor <strong>{cetak.listPtk?.no_dok_permohonan}</strong>. Tanggal <strong>{moment(cetak.listPtk?.tgl_dok_permohonan).format('DD/MM/YYYY')}</strong></p>
                    <p style={{textAlign: 'justify'}}>Pada hari ini <strong>{moment(tgl_dok).format('dddd')}</strong>. tanggal <strong>{moment(tgl_dok).format('DD')}</strong> bulan <strong>{moment(tgl_dok).format('MMMM')}</strong> tahun <strong>{moment(tgl_dok).format('YYYY')}</strong> bertempat di <strong>{cetak.data72?.length >= 1 ? cetak.data72[0]?.diterbitkan_di:""}</strong> telah dilaksanakan penolakan terhadap media pembawa sebagai berikut:</p>
                    <table style={{borderCollapse: 'collapse', width: '100%', height: '190px'}} border="1" id="tabel">
                    <tbody>
                    <tr style={{height: '10px'}}>
                    <td style={{width: '99.9999%', height: '10px'}} colSpan="3">Jenis Media Pembawa:<br /><strong>{cetak.listPtk?.jenis_media_pembawa}</strong></td>
                    </tr>
                    <tr style={{height: '18px'}}>
                    <td style={{width: '25%', height: '18px'}}>Nama umum/dagang: {cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.nama_umum_tercetak}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    <td style={{width: '25%', height: '18px'}}>Nama ilmiah**): {cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.nama_latin_tercetak}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    <td style={{width: '50%', height: '18px'}}>Kode HS: {cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.kode_hs}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    </tr>
                    <tr style={{height: '72px'}}>
                    <td style={{height: '72px'}}>Bentuk <br/>{cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.klasifikasi}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    <td style={{height: '72px'}}>Jumlah : {cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.volumeP6} {data.sat_lain}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    <td style={{height: '72px'}}>Identitas Pemilik<br />Nama : {cetak.data72?.length >=1 ? cetak.data72[0]?.nama:""}<br />Alamat : {cetak.data72?.length >=1 ? cetak.data72[0]?.alamat:""}<br />NIB/NPWP/KTP/SIM/Passpor</td>
                    </tr>
                    <tr style={{height: '36px'}}>
                    <td style={{width: '99.9999%', height: '36px'}} colSpan="3">Nomor dan tanggal Permohonan Tindakan Karantina dan/atau Pengawasan terhadap Pemasukan/Pengeluaran/Transit**) Media Pembawa<br /> <strong>{cetak.listPtk?.no_dok_permohonan}</strong></td>
                    </tr>
                    <tr style={{height: '36px'}}>
                    <td style={{height: '36px'}}>Nomor dan tanggal Surat Penolakan: <br/><strong>{cetak.dataK72?.length >= 1 ? cetak.dataK72[0]?.nomor : ""}</strong></td>
                    <td style={{height: '36px'}}>Negara/area tujuan*) : <br/><strong>{cetak.listPtk?.negara_asal }</strong></td>
                    <td style={{height: '36px'}}>Jenis dan nama alat angkut <br /> <strong>{cetak.listPtk ? (modaAlatAngkut(cetak.listPtk?.moda_alat_angkut_terakhir_id).nama + ", " + cetak.listPtk?.nama_alat_angkut_terakhir) : ""}</strong></td>
                    </tr>
                    </tbody>
                    </table>
                    <p>dengan disaksikan oleh pemilik media pembawa dan para pejabat sebagaimana tercantum dalam Berita Acara ini.</p>
                    <p>Demikian Berita Acara ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
                    <table style={{width: '100%', borderCollapse: 'collapse', borderStyle: 'none'}}>
                    <tbody>
                    <tr>
                    <td style={{width: '65.0281%'}}>&nbsp;</td>
                    <td style={{width: '34.9719%'}}>Diterbitkan di : <strong>{cetak.dataK72?.length >= 1 ? cetak.dataK72[0]?.diterbitkan_di : ""}</strong><br />Pada Tanggal : <strong>{moment(tgl_dok).format('DD/MM/YYYY')}</strong> <br />Pejabat Karantina<br /><br /><br /><br /><strong>{cetak.petugas?.length >=1 ? cetak.petugas[0]?.nama:""}<br/>NIP.{cetak.petugas?.length >=1 ? cetak.petugas[0]?.nip:""}</strong></td>
                    </tr>
                    </tbody>
                    </table>
                    <p>&nbsp;</p>

                    <div style={{marginLeft:'130px', display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                            {cetak.data72 ? (cetak.data72?.map((data, index)=>(
                                <tr>
                                <td>&nbsp;{index + 1}.&nbsp;</td>
                                <td>Nama: {data.nama}<br />Alamat: {data.alamat}<br />Jabatan/pekerjaan: {data.jabatan_pekerjaan}<br />Tanda tangan <br/><br/><br/><br/><br/>
                                </td>
                                </tr>
                                ))
                                ):null
                            } 
                    </div>
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

export default PrintK72