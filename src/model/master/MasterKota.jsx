import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';

function MasterKota(props) {
  let data = "";
  if(props.iddata) {
    data = props.iddata
  } else {
    data = null;
  }
   let [dataKota,setDataKota] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListKota = useCallback(async () => {
    try {
        const response = await master.masterKota(data)
        setDataKota(response.data.data)
    } catch (error) {
        console.log(error)
        setDataKota([])
    }
}, [master, data])

useEffect(() => {
  getListKota()
}, [getListKota])

  return (
    <>
  {dataKota?.map((data) => (
          // [{'value': data.id, 'label': data.nama},]
            <option value={data.id} key={data.id}>{data.nama}</option>
        ))}
    </>
  )
}

export default MasterKota