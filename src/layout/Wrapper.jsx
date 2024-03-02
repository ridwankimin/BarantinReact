import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Wrapper(props) {
  let [hideMenu, setHideMenu] = useState(true)
  const onClick = () => {
    setHideMenu(!hideMenu)
  }

  return (
    <div className="layout-wrapper light-style layout-content-navbar">
      <div className="layout-container">
        <Navbar menu={hideMenu} page={props.page}/>
        <Footer menu={hideMenu} page={props.page} clicked={onClick} />
      </div>
    </div>
  )
}

export default Wrapper