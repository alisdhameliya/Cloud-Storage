import React from 'react'

function Img({ classname, src = "defaultNoData.png", alt = "testImg", ...restProps }) {

    return (
        <img className={classname} src={src} alt={alt} {...restProps} loading='lazy...' />
    )
}

export default Img