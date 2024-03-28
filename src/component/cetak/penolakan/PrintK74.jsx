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

function PrintK74(props) {
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
        K7.4 <span className="text-muted fw-light">(SURAT PEMBERITAHUAN KETIDAKSESUAIAN PERSYARATAN)</span>
    </h4>
 
    <div className="row">
        <div className="col-xxl">
            <div className="card mb-4" >
                <div className="container" id="hal1">
                    <div className="row text-end">
                        <p>&nbsp;</p>
                        <h2> K7-4</h2>
                    </div>
                    <p style={{textAlign: 'center'}}><strong>NOTIFICATION OF NON-COMPLIANCE</strong><br /><strong>(SURAT PEMBERITAHUAN KETIDAKSESUAIAN PERSYARATAN)</strong></p>
                    <p style={{textAlign: 'center'}}>&nbsp;</p>
                    <table style={{borderCollapse: 'collapse', width: '100%'}} border="1" id="tabel">
                    <tbody>
                    <tr>
                    <td style={{width: '52.2472%'}}>
                    <p>To: <strong>{cetak.dataK74?.length >= 1 ? cetak.dataK74[0]?.kepada : ""}</strong></p>
                    </td>
                    <td style={{width: '47.7528%'}}>
                    <p>Reference number: <strong>{cetak.dataK74?.length >= 1 ? cetak.dataK74[0]?.nomor : ""}</strong></p>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <p style={{textAlign: 'justify'}}>&emsp;&emsp;Under the provisions of Law Number 21 of 2019 regarding Animal, Fish, and Plant Quarantine, we hereby inform you that the following consignment does not comply with the sanitary and phytosanitary (SPS) import requirements of the Republic of Indonesia:</p>
                    <table style={{borderCollapse: 'collapse', width: '100%'}} border="1" id="tabel">
                    <tbody>
                    <tr>
                    <td style={{width: '99.9999%'}} colspan="3">DESCRIPTION OF THE CONSIGNMENT</td>
                    </tr>
                    <tr>
                    <td style={{width: '33.3333%'}}>English/Common Name: {cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.nama_umum_tercetak}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    <td style={{width: '33.3333%'}}>Botanical name *): {cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.nama_latin_tercetak}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    <td style={{width: '33.3333%'}}>HS Code: {cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.kode_hs}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    </tr>
                    <tr>
                    <td style={{width: '33.3333%'}}>Quantity declared: {cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                        <strong key={index}>&nbsp;
                        {data.volumeP6} {data.sat_lain}
                        </strong>      
                        ))
                        ):null
                    }</td>
                    <td style={{width: '33.3333%'}}>Packing Unit: <strong>{cetak.listPtk?.jumlah_kemasan +" "+cetak.listPtk?.kemasan}</strong></td>
                    <td style={{width: '33.3333%'}}>Number and description of packages:</td>
                    </tr>
                    <tr>
                    <td style={{width: '33.3333%'}}>Distinguishing marks: <strong>{cetak.listPtk?.merk_kemasan}</strong></td>
                    <td style={{width: '33.3333%'}}>Country/Place of origin: <strong>{cetak.listPtk?.negara_pengirim}</strong></td>
                    <td style={{width: '33.3333%'}}>Consignor:<strong>{cetak.listPtk?.nama_pengirim}</strong></td>
                    </tr>
                    <tr>
                    <td style={{width: '33.3333%'}}>Consignee: <strong>{cetak.listPtk?.nama_penerima}</strong></td>
                    <td style={{width: '33.3333%'}}>Number and date of the accompanying document(s): <strong>{cetak.listPtk?.negara_pengirim}</strong></td>
                    <td style={{width: '33.3333%'}}>Port of export: <strong>{cetak.listPtk?.pelabuhan_muat}</strong></td>
                    </tr>
                    <tr>
                    <td style={{width: '99.9999%'}} colspan="3">
                    <table style={{borderCollapse: 'collapse', width: '100%', height: '18px'}} border="1">
                    <tbody>
                    <tr style={{height: '18px'}}>
                    <td style={{width: '50%', height: '18px'}}>Point of entry: <strong>{cetak.listPtk?.pelabuhan_bongkar}</strong></td>
                    <td style={{width: '50%', height: '18px'}}>Declared means of conveyance: <strong>{cetak.listPtk ? (modaAlatAngkut(cetak.listPtk.moda_alat_angkut_terakhir_id).nama_en + ", " + cetak.listPtk.nama_alat_angkut_terakhir) : ""}</strong></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    <tr>
                    <td style={{width: '99.9999%'}} colspan="3"><em><strong><u>NATURE OF NON-COMPLIANCE</u></strong></em><br/>
                    
                    {cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.specify1 != null ? <strong>&#9745;</strong> : <><input type="checkbox" /></>):("")} Prohibited goods: <br/>
                    {cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.specify2 != null ? <strong>&#9745;</strong> : <><input type="checkbox" /></>):("")} Problem with documentation (specify): <br/>&emsp; {cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.specify2 != null ? <strong>{cetak.dataK74[0]?.specify2}</strong> : ""):("")} <br/>
                    {cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.specify3 != null ? <strong>&#9745;</strong> : <><input type="checkbox" /></>):("")} The goods were infected/infested/contaminated with the following regulated pests or prohibited articles (specify): <br/> &emsp; {cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.specify3 != null ? <strong>{cetak.dataK74[0]?.specify3}</strong> : ""):("")} <br/>
                    {cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.specify4 != null ? <strong>&#9745;</strong> : <><input type="checkbox" /></>):("")}The goods do not comply with Indonesia&rsquo;s food safety/quality requirements (specify):<br/>&emsp; {cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.specify4 != null ? <strong>{cetak.dataK74[0]?.specify4}</strong> : ""):("")} <br/>
                    
                    </td>
                    </tr>
                    <tr>
                    <td style={{width: '99.9999%'}} colspan="3"><span style={{textDecoration: 'underline'}}><em><strong>DISPOSITION OF THE CONSIGNMENT*)</strong></em></span>
                    <p>The {cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.consignment === "ENTIRE" ? <strong>&#9745;</strong> : <><input type="checkbox" /></>):("")} entire or {cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.consignment === "PARTIAL" ? <strong>&#9745;</strong> : <><input type="checkbox" /></>):("")} partial lot of the consignment was:</p>
                    <p>{cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.rekomendasi_id === 33 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>):("")}treated.&nbsp;&nbsp;&nbsp;&nbsp; {cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.rekomendasi_id === 34 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>):("")} destroyed.&nbsp;&nbsp;&nbsp; {cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.rekomendasi_id === 35 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>):("")} refused.&nbsp;&nbsp;&nbsp; {cetak.dataK74?.length >= 1 ? (cetak.dataK74[0]?.rekomendasi_id === 33 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>):("")} released.</p>
                    <p>Details**):</p>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <p></p>
                    <table style={{width: '100%', borderCollapse: 'collapse', borderStyle: 'solid'}} border="1">
                    <tbody>
                    <tr>
                    <td style={{width: '50%', verticalAlign:"top"}}>
                    &emsp;&emsp;&emsp;(Stamp of Organization)</td>
                    <td style={{width: '50%'}}>
                    <p><em>Place of issue: <strong>{cetak.dataK74?.length >= 1? cetak.dataK74[0]?.diterbitkan_di:""}</strong></em><em><br />Name of Authorized Officer: <strong>{cetak.petugas?.length >= 1 ? cetak.petugas[0]?.nama:""}</strong></em><br/><em>Date: <strong>{cetak.dataK74?.length >= 1? cetak.dataK74[0]?.tanggal:""}</strong></em><br/><em>(Signature)</em><br /><br /></p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <p>&nbsp;</p>
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

export default PrintK74