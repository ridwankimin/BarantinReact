import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';

function MasterProv() {
   let [dataProv,setDataProv] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListProv = useCallback(async () => {
    try {
        const response = await master.masterProv()
        setDataProv(response.data.data)
    } catch (error) {
        console.log(error)
        setDataProv([])
    }
}, [master])

useEffect(() => {
  getListProv()
}, [getListProv])

  return (
    <>
  {dataProv?.map((data) => (
          // [{'value': data.id, 'label': data.nama},]
            <option value={data.id} key={data.id}>{data.nama}</option>
        ))}
    </>
  )
}

export default MasterProv