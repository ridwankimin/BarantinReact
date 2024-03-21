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

function PrintKT2(props) {
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
            KT.4 <span className="text-muted fw-light">(CERTIFICATE FOR EXPORT OF PROCESSED PRODUCT/NON-REGULATED ARTICLE)</span>
        </h4>

        {/* <!-- Multi Column with Form Separator --> */}
        <div className="row">
            {/* <!-- Form Separator --> */}
            <div className="col-xxl">
                <div className="card mb-4" >
                    {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                    <div className="container" id="hal1" >
                        <div className="row text-end">
                            <p>&nbsp;</p><h2> KT-4</h2>
                        </div>
                        <p style={{textAlign: 'center'}}><img src={garuda} alt="" width="100" height="109" /></p>
                        <p style={{textAlign: 'center'}}><strong>REPUBLIC OF INDONESIA<br />INDONESIAN QUARANTINE AUTHORITY<br />No:003924802394 </strong></p>
                        <table style={{borderCollapse: 'collapse', width: '100%', height: '352px'}} border="1">
                        <tbody>
                        <tr style={{height: '54px'}}>
                        <td style={{width: '49.145%', height: '54px'}} colSpan="2"><strong>PHYTOSANITARY CERTIFICATE FOR <br />RE-EXPORT</strong><br />No :</td>
                        <td style={{width: '50.7222%', height: '54px'}} colSpan="4"><strong>Plant Protection Organization of Indonesia</strong><br />to: Plant Protection Organization(s) of <br />&nbsp;</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '99.8672%', height: '18px'}} colSpan="6"><strong>I. DESCRIPTION OF CONSIGNMENT</strong></td>
                        </tr>
                        <tr style={{height: '64px'}}>
                        <td style={{width: '49.145%', height: '64px'}} colSpan="2">Name and address of exporter:<br />&nbsp;</td>
                        <td style={{width: '50.7222%', height: '64px'}} colSpan="4">
                        <p>Declared name and address of consignee: <br />&nbsp;</p>
                        </td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '49.145%', height: 36px}} colSpan="2" rowSpan="2">Declared means of conveyance:</td>
                        <td style={{width: '50.7222%', height: '18px'}} colSpan="4">Declared point of entry:<br />&nbsp;</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '23.2641%', height: '18px'}} colSpan="2">HS Code:<br />&nbsp;</td>
                        <td style={{width: '27.4581%', height: '18px'}} colSpan="2">Place of origin:<br />&nbsp;</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '25.3498%', height: '18px'}}>Distinguishing marks:</td>
                        <td style={{width: '51.4001%', height: '18px'}} colSpan="4">Number and description of packages, name of produce, botanical name of plants:</td>
                        <td style={{width: '23.1173%', height: '18px'}}>Quantity Declared:</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '49.145%', height: 90px}} colSpan="2" rowSpan="5"><strong>II. ADDITIONAL DECLARATION:</strong></td>
                        <td style={{width: '50.7222%', height: '18px'}} colSpan="4"><strong>III. DISINFESTATION AND/OR DISINFECTION TREATMENT</strong></td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '23.2641%', height: '18px'}} colSpan="2">Treatment</td>
                        <td style={{width: '27.4581%', height: '18px'}} colSpan="2">Date</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '23.2641%', height: '18px'}} colSpan="2">Chemical (active ingredient)</td>
                        <td style={{width: '27.4581%', height: '18px'}} colSpan="2">Concentration</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '50.7222%', height: '18px'}} colSpan="4">Duration and temperature</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '50.7222%', height: '18px'}} colSpan="4">Additional information</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '99.8672%', height: '18px'}} colSpan="6">
                        <p>This is to certify that the plants, plant products, or other regulated articles described above were imported into Indonesia from &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip; covered by Phytosanitary Certificate No. &hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.............,*) original &uml;&nbsp; certified true copy &uml; &nbsp;of which is attached to this certificate; that they are,*) packed &uml; &nbsp;repacked &uml;&nbsp; in original &uml;&nbsp; new &uml; &nbsp;containers, that based on the original phytosanitary certificate &uml;&nbsp; and additional inspection &uml;, &nbsp;they are considered to conform with the current phytosanitary requirements of the importing contracting party, and that during storage in Indonesia, the consignment has not been subjected to the risk of infestation or infection.</p>
                        <em>*) Insert tick (&uuml;) in appropriate boxes</em>.</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{height: '18px', width: 49.145%}} colSpan="2">Name of authorized officer:<br />&nbsp;</td>
                        <td style={{width: '23.2641%', height: '54px'; textAlign: 'center'}} colSpan="2" rowSpan="3">(Signature)</td>
                        <td style={{width: '27.4581%', height: '54px'; textAlign: 'center}'} colSpan="2" rowSpan="3">(Stamp of Organization)<br />&nbsp;</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '49.145%', height: '18px'}} colSpan="2">Place of issue:</td>
                        </tr>
                        <tr style={{height: '18px'}}>
                        <td style={{width: '49.145%', height: '18px'}} colSpan="2">Date of issue:</td>
                        </tr>
                        </tbody>
                        </table>   
                    </div>          
                </div>
            </div>
        </div>
    </div>
</div>
)
}

export default PrintKT2