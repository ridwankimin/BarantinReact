import axios from 'axios';
import { useEffect, useState } from 'react';

function Master() {
    let [dataNegara,setDataNegara] = useState([]);
const qs = require('qs');
let data = qs.stringify({
  'key': 'hayoloh' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://ws.karantina.pertanian.go.id/api/master/index.php?a=getNeg',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  setDataNegara(response.data)
})
.catch((error) => {
  console.log(error);
});

   
    // return getNegara;
    // const getNegara = async ()=> {
    //     const response = await fetch(url);
    //     const dataNegara = await response.json();
    //     return dataNegara;
    // }

    // console.log(getNegara);
    // return useEffect(() => {
    //     axios
    //     .get('http://ws.karantina.pertanian.go.id/api/master/index.php?a=getNeg')
    //     .then(response=>{
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // });
//     let [dataNegara,setDataNegara] = useState([])
//     const qs = require('qs');
//     let data = qs.stringify({
//                     'key': 'hayoloh' 
//                 });

//     let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://ws.karantina.pertanian.go.id/api/master/index.php?a=getNeg',
//             headers: { 
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Credentials': 'true',
//             },
//             data : data
//         };

//     axios.request(config)
//     .then((response) => {
//         // console.log(JSON.stringify(response.data));
//         setDataNegara(response.data)
//     })
//     .catch((error) => {
//         // console.log(error);
//     });
  return (
    <>
        {dataNegara.map((data) => (
            <option value={data.id}>{data.kode} - {data.nama}</option>
        ))}
    </>
  )
}

export default Master