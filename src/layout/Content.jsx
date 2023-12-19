import React from 'react'
import {
    BrowserRouter ,
    Routes,
    Route,
  } from "react-router-dom";
import Beranda from '../pages/Beranda';
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

function Content() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/k11" element={<DocK11 />} />
          <Route path="/k12" element={<DocK12 />} />
          <Route path="/k13" element={<DocK13 />} />
          <Route path="/k61" element={<DocK61 />} />
          <Route path="/k62" element={<DocK62 />} />
          <Route path="/k64" element={<DocK64 />} />
          <Route path="/k71" element={<DocK71 />} />
          <Route path="/k72" element={<DocK72 />} />
          <Route path="/k73" element={<DocK73 />} />
          <Route path="/k74" element={<DocK74 />} />
          <Route path="/k75" element={<DocK75 />} />
        </Routes>
      </BrowserRouter>
  )
}

export default Content