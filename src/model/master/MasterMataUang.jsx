import { useState } from 'react';
import MataUangJson from './mataUang.json'
// import Master from '../Master';

function MasterMataUang() {
   let [dataMataUang] = useState(MataUangJson);

//    let master = useMemo(() => new Master(), [])

//    const getListMataUang = useCallback(async () => {
//     try {
//         const response = await master.masterMataUang()
//         setDataMataUang(response.data.data)
//     } catch (error) {
//         console.log(error)
//         setDataMataUang([])
//     }
// }, [master])

// useEffect(() => {
//   getListMataUang()
// }, [getListMataUang])

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