import React,{useContext} from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnBold } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { BiSupport } from "react-icons/bi";
import { IoChatboxOutline } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { IoLogoYoutube } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
// cart page
import Drawer from '@mui/material/Drawer';
import CartPanel from '../CartPanel';
import { myContext } from '../../App';
import cart from '../../assets/cart.jpg';
const Footer = () => {
  const context=useContext(myContext);
  return (
    <>
    <div className="footer-section">
      <div className="container">
        <div className="part">
          <div className="col-sec">
            <LiaShippingFastSolid className='footer-icon'/>
            <h4>Free Shipping</h4>
            <p>For all Orders Over Rs. 3000</p>
          </div>

          <div className="col-sec">
            <PiKeyReturnBold className='footer-icon'/>
            <h4>30 Days Returns</h4>
            <p>Forr an Exchange Product</p>
          </div>
          <div className="col-sec">
            <IoWalletOutline className='footer-icon'/>
            <h4>Secured Payments</h4>
            <p>Payment Cards Accepted</p>
          </div>
          <div className="col-sec">
            <GoGift className='footer-icon'/>
            <h4>Special Gifts</h4>
            <p>Our First Product Order</p>
          </div>
          <div className="col-sec">
            <BiSupport className='footer-icon'/>
            <h4>Support 24/7</h4>
            <p>Contact us Anytime</p>
          </div>
        </div>
        <hr />

        <div className="footer">
          <div className="part1">
            <h2>Contact Us</h2>
            <p>Classyshop - Mega super Store <br />507-Union Trade Center Dhanbad</p>
            <Link to=''>classyshop@gmail.com</Link>
            <p className='phone'>(91+) 9835-543-210</p>
            <div className="chat">
              <IoChatboxOutline className='footer-icon1'/>
              <p>Online Chat <br /> Get Expert</p>
            </div>
          </div>
          <div className="part2">
            <div className="part-list1">
              <h2>Products</h2>
            <ul className="list-item">
              <li>
                <Link to='/'>Prices drop</Link>
              </li>
              <li>
                <Link to='/'>New products</Link>
              </li>
              <li>
                <Link to='/'>Best Sales</Link>
              </li>
              <li>
                <Link to='/'>Contact Us</Link>
              </li>
              <li>
                <Link to='/'>Sitemap</Link>
              </li>
              <li>
                <Link to='/'>Stores</Link>
              </li>
            </ul>
            </div>
            <div className="part-list2">
              <h2>Products</h2>
            <ul className="list-item">
              <li>
                <Link to='/'>Prices drop</Link>
              </li>
              <li>
                <Link to='/'>New products</Link>
              </li>
              <li>
                <Link to='/'>Best Sales</Link>
              </li>
              <li>
                <Link to='/'>Contact Us</Link>
              </li>
              <li>
                <Link to='/'>Sitemap</Link>
              </li>
              <li>
                <Link to='/'>Stores</Link>
              </li>
            </ul>
            </div>
          </div>
          <div className="part3">
            <h2>Subscribe to newsletter</h2>
            <p>Subscribe to our latest newsletter to get news about special discounts.</p>
            <form action="" className="form-section">
              <input type="text" name='email' placeholder='Your Email Address' required/>
                <FormControlLabel required control={<Checkbox />} label="I agree to the terms and conditions and the privacy policy" />
                <Button style={{marginTop:"1rem"}}>Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="bottom-strip">
          <div className="container">
            <div className="bottom-part">
              <Button><FaWhatsapp/></Button>
              <Button><FaInstagram/></Button>
              <Button><FaFacebook/></Button>
              <Button><CiTwitter/></Button>
              <Button><IoLogoYoutube/></Button>
            </div>
            <p>© 2025 - Ecommerce Template</p>
            <div className="payment">
              <img src="https://ecommerce-frontend-view.netlify.app/master_card.png" alt="" />
              <img src="https://ecommerce-frontend-view.netlify.app/visa.png" alt="" />
              <img src="https://ecommerce-frontend-view.netlify.app/american_express.png" alt="" />
              <img src="https://ecommerce-frontend-view.netlify.app/paypal.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* cart panel */}
      <Drawer open={context.openCart} onClose={context.toggleCartPanel(false)} anchor='right' className='drawer'>
        <div className="cart-panel">
          <div className="cart-header">
            <h4>Shopping Cart ({context?.cartData?.length})</h4>
            <Button className='cart-panel-btn'
            onClick={context.toggleCartPanel(false)}><RxCross2/></Button>
          </div>
          {
            context?.cartData?.length!==0 ? <CartPanel data={context?.cartData}/>:
            <div className='cart-img'>
              <img src={cart} />
              <p>Your Cart is currently empty</p>
              <Button className='bg-org cart-btn' onClick={context.toggleCartPanel(false)}>Continue Shopping</Button>
            </div>
          }
          
        </div>
      </Drawer>
    </>
  )
}

export default Footer
