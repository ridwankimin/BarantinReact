/* eslint-disable eqeqeq */
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
const url = process.env.REACT_APP_BE_LINK;

export default class PnPenolakan {
    getByPtkId(idPtk, dokId) {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url + 'pn-tolak/dok',
            headers: { 
            'Content-Type': 'application/json', 
            },
            data: {
                ptk_id: idPtk,
                dokumen_karantina_id: dokId
            }
        };
        return axios.request(config)
    }

    save71(data) {
        const uuid = uuidv4()
        let datasend = {
            'id': data.idDok71 == '' ? uuid : data.idDok71,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': "29",
            'ptk_surat_tugas_id': data.idSurtug,
            'pn_penolakan_id': "",
            'kepada': "",
            'nomor': data.noDokumen.replace("K.1.1", "K.7.1"),
            'tanggal': data.tglDok71,
            'alasan1': data.alasanTolak1,
            'alasan2': data.alasanTolak2,
            'alasan3': data.alasanTolak3,
            'alasan4': data.alasanTolak4,
            'alasan5': data.alasanTolak5,
            'alasan6': data.alasanTolak6,
            'alasan7': data.alasanTolak7,
            'alasan8': data.alasanTolak8,
            'alasan_lain': data.alasanTolak9 ? data.alasanTolakLain : "",
            'diwajibkan1': data.diwajibkan1,
            'diwajibkan2': data.diwajibkan2,
            'diwajibkan3': data.diwajibkan3,
            'diwajibkan4': data.diwajibkan4,
            'specify1': "",
            'specify2': "",
            'specify3': "",
            'specify4': "",
            'specify5': "",
            'rekomendasi_id': "",
            'information': "",
            'diterbitkan_di': data.diterbitkan,
            'user_ttd_id': data.ttdPutusan,
            'is_attachment': data.isAttach,
            // 'tembusan': data.otban,
            'dikuasakan_negara': data.dikuasakan,
            'otoritas_pelabuhan': data.otban,
            'kepala_kantor_bc': data.kaBc,
            'nama_pengelola': data.namaPengelola,
            'permohonan_perpanjangan_id': "",
            'status_perpanjangan': "",
            'tgl_dikeluarkan': "",
            'consignment': "",
            'consignment_detil': "",
            'user_id': Cookies.get("userId"),
            'saksi': ""
        }
        let config = {
        method: data.idDok71 == '' ? 'post' : 'put',
        maxBodyLength: Infinity,
        url: url + (data.idDok71 == '' ? 'pn-tolak' : 'pn-tolak/' + data.idDok71),
        // url: url + 'pn-adm',
        headers: { 
            'Content-Type': 'application/json', 
        },
        data: datasend
        };
        
        return axios.request(config)
    }
    
    save72(data, listSaksi) {
        const uuid = uuidv4()
        
        const saksi = listSaksi?.map((item, index) => {
            return {
                id : uuidv4(),
                pn_pemusnahan_id: data.idDok72 == '' ? uuid : data.idDok72,
                urut: (index + 1),
                nama: item.nama,
                is_pemilik: item.isPemilik,
                alamat: item.alamat,
                jabatan_pekerjaan: item.jabatan_pekerjaan
            }
        })

        let datasend = {
            'id': data.idDok72 == '' ? uuid : data.idDok72,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': "30",
            'ptk_surat_tugas_id': data.idSurtug,
            'pn_penolakan_id': data.idDok71,
            'kepada': "",
            'nomor': data.noDokumen.replace("K.1.1", "K.7.2"),
            'tanggal': data.tglDok72,
            'alasan1': "",
            'alasan2': "",
            'alasan3': "",
            'alasan4': "",
            'alasan5': "",
            'alasan6': "",
            'alasan7': "",
            'alasan8': "",
            'alasan_lain': "",
            'diwajibkan1': "",
            'diwajibkan2': "",
            'diwajibkan3': "",
            'diwajibkan4': "",
            'rekomendasi_id': "",
            'specify1': "",
            'specify2': "",
            'specify3': "",
            'specify4': "",
            'specify5': "",
            'dikuasakan_negara': "",
            'information': "",
            'diterbitkan_di': data.diterbitkan,
            'user_ttd_id': data.ttdPutusan,
            'is_attachment': data.isAttach,
            // 'tembusan': "",
            'otoritas_pelabuhan': "",
            'kepala_kantor_bc': "",
            'nama_pengelola': "",
            'permohonan_perpanjangan_id': "",
            'status_perpanjangan': "",
            'tgl_dikeluarkan': "",
            'consignment': "",
            'consignment_detil': "",
            'user_id': Cookies.get("userId"),
            'saksi': saksi
        }
        let config = {
        method: data.idDok72 == '' ? 'post' : 'put',
        maxBodyLength: Infinity,
        url: url + (data.idDok72 == '' ? 'pn-tolak' : 'pn-tolak/' + data.idDok72),
        // url: url + 'pn-adm',
        headers: { 
            'Content-Type': 'application/json', 
        },
        data: datasend
        };
        
        return axios.request(config)
    }
    
    save73(data, idDok72) {
        const uuid = uuidv4()
        
        let datasend = {
            'id': data.idDok73 == '' ? uuid : data.idDok73,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': "31",
            'ptk_surat_tugas_id': data.idSurtug,
            'pn_penolakan_id': idDok72,
            'kepada': "",
            'nomor': data.noDokumen.replace("K.1.1", "K.7.3"),
            'tanggal': data.tglDok73 ? data.tglDok73 : data.tglDok72,
            'alasan1': "",
            'alasan2': "",
            'alasan3': "",
            'alasan4': "",
            'alasan5': "",
            'alasan6': "",
            'alasan7': "",
            'alasan8': "",
            'alasan_lain': "",
            'diwajibkan1': "",
            'diwajibkan2': "",
            'diwajibkan3': "",
            'diwajibkan4': "",
            'rekomendasi_id': "",
            'specify1': "",
            'specify2': "",
            'specify3': "",
            'specify4': "",
            'specify5': "",
            'dikuasakan_negara': "",
            'diterbitkan_di': data.diterbitkan,
            'user_ttd_id': data.ttdPutusan,
            'is_attachment': data.isAttach,
            // 'tembusan': "",
            'information': "",
            'otoritas_pelabuhan': "",
            'kepala_kantor_bc': "",
            'nama_pengelola': "",
            'permohonan_perpanjangan_id': "",
            'status_perpanjangan': "",
            'tgl_dikeluarkan': "",
            'consignment': "",
            'consignment_detil': "",
            'user_id': Cookies.get("userId"), // session
            'saksi': ""
        }
        let config = {
        method: data.idDok73 == '' ? 'post' : 'put',
        maxBodyLength: Infinity,
        url: url + (data.idDok73 == '' ? 'pn-tolak' : 'pn-tolak/' + data.idDok73),
        // url: url + 'pn-adm',
        headers: { 
            'Content-Type': 'application/json', 
        },
        data: datasend
        };
        
        return axios.request(config)
    }
    
    save74(data) {
        const uuid = uuidv4()
        
        let datasend = {
            'id': data.idDok74 == '' ? uuid : data.idDok74,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': "32",
            'ptk_surat_tugas_id': data.idSurtug,
            'pn_penolakan_id': "",
            'kepada': data.toNPPO,
            'nomor': data.noDokumen.replace("K.1.1", "K.7.4"),
            'tanggal': data.tglDok74,
            'alasan1': "",
            'alasan2': "",
            'alasan3': "",
            'alasan4': "",
            'alasan5': "",
            'alasan6': "",
            'alasan7': "",
            'alasan8': "",
            'alasan_lain': "",
            'diwajibkan1': "",
            'diwajibkan2': "",
            'diwajibkan3': "",
            'diwajibkan4': "",
            'specify1': data.nnc1 == "1" ? data.textNnc1 : "",
            'specify2': data.nnc2 == "1" ? data.textNnc2 : "",
            'specify3': data.nnc3 == "1" ? data.textNnc3 : "",
            'specify4': data.nnc4 == "1" ? data.textNnc4 : "",
            'specify5': data.nnc5 == "1" ? data.textNnc5 : "",
            'dikuasakan_negara': "",
            'rekomendasi_id': data.rekomendasi,
            'diterbitkan_di': data.diterbitkan,
            'user_ttd_id': data.ttdPutusan,
            'is_attachment': data.isAttach,
            // 'tembusan': "",
            'information': "",
            'otoritas_pelabuhan': "",
            'kepala_kantor_bc': "",
            'nama_pengelola': "",
            'permohonan_perpanjangan_id': "",
            'status_perpanjangan': "",
            'tgl_dikeluarkan': "",
            'consignment': data.entirePartial,
            'consignment_detil': data.consignmentDetil,
            'user_id': Cookies.get("userId"), // session
            'saksi': ""
        }
        let config = {
        method: data.idDok74 == '' ? 'post' : 'put',
        maxBodyLength: Infinity,
        url: url + (data.idDok74 == '' ? 'pn-tolak' : 'pn-tolak/' + data.idDok74),
        // url: url + 'pn-adm',
        headers: { 
            'Content-Type': 'application/json', 
        },
        data: datasend
        };
        return axios.request(config)
    }
}