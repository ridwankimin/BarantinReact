import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
import '../../../assets/css/test.scss';

function PrintK75(props) {
  const exportPDF = () => {
    let element = (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
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
      </div>
    );
    const doc = new jsPDF("p", "mm", "A4");
    doc.html(ReactDOMServer.renderToString(element), {
      callback: function (doc) {
        //doc.save('sample.pdf');
        var out = doc.output('blob');
                var file = new Blob([out], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
      }
    });
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={exportPDF}>export</button>
    </div>
  );
}
export default PrintK75