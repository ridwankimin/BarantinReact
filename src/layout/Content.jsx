/* eslint-disable react/prop-types */
/* eslint-disable eqeqeq */
import React from 'react'
// import {
//     BrowserRouter ,
//     Routes,
//     Route,
//     // useLocation 
//   } from "react-router-dom";
import Beranda from '../pages/Beranda';
import DocK11 from '../pages/preborder/DocK11';
import DocK12 from '../pages/preborder/DocK12';
import DocK13 from '../pages/preborder/DocK13';
import DocK61 from '../pages/penahanan/DocK61';
import DocK62 from '../pages/penahanan/DocK62';
import DocK63 from '../pages/penahanan/DocK63';
import DocK71 from '../pages/penolakan/DocK71';
import DocK72 from '../pages/penolakan/DocK72';
import DocK73 from '../pages/penolakan/DocK73';
import DocK74 from '../pages/penolakan/DocK74';
// import DocK75 from '../pages/penolakan/DocK75';
// import DocK76 from '../pages/penolakan/DocK76';
import DocK81 from '../pages/pemusnahan/DocK81';
import DocK82 from '../pages/pemusnahan/DocK82';
import DocK91 from '../pages/pembebasan/DocK91';
import DocK92h from '../pages/pembebasan/DocK92h';
import DocK92i from '../pages/pembebasan/DocK92i';
import DocK92t from '../pages/pembebasan/DocK92t';
import DocK93 from '../pages/pembebasan/DocK93';
import DocK94 from '../pages/pembebasan/DocK94';
import DocKH1 from '../pages/pembebasan/kh/DocKH1';
import DocKH2 from '../pages/pembebasan/kh/DocKH2';
import DocKI1 from '../pages/pembebasan/ki/DocKI1';
import DocKI2 from '../pages/pembebasan/ki/DocKI2';
import DocKT1 from '../pages/pembebasan/kt/DocKT1';
import DocKT2 from '../pages/pembebasan/kt/DocKT2';
import DocKT3 from '../pages/pembebasan/kt/DocKT3';
import DocKT4 from '../pages/pembebasan/kt/DocKT4';
import DocK14 from '../pages/preborder/DocK14';
import DocK15 from '../pages/preborder/DocK15';
import DataMasuk from '../pages/DataMasuk';
import DocK21 from '../pages/penugasan/DocK21';
import DocK22 from '../pages/penugasan/DocK22';
import DocK31 from '../pages/pemeriksaan/DocK31';
import DocK32 from '../pages/pemeriksaan/DocK32';
import DocK33 from '../pages/pemeriksaan/DocK33';
import DocK34 from '../pages/pemeriksaan/DocK34';
import DocK35 from '../pages/pemeriksaan/DocK35';
import DocK36 from '../pages/pemeriksaan/DocK36';
import DocK37a from '../pages/pemeriksaan/DocK37a';
import DocK38 from '../pages/pemeriksaan/DocK38';
import DocK39 from '../pages/pemeriksaan/DocK39';
import DocK310 from '../pages/pemeriksaan/DocK310';
import DocK41 from '../pages/singmat/DocK41';
import DocK42 from '../pages/singmat/DocK42';
import DocK51 from '../pages/perlakuan/DocK51';
import DocK52 from '../pages/perlakuan/DocK52';
import DocK53 from '../pages/perlakuan/DocK53';
import DocK54 from '../pages/perlakuan/DocK54';
import DocK55 from '../pages/perlakuan/DocK55';
import DocK37b from '../pages/pemeriksaan/DocK37b';
// import DataDiri1 from '../component/DocK11/DataDiri1';


function Content(props) {
  function navigate() {
    if(props.page == "/") {
      return <Beranda />
    } else if(props.page == "/datam") {
      return <DataMasuk />
    } else if(props.page == "/k11") {
      return <DocK11 />
    } else if(props.page == "/k12") {
      return <DocK12 />
    } else if(props.page == "/k13") {
      return <DocK13 />
    } else if(props.page == "/k14") {
      return <DocK14 />
    } else if(props.page == "/k15") {
      return <DocK15 />
    } else if(props.page == "/k21") {
      return <DocK21 />
    } else if(props.page == "/k22") {
      return <DocK22 />
    } else if(props.page == "/k31") {
      return <DocK31 />
    } else if(props.page == "/k32") {
      return <DocK32 />
    } else if(props.page == "/k33") {
      return <DocK33 />
    } else if(props.page == "/k34") {
      return <DocK34 />
    } else if(props.page == "/k35") {
      return <DocK35 />
    } else if(props.page == "/k36") {
      return <DocK36 />
    } else if(props.page == "/k37a") {
      return <DocK37a />
    } else if(props.page == "/k37b") {
      return <DocK37b />
    } else if(props.page == "/k38") {
      return <DocK38 />
    } else if(props.page == "/k39") {
      return <DocK39 />
    } else if(props.page == "/k310") {
      return <DocK310 />
    } else if(props.page == "/k41") {
      return <DocK41 />
    } else if(props.page == "/k42") {
      return <DocK42 />
    } else if(props.page == "/k51") {
      return <DocK51 />
    } else if(props.page == "/k52") {
      return <DocK52 />
    } else if(props.page == "/k53") {
      return <DocK53 />
    } else if(props.page == "/k54") {
      return <DocK54 />
    } else if(props.page == "/k55") {
      return <DocK55 />
    } else if(props.page == "/k61") {
      return <DocK61 />
    } else if(props.page == "/k62") {
      return <DocK62 />
    } else if(props.page == "/k63") {
      return <DocK63 />
    } else if(props.page == "/k71") {
      return <DocK71 />
    } else if(props.page == "/k72") {
      return <DocK72 />
    } else if(props.page == "/k73") {
      return <DocK73 />
    } else if(props.page == "/k74") {
      return <DocK74 />
    } else if(props.page == "/k81") {
      return <DocK81 />
    } else if(props.page == "/k82") {
      return <DocK82 />
    } else if(props.page == "/k91") {
      return <DocK91 />
    } else if(props.page == "/k92h") {
      return <DocK92h />
    } else if(props.page == "/k92i") {
      return <DocK92i />
    } else if(props.page == "/k92t") {
      return <DocK92t />
    } else if(props.page == "/k93") {
      return <DocK93 />
    } else if(props.page == "/k94") {
      return <DocK94 />
    } else if(props.page == "/kh1") {
      return <DocKH1 />
    } else if(props.page == "/kh2") {
      return <DocKH2 />
    } else if(props.page == "/ki1") {
      return <DocKI1 />
    } else if(props.page == "/ki2") {
      return <DocKI2 />
    } else if(props.page == "/kt1") {
      return <DocKT1 />
    } else if(props.page == "/kt2") {
      return <DocKT2 />
    } else if(props.page == "/kt3") {
      return <DocKT3 />
    } else if(props.page == "/kt4") {
      return <DocKT4 />
    }
  }
  return (
    <>
      {navigate()}
    </>
  )
}

export default Content