import { useCallback, useEffect, useMemo, useState } from 'react'
import Master from '../Master';

function  Negara() {
    let [dataNegara,setDataNegara] = useState([]);

    let master = useMemo(() => new Master(), [])
 
    const getListNegara = useCallback(async () => {
     try {
         const response = await master.masterNegara()
         console.log(response.data.data)
         setDataNegara(response.data.data)
     } catch (error) {
         console.log(error)
         setDataNegara([])
     }
 }, [master])
 
 useEffect(() => {
   getListNegara()
 }, [getListNegara])
 
    console.log(dataNegara);
    dataNegara?.map((data) => (
        setDataNegara([...dataNegara, {'value': data.id, 'label': data.nama}])
    ))

 return (
    Object.values(dataNegara)
    // <Select options={dataNegara}/>
    // <div>Negara</div>
  )
}

export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}
  
export const colourOptions: readonly ColourOption[] = {dataNegara};