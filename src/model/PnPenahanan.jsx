/* eslint-disable eqeqeq */
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
// const url = process.env.REACT_APP_BE_LINK;
const url = import.meta.env.VITE_BE_LINK;

export default class PnPenahanan {
    getByPtkId(idPtk, dokId) {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url + 'pn-tahan/dok',
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

    save61(data) {
        const uuid = uuidv4()
        let datasend = {
            'id': data.idDok61 == '' ? uuid : data.idDok61,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': "26",
            'ptk_surat_tugas_id': data.idSurtug,
            'pn_penahanan_id': "",
            'nomor': data.noDokumen.replace("K.1.1", "K.6.1"),
            'tanggal': data.tglDok61,
            'alasan1': data.alasanTahan1,
            'alasan2': data.alasanTahan2,
            'alasan3': data.alasanTahan3,
            'diminta1': data.noticeTahan1,
            'diminta2': data.noticeTahan2,
            'diminta3': data.noticeTahan3,
            'tgl_penahanan_mulai': "",
            'tgl_penahanan_selesai': "",
            'nama_tempat': "",
            'alamat_tempat': "",
            'kondisi_lingkungan': "",
            'kondisi_mp': "",
            'tindakan_segel': "",
            'tindakan_penjaga': "",
            'tindakan_perawatan': "",
            'tindakan_lain': "",
            'dok_dapat_dipenuhi': "",
            'rekomendasi_id': "",
            'diterbitkan_di': data.diterbitkan,
            'user_ttd_id': data.ttdPutusan,
            'is_attachment': data.isAttach,
            'tembusan1': data.tembusan1,
            'tembusan2': data.tembusan2,
            'tembusan3': data.tembusan3,
            'tembusan4': data.tembusan4,
            'user_id': Cookies.get("userId"), //session
        }
        let config = {
        method: data.idDok61 == '' ? 'post' : 'put',
        maxBodyLength: Infinity,
        url: url + (data.idDok61 == '' ? 'pn-tahan' : 'pn-tahan/' + data.idDok61),
        // url: url + 'pn-adm',
        headers: { 
            'Content-Type': 'application/json', 
        },
        data: datasend
        };
        return axios.request(config)
    }
    
    save62(data, id61) {
        const uuid = uuidv4()
        let datasend = {
            'id': data.idDok62 == '' ? uuid : data.idDok62,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': "27",
            'ptk_surat_tugas_id': data.idSurtug,
            'pn_penahanan_id': id61,
            'nomor': data.noDokumen.replace("K.1.1", "K.6.2"),
            'tanggal': data.tglDok62 ? data.tglDok62 : data.tglDok61,
            'alasan1': "",
            'alasan2': "",
            'alasan3': "",
            'diminta1': "",
            'diminta2': "",
            'diminta3': "",
            'tgl_penahanan_mulai': "",
            'tgl_penahanan_selesai': "",
            'nama_tempat': "",
            'alamat_tempat': "",
            'kondisi_lingkungan': "",
            'kondisi_mp': "",
            'tindakan_segel': "",
            'tindakan_penjaga': "",
            'tindakan_perawatan': "",
            'tindakan_lain': "",
            'dok_dapat_dipenuhi': "",
            'rekomendasi_id': "",
            'diterbitkan_di': data.diterbitkan,
            'user_ttd_id': data.ttdPutusan,
            'is_attachment': data.isAttach,
            'tembusan1': data.tembusan1,
            'tembusan2': data.tembusan2,
            'tembusan3': data.tembusan3,
            'tembusan4': data.tembusan4,
            'user_id': Cookies.get("userId"), //session
        }
        let config = {
        method: data.idDok62 == '' ? 'post' : 'put',
        maxBodyLength: Infinity,
        url: url + (data.idDok62 == '' ? 'pn-tahan' : 'pn-tahan/' + data.idDok62),
        // url: url + 'pn-adm',
        headers: { 
            'Content-Type': 'application/json', 
        },
        data: datasend
        };
        return axios.request(config)
    }
    
    save63(data) {
        const uuid = uuidv4()
        let datasend = {
            'id': data.idDok63 == '' ? uuid : data.idDok63,
            'ptk_id': data.idPtk,
            'dokumen_karantina_id': "28",
            'ptk_surat_tugas_id': data.idSurtug,
            'pn_penahanan_id': data.idDok61,
            'nomor': data.noDokumen.replace("K.1.1", "K.6.3"),
            'tanggal': data.tglDok63,
            'alasan1': "",
            'alasan2': "",
            'alasan3': "",
            'diminta1': "",
            'diminta2': "",
            'diminta3': "",
            'tgl_penahanan_mulai': data.tglTahanMulai,
            'tgl_penahanan_selesai': data.tglTahanSelesai,
            'nama_tempat': data.tempatPenahanan,
            'alamat_tempat': data.alamatPenahanan,
            'kondisi_lingkungan': data.kondisiLingkungan,
            'kondisi_mp': data.kondisiMP,
            'tindakan_segel': data.penyegelan ? data.penyegelan : "0",
            'tindakan_penjaga': data.penjaga ? data.penjaga : "0",
            'tindakan_perawatan': data.perawatan ? data.perawatan : "0",
            'tindakan_lain': data.lainLain ? data.lainLainText : "",
            'dok_dapat_dipenuhi': data.dokSyarat,
            'rekomendasi_id': data.rekomendasi,
            'diterbitkan_di': data.diterbitkan,
            'user_ttd_id': data.ttdPutusan,
            'is_attachment': data.isAttach ? data.isAttach : "0",
            'tembusan1': "",
            'tembusan2': "",
            'tembusan3': "",
            'tembusan4': "",
            'user_id': Cookies.get("userId"), //session
        }
        let config = {
        method: data.idDok63 == '' ? 'post' : 'put',
        maxBodyLength: Infinity,
        url: url + (data.idDok63 == '' ? 'pn-tahan' : 'pn-tahan/' + data.idDok63),
        // url: url + 'pn-adm',
        headers: { 
            'Content-Type': 'application/json', 
        },
        data: datasend
        };
        return axios.request(config)
    }
}