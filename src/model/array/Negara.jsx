import { useCallback, useEffect, useMemo, useState } from 'react'
import Master from '../Master';
// import Select from 'react-select';

function  Negara() {
    let [dataNegara,setDataNegara] = useState([]);

    let master = useMemo(() => new Master(), [])
 
    const getListNegara = useCallback(async () => {
     try {
         const response = await master.masterNegara()
         setDataNegara(response.data.data)
     } catch (error) {
        if(process.env.REACT_APP_BE_ENV == "DEV") {
            console.log(error)
        }
         setDataNegara([])
     }
 }, [master])
 
 useEffect(() => {
   getListNegara()
 }, [getListNegara])
 
    // dataNegara?.map((data) => (
    //     setDataNegara([...dataNegara, {value: data.id, label: data.nama}])
    // ))

    dataNegara?.map(item => {
      return {
          label: item.nama,
          value: item.id     
      }
  })

//  return (
//     Object.values(dataNegara)
//     // <Select options={dataNegara}/>
//     // <div>Negara</div>
//   )
}

export default Negara