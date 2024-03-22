/* eslint-disable eqeqeq */
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
// const url = process.env.REACT_APP_BE_LINK;
const url = import.meta.env.VITE_REACT_APP_BE_LINK;

export default class PtkSerahTerima {
    getBSTByPtkId(id) {
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: url + 'serah-terima/' + id,
          headers: { 
            'Content-Type': 'application/json', 
          },
        };
        
        return axios.request(config)
    }

    simpanEdit(data) {
        const uuid = uuidv4()
        let datasend = {
            id: data.idDokBst == '' ? uuid : data.idDokBst,
            ptk_id: data.idPtk,
            nomor: data.noDok.replace("K.1.1", "K.1.5"),
            tanggal: "",
            nama_pihak1: "",
            instansi_pihak1: "",
            upt_asal_id: "",
            user_asal_id: "",
            upt_tujuan_id: "",
            user_tujuan_id: "",
            jenis_mp_id: "",
            jumlah: "",
            satuan_id: "",
            kemasan_id: "",
            info_tambahan: "",
            user_id: ""
        }
        let config = {
            method: data.idDokBst === '' ? 'post' : 'put',
            maxBodyLength: Infinity,
            url: url + (data.idDokBst === '' ? 'serah-terima' : 'serah-terima/' + data.idDokBst),
            headers: { 
                'Content-Type': 'application/json', 
            },
            data: datasend
        };
        
        return axios.request(config)
    }
}