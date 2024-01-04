import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';

function MasterPelabuhan(props) {
   let [dataPelabuhan,setDataPelabuhan] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListPelabuhan = useCallback(async () => {
    try {
        const response = await master.masterPelabuhanID(props.iddata)
        setDataPelabuhan(response.data.data)
    } catch (error) {
        console.log(error)
        setDataPelabuhan([])
    }
}, [master, props.iddata])

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