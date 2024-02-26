import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { GiShoppingCart } from "react-icons/gi";

export default function ProductCard() {
  const navigate = useNavigate();
  const handleviewdetails = () => {
    navigate('/ProductDetails');
  }
  return (
    <div className='productcard mt-5'>
      <img src={require('../../images/pic.jpg')} alt="" />
      <div className="row justify-content-evenly">
        <div className="col-10 d-flex flex-column">
          <span>Name</span>
          <span>Make,Model,Brand</span>
        </div>
        <div className="row justify-content-evenly" style={{marginLeft:"22px"}}>
        <div className="col-4">
        <span>Rs,2000</span>
        </div>
        <div className="col-4 container mt-1 quantity_div">
        <p> Quantity</p>
            <select className=' h-100 ' style={{marginLeft:"9px"}}>
              {Array.from(Array(5),(e,i)=>{
                return(
                  <option key={i+1} value={i+1}> {i+1}</option>
                )
              })
              }
            </select>
        </div>
        </div>
        <div className="col-10 d-flex">
        <button className="btn  btn1">Add To Cart</button>
          <button className="btn  btn2">Make Offer</button>
        </div>

        {/* <div className="col-6">
          <dl className="dl-horizontal product_dl">
            <dd>Name</dd>
            <dd>Rs.20000</dd>
            <dd>Model</dd>
          </dl>
        </div>
        <div className="col-6">
          <div className="container mt-1 quantity_div">
           <p> Quantity</p>
            <select className=' h-100 ' style={{marginLeft:"9px"}}>
              {Array.from(Array(5),(e,i)=>{
                return(
                  <option key={i+1} value={i+1}> {i+1}</option>
                )
              })
              }
            </select>
          </div>
          <div className="d-flex ">
          <button className="btn btn-primary btn1">Add To Cart</button>
          <button className="btn btn-success btn2">Make Offer</button>
          </div>
        </div>
      </div> */}

      <div className="col-12">
        <button className="viewDetails" onClick={handleviewdetails}>View Details</button>
      </div>
    </div>
    </div>
  )
}
