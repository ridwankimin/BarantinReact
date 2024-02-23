import React from 'react'
import {
    BrowserRouter ,
    Routes,
    Route,
    // useLocation 
  } from "react-router-dom";
import Beranda from '../pages/Beranda';
// import DataDiri1 from '../component/DocK11/DataDiri1';
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

function Content() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={process.env.PUBLIC_URL + "/"} element={<Beranda />} />
          {/* <Route path="/k11" element={<DataDiri1 />} /> */}
          <Route path={process.env.PUBLIC_URL + "/datam"} element={<DataMasuk />} />
          <Route path={process.env.PUBLIC_URL + "/k11"} element={<DocK11 />} />
          {/* <Route path="/k11/:idPtk" element={<DocK11 />} /> */}
          <Route path={process.env.PUBLIC_URL + "/k12"} element={<DocK12 />} />
          <Route path={process.env.PUBLIC_URL + "/k13"} element={<DocK13 />} />
          <Route path={process.env.PUBLIC_URL + "/k14"} element={<DocK14 />} />
          <Route path={process.env.PUBLIC_URL + "/k15"} element={<DocK15 />} />
          <Route path={process.env.PUBLIC_URL + "/k21"} element={<DocK21 />} />
          <Route path={process.env.PUBLIC_URL + "/k22"} element={<DocK22 />} />
          <Route path={process.env.PUBLIC_URL + "/k31"} element={<DocK31 />} />
          <Route path={process.env.PUBLIC_URL + "/k32"} element={<DocK32 />} />
          <Route path={process.env.PUBLIC_URL + "/k33"} element={<DocK33 />} />
          <Route path={process.env.PUBLIC_URL + "/k34"} element={<DocK34 />} />
          <Route path={process.env.PUBLIC_URL + "/k35"} element={<DocK35 />} />
          <Route path={process.env.PUBLIC_URL + "/k36"} element={<DocK36 />} />
          <Route path={process.env.PUBLIC_URL + "/k37a"} element={<DocK37a />} />
          <Route path={process.env.PUBLIC_URL + "/k37b"} element={<DocK37b />} />
          <Route path={process.env.PUBLIC_URL + "/k38"} element={<DocK38 />} />
          <Route path={process.env.PUBLIC_URL + "/k39"} element={<DocK39 />} />
          <Route path={process.env.PUBLIC_URL + "/k310"} element={<DocK310 />} />
          <Route path={process.env.PUBLIC_URL + "/k41"} element={<DocK41 />} />
          <Route path={process.env.PUBLIC_URL + "/k42"} element={<DocK42 />} />
          <Route path={process.env.PUBLIC_URL + "/k51"} element={<DocK51 />} />
          <Route path={process.env.PUBLIC_URL + "/k52"} element={<DocK52 />} />
          <Route path={process.env.PUBLIC_URL + "/k53"} element={<DocK53 />} />
          <Route path={process.env.PUBLIC_URL + "/k54"} element={<DocK54 />} />
          <Route path={process.env.PUBLIC_URL + "/k55"} element={<DocK55 />} />
          <Route path={process.env.PUBLIC_URL + "/k61"} element={<DocK61 />} />
          <Route path={process.env.PUBLIC_URL + "/k62"} element={<DocK62 />} />
          <Route path={process.env.PUBLIC_URL + "/k63"} element={<DocK63 />} />
          <Route path={process.env.PUBLIC_URL + "/k71"} element={<DocK71 />} />
          <Route path={process.env.PUBLIC_URL + "/k72"} element={<DocK72 />} />
          <Route path={process.env.PUBLIC_URL + "/k73"} element={<DocK73 />} />
          <Route path={process.env.PUBLIC_URL + "/k74"} element={<DocK74 />} />
          {/* <Route path="/k75" element={<DocK75 />} />
          <Route path="/k76" element={<DocK76 />} /> */}
          <Route path={process.env.PUBLIC_URL + "/k81"} element={<DocK81 />} />
          <Route path={process.env.PUBLIC_URL + "/k82"} element={<DocK82 />} />
          <Route path={process.env.PUBLIC_URL + "/k91"} element={<DocK91 />} />
          <Route path={process.env.PUBLIC_URL + "/k92h"} element={<DocK92h />} />
          <Route path={process.env.PUBLIC_URL + "/k92i"} element={<DocK92i />} />
          <Route path={process.env.PUBLIC_URL + "/k92t"} element={<DocK92t />} />
          <Route path={process.env.PUBLIC_URL + "/k93"} element={<DocK93 />} />
          <Route path={process.env.PUBLIC_URL + "/k94"} element={<DocK94 />} />
          <Route path={process.env.PUBLIC_URL + "/kh1"} element={<DocKH1 />} />
          <Route path={process.env.PUBLIC_URL + "/kh2"} element={<DocKH2 />} />
          <Route path={process.env.PUBLIC_URL + "/ki1"} element={<DocKI1 />} />
          <Route path={process.env.PUBLIC_URL + "/ki2"} element={<DocKI2 />} />
          <Route path={process.env.PUBLIC_URL + "/kt1"} element={<DocKT1 />} />
          <Route path={process.env.PUBLIC_URL + "/kt2"} element={<DocKT2 />} />
          <Route path={process.env.PUBLIC_URL + "/kt3"} element={<DocKT3 />} />
          <Route path={process.env.PUBLIC_URL + "/kt4"} element={<DocKT4 />} />
        </Routes>
      </BrowserRouter>
  )
}

export default Content