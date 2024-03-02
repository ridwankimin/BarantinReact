/* eslint-disable eqeqeq */
import React from 'react'
import Content from './Content'
import Header from './Header';

function Footer(props) {
  return (
    <div className="layout-page">
        <Header clicked={props.clicked}/>

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