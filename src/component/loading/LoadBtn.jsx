/* eslint-disable react/prop-types */
import React from 'react'

function LoadBtn(props) {
    import("../../assets/vendor/libs/spinkit/spinkit.css")
    return (
        <button className={"btn "+ props.warna + " " + props.ukuran +" me-sm-2 me-1"} type="button" disabled>
            <span className="spinner-border me-1" role="status" aria-hidden="true"></span>
            Loading...
        </button>
    )
}

export default LoadBtn