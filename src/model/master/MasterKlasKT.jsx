import { useCallback, useEffect, useMemo, useState } from 'react';
import Master from '../Master';

function MasterKlasKT(props) {
   let [dataKlasKT,setDataKlasKT] = useState([]);

   let master = useMemo(() => new Master(), [])

   const getListKlasKT = useCallback(async () => {
      if(props.gol === 'A') {
        try {
            const response = await master.masterKlasKT(props.gol)
            setDataKlasKT(response.data.data)
        } catch (error) {
            console.log(error)
            setDataKlasKT([])
        }
      } else {
          try {
           const response = await master.masterKlasKT("B")
           setDataKlasKT(response.data.data)
          } catch (error) {
            console.log(error)
            setDataKlasKT([])
          }
          try {
            const response = await master.masterKlasKT("C")
            setDataKlasKT(dataKlasKT => dataKlasKT.concat(response.data.data))
          } catch (error) {
            console.log(error)
            setDataKlasKT([])
          }
          try {
            const response = await master.masterKlasKT("D")
            setDataKlasKT(dataKlasKT => dataKlasKT.concat(response.data.data))
          } catch (error) {
              console.log(error)
              setDataKlasKT([])
          }
     }
}, [master,props.gol])

useEffect(() => {
  getListKlasKT()
}, [getListKlasKT])
  return (
    <>
  {dataKlasKT?.map((data) => (
          // [{'value': data.id, 'label': data.nama},]
            <option value={data.id} key={data.id}>{data.peruntukan} - {data.bentuk} - {data.golongan}</option>
        ))}
    </>
  )
}

export default MasterKlasKT