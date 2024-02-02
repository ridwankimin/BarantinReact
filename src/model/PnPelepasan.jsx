import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
const url = 'http://localhost/api-barantin/';

export default class PnPerlakuan {
  eksporKT(data) {
    const uuid = uuidv4()
    let datasend = {
        'id': data.idKt1 === '' ? uuid : data.idKt1,
        'ptk_id': data.idPtk,
        'dokumen_karantina_id': 47,
        'nomor': data.noDokumen.replace("K.1.1", "K.T.1"),
        'tanggal': data.tglKt1,
        'nomor_seri': data.noSeri,
        'karantina_tujuan': data.karantinaTujuan,
        'entry_point': data.entryPoint,
        'nama_umum_tercetak': data.namaUmum,
        'nama_ilmiah_tercetak': data.namaIlmiah,
        'bentuk_tercetak': data.bentukTercetak,
        'jumlah_tercetak': data.jmlTercetak,
        'additional_declaration': data.adDeclare,
        'additional_information': data.adInfo,
        'pn_perlakuan_id': data.idPerlakuan,
        // 'pc_no': "", //
        // 'is_pc': "", //
        // 'is_commodity': "",
        // 'is_container': "",
        // 'ori_pc': "",
        'add_inspection': data.addInspect,
        'status_dok': data.statusDok, // 'WITHDRAWN','REPLACEMENT','ISSUED'
        'replaced_dok_id': data.replacedDokId,
        'is_attachment': data.isAttach,
        'diterbitkan_di': data.diterbitkan,
        'user_ttd_id': data.ttdKt1,
        'user_id': "1", //session
    }
    let config = {
      method: data.idKt1 === '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (data.idKt1 === '' ? 'pn-pelepasan-kt' : 'pn-pelepasan-kt/' + data.idKt1),
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