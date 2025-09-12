import React from 'react'
import './style.css'
const Badge = (props) => {
  return (
    <>
      <span className={`badge ${props.status==='pending' && "pend-color"} ${props.status==='confirm' && "succ-color"}`}>
        {props.status}
      </span>
    </>
  )
}

export default Badge
