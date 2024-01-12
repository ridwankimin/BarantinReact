import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';

function MasterDokumen(props) {
   let [dataDokumen,setDataDokumen] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListDokumen = useCallback(async () => {
    try {
        const response = await master.masterDok(props.kar)
        setDataDokumen(response.data.data)
    } catch (error) {
        console.log(error)
        setDataDokumen([])
    }
}, [master,props.kar])

useEffect(() => {
  getListDokumen()
}, [getListDokumen])

  return (
    <>
  {dataDokumen?.map((data) => (
          // [{'value': data.id, 'label': data.nama},]
            <option value={data.id} key={data.id}>{data.kode} - {data.nama}</option>
        ))}
    </>
  )
}

export default MasterDokumen