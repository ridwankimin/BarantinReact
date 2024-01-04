import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';

function MasterSatuan(props) {
   let [dataSatuan,setDataSatuan] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListSatuan = useCallback(async () => {
    try {
        const response = await master.masterSatuan(props.kar)
        setDataSatuan(response.data.data)
    } catch (error) {
        console.log(error)
        setDataSatuan([])
    }
}, [master,props.kar])

useEffect(() => {
  getListSatuan()
}, [getListSatuan])

  return (
    <>
  {dataSatuan?.map((data) => (
          // [{'value': data.id, 'label': data.nama},]
            <option value={data.id} key={data.id}>{data.kode} - {data.nama}</option>
        ))}
    </>
  )
}

export default MasterSatuan