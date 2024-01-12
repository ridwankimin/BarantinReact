import React from 'react'
import {
    BrowserRouter ,
    Routes,
    Route,
  } from "react-router-dom";
import Beranda from '../pages/Beranda';
// import DataDiri1 from '../component/DocK11/DataDiri1';
import DocK11 from '../pages/preborder/DocK11';
import DocK12 from '../pages/preborder/DocK12';
import DocK13 from '../pages/preborder/DocK13';
import DocK61 from '../pages/penahanan/DocK61';
import DocK62 from '../pages/penahanan/DocK62';
import DocK64 from '../pages/penahanan/DocK64';
import DocK71 from '../pages/penolakan/DocK71';
import DocK72 from '../pages/penolakan/DocK72';
import DocK73 from '../pages/penolakan/DocK73';
import DocK74 from '../pages/penolakan/DocK74';
import DocK75 from '../pages/penolakan/DocK75';
import DocK76 from '../pages/penolakan/DocK76';
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

function Content() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Beranda />} />
          {/* <Route path="/k11" element={<DataDiri1 />} /> */}
          <Route path="/datam" element={<DataMasuk />} />
          <Route path="/k11" element={<DocK11 />} />
          <Route path="/k11/:idPtk" element={<DocK11 />} />
          <Route path="/k12" element={<DocK12 />} />
          <Route path="/k13" element={<DocK13 />} />
          <Route path="/k14" element={<DocK14 />} />
          <Route path="/k15" element={<DocK15 />} />
          <Route path="/k61" element={<DocK61 />} />
          <Route path="/k62" element={<DocK62 />} />
          <Route path="/k64" element={<DocK64 />} />
          <Route path="/k71" element={<DocK71 />} />
          <Route path="/k72" element={<DocK72 />} />
          <Route path="/k73" element={<DocK73 />} />
          <Route path="/k74" element={<DocK74 />} />
          <Route path="/k75" element={<DocK75 />} />
          <Route path="/k76" element={<DocK76 />} />
          <Route path="/k81" element={<DocK81 />} />
          <Route path="/k82" element={<DocK82 />} />
          <Route path="/k91" element={<DocK91 />} />
          <Route path="/k92h" element={<DocK92h />} />
          <Route path="/k92i" element={<DocK92i />} />
          <Route path="/k92t" element={<DocK92t />} />
          <Route path="/k93" element={<DocK93 />} />
          <Route path="/k94" element={<DocK94 />} />
          <Route path="/kh1" element={<DocKH1 />} />
          <Route path="/kh2" element={<DocKH2 />} />
          <Route path="/ki1" element={<DocKI1 />} />
          <Route path="/ki2" element={<DocKI2 />} />
          <Route path="/kt1" element={<DocKT1 />} />
          <Route path="/kt2" element={<DocKT2 />} />
          <Route path="/kt3" element={<DocKT3 />} />
          <Route path="/kt4" element={<DocKT4 />} />
        </Routes>
      </BrowserRouter>
  )
}

export default Content