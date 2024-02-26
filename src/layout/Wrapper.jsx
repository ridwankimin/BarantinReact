import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Wrapper() {
  let [hideMenu, setHideMenu] = useState(true)

  const onClick = () => {
    setHideMenu(!hideMenu)
  }

  return (
    <div className="layout-wrapper light-style layout-content-navbar">
      <div className="layout-container">
        <Navbar menu={hideMenu}/>
        <Footer menu={hideMenu} clicked={onClick}/>
      </div>
    </div>
  )
}

export default Wrapper