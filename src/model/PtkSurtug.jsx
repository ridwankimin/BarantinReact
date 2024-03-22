/* eslint-disable eqeqeq */
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
// import {decode as base64_decode, encode as base64_encode} from 'base-64';
const date = new Date();
// const url = process.env.REACT_APP_BE_LINK;
const url = import.meta.env.VITE_REACT_APP_BE_LINK;

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}
function dateNow() {
  let n = date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate()) + ' ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds());
  return n;
}
export default class PtkSurtug {
    simpanHeader(data) {
        const uuid = uuidv4();
       let datasend = {
            'id': data.idHeader === '' ? uuid : data.idHeader,
            'ptk_id': data.idPtk,
            'no_dok_permohonan': data.noDok,
            'ptk_analisis_id': data.idAnalis, //soon
            'nomor': data.noSurtug, //balikan
            'tanggal': data.tglSurtug,
            'perihal': data.perihalSurtug,
            'penanda_tangan_id': data.ttdSurtug,
            'user_id': Cookies.get("userId"), //session
            'created_at': dateNow()
        }       
      let config = {
          method: data.idHeader === '' ? 'post' : 'put',
          maxBodyLength: Infinity,
          url: url + (data.idHeader === '' ? 'surtug' : 'surtug/' + data.idHeader),
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        
        return axios.request(config)
    }

    simpanDetil(data) {
        const uuid = uuidv4();
        const arrayPenugasan = data.opsiTK.map(item => {
          return {
              id: uuidv4(),
              penugasan_id: item,
              penugasan_lainnya: (item === '17' | item === '22' ? (data.opsiTKLainnya === '' ? data.opsiHKLainnya : data.opsiTKLainnya) : ""),
          }
        })
        let datasend = {
            'id': uuid,
            'ptk_id': data.idPtk,
            'ptk_surtug_header_id': data.idHeader,
            'petugas_id': data.pilihPetugas,
            'user_id': Cookies.get("userId"), //session
            'penugasan': arrayPenugasan,
            'created_at': dateNow(),
        }

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: url + 'surtug/detil',
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        
        
        return axios.request(config)
    }
    
    ptkAnalisis(data) {
        const uuid = uuidv4();
        let arrayAnalisa
        if(data.opsiKH) {
          arrayAnalisa = data.opsiKH?.map(item => {
            return {
                id: uuidv4(),
                hasil_analisis_id: item,
                lainnya: (item === '11' ? data.opsiKHLainnya : ""),
            }
          })
          arrayAnalisa.push({
            id: uuidv4(),
            hasil_analisis_id: data.opsiOlahH,
            lainnya: ""
          })
          // arrayAnalisa = [...arrayAnalisa, ...olahKH1]
        }
        if(data.opsiKI) {
          arrayAnalisa = data.opsiKI?.map(item => {
            return {
                id: uuidv4(),
                hasil_analisis_id: item,
                lainnya: (item === '22' ? data.opsiKILainnya : ""),
            }
          })
          const olahKI1 = {
            id: uuidv4(),
            hasil_analisis_id: data.opsiOlahI,
            lainnya: ""
          }
          arrayAnalisa = [...arrayAnalisa, olahKI1]
        }
        if(data.opsiKT) {
          arrayAnalisa = data.opsiKT?.map(item => {
            return {
                id: uuidv4(),
                hasil_analisis_id: item,
                lainnya: (item === '36' ? data.opsiKTLainnya : ""),
            }
          })
          const olahKT1 = {
            id: uuidv4(),
            hasil_analisis_id: data.opsiOlahT,
            lainnya: ""
          }
          arrayAnalisa = [...arrayAnalisa, olahKT1]
          const olahKT2 = {
            id: uuidv4(),
            hasil_analisis_id: data.opsiDilarangOPTK,
            lainnya: ""
          }
          arrayAnalisa = [...arrayAnalisa, olahKT2]
        }
        if(data.opsiNHI) {
          arrayAnalisa =  {
                id: uuidv4(),
                hasil_analisis_id: data.opsiNHI,
                lainnya: (data.opsiNHI === '43' ? data.opsiNHILainnya : ""),
            }
        }
        let datasend = {
            'id': data.idDok21 == '' ? uuid : data.idDok21,
            'ptk_id': data.idPtk,
            'nomor': data.noDokumen.replace("K.1.1", "K.2.1"),
            'tanggal': data.tglDok21,
            'rekomendasi_id': data.rekomAnalis,
            // 'level_risiko': data.tingkatRisiko,
            // 'is_psat': data.golonganMp,
            'catatan': data.catatan,
            'user_ttd_id': data.ttdAnalis,
            'user_id': Cookies.get("userId"), //session
            'analisa_detil': arrayAnalisa
        }

        let config = {
          method: (data.idDok21 == '' ? 'post' : 'put'),
          maxBodyLength: Infinity,
          url: url + (data.idDok21 == '' ? 'ptk-analis' : 'ptk-analis/' + data.idDok21),
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        return axios.request(config)
    }

    getAnalisByPtk(id) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url + 'ptk-analis/' + id,
        headers: { 
          'Content-Type': 'application/json', 
        },
      };
      // 
      return axios.request(config)
    }

    getDetilByHeader(id) {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url + 'surtug/detil/ptk',
        headers: { 
          'Content-Type': 'application/json', 
        },
        data: {
          ptk_surtug_header_id: id,
          ptk_surtug_petugas_id: "",
          penugasan_id: ""
        }
      };
      
      return axios.request(config)
    }
    
    getSurtugByPtk(id, penugasan) {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url + 'surtug/penugasan/' + id,
        headers: { 
          'Content-Type': 'application/json', 
        },
        data: {
          penugasan_id: penugasan
        }
      };
      
      return axios.request(config)
    }
    
    getDetilSurtugPenugasan(idPtk, idPenugasan) {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url + 'surtug/ptk',
        headers: { 
          'Content-Type': 'application/json', 
        },
        data: {
          ptk_id: idPtk,
          penugasan_id: idPenugasan
        }
      };
      
      
      return axios.request(config)
    }
}