
import axios from "axios";
const url = 'http://localhost/api-barantin/';

export default class PtkHistory {
  pushHistory(idPtk, statusP8, dokumen, stat) {
    let datasend = {
        'ptk_id': idPtk,
        'status_p8': statusP8,
        'dokumen': dokumen,
        'status': stat,
        'user_id': "1", //session
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
    console.log("history: " + JSON.stringify(config))
    return axios.request(config)
  }
  
  updateKomoditiP1(id,data) {
    let datasend = {
      'id': "",
      'tindakan': "p1",
      'jantanP1': data.jantan,
      'betinaP1': data.betina,
      'volumeP1': data.volume,
      'nettoP1': data.netto 
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
    console.log("history: " + JSON.stringify(config))
    return axios.request(config)
  }
  
  updateKomoditiP2(id, data) {
    let datasend = {
      'id': "",
      'tindakan': "p2",
      'jantanP2': data.jantan,
      'betinaP2': data.betina,
      'volumeP2': data.volume,
      'nettoP2': data.netto
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
    console.log("history: " + JSON.stringify(config))
    return axios.request(config)
  }
  
  updateKomoditi3(id,data) {
    let datasend = {
      'id': "",
      'tindakan': "p3",
      'jantanP3': data.jantan,
      'betinaP3': data.betina,
      'volumeP3': data.volume,
      'nettoP3': data.netto
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
    console.log("history: " + JSON.stringify(config))
    return axios.request(config)
  }
  
  updateKomoditi4(id,data) {
    let datasend = {
      'id': "",
      'tindakan': "p4",
      'jantanP4': data.jantan,
      'betinaP4': data.betina,
      'volumeP4': data.volume,
      'nettoP4': data.netto
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
    console.log("history: " + JSON.stringify(config))
    return axios.request(config)
  }
  
  updateKomoditi5(id, data) {
    let datasend = {
      'id': "",
      'tindakan': "p5",
      'jantanP5': data.jantan,
      'betinaP5': data.betina,
      'volumeP5': data.volume,
      'nettoP5': data.netto
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
    console.log("history: " + JSON.stringify(config))
    return axios.request(config)
  }
  
  updateKomoditi6(id, data) {
    let datasend = {
      'id': "",
      'tindakan': "p6",
      'jantanP6': data.jantan,
      'betinaP6': data.betina,
      'volumeP6': data.volume,
      'nettoP6': data.netto
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
    console.log("history: " + JSON.stringify(config))
    return axios.request(config)
  }
  
  updateKomoditi7(id,data) {
    let datasend = {
      'id': "",
      'tindakan': "p7",
      'jantanP7': data.jantan,
      'betinaP7': data.betina,
      'volumeP7': data.volume,
      'nettoP7': data.netto
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
    console.log("history: " + JSON.stringify(config))
    return axios.request(config)
  }
  
  updateKomoditi8(id,data) {
    let datasend = {
      'id': "",
      'tindakan': "p8",
      'jantanP8': data.jantan,
      'betinaP8': data.betina,
      'volumeP8': data.volume,
      'nettoP8': data.netto
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
    console.log("history: " + JSON.stringify(config))
    return axios.request(config)
  }
}