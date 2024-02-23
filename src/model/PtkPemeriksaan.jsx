import axios from "axios";
import Cookies from "js-cookie";
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
            'user_id': Cookies.get("userId") // session
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
            'user_id': Cookies.get("userId"), // session
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
            'user_id': Cookies.get("userId"), // session
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
    
    getPnBongkar(id) {
      let config = {
          // method: 'post',
          method: 'get',
          maxBodyLength: Infinity,
          url: url + 'pn-bongkar/' + id,
          headers: { 
            'Content-Type': 'application/json', 
          },
        };
        
        return axios.request(config)
    }

    pnBongkar31(data) {
      const uuid = uuidv4();
      let datasend = {
        'id': data.idDok31 === '' ? uuid : data.idDok31,
        'ptk_id': data.idPtk,
        'dokumen_karantina_id': "9",
        'nomor': data.noDokumen.replace("K.1.1", "K.3.1"),
        'tanggal': data.tglDok31,
        'is_lengkap': "",
        'is_sah': "",
        'is_benar': "",
        'setuju_bongkar_muat': data.putusanBongkar,
        'keterangan': "",
        'user_ttd_id': data.ttdPutusan,
        'user_id': Cookies.get("userId"), // session
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
    
    pnBongkar32(data) {
      const uuid = uuidv4();

      let datasend = {
        'id': data.idDok32 === '' ? uuid : data.idDok32,
        'ptk_id': data.idPtk,
        'dokumen_karantina_id': "10",
        'nomor': data.noDokumen.replace("K.1.1", "K.3.2"),
        'tanggal': data.tglDok32,
        'is_lengkap': data.isLengkap,
        'is_sah': data.isSah,
        'is_benar': data.isBenar,
        'setuju_bongkar_muat': data.putusanBongkar,
        'keterangan': data.keterangan,
        'user_ttd_id': data.ttdPutusan,
        'user_id': Cookies.get("userId"), // session
      }       
      let config = {
        // method: 'post',
          method: data.idDok32 === '' ? 'post' : 'put',
          maxBodyLength: Infinity,
          url: url + (data.idDok32 === '' ? 'pn-bongkar' : 'pn-bongkar/' + data.idDok32),
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        console.log(JSON.stringify(datasend))
        
        return axios.request(config)
    }

    pnSampling(data) {
      const uuid = uuidv4();

      const detilSampling = {
        id: "",
        pn_ba_contoh_id: "",
        ptk_komoditas_id: "",
        kode_contoh: "",
        jumlah_contoh: "",
        identitas_contoh: "",
        kondisi_contoh: "",
        suhu_contoh: "",
        nomor_kontainer: "",
        keterangan: ""
      }
      
      let datasend = {
        'id': data.idDok33 === '' ? uuid : data.idDok33,
        'ptk_id': data.idPtk,
        'ptk_surat_tugas_id': data.idSurtug,
        'nomor': data.noDokumen.replace("K.1.1", "K.3.2"),
        'tanggal': data.tglDok33,
        'lokasi_mp': data.lokasiMP,
        'tgl_sampling': data.tglSampling,
        'norek_ppc': data.noRegistrasi,
        'tujuan1': data.tujuan1,
        'tujuan2': data.tujuan2,
        'tujuan3': data.tujuan3,
        'tujuan4': data.tujuan4,
        'tujuan5': data.tujuan5,
        'tujuan6': data.tujuan6,
        'tujuan7': data.tujuan7,
        'tujuan8': data.tujuan8,
        'tujuan9': data.tujuan9,
        'tujuan10': data.tujuan10,
        'tujuan11': data.tujuan11,
        'tujuan12': data.tujuan12,
        'catatan': data.catatan,
        'nama_pemilik': data.namapemilik,
        'nik_pemilik': data.nikPemilik,
        'user_ttd_id': data.ttdPutusan,
        'user_id': Cookies.get("userId"), // session
        'sampling_detil': detilSampling
      }       
      let config = {
          // method: 'post',
          method: data.idDok33 === '' ? 'post' : 'put',
          maxBodyLength: Infinity,
          url: url + (data.idDok33 === '' ? 'pn-sampling' : 'pn-sampling/' + data.idDok33),
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        console.log(JSON.stringify(datasend))
        
        return axios.request(config)
    }
}