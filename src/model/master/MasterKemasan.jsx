import { useState } from 'react';
import MasterKemasanJson from './jenisKemasan.json';
// import Master from '../Master';
// import Master from '../Master';

// function kemasanJson() {
  // const ret = new 
  // return MasterKemasanJson
// }

function MasterKemasan() {
   let [dataKemasan] = useState(MasterKemasanJson);
   

//    let master = useMemo(() => new Master(), [])

//    const getListKemasan = useCallback(async () => {
//     try {
//         const response = await master.masterKemasan()
//         setDataKemasan(response.data.data)
//     } catch (error) {
//         console.log(error)
//         setDataKemasan([])
//     }
// }, [master])

// useEffect(() => {
//   setDataKemasan(MasterKemasanJson)
//   console.log("MasterKemasanJson")
//   console.log(MasterKemasanJson)
// }, [])

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