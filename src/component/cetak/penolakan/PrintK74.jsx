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
                    <table style={{borderCollapse: 'collapse', width: '100%'}} border="1">
                    <tbody>
                    <tr>
                    <td style={{width: '52.2472%'}}>
                    <p>To:</p>
                    </td>
                    <td style={{width: '47.7528%'}}>
                    <p>Reference number:</p>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <p style={{textAlign: 'justify'}}>&emsp;&emsp;Under the provisions of Law Number 21 of 2019 regarding Animal, Fish, and Plant Quarantine, we hereby inform you that the following consignment does not comply with the sanitary and phytosanitary (SPS) import requirements of the Republic of Indonesia:</p>
                    <table style={{borderCollapse: 'collapse', width: '100%'}} border="1">
                    <tbody>
                    <tr>
                    <td style={{width: '99.9999%'}} colspan="3">DESCRIPTION OF THE CONSIGNMENT</td>
                    </tr>
                    <tr>
                    <td style={{width: '33.3333%'}}>English/Common Name:</td>
                    <td style={{width: '33.3333%'}}>Botanical name *):</td>
                    <td style={{width: '33.3333%'}}>HS Code:</td>
                    </tr>
                    <tr>
                    <td style={{width: '33.3333%'}}>Quantity declared:</td>
                    <td style={{width: '33.3333%'}}>Packing Unit:</td>
                    <td style={{width: '33.3333%'}}>Number and description of packages:</td>
                    </tr>
                    <tr>
                    <td style={{width: '33.3333%'}}>Distinguishing marks:</td>
                    <td style={{width: '33.3333%'}}>Country/Place of origin:</td>
                    <td style={{width: '33.3333%'}}>Consignor:</td>
                    </tr>
                    <tr>
                    <td style={{width: '99.9999%'}} colspan="3">
                    <table style={{borderCollapse: 'collapse', width: '100%', height: '18px'}} border="1">
                    <tbody>
                    <tr style={{height: '18px'}}>
                    <td style={{width: '50%', height: '18px'}}>Point of entry:</td>
                    <td style={{width: '50%', height: '18px'}}>Declared means of conveyance:</td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    <tr>
                    <td style={{width: '99.9999%'}} colspan="3"><em><strong><u>NATURE OF NON-COMPLIANCE</u></strong></em>
                    <ul>
                    <li>Prohibited goods:</li>
                    <li>Problem with documentation (specify):</li>
                    <li>The goods were infected/infested/contaminated with the following regulated pests or prohibited articles (specify):</li>
                    <li>The goods do not comply with Indonesia&rsquo;s food safety/quality requirements (specify):</li>
                    </ul>
                    </td>
                    </tr>
                    <tr>
                    <td style={{width: '99.9999%'}} colspan="3"><span style={{textDecoration: 'underline'}}><em><strong>DISPOSITION OF THE CONSIGNMENT*)</strong></em></span>
                    <p>The &nbsp;entire or &nbsp;partial lot of the consignment was:</p>
                    <p>&nbsp;treated.&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;destroyed.&nbsp;&nbsp;&nbsp; &nbsp;refused.&nbsp;&nbsp;&nbsp; &nbsp;released.</p>
                    <p>Details**):</p>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <p>Demikian Surat Penolakan ini disampaikan, atas perhatian dan kerjasama Saudara diucapkan terima kasih.</p>
                    <table style={{width: '100%', borderCollapse: 'collapse', borderStyle: 'solid'}} border="1">
                    <tbody>
                    <tr>
                    <td style={{width: '50%'}}>(Stamp of Organization)</td>
                    <td style={{width: '50%'}}>
                    <p><em>Place of issue:</em><em>Name of Authorized Officer: </em><em>Date:</em><em>(Signature)</em><br /><br /></p>
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