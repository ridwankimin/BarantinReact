/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';
import React from 'react';

function MasterKomKH(props) {
   let [dataKomKH,setDataKomKH] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListKomKH = useCallback(async () => {
    try {
        const response = await master.masterKomKH(props.gol)
        setDataKomKH(response.data.data)
    } catch (error) {
        console.log(error)
        setDataKomKH([])
    }
}, [master, props.gol])

useEffect(() => {
  getListKomKH()
}, [getListKomKH])

  return (
    <>
  {dataKomKH?.map((data) => (
          // [{'value': data.id, 'label': data.nama},]
            <option value={data.id} key={data.id}>{data.nama} - {data.nama_en}</option>
        ))}
    </>
  )
}

export default MasterKomKH