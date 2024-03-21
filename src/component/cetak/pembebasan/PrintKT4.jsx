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

function PrintKT4(props) {
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
                            <p style={{textAlign: 'right'}}>&nbsp;</p>
                            <p style={{textAlign: 'center'}}><img src={garuda} alt="" width="100" height="109" /></p>
                            <p style={{textAlign: 'center'}}><strong>REPUBLIC OF INDONESIA<br />INDONESIAN QUARANTINE AUTHORITY<br />No:003924802394</strong></p>
                            <table style={{borderCollapse: 'collapse', width: '100%', height: '262px'}} border="1">
                            <tbody>
                            <tr style={{height: '54px'}}>
                            <td style={{width: '49.145%', height: '54px'}} colSpan="2"><strong><u>CERTIFICATE FOR EXPORT OF PROCESSED PRODUCT/NON-REGULATED ARTICLE</u></strong><br />No :</td>
                            <td style={{width: '50.7222%', height: '54px'}} colSpan="4"><strong>To:</strong><br />&nbsp;<br />&nbsp;</td>
                            </tr>
                            <tr style={{height: '64px'}}>
                            <td style={{height: '64px'}} colSpan="2">Name and address of exporter:<br />&nbsp;</td>
                            <td style={{height: '64px'}} colSpan="4">
                            <p>Declared name and address of consignee: <br />&nbsp;</p>
                            </td>
                            </tr>
                            <tr style={{height: '18px'}}>
                            <td style={{width: '49.145%', height: '18px'}} colSpan="6"><strong>DESCRIPTION OF CONSIGNMENT</strong></td>
                            </tr>
                            <tr style={{height: '18px'}}>
                            <td style={{width: '49.145%', height: '36px'}} colSpan="2" rowlSpan="2">Declared means of conveyance:</td>
                            <td style={{width: '50.7222%', height: '18px'}} colSpan="4">Declared point of entry:<br />&nbsp;</td>
                            </tr>
                            <tr style={{height: '18px'}}>
                            <td style={{width: '23.2641%', height: '18px'}} colSpan="2">HS Code:<br />&nbsp;</td>
                            <td style={{width: '27.4581%', height: '18px'}} colSpan="2">Place of origin:<br />&nbsp;</td>
                            </tr>
                            <tr style={{height: '18px'}}>
                            <td style={{width: '25.3498%', height: '18px'}}>
                            <p>Distinguishing marks:</p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            </td>
                            <td style={{width: '51.4001%', height: '18px'}} colSpan="4">
                            <p>Number and description of packages, name of produce, botanical name of plants:</p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            </td>
                            <td style={{width: '23.1173%', height:'18px'}}>
                            <p>Quantity Declared:</p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            </td>
                            </tr>
                            <tr style={{height: '18px'}}>
                            <td style={{width: '99.8672%', height: '18px'}} colSpan="6">
                            <p style={{textAlign: justify}}>This is to affirm that, under the Law of the Republic of Indonesia Number 21 of 2019 concerning Animal, Fish, and Plant Quarantine and the Government Regulation of the Republic of Indonesia Number 29 of 2023 and based upon inspection of submitted samples and/or by virtue of processing received, the plant products or non-regulated articles described above are believed to be free from harmful plant pests. Therefore, no phytosanitary certificate shall be issued for this product and/or article.</p>
                            </td>
                            </tr>
                            <tr style={{height: '18px'}}>
                            <td style={{height: '18px', width: '49.145%'}} colSpan="2">Name of authorized officer:<br />&nbsp;</td>
                            <td style={{width: 23.2641%, height: '54px', textAlign: 'center'}} colSpan="2" rowlSpan="3">
                            <p>(Signature)</p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            </td>
                            <td style={{width: '27.4581%', height: '54px', textAlign: 'center'}} colSpan="2" rowlSpan="3">
                            <p>(Stamp of Organization)</p>
                            <p>&nbsp;</p>
                            </td>
                            </tr>
                            <tr style={{height: '18px'}}>
                            <td style={{width: '49.145%', height: '18px'}} colSpan="2">Place of issue:</td>
                            </tr>
                            <tr style={{height: '18px'}}>
                            <td style={{width: 49.145%, height: '18px'}} colSpan="2">Date of issue:</td>
                            </tr>
                            </tbody>
                            </table>
                            <p>&nbsp;</p>   
                    </div>          
                </div>
            </div>
        </div>
    </div>
</div>
)
}

export default PrintKT4