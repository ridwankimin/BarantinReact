import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Wrapper() {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Navbar />
        <Footer />
      </div>
    </div>
  )
}

export default Wrapper