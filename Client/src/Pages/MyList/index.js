import React,{useContext} from 'react';
import './style.css';
import MyListItem from './MyListItem';
import MyAccountSidebar from '../../components/MyAccountSidebar';
import { myContext } from '../../App';
import wishlist from '../../assets/wishlist.jpg'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
const MyList = () => {
  const context=useContext(myContext);
  return (
    <section className='my-list-part'>
      <div className="container">
        <div className="right-part">
          <MyAccountSidebar/>
        </div>
        <div className="left-part">
          <div className="cart-box">
          <h2>My Product List</h2>
          <p>There are <span>{context?.myListData?.length}</span> products in your List</p>
          {
            context?.myListData?.length!==0 ? context?.myListData?.map((item,index)=>{
              return(
                <MyListItem key={index} item={item} />
                )
            })
            :
            <div className='wishlist'>
              <img src={wishlist} />
              <p>My List is currently empty</p>
              <Link to='/'><Button className='bg-org wishlist-btn'>Continue Shopping</Button></Link>
            </div>
          }
            {/* <MyListItem />
            <MyListItem/>
            <MyListItem />
            <MyListItem/> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyList
