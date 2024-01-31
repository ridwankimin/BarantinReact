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