import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
const url = 'http://localhost/api-barantin/';

export default class PtkPemeriksaan {
    getAdminByPtkId(id) {
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: url + 'pn-adm/' + id,
          headers: { 
            'Content-Type': 'application/json', 
          },
        };
        // console.log(JSON.stringify(datasend))
        
        return axios.request(config)
    }
    
    getFisikByPtkId(id) {
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: url + 'pn-fisik/' + id,
          headers: { 
            'Content-Type': 'application/json', 
          },
        };
        // console.log(JSON.stringify(datasend))
        
        return axios.request(config)
    }

    ptkAdmin(data) {
        const uuid = uuidv4();
       let datasend = {
            'id': data.idDok37a === '' ? uuid : data.idDok37a,
            'ptk_id': data.idPtk,
            'ptk_surat_tugas_id': data.idSurtug,
            'nomor': data.noDok.replace("K.1.1", "K.3.7a"),
            'tanggal': data.tglDok37a,
            'hasil_periksa_id': data.opsiAdministratif,
            'rekomendasi_id': data.rekomAdmin,
            'user_ttd_id': data.ttdAdminidtratif,
            'user_id': "1" // session
        }       
      let config = {
          // method: 'post',
          method: data.idDok37a === '' ? 'post' : 'put',
          maxBodyLength: Infinity,
          url: url + (data.idDok37a === '' ? 'pn-adm' : 'pn-adm/' + data.idDok37a),
          // url: url + 'pn-adm',
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        // console.log(JSON.stringify(datasend))
        
        return axios.request(config)
    }
    
    ptkFisikKesehatan(data, listKesehatan) {
        const uuid = uuidv4();
        const periksaDetil = listKesehatan.map(item => {
          return {
              id: uuidv4(),
              ptk_komoditas_id: item.ptk_komoditas_id,
              target_sasaran1: item.target_sasaran1,
              metode1: item.metode1,
              temuan_hasil1: item.temuan_hasil1,
              catatan1: item.catatan1,
              target_sasaran2: item.target_sasaran2,
              metode2: item.metode2,
              temuan_hasil2: item.temuan_hasil2,
              catatan2: item.catatan2,
          }
        })
        
        let datasend = {
            'id': data.idDok37b === '' ? uuid : data.idDok37b,
            'ptk_id': data.idPtk,
            'pn_administrasi_id': data.idDok37a,
            'nomor': data.noDok.replace("K.1.1", "K.3.7b"),
            'tanggal': data.idDok37b === '' ? '' : data.tglDok37b,
            'kesimpulan': data.kesimpulan37b,
            // 'tanggal_periksa': data.idDok37b === '' ? data.tglDok37b : '',
            'is_ujilab': data.isUjiLab,
            'rekomendasi_id': data.rekom37b,
            'user_ttd1_id': data.ttd1,
            'user_ttd2_id': data.ttd2,
            'user_id': "1", // session
            'periksa_detil': periksaDetil
        }       
      let config = {
          // method: 'post',
          method: data.idDok37b === '' ? 'post' : 'put',
          maxBodyLength: Infinity,
          url: url + (data.idDok37b === '' ? 'pn-fisik' : 'pn-fisik/' + data.idDok37b),
          // url: url + 'pn-adm',
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        console.log(JSON.stringify(datasend))
        
        return axios.request(config)
    }
    
    ptkFisikKesehatanHeader(data) {
        let datasend = {
            'id': data.idDok37b,
            'tanggal': data.tglDok37b,
            'kesimpulan': data.kesimpulan37b,
            // 'tanggal_periksa': data.idDok37b === '' ? data.tglDok37b : '',
            'rekomendasi_id': data.rekom37b[0],
            'rekomendasi2_id': data.rekom37b.length === 2 ? data.rekom37b[1] : '',
            'user_ttd2_id': data.ttd2,
            'user_id': "1", // session
        }       
      let config = {
          // method: 'post',
          method: 'put',
          maxBodyLength: Infinity,
          url: url + 'pn-fisik/header/' + data.idDok37b,
          // url: url + 'pn-adm',
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        console.log(JSON.stringify(config))
        
        return axios.request(config)
    }
    
    pnBongkar(data) {
      const uuid = uuidv4();
      let datasend = {
        'id': uuid,
        'ptk_id': data.idPtk,
        // 'ptk_analisis_id': data.idAnalis,
        'ptk_analisis_id': "123",
        'nomor': data.noDokumen.replace("K.1.1", "K.3.1"),
        'tanggal': data.tglDok31,
        'setuju_bongkar': data.putusanBongkar,
        'user_ttd_id': data.ttdPutusan,
        'user_id': "1", // session
      }       
      let config = {
          // method: 'post',
          method: data.idDok31 === '' ? 'post' : 'put',
          maxBodyLength: Infinity,
          url: url + (data.idDok31 === '' ? 'pn-bongkar' : 'pn-bongkar/' + data.idDok31),
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        console.log(JSON.stringify(datasend))
        
        return axios.request(config)
    }
}