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

function PrintK92I(props) {
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
          pdf.addPage();
          html2canvas(input2)
            .then((canvas2) => {
              const imgData2 = canvas2.toDataURL('image/png');
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = pdf.internal.pageSize.getHeight();
              const imgWidth = canvas2.width;
              const imgHeight = canvas2.height;
              const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
              const imgX = (pdfWidth - imgWidth * ratio)/2;
              const imgY = 5;
              pdf.addImage(imgData2,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio);
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
          ;
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
        KI.1 <span className="text-muted fw-light">(SERTIFIKAT KESEHATAN IKAN DAN PRODUK IKAN)</span>
    </h4>

    {/* <!-- Multi Column with Form Separator --> */}
    <div className="row">
        {/* <!-- Form Separator --> */}
        <div className="col-xxl">
            <div className="card mb-4">
                {/* <!-- <h5 className="card-header">Form Separator</h5> --> */}
                <div className="container" id="hal1">
                    <div className="row text-end">
                        <p>&nbsp;</p>
                        <h2> KI-1</h2>
                    </div>
                    <p style={{textAlign: 'center'}}><img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src={garuda} alt="garuda" width="100" height="100" /></p>
                    <p style={{textAlign: 'center',fontSize:20}}><strong>BADAN KARANTINA INDONESIA <br />DEPUTI BIDANG KARANTINA IKAN</strong></p>
                    <hr style={{border:'1px solid black'}} />
                    <p style={{textAlign: 'center'}}><span style={{textDecoration: 'underline'}}><strong>HEALTH CERTIFICATE FOR FISH AND FISH PRODUCTS </strong></span><br /><strong>SERTIFIKAT KESEHATAN IKAN DAN PRODUK IKAN</strong></p>
                    <p style={{textAlign: 'center'}}>Ref Number: <strong>{cetak.dataKi1?.nomor}</strong></p>
                    <p>Description of Carriers/<em>Deskripsi Media Pembawa</em> :</p>
                    <table style={{borderCollapse: 'collapse', width: '100%'}} border="1" id="tabel">
                        <tbody>
                            <tr>
                                <td style={{width: '5.73388%'}}>No</td>
                                <td style={{width: '34.2661%'}}>&nbsp;Common Name/Nama Umum</td>
                                <td style={{width: '31.797%}'}}>Scientific Name/<em>Nama Ilmiah</em></td>
                                <td style={{width: '15.0618%'}}>Quantity/<em>Jumlah</em></td>
                                <td style={{width: '13.1413%'}}>&nbsp;Unit</td>
                            </tr>
                            {cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                              <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{data.nama_umum_tercetak}</td>
                                  <td>{data.nama_latin_tercetak}</td>
                                  <td>{data.volume_bruto}</td>
                                  <td>{data.sat_bruto}</td>
                              </tr>      
                              ))
                              ):null
                          }
                            <tr>
                                <td style={{width: '5.73388%', textAlign: 'right'}} colspan="3">&nbsp;Total:&nbsp;</td>
                                <td style={{width: '15.0618%'}}>{cetak.listKomoditas?.volume_bruto}</td>
                                <td style={{width: '13.1413%'}}>{cetak.listKomoditas?.sat_bruto}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table style={{borderCollapse: 'collapse', width: '100%', height: '252px'}} border="1" id="tabel">
                        <tbody>
                            <tr style={{height: '72px'}}>
                                <td style={{width: '47.9925%', height: '72px'}} colspan="3">1. Consignor / <em>Pengirim barang</em> &nbsp; <br />Name / <em>Nama</em> :<strong>{cetak.dataKi1?.nama_pengirim}</strong><br />Address / <em>Alamat</em> : <strong>{cetak.dataKi1?.alamat_pengirim}</strong><br />&nbsp;</td>
                                <td style={{width: '33.4431%', height: '72px'}}>2. Competent authority / <em>Otoritas </em><em>kompeten</em></td>
                            </tr>
                            <tr style={{height: '72px'}}>
                                <td style={{width: '81.4356%', height: '72px'}} colspan="4">3. Consignee / <em>Penerima barang</em> &nbsp; <br />Name / <em>Nama</em> :<strong>{cetak.dataKi1?.nama_penerima}</strong><br />Address / <em>Alamat</em> : <strong>{cetak.dataKi1?.alamat_penerima}</strong><br />&nbsp;</td>
                            </tr>
                            <tr style={{height: '36px'}}>
                                <td style={{width: '81.4356%', height: '36px'}} colspan="4">4. {cetak.dataKi1?.tipe_usaha === 'PABRIK' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Producing establishment/farm / <em>Pabrik Pengolahan/budidaya</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{cetak.dataKi1?.tipe_usaha === 'UNIT_USAHA' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Aquaculture establishment/<em>Unit Usaha Budidaya</em> <em>(UUP)</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;{cetak.dataKi1?.tipe_usaha === 'LAINNYA' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Others / <em>Lainnya</em><br />Name / Nama :<br />Establishment ID Number / No Registrasi:<br />Address (detailed) / Alamat lengkap:</td>
                            </tr>
                            <tr style={{height: '18px'}}>
                                <td style={{width: '81.4356%', height: '18px'}} colspan="4">5. Capture area (only for wild) / <em>Area tangkapan (khusus hasil tangkapan):</em></td>
                            </tr>
                            <tr style={{height: '18px'}}>
                                <td style={{width: '34.4033%', height: '18px'}}>6. Country and region of origin / <em>Negara dan daerah &nbsp;asal:</em></td>
                                <td style={{width: '47.0323%', height: '18px'}} colspan="3">7. Source / <em>Sumber</em><br /><input type="checkbox" /> farm-raised / budidaya&nbsp; <input type="checkbox" /> wild-caught / <em>tangkap</em></td>
                            </tr>
                            <tr style={{height: '18px'}}>
                                <td style={{width: '34.4033%', height: '18px'}}>8. Port of shipment / <em>pelabuhan pengeluaran:</em></td>
                                <td style={{width: '47.0323%', height: '18px'}} colspan="3">9. Means of transport / <em>Alat transportasi:</em><br />{cetak.listPtk?.moda_alat_angkut_terakhir_id === 4 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} aeroplane/Angkutan udara {cetak.listPtk?.moda_alat_angkut_terakhir_id === 1 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Ship/Angkutan laut {cetak.listPtk?.moda_alat_angkut_terakhir_id === 3 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} road vehicle/Angkutan darat</td>
                            </tr>
                            <tr style={{height: '18px'}}>
                                <td style={{width: '40.5487%', height: '18px'}} colspan="2">10. Description of commodity / <em>Deskripsi komoditas:</em></td>
                                <td style={{width: '40.8869%', height: '18px'}} colspan="2">Temperature of the commodity / <em>Temperatur komoditas:</em><br />{cetak.dataKi1?.temperatur_mp === 'LIVE' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} ambient (live)/ruang (hidup) {cetak.dataKi1?.temperatur_mp === 'FROZEN' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} frozen / beku {cetak.dataKi1?.temperatur_mp === 'CHILLED' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} chilled / dingin </td>
                            </tr>
                            <tr>
                                <td style={{width: '40.5487%'}} colspan="2">12.Commodities intended for uses as / <em>Komodita</em><em>s </em><em>d</em><em>iperuntukkan sebagai:</em><br />
                                    {cetak.listPtk?.peruntukan_id === 2 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} ruang (hidup)Human consumption / <em>Konsumsi manusia</em> <br />
                                    {cetak.listPtk?.peruntukan_id === 1 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Culture/breeding (broodstock, eggs, gametes) / <em>Budidaya/pembenihan</em> <br />
                                    {cetak.listPtk?.peruntukan_id === 7 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Ornamental <em>/ Ikan hias</em> <br />
                                    {cetak.listPtk?.peruntukan_id === 3 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Research &amp; Investigation / <em>Penelitian&nbsp; &amp; pemeriksaan</em> <br />
                                    {cetak.listPtk?.peruntukan_id === 6 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Aquatic animal feed / baits / <em>Pakan &nbsp;/ umpan pancing</em> <br />
                                    {cetak.listPtk?.peruntukan_id === 8 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Non edible (fish skin, shell, bones, etc) / <em>Non konsumsi / Lainnya</em>
                                </td>
                                <td style={{width: '40.8869%'}} colspan="2">
                                    <p>13. Total number of package, associated batch numbers and number of packages per batch / <em>Jumlah kemasan total terkait nomor dan kemasan</em>&nbsp; &nbsp;</p>
                                    <p>&nbsp;</p>
                                    <p>&nbsp;</p>
                                    *(information on batch see attachment &nbsp;if insufficient / <em>informasi tentang &nbsp;batch dapat &nbsp;dilihat pada &nbsp;lampiran jika kolom tidak cukup</em> )
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: '40.5487%'}} colspan="2">14. Type of packaging <em>/ Jenis kemasan: <strong>{cetak.dataKi1?.kemasan}</strong></em></td>
                                <td style={{width: '40.8869%'}} colspan="2">15. Total quantity (kg) / <em>Jumlah total (kg):</em></td>
                            </tr>
                            <tr>
                                <td style={{width: '40.5487%'}} colspan="3">16. Identification of container/seal number / <em>Identifikasi container/nomor segel:</em></td>
                                <td style={{width: '33.4431%'}}>17. Port of destination/<em>Pelabuhan </em><em>tujuan:</em></td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <p>18. Identification of transport / <em>Identitas alat transport</em> &nbsp;</p>
                                    <p>Name of vessel / <em>na</em><em>ma kapal :</em>&nbsp;&nbsp;&nbsp; &nbsp;</p>
                                    voyage number / <em>no</em><em>mor penerbangan :</em>
                                </td>
                                <td colspan="2">19. Date of departure / <em>Tanggal pengiriman:</em></td>
                            </tr>
                            <tr>
                                <td colspan="2">20. Post-processing Testing laboratory / <em>Laboratorium &nbsp;penguji :</em></td>
                                <td colspan="2">Address / <em>Alamat :</em></td>
                            </tr>
                            <tr>
                                <td colspan="2">21. Approving officer name / <em>Penanggungjawab laboratorium:</em></td>
                                <td colspan="2" rowspan="2" style={{verticalAlign:'bottom',textAlign:'center'}}>Signature / tanda tangan</td>
                            </tr>
                            <tr>
                                <td style={{width: '34.4033%'}} colspan="2">22. Testing report number / <em>Nomor laporan &nbsp;hasil uji :</em></td>
                            </tr>
                        </tbody>
                    </table>
                    <p style={{textAlign: 'center'}}>&nbsp;</p>
                    <p style={{textAlign: 'center'}}>&nbsp;</p>
                    <div />
                </div>
                <div className="container " id="hal2">

                    <p>Ref Number:</p>
                    <table style={{borderCollapse: 'collapse', width: '100%'}} border="1" id="tabel">
                        <tbody>
                            <tr>
                                <td style={{width: '99.8596%'}} colspan="2" width="671">
                                    <p>&nbsp;</p>
                                    <p style={{textAlign: 'center'}}><strong>Attestation</strong></p>
                                    <p>&nbsp;</p>
                                    <p>The undersigned Certifying Official certifies that the Carrier(s) / <em>Pejabat &nbsp;penandatangan sertifikat di bawah ini menyatakan bahwa <br /></em>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cetak.dataKi1?.p1 === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Finfish / <em>Ikan bersirip</em>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" />&nbsp;Mollusca / <em>Moluska</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {cetak.dataKi1?.p2 === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Crustacea / <em>Krustasea</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cetak.dataKi1?.p3 === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp; Fish products / <em>Produk ikan</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {cetak.dataKi1?.p4 === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>}&nbsp;Others / <em>Lainnya</em></p>
                                    <p>described above satisfy(s) the following requirements / <em>yang diuraikan&nbsp; di atas memenuhi persyaratan berikut:</em></p>
                                    <ol style={{listStyleType: 'lower-alpha'}}>
                                        <li> {cetak.dataKi1?.attestation_a === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} <strong> The Product from each batch</strong> &nbsp;/ <strong>Commodity from population</strong> &nbsp;*) described above have been processed, inspected and graded in (an) establishment(s) that has been approved by and under control of the Competent Authority &nbsp;/ <em>Produk dari setiap batch / Komoditas dari populasi </em><em>tersebut di atas telah diproses, diinspeksi dan dinilai dalam kondisi yang telah disetujui oleh dan di bawah kendali Otoritas Kompeten</em></li>
                                        <li> {cetak.dataKi1?.attestation_b === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} have been handled, &nbsp;prepared or processed, &nbsp;identified, stored and transported under a competent HACCP and sanitary programme consistently implemented and in accordance with the requirements laid down in Codex Code of Practice for Fish and Fishery Products (CAC/RCP 52-2003) / &nbsp;<em>telah ditangani, &nbsp;disiapkan atau diproses, diidentifikasi, disimpan dan ditransportasikan sesuai persyaratan sanitasi &nbsp;dan HACCP yang diterapkan &nbsp;secara &nbsp;konsisten dan sesuai dengan persyaratan yang ditetapkan</em> <em>Codex Code of Practice &nbsp;for Fish &nbsp;and Fishery Products (CAC / RCP 52-2003)</em></li>
                                        <li> {cetak.dataKi1?.attestation_c === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} <strong>The Product from each batch </strong>/ <strong>Commodity from population</strong> *) has been found to be free of disease based on sampling and testing method recognized by the World Organisation for Animal Health (WOAH) for demonstrating absence of disease and inspected according to the appropiate procedures and subsequently found, at the time of inspection: / <em>Produk dari setiap batch / Komoditas dari populasi dinyatakan bebas dari penyakit berdasarkan pengambilan sampel dan metode pengujian yang diakui oleh World Organisation for Animal Health (WOAH) dan pada saat pemeriksaan:</em></li>
                                    
                                    <p> {cetak.dataKi1?.attestation_free_from === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} to be free from diseases / <em>bebas dari penyakit</em> :&nbsp; &nbsp; &nbsp; &nbsp;</p>
                                    <p> {cetak.dataKi1?.attestation_nosign === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} to show no visible/clinical &nbsp;signs of diseases / <em>tidak menunjukkan gejala penyakit secara &nbsp;visual/klinis :</em> &nbsp;</p>
                                    
                                        <li>{cetak.dataKi1?.attestation_d === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} For non edible products have been handled, prepared or processed, stored, transported based on &nbsp;biosecurity principles / <em>produk non konsumsi telah ditangani, disiapkan atau diproses, disimpan, ditransportasikan berdasarkan prinsip biosekuriti</em></li>
                                        <li> {cetak.dataKi1?.attestation_lain === '1' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Other details/ <em>keterangan</em> <em>lainnya </em>.............</li>
                                    </ol>
                                    <p>&nbsp;</p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: '99.8596%'}} colspan="2">
                                    <p>Additional information / <em>Informasi tambahan:<br />
                                    <strong>{cetak.dataKi1?.add_information}</strong></em></p>
                                    <p>&nbsp;</p>
                                    <p>&nbsp;</p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: '49.9298%'}}>CERTIFIED DETAILS / <em>Detail penerbit</em> <em>sertifikat</em></td>
                                <td style={{width: '49.9298%'}} rowspan="8">
                                    <p>Issued at / Dikeluarkan : <strong>{cetak.dataKi1?.diterbitkan_di}</strong></p>
                                    <p>Certifying body :</p>
                                    <p>Stamp / <em>Stempel</em></p>
                                    <p>Signature / <em>Tanda tangan</em></p>
                                    <p>(Name of Official or Inspector/<em>Nama petugas atau Inspektur</em>)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: '49.9298%'}}>Name / <em>Nama: <strong>{cetak.petugas?.filter(dok=>dok.penanda_tangan_id === cetak.dataKi1?.user_ttd_id).map(hasil=><strong>{hasil.nama}</strong>)}</strong></em></td>
                            </tr>
                            <tr>
                                <td style={{width: '49.9298%'}}>Position / <em>Jabatan : <strong>{cetak.petugas?.filter(dok=>dok.penanda_tangan_id === cetak.dataKi1?.user_ttd_id).map(hasil=><strong>{hasil.jabatan}</strong>)}</strong></em></td>
                            </tr>
                            <tr>
                                <td style={{width: '49.9298%'}}>Issued at / <em>Lokasi : <strong>{cetak.dataKi1?.diterbitkan_di}</strong></em></td>
                            </tr>
                            <tr>
                                <td style={{width: '49.9298%'}}>Phone / <em>Telepon:</em></td>
                            </tr>
                            <tr>
                                <td style={{width: '49.9298%'}}>Fax / <em>Faksimili:</em></td>
                            </tr>
                            <tr>
                                <td style={{width: '49.9298%'}}>E-mail / <em>Surat elektronik:</em></td>
                            </tr>
                            <tr>
                                <td style={{width: '49.9298%'}} width="113">Address / <em>Alamat</em> :&nbsp; &nbsp;</td>
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

export default PrintK92I