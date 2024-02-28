import axios from "axios";
import Cookies from "js-cookie";
// import { Navigate, json } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
// import {decode as base64_decode, encode as base64_encode} from 'base-64';
const date = new Date();
const url = process.env.REACT_APP_BE_LINK;

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}
function dateNow() {
  let n = date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate()) + ' ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds());
  return n;
}
export default class PtkModel {
  tabPemohonInsert(data) {
    const uuid = uuidv4();
      // if(data.permohonan == )
      let datasend = {
            "id": uuid,
            // "tab": data.tabWizard,
            "no_aju": Cookies.get("kodeSatpel") + data.permohonan + date.getFullYear() + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth())+ (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + (date.getSeconds() <10 ? "0" + date.getSeconds() : date.getSeconds()) + makeid(5),
            // 'tgl_aju' => $data['tgl_aju'],
            "jenis_dokumen": data.jenisForm,

            'jenis_karantina': data.mediaPembawa, // ok
            'jenis_media_pembawa_id': data.jenisMp, // ok
            
            "is_guest": data.pJRutin, //ok           // pemohon rutin/guest: 0,1
            'user_id': Cookies.get("userId"), //pake session
            "pengguna_jasa_id": 456, // pake session
            "calo_id": 0,
            "upt_id": Cookies.get("uptId"), //poake session
            "kode_satpel": Cookies.get("kodeSatpel"), //pake session
            "nama_pemohon": data.namaPemohon, //ok
            "jenis_identitas_pemohon": data.jenisIdentitasPemohon, //ok
            "nomor_identitas_pemohon": data.noIdentitasPemohon, //ok
            "alamat_pemohon": data.alamatPemohon, //ok
            "telepon_pemohon": data.nomorTlp, //ok || bisa null
            "fax_pemohon": data.nomorFax, // ok || bisa null
            "provinsi_pemohon_id": data.provPemohon, //ok
            "kota_kab_pemohon_id": data.kotaPemohon, //ok
            "nama_cp": data.namaCp, // ok
            "alamat_cp": data.alamatCp, // ok
            "telepon_cp": data.teleponCp, // ok
            "nama_ttd": data.namaTtd, // ok
            "jenis_identitas_ttd": data.jenisIdentitasTtd, // ok
            "nomor_identitas_ttd": data.noIdentitasTtd, // ok
            "jabatan_ttd": data.jabatanTtd, // ok
            "alamat_ttd": data.alamatTtd, // ok
            "jenis_permohonan": data.permohonan, // ok
            "nama_pengirim": data.namaPengirim, // ok
            "alamat_pengirim": data.alamatPengirim, // ok
            "telepon_pengirim": data.nomorTlpPengirim, // ok
            "jenis_identitas_pengirim": data.jenisIdentitasPengirim, // ok
            "nomor_identitas_pengirim": data.noIdentitasPengirim, // ok
            "provinsi_pengirim_id": data.provPengirim, // ok || bisa null
            "kota_kab_pengirim_id": data.kotaPengirim, // ok || bisa null
            "negara_pengirim_id": data.negaraPengirim, // ok
            "nama_penerima": data.namaPenerima, // ok
            "alamat_penerima": data.alamatPenerima, // ok
            "telepon_penerima": data.nomorTlpPenerima, // ok
            "jenis_identitas_penerima": data.jenisIdentitasPenerima, // ok
            "nomor_identitas_penerima": data.noIdentitasPenerima, // ok
            "provinsi_penerima_id": data.provPenerima,  // ok || bisa null
            "kota_kab_penerima_id": data.kotaPenerima, // ok || bisa null
            "negara_penerima_id": data.negaraPenerima, // ok
            "status_ptk": '0',
            "is_from_ptk": 1,
            "user_created": Cookies.get("userId"), // pake session
            "created_at": dateNow() // ok
      }
        console.log(JSON.stringify(datasend))
              
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url + 'ptk',
            headers: { 
              'Content-Type': 'application/json', 
            },
            data : datasend
        };
              
      return axios.request(config)
    }
    
      tabPemohonUpdate(data) {
      // if(data.permohonan == )
      // let datasend;
      // if(data.tab === 1) {
       let datasend = {
            "id": data.idPtk, // ok
            "tab": '1', // ok
            "no_aju": data.noAju, // ok
            // 'tgl_aju' => $data['tgl_aju'],
            "jenis_dokumen": data.jenisForm, // ok

            'jenis_karantina': data.mediaPembawa, // ok
            'jenis_media_pembawa_id': data.jenisMp, // ok

            "is_guest": data.pJRutin,            // pemohon rutin/guest: 0,1
            'user_id': Cookies.get("userId"), // ok pake session
            "pengguna_jasa_id": 456, // ok pake session
            "calo_id": 0,
            "upt_id": 1,
            "kode_satpel": Cookies.get("kodeSatpel"), // ok pake session
            "nama_pemohon": data.namaPemohon,
            "jenis_identitas_pemohon": data.jenisIdentitasPemohon,
            "nomor_identitas_pemohon": data.noIdentitasPemohon,
            "alamat_pemohon": data.alamatPemohon,
            "telepon_pemohon": data.nomorTlp,
            "fax_pemohon": data.nomorFax,
            "provinsi_pemohon_id": data.provPemohon,
            "kota_kab_pemohon_id": data.kotaPemohon,
            "nama_cp": data.namaCp,
            "alamat_cp": data.alamatCp,
            "telepon_cp": data.teleponCp,
            "nama_ttd": data.namaTtd,
            "jenis_identitas_ttd": data.jenisIdentitasTtd,
            "nomor_identitas_ttd": data.noIdentitasTtd,
            "jabatan_ttd": data.jabatanTtd,
            "alamat_ttd": data.alamatTtd,
            // "jenis_karantina": 'T', // kirim pas tab komoditas
            "jenis_permohonan": data.permohonan,
            "nama_pengirim": data.namaPengirim,
            "alamat_pengirim": data.alamatPengirim,
            "telepon_pengirim": data.nomorTlpPengirim,
            "jenis_identitas_pengirim": data.jenisIdentitasPengirim,
            "nomor_identitas_pengirim": data.noIdentitasPengirim,
            "provinsi_pengirim_id": data.provPengirim,
            "kota_kab_pengirim_id": data.kotaPengirim,
            "negara_pengirim_id": data.negaraPengirim,
            "nama_penerima": data.namaPenerima,
            "alamat_penerima": data.alamatPenerima,
            "telepon_penerima": data.nomorTlpPenerima,
            "jenis_identitas_penerima": data.jenisIdentitasPenerima,
            "nomor_identitas_penerima": data.noIdentitasPenerima,
            "provinsi_penerima_id": data.provPenerima,
            "kota_kab_penerima_id": data.kotaPenerima,
            "negara_penerima_id": data.negaraPenerima,
            "status_ptk": '0',
            "is_from_ppk": 1,
            "user_created": Cookies.get("userId"), //pake session
            "updated_at": dateNow()
        }
        let config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: url + 'ptk/' + data.idPtk,
          headers: { 
            'Content-Type': 'application/json', 
          },
          data : datasend
        };
        
        return axios.request(config)
      }

      getPtkId(id) {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: url + 'ptk/' + id,
          headers: { 
            'Content-Type': 'application/json', 
          }
        };
        console.log(config)
        return axios.request(config)
      }
      
      getPtkList(input) {
        let datasend = {
            "dFrom": input.dFrom,
            "dTo": input.dTo,
            "search": input.search, // AJU, DRAFT, DOK
            "jenis_permohonan": input.jenisPermohonan, //EX, IM dst
            "jenis_karantina": input.jenisKarantina, // H, I, T
            "jenis_dokumen": input.jenisDokumen, // PTK, NHI, BST
            'upt_id': Cookies.get("uptId"), // PAKE SESSION
            "kode_satpel": Cookies.get("kodeSatpel") // PAKE SESSION
        }

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: url + 'ptk/filter',
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: datasend
        };
        // console.log(config)
        
        return axios.request(config)
        // console.log(JSON.stringify(axios.request(config)))
      }

      tabPelabuhan(data) {
        let datasend = {
          'id': data.idPtk, // ok
          'tab': '2', // ok
          'no_aju': data.noAju, // ok
          'tanggal_rencana_masuk': data.tglBerangkatAkhir,
          'negara_muat_id': data.negaraAsal, // ok
          // 'kota_kab_asal_id': data.daerahAsal, // ok ?
          'negara_bongkar_id': data.negaraTujuan, // ok
          // 'kota_Kab_tujuan_id': data.daerahTujuan, // ok ?
          'negara_transit_id': data.negaraTransit, // API blm ada
          'pelabuhan_muat_id': data.pelMuat, // ok
          'pelabuhan_bongkar_id': data.pelBongkar, // API blm ada
          'pelabuhan_transit_id': data.pelTransit, // ok
          'sandar': data.sandar, // API blm ada
          'moda_alat_angkut_transit_id': data.modaTransit, // ok
          'tipe_alat_angkut_transit_id': data.tipeTransit, // ok
          'nama_alat_angkut_transit': data.namaAlatAngkutTransit, // ok
          'bendera_alat_angkut_transit_id': data.benderaTransit, // ok
          'no_voyage_transit': data.nomorAlatAngkutTransit,
          'call_sign_transit': data.callSignTransit, // ok
          'tanggal_rencana_tiba_transit': data.tglTibaTransit, // ok
          'tanggal_rencana_berangkat_transit': data.tglBerangkatTransit, // ok
          'moda_alat_angkut_terakhir_id': data.modaAkhir, // ok
          'moda_alat_angkut_lainnya': data.modaAkhirLainnya, // ok
          'tipe_alat_angkut_terakhir_id': data.tipeAkhir, //ok
          'nama_alat_angkut_terakhir': data.namaAlatAngkutAkhir, // ok
          'bendera_alat_angkut_terakhir_id': data.benderaAkhir, // ok
          'no_voyage_terakhir': data.nomorAlatAngkutAkhir, // ok
          'call_sign_terakhir': data.callSignAkhir, // ok
          'tanggal_rencana_tiba_terakhir': data.tglTibaAkhir, // ok
          'tanggal_rencana_berangkat_terakhir': data.tglBerangkatAkhir, // ok
          'is_transit': data.transitOpsi, // ok
          'is_kontainer': data.cekKontainer, // ok
          'updated_at': dateNow()
        }
        console.log(JSON.stringify(datasend))
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: url + 'ptk/' + data.idPtk,
        headers: { 
          'Content-Type': 'application/json', 
        },
        data : datasend
      };
  
      return axios.request(config)
    }

    tabKomoditas(data) {
        let datasend = {
          'tab': '3', // ok
          'id': data.idPtk, // ok
          'no_aju': data.noAju, // ok
          // 'jenis_karantina': data.mediaPembawa, // ok
          // 'jenis_media_pembawa_id': data.jenisMp, // ok
          'is_curah' : data.jenisAngkut, // curah/non curah
          'peruntukan_id' : data.peruntukan, // ?
          'peruntukan_lainnya' : data.peruntukanLain, // ?
          'kemasan_id': data.jenisKemasan,
          'merk_kemasan': data.merkKemasan,
          'jumlah_kemasan': data.jumlahKemasan,
          'tanda_khusus': data.tandaKemasan,
          'nilai_barang': data.nilaiBarang,
          'mata_uang': data.satuanNilai,
          'negara_asal_id': data.negaraAsalMP,
          'negara_tujuan_id': data.negaraTujuanMP,
          'kota_kab_asal_id': data.daerahAsalMP, //? 
          'kota_kab_tujuan_id': data.daerahTujuanMP, //? 
          // 'status_ppk': data,
          // 'alasan_penolakan': data,
          // 'status_pnbp': data,
          // 'status_internal': 'Draft',
          // 'is_verifikasi': '0',
          // 'is_final': data,
          // 'is_batal': data,
          // 'is_draft': '1',
          'tingkat_pengolahan': data.tingkatOlah,
          'informasi_tambahan': data.infoTambahan,
          'updated_at': dateNow()
        }
        let config = {
          method: 'put',
        maxBodyLength: Infinity,
        url: url + 'ptk/' + data.idPtk,
        headers: { 
          'Content-Type': 'application/json', 
        },
        data : datasend
      };
      console.log(JSON.stringify(config))
  
      return axios.request(config)
    }
    
    tabTempatPeriksa(data) {
        let datasend = {
          'tab': '4', // ok
          'id': data.idPtk, // ok
          'no_aju': data.noAju, // ok
          'tempat_pemeriksaan': data.tempatPeriksaPtk,
          'instalasi_karantina_id': data.tempatPeriksaPtk === 'IK' ? data.namaTempatPeriksaPtk.split(";")[0] : "",
          'tempat_lain_id': data.tempatPeriksaPtk === 'TL' ? data.namaTempatPeriksaPtk.split(";")[0] : "",
          'nama_tempat_pemeriksaan': data.tempatPeriksaPtk === 'DL' ? data.namaTempatPeriksaPtk : data.namaTempatPeriksaPtk.split(";")[1],
          'alamat_tempat_pemeriksaan': data.alamatTempatPeriksaPtk,
          }
        console.log(JSON.stringify(datasend))
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: url + 'ptk/' + data.idPtk,
        headers: { 
          'Content-Type': 'application/json', 
        },
        data : datasend
      };
  
      return axios.request(config)
    }

    tabKonfirmasi(data) {
        let datasend = {
          'id': data.idPtk, // ok
          'tab': 5,
          'no_aju': data.noAju,
          'status_ptk': 9, // draft:0 ;dikirim:9 ;diterima:1 ; ditolak:2
          // 'is_verifikasi': 0,
          // 'is_draft': 0,
          'tgl_aju': dateNow(),
          'updated_at': dateNow()
        }
        let config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: url + 'ptk/' + data.idPtk,
          headers: { 
            'Content-Type': 'application/json', 
          },
          data : datasend
        };
        
      return axios.request(config)
    }

    detilKontainerPtk(idPtk) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url + 'ptk-kont/ptk/' + idPtk,
        headers: { 
          'Content-Type': 'application/json', 
        }
      };
      
      return axios.request(config)
    }
    
    detilKontainerId(id) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url + 'ptk-kont/' + id,
        headers: { 
          'Content-Type': 'application/json', 
        }
      };
      
      return axios.request(config)
    }
    
    pushDetilKontainer(data) {
      const uuid = uuidv4();
      let datasend = {
        'id': data.idDataKontainer === '' ? uuid : data.idDataKontainer,
        'ptk_id': data.idPtk,
        'nomor': data.noKontainer,
        'ukuran_kontainer_id': data.ukuranKontainer,
        'stuff_kontainer_id': data.stuffKontainer,
        'tipe_kontainer_id': data.tipeKontainer,
        'segel': data.segel,
        // 'created_at': dateNow(),
      };
      // console.log(JSON.stringify(datasend))
      let config = {
        method: data.idDataKontainer === '' ? 'post' : 'put',
        maxBodyLength: Infinity,
        url: url + (data.idDataKontainer === '' ? 'ptk-kont' : 'ptk-kont/' + data.idDataKontainer),
        headers: { 
          'Content-Type': 'application/json', 
        },
        data: datasend
      };
      
      return axios.request(config)
    }
    
    delDetilKontainer(data) {
      const uuid = uuidv4();
      let datasend = {
        'id': uuid,
        'ptk_id': data.idPtk,
        'nomor': data.noKontainer,
        'ukuran_kontainer_id': data.ukuranKontainer,
        'stuff_kontainer_id': data.stuffKontainer,
        'tipe_kontainer_id': data.tipeKontainer,
        'segel': data.segel,
        'created_at': dateNow(),
      };
      console.log(JSON.stringify(datasend))
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: url + 'ptk-kont',
        headers: { 
          'Content-Type': 'application/json', 
        },
        data: datasend
      };
      
      return axios.request(config)
    }
    
    pushKomoditi(data, jenisKar) {
      const uuid = uuidv4();
      let datasend = {
            'id': data.idDetilMP ? data.idDetilMP : uuid,
            'ptk_id': data.idPtk,
            'klasifikasi_id': (jenisKar === "T" ? data.peruntukanMP : (jenisKar === "H" ? data.peruntukanMPKH : (jenisKar === "I" ? data.peruntukanMPKI : ""))),
            'komoditas_id': (jenisKar === "T" ? data.komoditasMP : (jenisKar === "H" ? data.komoditasMPKHid : (jenisKar === "I" ? data.komoditasMPKIid : ""))),
            'nama_umum_tercetak': (jenisKar === "T" ? data.namaUmum : (jenisKar === "H" ? data.namaUmumKH : (jenisKar === "I" ? data.namaUmumKI : ""))),
            'nama_latin_tercetak': (jenisKar === "T" ? data.namaLatin : (jenisKar === "H" ? data.namaLatinKH : (jenisKar === "I" ? data.namaLatinKI : ""))),
            'kode_hs': (jenisKar === "T" ? data.kodeHSMp : (jenisKar === "H" ? data.kodeHSMpKH : (jenisKar === "I" ? data.kodeHSMpKI : ""))),
            'jantan': data.jantan,
            'betina': data.betina,
            'volume_bruto': (jenisKar === "T" ? data.volumeBrutto : (jenisKar === "H" ? data.brutoMP : (jenisKar === "I" ? data.brutoMPKI : ""))),
            'satuan_bruto_id': 1356,
            'volume_netto': (jenisKar === "T" ? data.volumeNetto : (jenisKar === "H" ? data.nettoMP : (jenisKar === "I" ? data.nettoMPKI : ""))),
            'satuan_netto_id': 1356,
            'volume_lain': (jenisKar === "T" ? data.volumeLain : (jenisKar === "H" ? data.jumlahMP : (jenisKar === "I" ? data.jumlahMPKI : ""))),
            'satuan_lain_id': (jenisKar === "T" ? data.satuanLain : (jenisKar === "H" ? data.satJumlahMP : (jenisKar === "I" ? data.satJumlahMPKI : ""))),
            'kemasan_id': data.satuanKemasanDetil,
            'keterangan': data.breedMP,
            'jumlah_kemasan': data.jumlahKemasanDetil,
            'harga': (jenisKar === "T" ? data.nilaiBarangMP : (jenisKar === "H" ? data.nilaiBarangMPKH : (jenisKar === "I" ? data.nilaiBarangMPKI : ""))),
            'mata_uang': (jenisKar === "T" ? data.satuanNilaiMP : (jenisKar === "H" ? data.satuanNilaiMPKH : (jenisKar === "I" ? data.satuanNilaiMPKI : ""))),
            'kurs': "14500", // dari API curs
            'harga_rp': (jenisKar === "T" ? (data.satuanNilaiMP === "IDR" ? data.nilaiBarangMP : (data.nilaiBarangMP *14500)) : (jenisKar === "H" ? (data.satuanNilaiMPKH === "IDR" ? data.nilaiBarangMPKH : (data.nilaiBarangMPKH * 14500)) : (jenisKar === "I" ? (data.satuanNilaiMPKI === "IDR" ? data.nilaiBarangMPKI : (data.nilaiBarangMPKI * 14500)) : ""))), // konversi inputan ke RP (Jika mata_uang <> 'IDR'>)
            'created_at': dateNow(),
            'tindakan': ""
      };
      console.log(JSON.stringify(datasend))
      let config = {
        method: (data.idDetilMP ? 'put' : 'post'),
        maxBodyLength: Infinity,
        url: url + (data.idDetilMP ? 'ptk-kmdt/' + data.idDetilMP : 'ptk-kmdt'),
        headers: { 
          'Content-Type': 'application/json', 
        },
        data: datasend
      };
      
      return axios.request(config)
    }
    
    getKomoditiPtkId(id,kar) {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url + 'ptk-kmdt/ptk/' + id,
        headers: { 
          'Content-Type': 'application/json', 
        },
        data: {
          'kar': kar
        }
      };
      console.log(config)
      
      return axios.request(config)
    }
    
    getDokumenPtkId(id) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url + 'ptk-dok/ptk/' + id,
        headers: { 
          'Content-Type': 'application/json', 
        },
      };
      
      return axios.request(config)
    }
    
    getDokumenId(id) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url + 'ptk-dok/' + id,
        headers: { 
          'Content-Type': 'application/json', 
        },
      };
      
      return axios.request(config)
    }
    
    pushDetilDokumen(data) {
      const uuid = uuidv4();
      let datasend = {
        'id': data.idDataDokumen === '' ? uuid : data.idDataDokumen,
        'ptk_id': data.idPtk,
        // 'ptk_id': "355d8f7c-2d9d-469e-82d5-60d8125847c9",
        'no_aju': data.noAju,
        // 'no_aju': "0100EX1240118134959V4N8M",
        'jenis_dokumen_id': data.jenisDokumen,
        'kategori_dokumen': data.kategoriDokumen,
        'no_dokumen': data.noDokumen,
        'tanggal_dokumen': data.tglDokumen,
        'negara_asal_id': data.negaraAsalDokumen,
        'kota_kab_asal_id': data.kotaAsalDokumen,
        'keterangan': data.ketDokumen,
        'efile': data.fileDokumen,
        'created_at': dateNow(),
      };
      // console.log(JSON.stringify(datasend))
      let config = {
        method: data.idDataDokumen === '' ? 'post' : 'put',
        maxBodyLength: Infinity,
        url: url + (data.idDataDokumen === '' ? 'ptk-dok' : 'ptk-dok/' + data.idDataDokumen),
        headers: { 
          'Content-Type': 'application/json', 
          // 'Content-Type': 'multipart/form-data'
        },
        data: datasend
      };
      
      return axios.request(config)
    }
    
    ptkVerify(data) {
      let datasend = {
        'id': data.idPtk,
        'no_aju': data.noAju,
        'jenis_karantina': data.mediaPembawaVerif,
        'is_verifikasi': 1,
        'status_ptk': data.opsiVerif,       // draft:0 ;dikirim:9 ;diterima:1 ; ditolak:2 
        'status_internal': 'p0', // p0: verifikasi ptk | p1a: periksa admin | p1b: periksa fisik&kesehatan 
        'alasan_penolakan': data.alasanTolak,
        'no_dok_permohonan': data.noDokumen,
        // 'no_dok_permohonan': "2024-T-0100-K.1.1-000003",
        'tgl_dok_permohonan': data.tglTerimaVerif,
        'petugas': data.petugasVerif, // pake session
        'nip': '123',
      };
      // console.log(JSON.stringify(datasend))
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: url + 'ptk-verify/' + data.idPtk,
        headers: { 
          'Content-Type': 'application/json', 
          // 'Content-Type': 'multipart/form-data'
        },
        data: datasend
      };
      console.log(JSON.stringify(config))
      
      return axios.request(config)
    }
}
