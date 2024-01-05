import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
const date = new Date();
const url = 'http://localhost/api-barantin/';

export default class PtkModel {
    tabPemohon(data) {
        let datasend = {
            "id": uuidv4(),
            "no_aju": '0100' + data.permohonan + date.getTime() + date.getYear() + date.getMonth() + date.getDay() + data.makeid,
            // 'tgl_aju' => $data['tgl_aju'],
            "jenis_dokumen": 'PTK',
            "is_guest": 0,            // pemohon rutin/guest: 0,1
            "user_id": 123,
            "pengguna_jasa_id": 456,
            "calo_id": null,
            "upt_id": 1,
            "kode_wilker": '0100',
            "nama_pemohon": data.namaPemohon,
            "jenis_identitas_pemohon_id": data.jenisIdentitasPemohon,
            "nomor_identitas_pemohon": data.noIdentitasPemohon,
            "alamat_pemohon": data.alamatPemohon,
            "telepon_pemohon": data.nomorTlp,
            "fax_pemohon": null,
            "provinsi_pemohon_id": data.provPemohon,
            "kota_kab_pemohon_id": data.kotaPemohon,
            "nama_cp": data.namaCp,
            "alamat_cp": data.alamatCp,
            "telepon_cp": data.teleponCp,
            "nama_ttd": data.namaTtd,
            "jenis_identitas_ttd_id": data.jenisIdentitasTtd,
            "nomor_identitas_ttd": data.noIdentitasTtd,
            "jabatan_ttd": data.jabatanTtd,
            "alamat_ttd": data.alamatTtd,
            "jenis_karantina": 'T',
            "jenis_permohonan": data.permohonan,
            "nama_pengirim": data.namaPengirim,
            "alamat_pengirim": data.alamatPengirim,
            "telepon_pengirim": data.nomorTlpPengirim,
            "jenis_identitas_pengirim_id": data.jenisIdentitasPengirim,
            "nomor_identitas_pengirim": data.noIdentitasPengirim,
            "provinsi_pengirim_id": data.provPengirim,
            "kota_kab_pengirim_id": data.kotaPengirim,
            "negara_pengirim_id": data.negaraPengirim,
            "nama_penerima": data.namaPenerima,
            "alamat_penerima": data.alamatPenerima,
            "telepon_penerima": data.nomorTlpPenerima,
            "jenis_identitas_penerima_id": data.jenisIdentitasPenerima,
            "nomor_identitas_penerima": data.noIdentitasPenerima,
            "provinsi_penerima_id": data.provPenerima,
            "kota_kab_penerima_id": data.kotaPenerima,
            "negara_penerima_id": data.negaraPenerima,
            "status_ppk": 'DRAFT',
            "is_from_ppk": 1,
            "user_created": 123,
            "created_at": data.datenow
        }
              
              let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: url + 'ptk',
                headers: { 
                  'Content-Type': 'application/json', 
                },
                data : datasend
              };
              
             axios.request(config)
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
        }
    }
