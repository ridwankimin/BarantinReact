
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
// const url = process.env.REACT_APP_BE_LINK;
const url = import.meta.env.VITE_BE_LINK;

export default class PtkHistory {
  pushHistory(idPtk, statusP8, dokumen, stat) {
    let datasend = {
        'ptk_id': idPtk,
        'status_p8': statusP8,
        'dokumen': dokumen,
        'status': stat,
        'user_id': Cookies.get("userId"), //session
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url + 'ptk-history/',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    
    return axios.request(config)
  }
  
  updateKomoditiP1(id,data) {
    let datasend = {
      'id': id,
      'tindakan': "p1",
      'jantanP1': data.jantanP1,
      'betinaP1': data.betinaP1,
      'volumeP1': data.volumeP1,
      'nettoP1': data.nettoP1
    }
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: url + 'ptk-kmdt/' + id,
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    
    return axios.request(config)
  }
  
  updateKomoditiP2(id, data) {
    let datasend = {
      'id': id,
      'tindakan': "p2",
      'jantanP2': data.jantanP2,
      'betinaP2': data.betinaP2,
      'volumeP2': data.volumeP2,
      'nettoP2': data.nettoP2
    }
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: url + 'ptk-kmdt/' + id,
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    
    return axios.request(config)
  }
  
  updateKomoditiP3(id,data) {
    let datasend = {
      'id': id,
      'tindakan': "p3",
      'jantanP3': data.jantanP3,
      'betinaP3': data.betinaP3,
      'volumeP3': data.volumeP3,
      'nettoP3': data.nettoP3
    }
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: url + 'ptk-kmdt/' + id,
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    
    return axios.request(config)
  }
  
  updateKomoditiP4(id,data) {
    let datasend = {
      'id': id,
      'tindakan': "p4",
      'jantanP4': data.jantanP4,
      'betinaP4': data.betinaP4,
      'volumeP4': data.volumeP4,
      'nettoP4': data.nettoP4
    }
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: url + 'ptk-kmdt/' + id,
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    
    return axios.request(config)
  }
  
  updateKomoditiP5(id, data) {
    let datasend = {
      'id': id,
      'tindakan': "p5",
      'jantanP5': data.jantanP5,
      'betinaP5': data.betinaP5,
      'volumeP5': data.volumeP5,
      'nettoP5': data.nettoP5
    }
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: url + 'ptk-kmdt/' + id,
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    return axios.request(config)
  }
  
  updateKomoditiP6(id, data) {
    let datasend = {
      'id': id,
      'tindakan': "p6",
      'jantanP6': data.jantanP6,
      'betinaP6': data.betinaP6,
      'volumeP6': data.volumeP6,
      'nettoP6': data.nettoP6
    }
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: url + 'ptk-kmdt/' + id,
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    
    return axios.request(config)
  }
  
  updateKomoditiP7(id,data) {
    let datasend = {
      'id': id,
      'tindakan': "p7",
      'jantanP7': data.jantanP7,
      'betinaP7': data.betinaP7,
      'volumeP7': data.volumeP7,
      'nettoP7': data.nettoP7
    }
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: url + 'ptk-kmdt/' + id,
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    
    return axios.request(config)
  }
  
  updateKomoditiP8(id,data) {
    let datasend = {
      'id': id,
      'tindakan': "p8",
      'nama_umum_tercetak': data.namaUmum,
      'nama_latin_tercetak': data.namaLatin,
      // 'bentuk_tercetak':
      'jantanP8': data.jantanP8 ? data.jantanP8 : "",
      'betinaP8': data.betinaP8 ? data.betinaP8 : "",
      'volumeP8': data.volumeP8,
      'nettoP8': data.nettoP8
    }
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: url + 'ptk-kmdt/' + id,
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    
    return axios.request(config)
  }
  
  rekomHistory(idPtk, idDok, rekom) {
    const uuid = uuidv4();
    let datasend = {
      id: uuid,
      ptk_id: idPtk,
      pn_id: idDok,
      rekomendasi_id: rekom,
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url + 'rek-history',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    
    return axios.request(config)
  }
}