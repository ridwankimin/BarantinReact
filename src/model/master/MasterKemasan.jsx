import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';

function MasterKemasan() {
   let [dataKemasan,setDataKemasan] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListKemasan = useCallback(async () => {
    try {
        const response = await master.masterKemasan()
        setDataKemasan(response.data.data)
    } catch (error) {
        console.log(error)
        setDataKemasan([])
    }
}, [master])

useEffect(() => {
  getListKemasan()
}, [getListKemasan])

  return (
    <>
  {dataKemasan?.map((data) => (
          // [{'value': data.id, 'label': data.nama},]
            <option value={data.id} key={data.id}>{data.kode} - {data.deskripsi}</option>
        ))}
    </>
  )
}

export default MasterKemasan