/* eslint-disable eqeqeq */
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
const url = process.env.REACT_APP_BE_LINK;

export default class PnPemusnahan {
    getByPtkId(idPtk, dok) {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url + 'pn-musnah/dok/',
            headers: { 
              'Content-Type': 'application/json', 
            },
            data: {
              ptk_id: idPtk,
              dokumen_karantina_id: dok
            }
          };
          return axios.request(config)
    }

    simpan81(data) {
        const uuid = uuidv4()
        let datasend = {
            'id': data.idDok81 == '' ? uuid : data.idDok81,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': "35",
            'pn_pemusnahan_id': "",
            'nomor': data.noDokumen.replace("K.1.1", "K.8.1"),
            'tanggal': data.tglDok81,
            'alasan1': data.a1 == '' ? '0' : data.a1,
            'alasan2': data.a2 == '' ? '0' : data.a2,
            'alasan3': data.a3 == '' ? '0' : data.a3,
            'alasan4': data.a4 == '' ? '0' : data.a4,
            'alasan5': data.a5 == '' ? '0' : data.a5,
            'alasan6': data.a6 == '' ? '0' : data.a6,
            'alasan_lain': data.a7 ? data.a7Lain : null,
            'maks_pemusnahan': data.maksMusnah,
            'petugas_pelaksana': "",
            'nip_pelaksana': "",
            'lokasi_mp': data.lokasiMp,
            'tempat_musnah': "",
            'metode_musnah': "",
            'diterbitkan_di': data.diterbitkan,
            'user_ttd_id': data.ttdPutusan,
            'otoritas_pelabuhan': data.otban,
            'kepala_kantor_bc': data.kaBc,
            'nama_pengelola': data.namaPengelola,
            // 'is_attachment': data.isAttach,
            // 'tgl_dikeluarkan': data.tglDok81,
            'user_id': Cookies.get("userId"),
            'saksi': ""
        }
        
        let config = {
            method: data.idDok81 == '' ? 'post' : 'put',
            maxBodyLength: Infinity,
            url: url + (data.idDok81 == '' ? 'pn-musnah' : 'pn-musnah/' + data.idDok81),
            headers: { 
              'Content-Type': 'application/json', 
            },
            data: datasend
          };
          return axios.request(config)
    }
    
    simpan82(data, listSaksi) {
        const uuid = uuidv4()

        const saksi = listSaksi?.map((item, index) => {
            return {
                id : uuidv4(),
                pn_pemusnahan_id: data.idDok82 == '' ? uuid : data.idDok82,
                urut: (index + 1),
                nama: item.nama,
                is_pemilik: item.isPemilik,
                alamat: item.alamat,
                jabatan_pekerjaan: item.jabatan
            }
        })

        let datasend = {
            'id': data.idDok82 == '' ? uuid : data.idDok82,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': "36",
            'pn_pemusnahan_id': data.idDok81,
            'nomor': data.noDokumen.replace("K.1.1", "K.8.2"),
            'tanggal': data.tglDok82,
            'alasan1': "",
            'alasan2': "",
            'alasan3': "",
            'alasan4': "",
            'alasan5': "",
            'alasan6': "",
            'alasan_lain': "",
            'maks_pemusnahan': data.maksMusnah,
            'petugas_pelaksana': data.pelaksanaMusnah?.split(" - ")[0],
            'nip_pelaksana': data.pelaksanaMusnah?.split(" - ")[1],
            'lokasi_mp': "",
            'tempat_musnah': data.lokasiMusnah,
            'metode_musnah': data.metodeMusnah,
            'diterbitkan_di': data.diterbitkan,
            'user_ttd_id': data.ttdPutusan,
            // 'is_attachment': data.isAttach,
            'otoritas_pelabuhan': "",
            'kepala_kantor_bc': "",
            'nama_pengelola': "",
            // 'tgl_dikeluarkan': data.tglDok82,
            'user_id': Cookies.get("userId"),
            'saksi': saksi
        }
        
        let config = {
            method: data.idDok82 == '' ? 'post' : 'put',
            maxBodyLength: Infinity,
            url: url + (data.idDok82 == '' ? 'pn-musnah' : 'pn-musnah/' + data.idDok82),
            headers: { 
              'Content-Type': 'application/json', 
            },
            data: datasend
          };
          return axios.request(config)
    }
}