import React from 'react'
import './style.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MyAccountSidebar from '../../components/MyAccountSidebar';
const MyAccount = () => {
  return (
    <section className='my-account' >
    <div className="container">
      <div className="col1">
        <MyAccountSidebar/>
      </div>
      <div className="col2">
        <div className="submit-details">
          <h2>My Profile</h2>
          <hr />
          <form action="">
            <div className="user-form">
              <div className="part1">
                <TextField id="outlined-basic" label="Full Name" variant="outlined" 
                  size='small'
                className='input'/>
              </div>
              <div className="part1">
                <TextField id="outlined-basic" label="Email" variant="outlined" 
                  size='small'
                className='input'/>
              </div>
            </div>
            <div className="user-form">
              <div className="part1">
                <TextField id="outlined-basic" label="Phone Number" variant="outlined" 
                  size='small'
                className='input'/>
              </div>
            </div>
            <br />
            <div className="profile-btn">
              <Button className='bg-org'>Save</Button>
              <Button className='bg'>Edit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </section>
  )
}

export default MyAccount
