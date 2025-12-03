import React, { useContext, useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { RxCross2 } from "react-icons/rx";
import { GoTriangleDown } from "react-icons/go";
import { Link } from 'react-router-dom';
import { deleteData, editData, fetchDataFromApi } from '../../utils/Api';
import { myContext } from '../../App';

const ItemSize = (props) => {
  const productId = props?.item?.productId;

  // ======= STATES ==========
  const [productSizes, setProductSizes] = useState([]);
  const [productRams, setProductRams] = useState([]);
  const [productWeights, setProductWeights] = useState([]);
  const [stockQty, setStockQty] = useState(5);

  const [selectedSize, setselectedSize] = useState(props?.item?.size);
  const [selectedRam, setselectedRam] = useState(props?.item?.ram);
  const [selectedWeight, setselectedWeight] = useState(props?.item?.weight);
  const [selectQty, setselectQty] = useState(props?.item?.quantity);

  // DROPDOWN OPEN STATES
  const [sizeanchorEl, setsizeAnchorEl] = useState(null);
  const [ramAnchorEl, setRamAnchorEl] = useState(null);
  const [weightAnchorEl, setWeightAnchorEl] = useState(null);
  const [QtyanchorEl, setQtyAnchorEl] = useState(null);

  const openSize = Boolean(sizeanchorEl);
  const openRam = Boolean(ramAnchorEl);
  const openWeight = Boolean(weightAnchorEl);
  const openQty = Boolean(QtyanchorEl);
  const context=useContext(myContext);

  // ---------- API CALL TO GET PRODUCT DETAILS ----------
  useEffect(() => {
    window.scrollTo(0,0);
    if (!productId) return;

    fetchDataFromApi(`/api/product/getProductById/${productId}`)
      .then(data => {
        if (data?.error) return;

        const product = data?.product;
        setProductSizes(product?.size || []);
        setProductRams(product?.productRam || []);
        setProductWeights(product?.productWeight || []);
        setStockQty(product?.countInStock || 5);
      })
      .catch(err => console.log("Fetch error:", err));
  }, [productId]);

  // UPDATE CART ITEM IN BACKEND
  const updateCartItem = async (field, value) => {
    const updatedData = {
      _id: props?.item?._id,
      qty: field === 'quantity' ? value : selectQty,
      size: field === 'size' ? value : selectedSize,
      ram: field === 'ram' ? value : selectedRam,
      weight: field === 'weight' ? value : selectedWeight,
      subTotal: props?.item?.price * (field === 'quantity' ? value : selectQty)
    };

    const res = await editData('/api/cart/update-qty', updatedData);
    console.log("Cart update response:", res?.data);
  };

  // HANDLERS
  const handleSize = (e) => setsizeAnchorEl(e.currentTarget);
  const handleRam = (e) => setRamAnchorEl(e.currentTarget);
  const handleWeight = (e) => setWeightAnchorEl(e.currentTarget);
  const handleQty = (e) => setQtyAnchorEl(e.currentTarget);

  const removeItem=(id)=>{
    deleteData(`/api/cart/delete-cart-item/${id}`).then((res)=>{
      // console.log(res);
      context.openAlertBox("success","Product item removed from cart")
      context.getCartItems();
    })
  }
  return (
    <div className="cart-item">
      {/* IMAGE */}
      <div className="img">
        <Link to={`/product/${props?.item?.productId}`} className='group'>
          <img src={props?.item?.image} alt="" />
        </Link>
      </div>

      <div className="info">
        <RxCross2 className='cross-icon' onClick={()=>removeItem(props?.item?._id)} />
        <h3>
          <Link to={`/product/${props?.item?.productId}`}>
            {props?.item?.productTitle}
          </Link>
        </h3>

        {/* =================== DROPDOWNS =================== */}
        <div className="size-dropdown">

          {/* SIZE */}
          {productSizes?.length > 0 && (
            <div className="relative">
              <span className='span' onClick={handleSize}>
                Size: {selectedSize || "Select"} <GoTriangleDown />
              </span>

              <Menu anchorEl={sizeanchorEl} open={openSize} onClose={() => setsizeAnchorEl(null)}>
                {productSizes.map((sz, i) => (
                  <MenuItem
                    key={i}
                    selected={sz === selectedSize}
                    onClick={() => {
                      setselectedSize(sz);
                      setsizeAnchorEl(null);
                      updateCartItem('size', sz);
                    }}
                  >
                    {sz}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}

          {/* RAM */}
          {productRams?.length > 0 && (
            <div className="relative">
              <span className='span' onClick={handleRam}>
                RAM: {selectedRam || "Select"} <GoTriangleDown />
              </span>

              <Menu anchorEl={ramAnchorEl} open={openRam} onClose={() => setRamAnchorEl(null)}>
                {productRams.map((ram, i) => (
                  <MenuItem
                    key={i}
                    selected={ram === selectedRam}
                    onClick={() => {
                      setselectedRam(ram);
                      setRamAnchorEl(null);
                      updateCartItem('ram', ram);
                    }}
                  >
                    {ram}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}

          {/* WEIGHT */}
          {productWeights?.length > 0 && (
            <div className="relative">
              <span className='span' onClick={handleWeight}>
                Weight: {selectedWeight || "Select"} <GoTriangleDown />
              </span>

              <Menu anchorEl={weightAnchorEl} open={openWeight} onClose={() => setWeightAnchorEl(null)}>
                {productWeights.map((wt, i) => (
                  <MenuItem
                    key={i}
                    selected={wt === selectedWeight}
                    onClick={() => {
                      setselectedWeight(wt);
                      setWeightAnchorEl(null);
                      updateCartItem('weight', wt);
                    }}
                  >
                    {wt}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}

          {/* QTY */}
          <div className="relative">
            <span className='span' onClick={handleQty}>
              Qty: {selectQty} <GoTriangleDown />
            </span>

            <Menu anchorEl={QtyanchorEl} open={openQty} onClose={() => setQtyAnchorEl(null)}>
              {[...Array(stockQty).keys()].map((n) => (
                <MenuItem
                  key={n}
                  selected={n + 1 === selectQty}
                  onClick={() => {
                    setselectQty(n + 1);
                    setQtyAnchorEl(null);
                    updateCartItem('quantity', n + 1);
                  }}
                >
                  {n + 1}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        {/* PRICE */}
        <div className="price">
          <span className="new-price"><strong>&#x20b9; {props?.item?.price}</strong></span>
          <span className="old-price">&#x20b9; {props?.item?.oldPrice}</span>
          <span className="new-price"><strong>{props?.item?.discount}% OFF</strong></span>
        </div>
      </div>
    </div>
  );
};

export default ItemSize;
