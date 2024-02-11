import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
const url = 'http://localhost/api-barantin/';

export default class PnPemusnahan {
    getByPtkId(idPtk) {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url + 'pn-musnah/' + idPtk,
            headers: { 
              'Content-Type': 'application/json', 
            }
          };
          return axios.request(config)
    }

    simpan81(data) {
        const uuid = uuidv4()
        let datasend = {
            'id': data.idDok81 === '' ? uuid : data.idDok81,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': "35",
            'pn_pemusnahan_id': data.idDok82,
            'nomor': data.noDokumen.replace("K.1.1", "K.8.1"),
            'tanggal': data.tglDok81,
            'alasan1': data.a1 === '' ? '0' : data.a1,
            'alasan2': data.a2 === '' ? '0' : data.a2,
            'alasan3': data.a3 === '' ? '0' : data.a3,
            'alasan4': data.a4 === '' ? '0' : data.a4,
            'alasan5': data.a5 === '' ? '0' : data.a5,
            'alasan6': data.a6 === '' ? '0' : data.a6,
            'alasan_lain': data.a7 ? data.a7Lain : null,
            'maks_pemusnahan': data.maksMusnah,
            'petugas_pelaksana': "",
            'nip_pelaksana': "",
            'tempat_musnah': "",
            'metode_musnah': "",
            'diterbitkan_di': data.diterbitkan,
            'user_ttd_id': data.userTtd,
            'otoritas_pelabuhan': data.otban,
            'kepala_kantor_bc': data.kaBc,
            'nama_pengelola': data.namaPengelola,
            'tgl_dikeluarkan': data.tglDikeluarkan,
            'user_id': "1",
            'saksi': ""
        }
        
        let config = {
            method: data.idDok81 === '' ? 'post' : 'put',
            maxBodyLength: Infinity,
            url: url + (data.idDok81 === '' ? 'pn-musnah' : 'pn-musnah/' + data.idDok81),
            headers: { 
              'Content-Type': 'application/json', 
            },
            data: datasend
          };
          console.log("dok kt1: " + JSON.stringify(config))
          return axios.request(config)
    }
    
    simpan82(data, listSaksi) {
        const uuid = uuidv4()

        const saksi = listSaksi.map((item, index) => {
            return {
                id : uuidv4(),
                pn_pemusnahan_id: data.idDok82 === '' ? uuid : data.idDok82,
                urut: index + 1,
                nama: item.nama,
                is_pemilik: item.isPemilik,
                alamat: item.alamat,
                jabatan_pekerjaan: item.jabatan
            }
        })

        let datasend = {
            'id': data.idDok82 === '' ? uuid : data.idDok82,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': "36",
            'pn_pemusnahan_id': null,
            'nomor': data.noDokumen.replace("K.1.1", "K.8.2"),
            'tanggal': data.tglDok81,
            'alasan1': data.a1 === '' ? '0' : data.a1,
            'alasan2': data.a2 === '' ? '0' : data.a2,
            'alasan3': data.a3 === '' ? '0' : data.a3,
            'alasan4': data.a4 === '' ? '0' : data.a4,
            'alasan5': data.a5 === '' ? '0' : data.a5,
            'alasan6': data.a6 === '' ? '0' : data.a6,
            'alasan_lain': data.a7 ? data.a7Lain : null,
            'maks_pemusnahan': data.maksMusnah,
            'petugas_pelaksana': "",
            'nip_pelaksana': "",
            'tempat_musnah': "",
            'metode_musnah': "",
            'diterbitkan_di': data.diterbitkan,
            'user_ttd_id': data.userTtd,
            'otoritas_pelabuhan': data.otban,
            'kepala_kantor_bc': data.kaBc,
            'nama_pengelola': data.namaPengelola,
            'tgl_dikeluarkan': data.tglDikeluarkan,
            'user_id': "1",
            'saksi': saksi
        }
        
        let config = {
            method: data.idDok82 === '' ? 'post' : 'put',
            maxBodyLength: Infinity,
            url: url + (data.idDok82 === '' ? 'pn-musnah' : 'pn-musnah/' + data.idDok82),
            headers: { 
              'Content-Type': 'application/json', 
            },
            data: datasend
          };
          console.log("dok kt1: " + JSON.stringify(config))
          return axios.request(config)
    }
}