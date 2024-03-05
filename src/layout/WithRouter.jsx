import React from 'react'
import Wrapper from './Wrapper'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function WithRouter() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={process.env.PUBLIC_URL + "/"} element={<Wrapper page="/" />} />
          <Route path={process.env.PUBLIC_URL + "/datam"} element={<Wrapper page="/datam" />} />
          <Route path={process.env.PUBLIC_URL + "/k11"} element={<Wrapper page="/k11" />} />
          <Route path={process.env.PUBLIC_URL + "/k12"} element={<Wrapper page="/k12" />} />
          <Route path={process.env.PUBLIC_URL + "/k13"} element={<Wrapper page="/k13" />} />
          <Route path={process.env.PUBLIC_URL + "/k14"} element={<Wrapper page="/k14" />} />
          <Route path={process.env.PUBLIC_URL + "/k15"} element={<Wrapper page="/k15" />} />
          <Route path={process.env.PUBLIC_URL + "/k21"} element={<Wrapper page="/k21" />} />
          <Route path={process.env.PUBLIC_URL + "/k22"} element={<Wrapper page="/k22" />} />
          <Route path={process.env.PUBLIC_URL + "/k31"} element={<Wrapper page="/k31" />} />
          <Route path={process.env.PUBLIC_URL + "/k32"} element={<Wrapper page="/k32" />} />
          <Route path={process.env.PUBLIC_URL + "/k33"} element={<Wrapper page="/k33" />} />
          <Route path={process.env.PUBLIC_URL + "/k34"} element={<Wrapper page="/k34" />} />
          <Route path={process.env.PUBLIC_URL + "/k35"} element={<Wrapper page="/k35" />} />
          <Route path={process.env.PUBLIC_URL + "/k36"} element={<Wrapper page="/k36" />} />
          <Route path={process.env.PUBLIC_URL + "/k37a"} element={<Wrapper page="/k37a" />} />
          <Route path={process.env.PUBLIC_URL + "/k37b"} element={<Wrapper page="/k37b" />} />
          <Route path={process.env.PUBLIC_URL + "/k38"} element={<Wrapper page="/k38" />} />
          <Route path={process.env.PUBLIC_URL + "/k39"} element={<Wrapper page="/k39" />} />
          <Route path={process.env.PUBLIC_URL + "/k310"} element={<Wrapper page="/k310" />} />
          <Route path={process.env.PUBLIC_URL + "/k41"} element={<Wrapper page="/k41" />} />
          <Route path={process.env.PUBLIC_URL + "/k42"} element={<Wrapper page="/k42" />} />
          <Route path={process.env.PUBLIC_URL + "/k51"} element={<Wrapper page="/k51" />} />
          <Route path={process.env.PUBLIC_URL + "/k52"} element={<Wrapper page="/k52" />} />
          <Route path={process.env.PUBLIC_URL + "/k53"} element={<Wrapper page="/k53" />} />
          <Route path={process.env.PUBLIC_URL + "/k54"} element={<Wrapper page="/k54" />} />
          <Route path={process.env.PUBLIC_URL + "/k55"} element={<Wrapper page="/k55" />} />
          <Route path={process.env.PUBLIC_URL + "/k61"} element={<Wrapper page="/k61" />} />
          <Route path={process.env.PUBLIC_URL + "/k62"} element={<Wrapper page="/k62" />} />
          <Route path={process.env.PUBLIC_URL + "/k63"} element={<Wrapper page="/k63" />} />
          <Route path={process.env.PUBLIC_URL + "/k71"} element={<Wrapper page="/k71" />} />
          <Route path={process.env.PUBLIC_URL + "/k72"} element={<Wrapper page="/k72" />} />
          <Route path={process.env.PUBLIC_URL + "/k73"} element={<Wrapper page="/k73" />} />
          <Route path={process.env.PUBLIC_URL + "/k74"} element={<Wrapper page="/k74" />} />
          <Route path={process.env.PUBLIC_URL + "/k81"} element={<Wrapper page="/k81" />} />
          <Route path={process.env.PUBLIC_URL + "/k82"} element={<Wrapper page="/k82" />} />
          <Route path={process.env.PUBLIC_URL + "/k91"} element={<Wrapper page="/k91" />} />
          <Route path={process.env.PUBLIC_URL + "/k92h"} element={<Wrapper page="/k92h" />} />
          <Route path={process.env.PUBLIC_URL + "/k92i"} element={<Wrapper page="/k92i" />} />
          <Route path={process.env.PUBLIC_URL + "/k92t"} element={<Wrapper page="/k92t" />} />
          <Route path={process.env.PUBLIC_URL + "/k93"} element={<Wrapper page="/k93" />} />
          <Route path={process.env.PUBLIC_URL + "/k94"} element={<Wrapper page="/k94" />} />
          <Route path={process.env.PUBLIC_URL + "/kh1"} element={<Wrapper page="/kh1" />} />
          <Route path={process.env.PUBLIC_URL + "/kh2"} element={<Wrapper page="/kh2" />} />
          <Route path={process.env.PUBLIC_URL + "/ki1"} element={<Wrapper page="/ki1" />} />
          <Route path={process.env.PUBLIC_URL + "/ki2"} element={<Wrapper page="/ki2" />} />
          <Route path={process.env.PUBLIC_URL + "/kt1"} element={<Wrapper page="/kt1" />} />
          <Route path={process.env.PUBLIC_URL + "/kt2"} element={<Wrapper page="/kt2" />} />
          <Route path={process.env.PUBLIC_URL + "/kt3"} element={<Wrapper page="/kt3" />} />
          <Route path={process.env.PUBLIC_URL + "/kt4"} element={<Wrapper page="/kt4" />} />
          <Route path={process.env.PUBLIC_URL + "/k11c"} element={<Wrapper page="/k11c" />} />
          <Route path={process.env.PUBLIC_URL + "/kh1c"} element={<Wrapper page="/kh1c" />} />
          <Route path={process.env.PUBLIC_URL + "/kh2c"} element={<Wrapper page="/kh2c" />} />
          <Route path={process.env.PUBLIC_URL + "/ki1c"} element={<Wrapper page="/ki1c" />} />
          <Route path={process.env.PUBLIC_URL + "/ki2c"} element={<Wrapper page="/ki2c" />} />
          <Route path={process.env.PUBLIC_URL + "/k92hc"} element={<Wrapper page="/k92hc" />} />
          <Route path={process.env.PUBLIC_URL + "/k92ic"} element={<Wrapper page="/k92ic" />} />
          <Route path={process.env.PUBLIC_URL + "/k92tc"} element={<Wrapper page="/k92tc" />} />

        </Routes>
      </BrowserRouter>
  )
}

export default WithRouter