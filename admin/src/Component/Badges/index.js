import React from 'react'
import './style.css';
const Badges = (props) => {
  return (
    <div>
      <span className={`badge ${props.status==='pending' && "pend-color"} ${props.status==='confirm' && "succ-color"}`}>
        {props.status}
      </span>
    </div>
  )
}

export default Badges


