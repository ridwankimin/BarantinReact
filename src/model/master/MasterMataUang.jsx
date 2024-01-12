import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';

function MasterMataUang() {
   let [dataMataUang,setDataMataUang] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListMataUang = useCallback(async () => {
    try {
        const response = await master.masterMataUang()
        setDataMataUang(response.data.data)
    } catch (error) {
        console.log(error)
        setDataMataUang([])
    }
}, [master])

useEffect(() => {
  getListMataUang()
}, [getListMataUang])

  return (
    <>
  {dataMataUang?.map((data) => (
          // [{'value': data.id, 'label': data.nama},]
            <option value={data.kode} key={data.id}>{data.kode} - {data.mata_uang}</option>
        ))}
    </>
  )
}

export default MasterMataUang