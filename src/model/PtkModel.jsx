import axios from "axios";
// import { Navigate, json } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
// import {decode as base64_decode, encode as base64_encode} from 'base-64';
const date = new Date();
const url = 'http://localhost/api-barantin/';

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
            "no_aju": '0100' + data.permohonan + date.getYear() + (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth())+ (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + (date.getSeconds() <10 ? "0" + date.getSeconds() : date.getSeconds()) + makeid(5),
            // 'tgl_aju' => $data['tgl_aju'],
            "jenis_dokumen": data.jenisForm,
            "is_guest": data.pJRutin, //ok           // pemohon rutin/guest: 0,1
            "user_id": 123, //pake session
            "pengguna_jasa_id": 456, // pake session
            "calo_id": 0,
            "upt_id": 1, //poake session
            "kode_wilker": '0100', //poake session
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
            "user_created": 123, // pake session
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
            "is_guest": data.pjRutin,            // pemohon rutin/guest: 0,1
            "user_id": 123, // ok pake session
            "pengguna_jasa_id": 456, // ok pake session
            "calo_id": 0,
            "upt_id": 1,
            "kode_wilker": '0100', // ok pake session
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
            "user_created": 123, //pake session
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
        
        return axios.request(config)
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
          'jenis_karantina': data.mediaPembawa, // ok
          'jenis_media_pembawa_id': data.jenisMp, // ok
          // 'jenis_angkut' : data.jenisAngkut // curah/non curah
          // 'peruntukan' : data.peruntukan // ?
          // 'peruntukan_lain' : data.peruntukanLain // ?
          'kemasan_id': data.jenisKemasan,
          'merk_kemasan': data.merkKemasan,
          'jumlah_kemasan': data.jumlahKemasan,
          'tanda_khusus': data.tandaKemasan,
          'nilai_barang': data.nilaiBarang,
          'mata_uang': data.satuanNilai,
          'negara_asal_id': data.negaraAsalMP,
          'negara_tujuan_id': data.negaraTujuanMP,
          'kota_kab_asal_id': data, //? 
          'kota_kab_tujuan_id': data, //? 
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
          'tab': '5',
          'no_aju': data.noAju,
          'status_ptk': 1,
          'status_internal': "pengajuan",
          'is_verifikasi': 0,
          'is_draft': 0,
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
        method: 'post',
        maxBodyLength: Infinity,
        url: url + 'ptk-kont',
        headers: { 
          'Content-Type': 'application/json', 
        },
        data: datasend
      };
      
      return axios.request(config)
    }
    
    putDetilKontainer(data) {
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
        method: 'put',
        maxBodyLength: Infinity,
        url: url + 'ptk-kont',
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
    
    pushKomoditi(data) {
      const uuid = uuidv4();
      let datasend = {
            'id': uuid,
            'ptk_id': data.idPtk,
            'klasifikasi_id': data.peruntukanMP,
            'komoditas_id': data.komoditasMP,
            'nama_umum_tercetak': data.namaUmum,
            'nama_latin_tercetak': data.namaLatin,
            'kode_hs': data.kodeHSMp,
            'jantan': 0,
            'betina': 0,
            'volume_bruto': data.volumeBrutto,
            'satuan_bruto_id': data.satuanBrutto,
            'volume_netto': data.volumeNetto,
            'satuan_netto_id': data.satuanNetto,
            'volume_lain': data.volumeLain,
            'satuan_lain_id': data.satuanLain,
            'kemasan_id': data.satuanKemasanDetil,
            'merk_kemasan': "merk",
            'jumlah_kemasan': data.jumlahKemasanDetil,
            'harga': data.nilaiBarangMP,
            'mata_uang': data.satuanNilaiMP,
            'kurs': "1", // dari API curs
            'harga_rp': "1000000", // konversi inputan ke RP (Jika mata_uang <> 'IDR'>)
            'created_at': dateNow(),
      };
      console.log(JSON.stringify(datasend))
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url + 'ptk-kmdt',
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
    
    pushDetilDokumen(data) {
      // const formData = new FormData();
      // formData.append("fileDokumen", data.fileDokumen)
      // console.log(formData)
      // let [dataFile, setDataFile] = useState();
      // let fileReader = new FileReader();
      // let dataFile = "";
      // fileReader.readAsDataURL(data.fileDokumen);
 
      // fileReader.onload = (event) => {
      //   console.log(event.target.result);
      // }
      // console.log(fileReader)
      // console.log(data.fileDokumen);
      const uuid = uuidv4();
      let datasend = {
        'id': uuid,
        // 'ptk_id': data.idPtk,
        'ptk_id': data.idPtk,
        'no_aju': data.noAju,
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
      console.log(JSON.stringify(datasend))
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url + 'ptk-dok',
        headers: { 
          'Content-Type': 'application/json', 
          // 'Content-Type': 'multipart/form-data'
        },
        data: datasend
      };
      
      return axios.request(config)
    }
}
