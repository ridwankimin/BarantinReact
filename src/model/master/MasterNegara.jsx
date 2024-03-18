import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';
import React from 'react';

function MasterNegara() {
   let [dataNegara,setDataNegara] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListNegara = useCallback(async () => {
    try {
        const response = await master.masterNegara()
        setDataNegara(response.data.data)
    } catch (error) {
        console.log(error)
        setDataNegara([])
    }
}, [master])

useEffect(() => {
  getListNegara()
}, [getListNegara])

// dataNegara?.map(item => {
//   return {
//       label: item.nama,
//       value: item.id     
//   }
// })
  // dataNegara.map((data) => ({
  //      label: data.kode + " - " + data.nama,
  //      value: data.id
  //  })))
  //    const finalNegara = dataNegara?.map((data) => ({
  //      label: data.kode + " - " + data.nama,
  //      value: data.id
  //  }))
  //  setDataNegara([selectNegara, {
  //           label: data.nama,
  //           value: data.id
  //         }])
  //     ));
      // console.log(finalNegara)
  // return {finalNegara}
  // return (Object.values(finalNegara));
  

        

  return (
    <>
  {dataNegara?.map((data) => (
    data.id != '99' &&
    // [{'value': data.id, 'label': data.nama},]
      <option value={data.id} key={data.id}>{data.kode} - {data.nama}</option>
  ))}
    </>
  )
}

export default MasterNegara