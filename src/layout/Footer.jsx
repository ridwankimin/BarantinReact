/* eslint-disable eqeqeq */
import React from 'react'
import Content from './Content'
import Header from './Header';
import { useLocation, useNavigate } from 'react-router-dom';

function Footer(props) {
  const navigate = useNavigate()
  const location = useLocation();
  return (
    <div className="layout-page">
        <Header clicked={props.clicked}/>

        <div style={{
            bottom: "45px",
            right: "45px",
            position: "fixed",
            zIndex: 99999999,
            display: (location.pathname.split("/")[2] == 'datam' || location.pathname.split("/")[2] == '' ? "none" : "block")
            }}>
                <button type='button' onClick={() => navigate(-1)} style={{backgroundColor: "#123138"}} className='btn rounded-pill text-lightest'><i className='fa-solid fa-chevron-left me-sm-2 me-1'></i> Kembali</button>
        </div>

        <div className="content-wrapper">
            <Content page={props.page} />
            
            <footer className="content-footer footer bg-footer-theme">
                <div className="container-fluid d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                    <div className="mb-2 mb-md-0">
                       v.{process.env.REACT_APP_VERSION} © - Badan Karantina Indonesia
                    </div>
                </div>
            </footer>

            <div className="content-backdrop fade"></div>
        </div>
    </div>
  )
}

export default Footer