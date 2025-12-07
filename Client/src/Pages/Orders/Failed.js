import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';
import delet from '../../assets/delete.png';
const Failed = () => {
  return (
    <section className='order-page'>
        <div className='success-img'>
            <img src={delet}/>
        </div>
        <h2>Your payment is Failed</h2>
        <p>Your payment is failed due to some reason. </p>
        {/* An automated payment receipt will be sent to your registered email. */}
        <Link to='/'><Button className='success-btn'>Back to Home</Button></Link>
    </section>
  )
}

export default Failed
