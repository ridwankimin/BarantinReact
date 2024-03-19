import React, { useState } from "react";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import  '../../../assets/css/test.scss';

moment.locale("en");



function PrintK11(props) {
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


  return (
<div>
        <br />
        <hr />
        <br />
        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="py-3 breadcrumb-wrapper mb-4">
                K.1.1 <span className="text-muted fw-light">(PERMOHONAN TINDAK KARANTINA)</span>
            </h4>
        
            <div className="row">
                <div className="col-xxl">
                    <div className="card mb-4" >
                        <div className="container" id="hal1">
                            <div className="row text-end">
                                <p>&nbsp;</p><h2> K.1-1</h2>
                            </div>
                            <div className="row ">
                                <div className="judul" >
                                    <center>PERMOHONAN TINDAKAN KARANTINA DAN PENGAWASAN</center>
                                    <center>DAN/ATAU PENGENDALIAN SERTA BERITA ACARA SERAH</center>
                                    <center>TERIMA MEDIA  PEMBAWA DI TEMPAT PEMASUKAN,</center>
                                    <center>PENGELUARAN DAN/ATAU TRANSIT</center>
                                </div>
                                <div className="nomor" >Nomor: <strong>{cetak.listPtk?.no_dok_permohonan}</strong> </div> <br /><br /><br />
                            </div>
                            <div className="row">
                                <div className="col kepada">
                                    
                                    <p>Yth.</p>
                                    <p>Kepala UPT Karantina</p>
                                    <p>{cetak.listPtk?.upt}</p>
                                    <p>di</p>
                                    <p>      Tempat</p>
                                    <p><br /></p>
                                    <p>Pada hari ini <strong>{moment(cetak.listPtk?.tgl_dok_permohonan).format('dddd')}</strong> tanggal <strong>{moment(cetak.listPtk?.tgl_dok_permohonan).format('DD')}</strong> bulan <strong>{moment(cetak.listPtk?.tgl_dok_permohonan).format('MMMM')}</strong> tahun <strong>{moment(cetak.listPtk?.tgl_dok_permohonan).format('YYYY')}</strong>  </p>
                                    <p><br /></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col numberrr">
                                <p><b>A.IDENTITAS</b></p>
                                </div>
                            </div>
                            <div className="row ident" >
                                <p>Saya yang bertandatangan dibawah ini:</p>
                                <div className="col-5">
                                    <p>Nama   : <strong>{cetak.listPtk?.nama_pemohon}</strong></p>
                                    <p>Alamat : <strong>{cetak.listPtk?.alamat_pemohon}</strong></p>

                                </div>
                                <div className="col-6">
                                    <p>Jenis Identitas: <strong>{cetak.listPtk?.jenis_identitas_pemohon}</strong></p>
                                    <p>Status : <strong>{cetak.listPtk?.stat_pemohon}</strong></p>
                                </div>
                                <br />
                            </div>
                            <div className="row mohon">
                            <p><b>B.PERMOHONAN</b></p>
                            </div>

                            <div className="container">
                            <table id="customers">
                                <tr>
                                    <td colSpan={2} rowSpan={2}>
                                    <table>
                                        <tr>
                                            <th>Media Pembawa</th>
                                            <th>Nama Ilmiah</th>
                                            <th>Kode HS</th>
                                            <th>Bentuk</th>
                                            <th>Jumlah</th>
                                            <th>Satuan</th>
                                            <th>Netto</th>
                                            <th>Satuan</th>
                                        </tr>
                                    {cetak.listKomoditas ? (cetak.listKomoditas?.map((data, index)=>(
                                        <tr key={index}>
                                            <td>{data.nama_umum_tercetak}</td>
                                            <td>{data.nama_latin_tercetak}</td>
                                            <td>{data.kode_hs}</td>
                                            <td>{data.klasifikasi}</td>
                                            <td>{data.volume_lain}</td>
                                            <td>{data.sat_lain}</td>
                                            <td>{data.volume_netto}</td>
                                            <td>{data.sat_netto}</td>
                                        </tr>      
                                        ))
                                        ):null
                                    }    
                                    </table>
                                    </td>
                                    
                                    <td id="kolkanan"><center>Tingkat Pengolahan </center><br />
                                        <div className="inputs">
                                            <center>
                                                {cetak.listPtk?.tingkat_pengolahan === 'diolah' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Sudah diolah &nbsp;  
                                                {cetak.listPtk?.tingkat_pengolahan === 'belum' ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Belum diolah
                                            </center>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Nilai (Rp.) {cetak.listPtk?.nilai_barang?.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td rowSpan={3}>Peruntukan
                                        <div className="inputs">
                                        {cetak.listPtk?.peruntukan_id === 1 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Ditanam/Budidaya/Peningkatan Mutu Genetik <br />   
                                        {cetak.listPtk?.peruntukan_id === 2 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Konsumsi &nbsp;
                                        {cetak.listPtk?.peruntukan_id === 4 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Pameran/Kontes &nbsp;
                                        {cetak.listPtk?.peruntukan_id === 6 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Bahan Baku <br />
                                        {cetak.listPtk?.peruntukan_id === 3 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Penelitian &nbsp;
                                        {cetak.listPtk?.peruntukan_id === 5 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Perdagangan&nbsp;
                                        {cetak.listPtk?.peruntukan_id === 7 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Ornamental/Hias &nbsp;
                                        {cetak.listPtk?.peruntukan_id === 8 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Lainnya.. <br />
                                        </div>
                                    </td>
                                    <td>Jenis Kemasan : <strong>{cetak.listPtk?.kemasan}</strong></td>
                                    <td rowSpan={3}>Nomor Kemasan : </td>
                                </tr>
                                <tr>
                                    <td>Jumlah Kemasan : <strong>{cetak.listPtk?.jumlah_kemasan}</strong></td> 
                                </tr>
                                <tr>   
                                    <td>Tanda khusus : <strong>{cetak.listPtk?.tanda_khusus}</strong></td> 
                                </tr>
                            </table>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 wrap">
                                            <table className="tkiri">
                                                <tr>
                                                    <td>Nama Pengirim: <strong>{cetak.listPtk?.nama_pengirim}</strong></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Alamat: <strong>{cetak.listPtk?.alamat_pengirim}</strong><br /><strong>{cetak.listPtk?.jenis_identitas_pengirim}</strong> : <strong>{cetak.listPtk?.nomor_identitas_pengirim}</strong></td>
                                                    <td>Negara/Area Asal: <strong>{cetak.listPtk?.negara_pengirim}</strong></td>     
                                                </tr>
                                                <tr>
                                                    <td>Nama Penerima : <strong>{cetak.listPtk?.nama_penerima}</strong></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Alamat: <strong>{cetak.listPtk?.alamat_penerima}</strong><br /><strong>{cetak.listPtk?.jenis_identitas_penerima}</strong> : <strong>{cetak.listPtk?.nomor_identitas_penerima}</strong></td>
                                                    <td>Negara/Area Tujuan: <strong>{cetak.listPtk?.negara_penerima}</strong></td>     
                                                </tr>
                                            </table>                 
                                    </div>
                                    <div className="col-md-6 wrip">
                                        <table className="tkanan">
                                            <tr>
                                                <td>Moda</td>
                                                <td>Alat Angkut</td>
                                            </tr>
                                            <tr>
                                                <td rowSpan={2}>
                                                    <div className="inputs">
                                                    {cetak.listPtk?.moda_alat_angkut_terakhir_id === 1 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Kapal Laut  &nbsp; 
                                                    {cetak.listPtk?.moda_alat_angkut_terakhir_id === 3 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Truck/Mobil <br /> 
                                                    {cetak.listPtk?.moda_alat_angkut_terakhir_id === 4 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Pesawat &nbsp;
                                                    {cetak.listPtk?.moda_alat_angkut_terakhir_id === 9 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Lainnya.....<br /> 
                                                    {cetak.listPtk?.moda_alat_angkut_terakhir_id === 2 ? <strong>&#9745;</strong> : <><input type="checkbox" /></>} Kereta Api <br />
                                                    </div>
                                                </td>
                                                <td><strong>{cetak.listPtk?.nama_alat_angkut_terakhir}</strong></td>     
                                            </tr>
                                            <tr>
                                                <td>BL/AWB : {cetak.listDokumen?.filter(dok=>dok.kode_dokumen === '740'|| dok.kode_dokumen === '705').map(hasil=><strong>{hasil.no_dokumen}</strong>)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    Pelabuhan Muat: <strong>{cetak.listPtk?.pelabuhan_muat}</strong>
                                                    <br />
                                                    Pelabuhan Bongkar: <strong>{cetak.listPtk?.pelabuhan_bongkar}</strong>
                                                    <br />
                                                    Pelabuhan Transit: <strong>{cetak.listPtk?.pelabuhan_transit}</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    Estimasi Waktu Kedatangan/Keberangkatan: <strong>{moment(cetak.listPtk?.tanggal_rencana_berangkat_terakhir).format('DD/MM/YYYY')}</strong>
                                                    <br />
                                                    Aktual Waktu Kedatangn/Keberangkatan: <strong>{moment(cetak.listPtk?.tanggal_rencana_tiba_terakhir).format('DD/MM/YYYY')}</strong>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div className="col-md-6 wrup">
                                        <table className="tkanan">
                                            <tr>
                                                <td><b>Dokumen Persyaratan</b></td>
                                                <td><b>Dokumen Pendukung</b></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="inputs">
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '851'||item.kode_dokumen === '852'||item.kode_dokumen === '59') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Sertifikat Kesehatan   <br />
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === 'D10') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Prior Notice <br /> 
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '999') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Sertifikat Perlakuan <br />
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '60') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Sertifikat Hasil Uji<br /> 
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '999') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Sertifikat Keamanan Pangan <br />
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '24') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Sertifikat Radioaktivitas Pangan   <br />
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '999') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Ijin SDG<br /> 
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '803') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } SATS-LN/SATS-DN/SAJI-LN/SAJI-DN <br />
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '999') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Lainnya;<br /> 
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="inputs">
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '740'||item.kode_dokumen === '705') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Airway Bill/ Bill Of Lading   <br />
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '380') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Invoice <br /> 
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '217') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Packing list <br />
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '861') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Certificate of Origin<br /> 
                                                        <input type="checkbox" /> Packing Declaration <br />
                                                        {cetak.listDokumen?.some(item=>item.kode_dokumen === '999') ? (<strong>&#9745;</strong>):(<input type="checkbox" />) } Dokumen Lain   <br />
                                                    
                                                    </div>
                                                </td>
                                            </tr>
                                            
                                        </table>
                                    </div>
                                    <div className="col-md-6 wrep">
                                        <table>
                                            <tr>
                                                <td rowSpan={2} colSpan={2}>
                                                    &nbsp;informasi_tambahan: {cetak.listPtk?.informasi_tambahan}
                                                </td>
                                                
                                            </tr>
                                            <tr>
                                                <td><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></td>
                                            </tr>
                                        </table>

                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <p>
                                        bersama ini mengajukan permohonan pemasukan/pengeluaran/transit*) media pembawa seperti tersebut di bawah ini untuk dilakukan tindakakarantina dan/atau pengawasan, sebagai berikut:
                                        </p>
                                    </div>
                                </div> 
                                <div className="row">
                                    <p>
                                        <b>C. SERAH TERIMA</b>
                                    </p>
                                </div>
                                <div className="row">
                                    <p>Atas Informasi diatas, kami sebagai pemilik/pihak yang diberi kuasa menyerahkan Media Pembawa tersebut kepada Pejabat Karantina di
                                        UPT Badan Karantina Indonesia dan menyatakan bahwa: <br />
                                        a. Keterangan yang saya berikan tersebut di atas adalah benar;<br />
                                        b. Saya bersedia menanggung segala akibat dan biaya yang timbul apabila terhadap media pembawa tersebut dikenai tindakan karantina dan pengawasan dan/atau
                                        pengendalian;<br />
                                        c. Saya tidak akan menuntut ganti rugi dalam bentuk apapun kepada Pemerintah Republik Indonesia cq. Badan Karantina Indonesia atas segala
                                        akibat dari tindakan karantina dan pengawasan dan/atau pengendalian yang dikenakan terhadap media pembawa tersebut di atas; dan <br />
                                        d. Saya tidak akan membuka atau memindah tempatkan media pembawa tersebut tanpa seizin Pejabat Karantina, 
                                        selanjutnya mohon dilakukan tindakan karantina  dan pengawasan dan/atau pengendalian terhadap Media Pembawa tersebut sesuai dengan
                                        peraturan yang berlaku. </p>
                                </div>
                                <div className="row">
                                    <table style={{borderStyle: 'hidden'}}>
                                        <tbody>
                                            <tr>
                                                <td style={{width: '11.9685%'}}>&nbsp;</td>
                                                <td style={{width: '38.4945%'}}>Pemilik<br /><br /><br /><br /><strong>{cetak.listPtk?.nama_ttd}</strong></td>
                                                <td style={{width: '16.821%'}}>&nbsp;</td>
                                                <td style={{width: '32.716%'}}>Pejabat Karantina<br /><br /><br /><br /><strong>{cetak.listPtk?.petugas}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    &nbsp;
                                </div>
                                

                            </div>
                            
                        </div>
                        
                    </div>
                    <div>
                                    <center>
                                        <button onClick={printToPdf} className="btn btn-warning me-sm-2 me-1"><i className="fa-solid fa-print me-sm-2 me-1"></i>
                                        Cetak
                                        </button>
                                    </center>
                                </div>
                </div>
            </div>
        </div>
    
</div>
  )
}

export default PrintK11