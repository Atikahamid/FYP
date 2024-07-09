import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function OfferStatus() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get('/getOffer-User', config);
        setOffers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching offers', error);
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleEdit = (offerId) => {
    navigate(`/EditOffer/${offerId}`);
  };

  const handleDelete = async (offerId) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: "You want be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: 'rgb(94, 37, 37)',
      cancelButtonColor: '#d33'
    });
    if(isConfirmed){
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        await axios.delete(`/delete-offer/${offerId}`, config);
        setOffers(offers.filter(offer => offer._id !== offerId));
        Swal.fire({
          title: 'Offer deleted Successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'rgb(94, 37, 37)'
      });
      } catch (error) {
        console.error('Error deleting offer', error);
        Swal.fire({
          title: 'Error deleting offer',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: 'rgb(94, 37, 37)'
      });
      }
    }
   
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning';
      case 'accept':
        return 'bg-success';
      case 'reject':
        return 'bg-danger';
      default:
        return '';
    }
  };

  if(loading){
    return <div class="d-flex justify-content-center">
    <div class="spinner-border" style={{color:'rgb(94, 37, 37)',width:'3rem', height:'3rem', marginTop:'10rem'}} role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
}

  return (
    <div className='categoryContainer'>
      <div className="inner m-5 p-2 mt-3 pt-2 ">
        <h1>Offer Status</h1>
      </div>
      <div className="inner m-5 p-5 mt-1 pt-1">
        {offers.length === 0 ? (
          <div><h1> No offers found.</h1> </div>
        ) : (
          offers.map(offer => (
            <div className="inner m-3 p-5 mt-5 pt-1" key={offer._id}>
              <div className="offerProduct mt-3">
                <div className="product">
                  <div className="col-6">
                    <h5>{offer.product_id.title}</h5>
                    <hr />
                    <div className="oprice d-flex flex-row">
                      <h5 className='col-4'>Original Price: </h5> <span className='col-4'>Rs.{offer.product_id.price}</span>
                    </div>
                    <div className="oprice d-flex flex-row">
                      <h5 className='col-4'>Offer Price: </h5> <span className='col-4'>Rs.{offer.offer_price}</span>
                    </div>
                    <div className="oprice d-flex flex-row">
                      <h5 className='col-4'>Quantity: </h5> <span className='col-4'>{offer.quantity}</span>
                    </div>
                    <div className="offerdesc">
                      <h5>Description:</h5>
                      <span>{offer.description}</span>
                    </div>
                    <div className="optionbtn">
                      <button className="btn btn-warning obtn" onClick={() => handleEdit(offer._id)}>Edit</button>
                      <button className="btn btn-danger obtn" onClick={() => handleDelete(offer._id)}>Delete</button>
                    </div>
                  </div>
                  <div className="col-6 offer_img">
                    <img src={offer.product_id.images[0].url} alt={offer.product_id.title} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <h5 className={`offerStatusdiv ${getStatusClass(offer.status)}`}>Your offer is {offer.status}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
