import React,{useEffect, useState} from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import '../../Styles/App.css'
import Swal from 'sweetalert2';

export default function OffersV() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async() =>{
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {Authorization: `Bearer ${token}`}
        };
        const response = await axios.get('/getOffer-Vendor', config);
        // console.log('offer data', response);
        const offerData = response.data.map(offer => ({
          id:offer._id,
          pname:offer.product_id.title,
          quantity: offer.quantity,
          price: offer.product_id.price* offer.quantity,
          offerprice: offer.offer_price,
          b_id: offer.user_id.email,
          action: (
            <div className='inside_action_btn'>
              <button className="btn btn-success category_admin_btn me-1" onClick={() => handleAccept(offer._id)}>Accept</button>
              <button className="btn btn-danger category_admin_btn" onClick={() => handleReject(offer._id)}>Reject</button>
            </div>
          )
        }));
        setOffers(offerData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching offers', error);
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);


  const handleAccept = async(offerId) => {
    try {
      await axios.post(`/accept-offer/${offerId}`);

      setOffers(prevOffers => prevOffers.filter(offer => offer._id !== offerId));
      Swal.fire({
        title: 'The Offer has been Accepted',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor:'rgb(94, 37, 37)'
      });
    } catch (error) {
      console.error('Error accepting offer', error);
      Swal.fire({
        title: 'There was an error accepting the offer.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor:'rgb(94, 37, 37)'
      });
    }
      
  }

  const handleReject = async (offerId) => {
    
      try {
        await axios.post(`/reject-offer/${offerId}`);

        setOffers(prevOffers => prevOffers.filter(offer => offer._id !== offerId));
        Swal.fire({
          title: 'The Offer has been Rejected',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor:'rgb(94, 37, 37)'
        });
      } catch (error) {
        console.error('Error rejecting offer', error);
        Swal.fire({
          title: 'There was an error rejecting the offer.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor:'rgb(94, 37, 37)'
        });
      }
        
  };



  const columns = [
    {
      name: 'Product Name',
      selector: row => row.pname,
      maxWidth:"200px"
    },
    {
      name: ' Offer Quantity',
      selector: row => row.quantity,
      maxWidth:"20px"
    },
    {
      name: 'Offer Price',
      selector: row => row.offerprice,
      maxWidth:"50px"
    },
    {
      name: 'Total Original Price',
      selector: row => row.price,
      maxWidth:"50px"
    },
    
    {
      name: 'Buyer Id',
      selector: row => row.b_id,
      maxWidth:"150px"

    },
    {
      name: 'Action',
      selector: row => row.action,
      maxWidth:"200px"
    }
  ];
 
  if(loading){
    return <div class="d-flex justify-content-center">
    <div class="spinner-border" style={{color:'rgb(94, 37, 37)',width:'3rem', height:'3rem', marginTop:'10rem'}} role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  }
  return (
    <div className='categoryContainer'>
      <div className="inner m-5 p-2 mt-3 pt-2">
        <h1>Offers</h1>
      </div>
      <div className="inner m-5 mt-3 p-5 mt-3 pt-2">

        <div className="tableContainer mt-3">
          <DataTable
          keyField='_id'
            columns={columns}
            data={offers}
          //  selectableRows
          //  fixedHeader
          //  fixedHeaderScrollHeight='300px'
          //  pagination
          ></DataTable>
        </div>
      </div>
    </div>

  )
}
