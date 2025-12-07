import React, { useContext, useEffect, useState, useRef } from 'react';
import './style.css';
import Button from '@mui/material/Button';
import { myContext } from '../../App';
import { FiPlus } from "react-icons/fi";
import Radio from "@mui/material/Radio";
import noAddress from '../../assets/noaddress.avif';
import { deleteData, postData } from '../../utils/Api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY_ID;
const RAZORPAY_SECRET_KEY = process.env.REACT_APP_RAZORPAY_KEY_SECRET;
const CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;
const API_URL = process.env.REACT_APP_API_URL;

const Checkout = () => {
  const context = useContext(myContext);
  const [isChecked, setIsChecked] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const paypalLoaded = useRef(false);
  const history = useNavigate();

  window.scrollTo(0, 0);

  /* ------------------------------------------
     AUTO SELECT WHEN ONLY ONE ADDRESS EXISTS
  -------------------------------------------*/
  useEffect(() => {
    const list = context?.userData?.address_details;

    if (list?.length === 1) {
      const onlyAddress = list[0];

      // check if blank or partial
      const valid =
        onlyAddress?.address_line1?.trim() &&
        onlyAddress?.city?.trim() &&
        onlyAddress?.pincode?.trim() &&
        onlyAddress?.State?.trim();

      if (valid) {
        setIsChecked(0);
        setSelectedAddress(onlyAddress?._id);
      } else {
        setIsChecked(null);
        setSelectedAddress("");
      }
    }
  }, [context?.userData]);

  /* ------------------------------------------
            CART TOTAL CALCULATION
  -------------------------------------------*/
  useEffect(() => {
    if (context?.cartData?.length) {
      let total = 0;
      context.cartData.forEach(item => total += item.price * item.quantity);
      setTotalAmount(total);
    }
  }, [context?.cartData]);

  /* ------------------------------------------
           Radio Selection (Fixed)
  -------------------------------------------*/
  const handleChange = (index, id) => {
    setIsChecked(index);
    setSelectedAddress(id);
  };

  /* ------------------------------------------
                    PAYPAL
  -------------------------------------------*/
  useEffect(() => {
    if (!CLIENT_ID || !totalAmount || paypalLoaded.current) return;

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      renderPaypalButtons();
      paypalLoaded.current = true;
    };
    document.body.appendChild(script);

    async function renderPaypalButtons() {
      if (!window.paypal) return;
      const container = document.getElementById("paypal-button-container");
      container.innerHTML = "";

      window.paypal.Buttons({
        createOrder: async () => {
          let usdAmount = totalAmount;
          try {
            const resp = await fetch("https://v6.exchangerate-api.com/v6/82e872d6e251026cb1ff1536/latest/INR");
            const resData = await resp.json();
            if (resData.result === "success") {
              usdAmount = (totalAmount * resData.conversion_rates.USD).toFixed(2);
            }
          } catch { }

          const headers = {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json"
          };

          const response = await axios.post(
            `${API_URL}/api/order/create-order-paypal?totalAmount=${usdAmount}`,
            {},
            { headers }
          );

          return response?.data?.orderId;
        },

        onApprove: async (data) => {
          try {
            if (!selectedAddress) {
              return context.openAlertBox("error", "Please select delivery address!");
            }

            const info = {
              userId: context?.userData?._id,
              products: context?.cartData,
              orderId: data.orderID,
              paymentId: data.orderID,
              payment_status: "COMPLETE",
              delivery_address: selectedAddress,
              totalAmount,
              date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
            };

            await axios.post(`${API_URL}/api/order/capture-order-paypal`, info);
            await deleteData(`/api/cart/empty-cart/${context?.userData?._id}`);
            await context.getCartItems();
            setTotalAmount(0);
            context.openAlertBox("success", "Order Completed Successfully!");
            history('/order/success');
          } catch (err) {
            history('/order/failed');
          }
        }
      }).render("#paypal-button-container");
    }

  }, [totalAmount, selectedAddress]);

  /* ------------------------------------------
                 RAZORPAY
  -------------------------------------------*/
  const checkout = async (e) => {
    e.preventDefault();
    if (!selectedAddress) return context.openAlertBox("error", "Select delivery address!");

    const options = {
      key: RAZORPAY_KEY,
      key_secret: RAZORPAY_SECRET_KEY,
      amount: totalAmount * 100,
      currency: "INR",
      name: "ClassyShop",
      description: "Payment for order",
      handler: async function (response) {
        try {
          const user = context?.userData;
          const paymentId = response.razorpay_payment_id;

          const payLoad = {
            userId: user?._id,
            products: context?.cartData,
            orderId: response.razorpay_order_id,
            paymentId,
            payment_status: "COMPLETED",
            delivery_address: selectedAddress,
            totalAmt: totalAmount,
            date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
          };

          const res = await postData("/api/order/add", payLoad);

          if (!res?.error) {
            await deleteData(`/api/cart/empty-cart/${user?._id}`);
            await context.getCartItems();
            setTotalAmount(0);
            context.openAlertBox("success", "Order Completed Successfully!");
            history('/order/success');
          }
        } catch {
          history('/order/failed');
        }
      },
      theme: { color: "#ff5252" }
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  /* ------------------------------------------
             CASH ON DELIVERY
  -------------------------------------------*/
  const cashOnDelivery = async (e) => {
    e.preventDefault();
    if (!selectedAddress) return context.openAlertBox("error", "Select delivery address!");

    const user = context?.userData;
    const payLoad = {
      userId: user?._id,
      products: context?.cartData,
      orderId: '',
      paymentId: '',
      payment_status: "COMPLETED",
      delivery_address: selectedAddress,
      totalAmt: totalAmount,
      date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    };

    const res = await postData("/api/order/add", payLoad);

    if (!res?.error) {
      await deleteData(`/api/cart/empty-cart/${user?._id}`);
      await context.getCartItems();
      setTotalAmount(0);
      context.openAlertBox("success", "Order Completed Successfully!");
      history('/order/success');
    } else {
      history('/order/failed');
    }
  };

  return (
    <section className="checkout">
      <form onSubmit={checkout}>
        <div className="container">

          {/* LEFT SIDE */}
          <div className="left-col">
            <div className="card">
              <div className='check-group'>
                <h3>Select Delivery Address</h3>
                <Button onClick={() => context.toggleAddressPanel(true)()} className='check-btn'>
                  <FiPlus /> Add New Address
                </Button>
              </div>
              <br />

              <div className='select-address'>
                {context?.userData?.address_details?.length ?
                  context?.userData?.address_details?.map((address, index) => (
                    <label className={`address-label ${isChecked === index ? "checked-color" : ""}`} key={address?._id}>
                      <Radio
                        name="radio-buttons"
                        size='small'
                        onChange={() => handleChange(index, address?._id)}
                        checked={isChecked === index}
                      />
                      <div className='user-info'>
                        <p>{address?.addressType}</p>
                        <h4>{context?.userData?.name}</h4>
                        <p>{address?.landmark}, {address?.address_line1}, {address?.city},{address?.pincode}, {address?.State}, {address?.country}</p>
                        <p>+{context?.userData?.mobile}</p>
                      </div>
                    </label>
                  ))
                  :
                  <div className='address-img'>
                    <div className='no-address'>
                      <img src={noAddress} alt="" />
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="right-col">
            <div className="card">
              <h2>Your Order</h2>
              <div className="checkout-box">
                <div className="details">
                  {context.cartData?.length ? context?.cartData?.map((item) => (
                    <div className="item" key={item?._id}>
                      <div className="img">
                        <img src={item?.image} alt="" />
                      </div>
                      <div className="info">
                        <p>{item?.productTitle.substr(0, 25) + "..."}</p>
                        <div className="desc">
                          <span>Qty:{item?.quantity}</span>
                          <span>&#x20b9; {item?.quantity * item?.price}</span>
                        </div>
                      </div>
                    </div>
                  )) : null}
                </div>

                <hr />
                <h3>Total: ₹ {totalAmount?.toLocaleString("en-IN")}</h3>
                <br />
                <Button className='cash-delivery' style={{ width: "100%" }} onClick={cashOnDelivery}>Cash on Delivery</Button>
                <br />
                <Button type='submit' className='bg-org' style={{ width: "100%" }}>Razorpay</Button>
                <div className="paypal-wrapper">
                  <div id="paypal-button-container"></div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </form>
    </section>
  );
};

export default Checkout;
