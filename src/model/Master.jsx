import axios from "axios";

// const url = process.env.REACT_APP_BE_LINK;
const url = import.meta.env.VITE_REACT_APP_BE_LINK;
// const contentType = 'application/json';
// const qs = require('qs');
// const tokenAuth = process.env.REACT_APP_API_KEY

export default class Master {

    masterNegara() {
        return axios.get(url + 'negara', {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }
    
    masterProv() {
        return axios.get(url + 'provinsi', {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }

    masterKota(data) {
        if(data) {
            return axios.get(url + 'kota/prov/' + data, {
                headers: {
                //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
                }
            })
        } else {
            return axios.get(url + 'kota', {
                headers: {
                //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
                }
            })
        }
    }
    
    masterPelabuhanID(idData) {
        return axios.get(url + 'port/ctry/' + idData, {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }
    
    masterKemasan() {
        return axios.get(url + 'kemasan', {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }
    
    masterMataUang() {
        return axios.get(url + 'matauang', {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }
    
    masterKlasKT(gol) {
        return axios.get(url + 'klaskt/gol/' + gol, {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }
    
    masterKomKT() {
        return axios.get(url + 'komkt', {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }
    
    masterKlasKH(idData) {
        return axios.get(url + 'klaskh/gol/' + idData, {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }

    masterKomKH(idData) {
        return axios.get(url + 'komkh/gol/' + idData, {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }
    
    masterKlasKI(idData) {
        return axios.get(url + 'klaski/gol/' + idData, {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }

    masterKomKI() {
        return axios.get(url + 'komki', {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }
    
    masterSatuan(kar) {
        return axios.get(url + 'satuan/kar/' + kar, {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }
    
    masterHS(kar) {
        return axios.get(url + 'hs/kar/' + kar, {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }
    
    masterDok(kar) {
        return axios.get(url + 'dokumen/kar/' + kar, {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }
    
    masterOPTK() {
        return axios.get(url + 'optk', {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }

    masterHPHK() {
        return axios.get(url + 'hphk', {
            headers: {
            //   'Cookie': 'PHPSESSID=jgepu06btvgculap0gl0tao0fp',
            }
        })
    }
}