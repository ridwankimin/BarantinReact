import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
const url = process.env.REACT_APP_BE_LINK;

export default class PnPerlakuan {
  getPtkByDokumen(idPtk, idDok) {
    let config = {
      // method: 'post',
      method: 'post',
      maxBodyLength: Infinity,
      url: url + 'pn-perlakuan/dok/',
      // url: url + 'pn-adm',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: {
        ptk_id: idPtk,
        dokumen_karantina_id: idDok
      }
    };
    // console.log("dok k53: " + JSON.stringify(config))
    return axios.request(config)
  }
    
    sertifPerlakuan(data) {
        const uuid = uuidv4();
       let datasend = {
            'id': data.idDok51 === '' ? uuid : data.idDok51,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': data.dokKarId,
            'ptk_surat_tugas_id': data.idSurtug,
            'nomor': data.noDokumen.replace("K.1.1", "K.5.1"),
            'tanggal': data.tglDok51,
            'nama_dagang_mp': data.namaUmumMP,
            'nama_ilmiah_mp': data.namaIlmiahMP,
            'bentuk_jmlh_mp': data.bentukJmlMP,
            'target_perlakuan': data.targetPerlakuan,
            // 'target_deskripsi': data.rekomAdmin, //
            'alasan_perlakuan': data.alasanPerlakuan,
            'metode_perlakuan': data.metodePerlakuan,
            'tipe_perlakuan_id': data.tipePerlakuan,  // mig ippc
            'pestisida_id': data.bahanPestisida,
            // 'fumigan_id': data.rekomAdmin, // buat sert fumigasi
            // 'dosis_rekomendasi': data.rekomAdmin, // buat sert fumigasi
            'dosis_aplikasi': data.dosisPestisida, 
            // 'lama_papar': data.rekomAdmin, // buat sert fumigasi
            'tempat_pelaksanaan': data.tempatPerlakuan,
            // 'instalasi_karantina_id': data.rekomAdmin,  //kalo data.tempatperlakuan IK atau TL 
            'nama_tempat': data.namaTempatPerlakuan,
            'alamat_tempat': data.alamatTempatPerlakuan,
            'tgl_perlakuan_mulai': data.mulaiPerlakuan,
            'tgl_perlakuan_selesai': data.selesaiPerlakuan,
            'nama_operator': data.operatorPelaksana,
            'alamat_operator': data.alamatOperatorPelaksana,
            // 'tipe_ruang_fumigasi': data.rekomAdmin, // buat sert fumigasi
            // 'suhu_komoditi': data.rekomAdmin, // buat sert fumigasi
            // 'nilai_tlv_akhir': data.rekomAdmin, // buat sert fumigasi
            // 'fumigator_id': data.rekomAdmin,  // buat sert fumigasi
            'ket_perlakuan_lain': data.keteranganLain,
            // 'hasil_perlakuan': data.rekomAdmin, // buat form laporan
            // 'rekomendasi_id': data.rekomAdmin, // buat form laporan 
            'diterbitkan_di': data.diterbitkan, //
            'user_ttd_id': data.ttdPerlakuan,
            'user_id': Cookies.get("userId") // session
        }       
      let config = {
          // method: 'post',
          method: data.idDok51 === '' ? 'post' : 'put',
          maxBodyLength: Infinity,
          url: url + (data.idDok51 === '' ? 'pn-perlakuan' : 'pn-perlakuan/' + data.idDok51),
          // url: url + 'pn-adm',
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        // console.log(JSON.stringify(datasend))
        
        return axios.request(config)
    }
    
    sertifFumigasi(data) {
        const uuid = uuidv4();
       let datasend = {
            'id': data.idDok52 === '' ? uuid : data.idDok52,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': data.dokKarId,
            'ptk_surat_tugas_id': data.idSurtug,
            'nomor': data.noDokumen.replace("K.1.1", "K.5.2"),
            'tanggal': data.tglDok52,
            'nama_dagang_mp': data.namaUmumMP,
            'nama_ilmiah_mp': data.namaIlmiahMP,
            'bentuk_jmlh_mp': data.bentukJmlMP,
            'target_perlakuan': data.targetPerlakuan,
            // 'target_deskripsi': data.rekomAdmin, //
            // 'alasan_perlakuan': data.alasanPerlakuan,
            // 'metode_perlakuan': data.metodePerlakuan,
            // 'tipe_perlakuan_id': data.tipePerlakuan,  // mig ippc
            'pestisida_id': data.fumigan,
            // 'fumigan_id': data.fumigan, // buat sert fumigasi
            'dosis_rekomendasi': data.dosisRekom, // buat sert fumigasi
            'dosis_aplikasi': data.dosisAplikasi, 
            'lama_papar': data.lamaPapar, // buat sert fumigasi
            'tempat_pelaksanaan': data.tempatPerlakuan,
            // 'instalasi_karantina_id': data.rekomAdmin,  //kalo data.tempatperlakuan IK atau TL 
            'nama_tempat': data.namaTempatPerlakuan,
            'alamat_tempat': data.alamatTempatPerlakuan,
            'nama_operator': data.namaFumigator,
            'alamat_operator': data.alamatFumigator,
            'tgl_perlakuan_mulai': data.mulaiPerlakuan,
            'tgl_perlakuan_selesai': data.selesaiPerlakuan,
            'tipe_ruang_fumigasi': data.tipeRuang, // buat sert fumigasi
            'suhu_komoditi': data.suhuMinim, // buat sert fumigasi
            'nilai_tlv_akhir': data.nilaiTlv, // buat sert fumigasi
            'fumigator_id': data.fumigatorAkreditasi,  // buat sert fumigasi
            // 'ket_perlakuan_lain': data.keteranganLain,
            // 'hasil_perlakuan': data.rekomAdmin, // buat form laporan
            // 'rekomendasi_id': data.rekomAdmin, // buat form laporan 
            'diterbitkan_di': data.diterbitkan, //
            'user_ttd_id': data.ttdPerlakuan,
            'user_id': Cookies.get("userId") // session
        }       
      let config = {
          // method: 'post',
          method: data.idDok52 === '' ? 'post' : 'put',
          maxBodyLength: Infinity,
          url: url + (data.idDok52 === '' ? 'pn-perlakuan' : 'pn-perlakuan/' + data.idDok52),
          // url: url + 'pn-adm',
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        // console.log(JSON.stringify(datasend))
        
        return axios.request(config)
    }
    
    sertifLaporan(data) {
        const uuid = uuidv4();
       let datasend = {
            'id': data.idDok53 === '' ? uuid : data.idDok53,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': data.dokKarId,
            'ptk_surat_tugas_id': data.idSurtug,
            'nomor': data.noDokumen.replace("K.1.1", "K.5.3"),
            'tanggal': data.tglDok53,
            'jenis_tugas': data.jenisTugas,
            'nama_dagang_mp': data.namaUmumMP,
            'nama_ilmiah_mp': data.namaIlmiahMP,
            'bentuk_jmlh_mp': data.bentukJmlMP,
            'target_perlakuan': data.targetPerlakuan,
            'ket_mp_lain': data.ketLainMP, //
            'alasan_perlakuan': data.alasanPerlakuan,
            'metode_perlakuan': data.metodePerlakuan,
            'tipe_perlakuan_id': data.tipePerlakuan,  // mig ippc
            'pestisida_id': data.bahanPestisida,
            // 'fumigan_id': data.fumigan, // buat sert fumigasi
            'dosis_rekomendasi': data.dosisRekom, // buat sert fumigasi
            'dosis_aplikasi': data.dosisAplikasi, 
            'lama_papar': data.lamaPapar, // buat sert fumigasi
            'tempat_pelaksanaan': data.tempatPerlakuan,
            // 'instalasi_karantina_id': data.rekomAdmin,  //kalo data.tempatperlakuan IK atau TL 
            'nama_tempat': data.namaTempatPerlakuan,
            'alamat_tempat': data.alamatTempatPerlakuan,
            'nama_operator': data.operatorPelaksana,
            'alamat_operator': data.alamatOperatorPelaksana,
            'tgl_perlakuan_mulai': data.mulaiPerlakuan,
            'tgl_perlakuan_selesai': data.selesaiPerlakuan,
            // 'tipe_ruang_fumigasi': data.tipeRuang, // buat sert fumigasi
            'suhu_komoditi': data.suhuMinim, // buat sert fumigasi
            // 'nilai_tlv_akhir': data.nilaiTlv, // buat sert fumigasi
            // 'fumigator_id': data.fumigatorAkreditasi,  // buat sert fumigasi
            'ket_perlakuan_lain': data.keteranganLain,
            'hasil_perlakuan': data.hasilPerlakuan, // buat form laporan
            'rekomendasi_id': data.rekomPerlakuan, // buat form laporan 
            'diterbitkan_di': data.diterbitkan, //
            'user_ttd_id': data.ttdPerlakuan,
            'user_id': Cookies.get("userId") // session
        }       
      let config = {
          // method: 'post',
          method: data.idDok53 === '' ? 'post' : 'put',
          maxBodyLength: Infinity,
          url: url + (data.idDok53 === '' ? 'pn-perlakuan' : 'pn-perlakuan/' + data.idDok53),
          // url: url + 'pn-adm',
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        // console.log(JSON.stringify(datasend))
        
        return axios.request(config)
    }
}