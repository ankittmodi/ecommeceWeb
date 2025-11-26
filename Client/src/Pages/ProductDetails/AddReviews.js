import React, { useContext, useEffect, useState } from 'react';
import './style.css'
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { myContext } from '../../App';
import { fetchDataFromApi, postData } from '../../utils/Api';
const AddReviews = (props) => {
    const context=useContext(myContext);
    const[reviews,setReviews]=useState({
        image:'',
        userName:'',
        review:'',
        rating:1,
        userId:'',
        productId:''
    });
    const[reviewData,setReviewData]=useState([]);

    useEffect(()=>{
        // console.log(context?.userData);
        setReviews(()=>({
            ...reviews,
            image:context?.userData?.avatar,
            userName:context?.userData?.name,
            userId:context?.userData?._id,
            productId:props.productId
        }))
    },[context?.userData,props]);

    useEffect(() => {
        getReviews();
    }, [props.productId]);

    const onChangeInput=(e)=>{
        e.preventDefault();
        setReviews(()=>({
            ...reviews,
            review:e.target.value
        }))
    }

    const addReviews=(e)=>{
        e.preventDefault();
        console.log(reviews);
        postData('/api/user/addReview',reviews).then((res)=>{
            if(!res?.error){
                context.openAlertBox("success",res?.message);
                setReviews(()=>({
                    ...reviews,
                    review:'',
                    rating:1
                }))
                getReviews();
            }
            else{
                context.openAlertBox("error",res?.message);
            }
        })
    }

    const getReviews = () => {
        fetchDataFromApi(`/api/user/getReview?productId=${props?.productId}`).then((res)=>{
            if(!res.error){
                setReviewData(res?.reviews);
            }
        });
    }

  return (
      <div className="tabContent">
              <div className="row">
                <div className="col-md-8">
                  <h3>Customer Reviews</h3>
                  <br />
                  {
                    reviewData?.length!==0 && 
                    reviewData.map((rev,index)=>{
                        return(
                            <div className="reviewpart-section" key={index}>
                                <div className="card p3 reviewCard flex-row">
                                <div className="image">
                                    <div className="rounded-circle ">
                                    <img src={rev?.image} alt="" />
                                    </div>
                                    <div className="info">
                                    <div className="reviews">
                                        <div className='review-desc'>
                                            <span className="text-g d-block text-center">{rev?.userName}</span>
                                            <h5>January 10, 2025 at 5:30 pm</h5>
                                        </div>
                                        <Rating name="half-rating-read" value={rev?.rating} precision={0.5} readOnly />
                                    </div>
                                    <p>{rev?.review}</p>
                                </div>
                                </div>
                                </div>
                    {/* <div className="card p3 reviewCard flex-row">
                      <div className="image">
                        <div className="rounded-circle ">
                          <img src="https://up.yimg.com/ib/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&rs=1&c=1&qlt=95&w=113&h=113" alt="" />
                        </div>
                        <div className="info">
                          <div className="reviews d-flex ">
                          <div className='review-desc'>
                            <span className="text-g d-block text-center">Ankit</span>
                            <h5>January 10, 2025 at 5:30 pm</h5>
                          </div>
                          <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                        </div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum voluptatem, possimus dolores quidem qui ad distinctio mollitia sint eius voluptas.</p>
                      </div>
                      </div>
                    </div> */}
                    {/* <div className="card p3 reviewCard flex-row">
                      <div className="image">
                        <div className="rounded-circle ">
                          <img src="https://up.yimg.com/ib/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&rs=1&c=1&qlt=95&w=113&h=113" alt="" />
                        </div>
                        <div className="info">
                          <div className="reviews d-flex ">
                          <div className='review-desc'>
                            <span className="text-g d-block text-center">Ankit</span>
                            <h5>January 10, 2025 at 5:30 pm</h5>
                          </div>
                          <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                        </div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum voluptatem, possimus dolores quidem qui ad distinctio mollitia sint eius voluptas.</p>
                      </div>
                      </div>
                    </div> */}
                    {/* <div className="card p3 reviewCard flex-row">
                      <div className="image">
                        <div className="rounded-circle ">
                          <img src="https://up.yimg.com/ib/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&rs=1&c=1&qlt=95&w=113&h=113" alt="" />
                        </div>
                        <div className="info">
                          <div className="reviews d-flex ">
                          <div className='review-desc'>
                            <span className="text-g d-block text-center">Ankit</span>
                            <h5>January 10, 2025 at 5:30 pm</h5>
                          </div>
                          <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                        </div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum voluptatem, possimus dolores quidem qui ad distinctio mollitia sint eius voluptas.</p>
                      </div>
                      </div>
                    </div> */}
                    </div>
                        )
                    })
                    
                  }
                  
                    <br />
                  <form action="" className='reviewForm' onSubmit={addReviews}>
                  <h4>Add Review</h4>
                  <div className="form-group">
                    <TextField
                    id="outlined-textarea"
                    label="Write a review"
                    // placeholder="Placeholder"
                    multiline
                    rows={5}
                    onChange={onChangeInput}
                    name='review'
                    value={reviews.review}
                    className='review-input'
                  />
                  <br /><br />
                  <Rating name="half-rating-read" value={reviews.rating} precision={0.5} onChange={(e,newValue)=>{
                    setReviews(()=>({
                        ...reviews,
                        rating:newValue
                    }))
                  }} />
                  </div>

                  <Button className='add-btn' type='submit'>Submit Review</Button>
                  </form>
                </div>
              </div>

            </div>
  )
}

export default AddReviews
