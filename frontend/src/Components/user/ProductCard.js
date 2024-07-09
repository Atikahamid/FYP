import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ProductCard(props) {
  const navigate = useNavigate();

  const addcart = async () => {
    const token = localStorage.getItem('token');
    const quantity = 1;
    try {
      const response = await axios.post('/add-to-cart', {
        productId: props.id,
        quantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        Swal.fire({
          title: 'Product added to cart successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'rgb(94, 37, 37)'
        });
      }
    } catch (error) {
      console.error('Error adding product to cart', error);
      Swal.fire({
        title: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'rgb(94, 37, 37)'
      });
    }
  };

  const makeOffer = () => {
    navigate(`/user/partscategory/${props.subcategoryId}/productCardPanel/makeOffer/${props.id}`);
  };

  const handleviewdetails = () => {
    navigate(`/user/partscategory/${props.subcategoryId}/productCardPanel/ProductDetails/${props.id}`);
  };

  return (
    <div className='productcard mt-5'>
      <img src={props.imgSource} alt="" />
      <hr />
      <div className="row justify-content-evenly">
        <div className="col-10 d-flex flex-column">
          <span className='product_padding upper_ppadding fw-bold'>{props.name}</span>
          <span className='product_padding'>{props.model}</span>
        </div>
        <div className="row justify-content-start" style={{ marginLeft: "10px" }}>
          <div className="col-5">
            <span className='product_padding text-danger fw-bold'>Rs. {props.price}</span>
          </div>
          {/* <div className="col-4 container ">
            <p className='product_padding'>Quantity</p>
            <select 
              className='h-50' 
              style={{ marginLeft: "9px" }}
              value={selectedQuantity}
              onChange={e => setSelectedQuantity(e.target.value)}
            >
              {Array.from(Array(props.quantity), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}> {i + 1}</option>
                )
              })}
            </select>
          </div> */}
        </div>
        <div className="col-10 d-flex buttons_padding">
          <button onClick={addcart} className="btn btn1">Add To Cart</button>
          <button onClick={makeOffer} className="btn btn2">Make Offer</button>
        </div>
        <div className="col-12">
          <button className="viewDetails" onClick={handleviewdetails}>View Details</button>
        </div>
      </div>
    </div>
  )
}
