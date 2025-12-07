import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';
import checked from '../../assets/checked.png';
const Success = () => {
  return (
    <section className='order-page'>
        <div className='success-img'>
            <img src={checked}/>
        </div>
        <h2>Your payment is Successfull</h2>
        <p>Thank you for your payment. </p>
        {/* An automated payment receipt will be sent to your registered email. */}
        <Link to='/'><Button className='success-btn'>Back to Home</Button></Link>
    </section>
  )
}

export default Success
