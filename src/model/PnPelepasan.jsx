import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
const url = 'http://localhost/api-barantin/';

export default class PnPerlakuan {
  eksporKT(data) {
    const uuid = uuidv4()
    let datasend = {
        'id': data.idDokKT1 === '' ? uuid : data.idDokKT1,
        'ptk_id': data.idPtk,
        'dokumen_karantina_id': "47",
        'nomor': data.noDokumen.replace("K.1.1", "K.T.1"),
        'tanggal': data.tglDokKT1,
        'nomor_seri': data.noSeri,
        'karantina_tujuan': (data.karantinaTujuanDepan ? data.karantinaTujuanDepan + " " : "") + data.karantinaTujuan + (data.karantinaTujuanBelakang ? " " + data.karantinaTujuanBelakang : ""),
        'entry_point': data.entryPoint,
        'nama_umum_tercetak': data.namaUmum,
        'nama_ilmiah_tercetak': data.namaIlmiah,
        'bentuk_tercetak': data.bentukTercetak, //description of packages / kemasan
        'jumlah_tercetak': data.jmlTercetak,
        'additional_declaration': data.adDeclare,
        'additional_information': data.adInfo,
        'pn_perlakuan_id': data.idPerlakuan,
        //Distinguishing marks ?
        'pc_no': "", // re-ekspor
        'is_pc': "", // re-ekspor
        'is_commodity': "", // re-ekspor
        'is_container': "", // re-ekspor
        'ori_pc': "", // re-ekspor
        'add_inspection': data.addInspect,
        'status_dok': data.jenisDokumen, // 'WITHDRAWN','REPLACEMENT','ISSUED'
        'replaced_dok_id': data.replacedDokId,
        'is_attachment': data.isAttach,
        'diterbitkan_di': data.diterbitkan,
        'user_ttd_id': data.ttdPutusan,
        'user_id': "1", //session
    }
    let config = {
      method: data.idDokKT1 === '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (data.idDokKT1 === '' ? 'pn-pelepasan-kt' : 'pn-pelepasan-kt/' + data.idDokKT1),
      // url: url + 'pn-adm',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    // console.log("dok kt1: " + JSON.stringify(config))
    return axios.request(config)
  }
  
  imporAreaKT(data) {
    const uuid = uuidv4()
    let datasend = {
        'id': data.idDok92t === '' ? uuid : data.idDok92t,
        'ptk_id': data.idPtk,
        'dokumen_karantina_id': "40",
        'nomor': data.noDokumen.replace("K.1.1", "K.9.2t"),
        'tanggal': data.tglDok92t,
        'nomor_seri': data.noSeri,
        'karantina_tujuan': (data.karantinaTujuanDepan ? data.karantinaTujuanDepan + " " : "") + data.karantinaTujuan + data.karantinaTujuanBelakang,
        'entry_point': "",
        'nama_umum_tercetak': data.namaUmum,
        'nama_ilmiah_tercetak': data.namaIlmiah,
        'bentuk_tercetak': data.bentukTercetak, //description of packages / kemasan
        'jumlah_tercetak': data.jmlTercetak,
        'additional_declaration': "", //data.adDeclare
        'additional_information': data.keteranganTambahan,
        'pn_perlakuan_id': data.idPerlakuan,
        //Distinguishing marks ?
        'pc_no': "", //
        'is_pc': "", //
        'is_commodity': "",
        'is_container': "",
        'ori_pc': "",
        'add_inspection': "", //data.addInspect
        'status_dok': data.jenisDokumen, // 'WITHDRAWN','REPLACEMENT','ISSUED'
        'replaced_dok_id': data.replacedDokId,
        'is_attachment': data.isAttach,
        'diterbitkan_di': data.diterbitkan,
        'user_ttd_id': data.ttdPutusan,
        'user_id': "1", //session
    }
    let config = {
      method: data.idDok92t === '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (data.idDok92t === '' ? 'pn-pelepasan-kt' : 'pn-pelepasan-kt/' + data.idDok92t),
      // url: url + 'pn-adm',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    // console.log("dok kt1: " + JSON.stringify(config))
    return axios.request(config)
  }
}