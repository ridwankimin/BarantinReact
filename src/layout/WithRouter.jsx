import React from 'react'
import Wrapper from './Wrapper'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function WithRouter() {
  return (
    <BrowserRouter basename='/apps/'>
        <Routes>
          <Route path={"/"} element={<Wrapper page="/" />} />
          <Route path={"/datam"} element={<Wrapper page="/datam" />} />
          <Route path={"/k11"} element={<Wrapper page="/k11" />} />
          <Route path={"/k12"} element={<Wrapper page="/k12" />} />
          <Route path={"/k13"} element={<Wrapper page="/k13" />} />
          <Route path={"/k14"} element={<Wrapper page="/k14" />} />
          <Route path={"/k15"} element={<Wrapper page="/k15" />} />
          <Route path={"/k21"} element={<Wrapper page="/k21" />} />
          <Route path={"/k22"} element={<Wrapper page="/k22" />} />
          <Route path={"/k31"} element={<Wrapper page="/k31" />} />
          <Route path={"/k32"} element={<Wrapper page="/k32" />} />
          <Route path={"/k33"} element={<Wrapper page="/k33" />} />
          <Route path={"/k34"} element={<Wrapper page="/k34" />} />
          <Route path={"/k35"} element={<Wrapper page="/k35" />} />
          <Route path={"/k36"} element={<Wrapper page="/k36" />} />
          <Route path={"/k37a"} element={<Wrapper page="/k37a" />} />
          <Route path={"/k37b"} element={<Wrapper page="/k37b" />} />
          <Route path={"/k38"} element={<Wrapper page="/k38" />} />
          <Route path={"/k39"} element={<Wrapper page="/k39" />} />
          <Route path={"/k310"} element={<Wrapper page="/k310" />} />
          <Route path={"/k41"} element={<Wrapper page="/k41" />} />
          <Route path={"/k42"} element={<Wrapper page="/k42" />} />
          <Route path={"/k51"} element={<Wrapper page="/k51" />} />
          <Route path={"/k52"} element={<Wrapper page="/k52" />} />
          <Route path={"/k53"} element={<Wrapper page="/k53" />} />
          <Route path={"/k54"} element={<Wrapper page="/k54" />} />
          <Route path={"/k55"} element={<Wrapper page="/k55" />} />
          <Route path={"/k61"} element={<Wrapper page="/k61" />} />
          <Route path={"/k62"} element={<Wrapper page="/k62" />} />
          <Route path={"/k63"} element={<Wrapper page="/k63" />} />
          <Route path={"/k71"} element={<Wrapper page="/k71" />} />
          <Route path={"/k72"} element={<Wrapper page="/k72" />} />
          <Route path={"/k73"} element={<Wrapper page="/k73" />} />
          <Route path={"/k74"} element={<Wrapper page="/k74" />} />
          <Route path={"/k81"} element={<Wrapper page="/k81" />} />
          <Route path={"/k82"} element={<Wrapper page="/k82" />} />
          <Route path={"/k91"} element={<Wrapper page="/k91" />} />
          <Route path={"/k92"} element={<Wrapper page="/k92" />} />
          {/* <Route path={"/k92h"} element={<Wrapper page="/k92h" />} />
          <Route path={"/k92i"} element={<Wrapper page="/k92i" />} />
          <Route path={"/k92t"} element={<Wrapper page="/k92t" />} /> */}
          <Route path={"/k93"} element={<Wrapper page="/k93" />} />
          <Route path={"/k94"} element={<Wrapper page="/k94" />} />
          <Route path={"/kh1"} element={<Wrapper page="/kh1" />} />
          <Route path={"/kh2"} element={<Wrapper page="/kh2" />} />
          <Route path={"/ki1"} element={<Wrapper page="/ki1" />} />
          <Route path={"/ki2"} element={<Wrapper page="/ki2" />} />
          <Route path={"/kt1"} element={<Wrapper page="/kt1" />} />
          <Route path={"/kt2"} element={<Wrapper page="/kt2" />} />
          <Route path={"/kt3"} element={<Wrapper page="/kt3" />} />
          <Route path={"/kt4"} element={<Wrapper page="/kt4" />} />
        </Routes>
      </BrowserRouter>
  )
}

export default WithRouter