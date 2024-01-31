
import axios from "axios";
const url = 'http://localhost/api-barantin/';

export default class PtkHistory {
  pushHistory(idPtk, statusP8, dokumen, stat) {
    let datasend = {
        'ptk_id': idPtk,
        'status_p8': statusP8,
        'dokumen': dokumen,
        'user_id': "1", //session
    }
    let config = {
      method: stat,
      maxBodyLength: Infinity,
      url: url + 'ptk-history' + (stat === 'put' ? "/" + idPtk : null),
      // url: url + 'pn-adm',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    // console.log("dok k53: " + JSON.stringify(config))
    return axios.request(config)
  }
}