/* eslint-disable eqeqeq */
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
const url = process.env.REACT_APP_BE_LINK;

export default class PnPelepasan {
  imporAreaKI(data) {
    const uuid = uuidv4()
    let datasend = {
        id: data.idDok92i == '' ? uuid : data.idDok92i,
        ptk_id: data.idPtk,
        dokumen_karantina_id: "40",
        nomor: data.noDokumen.replace("K.1.1", "K.9.2I"),
        tanggal: data.tglDok92i,
        nomor_seri: data.noSeri,
        karantina_tujuan: "",
        upt_tujuan_id: "",
        tgl_awal: data.tglPeriksaAwal,
        tgl_akhir: data.tglPeriksaAkhir,
        tipe_usaha: "",
        temperatur_mp: "",
        hasil_periksa: data.hasilPemeriksaan,
        p1: data.hasilPemeriksaanKet1,
        p2: data.hasilPemeriksaanKet2,
        p3: data.hasilPemeriksaanKet3,
        p4: data.hasilPemeriksaanKet4,
        nama_labuji: "",
        alamat_labuji: "",
        attestation_a: "",
        attestation_b: "",
        attestation_c: "",
        attestation_d: "",
        attestation_lain: "",
        attestation_free_from: "",
        attestation_nosign: "",
        add_information: "",
        status_dok: data.jenisDokumen,
        replaced_dok_id: "", // nanti data.idDokReplaced
        is_attachment: data.isAttach,
        diterbitkan_di: data.diterbitkan,
        user_ttd_id: data.ttdPutusan,
        user_id: Cookies.get("userId") //session
    }
    let config = {
      method: data.idDok92i == '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (data.idDok92i == '' ? 'pn-pelepasan-ki' : 'pn-pelepasan-ki/' + data.idDok92i),
      // url: url + 'pn-adm',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    if(process.env.REACT_APP_BE_ENV == "DEV") {
        console.log("dok k921: " + JSON.stringify(config))
    }
    return axios.request(config)
  }

  getPengawasanByPtkId(id) {
    
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: url + 'pn-pengawasan/' + id,
      headers: { 
        'Content-Type': 'application/json', 
      }
    };
    return axios.request(config)
  }

  pnPengawasan(data) {

    const uuid = uuidv4()
    let datasend = {
        id: data.idDok94 == '' ? uuid : data.idDok94,
        ptk_id: data.idPtk,
        nomor: data.noDokumen.replace("K.1.1", "K.9.4"),
        tanggal: data.tglDok94,
        syarat_id: data.syarat,
        rekomendasi_id: data.rekomendasi,
        user_ttd_id: data.ttdUser,
        user_id: Cookies.get("userId") //session
    }
    let config = {
      method: data.idDok94 == '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (data.idDok94 == '' ? 'pn-pengawasan' : 'pn-pengawasan/' + data.idDok94),
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    if(process.env.REACT_APP_BE_ENV == "DEV") {
      console.log("dok k94: " + JSON.stringify(config))
    }
    return axios.request(config)
  }
  
  dokelKI(data) {
    const uuid = uuidv4()
    let datasend = {
        id: data.idDoki2 == '' ? uuid : data.idDoki2,
        ptk_id: data.idPtk,
        dokumen_karantina_id: "47",
        nomor: data.noDokumen.replace("K.1.1", "K.I.2"),
        tanggal: data.tglDoki2,
        nomor_seri: data.noSeri,
        karantina_tujuan: "",
        upt_tujuan_id: data.uptTujuan,
        tgl_awal: "",
        tgl_akhir: "",
        tipe_usaha: "",
        temperatur_mp: "",
        hasil_periksa: data.hasilPemeriksaan,
        p1: data.hasilPemeriksaanKet1,
        p2: data.hasilPemeriksaanKet2,
        p3: data.hasilPemeriksaanKet3,
        p4: data.hasilPemeriksaanKet4,
        nama_labuji: "",
        alamat_labuji: "",
        attestation_a: "",
        attestation_b: "",
        attestation_c: "",
        attestation_d: "",
        attestation_lain: "",
        attestation_free_from: "",
        attestation_nosign: "",
        add_information: "",
        status_dok: data.jenisDokumen,
        replaced_dok_id: "", // nanti data.idDokReplaced
        is_attachment: data.isAttach,
        diterbitkan_di: data.diterbitkan,
        user_ttd_id: data.ttdPutusan,
        user_id: Cookies.get("userId") //session
    }
    let config = {
      method: data.idDoki2 == '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (data.idDoki2 == '' ? 'pn-pelepasan-ki' : 'pn-pelepasan-ki/' + data.idDoki2),
      // url: url + 'pn-adm',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    if(process.env.REACT_APP_BE_ENV == "DEV") {
      console.log("dok ki2: " + JSON.stringify(config))
    }
    return axios.request(config)
  }

  eksporKT(data) {
    const uuid = uuidv4()
    let datasend = {
        'id': data.idDokKT1 == '' ? uuid : data.idDokKT1,
        'ptk_id': data.idPtk,
        'dokumen_karantina_id': "48",
        'nomor': data.noDokumen.replace("K.1.1", "K.T.1"),
        'tanggal': data.tglDokKT1,
        'nomor_seri': data.noSeri,
        'karantina_tujuan': data.karantinaTujuan,
        'entry_point': data.entryPoint,
        'upt_tujuan_id': "",
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
        'user_id': Cookies.get("userId"), //session
    }
    let config = {
      method: data.idDokKT1 == '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (data.idDokKT1 == '' ? 'pn-pelepasan-kt' : 'pn-pelepasan-kt/' + data.idDokKT1),
      // url: url + 'pn-adm',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    if(process.env.REACT_APP_BE_ENV == "DEV") {
      console.log("dok kt1: " + JSON.stringify(config))
    }
    return axios.request(config)
  }
  
  imporAreaKT(data) {
    const uuid = uuidv4()
    let datasend = {
        'id': data.idDok92t == '' ? uuid : data.idDok92t,
        'ptk_id': data.idPtk,
        'dokumen_karantina_id': "41",
        'nomor': data.noDokumen.replace("K.1.1", "K.9.2T"),
        'tanggal': data.tglDok92t,
        'nomor_seri': data.noSeri,
        'karantina_tujuan': (data.karantinaTujuanDepan ? data.karantinaTujuanDepan + " " : "") + data.karantinaTujuan + data.karantinaTujuanBelakang,
        'entry_point': "",
        'upt_tujuan_id': "",
        'nama_umum_tercetak': "",
        'nama_ilmiah_tercetak': "",
        'bentuk_tercetak': "", //description of packages / kemasan
        'jumlah_tercetak': "",
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
        'user_id': Cookies.get("userId"), //session
    }
    let config = {
      method: data.idDok92t == '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (data.idDok92t == '' ? 'pn-pelepasan-kt' : 'pn-pelepasan-kt/' + data.idDok92t),
      // url: url + 'pn-adm',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    if(process.env.REACT_APP_BE_ENV == "DEV") {
      console.log("dok kt1: " + JSON.stringify(config))
    }
    return axios.request(config)
  }
  
  dokelKT(data) {
    const uuid = uuidv4()
    let datasend = {
        'id': data.idDokKT3 == '' ? uuid : data.idDokKT3,
        'ptk_id': data.idPtk,
        'dokumen_karantina_id': "50",
        'nomor': data.noDokumen.replace("K.1.1", "K.T.3"),
        'tanggal': data.tglDokKT3,
        'nomor_seri': data.noSeri,
        'karantina_tujuan': "",
        'entry_point': "",
        'upt_tujuan_id': data.uptTujuan,
        'nama_umum_tercetak': "",
        'nama_ilmiah_tercetak': "",
        'bentuk_tercetak': "", //description of packages / kemasan
        'jumlah_tercetak': "",
        'additional_declaration': data.adDeclare, //data.adDeclare
        'additional_information': "",
        'pn_perlakuan_id': data.idPerlakuan,
        'pc_no': "", //
        'is_pc': "", //
        'is_commodity': "",
        'is_container': "",
        'ori_pc': "",
        'add_inspection': "", //data.addInspect
        'status_dok': data.jenisDokumen, // 'WITHDRAWN','REPLACEMENT','ISSUED'
        'replaced_dok_id': "", //data.replacedDokId ?
        'is_attachment': data.isAttach,
        'diterbitkan_di': data.diterbitkan,
        'user_ttd_id': data.ttdPutusan,
        'user_id': Cookies.get("userId"), //session
    }
    let config = {
      method: data.idDokKT3 == '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (data.idDokKT3 == '' ? 'pn-pelepasan-kt' : 'pn-pelepasan-kt/' + data.idDokKT3),
      // url: url + 'pn-adm',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    if(process.env.REACT_APP_BE_ENV == "DEV") {
      console.log("dok kt3: " + JSON.stringify(config))
    }
    return axios.request(config)
  }

  imporAreaKH(data) {
    const uuid = uuidv4()
    let datasend = {
      'id': data.idDok92h == '' ? uuid : data.idDok92h,
      'ptk_id': data.idPtk,
      'dokumen_karantina_id': "39",
      'nomor': data.noDokumen.replace("K.1.1", "K.9.2H"),
      'tanggal': data.tglDok92h,
      'nomor_seri': data.noSeri,
      'karantina_tujuan': "",
      'upt_tujuan_id': "",
      'm1': data.m1,
      'm2': data.m2,
      'm3': data.m3,
      'm_lain': data.m4 == "1" ? data.m4Lain : null,
      'p_teknis': "",
      'p_lab': "",
      'p_lain': data.adDeclare,
      'status_dok': data.jenisDokumen, // 'WITHDRAWN','REPLACEMENT','ISSUED'
      'replaced_dok_id': "",
      'is_attachment': data.isAttach,
      'diterbitkan_di': data.diterbitkan,
      'user_ttd_id': data.ttdPutusan,
      'user_id': Cookies.get("userId") //session
    }

    let config = {
      method: data.idDok92h == '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (data.idDok92h == '' ? 'pn-pelepasan-kh' : 'pn-pelepasan-kh/' + data.idDok92h),
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    if(process.env.REACT_APP_BE_ENV == "DEV") {
      console.log("dok kt92h: " + JSON.stringify(config))
    }
    return axios.request(config)
  }
  
  eksporDokelHewanHidup(data) {
    const uuid = uuidv4()
    let datasend = {
      'id': data.idDokh1 == '' ? uuid : data.idDokh1,
      'ptk_id': data.idPtk,
      'dokumen_karantina_id': "44",
      'nomor': data.noDokumen.replace("K.1.1", "K.H.1"),
      'tanggal': data.tglDokh1,
      'nomor_seri': data.noSeri,
      'karantina_tujuan': "",
      'upt_tujuan_id': data.uptTujuan ? data.uptTujuan : "",
      'm1': data.m1,
      'm2': data.m2,
      'm3': data.m3,
      'm_lain': data.m4 == "1" ? data.m4Lain : null,
      'p_teknis': data.p1,
      'p_lab': data.p2,
      'p_lain': data.p3,
      'status_dok': data.jenisDokumen, // 'WITHDRAWN','REPLACEMENT','ISSUED'
      'replaced_dok_id': "",
      'is_attachment': data.isAttach,
      'diterbitkan_di': data.diterbitkan,
      'user_ttd_id': data.ttdPutusan,
      'user_id': Cookies.get("userId") //session
    }

    let config = {
      method: data.idDokh1 == '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (data.idDokh1 == '' ? 'pn-pelepasan-kh' : 'pn-pelepasan-kh/' + data.idDokh1),
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };

    if(process.env.REACT_APP_BE_ENV == "DEV") {
      console.log("dok kh1: " + JSON.stringify(config))
    }
    return axios.request(config)
  }
  
  eksporDokelProdukHewan(data) {
    const uuid = uuidv4()
    let datasend = {
      'id': data.idDokh2 == '' ? uuid : data.idDokh2,
      'ptk_id': data.idPtk,
      'dokumen_karantina_id': "45",
      'nomor': data.noDokumen.replace("K.1.1", "K.H.2"),
      'tanggal': data.tglDokh2,
      'nomor_seri': data.noSeri,
      'upt_tujuan_id': data.uptTujuan ? data.uptTujuan : "",
      'm1': data.m1,
      'm2': data.m2,
      'm3': data.m3,
      'm_lain': data.m4 == "1" ? data.m4Lain : null,
      'p_teknis': data.p1,
      'p_lab': data.p2,
      'p_lain': data.p3,
      'status_dok': data.jenisDokumen, // 'WITHDRAWN','REPLACEMENT','ISSUED'
      'replaced_dok_id': "",
      'is_attachment': data.isAttach,
      'diterbitkan_di': data.diterbitkan,
      'user_ttd_id': data.ttdPutusan,
      'user_id': Cookies.get("userId") //session
    }

    let config = {
      method: data.idDokh2 == '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (data.idDokh2 == '' ? 'pn-pelepasan-kh' : 'pn-pelepasan-kh/' + data.idDokh2),
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    if(process.env.REACT_APP_BE_ENV == "DEV") {
      console.log("dok kh2: " + JSON.stringify(config))
    }
    return axios.request(config)
  }

  getById(id, kar) {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: url + 'pn-pelepasan-k' + kar.toLowerCase() + '/' + id,
      headers: { 
        'Content-Type': 'application/json', 
      }
    };
    return axios.request(config)
  }

  mpLainOrKeterangan(data, kar, dok) {
    let idcek
    let iddok
    let tgldok
    if(dok == "K.9.1") {
      idcek = data.idDok91
      iddok = "37"
      tgldok = data.tglDok91
    } else if(dok == "K.9.3") {
      idcek = data.idDok93
      iddok = "42"
      tgldok = data.tglDok93
    }
    console.log(idcek)
    const uuid = uuidv4()
    let datasend = {
        id: idcek == '' ? uuid : idcek,
        ptk_id: data.idPtk,
        dokumen_karantina_id: iddok,
        nomor: data.noDokumen.replace("K.1.1", dok),
        tanggal: tgldok,
        // keterangan_mp: dok == "K.9.1" ? "" : data.keteranganMp,
        nomor_seri: data.noSeri,
        karantina_tujuan: "",
        upt_tujuan_id: data.uptTujuan ? data.uptTujuan : "",
        status_dok: data.jenisDokumen, // 'WITHDRAWN','REPLACEMENT','ISSUED'
        replaced_dok_id: "",
        is_attachment: data.isAttach,
        diterbitkan_di: data.diterbitkan,
        user_ttd_id: data.ttdPutusan,
        user_id: Cookies.get("userId") //session
      }

    // if(kar == "H") {
    //   datasend.push({
    //     m1: "",
    //     m2: "",
    //     m3: "",
    //     m_lain: "",
    //     p_teknis: "",
    //     p_lab: "",
    //     p_lain: "",
    //   })
    // } else if(kar == "I") {
    //   datasend.push({
    //     tgl_awal: "",
    //     tgl_akhir: "",
    //     tipe_usaha: "",
    //     temperatur_mp: "",
    //     hasil_periksa: "",
    //     p1: "",
    //     p2: "",
    //     p3: "",
    //     p4: "",
    //     nama_labuji: "",
    //     alamat_labuji: "",
    //     attestation_a: "",
    //     attestation_b: "",
    //     attestation_c: "",
    //     attestation_d: "",
    //     attestation_lain: "",
    //     attestation_free_from: "",
    //     attestation_nosign: "",
    //     add_information: "",
    //   })
    // } else if(kar == "T") {
    //   datasend.push({
    //     additional_declaration: "", //data.adDeclare
    //     additional_information: "",
    //     pn_perlakuan_id: "",
    //     pc_no: "", //
    //     is_pc: "", //
    //     is_commodity: "",
    //     is_container: "",
    //     ori_pc: "",
    //     add_inspection: "", //data.addInspect
    //   })
    // }
    let config = {
      method: idcek == '' ? 'post' : 'put',
      maxBodyLength: Infinity,
      url: url + (idcek == '' ? 'pn-pelepasan-k' + kar.toLowerCase() : 'pn-pelepasan-k' + kar.toLowerCase() + "/" + idcek),
      headers: { 
        'Content-Type': 'application/json', 
      },
      data: datasend
    };
    if(process.env.REACT_APP_BE_ENV == "DEV") {
      console.log("dok k91: " + JSON.stringify(config))
    }
    return axios.request(config)
  }
}