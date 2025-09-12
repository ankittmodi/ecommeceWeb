import React, { useState } from 'react'
import './style.css';
import Button from '@mui/material/Button';
import { TfiAngleUp } from "react-icons/tfi";
import { TfiAngleDown } from "react-icons/tfi";
const QuantityBox = () => {
  const [qutvalue,settValue] =useState(1);
  const isPlus=()=>{
    console.log('plus');
    settValue(qutvalue+1);
  }
  const isminus=()=>{
    if(qutvalue===1){
      settValue(1);
    }
    else{
      settValue(qutvalue-1);
    }
  }
  return (
    <div className="quantity">
      <input type="number" Value={qutvalue} readOnly/>
      <div className="input-count">
        <Button onClick={isPlus}><TfiAngleUp/></Button>
        <Button onClick={isminus}><TfiAngleDown/></Button>
      </div>
    </div>
  )
}

export default QuantityBox
