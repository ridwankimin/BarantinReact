/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';
import React from 'react';

function MasterPelabuhan(props) {
  let data = "";
  if(props.iddata) {
    data = props.iddata
  } else {
    data = null;
  }

   let [dataPelabuhan,setDataPelabuhan] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListPelabuhan = useCallback(async () => {
    try {
        const response = await master.masterPelabuhanID(data)
        setDataPelabuhan(response.data.data)
    } catch (error) {
        console.log(error)
        setDataPelabuhan([])
    }
}, [master, data])

useEffect(() => {
  getListPelabuhan()
}, [getListPelabuhan])

  return (
    <>
  {dataPelabuhan?.map((data) => (
          // [{'value': data.id, 'label': data.nama},]
            <option value={data.id} key={data.id}>{data.kode} - {data.nama}</option>
        ))}
    </>
  )
}

export default MasterPelabuhan