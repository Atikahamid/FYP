import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function OfferStatus() {
  const navigate=useNavigate();
  const handledetails=()=>{
    navigate('/ProductDetails');
  }
  return (
    <div className='categoryContainer'>
      <div className="inner m-5 p-2 mt-3 pt-2 ">

        <h1>Offer Status</h1>
      </div>
      <div className="inner m-5 p-5 mt-1 pt-1">
      <div className="inner m-3 p-5 mt-5 pt-1">
          <div className="offerProduct mt-3">
            <div className="product">
              <div className="col-6">
                <h5>Product Name</h5>
                <hr />
                <div className="oprice">
                  <h5>Original Price: </h5> <span>Rs.3423</span>
                </div>
                <div className="oprice">
                  <h5>Offer Price: </h5> <span>Rs.3234</span>
                </div>
                <div className="offerdesc">
                  <h5>Description:</h5>
                  <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint odit nisi, inventore nam laboriosam incidunt.</span>
                </div>
                <div className="optionbtn">
                <button className="btn btn-warning obtn">Edit</button>
                <button className="btn btn-primary obtn" onClick={handledetails}>Details</button>
                <button className="btn btn-danger obtn">Delete</button>
              </div>
              </div>
              <div className="col-6 offer_img">
                <img src={require('../../assets/images/tyres.png')} alt="" />
              </div>
              
            </div>
            <div className="row">
              <div className="col-12">
                <button className='offerStatusbtn'>Your offer is Accepted/Rejected</button>
              </div>
            </div>
          </div>


        </div>
        <div className="inner m-3 p-5 mt-5 pt-1">
          <div className="offerProduct mt-3">
            <div className="product">
              <div className="col-6">
                <h5>Product Name</h5>
                <hr />
                <div className="oprice">
                  <h5>Original Price: </h5> <span>Rs.3423</span>
                </div>
                <div className="oprice">
                  <h5>Offer Price: </h5> <span>Rs.3234</span>
                </div>
                <div className="offerdesc">
                  <h5>Description:</h5>
                  <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint odit nisi, inventore nam laboriosam incidunt.</span>
                </div>
              </div>
              <div className="col-6 offer_img">
                <img src={require('../../assets/images/tyre1.webp')} alt="" />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button className='offerStatusbtn'>Your offer is Accepted/Rejected</button>
              </div>
            </div>
          </div>


        </div>
      </div>
      </div>
      )
}
