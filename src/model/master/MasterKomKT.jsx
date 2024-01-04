import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';

function MasterKomKT() {
   let [dataKomKT,setDataKomKT] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListKomKT = useCallback(async () => {
    try {
        const response = await master.masterKomKT()
        setDataKomKT(response.data.data)
    } catch (error) {
        console.log(error)
        setDataKomKT([])
    }
}, [master])

useEffect(() => {
  getListKomKT()
}, [getListKomKT])

  return (
    <>
  {dataKomKT?.map((data) => (
          // [{'value': data.id, 'label': data.nama},]
            <option value={data.id + ";" + data.kode_komoditas + ";" + data.nama + ";" + data.nama_latin} key={data.id}>{data.nama} - {data.nama_en}</option>
        ))}
    </>
  )
}

export default MasterKomKT