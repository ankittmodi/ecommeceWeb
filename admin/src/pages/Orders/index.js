import React, { useState } from 'react';
import './style.css'
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Button } from '@mui/material';
import Badges from '../../Component/Badges';
import SearchBox from '../../Component/SearchBox';
const Order = () => {
    const [isOpenOrder, setIsOpenOrder] = useState(null);
    const toggleOrder = (index) => {
    setIsOpenOrder(isOpenOrder === index ? null : index);
  };
  return (
    <div className='tables-card'>
        <div className='table-flex recent-order'>
          <h2>Recent Orders</h2>
          <div>
            <SearchBox className="order-search"/>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="order-table">
            <thead className='table-container'>
              <tr className='table-header'>
                <th>&nbsp;</th>
                <th>Order Id</th>
                <th>Payment Id</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Total Amount</th>
                <th>Email</th>
                <th>User Id</th>
                <th>Order Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {/* ---------- ORDER 1 ---------- */}
              <tr>
                <td>
                  <Button onClick={() => toggleOrder(0)}>
                    {isOpenOrder === 0 ? <FaAngleUp /> : <FaAngleDown />}
                  </Button>
                </td>
                <td style={{color:"blue"}}>3h4g56g476g4g4h5j7</td>
                <td style={{color:"blue"}}>h4g56g476g4</td>
                <td>Ankit Kumar</td>
                <td>5485158415</td>
                <td>Maithon, Dhanbad, Jharkhand, India</td>
                <td>828407</td>
                <td>₹1499.00</td>
                <td>murad345@gmail.com</td>
                <td>Ankit123445</td>
                <td><Badges status='pending' /></td>
                <td>25-07-2025</td>
              </tr>
              {isOpenOrder === 0 && (
                <>
                  <tr>
                    <td colSpan="12">
                      <hr />
                      <table className="order-table1">
                        <thead>
                          <tr>
                            <th>Product Id</th>
                            <th>Product Title</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>3h4g56g476g4g4h5j7</td>
                            <td>Koskii Saree</td>
                            <td>
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg"
                                alt=""
                                className='table-img'
                              />
                            </td>
                            <td>1</td>
                            <td>₹1500.00</td>
                            <td>₹1540.00</td>
                          </tr>
                          <tr>
                            <td>3h4g56g476g4g4h5j7</td>
                            <td>Koskii Saree</td>
                            <td>
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg"
                                alt=""
                                className='table-img'
                              />
                            </td>
                            <td>1</td>
                            <td>₹1500.00</td>
                            <td>₹1540.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </>
              )}

              {/* ---------- ORDER 2 ---------- */}
              <tr>
                <td>
                  <Button onClick={() => toggleOrder(1)}>
                    {isOpenOrder === 1 ? <FaAngleUp /> : <FaAngleDown />}
                  </Button>
                </td>
                <td>8j4l56g4k6g4g4h5k9</td>
                <td>h8l56g476g4</td>
                <td>Ravi Kumar</td>
                <td>7845124598</td>
                <td>Delhi, India</td>
                <td>110001</td>
                <td>₹2499.00</td>
                <td>ravi123@gmail.com</td>
                <td>Ravi0098</td>
                <td><Badges status='confirmed' /></td>
                <td>01-08-2025</td>
              </tr>

              {isOpenOrder === 1 && (
                <>
                  <tr>
                    <td colSpan="12">
                      <hr />
                      <table className="order-table1">
                        <thead>
                          <tr>
                            <th>Product Id</th>
                            <th>Product Title</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>8j4l56g4k6g4g4h5k9</td>
                            <td>Lehenga Set</td>
                            <td>
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg"
                                alt=""
                                className='table-img'
                              />
                            </td>
                            <td>1</td>
                            <td>₹2500.00</td>
                            <td>₹2540.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default Order
