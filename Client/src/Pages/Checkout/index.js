import React from 'react'
import './style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const Checkout = () => {
  return (
    <>
      <section className="checkout">
        <div className="container">
          <div className="left-col">
            <div className="card">
              <h2>Billing Details</h2>
              <form action="" className="check-form">
                <div className="form">
                  <div className="col">
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" size='small' className='area-part'/>
                  </div>
                  <div className="col">
                    <TextField id="outlined-basic" label="Email" variant="outlined" size='small' className='area-part'/>
                  </div>
                </div>
                
                <div className="form1">
                  <h5>Street Address *</h5>
                  <div className="form-col1">
                    <TextField id="outlined-basic" label="House number and street name" variant="outlined" size='small' className='area-part'/>
                    <TextField id="outlined-basic" label="Apartment, Suite, Unit, etc. (optional)" variant="outlined" size='small' className='area-part'/>
                </div>
                <div className="form1">
                  <h5>Town/ City *</h5>
                  <div className="form-col1">
                    <TextField id="outlined-basic" label="City" variant="outlined" size='small' className='area-part'/>
                  </div>
                </div>
                <div className="form1">
                  <h5>State/ Country *</h5>
                  <div className="form-col1">
                    <TextField id="outlined-basic" label="State" variant="outlined" size='small' className='area-part'/>
                  </div>
                </div>
                <div className="form1">
                  <h5>Postcode/ ZIP *</h5>
                  <div className="form-col1">
                    <TextField id="outlined-basic" label="ZIP Code" variant="outlined" size='small' className='area-part'/>
                  </div>
                </div>

                <div className="form">
                  <div className="col">
                    <TextField id="outlined-basic" label="Phone Number" variant="outlined" size='small' className='area-part'/>
                  </div>
                  <div className="col">
                    <TextField id="outlined-basic" label="Email Address" variant="outlined" size='small' className='area-part'/>
                  </div>
                </div>
                </div>
              </form>
            </div>
          </div>
          <div className="right-col">
            <div className="card">
              <h2>Your Order</h2>
              <div className="right-item">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              <hr />
              <div className="checkout-box">
                <div className="details">
                  <div className="item">
                    <div className="img">
                      <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" />
                    </div>
                    <div className="info">
                      <h4>Koskii stylish saree with best one</h4>
                      <div className="desc">
                        <span>Qty: 1</span>
                        <span>Rs: 1300:00</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="img">
                      <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" />
                    </div>
                    <div className="info">
                      <h4>Koskii stylish saree with best one</h4>
                      <div className="desc">
                        <span>Qty: 1</span>
                        <span>Rs: 1300:00</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="img">
                      <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" />
                    </div>
                    <div className="info">
                      <h4>Koskii stylish saree with best one</h4>
                      <div className="desc">
                        <span>Qty: 1</span>
                        <span>Rs: 1300:00</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="img">
                      <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" />
                    </div>
                    <div className="info">
                      <h4>Koskii stylish saree with best one</h4>
                      <div className="desc">
                        <span>Qty: 1</span>
                        <span>Rs: 1300:00</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="img">
                      <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" />
                    </div>
                    <div className="info">
                      <h4>Koskii stylish saree with best one</h4>
                      <div className="desc">
                        <span>Qty: 1</span>
                        <span>Rs: 1300:00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className='btn'>Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Checkout
