import React,{ useEffect, useState} from 'react'
import DashCard from './DashCard'
import Footer from '../Admin/Footer'
import axios from 'axios'

export default function Dashboard() {
  const [data, setData] = useState({
    completedOrders: 0,
    pendingOffers:0,
    itemsInCart: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);


  //fetch data
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingOfferResponse = await axios.get('/get-pending-offer');
        const completedOrdersResponse = await axios.get('/product/get-complete-order');
        const itemsInCartResponse = await axios.get('/user-cart');
        const pendingOrderResponse = await axios.get('/product/get-pending-order');


        setData({
          pendingOffers: pendingOfferResponse.data.length,
          completedOrders: completedOrdersResponse.data.length,
          itemsInCart: itemsInCartResponse.data.cart.length,
          pendingOrders: pendingOrderResponse.data.length
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <div class="d-flex justify-content-center">
      <div class="spinner-border" style={{ color: 'rgb(94, 37, 37)', width: '3rem', height: '3rem', marginTop: '10rem' }} role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  }
  return (
  <div>
      <div className='categoryContainer d-flex dashboard_container'>
     <DashCard name='Pending Offers'  num={data.pendingOffers} imgsource={require('../../assets/images/User/pending offers.jpg')}/>
     <DashCard name='completed Orders'  num={data.completedOrders}  imgsource={require('../../assets/images/User/complte.jpg')}/>
     <DashCard  name='items in Cart'  num={data.itemsInCart}  imgsource={require('../../assets/images/User/cart.png')}/>
     <DashCard name='Pending orders'  num={data.pendingOrders}  imgsource={require('../../assets/images/User/cargo.png')}/>
    </div>
    <Footer/>
  </div>
   
  )
}
