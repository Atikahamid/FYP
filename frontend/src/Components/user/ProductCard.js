import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard() {
  const navigate=useNavigate();
  const handleviewdetails =()=>{
    navigate('/ProductDetails');
  }
  return (
    <div className='categorycard mt-5'>
      <img src={require ('../../images/pic.jpg')} alt="" />
      <div className="desc">
        <h3 className='name'>Name</h3>
        <h2>price</h2>
        <button className="viewDetails" onClick={handleviewdetails}>View Details</button>
      </div>
    </div>
  )
}
