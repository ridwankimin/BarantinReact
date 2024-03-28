/* eslint-disable react/prop-types */
import React, { useState } from "react";
import moment from "moment";
import html2canvas from "html2canvas";
import '../../../assets/css/test.scss'
import jsPDF from "jspdf";
import SpinnerDot from "../../loading/SpinnerDot";
import Swal from "sweetalert2";
import ModaAlatAngkut from '../../../model/master/modaAlatAngkut.json';

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

function modaAlatAngkut(e){
    return ModaAlatAngkut.find((element) => element.id == parseInt(e))
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
       
        <br />
        <hr />
        <br />
        
<div className="container-xxl flex-grow-1 container-p-y">
    <h4 className="py-3 breadcrumb-wrapper mb-4">
        K-7.3 <span className="text-muted fw-light">(LAPORAN HASIL PENOLAKAN)</span>
    </h4>
 
    <div className="row">
        <div className="col-xxl">
            <div className="card mb-4" >
                <div className="container" id="hal1">
                    <div className="row text-end">
                        <p>&nbsp;</p>
                        <h2> K-7.3</h2>
                    </div>
                    <p style={{textAlign: 'center'}}>LAPORAN HASIL PENOLAKAN<br />Nomor: <strong>{cetak.dataK73?.length >=1 ? cetak.dataK73[0]?.nomor : ""}</strong></p>
                    <p style={{textAlign: 'center'}}>&nbsp;</p>
                    <p style={{textAlign: 'left'}}>Yth,<br />Kepala&nbsp; <strong>{cetak.listPtk?.upt}</strong><br />di<br />&emsp;&emsp;tempat</p>
                    <p style={{textAlign: 'justify'}}>&emsp;&emsp;Menindaklanjuti Surat Tugas Nomor <strong>{cetak.noSurtug}</strong>. dan Berita Acara Penolakan Nomor: <strong>{cetak.dataK71?.length >= 1 ? cetak.dataK71[0]?.nomor :""}</strong> Tanggal <strong>{cetak.dataK71?.length >= 1 ? cetak.dataK71[0]?.tanggal :""}</strong> bersama ini dilaporkan hasil pelaksanaan penolakan terhadap media pembawa sebagai berikut:</p>
                    <table style={{borderCollapse: 'collapse', width: '100%', height: '190px'}} border="1" id="tabel">
                    <tbody>
                    <tr style={{height: '10px'}}>
                    <td style={{width: '100%', height: '10px'}} colSpan="3">Jenis Media Pembawa:<br /><strong>{cetak.listPtk?.jenis_media_pembawa}</strong></td>
                    </tr>
                    <tr style={{height: '18px'}}>
                    <td style={{width: '25%', height: '18px'}}>Nama umum/dagang: <br/>{cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.nama_umum_tercetak}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    <td style={{width: '16.7135%', height: '18px'}}>Nama ilmiah**): <br/>{cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.nama_latin_tercetak}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    <td style={{width: '58.2865%', height: '18px'}}>Kode HS: <br/>{cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.kode_hs}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    </tr>
                    <tr style={{height: '72px'}}>
                    <td style={{height: '72px', width: '25%', verticalAlign:'top'}}>Bentuk: <br />{cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.klasifikasi}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    <td style={{height: '72px', width: '16.7135%' , verticalAlign:'top'}}>Jumlah: <br/>{cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.volumeP6} {data.sat_lain}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    <td style={{height: '72px', width: '58.2865%'}}>Identitas Pemilik<br />
                    Nama: <strong>{cetak.listPtk?.jenis_permohonan === 'IM' || cetak.listPtk?.jenis_permohonan === 'IM' ? cetak.listPtk?.nama_penerima : cetak.listPtk?.nama_pengirim}</strong><br />
                    Alamat : <strong>{cetak.listPtk?.jenis_permohonan === 'IM' || cetak.listPtk?.jenis_permohonan === 'IM' ? cetak.listPtk?.alamat_penerima : cetak.listPtk?.alamat_pengirim} </strong><br/>
                    Identitas: <strong>{cetak.listPtk?.jenis_permohonan === 'IM' || cetak.listPtk?.jenis_permohonan === 'IM' ? cetak.listPtk?.jenis_identitas_penerima + " " +cetak.listPtk?.nomor_identitas_penerima  : cetak.listPtk?.jenis_identitas_pengirim + ": " +cetak.listPtk?.nomor_identitas_pengirim} </strong></td>
                    </tr>
                    <tr style={{height: '36px'}}>
                    <td style={{width: '100%', height: '36px'}} colSpan="3">Nomor dan tanggal Permohonan Tindakan Karantina dan/atau Pengawasan terhadap Pemasukan/Pengeluaran/Transit**) Media Pembawa <br/> <strong>{cetak.noDokumen}</strong></td>
                    </tr>
                    <tr style={{height: '36px'}}>
                    <td style={{height: '36px', width: '25%'}} colSpan="2">Negara/area Asal*) <br/><strong>{cetak.listPtk?.negara_asal }</strong></td>
                    <td style={{height: '36px', width: '58.2865%'}}>Jenis dan nama alat angkut: <br/><strong>{cetak.listPtk ? (modaAlatAngkut(cetak.listPtk.moda_alat_angkut_terakhir_id).nama + ", " + cetak.listPtk.nama_alat_angkut_terakhir) : ""}</strong> </td>
                    </tr>
                    </tbody>
                    </table>
                    <p>Demikian Laporan ini disampaikan, untuk dipergunakan sebagaimana mestinya.</p>
                    <table style={{width: '100%', borderCollapse: 'collapse', borderStyle: 'none'}}>
                    <tbody>
                    <tr>
                    <td style={{width: '65.0281%'}}>&nbsp;</td>
                    <td style={{width: '34.9719%'}}>Dibuat di: <strong>{cetak.dataK73?.length >= 1 ? cetak.dataK73[0]?.diterbitkan_di : ""}</strong><br />Pada Tanggal : <strong>{cetak.dataK73?.length >= 1 ? cetak.dataK73[0]?.tanggal : ""}</strong><br />Pejabat Karantina<br /><br /><br /><br /><strong>{cetak.petugas?.length >=1 ? cetak.petugas[0]?.nama :""}<br/>NIP.{cetak.petugas?.length >=1 ? cetak.petugas[0]?.nip:""}</strong></td>
                    </tr>
                    </tbody>
                    </table>
                    <p>&nbsp;</p>
                    <p></p>
                <div/>
              </div>
            </div>
            <div className="row-md-1 ">
                <center><button className="btn btn-primary" onClick={printToPdf}>Cetak Pelepasan</button></center>    
            </div>
        </div>
        
    </div>
</div>
</div>        
  )
}

export default PrintK73