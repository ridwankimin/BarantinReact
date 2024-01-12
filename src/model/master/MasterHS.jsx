import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';

function MasterHS(props) {
   let [dataHS,setDataHS] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListHS = useCallback(async () => {
    try {
        const response = await master.masterHS(props.kar)
        setDataHS(response.data.data)
    } catch (error) {
        console.log(error)
        setDataHS([])
    }
}, [master,props.kar])

useEffect(() => {
  getListHS()
}, [getListHS])

  return (
    <>
  {dataHS?.map((data) => (
          // [{'value': data.id, 'label': data.nama},]
            <option value={data.kode} key={data.id}>{data.kode} - {data.nama_en}</option>
        ))}
    </>
  )
}

export default MasterHS