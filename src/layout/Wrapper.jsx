/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Cookies from 'js-cookie'
import PtkSurtug from '../model/PtkSurtug'
import {decode as base64_decode} from 'base-64';

const modelSurtug = new PtkSurtug()

function Wrapper(props) {
  let [hideMenu, setHideMenu] = useState(true)
  const onClick = () => {
    setHideMenu(!hideMenu)
  }

  let [data, setData] = useState({
    pAdmin: 0,
    pFisikKesehatan: 0,
    pSingmat: 0,
    pAtasAlatAngkut: 0,
    pAlatAngkut: 0,
    pPengawasan: 0,
    pPengawalan: 0,
    pPerlakuan: 0,
    pPenahanan: 0,
    pPenolakan: 0,
    pPemusnahan: 0,
    pSuratKeterangan: 0,
    pPembebasan: 0,
    pSerahTerima: 0,
    pMonitoring: 0,
    pLainTK: 0,
    pWasmalistrik: 0,
    pGelarPerkara: 0,
    pPenyidikan: 0,
    pLengkapiBerkas: 0,
    pLainHK: 0
})

  const idPtk = Cookies.get("idPtkPage");
  
  function refreshMenu() {
    if(idPtk) {

      let ptkDecode = idPtk ? base64_decode(idPtk) : "";
      let ptkNomor = idPtk ? ptkDecode.split('m0R3N0r1R') : "";
      const resSurtug = modelSurtug.getSurtugByPtk(base64_decode(ptkNomor[1]), "");
      resSurtug
      .then((response) => {
          if(response.data) {
              if(typeof response.data != "string") {
                  if(response.data.status == 200) {
                      console.log("navbar ok")
                      setData(values => ({...values,
                          errorSurtugPage: "",
                          pAdmin: response.data.data.filter((element) => element.penugasan_id == 1).length,
                          pFisikKesehatan: response.data.data.filter((element) => element.penugasan_id == 2).length,
                          pSingmat: response.data.data.filter((element) => element.penugasan_id == 3).length,
                          pAtasAlatAngkut: response.data.data.filter((element) => element.penugasan_id == 4).length,
                          pAlatAngkut: response.data.data.filter((element) => element.penugasan_id == 5).length,
                          pPengawasan: response.data.data.filter((element) => element.penugasan_id == 6).length,
                          pPengawalan: response.data.data.filter((element) => element.penugasan_id == 7).length,
                          pPerlakuan: response.data.data.filter((element) => element.penugasan_id == 8).length,
                          pPenahanan: response.data.data.filter((element) => element.penugasan_id == 9).length,
                          pPenolakan: response.data.data.filter((element) => element.penugasan_id == 10).length,
                          pPemusnahan: response.data.data.filter((element) => element.penugasan_id == 11).length,
                          pSuratKeterangan: response.data.data.filter((element) => element.penugasan_id == 12).length,
                          pPembebasan: response.data.data.filter((element) => element.penugasan_id == 13 || element.penugasan_id == 14).length,
                          pSerahTerima: response.data.data.filter((element) => element.penugasan_id == 15).length,
                          pMonitoring: response.data.data.filter((element) => element.penugasan_id == 16).length,
                          pLainTK: response.data.data.filter((element) => element.penugasan_id == 17).length,
                          pWasmalistrik: response.data.data.filter((element) => element.penugasan_id == 18).length,
                          pGelarPerkara: response.data.data.filter((element) => element.penugasan_id == 19).length,
                          pPenyidikan: response.data.data.filter((element) => element.penugasan_id == 20).length,
                          pLengkapiBerkas: response.data.data.filter((element) => element.penugasan_id == 21).length,
                          pLainHK: response.data.data.filter((element) => element.penugasan_id == 22).length
                      }));
                  }
              } else {
                  console.log("navbar string")
                  refreshMenu()
                  setData(values => ({...values,
                      errorSurtugPage: "Gagal load data surat tugas"
                  }))
              }
          }
      })
      .catch((error) => {
          if(import.meta.env.VITE_BE_ENV == "DEV") {
              console.log(error)
          }
          console.log("navbar error")
          
          if(error.response.data.status != 404) {
            refreshMenu()
              setData(values => ({...values,
                  errorSurtugPage: "Gagal load data surat tugas"
              }))
          }
      });
    }
  }

  useEffect(() => {
    refreshMenu()
  },[])

  return (
    <div className="layout-wrapper light-style layout-content-navbar">
      <div className="layout-container">
        <Navbar menu={hideMenu} page={props.page} navbar={data} />
        <Footer menu={hideMenu} page={props.page} clicked={onClick} refreshNavbar={refreshMenu} />
      </div>
    </div>
  )
}

export default Wrapper